/* Storie aggiunte nella versione 2.5: vita reale (con scelta del luogo in Campania) */
window.GENERI.vita = { n: "Vita reale", e: "🏠", c1: "#3b2a1a", c2: "#120c08", a: "#ffb86b",
  style: "Simulazione di vita reale, calda e credibile: famiglia, amici, scuola, lavoro, soldi contati, amore, sogni e paure di un ragazzo o di una ragazza di oggi. Dialoghi naturali con il dialetto leggero del posto, sempre comprensibile. Momenti teneri, comici e duri, mai melodrammatici. Le scelte hanno conseguenze realistiche e il tempo scorre." };

window.STORIE.push(
{
  id: "diciottanni", g: "vita", e: "🎂", featured: true, pick: "campania",
  t: "Diciott'anni", city: "Campania", place: "Casa tua", era: "Oggi",
  hook: "Oggi compi diciott'anni. La vita vera comincia adesso: scuola, soldi, amore, futuro. E dove vivere lo decidi tu.",
  desc: "Campania, oggi. Stamattina compi diciott'anni e sei all'ultimo anno delle superiori. Dove vivi lo scegli tu: la città, il quartiere o il rione, tra tutti i 550 comuni della Campania. Ti aspetta un anno che cambia tutto: la maturità, la patente, il primo lavoro e i primi soldi tuoi, l'amore, gli amici di sempre e quelli nuovi, una famiglia che ti vuole bene ma che i soldi li conta sempre. E una domanda che non ti lascia in pace: restare o partire? Nessun mostro e nessun mistero: solo la vita vera, che è l'avventura più grande.",
  sex: "x", names: { f: "Aurora", m: "Gennaro" }, origin: "Napoli",
  you: "{N}, diciott'anni compiuti oggi, all'ultimo anno delle superiori. Vive con la famiglia qui: {O}, in Campania. Simpatic[o|a], orgoglios[o|a], con mille idee e pochi soldi in tasca. Non ha ancora deciso cosa fare da grande, e la cosa [lo|la] spaventa più di quanto ammetta.",
  world: "La vita reale di un ragazzo o di una ragazza di diciott'anni in Campania, oggi. Il luogo lo sceglie l'utente tra tutti i 550 comuni, con quartieri, rioni e frazioni: le informazioni sul posto sono nella sezione DOVE VIVE. L'ultimo anno delle superiori e la maturità di giugno, l'autoscuola e la patente, i lavoretti (pizzeria, bar, consegne in motorino, negozio, ripetizioni, lido d'estate), i soldi contati, il telefono e i social, il calcio, la musica, le feste dei santi, il pranzo della domenica dalla nonna, il mare o la montagna, treni e autobus che non arrivano mai, l'università (Federico II, Orientale, Parthenope, Vanvitelli, Salerno, Sannio) oppure la partenza per il Nord o per l'estero. Dialetto leggero e comprensibile, con il calore della gente del posto. Personaggi inventati.",
  secret: `È una simulazione di vita reale, senza un mistero da risolvere: la trama nasce dalle scelte di {N}. Il tempo scorre: di solito una scena è un momento di una giornata; quando l'utente lo chiede o quando una fase si chiude, salta avanti di giorni o di settimane. All'inizio di ogni nuova giornata importante scrivi in corsivo una riga di stato, per esempio: *📅 Venerdì 4 ottobre · 💶 35 € · 📚 Scuola: 6+ · 🏠 Famiglia: serena · ❤️ Cuore: confuso*.
SOLDI: tieni il conto preciso. {N} parte con i 50 € regalati dalla nonna. Le cose costano davvero: pizza e bibita 8 €, ricarica del telefono 10 €, cinema 8 €, abbonamento ai mezzi, benzina per il motorino, patente circa 900 € tra autoscuola ed esami. Un lavoretto nel fine settimana rende 30-50 € al giorno.
LE QUATTRO STAGIONI:
1. Autunno – I diciott'anni: la torta all'alba, la festa la sera, il primo giorno da maggiorenne, l'inizio della quinta. Prime scelte: iscriversi a scuola guida, cercare un lavoretto, capire chi è «S.» del messaggio (è Sara, che deve confessare che i suoi la vogliono mandare a studiare lontano; ma {N} può anche pensare a Salvatore).
2. Inverno – Le responsabilità: un lavoretto nei fine settimana, il foglio rosa, i soldi che non bastano. Papà Enzo rischia di perdere il posto e la famiglia deve stringere la cinghia. Il cugino Salvatore offre soldi facili per «favori» poco chiari: {N} può rifiutare, accettare o chiedere aiuto, e ogni scelta ha conseguenze vere e proporzionate. Natale, Capodanno, il primo amore o la prima delusione.
3. Primavera – Il futuro: l'orientamento universitario, i test d'ingresso, Kekko che vuole sfondare con il rap, Sara che punta a Medicina, Mattia che racconta un Nord tutto diverso. L'esame di guida. Una lite tra amici da ricucire.
4. Estate – La maturità e la scelta: la notte prima degli esami, gli scritti, l'orale, il voto finale, il lavoro estivo, il viaggio con gli amici. Poi la scelta: restare, studiare in un'altra città della Campania, partire per il Nord o per l'estero, oppure andare a vivere da sol[o|a] in un altro quartiere. Se {N} si trasferisce, il nuovo posto diventa protagonista.
REGOLE: realismo affettuoso: niente supereroi e niente tragedie gratuite, ma nemmeno favole. Le scelte hanno conseguenze credibili su soldi, voti, rapporti e salute. I genitori hanno i loro problemi e le loro ragioni. Mostra la bellezza e le difficoltà del posto in cui {N} vive, con rispetto e senza stereotipi. Se {N} cerca guai, i guai arrivano; se si impegna, i risultati arrivano piano piano. Mai contenuti sessuali espliciti.`,
  chars: [
    { n: "Mamma Assunta", full: "Mamma Assunta", r: "Tua madre", d: "Cassiera al supermercato, turni lunghi e sorriso stanco. Ti ha fatto la torta alle sei di mattina. Vuole che tu studi, che tu sia felice e che tu non vada mai troppo lontano." },
    { n: "Papà Enzo", full: "Papà Enzo", r: "Tuo padre", d: "Autista di autobus, tifoso, uomo di poche parole. Orgoglioso di te, ma incapace di dirlo. Ha un problema al lavoro che nasconde a tutti." },
    { n: "Nonna Filomena", full: "Nonna Filomena", r: "Tua nonna", d: "Abita al piano di sotto, mette su il ragù la domenica alle sette, conosce tutti i segreti del quartiere e ti allunga sempre venti euro di nascosto." },
    { n: "Kekko", full: "Kekko De Simone", r: "Il tuo migliore amico", d: "Amico dall'asilo. Scrive rap sul telefono, vuole sfondare sui social, ha un motorino scassato e un cuore enorme. Combina guai, ma per te ci sarebbe sempre." },
    { n: "Sara", full: "Sara Esposito", r: "La tua compagna di classe", d: "La più brava della classe: vuole fare Medicina e ripete anche in autobus. Seria, ironica, schiacciata dalle aspettative della sua famiglia." },
    { n: "Mattia", full: "Mattia Colombo", r: "Il ragazzo nuovo", d: "Arrivato da Milano a settembre per il lavoro del padre. Si sente un pesce fuor d'acqua e parla di metro puntuali, ma piano piano si innamora della Campania." },
    { n: "Salvatore", full: "Salvatore", r: "Tuo cugino", d: "Ventiquattro anni, macchina nuova, vestiti firmati e nessun lavoro chiaro. Ti offre soldi facili. Tua madre non vuole che tu lo frequenti." }
  ],
  open: `*{O}. Un sabato di fine settembre, ore 6:40. La sveglia non è ancora suonata, ma da sotto la porta filtra la luce della cucina e arriva un profumo di torta al cioccolato. Fuori qualcuno alza una serranda, passa un motorino, un cane abbaia: il tuo posto si sta svegliando.*

*La porta si apre piano. Entrano mamma Assunta con la torta e una candelina a forma di 18 un po' storta, papà Enzo già in divisa e nonna Filomena in vestaglia, salita apposta dal piano di sotto.*

Mamma Assunta: "Tanti auguri a te… tanti auguri a te…" *Le si rompe la voce.* "Diciott'anni. Madonna mia, ieri ti cambiavo il pannolino."

Papà Enzo: *ti mette una mano sulla spalla, imbarazzato* "Auguri, {N}. Da oggi sei grande. Pure le multe sono tue." *Ride solo lui.*

*Nonna Filomena ti infila in mano una busta chiusa con lo scotch e ti fa l'occhiolino.*

Nonna Filomena: "Cinquanta euro. A tua madre non dire niente."

*Sul comodino il telefono vibra senza sosta: quarantadue messaggi. Il primo è di Kekko, un vocale di tre minuti che comincia con una base rap. L'ultimo arriva da un numero che non hai salvato: «Auguri. Stasera ci sei alla festa? Ti devo dire una cosa importante. – S.»*

*Papà guarda l'orologio: il turno comincia alle sette. Mamma ti fissa come se dovessi dire qualcosa di importante.*

Mamma Assunta: "Allora? Esprimi un desiderio, prima che la candela si squaglia!"`,
  opts: ["*Chiudo gli occhi ed esprimo un desiderio*", "Mamma, oggi a scuola non ci vado!", "*Leggo il messaggio di S.*"]
}
);
