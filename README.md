# Storie d'Italia – Chat AI offline

App Android di storie interattive con personaggi AI, ambientate in Italia: 72 storie tra gialli, romantiche, vita reale, fantascienza, avventura, azione, fantasy, malavita, guerra, thriller, horror, commedia e drama, più la possibilità di crearne di proprie.
L'AI funziona **direttamente sul telefono**: gratis, senza abbonamenti, anche senza internet.

Nella versione 2.8 ogni storia ha la sua **locandina da cinema**, composta a mano per ciascuna delle 72 storie:

- **scena**: luoghi e personaggi in controluce, con luce di taglio
- **atmosfera**: nebbia, fumo e nuvole generate dal rumore, riflessi sull'acqua, pioggia a più strati, grana da pellicola
- **impaginazione**: nomi del cast in alto, frase di lancio, titolo lavorato (oro, cromo, neon, consumato), titoli di coda

Nella versione 2.9 le locandine sono molto più dettagliate:

- **personaggi**: corpi in proporzione, con vestiti (giacca, cappotto, trench, divisa, mantello, abito da sposa), cappelli e capelli, pose (mani in tasca, braccia conserte, ombrello, fucile, valigia, abbraccio) e oggetti
- **paesaggi**: montagne frattali con neve, facce in ombra, canaloni e boschi; colline con campi e filari; abeti, cipressi, pioppi, ulivi, pini domestici e latifoglie
- **luoghi e oggetti**: bottega con vetrina, insegna e tenda; Mole, Ponte Vecchio, Sassi, Castel del Monte, Arena con le candeline, luminarie del Salento, Vele, nave da crociera, gru del porto, piroscafi del 1860, cavallo al galoppo, buco nero, tripode
- **luce**: raggi del sole, luna con mari e crateri, fulmini ramificati, laser, lampioni nella nebbia
- **titoli**: un titolo troppo alto viene impaginato su meno righe, così copre meno la scena

Nella versione 3.0 le locandine sono **animate**, come i poster animati dei film:

- **scena a strati**: cielo, nuvole, paesaggio e personaggi si muovono a profondità diverse con un lento movimento di macchina; nella locandina grande inclinando il telefono la scena si sposta
- **personaggi e oggetti vivi**: i personaggi respirano, il cavallo galoppa, le barche dondolano, i motoscafi planano, l'elicottero resta sospeso, le lettere e il pallone galleggiano, i rami di limoni e d'uva ondeggiano
- **meteo**: pioggia su tre piani con schizzi a terra e gocce sull'obiettivo, neve e bufera, nebbia e fumo che scorrono, fulmini ramificati con lampo nel cielo
- **luci**: finestre che si accendono e si spengono (con televisori e sagome che passano), insegne al neon che ronzano, lampioni con le falene, fari che girano, fiamme di candele, torce e lanterne, riflettori e fasci di luce con la polvere dentro, scintille sull'acqua, sole e luna con raggi e nuvole che passano
- **vita**: gabbiani, corvi, rondini, uno stormo di storni, rapaci, pipistrelli, streghe in volo, pesci e caustiche sott'acqua, lucciole, foglie e petali, fuochi d'artificio, saldatrici, spari e razzi illuminanti
- **titoli**: riflesso che attraversa le lettere, scintille, neon che sfarfalla, glitch per la fantascienza, pulsazione rossa per l'horror, piccolo salto per le commedie; grana e graffi da pellicola d'epoca per le storie del passato
- ogni storia ha la sua regia (`locandine_regia.js`); le storie create da chi gioca si animano in base al genere

