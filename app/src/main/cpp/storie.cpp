// Motore AI offline di "Storie d'Italia".
// Usa llama.cpp per far girare un modello linguistico direttamente sul telefono.
// Tiene in memoria la parte di conversazione gia' elaborata (prompt cache),
// cosi' ogni nuova risposta parte molto piu' in fretta.

#include <jni.h>
#include <android/log.h>
#include <algorithm>
#include <atomic>
#include <ctime>
#include <string>
#include <vector>
#include "llama.h"

#define TAG "StorieAI"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, TAG, __VA_ARGS__)

static llama_model       *g_model  = nullptr;
static llama_context     *g_ctx    = nullptr;
static const llama_vocab *g_vocab  = nullptr;
static std::vector<llama_token> g_cached;     // token gia' presenti nella KV cache
static std::atomic<bool> g_stop(false);
static bool g_backend = false;
static const int g_batch = 512;

static std::string jstr(JNIEnv *env, jstring s) {
    if (!s) return "";
    const char *c = env->GetStringUTFChars(s, nullptr);
    std::string out(c);
    env->ReleaseStringUTFChars(s, c);
    return out;
}

// Java passa il testo come byte UTF-8 veri: niente problemi con emoji e accenti
static std::string jbytes(JNIEnv *env, jbyteArray a) {
    if (!a) return "";
    jsize n = env->GetArrayLength(a);
    std::string out((size_t) n, '\0');
    if (n > 0) env->GetByteArrayRegion(a, 0, n, reinterpret_cast<jbyte *>(&out[0]));
    return out;
}

static std::vector<llama_token> tokenize(const std::string &text) {
    int n = -llama_tokenize(g_vocab, text.c_str(), (int32_t) text.size(), nullptr, 0, false, true);
    if (n <= 0) n = (int) text.size() + 16;
    std::vector<llama_token> toks((size_t) n);
    int got = llama_tokenize(g_vocab, text.c_str(), (int32_t) text.size(), toks.data(), n, false, true);
    if (got < 0) {
        toks.resize((size_t) -got);
        got = llama_tokenize(g_vocab, text.c_str(), (int32_t) text.size(), toks.data(), -got, false, true);
    }
    toks.resize(got < 0 ? 0 : (size_t) got);
    return toks;
}

static void reset_cache() {
    g_cached.clear();
    if (g_ctx) llama_kv_cache_clear(g_ctx);
}

static void unload() {
    if (g_ctx)   { llama_free(g_ctx);         g_ctx = nullptr; }
    if (g_model) { llama_model_free(g_model); g_model = nullptr; }
    g_vocab = nullptr;
    g_cached.clear();
}

extern "C" JNIEXPORT jboolean JNICALL
Java_it_storieitalia_app_NativeLlm_load(JNIEnv *env, jclass, jstring jpath, jint nCtx, jint nThreads) {
    unload();
    if (!g_backend) { llama_backend_init(); g_backend = true; }

    std::string path = jstr(env, jpath);
    llama_model_params mp = llama_model_default_params();
    mp.use_mmap = true;
    g_model = llama_model_load_from_file(path.c_str(), mp);
    if (!g_model) { LOGE("modello non caricato: %s", path.c_str()); return JNI_FALSE; }

    llama_context_params cp = llama_context_default_params();
    cp.n_ctx           = (uint32_t) nCtx;
    cp.n_batch         = (uint32_t) g_batch;
    cp.n_ubatch        = (uint32_t) g_batch;
    cp.n_threads       = nThreads;
    cp.n_threads_batch = nThreads;
    g_ctx = llama_init_from_model(g_model, cp);
    if (!g_ctx) { LOGE("contesto non creato"); unload(); return JNI_FALSE; }

    g_vocab = llama_model_get_vocab(g_model);
    LOGI("modello pronto, ctx=%d thread=%d", nCtx, nThreads);
    return JNI_TRUE;
}

extern "C" JNIEXPORT jboolean JNICALL
Java_it_storieitalia_app_NativeLlm_isLoaded(JNIEnv *, jclass) {
    return g_ctx ? JNI_TRUE : JNI_FALSE;
}

extern "C" JNIEXPORT jint JNICALL
Java_it_storieitalia_app_NativeLlm_countTokens(JNIEnv *env, jclass, jbyteArray jprompt) {
    if (!g_vocab) return -1;
    return (jint) tokenize(jbytes(env, jprompt)).size();
}

