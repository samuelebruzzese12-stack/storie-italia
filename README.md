# Storie d'Italia – Chat AI offline

App Android di storie interattive con personaggi AI, ambientate in Italia: 31 storie tra gialli, romantiche, fantascienza, avventura, thriller, horror, commedia e drama, più la possibilità di crearne di proprie.
L'AI funziona **direttamente sul telefono**: gratis, senza abbonamenti, anche senza internet.

## Scaricare l'app

Apri la sezione **Releases** di questo repository:

- `StorieItalia.apk` – da installare sul telefono (consenti "installa app sconosciute");
- `StorieItalia-PlayStore.aab` – da caricare su Google Play Console (compare solo quando la chiave di firma è configurata, vedi sotto).

Ogni modifica al ramo `main` crea da sola una nuova versione.

## Chiave di firma per il Play Store

In **Settings › Secrets and variables › Actions** del repository servono due secrets:

| Nome | Contenuto |
|---|---|
| `SIGNING_KEYSTORE_B64` | il testo del file `SIGNING_KEYSTORE_B64.txt` |
| `SIGNING_PASSWORD` | la password della chiave |

Senza questi secrets viene creato solo l'APK di prova. **Conserva la chiave in un posto sicuro:** serve per tutti gli aggiornamenti futuri.

Facoltativi, per ricevere le segnalazioni degli utenti: `REPORT_URL` e `REPORT_KEY`.

## Primo avvio

L'app scarica una sola volta il "cervello" AI (meglio con il Wi-Fi) e consiglia il modello adatto al telefono:

| Modello | Dimensione | Telefono consigliato |
|---|---|---|
| Massima intelligenza – Qwen2.5 7B | 4,7 GB | 12 GB di RAM o più |
| Bilanciata – Llama 3.2 3B | 2,0 GB | 6-8 GB di RAM |
| Veloce – Qwen2.5 1.5B | 1,0 GB | 3-4 GB di RAM |

## Com'è fatta

- `app/src/main/assets/storie.js` – il catalogo delle storie (personaggi, segreti, scene d'apertura)
- `app/src/main/assets/index.html` – l'interfaccia e la logica (memoria, segnalazioni, crea storia)
- `app/src/main/cpp/storie.cpp` – motore AI nativo basato su llama.cpp, con riuso del contesto già elaborato
- `app/src/main/java/.../MainActivity.java` – WebView, download dei modelli, ponte JavaScript ↔ AI
- `.github/workflows/build-apk.yml` – compilazione automatica di APK e AAB
- [`PRIVACY.md`](PRIVACY.md) – informativa sulla privacy

Requisiti Google Play rispettati: Android 16 (API 36), allineamento a 16 KB delle librerie native, schermo edge-to-edge, gesto "indietro" predittivo, pulsante di segnalazione dei contenuti AI.

Storie di pura finzione: personaggi, luoghi privati e organizzazioni sono inventati.
Built with Llama. Llama 3.2 is licensed under the Llama 3.2 Community License, Copyright © Meta Platforms, Inc. All Rights Reserved.
