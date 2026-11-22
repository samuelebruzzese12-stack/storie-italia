/* Storie d'Italia – «Risolvi il caso»: la soluzione dei gialli e dei thriller.
   q = la domanda, opz = le soluzioni proposte (l'app le mescola), ok = quella giusta,
   meta = soluzioni giuste solo in parte, verita = cosa è successo davvero (per il finale).
   Segnaposto come nelle storie: {N} nome del protagonista, [maschile|femminile]. */
window.CASI = {
  palio: {
    q: "Chi ha ucciso Gigi «Saetta» Morandi?",
    opz: [
      "Lorenzo Bandini, il capitano del Falco",
      "Tonio Spada, il fantino rivale",
      "Caterina Morandi, la sorella di Gigi",
      "Beppe, il barbaresco che custodisce il cavallo",
      "Nessuno: è stato davvero il cavallo"
    ],
    ok: 0,
    verita: "Gigi non è stato ucciso dal cavallo: Lorenzo Bandini, capitano del Falco e notaio stimatissimo, l'ha colpito alla testa e l'ha messo nel box per simulare un incidente. Gigi voleva confessare che le ultime due corse erano state truccate con un giro di scommesse clandestine organizzato proprio da Bandini."
  },
  arena: {
    q: "Chi ha cercato di uccidere il tenore Valente?",
    opz: [
      "Sergio Lanza, l'impresario",
      "Nadia Kovač, la soprano ed ex moglie di Valente",
      "Elia Ferro, il giovane sostituto",
      "Un tecnico delle luci pagato da un rivale"
    ],
    ok: 0,
    verita: "Il colpevole è Sergio Lanza, l'impresario: sommerso dai debiti, aveva stipulato in segreto un'assicurazione milionaria sulla vita del tenore. Ha manomesso il suo spray per la gola e ha nascosto il flacone nella borsa di Nadia Kovač per farla sembrare colpevole. Il giovane Elia era sospettabile, ma innocente."
  },
  portofino: {
    q: "Chi ha ucciso Ottavio Altieri?",
    opz: [
      "Margherita Serra, la madre dello sposo",
      "Vera Altieri, la giovane matrigna",
      "Filippo Serra, lo sposo",
      "Osvaldo, il maggiordomo",
      "Brando, il testimone"
    ],
    ok: 0,
    verita: "La colpevole è Margherita Serra, la madre dello sposo: la famiglia Serra è in bancarotta di nascosto. Ottavio l'aveva scoperto e quella sera voleva annullare le nozze, così lei l'ha colpito in giardino e l'ha spinto in acqua tra le 23:40 e mezzanotte. Vera, Brando e Filippo erano solo false piste."
  },
  nebbia: {
    q: "Che fine ha fatto Elisa, e chi la sta minacciando?",
    opz: [
      "È viva e si nasconde da Gualtiero: ha le prove che l'azienda del sindaco Ferrari avvelena il fiume",
      "Il sindaco Ferrari l'ha rapita perché aveva scoperto i suoi affari e la tiene chiusa in azienda",
      "Gualtiero, il pescatore, l'ha rapita e la tiene nascosta sull'isola",
      "È scappata da sola dopo una lite in famiglia, e la madre Silvia lo sa ma tace"
    ],
    ok: 0,
    meta: [1],
    verita: "Elisa è viva: si nasconde nella casa sull'isola di Gualtiero, il vecchio pescatore. Ha scoperto che l'azienda agricola del sindaco Ferrari scarica di notte rifiuti tossici nei campi e nel fiume, ha foto e campioni, e dopo una minaccia ha finto di sparire. Il sindaco e il suo braccio destro Mirco la cercano per farla tacere."
  },
  matera: {
    q: "Cosa è successo davvero a Jack Holloway?",
    opz: [
      "Il morto è la sua controfigura Danny: Jack è vivo e si nasconde con l'aiuto di Kim",
      "Marty Klein ha fatto uccidere Jack per incassare l'assicurazione del film",
      "Kim ha ucciso Jack dopo una lite e ha fatto sembrare tutto un incidente",
      "È stato un incidente: Jack è caduto da solo e nessuno sta mentendo"
    ],
    ok: 0,
    verita: "Il morto non è Jack ma la sua controfigura, Danny Ruiz, identico a lui tranne un piccolo tatuaggio a forma di rondine dietro l'orecchio: Danny è caduto per sbaglio durante una lite notturna con Jack. Jack, pieno di debiti con un finanziatore pericoloso di Las Vegas, ha scambiato i vestiti e si nasconde in una casa-grotta aiutato dall'assistente Kim, per sparire e lasciar pagare l'assicurazione."
  },
  "codice-rosso": {
    q: "Chi c'è dietro il denaro sparito e la rete segreta Argo?",
    opz: [
      "Corrado Bertone, il direttore finanziario",
      "Davide Ferraris, l'amministratore delegato",
      "Fantasma, il contatto misterioso",
      "L'ispettore Gallo della Polizia Postale"
    ],
    ok: 0,
    verita: "Dietro tutto c'è Corrado Bertone, il direttore finanziario così gentile con {N}: il denaro rubato finanzia Argo, la sua società privata che spia giornalisti e politici. Davide Ferraris è innocente e viene incastrato; «Fantasma» è sua figlia Bianca, una hacker che indaga da mesi e ha cercato di proteggere {N}."
  },
  crociera: {
    q: "Chi vuole uccidere Mr. Whitaker durante la crociera?",
    opz: [
      "Il segretario Oliver e la nipote Chloe, per l'eredità",
      "Gianni, il barman che ha scritto il biglietto",
      "Svetlana, la cantante del teatro di bordo",
      "Alba Ferri, la capo della sicurezza"
    ],
    ok: 0,
    verita: "A volere morto Mr. Whitaker sono il suo segretario personale Oliver e la nipote Chloe, che finge di essere a bordo per caso: il milionario sta per cambiare il testamento a favore di una fondazione. Il biglietto l'ha scritto Gianni, il barman, che ha sentito il piano ma ha paura di parlare; Svetlana è un'ex poliziotta e un'alleata."
  },
  protezione: {
    q: "Chi ha venduto al clan Vitale il nascondiglio di {N}?",
    opz: [
      "L'agente Rizzo, il collega della scorta",
      "Stefan, il turista straniero",
      "Lidia, la fornaia",
      "L'agente Serra, la scorta",
      "Il sindaco del paese"
    ],
    ok: 0,
    verita: "Il traditore è l'agente Rizzo, il collega di Serra: ha venduto al clan Vitale la posizione di {N}. Stefan non è un sicario ma un altro testimone protetto che voleva avvertir[lo|la]; Serra è stato ferito e si nasconde in una malga sopra il paese; Lidia, la fornaia, è un'ex poliziotta che aveva capito tutto."
  }
};
