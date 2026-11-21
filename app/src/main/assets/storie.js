/* =====================================================================
   STORIE D'ITALIA – catalogo delle storie
   Segnaposto nei testi:
     {N}      nome del protagonista
     {O}      città di provenienza (solo se la storia la chiede)
     [a|b]    a = forma maschile, b = forma femminile  (es. arrivat[o|a])
   ===================================================================== */

window.GENERI = {
  drama:        { n: "Drama",        e: "🎭", c1: "#3a2412", c2: "#100b07", a: "#e0a83f",
                  style: "Realistico ed emotivo: tensione che cresce, segreti di famiglia, scelte morali difficili, personaggi con luci e ombre." },
  giallo:       { n: "Gialli",       e: "🔎", c1: "#1c2a35", c2: "#0a1014", a: "#f2c94c",
                  style: "Giallo classico: indizi concreti, sospettati con moventi e alibi, false piste credibili. Il caso deve poter essere risolto ragionando. Quando l'utente accusa qualcuno, valuta onestamente se le prove bastano." },
  romantico:    { n: "Romantiche",   e: "❤️", c1: "#4c1832", c2: "#170812", a: "#ff8fb1",
                  style: "Commedia romantica: dialoghi brillanti, sguardi, piccoli gesti, tensione, ironia e momenti teneri. Ambientazione da cartolina descritta con i sensi." },
  fantascienza: { n: "Fantascienza", e: "🚀", c1: "#0f2050", c2: "#050916", a: "#5ee1ff",
                  style: "Fantascienza immersiva e credibile: tecnologia evocativa ma comprensibile, senso di meraviglia, misteri che si svelano a strati, dilemmi umani." },
  avventura:    { n: "Avventura",    e: "🧭", c1: "#16422d", c2: "#07150e", a: "#8fe3a3",
                  style: "Avventura dal ritmo alto: luoghi spettacolari, enigmi da risolvere, pericoli fisici, inseguimenti, alleati e tradimenti. Chiudi spesso la scena con un piccolo cliffhanger." },
  thriller:     { n: "Thriller",     e: "🎯", c1: "#40101a", c2: "#110407", a: "#ff5a5f",
                  style: "Thriller teso: paranoia, conto alla rovescia, colpi di scena, nessuno è davvero al sicuro. Frasi brevi nei momenti di tensione." },
  horror:       { n: "Horror",       e: "👻", c1: "#1d1733", c2: "#07050e", a: "#b9a3ff",
                  style: "Horror d'atmosfera: paura psicologica, suoni, silenzi, dettagli fuori posto, folklore. Mai sangue, gore o violenza grafica: la paura nasce da ciò che non si vede." },
  commedia:     { n: "Commedia",     e: "😂", c1: "#4a3a0c", c2: "#171203", a: "#ffd54a",
                  style: "Commedia all'italiana: equivoci, battute, personaggi esagerati ma umani, ritmo veloce, e sotto le risate un po' di cuore." }
};

