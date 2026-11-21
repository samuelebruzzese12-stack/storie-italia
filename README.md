# Storie d'Italia – Chat AI offline

App Android di chat con personaggi AI ambientata nell'Italia di oggi.
L'AI funziona **direttamente sul telefono**: gratis, senza abbonamenti, anche senza internet.

## Come ottenere l'APK (anche solo dal telefono)

1. Vai su github.com e crea un repository nuovo e vuoto, per esempio `storie-italia`.
2. Carica tutti i file di questa cartella mantenendo le sottocartelle
   (oppure chiedi a Claude di caricarli per te nel repository).
3. GitHub compila l'app da solo (scheda **Actions**, circa 15–25 minuti).
4. Apri la scheda **Releases** del repository e scarica `StorieItalia.apk`.
5. Installa l'APK sul telefono (consenti "installa app sconosciute").

## Primo avvio

L'app chiede di scaricare il "cervello" AI una sola volta (meglio in Wi-Fi):

| Modello | Dimensione | Telefono consigliato |
|---|---|---|
| Massima intelligenza (Qwen2.5 7B) | 4,7 GB | 12 GB di RAM o più |
| Bilanciata (Qwen2.5 3B) | 1,9 GB | 6–8 GB di RAM |
| Veloce (Qwen2.5 1.5B) | 1,1 GB | 3–4 GB di RAM |

L'app consiglia da sola il modello giusto in base alla memoria del telefono.

## Com'è fatta

- `app/src/main/assets/index.html` – interfaccia (home, scenari, chat, memoria, profilo)
- `app/src/main/cpp/storie.cpp` – motore AI nativo (llama.cpp) con riuso della conversazione già elaborata
- `app/src/main/java/.../MainActivity.java` – WebView, download del modello, ponte JavaScript ↔ AI
- `.github/workflows/build-apk.yml` – compilazione automatica e pubblicazione dell'APK

Storie di pura finzione: personaggi, locali e organizzazioni sono inventati.
