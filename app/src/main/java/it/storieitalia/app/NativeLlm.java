package it.storieitalia.app;

/** Ponte verso il motore AI nativo (llama.cpp). */
public final class NativeLlm {
    static { System.loadLibrary("storie"); }

    public interface Callback { void onBytes(byte[] piece); }

    public static native boolean load(String path, int nCtx, int nThreads);
    public static native boolean isLoaded();
    public static native int countTokens(byte[] utf8Prompt);
    public static native int contextSize();
    public static native String generate(byte[] utf8Prompt, int maxTokens, float temp, Callback cb);
    public static native void stop();
    public static native void unload();

    private NativeLlm() {}
}