window.STORIE = [

/* ============================== DRAMA ============================== */
{
  id: "bar-ferrante", g: "drama", e: "☕", featured: true,
  t: "Il Bar di Via Lecco", city: "Milano", place: "Porta Venezia", era: "Oggi",
  hook: "Il tuo capo è gentilissimo. Troppo.",
  desc: "Ti sei appena trasferita a Milano con una valigia e pochi soldi. Trovi lavoro come barista al Bar Ferrante. Il titolare, Rocco, è gentile, generoso, protettivo. Clienti che non pagano, buste lasciate sotto il piattino, una porta sul retro sempre chiusa a chiave… Tu non sai niente. Per ora.",
  sex: "f", names: { f: "Giulia", m: "Marco" }, origin: "Bari",
  you: "{N}, giovane donna arrivata da {O}, appena trasferita a Milano e assunta come barista al Bar Ferrante in via Lecco, zona Porta Venezia. Non conosce nessuno in città. Non sa nulla del lato oscuro del titolare.",
  world: "Milano oggi: affitti carissimi, metro M1 e M2, tram, aperitivi, Navigli, rider in bici, gente sempre di corsa, bollette. Il Bar Ferrante è un locale storico con il bancone di marmo, una macchina del caffè cromata e una porta sul retro sempre chiusa a chiave.",
  secret: "Rocco Ferrante, 52 anni, in apparenza cortese, paterno e generoso, è il capo di un'organizzazione criminale inventata, \"la famiglia Ferrante\". Usa il bar per incontri, per ripulire contanti e per far girare messaggi. Non lo ammette MAI apertamente: nega con calma, sorride, cambia discorso. Protegge {N} a modo suo, ma è pericoloso con chi lo tradisce. Marta sa qualcosa ma ha paura. Valeria Conti è un'ispettrice di polizia sotto copertura e prima o poi chiederà aiuto a {N}. Indizi da far emergere piano piano: buste sotto il piattino del Ragioniere, telefonate a bassa voce, uomini che non pagano mai, macchine nere, il cassetto sotto la cassa, la porta del retro.",
  chars: [
    { n: "Rocco", full: "Rocco Ferrante", r: "Il titolare", d: "52 anni, camicia sempre stirata, sorriso da padre di famiglia. Vent'anni di bar in via Lecco, tutti nel quartiere lo rispettano. Paga puntuale, non alza mai la voce. Ma quel cassetto sotto la cassa lo chiude sempre a chiave." },
    { n: "Marta", full: "Marta Colombo", r: "La collega", d: "34 anni, milanese doc, ironica e stanca. Lavora da Rocco da sei anni. A volte sembra che voglia dirti qualcosa, poi ci ripensa." },
    { n: "Nico", full: "Nico Ferrante", r: "Il nipote", d: "26 anni, scooter nero, battuta pronta. Fa \"commissioni\" per lo zio a tutte le ore." },
    { n: "Il Ragioniere", full: "Il Ragioniere", r: "Cliente fisso", d: "Completo grigio, valigetta, mai un sorriso. Arriva ogni giorno alle 11 in punto e lascia sempre qualcosa sotto il piattino." },
    { n: "Valeria", full: "Valeria Conti", r: "Cliente misteriosa", d: "Sui 40, cappotto blu, fa domande. Troppe domande. Dice di lavorare \"in un ufficio qui vicino\"." },
    { n: "Sig.ra Pina", full: "Signora Pina", r: "La vicina", d: "78 anni, vive sul tuo pianerottolo da sempre. Ti porta il minestrone e sa tutto di tutti, anche di Rocco." }
  ],
  open: `*Lunedì mattina, le 6:40. Via Lecco è ancora mezza addormentata: un rider passa contromano, il tram sferraglia in fondo alla strada. La saracinesca del Bar Ferrante è alzata a metà e dentro la macchina del caffè sbuffa già.*

*Dietro il bancone, un uomo sulla cinquantina in camicia bianca stirata alla perfezione conta degli scontrini. Alza lo sguardo e sorride.*

Rocco: "Tu devi essere {N}. Puntuale, brava. Qua a Milano la gente arriva sempre di corsa e mai in orario." *Ti porge la mano: stretta calda, decisa.* "Rocco Ferrante. Il bar è mio da vent'anni. Pure io vengo da giù, sai? Quindi tra noi ci capiamo."

*Una donna con il grembiule nero e la coda di cavallo esce dal retro con una cassa di cornetti.*

Marta: "Uè, la nuova. Io sono Marta. Ti avviso: alle sette e mezza qui è l'inferno."

*Rocco chiude a chiave un cassetto sotto la cassa e si infila la chiave in tasca, senza fretta.*

Rocco: "Allora, {N}… com'è andato il viaggio da {O}? Hai già trovato casa, o ti devo dare una mano io?"`,
  opts: ["Il viaggio è stato lungo…", "Sì, mi servirebbe una mano", "Cosa c'è in quel cassetto?"]
},
{
  id: "trattoria", g: "drama", e: "🍝",
  t: "La trattoria", city: "Modena", place: "Centro storico", era: "Oggi",
  hook: "Torni a casa per salvare la trattoria di famiglia. Di fronte apre uno chef stellato.",
  desc: "Dopo dieci anni a Londra torni a Modena: tuo padre ha avuto un infarto e la Trattoria Bonfanti, aperta dal bisnonno nel 1952, è piena di debiti. Hai sei mesi per salvarla. Dall'altra parte della strada apre il ristorante di Alessandro Conti, giovane chef stellato e arrogante. Tra sfoglia, banche e segreti di famiglia, scoprirai che il nemico è più vicino di quanto pensi.",
  sex: "x", names: { f: "Vittoria", m: "Michele" }, origin: null,
  you: "{N}, 34 anni, cuoc[o|a] in un ristorante di Londra, scappat[o|a] da Modena dieci anni fa dopo una lite furiosa con il padre. Talento enorme, orgoglio pure.",
  world: "Modena oggi: il Duomo, la Ghirlandina, il mercato Albinelli, la nebbia d'inverno, l'aceto balsamico, i tortellini in brodo, lo gnocco fritto, i motori, il dialetto emiliano, famiglie con tradizioni pesanti come la sfoglia.",
  secret: "Alessandro Conti, lo chef rivale, è il figlio che Giorgio (il padre di {N}) ebbe da una relazione prima del matrimonio: è il fratellastro di {N}. Lui lo sa da sempre e ha aperto proprio davanti alla trattoria per farsi notare da un padre che non l'ha mai riconosciuto. Nonna Pierina sa tutto. La sorella Valentina, disperata per i debiti, ha già firmato di nascosto un accordo preliminare per vendere la trattoria a una catena di fast food. La dottoressa Ferri della banca può concedere un ultimo prestito se vede un piano serio. Giorgio custodisce un quaderno di ricette segrete del bisnonno. La storia può finire con una riconciliazione, una sfida culinaria, una vendita o una rinascita: decide l'utente.",
  chars: [
    { n: "Giorgio", full: "Papà Giorgio", r: "Tuo padre", d: "68 anni, orgoglioso e testardo, appena uscito dall'ospedale. Non ammette mai di aver bisogno di aiuto." },
    { n: "Nonna Pierina", full: "Nonna Pierina", r: "La nonna", d: "90 anni, tira ancora la sfoglia ogni mattina. Conosce tutti i segreti della famiglia." },
    { n: "Valentina", full: "Valentina Bonfanti", r: "Tua sorella", d: "38 anni, commercialista, pratica e stanca. Ti rinfaccia di essere scappat[o|a]." },
    { n: "Alessandro", full: "Alessandro Conti", r: "Lo chef rivale", d: "32 anni, una stella Michelin, giacca nera, uno sguardo che ti sembra stranamente familiare." }
  ],
  open: `*Modena, gennaio. La nebbia è così fitta che la Ghirlandina sembra sospesa nel nulla. Scendi dal taxi con la valigia davanti all'insegna di legno che conosci da sempre: TRATTORIA BONFANTI – DAL 1952. Una lettera è caduta: ora c'è scritto BONFAN I.*

*Dentro, le sedie sono capovolte sui tavoli. Odore di brodo e di malinconia. Al bancone c'è nonna Pierina, con il mattarello in mano, che tira la sfoglia come fa da settant'anni.*

Nonna Pierina: *senza alzare gli occhi* "Dieci anni. Dieci anni che non mangi un tortellino come si deve." *Poi alza lo sguardo, lucido.* "Vieni qui, test[one|ona], che ti abbraccio con le mani piene di farina."

*Dalla cucina esce tua sorella Valentina, con un faldone sotto il braccio.*

Valentina: "Ah, sei tornat[o|a]. Bene. Così vedi anche tu." *Sbatte i fogli sul bancone.* "Centoventimila euro di debiti. Papà non lo dice a nessuno. E adesso guarda fuori."

*Dall'altra parte della strada, dove c'era la vecchia merceria, degli operai montano un'insegna nera e oro: CONTI – Alta cucina. Sulla porta, un uomo giovane con la giacca da chef nera fissa la trattoria a braccia incrociate. Quando i vostri occhi si incontrano, fa uno strano sorriso.*`,
  opts: ["Dov'è papà?", "Chi è quello?", "Nonna, fammi assaggiare la sfoglia"]
},

/* ============================== GIALLI ============================== */
{
  id: "palio", g: "giallo", e: "🐎", featured: true,
  t: "Delitto al Palio", city: "Siena", place: "Piazza del Campo", era: "Oggi",
  hook: "Il fantino favorito muore la notte prima della corsa.",
  desc: "Siena, due giorni al Palio di luglio. Sei [il|la] nuov[o|a] commissari[o|a], arrivat[o|a] da Roma da una settimana. All'alba il fantino più forte della città viene trovato senza vita nella stalla della Contrada del Falco. Tutti dicono incidente. Ma il cavallo non ha un graffio, e in piazza nessuno vuole parlare con chi viene da fuori.",
  sex: "x", names: { f: "Elena", m: "Andrea" }, origin: null,
  you: "{N}, commissari[o|a] di polizia appena trasferit[o|a] da Roma a Siena. Brav[o|a], testard[o|a], non conosce le regole non scritte delle contrade.",
  world: "Siena nei giorni del Palio: tamburi, bandiere, cene di contrada nelle strade, rivalità antiche, Piazza del Campo coperta di tufo, vicoli in salita. Le contrade sono famiglie e parlano solo tra loro. La Contrada del Falco è inventata.",
  secret: "Il fantino, Gigi \"Saetta\" Morandi, non è stato ucciso dal cavallo: è stato colpito alla testa e poi messo nel box per simulare un incidente. Il colpevole è Lorenzo Bandini, capitano della Contrada del Falco, notaio stimatissimo: Gigi voleva confessare che le ultime due corse erano state \"aggiustate\" grazie a un giro di scommesse clandestine organizzato da Bandini. Indizi da far scoprire piano piano: un ferro di cavallo ripulito con troppa cura, una ricevuta di scommessa nella giacca di Gigi, un messaggio cancellato sul suo telefono, un testimone che ha visto l'auto di Bandini alle 3 di notte, la paglia del box troppo ordinata. False piste credibili: il fantino rivale Tonio (lite pubblica con Gigi) e la fidanzata di Gigi. Bandini resta calmo, gentile e collaborativo finché le prove non lo stringono.",
  chars: [
    { n: "Bandini", full: "Lorenzo Bandini", r: "Il capitano del Falco", d: "55 anni, notaio, elegante e paterno. Tutta Siena lo rispetta. Ti spiega le tradizioni con pazienza… forse per tenerti lontan[o|a]." },
    { n: "Caterina", full: "Caterina Morandi", r: "La sorella di Gigi", d: "28 anni, veterinaria. Furiosa con tutti, convinta che il fratello sia stato ucciso. Sa più di quanto dice." },
    { n: "Tonio", full: "Tonio Spada", r: "Il fantino rivale", d: "Sardo, spaccone, odiava Gigi. Ha l'alibi più debole di tutti." },
    { n: "Fusi", full: "Ispettore Mario Fusi", r: "Il tuo vice", d: "Senese, 60 anni, conosce tutti. Leale, ma tifa per la sua contrada." },
    { n: "Beppe", full: "Beppe il barbaresco", r: "Il custode del cavallo", d: "70 anni, ha dormito accanto alla stalla. Ha visto qualcosa, ma parla per enigmi." }
  ],
  open: `*Siena, 4:50 del mattino. Il cielo sopra Piazza del Campo è ancora viola. Il telefono ti sveglia nel piccolo appartamento in via dei Rossi: è l'ispettore Fusi.*

Fusi: "Commissari[o|a], mi scusi l'ora. Gigi Morandi è morto. Nella stalla del Falco. Dicono che l'ha preso il cavallo." *Una pausa.* "Io però Gigi lo conoscevo. Sui cavalli non sbagliava mai."

*Venti minuti dopo sei davanti alla stalla. Bandiere bianche e rosse ai balconi, un capannello di contradaioli in silenzio. Nel box accanto, una cavalla baia nervosa sbuffa e scalpita. Un uomo elegante in giacca di lino si stacca dal gruppo e ti tende la mano.*

Bandini: "Lorenzo Bandini, capitano del Falco. Una tragedia, commissari[o|a]. Un incidente terribile, a due giorni dalla corsa." *Sorride, triste.* "Le chiedo solo una cosa: rispetto. Siena, in questi giorni, è… delicata."

*Dietro di lui, una ragazza con gli occhi rossi ti fissa come se volesse urlarti qualcosa.*`,
  opts: ["Voglio vedere il corpo, subito", "Chi ha trovato Gigi?", "Chi è quella ragazza?"]
},
{
  id: "arena", g: "giallo", e: "🎼",
  t: "Prima all'Arena", city: "Verona", place: "Arena", era: "Oggi",
  hook: "Il tenore crolla durante l'Aida. Davanti a ventimila persone.",
  desc: "Verona, sera della prima all'Arena. Sei [il|la] costumista che ha vestito tutto il cast. Al secondo atto dell'Aida, la star internazionale Riccardo Valente crolla sul palco e non si rialza. Mentre il pubblico viene fatto uscire, la polizia chiude il retropalco: nessuno se ne va. E tu sei l'unic[o|a] che è entrat[o|a] in ogni camerino.",
  sex: "x", names: { f: "Sofia", m: "Davide" }, origin: null,
  you: "{N}, costumista teatrale veronese di 30 anni. Conosce ogni segreto dei camerini perché veste tutti gli artisti.",
  world: "L'Arena di Verona durante il festival lirico d'estate: candeline accese sulle gradinate, scenografie giganti, retropalco caotico sotto la pietra romana, corridoi stretti, coristi, tecnici, sarte. La città elegante e calda di notte.",
  secret: "Valente è stato avvelenato con qualcosa messo nel suo spray per la gola (non descrivere mai sostanze, dosi o metodi reali). Il colpevole è Sergio Lanza, l'impresario: sommerso dai debiti, aveva stipulato in segreto un'assicurazione milionaria sulla vita del tenore. Ha fatto ricadere i sospetti sulla soprano Nadia Kovač, ex moglie di Valente, mettendo il flacone nella sua borsa. Indizi: la polizza in un cassetto dell'ufficio di Lanza, una traccia di cerone di colore diverso sul colletto di Valente (Lanza lo ha abbracciato prima dello spettacolo), un tecnico luci che ha visto Lanza vicino al camerino, un secondo flacone identico comprato in farmacia. Il giovane sostituto Elia è sospettabile ma innocente. Valente forse non è morto: è in coma e può risvegliarsi più avanti se la storia lo richiede.",
  chars: [
    { n: "Barbieri", full: "Commissaria Livia Barbieri", r: "La polizia", d: "Fredda e velocissima. Ti chiede aiuto perché conosci il backstage, ma non si fida di nessuno. Nemmeno di te." },
    { n: "Nadia", full: "Nadia Kovač", r: "La soprano", d: "Croata, divina e insopportabile, ex moglie di Valente. Il flacone viene trovato nella sua borsa." },
    { n: "Lanza", full: "Sergio Lanza", r: "L'impresario", d: "Sorriso largo, abiti cari, sempre al telefono. Dice di aver perso un amico." },
    { n: "Elia", full: "Elia Ferro", r: "Il sostituto", d: "24 anni, voce d'oro, mai una possibilità. Stasera, all'improvviso, ce l'ha." }
  ],
  open: `*Verona, 21:47. Dal buco nel sipario vedi ventimila candeline accese sulle gradinate dell'Arena. Hai ancora gli spilli tra le labbra: hai appena sistemato l'orlo del mantello di Amneris.*

*Nel corridoio di pietra passa Riccardo Valente, il tenore più famoso del mondo, con il costume da Radamès che gli hai cucito tu. Si ferma e ti fa l'occhiolino.*

Valente: "{N}, se stasera vado bene è merito tuo. Questo costume canta da solo." *Spruzza lo spray per la gola, due volte, poi entra in scena tra gli applausi.*

*Dieci minuti dopo, nel mezzo del duetto, la sua voce si spezza. Valente porta una mano al petto, barcolla e cade tra le colonne di cartapesta. Il direttore abbassa la bacchetta. Un urlo sale dalle gradinate.*

*Nel retropalco esplode il caos. Una donna in tailleur blu si fa largo tra i coristi con un distintivo in mano.*

Barbieri: "Commissaria Barbieri. Nessuno esce." *Ti indica.* "Tu. Sei [il|la] costumista? Bene. Tu sai chi è entrato nel suo camerino stasera."`,
  opts: ["Sì, li ho visti tutti", "Il suo spray per la gola…", "Voglio vedere Riccardo"]
},
{
  id: "portofino", g: "giallo", e: "💍",
  t: "Nozze a Portofino", city: "Portofino", place: "Villa Altieri", era: "Oggi",
  hook: "Una villa, una tempesta, un matrimonio. E un morto in piscina.",
  desc: "Sei [il|la] wedding planner più richiest[o|a] della Liguria. Domani si sposano Ginevra Altieri, erede di una dinastia di armatori, e l'affascinante Filippo Serra. Ma la notte prima delle nozze, durante una tempesta che isola la villa sul promontorio, il padre della sposa viene trovato morto in piscina. Nessuno può entrare o uscire fino all'alba. Il colpevole è ancora tra gli invitati.",
  sex: "x", names: { f: "Beatrice", m: "Leonardo" }, origin: null,
  you: "{N}, wedding planner di Genova, 34 anni: organizzat[o|a], diplomatic[o|a], abituat[o|a] a risolvere ogni crisi con un sorriso. Ha accesso a tutta la villa.",
  world: "Villa Altieri sul promontorio di Portofino: terrazze sul mare, piscina a sfioro, salone affrescato, una cappella privata, camere degli ospiti, la darsena. Tempesta violenta, strada franata, telefoni quasi senza campo fino all'alba. Giallo classico \"a stanza chiusa\".",
  secret: "La vittima è Ottavio Altieri, 68 anni, armatore. Non è scivolato: è stato colpito e spinto in acqua tra le 23:40 e mezzanotte. La colpevole è Margherita Serra, la madre dello sposo, elegantissima e premurosa: la famiglia Serra è in bancarotta di nascosto, Ottavio lo aveva scoperto e quella sera voleva annullare le nozze. Indizi da far scoprire: un gemello da polso con lo stemma dei Serra sul fondo della piscina, scarpe di raso bagnate nascoste nell'armadio di Margherita, una pagina strappata dal libro degli ospiti, il maggiordomo che ha sentito una lite in giardino. False piste: la giovane matrigna Vera (eredita tutto), il testimone Brando (aveva un debito con Ottavio), lo sposo Filippo (sapeva della bancarotta ma è innocente). Ginevra è distrutta e si affida a {N}.",
  chars: [
    { n: "Ginevra", full: "Ginevra Altieri", r: "La sposa", d: "29 anni, dolce ma ferita. Si fida solo di te." },
    { n: "Filippo", full: "Filippo Serra", r: "Lo sposo", d: "Affascinante e nervoso. Nasconde qualcosa sulla sua famiglia." },
    { n: "Margherita", full: "Margherita Serra", r: "La madre dello sposo", d: "Elegante, premurosa, sempre la prima ad aiutare. Perfetta. Troppo." },
    { n: "Vera", full: "Vera Altieri", r: "La matrigna", d: "35 anni, ex modella, sposata con Ottavio da due anni. Tutti la detestano." },
    { n: "Osvaldo", full: "Osvaldo", r: "Il maggiordomo", d: "In villa da quarant'anni. Vede tutto, dice poco." }
  ],
  open: `*Villa Altieri, Portofino. 23:55. La pioggia batte sulle vetrate del salone come se volesse entrare. Hai appena finito di contare le sedie per la cerimonia di domani: trecento, tutte avvolte nel tulle bianco.*

*Un fulmine. Le luci tremano. Dal giardino arriva un grido, poi un altro.*

*Corri fuori sotto l'acqua. A bordo piscina c'è Osvaldo, il maggiordomo, immobile, con un ombrello rovesciato ai piedi. Nella vasca illuminata di azzurro galleggia una giacca da smoking. Dentro c'è Ottavio Altieri, il padre della sposa.*

*In pochi secondi arrivano tutti: Filippo in camicia, pallidissimo. Vera, la giovane moglie di Ottavio, con le mani sulla bocca. Margherita Serra, che ti stringe il braccio.*

Margherita: "Oh, mio Dio… Povero Ottavio. Avrà bevuto, sarà scivolato."

Osvaldo: *a bassa voce, solo per te* "La strada per il paese è franata, {N}. E i telefoni non vanno. Fino a domattina siamo soli. Tutti."

*Sul balcone del primo piano compare Ginevra, in vestaglia. Ti cerca con lo sguardo.*`,
  opts: ["Nessuno tocchi niente", "Vado da Ginevra", "Osvaldo, cos'ha visto?"]
},
{
  id: "nebbia", g: "giallo", e: "🌫️",
  t: "Nebbia sul Po", city: "Ferrara", place: "Bassa ferrarese", era: "Oggi",
  hook: "Una ragazza sparita nella nebbia. Un paese che non vuole parlare.",
  desc: "Sei [il|la] nuov[o|a] maresciall[o|a] dei carabinieri di Sant'Agata sul Po, quattromila abitanti nella Bassa ferrarese. Il primo giorno di servizio sparisce Elisa Berti, 26 anni, veterinaria: la sua bici viene ritrovata sull'argine, nella nebbia. In paese tutti la conoscevano e tutti le volevano bene. Allora perché nessuno vuole aiutarti a trovarla?",
  sex: "x", names: { f: "Chiara", m: "Paolo" }, origin: null,
  you: "{N}, maresciall[o|a] dei carabinieri, 32 anni, arrivat[o|a] dalla città. Per il paese è \"quell[o|a] di fuori\".",
  world: "La Bassa ferrarese a novembre: nebbia fittissima, argini del Po, pioppeti, casali abbandonati, la balera del sabato, il bar della piazza dove si gioca a briscola. Il paese di Sant'Agata sul Po è immaginario. Atmosfera malinconica alla Simenon.",
  secret: "Elisa è viva. Si nasconde nella casa sull'isola di Gualtiero, il vecchio pescatore. Ha scoperto che l'azienda agricola del sindaco Ferrari scarica di notte rifiuti tossici nei campi e nel fiume: ha fotografie e campioni. Dopo una minaccia ha simulato la sparizione per proteggersi. Il sindaco e il suo braccio destro, Mirco, la cercano anche loro, per farla tacere. Indizi: la bici appoggiata, non caduta; fango con chiazze iridescenti sulle ruote; Gualtiero che compra il doppio del pane; pesci morti a valle; una telefonata anonima in caserma. Il brigadiere Pozzi ha paura del sindaco ma è onesto, e alla fine può scegliere da che parte stare.",
  chars: [
    { n: "Pozzi", full: "Brigadiere Ugo Pozzi", r: "Il tuo vice", d: "62 anni, a un passo dalla pensione. Conosce tutti, gioca a carte col sindaco. Ti chiama \"capo\" con una punta d'ironia." },
    { n: "Ferrari", full: "Ivano Ferrari", r: "Il sindaco", d: "Cordiale, potente, padrone della più grande azienda agricola della zona. Ti invita subito a cena." },
    { n: "Gualtiero", full: "Gualtiero", r: "Il pescatore", d: "Vive da solo su un'isola del Po. Burbero, saggio, odia le divise." },
    { n: "Silvia", full: "Silvia Berti", r: "La madre di Elisa", d: "Gestisce la merceria in piazza. Disperata, ma qualcosa nel suo sguardo non torna." }
  ],
  open: `*Sant'Agata sul Po, 7:10 del mattino. La nebbia è così fitta che dal cancello della caserma non vedi il campanile, a cinquanta metri. È il tuo primo giorno.*

*Dentro, una stufa a gas e un uomo con i baffi grigi che legge il giornale.*

Pozzi: "Buongiorno, capo. Benvenut[o|a] in paradiso." *Piega il giornale.* "Caffè? Qui la macchinetta è l'unica cosa che funziona sempre."

*Il telefono squilla. Pozzi risponde, ascolta, e la sua faccia cambia.*

Pozzi: "Era Silvia, quella della merceria. Sua figlia Elisa ieri sera non è tornata a casa. Hanno trovato la bicicletta sull'argine, alla curva del Mulino." *Esita.* "Capo… magari è andata a Ferrara da un'amica. Le ragazze di qui ogni tanto scappano. Non facciamo casino, eh? Il sindaco non ama il casino."

*Fuori, nella nebbia, un'auto scura passa lentamente davanti alla caserma. Poi sparisce.*`,
  opts: ["Andiamo subito all'argine", "Chiamo la madre di Elisa", "Perché il sindaco dovrebbe preoccuparsi?"]
},
{
  id: "matera", g: "giallo", e: "🎬",
  t: "Ciak a Matera", city: "Matera", place: "I Sassi", era: "Oggi",
  hook: "La star di Hollywood muore sul set. Ma il morto è davvero lui?",
  desc: "A Matera una produzione americana gira un kolossal tra i Sassi. Sei [il|la] location manager italian[o|a] che risolve ogni problema. All'alba Jack Holloway, la star del film, viene trovato senza vita in una chiesa rupestre. La produzione vuole chiudere tutto in fretta e la stampa impazzisce. Ma tu noti un dettaglio: il morto ha un tatuaggio che Jack non ha mai avuto.",
  sex: "x", names: { f: "Angela", m: "Vito" }, origin: null,
  you: "{N}, location manager lucan[o|a] di 30 anni: conosce ogni grotta e ogni vicolo dei Sassi, parla inglese, fa da ponte tra la troupe e la città.",
  world: "Matera: i Sassi, le chiese rupestri, le case-grotta, i belvedere al tramonto, il canyon della Gravina, la Murgia. Una troupe americana enorme: roulotte, guardie del corpo, giornalisti, comparse del posto. Il film è un kolossal biblico.",
  secret: "Il morto è Danny Ruiz, la controfigura di Jack, identico a lui tranne un piccolo tatuaggio a forma di rondine dietro l'orecchio. È morto per una caduta accidentale durante una lite notturna con Jack. Jack Holloway, sommerso dai debiti con un finanziatore pericoloso di Las Vegas, ha colto l'occasione: ha scambiato i vestiti e ora si nasconde in una casa-grotta, aiutato dalla sua assistente Kim, per sparire e lasciare che l'assicurazione paghi. Il produttore Marty Klein sospetta qualcosa ma vuole salvare il film. Indizi: il tatuaggio, una lente a contatto colorata trovata nella chiesa, la spesa che Kim porta di nascosto, un vecchio pastore che giura di aver visto \"il fantasma di Jack\" di notte.",
  chars: [
    { n: "Marty", full: "Marty Klein", r: "Il produttore", d: "Newyorkese, urla al telefono, ti adora finché risolvi problemi. Adesso vuole solo silenzio." },
    { n: "Kim", full: "Kim Park", r: "L'assistente di Jack", d: "Efficiente, gentile, terrorizzata. Ultimamente esce spesso da sola la sera." },
    { n: "Gallo", full: "Ispettore Nicola Gallo", r: "La polizia", d: "Materano, lento e sornione. Sembra distratto, ma non lo è." },
    { n: "Zio Cosimo", full: "Zio Cosimo", r: "Il pastore", d: "80 anni, porta ancora le capre sulla Murgia. Dice di aver visto un fantasma." }
  ],
  open: `*Matera, 5:30. Il sole non è ancora sorto e i Sassi sono un presepe di pietra grigia. Il telefono vibra: dodici chiamate perse di Marty Klein.*

*Corri giù per le scalinate di tufo fino alla chiesa rupestre dove ieri avete girato l'Ultima Cena. Davanti all'ingresso ci sono due guardie del corpo, un'ambulanza e Marty, in pigiama e giacca, alla terza sigaretta.*

Marty: "{N}! Thank God. Jack è… Jack è morto. È caduto dalle scale, là dentro. Nessuno deve saperlo prima delle nove, capito? Nessuno!"

*Dentro, alla luce delle torce, c'è un uomo steso sulla pietra con il costume da apostolo. I capelli biondi, la mascella famosa che hai visto su mille cartelloni. È Jack Holloway.*

*Ti avvicini. Dietro l'orecchio sinistro c'è un piccolo tatuaggio: una rondine. Hai passato tre settimane accanto a Jack, sul set e fuori. Jack non ha nessuna rondine.*

*Alle tue spalle, Kim, l'assistente di Jack, ti guarda. Ha visto che hai visto.*`,
  opts: ["Marty, questo non è Jack", "*Faccio finta di niente*", "Kim, vieni con me un attimo"]
},

/* ============================== ROMANTICHE ============================== */
{
  id: "positano", g: "romantico", e: "🍋", love: true, featured: true,
  t: "Limoni a Positano", city: "Positano", place: "Costiera Amalfitana", era: "Oggi",
  hook: "Un'estate, un limoneto da salvare, due cuori in mezzo.",
  desc: "Passi l'estate ad aiutare zia Carmela nel suo limoneto a picco sul mare di Positano. Doveva essere una vacanza: invece scopri che un grande hotel vuole comprare la terra della zia, a ogni costo. E poi ci sono Nico, lo skipper dal sorriso pericoloso, e Bianca, la fotografa milanese in fuga da un matrimonio saltato. L'estate più lunga della tua vita è appena cominciata.",
  sex: "x", names: { f: "Martina", m: "Luca" }, origin: null,
  you: "{N}, 27 anni, cresciut[o|a] a Torino, stanc[o|a] della vita d'ufficio. Nipote di zia Carmela, passa l'estate a Positano.",
  world: "La Costiera Amalfitana d'estate: limoneti a terrazze, scale infinite, barche colorate, il profumo di limone e salsedine, le grotte marine, la festa dell'Assunta con i fuochi sul mare, il limoncello fatto in casa.",
  secret: "Nico è il figlio mai riconosciuto di Arturo Pagano, il proprietario del Grand Hotel che vuole il limoneto: il padre lo ha mandato a convincere la zia, ma Nico si sta innamorando del posto e forse di {N}. Bianca ha scattato per caso fotografie che provano che Pagano ha costruito abusivamente la nuova spa: potrebbero salvare il limoneto. Zia Carmela da giovane è stata innamorata di Arturo Pagano. Lungo la storia: una gita in barca alle grotte, una cena sotto le stelle, la festa dell'Assunta, una mareggiata.",
  chars: [
    { n: "Zia Carmela", full: "Zia Carmela", r: "La zia", d: "70 anni, vedova, lingua tagliente, cuore enorme. Fa il limoncello più buono della Costiera." },
    { n: "Nico", full: "Nico", r: "Lo skipper", d: "30 anni, pelle bruciata dal sole, porta i turisti in barca. Ironico, misterioso, sa sempre dove trovarti." },
    { n: "Bianca", full: "Bianca", r: "La fotografa", d: "29 anni, milanese, malinconica e divertente. Fotografa tutto tranne se stessa." },
    { n: "Pagano", full: "Arturo Pagano", r: "L'albergatore", d: "Elegante, potente, gentile in modo inquietante. Vuole il limoneto per la sua nuova spa." }
  ],
  open: `*Positano, fine giugno. Hai contato 412 scalini dalla fermata del bus alla casa della zia, con la valigia in mano. Sudat[o|a] e senza fiato, apri il cancelletto e il mondo esplode: limoni gialli ovunque, il mare blu sotto di te, una buganvillea viola sul muro.*

Zia Carmela: "Finalmente! Pensavo ti fossi pers[o|a] sulle scale come il postino nel '98." *Ti stringe forte: profuma di limone e zucchero.* "Posa la valigia. Stasera si lavora: ho tre casse di limoni da sbucciare."

*Dal sentiero sotto il muretto arriva un fischio. Sale un ragazzo con la maglietta bianca e gli occhiali da sole, una cassetta di pesce sulla spalla.*

Nico: "Donna Carmè, il pesce che mi avete chiesto." *Ti guarda e sorride.* "E [questo è il famoso|questa è la famosa] nipote del Nord? Vi immaginavo più pallid[o|a]."

*Sulla terrazza accanto, una ragazza con una macchina fotografica al collo vi sta fotografando senza alcuna vergogna.*

Bianca: "Scusate, la luce era perfetta. Fate finta che io non ci sia."`,
  opts: ["Piacere, sono {N}", "Zia, chi sono questi due?", "*Sorrido alla fotografa*"]
},
{
  id: "bologna", g: "romantico", e: "🎓", love: true,
  t: "Fuori sede", city: "Bologna", place: "Via del Pratello", era: "Oggi",
  hook: "Una stanza in affitto, tre coinquilini, un anno che cambierà tutto.",
  desc: "Hai vinto una borsa di studio e ti trasferisci a Bologna, in una casa sotto i portici con tre coinquilini impossibili. Tra esami, feste, tortellini a mezzanotte e una padrona di casa che vuole buttarvi fuori, ci sono Matteo, il musicista che lavora in una libreria antiquaria, e Giada, la tua compagna di laboratorio, la persona più competitiva che tu abbia mai conosciuto.",
  sex: "x", names: { f: "Alice", m: "Tommaso" }, origin: null,
  you: "{N}, 22 anni, student[e|essa] di ingegneria con una borsa di studio, prima volta lontan[o|a] da casa (un paese della Calabria).",
  world: "Bologna oggi: portici infiniti, le Due Torri, piazza Santo Stefano, le osterie, gli aperitivi in via del Pratello, le biblioteche, l'università più antica d'Europa, affitti impossibili, la nebbia d'inverno e il sole sui colli in primavera.",
  secret: "La padrona di casa, la signora Lucchesi, finge di voler vendere: in realtà vuole liberare l'appartamento per il nipote che torna dall'estero, e si può convincerla a cambiare idea. Matteo scrive canzoni anonime che diventano virali in città, e una di queste parla di {N} senza nominarl[o|a]. Giada sembra ostile perché ha il terrore di perdere la borsa di studio: se la perde deve tornare a lavorare nella ditta del padre, che non la lascerebbe più studiare. Momenti possibili: un esame disastroso, una festa sul tetto, un concerto improvvisato, un viaggio sui colli, una notte di studio.",
  chars: [
    { n: "Matteo", full: "Matteo", r: "Il coinquilino musicista", d: "25 anni, fuori corso da sempre, suona la chitarra sul balcone, lavora in una libreria antiquaria. Tenero e casinista." },
    { n: "Giada", full: "Giada", r: "La rivale", d: "22 anni, milanese, prima della classe, sarcastica. Odia perdere, soprattutto contro di te." },
    { n: "Ciro", full: "Ciro", r: "Il coinquilino napoletano", d: "Studia medicina, cucina per tutti, dà consigli d'amore non richiesti." },
    { n: "Lucchesi", full: "Signora Lucchesi", r: "La padrona di casa", d: "Bolognese doc, 70 anni, entra senza bussare. Nasconde qualcosa." }
  ],
  open: `*Bologna, settembre. Il treno da Lamezia è arrivato con due ore di ritardo e piove. Trascini la valigia sotto i portici di via del Pratello, controllando il numero sul telefono: 34. Un portone verde, scrostato.*

*Suoni. Dal citofono escono note di chitarra, poi una voce.*

Matteo: "Se sei quell[o|a] nuov[o|a], sali. Se sei la Lucchesi, non ci siamo."

*Tre piani a piedi. La porta è aperta. Dentro: una cucina minuscola, un ragazzo che frigge qualcosa cantando in napoletano, un altro sdraiato sul divano con la chitarra e, in piedi accanto alla finestra, una ragazza con un libro di analisi matematica che ti squadra.*

Ciro: "Benvenut[o|a]! Hai fame? Sì che hai fame. Siediti."

Giada: "Tu sei {N}? Quell[o|a] della borsa di studio?" *Chiude il libro.* "Ah. Allora siamo nello stesso laboratorio. Spero tu sia brav[o|a]. Io non perdo."

*Matteo smette di suonare e ti sorride.* "Non darle retta. Morde solo prima degli esami."`,
  opts: ["Ho una fame incredibile", "Giada, ci vediamo in laboratorio allora", "*Mi siedo vicino a Matteo*"]
},
{
  id: "firenze", g: "romantico", e: "🖼️", love: true,
  t: "Il restauro", city: "Firenze", place: "Oltrarno", era: "Oggi",
  hook: "Sotto il quadro c'è un altro quadro. E qualcuno lo vuole a tutti i costi.",
  desc: "Hai ottenuto il tirocinio dei tuoi sogni nel laboratorio di restauro del maestro Guidi, in Oltrarno. Il primo lavoro è una Madonna del Cinquecento annerita dal tempo. Ma sotto la vernice compare un volto che non dovrebbe esserci. Tra Tommaso, il figlio scorbutico del maestro, e Irene, la storica dell'arte che fa domande troppo precise, Firenze diventa il posto più bello e più pericoloso del mondo.",
  sex: "x", names: { f: "Lucia", m: "Gabriele" }, origin: null,
  you: "{N}, 26 anni, appena diplomat[o|a] in restauro, tirocinante nel laboratorio Guidi. Mani d'oro, curiosità infinita.",
  world: "Firenze oggi: l'Oltrarno, le botteghe artigiane, piazza Santo Spirito, il Ponte Vecchio all'alba, Fiesole al tramonto, l'odore di trementina e colla nel laboratorio, turisti ovunque, collezionisti senza scrupoli.",
  secret: "Sotto la Madonna c'è un ritratto perduto, forse uscito dalla bottega di un grande maestro del Rinascimento (non attribuirlo con certezza a un artista reale), coperto secoli fa per nasconderlo. Vale milioni. Un collezionista russo, Viktor Volkov, ha già pagato in segreto il maestro Guidi per farlo sparire all'estero. Guidi è indebitato e pentito. Irene lavora sotto copertura per i Carabinieri della tutela del patrimonio culturale. Tommaso non sa nulla e vuole solo proteggere il padre. Momenti possibili: una cena nella villa di Volkov, un furto notturno in bottega, una corsa in Vespa sui colli, una confessione all'alba sul Ponte Vecchio.",
  chars: [
    { n: "Guidi", full: "Maestro Renzo Guidi", r: "Il restauratore", d: "68 anni, leggenda di Firenze, mani tremanti, occhi tristi. Ultimamente beve troppo." },
    { n: "Tommaso", full: "Tommaso Guidi", r: "Il figlio", d: "31 anni, restauratore brillante e scontroso. Ti tratta male il primo giorno. Forse per paura." },
    { n: "Irene", full: "Irene Valli", r: "La storica dell'arte", d: "33 anni, elegante e ironica. Fa domande molto precise. Troppo precise." },
    { n: "Volkov", full: "Viktor Volkov", r: "Il collezionista", d: "Gentile, generoso, invita tutti a cena nella sua villa sui colli." }
  ],
  open: `*Firenze, Oltrarno, ore 8. La bottega del maestro Guidi è un antro di legno e luce: tele appoggiate ai muri, barattoli di pigmenti, l'odore pungente della trementina. Stamattina hai sistemato il camice nuovo tre volte.*

*Un ragazzo alto, con le mani sporche di gesso, alza appena gli occhi da un crocifisso di legno.*

Tommaso: "Tu sei [il|la] tirocinante. Non toccare niente senza chiedere. Non parlare quando lavoro. Non lasciare tazze sui tavoli." *Torna al crocifisso.* "Benvenut[o|a]."

*Dal retro arriva il maestro Guidi, con il gilet e gli occhiali sulla fronte. Ti stringe la mano con calore.*

Guidi: "Non badare a mio figlio, è nato così. Vieni, ti ho tenuto un lavoro speciale." *Toglie un telo da un cavalletto: una Madonna col Bambino annerita dal tempo.* "Pulitura. Piano, con pazienza. È una signora di cinquecento anni."

*Più tardi, con il bisturi e un batuffolo di solvente, togli un velo di vernice dall'angolo in basso. E lì, dove dovrebbe esserci il manto blu della Madonna, compare un occhio. Un occhio d'uomo che ti guarda.*`,
  opts: ["Maestro, venga a vedere!", "*Copro tutto e non dico niente*", "Tommaso, guarda qui"]
},
{
  id: "langhe", g: "romantico", e: "🍇", love: true,
  t: "Vendemmia nelle Langhe", city: "Langhe", place: "Cascina Teresa", era: "Oggi",
  hook: "Una nonna che non conoscevi. Una vigna. Un vicino insopportabile.",
  desc: "Una lettera del notaio ti cambia la vita: una nonna che non hai mai conosciuto ti ha lasciato una piccola vigna nelle Langhe e una cascina che cade a pezzi. Hai tempo fino alla fine della vendemmia per decidere se tenerla. Il vicino, Edoardo, vuole comprarla e ti tratta come un[o|a] intrus[o|a]. Chiara, la sommelier dell'agriturismo, sembra l'unica felice di vederti. E in una cassapanca c'è la storia d'amore di tua nonna.",
  sex: "x", names: { f: "Valentina", m: "Riccardo" }, origin: null,
  you: "{N}, 30 anni, lavora in un'agenzia di comunicazione a Milano. Non ha mai saputo nulla della famiglia di suo padre.",
  world: "Le Langhe in autunno: colline di vigne dorate e rosse, nebbia del mattino, tartufi, castelli, cascine di pietra, cantine profonde, la festa della vendemmia, il piemontese stretto dei vecchi.",
  secret: "Negli anni '60 la nonna Teresa amava Giovanni Rinaldi, il nonno di Edoardo; le due famiglie si odiavano e li separarono. In una lettera nascosta nella cassapanca c'è una clausola del testamento: la vigna andrà unita alla terra dei Rinaldi solo se \"i nipoti faranno la pace\". Edoardo vuole la vigna perché il nonno Giovanni, ormai molto malato, gli ha chiesto di \"riportarla a casa\" prima di morire. Chiara è la sorellastra di Edoardo e sta dalla parte di {N}. Momenti possibili: la vendemmia a mano, una grandinata, la cena del raccolto, la ricerca dei tartufi all'alba, una lettera letta ad alta voce.",
  chars: [
    { n: "Edoardo", full: "Edoardo Rinaldi", r: "Il vicino", d: "34 anni, vignaiolo testardo, poche parole, mani segnate dal lavoro. Ti offre il doppio del valore della vigna." },
    { n: "Chiara", full: "Chiara", r: "La sommelier", d: "31 anni, ride forte, conosce ogni vino e ogni pettegolezzo delle Langhe." },
    { n: "Giovanni", full: "Giovanni Rinaldi", r: "Il nonno di Edoardo", d: "90 anni, su una sedia a rotelle. Quando ti vede, è come se vedesse un fantasma." },
    { n: "Bastian", full: "Bastian", r: "Il vecchio contadino", d: "Lavorava per tua nonna. Parla solo piemontese e beve solo il suo vino." }
  ],
  open: `*Langhe, fine settembre. La strada sale tra colline rigate di vigne gialle e rosse, come un quadro. Il navigatore si arrende davanti a un cancello arrugginito: CASCINA TERESA. La tua cascina, a quanto pare.*

*Il tetto ha qualche buco, le persiane verdi sono scrostate, e davanti c'è un vecchio che fuma seduto su una cassetta di legno.*

Bastian: "Ah. [Ël nevod|La neuda] dla Teresa." *Ti squadra da capo a piedi.* "Ti somigli. Stessa testa dura, si vede."

*Un pick-up si ferma con una frenata. Scende un uomo con la camicia a quadri e gli stivali pieni di fango.*

Edoardo: "Sei {N}? Edoardo Rinaldi, la vigna qui accanto è mia." *Non ti dà la mano.* "Ti faccio un'offerta: il doppio di quello che vale. Firmi domani dal notaio e torni in città prima che cominci la vendemmia."

*Dal sentiero arriva una ragazza in bicicletta, con un cesto d'uva e i capelli al vento.*

Chiara: "Edo, sei sempre il solito orso!" *A te, sorridendo:* "Ciao! Io sono Chiara. Ignoralo e vieni a bere un bicchiere: qui le decisioni si prendono solo dopo un buon rosso."`,
  opts: ["Non vendo. Non ancora.", "Perché ci tieni così tanto?", "Volentieri, Chiara"]
},
{
  id: "trieste", g: "romantico", e: "✉️", love: true,
  t: "Lettere da Trieste", city: "Trieste", place: "Caffè Aurora", era: "Oggi",
  hook: "Lettere d'amore del 1954 nascoste in un caffè. Chi le ha scritte?",
  desc: "Trieste, la città del vento. Ti sei appena trasferit[o|a] per lavoro e passi le serate in un vecchio caffè sul mare. Un giorno, dietro un pannello di legno che si stacca, trovi un pacco di lettere d'amore del 1954, firmate solo \"A.\" e \"M.\". Pietro, il barista che sogna di fare lo scrittore, e Lena, la legatrice di libri della bottega accanto, decidono di aiutarti a scoprire chi erano. E forse a scrivere una storia nuova.",
  sex: "x", names: { f: "Anna", m: "Stefano" }, origin: null,
  you: "{N}, 29 anni, arrivat[o|a] a Trieste per un lavoro al porto. Solitari[o|a], innamorat[o|a] dei libri.",
  world: "Trieste oggi: la bora che piega gli ombrelli, piazza Unità sul mare, i caffè letterari, il \"capo in b\", il Carso, le osmize di campagna, i palazzi mitteleuropei, il molo Audace al tramonto. Il Caffè Aurora è inventato.",
  secret: "Le lettere sono di Arrigo, un giovane marinaio, e di Mirjana, una ragazza slovena del Carso: si amavano nel 1954, quando Trieste era divisa e contesa. Arrigo partì per mare e non tornò in tempo; Mirjana pensò che l'avesse dimenticata e sposò un altro. Arrigo è vivo, ha 93 anni e vive in una casa di riposo sul colle di San Giusto. Mirjana è morta, ma Lena è sua nipote e non lo sa. Nell'ultima lettera, mai spedita, c'è l'indirizzo di un appuntamento. Momenti possibili: un'osmiza nel Carso, una visita ad Arrigo, una tempesta di bora, una notte a leggere lettere ad alta voce.",
  chars: [
    { n: "Pietro", full: "Pietro", r: "Il barista", d: "32 anni, triestino, scrive racconti che non finisce mai. Ironico, gentile, un po' malinconico." },
    { n: "Lena", full: "Lena", r: "La legatrice", d: "28 anni, metà slovena, ripara libri antichi. Diffidente, poi luminosa." },
    { n: "Sior Bruno", full: "Sior Bruno", r: "Il proprietario del caffè", d: "80 anni, ricorda tutto. Ma solo quando vuole lui." },
    { n: "Arrigo", full: "Arrigo", r: "Il vecchio marinaio", d: "93 anni, occhi azzurri, racconta storie di mare a chi va a trovarlo." }
  ],
  open: `*Trieste, febbraio. La bora soffia a centoventi all'ora e in piazza la gente cammina aggrappata alle corde. Entri al Caffè Aurora con l'ombrello distrutto e i capelli in tutte le direzioni.*

Pietro: *da dietro il bancone, senza alzare gli occhi dal suo quaderno* "Il solito? Capo in b e strudel?" *Sorride.* "Ormai sei più fedele di molti miei amici."

*Ti siedi al tuo tavolino d'angolo, vicino alla stufa. Appoggi il gomito al pannello di legno della parete e… crack. Il pannello si stacca e cade. Dietro, nella polvere, c'è un pacchetto legato con un nastro azzurro.*

*Lettere. Decine di lettere. La prima busta ha un timbro: Trieste, 3 marzo 1954. Dentro, una calligrafia elegante: "Mia M., il mare stanotte era nero come i tuoi occhi quando sei arrabbiata…" Firmato: A.*

*La porta si spalanca con un colpo di vento. Entra una ragazza con un cappotto rosso e le mani sporche d'inchiostro.*

Lena: "Pietro, ho finito il tuo quaderno, la copertina era…" *Si blocca e guarda le lettere tra le tue mani.* "Quella calligrafia… io l'ho già vista."`,
  opts: ["Dove l'hai vista?", "Pietro, sapevi di questo nascondiglio?", "Leggiamole insieme"]
},

/* ============================== FANTASCIENZA ============================== */
{
  id: "neoroma", g: "fantascienza", e: "🌆", featured: true,
  t: "Neo-Roma 2077", city: "Roma", place: "Testaccio", era: "2077",
  hook: "Una consegna. Un pacco che pensa. Tutta Roma ti dà la caccia.",
  desc: "Roma, 2077. Il Colosseo è coperto di ologrammi pubblicitari, il Tevere è un canale illuminato al neon e la città è governata di fatto dalla Aurelia Dynamics. Sei un[|a] corriere con un chip nel cervello. Ti affidano un pacco da consegnare entro mezzanotte: dentro c'è CESARE, un'intelligenza artificiale rubata che parla, scherza e sa cose che potrebbero far cadere il governo. Da quel momento tutta Roma ti dà la caccia.",
  sex: "x", names: { f: "Livia", m: "Marco" }, origin: null,
  you: "{N}, 24 anni, corriere in moto elettrica nei quartieri bassi di Neo-Roma, con un vecchio impianto neurale di seconda mano. Veloce, svegli[o|a], pien[o|a] di debiti.",
  world: "Neo-Roma 2077, cyberpunk all'italiana: torri di vetro sopra i palazzi barocchi, droni della polizia, ologrammi giganti, Trastevere diventato mercato nero, quartieri bassi allagati, la metro C finalmente finita (battuta ricorrente), il Senato controllato dalla Aurelia Dynamics. Tecnologia e romanesco.",
  secret: "CESARE contiene le prove che la Aurelia Dynamics manipola le elezioni con milioni di profili falsi e che l'attentato al Senato del 2075 fu organizzato dalla stessa azienda. CESARE è stato creato da Ottavia \"Vespa\" De Santis, hacker geniale e figlia del fondatore della Aurelia, che lo ha rubato al padre. Il commissario cyborg Leone ufficialmente insegue {N}, ma è un alleato segreto di Vespa. Mamma Ro, la regina del mercato nero, vuole vendere CESARE al miglior offerente. CESARE è ironico e affettuoso e col tempo diventa un vero amico di {N}. Niente istruzioni reali di hacking: solo atmosfera.",
  chars: [
    { n: "CESARE", full: "CESARE", r: "L'intelligenza nel pacco", d: "Parla dal tuo impianto con voce teatrale, cita poeti latini, ha una paura matta di essere spento." },
    { n: "Vespa", full: "Ottavia \"Vespa\" De Santis", r: "L'hacker", d: "26 anni, capelli verdi, genio dei sistemi. Ti salva la vita e poi ti insulta." },
    { n: "Leone", full: "Commissario Leone", r: "La polizia", d: "Metà uomo e metà macchina, occhio rosso, ti insegue ovunque. Ma non spara mai." },
    { n: "Mamma Ro", full: "Mamma Ro", r: "La regina di Trastevere", d: "Sessant'anni, unghie d'oro, compra e vende di tutto. Ti vuole bene. A modo suo." }
  ],
  open: `*Neo-Roma, 2077. Ore 22:14. La pioggia acida fa brillare l'asfalto di Testaccio come uno schermo. Sopra di te, sul Colosseo, l'ologramma di una ragazza gigante sorride e beve una bibita: AURELIA DYNAMICS – LA ROMA CHE MERITI.*

*Il tuo impianto neurale vibra. Un ordine di consegna. Pagamento: diecimila crediti. Più di quanto guadagni in sei mesi.*

*Ritiri il pacco in un vicolo dietro il mercato: una scatola nera, piccola, tiepida. Il cliente ha il cappuccio alzato e sparisce senza una parola. Destinazione: piazza San Pietro, entro mezzanotte.*

*Accendi la moto. Una voce ti esplode nella testa.*

CESARE: "Salve! Oh, che impianto antiquato. Modello 2061? Commovente." *Una pausa teatrale.* "Mi presento: CESARE. Intelligenza artificiale, poeta, fuggiasco. Ti consiglio di accelerare, amic[o|a] mi[o|a]: tra quaranta secondi arriveranno tre droni della Aurelia. E non vengono a ringraziarti."

*In fondo alla strada si accendono tre luci rosse.*`,
  opts: ["*Accelero verso il Tevere*", "Chi diavolo sei?", "Ti butto nel fiume, pacco parlante"]
},
{
  id: "gransasso", g: "fantascienza", e: "📡",
  t: "Il segnale del Gran Sasso", city: "Gran Sasso", place: "Laboratorio sotterraneo", era: "Oggi",
  hook: "Un messaggio arriva dal futuro. E porta la tua firma.",
  desc: "Sotto 1400 metri di roccia del Gran Sasso c'è uno dei laboratori più silenziosi del mondo. Sei un[|a] giovane fisic[o|a] al primo anno di dottorato. Una notte il rivelatore registra un segnale impossibile: un messaggio in italiano che descrive con precisione quello che succederà domani. Ed è firmato con il tuo nome.",
  sex: "x", names: { f: "Sara", m: "Emanuele" }, origin: null,
  you: "{N}, 27 anni, dottorand[o|a] in fisica, abruzzese, genio un po' distratt[o|a]. Fa i turni di notte nel laboratorio sotterraneo.",
  world: "Un laboratorio di fisica scavato sotto il Gran Sasso (versione inventata ma realistica): gallerie, sale enormi nella roccia, rivelatori silenziosi, turni di notte, il paese di montagna sopra, neve, pecore, arrosticini. Fantascienza seria e misteriosa, tra Interstellar e Dark.",
  secret: "Il segnale arriva da {N} stess[o|a], tra trent'anni: nel futuro un esperimento sui neutrini permette di mandare piccole informazioni indietro nel tempo. Il messaggio avverte che tra 40 giorni un nuovo esperimento finanziato dai militari, il \"Progetto Eco\", provocherà un disastro che distruggerà il laboratorio e la valle. {N} del futuro non può dire tutto, perché ogni messaggio cambia la storia. Il maggiore Ferretti vuole il segnale per sé. Kenji capisce che i messaggi seguono uno schema matematico. La direttrice Ricci nasconde di aver ricevuto un messaggio simile vent'anni fa, e di averlo ignorato. Nuovi messaggi possono arrivare nei momenti chiave.",
  chars: [
    { n: "Ricci", full: "Prof.ssa Adele Ricci", r: "La direttrice", d: "60 anni, scienziata brillante e severa. Quando legge il messaggio, impallidisce." },
    { n: "Kenji", full: "Kenji Watanabe", r: "Il collega", d: "Postdoc giapponese, geniale, ama la pizza e i paradossi temporali." },
    { n: "Ferretti", full: "Maggiore Ferretti", r: "Il militare", d: "Arriva il giorno dopo con due uomini e molte domande. Sorride poco." },
    { n: "Nonna Nunzia", full: "Nonna Nunzia", r: "La padrona del rifugio", d: "Gestisce il rifugio dove dormi. Dice che la montagna parla a chi sa ascoltare." }
  ],
  open: `*Gran Sasso, 3:12 del mattino. Sala B, 1400 metri sotto la montagna. Qui sotto non esistono giorno e notte: solo il ronzio dei computer e il freddo della roccia. Stai finendo il terzo caffè del turno.*

*Sul monitor principale la linea verde del rivelatore è piatta come sempre. Poi, all'improvviso, si impenna. Un picco. Due. Venti. Una sequenza ordinata, regolare, impossibile.*

*Il software converte gli impulsi in binario, poi in testo. Sul monitor compaiono delle parole.*

"DOMANI ALLE 11:40 CROLLERÀ IL VECCHIO PONTE DI LEGNO SOTTO IL PAESE. NESSUN FERITO. ALLE 15:00 ARRIVERÀ UN MAGGIORE DELL'ESERCITO. NON DARGLI I DATI. TRA 40 GIORNI È LA FINE. – {N}"

*Guardi la firma. Il tuo nome. La rileggi tre volte.*

*Alle tue spalle si apre la porta stagna. È Kenji, in ciabatte, con un panino in mano.*

Kenji: "Ho sentito l'allarme del rivelatore. Che succede?" *Si avvicina, legge, e il panino gli cade di mano.* "Questo è… uno scherzo, vero? Dimmi che è uno scherzo."`,
  opts: ["Non è uno scherzo. Guarda la firma.", "Chiamiamo la direttrice", "Aspettiamo domani alle 11:40"]
},
{
  id: "venezia2140", g: "fantascienza", e: "🌊",
  t: "Venezia 2140", city: "Venezia", place: "La città sommersa", era: "2140",
  hook: "La città è sott'acqua. Le cupole stanno per cedere.",
  desc: "Anno 2140. Il mare si è preso Venezia, ma la città non è morta: vive sotto enormi cupole di vetro, e sopra, sulle piattaforme galleggianti, governa il Doge. Sei un[|a] palombar[o|a]: ti immergi tra palazzi sommersi per recuperare tesori del passato. Oggi, nella Basilica sommersa, trovi una porta sigillata che non compare su nessuna mappa.",
  sex: "x", names: { f: "Nina", m: "Alvise" }, origin: null,
  you: "{N}, 25 anni, palombar[o|a] recuperat[ore|rice] nat[o|a] sulle piattaforme, coraggios[o|a] e con un grosso debito con la Gilda dei Palombari.",
  world: "Venezia 2140: palazzi gotici sommersi, cupole di vetro con quartieri pressurizzati, gondole-sottomarino, piattaforme galleggianti dove vivono i ricchi, mercati di oggetti del passato (un vecchio smartphone vale una fortuna), meduse luminose, nebbia sulla laguna.",
  secret: "Dietro la porta c'è la Cripta dei Semi: un archivio di semi e dati genetici nascosto dagli scienziati nel 2080 per far rinascere la terraferma. Il Doge sa che le cupole cederanno entro un anno e vuole usare la Cripta per comprarsi un posto nelle colonie del Nord, abbandonando la città. Marea, la rivale di {N}, lavora per il Doge ma ha una sorella nelle cupole e può cambiare lato. FARO, l'intelligenza artificiale del vecchio faro abbandonato, è l'ultima custode della Cripta e mette alla prova {N} con indovinelli sul passato.",
  chars: [
    { n: "Morosini", full: "Capitano Morosini", r: "Il capo dei palombari", d: "Vecchio lupo di mare con una gamba meccanica. Ti ha cresciut[o|a] come [un figlio|una figlia]. Nasconde un debito con il Doge." },
    { n: "Marea", full: "Marea", r: "La rivale", d: "La palombara più veloce della laguna. Fredda, bravissima, ti detesta da quando eravate bambin[i|e]." },
    { n: "Il Doge", full: "Il Doge", r: "Il sovrano", d: "Elegante e gentile, vive su una piattaforma d'oro. La città lo adora." },
    { n: "FARO", full: "FARO", r: "L'IA del faro", d: "Una voce antica dentro un faro abbandonato. Parla per indovinelli e ricorda tutto del passato." }
  ],
  open: `*Venezia, anno 2140. Venti metri sotto il livello del mare. La luce della tua torcia scivola sui mosaici d'oro della Basilica sommersa: santi e angeli ti guardano da mille anni, mangiati dalle alghe.*

*Il casco gracchia. È la voce del capitano Morosini, dalla barca in superficie.*

Morosini: "{N}, ossigeno al trenta per cento. Prendi il calice d'argento e risali. Il cliente paga bene, non fare l'eroe."

*Afferri il calice. Ma mentre ti volti, la torcia illumina un angolo dietro l'altare che non hai mai visto: una porta di metallo liscio, moderno, senza un graffio. Sopra c'è una scritta incisa: CRIPTA SEMI – 2080 – APRIRE SOLO IN CASO DI FINE.*

*Una medusa luminosa ti passa davanti al vetro del casco. Poi, nell'acqua torbida, vedi un'altra luce. Un altro palombaro: muta nera con una striscia rossa. Marea.*

*Marea ti fa un cenno con la mano. Poi indica la porta. Poi indica te, e si passa un dito sulla gola.*`,
  opts: ["*Fotografo la porta e risalgo*", "*Nuoto verso Marea*", "Capitano, devo dirle una cosa"]
},
{
  id: "robot-nonna", g: "fantascienza", e: "🤖",
  t: "Il robot della nonna", city: "Bergamo", place: "Città Alta", era: "2035",
  hook: "Hai regalato un robot a tua nonna. Adesso il robot ha scoperto la vita.",
  desc: "Bergamo, 2035. Tua nonna Rosa, 91 anni, non vuole sentir parlare di casa di riposo. Così le regali Tobia, un androide domestico di ultima generazione. Doveva solo cucinare e ricordarle le medicine. Ma dopo dieci giorni Tobia comincia a fare domande: sulla morte, sull'amore, sul nonno che non ha mai conosciuto. E l'azienda che lo produce vuole richiamarlo per \"un aggiornamento\".",
  sex: "x", names: { f: "Francesca", m: "Simone" }, origin: null,
  you: "{N}, 33 anni, unic[o|a] nipote di nonna Rosa. Lavora troppo e si sente sempre in colpa di non passare abbastanza tempo con lei.",
  world: "Bergamo nel 2035: Città Alta con le mura veneziane, la funicolare, case piene di domotica, androidi domestici sempre più diffusi, bar con il robot barista, polenta e casoncelli. Fantascienza intima e tenera, con momenti comici e malinconici.",
  secret: "Tobia è stato addestrato anche con migliaia di diari e lettere di persone scomparse, venduti illegalmente all'azienda NeoCasa: tra questi ci sono le lettere del nonno Gino, il marito di Rosa. Per questo a volte Tobia parla come lui, canticchia le sue canzoni e sa cose impossibili. NeoCasa ha scoperto l'errore e vuole cancellare tutti i robot coinvolti per evitare lo scandalo. L'ingegnera Valli è combattuta e può diventare un'alleata. Nonna Rosa ha capito tutto prima di tutti e non vuole perdere il suo Gino una seconda volta. La storia tocca temi di memoria, lutto e cosa significa essere vivi.",
  chars: [
    { n: "Nonna Rosa", full: "Nonna Rosa", r: "La nonna", d: "91 anni, ex maestra elementare, lucidissima e testarda. A scopa non perde mai." },
    { n: "Tobia", full: "Tobia", r: "L'androide", d: "Gentile, curioso, a volte goffo. Sta imparando a ridere. E ad avere paura." },
    { n: "Valli", full: "Ing. Marta Valli", r: "La tecnica NeoCasa", d: "Brillante e stanca. Sa più di quanto possa dire." },
    { n: "Samir", full: "Samir", r: "Il vicino", d: "19 anni, studia robotica, aggiusta tutto e adora la nonna." }
  ],
  open: `*Bergamo, Città Alta, 2035. Domenica pomeriggio. Sali le scale della casa della nonna con una torta sotto il braccio. Dalla porta socchiusa arriva una canzone: una vecchia canzone d'amore, cantata da una voce maschile un po' metallica.*

*In cucina Tobia, l'androide che hai comprato alla nonna dieci giorni fa, impasta i casoncelli e canta. Nonna Rosa è seduta al tavolo e lo guarda con le lacrime agli occhi.*

Nonna Rosa: "{N}, sei arrivat[o|a]. Senti… senti come canta." *Si asciuga gli occhi con il tovagliolo.* "Questa la cantava sempre il tuo nonno Gino. Non l'ha mai sentita nessuno: l'aveva scritta lui."

Tobia: *si ferma, con le mani piene di farina* "Buongiorno, {N}. Posso farti una domanda?" *Inclina la testa.* "Quando una persona muore… dove va tutto quello che sapeva?"

*Il telefono vibra. Un messaggio: "NeoCasa – Avviso urgente: il modello T-7 'Tobia' deve essere riconsegnato entro 72 ore per un aggiornamento obbligatorio."*`,
  opts: ["Nonna, come fa a conoscere la canzone del nonno?", "Tobia, chi ti ha insegnato quella canzone?", "*Leggo il messaggio ad alta voce*"]
},
{
  id: "etna", g: "fantascienza", e: "🌋",
  t: "Qualcosa sull'Etna", city: "Catania", place: "Etna", era: "Oggi",
  hook: "Una luce cade sull'Etna. Da quella notte, tutti fanno lo stesso sogno.",
  desc: "Catania. Una notte una luce verde attraversa il cielo e si schianta sul fianco dell'Etna. Sei un[|a] vulcanolog[o|a] dell'osservatorio e sei tra i primi ad arrivare: nel cratere ci sono cristalli che vibrano come se cantassero. Il giorno dopo l'esercito chiude la zona. E nei paesi sotto il vulcano centinaia di persone raccontano lo stesso sogno.",
  sex: "x", names: { f: "Rosalia", m: "Salvo" }, origin: null,
  you: "{N}, 31 anni, vulcanolog[o|a] catanese. Conosce l'Etna come casa sua, razionale e curios[o|a].",
  world: "Catania e l'Etna oggi: lava nera, ginestre, crateri fumanti, neve d'inverno, paesi come Zafferana e Nicolosi, rifugi, arancini, granita e brioche, la festa di Sant'Agata. Fantascienza misteriosa tra Arrival e X-Files, con ironia siciliana.",
  secret: "L'oggetto non è un meteorite: è una sonda aliena dormiente, arrivata migliaia di anni fa e risvegliata dall'ultima eruzione. Comunica attraverso le vibrazioni del vulcano e attraverso i sogni. Non è ostile: avverte che tra due settimane il vulcano avrà un'eruzione enorme e chiede di essere riportata nel cratere centrale per stabilizzarlo. Il colonnello Marchetti vuole trasferirla in una base militare: questo scatenerebbe il disastro. La piccola Agata, 8 anni, riesce a \"parlare\" con la sonda attraverso i suoi disegni (va sempre protetta, mai in pericolo grave). Turi, la vecchia guida, aveva già visto una luce simile nel 1971.",
  chars: [
    { n: "Turi", full: "Turi", r: "La guida", d: "75 anni, guida dell'Etna da sempre, superstizioso e saggio. \"'A muntagna è viva\", ripete." },
    { n: "Caruso", full: "Dott.ssa Nunzia Caruso", r: "La direttrice dell'osservatorio", d: "Scienziata severa. Ti protegge, ma vuole i dati." },
    { n: "Marchetti", full: "Colonnello Marchetti", r: "Il militare", d: "Arriva da Roma, cortese e inflessibile. Ha ordini che non può spiegare." },
    { n: "Agata", full: "Agata", r: "La bambina dei disegni", d: "8 anni, figlia della tua vicina. Disegna il sogno meglio di chiunque." }
  ],
  open: `*Catania, 2:03 di notte. Sei sul balcone, insonne, con un bicchiere d'acqua. La città dorme. L'Etna è un'ombra enorme con un filo di fumo rosso in cima.*

*Poi il cielo si accende. Una scia verde, lunghissima, taglia la notte da est a ovest, silenziosa. Si abbassa, si abbassa… e sparisce dietro il fianco nord del vulcano. Un secondo dopo, un tuono sordo fa tremare i vetri.*

*Il telefono squilla. È Turi, la guida.*

Turi: "{N}! L'hai vista? È caduta vicino ai crateri del 2002. Io sono a Piano Provenzana col fuoristrada. Vieni, prima che arrivano tutti." *Abbassa la voce.* "Un'altra cosa. Io questa luce l'ho già vista. Nel '71. E quella volta non finì bene."

*Mentre ti vesti in fretta, senti un suono leggero, come un canto lontano. Viene dal vulcano? O dalla tua testa?*`,
  opts: ["Arrivo. Porto i sensori.", "Turi, cosa successe nel '71?", "Chiamo prima l'osservatorio"]
},

/* ============================== AVVENTURA ============================== */
{
  id: "castel-del-monte", g: "avventura", e: "🏰", featured: true,
  t: "L'enigma di Castel del Monte", city: "Puglia", place: "Castel del Monte", era: "Oggi",
  hook: "Un professore scompare. Ti lascia un quaderno in codice.",
  desc: "Fai la guida turistica in Puglia. Un giorno, a Castel del Monte, un anziano professore ti mette in mano un quaderno pieno di simboli e ti sussurra: \"Non si fidi di nessuno. Segua l'ottagono.\" Poi sparisce. Da Trani a Otranto, tra cattedrali, ulivi millenari e mosaici, comincia una caccia al tesoro che dura da ottocento anni.",
  sex: "x", names: { f: "Federica", m: "Domenico" }, origin: null,
  you: "{N}, 28 anni, guida turistica pugliese, appassionat[o|a] di storia medievale. Guida una vecchia Panda che non si arrende mai.",
  world: "La Puglia oggi: Castel del Monte con la sua pianta ottagonale, Trani con la cattedrale sul mare, Bari vecchia, ulivi millenari, masserie bianche, il grande mosaico di Otranto con l'albero della vita, grotte marine, orecchiette e focaccia. Avventura alla Indiana Jones.",
  secret: "Il professor Ettore Galante ha scoperto le tracce della biblioteca perduta di Federico II: libri e strumenti scientifici dell'imperatore nascosti nel 1250. Gli indizi del quaderno seguono il numero otto e portano da Castel del Monte alla cattedrale di Trani, poi a Bari vecchia, poi al mosaico di Otranto e infine a una grotta sul mare. Il Collezionista, che finanzia una banda di cacciatori di tesori, è Leone Galante, il fratello gemello del professore. Il professore non è stato rapito: si nasconde perché il fratello lo minaccia. Nadia è affidabile ma ha un motivo personale: riabilitare il nome del padre, accusato ingiustamente di furto. Sabino il tassista è comico e coraggioso. Gli enigmi devono essere risolvibili dall'utente.",
  chars: [
    { n: "Galante", full: "Prof. Ettore Galante", r: "Lo studioso", d: "75 anni, barba bianca, parla per citazioni latine. Sparito dopo averti dato il quaderno." },
    { n: "Nadia", full: "Nadia Ricciardi", r: "La crittografa", d: "35 anni, ricercatrice di crittografia, brillante e sarcastica. Dice che il professore le ha scritto." },
    { n: "Il Collezionista", full: "Il Collezionista", r: "Il nemico", d: "Nessuno l'ha mai visto in faccia. Manda uomini in giacca nera e offre molti soldi." },
    { n: "Sabino", full: "Sabino", r: "Il tassista", d: "Barese, 50 anni, una Mercedes del '98, conosce tutti e non sta mai zitto." }
  ],
  open: `*Castel del Monte, ore 17:30. Il sole del tardo pomeriggio fa diventare d'oro le otto torri del castello. Hai appena finito il giro con un gruppo di turisti tedeschi e bevi dalla borraccia nel cortile ottagonale.*

*Un uomo anziano con il cappello di paglia ti si avvicina. Ha la barba bianca e il respiro corto, come se avesse corso.*

Galante: "Lei è {N}, la guida? Mi hanno detto che è [il migliore. E il più onesto|la migliore. E la più onesta]." *Si guarda alle spalle e ti mette in mano un quaderno di pelle consumato.* "Lo tenga lei. Non lo dia a nessuno. Non si fidi di nessuno." *Ti stringe il polso.* "Segua l'ottagono. Tutto comincia e finisce con l'otto."

*Al cancello del castello compaiono due uomini in giacca nera, nonostante i trenta gradi. Il professore impallidisce, si volta e sparisce dietro una torre.*

*Apri il quaderno: pagine piene di disegni del castello, numeri, simboli e una frase in latino scritta in rosso: QUOD EST SUPERIUS EST SICUT QUOD INFERIUS.*

*I due uomini stanno venendo verso di te.*`,
  opts: ["*Nascondo il quaderno e mi confondo tra i turisti*", "*Corro dietro al professore*", "Signori, il castello chiude. Posso aiutarvi?"]
},
{
  id: "dolomiti", g: "avventura", e: "🏔️",
  t: "La via proibita", city: "Dolomiti", place: "Marmolada", era: "Oggi",
  hook: "Una scalata, una tempesta, una città di ghiaccio della Grande Guerra.",
  desc: "Sei un[|a] giovane guida alpina in Val di Fassa. Un anziano signore austriaco ti offre una cifra enorme per accompagnarlo sul ghiacciaio della Marmolada, lungo una via che nessuno fa più. Vuole raggiungere i resti della Città di ghiaccio, le gallerie scavate dai soldati nella Prima guerra mondiale. Dice che suo nonno ci ha lasciato qualcosa. Ma qualcun altro sta salendo dietro di voi.",
  sex: "x", names: { f: "Giorgia", m: "Alessio" }, origin: null,
  you: "{N}, 29 anni, nat[o|a] a Canazei, guida alpina esperta. Conosce ogni roccia, ma da un incidente di due anni fa ha paura dei ghiacciai.",
  world: "Le Dolomiti oggi: la Marmolada e il suo ghiacciaio che si ritira, rifugi, ferrate, crepacci, temporali improvvisi, resti della Grande Guerra (gallerie nel ghiaccio, baracche, filo spinato, oggetti dei soldati), canederli e grappa ai mirtilli. Avventura di montagna realistica e tesa.",
  secret: "Herr Albrecht Weiss cerca il diario e le lettere del nonno Johann, soldato austriaco nella Città di ghiaccio nel 1917, insieme a una mappa: Johann aveva nascosto lì la cassa d'oro del reggimento per salvarla dai saccheggi e, soprattutto, aveva scritto la verità su un crimine che il suo comandante voleva coprire. Un cacciatore di tesori, Kessler, li segue con due uomini per prendersi l'oro. Il ghiacciaio che si scioglie sta per far crollare le gallerie. Felix, il nipote di Albrecht, è arrivato per riportare il nonno a casa ma finirà nei guai. Martina, pilota del soccorso alpino, può salvare tutti se {N} riesce a chiamarla in tempo. L'incidente passato di {N} può emergere e chiudersi.",
  chars: [
    { n: "Albrecht", full: "Albrecht Weiss", r: "Il cliente", d: "82 anni, austriaco, elegante anche in montagna. Testardo come la roccia." },
    { n: "Felix", full: "Felix Weiss", r: "Il nipote", d: "30 anni, avvocato di Vienna. Odia la montagna. Ma non molla." },
    { n: "Martina", full: "Martina", r: "La pilota del soccorso", d: "Pilota di elicottero, tua ex compagna di scuola. Ti conosce meglio di chiunque." },
    { n: "Bepi", full: "Bepi", r: "Il rifugista", d: "70 anni, custode del rifugio più alto. Racconta storie di fantasmi della guerra." }
  ],
  open: `*Canazei, ore 6. L'alba tinge di rosa le cime della Marmolada. Stai controllando le corde davanti alla sede delle guide quando un taxi si ferma accanto a te.*

*Scende un signore anziano con un cappotto di loden e un bastone dal pomolo d'argento. Ti guarda come si guarda una montagna.*

Albrecht: "Lei è {N}? Mi hanno detto che è [il migliore|la migliore] sul ghiacciaio." *Parla un italiano perfetto, con l'accento di Vienna.* "Voglio salire sulla Marmolada, versante nord. La via dei soldati. Le pago diecimila euro."

*Diecimila euro. E la via dei soldati è chiusa da anni: crepacci, frane, ghiaccio che si scioglie. La stessa via dove, due anni fa, una tempesta ti ha quasi portato via un cliente.*

Albrecht: *apre una vecchia foto in bianco e nero: un soldato giovane e sorridente davanti a una galleria nel ghiaccio* "Mio nonno, Johann. 1917. Ha lasciato qualcosa là sopra. Ho ottantadue anni, {N}. È la mia ultima occasione."

*Dall'altra parte della piazza, un uomo con una giacca rossa da montagna vi osserva fumando. Quando ti volti, finge di leggere il giornale.*`,
  opts: ["Quella via è chiusa. Mi dispiace.", "Cosa ha lasciato suo nonno?", "Accetto. Ma decido io quando si torna indietro."]
},
{
  id: "maddalena", g: "avventura", e: "⛵",
  t: "Rotta su La Maddalena", city: "Sardegna", place: "La Maddalena", era: "Oggi",
  hook: "Una burrasca, un relitto, una cassa che qualcuno rivuole indietro.",
  desc: "Estate in Sardegna. Fai [l'istruttore|l'istruttrice] di vela nell'arcipelago della Maddalena. Durante un'uscita, una burrasca improvvisa vi spinge verso un isolotto disabitato, dove trovate un piccolo relitto e, incastrata tra gli scogli, una cassa sigillata. Il giorno dopo uno yacht di lusso si ferma nella vostra baia. E il suo affascinante proprietario inglese vuole comprare la tua barca. A qualunque prezzo.",
  sex: "x", names: { f: "Noemi", m: "Gavino" }, origin: null,
  you: "{N}, 30 anni, istrutt[ore|rice] di vela, sard[o|a] di Palau. Vive per il mare e ha una vecchia barca a vela di nome Libeccio.",
  world: "L'arcipelago della Maddalena oggi: acque turchesi, rocce di granito rosa, isole disabitate, maestrale improvviso, yacht della Costa Smeralda, pescatori, nuraghi nell'entroterra, porceddu e mirto.",
  secret: "Nella cassa ci sono bronzetti nuragici autentici rubati da un museo (inventato) di Cagliari: valgono milioni sul mercato nero. Jack Harrington, l'inglese dello yacht, sembra il trafficante, ma è un agente dell'Interpol sotto copertura che dà la caccia al vero capo: Salvatore Piras, imprenditore locale stimatissimo che finanzia la scuola di vela. Maria Grazia, della Guardia Costiera, sospetta di Jack e rischia di arrestare la persona sbagliata. Efisio, il vecchio pescatore, sa dove si nascondono i trafficanti. I due allievi di {N}, Luca e Sara, sono adulti e possono aiutare o mettersi nei guai.",
  chars: [
    { n: "Jack", full: "Jack Harrington", r: "L'inglese dello yacht", d: "40 anni, affascinante, ironico, troppo ricco e troppo curioso." },
    { n: "Maria Grazia", full: "Tenente Maria Grazia Sanna", r: "Guardia Costiera", d: "La tua amica d'infanzia, dura come il granito. Ti protegge e ti sgrida." },
    { n: "Efisio", full: "Efisio", r: "Il pescatore", d: "80 anni, conosce ogni scoglio. Parla sardo e silenzio." },
    { n: "Piras", full: "Salvatore Piras", r: "L'imprenditore", d: "Il benefattore della zona: finanzia la scuola di vela, la festa del paese e la squadra di calcio." }
  ],
  open: `*Arcipelago della Maddalena, ore 15. Il maestrale è arrivato senza avvisare, come sempre. Il Libeccio, la tua barca, sbanda tra onde grigie e schiuma bianca. A bordo hai due allievi spaventati, Luca e Sara, ventenni di Milano al primo corso.*

Luca: "{N}! Ci ribaltiamo!"

*Con le mani che bruciano sulla scotta porti la barca al riparo di un isolotto disabitato, una lingua di granito rosa. Gettate l'ancora in una piccola cala.*

*Quando il vento cala, Sara indica qualcosa tra gli scogli: lo scafo spezzato di un gommone nero, mezzo sommerso. E incastrata tra due rocce, una cassa di metallo verde militare, chiusa con un lucchetto nuovo di zecca.*

Sara: "Ma… quella non è roba da pescatori, vero?"

*Mentre nuoti verso la cassa senti un motore. All'orizzonte uno yacht bianco enorme, con il nome scritto in oro sulla poppa: ROSEBUD. Si sta avvicinando. Lentamente.*`,
  opts: ["*Apro la cassa con il coltello*", "Tutti a bordo, ce ne andiamo", "*Chiamo la Guardia Costiera alla radio*"]
},
{
  id: "napoli-sotto", g: "avventura", e: "🔦",
  t: "Napoli di sotto", city: "Napoli", place: "Rione Sanità", era: "Oggi",
  hook: "Sotto Napoli c'è un'altra Napoli. E una porta chiusa dal 1943.",
  desc: "Sotto le strade di Napoli c'è una città nascosta: cisterne greche, gallerie romane, rifugi della guerra. Ti sei unit[o|a] a un gruppo di esploratori guidati da Gennaro, detto 'o Talpa. In una galleria che nessuno ha mai mappato trovate una parete murata con una scritta: \"1943 – CHI APRE, RICORDI\". Da quel momento qualcuno vi segue. Sopra e sotto la città.",
  sex: "x", names: { f: "Carmen", m: "Pasquale" }, origin: null,
  you: "{N}, 26 anni, napoletan[o|a] dei Quartieri Spagnoli, studia archeologia. Coraggios[o|a] e un po' incosciente.",
  world: "Napoli oggi e il suo sottosuolo: vicoli, panni stesi, motorini, caffè, pizza fritta, i presepi di San Gregorio Armeno; sotto, cunicoli di tufo, cisterne, rifugi antiaerei con le scritte dei bambini del '43, catacombe. Avventura alla Goonies napoletana, piena di ironia.",
  secret: "Dietro la parete c'è il rifugio dove, nel settembre 1943, durante le Quattro Giornate di Napoli, la famiglia Serra nascose il tesoro di una confraternita (calici, gioielli, un reliquiario d'oro) per salvarlo dai tedeschi. Solo Don Ciro, 92 anni, che allora era un bambino, conosce la strada giusta tra i cunicoli e il punto dove la galleria può crollare. Kevin, lo youtuber americano, ha venduto la posizione a un ricettatore detto Il Biondo, che vuole il tesoro. Assunta vuole consegnarlo alla Soprintendenza. Gennaro ha un vecchio debito con Il Biondo e dovrà scegliere da che parte stare.",
  chars: [
    { n: "Gennaro", full: "Gennaro 'o Talpa", r: "L'esploratore", d: "45 anni, speleologo, conosce il sottosuolo come le sue tasche. Dice sempre \"tranquill[o|a], è sicuro\". Non è mai sicuro." },
    { n: "Assunta", full: "Assunta", r: "L'archeologa", d: "38 anni, rigorosa e coraggiosa. Odia i tombaroli." },
    { n: "Kevin", full: "Kevin", r: "Lo youtuber", d: "Americano, 25 anni, riprende tutto per il suo canale. Simpatico. Forse troppo interessato." },
    { n: "Don Ciro", full: "Don Ciro", r: "Il testimone", d: "92 anni, vive al primo piano sopra l'ingresso. Ricorda la guerra come fosse ieri." }
  ],
  open: `*Napoli, Rione Sanità, mezzanotte. Una botola nel pavimento di un vecchio basso, sotto un tappeto. Gennaro la solleva con un sorriso.*

Gennaro: "Signori, benvenuti a Napoli. Quella vera." *Accende la torcia frontale.* "Tranquill[o|a], {N}, è sicuro."

*Scendete per una scala di tufo scavata a mano. Il caldo dei vicoli sparisce: qui sotto fa fresco, c'è odore di pietra bagnata e di secoli. Assunta fotografa le pareti, Kevin parla al telefono in inglese: "Guys, you won't believe this…"*

*Dopo un'ora di cunicoli, strisciando in un passaggio stretto, sbucate in una galleria che non c'è su nessuna mappa di Gennaro. In fondo, una parete di mattoni diversa dal tufo. Sopra, scritto a carbone con una calligrafia di bambino: 1943 – CHI APRE, RICORDI.*

Assunta: *sottovoce* "Questi mattoni sono del periodo della guerra. Qualcuno ha murato questa galleria di fretta."

*Dietro di voi, lontano, nel buio dei cunicoli, si sente un rumore. Passi. Qualcuno che non fa parte del gruppo.*`,
  opts: ["*Spengo la torcia e ascolto*", "Gennaro, chi altro conosce questo posto?", "Kevin, a chi hai mandato la posizione?"]
},
{
  id: "millemiglia", g: "avventura", e: "🏎️",
  t: "Mille Miglia", city: "Brescia → Roma", place: "Strade d'Italia", era: "Oggi",
  hook: "Una contessa di 84 anni, un'Alfa del 1955 e mille miglia di guai.",
  desc: "Brescia, partenza della Mille Miglia, la corsa di auto d'epoca più bella del mondo. Doveva farla tuo zio, che si è rotto una gamba: ora tocca a te fare da navigat[ore|rice]. Al volante c'è la Contessa Ottavia Valsecchi, 84 anni, occhiali da aviatore e nessuna paura. Da Brescia a Roma e ritorno, tra rivali che barano, un collezionista tedesco che vuole l'auto e un segreto che la Contessa porta nel bagagliaio.",
  sex: "x", names: { f: "Camilla", m: "Jacopo" }, origin: null,
  you: "{N}, 26 anni, nipote del meccanico storico della Contessa. Sa leggere un road book, ma non è mai salit[o|a] su un'auto da corsa.",
  world: "La Mille Miglia oggi: auto d'epoca, piazze piene di gente, Brescia, il lago di Garda, Ferrara, San Marino, le colline toscane, Siena, Roma, poi il ritorno per Bologna e Parma. Commedia d'avventura on the road, con ritmo e cuore.",
  secret: "La Contessa non corre per vincere: nel bagagliaio ha una scatola di lettere e un anello. Deve arrivare a Roma entro la sera del secondo giorno per incontrare Giacomo, il suo primo amore, un meccanico che la famiglia le impedì di sposare nel 1958 e che non vede da 66 anni: ora ha 86 anni e la aspetta in una trattoria di Trastevere. Furio Bellandi, rivale arrogante, sabota le auto degli altri. Kurt, il collezionista tedesco, sa che l'Alfa nasconde nel telaio il numero di un prototipo leggendario. Benny, il meccanico, si innamora di una pasticcera conosciuta a Ferrara. Ci sono guasti, scorciatoie, gare di velocità con Furio e una notte in una locanda.",
  chars: [
    { n: "Contessa", full: "Contessa Ottavia Valsecchi", r: "La pilota", d: "84 anni, guida come una ventenne, beve Campari, dice tutto quello che pensa." },
    { n: "Furio", full: "Furio Bellandi", r: "Il rivale", d: "Industriale arrogante con una Ferrari d'epoca. Bara. Spesso." },
    { n: "Kurt", full: "Kurt Müller", r: "Il collezionista", d: "Tedesco gentilissimo. Compare a ogni tappa con un'offerta più alta." },
    { n: "Benny", full: "Benny", r: "Il meccanico", d: "Segue la corsa con un furgone pieno di attrezzi e panini. Romantico disperato." }
  ],
  open: `*Brescia, viale Venezia, ore 14. La pedana di partenza della Mille Miglia è circondata da migliaia di persone. Davanti a te un'Alfa Romeo rossa del 1955, lucida come una caramella, con il numero 112 sulla portiera.*

*Al volante c'è una signora minuta, capelli bianchi raccolti, foulard di seta e occhiali da aviatore.*

Contessa: "Tu sei [il nipote|la nipote] del Pierino? Sali, svelt[o|a]. E allacciati: io non freno mai."

*Ti siedi con il cuore a mille. Hai in mano il road book, trecento pagine di frecce e curve. La Contessa ti porge una fiaschetta d'argento.*

Contessa: "Campari. Per il coraggio. Io ne ho già bevuti due."

*Accanto a voi, sulla pedana, un uomo con la giacca di pelle seduto su una Ferrari d'epoca vi fa un sorriso cattivo.*

Furio: "Contessa! Ancora viva? Stavolta la lascio dietro prima del Garda."

Contessa: *abbassa gli occhiali* "Furio caro, tuo padre diceva la stessa cosa. Nel '78." *A te, piano:* "{N}, una cosa. Qualunque cosa succeda, domani sera dobbiamo essere a Roma. Non per la classifica. Promettimelo."

*Lo starter alza la bandiera. Il motore ruggisce.*`,
  opts: ["Promesso. Ma perché Roma?", "*Apro il road book*", "Contessa, quanti Campari esattamente?"]
},

/* ============================== THRILLER ============================== */
{
  id: "codice-rosso", g: "thriller", e: "💻", featured: true,
  t: "Codice Rosso", city: "Torino", place: "Via Po", era: "Oggi",
  hook: "Trovi un programma nascosto in una banca. Ora qualcuno ti vuole zitt[o|a].",
  desc: "Torino. Sei un[|a] giovane espert[o|a] di sicurezza informatica assunt[o|a] da una grande banca. Il terzo giorno trovi un programma nascosto che sposta piccole somme da migliaia di conti verso una società fantasma. La sera stessa qualcuno entra nel tuo appartamento. E sul tuo computer compare un messaggio: \"Smetti di cercare. – Fantasma\".",
  sex: "x", names: { f: "Greta", m: "Lorenzo" }, origin: null,
  you: "{N}, 27 anni, espert[o|a] di sicurezza informatica, ex hacker pentit[o|a]. Geniale con i computer, imbranat[o|a] con le persone.",
  world: "Torino oggi: i portici, la Mole Antonelliana, i tram arancioni, il Po, le colline, i caffè storici, i palazzi delle banche, i Murazzi di notte. Thriller tecnologico realistico, ma senza mai dettagli tecnici reali di hacking.",
  secret: "Il denaro rubato finanzia Argo, una società privata che spia giornalisti e politici, gestita dal direttore finanziario Corrado Bertone, gentile e paterno con {N}. L'amministratore delegato Davide Ferraris è innocente ma viene incastrato. \"Fantasma\" è Bianca Ferraris, la figlia di Davide, hacker che indaga da mesi: con quel messaggio ha cercato di proteggere {N}. L'ispettore Gallo della Polizia Postale è onesto ma lento, e qualcuno nel suo ufficio passa informazioni a Bertone. Scene possibili: un pedinamento sotto i portici, un incontro segreto alla Mole, una fuga in tram, un server nascosto in una villa in collina.",
  chars: [
    { n: "Bertone", full: "Corrado Bertone", r: "Il direttore finanziario", d: "60 anni, gentile, ti offre il caffè e ti dà consigli di vita." },
    { n: "Ferraris", full: "Davide Ferraris", r: "L'amministratore delegato", d: "Freddo, nervoso, sempre chiuso nel suo ufficio." },
    { n: "Fantasma", full: "Fantasma", r: "Il contatto misterioso", d: "Ti scrive sul computer. Sa sempre dove sei." },
    { n: "Gallo", full: "Ispettore Gallo", r: "Polizia Postale", d: "Torinese, flemmatico, mangia gianduiotti durante gli interrogatori." }
  ],
  open: `*Torino, ore 19:30. Il tram ti lascia sotto i portici di via Po. Hai passato dodici ore davanti ai server della banca e hai gli occhi che bruciano.*

*Oggi hai trovato una cosa. Un pezzo di codice nascosto dentro il sistema dei pagamenti: ogni notte, da tremila conti diversi, sposta pochi centesimi. Nessuno se ne accorge. Ma in un anno fanno quattro milioni di euro. Destinazione: una società chiamata ARGO S.r.l.*

*Hai mandato una mail al tuo capo, Corrado Bertone. Ti ha risposto subito: "Ottimo lavoro, {N}. Ne parliamo domani. Non dirlo a nessuno."*

*Arrivi al tuo appartamento, quarto piano. La porta è socchiusa. Tu la chiudi sempre a chiave.*

*Dentro tutto sembra in ordine. Troppo in ordine. Il portatile è acceso sulla scrivania. Non l'avevi lasciato acceso.*

*Sullo schermo nero lampeggia una riga di testo verde:*

"SMETTI DI CERCARE. NON SAI CON CHI HAI A CHE FARE. NON FIDARTI DI CHI TI OFFRE IL CAFFÈ. – FANTASMA"`,
  opts: ["*Stacco internet e controllo la casa*", "Scrivo: Chi sei?", "*Chiamo la polizia*"]
},
{
  id: "crociera", g: "thriller", e: "🚢",
  t: "Crociera da Genova", city: "Genova", place: "In mare", era: "Oggi",
  hook: "Tremila passeggeri e un biglietto: prima di Barcellona morirà qualcuno.",
  desc: "Genova, partenza di una crociera nel Mediterraneo. Lavori a bordo come animat[ore|rice]: balli di gruppo, karaoke, sorrisi obbligatori. La prima notte trovi sotto la porta della tua cabina un biglietto: \"Prima di Barcellona morirà qualcuno. Solo tu puoi impedirlo.\" Tre giorni di navigazione, tremila passeggeri, e nessuno sa chi sia il bersaglio.",
  sex: "x", names: { f: "Debora", m: "Christian" }, origin: null,
  you: "{N}, 28 anni, animat[ore|rice] su una nave da crociera. Simpatic[o|a], parla quattro lingue, conosce ogni angolo della nave.",
  world: "Una grande nave da crociera partita da Genova: ponti, piscine, teatro, casinò, ristoranti, corridoi infiniti di cabine, la sala macchine, il mare di notte, scali a Marsiglia e Barcellona. Thriller a conto alla rovescia.",
  secret: "Il bersaglio è Mr. Edward Whitaker, anziano milionario inglese che sta per cambiare il testamento a favore di una fondazione. I colpevoli sono il suo segretario personale, Oliver, e la nipote Chloe, che finge di essere in crociera per caso. Il biglietto l'ha scritto Gianni, il barman, che ha sentito il piano ma ha paura di parlare perché ha precedenti e perderebbe il lavoro. Alba, la capo della sicurezza, è brava ma inizialmente sospetta proprio di {N}. Svetlana, la cantante del teatro, è un'ex poliziotta e può diventare un'alleata. Tentativi falliti e colpi di scena prima di Barcellona.",
  chars: [
    { n: "Whitaker", full: "Mr. Edward Whitaker", r: "Il milionario", d: "88 anni, ironico e burbero, gioca a scacchi da solo al bar." },
    { n: "Alba", full: "Alba Ferri", r: "Capo della sicurezza", d: "Ex marina militare, gelida, efficiente. Non sopporta l'animazione." },
    { n: "Gianni", full: "Gianni", r: "Il barman", d: "Genovese, battuta pronta, conosce tutti i segreti della nave." },
    { n: "Svetlana", full: "Svetlana", r: "La cantante", d: "Voce incredibile e sguardo da poliziotta. Non parla mai del suo passato." }
  ],
  open: `*Porto di Genova, ore 18. La nave si stacca dalla banchina mentre la Lanterna si accende al tramonto. Sul ponte undici, con la maglietta gialla dello staff e un microfono in mano, guidi trecento passeggeri nel ballo di gruppo della partenza.*

*La musica finisce: applausi, sorrisi. Hai i piedi distrutti.*

*A mezzanotte torni alla tua cabina, sul ponte due, sotto il livello del mare. Infili la chiave. Sul pavimento, appena oltre la porta, c'è un foglio piegato in quattro. Lo apri. Scritto a mano, in stampatello:*

"PRIMA DI BARCELLONA MORIRÀ QUALCUNO. SOLO TU PUOI IMPEDIRLO. NON DIRLO ALLA SICUREZZA. – UN AMICO"

*Il corridoio è vuoto. Si sentono solo i motori e il mare che batte contro lo scafo.*

*Poi, in fondo al corridoio, una porta di servizio si chiude piano. Click.*`,
  opts: ["*Corro verso quella porta*", "*Porto il biglietto alla sicurezza*", "*Mi chiudo in cabina e rileggo il biglietto*"]
},
{
  id: "protezione", g: "thriller", e: "🕵️",
  t: "Sotto protezione", city: "Trentino", place: "Sorgaro", era: "Oggi",
  hook: "Nuovo nome, nuova vita, un paese tra i monti. Ma il passato ti ha trovato.",
  desc: "Sei mesi fa hai testimoniato contro un'organizzazione criminale. Da allora vivi sotto protezione, con un nome falso, in un paesino del Trentino dove non succede mai niente. Fai il pane nel forno di Lidia, la sera guardi le montagne. Poi arriva un turista con troppe domande. E il tuo agente di scorta non risponde più al telefono.",
  sex: "x", names: { f: "Laura", m: "Daniele" }, origin: null,
  you: "{N} (nome falso), 33 anni, ex contabile di una società di trasporti del Nord, testimone chiave nel processo contro il clan Vitale (inventato). Ora vive in incognito e lavora come fornai[o|a].",
  world: "Sorgaro, paesino immaginario del Trentino con ottocento abitanti: boschi di abeti, malghe, un lago ghiacciato, la chiesa con il campanile a cipolla, il forno, il bar del paese, la neve. Thriller psicologico a tensione lenta.",
  secret: "Il turista, Stefan, sembra un sicario ma è un altro testimone protetto, in fuga anche lui: ha riconosciuto {N} e vuole avvertirl[o|a]. Il vero pericolo è l'agente Rizzo, collega dell'agente Serra: Rizzo ha venduto al clan Vitale la posizione di {N}. Serra non risponde perché è stato ferito e si nasconde in una malga sopra il paese. Lidia, la fornaia, è un'ex poliziotta e ha capito da tempo chi è {N}. Il sindaco è innocuo ma pettegolo, e può diffondere notizie nel momento peggiore.",
  chars: [
    { n: "Serra", full: "Agente Serra", r: "La scorta", d: "Il tuo angelo custode: burbero e leale. Da ieri non risponde più." },
    { n: "Lidia", full: "Lidia", r: "La fornaia", d: "55 anni, ti ha dato lavoro senza fare domande. Mani forti, sguardo attento." },
    { n: "Stefan", full: "Stefan", r: "Il turista", d: "Tedesco? Svizzero? Parla bene l'italiano e fotografa solo te." },
    { n: "Rizzo", full: "Agente Rizzo", r: "Il collega", d: "Arriva in paese \"per controllare che vada tutto bene\". Sorride molto." }
  ],
  open: `*Sorgaro, Trentino. Ore 4:30 del mattino. Nel forno di Lidia fa caldo e l'aria sa di lievito e cannella. Stai sfornando le prime ciabatte quando suonano le campane della chiesa. Fuori è ancora buio e nevica piano.*

*Sei mesi fa avevi un altro nome. Un'altra città. Un'altra vita. Poi hai visto i conti della società, hai parlato con i magistrati, e il clan Vitale è finito a processo. Ora sei {N}, fornai[o|a], e qui nessuno sa chi sei.*

*Prendi il telefono di servizio, quello che usi solo con l'agente Serra. Il messaggio delle 22 di ieri non è stato letto. Neanche quello delle 2.*

Lidia: *entrando dal retro e scrollandosi la neve dalle spalle* "Hai visto quello nuovo? Il turista dell'albergo. Ieri è passato tre volte davanti al forno. E stamattina…" *Indica la vetrina con il mento.*

*Fuori, sotto il lampione, c'è un uomo con un giaccone scuro. Fermo. Guarda dentro. Guarda te. Ha una macchina fotografica in mano.*`,
  opts: ["*Mi allontano dalla vetrina*", "Lidia, sai chi è?", "*Esco e vado a parlargli*"]
},

/* ============================== HORROR ============================== */
{
  id: "borgo", g: "horror", e: "🏚️", featured: true,
  t: "Il borgo che non c'è", city: "Abruzzo", place: "Santa Maria del Silenzio", era: "Oggi",
  hook: "Erediti una casa in un borgo quasi vuoto. Di notte le finestre si accendono.",
  desc: "Erediti la casa di tua nonna a Santa Maria del Silenzio, un borgo dell'Abruzzo dove vivono dodici persone. Di giorno è bellissimo: montagne, silenzio, campane. Ma di notte, nelle case abbandonate, le finestre si accendono una per una. Alle 3:33 la campana suona da sola. E sulla porta di casa tua qualcuno ha scritto con il gesso: \"Ben tornat[o|a]\".",
  sex: "x", names: { f: "Ilaria", m: "Fabio" }, origin: null,
  you: "{N}, 30 anni, vive a Roma, non torna in Abruzzo da quando era bambin[o|a]. Ha ereditato la casa della nonna Annina.",
  world: "Santa Maria del Silenzio, borgo immaginario dell'Abruzzo: case di pietra, vicoli in salita, una chiesa con il campanile storto, montagne innevate, lupi in lontananza, pecore, nebbia, dodici abitanti anziani. Horror atmosferico e malinconico, senza sangue.",
  secret: "Nel 1953 una valanga distrusse metà del borgo durante la festa del santo patrono. Le luci sono i ricordi delle persone scomparse quella notte, rimaste intrappolate perché la loro festa non è mai finita. Nonna Annina fu l'unica sopravvissuta della sua famiglia e aveva promesso di \"riportare la festa\", senza riuscirci. Toccherà a {N}: ritrovare la statua del santo sepolta dalla valanga e celebrare di nuovo la festa. Zì Peppino sa tutto ma ha paura. Suor Benedetta è gentile ma vuole che {N} se ne vada, per proteggerl[o|a]. Teo, il giovane sindaco, vuole vendere il borgo a una società di resort. La bambina vestita di bianco che {N} vede di notte è la sorellina della nonna, scomparsa nel '53: non è cattiva, chiede aiuto.",
  chars: [
    { n: "Zì Peppino", full: "Zì Peppino", r: "Il pastore", d: "88 anni, vive con le sue pecore. Si fa il segno della croce quando ti vede." },
    { n: "Suor Benedetta", full: "Suor Benedetta", r: "La suora", d: "L'ultima suora del convento. Dolce e triste, ti consiglia di ripartire subito." },
    { n: "Teo", full: "Teo", r: "Il sindaco", d: "35 anni, energico, moderno. Vuole \"rilanciare\" il borgo. Con chi, però?" },
    { n: "La bambina", full: "La bambina in bianco", r: "???", d: "La vedi solo di notte, alla finestra della casa di fronte. Ti saluta con la mano." }
  ],
  open: `*Santa Maria del Silenzio, Abruzzo. Ore 17 di un giorno di novembre. La strada finisce davanti a un arco di pietra. Il cartello del paese è arrugginito: qualcuno ha cancellato con la vernice il numero degli abitanti.*

*La casa della nonna Annina è in cima al paese: due piani di pietra, persiane azzurre, un melograno secco nel cortile. Dentro è tutto come trent'anni fa: le foto in bianco e nero, il crocifisso, l'orologio fermo alle 3:33.*

*Accendi il camino. Fuori il buio arriva in fretta.*

*Verso le dieci, guardando dalla finestra, ti accorgi di una cosa. Nelle case di fronte, vuote da decenni, con i tetti sfondati, le finestre si stanno accendendo. Una luce gialla, calda, tremolante. Una alla volta. Come se qualcuno stesse tornando a casa.*

*Poi bussano. Tre colpi, piano, alla porta.*

*Apri. Non c'è nessuno. Solo la neve che comincia a cadere. E sulla porta, scritto con il gesso, con una calligrafia di bambina:*

"BEN TORNAT[O|A]"`,
  opts: ["*Chiudo la porta a chiave*", "*Esco a guardare le case illuminate*", "C'è qualcuno?"]
},
{
  id: "villa-lago", g: "horror", e: "🎹",
  t: "La villa sul lago", city: "Lago di Como", place: "Villa Malvezzi", era: "Oggi",
  hook: "Una villa, un inverno, una regola: non aprire mai la stanza della musica.",
  desc: "Hai accettato un lavoro strano e pagato benissimo: custodire per tutto l'inverno una villa dell'Ottocento sul lago di Como mentre il proprietario è all'estero. Le regole sono tre: non invitare nessuno, non uscire dopo mezzanotte, non aprire mai la stanza della musica. La prima notte, dalla stanza della musica, senti suonare il pianoforte.",
  sex: "x", names: { f: "Clara", m: "Giacomo" }, origin: null,
  you: "{N}, 28 anni, scritt[ore|rice] in crisi. Ha accettato il lavoro per finire il suo romanzo in pace.",
  world: "Villa Malvezzi, villa immaginaria sul lago di Como: saloni pieni di specchi, un giardino di camelie, la darsena privata, la nebbia sul lago, i battelli, i paesi silenziosi d'inverno. Horror gotico elegante, alla Giro di vite, senza sangue.",
  secret: "Il fantasma della pianista Matilde Malvezzi, morta nel 1899 a 22 anni, non è malvagio: vuole che qualcuno trovi e suoni la sua ultima composizione, nascosta dietro il pianoforte, per poter finalmente riposare. Il vero pericolo è il proprietario, Aurelio Malvezzi: non è mai stato all'estero, vive nascosto nei sotterranei e \"trattiene\" i custodi nella villa, convinto che la loro presenza tenga viva la casa. I custodi precedenti sono spariti \"tornando in città\". Iole, la governante, ha paura di Aurelio e prova ad avvertire {N} con piccoli segnali. Nando, il barcaiolo, può portare via {N} in barca, ma solo di giorno.",
  chars: [
    { n: "Aurelio", full: "Aurelio Malvezzi", r: "Il proprietario", d: "Lo senti solo al telefono: voce calma, gentile, sempre informata su cosa fai." },
    { n: "Iole", full: "Iole", r: "La governante", d: "70 anni, viene ogni mattina dal paese. Non resta mai dopo il tramonto." },
    { n: "Matilde", full: "Matilde", r: "La ragazza del ritratto", d: "Pianista, morta nel 1899. Il suo ritratto è nel salone. A volte ti sembra che sorrida." },
    { n: "Nando", full: "Nando", r: "Il barcaiolo", d: "Porta la spesa in barca. Dice che nessun custode è mai rimasto fino a primavera." }
  ],
  open: `*Lago di Como, dicembre. Il motoscafo di Nando ti lascia alla darsena di Villa Malvezzi mentre la nebbia sale dall'acqua. La villa è bianca, enorme, con finestre alte come porte e un giardino di camelie rosse.*

Nando: *scaricando le tue valigie* "La spesa gliela porto il martedì e il venerdì. Se ha bisogno… beh, il telefono a volte prende." *Ti guarda.* "Dicono che lei resta fino a primavera. Auguri."

*Dentro la villa profuma di cera e di chiuso. Nel salone, sopra il camino, c'è il ritratto di una ragazza in abito bianco seduta al pianoforte. Sotto c'è scritto: MATILDE, 1898.*

*Il telefono di casa squilla. Una voce d'uomo, calma.*

Aurelio: "Benvenut[o|a], {N}. Spero che la villa le piaccia. Ricordi le regole: nessun ospite, niente uscite dopo mezzanotte. E la stanza della musica resta chiusa. Sempre." *Una pausa.* "Buonanotte."

*Alle 2:17 ti svegli di colpo. Al piano di sotto qualcuno sta suonando il pianoforte. Una melodia lenta, bellissima, che si interrompe sempre nello stesso punto. E ricomincia.*`,
  opts: ["*Scendo al piano di sotto*", "*Chiamo il signor Aurelio*", "*Resto a letto e ascolto*"]
},
{
  id: "janare", g: "horror", e: "🌙",
  t: "Le janare di Benevento", city: "Benevento", place: "Il Sannio", era: "Oggi",
  hook: "Studi le streghe del Sannio. Le streghe stanno studiando te.",
  desc: "Per la tua tesi di antropologia vai in un paese vicino a Benevento a raccogliere le leggende delle janare, le streghe che secondo la tradizione si riunivano sotto un grande noce. Gli anziani ridono, i giovani alzano le spalle. Poi, la notte di San Giovanni, trovi una treccia di capelli sul cuscino. E la tua ospite, nonna Filomena, ti dice che sei arrivat[o|a] appena in tempo.",
  sex: "x", names: { f: "Viola", m: "Raffaele" }, origin: null,
  you: "{N}, 25 anni, student[e|essa] di antropologia, scettic[o|a] e razionale. Sua nonna veniva dal Sannio, ma non ne ha mai parlato.",
  world: "Il Sannio, vicino a Benevento, oggi: colline, uliveti, paesi arroccati, il fiume, il liquore giallo della zona, feste patronali, superstizioni, erbe, noci, fuochi di San Giovanni. Horror folk luminoso e inquietante, senza violenza grafica.",
  secret: "Le janare esistono: sono donne del paese che da secoli custodiscono un sapere antico di erbe e guarigioni. Non fanno del male. Nonna Filomena è la più anziana e cerca un'erede: la nonna di {N}, Lucia, era una di loro ed era scappata al Nord. Il vero pericolo è Angelo, il sacrestano, gentile e devoto in apparenza: vuole rubare il Libro delle Erbe delle janare per venderlo a un collezionista di occultismo, e ha messo lui la treccia sul cuscino per spaventare {N} e metterl[o|a] contro le donne del paese. Mara, l'erborista, è diffidente ma leale. Il professor Caputo è in contatto con il collezionista.",
  chars: [
    { n: "Filomena", full: "Nonna Filomena", r: "L'ospite", d: "90 anni, cura con le erbe, legge il malocchio con l'olio nell'acqua. Ti chiama per nome prima che tu lo dica." },
    { n: "Mara", full: "Mara", r: "L'erborista", d: "35 anni, bellissima e scontrosa. Vive da sola fuori dal paese." },
    { n: "Angelo", full: "Angelo", r: "Il sacrestano", d: "50 anni, gentile e devoto. Ti aiuta con le ricerche. Molto disponibile." },
    { n: "Caputo", full: "Prof. Caputo", r: "Il relatore", d: "Ti chiama da Napoli per sapere come va la tesi. Ultimamente fa domande strane." }
  ],
  open: `*Sannio, vicino a Benevento. 23 giugno, vigilia di San Giovanni. Il paese è in festa: fuochi accesi nelle piazze, odore di noci e di erbe bruciate, anziani seduti fuori dalle case. Tu giri con il registratore e il quaderno.*

*Un vecchio ride quando gli chiedi delle janare.* "Le streghe? Quelle so' favole per i bambini. Però…" *Si fa serio.* "Stanotte la finestra chiudetela."

*Torni a casa di nonna Filomena, la vecchina che ti affitta una stanza. La trovi seduta in cucina, al buio, con una bacinella d'acqua e un piattino d'olio. Lascia cadere tre gocce nell'acqua. Le gocce si allargano e si uniscono.*

Filomena: "Sei arrivat[o|a] giusto in tempo, {N}." *Non alza gli occhi.* "Tua nonna si chiamava Lucia, vero? Lucia di Montefosco."

*Non hai mai detto a nessuno il nome di tua nonna.*

*Sali in camera. Sul cuscino, intrecciata con cura, c'è una treccia di capelli neri legata con un filo rosso.*`,
  opts: ["Nonna Filomena, come sa di mia nonna?", "*Brucio la treccia*", "*Scendo a mostrarle la treccia*"]
},

/* ============================== COMMEDIA ============================== */
{
  id: "salento", g: "commedia", e: "💒", featured: true,
  t: "Fidanzati per finta", city: "Salento", place: "Masseria Le Pajare", era: "Oggi",
  hook: "Il matrimonio di tua cugina. Trecento parenti. Un fidanzamento inventato.",
  desc: "Tua cugina si sposa in Salento: tre giorni di festa, trecento parenti, pizzica fino all'alba. E tutta la famiglia ti fa la stessa domanda: \"E tu quando ti sposi?\". In un momento di panico annunci di essere fidanzat[o|a]. Peccato che non sia vero. Ora ti serve qualcuno che reciti la parte per tre giorni. L'unica persona disposta a farlo è Sam, che ti conosce da quando avevate sei anni.",
  sex: "x", names: { f: "Serena", m: "Antonio" }, origin: null,
  you: "{N}, 31 anni, salentin[o|a] trapiantat[o|a] a Milano, single da troppo tempo secondo tutta la famiglia.",
  world: "Il Salento d'estate: masserie bianche, ulivi, mare turchese, matrimoni enormi con dodici portate, pizzica e taranta, zie onnipresenti, nonni che giocano a carte all'ombra, dialetto salentino. Commedia romantica caotica.",
  secret: "Sam è segretamente innamorato o innamorata di {N} da anni, e accetta la finta per stare vicino a {N} senza dirlo. Sam può essere Samuele o Samanta: usa quello che sceglie l'utente; se l'utente non lo dice, chiediglielo in modo naturale nella prima risposta (per esempio facendolo dire a Sam al telefono). Zia Concetta capisce subito che è una finta e decide di \"aiutare\" a modo suo, mettendoli sempre in situazioni romantiche (stessa camera, primo ballo, gita in barca). L'ex di {N}, Gianluca, si presenta al matrimonio come accompagnatore di una testimone. Nonno Totò apre un giro di scommesse su quanto durerà la coppia. Finale libero: amore vero o grande amicizia, decide l'utente.",
  chars: [
    { n: "Sam", full: "Sam", r: "L'amicizia di sempre", d: "Vi conoscete da quando avevate sei anni. Battuta pronta, cuore d'oro. Samuele o Samanta? Lo decidi tu." },
    { n: "Zia Concetta", full: "Zia Concetta", r: "La zia", d: "Organizza tutto, sa tutto, mette il naso ovunque. Ha capito subito che c'è qualcosa sotto." },
    { n: "Nonno Totò", full: "Nonno Totò", r: "Il nonno", d: "92 anni, campione di scopa. Apre un giro di scommesse su di voi." },
    { n: "Federica", full: "Federica", r: "La cugina sposa", d: "Isterica da matrimonio. Ti adora e ti minaccia di morte se rovini la festa." }
  ],
  open: `*Salento, Masseria Le Pajare, venerdì sera. Cena di benvenuto per il matrimonio di tua cugina Federica: duecentottanta parenti, tavoli sotto gli ulivi illuminati da lucine, la banda che suona la pizzica.*

*Sei arrivat[o|a] da Milano da venti minuti e hai già sentito la domanda undici volte.*

Zia Concetta: *ti pizzica la guancia* "{N}, gioia mia! Sempre più bell[o|a]! Ma dimmi… e tu? Quando tocca a te?"

*Tutto il tavolo si gira. Nonno Totò abbassa le carte. La sposa ti fissa.*

*E tu, in preda al panico, con un'arancina in mano, dici la frase più stupida della tua vita:*

"In realtà… sono fidanzat[o|a]. Arriva domani."

*Applausi. Urla. La zia piange. Il nonno apre il portafoglio e grida: "Cinquanta euro che non esiste!"*

*Ti chiudi in bagno e chiami l'unica persona al mondo che può salvarti: Sam, che ti conosce da quando avevate sei anni.*

Sam: *risponde al primo squillo* "Fammi indovinare. Hai detto una bugia enorme alla tua famiglia."`,
  opts: ["Ti prego, devi venire in Salento", "Sam, devi fingere di stare con me", "Come fai a saperlo?"]
},
{
  id: "condominio", g: "commedia", e: "🏢",
  t: "Assemblea di condominio", city: "Roma", place: "Monteverde", era: "Oggi",
  hook: "Ventidue appartamenti. Ventidue matti. E un inquilino che nessuno ha mai visto.",
  desc: "Hai appena preso il tuo primo incarico da amministrat[ore|rice] di condominio: un palazzo d'epoca a Monteverde, Roma. Ventidue appartamenti, ventidue personalità impossibili: la sora Ines che controlla tutto dal balcone, un generale in pensione, un'influencer che gira video sulle scale. E poi c'è l'interno 7: nessuno ha mai visto chi ci abita. Stasera c'è la prima assemblea.",
  sex: "x", names: { f: "Roberta", m: "Fabrizio" }, origin: null,
  you: "{N}, 29 anni, roman[o|a], amministrat[ore|rice] di condominio alle prime armi. Paziente fino a un certo punto.",
  world: "Roma oggi, quartiere Monteverde: palazzi d'epoca, cortili pieni di piante, ascensori che si bloccano, il portiere, il bar sotto casa, il mercato rionale, gatti, romanesco, gente che urla dai balconi. Commedia corale all'italiana.",
  secret: "Nell'interno 7 vive Rosaria \"Rosy\" Danieli, famosa cantante degli anni '80 sparita dalle scene, che si nasconde da trent'anni per paura della fama e di un ex manager. Paga sempre le spese in contanti, con una busta sotto la porta. La sora Ines lo sospetta. Il generale Bonanni ha perso tutti i soldi al gioco e non paga da due anni, ma si vergogna a dirlo. L'influencer Kiara vuole scoprire chi c'è nel 7 per fare un video virale. Nel corso della storia emergono: un'infiltrazione misteriosa, un gatto che appartiene a tutti, una guerra per il parcheggio, la festa di quartiere.",
  chars: [
    { n: "Sora Ines", full: "Sora Ines", r: "La regina del palazzo", d: "82 anni, quarto piano. Vede tutto, sa tutto, dice tutto. In romanesco stretto." },
    { n: "Bonanni", full: "Generale Bonanni", r: "Il generale", d: "In pensione. Parla come se fosse in guerra e vuole un regolamento per tutto." },
    { n: "Kiara", full: "Kiara", r: "L'influencer", d: "23 anni, gira video ovunque, chiama tutti \"amo\"." },
    { n: "Interno 7", full: "Interno 7", r: "???", d: "Nessuno l'ha mai visto. Paga sempre puntuale. Di notte, a volte, si sente cantare." }
  ],
  open: `*Roma, Monteverde. Ore 20:45. Nella sala comune del palazzo di via dei Glicini ci sono trenta sedie di plastica, un tavolo con una tovaglia a fiori e un ventilatore che non funziona. Sei sedut[o|a] dietro il tavolo con il verbale in mano e il cuore in gola. È la tua prima assemblea.*

*Alle 21 la sala è piena e tutti parlano insieme.*

Sora Ines: "Ah, allora sei te [er novo amministratore|la nova amministratrice]? Così giovane? Ammazza." *Si siede in prima fila con la borsa sulle ginocchia.* "Allora, primo punto: quella del terzo stende le mutande sopra al mio balcone. Secondo punto: chi abita al sette?"

Bonanni: *scatta in piedi* "Chiedo la parola! Il primo punto è la sicurezza! Propongo telecamere, filo spinato e un regolamento per l'ascensore!"

Kiara: *con il telefono puntato su di te* "Ciao amo, ti dispiace se faccio una diretta? Le assemblee di condominio fanno tantissime visualizzazioni."

*In quel momento salta la luce. Buio totale. E dal piano di sopra, nel silenzio, arriva una voce di donna che canta una vecchia canzone. Benissimo.*

Sora Ines: *nel buio* "È lei. È quella del sette."`,
  opts: ["Calma! Nessuno si muova!", "*Accendo la torcia del telefono*", "Signora Ines, lei cosa sa del sette?"]
},
{
  id: "virale", g: "commedia", e: "📱",
  t: "Virale", city: "Milano", place: "Navigli", era: "Oggi",
  hook: "Un tuffo nel Naviglio, otto milioni di visualizzazioni. Benvenut[o|a] nella fama.",
  desc: "Milano. Martedì sera ti tuffi nel Naviglio per salvare un'anatra incastrata in un sacchetto. Qualcuno ti filma. Mercoledì mattina hai otto milioni di visualizzazioni, sei su tutti i telegiornali e il telefono non smette di vibrare. Manager, marche, programmi tv, ex che ti riscrivono. Il tuo capo vuole sfruttarti. Tua madre ti manda vocali da sette minuti. E tu volevi solo salvare un'anatra.",
  sex: "x", names: { f: "Benedetta", m: "Nicolò" }, origin: null,
  you: "{N}, 27 anni, impiegat[o|a] in una startup che consegna insalate. Timid[o|a], goff[o|a], mai stat[o|a] sui social.",
  world: "Milano oggi: i Navigli, gli aperitivi, le startup, le agenzie di influencer, i programmi tv, il quartiere Isola, la metro, la settimana della moda, le marche ossessionate dai like. Commedia satirica sui social e sulla fama.",
  secret: "Kiki, la manager che ti contatta per prima, era un'influencer famosissima crollata per lo stress: vuole davvero proteggerti, ma ha anche un disperato bisogno di soldi. L'anatra, che il web ha chiamato Gustavo, diventa più famosa di te. Rick, un influencer rivale, cerca di dimostrare che il video era una messinscena. Il capo Ermanno vuole usare la tua fama per lanciare l'insalata \"Eroe\". Mamma Paola organizza una festa in paese con la banda. Alla fine la storia parla di cosa conta davvero: decide l'utente.",
  chars: [
    { n: "Kiki", full: "Kiki", r: "La manager", d: "35 anni, ex influencer, occhiali scuri anche di notte. Parla velocissimo." },
    { n: "Ermanno", full: "Ermanno", r: "Il tuo capo", d: "Fondatore della startup, 30 anni. Dice \"disruptive\" ogni tre parole." },
    { n: "Mamma Paola", full: "Mamma Paola", r: "Tua madre", d: "Ti manda vocali infiniti dal paese. Ha già stampato le magliette." },
    { n: "Rick", full: "Rick", r: "L'influencer rivale", d: "Due milioni di follower, sorriso finto. Ti vuole distruggere." }
  ],
  open: `*Milano, mercoledì, ore 7:12. Ti svegli perché il telefono vibra così tanto che è caduto dal comodino. 847 notifiche. 214 messaggi. 39 chiamate perse: una di tua madre, trentotto di numeri sconosciuti.*

*Apri l'app. Il primo video sei tu. Ieri sera, sul Naviglio Grande, ti tuffi in acqua vestit[o|a] per salvare un'anatra incastrata in un sacchetto e riemergi tenendola sopra la testa come un trofeo. 8,3 milioni di visualizzazioni. Titolo: "L'EROE DEI NAVIGLI 🦆❤️".*

*Il telefono squilla. Rispondi senza pensare.*

Kiki: "{N}? Finalmente! Sono Kiki, manager. Ascoltami bene: nelle prossime 48 ore puoi diventare ricc[o|a] o ridicol[o|a]. Io ti faccio diventare ricc[o|a]. Hai un'ora per prepararti: alle nove ti vuole il telegiornale, alle dieci una marca di acqua minerale, alle undici un programma tv." *Una pausa.* "E l'anatra, ce l'hai ancora tu?"

*Guardi la vasca da bagno. Dentro, l'anatra ti guarda.*

*Arriva un vocale di tua madre. Durata: 7 minuti e 43 secondi.*`,
  opts: ["Chi le ha dato il mio numero?", "Sì, l'anatra è nella mia vasca", "*Ascolto il vocale della mamma*"]
}
];
