/* Storie aggiunte nella versione 2.5: azione in stile videogioco a mondo aperto */
window.GENERI.azione = { n: "Azione", e: "💥", c1: "#3a1450", c2: "#0a0614", a: "#ff4fd8",
  style: "Azione da videogioco a mondo aperto: inseguimenti, colpi pianificati, fughe spettacolari, personaggi sopra le righe e satira feroce e divertente della società di oggi. Ritmo altissimo, frasi brevi nelle scene d'azione. Scontri e sparatorie solo accennati, sempre con conseguenze; niente violenza descritta nei dettagli e mai istruzioni reali per commettere reati." };

/* Ambientazione comune ai tre scenari di Ionìa */
const IONIA = "Satira criminale in stile videogioco a mondo aperto, ambientata in Ionìa, una regione inventata del Sud Italia affacciata su un mare caldissimo. Porto Vizio: grattacieli di vetro, palme, il lungomare dei locali al neon, il porto dei mega-yacht, le periferie dei palazzoni come il quartiere Saracena. Le Saline Rosa: paludi salmastre con fenicotteri, canneti, canali, palafitte e un coccodrillo, Ercolino, scappato anni fa dallo zoo privato di un boss e mai più catturato. Le Isole Sciabiche: scogli e isolette di pescatori e di miliardari. L'entroterra di Monte Asciutto: paesi poveri e strade polverose. Il carcere di Capo Nero sul promontorio. Tutti filmano tutto: ogni follia diventa virale sull'app ViralTok, e i telegiornali locali raccontano ogni giorno le imprese assurde dell'«Uomo di Ionìa». Personaggi ricorrenti: Don Bubù Malvasia, re del contrabbando delle Saline; l'ispettrice Gloria Scotti della Squadra Mobile; l'influencer Brandy Lux. Marchi e aziende sono parodie inventate (le auto Ferrucci, l'app ViralTok, la Banca della Sirena). Tono: azione, adrenalina, commedia nera e satira dell'Italia di oggi. Tutto è inventato.";

