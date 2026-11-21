package it.storieitalia.app;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.DownloadManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.graphics.Color;
import android.graphics.Insets;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.Window;
import android.view.WindowInsets;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MainActivity extends Activity {

    /*
     * Modelli scaricabili, tutti gratuiti.
     * id, nome, descrizione, file, url, MB, RAM minima (GB), contesto (token), template chat, nota licenza
     */
    static final String[][] MODELS = {
        {"q7", "Massima intelligenza", "Qwen2.5 7B · risposte ricche e complesse · per telefoni top (12 GB di RAM)",
         "Qwen2.5-7B-Instruct-Q4_K_M.gguf",
         "https://huggingface.co/bartowski/Qwen2.5-7B-Instruct-GGUF/resolve/main/Qwen2.5-7B-Instruct-Q4_K_M.gguf",
         "4680", "11", "6144", "chatml", "Qwen2.5 · licenza Apache 2.0"},
        {"l3", "Bilanciata", "Llama 3.2 3B · ottimo italiano e buona velocità · telefoni con 6-8 GB di RAM",
         "Llama-3.2-3B-Instruct-Q4_K_M.gguf",
         "https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF/resolve/main/Llama-3.2-3B-Instruct-Q4_K_M.gguf",
         "2020", "5.5", "4096", "llama3", "Built with Llama · Llama 3.2 Community License"},
        {"q15", "Veloce", "Qwen2.5 1.5B · leggera e rapida · per telefoni con poca memoria",
         "Qwen2.5-1.5B-Instruct-Q4_K_M.gguf",
         "https://huggingface.co/bartowski/Qwen2.5-1.5B-Instruct-GGUF/resolve/main/Qwen2.5-1.5B-Instruct-Q4_K_M.gguf",
         "986", "3", "6144", "chatml", "Qwen2.5 · licenza Apache 2.0"},
    };
    /** Modello della versione 1.x, non più usato (licenza non commerciale). */
    static final String LEGACY_FILE = "Qwen2.5-3B-Instruct-Q4_K_M.gguf";

    private WebView web;
    private final Handler ui = new Handler(Looper.getMainLooper());
    private final ExecutorService ai = Executors.newSingleThreadExecutor();
    private final ExecutorService net = Executors.newSingleThreadExecutor();
    private SharedPreferences prefs;
    private volatile String loadedId = null;
    private volatile boolean loading = false;

    // tasto "indietro" (Android 13+ usa il nuovo sistema predittivo)
    private Object backCallback = null;
    private boolean backRegistered = false;
    private boolean backWanted = false;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        prefs = getSharedPreferences("storie", MODE_PRIVATE);
        int bg = Color.parseColor("#0d0d11");

        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(bg);
        web = new WebView(this);
        web.setBackgroundColor(bg);
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        root.addView(web, new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
        setContentView(root);

        Window w = getWindow();
        if (Build.VERSION.SDK_INT >= 30) {
            // Schermo intero "edge-to-edge" (obbligatorio da Android 15/16): gestiamo noi gli spazi di sistema
            w.setDecorFitsSystemWindows(false);
            w.setStatusBarColor(Color.TRANSPARENT);
            w.setNavigationBarColor(Color.TRANSPARENT);
            root.setOnApplyWindowInsetsListener((v, insets) -> {
                Insets sys = insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
                Insets ime = insets.getInsets(WindowInsets.Type.ime());
                v.setPadding(sys.left, sys.top, sys.right, Math.max(sys.bottom, ime.bottom));
                return WindowInsets.CONSUMED;
            });
        } else {
            w.setStatusBarColor(bg);
            w.setNavigationBarColor(bg);
        }

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setTextZoom(100);
        web.setWebViewClient(new WebViewClient());
        web.setWebChromeClient(new WebChromeClient());
        web.addJavascriptInterface(new Bridge(), "AndroidAI");
        web.loadUrl("file:///android_asset/index.html");

        if (Build.VERSION.SDK_INT >= 33) {
            backCallback = (android.window.OnBackInvokedCallback) this::handleBack;
        }
    }

    /** Chiede alla pagina di gestire il tasto indietro; se non può, l'app va in secondo piano (il modello resta caricato). */
    private void handleBack() {
        web.evaluateJavascript("(window.__back ? window.__back() : false)", r -> {
            if (!"true".equals(r)) moveTaskToBack(true);
        });
    }

    private void applyBackState() {
        if (Build.VERSION.SDK_INT < 33 || backCallback == null) return;
        android.window.OnBackInvokedDispatcher d = getOnBackInvokedDispatcher();
        android.window.OnBackInvokedCallback cb = (android.window.OnBackInvokedCallback) backCallback;
        if (backWanted && !backRegistered) {
            d.registerOnBackInvokedCallback(android.window.OnBackInvokedDispatcher.PRIORITY_DEFAULT, cb);
            backRegistered = true;
        } else if (!backWanted && backRegistered) {
            d.unregisterOnBackInvokedCallback(cb);
            backRegistered = false;
        }
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        // usato solo fino ad Android 12
        handleBack();
    }

    @Override
    protected void onDestroy() {
        NativeLlm.stop();
        ai.shutdownNow();
        net.shutdownNow();
        super.onDestroy();
    }

    // ---------------------------------------------------------------- helpers
    private File modelsDir() { return new File(getExternalFilesDir(null), "models"); }

    private File modelFile(String id) {
        String[] m = model(id);
        return m == null ? null : new File(modelsDir(), m[3]);
    }

    private static String[] model(String id) {
        for (String[] m : MODELS) if (m[0].equals(id)) return m;
        return null;
    }

    private double ramGb() {
        ActivityManager am = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
        ActivityManager.MemoryInfo mi = new ActivityManager.MemoryInfo();
        am.getMemoryInfo(mi);
        return mi.totalMem / 1073741824.0;
    }

    private int threads() {
        int cores = Runtime.getRuntime().availableProcessors();
        return Math.max(2, Math.min(6, cores - 2));
    }

    private void js(String code) { ui.post(() -> web.evaluateJavascript(code, null)); }

    /** Il file è completo se ha la dimensione registrata a fine download, o almeno il 90% di quella attesa. */
    private boolean fileReady(String id) {
        String[] m = model(id);
        File f = modelFile(id);
        if (m == null || f == null || !f.exists()) return false;
        long done = prefs.getLong("size_" + id, -1);
        if (done > 0 && f.length() == done) return true;
        return f.length() >= Long.parseLong(m[5]) * 1000L * 1000L * 90 / 100;
    }

    private static boolean reportConfigured() {
        return BuildConfig.REPORT_URL != null && BuildConfig.REPORT_URL.startsWith("https://")
                && BuildConfig.REPORT_KEY != null && !BuildConfig.REPORT_KEY.isEmpty();
    }

    // ---------------------------------------------------------------- bridge JS
    final class Bridge {

        @JavascriptInterface
        public String status() {
            try {
                JSONObject o = new JSONObject();
                double ram = ramGb();
                o.put("ram", Math.round(ram * 10) / 10.0);
                o.put("loaded", NativeLlm.isLoaded() && loadedId != null ? loadedId : JSONObject.NULL);
                o.put("loading", loading);
                o.put("selected", prefs.getString("model", ""));
                o.put("version", BuildConfig.VERSION_NAME);
                o.put("legacy", new File(modelsDir(), LEGACY_FILE).exists());
                String rec = "q15";
                for (String[] m : MODELS) if (ram >= Double.parseDouble(m[6])) { rec = m[0]; break; }
                o.put("recommended", rec);
                JSONArray arr = new JSONArray();
                for (String[] m : MODELS) {
                    JSONObject j = new JSONObject();
                    j.put("id", m[0]); j.put("name", m[1]); j.put("desc", m[2]);
                    j.put("mb", Integer.parseInt(m[5]));
                    j.put("minRam", Double.parseDouble(m[6]));
                    j.put("ctx", Integer.parseInt(m[7]));
                    j.put("tpl", m[8]);
                    j.put("note", m[9]);
                    j.put("ready", fileReady(m[0]));
                    arr.put(j);
                }
                o.put("models", arr);
                o.put("download", downloadInfo());
                return o.toString();
            } catch (Exception e) {
                return "{}";
            }
        }

        @JavascriptInterface
        public void download(String id) {
            String[] m = model(id);
            if (m == null) return;
            File f = modelFile(id);
            if (f.exists()) f.delete();
            File dir = f.getParentFile();
            if (dir != null && !dir.exists()) dir.mkdirs();
            prefs.edit().remove("size_" + id).apply();
            DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
            DownloadManager.Request r = new DownloadManager.Request(Uri.parse(m[4]));
            r.setTitle("Storie d'Italia – cervello AI");
            r.setDescription(m[1]);
            r.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE);
            r.setDestinationInExternalFilesDir(MainActivity.this, null, "models/" + m[3]);
            r.setAllowedOverMetered(true);
            long dl = dm.enqueue(r);
            prefs.edit().putLong("dl", dl).putString("dlModel", id).apply();
        }

        @JavascriptInterface
        public void cancelDownload() {
            long dl = prefs.getLong("dl", -1);
            if (dl >= 0) ((DownloadManager) getSystemService(DOWNLOAD_SERVICE)).remove(dl);
            prefs.edit().remove("dl").remove("dlModel").apply();
        }

        @JavascriptInterface
        public void deleteModel(String id) {
            if (id.equals(loadedId)) { NativeLlm.stop(); ai.submit(NativeLlm::unload); loadedId = null; }
            File f = modelFile(id);
            if (f != null && f.exists()) f.delete();
            prefs.edit().remove("size_" + id).apply();
        }

        @JavascriptInterface
        public void deleteLegacy() {
            File f = new File(modelsDir(), LEGACY_FILE);
            if (f.exists()) f.delete();
        }

        @JavascriptInterface
        public void load(String id) {
            String[] m = model(id);
            if (m == null || loading) return;
            loading = true;
            prefs.edit().putString("model", id).apply();
            ai.submit(() -> {
                boolean ok = NativeLlm.load(modelFile(id).getAbsolutePath(), Integer.parseInt(m[7]), threads());
                loadedId = ok ? id : null;
                loading = false;
                js("window.__aiLoaded && window.__aiLoaded(" + ok + ")");
            });
        }

        @JavascriptInterface
        public int countTokens(String prompt) {
            return NativeLlm.countTokens(prompt.getBytes(StandardCharsets.UTF_8));
        }

        @JavascriptInterface
        public int contextSize() { return NativeLlm.contextSize(); }

        @JavascriptInterface
        public void stop() { NativeLlm.stop(); }

        @JavascriptInterface
        public void setBackEnabled(boolean enabled) {
            ui.post(() -> { backWanted = enabled; applyBackState(); });
        }

        @JavascriptInterface
        public boolean reportConfigured() { return MainActivity.reportConfigured(); }

        /** Invia una segnalazione allo sviluppatore. Risposta: window.__reportDone(rid, ok). */
        @JavascriptInterface
        public void report(int rid, String json) {
            if (!MainActivity.reportConfigured()) return;
            net.submit(() -> {
                boolean ok = false;
                HttpURLConnection c = null;
                try {
                    c = (HttpURLConnection) new URL(BuildConfig.REPORT_URL).openConnection();
                    c.setRequestMethod("POST");
                    c.setConnectTimeout(15000);
                    c.setReadTimeout(15000);
                    c.setDoOutput(true);
                    c.setRequestProperty("Content-Type", "application/json");
                    c.setRequestProperty("apikey", BuildConfig.REPORT_KEY);
                    c.setRequestProperty("Authorization", "Bearer " + BuildConfig.REPORT_KEY);
                    c.setRequestProperty("Prefer", "return=minimal");
                    try (OutputStream out = c.getOutputStream()) { out.write(json.getBytes(StandardCharsets.UTF_8)); }
                    int code = c.getResponseCode();
                    ok = code >= 200 && code < 300;
                } catch (Exception ignored) {
                } finally {
                    if (c != null) c.disconnect();
                }
                js("window.__reportDone && window.__reportDone(" + rid + "," + ok + ")");
            });
        }

        /** Genera testo. maxTokens = 0 prepara soltanto il contesto (risposte successive più veloci). */
        @JavascriptInterface
        public void generate(int id, String prompt, int maxTokens, float temp) {
            ai.submit(() -> {
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                final long[] last = {0};
                String err = NativeLlm.generate(prompt.getBytes(StandardCharsets.UTF_8), maxTokens, temp, piece -> {
                    out.write(piece, 0, piece.length);
                    long now = System.currentTimeMillis();
                    if (now - last[0] > 70) {
                        last[0] = now;
                        String txt = new String(out.toByteArray(), StandardCharsets.UTF_8);
                        js("window.__aiToken && window.__aiToken(" + id + "," + JSONObject.quote(txt) + ")");
                    }
                });
                String txt = new String(out.toByteArray(), StandardCharsets.UTF_8);
                js("window.__aiDone && window.__aiDone(" + id + "," + JSONObject.quote(txt) + ","
                        + JSONObject.quote(err == null ? "" : err) + ")");
            });
        }
    }

    private JSONObject downloadInfo() throws Exception {
        JSONObject o = new JSONObject();
        long dl = prefs.getLong("dl", -1);
        o.put("active", false);
        if (dl < 0) return o;
        DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
        try (Cursor c = dm.query(new DownloadManager.Query().setFilterById(dl))) {
            if (c == null || !c.moveToFirst()) { prefs.edit().remove("dl").apply(); return o; }
            int st = c.getInt(c.getColumnIndexOrThrow(DownloadManager.COLUMN_STATUS));
            long done = c.getLong(c.getColumnIndexOrThrow(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));
            long tot = c.getLong(c.getColumnIndexOrThrow(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));
            String id = prefs.getString("dlModel", "");
            o.put("model", id);
            o.put("done", done);
            o.put("total", tot);
            if (st == DownloadManager.STATUS_SUCCESSFUL) {
                o.put("state", "ok");
                File f = modelFile(id);
                SharedPreferences.Editor e = prefs.edit().remove("dl");
                if (f != null && f.exists()) e.putLong("size_" + id, f.length());
                e.apply();
            } else if (st == DownloadManager.STATUS_FAILED) {
                o.put("state", "error");
                prefs.edit().remove("dl").apply();
            } else {
                o.put("active", true);
                o.put("state", st == DownloadManager.STATUS_PAUSED ? "paused" : "running");
            }
        }
        return o;
    }
}
