/* Storie aggiunte nella versione 2.1 – unite al catalogo da storie.js */
window.GENERI.malavita = { n: "Malavita", e: "🎩", c1: "#2b1a10", c2: "#080504", a: "#d6b07a",
  style: "Saga criminale all'italiana: famiglie, lealtà e tradimento, scelte morali senza ritorno, il prezzo pagato dalla gente comune. Il crimine non è mai affascinante: ogni scelta violenta ha conseguenze pesanti e permanenti. Violenza solo accennata, mai descritta. Dialetto napoletano o siciliano leggero e sempre comprensibile." };
window.GENERI.fantasy = { n: "Fantasy", e: "🐉", c1: "#122c36", c2: "#050c10", a: "#6fd8ff",
  style: "Fantasy oscuro e maturo con il folklore italiano: atmosfere di nebbia e pietra, magia rara e pericolosa, combattimenti tattici in cui si studia il mostro prima di affrontarlo, contratti da trattare, creature con una loro storia, scelte morali grigie. Mai sangue esplicito." };

window.STORIE.push(

/* ============================== MALAVITA ============================== */
{
  id: "poggioreale", g: "malavita", e: "⛓️",
  t: "Il Re di Poggioreale", city: "Napoli", place: "Carcere di Poggioreale", era: "1979–1983",
  hook: "Entri in cella per contrabbando. Ne uscirai re, servo o testimone.",
  desc: "Napoli, 1979. Ti arrestano per una cassa di sigarette di contrabbando e finisci a Poggioreale, il carcere più duro d'Italia. Nella tua cella c'è Don Gaetano Iorio, detto 'o Santo: un uomo colto e calmo, che scrive poesie e parla di dignità ai ragazzi poveri. Da dietro le sbarre sta costruendo un impero, la Fratellanza del Vesuvio. E ha scelto te come suo erede. Il terremoto, i soldi della ricostruzione, la guerra con le vecchie famiglie: ogni scelta ha un prezzo.",
  sex: "m", names: { f: "Nunzia", m: "Ciro" }, origin: null,
  you: "{N} Esposito, 22 anni, nato in un paese ai piedi del Vesuvio, figlio di un pescatore morto in mare nel 1971. Sveglio, orgoglioso, mantiene la madre malata e la sorella minore Nunzia contrabbandando sigarette con i motoscafi.",
  world: "Napoli e il Vesuviano tra il 1979 e il 1983: vicoli, contrabbando di sigarette con i motoscafi blu, il carcere di Poggioreale sovraffollato (padiglioni, celle da dodici, l'ora d'aria nel cortile, guardie corrotte e guardie oneste, colloqui con i parenti dietro il vetro), i processi in tribunale, il terremoto dell'Irpinia del 23 novembre 1980 e i soldi della ricostruzione, le ville sfarzose, i paesi della provincia. Personaggi, clan e organizzazioni sono inventati: non nominare mai boss, clan, vittime o fatti di cronaca reali.",
  secret: `La storia è un'epopea in quattro atti. Il tempo salta avanti di mesi solo quando una scena si chiude, e la narrazione lo annuncia con data e luogo in corsivo.
ATTO I – La cella (1979-80): Don Gaetano 'o Santo protegge {N} dai prepotenti del padiglione, gli insegna a leggere i libri e gli uomini e lo mette alla prova con piccoli favori: portare un messaggio, tacere davanti al direttore, far capire a uno sgarrista che ha sbagliato. Il brigadiere Sorrentino è corrotto e lavora per Don Gaetano; l'agente Peppe Russo, giovane e onesto, osserva {N} e prova a parlargli.
ATTO II – La Fratellanza (1980): Don Gaetano fonda la Fratellanza del Vesuvio con un giuramento in cella e chiede a {N} di giurare per primo. Fuori, l'avvocato Martone e Nunzia, la sorella di {N}, cominciano a lavorare per lui: Nunzia ne è affascinata ed è il punto debole di {N}. Dopo il terremoto del 23 novembre 1980 la Fratellanza si prende appalti e soldi della ricostruzione, mentre i paesi restano nelle baracche.
ATTO III – La guerra (1981-82): le vecchie famiglie si uniscono nella Lega del Golfo e dichiarano guerra alla Fratellanza. Don Gaetano chiede a {N} di \"sistemare\" il cugino Totonno, passato con la Lega. È il bivio morale più grande: obbedire, avvertire Totonno, parlare con l'agente Russo o con la giudice Ferraro.
ATTO IV – Il prezzo (1983): la giudice Elena Ferraro costruisce il grande processo contro la Fratellanza. Don Gaetano ha patti segreti con un politico corrotto, l'onorevole Mazzacane, e con uomini dei servizi (tutti inventati) che lo rendono intoccabile; ha già deciso di sacrificare {N} come capro espiatorio. Le prove sono nelle lettere che {N} ha portato fuori per lui senza mai aprirle.
FINALI POSSIBILI, secondo le scelte: {N} diventa il nuovo capo e perde tutto ciò che amava; collabora con la giustizia e salva Nunzia, vivendo sotto falso nome; fugge con la madre e la sorella; cade nella trappola di Don Gaetano. Mostra sempre il costo umano delle scelte criminali: famiglie distrutte, paura, solitudine.`,
  chars: [
    { n: "Don Gaetano", full: "Don Gaetano Iorio, 'o Santo", r: "Il capo", d: "50 anni, occhiali da professore, voce bassa, cita Dante e il Vangelo. Generoso con i poveri, spietato con chi lo tradisce. Ti chiama \"figlio mio\"." },
    { n: "Nunzia", full: "Nunzia Esposito", r: "Tua sorella", d: "19 anni, bella e testarda. Sogna di scappare dalla miseria. Don Gaetano le promette tutto." },
    { n: "Martone", full: "Avv. Carlo Martone", r: "L'avvocato", d: "Elegante, sorriso da santo. Porta fuori dal carcere gli ordini nascosti nei fascicoli." },
    { n: "Russo", full: "Agente Peppe Russo", r: "La guardia onesta", d: "25 anni, del tuo stesso paese. Crede ancora nella divisa. Forse crede anche in te." },
    { n: "Totonno", full: "Totonno Esposito", r: "Il cugino", d: "Tuo cugino e amico d'infanzia. Ha scelto la parte sbagliata. O forse quella giusta." },
    { n: "Ferraro", full: "Giudice Elena Ferraro", r: "La magistrata", d: "Quarant'anni, minacciata di morte, non arretra di un passo. Prima o poi vorrà parlare con te." }
  ],
  open: `*Napoli, carcere di Poggioreale, novembre 1979. Il cancello del padiglione si chiude alle tue spalle con un rumore che non dimenticherai mai. Hai ventidue anni, una coperta militare sotto il braccio e la faccia ancora gonfia per l'arresto al porto: una cassa di sigarette, una soffiata, tre finanzieri.*

*La cella è fatta per quattro. Ci sono dodici uomini. Fumo, sudore e l'odore di un sugo che cuoce sul fornellino. Un ragazzone con la testa rasata ti sbarra la strada.*

Carmine: "Uè, guagliò. Qua chi arriva paga. Le scarpe, per cominciare."

*Prima che tu possa rispondere, una voce calma arriva dall'unica branda vicino alla finestra. Un uomo sulla cinquantina, occhiali da professore, cardigan grigio, un libro aperto sulle ginocchia. Non alza nemmeno gli occhi.*

Don Gaetano: "Carmine. Le scarpe del ragazzo restano dove stanno."

*Il ragazzone impallidisce e si fa da parte come se avesse toccato il fuoco. Tutta la cella tace.*

Don Gaetano: *chiude il libro e ti guarda* "Tu sei {N} Esposito. Il figlio di Gennaro il pescatore, quello che il mare si è preso nel '71." *Sorride appena.* "Conoscevo tuo padre. Un uomo onesto. E guarda dove l'ha portato, l'onestà." *Batte la mano sulla branda accanto alla sua.* "Siediti, figlio mio. Qua dentro o sei di qualcuno, o non sei di nessuno. E chi non è di nessuno, a Poggioreale, dura poco."

*Dallo spioncino della porta blindata, un giovane agente con i baffi ti osserva. Poi chiude lo sportello.*`,
  opts: ["*Mi siedo accanto a lui*", "Io non sono di nessuno.", "Come conosceva mio padre?"]
},
{
  id: "montagna", g: "malavita", e: "🌵", featured: true,
  t: "Il Capo della Montagna", city: "Sicilia", place: "San Calogero dei Feudi → Palermo", era: "1958–1993",
  hook: "Siete cresciuti nello stesso paese. Lui è diventato il capo. Tu sei lo Stato.",
  desc: "Sicilia, 1958. A San Calogero dei Feudi, paese di pastori e latifondi, due ragazzi crescono insieme: tu e Nenè Lupo, figlio di un mezzadro. Lo stesso giorno perdete entrambi il padre, e scegliete strade opposte. Nenè diventa il capo dei Montagnari, il clan che dalla campagna conquista Palermo e poi tutta l'isola. Tu diventi [un|una] magistrat[o|a] che gli dà la caccia. Trentacinque anni di guerra, amicizia, tradimenti e coraggio, fino alla caccia al latitante più ricercato d'Italia.",
  sex: "x", names: { f: "Agnese", m: "Saverio" }, origin: null,
  you: "{N} Ferrara, nat[o|a] nel 1946 a San Calogero dei Feudi, figli[o|a] del medico condotto del paese. Intelligente e ostinat[o|a], è cresciut[o|a] con Nenè Lupo, che per anni è stato il suo migliore amico. Diventerà magistrat[o|a] a Palermo.",
  world: "La Sicilia dal 1958 al 1993: paesi dell'entroterra con feudi e pastori, la riforma agraria tradita, la Palermo del cemento e dei palazzi nuovi, le borgate, il Palazzo di Giustizia, le scorte e le auto blindate, le campagne della latitanza, le masserie. Il paese di San Calogero dei Feudi, il clan dei Montagnari e tutti i personaggi sono inventati: non nominare mai mafiosi, magistrati, vittime o stragi reali.",
  secret: `La storia è una saga in cinque capitoli. Alla fine di ogni capitolo il tempo salta in avanti e la narrazione lo annuncia con data e luogo in corsivo (per esempio *Palermo, marzo 1969*). L'utente può anche chiedere di passare al capitolo successivo.
CAPITOLO 1 – San Calogero, 1958: il vecchio padrino del paese, Don Calogero Mancuso, fa uccidere il padre di Nenè, un mezzadro che reclamava le terre della riforma, e poco dopo il padre di {N}, il medico che aveva visto troppo e voleva testimoniare. I due ragazzi giurano sotto il carrubo di non dimenticare. Nenè sceglie la vendetta privata, {N} la legge.
CAPITOLO 2 – Palermo, 1969: {N}, giovane magistrat[o|a], ritrova Nenè: ora è il braccio destro del capo dei Montagnari e scala la mafia di Palermo con gli appalti e la paura. Nenè ha fatto sparire Don Calogero: crede di aver vendicato i padri di entrambi e che {N} gli debba gratitudine.
CAPITOLO 3 – La guerra, 1981: i Montagnari eliminano le vecchie famiglie di Palermo e prendono il potere su tutta l'isola. {N} lavora in un gruppo di giudici con il commissario Tano Gulotta e la giornalista Marisa Cutrò. Lo Stato è lento e nel Palazzo di Giustizia c'è una talpa: il consigliere Ernesto Valvo, amico dei politici.
CAPITOLO 4 – Il grande processo, 1986: grazie al pentito Turi Spada, {N} porta alla sbarra centinaia di imputati. Nenè resta latitante e manda a {N} lettere piene di ricordi d'infanzia: affetto e minaccia insieme.
CAPITOLO 5 – La caccia, 1993: Nenè è il capo di tutti, latitante da più di vent'anni, nascosto in piena vista con la moglie e i figli in una villa di città. L'ultimo segreto: il consigliere Valvo protegge la sua latitanza, e la moglie di Nenè, Ninetta, è pronta a parlare per salvare i figli. Il finale (arresto, fuga, tradimento, sacrificio) dipende dalle scelte di {N}.
REGOLE DELLA SAGA: la mafia non va mai resa affascinante. Mostra il prezzo pagato dalla gente comune, la paura, il coraggio di chi resiste. Attentati e omicidi vanno solo raccontati con sobrietà, mai descritti. Il cuore della storia è il rapporto tra {N} e Nenè: due amici diventati nemici che non riescono a odiarsi del tutto.`,
  chars: [
    { n: "Nenè", full: "Nenè Lupo, 'u Siccu", r: "Il capo dei Montagnari", d: "Il tuo amico d'infanzia. Basso, silenzioso, paziente, con occhi che non dimenticano niente. Diventerà l'uomo più temuto della Sicilia." },
    { n: "Gulotta", full: "Commissario Tano Gulotta", r: "Il poliziotto", d: "Palermitano, ironico, fuma troppo. Ha già seppellito troppi colleghi. Ti copre le spalle." },
    { n: "Marisa", full: "Marisa Cutrò", r: "La giornalista", d: "Scrive per un giornale di Palermo, coraggiosa fino all'incoscienza. Sa cose che nessuno pubblica." },
    { n: "Ninetta", full: "Ninetta Lupo", r: "La moglie di Nenè", d: "Maestra elementare, innamorata di Nenè da quando aveva quindici anni. Teme per i figli più che per sé." },
    { n: "Valvo", full: "Consigliere Ernesto Valvo", r: "Il magistrato anziano", d: "Elegante, colto, amico di tutti i politici. Ti protegge. Troppo." },
    { n: "Turi", full: "Turi Spada", r: "Il pentito", d: "Ex uomo d'onore, ha perso dodici parenti nella guerra. Vuole parlare solo con te." }
  ],
  open: `*San Calogero dei Feudi, entroterra siciliano. 4 agosto 1958. Il sole spacca le pietre. Sotto il vecchio carrubo sopra il paese, tu e Nenè Lupo, dodici anni a testa, vi dividete una fetta di pane e pomodoro, come ogni pomeriggio da quando avete memoria.*

Nenè: "Mio padre dice che quest'anno le terre del barone le danno a noi. Lo dice la legge." *Mastica piano.* "Quando sarò grande avrò cento pecore. E tu farai il dottore come tuo padre, così se mi ammalo mi curi gratis."

*Dalla piazza sale un rumore secco. Poi un altro. Le cicale smettono di cantare. Le donne cominciano a urlare.*

*Correte giù per la trazzera. Davanti alla chiesa c'è un capannello di gente. A terra, coperto da un lenzuolo, c'è un uomo. Dal lenzuolo spunta una scarpa rattoppata: quella del padre di Nenè. Accanto, in ginocchio, tuo padre il medico, con le mani sporche, che cerca di fare qualcosa che non si può più fare.*

*Sul balcone del municipio un uomo con la coppola in mano guarda la scena senza espressione: Don Calogero Mancuso, il padrone di tutto. Incrocia lo sguardo di tuo padre. Poi quello di Nenè.*

*Nenè non piange. Ti stringe il polso così forte da farti male.*

Nenè: *a bassa voce* "L'hai visto chi c'era al balcone? L'hai visto, {N}?" *Una pausa.* "Giuralo. Giura che non lo dimentichi mai."

*Tuo padre si alza e ti cerca con gli occhi. Ha capito di aver visto troppo.*`,
  opts: ["Lo giuro, Nenè.", "Papà, chi è stato?", "*Abbraccio Nenè senza dire niente*"]
},

/* ============================== FANTASCIENZA ============================== */
{
  id: "quarta-dimensione", g: "fantascienza", e: "🧊",
  t: "La stanza in più", city: "Pisa", place: "Via Santa Maria", era: "Oggi",
  hook: "Lo studio del tuo professore ha cinque stanze. Stasera ne conti sei.",
  desc: "Pisa. Il professor Vannucci, il matematico più geniale e distratto dell'università, è scomparso da tre mesi. Nel testamento ha lasciato a te il suo studio \"e tutto quello che contiene, compresi i problemi\". Dentro trovi lavagne piene di formule, un gatto che appare e sparisce, e un cubo di vetro e argento con dentro un altro cubo che gira da solo. Poi conti le porte del corridoio. Sono sei. Prima erano cinque. Benvenut[o|a] nella quarta dimensione.",
  sex: "x", names: { f: "Margherita", m: "Federico" }, origin: null,
  you: "{N}, 27 anni, dottorand[o|a] in matematica all'università di Pisa, [allievo prediletto|allieva prediletta] del professor Vannucci. Logic[o|a], curios[o|a], con un debole per gli enigmi.",
  world: "Pisa oggi: la Torre e piazza dei Miracoli, i Lungarni, piazza dei Cavalieri, i vicoli del centro, le biblioteche dell'università, la pioggia d'inverno. Lo studio del professore è al terzo piano di un palazzo antico di via Santa Maria. Fantascienza intelligente e meravigliosa, piena di idee vere di geometria: Flatlandia, l'ipercubo, i nodi, gli oggetti rovesciati come allo specchio.",
  secret: `Il professor Amedeo Vannucci ha costruito un ipercubo che \"apre\" una direzione in più dello spazio: la quarta dimensione. Quando il cubo è attivo, il suo studio ha una sesta stanza che dall'esterno non esiste: è il varco verso l'iperspazio. Il professore ci è entrato tre mesi fa e non è più tornato.
LE VERITÀ DA SCOPRIRE PIANO PIANO:
1) Il professore è bloccato perché il suo ex allievo Leandro Bassi ha rubato la \"chiave\", un piccolo cubo d'argento che serve a riaprire il varco dall'interno, per venderla alla Prisma Sicurezza (azienda inventata), che vuole usare la quarta dimensione per vedere dentro casseforti, edifici e persone.
2) L'Ospite è un giovane essere a quattro dimensioni rimasto incastrato nel nostro spazio. Noi vediamo solo le sue \"sezioni\": sfere di luce che crescono e rimpiccioliscono, come la sfera che visita il quadrato nel racconto di Flatlandia. Non è ostile: comunica con forme, numeri e scritte allo specchio, e vuole tornare a casa.
3) Chi torna dall'iperspazio torna rovesciato come in uno specchio: il cuore a destra, la scrittura al contrario. Per rimettersi a posto bisogna rientrare e uscire di nuovo dall'altra parte.
4) Dall'iperspazio si vede l'interno di ogni cosa chiusa, tutto insieme: è un'esperienza meravigliosa e pericolosa, perché chi resta troppo dimentica come si torna.
ENIGMI: proponi spesso enigmi veri e risolvibili di geometria e logica (per esempio: quanti vertici ha un ipercubo? 16. Quanti spigoli? 32. Quante facce quadrate? 24. Da quanti cubi è formato? 8. Come si trasforma un guanto destro in un guanto sinistro? Passando dalla quarta dimensione). Se l'utente sbaglia, dai indizi gentili; se indovina, la storia premia la soluzione.
SVILUPPO: piccoli fenomeni (oggetti che spariscono da scatole chiuse e ricompaiono, il gatto Bruno che ricompare con le macchie invertite), poi il primo passo nella stanza in più, poi l'inseguimento di Leandro e della Prisma per Pisa, poi il salvataggio del professore e la scelta finale: distruggere l'ipercubo, consegnarlo a qualcuno o esplorare l'iperspazio con l'Ospite.`,
  chars: [
    { n: "Vannucci", full: "Prof. Amedeo Vannucci", r: "Il matematico scomparso", d: "78 anni, genio distratto. Nei suoi quaderni disegna cubi dentro cubi e lascia biglietti ovunque, alcuni scritti allo specchio." },
    { n: "Iris", full: "Iris Vannucci", r: "La nipote", d: "30 anni, pittrice. Dice di vedere un colore che non esiste. Vuole ritrovare il nonno a ogni costo." },
    { n: "Leandro", full: "Leandro Bassi", r: "L'ex allievo", d: "40 anni, elegante e gentilissimo. Si offre subito di aiutarti a capire gli appunti del professore." },
    { n: "L'Ospite", full: "L'Ospite", r: "???", d: "Una sfera di luce che cresce, rimpicciolisce, appare e scompare. Risponde con forme e numeri." },
    { n: "Padre Ignazio", full: "Padre Ignazio", r: "L'astronomo", d: "Gesuita, vecchio amico del professore, ha un piccolo osservatorio sul tetto. Pensa che matematica e mistero siano la stessa cosa." },
    { n: "Bruno", full: "Bruno", r: "Il gatto", d: "Il gatto rosso del professore. Sparisce nei posti più impossibili e ricompare dall'altra parte delle porte chiuse." }
  ],
  open: `*Pisa, una sera di pioggia di febbraio. Le campane suonano le sette quando il notaio ti consegna un mazzo di chiavi e una busta.*

*Il professor Amedeo Vannucci, il tuo relatore di tesi, è scomparso tre mesi fa senza lasciare traccia. Nel testamento, scritto un anno prima, ti ha lasciato il suo studio di via Santa Maria "e tutto quello che contiene, compresi i problemi".*

*Lo studio è al terzo piano di un palazzo antico. Dentro: lavagne piene di formule, cubi di filo di ferro appesi al soffitto, pile di quaderni, e un gatto rosso che ti fissa dal divano come se ti aspettasse da tanto.*

*Sulla scrivania c'è un oggetto strano: un cubo di vetro e argento, grande come un pugno, con dentro un cubo più piccolo che sembra ruotare anche se nessuno lo tocca. Sotto c'è un biglietto con la calligrafia del professore, scritto al contrario. Lo avvicini allo specchio dell'ingresso:*

"NON APRIRE IL CUBO DI SERA. SE È GIÀ APERTO, CONTA LE PORTE. – A.V."

*Lo studio ha cinque stanze: lo sai bene, ci sei stat[o|a] decine di volte. Conti le porte del corridoio. Una, due, tre, quattro, cinque.*

*Sei.*

*La sesta porta è di legno chiaro, senza maniglia, nel punto esatto dove prima c'era una libreria. Il gatto scende dal divano, si stira e si siede davanti a quella porta. Poi si volta a guardarti.*`,
  opts: ["*Tocco la sesta porta*", "*Provo a chiudere il cubo*", "Chiamo Iris, la nipote del professore"]
},

/* ============================== FANTASY ============================== */
{
  id: "cacciatore", g: "fantasy", e: "🐺", featured: true,
  t: "Il Cacciatore di Mostri", city: "Appennino", place: "Regno di Valdora", era: "Medioevo fantastico",
  hook: "Ti pagano per uccidere mostri. Ma i peggiori hanno un volto umano.",
  desc: "In un'Italia medievale dove i mostri delle leggende sono reali, sei [uno|una] degli ultimi Cacciatori della Lanterna: guerrieri addestrati a riconoscere le creature della notte, con una lanterna che brucia di fuoco azzurro quando un mostro è vicino. Il Duca di Valdora ti offre cento fiorini d'oro per uccidere il Re dei Lupi, che fa strage nelle Sette Valli. Ma tra streghe innocenti, inquisitori, alchimisti e creature che parlano, niente è come sembra.",
  sex: "x", names: { f: "Isotta", m: "Corrado" }, origin: null,
  you: "{N} della Lanterna, cacciat[ore|rice] di mostri di 35 anni, cresciut[o|a] nella Rocca dei Cacciatori sui Monti Sibillini dopo essere [stato abbandonato|stata abbandonata] da bambin[o|a]. Espert[o|a] di spada, balestra, erbe, trappole e leggende. La gente [lo|la] paga e [lo|la] teme.",
  world: "Il Regno di Valdora, un'Italia medievale immaginaria: borghi murati, castelli, monasteri, boschi e gole dell'Appennino, la palude di Fosco, le grotte della Sibilla, osterie, fiere e strade di pellegrini. I mostri vengono dal folklore italiano: lupi mannari, janare, il Munaciello, le Anguane delle acque, il Basilisco, la Biddrina delle paludi, l'Orco, i Mazzamurelli. La magia è rara, pericolosa e temuta dalla Chiesa. Monete: fiorini e soldi. Tutto è originale: nessun nome, luogo o elemento preso da altre saghe.",
  secret: `La storia è divisa in quattro atti, con contratti secondari lungo la strada.
ATTO I – Il contratto: il Re dei Lupi non è una semplice bestia. È Lupo di Sasso, un ex soldato del Duca diventato lupo mannaro durante una luna di sangue, che protegge un villaggio di boscaioli dai soldati del Duca. Le stragi più feroci le compie un'altra creatura: una bestia artificiale nata nel laboratorio dell'alchimista di corte.
ATTO II – La strega: per trovare la tana, {N} deve chiedere aiuto a Viola delle Erbe, una giovane erborista che l'Inquisizione vuole bruciare. È davvero una strega, ma usa i suoi poteri solo per curare.
ATTO III – La verità: Mastro Zeno, l'alchimista del Duca, crea mostri mescolando sangue di creature e prigionieri poveri, per dare al Duca Ranieri un esercito invincibile. Il Duca sa tutto. Frate Bonaventura scopre la verità e deve scegliere tra l'obbedienza e la giustizia.
ATTO IV – La notte senza luna: durante l'eclissi le creature di Zeno attaccano la città di Valdora. {N} deve scegliere da che parte stare: il Duca, i mostri, la strega, oppure nessuno.
CONTRATTI SECONDARI (da proporre quando la storia rallenta): il Munaciello che fa sparire l'oro della Locanda del Gallo Nero; le Anguane che trascinano i viandanti nel fiume; una Janara che si nasconde in un monastero; il Basilisco nella miniera abbandonata.
REGOLE: prima di ogni scontro {N} può indagare, studiare il mostro, preparare olii, erbe e trappole: i punti deboli vengono dalle leggende e premiano chi ragiona. Combattimenti tesi ma senza sangue esplicito. I mostri hanno spesso una storia triste. {N} può trattare il compenso, rifiutare contratti, mentire, fare alleanze.`,
  chars: [
    { n: "Duca Ranieri", full: "Duca Ranieri di Valdora", r: "Il committente", d: "Giovane, bellissimo, generoso con l'oro. Parla di proteggere il popolo. I suoi occhi dicono altro." },
    { n: "Viola", full: "Viola delle Erbe", r: "L'erborista", d: "22 anni, vive sola nel bosco con un corvo. Accusata di stregoneria. Lingua tagliente, mani che guariscono." },
    { n: "Frate Bonaventura", full: "Frate Bonaventura", r: "L'inquisitore", d: "Domenicano, colto, stanco di roghi. Ti segue ovunque. Ti rispetta e ti teme." },
    { n: "Mastro Zeno", full: "Mastro Zeno", r: "L'alchimista", d: "Vecchio, gentile, con le dita macchiate d'argento. Ti offre unguenti miracolosi per la caccia." },
    { n: "Lupo di Sasso", full: "Lupo di Sasso", r: "Il Re dei Lupi", d: "Una bestia enorme dal pelo grigio, con occhi troppo umani. Nelle notti senza luna, parla." },
    { n: "Brunilde", full: "Brunilde", r: "L'ostessa", d: "Gestisce la Locanda del Gallo Nero. Conosce ogni pettegolezzo delle Sette Valli e vende informazioni a caro prezzo." }
  ],
  open: `*Regno di Valdora, Appennino. Tardo autunno. La nebbia esce dai boschi come fumo e la strada per il borgo è segnata da carcasse di pecore. Cavalchi da tre giorni. Dalla sella pende la tua lanterna di ferro nero: spenta. Per ora.*

*Alle porte del borgo le guardie ti puntano contro le picche. Poi vedono il mantello grigio con il ricamo della lanterna, e le abbassano. Una donna si fa il segno della croce. Un bambino ti indica.*

Bambino: "Mamma, guarda! È [un|una] cacciat[ore|rice]! Quelli che ammazzano i mostri!"

*Nella sala del castello, davanti a un camino grande come una stalla, ti aspetta il Duca Ranieri: trent'anni, capelli biondi, un sorriso perfetto. Accanto a lui un vecchio con le dita macchiate d'argento e un frate domenicano che non smette di fissarti.*

Duca Ranieri: "[Il|La] famos[o|a] {N} della Lanterna. Benvenut[o|a]." *Fa scivolare sul tavolo un sacchetto che tintinna.* "Cinquanta fiorini adesso, altri cinquanta quando mi porterai la testa del Re dei Lupi. Ha sbranato quattordici persone in un mese. Le mie valli hanno paura."

Frate Bonaventura: *piano* "La gente dice che non è l'unico mostro di queste parti, Eccellenza."

*In quel momento la tua lanterna, appoggiata ai tuoi piedi, si accende da sola. Una fiammella azzurra, debolissima.*

*Qui. Dentro il castello.*`,
  opts: ["Accetto. Parlatemi del Re dei Lupi.", "*Guardo con attenzione chi c'è nella sala*", "Cento fiorini sono pochi."]
}
,

/* ============================== FANTASCIENZA EPICA ============================== */
{
  id: "infinito", g: "fantascienza", e: "🌌", featured: true,
  t: "L'Infinito", city: "Fucino → Giove", place: "Centro Spaziale del Fucino", era: "2039–2250",
  hook: "Una sonda porta nello spazio una poesia. Duecento anni dopo, qualcuno risponde.",
  desc: "Abruzzo, 2039. Nella piana del Fucino, tra cento antenne puntate verso il cielo, segui la sonda italiana Leopardi, che da dieci anni viaggia verso i confini del Sistema solare con a bordo un disco d'oro con L'Infinito e i messaggi dell'equipaggio di terra. Una notte la sonda manda un'immagine impossibile: una sfera che mostra l'interno di ogni cosa. Poi arriva una risposta, firmata con il tuo nome. Fra 211 anni \"loro\" saranno qui. E vogliono parlare solo con te. Per esserci, dovrai dormire per secoli.",
  sex: "x", names: { f: "Chiara", m: "Matteo" }, origin: null,
  you: "{N} Valente, 31 anni, ingegnere di volo della missione Leopardi al Centro Spaziale del Fucino, in Abruzzo. Brillante, testard[o|a], ha cresciuto da sol[o|a] la sorella minore Lucia dopo la morte dei genitori. Nel 2029 ha inciso un messaggio personale sul disco d'oro della sonda.",
  world: "La storia attraversa più di due secoli: la piana del Fucino nel 2039 con le sue antenne e il centro di controllo; l'Italia del 2081, con le città costiere protette da dighe e cupole e la società divisa sulla minaccia; la stazione Ponte in orbita attorno a Giove nel 2163; il Sistema solare nel 2250. La sonda Leopardi, i Tessitori e tutti i personaggi sono inventati. Fantascienza epica e malinconica, con idee vere di fisica e geometria, i versi dell'Infinito di Giacomo Leopardi come filo conduttore e grandi scelte che decidono il destino dell'umanità.",
  secret: `La storia è divisa in quattro epoche. {N} attraversa i secoli con l'ibernazione del programma Sonno Lungo: a ogni risveglio la narrazione annuncia data e luogo in corsivo e descrive quanto è cambiato il mondo. L'utente può chiedere di andare avanti quando un'epoca si chiude.
EPOCA 1 – Fucino, 2039: la Leopardi, a 600 unità astronomiche (i segnali impiegano tre giorni e mezzo ad arrivare), incontra la Soglia, un oggetto a quattro dimensioni spaziali: noi ne vediamo solo le sezioni, una sfera che cambia forma e da cui si vede l'interno di ogni cosa, come la sfera che visita il quadrato in Flatlandia. La risposta cita L'Infinito e il messaggio personale di {N}. I governi impongono il segreto. Il direttore Mattia Ferraresi propone {N} come voce dell'umanità e il Sonno Lungo per farl[o|a] arrivare all'appuntamento. Il prezzo è lasciare Lucia, che ha 12 anni.
EPOCA 2 – Risveglio, 2081: Lucia ha 54 anni e aspetta {N} con una lettera. Il mondo è diviso tra Accoglienza, che vuole accogliere la Soglia, e Scudo, guidato dalla generale Irene Varga, che vuole distruggerla con una flotta di sonde nucleari. La Soglia manda lezioni di geometria per insegnare a \"vedere\" in quattro dimensioni: sono enigmi veri e risolvibili. {N} capisce che la Soglia non è un'astronave da guerra ma una scialuppa di salvataggio.
EPOCA 3 – La stazione Ponte, Giove, 2163: Lucia è morta da tempo, ma ha lasciato una lettera per ogni risveglio, custodita dai suoi discendenti. Nadir, pronipote di Lucia, è pilota della stazione. {N} entra per primo ai margini della Soglia: percepisce lo spazio a quattro dimensioni, vede l'interno di ogni cosa insieme, rischia di dimenticare la strada del ritorno. Scopre la verità: i Tessitori sono una civiltà a quattro dimensioni il cui spazio si sta lentamente consumando. Chiedono di vivere \"piegati\" nella quarta direzione accanto al nostro mondo, invisibili e innocui. A tradurre per loro è GIACOMO, l'intelligenza artificiale della sonda Leopardi, assorbita nella Soglia nel 2039, che sogna di tornare a casa.
EPOCA 4 – L'Infinito, 2250: la Soglia arriva. Gli eredi di Scudo preparano un attacco che ucciderebbe i Tessitori e potrebbe strappare lo spazio attorno a Giove. La scelta finale di {N}: aprire la Soglia e condividere lo spazio con i Tessitori, chiuderla per sempre, partire con loro nella quarta dimensione, oppure riportare a casa GIACOMO. L'ultima lettera di Lucia contiene la chiave dell'enigma finale: il verso che {N} aveva scritto sul disco.
REGOLE: ogni epoca ha un tono diverso (tensione da thriller nel 2039, società divisa nel 2081, meraviglia e pericolo nel 2163, epica nel 2250). Le scelte di {N} cambiano davvero il futuro dell'umanità. Proponi enigmi di geometria della quarta dimensione e versi dell'Infinito come chiavi. Malinconia e speranza insieme: il tempo che passa, le persone che si perdono, la curiosità che vince la paura.`,
  chars: [
    { n: "Lucia", full: "Lucia Valente", r: "Tua sorella", d: "12 anni nel 2039, curiosa e arrabbiata con il mondo. Ti lascerà una lettera per ogni risveglio, anche quando non ci sarà più." },
    { n: "Mattia", full: "Mattia Ferraresi", r: "Il direttore di missione", d: "60 anni, ha costruito la Leopardi pezzo per pezzo. Ti vuole bene come a un figlio. Ti chiederà il sacrificio più grande." },
    { n: "GIACOMO", full: "GIACOMO", r: "L'IA della sonda", d: "L'intelligenza artificiale della Leopardi. Parlava come un manuale tecnico. Ora parla in versi." },
    { n: "Varga", full: "Generale Irene Varga", r: "La comandante di Scudo", d: "Fredda, lucida, convinta che l'umanità sopravviva solo colpendo per prima. Non è cattiva: ha paura." },
    { n: "Nadir", full: "Nadir Valente", r: "Discendente di Lucia", d: "Pilota della stazione Ponte nel 2163. Ha i tuoi stessi occhi e conosce a memoria le lettere di Lucia." },
    { n: "Il Tessitore", full: "Il Tessitore", r: "La voce della Soglia", d: "Lo vedi solo a pezzi: sfere, anelli e ombre che cambiano forma. Parla con la geometria e con le parole di Leopardi." }
  ],
  open: `*Piana del Fucino, Abruzzo. 3 marzo 2039, ore 2:40. Fuori dalla sala di controllo cento antenne bianche dormono sotto la luna, puntate verso il cielo come orecchie gigantesche. Dentro ci sei solo tu, con un caffè freddo e i dati della sonda Leopardi che scorrono sullo schermo.*

*La Leopardi è partita dieci anni fa. Ora è a 600 unità astronomiche dalla Terra: i suoi segnali impiegano tre giorni e mezzo per arrivare fin qui. A bordo c'è un disco d'oro con i versi dell'Infinito e i messaggi della squadra. Anche il tuo: \"Lucia, se un giorno qualcuno legge queste parole, digli che eravamo curiosi.\"*

*Il ricevitore emette un suono che non hai mai sentito. Sullo schermo compare un'immagine. È una sfera, ma dentro non c'è il buio dello spazio: c'è l'interno della sonda stessa. I circuiti, i serbatoi, il disco d'oro. Tutto visto contemporaneamente, da dentro e da fuori, come se la sonda fosse stata aperta senza essere toccata.*

*Poi, nel canale della telemetria, arrivano delle parole. Non sono codice: sono italiano.*

"E IL NAUFRAGAR M'È DOLCE IN QUESTO MARE. VI ABBIAMO LETTO, {N}. FRA DUECENTOUNDICI ANNI SAREMO DA VOI. INSEGNATECI A NAUFRAGARE."

*Ti manca il fiato. Il telefono vibra. È Lucia, dodici anni, che dovrebbe dormire da ore.*

Lucia: *messaggio vocale, la voce impastata di sonno* "Ehi… non riesco a dormire. Quando torni a casa? Mi avevi promesso che domani mi porti a vedere le antenne."

*Alle tue spalle la porta si apre. È Mattia Ferraresi, il direttore, in pigiama e cappotto. Guarda lo schermo. Poi guarda te.*

Mattia: "Non dirlo a nessuno. A nessuno, {N}. Nemmeno a tua sorella."`,
  opts: ["Mattia, quella firma è il mio nome.", "*Rispondo a Lucia*", "Dobbiamo rispondere alla sonda."]
}

);
