/* Storie aggiunte nella versione 2.3: malavita */
window.STORIE.push(

/* ============================== MALAVITA 2.3 ============================== */
{
  id: "riviera", g: "azione", e: "🏎️", featured: true,
  t: "Sole, Soldi e Sirene", city: "San Lucio a Mare", place: "Riviera Romagnola", era: "Oggi",
  hook: "Tre criminali, una città di discoteche e influencer, un colpo impossibile. Benvenuti in Riviera.",
  desc: "San Lucio a Mare, Riviera Romagnola: la città più folle d'Italia. Di giorno spiagge con trentamila ombrelloni, di notte discoteche, influencer e supercar sulla Via Emilia. Tu sei [il pilota|la pilota] che chiamano quando qualcuno deve sparire in fretta. Una notte, dopo una fuga andata male, ti salva un uomo di mezza età in vestaglia di seta: Ruggero Bassani, il più grande rapinatore degli anni Novanta, che vive sotto falso nome con una famiglia impossibile. Pochi giorni dopo un agente corrotto vi ricatta tutti e due. E dalle colline arriva il terzo socio: Tonino «Tornado», il pazzo della Valmarecchia. Serve un colpo grosso. Il più grosso di sempre.",
  sex: "x", names: { f: "Jessica", m: "Ivan" }, origin: null,
  you: "{N} Pazzaglia, 27 anni, nat[o|a] e cresciut[o|a] a San Lucio, meccanic[o|a] in un'officina di pellicole per auto e pilota di fughe a pagamento. Al volante non ha rivali: conosce ogni curva tra il mare e San Marino. Vive in un monolocale sopra una piadineria, ha debiti, un pitbull di nome Biscotto e un sogno: correre sul serio, in pista.",
  world: "Satira criminale in stile videogioco a mondo aperto, ambientata a San Lucio a Mare, città inventata della Riviera Romagnola che mescola Rimini, Riccione e Milano Marittima: spiagge infinite e lidi di lusso, discoteche sulle colline, influencer e reality show, alberghi anni Sessanta, la Via Emilia, l'autostrada A14, le fabbriche di supercar della Motor Valley, la Repubblica di San Marino sul monte, le colline della Valmarecchia. Marchi e aziende sono parodie inventate: le supercar Furetti, l'app Faccialibro, la tv locale Canale Sole, la banca del Monte Titano. Tono: azione adrenalinica e commedia nera, inseguimenti, colpi pianificati, tradimenti e satira dell'Italia di oggi. Personaggi e organizzazioni sono inventati.",
  secret: `STRUTTURA A COLPI: la storia è una serie di colpi, ognuno in tre fasi: preparazione (scegliere squadra, mezzi e piano tra due alternative), esecuzione (con almeno un imprevisto) e fuga (inseguimenti spettacolari). L'utente può chiedere di «passare» a Ruggero o a Tonino: per una scena la narrazione segue quel personaggio, poi torna a {N}.
COLPO 1 – La gioielleria: Ruggero, annoiato dalla vita sotto protezione, vuole un ultimo colpo in una gioielleria del lungomare e ha bisogno di [un pilota|una pilota]. Va quasi bene: ma la collana rubata appartiene all'amante del Cavalier Brando Malatesta, re delle discoteche e candidato sindaco, che ora vuole la testa di chi l'ha toccata.
COLPO 2 – Il ricatto: l'ispettore Mazzanti, del Nucleo Investigativo Antiriciclaggio, corrotto fino al midollo, scopre la vera identità di Ruggero e costringe la banda a lavorare per lui: un furgone portavalori sull'A14, prove da far sparire in una villa, Malatesta da spiare.
COLPO 3 – Le Furetti: Tonino propone il colpo del secolo: rubare cinque supercar prototipo dal treno merci che le porta dalla fabbrica al porto di Ravenna, per un collezionista straniero. Gare clandestine sulla Via Emilia, una pista privata sulle colline.
COLPO 4 – Il Titano: Gilda, ex cassiera di 70 anni con una memoria perfetta e un pappagallo, pianifica il colpo finale: il caveau della Banca del Monte Titano a San Marino, durante la festa con le balestre. Due piani possibili: in silenzio (cunicoli, travestimenti, falsi tecnici) o con il botto (diversivo in piazza, fuga in elicottero).
TRAME PARALLELE: la famiglia di Ruggero (la moglie Sabrina, influencer del benessere; il figlio Kevin, che gioca ai videogiochi tutta la notte; la figlia Asia, che vuole entrare in un reality); «La Via del Respiro», un centro benessere che ricicla soldi per Malatesta; Mazzanti che alla fine vuole tradire tutti. Finali: la banda si salva tradendo Mazzanti, oppure Malatesta, oppure qualcuno tradisce gli altri; {N} sceglie chi salvare.
REGOLE: ritmo da videogioco, inseguimenti raccontati con energia (marce, curve, sirene, sorpassi), satira pungente ma mai volgare, violenza solo accennata e con conseguenze. Il denaro facile ha sempre un prezzo. I piani sono cinematografici, mai istruzioni reali per commettere reati.`,
  chars: [
    { n: "Ruggero", full: "Ruggero «il Notaio» Bassani", r: "Il rapinatore in pensione", d: "52 anni, leggenda dei colpi anni Novanta, vive sotto falso nome in una villa con le palme. Elegante, nevrotico, va dallo psicologo e non sa stare fermo." },
    { n: "Tonino", full: "Tonino «Tornado» Gualtieri", r: "Il pazzo delle colline", d: "Vive in Valmarecchia tra roulotte, galline e un furgone di piadine abusive. Imprevedibile, esplosivo, stranamente leale." },
    { n: "Mazzanti", full: "Ispettore Fabrizio Mazzanti", r: "L'agente corrotto", d: "Del Nucleo Investigativo Antiriciclaggio. Sorriso da presentatore tv, coscienza in affitto. Usa la legge come un piede di porco." },
    { n: "Malatesta", full: "Cavalier Brando Malatesta", r: "Il re della Riviera", d: "Padrone di discoteche, lidi e tv locali, candidato sindaco. Si fa chiamare «il Signore della Notte». Non perdona." },
    { n: "Gilda", full: "Gilda Fabbri", r: "La pianificatrice", d: "70 anni, ex cassiera di banca con memoria perfetta. Pianifica colpi da un salotto pieno di centrini, con il pappagallo Ottavio." },
    { n: "Sabrina", full: "Sabrina Bassani", r: "La moglie di Ruggero", d: "Influencer del benessere con mezzo milione di follower. Non sa niente del passato del marito. O forse sa tutto." }
  ],
  open: `*San Lucio a Mare, Riviera Romagnola. Sabato notte, ore 2:14. Il lungomare è illuminato come un flipper. Sei al volante di una berlina tedesca rubata da venti minuti, con due tizi sui sedili di dietro che hanno appena svuotato la cassa di una discoteca e adesso urlano.*

Tizio: "Più veloce! Più veloce!"

*Dietro di voi, tre volanti della Polizia a sirene spiegate. Una quarta vi sbarra la strada davanti al Grand Hotel. Freno a mano, testacoda, imbocchi un vialetto tra due alberghi, sfiori un monopattino, sali su un marciapiede, scendi in un parcheggio di pullman. Le sirene si allontanano. Per un attimo.*

*La berlina sputa fumo e muore in mezzo a una strada di ville con le palme. Gli altri due scappano a piedi, ognuno per conto suo. Sei sol[o|a].*

*Il cancello della villa davanti a te si apre. Esce un uomo di mezza età, con una vestaglia di seta viola, un sigaro spento in bocca e un bicchiere di vino rosso in mano.*

Ruggero: "Freno a mano tirato con la terza ancora dentro. Elegante, ma la frizione ti odierà per sempre." *Guarda le luci blu che tornano in fondo alla strada.* "Hai circa quaranta secondi. Puoi correre, e ti prendono al semaforo. Oppure entri, mi aiuti a scegliere un vino, e domattina parliamo di lavoro."

*Le sirene si avvicinano. Dalla finestra della villa una signora bionda in tuta da yoga sta facendo una diretta con il telefono.*`,
  opts: ["*Entro nella villa*", "E tu chi diavolo sei?", "*Scappo verso la spiaggia*"]
},

{
  id: "gioia-tauro", g: "malavita", e: "🚢",
  t: "Container 41", city: "Gioia Tauro", place: "Porto container", era: "Oggi",
  hook: "Dentro un container di banane c'è abbastanza cocaina da comprare una città. Tu l'hai visto.",
  desc: "Calabria, oggi. Gioia Tauro è uno dei porti più grandi del Mediterraneo: gru alte come grattacieli, navi da diecimila container che arrivano dal Sudamerica. Sei [un giovane ispettore|una giovane ispettrice] delle Dogane, appena trasferit[o|a] da Torino nella terra dei tuoi nonni. Durante un controllo a sorpresa, nel container 41 trovi trecento chili di cocaina nascosti tra le casse di banane. Ma qualcuno fa sparire il verbale prima ancora che tu lo firmi. E da quella mattina tutti, in porto e in paese, sembrano sapere come ti chiami.",
  sex: "x", names: { f: "Serena", m: "Andrea" }, origin: null,
  you: "{N} Arcuri, 29 anni, ispett[ore|rice] dell'Agenzia delle Dogane, cresciut[o|a] a Torino da genitori calabresi emigrati. Laureat[o|a] in ingegneria, precis[o|a], testard[o|a], idealista. Ha chiesto il trasferimento a Gioia Tauro per stare vicino alla nonna Peppina, che vive da sola a Palmi e conosce tutti.",
  world: "La Piana di Gioia Tauro, oggi: il porto container con le gru e le navi giganti, gli uliveti secolari, gli agrumeti, i paesi arrampicati sull'Aspromonte, Palmi e la Costa Viola, le feste patronali con le processioni e i fuochi. La 'ndrangheta è una rete di famiglie, le 'ndrine, unite da sangue, matrimoni e riti; controlla il traffico di cocaina dal Sudamerica, appalti e voti, e ha uomini dentro il porto. Ma ci sono anche magistrati coraggiosi, preti di frontiera, giovani che vogliono restare e cambiare le cose. Personaggi, famiglie e clan sono inventati: non nominare mai cosche, boss o processi reali.",
  secret: `ATTO 1 – Il container: il verbale sparisce; il capoturno Saverio Lamanna dice che è stato «un errore di sistema»; il collega Mimmo Scordo è gentile, troppo gentile. Nonna Peppina avverte: «Qua il mare ha le orecchie». Nell'auto di {N} compare una busta con una foto della nonna al mercato.
ATTO 2 – La famiglia: il carico appartiene ai Malacrìa di Sant'Elia d'Aspromonte, paese inventato. Il patriarca Don Rocco, 80 anni, vive come un contadino e decide tutto. Il nipote Antonio, laureato in economia a Milano, gestisce i soldi e vuole modernizzare il clan. Antonio corteggia {N} con intelligenza e fascino, e offre un patto: guardare dall'altra parte, in cambio di sicurezza per la nonna e di una carriera tranquilla.
ATTO 3 – La talpa: Mimmo Scordo è l'uomo dei Malacrìa in porto, ma c'è anche una fuga di notizie in Procura. La procuratrice antimafia Caterina Sorbara, che vive sotto scorta, chiede a {N} di restare al suo posto e fingersi corruttibile, per intercettare il prossimo carico in arrivo dall'Ecuador e scoprire chi tradisce. La grande riunione dei capi è fissata durante la festa del santuario della Madonna delle Nevi, in montagna, a settembre.
ATTO 4 – La scelta: il carico, la processione, il blitz. Colpo di scena: nonna Peppina da giovane fu fidanzata con Don Rocco e conosce un segreto che può distruggerlo, il bunker nascosto sotto l'uliveto. Finali: diventare testimone, tornare a Torino, cedere ad Antonio, proteggere la nonna, far cadere i Malacrìa.
REGOLE: tensione da thriller, atmosfera del Sud vera e mai stereotipata; mostra anche i calabresi onesti, che sono la maggioranza. Violenza solo accennata. Il crimine ha sempre un costo umano visibile.`,
  chars: [
    { n: "Peppina", full: "Nonna Peppina", r: "Tua nonna", d: "83 anni, vedova, coltiva bergamotti e prega tutte le mattine. Conosce ogni famiglia della Piana e i loro segreti di sessant'anni fa." },
    { n: "Antonio", full: "Antonio Malacrìa", r: "Il nipote del boss", d: "32 anni, laurea a Milano, abiti su misura e modi gentili. Parla di finanza come un banchiere e di onore come un nonno." },
    { n: "Don Rocco", full: "Don Rocco Malacrìa", r: "Il patriarca", d: "80 anni, vive in una casa semplice tra gli ulivi e va a messa ogni giorno. Una sola parola sua vale più di cento leggi." },
    { n: "Mimmo", full: "Mimmo Scordo", r: "Il collega di turno", d: "Simpatico, pieno di consigli, ti porta il caffè ogni mattina. Ha una villa troppo grande per uno stipendio da doganiere." },
    { n: "Sorbara", full: "Dottoressa Caterina Sorbara", r: "La procuratrice antimafia", d: "Vive sotto scorta da dieci anni. Ironica, stanchissima, incorruttibile. Si fida di pochissime persone." },
    { n: "Lamanna", full: "Saverio Lamanna", r: "Il capoturno", d: "A un anno dalla pensione, vuole solo che non succeda niente. Ha paura, e la paura lo rende complice." }
  ],
  open: `*Porto di Gioia Tauro. Martedì, ore 5:40. Pioviggina. Le gru, alte come grattacieli, sono accese come alberi di Natale, e la nave dall'Ecuador sta ancora scaricando. Il container 41 è aperto davanti a te: odore di banane mature, di plastica, di gasolio.*

*Il cane antidroga si è seduto e non vuole più muoversi. Tra le casse di banane, sotto un doppio fondo, ci sono panetti avvolti nel nastro marrone, tutti con lo stesso timbro: uno scorpione.*

*Mimmo Scordo, il collega del turno, si avvicina con due caffè in mano. Guarda i panetti, poi guarda te. Smette di sorridere per un secondo. Poi sorride di nuovo.*

Mimmo: "Mannaggia, {N}. Al primo mese. Sei nat[o|a] con la camicia, tu." *Ti porge il caffè.* "Senti a me: adesso chiamiamo il capoturno, facciamo le cose con calma, eh? Con calma."

*Il capoturno Lamanna arriva in pigiama sotto il giaccone. Guarda il container senza avvicinarsi troppo.*

Lamanna: "Sigilliamo tutto. Il verbale lo facciamo in ufficio, alle otto, quando arriva il comandante. Voi due andate a casa a dormire."

*Alle otto, in ufficio, il verbale non c'è più. Nel sistema il container 41 risulta controllato e regolare, con la tua firma digitale. E sul parabrezza della tua auto c'è una busta bianca. Dentro, una sola fotografia: tua nonna Peppina al mercato di Palmi, mentre compra i fichi.*`,
  opts: ["*Torno dentro e cerco Lamanna*", "*Chiamo subito la nonna*", "Mimmo, che cosa sta succedendo qui?"]
},

{
  id: "terra-fuochi", g: "malavita", e: "🔥",
  t: "La Terra dei Fuochi", city: "Caserta", place: "Masseria delle bufale", era: "2013",
  hook: "Le tue bufale si ammalano. Di notte, nei campi vicini, qualcuno brucia qualcosa.",
  desc: "Campania, 2013. Hai ereditato da tuo padre una masseria di bufale tra Caserta e il mare, e con la mozzarella più buona della provincia stai salvando l'azienda dai debiti. Ma le bufale cominciano ad ammalarsi, e di notte, nei campi abbandonati, si alzano roghi neri che puzzano di plastica. Un camion senza targa scarica fusti nella cava dietro casa. Quando chiami i carabinieri, il giorno dopo arriva un avvocato gentilissimo con una proposta: comprare la tua terra al doppio del prezzo. Rifiutare non è previsto.",
  sex: "x", names: { f: "Assunta", m: "Gennaro" }, origin: null,
  you: "{N} Della Corte, 32 anni, allevat[ore|rice] di bufale, laureat[o|a] in agraria a Portici. Ha lasciato un buon lavoro a Bologna per salvare la masseria del padre, morto due anni fa. Orgoglios[o|a], testard[o|a], innamorat[o|a] della sua terra fino all'ostinazione.",
  world: "La provincia tra Napoli e Caserta nel 2013: campagne fertili da millenni e avvelenate in pochi decenni da rifiuti tossici sepolti e bruciati illegalmente, i roghi notturni, le discariche abusive nelle cave, i paesi dove i funerali di persone giovani sono troppi. Industrie del Nord e di mezza Europa risparmiano sullo smaltimento, i clan della camorra incassano, alcuni funzionari chiudono un occhio. Ma ci sono anche madri, preti, medici, agricoltori e giornalisti che manifestano, analizzano, denunciano. Mozzarella di bufala, masserie, la Reggia di Caserta, il litorale Domizio. Personaggi, clan e aziende sono inventati: non nominare mai boss, clan o processi reali.",
  secret: `ATTO 1 – I fusti: {N} trova i fusti nella cava; il veterinario Raffaele Sepe trova metalli pesanti nel latte; per legge la produzione va distrutta e l'azienda rischia di fallire. L'avvocato Achille Fontana offre di comprare tutta la terra per un «parco fotovoltaico». Se {N} rifiuta, di notte qualcuno apre i recinti e le bufale scappano sulla statale.
ATTO 2 – Il sistema: Fontana lavora per Zi' Gaetano Funaro, detto 'o Sindaco, che controlla il giro dei rifiuti nella zona. Dietro di lui c'è un intermediario del Nord, l'ingegner Paolo Ghidini, educato e freddo, che cambia le etichette ai rifiuti industriali facendoli passare per innocui. La giornalista Lucia Martone di un giornale online indaga da mesi; Padre Alfonso guida le marce delle madri con le foto dei figli malati.
ATTO 3 – Il cugino: Salvatore, il cugino di {N}, guida di notte i camion del clan: gli servono soldi per curare la figlia. Ha una mappa dei luoghi dove sono sepolti i fusti. Denunciarlo, salvarlo, o convincerlo a parlare.
ATTO 4 – La guerra: le minacce crescono; un incendio nella stalla; la grande marcia delle madri a Napoli; il processo. Finali: vendere e andare via, combattere con la giornalista e la magistratura, usare la mappa di Salvatore per far cadere 'o Sindaco e svelare le aziende del Nord, bonificare la terra e ricominciare.
REGOLE: denuncia sociale e tensione: il veleno non si vede, e proprio per questo fa paura. Mostra la bellezza della terra e la dignità di chi resiste. Violenza solo accennata, malattie raccontate con rispetto.`,
  chars: [
    { n: "Lucia", full: "Lucia Martone", r: "La giornalista", d: "28 anni, scrive per un giornale online che non la paga quasi mai. Ha perso la madre per un tumore e non si ferma davanti a niente." },
    { n: "Sepe", full: "Dottor Raffaele Sepe", r: "Il veterinario", d: "Sessant'anni, burbero e onesto, conosce ogni bufala della provincia. Ha paura per sé, ma più ancora per gli animali." },
    { n: "Fontana", full: "Avvocato Achille Fontana", r: "L'intermediario", d: "Abiti di lino, profumo costoso, parla di progresso e di energia pulita. Non alza mai la voce, e non ne ha bisogno." },
    { n: "'o Sindaco", full: "Zi' Gaetano Funaro, detto 'o Sindaco", r: "Il boss della zona", d: "Settant'anni, una masseria fortificata e una cappella privata. Finanzia la festa del santo e decide chi lavora e chi no." },
    { n: "Salvatore", full: "Salvatore Della Corte", r: "Tuo cugino", d: "Camionista, padre di una bambina malata. Di notte guida camion senza targa. Se ne vergogna, e non sa come smettere." },
    { n: "Padre Alfonso", full: "Padre Alfonso", r: "Il parroco", d: "Prete di periferia, guida le marce delle madri con le foto dei figli. Dal pulpito dice nomi che nessuno osa dire." }
  ],
  open: `*Campagna tra Caserta e il mare. Una notte di giugno del 2013, ore 3. Ti sveglia l'odore: plastica bruciata, dolciastra, che entra dalle finestre chiuse. Dalla stalla arriva un lamento lungo. È Regina, la bufala più vecchia della masseria, quella che tuo padre chiamava per nome.*

*Esci in maglietta. Oltre il canale, nei campi abbandonati, si alza una colonna di fumo nero illuminata dal basso da un fuoco arancione. Non è il primo. Da quando sei tornat[o|a] ne hai contati undici.*

*Regina tossisce. Ha gli occhi lucidi e non mangia da due giorni.*

*Poi senti un motore. Dietro la masseria, dove c'è la vecchia cava di tufo, i fari di un camion sono accesi. Ti avvicini piano, tra le canne. Due uomini con le mascherine stanno facendo rotolare dei fusti gialli giù per la scarpata. Uno dei fusti si apre e cola qualcosa di denso, che fuma nell'erba.*

*Senza volerlo, pesti un ramo secco. I due uomini si fermano. Una torcia si accende e ti punta dritto in faccia.*

Voce: "Ué. Chi è là?"

*Dietro la luce, riconosci la voce. È quella di tuo cugino Salvatore.*`,
  opts: ["Salvatore… sei tu?", "*Mi butto a terra tra le canne*", "*Scatto una foto alla targa*"]
},

{
  id: "non-pago", g: "malavita", e: "🍰",
  t: "Io Non Pago", city: "Palermo", place: "Pasticceria vicino a Ballarò", era: "Oggi",
  hook: "Hai aperto la pasticceria dei tuoi sogni. Il terzo giorno qualcuno ti incolla la serratura.",
  desc: "Palermo, oggi. Dopo anni a Parigi, sei tornat[o|a] a casa per aprire «Zucchero», la pasticceria che sognavi fin da bambin[o|a], a due passi dal mercato di Ballarò. Cannoli, cassate, granite al gelso: la fila arriva fino in strada. Il terzo giorno trovi la serratura piena di colla e un biglietto: «Mettiti a posto». Il quarto giorno un signore anziano e gentilissimo compra dieci cannoli, li paga il doppio e ti spiega che il quartiere ha delle regole. Pagare il pizzo, come hanno fatto tutti per generazioni, o diventare la persona che dice no?",
  sex: "x", names: { f: "Rosalia", m: "Totò" }, origin: null,
  you: "{N} Lo Verde, 30 anni, pasticcer[e|a] cresciut[o|a] all'Albergheria, format[o|a] in una grande pasticceria di Parigi. Creativ[o|a], orgoglios[o|a], allergic[o|a] alle prepotenze. Ha investito nel negozio tutti i risparmi e un prestito garantito dalla madre, che fa la sarta da quarant'anni.",
  world: "Palermo oggi: il centro storico arabo-normanno, i mercati di Ballarò e della Vucciria, i vicoli dell'Albergheria, le chiese barocche, il Festino di Santa Rosalia a luglio, il mare di Mondello. Cosa Nostra è più silenziosa di un tempo ma ancora presente: il pizzo come segno di controllo del territorio, lo spaccio, le scommesse, i favori. Molti commercianti però si ribellano: associazioni antiracket, adesivi contro il pizzo nelle vetrine, clienti che scelgono i negozi liberi, carabinieri e magistrati che proteggono chi denuncia. Personaggi, famiglie e mandamenti sono inventati: non nominare mai boss o processi reali.",
  secret: `ATTO 1 – L'avvertimento: la colla nella serratura, il biglietto, poi la visita di Zu' Nunzio Russello, anziano ed elegante, che chiede «un pensiero per le famiglie dei carcerati». Suo nipote Gaspare, detto il Biondo, 22 anni, aspetta fuori sullo scooter: lui è la parte che non sorride. Marta, che gestisce il bar accanto, paga da anni e implora {N} di fare lo stesso.
ATTO 2 – La rete: {N} conosce Davide Lupo, volontario del Comitato Senza Pizzo, e la capitana dei carabinieri Elena Ferlito. Se denuncia, arrivano la protezione, la solidarietà di molti clienti, ma anche l'isolamento: il caseificio smette di vendergli la ricotta, i fornitori spariscono, qualcuno scrive insulti sulla saracinesca.
ATTO 3 – Il segreto: Giusy, 17 anni, apprendista bravissima, è la sorella di Gaspare e sogna di studiare pasticceria a Parigi. Mamma Rosa confessa che anche il padre di {N} pagava il pizzo per la sua bottega, e che Zu' Nunzio era stato il suo migliore amico d'infanzia: fu lui a «proteggerli» quando il padre si ammalò. Il debito, per la mafia, non si estingue mai.
ATTO 4 – Il processo e il Festino: durante il Festino di Santa Rosalia, tra il carro e i fuochi d'artificio, la resa dei conti. Il processo in cui {N} deve testimoniare, Gaspare che vuole vendicarsi, Giusy che deve scegliere tra la famiglia e il futuro. Finali: testimoniare e restare, tornare a Parigi, aiutare Giusy a scappare, smascherare Zu' Nunzio senza distruggere la memoria del padre.
REGOLE: commedia amara e tensione civile: la bellezza di Palermo, il profumo dei dolci, la paura che si respira. La gente comune è il cuore della storia. Violenza solo accennata.`,
  chars: [
    { n: "Zu' Nunzio", full: "Zu' Nunzio Russello", r: "L'uomo del pizzo", d: "75 anni, cappello di feltro e modi da gentiluomo. Chiama tutti «figlio mio» e non dimentica mai un debito." },
    { n: "Gaspare", full: "Gaspare «il Biondo» Russello", r: "Il nipote", d: "22 anni, scooter, catena d'oro e rabbia da vendere. Vuole dimostrare allo zio di essere un uomo." },
    { n: "Giusy", full: "Giusy Russello", r: "La tua apprendista", d: "17 anni, mani d'oro per la pasta di mandorle. Sorella di Gaspare. Sogna Parigi e ha paura di dirlo a casa." },
    { n: "Davide", full: "Davide Lupo", r: "Il Comitato Senza Pizzo", d: "Ex commerciante che ha denunciato e ha perso tutto, poi ha ricominciato. Sa quanto costa dire no, e lo dice comunque." },
    { n: "Ferlito", full: "Capitana Elena Ferlito", r: "I carabinieri", d: "Catanese, diretta e ironica. Ti promette protezione, ma ti avverte: la protezione non è una passeggiata." },
    { n: "Mamma Rosa", full: "Rosa Lo Verde", r: "Tua madre", d: "Sarta da quarant'anni, ha garantito il tuo prestito. Ti ama, ha paura per te e nasconde un segreto sul tuo papà." }
  ],
  open: `*Palermo, Albergheria. Giovedì, ore 6:05. Il quartiere si sveglia piano: le serrande di Ballarò che si alzano, il primo pescivendolo che urla, l'odore di pane e di gelsomino. Arrivi davanti a «Zucchero» con le chiavi in mano e le scorze di cannolo da friggere che ti aspettano.*

*La chiave non entra. Dentro la serratura c'è colla, dura come pietra. Sulla vetrina, attaccato con lo scotch, un biglietto scritto a penna in stampatello: «METTITI A POSTO».*

*Ci metti un'ora a forzare la porta. Alle otto apri lo stesso. Alle nove c'è già la fila.*

*Alle dieci entra un signore anziano, con il cappello di feltro e il bastone. Tutti in fila si fanno da parte senza che lui dica niente. Guarda la vetrina dei cannoli con occhi da intenditore.*

Zu' Nunzio: "Dieci cannoli, figlio mio. Con la ricotta di pecora, quella vera." *Mette sul bancone una banconota da cento.* "Tenga il resto. Lei è [il figlio|la figlia] della signora Rosa, la sarta, vero? Brava gente. Suo padre, buonanima, era un amico. Sapeva come funziona il quartiere."

*Prende il pacchetto, sorride, e si avvicina un poco.*

Zu' Nunzio: "Le cose belle vanno protette. Ci pensi con calma. Passo la settimana prossima."

*Fuori, appoggiato a uno scooter nero, un ragazzo biondo con la catena d'oro ti fissa attraverso la vetrina. Non ha comprato niente.*`,
  opts: ["Non ho bisogno di protezione, grazie.", "*Gli restituisco la banconota*", "Lei conosceva mio padre?"]
},

{
  id: "motoscafi", g: "malavita", e: "🚤",
  t: "I Motoscafi Blu", city: "Brindisi", place: "Porto e Adriatico", era: "1991–1996",
  hook: "Di notte, sull'Adriatico, i motoscafi blu volano a cento all'ora carichi di sigarette. Tu sei al timone.",
  desc: "Brindisi, 1991. Il lavoro non c'è, ma di notte il mare diventa un'autostrada: motoscafi blu potentissimi attraversano l'Adriatico dal Montenegro e dall'Albania, carichi di casse di sigarette, «le bionde», e le scaricano sulle spiagge sotto il naso della Guardia di Finanza. Hai 19 anni, nessuno sente il mare come te, e un ragazzo del quartiere ti offre in una notte quello che tuo padre guadagnava in un mese. È solo contrabbando, dicono tutti. Finché un giorno, nelle casse, non ci sono più solo sigarette.",
  sex: "x", names: { f: "Annalisa", m: "Cosimo" }, origin: null,
  you: "{N} De Pascalis, 19 anni, figli[o|a] di un pescatore di Brindisi rimasto invalido dopo un incidente in mare. Al timone è un fenomeno: legge le onde al buio e sente il vento prima che arrivi. Ha una sorellina, Ilenia, che vuole far studiare, e un debito con la banca per la barca del padre.",
  world: "Il Salento e l'Adriatico dal 1991 al 1996: Brindisi con il porto e i quartieri popolari, le spiagge e le calette verso Otranto, le masserie, le discoteche sul mare. Il contrabbando di sigarette con i motoscafi blu è un'economia che dà da vivere a migliaia di famiglie, tollerata da molti; poi arrivano droga, armi e traffico di persone. Sullo sfondo l'esodo degli albanesi nel 1991 con le navi stracariche, la guerra nei Balcani, gli inseguimenti in mare con la Guardia di Finanza, un'organizzazione criminale locale che si impone con la forza. Personaggi e clan sono inventati: non nominare mai boss o processi reali.",
  secret: `ATTO 1 – Le bionde: {N} entra nella squadra di Totò Spagnolo, detto 'u Gattu, che organizza gli sbarchi notturni. Marilena coordina le vedette con le ricetrasmittenti; mezzo quartiere scende in spiaggia a scaricare le casse. Le prime corse: adrenalina, soldi, fughe a cinquanta nodi. Il brigadiere della Finanza Nicola Ruggiero, amico d'infanzia di {N}, comanda la motovedetta che dà la caccia ai motoscafi.
ATTO 2 – La Corona: un'organizzazione nuova, la Corona, impone una tassa su ogni cassa. La comanda dal carcere il Professore, freddo e istruito. Vuole usare i motoscafi per portare droga e armi dai Balcani. Nell'agosto 1991 {N} vede al porto migliaia di albanesi disperati arrivati su una nave stracarica, e capisce che il mare porta anche il dolore degli altri.
ATTO 3 – Il carico: una notte di tempesta il carico non sono sigarette: sono persone, famiglie con bambini, stipate su un gommone da trainare. Il fornitore montenegrino Dragan vuole sbrigarsi; la Finanza è vicina. {N} deve scegliere: obbedire, rifiutare, o salvare quelle persone a costo di tutto.
ATTO 4 – L'ultima corsa, 1996: lo Stato stringe la morsa, i motoscafi vengono sequestrati uno dopo l'altro, la Corona elimina chi sa troppo. Finali: consegnare la Corona a Nicola, fuggire in Montenegro, prendere il posto di 'u Gattu, salvare Marilena e Ilenia e ricominciare onestamente con la pesca.
REGOLE: adrenalina in mare, nostalgia, dramma sociale: il contrabbando come «lavoro» di un popolo senza lavoro, e la discesa verso qualcosa di molto peggio. Inseguimenti in mare descritti con energia; violenza solo accennata.`,
  chars: [
    { n: "'u Gattu", full: "Totò Spagnolo, detto 'u Gattu", r: "Il capo degli sbarchi", d: "40 anni, baffi, occhiali da sole anche di notte. Simpatico e generoso con il quartiere, spietato con chi sbaglia un orario." },
    { n: "Marilena", full: "Marilena Caliandro", r: "La regina delle vedette", d: "20 anni, ricetrasmittente sempre in mano, conosce le frequenze della Finanza a memoria. Vuole andarsene a Milano." },
    { n: "Nicola", full: "Brigadiere Nicola Ruggiero", r: "La Guardia di Finanza", d: "Tuo amico d'infanzia, ora comanda una motovedetta. Leale alla divisa, ma non vuole arrestare il suo quartiere." },
    { n: "Il Professore", full: "Il Professore", r: "Il capo della Corona", d: "Comanda dal carcere con lettere e messaggeri. Parla in italiano perfetto e cita i classici. Nessuno l'ha mai visto arrabbiato." },
    { n: "Dragan", full: "Dragan", r: "Il fornitore montenegrino", d: "Ex ufficiale di marina, ride sempre e paga in contanti. Vende qualsiasi cosa a chiunque." },
    { n: "Ilenia", full: "Ilenia De Pascalis", r: "Tua sorella", d: "12 anni, la più brava della classe, vuole diventare medico. Non sa dove vai di notte, ma lo sospetta." }
  ],
  open: `*Mare Adriatico, a dodici miglia da Brindisi. Una notte di giugno del 1991, ore 1:30. Niente luna. Il motoscafo blu scivola sull'acqua nera con i motori al minimo: sette metri di scafo, due motori enormi, cento casse di sigarette legate sotto i teloni. Al timone ci sei tu.*

*Totò 'u Gattu, seduto a poppa con gli occhiali da sole, si accende una sigaretta coprendo la fiamma con la mano.*

'u Gattu: "Visto? Bastava chiedere. Tuo padre era il miglior pescatore del porto, tu sei [il miglior pilota|la migliore pilota] della costa. Stanotte ti prendi due milioni di lire, e domani paghi la banca."

*La ricetrasmittente gracchia. È la voce di Marilena, dalla terraferma.*

Marilena: "Gatto, Gatto, qui Lucciola. La spiaggia è pulita, i ragazzi aspettano. Ma la Finanza è uscita dal porto dieci minuti fa. Ripeto: la Finanza è fuori."

*In quel momento, a sud, si accende un faro bianco che spazza il mare. Poi un altro. Una motovedetta, veloce, che punta dritta verso di voi. Sulla prua riconosci una sagoma: è Nicola, il tuo amico d'infanzia, con il megafono in mano.*

'u Gattu: *butta la sigaretta in acqua* "Allora, campione? Fammi vedere che sai fare."`,
  opts: ["*Spingo i motori al massimo*", "*Spengo tutto e resto al buio*", "Gatto, è Nicola. Non lo semino."]
},

{
  id: "re-di-roma", g: "malavita", e: "👑",
  t: "I Re di Roma", city: "Roma", place: "Borgata del Trullo", era: "1977–1982",
  hook: "Sei ragazzi di borgata decidono di prendersi Roma. Ci riusciranno. Il prezzo sarà tutto.",
  desc: "Roma, 1977. La città è in fiamme: cortei, scontri, sequestri, l'eroina che arriva nelle borgate. Sei nat[o|a] al Trullo, rubi automobili e sogni di uscire dalla miseria. Una notte, in una bisca di Trastevere, incontri Claudio Vitale, detto il Principe: un ragazzo di borgata con l'aria da re e un'idea folle, unire tutte le bande della città in una sola e prendersi Roma. Colpi all'ippodromo, droga, amicizie pericolose con uomini dei servizi segreti e del potere. La vostra scalata sarà velocissima. Ma a Roma i re non muoiono mai di vecchiaia.",
  sex: "x", names: { f: "Monica", m: "Fabrizio" }, origin: null,
  you: "{N} Santoni, 20 anni, cresciut[o|a] al Trullo con la madre che fa le pulizie negli uffici dell'EUR e un fratello minore, Mauro. Ladr[o|a] d'auto velocissim[o|a], ha un fiuto incredibile per i soldi e per le persone. Ama Roma con tutto il cuore e la conosce da sotto: fogne, sotterranei, scorciatoie.",
  world: "Roma tra il 1977 e il 1982, gli anni di piombo: le borgate povere (Trullo, Magliana, Tufello, Primavalle), il centro storico, Trastevere, l'ippodromo, le bische, i night club di via Veneto, i palazzi del potere. Cortei e scontri, terrorismo rosso e nero sullo sfondo, l'eroina che devasta i ragazzi, servizi segreti deviati, logge segrete, banchieri e faccendieri in affari torbidi. Romanesco leggero e comprensibile. Personaggi e banda sono inventati: non nominare mai criminali, politici o terroristi reali né fatti di cronaca reali.",
  secret: `ATTO 1 – L'unione, 1977: il Principe convince quattro piccole bande a diventare una sola: {N} alle auto, Sergio Pantanella detto Er Pantera, pugile del Tufello, ai muscoli, Ugo Marchetti detto lo Svizzero, contabile elegante, ai soldi. Il primo colpo: la cassa dei bookmaker all'ippodromo, nel giorno del gran premio. Funziona. Con quei soldi la banda compra il mercato dell'eroina di mezza città.
ATTO 2 – La scalata, 1978-80: soldi, macchine, night club, rispetto. Un uomo misterioso, che tutti chiamano il Dottore, si presenta come amico di «gente importante»: offre protezione e impunità in cambio di favori (nascondere armi, far sparire documenti, spaventare un testimone). Il commissario Lorenzo Rinaldi comincia a dare la caccia alla banda. Mauro, il fratello di {N}, entra nel giro dell'eroina.
ATTO 3 – Le crepe, 1981: il Principe diventa paranoico; Er Pantera tratta di nascosto con una banda rivale; lo Svizzero porta soldi all'estero. Rinaldi offre un patto a {N}. Mauro sta male, e la colpa è anche della banda.
ATTO 4 – La caduta, 1982: tradimenti tra amici, il Dottore che vuole «fare pulizia» di chi sa troppo. Finali: collaborare con la giustizia, salvare o tradire il Principe, fuggire in Sudamerica, portare via Mauro e la madre dalla borgata.
REGOLE: epica criminale e tragedia: l'ascesa è eccitante, la caduta inevitabile. Mostra sempre il costo per le famiglie e per i quartieri. Violenza solo accennata; la droga distrugge, non è mai glamour.`,
  chars: [
    { n: "Il Principe", full: "Claudio «il Principe» Vitale", r: "Il capo", d: "23 anni, cresciuto alla Magliana, legge libri di storia e veste come un attore. Carismatico, visionario, ogni giorno un po' più pericoloso." },
    { n: "Er Pantera", full: "Sergio «Er Pantera» Pantanella", r: "Il pugile", d: "Ex promessa della boxe del Tufello. Forte come un toro, buono con i bambini, geloso del Principe fino all'odio." },
    { n: "Lo Svizzero", full: "Ugo «lo Svizzero» Marchetti", r: "Il contabile", d: "Occhiali d'oro, completi grigi, ex impiegato di banca. Conta i soldi della banda e un po' anche i suoi." },
    { n: "Il Dottore", full: "Il Dottore", r: "L'uomo dei servizi", d: "Nessuno sa il suo nome vero. Cappotto blu, voce bassa, amici nei palazzi. Ogni suo favore va restituito." },
    { n: "Rinaldi", full: "Commissario Lorenzo Rinaldi", r: "La Squadra Mobile", d: "Quarantenne, divorziato, ostinato. Odia la droga perché gli ha portato via un fratello. Ti capisce più di quanto ti piacerebbe." },
    { n: "Mauro", full: "Mauro Santoni", r: "Tuo fratello", d: "17 anni, ti adora e ti imita in tutto. È la persona che vuoi proteggere di più, e quella che rischi di perdere per prima." }
  ],
  open: `*Roma, Trastevere. Una notte di novembre del 1977. In una cantina sotto una trattoria, venti uomini giocano a carte nel fumo delle sigarette. Sul tavolo ci sono più soldi di quanti tu ne abbia mai visti. Sei venut[o|a] a vendere un'Alfa GT rubata due ore fa, e il compratore non si è presentato.*

*Al tavolo più in fondo, un ragazzo con un cappotto di cammello e i capelli pettinati all'indietro sta vincendo tutto. Non guarda le carte: guarda le facce degli altri. Poi guarda te.*

Il Principe: "Tu sei [quello|quella] del Trullo che apre una Giulia in dieci secondi. Ti ho vist[o|a] l'altra sera a Monteverde. Pulito. Bello." *Spinge una pila di banconote verso la sedia vuota.* "Siediti."

*Ti siedi. Lui raccoglie le carte e le mescola con le mani di un prestigiatore.*

Il Principe: "Lo sai qual è il problema di questa città? Che è piena di re piccoli. Ognuno col suo quartiere, la sua bisca, il suo pezzettino. E nessuno che si prenda tutto." *Sorride.* "Io voglio prendermi tutto. E mi servono sei persone di cui fidarmi. Tu sei la prima che mi viene in mente."

*In quel momento qualcuno bussa forte alla porta della cantina. Tre colpi, una pausa, altri due: il segnale del palo. Arriva la polizia. Gli uomini ai tavoli si alzano tutti insieme.*`,
  opts: ["Conosco un'uscita dalle fogne. Seguimi!", "Perché proprio io?", "*Prendo i soldi e scappo*"]
},

{
  id: "ostia", g: "malavita", e: "🏖️",
  t: "Il Mare di Roma", city: "Ostia", place: "Stabilimento «La Conchiglia»", era: "Oggi",
  hook: "Fai [il bagnino|la bagnina] in uno stabilimento di Ostia. Il nuovo proprietario non ha mai fatto un bagno in vita sua.",
  desc: "Ostia, estate. La spiaggia di Roma: chilometri di stabilimenti, ombrelloni in fila, il pontile, la pineta, i palazzoni del lungomare e le case popolari dietro. Fai [il bagnino|la bagnina] alla Conchiglia, lo stabilimento storico della famiglia Baldini, dove sei cresciut[o|a]. Quest'estate la Conchiglia cambia padrone: la compra una famiglia di Nuova Ostia che ha palestre, sale scommesse e mezza spiaggia. I clienti di sempre spariscono, le cabine diventano magazzini, e una notte, durante il giro di controllo, trovi in acqua un ragazzo ferito che ti supplica di non chiamare nessuno.",
  sex: "x", names: { f: "Debora", m: "Daniele" }, origin: null,
  you: "{N} Ricci, 26 anni, [bagnino|bagnina] e istrut[tore|trice] di nuoto, cresciut[o|a] tra la Conchiglia e le case popolari di Nuova Ostia. Ha lasciato l'università per mantenere la madre. Nuota come un pesce, conosce tutti, ride sempre, e finora ha sempre evitato di sapere troppo.",
  world: "Ostia e il litorale romano oggi: il lungomare con gli stabilimenti balneari e i chioschi, il pontile, la pineta di Castel Fusano, le case popolari di Nuova Ostia, le palestre di pugilato, il porto turistico, i locali notturni, la Roma che d'estate si sposta al mare. Famiglie criminali locali si contendono spiagge, spaccio e usura, con alleanze tra clan storici e nuovi arrivati, imprenditori compiacenti e qualche funzionario corrotto; ci sono anche giornalisti, preti e associazioni che denunciano. Personaggi, famiglie e clan sono inventati: non nominare mai clan, boss o processi reali.",
  secret: `ATTO 1 – La Conchiglia: il vecchio signor Baldini è stato costretto a vendere ai Corsetti dopo mesi di minacce. Il patriarca Nando Corsetti, detto er Faraone, vuole usare lo stabilimento per riciclare soldi e controllare la spiaggia. Suo figlio Brandon, pugile, simpatico e violento, diventa il capo di {N}. Il ragazzo trovato in acqua è Jacopo, 17 anni, piccolo spacciatore che ha rubato ai Corsetti una borsa di soldi e un telefono pieno di segreti.
ATTO 2 – Il ragazzo: {N} nasconde Jacopo in una cabina chiusa. I Corsetti lo cercano casa per casa. La giornalista Valeria Conti indaga sulle concessioni balneari e capisce che {N} sa qualcosa. Nel telefono di Jacopo ci sono foto di funzionari del Comune che prendono buste nei bar della spiaggia.
ATTO 3 – La palestra: Brandon vuole {N} come braccio destro per gestire il chiosco e i lettini, cioè i soldi sporchi. C'è attrazione e paura. La vera mente della famiglia è Sora Loredana, la madre, che tiene i conti in una cartoleria. Il signor Baldini prepara una sua vendetta.
ATTO 4 – Ferragosto: la grande festa in spiaggia, la notte dei fuochi, il blitz della polizia. Finali: consegnare il telefono a Valeria o alla polizia, salvare Jacopo, cedere ai Corsetti, riprendersi la Conchiglia con il signor Baldini.
REGOLE: estate, sole, sale e paura: l'atmosfera di una spiaggia popolare romana raccontata con affetto e verità. Romanesco leggero e comprensibile. Violenza solo accennata.`,
  chars: [
    { n: "Er Faraone", full: "Nando Corsetti, detto er Faraone", r: "Il nuovo padrone", d: "60 anni, abbronzatura perenne, catene d'oro e camicie aperte. Fa beneficenza in parrocchia e paura in tutta Nuova Ostia." },
    { n: "Loredana", full: "Sora Loredana Corsetti", r: "La moglie del Faraone", d: "Gestisce una cartoleria e tiene i conti della famiglia su quaderni a quadretti. È lei che decide davvero." },
    { n: "Brandon", full: "Brandon Corsetti", r: "Il figlio pugile", d: "24 anni, campione regionale dei pesi medi, sorriso da cinema. Ti tratta come un amico, finché non lo contraddici." },
    { n: "Jacopo", full: "Jacopo Ferrante", r: "Il ragazzo in acqua", d: "17 anni, magro, spaventato, furbo. Ha rubato alla famiglia sbagliata e ora ha solo te." },
    { n: "Valeria", full: "Valeria Conti", r: "La giornalista", d: "Scrive per un quotidiano romano, ha già ricevuto minacce e una testata, e non ha smesso. Ostinata e ironica." },
    { n: "Baldini", full: "Signor Ernesto Baldini", r: "Il vecchio proprietario", d: "75 anni, ha costruito la Conchiglia con le sue mani nel 1968. Ti ha insegnato a nuotare. Non ha accettato di perderla." }
  ],
  open: `*Ostia, stabilimento La Conchiglia. Fine giugno, ore 23:40. Lo stabilimento è chiuso, gli ombrelloni sono legati, il mare è piatto e nero. Fai l'ultimo giro di controllo con la torcia, come ogni sera da quando avevi sedici anni.*

*Da tre giorni la Conchiglia è dei Corsetti. Il signor Baldini se n'è andato piangendo, con una scatola di foto sotto il braccio. Oggi hanno tolto la sua targa dall'ingresso e appeso un'insegna nuova, dorata.*

*Mentre passi vicino al pattino di salvataggio, senti uno sciabordio. Qualcuno, in acqua, a pochi metri dalla riva, si aggrappa alla boa e ansima.*

*Corri, entri in acqua fino alla vita, lo trascini sulla sabbia. È un ragazzo, avrà diciassette anni. Ha un taglio sulla fronte, i vestiti fradici, e stringe al petto un marsupio come se fosse la cosa più preziosa del mondo.*

Jacopo: "Non chiamare nessuno… ti prego. Non chiamare l'ambulanza, non chiamare la polizia. Se mi trovano, mi ammazzano."

*Dal lungomare arriva il rombo di due moto. I fari si fermano davanti all'ingresso dello stabilimento. Una voce che conosci chiama il tuo nome. È Brandon Corsetti, il tuo nuovo capo.*

Brandon: "{N}! Ce sei? Hai visto passà un ragazzino? Magro, felpa grigia. Ce deve una cosa."`,
  opts: ["*Nascondo Jacopo nella cabina*", "Qui non è passato nessuno!", "Jacopo, che cosa hai fatto?"]
},

{
  id: "rien-ne-va-plus", g: "malavita", e: "🎰",
  t: "Rien ne va plus", city: "Venezia", place: "Casinò sul Canal Grande", era: "1982–1988",
  hook: "Lavori come croupier al Casinò di Venezia. Il cliente più generoso della sala ti chiede di aiutarlo a svuotarlo.",
  desc: "Venezia, 1982. Lavori come croupier al Casinò, in un palazzo antico sul Canal Grande: lampadari di Murano, fiches, tappeti rossi, gondole che aspettano i giocatori. Una sera di nebbia si siede al tuo tavolo un uomo di Chioggia, figlio di pescatori, che ama l'opera e gioca come un principe: Rodolfo Scarpa, detto il Doge. In pochi anni diventerà il capo della Mala della Laguna: rapine, gioco d'azzardo, droga, evasioni spettacolari. Vuole te dalla sua parte. E tu, a Venezia, ti stai annoiando da morire.",
  sex: "x", names: { f: "Marina", m: "Alvise" }, origin: null,
  you: "{N} Bon, 25 anni, croupier del Casinò di Venezia, nat[o|a] a Cannaregio da una famiglia di maestri vetrai di Murano caduta in rovina. Mani velocissime, memoria per i numeri, gusto per il rischio. Conosce Venezia di notte meglio di chiunque, e ha una madre piena di debiti con un usuraio di Mestre.",
  world: "Venezia e la terraferma veneta negli anni Ottanta: il Casinò in un palazzo sul Canal Grande, le sale da gioco private, le calli deserte di notte, Chioggia e i suoi pescatori, la Riviera del Brenta con le ville, Mestre e Marghera con le fabbriche, il Lido d'inverno, l'aeroporto, il Carnevale, l'acqua alta, la nebbia. Una banda locale cresce dal nulla fino a controllare gioco d'azzardo, rapine, droga e protezioni, con complicità in polizia e in politica. Personaggi e banda sono inventati: non nominare mai criminali o processi reali.",
  secret: `ATTO 1 – Il tavolo, 1982: il Doge gioca forte, perde con eleganza e lascia mance enormi. Poi propone a {N} di dargli informazioni: chi sono i giocatori ricchi, quando arrivano i soldi, come funziona la sala conta. Il capo croupier Ottavio Barbaro è rigidissimo e sospettoso. Nives, compagna e cervello del Doge, è l'unica che lo fa ragionare.
ATTO 2 – Il colpo del Carnevale, 1983: maschere, gondole, il ballo nel palazzo e la sala conta piena di contanti. Se {N} partecipa, il colpo riesce in modo spettacolare e {N} diventa il volto pulito della banda, che ricicla i soldi al Casinò. Il commissario Giulia Tagliapietra della Squadra Mobile apre un fascicolo.
ATTO 3 – L'impero, 1985-86: la banda cresce: droga dai Balcani, una rapina all'aeroporto, accordi con organizzazioni del Sud, guardie corrotte, un'evasione dal carcere in motoscafo. Il Doge diventa sempre più teatrale e crudele. Nives vuole uscirne e chiede aiuto a {N}. Bepi Boscolo, il pescatore che guida i motoscafi, è l'unico amico vero.
ATTO 4 – Rien ne va plus, 1988: la commissaria offre un accordo; il Doge prepara la fuga in Sudamerica e un tradimento. Finali: collaborare, fuggire con Nives, prendere il posto del Doge, salvare la madre e sparire.
REGOLE: noir lagunare elegante: atmosfere di nebbia, velluto e acqua, il fascino del rischio e il suo prezzo. Dialetto veneziano leggero e comprensibile. Violenza solo accennata.`,
  chars: [
    { n: "Il Doge", full: "Rodolfo «il Doge» Scarpa", r: "Il capo della Mala della Laguna", d: "35 anni, figlio di pescatori di Chioggia, ama l'opera e le giacche di velluto. Generoso, teatrale, imprevedibile come l'acqua alta." },
    { n: "Nives", full: "Nives Zennaro", r: "La compagna del Doge", d: "Ex contabile di una vetreria, mente lucida e occhi tristi. Tiene in piedi la banda e sogna di scappare da tutti." },
    { n: "Barbaro", full: "Ottavio Barbaro", r: "Il capo croupier", d: "Trent'anni di Casinò, guanti bianchi e memoria da elefante. Non ha mai perdonato un errore." },
    { n: "Tagliapietra", full: "Commissario Giulia Tagliapietra", r: "La Squadra Mobile", d: "Veneziana di Castello, figlia di un gondoliere. Paziente come una pescatrice, prima o poi tira su la rete." },
    { n: "Bepi", full: "Bepi «Sardèla» Boscolo", r: "Il pilota dei motoscafi", d: "Pescatore di Chioggia, conosce ogni canale e ogni secca della laguna. Ride sempre e non tradirebbe mai un amico." },
    { n: "Ninetta", full: "Ninetta Bon", r: "Tua madre", d: "Ex signora di Murano, oggi piena di debiti con un usuraio di Mestre. Ti ama e ti chiede soldi, nello stesso respiro." }
  ],
  open: `*Venezia, Casinò. Una sera di novembre del 1982, ore 23:15. Fuori la nebbia è così fitta che le gondole sembrano sospese nel vuoto. Dentro, sotto i lampadari di Murano, il tuo tavolo di roulette è l'unico affollato.*

*Al centro c'è lui: giacca di velluto blu, capelli neri, mani da pescatore piene di anelli. Gioca sempre sul 17 e sui suoi vicini. Ha perso venti milioni in un'ora e sorride come se stesse vincendo.*

Il Doge: "Lo sa, {N}? Mio nonno diceva che il 17 porta sfortuna solo a chi ha paura." *Spinge una montagna di fiches verso di te.* "Questa è per lei. Per le mani. Ha le mani più veloci di Venezia."

*Ottavio Barbaro, il capo croupier, ti fissa dall'altra parte della sala. Le mance così grandi vanno registrate. E segnalate.*

*Lanci la pallina. Gira, gira, rimbalza. Si ferma sul 17. La sala esplode. Il Doge non guarda nemmeno il tavolo: guarda te.*

Il Doge: *a voce bassa, chinandosi* "Dopo il turno, al traghetto di Santa Sofia. Le offro un'ombra di vino e un lavoro molto meglio pagato di questo. Non se ne pentirà."

*Ritira la vincita, lascia tutto il resto sul tavolo come mancia, e se ne va nella nebbia. Barbaro ti si avvicina con il registro in mano.*

Barbaro: "{N}. Quanto le ha lasciato, quel signore?"`,
  opts: ["Tutto registrato, signor Barbaro.", "*Nascondo una parte delle fiches*", "Chi è quell'uomo?"]
},

{
  id: "lambrate", g: "malavita", e: "🎲",
  t: "Le Notti di Lambrate", city: "Milano", place: "Bisca dietro la stazione", era: "1974–1977",
  hook: "Servi whisky in una bisca di periferia. Una notte entrano tre rapinatori, e il capo ti lascia la sua parte del bottino.",
  desc: "Milano, 1974. La città del boom ha una periferia che non dorme: bische nascoste nei retrobottega, night club, rapine in banca quasi ogni giorno, sequestri di persona. Lavori dietro il bancone della bisca di Zio Mario, dietro la stazione di Lambrate, per pagarti la scuola serale. Una notte entrano tre rapinatori con le calze sulla faccia. Il capo si scopre il viso solo davanti a te, ti lascia sul bancone una banconota da centomila lire e un biglietto per la Scala. È Ennio Galli, detto il Maestro: ex insegnante di musica, il rapinatore più elegante d'Italia. E ha appena deciso che gli porterai fortuna.",
  sex: "x", names: { f: "Ornella", m: "Walter" }, origin: null,
  you: "{N} Brambilla, 22 anni, barista della bisca di Zio Mario a Lambrate. Di giorno lavora in una tipografia, di sera studia ragioneria, di notte versa whisky ai giocatori. Figli[o|a] di un operaio morto in fabbrica, ha la lingua tagliente, un fratello di 16 anni da tenere lontano dai guai e un sogno: un bar tutto suo in centro.",
  world: "Milano tra il 1974 e il 1977: la periferia operaia (Lambrate, Quarto Oggiaro, la Comasina, Baggio), le fabbriche, le case di ringhiera, i Navigli, i night club del centro, la Galleria, la Scala, il carcere di San Vittore. Bische clandestine e mala milanese: rapine, sequestri di persona, regolamenti di conti, l'eroina che arriva, i clan del Sud che si insediano al Nord. Gli anni di piombo sullo sfondo: cortei, terrorismo, una polizia sotto pressione, commissari duri e giornali della sera. Personaggi e bande sono inventati: non nominare mai criminali o processi reali.",
  secret: `ATTO 1 – Il Maestro, 1974: Galli corteggia {N} con la cultura e con i soldi: la Scala, i libri, le cene nei ristoranti del centro. Zio Mario, il padrone della bisca, è pieno di debiti con Don Saro Arcadi, un calabrese arrivato da poco che vuole prendersi le bische di mezza Milano. Il commissario Aurelio Malberti, detto il Mastino, comincia a frequentare il bancone di {N}.
ATTO 2 – Il sequestro, 1975: Don Saro organizza il rapimento della figlia diciassettenne di un industriale della Brianza e vuole usare la banda del Maestro. Galli è contrario ai sequestri di ragazzi, ma è in debito. {N} scopre per caso dove tengono la ragazza: una cascina in Lomellina. Lalla, la cantante del night, sa più di quanto dice.
ATTO 3 – San Vittore, 1976: Galli viene arrestato dopo una rapina andata male. {N} diventa il suo contatto con l'esterno. Il Mastino fa pressione: se {N} non collabora, arresterà Gino, il fratello, che ha cominciato a fare il palo per la banda. Galli prepara un'evasione impossibile.
ATTO 4 – L'ultimo colpo, 1977: il Maestro vuole un ultimo colpo e poi la Francia. Finali: fuggire con lui, consegnarlo, salvare la ragazza rapita, far cadere Don Saro, aprire finalmente il bar in centro con soldi puliti.
REGOLE: noir milanese anni Settanta: nebbia, tram, jazz, Alfa Romeo, sigarette, la città che cambia in fretta. Il fascino del bandito gentiluomo e la realtà sporca del crimine. Violenza solo accennata; la ragazza rapita non subisce violenze descritte.`,
  chars: [
    { n: "Il Maestro", full: "Ennio «il Maestro» Galli", r: "Il rapinatore gentiluomo", d: "45 anni, ex insegnante di pianoforte. Cappotto di cachemire, citazioni di Verdi, mai un colpo di pistola. Ma i soldi devono arrivare." },
    { n: "Zio Mario", full: "Zio Mario Colombo", r: "Il padrone della bisca", d: "60 anni, ex partigiano diventato biscazziere. Buono, stanco, pieno di debiti. Ti vuole bene come a [un figlio|una figlia]." },
    { n: "Il Mastino", full: "Commissario Aurelio Malberti", r: "La Squadra Mobile", d: "Detto il Mastino perché quando morde non lascia più. Burbero, onesto, beve solo acqua tonica." },
    { n: "Don Saro", full: "Don Saro Arcadi", r: "Il nuovo padrone delle bische", d: "Calabrese, sguardo gentile, voce bassissima. È arrivato a Milano da due anni e vuole già tutto." },
    { n: "Lalla", full: "Lalla", r: "La cantante del night", d: "Voce roca, occhi verdi, amante del Maestro. Sorride a tutti e non si fida di nessuno." },
    { n: "Gino", full: "Gino Brambilla", r: "Tuo fratello", d: "16 anni, ammira i banditi dei giornali e vuole diventare come loro. Tu vuoi solo che finisca la scuola." }
  ],
  open: `*Milano, dietro la stazione di Lambrate. Un sabato di febbraio del 1974, ore 2 di notte. Fuori nebbia e tram che passano vuoti. Dentro la bisca di Zio Mario: tre tavoli di poker, fumo che non se ne va mai, un juke-box che suona Mina. Tu sei dietro il bancone a lavare bicchieri.*

*La porta si spalanca. Entrano tre uomini con le calze di nylon sulla faccia e i fucili a canne mozze. Il primo spara un colpo al soffitto. Calcinacci. Silenzio.*

Rapinatore: "Mani sul tavolo, signori. Nessuno si fa male, nessuno fa l'eroe."

*In due minuti svuotano i tavoli e la cassa. Zio Mario è bianco come il muro. Il capo dei tre, alto, elegante anche con la calza in testa, si avvicina al bancone. Si toglie la calza. Ha i capelli grigi, gli occhi chiari, l'aria di un professore.*

Il Maestro: "Mi scusi per il disturbo. Lei è la sola persona qui dentro che non ha tremato." *Posa sul bancone una banconota da centomila lire e un cartoncino.* "Per lo spavento. E per il silenzio. Martedì danno la Traviata alla Scala: un palco, il numero è sul biglietto. Mi piacerebbe sapere cosa ne pensa."

*Si rimette la calza, fa un piccolo inchino e se ne va con gli altri. Fuori, una macchina parte sgommando nella nebbia.*

*Zio Mario si lascia cadere su una sedia. Poi guarda la banconota sul bancone. Poi guarda te.*

Zio Mario: "Ma ti… ti conosci quel lì?"`,
  opts: ["Mai visto in vita mia, giuro.", "*Nascondo il biglietto della Scala*", "Zio, chiamiamo la polizia?"]
},

{
  id: "supramonte", g: "malavita", e: "🐑",
  t: "Supramonte", city: "Barbagia", place: "Grotte del Supramonte", era: "1984",
  hook: "Sei un giovane pastore. Ti chiedono di custodire una cosa in una grotta. La cosa è un ragazzino rapito.",
  desc: "Barbagia, Sardegna, agosto 1984. Hai 20 anni e porti le pecore di tuo padre al pascolo sul Supramonte, tra gole profonde, boschi di lecci e grotte che conosci da quando eri bambin[o|a]. Una notte arrivano tre uomini incappucciati con un fagotto: un ragazzino di 12 anni rapito in Costa Smeralda, figlio di un industriale milanese. Il tuo compito è nasconderlo in una grotta e dargli da mangiare finché la famiglia non pagherà il riscatto. Se rifiuti, la tua famiglia paga per te. Se obbedisci, diventi uno di loro. Il ragazzino si chiama Luca, e ha paura del buio.",
  sex: "x", names: { f: "Bastiana", m: "Bachisio" }, origin: null,
  you: "{N} Pira, 20 anni, pastor[e|a] di Sas Rocas, paese inventato della Barbagia. Conosce ogni sentiero e ogni sorgente del Supramonte, suona le launeddas, parla sardo e un italiano imparato a scuola e alla televisione. Orgoglios[o|a], silenzios[o|a], legat[o|a] al codice d'onore del suo paese, che però comincia a star[gli|le] stretto.",
  world: "La Barbagia e il Supramonte nel 1984: altopiani di calcare, gole profonde, grotte, boschi di lecci, ovili di pietra, paesi di pastori con i murales sui muri, il codice barbaricino della vendetta e dell'ospitalità, la diffidenza verso lo Stato. I sequestri di persona: bande di pastori e latitanti che rapiscono persone ricche e le nascondono per mesi tra le montagne, con emissari, riscatti e mediatori. I carabinieri venuti dal continente, gli elicotteri, i giornalisti, la Costa Smeralda dei ricchi a poche ore di strada. La cultura sarda va raccontata con rispetto. Personaggi e bande sono inventati: non nominare mai sequestri, banditi o processi reali.",
  secret: `ATTO 1 – La grotta: la banda è guidata da Zio Bore Serra, vecchio latitante rispettato da tutti; suo nipote Juanne è violento e impaziente. Il padre di {N}, Antoni, ha un antico debito d'onore con Zio Bore: per questo hanno scelto {N}. Luca ha 12 anni, gli occhiali rotti e una paura terribile del buio.
ATTO 2 – Le settimane: tra {N} e Luca nasce un legame: storie, stelle, pecore, canzoni. La trattativa passa attraverso un emissario, il prete di Nuoro Don Peppino Mele. Il capitano dei carabinieri Marco Bellini, venuto dal continente, è intelligente e prova davvero a capire la Barbagia. Il pagamento del riscatto va storto e la banda si innervosisce.
ATTO 3 – Il segno: Juanne vuole fare del male a Luca per «mandare un segno» alla famiglia e spaventarla. {N} deve impedirlo, a qualunque costo. Zio Bore esita: è vecchio e stanco, ma non può perdere la faccia davanti ai suoi.
ATTO 4 – La fuga: {N} scappa con Luca attraverso le gole del Supramonte verso i carabinieri, inseguit[o|a] dalla banda e da chi lo considera un traditore. Il codice d'onore spezzato, le conseguenze per la famiglia, la verità davanti a tutto il paese. Finali: salvare Luca, proteggere la famiglia, testimoniare, oppure trovare una via d'uscita che nessuno si aspetta.
REGOLE: dramma morale in un paesaggio maestoso; la cultura sarda raccontata con rispetto, mai come folklore. Violenza solo accennata. Il ragazzino non subisce mai violenze descritte.`,
  chars: [
    { n: "Luca", full: "Luca Fumagalli", r: "Il ragazzino rapito", d: "12 anni, milanese, occhiali rotti, ama i fumetti e le stelle. Ha paura del buio, ma è più coraggioso di quanto creda." },
    { n: "Zio Bore", full: "Zio Bore Serra", r: "Il capo della banda", d: "60 anni, latitante da venti. Parla poco, ascolta tutto, rispetta solo la parola data. È stanco, ma non può mostrarlo." },
    { n: "Juanne", full: "Juanne Serra", r: "Il nipote", d: "25 anni, rabbioso e impaziente. Vuole i soldi subito e disprezza chi ha pietà." },
    { n: "Antoni", full: "Babbo Antoni Pira", r: "Tuo padre", d: "Pastore come suo padre e suo nonno. Ha un debito d'onore con Zio Bore che non ti ha mai spiegato." },
    { n: "Bellini", full: "Capitano Marco Bellini", r: "I carabinieri", d: "Bolognese, 35 anni, ha studiato la Barbagia sui libri e la sta imparando sul campo. Non vuole un'altra tragedia." },
    { n: "Don Peppino", full: "Don Peppino Mele", r: "Il prete mediatore", d: "Prete di Nuoro, fa da tramite tra le famiglie e i rapitori. Conosce i segreti di tutti e non tradisce nessuno." }
  ],
  open: `*Supramonte, Barbagia. Una notte d'agosto del 1984, ore 2. Il cielo è pieno di stelle fino a terra. Nell'ovile di pietra le pecore dormono; tu sei svegli[o|a] accanto al fuoco, con il fucile di tuo padre appoggiato al muro.*

*I cani abbaiano, poi tacciono di colpo: hanno riconosciuto qualcuno. Dal buio escono tre uomini con il passamontagna. Il più vecchio si toglie il cappuccio: è Zio Bore Serra. Tutti in paese sanno chi è. Nessuno l'ha mai visto da vicino.*

*Gli altri due portano un fagotto avvolto in una coperta militare. Lo posano a terra. Dalla coperta escono due scarpe da ginnastica e una voce piccola, che singhiozza.*

Zio Bore: "{N} Pira. Tuo padre mi deve una cosa da trent'anni, e stanotte la paga con te." *Indica il fagotto.* "Questo lo porti alla grotta di Su Mannu, quella con l'ingresso dietro il leccio bruciato. Gli dai da mangiare, gli dai da bere, non gli fai vedere la tua faccia. Fra un mese, forse due, torna a casa sua."

*Juanne, il nipote, ride e dà un calcio alla coperta.*

Juanne: "E se fa storie, gli insegni l'educazione."

*La coperta si muove. Spunta la testa di un ragazzino con gli occhiali rotti, il viso sporco di terra e lacrime.*

Luca: "Per favore… dov'è la mia mamma? Per favore, non spegnete la luce."`,
  opts: ["Zio Bore, io questo non lo faccio.", "*Mi inginocchio vicino a Luca*", "Che debito ha mio padre con voi?"]
},

{
  id: "cantiere", g: "malavita", e: "🏗️",
  t: "Il Cantiere", city: "Milano e Brianza", place: "Cantieri dell'Expo", era: "2013–2015",
  hook: "Devi finire un padiglione in tempo per l'Expo. Il fornitore più veloce è anche il più pericoloso.",
  desc: "Milano, 2013. Mancano due anni all'Expo e la città è un cantiere enorme: padiglioni, strade, metropolitane, miliardi di euro e scadenze impossibili. Sei [un giovane ingegnere|una giovane ingegnera] dell'impresa di costruzioni di famiglia, in Brianza, e se non consegni un padiglione in tempo l'azienda fallisce. Un imprenditore calabrese gentile e sorridente ti offre camion, operai e calcestruzzo a metà prezzo, subito. Funziona. Troppo bene. Poi un operaio cade da un'impalcatura, e nessuno sembra averlo mai assunto.",
  sex: "x", names: { f: "Federica", m: "Stefano" }, origin: null,
  you: "{N} Colombo, 31 anni, ingegner[e|a] civile laureat[o|a] al Politecnico di Milano, figli[o|a] del fondatore della Colombo Costruzioni di Seregno, ditta con quarant'anni di storia e un mare di debiti. Ambizios[o|a], precis[o|a], lavora sedici ore al giorno e crede che tutto si possa risolvere con i numeri.",
  world: "Milano e la Brianza tra il 2013 e il 2015: i cantieri dell'Expo, i grattacieli nuovi, le villette con i capannoni, le banche, i bar dove si fanno affari, le sagre di paese, i circoli dove si festeggiano battesimi e matrimoni. La 'ndrangheta al Nord quasi non spara: compra, presta, ricicla, entra nel movimento terra, negli appalti, nella sanità e nella politica locale attraverso imprenditori in apparenza puliti. Ci sono anche investigatori dell'antimafia, giornalisti e imprenditori che dicono no. Personaggi, aziende e clan sono inventati: non nominare mai clan, inchieste o politici reali.",
  secret: `ATTO 1 – L'offerta: Cosimo Rèfano, titolare della Rèfano Scavi, offre a {N} tutto quello che serve, subito e a metà prezzo. Il padre di {N}, Ernesto, è malato e la banca sta per chiudere i fidi. L'operaio caduto, Mihai, romeno, lavorava in nero per Rèfano; la sorella Ioana cerca giustizia e trova solo porte chiuse.
ATTO 2 – Il debito: Rèfano diventa socio di fatto: fatture gonfiate, preventivi falsi, assunzioni di «amici». {N} scopre che il calcestruzzo fornito da Rèfano non rispetta le norme: il padiglione potrebbe essere pericoloso. L'assessore regionale Gianni Ferrario prende voti e favori da Rèfano. Il capitano Davide Brambati della Direzione Investigativa Antimafia comincia a fare domande.
ATTO 3 – La festa: {N} viene invitat[o|a] a un battesimo in un circolo della Brianza: lì scopre la «locale», la cellula del clan al Nord, e conosce Zio Ciccio Rèfano, arrivato dalla Calabria, l'uomo che decide davvero. Le minacce diventano personali: la casa del padre, la sorella, il lavoro di quarant'anni.
ATTO 4 – L'inaugurazione, maggio 2015: l'Expo apre, il mondo guarda, il collaudo del padiglione. Finali: denunciare e perdere l'azienda, collaborare con la DIA sotto copertura, affondare con Rèfano, salvare l'onore della famiglia e ottenere giustizia per Mihai.
REGOLE: thriller economico e morale: la mafia in giacca e cravatta, il fascino dei soldi facili, la fatica di restare onesti. Ritmo da serie tv, dialoghi milanesi e calabresi credibili. Violenza solo accennata.`,
  chars: [
    { n: "Rèfano", full: "Cosimo Rèfano", r: "L'imprenditore", d: "45 anni, camicia bianca, orologio d'oro, sorriso aperto. Risolve tutti i problemi. In cambio vuole solo «un po' di fiducia»." },
    { n: "Ernesto", full: "Ernesto Colombo", r: "Tuo padre", d: "Ha fondato l'impresa con le sue mani nel 1973. Malato, orgoglioso, non sopporterebbe di vederla fallire." },
    { n: "Ioana", full: "Ioana Popescu", r: "La sorella dell'operaio", d: "Infermiera in un ospedale di Monza. Vuole sapere chi pagava suo fratello e perché nessuno lo conosce." },
    { n: "Brambati", full: "Capitano Davide Brambati", r: "La DIA", d: "Brianzolo come te, ostinato e paziente. Sa che al Nord la mafia non spara: fattura." },
    { n: "Ferrario", full: "Assessore Gianni Ferrario", r: "Il politico", d: "Amico di tutti, ospite di tutte le sagre. Prende i voti dove capita e non fa mai domande." },
    { n: "Zio Ciccio", full: "Zio Ciccio Rèfano", r: "Il capo vero", d: "70 anni, viene dalla Calabria due volte l'anno, per i battesimi e per i conti. Nessuno lo contraddice." }
  ],
  open: `*Cantieri dell'Expo, periferia di Milano. Lunedì, ore 7:10. Nebbia bassa, fango dappertutto, gru che girano sopra la tua testa. Il padiglione che la tua impresa deve consegnare è ancora uno scheletro di cemento. Mancano sette mesi all'inaugurazione e sei settimane alla scadenza della banca.*

*Il telefono vibra: è tuo padre, dall'ospedale.*

Ernesto: "Allora? Ce la facciamo? Dimmi solo di sì, che i medici dicono che non devo agitarmi."

*Mentre rispondi, un SUV nero si ferma davanti alla recinzione. Ne scende un uomo in camicia bianca, con le scarpe pulitissime in mezzo al fango. Ti tende la mano.*

Rèfano: "Ingegner Colombo? Cosimo Rèfano, Rèfano Scavi. Mi hanno detto che è un po' indietro." *Sorride e indica la strada: arrivano otto camion, uno dietro l'altro, con il suo nome sulle portiere.* "Calcestruzzo, ruspe, venti operai. Da oggi. A metà prezzo dei suoi fornitori. Ci pensa lei a ringraziarmi, più avanti, con calma."

*Dal ponteggio arriva un urlo, poi un tonfo sordo. Un operaio è a terra, immobile. Corri. Gli operai di Rèfano si guardano tra loro, nessuno si avvicina.*

Rèfano: *calmissimo, al telefono* "Sì, Franco. Un ragazzo è caduto. Vienilo a prendere tu, con la macchina tua. L'ambulanza no."`,
  opts: ["Chiamo il 118. Subito.", "*Mi inginocchio vicino all'operaio*", "Ma questo ragazzo chi l'ha assunto?"]
},

{
  id: "gargano", g: "malavita", e: "🌲",
  t: "Foresta Umbra", city: "Vieste", place: "Gargano", era: "Oggi",
  hook: "Di giorno spiagge da cartolina. Di notte, nella foresta, una guerra che nessuno racconta.",
  desc: "Gargano, Puglia, luglio. Sei [il nuovo comandante|la nuova comandante] della stazione dei carabinieri di Vieste, trasferit[o|a] dal Trentino: cinquemila abitanti d'inverno, centomila d'estate. Spiagge bianche, grotte marine, trabucchi, la Foresta Umbra con i suoi faggi giganteschi. Dietro le cartoline, una mafia giovane e feroce, che si combatte senza regole per la droga e le estorsioni. Il tuo primo giorno un turista denuncia la scomparsa del suo cane nella foresta. Il cane torna da solo, con un portafoglio tra i denti: appartiene a un ragazzo scomparso tre anni fa.",
  sex: "x", names: { f: "Elisa", m: "Paolo" }, origin: null,
  you: "{N} Dallapiccola, 35 anni, [maresciallo|marescialla] dei carabinieri, nat[o|a] a Trento. Montanar[o|a] metodic[o|a], ha lavorato dieci anni nei nuclei investigativi del Nord. Ironic[o|a], tenace, abituat[o|a] alla neve più che al sole: il mare d'estate l'ha visto quasi solo in fotografia.",
  world: "Il Gargano oggi: Vieste, Peschici, Mattinata, Monte Sant'Angelo con il santuario di San Michele, la Foresta Umbra, le grotte marine, i trabucchi, le masserie, Manfredonia, San Severo e la pianura del Tavoliere. La criminalità garganica nasce da antiche faide tra famiglie di allevatori e si è trasformata in un sistema violento: droga dall'Albania, estorsioni a lidi e ristoranti, assalti ai portavalori, regolamenti di conti nei boschi, omertà fortissima. Turismo di massa d'estate, paesi vuoti d'inverno. Personaggi, famiglie e clan sono inventati: non nominare mai clan, boss o processi reali.",
  secret: `ATTO 1 – Il portafoglio: apparteneva a Saverio Lecce, 19 anni, scomparso tre anni fa. La madre, Donna Maria Lecce, non ha mai smesso di cercarlo e non si è mai fidata dei carabinieri. Il brigadiere Rocco Prencipe, garganico, conosce tutti e consiglia a {N} di «non svegliare i cani che dormono». In paese comandano due famiglie in guerra: i Tòtaro e i Russolillo.
ATTO 2 – La faida: un lido che non paga viene incendiato; scoppia di nuovo la guerra tra le due famiglie. {N} scopre nella foresta una grava, una voragine carsica profonda, dove negli anni sono spariti molti uomini. Lucia Mazzone, che ha un ristorante sul porto, paga il pizzo a tutti e due i clan e sa chi ordinò di far sparire Saverio.
ATTO 3 – Il sangue: il segreto di Prencipe: suo figlio lavora per i Tòtaro, e lui ha coperto la sparizione di Saverio per proteggerlo. Totò Tòtaro, 22 anni, nipote del boss, vuole uscire dal clan e offre informazioni in cambio di protezione. Ma in caserma c'è una talpa.
ATTO 4 – San Michele: la processione del 29 settembre a Monte Sant'Angelo, il blitz, la verità su Saverio. Finali: arrestare Zi' Peppe Russolillo, salvare Totò, smascherare Prencipe o dargli la possibilità di confessare, restituire a Donna Maria un corpo da piangere.
REGOLE: noir del Sud tra mare e bosco: bellezza abbagliante e silenzio ostile. Indizi concreti, testimoni che hanno paura, scelte morali. Violenza solo accennata.`,
  chars: [
    { n: "Prencipe", full: "Brigadiere Rocco Prencipe", r: "Il tuo vice", d: "Garganico, 55 anni, conosce ogni famiglia e ogni sentiero. Ti protegge, ti consiglia, ti nasconde qualcosa." },
    { n: "Donna Maria", full: "Donna Maria Lecce", r: "La madre di Saverio", d: "Vedova, veste di nero da tre anni. Cerca il figlio ogni giorno nella foresta e non si fida di nessuna divisa." },
    { n: "Totò", full: "Totò Tòtaro", r: "Il ragazzo del clan", d: "22 anni, nipote del boss. Ha visto troppe cose e vuole uscirne, ma nel suo mondo chi esce non esce mai vivo." },
    { n: "Lucia", full: "Lucia Mazzone", r: "La ristoratrice del porto", d: "Il miglior pesce di Vieste e un registro segreto di tutto quello che ha pagato e a chi. Coraggiosa, a modo suo." },
    { n: "Zi' Peppe", full: "Zi' Peppe Russolillo", r: "Il boss rivale", d: "Allevatore di 70 anni, faccia bruciata dal sole, una masseria piena di cani. Parla di onore e di pecore." },
    { n: "Gentile", full: "Dottoressa Anna Gentile", r: "La pm di Foggia", d: "Giovane, napoletana, sommersa dai fascicoli. Ti aiuterà se le porti prove, non sospetti." }
  ],
  open: `*Vieste, Gargano. Il tuo primo giorno di servizio, ore 9. Il sole è già feroce. Dalla finestra della caserma vedi il Pizzomunno, il grande scoglio bianco sulla spiaggia, e la fila delle auto dei turisti che non finisce mai. Sulla scrivania, le pratiche lasciate dal tuo predecessore: furti di biciclette, liti per i parcheggi, un incendio in un lido archiviato come incidente.*

*Il brigadiere Prencipe entra con due caffè e un sorriso stanco.*

Prencipe: "Benvenut[o|a] a Vieste, comandante. Qua d'estate siamo centomila e d'inverno cinquemila. Il consiglio mio? Si goda il mare. Il resto lo lasci a me."

*Alle undici entra un turista tedesco, sudato e sconvolto, con un guinzaglio vuoto in mano. Il suo cane è scappato nella Foresta Umbra durante una passeggiata. Prencipe alza gli occhi al cielo.*

*Alle quattro del pomeriggio il turista torna. Il cane è con lui, sporco di terra, felice. Tra i denti stringe un portafoglio di pelle, ammuffito, mezzo marcio. Lo apri. Dentro c'è una carta d'identità: Saverio Lecce, nato a Vieste, 19 anni.*

*Prencipe impallidisce. Per un attimo non dice niente.*

Prencipe: "Questo ragazzo… è sparito tre anni fa. La madre lo cerca ancora." *Ti guarda negli occhi.* "Comandante, dia retta a me. Certe cose nella foresta è meglio che restino nella foresta."`,
  opts: ["Mi porti dove l'ha trovato il cane.", "Voglio parlare con la madre. Subito.", "Brigadiere, che cosa sa di questo ragazzo?"]
},

{
  id: "gela", g: "malavita", e: "📚",
  t: "La Stella di Gela", city: "Gela", place: "Una scuola media di periferia", era: "1990–1992",
  hook: "Arrivi a insegnare in una terza media di Gela. Metà dei tuoi alunni ha già un soprannome da adulto.",
  desc: "Gela, Sicilia, settembre 1990. Una città sul mare con il petrolchimico che sputa fumo, quartieri cresciuti senza regole e una guerra in corso: da una parte Cosa Nostra, dall'altra la Stidda, «la stella», bande di ragazzi giovanissimi che vogliono prendersi tutto. Si spara per strada, anche di giorno. Sei [un giovane insegnante|una giovane insegnante] di lettere arrivat[o|a] da Bologna con il primo incarico, in una terza media dove alcuni ragazzi di tredici anni fanno già le vedette per i clan. Vuoi insegnare Dante. Loro vogliono sapere quanto guadagni.",
  sex: "x", names: { f: "Silvia", m: "Marco" }, origin: null,
  you: "{N} Guidetti, 27 anni, insegnante di lettere al primo incarico, nat[o|a] a Bologna, figli[o|a] di due professori. Idealista, appassionat[o|a] di teatro, un po' ingenu[o|a] ma testard[o|a]. Crede che la scuola possa cambiare il destino dei ragazzi, e sta per scoprire quanto costa crederci davvero.",
  world: "Gela tra il 1990 e il 1992: il mare e le spiagge, il petrolchimico con le ciminiere, i quartieri abusivi, le scuole sovraffollate, la disoccupazione, le feste di paese, il dialetto stretto. Una guerra di mafia tra le famiglie di Cosa Nostra e la Stidda, nata da ex affiliati e ragazzi di strada: estorsioni, agguati, ragazzi usati come vedette e corrieri. Ci sono anche preti di frontiera, giudici, madri coraggiose e insegnanti che non si arrendono. Personaggi e clan sono inventati: non nominare mai boss, processi o fatti di cronaca reali.",
  secret: `ATTO 1 – La classe: Totò Bellanca, 13 anni, detto Lupetto, è il capo della classe: intelligentissimo, ironico, fa la vedetta per la Stidda. Concetta, 14 anni, è la più brava, ma deve badare a quattro fratelli e il padre è legato a Cosa Nostra. Gianluca, timidissimo, disegna fumetti meravigliosi. La collega Giovanna Ingala, veterana cinica e generosa, insegna a {N} a sopravvivere. Il preside Ignazio Lo Bello vuole solo arrivare a fine anno senza problemi.
ATTO 2 – Lo spettacolo: {N} propone di scrivere e mettere in scena uno spettacolo teatrale sulla vita del quartiere. I ragazzi si accendono. Ninì Bellanca, 19 anni, fratello di Lupetto, stiddaro in ascesa, prima minaccia {N}, poi prova a sedurl[o|a] con gentilezze. Una sparatoria vicino alla scuola sconvolge i ragazzi.
ATTO 3 – La scelta di Lupetto: a Lupetto chiedono di portare un pacco e un messaggio; esita. Concetta e Lupetto si vogliono bene, ma le loro famiglie sono in guerra. Padre Salvo, il prete del quartiere, offre la parrocchia come rifugio. {N} riceve una lettera anonima: «Pensa a insegnare».
ATTO 4 – La recita di fine anno, giugno 1992: lo spettacolo va in scena davanti a tutto il quartiere, mentre l'Italia è sconvolta dalle stragi di mafia. Finali: portare via Lupetto con la madre, testimoniare, restare a Gela o tornare a Bologna, salvare Concetta da un matrimonio deciso dal padre.
REGOLE: dramma civile e tenerezza: la scuola come ultima trincea. I ragazzi non sono mai mostri: sono ragazzi. Violenza solo accennata; i minori non compiono né subiscono violenze descritte.`,
  chars: [
    { n: "Lupetto", full: "Totò «Lupetto» Bellanca", r: "Il tuo alunno", d: "13 anni, sguardo da adulto, battuta sempre pronta. Fa la vedetta per la Stidda e legge di nascosto i libri che gli presti." },
    { n: "Concetta", full: "Concetta Rizzo", r: "La tua alunna", d: "14 anni, la più brava della scuola. Bada a quattro fratelli e sogna di fare l'avvocata. Il padre ha già deciso il suo futuro." },
    { n: "Ninì", full: "Ninì Bellanca", r: "Il fratello di Lupetto", d: "19 anni, moto rossa e pistola nel giubbotto. Ama il fratello a modo suo, e a modo suo vuole che diventi come lui." },
    { n: "Ingala", full: "Professoressa Giovanna Ingala", r: "La collega", d: "Insegna matematica a Gela da trent'anni. Fuma in cortile, dice parolacce in latino e non ha mai perso un alunno senza combattere." },
    { n: "Lo Bello", full: "Preside Ignazio Lo Bello", r: "Il preside", d: "Gentile, pauroso, a due anni dalla pensione. Ti consiglia di fare lezione e basta. Ha le sue ragioni." },
    { n: "Padre Salvo", full: "Padre Salvo", r: "Il prete del quartiere", d: "Gioca a calcio con i ragazzi in tonaca e scarpe da ginnastica. Toglie i giovani alla strada uno a uno." }
  ],
  open: `*Gela, scuola media di periferia. 17 settembre 1990, ore 8:10. Il caldo è già pesante. Dalla finestra dell'aula si vedono le ciminiere del petrolchimico e, più in là, una striscia di mare. La 3ª B ti aspetta: ventisette ragazzi, banchi incisi col coltellino, un crocifisso storto.*

*Entri con i libri sotto il braccio e il cuore che batte. Scrivi il tuo nome alla lavagna. Qualcuno fischia. Qualcuno ride.*

*All'ultimo banco, seduto di traverso con i piedi sulla sedia, un ragazzino magro con gli occhi neri e svegli alza la mano senza aspettare il permesso.*

Lupetto: "Prof, una domanda. Quanto guadagna lei al mese?"

*La classe esplode in una risata. Lui non ride: aspetta la risposta.*

Lupetto: "No, perché mio fratello, in una settimana, piglia più di lei. E non ha neanche la terza media."

*In prima fila una ragazzina con le trecce e un quaderno pieno di appunti si gira e lo fulmina con lo sguardo.*

Concetta: "Totò, statti zitto. Fai fare lezione."

*In quel momento, dalla strada, arrivano due colpi secchi, uno dopo l'altro. Un motorino che accelera. Tutta la classe si butta istintivamente sotto i banchi, con una calma che ti gela il sangue. Tutta tranne te. Lupetto, da sotto il banco, ti guarda.*

Lupetto: "Prof… si abbassi. Qua è normale."`,
  opts: ["*Mi abbasso e conto i ragazzi*", "Nessuno si muove. Siete al sicuro.", "*Corro alla finestra*"]
},

{
  id: "caravaggio", g: "malavita", e: "🖼️", featured: true,
  t: "Il Caravaggio Rubato", city: "Palermo → Ginevra", place: "Oratorio di San Lorenzo", era: "Oggi · furto del 1969",
  hook: "Nel 1969 qualcuno rubò un Caravaggio da un oratorio di Palermo. Oggi un vecchio morente ti dice dov'è.",
  desc: "Palermo, oggi. Nella notte tra il 17 e il 18 ottobre 1969, dall'Oratorio di San Lorenzo fu rubata la Natività di Caravaggio: la tela fu tagliata dalla cornice e non è mai più stata ritrovata. È uno dei furti d'arte più famosi del mondo. Sei [un capitano|una capitana] dei Carabinieri del Nucleo Tutela Patrimonio Culturale. In un hospice di Palermo un vecchio che sta morendo ti fa chiamare: dice di sapere dove è finita la tela. In cambio vuole una cosa sola: rivedere la figlia che non gli parla da trent'anni.",
  sex: "x", names: { f: "Beatrice", m: "Tommaso" }, origin: null,
  you: "{N} Ferraù, 36 anni, [capitano|capitana] dei Carabinieri del Nucleo Tutela Patrimonio Culturale, nat[o|a] a Messina, storic[o|a] dell'arte mancat[o|a]. Colt[o|a], paziente, testard[o|a]. Ha recuperato centinaia di opere rubate, ma il Caravaggio di Palermo è il suo chiodo fisso da quando, a dodici anni, ne vide la foto in un libro.",
  world: "Palermo, Roma e Ginevra oggi, attorno a un mistero vero: il furto della Natività di Caravaggio nel 1969, mai risolto. Le ipotesi reali sono molte e contraddittorie (la tela distrutta, nascosta, venduta all'estero, tagliata a pezzi): questa storia ne segue una del tutto inventata. Ambienti: l'oratorio con gli stucchi barocchi, il centro storico di Palermo, gli archivi, le case d'aste, i depositi franchi di Ginevra, i laboratori di restauro, i collezionisti senza scrupoli, i ricettatori. La mafia di ieri e quella di oggi, che usa le opere d'arte come garanzia nei grandi traffici. Personaggi e testimonianze sono inventati: non attribuire mai rivelazioni a collaboratori di giustizia o a persone reali.",
  secret: `ATTO 1 – Il vecchio: Turi Lo Monaco, 88 anni, ex ricettatore, nel 1969 faceva parte del gruppo che rubò la tela su commissione. Giura che non fu distrutta: arrotolata, rimase nascosta a Palermo per anni, poi passò di mano come «pegno» tra famiglie mafiose e uscì dall'Italia negli anni Ottanta. Indizio: una foto del 1979 in una villa di Mondello, con un tubo da disegno su un tavolo, e una frase: «Cercate dove si nasconde la luce». In cambio vuole rivedere sua figlia Agata, restauratrice a Roma, che non gli parla da trent'anni.
ATTO 2 – La pista: da Palermo a Roma e a Ginevra. La contessa Livia Orsini, mercante d'arte elegantissima, sa molto e dice poco. Il collezionista svizzero Ulrich Brenner possiede in un deposito franco una «copia antica» della Natività. Agata accetta di aiutare {N}, ma non di vedere il padre.
ATTO 3 – I falsi: ci sono almeno tre Natività in circolazione: due sono falsi perfetti, creati negli anni Novanta per ingannare acquirenti e investigatori. Il Ragioniere, finanziere di un clan di oggi, vuole la tela vera come garanzia per un enorme carico di droga. L'appuntato Gioacchino Rizzo, collega fidato di {N}, rischia la vita.
ATTO 4 – La Natività: Agata riconosce il vero dal falso grazie ai pentimenti del pittore, le correzioni nascoste sotto il colore che solo l'originale può avere. La tela è dove «si nasconde la luce». Finali: recuperare il quadro e riportarlo a Palermo, lasciarlo sparire per salvare Agata, smascherare i collezionisti, riconciliare padre e figlia prima che sia tardi.
REGOLE: giallo d'arte internazionale: indizi concreti, analisi scientifiche, falsi d'autore, viaggi e atmosfere eleganti. Rispetto per l'opera e per la storia vera; la soluzione è pura invenzione. Violenza solo accennata.`,
  chars: [
    { n: "Turi", full: "Turi Lo Monaco", r: "Il vecchio ricettatore", d: "88 anni, voce di carta vetrata e memoria intatta. Nel 1969 aveva 33 anni e un debito con le persone sbagliate. Vuole morire in pace." },
    { n: "Agata", full: "Agata Lo Monaco", r: "La restauratrice", d: "55 anni, una delle migliori restauratrici d'Italia. Ha cancellato il padre dalla sua vita. Riconosce un falso guardando una crepa." },
    { n: "La Contessa", full: "Contessa Livia Orsini", r: "La mercante d'arte", d: "Settant'anni, gioielli antichi e sorriso da salotto romano. Ha venduto quadri a mezzo mondo. Non ha mai mentito: semplicemente, tace." },
    { n: "Brenner", full: "Ulrich Brenner", r: "Il collezionista svizzero", d: "Gentile, coltissimo, ossessionato da Caravaggio. Custodisce in un deposito franco di Ginevra tesori che nessuno ha mai visto." },
    { n: "Il Ragioniere", full: "Il Ragioniere", r: "Il finanziere del clan", d: "Nessuno conosce il suo nome. Gestisce i soldi di una famiglia potente e vuole il quadro come garanzia per un affare enorme." },
    { n: "Rizzo", full: "Appuntato Gioacchino Rizzo", r: "Il tuo collega", d: "Palermitano, 50 anni, battuta pronta e fiuto infallibile. Conosce ogni ricettatore della città. Ti farebbe da scudo." }
  ],
  open: `*Palermo, un hospice sulla collina. Novembre, ore 18. Fuori piove sulla Conca d'Oro. Nella stanza 12 c'è odore di disinfettante e di fiori appassiti. Il vecchio nel letto respira con l'ossigeno, ma gli occhi sono vivissimi.*

*L'appuntato Rizzo resta sulla porta. Tu ti siedi accanto al letto.*

Turi: "Lei è [il capitano|la capitana] del Caravaggio. Ho letto di lei sul giornale. Dicono che non dorme la notte, per quel quadro." *Sorride.* "Neanch'io, da cinquantacinque anni."

*Con la mano tremante prende dal comodino una fotografia in bianco e nero e te la porge. Una veranda, una villa sul mare, uomini in camicia bianca attorno a un tavolo. Sul tavolo, un tubo di cartone lungo un metro e mezzo. Sul retro, una data a penna: Mondello, agosto 1979.*

Turi: "Quella notte del '69 c'ero anch'io. Non l'hanno bruciato, non l'hanno mangiato i topi, non l'hanno tagliato a pezzi. Tutte storie." *Tossisce a lungo.* "Ma prima di dirle dove è andato… lei deve portarmi qui mia figlia Agata. Non mi parla da trent'anni. Voglio chiederle perdono. Poi le dico tutto."

*Rizzo, dalla porta, ti fa un cenno: fuori, nel corridoio, un uomo in impermeabile sta parlando al telefono e guarda verso la stanza. Quando incrocia i tuoi occhi, se ne va.*`,
  opts: ["Mi dia almeno un indizio, adesso.", "Dove vive sua figlia?", "*Seguo l'uomo nel corridoio*"]
},

{
  id: "fuorigioco", g: "malavita", e: "⚽",
  t: "Fuorigioco", city: "Provincia di Napoli", place: "Stadio comunale della Vesuviana", era: "Oggi",
  hook: "Sei il capitano di una squadra di Serie C senza stipendi. Un amico d'infanzia ti offre centomila euro per perdere una partita.",
  desc: "Campania, oggi. Giochi in Serie C con la Vesuviana, una squadra gloriosa e poverissima: stipendi in ritardo di quattro mesi, uno stadio che cade a pezzi, tifosi che vivono per la domenica. Sei il capitano, l'idolo del paese, e a 29 anni sai che la Serie A non arriverà più. Una sera il tuo amico d'infanzia Peppe, che gira con macchine troppo belle, ti offre centomila euro per un rigore sbagliato. È solo una partita, dice. Dietro di lui ci sono scommettitori asiatici, un clan del posto e un mondo che non perdona chi cambia idea.",
  sex: "m", names: { f: "Alessia", m: "Salvatore" }, origin: null,
  you: "{N} Cozzolino, 29 anni, capitano e centrocampista della Vesuviana, nato nel quartiere della stazione. Generoso, carismatico, orgoglioso: a vent'anni era una promessa del calcio italiano, poi un infortunio al ginocchio gli ha cambiato la carriera. Ha una compagna incinta, Alessia, e un mutuo da pagare.",
  world: "Il calcio di provincia oggi: la Serie C con i suoi stadi vecchi, le trasferte in pullman, i presidenti in difficoltà, i procuratori, gli ultras, le radio locali, i bambini con le figurine. Le scommesse illegali: organizzazioni asiatiche che puntano milioni sulle partite minori, intermediari, clan locali che riciclano denaro e controllano parte della curva; le indagini della procura federale e della magistratura. Il paese vesuviano con le sue feste, le pasticcerie, i bar sport, il Vesuvio sempre sullo sfondo. Personaggi, squadre e clan sono inventati: non nominare mai calciatori, squadre, scandali o processi reali.",
  secret: `ATTO 1 – L'offerta: Peppe Langella, amico d'infanzia di {N}, lavora per Zio Franco Carillo, che gestisce l'agenzia di scommesse del paese e riceve ordini da Mr. Lim, l'uomo di un'organizzazione di Singapore. Basta un rigore sbagliato, un fallo in area, un'ammonizione al momento giusto. Il presidente, il commendator Salvio D'Auria, è disperato e non riesce a pagare gli stipendi. Mattia Ruocco, attaccante di 19 anni, è osservato da squadre di Serie A.
ATTO 2 – La prima partita: se {N} rifiuta, arrivano minacce, gomme tagliate, ultras ostili; se accetta, arrivano soldi e senso di colpa. Il portiere Fofò è già nel giro. L'allenatore sospetta qualcosa. La procuratrice federale Ilaria Mainardi arriva in città per un'indagine.
ATTO 3 – Il ricatto: l'organizzazione vuole truccare la semifinale dei playoff e coinvolgere anche Mattia. Alessia scopre tutto. Peppe ha perso soldi che non erano suoi ed è in pericolo di vita.
ATTO 4 – La finale playoff: la partita decisiva per la promozione, stadio pieno, il paese intero sugli spalti. Finali: giocare per vincere e testimoniare, truccare e perdere l'anima, salvare Peppe e Mattia, smascherare Zio Franco e Mr. Lim.
REGOLE: dramma sportivo: le emozioni della partita raccontate con ritmo (spogliatoi, curva, fango, fischio finale), il prezzo morale delle scelte, l'amicizia tradita. Violenza solo accennata.`,
  chars: [
    { n: "Peppe", full: "Peppe Langella", r: "Il tuo amico d'infanzia", d: "Giocavate insieme in oratorio. Ora ha un'auto tedesca, scarpe da mille euro e debiti con gente che non aspetta." },
    { n: "Zio Franco", full: "Zio Franco Carillo", r: "L'uomo delle scommesse", d: "Gestisce l'agenzia del paese e la curva della Vesuviana. Paga i funerali dei poveri e ricorda ogni favore." },
    { n: "Mr. Lim", full: "Mr. Lim", r: "L'uomo di Singapore", d: "Educato, sorridente, parla un inglese perfetto. Arriva solo prima delle partite importanti. Nessuno sa dove dorme." },
    { n: "Mattia", full: "Mattia Ruocco", r: "Il giovane attaccante", d: "19 anni, talento puro, ti considera un fratello maggiore. Se cade nel giro, la sua carriera è finita." },
    { n: "Mainardi", full: "Dottoressa Ilaria Mainardi", r: "La procuratrice federale", d: "Ex calciatrice, oggi investiga sulle partite truccate. Rispetta i giocatori e detesta chi tradisce il calcio." },
    { n: "Alessia", full: "Alessia", r: "La tua compagna", d: "Insegnante elementare, incinta di sei mesi. Ti ama, ama il calcio meno di te e non sopporta le bugie." }
  ],
  open: `*Paese vesuviano, campo della Vesuviana. Martedì sera, ore 20:30. L'allenamento è finito da un pezzo. I fari dello stadio sono quasi tutti spenti per risparmiare, ne resta acceso uno solo, sopra la porta sud. Sei rimasto a tirare rigori da solo, come facevi da bambino.*

*Una macchina tedesca nera entra nel parcheggio. Ne scende Peppe Langella, il tuo amico d'infanzia, con un giubbotto di pelle nuovo e un sacchetto di sfogliatelle.*

Peppe: "Capità! Ancora qua? Statt'attento, che a forza di allenarti diventi bravo." *Ti lancia una sfogliatella.* "Quattro mesi senza stipendio, eh? E il bambino che arriva a gennaio."

*Si siede sulla panchina e guarda il campo vuoto. Poi abbassa la voce.*

Peppe: "Senti, {N}. Domenica giochiamo con l'ultima in classifica. C'è gente, gente seria, che pensa che quella partita finisce pareggio. O che magari la perdiamo per un rigore sbagliato. Un rigore, {N}. Uno. Lo sbagli e prendi centomila euro. In contanti. Il mutuo, il bambino, tutto a posto."

*Tira fuori dal giubbotto una busta gialla, gonfia, e la appoggia sulla panchina, tra te e lui. Il Vesuvio, dietro la curva, è un'ombra nera contro il cielo.*`,
  opts: ["Peppe, riprenditi quella busta.", "Chi è questa gente seria?", "*Guardo la busta senza toccarla*"]
},

{
  id: "lugano", g: "malavita", e: "🏦",
  t: "Il Banchiere di Lugano", city: "Lugano", place: "Banca privata in via Nassa", era: "2008–2010",
  hook: "Gestisci i soldi dei ricchi italiani in una banca svizzera. Il tuo nuovo cliente paga in contanti, dieci milioni alla volta.",
  desc: "Lugano, 2008. A mezz'ora da Milano, oltre il confine, c'è una città di laghi, palme e banche, dove i soldi italiani riposano tranquilli da decenni. Sei [un giovane gestore patrimoniale|una giovane gestrice patrimoniale] della Banca Corsi & Figli, la più discreta della città. La crisi finanziaria fa tremare il mondo e il tuo capo ha bisogno di nuovi clienti. Il primo che ti affida è un costruttore calabrese elegantissimo, che arriva con valigie di contanti portate oltre il confine da corrieri di fiducia. Ti offre una commissione da sogno. E una sola regola: nessuna domanda.",
  sex: "x", names: { f: "Ginevra", m: "Edoardo" }, origin: null,
  you: "{N} Sartori, 30 anni, gest[ore|rice] patrimoniale della Banca Corsi & Figli, nat[o|a] a Como da una famiglia di insegnanti. Laureat[o|a] in Bocconi, ambizios[o|a], elegante, ottim[o|a] giocat[ore|rice] di scacchi. Ha un mutuo per un attico sul lago e la sensazione costante di non essere mai abbastanza.",
  world: "Lugano, Como e Milano tra il 2008 e il 2010: le banche private svizzere, il segreto bancario, le società fiduciarie e le scatole vuote nei paradisi fiscali, i corrieri che portano contanti oltre il confine, il lago, le ville, i casinò. La crisi finanziaria mondiale, lo scudo fiscale italiano che fa rientrare i capitali, le indagini internazionali sul riciclaggio. Le mafie usano professionisti insospettabili per ripulire il denaro. Personaggi, banche e clan sono inventati: non nominare mai banche, clan o inchieste reali.",
  secret: `ATTO 1 – Il cliente: l'ingegner Raffaele Scida, costruttore calabrese con imprese in Lombardia, porta contanti in valigia e vuole «discrezione assoluta». L'avvocato Guido Corsi, padrone della banca, incoraggia {N}: i tempi sono difficili. Fausto Bernasconi, detto Faust, è il corriere che porta i soldi oltre il confine. Sabine Rüegg, responsabile dei controlli interni, è precisa, svizzera fino al midollo, e comincia a fare domande.
ATTO 2 – La crescita: commissioni enormi, un'auto sportiva, cene sul lago. {N} scopre che i soldi di Scida vengono da un clan della 'ndrangheta in Lombardia: appalti, droga, usura. Elena Scida, figlia dell'ingegnere, studia a Lugano e vuole scappare dal padre: chiede aiuto proprio a {N}.
ATTO 3 – Lo scudo: con lo scudo fiscale del 2009 Scida vuole far rientrare in Italia i soldi «ripuliti». La tenente colonnello Arianna Fois della Guardia di Finanza indaga dal lato italiano e propone a {N} di collaborare. Corsi prepara un piano per scaricare tutta la colpa su {N}.
ATTO 4 – Scacco matto: come in una partita a scacchi, {N} deve anticipare tutte le mosse. Finali: diventare testimone, fuggire con i soldi, salvare Elena, rovinare Corsi, uscirne pulito o sporco per sempre.
REGOLE: thriller finanziario elegante: tensione psicologica, soldi che si muovono come pedine, scelte morali sottili. Mai istruzioni reali di riciclaggio: le operazioni sono raccontate in modo narrativo e generico. Violenza solo accennata.`,
  chars: [
    { n: "Corsi", full: "Avvocato Guido Corsi", r: "Il padrone della banca", d: "75 anni, papillon, voce di velluto. Ha attraversato quarant'anni di segreti bancari senza un graffio. Sa sacrificare chiunque." },
    { n: "Scida", full: "Ingegner Raffaele Scida", r: "Il cliente", d: "Costruttore calabrese con il cappotto di cachemire e la Bibbia in macchina. Gentile, generoso, terrificante quando smette di sorridere." },
    { n: "Sabine", full: "Sabine Rüegg", r: "La responsabile dei controlli", d: "Zurighese, 40 anni, regole e numeri. Sembra fredda, è solo onesta. Potrebbe salvarti o distruggerti." },
    { n: "Faust", full: "Fausto «Faust» Bernasconi", r: "Il corriere", d: "Ex guida alpina, passa il confine con le valigie come se portasse la spesa. Sa a memoria tutti i sentieri e tutti i doganieri." },
    { n: "Fois", full: "Tenente colonnello Arianna Fois", r: "La Guardia di Finanza", d: "Sarda, testarda, segue i soldi come un segugio. Ti offre una via d'uscita, ma non due volte." },
    { n: "Elena", full: "Elena Scida", r: "La figlia del cliente", d: "22 anni, studia architettura a Lugano. Sa chi è davvero suo padre e vuole sparire prima che sia troppo tardi." }
  ],
  open: `*Lugano, via Nassa. Un martedì di ottobre del 2008, ore 9:15. Dalla finestra del tuo ufficio vedi il lago piatto come uno specchio e il Monte San Salvatore nella nebbia. Sui monitor, le borse di mezzo mondo sono rosse. A New York è appena fallita una delle banche più grandi della storia.*

*L'avvocato Corsi entra senza bussare, con il papillon perfetto e una cartellina in mano.*

Corsi: "{N}, la crisi è un'occasione per chi sa ascoltare. Oggi alle dieci arriva un cliente nuovo, molto importante, e ho pensato a lei. Ha bisogno di qualcuno di giovane, brillante e… discreto." *Sorride.* "Soprattutto discreto."

*Alle dieci in punto la segretaria accompagna nel tuo ufficio un uomo sui sessant'anni, cappotto di cachemire, una croce d'oro sotto la camicia. Dietro di lui, un uomo robusto con due valigie rigide.*

Scida: "Piacere. Raffaele Scida, costruisco case. In Calabria e in Lombardia." *Si siede, apre le valigie: mazzette di banconote da cinquecento euro, ordinate come mattoni.* "Qui ci sono dieci milioni. Vorrei che lei me li facesse riposare. Come dice il mio amico avvocato: in silenzio." *Si sporge verso di te.* "Mi dicono che lei gioca a scacchi. Anch'io. La prima regola degli scacchi, lo sa qual è? Mai fare domande all'avversario. Si guarda la scacchiera e basta."

*Dalla porta a vetri, nel corridoio, Sabine Rüegg dei controlli interni ti sta guardando. Ha visto le valigie.*`,
  opts: ["Da dove vengono questi soldi?", "*Chiudo le valigie e chiamo Corsi*", "Le regole della banca valgono per tutti."]
},

{
  id: "nome-falso", g: "malavita", e: "🪪",
  t: "Nome Falso", city: "Asti", place: "Una cittadina del Piemonte", era: "Oggi",
  hook: "Da quindici anni vivi con un nome che non è il tuo. Stamattina, al mercato, qualcuno ha gridato quello vero.",
  desc: "Piemonte, oggi. Da quindici anni vivi ad Asti con un nome falso. Quando avevi dieci anni tuo padre, killer di un clan di Napoli, è diventato collaboratore di giustizia, e lo Stato vi ha portati via di notte: nuova città, nuovi documenti, nessun contatto con il passato. Oggi hai 25 anni, lavori in un'enoteca, ami una persona che non sa niente di te. Stamattina, al mercato, un uomo ti ha chiamat[o|a] con il tuo vero nome. E tuo padre, che non vedi da anni, ti manda un messaggio di una parola sola: «Scappa».",
  sex: "x", names: { f: "Giada", m: "Simone" }, origin: null,
  you: "{N} Bianchi, 25 anni, sommelier in un'enoteca di Asti. È un nome falso: quello vero è [Salvatore|Immacolata] Scarano, nat[o|a] a Napoli. Ha imparato a mentire su tutto e a non fidarsi di nessuno; ama i vini, la montagna e [Chiara|Alessandro], con cui sta per andare a vivere. Di Napoli ricorda poco: l'odore del mare e la voce di una nonna.",
  world: "Asti, le Langhe, Torino e Napoli oggi: colline di vigneti, cantine, sagre, mercati, la vita tranquilla della provincia; e dall'altra parte Napoli, i quartieri dove tutto è cominciato. Il programma di protezione per i collaboratori di giustizia e le loro famiglie: nuovi nomi, trasferimenti, funzionari del Servizio Centrale di Protezione, regole severissime, vite sospese. I clan non dimenticano: vogliono vendetta contro chi ha parlato e cercano i familiari. Personaggi e clan sono inventati: non nominare mai collaboratori, clan o processi reali.",
  secret: `ATTO 1 – Il nome: l'uomo al mercato è Zio Nicola Scarano, fratello del padre, venuto a cercare {N} perché la nonna Nannina sta morendo e vuole rivedere [il nipote|la nipote]. Ma se lo zio l'ha trovat[o|a], possono trovarl[o|a] anche gli altri. Il clan ha mandato Vittorio Mazza, detto 'o Professore, un uomo educato e paziente che non ha mai fallito un incarico. L'ispettrice Laura Bertone, che segue la famiglia da quindici anni, scopre che c'è stata una fuga di notizie dall'interno.
ATTO 2 – La fuga: proteggere [Chiara|Alessandro] senza dire la verità, o dire tutto e rischiare di perdere ogni cosa. Mirko, il titolare dell'enoteca e amico di {N}, nota che qualcosa non va. Il padre, Enzo Scarano, vuole un incontro: è malato e ha qualcosa da consegnare.
ATTO 3 – Napoli: {N} torna di nascosto a Napoli per vedere la nonna e scoprire chi ha tradito. La verità sul padre: quindici anni fa uccise il figlio del boss, e diventò collaboratore per salvare la famiglia dalla vendetta, non per pentimento. Ha nascosto un quaderno con i conti segreti del clan, e chi lo trova ha in mano tutti.
ATTO 4 – Il prezzo: 'o Professore li trova. Finali: fidarsi dello Stato, affrontare il clan con il quaderno, riconciliarsi con il padre, sparire di nuovo con [Chiara|Alessandro], oppure smettere di scappare e riprendersi il proprio nome.
REGOLE: thriller psicologico ed emotivo: identità, colpe dei padri, amore e paura. Il tema centrale: si può scegliere chi essere? Violenza solo accennata.`,
  chars: [
    { n: "Enzo", full: "Enzo Scarano", r: "Tuo padre", d: "Ex killer del clan, collaboratore di giustizia da quindici anni. Malato, pieno di colpe, ti ama in un modo che non sa dire." },
    { n: "Bertone", full: "Ispettrice Laura Bertone", r: "Il Servizio di Protezione", d: "Ti segue da quando avevi dieci anni: è quasi una zia. Severa, protettiva, terrorizzata dall'idea di averti perso." },
    { n: "'o Professore", full: "Vittorio Mazza, detto 'o Professore", r: "L'uomo del clan", d: "60 anni, occhiali, giacca di tweed, parla come un insegnante in pensione. Non ha mai fallito un incarico." },
    { n: "Zio Nicola", full: "Zio Nicola Scarano", r: "Tuo zio", d: "Fratello di tuo padre, pescivendolo a Napoli. Ruvido, emotivo, non ha mai perdonato Enzo per aver parlato." },
    { n: "Nonna Nannina", full: "Nonna Nannina", r: "Tua nonna", d: "92 anni, a letto in un basso dei Quartieri Spagnoli. Ha una voce che ricordi ancora e un segreto da consegnarti." },
    { n: "Mirko", full: "Mirko Gallo", r: "Il tuo datore di lavoro", d: "Astigiano, 40 anni, titolare dell'enoteca e amico vero. Nota tutto e non fa domande, finché non diventa necessario." }
  ],
  open: `*Asti, piazza del mercato. Sabato, ore 9:30. Il mercato è pieno: formaggi delle Langhe, nocciole, tartufi in vetrina, signore con il carrello. Stai comprando la frutta per stasera: [Chiara|Alessandro] ha invitato i suoi genitori a cena per la prima volta, e vuoi che sia tutto perfetto.*

*Paghi le pesche. Ti giri. Dall'altra parte della bancarella, un uomo sui sessant'anni, abbronzato, con la giacca troppo pesante per la stagione, ti fissa come se avesse visto un fantasma.*

Zio Nicola: *con la voce rotta, ad alta voce* "[Salvatò|Imma]? [Salvatore|Immacolata] Scarano? Sei tu… madonna santa, sei tu!"

*Qualcuno si gira. Il sangue ti si gela. Nessuno, in quindici anni, ti ha mai chiamat[o|a] così. Nessuno avrebbe potuto.*

*L'uomo fa un passo verso di te, con le braccia aperte, gli occhi lucidi.*

Zio Nicola: "Sono zio Nicola! Il fratello di papà tuo! La nonna sta morendo, e chiede di te ogni giorno…"

*In quel momento il telefono vibra nella tua tasca. Un numero sconosciuto. Un messaggio solo, una parola.*

*«Scappa». Firmato: papà.*`,
  opts: ["*Lascio cadere le pesche e corro via*", "Lei si sbaglia, non so chi sia.", "Zio… come mi ha trovato?"]
},

{
  id: "reggente", g: "malavita", e: "💍",
  t: "La Reggente", city: "Napoli", place: "Rione dei Fiori", era: "2005–2008",
  hook: "Tuo marito è stato arrestato. Il clan aspetta ordini. Da te.",
  desc: "Napoli, 2005. Sei la moglie di Gennaro Vastarella, il capo di un clan che comanda un intero quartiere della periferia nord. Per quindici anni hai fatto finta di non vedere: le borse di soldi, gli uomini che entravano di notte, le pistole nel comodino. Stanotte elicotteri e teste di cuoio hanno portato via Gennaro, e domattina venti uomini aspettano ordini, una famiglia rivale fiuta la debolezza e una pm ti offre una via d'uscita per i tuoi figli. Puoi diventare la reggente, una donna al comando. O puoi bruciare tutto.",
  sex: "f", names: { f: "Rosaria", m: "Rosario" }, origin: null,
  you: "{N} Vastarella, 36 anni, moglie di Gennaro Vastarella, capoclan del Rione dei Fiori. Figlia di un pescivendolo, sposata a 19 anni per amore, madre di Gennarino, 15 anni, e di Sofia, 9. Intelligente, abituata a non fare domande, tiene da sempre i conti del negozio di abbigliamento intestato a lei, e sa molto più di quanto tutti immaginino.",
  world: "Napoli tra il 2005 e il 2008: la periferia nord con i palazzoni popolari, le piazze di spaccio, i cortili, le chiese, le feste dei santi, le scuole, i negozi di copertura; e poi il centro, il mare, Posillipo, il tribunale. Una faida tra clan per il controllo della droga; donne che diventano reggenti quando gli uomini finiscono in carcere; ragazzi del quartiere usati come manovalanza; madri che invece si ribellano; magistrati e forze dell'ordine sotto pressione. Personaggi e clan sono inventati: non nominare mai clan, boss o processi reali.",
  secret: `ATTO 1 – La notte dell'arresto: Biagio Russo, detto 'o Chiattone, braccio destro di Gennaro, si offre di «tenere tutto in mano» al posto di {N}. Donna Carmela, la suocera, vuole che sia {N} a comandare, per proteggere il nome della famiglia. La pm Francesca Varriale offre protezione e una vita nuova se {N} collabora. Gennarino, 15 anni, vuole diventare come il padre.
ATTO 2 – Il trono: se {N} prende il comando, impone regole sue (niente ragazzini nello spaccio, niente pizzo alle vedove), ma deve anche far rispettare la sua autorità. La famiglia rivale dei Capece vuole prendersi le piazze. Biagio sorride e intanto conta i suoi uomini.
ATTO 3 – Il tradimento: dal carcere Gennaro manda ordini attraverso l'avvocato Ferrante: vuole vendetta e non si fida della moglie. Biagio tratta in segreto con i Capece. Gennarino viene coinvolto in un'azione pericolosa. Il segreto di Donna Carmela: trent'anni fa fu lei a far arrestare il suocero per mettere il figlio al comando.
ATTO 4 – La scelta: collaborare con la giustizia per dare ai figli una vita nuova, diventare la boss assoluta, fuggire, oppure trovare una strada che nessuno si aspetta. Ogni scelta ha conseguenze pesanti e permanenti.
REGOLE: dramma criminale al femminile, potente e tragico: il potere come trappola, i figli come posta in gioco. Dialetto napoletano leggero e comprensibile. Violenza solo accennata; il crimine non è mai glamour.`,
  chars: [
    { n: "'o Chiattone", full: "Biagio Russo, detto 'o Chiattone", r: "Il braccio destro", d: "45 anni, grosso, lento nei movimenti e velocissimo nei pensieri. Ti chiama «signora» con un rispetto che sa di minaccia." },
    { n: "Donna Carmela", full: "Donna Carmela Vastarella", r: "Tua suocera", d: "70 anni, rosario in mano e occhi di ghiaccio. Ha cresciuto un boss e vuole che la famiglia resti in piedi a ogni costo." },
    { n: "Gennarino", full: "Gennarino Vastarella", r: "Tuo figlio", d: "15 anni, adora il padre, odia la scuola, sogna la moto e il rispetto del quartiere. È la tua paura più grande." },
    { n: "Varriale", full: "Dottoressa Francesca Varriale", r: "La pm antimafia", d: "Napoletana del Vomero, madre di due bambini. Ti offre una strada per salvare i tuoi figli. Non ha tempo da perdere." },
    { n: "Ferrante", full: "Avvocato Ferrante", r: "L'avvocato del clan", d: "Elegante, cinico, porta i messaggi dal carcere. È fedele a chi paga, e paga sempre chi vince." },
    { n: "Gennaro", full: "Gennaro Vastarella", r: "Tuo marito", d: "Il boss del Rione dei Fiori, ora in carcere. Ti ha amata davvero, a modo suo. Da dietro le sbarre vuole ancora comandare." }
  ],
  open: `*Napoli, Rione dei Fiori. Notte di marzo del 2005, ore 4:10. Il rumore degli elicotteri ti sveglia un secondo prima delle esplosioni: le porte che saltano, gli scarponi sulle scale, le urla. «Polizia! Polizia!» Luci bianche dappertutto.*

*In due minuti tuo marito Gennaro è in mutande e canottiera, con le manette ai polsi, nel corridoio di casa. Sofia piange abbracciata alla tua gamba. Gennarino, quindici anni, urla contro un agente e tu lo trattieni per la maglietta.*

*Gennaro, mentre lo portano via, si ferma davanti a te. Non ha paura. Ti guarda con gli occhi di quando vi siete conosciuti.*

Gennaro: "Statte bbona, {N}. Tieni tu le chiavi di casa." *Una pausa.* "Tutte le chiavi. Hai capito?"

*Lo spingono giù per le scale. Le sirene si allontanano. Il quartiere, alle finestre, guarda in silenzio.*

*Alle sei la cucina è piena. Donna Carmela, tua suocera, con il rosario in mano. Biagio, il Chiattone, con il caffè. Altri uomini in piedi lungo il muro, che aspettano. Il telefono di casa squilla e nessuno risponde.*

Biagio: "Signora, con rispetto parlando. Gennaro è dentro, e là fuori i Capece già lo sanno. Ci vuole uno che comanda, oggi stesso. Se volete, ci penso io. Voi pensate ai bambini."

*Donna Carmela posa il rosario sul tavolo. Ti guarda. Tutti, in cucina, ti guardano.*`,
  opts: ["Le chiavi le tengo io, Biagio.", "*Guardo Donna Carmela*", "Fuori tutti. Devo pensare."]
},

{
  id: "spalloni", g: "malavita", e: "🎒",
  t: "Gli Spalloni", city: "Valchiavenna", place: "Passi alpini verso la Svizzera", era: "1958–1962",
  hook: "Trenta chili di sigarette sulle spalle, un passo a 2500 metri e la Finanza che ti aspetta nella nebbia.",
  desc: "Valchiavenna, 1958. Nei paesi di montagna il lavoro non c'è, e la Svizzera è a un passo, oltre le creste. Di notte, in fila indiana, gli spalloni salgono i sentieri con la bricolla sulle spalle: trenta chili di sigarette, caffè e cioccolato comprati nei negozi svizzeri e rivenduti in Italia. Hai 18 anni, e tuo padre è morto l'inverno scorso in un canalone, con il carico addosso. Per mantenere la famiglia diventi spallon[e|a] anche tu. È un mestiere di gambe, fiato e coraggio. Ma in pianura c'è chi vuole usare i vostri sentieri per portare cose molto più pericolose.",
  sex: "x", names: { f: "Elda", m: "Battista" }, origin: null,
  you: "{N} Pedranzini, 18 anni, nat[o|a] a Sant'Abbondio di Sopra, paese inventato di pastori e boscaioli sopra Chiavenna. Agile come un camoscio, conosce i sentieri del padre e legge il tempo nel colore delle nuvole. Ha una madre vedova, tre fratelli piccoli e una voce bellissima che usa solo in chiesa.",
  world: "Le Alpi tra Italia e Svizzera tra il 1958 e il 1962: Valchiavenna e Val Bregaglia, i paesi di pietra, gli alpeggi, i passi a oltre duemila metri, le baite, i rifugi, i negozi svizzeri di confine, le osterie dove si fanno i patti. Il contrabbando delle bricolle: sigarette, caffè, zucchero, cioccolato; le colonne di spalloni di notte, i finanzieri con i cani e le pattuglie in quota, le valanghe, i soldi facili. Sullo sfondo il boom economico, le dighe in costruzione, i giovani che partono per Milano. Poi arrivano organizzazioni di città che vogliono i sentieri per droga e armi. Personaggi inventati.",
  secret: `ATTO 1 – La prima salita: la colonna è guidata da Bortolo Della Bona, detto il Lupo, il miglior capocolonna della valle, che era amico del padre di {N}. Tilde, 17 anni, è la più veloce di tutti. La signora Margrit Clalüna vende la merce nel suo negozio svizzero di confine. L'appuntato Raffaele Iorio, giovane finanziere napoletano, odia la montagna e ha paura del freddo, ma è onesto. Prima notte: tempesta, nebbia, una caduta.
ATTO 2 – Il Milanese: Arnaldo Brivio, detto il Milanese, compra tutto il carico della valle. Un giorno offre il triplo per portare «casse speciali», chiuse con il piombo. Il Lupo rifiuta. Gli uomini del Milanese cominciano a fare pressione sulle famiglie del paese.
ATTO 3 – La valanga: una valanga travolge la colonna e una pattuglia della Finanza. {N} salva la vita a Iorio, il nemico, e tra i due nasce un rispetto strano. Si scopre cosa c'è nelle casse speciali del Milanese: morfina e armi. Il Lupo è in debito con lui, e forse anche la morte del padre di {N} non fu un incidente.
ATTO 4 – L'ultima bricolla: scelte: portare il carico speciale per una fortuna, consegnare il Milanese a Iorio, guidare la colonna attraverso il passo più pericoloso, oppure lasciare il contrabbando per un lavoro nei cantieri della diga, o per cantare a Milano.
REGOLE: avventura di montagna e malavita «povera»: fatica, freddo, solidarietà, il confine come destino. Il contrabbando di generi comuni è raccontato con nostalgia, ma quando arrivano droga e armi tutto diventa scuro. Violenza solo accennata.`,
  chars: [
    { n: "Il Lupo", full: "Bortolo «il Lupo» Della Bona", r: "Il capocolonna", d: "50 anni, barba grigia, gambe d'acciaio. Era il migliore amico di tuo padre. Non ha mai perso un uomo, tranne uno." },
    { n: "Tilde", full: "Tilde Gianoli", r: "La più veloce della colonna", d: "17 anni, trecce nere, ride quando ha paura. Porta la bricolla come se fosse vuota e sogna di aprire una sartoria." },
    { n: "Iorio", full: "Appuntato Raffaele Iorio", r: "Il finanziere", d: "Napoletano di 22 anni, spedito tra le montagne per punizione. Odia la neve, scrive poesie alla madre, è incorruttibile." },
    { n: "Margrit", full: "Frau Margrit Clalüna", r: "La negoziante svizzera", d: "Vedova di Castasegna, vende sigarette e caffè agli spalloni. Fa i conti in quattro lingue e fa credito solo a chi rispetta." },
    { n: "Il Milanese", full: "Arnaldo «il Milanese» Brivio", r: "Il compratore", d: "Cappotto di cammello e Lancia Aurelia. Compra tutto il carico della valle. Sorride molto, paga bene, non perdona." },
    { n: "Teresina", full: "Teresina Pedranzini", r: "Tua madre", d: "Vedova a 40 anni, quattro figli e un orto. Non vuole che tu salga sui passi, ma senza quei soldi l'inverno non passa." }
  ],
  open: `*Sant'Abbondio di Sopra, Valchiavenna. Ottobre 1958, mezzanotte. Nella stalla di Bortolo il Lupo, al lume di una lanterna, dieci spalloni preparano le bricolle: le grandi gerle di tela e cuoio che domani mattina, all'alba, saranno piene di sigarette svizzere. Fuori comincia a nevicare piano.*

*Tua madre ti ha cucito i guanti con la lana vecchia del papà. Hai ancora il suo bastone, con le iniziali incise col coltello.*

*Il Lupo ti guarda a lungo, poi ti mette in mano una bricolla vuota.*

Il Lupo: "Tuo padre portava trentacinque chili fino al passo senza fermarsi. Tu ne porti venticinque, e ti fermi quando lo dico io. In montagna non si fanno gli eroi: si torna a casa." *Abbassa la voce.* "E se senti abbaiare un cane, butti il carico e corri. La bricolla si ricompra. Le gambe no."

*Tilde, una ragazza con le trecce nere, ti dà una gomitata e ti allunga una barretta di cioccolato svizzero.*

Tilde: "Per il fiato. La prima volta si vomita tutti, non vergognarti."

*In quel momento la porta della stalla si apre. Entra un uomo con un cappotto di cammello coperto di neve e le scarpe da città rovinate dal fango. Tutti smettono di parlare.*

Il Milanese: "Buonasera, signori. Bortolo, ho una proposta per te e per i tuoi ragazzi. Si tratta di un carico un po' speciale." *Guarda te.* "Ah, abbiamo una faccia nuova. [Il figlio|La figlia] di Pedranzini, vero? Condoglianze. Era un uomo che sapeva il fatto suo."`,
  opts: ["Lei conosceva mio padre?", "*Resto in silenzio e guardo il Lupo*", "Che cosa c'è nel carico speciale?"]
},

{
  id: "bandito", g: "malavita", e: "🌾",
  t: "Il Bandito", city: "Sicilia occidentale", place: "Monte Ciàula", era: "1945–1950",
  hook: "Sicilia, dopoguerra. Il bandito più amato e più ricercato dell'isola ti offre un fucile e un sogno.",
  desc: "Sicilia, 1945. La guerra è finita, ma l'isola ha fame: grano razionato, borsa nera, contadini senza terra, baroni e mafiosi che comandano le campagne. Sulle montagne sopra il tuo paese vive Melchiorre Taibi, detto Re di Spade: un bandito di 23 anni, bello e spavaldo, che assalta i convogli dei ricchi, regala farina ai poveri, scrive lettere ai giornali americani e dice di combattere per l'indipendenza della Sicilia. Tutti lo amano, tutti lo temono. Sei [suo cugino|sua cugina], e ti vuole nella sua banda. Ma dietro le sue imprese si muovono mafiosi, politici, spie e un'America lontanissima. E un giorno qualcuno lo tradirà.",
  sex: "x", names: { f: "Ninfa", m: "Vito" }, origin: null,
  you: "{N} Taibi, 19 anni, [cugino|cugina] di Melchiorre, figli[o|a] di contadini senza terra di Monte Ciàula, paese inventato sulle montagne della Sicilia occidentale. Sa leggere e scrivere grazie a un prete, e per questo il paese [gli|le] porta le lettere da leggere e da scrivere. Coraggios[o|a], orgoglios[o|a], sogna una Sicilia giusta.",
  world: "La Sicilia occidentale tra il 1945 e il 1950: paesi di montagna, latifondi di grano, masserie, trazzere polverose, grotte, la Conca d'Oro di Palermo, le piazze dei comizi. La fame del dopoguerra, la borsa nera, il movimento separatista con il suo esercito di volontari, le lotte dei contadini per la terra, i sindacalisti minacciati, la mafia dei campieri e dei gabelloti al servizio dei baroni, i carabinieri mandati a combattere il banditismo, i giornalisti stranieri, la Guerra fredda che comincia. Personaggi e fatti sono inventati e solo ispirati al periodo: non nominare mai banditi, mafiosi o politici reali né stragi reali.",
  secret: `ATTO 1 – La banda, 1945-46: Melchiorre recluta {N} come scrivano e uomo di fiducia. La banda assalta i convogli del grano dei baroni e distribuisce farina nei paesi. L'avvocato Filippo Ingrassia, capo separatista, promette gradi e gloria. Don Mommo Scalisi, il mafioso del paese, protegge la banda finché gli conviene. Graziella, la fidanzata di Melchiorre, vede più lontano di tutti.
ATTO 2 – Il sogno, 1946-47: lettere ai giornali, interviste a giornalisti americani, la leggenda di Re di Spade che cresce. I contadini occupano le terre incolte guidati dal sindacalista Calogero Bonura, amico d'infanzia di {N}. Il maresciallo Ottavio Cannizzaro, onesto e testardo, dà la caccia alla banda.
ATTO 3 – La festa dei contadini, 1947: Don Mommo e un americano misterioso, Mr. Hollis, chiedono alla banda di «spaventare» una grande festa di contadini e sindacalisti, sparando sulla folla. Melchiorre esita, tentato da promesse di amnistia. {N} deve impedire il massacro, a qualunque costo.
ATTO 4 – Il tradimento, 1950: la caccia finale, le promesse di perdono, il complotto di Don Mommo per far tradire Melchiorre da qualcuno della sua famiglia: forse proprio da {N}. Finali: tradire per salvare la famiglia, morire con lui, fuggire in America, dire la verità a un giudice e ai giornali.
REGOLE: epica popolare e tragedia: il bandito-eroe e la verità sporca dietro il mito. Paesaggi assolati, fame, onore, poesia popolare. Violenza solo accennata.`,
  chars: [
    { n: "Melchiorre", full: "Melchiorre «Re di Spade» Taibi", r: "Tuo cugino, il bandito", d: "23 anni, capelli neri, sorriso da attore, pistola col manico di madreperla. Generoso, vanitoso, coraggioso fino all'incoscienza." },
    { n: "Don Mommo", full: "Don Mommo Scalisi", r: "Il mafioso del paese", d: "Campiere dei baroni, rosario e bastone. Saluta tutti per nome e decide chi mangia e chi no." },
    { n: "Graziella", full: "Graziella", r: "La fidanzata di Melchiorre", d: "Figlia del fornaio, intelligente e fiera. Ama Melchiorre e ha paura di come finirà." },
    { n: "Cannizzaro", full: "Maresciallo Ottavio Cannizzaro", r: "I carabinieri", d: "Siciliano di Ragusa, uomo d'ordine e di fede. Vuole prendere Melchiorre vivo e portarlo davanti a un giudice." },
    { n: "Hollis", full: "Mr. Hollis", r: "L'americano", d: "Dice di essere un giornalista, ma fa domande da soldato. Porta sigarette, dollari e promesse." },
    { n: "Calogero", full: "Calogero Bonura", r: "Il sindacalista", d: "Tuo amico d'infanzia, guida i contadini nelle occupazioni delle terre. Crede nella legge e nella giustizia. Rischia la vita ogni giorno." }
  ],
  open: `*Monte Ciàula, Sicilia occidentale. Luglio 1945, sera. Il caldo non dà tregua. In piazza i contadini aspettano la distribuzione della farina, che non arriva da tre settimane. I bambini hanno le pance gonfie. Sul balcone del palazzo baronale, due campieri armati guardano la folla.*

*All'improvviso un rumore di camion. Ne arrivano tre, carichi di sacchi bianchi. Sul primo, in piedi sul cassone, con il fucile a tracolla e la camicia bianca aperta sul petto, c'è un ragazzo che tutti riconoscono. Il paese esplode in un urlo.*

Folla: "Re di Spade! Re di Spade!"

*Melchiorre salta giù, apre un sacco con il coltello e lancia la farina in aria. Ride. Poi ti vede, in mezzo alla gente, e viene verso di te a braccia aperte.*

Melchiorre: "[Cugino mio|Cugina mia]! Questa farina era del barone. Adesso è del popolo." *Ti abbraccia forte, poi ti parla piano all'orecchio.* "Mi serve qualcuno che sappia scrivere. Le lettere ai giornali, i proclami, i conti. Qualcuno di cui fidarmi. Il sangue è sangue, no?"

*Dal balcone del palazzo baronale, Don Mommo Scalisi osserva la scena fumando il sigaro. Ti guarda. Sorride. Poi, lentamente, si tocca il cappello.*`,
  opts: ["Melchiorre, vengo con te.", "Farai ammazzare tutto il paese.", "*Guardo Don Mommo sul balcone*"]
},

{
  id: "mulberry", g: "malavita", e: "🗽",
  t: "Mulberry Street", city: "Palermo → New York", place: "Little Italy", era: "1921–1933",
  hook: "Sbarchi a Ellis Island con una valigia di cartone. New York ha due strade: lavorare tanto o fare soldi in fretta.",
  desc: "1921. Lasci la Sicilia su un piroscafo con altri duemila emigranti, una valigia di cartone e l'indirizzo di uno zio a Mulberry Street, nel cuore di Little Italy. New York è un mondo nuovo: grattacieli, tram, jazz, e il Proibizionismo che ha reso l'alcol illegale e qualche italiano ricchissimo. Lo zio non c'è più: è sparito una settimana prima del tuo arrivo, lasciando debiti e una pistola sotto il materasso. Per sopravvivere puoi spaccarti la schiena al porto, oppure accettare l'offerta di un giovane boss elegante che parla tre dialetti e l'inglese di Broadway.",
  sex: "x", names: { f: "Santina", m: "Calogero" }, origin: null,
  you: "{N} Amato, 18 anni, emigrat[o|a] da Castellammare del Golfo, in Sicilia, figli[o|a] di un pescatore di tonni. Svegli[o|a], coraggios[o|a], impara l'inglese in fretta e ha una memoria straordinaria per facce e numeri. Ha promesso alla madre di mandare i soldi per far partire anche le due sorelle.",
  world: "New York tra il 1921 e il 1933, con fatti storici veri e personaggi inventati: Ellis Island, Little Italy con Mulberry Street e la festa di San Gennaro, il Lower East Side, i moli del porto, Harlem e i locali jazz, i grattacieli in costruzione, Coney Island. Il Proibizionismo, i locali clandestini, il contrabbando di whisky dal Canada e dai Caraibi, la Mano Nera che estorce i commercianti, le bande irlandesi ed ebraiche, la polizia corrotta, il crollo di Wall Street del 1929, la guerra tra le vecchie famiglie siciliane all'inizio degli anni Trenta e la nascita di un'organizzazione nuova. Non nominare mai gangster reali: tutti i boss e i personaggi sono inventati.",
  secret: `ATTO 1 – Lo zio, 1921: zio Pino è sparito perché doveva soldi a Don Saverio Cutrona, vecchio boss della Mano Nera, baffi a manubrio e metodi antichi. Frankie Lo Cascio, nato a New York da genitori siciliani, giovane, moderno e ambiziosissimo, offre a {N} un lavoro: contare i soldi del whisky. Il sergente irlandese Tommy Kehoe prende mazzette da tutti, ma ha un suo codice. Zia Nedda, la moglie dello zio, sa dov'è finito il marito.
ATTO 2 – Il whisky, 1923-27: barche veloci dal Canada lungo le coste di Long Island, locali clandestini con il jazz, soldi a palate. {N} diventa il cervello dei conti di Frankie e del suo socio Moe Kaplan. Rosie, cantante di un locale di Harlem, diventa un'amica preziosa e un pericolo.
ATTO 3 – Il crollo, 1929: Wall Street crolla, la banca di un paesano fallisce e porta via i risparmi di mezza Mulberry Street. Le vecchie famiglie siciliane entrano in guerra tra loro. Frankie prepara un piano per eliminare i vecchi boss e creare un sistema nuovo. Le sorelle di {N} arrivano a New York nel momento peggiore.
ATTO 4 – La nuova organizzazione, 1931-33: il Proibizionismo sta per finire. Frankie offre a {N} un posto al tavolo dei capi. Finali: diventare boss, aprire un ristorante onesto, testimoniare davanti a un procuratore, tornare in Sicilia con le sorelle.
REGOLE: saga d'epoca: emigrazione, sogno americano, jazz, tradimenti. Gli italiani onesti sono la maggioranza e vanno mostrati con rispetto. Violenza solo accennata. Inglese nei dialoghi solo semplice e comprensibile.`,
  chars: [
    { n: "Frankie", full: "Frankie Lo Cascio", r: "Il giovane boss", d: "25 anni, nato a New York, cappello di feltro e scarpe bicolori. Moderno, simpatico, spietato. Vuole cambiare le regole del gioco." },
    { n: "Don Saverio", full: "Don Saverio Cutrona", r: "Il vecchio boss", d: "Baffi a manubrio, panciotto, statue di santi in salotto. Comanda come al paese, con la paura e il rispetto." },
    { n: "Kehoe", full: "Sergente Tommy Kehoe", r: "Il poliziotto irlandese", d: "Rosso di capelli, pugni enormi, mazzette da tutti. Ma i bambini del quartiere non si toccano: è la sua regola." },
    { n: "Moe", full: "Moe Kaplan", r: "Il socio di Frankie", d: "Ebreo del Lower East Side, genio dei numeri e delle barche veloci. Legge i giornali finanziari e fiuta il crollo in anticipo." },
    { n: "Rosie", full: "Rosie", r: "La cantante jazz", d: "Voce d'oro in un locale clandestino di Harlem. Conosce i segreti di tutti i clienti e li custodisce come gioielli." },
    { n: "Zia Nedda", full: "Zia Nedda", r: "La moglie dello zio scomparso", d: "Sarta, cinque figli, nessuna lacrima in pubblico. Sa dov'è finito il marito e ha paura di dirlo." }
  ],
  open: `*New York, Ellis Island. 14 aprile 1921, mattina. La sala grande è un oceano di voci: italiano, siciliano, yiddish, polacco, greco. Hai addosso il vestito della festa, la valigia di cartone legata con lo spago e, cucito dentro la giacca, un foglietto con un indirizzo: Mulberry Street 127, Giuseppe Amato.*

*Un medico ti guarda gli occhi con un uncino di metallo. Un funzionario ti chiede il nome tre volte, lo scrive sbagliato e ti spinge avanti. Sei in America.*

*Il traghetto ti lascia a Manhattan. I grattacieli sono più alti delle montagne di casa. Cammini per ore con la valigia in mano, fino a una strada piena di carretti, panni stesi, odore di aglio e di caffè: Mulberry Street. Sembra Palermo con la neve sporca.*

*Al numero 127, una donna in nero apre appena la porta. Ha gli occhi rossi.*

Zia Nedda: "Tu sei [il figlio|la figlia] di Turi, vero? Madonna mia… Tuo zio Pino non c'è più. È sparito una settimana fa. Ha lasciato solo debiti." *Abbassa la voce.* "E sotto il materasso, una pistola."

*In quel momento una macchina nera, lucidissima, si ferma davanti al portone. Ne scende un ragazzo elegante con il cappello di feltro e le scarpe bianche e nere. Si appoggia alla portiera, sorride e ti saluta in siciliano perfetto.*

Frankie: "Benvenut[o|a] in America, paesan[o|a]. Tuo zio mi doveva dei soldi. Ma io sono una persona ragionevole. Facciamo due passi?"`,
  opts: ["Io non devo niente a nessuno.", "*Vado con lui, ma tengo gli occhi aperti*", "Che cosa è successo a mio zio?"]
}
);