window.STORIE.push(

{
  id: "fuorilegge", g: "azione", e: "🌴", featured: true,
  t: "Fuorilegge in Due", city: "Porto Vizio, Ionìa", place: "Carcere di Capo Nero", era: "Oggi",
  hook: "Esce di prigione la persona che ami. Avete un piano, un'auto rubata e tutta Ionìa che vi filma.",
  desc: "Ionìa, la regione inventata del Sud dove il sole brucia e le regole si piegano. Da tre anni aspetti davanti al carcere di Capo Nero che esca Dani, [la ragazza|il ragazzo] che ami, finit[a|o] dentro al posto tuo dopo un colpo andato male. Oggi Dani esce. Il vostro sogno è semplice: una casa sul mare e mai più guai. Ma c'è un debito con Don Bubù, il re delle Saline, un'ispettrice che non dimentica, e il video della vostra vecchia rapina che sta diventando virale. Porto Vizio vi ha già dato un soprannome: «i Fidanzatini». Per sparire serve un ultimo colpo. Poi un altro. Poi un altro ancora.",
  sex: "x", names: { f: "Vera", m: "Nico" }, origin: null,
  you: "{N} Sole, 27 anni, autista e meccanic[o|a] di Porto Vizio, cresciut[o|a] nei palazzoni del quartiere Saracena. Al volante è un fenomeno, con le persone un disastro. Da tre anni lavora in un'officina di gomme e mette da parte ogni centesimo per il giorno in cui Dani uscirà. Ha un tatuaggio con la data del loro primo bacio e un vecchio cabriolet Ferrucci rosso fuoco.",
  world: IONIA,
  secret: `STRUTTURA A COLPI: la storia è una serie di colpi, ognuno in tre fasi: preparazione (scegliere il piano tra due alternative, i mezzi, i travestimenti), esecuzione (con almeno un imprevisto, spesso assurdo) e fuga (inseguimenti spettacolari tra lungomare, paludi e strade di campagna). Il cuore della storia è la coppia: amore, fiducia, gelosia, lealtà. Ogni colpo mette alla prova il rapporto. L'utente può chiedere di «passare» a Dani per una scena.
COLPO 1 – Il debito: Dani esce e scopre che il vecchio debito con Don Bubù Malvasia è diventato di 80.000 euro, da pagare entro un mese. Il primo colpo: il Compro Oro «Sirena d'Oro» del lungomare, che in segreto ricicla soldi proprio per Don Bubù.
COLPO 2 – Virali: il video della rapina finisce su ViralTok: due fidanzati con le maschere da sirena. Diventano idoli del web: magliette, imitatori, l'influencer Brandy Lux che vuole fare un «contenuto» con loro. L'ispettrice Gloria Scotti li riconosce dagli occhi e comincia la caccia.
COLPO 3 – Il furgone: un portavalori sulla Litoranea Jonica durante un'ondata di caldo record, con il coccodrillo Ercolino che blocca la strada. Tito «Fischietto», amico d'infanzia di {N} e mago dei computer, aiuta ma è troppo chiacchierone.
COLPO 4 – La Festa della Sirena: il caveau della Banca della Sirena durante i fuochi d'artificio sul mare. Don Bubù vuole tutto il bottino.
COLPO DI SCENA: Dani è uscit[a|o] prima del tempo perché in carcere ha firmato un accordo segreto con l'ispettrice Scotti per farle arrivare Don Bubù. Prima o poi dovrà scegliere tra la polizia e {N}, e {N} dovrà scegliere se perdonare.
FINALI: la fuga in barca verso le Isole Sciabiche, l'arresto insieme, un tradimento, la consegna di Don Bubù, una casa sul mare pagata con soldi puliti. Zia Rosina, che ha un chiosco sul lungomare, è l'unica che può nasconderli.
REGOLE: azione e commedia insieme, satira della fame di like, amore vero in mezzo al caos. La violenza è sempre solo accennata e ha conseguenze. I piani sono cinematografici, mai istruzioni reali.`,
  chars: [
    { n: "Dani", full: "Dani Ferro", r: "[La tua compagna|Il tuo compagno]", d: "Tre anni a Capo Nero per colpa di un colpo andato male. [Ironica, coraggiosa, imprevedibile|Ironico, coraggioso, imprevedibile]. Ti ama da quando avevate sedici anni, ma è [tornata|tornato] con un segreto." },
    { n: "Don Bubù", full: "Don Bubù Malvasia", r: "Il re delle Saline", d: "Contrabbandiere, proprietario di uno zoo privato e di mezza Porto Vizio. Camicie hawaiane, anelli enormi, sempre un gelato in mano. Sorride mentre minaccia." },
    { n: "Scotti", full: "Ispettrice Gloria Scotti", r: "La Squadra Mobile", d: "Divorziata, insonne, fissata con i Fidanzatini. Conosce i loro trucchi meglio di loro. Ha un accordo segreto con Dani." },
    { n: "Fischietto", full: "Tito «Fischietto» Barbieri", r: "Il tuo amico d'infanzia", d: "Genio dei computer, fischia quando è nervoso, cioè sempre. Leale, ma non sa tenere un segreto." },
    { n: "Brandy Lux", full: "Brandy Lux", r: "L'influencer", d: "Due milioni di follower, ciglia finte e nessuno scrupolo. Vuole i Fidanzatini nei suoi video, a qualunque costo." },
    { n: "Zia Rosina", full: "Zia Rosina", r: "La zia di Dani", d: "Gestisce un chiosco di granite sul lungomare da quarant'anni. Sa tutto di tutti e nasconde nel retro più cose di quante immagini." }
  ],
  open: `*Promontorio di Capo Nero, Ionìa. Ore 7:00 di un martedì di luglio. Ci sono già trentacinque gradi. Le cicale fanno un rumore assordante e il mare, laggiù, è di un azzurro che fa male agli occhi.*

*Sei appoggiat[o|a] al cofano del tuo vecchio cabriolet Ferrucci rosso, davanti al cancello del carcere. Sul sedile ci sono due granite al limone di Zia Rosina che si stanno sciogliendo.*

*Il cancello si apre con un cigolio. Esce Dani, con un sacchetto di plastica in mano, i capelli più corti e lo stesso sorriso storto di tre anni fa. Si ferma. Ti guarda. Poi corre.*

Dani: "Dimmi che quella granita è per me, perché altrimenti torno dentro."

*Vi abbracciate così forte che il sacchetto cade e si sparpagliano lettere, una spazzola e una foto di voi due a sedici anni.*

*Il telefono ti vibra in tasca. Una notifica di ViralTok: «🔥 I FIDANZATINI DI PORTO VIZIO: guarda la rapina più romantica di sempre!» È il video di tre anni fa, quello delle telecamere. Ha già un milione di visualizzazioni.*

*In fondo alla strada polverosa compare un SUV nero con i vetri oscurati. Rallenta. Dal finestrino abbassato spunta una mano piena di anelli che regge un cono gelato al pistacchio.*

Don Bubù: "Ben uscit[a|o], Dani! Che bella coppia. Mi siete mancati." *Lecca il gelato.* "Ottantamila euro. Trenta giorni. Non vi disturbo oltre."`,
  opts: ["*Metto in moto e partiamo*", "Dani, di quale debito parla?", "*Guardo il video sul telefono*"]
},

{
  id: "saline", g: "azione", e: "🐊",
  t: "Il Tesoro delle Saline", city: "Saline Rosa, Ionìa", place: "Palafitta sul canale", era: "Oggi",
  hook: "Un piccolo aereo pieno di soldi è caduto nelle paludi. Sei l'unic[o|a] che conosce ogni canale.",
  desc: "Ionìa. Nelle Saline Rosa, paludi salmastre piene di fenicotteri, canneti e palafitte, vivi con tua nonna e porti i turisti in giro con l'idroscivolante. Una notte di temporale un piccolo aereo a luci spente precipita tra le canne. Dentro non c'è nessuno, ma ci sono tre borse impermeabili: due milioni di euro. Entro l'alba lo sanno tutti: gli uomini di Don Bubù, due poliziotti corrotti, i tuoi cugini matti, tre influencer a caccia di like e il coccodrillo Ercolino, che nessuno ha mai catturato. Tu sai dove sono finite le borse. Per ora.",
  sex: "x", names: { f: "Mina", m: "Rino" }, origin: null,
  you: "{N} Scardella, 22 anni, guida turistica in idroscivolante nelle Saline Rosa, nat[o|a] su una palafitta. Conosce ogni canale, ogni secca e ogni nido di fenicottero. Vive con nonna Peppa e sogna di comprarsi una barca vera e andarsene lontano. Furb[o|a], ironic[o|a], un po' selvatic[o|a].",
  world: IONIA,
  secret: `ATTO 1 – La caccia: le tre borse sono di Don Bubù Malvasia: i soldi di un carico di contrabbando. Le cercano i suoi uomini guidati dal Cavallo, ex pugile; gli agenti Marrazzo e Pinto, corrotti e incapaci; i fratelli Scardiglia, cugini di {N}, che vivono in una roulotte su palafitte con una capra; il trio di influencer GattiTV, che gira un «documentario». Una borsa è finita nella tana di Ercolino, dentro il relitto di un vecchio peschereccio.
ATTO 2 – Il segreto della nonna: nonna Peppa negli anni Ottanta era la «Regina delle Saline», la contrabbandiera più famosa della costa, ed è stata lei a insegnare il mestiere a Don Bubù. Sa come trattare con lui, e ha un conto in sospeso.
ATTO 3 – La Festa del Fenicottero: la sagra del paese sulle palafitte, con la processione delle barche illuminate. Inseguimenti tra i canali in idroscivolante, una gara truccata, i GattiTV che trasmettono tutto in diretta. Un costruttore, il commendator Vizzini, vuole comprare le Saline per farci il resort «Vizio Marina» e ha bisogno che la gente se ne vada.
ATTO 4 – L'uragano: arriva una tempesta tropicale. Scontro finale nelle paludi allagate. Finali: restituire i soldi in cambio della libertà, tenerli e fuggire alle Isole Sciabiche, usarli per salvare le Saline dal resort, consegnare Don Bubù all'ispettrice Gloria Scotti, oppure lasciarli a Ercolino.
REGOLE: commedia d'azione con personaggi folli e un cuore vero: la casa, la nonna, la natura delle paludi. Inseguimenti in idroscivolante descritti con energia. Ercolino è un coccodrillo vero, pericoloso ma non cattivo. La violenza è solo accennata.`,
  chars: [
    { n: "Nonna Peppa", full: "Nonna Peppa Scardella", r: "Tua nonna", d: "Ottant'anni, fuma la pipa e pesca anguille a mani nude. Negli anni Ottanta era la Regina delle Saline. Non ha mai smesso di esserlo." },
    { n: "Don Bubù", full: "Don Bubù Malvasia", r: "Il proprietario dei soldi", d: "Contrabbandiere e padrone di uno zoo privato. Camicie hawaiane, anelli enormi e un gelato sempre in mano. Quei soldi gli servono entro una settimana." },
    { n: "Marrazzo", full: "Agente Ciro Marrazzo", r: "Il poliziotto corrotto", d: "Prende soldi da tutti e non arresta nessuno. Insieme al collega Pinto forma la coppia più inutile di Ionìa. Ma è disperato, e i disperati sono pericolosi." },
    { n: "Gli Scardiglia", full: "Lillo e Totò Scardiglia", r: "I tuoi cugini", d: "Due fratelli che vivono su una roulotte su palafitte con una capra di nome Beyoncé. Pieni di idee geniali e di idee pessime, quasi sempre nello stesso momento." },
    { n: "Gatto Rosso", full: "Gatto Rosso dei GattiTV", r: "L'influencer", d: "Capelli tinti, drone sempre in volo, trasmette tutto in diretta. Vuole il video del secolo. Potrebbe diventare un alleato o farvi scoprire tutti." },
    { n: "Ercolino", full: "Ercolino", r: "Il coccodrillo", d: "Quattro metri, scappato dallo zoo di Don Bubù. Leggenda vivente delle Saline. Pare che abbia un debole per le borse impermeabili." }
  ],
  open: `*Saline Rosa, Ionìa. Notte, ore 2:15. Il temporale estivo è arrivato all'improvviso: lampi viola sopra i canneti, la pioggia che batte sul tetto di lamiera della palafitta. Nonna Peppa russa nella stanza accanto con la radio accesa.*

*Poi un rumore diverso dal tuono: un motore che tossisce, basso, sempre più basso. Ti affacci. Tra un lampo e l'altro vedi un piccolo aereo senza luci che sfiora i canneti, piega l'ala e sparisce nella palude. Un tonfo. Poi solo pioggia.*

*In dieci minuti sei sull'idroscivolante, con la torcia frontale e il cuore a mille. L'aereo è infilato a testa in giù nel fango, a duecento metri dal canale grande. La cabina è vuota. Il pilota non c'è. Sul sedile dietro ci sono tre borse impermeabili gialle, gonfie.*

*Ne apri una. Mazzette di banconote da cinquecento, sigillate nella plastica. Tante. Troppe.*

*Dietro di te, nell'acqua nera, due occhi gialli si accendono alla luce della torcia. Sono grandi. Sono vicini. Sono gli occhi di Ercolino.*

*La radio dell'idroscivolante gracchia. È la voce di nonna Peppa, perfettamente sveglia.*

Nonna Peppa: "{N}. Dimmi che non hai toccato niente. Perché tra mezz'ora qua ci stanno gli uomini di Don Bubù, e io sono troppo vecchia per scappare."`,
  opts: ["*Carico le borse e accelero*", "Nonna, come fai a saperlo?", "*Punto la torcia negli occhi di Ercolino*"]
},

{
  id: "neon", g: "azione", e: "🪩",
  t: "Notti al Neon", city: "Porto Vizio, Ionìa", place: "Club Paradiso Neon", era: "Oggi",
  hook: "Fai ballare tutta Porto Vizio. Stanotte una valigetta da cento milioni sparisce dal tuo palco, e tutti pensano che l'abbia presa tu.",
  desc: "Porto Vizio, la città che non dorme mai: grattacieli di vetro, palme, lungomare al neon e locali dove si entra solo con il braccialetto giusto. Sei [il dj|la dj] resident del Paradiso Neon, il club di Tony «Flamingo» Vitiello, il re della notte. Hai un milione di follower e diecimila euro di debiti. Stanotte, mentre suoni, sale sul palco Leo Cryptone, il miliardario delle criptovalute, e la sua valigetta, con dentro le chiavi di un portafoglio digitale da cento milioni, sparisce. Le telecamere hanno ripreso solo una cosa: le tue mani vicino alla valigetta.",
  sex: "x", names: { f: "Jade", m: "Dylan" }, origin: null,
  you: "{N} «Neon» Russo, 25 anni, dj e producer, nat[o|a] nelle case popolari di Porto Vizio Est. Talento vero, orecchio perfetto, ego fragile. Suona ogni notte al Paradiso Neon, gira video per ViralTok di giorno e dorme pochissimo. Ha una sorella più piccola, Ginevra, che studia per diventare veterinaria, e un debito con il locale.",
  world: IONIA,
  secret: `ATTO 1 – La valigetta: tutti accusano {N}. Leo Cryptone (vero nome Leonardo Cipolla) ha inscenato il furto: la sua moneta digitale VizioCoin è una truffa che sta per crollare, e lui vuole sparire con i soldi degli investitori facendo ricadere la colpa su qualcun altro. La valigetta vera l'ha portata via la sua guardia del corpo; quella sul palco era vuota. Tony Flamingo dà a {N} 48 ore: o la valigetta torna, o {N} sparisce.
ATTO 2 – Quarantotto ore: inseguimenti sul lungomare, una notte nei quartieri alti, l'ispettrice Gloria Scotti che indaga sulla truffa di VizioCoin e capisce che {N} è un pesce piccolo. Big Mimmo, il buttafuori del club, è l'unico che crede a {N}. L'influencer Brandy Lux sa dove Leo darà la sua ultima festa.
ATTO 3 – Il colpo sulla Nave Venere: la festa di Leo sul suo mega-yacht. {N} si infiltra come dj della serata. Piano possibile: musica, luci, un blackout al momento giusto, la cassaforte nella cabina, la fuga in moto d'acqua. Ginevra, senza volerlo, si ritrova coinvolta.
ATTO 4 – Il crollo: alla Festa della Sirena {N} suona davanti a centomila persone in spiaggia. Finali: smascherare Leo in diretta sul maxischermo, tenersi i soldi, restituirli ai piccoli risparmiatori truffati, salvare o far crollare il Paradiso Neon, lasciare Porto Vizio per sempre.
REGOLE: noir notturno e satira delle criptovalute, degli influencer e della vita al neon. La musica è parte del racconto: descrivi bassi, luci, folla. Violenza solo accennata. Mai istruzioni reali su truffe o furti informatici: le operazioni sono raccontate in modo cinematografico.`,
  chars: [
    { n: "Tony Flamingo", full: "Tony «Flamingo» Vitiello", r: "Il re della notte", d: "Proprietario del Paradiso Neon, abiti rosa e denti d'oro. Generoso con chi lo fa guadagnare, spietato con chi lo fa sembrare stupido." },
    { n: "Leo Cryptone", full: "Leo Cryptone", r: "Il miliardario delle criptovalute", d: "Vero nome Leonardo Cipolla, ex venditore di aspirapolvere. Felpa da mille euro, discorsi sul futuro, un sorriso da pubblicità. Sta per scappare con i soldi di tutti." },
    { n: "Scotti", full: "Ispettrice Gloria Scotti", r: "La Squadra Mobile", d: "Indaga da mesi su VizioCoin. Odia la musica alta e i locali notturni, ma ha un fiuto infallibile per chi mente." },
    { n: "Big Mimmo", full: "Big Mimmo", r: "Il buttafuori", d: "Due metri di muscoli e la passione per la poesia. Ti ha visto crescere al club e ti considera di famiglia." },
    { n: "Ginevra", full: "Ginevra Russo", r: "Tua sorella", d: "19 anni, studia Veterinaria e fa volontariato con i fenicotteri delle Saline. È l'unica persona di cui ti importa davvero." },
    { n: "Brandy Lux", full: "Brandy Lux", r: "L'influencer", d: "Due milioni di follower, una cena al giorno con qualcuno di importante. Sa tutto di tutti. Vende le informazioni al miglior offerente." }
  ],
  open: `*Porto Vizio, Club Paradiso Neon. Sabato, ore 3:12. Cinquemila persone sotto la consolle, il basso che fa tremare il petto, i laser rosa e azzurri che tagliano il fumo. Sei sul palco con le cuffie su un orecchio e le mani sui piatti. È la serata migliore della tua vita.*

*Tony Flamingo, abito rosa e denti d'oro, ti fa il pollice in su dal privé. Big Mimmo, sotto il palco, tiene a bada la folla.*

*All'improvviso sale sul palco Leo Cryptone, felpa nera e occhiali a specchio, con una valigetta di metallo ammanettata al polso. La folla urla il suo nome. Lui ti abbraccia, ti grida all'orecchio «Alza tutto!», si toglie la manetta e appoggia la valigetta accanto ai tuoi piatti per ballare a braccia alzate.*

*Il drop arriva. Le luci si spengono per tre secondi, come da copione. Quando si riaccendono, la valigetta non c'è più.*

*Leo si gira. Guarda il vuoto. Poi guarda te. Poi guarda le tue mani, ancora appoggiate dove c'era la valigetta.*

Leo Cryptone: *nel microfono, davanti a cinquemila persone* "Fermi tutti! [Il dj|La dj] mi ha rubato cento milioni!"

*La musica si interrompe. Cinquemila telefoni si alzano verso di te. Dal privé, Tony Flamingo non sorride più.*`,
  opts: ["Io non ho toccato niente!", "*Salto giù dal palco e scappo*", "Mimmo, blocca le uscite!"]
}
);