extern "C" JNIEXPORT jint JNICALL
Java_it_storieitalia_app_NativeLlm_contextSize(JNIEnv *, jclass) {
    return g_ctx ? (jint) llama_n_ctx(g_ctx) : 0;
}

extern "C" JNIEXPORT void JNICALL
Java_it_storieitalia_app_NativeLlm_stop(JNIEnv *, jclass) {
    g_stop = true;
}

extern "C" JNIEXPORT void JNICALL
Java_it_storieitalia_app_NativeLlm_unload(JNIEnv *, jclass) {
    unload();
}

// Genera una risposta. Ogni pezzo di testo viene passato a callback.onBytes(byte[]).
// Ritorna "" se tutto ok, altrimenti un messaggio di errore.
extern "C" JNIEXPORT jstring JNICALL
Java_it_storieitalia_app_NativeLlm_generate(JNIEnv *env, jclass, jbyteArray jprompt,
                                            jint maxTokens, jfloat temp, jobject callback) {
    if (!g_ctx) return env->NewStringUTF("modello non caricato");
    g_stop = false;

    jclass cbCls = env->GetObjectClass(callback);
    jmethodID onBytes = env->GetMethodID(cbCls, "onBytes", "([B)V");

    std::vector<llama_token> toks = tokenize(jbytes(env, jprompt));
    const int nCtx = (int) llama_n_ctx(g_ctx);
    if (toks.empty()) return env->NewStringUTF("prompt vuoto");
    if ((int) toks.size() + maxTokens + 4 > nCtx) return env->NewStringUTF("prompt troppo lungo");

    // --- riuso della parte di conversazione gia' elaborata ---
    size_t common = 0;
    while (common < g_cached.size() && common < toks.size() && g_cached[common] == toks[common]) common++;
    if (common == toks.size()) common--;               // serve almeno un token nuovo per avere i logits
    llama_kv_cache_seq_rm(g_ctx, 0, (llama_pos) common, -1);
    g_cached.resize(common);
    LOGI("prompt %zu token, riusati %zu", toks.size(), common);

    for (size_t i = common; i < toks.size(); i += g_batch) {
        // interrotto: la parte già elaborata resta valida e verrà riusata dalla prossima richiesta
        if (g_stop) return env->NewStringUTF("");
        int n = (int) std::min((size_t) g_batch, toks.size() - i);
        llama_batch b = llama_batch_get_one(&toks[i], n);
        if (llama_decode(g_ctx, b) != 0) {
            reset_cache();
            return env->NewStringUTF("errore durante la lettura del prompt");
        }
        g_cached.insert(g_cached.end(), toks.begin() + (long) i, toks.begin() + (long) i + n);
    }

    if (maxTokens <= 0) return env->NewStringUTF("");   // solo preparazione del contesto

    // --- campionamento: creativo ma coerente, con anti-ripetizione ---
    llama_sampler *smpl = llama_sampler_chain_init(llama_sampler_chain_default_params());
    llama_sampler_chain_add(smpl, llama_sampler_init_penalties(256, 1.12f, 0.0f, 0.0f));
    llama_sampler_chain_add(smpl, llama_sampler_init_top_k(50));
    llama_sampler_chain_add(smpl, llama_sampler_init_top_p(0.92f, 1));
    llama_sampler_chain_add(smpl, llama_sampler_init_min_p(0.05f, 1));
    llama_sampler_chain_add(smpl, llama_sampler_init_temp(temp));
    llama_sampler_chain_add(smpl, llama_sampler_init_dist((uint32_t) time(nullptr)));

    char buf[512];
    std::string err;
    for (int i = 0; i < maxTokens && !g_stop; i++) {
        if ((int) g_cached.size() + 1 >= nCtx) break;
        llama_token t = llama_sampler_sample(smpl, g_ctx, -1);
        if (llama_vocab_is_eog(g_vocab, t)) break;

        int n = llama_token_to_piece(g_vocab, t, buf, (int32_t) sizeof(buf), 0, false);
        if (n > 0) {
            jbyteArray arr = env->NewByteArray(n);
            env->SetByteArrayRegion(arr, 0, n, reinterpret_cast<const jbyte *>(buf));
            env->CallVoidMethod(callback, onBytes, arr);
            env->DeleteLocalRef(arr);
        }

        llama_token tt = t;
        llama_batch b = llama_batch_get_one(&tt, 1);
        if (llama_decode(g_ctx, b) != 0) { err = "errore durante la generazione"; break; }
        g_cached.push_back(t);
    }
    llama_sampler_free(smpl);
    if (!err.empty()) reset_cache();
    return env->NewStringUTF(err.c_str());
}
