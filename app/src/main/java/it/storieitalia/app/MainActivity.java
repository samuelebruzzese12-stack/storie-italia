package it.storieitalia.app;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.DownloadManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MainActivity extends Activity {

    /** Modelli scaricabili. Tutti gratuiti, usano il formato chat "ChatML". */
    static final String[][] MODELS = {
        // id, nome, descrizione, file, url, dimensione MB, RAM minima GB, contesto
        {"q7", "Massima intelligenza", "Qwen2.5 7B · risposte ricche e complesse · per telefoni top (12 GB RAM)",
         "Qwen2.5-7B-Instruct-Q4_K_M.gguf",
         "https://huggingface.co/bartowski/Qwen2.5-7B-Instruct-GGUF/resolve/main/Qwen2.5-7B-Instruct-Q4_K_M.gguf",
         "4680", "11", "4096"},
        {"q3", "Bilanciata", "Qwen2.5 3B · buona qualità e velocità · telefoni con 6-8 GB RAM",
         "Qwen2.5-3B-Instruct-Q4_K_M.gguf",
         "https://huggingface.co/bartowski/Qwen2.5-3B-Instruct-GGUF/resolve/main/Qwen2.5-3B-Instruct-Q4_K_M.gguf",
         "1930", "5.5", "4096"},
        {"q15", "Veloce", "Qwen2.5 1.5B · leggera · per telefoni con poca memoria",
         "Qwen2.5-1.5B-Instruct-Q4_K_M.gguf",
         "https://huggingface.co/bartowski/Qwen2.5-1.5B-Instruct-GGUF/resolve/main/Qwen2.5-1.5B-Instruct-Q4_K_M.gguf",
         "1120", "3", "4096"},
    };

    private WebView web;
    private final Handler ui = new Handler(Looper.getMainLooper());
    private final ExecutorService ai = Executors.newSingleThreadExecutor();
    private SharedPreferences prefs;
    private volatile String loadedId = null;
    private volatile boolean loading = false;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        Window w = getWindow();
        w.setStatusBarColor(Color.parseColor("#0d0d11"));
        w.setNavigationBarColor(Color.parseColor("#0d0d11"));
        prefs = getSharedPreferences("storie", MODE_PRIVATE);

        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#0d0d11"));
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        web.setWebViewClient(new WebViewClient());
        web.setWebChromeClient(new WebChromeClient());
        web.addJavascriptInterface(new Bridge(), "AndroidAI");
        setContentView(web);
        web.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onBackPressed() {
        web.evaluateJavascript("(window.__back ? window.__back() : false)", r -> {
            if (!"true".equals(r)) MainActivity.super.onBackPressed();
        });
    }

    @Override
    protected void onDestroy() {
        NativeLlm.stop();
        ai.shutdownNow();
        super.onDestroy();
    }

    // ---------------------------------------------------------------- helpers
    private File modelFile(String id) {
        String[] m = model(id);
        if (m == null) return null;
        File dir = new File(getExternalFilesDir(null), "models");
        return new File(dir, m[3]);
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

    private void js(String code) {
        ui.post(() -> web.evaluateJavascript(code, null));
    }

    private boolean fileReady(File f, String[] m) {
        // il file deve esistere ed essere completo (almeno il 95% della dimensione attesa)
        return f != null && f.exists() && f.length() > Long.parseLong(m[5]) * 1000L * 1000L * 95 / 100;
    }

    // ---------------------------------------------------------------- bridge JS
    final class Bridge {

        @JavascriptInterface
        public String status() {
            try {
                JSONObject o = new JSONObject();
                double ram = ramGb();
                o.put("ram", Math.round(ram * 10) / 10.0);
                o.put("loaded", NativeLlm.isLoaded() ? loadedId : JSONObject.NULL);
                o.put("loading", loading);
                o.put("selected", prefs.getString("model", ""));
                String rec = "q15";
                for (String[] m : MODELS) if (ram >= Double.parseDouble(m[6])) { rec = m[0]; break; }
                o.put("recommended", rec);
                JSONArray arr = new JSONArray();
                for (String[] m : MODELS) {
                    JSONObject j = new JSONObject();
                    j.put("id", m[0]); j.put("name", m[1]); j.put("desc", m[2]);
                    j.put("mb", Integer.parseInt(m[5]));
                    j.put("minRam", Double.parseDouble(m[6]));
                    j.put("ready", fileReady(modelFile(m[0]), m));
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
        public int contextSize() {
            return NativeLlm.contextSize();
        }

        @JavascriptInterface
        public void stop() {
            NativeLlm.stop();
        }

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
            o.put("model", prefs.getString("dlModel", ""));
            o.put("done", done);
            o.put("total", tot);
            if (st == DownloadManager.STATUS_SUCCESSFUL) {
                o.put("state", "ok");
                prefs.edit().remove("dl").apply();
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
