/* Storie d'Italia – la regia delle locandine vive.
   Per ogni storia: come si muovono gli strati, quali effetti si aggiungono alla scena,
   come brilla il titolo, il movimento di macchina. Quello che non è scritto qui lo
   decide il genere (LOCANDINE_REGIA_GENERE) e lo aggiungono da soli i punti animati
   del disegno: finestre, luci, fiamme, acqua, fumo, sole e luna.

   strati:  { nomeElemento | "L4": "respiro" | "ondeggia" | { moto, amp, per, px, py } | false }
   vive:    [ [effetto, { opzioni, z:"dietro" | "cielo" | "fine" | chiave strato, su:elemento, ax, ay }] ]
   punti:   { tipoPunto: { opzioni che cambiano tutti i punti di quel tipo } }
   fx:      { effettoDellaScena: { opzioni } }
   titolo:  [ "lucido", "scintille", "glitch", "pulsa", "neon", "rimbalzo" ]
   camera:  { z: quanto avvicina, T: secondi del giro }
   senza:   [ effetti da non usare ] */
(function(W){
  "use strict";
  W.LOCANDINE_REGIA_GENERE = {
    drama:{ titolo:["lucido"], film:[["riflesso", { a:.14 }]] },
    giallo:{ titolo:["lucido"], camera:{ z:.04, T:30 } },
    thriller:{ titolo:["glitch", "lucido"], camera:{ z:.045, T:24 } },
    horror:{ titolo:["pulsa"], camera:{ z:.055, T:36 } },
    romantico:{ titolo:["lucido", "scintille"], film:[["riflesso", { a:.2 }]] },
    commedia:{ titolo:["rimbalzo", "scintille"] },
    fantascienza:{ titolo:["glitch", "lucido"], camera:{ z:.042, T:30 } },
    avventura:{ titolo:["lucido"], camera:{ z:.042, T:24 } },
    fantasy:{ titolo:["lucido", "scintille"], camera:{ z:.04, T:32 } },
    malavita:{ titolo:["lucido"], camera:{ z:.036, T:32 } },
    guerra:{ titolo:["lucido"], camera:{ z:.038, T:28 } },
    azione:{ titolo:["neon", "lucido"], camera:{ z:.046, T:18 } },
    vita:{ titolo:["lucido", "scintille"], film:[["riflesso", { a:.18 }]] }
  };

  W.LOCANDINE_REGIA = {
    /* ---------------- drama ---------------- */
    "bar-ferrante":{ fx:{ pioggia:{ n:62, forza:1.3 } }, punti:{ finestra:{ tv:.08 } },
      vive:[["autoPassa", { y:612, z:"S1" }], ["gocce", { n:6 }], ["lampoLontano", { ogni:9 }]], camera:{ z:.04 } },
    trattoria:{ vive:[["uccelli", { tipo:"rondini", n:6, y0:200, y1:420 }], ["polvere", { n:24, col:"#ffd9a0", y0:420 }]] },

    /* ---------------- giallo ---------------- */
    palio:{ strati:{ cavallo:{ moto:"galoppo", per:.52 } }, fx:{ pioggia:{ n:52 } },
      vive:[["spruzzi", { su:"cavallo", ax:.45, ay:.97, w:140, dir:-1 }], ["lampoLontano", { ogni:7 }]] },
    arena:{ strati:{ tenore:{ moto:"respiro", amp:1.3 } }, senza:["riflettori"], punti:{ fascio:{ muove:7, vel:.35 } }, fx:{ polvere:{ n:26 } },
      vive:[["petali", { n:9, cols:["#c41e2a", "#e0405a", "#ffd0d8"] }], ["bagliore", { x:300, y:600, r:170, col:"#fff0d0", ritmo:4, z:"S1" }]] },
    portofino:{ punti:{ acqua:{ onde:true }, faro:{ per:6 } }, fx:{ pioggia:{ n:56 }, fulmine:{ ogni:5 } },
      vive:[["bagliore", { x:440, y:404, r:100, col:"#5ee1ff", ritmo:2.6, z:"fondo" }], ["gocce", { n:7 }]] },
    nebbia:{ punti:{ luce:{ falene:true, cono:110, suolo:640 } }, deriva:{ nebbia:13 },
      vive:[["uccelli", { tipo:"corvi", n:5, y0:140, y1:360 }], ["polvere", { n:18, col:"#e8eef0", y0:300 }]] },
    matera:{ vive:[["tribune", { x0:30, x1:330, y0:600, y1:760, freq:1.6, z:"dietro" }], ["polvere", { n:22, col:"#ffe6c0", y0:430 }], ["fascio", { x1:100, y1:468, x2:250, y2:900, w1:10, w2:140, col:"#fff1d6", a:.15, z:"dietro" }], ["fascio", { x1:530, y1:458, x2:380, y2:900, w1:10, w2:140, col:"#fff1d6", a:.15, z:"dietro" }], ["uccelli", { tipo:"rondini", n:5, y0:110, y1:300 }]] },

    /* ---------------- romantico ---------------- */
    positano:{ strati:{ limoni:{ moto:"ondeggia", px:.95, py:.12, amp:.8 } },
      vive:[["uccelli", { tipo:"gabbiani", n:4, y0:150, y1:360 }], ["petali", { n:6, cols:["#ffffff", "#fff6d8"] }]] },
    bologna:{ vive:[["uccelli", { tipo:"stormo", n:8, col:"#3a3238", y0:180, y1:380 }], ["polvere", { n:16, col:"#ffd9a0", y0:380 }]] },
    firenze:{ strati:{ quadro:{ moto:"galleggia", amp:.45, per:6 } },
      vive:[["raggi", { n:5, col:"#ffd9a0" }], ["polvere", { n:26, col:"#ffe6b8", y0:120 }], ["brillio", { su:"quadro", ax:.1, ay:.12 }], ["brillio", { su:"quadro", ax:.9, ay:.88 }], ["uccelli", { tipo:"rondini", n:5, y0:140, y1:330 }]] },
    langhe:{ strati:{ uva:{ moto:"ondeggia", px:.2, py:.02, amp:.7 } },
      vive:[["foglie", { n:10 }], ["uccelli", { tipo:"stormo", n:7, y0:160, y1:360, dir:1 }], ["lucciole", { n:16, y0:560, y1:860, col:"#ffe9a0" }]] },
    trieste:{ strati:{ lettera:{ moto:"galleggia", amp:1.4 } }, fx:{ vento:{ n:22 } },
      vive:[["uccelli", { tipo:"gabbiani", n:4, y0:160, y1:380, dir:-1 }]] },

    /* ---------------- fantascienza ---------------- */
    neoroma:{ fx:{ pioggia:{ col:"#ffb0e0", n:50 } }, vive:[["gocce", { n:5 }], ["bokeh", { n:10, col:"#ff4fd8", y0:100, y1:600 }]] },
    gransasso:{ vive:[["polvere", { n:20, col:"#bfe8ff", y0:200 }]] },
    venezia2140:{ strati:{ astronauta:{ moto:"galleggia", amp:1.2, per:5.5 } },
      vive:[["caustiche", { n:10, y0:60, y1:860 }], ["pesci", { n:8, y0:200, y1:700 }]] },
    "robot-nonna":{ strati:{ robot:{ moto:"respiro", amp:.6, per:3.6 } }, vive:[["uccelli", { tipo:"stormo", n:6, y0:150, y1:360 }]] },
    etna:{ punti:{ fumo:{ forza:2, scuro:true, lento:true } },
      vive:[["cratere", { x:312, y:372, r:46, z:"S2" }], ["cenere", { n:14 }], ["lampoLontano", { col:"255,120,60", ogni:4 }]] },
    "quarta-dimensione":{ vive:[["polvere", { n:24, col:"#bfa8ff", y0:120 }]], camera:{ z:.05, T:30 } },
    infinito:{ strati:{ sonda:{ moto:"sospeso", amp:1.3, per:6 } }, vive:[["meteora", { x1:60, y1:80, x2:200, y2:190, w:3, z:"cielo" }]] },
    prometti:{ fx:{ polvere:{ n:50 } }, vive:[["vento", { n:10 }]] },
    tripodi:{ vive:[["esplosioni", { freq:.5 }], ["cenere", { n:10 }]] },

    /* ---------------- avventura e fantasy ---------------- */
    "castel-del-monte":{ vive:[["raggi", { n:6, col:"#ffc890" }], ["polvere", { n:20, col:"#ffd9a0", y0:400 }], ["falco", { x:300, y:190, rx:150, ry:40, s:1.5 }], ["uccelli", { tipo:"rondini", n:5, y0:220, y1:420 }]] },
    dolomiti:{ strati:{ alpinista:{ moto:"marcia", amp:.6, per:1.6 } }, fx:{ neve:{ vento:-90, n:90 } }, vive:[["vento", { n:12 }]] },
    maddalena:{ strati:{ barcaVela:{ moto:"dondola", amp:1.5, per:4 } }, punti:{ acqua:{ onde:true } }, fx:{ fulmine:{ ogni:4.5 } },
      vive:[["bagliore", { x:150, y:622, r:90, col:"#ffd36b", ritmo:2.2, z:"S4" }], ["spruzzi", { su:"barcaVela", ax:.5, ay:.93, w:220, dir:1 }]] },
    "napoli-sotto":{ strati:{ lanterna:{ moto:"ondeggia", py:0, amp:1.3 } },
      vive:[["luceViva", { x:238, y:600, r:420, a:.16, col:"#ffb060" }], ["pipistrelli", { n:3 }]] },
    millemiglia:{ camera:{ z:.05, T:16 },
      vive:[["polverone", { su:"auto", ax:.12, ay:.92, w:60, dir:-1, col:"#d8c0a0" }], ["uccelli", { tipo:"stormo", n:6, y0:140, y1:330, dir:-1 }]] },
    cacciatore:{ strati:{ lanterna:{ moto:"ondeggia", py:0, amp:1.1 } },
      vive:[["uccelli", { tipo:"corvi", n:3, y0:140, y1:280 }], ["luceViva", { x:318, y:700, r:360, a:.12, col:"#ffb060" }]] },

    /* ---------------- thriller ---------------- */
    "codice-rosso":{ fx:{ pioggia:{ n:48 } },
      vive:[["bagliore", { x:236, y:584, r:120, col:"#ff2a2a", ritmo:1.1, z:"L4" }], ["gocce", { n:6 }], ["lampoLontano", { ogni:8 }]] },
    crociera:{ strati:{ nave:{ moto:"dondola", amp:.3, per:6 } }, punti:{ faro:{ per:8 } } },
    protezione:{ fx:{ neve:{ vento:-20 } }, vive:[["fumo", { x:52, y:470, r:6, lento:true, col:"#c8ccd4", z:"S1" }], ["fumo", { x:372, y:462, r:6, lento:true, col:"#c8ccd4", z:"S1" }]] },

    /* ---------------- horror ---------------- */
    borgo:{ punti:{ finestra:{ vita:.5 } }, deriva:{ nebbia:12 }, vive:[["lucciole", { n:9, col:"#9adfff", y0:560, y1:760 }], ["lampoLontano", { ogni:8, col:"190,200,255" }], ["pipistrelli", { n:6 }], ["uccelli", { tipo:"corvi", n:3, y0:160, y1:300 }]] },
    "villa-lago":{ punti:{ finestra:{ vita:.4 } }, vive:[["uccelli", { tipo:"corvi", n:3, y0:180, y1:360 }]] },
    janare:{ fx:{ lucciole:{ col:"#a8ff7a", n:22 } }, deriva:{ nebbia:12 }, vive:[["lampoLontano", { ogni:6, col:"160,255,140" }], ["pipistrelli", { n:4 }]] },

    /* ---------------- commedia ---------------- */
    salento:{ strati:{ coppia:{ moto:"dondola", amp:.45, per:2.2 } }, vive:[["fuochi", { ogni:1.5, z:"fine", base:470, y0:90, y1:240, dim:4 }]] },
    condominio:{ punti:{ finestra:{ tv:.25, vita:1.5 } }, vive:[["uccelli", { tipo:"stormo", n:5, col:"#2a2228", y0:60, y1:200 }]] },
    virale:{ fx:{ cuori:{ n:18 } }, vive:[["bokeh", { n:10, col:"#ff6aa8" }]] },

    /* ---------------- guerra ---------------- */
    "italia-spezzata":{ punti:{ fascio:{ muove:12, a:.3 } }, vive:[["uccelli", { tipo:"stormo", n:5, y0:330, y1:480 }]] },
    mentone:{ vive:[["uccelli", { tipo:"gabbiani", n:3, y0:180, y1:420 }], ["lampoLontano", { ogni:6, col:"255,200,150" }]] },
    stalingrado:{ strati:{ chiatta:{ moto:"dondola", amp:1.2, per:5 } },
      vive:[["esplosioni", { freq:.6, y:450 }], ["cenere", { n:16 }], ["luceViva", { x:300, y:420, r:600, a:.1, col:"#ff7a2a" }]] },
    piave:{ vive:[["lampoLontano", { ogni:2.5, col:"255,210,150" }], ["spari", { x0:40, x1:560, y0:620, y1:680, freq:.8, z:"fondo" }]] },
    ossola:{ vive:[["uccelli", { tipo:"stormo", n:6, y0:180, y1:400 }]] },
    mille:{ strati:{ piroscafo:{ moto:"dondola", amp:.35, per:5.5 } }, vive:[["uccelli", { tipo:"gabbiani", n:4, y0:200, y1:420 }]] },
    canne:{ vive:[["falco", { x:200, y:180, rx:110, ry:30, col:"#1a0c08" }], ["falco", { x:420, y:240, rx:90, ry:26, ph:2, s:1.1, col:"#1a0c08" }], ["polverone", { x:300, y:700, w:600, freq:5, col:"#c8a070", dir:1 }]] },

    /* ---------------- malavita ---------------- */
    poggioreale:{ fx:{}, vive:[["lampoLontano", { ogni:7, col:"255,220,170" }], ["uccelli", { tipo:"gabbiani", n:3, y0:120, y1:300 }], ["polvere", { n:14, col:"#ffd9a0" }]] },
    montagna:{ vive:[["falco", { x:330, y:200, rx:130, ry:34 }], ["foglie", { n:5, cols:["#a8902a", "#806020"] }]] },
    "gioia-tauro":{ deriva:{ nebbia:12 }, vive:[["pioggia", { n:26 }], ["autoPassa", { y:690, z:"S2" }], ["luce", { x:110, y:405, r:60, col:"#ffd9a0", forma:"lampione", z:"fondo" }], ["luce", { x:430, y:405, r:60, col:"#ffd9a0", forma:"lampione", z:"fondo" }]] },
    "terra-fuochi":{ vive:[["cenere", { n:14 }], ["luceViva", { x:200, y:660, r:560, a:.13, col:"#ff6a1a" }]] },
    "non-pago":{ vive:[["autoPassa", { y:640, z:"S1", dir:-1 }]] },
    motoscafi:{ punti:{ acqua:{ onde:true } }, vive:[["spruzzi", { su:"motoscafo", ax:.82, ay:.86, w:120, dir:1 }]] },
    "re-di-roma":{ vive:[["storni", { x:330, y:190, n:220 }], ["raggi", { n:5, col:"#ffc070" }], ["polvere", { n:18, col:"#ffd9a0", y0:330 }]] },
    ostia:{ punti:{ acqua:{ n:70 } }, vive:[["polvere", { n:14, col:"#ffe6c0", y0:420 }], ["uccelli", { tipo:"gabbiani", n:4, y0:150, y1:380 }]] },
    "rien-ne-va-plus":{ strati:{ gondola:{ moto:"dondola", amp:.8, per:5 } } },
    lambrate:{ punti:{ luce:{ falene:true } } },
    supramonte:{ strati:{ pecore:{ moto:"respiro", amp:1.6, per:3.4 } }, vive:[["luceViva", { x:430, y:600, r:300, a:.12, col:"#ff9a3a" }], ["uccelli", { tipo:"stormo", n:6, y0:180, y1:380 }], ["polvere", { n:16, col:"#ffd9a0", y0:500 }], ["falco", { x:250, y:200, rx:120, ry:32 }], ["fumo", { x:425, y:560, r:10, lento:true, col:"#9a9088", z:"S1" }]] },
    cantiere:{ vive:[["uccelli", { tipo:"rondini", n:6, y0:120, y1:320 }], ["raggi", { n:4, col:"#ffb070" }], ["saldatura", { x:380, y:332, z:"S2" }], ["saldatura", { x:300, y:452, z:"S2" }]] },
    gargano:{ punti:{ acqua:{ onde:true } }, fx:{ lucciole:{ n:34 } }, vive:[["spari", { x0:420, x1:580, y0:520, y1:640, freq:.35, z:"S2" }]] },
    gela:{ vive:[["luceViva", { x:300, y:300, r:600, a:.1, col:"#ff7a2a" }], ["cenere", { n:10 }]] },
    caravaggio:{ fx:{ polvere:{ n:44 } }, vive:[["luceViva", { x:300, y:580, r:520, a:.1, col:"#ffb060" }], ["fascio", { x1:300, y1:-60, x2:300, y2:252, w1:150, w2:44, col:"#fff3d0", a:.12, z:"fondo" }], ["brillio", { x:136, y:256 }], ["brillio", { x:455, y:640 }], ["brillio", { x:300, y:250 }]] },
    fuorigioco:{ strati:{ pallone:{ moto:"gira", vel:.5 } }, vive:[["polvere", { n:20, col:"#ffffff", y0:300 }]] },
    lugano:{ punti:{ acqua:{ n:64 } }, vive:[["bokeh", { n:8, col:"#ffd9a0", y0:300, y1:560 }], ["uccelli", { tipo:"gabbiani", n:3, y0:200, y1:400 }]] },
    "nome-falso":{ strati:{ documento:{ moto:"galleggia", amp:1.2, per:6 } }, vive:[["uccelli", { tipo:"stormo", n:6, col:"#2a2a30", y0:120, y1:330 }], ["vento", { n:8 }]] },
    reggente:{ vive:[["bokeh", { n:10, col:"#ffc070", y0:200, y1:640 }], ["polvere", { n:16, col:"#ffd9a0", y0:350 }], ["uccelli", { tipo:"stormo", n:6, y0:120, y1:300 }]] },
    spalloni:{ strati:{ spallone:{ moto:"marcia", amp:.8, per:1.3 } }, fx:{ neve:{ vento:-40 } },
      vive:[["fascio", { x1:610, y1:330, x2:260, y2:640, w1:4, w2:90, col:"#fff6d8", a:.22, muove:9, z:"S1" }]] },
    bandito:{ vive:[["falco", { x:200, y:220, rx:120, ry:30 }], ["uccelli", { tipo:"stormo", n:5, y0:240, y1:420 }]] },
    mulberry:{ vive:[["uccelli", { tipo:"gabbiani", n:4, y0:160, y1:360 }]] },
    ferracane:{ strati:{ rosa:{ moto:"ondeggia", px:.5, py:1, amp:.6 } }, vive:[["petali", { n:5, cols:["#a8101a", "#d02030"] }]] },
    prufessore:{ vive:[["fuochi", { ogni:2.2, y0:90, y1:220 }]] },

    /* ---------------- vita e azione ---------------- */
    diciottanni:{ vive:[["uccelli", { tipo:"gabbiani", n:3, y0:150, y1:330 }]] },
    riviera:{ vive:[["stelle", { n:34, y0:30, y1:360, z:"cielo" }], ["meteora", { x1:520, y1:70, x2:380, y2:170, w:3, col:"#ffd0f0", z:"cielo" }], ["velocita", { y0:700, y1:860, n:10 }], ["bokeh", { n:8, col:"#ff4fd8", y0:120, y1:500 }]] },
    fuorilegge:{ vive:[["polverone", { su:"autoRetro", ax:.15, ay:.9, w:70, dir:-1, col:"#d8b890" }], ["velocita", { y0:640, y1:860, n:8 }]] },
    saline:{ strati:{ aereo:{ moto:"sospeso", amp:.25, per:7 }, fenicottero:{ moto:"respiro", amp:1.4, per:3.2 }, coccodrillo:{ moto:"galleggia", amp:.25, per:5 } },
      vive:[["fumo", { x:470, y:520, r:12, scuro:true, lento:true, col:"#5a5258" }]] },
    neon:{ strati:{ dj:{ moto:"salta", amp:.35, per:.48 } }, vive:[["strobo", { per:.48 }]] }
  };
})(window);