Le animazioni si fermano da sole quando la locandina non si vede, si adattano alla velocità del telefono e si spengono con **Profilo → Animazioni: Ridotte** (o con l'impostazione di sistema «riduci movimento»).

Le locandine vengono disegnate sul telefono la prima volta e poi conservate, quindi si aprono subito. Le storie create da chi gioca ricevono una locandina costruita dal loro genere. Nella scheda della storia si tocca la locandina per vederla a tutto schermo.

Nelle versioni 2.6 e 2.7:

- **voce narrante**: il narratore e ogni personaggio leggono ad alta voce con un tono diverso (sintesi vocale del telefono, anche offline);
- **suoni d'atmosfera**: pioggia, mare, vicoli, spazio, fronte, neon e altri 12 ambienti generati dal vivo, senza file audio;
- **Risolvi il caso**: nei gialli e nei thriller accusi il colpevole, con 3 tentativi, punteggio e stelle;
- **finale da condividere**: l'AI scrive l'epilogo e l'app crea un'immagine da mandare agli amici;
- **sigle originali**: in «L'onore dei Ferracane» (saga siciliana) e in «'O Prufessore» (saga napoletana) la sigla parte all'inizio e nei momenti più forti della storia.

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

Le segnalazioni degli utenti arrivano alla tabella `segnalazioni` del progetto Supabase **storie-italia** (UE, Francoforte): l'app può solo inserire, nessuno può leggere con la chiave pubblica, e le righe più vecchie di 12 mesi si cancellano da sole. Il workflow `segnalazioni.yml` tiene attivo il progetto gratuito. Per usare un altro progetto basta impostare i secrets `REPORT_URL` e `REPORT_KEY`.

## Primo avvio

L'app scarica una sola volta il "cervello" AI (meglio con il Wi-Fi) e consiglia il modello adatto al telefono:

| Modello | Dimensione | Telefono consigliato |
|---|---|---|
| Massima intelligenza – Qwen2.5 7B | 4,7 GB | 12 GB di RAM o più |
| Bilanciata – Llama 3.2 3B | 2,0 GB | 6-8 GB di RAM |
| Veloce – Qwen2.5 1.5B | 1,0 GB | 3-4 GB di RAM |

## Com'è fatta

- `app/src/main/assets/storie.js`, `storie_nuove.js`, `storie_guerra.js`, `storie_malavita.js`, `storie_vita.js` e `storie_azione.js` – il catalogo delle storie (personaggi, segreti, scene d'apertura)
- `app/src/main/assets/casi.js` – le soluzioni dei gialli e dei thriller per «Risolvi il caso»
- `app/src/main/assets/voce.js` e `suoni.js` – voce narrante e suoni d'atmosfera
- `app/src/main/assets/campania.js` – i 550 comuni della Campania (fonte ISTAT, licenza CC BY 3.0 IT) con aree, città, quartieri e rioni
- `app/src/main/assets/locandine.js` – le locandine: motore di disegno, composizione di ogni storia, impaginazione e pellicola
- `app/src/main/assets/fonts/` – i caratteri delle locandine (licenza SIL Open Font License 1.1, testi in `LICENZE-FONT.txt`)
- `app/src/main/assets/effetti.js` e `effetti.css` – animazioni e grafica
- `app/src/main/assets/index.html` – l'interfaccia e la logica (memoria, segnalazioni, crea storia)
- `app/src/main/cpp/storie.cpp` – motore AI nativo basato su llama.cpp, con riuso del contesto già elaborato
- `app/src/main/java/.../MainActivity.java` – WebView, download dei modelli, ponte JavaScript ↔ AI
- `.github/workflows/build-apk.yml` – compilazione automatica di APK e AAB
- [`PRIVACY.md`](PRIVACY.md) – informativa sulla privacy

Requisiti Google Play rispettati: Android 16 (API 36), allineamento a 16 KB delle librerie native, schermo edge-to-edge, gesto "indietro" predittivo, pulsante di segnalazione dei contenuti AI.

Storie di pura finzione: personaggi, luoghi privati e organizzazioni sono inventati.
Built with Llama. Llama 3.2 is licensed under the Llama 3.2 Community License, Copyright © Meta Platforms, Inc. All Rights Reserved.
