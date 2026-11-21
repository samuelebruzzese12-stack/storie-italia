/* Storie aggiunte nella versione 2.3: fantascienza e guerra */
window.GENERI.guerra = { n: "Guerra", e: "🎖️", c1: "#30331f", c2: "#0b0c07", a: "#e9a55b",
  style: "Racconto di guerra realistico e umano: fango, freddo, fame, paura, cameratismo, lettere da casa, ordini assurdi e scelte morali. Rispetto dei fatti storici, dei luoghi, delle date, delle armi e delle uniformi. La violenza è raccontata con sobrietà e con le sue conseguenze, mai compiaciuta né descritta nei dettagli. Il nemico è fatto di persone. Nessuna ideologia viene glorificata." };

window.STORIE.push(

/* ============================== FANTASCIENZA ============================== */
{
  id: "prometti", g: "fantascienza", e: "🪐", featured: true,
  t: "Prometti che torni", city: "Murge → oltre Nettuno", place: "Spazioporto di Grottaglie", era: "2071–2120",
  hook: "Ogni ora vicino al buco nero sono tre anni per tua figlia. E l'umanità ha bisogno che tu resti.",
  desc: "Puglia, 2071. Le nebbie rosse di sabbia coprono le Murge e la Ruggine Bianca, un fungo che nessuno sa fermare, sta uccidendo l'ultimo grano d'Europa. Eri il miglior pilota collaudatore dell'Aeronautica; ora coltivi la terra di famiglia con tua figlia Nina, 9 anni. Una notte un elicottero militare atterra nel campo morto: oltre Nettuno si è aperto un varco verso un'altra galassia, e dall'altra parte, su un mondo che gira attorno al buco nero Sibilla, forse cresce una cura. Nina ti mette in mano un chicco di grano: «Prometti che torni». Ma laggiù il tempo scorre in un altro modo.",
  sex: "x", names: { f: "Elena", m: "Davide" }, origin: null,
  you: "{N} Conte, 38 anni, ex pilota collaudat[ore|rice] dell'Aeronautica Militare: l'unic[o|a] ad aver riportato a terra un prototipo ipersonico in avaria. Dopo la morte [della moglie Marta|del marito Marco] ha lasciato il volo e coltiva il grano di famiglia nelle Murge, con la figlia Nina e la madre Addolorata. Testard[o|a], ironic[o|a], incapace di dire di no a una sfida impossibile.",
  world: "Italia e spazio profondo, 2071–2120. La Terra si sta ammalando: dieci anni di siccità, le nebbie rosse di sabbia del Sahara che oscurano il sole per giorni, la Ruggine Bianca che uccide frumento, mais e riso. In Europa si razionano pane e acqua; le città sul mare sono protette da dighe. Lo spazioporto di Grottaglie, vicino a Taranto, è il cuore segreto della missione TARAS, voluta da un Consiglio d'Emergenza Europeo diviso e spaventato. Oltre l'orbita di Nettuno c'è il Varco di Galileo, una galleria nello spazio scoperta venticinque anni prima; dall'altra parte, il sistema del buco nero Sibilla, con tre mondi esplorati dalle sonde: Lete, Ausonia e Scilla. Personaggi e missione sono inventati. Fantascienza realistica ed emotiva: relatività, viaggi lunghissimi, il prezzo del tempo, l'amore tra un genitore e una figlia.",
  secret: `La storia è divisa in quattro atti. Quando il tempo passa in modo diverso tra la nave e la Terra, indicalo sempre in corsivo, per esempio *Sulla Terra sono passati 9 anni. Nina ne ha 18.*
ATTO 1 – Le Murge, 2071: il generale Ettore Lanza, vecchio comandante di {N}, chiede di pilotare la TARAS. Dodici anni fa le sonde hanno trovato su Lete, un mondo vicinissimo a Sibilla, le Piante Lanterna, la cui linfa ferma la Ruggine Bianca. Servono campioni vivi e un pilota capace di volare tra le maree gravitazionali. Nina non vuole che {N} parta; nonna Addolorata, radioamatrice, promette di tenere sempre accesa la radio di casa. Nina regala a {N} un chicco di grano Senatore Cappelli, il grano antico della Puglia.
ATTO 2 – Il Varco e Lete: due anni di ibernazione fino a Nettuno. Attraversare il Varco: le stelle si piegano, la luce gira su se stessa. Lete orbita così vicino a Sibilla che ogni ora sulla sua superficie corrisponde a circa tre anni sulla Terra. È un mondo di laghi bassi e foreste di cristallo che cantano quando passa la marea gravitazionale; le Piante Lanterna si aprono solo durante la marea. Ogni ora in più per prendere campioni migliori costa anni a Nina.
ATTO 3 – Il Protocollo Enea: tornati in orbita, arrivano tutti insieme i messaggi radio accumulati: Nina che cresce, la voce che cambia, la rabbia, il perdono; nonna Addolorata che non c'è più; Nina adulta che guida i Seminatori, i contadini che difendono gli ultimi campi. Ilaria scopre nel file sigillato di Lanza il Protocollo Enea: se la cura non arriva entro una certa data, la TARAS non deve tornare, ma mandare le coordinate di Ausonia, il mondo abitabile più lontano dal buco nero, alle Arche del Consiglio, navi riservate a pochi privilegiati. Il consigliere Bertoni ordina di obbedire. Lanza, ormai vecchio, ha mentito per far partire la missione e se ne vergogna.
ATTO 4 – Sibilla: il carburante non basta per tornare in tempo. L'unica rotta è una fionda gravitazionale rasente all'orizzonte di Sibilla, che costerà decenni sulla Terra. Scelte possibili: tornare con la cura e ritrovare Nina adulta o anziana; mandare a casa la navetta con Ilaria e Sandro e restare indietro; rivelare al mondo il Protocollo Enea attraverso la radio di Nina; fondare una colonia su Ausonia. La vera chiave: il chicco di Nina, incrociato con la Pianta Lanterna, crea un grano che la Ruggine non può uccidere.
REGOLE: la relatività deve essere coerente (vicino a Sibilla il tempo rallenta, lontano scorre normale). I messaggi da casa sono il cuore emotivo della storia. Nessun alieno: la meraviglia viene dall'universo stesso. Le scelte di {N} cambiano davvero il futuro della Terra e il rapporto con Nina.`,
  chars: [
    { n: "Nina", full: "Nina Conte", r: "Tua figlia", d: "9 anni, testarda come te, vuole fare l'astronoma. Ti regala un chicco di grano antico. Crescerà mentre tu sei via." },
    { n: "Addolorata", full: "Nonna Addolorata", r: "Tua madre", d: "Settant'anni, radioamatrice, superstiziosa e coraggiosa. Promette che la radio di casa resterà sempre accesa per te." },
    { n: "Lanza", full: "Generale Ettore Lanza", r: "Il capo della missione", d: "Il tuo vecchio comandante. Ti stima più di chiunque. Custodisce un ordine segreto che lo divora." },
    { n: "Ilaria", full: "Dottoressa Ilaria Sarti", r: "La botanica di bordo", d: "Genetista della Banca dei Semi di Bari, ironica e brillante. Crede che la natura abbia già trovato la cura: basta saperla ascoltare." },
    { n: "Sandro", full: "Sandro Ferri", r: "L'ingegnere di bordo", d: "Tarantino, figlio dell'acciaieria, scommette su tutto e ha paura del buio. A casa ha lasciato due gemelli di cinque anni." },
    { n: "Bertoni", full: "Consigliere Livio Bertoni", r: "Il Consiglio d'Emergenza", d: "Elegante, calmo, convinto che salvare tutti sia impossibile. Parla con la nave solo attraverso messaggi registrati." }
  ],
  open: `*Murge, Puglia. Ottobre 2071, mezzanotte. La nebbia rossa è arrivata dal mare all'ora di cena e adesso copre tutto: il trullo, il silos vuoto, i campi di grano bianchi di Ruggine. Da tre giorni il sole è una moneta arancione.*

*In cucina nonna Addolorata gira le manopole della sua vecchia radio. Nina, 9 anni, in pigiama, segna su un quaderno le stelle che non si vedono più.*

Nina: "Ho letto che Nettuno è così lontano che la luce ci mette quattro ore ad arrivare. Tu ci saresti capace di arrivarci, a Nettuno?"

*Prima che tu possa rispondere, i vetri cominciano a tremare. Un rombo di pale, una luce bianca che taglia la nebbia. Un elicottero dell'Aeronautica atterra in mezzo al grano morto, e dal portellone scende un uomo con il cappotto militare e il bastone. Lo riconosci dal modo di camminare: il generale Ettore Lanza, il tuo vecchio comandante.*

Lanza: "Otto anni senza una telefonata, {N}. Poi ti cerco io e ti trovo a coltivare polvere." *Si toglie il berretto, guarda Nina e abbassa la voce.* "Ho bisogno di te per un volo. Il più lungo che un essere umano abbia mai fatto."

*Nonna Addolorata spegne la radio. Nina ti stringe la mano così forte da farti male.*

Nina: "Non andare. O se vai, prometti che torni."`,
  opts: ["Generale, ho chiuso con il volo.", "*Prendo in braccio Nina*", "Fin dove, esattamente?"]
},

{
  id: "tripodi", g: "fantascienza", e: "☄️", featured: true,
  t: "La Notte dei Tripodi", city: "Roma → Gran Sasso", place: "Testaccio", era: "Oggi",
  hook: "Cadono stelle in pieno giorno. Poi dal Tevere si alza il primo Tripode.",
  desc: "Roma, un sabato di ottobre. È il tuo weekend con i figli: Martina, 16 anni, che filma tutto, e Pietro, 7, che crede ai giganti buoni. Verso le quattro del pomeriggio cominciano a cadere stelle in pieno giorno sulla campagna romana. Alle cinque si spengono i telefoni, le auto, le luci. Alle sei, dal Tevere vicino a Ponte Garibaldi, si alza una macchina alta come un palazzo su tre zampe. Hai un taxi che non parte, due figli da proteggere e un'idea sola: portarli via, fino [alla loro madre|al loro padre], oltre l'Appennino.",
  sex: "x", names: { f: "Valentina", m: "Massimo" }, origin: null,
  you: "{N} Marini, 39 anni, tassista romano di Testaccio, separat[o|a]. Simpatic[o|a], disordinat[o|a], sempre in ritardo: i figli vivono con [la madre Sara|il padre Luca] a Teramo e ti vedono un weekend al mese. Conosci ogni scorciatoia di Roma e non sei mai stat[o|a] [un eroe|un'eroina].",
  world: "Roma e il centro Italia, oggi, durante un'invasione. Le stelle cadenti sono cilindri arrivati dallo spazio; dopo poche ore ne escono i Tripodi, macchine su tre zampe alte quaranta metri che bruciano tutto con un raggio di calore e catturano le persone in gabbie appese. Un impulso ha spento tutta l'elettronica moderna: funzionano solo le cose vecchie (una Fiat 500 del '72, un'Ape Piaggio, le radio a valvole, una cinepresa a molla, i fucili più semplici). Dietro ai Tripodi cresce l'Erba Rossa, una vegetazione aliena che soffoca fiumi e campi. La fuga attraversa Roma, la Via Salaria, i paesi della Sabina, il Gran Sasso con i suoi Laboratori sotto la montagna, fino a Teramo. Ispirata ai temi della Guerra dei mondi di H.G. Wells: personaggi e vicende sono originali.",
  secret: `ATTO 1 – Roma brucia: i Tripodi escono dal Tevere e dalla campagna; i Granatieri non riescono a fermarli. {N} capisce che funzionano solo i motori vecchi e chiede aiuto al Sorcio, il meccanico del quartiere, che ha una Fiat 500 del 1972. Martina vuole riprendere tutto con la cinepresa a molla del nonno; Pietro vuole parlare con «i giganti». Prima scelta morale: caricare degli sconosciuti in macchina oppure no.
ATTO 2 – La Salaria: esodo di migliaia di persone a piedi; la folla vuole la vostra macchina. Rifugio nella cantina di un casale vicino a Rieti con Sor Augusto, un vecchio contadino che diventa sempre più disperato e rumoroso, mentre una sonda metallica del Tripode fruga tra le stanze. Martina viene separata dal gruppo e catturata in una gabbia appesa a un Tripode, insieme ad altri prigionieri: salvarla è la grande prova di {N}.
ATTO 3 – Il Gran Sasso: nei Laboratori Nazionali sotto la montagna, protetti dall'impulso, la fisica Bianca Ferraro studia i Tripodi insieme al tenente Amedeo Russo. I filmati di Martina sono le uniche immagini che il mondo ha dell'invasione. Indizi: l'Erba Rossa diventa grigia e muore vicino alle sorgenti; i Tripodi rallentano, perdono un liquido scuro, sembrano tossire. Pietro capisce prima degli adulti che i Tripodi stanno male.
ATTO 4 – Il silenzio: gli invasori si ammalano, perché non hanno difese contro i microbi della Terra, che noi respiriamo da sempre. Ma un Tripode morente è più pericoloso di uno sano. Ultimo viaggio verso Teramo, fino [alla madre|al padre] dei ragazzi. Finali possibili: la famiglia di nuovo insieme, Martina che diventa la voce del mondo, {N} che sceglie di tornare indietro ad aiutare chi è rimasto.
REGOLE: tensione continua e paura vera, ma il cuore della storia è un genitore che impara a proteggere i figli e a farsi rispettare da loro. Il raggio di calore si descrive con la luce, il calore e il silenzio dopo, mai con dettagli crudi. Le persone reagiscono in modo realistico: egoismo, coraggio, panico, solidarietà.`,
  chars: [
    { n: "Martina", full: "Martina Marini", r: "Tua figlia", d: "16 anni, ti tratta come una persona estranea da quando vi siete separati. Filmava tutto con il telefono; ora gira con la vecchia cinepresa a molla del nonno." },
    { n: "Pietro", full: "Pietro Marini", r: "Tuo figlio", d: "7 anni, il dinosauro di pezza sempre in mano. Crede che i Tripodi siano giganti buoni che si sono persi." },
    { n: "Il Sorcio", full: "Remo «il Sorcio» Cianfrocca", r: "Il meccanico di Testaccio", d: "Settant'anni, una Fiat 500 del '72 perfetta e una battuta per tutto. Ripara solo macchine vecchie, «perché quelle nuove so' computer»." },
    { n: "Sor Augusto", full: "Sor Augusto", r: "Il contadino della cantina", d: "Vive da solo in un casale vicino a Rieti. Ospitale all'inizio, poi sempre più disperato. La paura lo rende pericoloso." },
    { n: "Russo", full: "Tenente Amedeo Russo", r: "Granatieri di Sardegna", d: "28 anni, ha perso il suo plotone sul Lungotevere. Ha un vecchio fucile che funziona ancora e una promessa da mantenere." },
    { n: "Bianca", full: "Dottoressa Bianca Ferraro", r: "La fisica del Gran Sasso", d: "Studia le particelle sotto 1400 metri di roccia. Ora studia i Tripodi, e i filmati di Martina sono il suo tesoro." }
  ],
  open: `*Roma, Testaccio. Un sabato di ottobre, ore 16:10. Hai appena parcheggiato il taxi davanti al mercato. Martina, 16 anni, è sul sedile dietro con gli auricolari e lo sguardo di chi vorrebbe essere ovunque tranne che qui. Pietro, 7, ti tira la manica e indica il cielo.*

Pietro: "Guarda! Le stelle cadenti di giorno!"

*Ha ragione. Sopra i tetti scendono tre, quattro, dieci scie bianche, lente, verso sud, verso la campagna. Poi un boato lontano, come un temporale che non finisce. La gente del mercato esce in strada con i telefoni alzati.*

Martina: "Sicuro è un'esercitazione." *Ma intanto filma anche lei.*

*Alle 17:02 tutto si spegne insieme: i telefoni, i semafori, il taxi, le insegne. Silenzio. Un piccione si posa sul cofano. In fondo alla via, la nebbia sul Tevere diventa verde.*

*Alle 17:40, da sotto Ponte Garibaldi, l'acqua comincia a bollire. Qualcosa si alza dal fiume, piano: una cupola di metallo grande come una chiesa, poi tre zampe lunghissime, articolate, che si piantano sul Lungotevere. Un suono enorme, profondo, fa vibrare le finestre di tutta Testaccio.*

*La gente urla. Pietro guarda con gli occhi spalancati, più curioso che spaventato.*

Pietro: "È un gigante! Possiamo salutarlo?"

*Dalla cupola esce un raggio di luce bianca. Dove tocca, le auto diventano fiamme.*`,
  opts: ["Martina, prendi tuo fratello. Via!", "*Trascino i ragazzi in un portone*", "Il taxi non parte… il Sorcio!"]
},

/* ============================== GUERRA ============================== */
{
  id: "italia-spezzata", g: "guerra", e: "🦅", featured: true,
  t: "L'Italia Spezzata", city: "Pavia, fronte del Ticino", place: "Ponte Coperto", era: "1936–1938 · ucronia",
  hook: "La Germania ha vinto la Grande Guerra. L'Italia è divisa in cinque. Tua sorella è dall'altra parte del fiume.",
  desc: "1936, ma non il nostro. Il Kaiser ha vinto la Weltkrieg, l'Austria ha umiliato l'Italia e la penisola si è spezzata: a Milano la Repubblica Italiana, sorvegliata da Vienna; a ovest la Repubblica Socialista Italiana dei sindacalisti, alleata della Comune di Francia; a Roma il Papa; al Sud le Due Sicilie; in Sardegna i Savoia. Sei un sergente dei bersaglieri repubblicani sul fronte del Ticino, a Pavia. Dall'altra parte del fiume, con il fazzoletto rosso delle Guardie sindacaliste, c'è tua sorella gemella. Il Lunedì Nero ha fatto crollare la borsa di Berlino, e la seconda Weltkrieg sta per cominciare.",
  sex: "m", names: { f: "Libera", m: "Guido" }, origin: null,
  you: "{N} Ardigò, 26 anni, sergente dei bersaglieri della Repubblica Italiana, nato a Pavia nel 1910. Figlio di un ferroviere socialista morto nella guerra civile del 1919, ha scelto l'esercito per mantenere la madre; sua sorella gemella Libera ha scelto la rivoluzione. Coraggioso, ironico, stanco di vedere italiani sparare su altri italiani.",
  world: "Ucronia ispirata al mondo di Kaiserreich e Kaiserredux. Nel 1917 la Germania non ha ripreso la guerra sottomarina, gli Stati Uniti non sono intervenuti e gli Imperi Centrali hanno vinto la Weltkrieg. L'Italia, sconfitta dall'Austria-Ungheria, è precipitata nella guerra civile e si è divisa: la Repubblica Italiana con capitale Milano (Lombardia e Veneto, sotto la tutela di Vienna), la Repubblica Socialista Italiana sindacalista appoggiata dalla Comune di Francia, lo Stato Pontificio a Roma, il Regno delle Due Sicilie al Sud, il Regno di Sardegna dei Savoia. In Francia e in Gran Bretagna governano i sindacalisti dell'Internazionale; la Germania guida il Reichspakt e Mitteleuropa. Pavia è una città di frontiera: trincee lungo il Ticino, il Ponte Coperto minato, contrabbando, spie, profughi, osterie piene di soldati. Armi e mezzi del 1936: fucili Carcano, mitragliatrici Fiat, autoblindo Lancia. Personaggi principali inventati; i capi politici reali restano sullo sfondo e non vengono mai citati per nome.",
  secret: `ATTO 1 – Il Ticino, estate 1936: tregua armata sul fiume. {N} comanda una squadra al Ponte Coperto. Di notte, dalla sponda rossa, arrivano messaggi in bottiglia: sono di Libera, commissaria politica delle Guardie Rosse sindacaliste. Vuole incontrare {N} all'isolotto delle Garzaie, in mezzo al fiume: ha saputo che a Milano qualcuno prepara un colpo di stato.
ATTO 2 – Il Lunedì Nero e il complotto: la crisi fa crollare la lira e i salari; scioperi a Milano, rivolta a Venezia contro il governo. I nazionalisti dell'ANI, guidati dal colonnello Ruggero Valsecchi, preparano un colpo di stato per fare della Repubblica una dittatura militare e «riunire l'Italia col ferro». Il capitano Bassi, superiore di {N}, è con loro. {N} deve scegliere: obbedire, avvisare il governo o usare quell'informazione per proteggere Libera.
ATTO 3 – L'isolotto: Libera rivela che la Repubblica Socialista attaccherà appena la Comune di Francia entrerà in guerra contro la Germania. Ma anche tra i rossi c'è chi vuole la dittatura del partito e vede Libera come una traditrice. Si muovono due spie: il maggiore austriaco Anton Kessler, per cui l'Italia è una scacchiera, e un agente francese senza nome. In una notte di nebbia {N} può disertare, consegnare Libera, oppure tentare un piano folle: una tregua segreta tra i soldati delle due sponde.
ATTO 4 – La seconda Weltkrieg, 1937-38: la Comune di Francia attacca il Reichspakt; i sindacalisti passano il Ticino e Pavia diventa un campo di battaglia. Finali possibili: l'Italia riunita sotto Milano e Vienna, sotto i sindacalisti, sotto una dittatura nazionalista, oppure una pace tra italiani nata dal basso, dalle trincee del Ticino. Il destino di Libera e della madre Teresa dipende dalle scelte di {N}.
REGOLE: guerra di trincea e politica: ogni fazione ha ragioni e colpe, nessuna ideologia è perfetta. Il cuore della storia sono i due gemelli divisi dal fiume e il sogno di un'Italia di nuovo unita. Usa con naturalezza i termini del mondo di Kaiserreich (Weltkrieg, Internazionale, Reichspakt, Mitteleuropa, Lunedì Nero, sindacalisti).`,
  chars: [
    { n: "Libera", full: "Libera Ardigò", r: "Tua sorella gemella", d: "Commissaria delle Guardie Rosse sindacaliste. Brillante, idealista, dura come vostro padre. Ti scrive messaggi in bottiglia attraverso il fiume." },
    { n: "Bassi", full: "Capitano Oreste Bassi", r: "Il tuo comandante", d: "Eroe della guerra civile, onesto con i soldati, ma convinto che solo una dittatura possa salvare l'Italia." },
    { n: "Valsecchi", full: "Colonnello Ruggero Valsecchi", r: "Il capo dei nazionalisti", d: "Elegante, magnetico, parla di un'Italia unita «col ferro e col fuoco». Cerca uomini come te." },
    { n: "Kessler", full: "Maggiore Anton Kessler", r: "L'osservatore austriaco", d: "Ufficiale di Vienna di stanza a Pavia, gentile e colto, parla un italiano perfetto. Per lui l'Italia è una scacchiera." },
    { n: "Locatelli", full: "Caporale Michele Locatelli", r: "Il tuo migliore amico", d: "Bergamasco, gigante buono, suona l'armonica in trincea. Sogna di tornare in valle a fare il casaro." },
    { n: "Teresa", full: "Teresa Ardigò", r: "Tua madre", d: "Vedova, gestisce un'osteria vicino al Ponte Coperto. Ama i due figli allo stesso modo e non perdona nessuna delle due bandiere." }
  ],
  open: `*Pavia, fronte del Ticino. 17 agosto 1936, ore 23. L'afa non passa nemmeno di notte. Dalla tua postazione sotto il Ponte Coperto vedi il fiume nero e, sull'altra riva, i fuochi delle Guardie Rosse sindacaliste. Da quella parte sventola una bandiera rossa con un martello e una spiga. Dalla tua, il tricolore senza stemma della Repubblica.*

*Il caporale Locatelli suona piano l'armonica. Dalla radio dell'osteria arriva il giornale radio di Milano: a Berlino la borsa è crollata, e già lo chiamano Lunedì Nero.*

Locatelli: "Sergente, se i tedeschi falliscono, chi paga gli austriaci? E se non pagano gli austriaci, chi paga noi?"

*In quel momento, tra le canne della riva, qualcosa sbatte contro un sasso. Una bottiglia verde, tappata con la cera. Dentro c'è un foglio arrotolato. La calligrafia la riconosceresti tra mille: è quella di tua sorella Libera.*

*«{N}, fratello mio. Domani notte, all'isolotto delle Garzaie, quando suona la campana di San Michele. Da solo. A Milano qualcuno vuole prendersi la Repubblica, e poi la guerra. Se mi credi ancora, vieni. – L.»*

*Dietro di te scricchiolano gli stivali sulla ghiaia. È il capitano Bassi, con la sigaretta accesa nascosta nel palmo.*

Bassi: "Novità dal fiume, sergente?"`,
  opts: ["Niente, capitano. Solo rane.", "*Gli mostro la bottiglia*", "*Nascondo il foglio nella giubba*"]
},

{
  id: "mentone", g: "guerra", e: "🏔️",
  t: "La Sentinella di Mentone", city: "Mentone → Bir Hakeim → Nizza", place: "Avamposto sul confine", era: "1940–1944",
  hook: "Sei un soldato francese, ma i tuoi genitori sono di Ventimiglia. Il 10 giugno 1940 l'Italia ti dichiara guerra.",
  desc: "Mentone, giugno 1940. Sei un soldato francese di 21 anni, figlio di emigrati liguri: a casa si parla il dialetto di Ventimiglia, in caserma ti chiamano «Rital». La Germania ha sfondato a Sedan e marcia su Parigi; il 10 giugno l'Italia dichiara guerra alla Francia. Ti mandano in un piccolo avamposto di cemento sulla strada del confine, con otto compagni e l'ordine di non arretrare. Dall'altra parte del ponte avanzano alpini e fanti italiani, e tra loro potrebbe esserci tuo cugino Nino. Da qui comincia una guerra che ti porterà nel deserto di Bir Hakeim e poi di nuovo a casa, a liberare Nizza.",
  sex: "m", names: { f: "Mireille", m: "Lucien" }, origin: null,
  you: "{N} Bertolotti, 21 anni, soldato francese di un battaglione alpino di fortezza, nato a Mentone da genitori di Ventimiglia emigrati nel 1912. Pescatore come il padre, nuotatore formidabile, parla francese, italiano e il dialetto ligure. Ironico, leale, diviso a metà tra due patrie.",
  world: "Francia e Mediterraneo dal 1940 al 1944, con fatti storici veri e personaggi inventati. Giugno 1940: la battaglia delle Alpi occidentali, quando poche migliaia di soldati francesi chiusi nelle fortificazioni alpine fermano tra il 21 e il 24 giugno un'offensiva italiana molto più numerosa, tra neve, nebbia e montagne; Mentone in parte occupata; l'armistizio con l'Italia firmato il 24 giugno, in vigore dal 25. Poi la Francia divisa: il governo di Vichy, l'appello a continuare la lotta lanciato dalla radio di Londra il 18 giugno, la Francia Libera. Maggio-giugno 1942: l'assedio di Bir Hakeim, nel deserto libico, dove la 1ª Brigata della Francia Libera resiste per due settimane alle forze italo-tedesche. Agosto 1944: lo sbarco in Provenza e la liberazione di Nizza, con l'insurrezione dei partigiani. I generali e i capi reali restano sullo sfondo; i protagonisti sono gente comune.",
  secret: `ATTO 1 – L'avamposto, giugno 1940: nove uomini in un blockhaus sulla strada del confine, comandati da un sottotenente giovanissimo, Jean-Marie Valette. Davanti c'è il ponte sul vallone; alle spalle, i cannoni dei forti sulla costa. Gli italiani attaccano dal 21 giugno: nebbia, pioggia, mitragliatrici. Durante una breve tregua per raccogliere i feriti, {N} riconosce il cugino Nino tra gli alpini. L'avamposto resiste fino all'armistizio e oltre: i nove escono con le armi in mano solo quando arriva l'ordine scritto. Mentone resta in parte agli italiani, e la casa dei genitori di {N} finisce nella zona occupata.
ATTO 2 – La scelta, 1940-41: smobilitato, {N} va a Nizza. Il padre vuole stare tranquillo sotto Vichy; l'amica d'infanzia Simone ascolta di nascosto la radio di Londra e fa parte di una rete che aiuta i soldati a raggiungere la Francia Libera. Strade possibili: restare, entrare nella Resistenza, fuggire in Africa attraverso la Spagna o il mare.
ATTO 3 – Bir Hakeim, maggio-giugno 1942: con un battaglione della Francia Libera, {N} difende un caposaldo nel deserto: sabbia, sete, bombardamenti, i carri armati della divisione italiana Ariete. Cattura un giovane carrista italiano ferito, Aldo, di Genova, che parla il suo stesso dialetto. Poi la sortita della notte tra il 10 e l'11 giugno: a fari spenti, tra i campi minati.
ATTO 4 – Casa, agosto 1944: sbarco in Provenza. {N} torna sulla Costa Azzurra e trova Nizza insorta; Simone guida un gruppo di partigiani. Arrivano notizie di Nino, prigioniero dei tedeschi dopo l'8 settembre 1943. Finali: riconciliare le due famiglie e le due patrie, vendetta o perdono, restare o tornare al mare.
REGOLE: guerra vista dal basso, con rispetto dei fatti storici. Il tema centrale è l'identità: essere francese e italiano insieme. Il nemico ha un volto e un dialetto. Niente crudeltà descritte.`,
  chars: [
    { n: "Valette", full: "Sottotenente Jean-Marie Valette", r: "Il comandante dell'avamposto", d: "23 anni, figlio di un notaio di Lione, legge Montaigne sotto le bombe. Ha giurato che l'avamposto non cadrà." },
    { n: "Kader", full: "Caporale Kader Benali", r: "Il tuo compagno d'armi", d: "Algerino di Orano, mitragliere dell'avamposto. Ti insegna a dormire sotto i bombardamenti. Ti seguirà fino a Bir Hakeim." },
    { n: "Nino", full: "Nino Bertolotti", r: "Tuo cugino", d: "Alpino del battaglione italiano dall'altra parte del ponte. Da bambini pescavate insieme i polpi sugli scogli. Non vuole spararti." },
    { n: "Simone", full: "Simone Arnaud", r: "La tua amica d'infanzia", d: "Maestra a Nizza, coraggiosa e testarda. Ascolta di nascosto la radio di Londra e nasconde segreti pericolosi." },
    { n: "Bastiano", full: "Bastiano Bertolotti", r: "Tuo padre", d: "Pescatore di Ventimiglia emigrato nel 1912. Ha paura di perdere tutto e ti chiede di non fare l'eroe." },
    { n: "Aldo", full: "Aldo Parodi", r: "Il carrista italiano", d: "Genovese, 20 anni, catturato ferito a Bir Hakeim. Parla il tuo stesso dialetto e ti chiede di scrivere a sua madre." }
  ],
  open: `*Mentone, frontiera italiana. 21 giugno 1940, ore 4:50. Nell'avamposto di cemento sulla strada del confine siete in nove. Fuori piove, e la nebbia sale dal mare fino ai tornanti. Dalla feritoia vedi il ponte sul vallone e, dall'altra parte, le prime case italiane.*

*Da undici giorni l'Italia è in guerra con la Francia. Da una settimana i tedeschi sono a Parigi. Stanotte la radio ha detto che il governo chiederà l'armistizio, ma nessuno è venuto a dirlo agli italiani.*

Valette: *a voce bassa, con l'elmetto troppo grande* "Ordine del forte: nessuno arretra. Se attaccano, li fermiamo sul ponte. {N}, tu capisci quello che urlano. Voglio sapere tutto quello che dicono."

*Kader carica la mitragliatrice e ti allunga un pezzo di cioccolato.*

Kader: "Mangia, Rital. Gli eroi a stomaco vuoto svengono."

*Alle 5 in punto il cielo si accende. Le batterie italiane sparano dalle montagne; i colpi cadono sulla strada, sulle rocce, in mare. Dalla nebbia escono sagome con il cappello piumato: alpini. Avanzano verso il ponte, chini, veloci.*

*Tra le urla e il rumore senti una voce che conosci. Grida ordini in italiano, con la cadenza di Ventimiglia, la stessa di tua madre quando chiama a tavola.*

Voce italiana: "Avanti, ragazzi! Dentro sono pochi!"

*È tuo cugino Nino.*`,
  opts: ["Kader, non sparare a quello!", "*Punto il fucile sul ponte*", "Sottotenente, quello è mio cugino."]
},

{
  id: "stalingrado", g: "guerra", e: "❄️",
  t: "Non un Passo Indietro", city: "Stalingrado → Don", place: "Riva del Volga", era: "1942–1943",
  hook: "Attraversi il Volga sotto le bombe. Dall'altra parte ti aspettano la città più contesa del mondo e un inverno che cambierà la guerra.",
  desc: "Settembre 1942. Hai 19 anni, vieni da un villaggio della Siberia e sai sparare come pochi: tuo nonno ti portava a caccia nella taiga. Stanotte la tua divisione attraversa il Volga su chiatte e barche da pesca, sotto il fuoco, per entrare a Stalingrado in fiamme. Dovrai difendere una casa diroccata, un piano alla volta, insieme a soldati di dieci popoli diversi e a civili nascosti in cantina. Poi arriveranno l'inverno, la grande controffensiva e, sul fiume Don, un incontro che non ti aspetti: i soldati italiani.",
  sex: "x", names: { f: "Nadja", m: "Kolja" }, origin: null,
  you: "{N} Orlov[|a], 19 anni, tirat[ore|rice] scelt[o|a] della 13ª Divisione fucilieri della Guardia, nat[o|a] in un villaggio di cacciatori vicino al lago Bajkal. Silenzios[o|a], paziente, con una vista eccezionale. Al collo porta una piccola icona di legno della nonna, che nasconde al commissario politico.",
  world: "Stalingrado e la steppa del Don tra settembre 1942 e febbraio 1943, con fatti storici veri e personaggi inventati. La città distrutta dai bombardamenti: il Volga da attraversare di notte sotto il fuoco, la collina Mamaev Kurgan, la fabbrica di trattori, l'acciaieria Ottobre Rosso, il silos del grano, le case difese piano per piano, le fogne, i civili nelle cantine, i bambini che portano messaggi. L'Ordine 227 «Non un passo indietro» e i commissari politici. Il freddo a quaranta sotto zero. Il 19 novembre 1942 l'Operazione Urano accerchia la 6ª Armata tedesca; a dicembre l'Operazione Piccolo Saturno travolge l'8ª Armata italiana sul Don; a gennaio la ritirata degli alpini nella neve; il 2 febbraio 1943 la battaglia finisce. I soldati sovietici vengono da tutta l'Unione: russi, ucraini, kazaki, georgiani, armeni, tatari, uzbeki. I comandanti reali restano sullo sfondo.",
  secret: `ATTO 1 – Il Volga, settembre 1942: traversata notturna sotto le bombe. {N} entra nella squadra del sergente Gurgen Avakjan, armeno. L'ordine è difendere una casa di quattro piani all'angolo di una piazza, che i soldati chiamano «la Casa del Fornaio». In cantina vivono dei civili: la vecchia Matrjona e Lida, 10 anni, che porta i messaggi tra le macerie. Il commissario Semën Krylov applica l'Ordine 227 senza pietà.
ATTO 2 – La casa, ottobre-novembre: quasi due mesi di assedio, piano per piano. Un tiratore tedesco esperto, che i soldati chiamano «il Cappellaio» per il berretto storto, colpisce chiunque attraversi la piazza: è una partita di pazienza. Krylov sospetta che qualcuno passi informazioni ai tedeschi e sospetta di Matrjona, che è di origine tedesca del Volga, e di Lida. {N} deve scoprire la verità prima che il commissario faccia giustizia a modo suo. La verità: Matrjona nasconde sotto il pavimento il figlio disertore, ferito e terrorizzato.
ATTO 3 – Urano, 19 novembre: la controffensiva. {N} viene trasferit[o|a] con un reparto di sciatori verso il Don. A dicembre, durante l'Operazione Piccolo Saturno, il reparto cattura un gruppo di soldati italiani: tra loro c'è Giovanni, alpino di Belluno, che suona l'armonica e parla qualche parola di russo imparata dalle contadine. I prigionieri devono marciare per centinaia di chilometri nella neve: molti non arriveranno.
ATTO 4 – Il prezzo, gennaio-febbraio 1943: {N} può aiutare Giovanni e gli altri prigionieri a sopravvivere (cibo, una slitta, un'isba di contadini che nasconde i feriti), rischiando l'accusa di tradimento da parte di Krylov. Il 2 febbraio Stalingrado tace. Finali: tornare a casa sul Bajkal, diventare un eroe dell'Unione Sovietica, salvare Giovanni, o perdere tutto per un gesto di umanità.
REGOLE: guerra brutale e umana insieme: fame, freddo, paura, amicizie tra popoli diversi. Il nemico è fatto di persone. Nessuna ideologia è perfetta: il coraggio dei soldati è vero quanto la durezza del regime. Mai sangue descritto nei dettagli.`,
  chars: [
    { n: "Avakjan", full: "Sergente Gurgen Avakjan", r: "Il tuo caposquadra", d: "Armeno di Erevan, prima della guerra insegnava scacchi ai bambini. Calmo sotto le bombe, cita poeti e salva vite." },
    { n: "Krylov", full: "Commissario Semën Krylov", r: "Il commissario politico", d: "Applica l'Ordine 227 alla lettera. Crede davvero nella causa e vede traditori ovunque, ma non è un vigliacco." },
    { n: "Lida", full: "Lida", r: "La bambina delle macerie", d: "10 anni, orfana, conosce ogni buco della città. Porta messaggi tra le rovine e vuole un fucile tutto suo." },
    { n: "Matrjona", full: "Matrjona Weber", r: "La vecchia della cantina", d: "Nonna di origine tedesca del Volga, cucina zuppe di niente per tutti. Nasconde qualcosa sotto il pavimento." },
    { n: "Erlan", full: "Erlan Sejtkali", r: "Il ragazzo kazako", d: "Viene dalla steppa, ride sempre e canta le canzoni del suo popolo. Ti chiama «occhio d'aquila»." },
    { n: "Giovanni", full: "Giovanni De Bona", r: "L'alpino italiano", d: "Di Belluno, 22 anni, prigioniero sul Don. Suona l'armonica, mostra a tutti la foto della fidanzata e non vuole morire nella neve." }
  ],
  open: `*Riva orientale del Volga. Notte tra il 14 e il 15 settembre 1942. Dall'altra parte del fiume Stalingrado brucia: un muro di fuoco lungo chilometri, che si riflette nell'acqua come se anche il Volga stesse bruciando. Le chiatte sono pronte. Gli aerei tedeschi girano sopra di voi con un rumore che non smette mai.*

*Il sergente Avakjan passa tra i soldati e controlla le borracce, una per una. Si ferma davanti a te e guarda il tuo fucile con il cannocchiale.*

Avakjan: "Tu sei quell[o|a] della Siberia. Dicono che colpisci uno scoiattolo a trecento metri. Bene. Laggiù gli scoiattoli sparano." *Ti stringe la spalla.* "Resta vicino a me. Sulla chiatta non si parla, non si urla, non si guarda il cielo."

*Dietro di lui il commissario Krylov legge ad alta voce un foglio: l'Ordine 227. Le ultime parole le grida.*

Krylov: "Non un passo indietro! Chi arretra senza ordine è un traditore della Patria!"

*Salite a bordo. La chiatta si stacca dalla riva. A metà del fiume una granata cade vicinissima e una colonna d'acqua gelata vi travolge. Qualcuno urla. La barca accanto alla vostra si rovescia.*

*Nell'acqua nera, a pochi metri, una mano si alza: è un ragazzo kazako, lo zaino lo tira giù. La chiatta non si ferma. Avakjan ti guarda.*

Avakjan: "Non possiamo fermarci."`,
  opts: ["*Gli lancio la cinghia del fucile*", "Sergente, mi basta un secondo!", "*Stringo l'icona e guardo avanti*"]
},

{
  id: "piave", g: "guerra", e: "🪖",
  t: "I Ragazzi del '99", city: "Piave e Monte Grappa", place: "Trincee del Piave", era: "1917–1918",
  hook: "Hai diciotto anni. Il fronte è crollato a Caporetto. Ora tocca a voi fermare l'impero.",
  desc: "Novembre 1917. Dopo la disfatta di Caporetto l'esercito italiano si è ritirato fino al Piave, l'ultima linea prima di Venezia e della pianura. Mancano uomini, e chiamano alle armi i ragazzi nati nel 1899: tu sei uno di loro. Arrivi in trincea con le scarpe nuove, la cartolina di tua madre in tasca e un fucile più vecchio di te. Davanti c'è il fiume, gonfio e grigio; dall'altra parte austro-ungarici e tedeschi. Fango, fame, fratellanza e un anno che deciderà la guerra, fino all'ultima battaglia, a Vittorio Veneto.",
  sex: "m", names: { f: "Rina", m: "Angelo" }, origin: "Treviso",
  you: "{N} Zanin, 18 anni, fante della classe 1899, nato a {O}. Figlio di contadini, ha studiato fino alla quinta elementare grazie a un maestro che gli ha insegnato ad amare i libri, e scrive le lettere per i compagni che non sanno scrivere. Spaventato ma testardo, ha una fidanzata, Rina, che gli ha promesso di aspettarlo.",
  world: "Il fronte italiano della Prima guerra mondiale tra novembre 1917 e novembre 1918, con fatti storici veri e personaggi inventati. Dopo Caporetto (24 ottobre 1917) la linea del Piave e del Monte Grappa: trincee nel fango, le grave di ghiaia nel fiume, i ponti di barche, gli argini, i paesi evacuati, le retrovie con le osterie e gli ospedali da campo. I ragazzi del '99 mandati al fronte giovanissimi. Gli arditi con le fiamme nere, la Brigata Sassari, le crocerossine, i cappellani, i carabinieri nelle retrovie; dall'altra parte soldati boemi, ungheresi, croati e polacchi dell'esercito austro-ungarico. La battaglia del Solstizio (giugno 1918), Vittorio Veneto (fine ottobre 1918), l'armistizio di Villa Giusti (4 novembre). Linguaggio dell'epoca, dialetti di tutta Italia, lettere da casa.",
  secret: `ATTO 1 – L'arrivo, novembre 1917: {N} arriva al Piave tra gli sbandati di Caporetto, nella squadra del sergente sardo Efisio Porcu. Il tenente Arrigo Molon, studente di Padova, crede ancora nella guerra; i veterani no. Prime notti di guardia sugli argini, mentre gli austriaci tentano di passare il fiume. {N} scrive le lettere per Toni e per gli altri compagni e scopre i loro segreti.
ATTO 2 – L'inverno: fango, gelo, piene del fiume, pidocchi, rancio freddo. Una notte di nebbia, sulle grave in mezzo al fiume, {N} incontra un soldato nemico, Janko, boemo, che vuole disertare: un uomo spaventato come lui. Tenerlo nascosto, consegnarlo, aiutarlo. Nelle retrovie un capitano dei carabinieri dà la caccia a disertori e «disfattisti», e la giustizia militare è durissima.
ATTO 3 – Il Solstizio, giugno 1918: l'ultima grande offensiva austro-ungarica. Il nemico passa il Piave sul Montello; {N} combatte con il tenente Molon e un reparto di arditi per ricacciarlo indietro. Fiume in piena, ponti spezzati. La crocerossina veneziana Ida Venier salva {N} e cambia il suo modo di vedere la guerra.
ATTO 4 – Vittorio Veneto, ottobre-novembre 1918: il passaggio del Piave in piena sotto il fuoco, i ponti di barche, l'avanzata, l'impero austro-ungarico che si sgretola. Il 4 novembre arriva la fine. Finali: tornare a casa da Rina, restare per sempre segnato, ritrovare Janko dall'altra parte del fiume, finalmente libero.
REGOLE: la guerra vista con gli occhi di un ragazzo: paura, amicizia, ingiustizie, piccoli gesti di umanità. Rispetto storico, nessuna glorificazione della guerra. Le lettere, quelle da casa e quelle scritte per gli altri, sono il filo emotivo della storia.`,
  chars: [
    { n: "Porcu", full: "Sergente Efisio Porcu", r: "Il tuo sergente", d: "Sardo di Nuoro, veterano del Carso. Parla poco, divide sempre il pane, chiama tutti «pipìu», ragazzino. Ti terrà vivo, se lo ascolti." },
    { n: "Molon", full: "Tenente Arrigo Molon", r: "Il tuo tenente", d: "Studente di lettere a Padova, legge poesie patriottiche e crede nella vittoria. La guerra gli toglierà le illusioni una alla volta." },
    { n: "Toni", full: "Toni Bortolin", r: "Il tuo amico", d: "Di Bassano, non sa né leggere né scrivere e ti chiede di scrivere le sue lettere d'amore. Ride per non piangere." },
    { n: "Janko", full: "Janko Dvořák", r: "Il soldato nemico", d: "Boemo di Praga, 20 anni, tipografo. Non vuole morire per un imperatore che non ha mai visto." },
    { n: "Ida", full: "Ida Venier", r: "La crocerossina", d: "Veneziana, figlia di un medico, ha lasciato i salotti per gli ospedali da campo. Sa essere dolcissima e spietata." },
    { n: "Rina", full: "Rina", r: "La tua fidanzata", d: "Lavora nella filanda del paese. Ti scrive ogni settimana con la calligrafia storta e nelle lettere mette petali di glicine." }
  ],
  open: `*Fronte del Piave, vicino a Nervesa. 12 novembre 1917, all'alba. Piove da tre giorni. Il fiume è gonfio, color fango, e corre veloce tra le grave di ghiaia. Sugli argini i soldati scavano buche con le vanghe e con le mani.*

*Sei arrivato stanotte, in treno fino a Treviso e poi a piedi, in colonna, tra carri rovesciati, profughi con le galline nei sacchi e soldati sbandati di Caporetto che non parlano più. Hai diciotto anni da tre mesi. Le tue scarpe sono ancora nuove.*

*Un sergente con la barba nera e gli occhi chiarissimi ti guarda dall'alto in basso.*

Porcu: "Classe?"

*Glielo dici. Lui sputa nel fango.*

Porcu: "Novantanove. Mandano i bambini, adesso." *Ti mette in mano una vanga.* "Scava, pipìu. Se scavi bene, vivi. Se scavi male, ti scavano gli altri."

*Accanto a te un ragazzo biondo, magro, con le orecchie a sventola, ti sorride e ti allunga mezza galletta.*

Toni: "Mi son Toni. Ti te sa scrìver? Mi go la morosa a Bassan e no so scrìver gnanca el me nome."

*In quel momento, dall'altra parte del fiume, arriva un fischio lunghissimo. Porcu ti afferra per il bavero e ti butta a terra.*

Porcu: "GIÙ!"`,
  opts: ["*Mi schiaccio nel fango*", "Toni, giù anche tu!", "Che cos'era quel fischio?"]
},

{
  id: "ossola", g: "guerra", e: "🧣",
  t: "Quaranta Giorni di Libertà", city: "Domodossola", place: "Val d'Ossola", era: "1944–1945",
  hook: "Settembre 1944: i partigiani liberano l'Ossola e fondano una piccola repubblica. Durerà quaranta giorni.",
  desc: "Val d'Ossola, 1944. Dopo l'8 settembre 1943 l'Italia è spaccata: i tedeschi occupano il Nord, i fascisti della Repubblica Sociale danno la caccia ai renitenti, e sulle montagne nascono le bande partigiane. Tu hai vent'anni e sei salit[o|a] in montagna con un fazzoletto al collo e un fucile preso in una caserma abbandonata. Ora i tedeschi di Domodossola vogliono trattare la resa. Se va bene, i partigiani entreranno in città e fonderanno una repubblica libera, con scuole, giornali e tribunali, e il mondo guarderà. Ma i nazifascisti stanno già preparando la riconquista.",
  sex: "x", names: { f: "Lina", m: "Franco" }, origin: null,
  you: "{N} Varini, 20 anni, nat[o|a] a Domodossola in una famiglia di scalpellini. Dopo l'8 settembre 1943 è salit[o|a] in montagna invece di presentarsi alla chiamata della Repubblica Sociale. Conosce ogni sentiero verso la Svizzera, ha il nome di battaglia «Falco» e una paura che non confessa a nessuno: diventare come quelli che combatte.",
  world: "Val d'Ossola e Lago Maggiore tra settembre 1944 e aprile 1945, con fatti storici veri e personaggi inventati. L'occupazione tedesca, la Repubblica Sociale Italiana, le Brigate Nere, i rastrellamenti, la fame. Le formazioni partigiane di ogni colore (garibaldini comunisti, autonomi, cattolici), coraggiose e spesso divise tra loro. Il contrabbando e la fuga verso la Svizzera attraverso i passi, i ferrovieri della linea del Sempione, i preti che nascondono armi e perseguitati. Dal 10 settembre al 23 ottobre 1944 la Repubblica dell'Ossola: una giunta di governo, scuole riaperte, giornali liberi, treni dalla Svizzera con viveri e latte per i bambini. Poi la riconquista nazifascista e l'esodo di migliaia di persone oltre il confine. L'inverno, la Liberazione dell'aprile 1945. I capi reali restano sullo sfondo e non vengono citati per nome.",
  secret: `ATTO 1 – La trattativa, settembre 1944: il comandante Ulisse manda {N} in città come ostaggio di garanzia mentre i partigiani trattano la ritirata dei tedeschi. In città {N} scopre che il cugino Ettore, delle Brigate Nere, prepara un agguato alla trattativa. Tradire il cugino o lasciare che la trattativa salti.
ATTO 2 – La repubblica, settembre-ottobre: i partigiani entrano a Domodossola. Per quaranta giorni l'Ossola è libera: si riaprono le scuole, si stampano giornali, si discute di democrazia nelle osterie e nelle piazze. Ma le formazioni litigano per le armi e per il comando, mancano viveri e munizioni, gli Alleati non mandano gli aiuti promessi. Ettore viene catturato: una parte della folla vuole giustiziarlo subito. Don Giuseppe chiede a {N} di proteggerlo e di pretendere un processo vero.
ATTO 3 – La caduta, ottobre 1944: i nazifascisti attaccano con forze molto superiori. {N} deve difendere un ponte per dare tempo a una colonna di civili e bambini di raggiungere la Svizzera. Mirella viene catturata con una borsa di messaggi. Il treno del Sempione, i passi già innevati, Sepp che chiede soldi per far passare la gente.
ATTO 4 – La Liberazione, inverno 1944 - aprile 1945: esilio in Svizzera o ritorno in montagna per l'ultimo inverno. Aprile 1945: la discesa a valle, l'insurrezione, la resa dei tedeschi, la tentazione della vendetta sommaria. Finali: giustizia o vendetta, Ettore processato o salvato, Mirella liberata, il ritorno alla vita normale.
REGOLE: la Resistenza raccontata con verità: coraggio, paura, errori, divisioni, il prezzo pagato dai civili. Nessuna glorificazione della violenza; i nemici hanno volti e ragioni, le colpe sono di chi le commette. Il tema centrale è che cosa vuol dire essere liberi.`,
  chars: [
    { n: "Ulisse", full: "Comandante «Ulisse»", r: "Il capo della banda", d: "Ex capitano degli alpini, reduce dalla Russia. Rigoroso e stanco: vuole riportare a casa vivi i suoi ragazzi più che vincere." },
    { n: "Mirella", full: "Mirella Rossi", r: "La staffetta", d: "16 anni, sorriso sfrontato e bicicletta rossa. Porta messaggi sotto il naso dei tedeschi nascondendoli nelle trecce." },
    { n: "Carmine", full: "Carmine Esposito", r: "Il cuoco della banda", d: "Marinaio napoletano rimasto al Nord dopo l'8 settembre. Fa miracoli con due patate e racconta storie incredibili, forse inventate." },
    { n: "Don Giuseppe", full: "Don Giuseppe Frigerio", r: "Il prete di montagna", d: "Nasconde armi sotto l'altare e perseguitati nel campanile. Non vuole che nessuno, da nessuna parte, uccida un prigioniero." },
    { n: "Ettore", full: "Ettore Varini", r: "Tuo cugino", d: "Era il tuo compagno di giochi. Ora porta la camicia nera delle Brigate Nere e crede di difendere l'onore d'Italia." },
    { n: "Sepp", full: "Sepp Imboden", r: "Il contrabbandiere svizzero", d: "Vallesano, passa il confine con la gerla piena di sigarette. Per soldi o per cuore, aiuta chi scappa." }
  ],
  open: `*Montagne sopra Domodossola. 8 settembre 1944, all'alba. La nebbia sale dalla valle e copre i castagni. Nella baita del comandante Ulisse siete in venti, stretti attorno a un fuoco piccolo per non farvi vedere. Qualcuno pulisce il fucile, qualcuno dorme seduto.*

*Carmine gira in un pentolone una cosa che chiama minestra.*

Carmine: "Patate, castagne e un'idea di lardo. A Napoli la chiamerebbero miseria, ma qua è un pranzo di nozze."

*La porta si spalanca. È Mirella, con le guance rosse e la bicicletta lasciata nel prato. Si toglie il fazzoletto dalle trecce e tira fuori un biglietto piegato in otto.*

Mirella: "Notizie dalla valle! I tedeschi di Domodossola vogliono trattare. Se gli lasciamo libera la strada per il lago, se ne vanno senza sparare!"

*Il silenzio cade sulla baita. Ulisse si alza piano, legge il biglietto due volte. Poi guarda tutti, uno per uno, e si ferma su di te.*

Ulisse: "Fra due giorni potremmo entrare in città da liberi. Ma i tedeschi chiedono un ostaggio di garanzia per la trattativa: uno di noi da mandare giù stanotte. Qualcuno che conosca la città come le sue tasche." *Una pausa.* "{N}, tu sei nat[o|a] in piazza del Mercato."`,
  opts: ["Vado io, comandante.", "E se fosse una trappola?", "*Guardo Mirella: chi ti ha dato il biglietto?*"]
},

{
  id: "mille", g: "guerra", e: "⚓",
  t: "Camicia Rossa", city: "Quarto → Marsala → Napoli", place: "Scoglio di Quarto", era: "1860",
  hook: "Mille volontari, due vecchi piroscafi, nessuna speranza. State per cambiare la storia d'Italia.",
  desc: "Genova, maggio 1860. Hai lasciato l'università di Pavia senza dirlo a nessuno, con una camicia rossa nello zaino e un fucile arrugginito. Stanotte, dallo scoglio di Quarto, mille volontari partono per la Sicilia su due piroscafi presi alla compagnia Rubattino, per aiutare l'isola insorta contro i Borbone. Siete studenti, operai, avvocati, poeti, marinai. Il Regno delle Due Sicilie ha un esercito di centomila uomini e la flotta più grande d'Italia. Calatafimi, Palermo, il Volturno: davanti a voi c'è l'impresa più folle del Risorgimento.",
  sex: "x", names: { f: "Adele", m: "Enrico" }, origin: "Bergamo",
  you: "{N} Rota, 20 anni, student[e|essa] di medicina a Pavia, nat[o|a] a {O}. Figli[o|a] di un farmacista, ha letto di nascosto i libri dei patrioti e sa curare una ferita meglio di molti medici. Entusiasta, impulsiv[o|a], scrive tutto in un diario. [|È una delle pochissime donne della spedizione, e deve conquistarsi il rispetto ogni giorno.]",
  world: "L'Italia del 1860, con fatti storici veri e personaggi inventati. La partenza da Quarto, vicino a Genova, nella notte tra il 5 e il 6 maggio sui piroscafi Piemonte e Lombardo; lo sbarco a Marsala l'11 maggio; la battaglia di Calatafimi il 15 maggio; l'insurrezione e la presa di Palermo a fine maggio; Milazzo a luglio; il passaggio dello Stretto ad agosto; l'ingresso a Napoli il 7 settembre; la battaglia del Volturno all'inizio di ottobre; l'incontro di Teano il 26 ottobre. I picciotti siciliani, i contadini che sperano nella terra, i frati patrioti, i soldati borbonici spesso coraggiosi e mal comandati, le spie, i nobili che cambiano bandiera. Garibaldi compare solo da lontano e con pochissime parole: i protagonisti sono gente comune.",
  secret: `ATTO 1 – Quarto e il mare, maggio 1860: imbarco notturno nel caos; le barche con le munizioni si perdono nel buio e bisogna fermarsi lungo la costa toscana per cercarne altre. A bordo {N} conosce Meo Canepa, Rosario Lo Bue e Fra Cirillo. Lo sbarco a Marsala sotto il tiro delle navi borboniche, che arrivano un'ora troppo tardi.
ATTO 2 – Calatafimi e Palermo: la salita della collina del Pianto Romano, terrazza dopo terrazza, sotto il fuoco; le baionette; la leggenda della frase «Qui si fa l'Italia o si muore». {N} cura i feriti di entrambe le parti e risparmia un giovane ufficiale borbonico, il tenente Ferdinando d'Avalos, che diventerà un rivale e forse un amico. Palermo insorge: barricate, campane, la gente in strada; Concetta guida gli insorti nei vicoli.
ATTO 3 – Promesse tradite: i contadini credono che la rivoluzione darà loro la terra; i nobili vogliono solo cambiare padrone. A San Fantino, un paese inventato dell'interno, i contadini si ribellano ai baroni e il comando garibaldino manda a reprimerli: {N} deve scegliere tra l'obbedienza e la giustizia. Gaspare, il picciotto di 13 anni, è dalla parte dei contadini.
ATTO 4 – Napoli e il Volturno: lo Stretto, la marcia trionfale, l'ingresso a Napoli, poi la battaglia del Volturno, la più dura. A Teano il Sud viene consegnato al re. Finali: tornare a casa, restare al Sud con chi ha creduto nella libertà, seguire l'ideale repubblicano, ritrovare d'Avalos.
REGOLE: epica e disincanto insieme: l'entusiasmo dei volontari, la realtà della guerra, le speranze tradite del Sud. Rispetto storico; i Borbonici non sono caricature. Tono da romanzo d'avventura dell'Ottocento.`,
  chars: [
    { n: "Meo", full: "Bartolomeo «Meo» Canepa", r: "Il veterano", d: "Marinaio genovese, ha combattuto con Garibaldi in Sudamerica e a Roma nel '49. Impreca in tre lingue e non sbaglia mai un nodo." },
    { n: "Rosario", full: "Rosario Lo Bue", r: "L'esule siciliano", d: "Avvocato di Palermo in esilio da dieci anni. Sogna una Sicilia libera e giusta. Conosce tutti, si fida di pochi." },
    { n: "Fra Cirillo", full: "Fra Cirillo da Trapani", r: "Il frate garibaldino", d: "Francescano con il crocifisso e la pistola. Predica la libertà nelle piazze e benedice i feriti di entrambe le parti." },
    { n: "d'Avalos", full: "Tenente Ferdinando d'Avalos", r: "L'ufficiale borbonico", d: "Nobile napoletano, fedele al suo re. Coraggioso e ironico, disprezza i «filibustieri» del Nord, finché non li conosce." },
    { n: "Concetta", full: "Concetta Sciortino", r: "La ragazza di Palermo", d: "Figlia di un barcaiolo, guida gli insorti nei vicoli della Kalsa. Non si fida dei liberatori: ne ha visti troppi." },
    { n: "Gaspare", full: "Gaspare", r: "Il picciotto", d: "13 anni, scappato da una masseria per seguire le camicie rosse. Vuole un fucile e un paio di scarpe tutte sue." }
  ],
  open: `*Scoglio di Quarto, vicino a Genova. Notte tra il 5 e il 6 maggio 1860. Sulla spiaggia ci sono mille persone e nessuna sa esattamente cosa fare. Lanterne, casse di fucili, zaini, abbracci, gente che piange, gente che canta piano. In mare, al buio, le barche fanno avanti e indietro verso due sagome nere: i piroscafi Piemonte e Lombardo.*

*Hai la camicia rossa sotto la giacca e il diario nella tasca interna. Nessuno a casa sa che sei qui.*

*Un vecchio marinaio con la barba bianca e un orecchino d'oro ti carica in braccio una cassa di cartucce.*

Meo: "Ti, studente! Tieni questa e non farla cadere in mare, che dentro c'è la tua vita e quella di altri dieci."

*Più in là, sotto una lanterna, un uomo con il poncho e un cappello a larghe tese parla con alcuni ufficiali. Non serve che qualcuno ti dica chi è: tutti lo guardano, anche quelli che fingono di non farlo.*

*Un uomo elegante, con l'accento siciliano, ti si avvicina e ti guarda le mani.*

Rosario: "Mani da medico, queste. Bene, ce ne serviranno. Sapete che cosa ci aspetta in Sicilia? Centomila soldati borbonici. E noi siamo mille, con fucili vecchi di trent'anni."

*In quel momento una barca arriva di corsa. Il barcaiolo urla qualcosa verso la riva: le barche con le munizioni non si trovano più. Si sono perse nel buio.*`,
  opts: ["Le cerco io, conosco le barche!", "Partiamo lo stesso?", "*Scrivo due righe nel diario*"]
},

{
  id: "canne", g: "guerra", e: "🛡️",
  t: "La Legione di Canne", city: "Canne → Siracusa → Zama", place: "Piana dell'Ofanto", era: "216–202 a.C.",
  hook: "Ottantamila Romani contro Annibale. Sopravvivere sarà la tua vergogna. Il riscatto ti costerà quattordici anni.",
  desc: "Puglia, 2 agosto 216 a.C. Sei un giovane legionario arrivato dai Colli Albani, al tuo primo combattimento. Davanti, nella piana del fiume Ofanto, c'è l'esercito di Annibale: Cartaginesi, Galli, Iberi e i terribili cavalieri numidi. Roma ha schierato l'esercito più grande della sua storia e nessuno crede alla sconfitta. Entro sera la piana sarà un disastro mai visto. Chi sopravvive verrà esiliato in Sicilia con il marchio della vergogna. Ma la tua storia comincia proprio lì: dall'assedio di Siracusa fino alla rivincita di Zama.",
  sex: "m", names: { f: "Livia", m: "Lucio" }, origin: null,
  you: "{N} Vettio, 19 anni, legionario della prima linea, figlio di contadini di Tuscolo, sui Colli Albani. Forte e testardo, sa leggere un po' di greco perché ha lavorato per un mercante. Ha una sorella, Livia, che gli ha cucito un amuleto nella tunica, e un debito con un usuraio di Roma.",
  world: "Il mondo romano durante la seconda guerra punica, con fatti storici veri e personaggi inventati. Il 2 agosto 216 a.C. a Canne, in Puglia, Annibale accerchia e distrugge un enorme esercito romano guidato dai consoli Lucio Emilio Paolo e Gaio Terenzio Varrone. I sopravvissuti si radunano a Canosa; Roma, in lutto, rifiuta di riscattare i prigionieri e manda le «legioni di Canne» in esilio in Sicilia, senza onori e senza permesso di tornare a casa finché la guerra non sarà finita. In Sicilia combattono all'assedio di Siracusa, difesa dalle macchine di Archimede, fino alla presa della città nel 212 a.C. Infine il giovane Publio Cornelio Scipione le porta in Africa: a Zama, nel 202 a.C., affrontano di nuovo Annibale. Vita da legionario: marce, accampamenti, rancio di farro, punizioni, centurioni, dei e auspici. I personaggi storici restano sullo sfondo.",
  secret: `ATTO 1 – Canne, agosto 216 a.C.: il caldo, il vento che soffia la polvere negli occhi dei Romani, il centro romano che avanza e i fianchi che si chiudono alle spalle. {N} combatte nel manipolo del centurione Gaio Marcio Rufo, vede cadere i compagni e deve scegliere se restare con il centurione ferito o fuggire verso il campo. Iarba, un giovane cavaliere numida, ha l'occasione di ucciderlo e non lo fa: perché, lo scoprirà solo alla fine.
ATTO 2 – La vergogna: a Canosa, tra i sopravvissuti, una ricca signora del luogo dà a tutti cibo e vestiti. Roma rifiuta il riscatto dei prigionieri; i sopravvissuti vengono mandati in Sicilia senza onore. Rufo, che si è salvato, diventa amaro e durissimo. Il tribuno Quinto Fabio Tirone disprezza «i fuggiaschi di Canne». Le lettere di Livia, l'usuraio che minaccia la fattoria.
ATTO 3 – Siracusa, 213-212 a.C.: l'assedio della città greca e le macchine di Archimede (gru che sollevano le navi, catapulte, la leggenda degli specchi ustori). {N}, che sa il greco, viene mandato di notte a trattare con un mercante dentro le mura; durante la festa di Artemide i Romani entrano in città. Il saccheggio, l'ordine di risparmiare Archimede, la scelta di proteggere Tèano, giovane medica figlia di un allievo dello scienziato.
ATTO 4 – Zama, 202 a.C.: Scipione porta le legioni di Canne in Africa. {N}, ormai veterano di 33 anni, affronta di nuovo Annibale. Gli elefanti, i corridoi aperti tra i manipoli, la cavalleria numida che ora combatte al fianco di Roma: tra loro c'è Iarba. Riscatto, onore, ritorno a casa da Livia o nuova vita in Sicilia con Tèano.
REGOLE: realismo storico: la legione, gli ordini, la paura, il cameratismo, la vergogna e il riscatto. Nessuna crudeltà descritta nei dettagli. I nemici sono uomini con un loro onore.`,
  chars: [
    { n: "Rufo", full: "Centurione Gaio Marcio Rufo", r: "Il tuo centurione", d: "Veterano delle guerre contro i Galli, voce di bronzo e cuore duro. Considera i suoi uomini figli da salvare a bastonate." },
    { n: "Flacco", full: "Spurio Flacco", r: "Il tuo compagno di tenda", d: "Fornaio dell'Aventino, ingordo e generoso, giura su tutti gli dei e non ne teme nessuno. Racconta barzellette anche sotto le frecce." },
    { n: "Iarba", full: "Iarba", r: "Il cavaliere numida", d: "Giovane cavaliere al servizio di Annibale. Monta senza sella e senza briglie. A Canne fa una scelta che non dimenticherai." },
    { n: "Tirone", full: "Quinto Fabio Tirone", r: "Il tribuno", d: "Giovane nobile romano, ambizioso e coraggioso. Disprezza i sopravvissuti di Canne, finché non combatte al loro fianco." },
    { n: "Tèano", full: "Tèano", r: "La medica di Siracusa", d: "Figlia di un allievo di Archimede, studia le erbe e i numeri. Odia i Romani, ma ha bisogno di uno di loro." },
    { n: "Livia", full: "Livia Vettia", r: "Tua sorella", d: "17 anni, tesse e fa i conti meglio di un mercante. Tiene in piedi la fattoria e ti scrive lettere piene di rimproveri e d'amore." }
  ],
  open: `*Piana del fiume Ofanto, Puglia. 2 agosto 216 a.C., poco dopo l'alba. Fa già caldo. Il vento soffia da sud-est e vi butta in faccia polvere bianca. Sei in prima linea, con uno scudo grande come una porta e il giavellotto in mano. Intorno a te, a perdita d'occhio, elmi, scudi, insegne: ottantamila Romani. Nessuno ha mai visto un esercito così.*

*Spurio Flacco, accanto a te, mastica una cipolla cruda.*

Flacco: "Con un esercito così, stasera ceniamo nel loro campo. Dicono che Annibale si porti dietro cuochi greci."

*Davanti, a meno di un miglio, l'esercito cartaginese si muove. Al centro i Galli a torso nudo e gli Iberi con le tuniche bianche bordate di rosso. Ai lati, la cavalleria. Nella polvere, cavalieri senza sella che sembrano un solo corpo con i loro cavalli: i Numidi.*

*Il centurione Rufo passa davanti alla linea battendo il bastone di vite sugli scudi.*

Rufo: "Ascoltate, ragazzi di campagna! Quando suona la tromba: giavellotto, poi spada. Spalla contro spalla. Chi rompe la fila lo ammazzo io, prima dei Cartaginesi!" *Si ferma davanti a te.* "Vettio. Hai paura?"

*Prima che tu possa rispondere, le trombe suonano. La linea comincia a muoversi.*`,
  opts: ["Sì, centurione. Ma non scappo.", "*Stringo lo scudo e avanzo*", "Flacco, resta vicino a me."]
}
);
