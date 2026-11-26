/* Storie d'Italia – planimetrie.
   Disegna la planimetria di ogni storia: piante di navi ed edifici a più piani, mappe di città,
   borghi, montagne, coste, sotterranei e rotte, con le vie di entrata, il segnaposto «tu sei qui»
   e i personaggi visti nei luoghi. I luoghi di ogni storia stanno in mappe.js e mappe_2.js.
   Riconosce nel testo della chat i luoghi nominati e ricostruisce dove si trova chi gioca.

   Come si scrive una planimetria:
     id: { t:"titolo", s:"stile", tav:[ tavola, … ] }      (stile: di solito lo sceglie il genere)
   Tavola «pianta» (stanze su uno o più livelli):
     { n:"nome", f:"rett" | "nave" | "tondo" | "otto", liv:[ ["Nome del livello@da-a+opzioni~alias", "stanza; stanza; …"], … ] }
       @.1-.9      il livello occupa solo una parte della lunghezza     +scialuppe, +sub   (solo navi)
       f:"otto"    la prima stanza è il cortile al centro («-» = vuoto), poi le otto sale in giro
   Tavola «mappa» (luoghi su un territorio):
     { n:"nome", f:"citta" | "borgo" | "campagna" | "monti" | "mare" | "sotto" | "spazio" | "italia",
       luo:"luogo; luogo; …", vie:"0-1 1-2", vs:"strada" | "sentiero" | "rotta" | "tunnel",
       mare:"S70" | "N20" | "E90" | "O22" | "tutto", terra:"x,y,rx,ry;…", lago:"x,y,rx,ry", fiume:"x,y x,y",
       monti:"x,y,r;…", bosco:"x,y,rx,ry;…", mura:"cx,cy,rx,ry", confine:"x,y x,y", ferrovia:"x,y x,y",
       orbite:"cx,cy,rx,ry;…", scr:"x,y,TESTO;…", geo:"lon0,lat0,lon1,lat1" }
       f:"italia"  i luoghi si scrivono con longitudine e latitudine: Nome>icona@12.5,41.9
   Stanza o luogo:  Nome>icona@x,y|opzioni
     x, x2        stanza a tutta altezza (con peso)        a, b, a2   fila sopra o sotto il corridoio (con peso)
     2            peso (larghezza)                         !Etichetta via di entrata
     #            chiuso, solo personale                   *          qui comincia la storia
     ~a,b*        altri nomi con cui la chat lo chiama      ?nota      una riga di descrizione
     >al molo/il molo   come si dice «vado …» e «osservo …» quando l'articolo non si indovina   */
(function(W){
  "use strict";
  const f = n => Math.round(n * 10) / 10;
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
  const norm = t => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  const hash = s => { let h = 2166136261; for(const ch of String(s)){ h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = seed => { let x = (seed >>> 0) || 1; return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return ((x >>> 0) % 1000003) / 1000003; }; };
  const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
  const R_ = (x, y, w, h, a) => `<rect x="${f(x)}" y="${f(y)}" width="${f(Math.max(0, w))}" height="${f(Math.max(0, h))}"${a || ""}/>`;
  const L_ = (x1, y1, x2, y2, a) => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"${a || ""}/>`;
  const C_ = (x, y, r, a) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}"${a || ""}/>`;
  const P_ = (d, a) => `<path d="${d}"${a || ""}/>`;
  const T_ = (x, y, t, a) => `<text x="${f(x)}" y="${f(y)}"${a || ""}>${esc(t)}</text>`;

  /* ---------- stili: la carta, l'inchiostro, i colori di accessi e segnaposto ---------- */
  const SANS = "'Arial Narrow', 'Roboto Condensed', Arial, sans-serif";
  const STILI = {
    cianotipo:{ c:"#0e2a47", c2:"#081a30", g:"rgba(160,205,255,.085)", l:"#d6ebff", t:"rgba(190,222,255,.45)", p:"rgba(140,195,255,.055)", co:"rgba(140,195,255,.14)", x:"#f2f8ff", a:"#ffc24a", e:"#ffe27a", tu:"#ff6a55", wa:"rgba(90,160,230,.22)", vg:"rgba(120,220,170,.11)", font:"LShoulders", fw:700, maius:1, cw:.5, ls:.03 },
    notte:{ c:"#16161d", c2:"#0c0c11", g:"rgba(255,255,255,.035)", l:"#e8d6a6", t:"rgba(232,214,166,.42)", p:"rgba(224,168,63,.05)", co:"rgba(224,168,63,.12)", x:"#f8eed4", a:"#ff7a5a", e:"#ffd76a", tu:"#ff5a4a", wa:"rgba(110,160,220,.17)", vg:"rgba(140,200,140,.09)", font:"LShoulders", fw:700, maius:1, cw:.5, ls:.03 },
    pergamena:{ c:"#ead9b0", c2:"#d3ba82", g:"rgba(90,60,20,.06)", l:"#4a3216", t:"rgba(74,50,22,.5)", p:"rgba(140,90,30,.07)", co:"rgba(140,90,30,.15)", x:"#33200c", a:"#a3231a", e:"#d9541e", tu:"#a3231a", wa:"rgba(60,120,140,.25)", vg:"rgba(90,130,50,.18)", font:"LYoung", fw:400, maius:0, cw:.52, ls:0 },
    militare:{ c:"#d8d1ae", c2:"#beb58c", g:"rgba(60,70,40,.09)", l:"#2c3828", t:"rgba(44,56,40,.5)", p:"rgba(60,80,40,.07)", co:"rgba(60,80,40,.15)", x:"#1c2519", a:"#b0221a", e:"#d8541a", tu:"#b0221a", wa:"rgba(70,120,160,.28)", vg:"rgba(70,110,50,.2)", font:"LShoulders", fw:700, maius:1, cw:.5, ls:.03 },
    ologramma:{ c:"#05121a", c2:"#01080d", g:"rgba(94,242,230,.085)", l:"#6ff5ea", t:"rgba(111,245,234,.42)", p:"rgba(94,242,230,.05)", co:"rgba(94,242,230,.12)", x:"#e2fffc", a:"#ff5fd8", e:"#fff36a", tu:"#ff5fd8", wa:"rgba(60,140,255,.18)", vg:"rgba(120,255,160,.08)", font:"LTektur", fw:500, maius:1, cw:.62, ls:.02 },
    neon:{ c:"#130824", c2:"#090314", g:"rgba(255,95,216,.075)", l:"#ffa5ec", t:"rgba(255,165,236,.45)", p:"rgba(255,95,216,.06)", co:"rgba(94,225,255,.12)", x:"#fff0fc", a:"#5ee1ff", e:"#fff36a", tu:"#5ee1ff", wa:"rgba(94,225,255,.16)", vg:"rgba(166,255,106,.08)", font:"LTektur", fw:500, maius:1, cw:.62, ls:.02 },
    carta:{ c:"#f4eddc", c2:"#e2d7ba", g:"rgba(40,50,60,.05)", l:"#33465a", t:"rgba(51,70,90,.45)", p:"rgba(70,130,170,.07)", co:"rgba(70,130,170,.15)", x:"#1f2c38", a:"#d6402c", e:"#f08a24", tu:"#d6402c", wa:"rgba(90,170,210,.38)", vg:"rgba(110,170,80,.24)", font:"LShoulders", fw:700, maius:1, cw:.5, ls:.03 }
  };
  const STILE_GENERE = { giallo:"cianotipo", thriller:"cianotipo", drama:"notte", malavita:"notte", horror:"notte", guerra:"militare", fantasy:"pergamena", avventura:"pergamena", fantascienza:"ologramma", azione:"neon", romantico:"carta", commedia:"carta", vita:"carta" };
  const stile = m => { const n = STILI[m.s] ? m.s : (STILE_GENERE[m.g] || "notte"); return Object.assign({ nome:n }, STILI[n]); };
  const fam = n => `${n}, ${SANS}`;
  let mctx = null;
  function larg(t, fs, P){
    try{
      if(mctx === null) mctx = W.document ? document.createElement("canvas").getContext("2d") : false;
      if(mctx){ mctx.font = `${P.fw} ${fs}px ${fam(P.font)}`; return mctx.measureText(t).width + t.length * fs * (P.ls || 0); }
    }catch(e){ mctx = false; }
    return t.length * fs * P.cw;
  }
  // quando il nome non entra nella stanza: «Sala del trono» → «Trono»
  const corto = n => { const q = String(n).replace(/^(Sala|Stanza|Camera|Locale|Saletta) (del |della |dei |delle |dello |dell'|degli |di |d')/i, ""); return q !== n && q.length >= 4 ? q[0].toUpperCase() + q.slice(1) : null; };
  // il nome spezzato su più righe, alla grandezza più alta che entra nello spazio
  function adatta(nome, maxW, maxH, P, sizes){
    const txt = P.maius ? nome.toUpperCase() : nome;
    const parole = txt.replace(/ · /g, " · ").split(/ +/);
    for(const fs of sizes || [17, 16, 15, 14, 13, 12, 11, 10]){
      const lh = fs * 1.05, maxL = Math.min(3, Math.max(1, Math.floor(maxH / lh)));
      const righe = []; let cur = "", ok = true;
      for(const p of parole){
        const prova = cur ? cur + " " + p : p;
        if(larg(prova, fs, P) <= maxW) cur = prova;
        else { if(!cur || larg(p, fs, P) > maxW){ ok = false; break; } righe.push(cur); cur = p; }
      }
      if(!ok) continue;
      if(cur) righe.push(cur);
      if(righe.length <= maxL) return { fs, lh, righe:righe.map(r => r.replace(/ /g, " ").trim()) };
    }
    return null;
  }
  const testo = (A, cx, y0, cls) => A.righe.map((r, i) => T_(cx, y0 + A.fs * .82 + i * A.lh, r, ` class="${cls || "tx"}" font-size="${A.fs}"`)).join("");

  /* ---------- icone (24 × 24, a tratto) ---------- */
  const o_ = (x, y, r) => `M${x} ${y}m-${r} 0a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0-${r * 2} 0`;
  const IC = {
    punto:o_(12, 12, 3.2),
    letto:"M3 19V7M3 15h18v4M21 15v-2a3 3 0 0 0-3-3h-7v5" + o_(7, 11.5, 1.6),
    bar:"M5 4h14l-7 8zM12 12v7M8 20h8M15.5 6.5l3-3.5",
    tazza:"M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 10h2a2.5 2.5 0 0 1 0 5h-2M8 3v3M11.5 3v3",
    posate:"M6 3v6a2.5 2.5 0 0 0 5 0V3M8.5 3v18M17 3c-2.5 3-2.5 7 0 9M17 3v18",
    pentola:"M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h20M9 6h6M12 6V4",
    piscina:"M3 9c3-3 6 3 9 0s6 3 9 0M3 14c3-3 6 3 9 0s6 3 9 0M3 19c3-3 6 3 9 0s6 3 9 0",
    teatro:"M3 4h18v3H3zM5 7c0 6-1 9-2 13M19 7c0 6 1 9 2 13M5 7c3 3 4 8 3 13M19 7c-3 3-4 8-3 13M9 20h6",
    dadi:"M5 5h14v14H5zM9 9h.01M15 9h.01M12 12h.01M9 15h.01M15 15h.01",
    timone:o_(12, 12, 5.5) + o_(12, 12, 1.5) + "M12 2v4.5M12 17.5V22M2 12h4.5M17.5 12H22M4.9 4.9l3.2 3.2M15.9 15.9l3.2 3.2M19.1 4.9l-3.2 3.2M8.1 15.9l-3.2 3.2",
    ancora:"M12 7v14M8 11h8M4 14c0 4 4 7 8 7s8-3 8-7M4 14l-1.5 2.5M20 14l1.5 2.5" + o_(12, 5, 2),
    motore:o_(12, 12, 6) + o_(12, 12, 2.2) + "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M18.4 5.6l-2.2 2.2M7.8 16.2l-2.2 2.2",
    cassa:"M4 7l8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10",
    croce:"M9 3h6v6h6v6h-6v6H9v-6H3V9h6z",
    cartella:"M3 8h18v11H3zM9 8V5h6v3M3 13h18",
    sbarre:"M4 4h16v16H4zM8 4v16M12 4v16M16 4v16",
    scala:"M4 20h4v-4h4v-4h4V8h4V4",
    porta:"M6 21V3h12v18M4 21h16M14.5 12h.01",
    chiave:o_(7.5, 16.5, 3.5) + "M10 14L20 4M17 7l2 2M14.5 9.5l1.5 1.5",
    auto:"M3 16v-3l2-5h14l2 5v3zM3 16v2.5h3V16M18 16v2.5h3V16M5.5 12h13M7 14h.01M17 14h.01",
    treno:"M6 3h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM4 10h16M8 14h.01M16 14h.01M8 17l-2 4M16 17l2 4",
    aereo:"M12 3l1.5 6 7.5 4v2l-7.5-2-.5 5 2 1.5V21l-3-1-3 1v-1.5l2-1.5-.5-5L3 15v-2l7.5-4z",
    barca:"M3 16h18l-2.5 4h-13zM12 16V4M12 5l6 8h-6M12 7l-5 6h5",
    eli:o_(12, 12, 9) + "M9 8v8M15 8v8M9 12h6",
    chiesa:"M12 2v5M10 4h4M6 21v-9l6-5 6 5v9zM10 21v-5h4v5",
    torre:"M8 21V9H6V4h3v2h2V4h2v2h2V4h3v5h-2v12zM11 21v-4h2v4",
    castello:"M3 21V8h3v2h2V8h2v2h4V8h2v2h2V8h3v13zM10 21v-5a2 2 0 0 1 4 0v5",
    casa:"M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6",
    palazzo:"M5 21V3h14v18M3 21h18M9 7h.01M12 7h.01M15 7h.01M9 11h.01M12 11h.01M15 11h.01M9 15h.01M15 15h.01M11 21v-4h2v4",
    tempio:"M3 9l9-5 9 5zM5 9v9M9 9v9M15 9v9M19 9v9M3 18h18M2 21h20",
    negozio:"M3 9l1.5-5h15L21 9M3 9c0 2 3 2 3 0c0 2 3 2 3 0c0 2 3 2 3 0c0 2 3 2 3 0c0 2 3 2 3 0M5 11v9h14v-9M9 20v-5h6v5",
    piazza:"M4 16h16l-2 4H6zM12 16V8M8 9c1-3 7-3 8 0M10 6c1-2 3-2 4 0",
    albero:"M12 3l5 7h-3l4 6H6l4-6H7zM12 16v5",
    monte:"M2 20l7-12 4 6 2-3 7 9zM9 8l-1.6 3 1.6 1 1.6-1.4",
    grotta:"M3 20c0-9 4-15 9-15s9 6 9 15zM9 20c0-4 1-7 3-7s3 3 3 7",
    tenda:"M12 4L3 20h18zM12 4v16M10 20l2-5 2 5",
    bandiera:"M5 21V3M5 4h12l-3 4 3 4H5",
    scudo:"M12 3l8 3v6c0 5-3.5 8-8 9c-4.5-1-8-4-8-9V6zM12 8l1.2 2.6 2.8.3-2.1 1.9.6 2.8-2.5-1.4-2.5 1.4.6-2.8L8 10.9l2.8-.3z",
    bilancia:"M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z",
    libro:"M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2zM4 21a2 2 0 0 0 2 2h14v-4M8 7h8M8 11h6",
    provetta:"M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 15h9",
    antenna:"M12 21V11M8 21h8M7 6a7 7 0 0 0 0 9M17 6a7 7 0 0 1 0 9M4 3.5a11 11 0 0 0 0 14M20 3.5a11 11 0 0 1 0 14" + o_(12, 10.5, 1.8),
    razzo:"M12 2c3 3 4 7 4 11l-2 3h-4l-2-3c0-4 1-8 4-11zM12 9h.01M8 15l-3 3v-4l2-2M16 15l3 3v-4l-2-2M10 19l2 3 2-3",
    pianeta:o_(12, 12, 5) + "M3 16c4 2 14-4 18-8",
    computer:"M3 5h18v11H3zM8 20h8M12 16v4M7 9l3 2-3 2M12 13h4",
    microfono:"M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM6 11a6 6 0 0 0 12 0M12 17v4M9 21h6",
    musica:"M9 18V5l11-2v13" + o_(6, 18, 3) + o_(17, 16, 3),
    pallone:o_(12, 12, 9) + "M12 8l3.5 2.5-1.3 4h-4.4l-1.3-4zM12 3v5M20.5 9.5l-5 1M17 19l-2.8-4.5M7 19l2.8-4.5M3.5 9.5l5 1",
    ombrellone:"M3 12a9 9 0 0 1 18 0zM12 12v8a2 2 0 0 0 4 0M12 3V2",
    faro:"M9 21l1.5-12h3L15 21zM7 21h10M10 9V6h4v3M12 6V3M4 5l4 1.5M20 5l-4 1.5M4 9l4-1M20 9l-4-1",
    ponte:"M3 18V9M21 18V9M3 9c6 6 12 6 18 0M2 18h20M8 18v-5.5M12 18v-4.5M16 18v-5.5",
    fabbrica:"M3 21V11l6 3v-3l6 3V4h4v17zM7 17h.01M11 17h.01M15 17h.01",
    gru:"M6 21V4M4 21h8M6 4h14M6 4L3 7M6 8l8-4M17 4v6M15.5 10h3v3h-3z",
    uva:"M12 2v4M12 4c2-2 4-2 5 0" + o_(8.5, 9, 1.7) + o_(12, 9, 1.7) + o_(15.5, 9, 1.7) + o_(10.2, 12.6, 1.7) + o_(13.8, 12.6, 1.7) + o_(12, 16.2, 1.7),
    stalla:"M3 21V10l9-6 9 6v11zM8 21v-7h8v7M8 14l8 7M16 14l-8 7",
    fuoco:"M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4c0 2 1 3 2 3c0-3-1-5 1-9z",
    tomba:"M7 21V9a5 5 0 0 1 10 0v12M5 21h14M12 8v6M10 10h4",
    soldi:o_(12, 12, 9) + "M15.5 8.5a4.5 4.5 0 1 0 0 7M7 11h6M7 13.5h6",
    cassaforte:"M4 4h16v15H4zM6 19v2M18 19v2M7 8v7M13 11.5h.01" + o_(13, 11.5, 3.5),
    quadro:"M4 5h16v14H4zM7 8h10v8H7zM7 14l3-3 2 2 2-3 3 4",
    fiore:"M12 13v8M12 5V3M8.5 9H6.5M17.5 9h-2M9.5 6.5L8 5M16 5l-1.5 1.5M9.5 11.5L8 13M16 13l-1.5-1.5M8 18c2 0 4 1 4 3M16 17c-2 0-4 1-4 3" + o_(12, 9, 2),
    pane:"M4 11a4 4 0 0 1 4-5h8a4 4 0 0 1 4 5v7H4zM9 10v3M12 9v4M15 10v3",
    telefono:"M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2",
    occhio:"M2 12c3-5 6-7 10-7s7 2 10 7c-3 5-6 7-10 7s-7-2-10-7z" + o_(12, 12, 3),
    stella:"M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1-5.4-2.9-5.4 2.9 1.1-6.1L3.2 9.4l6.1-.8z",
    freccia:"M4 12h14M12 6l6 6-6 6",
    bagno:"M6 4h12v6H6zM5 10h14v3a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5zM9 18v3M15 18v3",
    spa:"M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11zM9 14a3 3 0 0 0 3 3",
    palestra:"M3 9v6M6 6v12M18 6v12M21 9v6M6 12h12",
    bunker:"M3 19c0-7 4-11 9-11s9 4 9 11zM2 19h20M9 14h6v-2H9z",
    trincea:"M2 8l4 4 4-4 4 4 4-4 4 4M2 15l4 4 4-4 4 4 4-4 4 4",
    vino:"M5 5c-2 4-2 10 0 14h14c2-4 2-10 0-14zM4 9h16M4 15h16M12 5v14",
    pesce:"M3 12c3-5 9-6 13-3l4-3v12l-4-3c-4 3-10 2-13-3zM8 11h.01",
    lente:o_(10.5, 10.5, 6.5) + "M15.5 15.5L21 21",
    strada:"M8 21L10 3M16 21L14 3M12 5v3M12 11v3M12 17v3",
    confine:"M4 21V8M4 10h17l-2 3H4M8 10l-2 3M12 10l-2 3M16 10l-2 3",
    bersaglio:o_(12, 12, 8) + o_(12, 12, 3) + "M12 2v4M12 18v4M2 12h4M18 12h4",
    ascensore:"M5 3h14v18H5zM12 3v18M8.5 9l-1.5 2.4h3zM15.5 13.4L14 11h3z",
    cinepresa:"M3 9h11v9H3zM14 12l6-3v9l-6-3" + o_(6, 6, 2) + o_(11, 6, 2),
    tesoro:"M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v9H4zM4 12h16M12 11v3",
    canne:"M5 21V8M5 8c-1.5 2-1.5 4 0 6M12 21V5M12 5c-1.5 2-1.5 4 0 6M19 21V9M19 9c-1.5 2-1.5 4 0 6M2 21h20"
  };
  const icona = (n, cx, cy, s, cls) => `<path class="${cls || "ic"}" transform="translate(${f(cx - s / 2)} ${f(cy - s / 2)}) scale(${(s / 24).toFixed(3)})" d="${IC[n] || IC.punto}"/>`;

  /* ---------- lettura dei dati ---------- */
  function leggiLuogo(txt){
    const parti = txt.split("|").map(s => s.trim());
    const dove = parti[0].indexOf(">");
    const nome = (dove >= 0 ? parti[0].slice(0, dove) : parti[0]).trim(), resto = dove >= 0 ? parti[0].slice(dove + 1).trim() : "";
    const r = { n:nome, ic:"punto", x:null, y:null, w:1, lato:"", full:false, acc:null, chiuso:false, inizio:false, k:[], verso:"", d:"" };
    const mm = resto.match(/^([a-z]+)?(?:@(-?[\d.]+),(-?[\d.]+))?$/);
    if(mm){ if(mm[1]) r.ic = mm[1]; if(mm[2] != null){ r.x = +mm[2]; r.y = +mm[3]; } }
    parti.slice(1).forEach(o => {
      if(!o) return;
      if(o[0] === "!") r.acc = o.slice(1).trim() || nome;
      else if(o === "#") r.chiuso = true;
      else if(o === "*") r.inizio = true;
      else if(o[0] === "~") r.k = o.slice(1).split(",").map(s => s.trim()).filter(Boolean);
      else if(o[0] === ">") r.verso = o.slice(1).trim();
      else if(o[0] === "?") r.d = o.slice(1).trim();
      else if(/^x[\d.]*$/.test(o)){ r.full = true; if(o.length > 1) r.w = +o.slice(1); }
      else if(/^[ab][\d.]*$/.test(o)){ r.lato = o[0]; if(o.length > 1) r.w = +o.slice(1); }
      else if(/^[\d.]+$/.test(o)) r.w = +o;
    });
    return r;
  }
  const ART = /^(il|lo|la|l|i|gli|le|un|una|uno) /;
  const GENERICI = new Set(["sala", "sale", "casa", "case", "ponte", "porta", "strada", "centro", "piano", "zona", "area", "lato", "nuova", "nuovo", "vecchia", "vecchio", "grande", "piccola"]);
  function chiaviDi(nome, alias){
    const ks = new Set(), base = norm(nome).replace(ART, "");
    if(base.length >= 4) ks.add(base);
    nome.split(/ · | e |, | \/ /).forEach(p => { const k = norm(p).replace(ART, ""); if(k.length >= 5 && k !== base && !GENERICI.has(k)) ks.add(k); });
    (alias || []).forEach(a => { const st = /\*$/.test(a.trim()), k = norm(a); if(k) ks.add(k + (st ? "*" : "")); });
    return [...ks];
  }
  const cache = new Map();
  function leggi(id, raw, extra){
    const m = Object.assign({ id, t:raw.t || "", s:raw.s || "", g:"", tav:[], luoghi:[], livelli:[], perId:{} }, extra || {});
    let n = 0;
    (raw.tav || []).forEach((tv, ti) => {
      const tav = Object.assign({}, tv, { i:ti, tipo:tv.liv ? "pianta" : "mappa", luoghi:[] });
      const nuovo = (r, li) => { r.id = "p" + n; r.num = ++n; r.ti = ti; r.li = li; r.keys = chiaviDi(r.n, r.k.concat(r.acc && r.acc !== r.n && norm(r.acc.replace(/\(.*?\)/g, "")).length >= 8 ? [r.acc.replace(/\(.*?\)/g, "").trim()] : [])); m.luoghi.push(r); m.perId[r.id] = r; tav.luoghi.push(r); return r; };
      if(tv.liv){
        tav.liv = tv.liv.map((L, li) => {
          let nome = L[0], alias = [], da = 0, a = 1; const opz = {};
          const ia = nome.indexOf("~"); if(ia >= 0){ alias = nome.slice(ia + 1).split(",").map(s => s.trim()).filter(Boolean); nome = nome.slice(0, ia); }
          nome = nome.replace(/\+([a-z]+)/g, (q, o) => { opz[o] = 1; return ""; });
          const ir = nome.match(/@([\d.]+)-([\d.]+)/); if(ir){ da = +ir[1]; a = +ir[2]; nome = nome.replace(ir[0], ""); }
          nome = nome.trim();
          const lv = { id:"l" + ti + "_" + li, n:nome, ti, li, da, a, opz, livello:true, keys:chiaviDi(nome.split(" · ")[0], alias) };
          const voci2 = String(L[1]).split(";").map(s => s.trim()).filter(Boolean);
          if(voci2[0] === "-"){ lv.vuoto = true; voci2.shift(); }
          lv.st = voci2.map(s => nuovo(leggiLuogo(s), li));
          lv.st.forEach(r => { r.lv = lv; });
          m.livelli.push(lv); m.perId[lv.id] = lv;
          return lv;
        });
      } else {
        String(tv.luo || "").split(";").map(s => s.trim()).filter(Boolean).forEach(s => nuovo(leggiLuogo(s), -1));
        tav.luoghi.forEach((r, i) => { if(r.x == null){ r.x = 15 + (i * 37) % 70; r.y = 15 + (i * 53) % 70; } });
      }
      m.tav.push(tav);
    });
    m.accessi = m.luoghi.filter(r => r.acc);
    m.accessi.forEach((r, i) => { r.an = i + 1; });
    m.inizio = (m.luoghi.find(r => r.inizio) || {}).id || null;
    const fai = keys => { if(!keys.length) return null; const alt = keys.slice().sort((a, b) => b.length - a.length).map(k => /\*$/.test(k) ? k.slice(0, -1) + "[a-z0-9]*" : k).join("|"); return new RegExp("(?:^| )(" + alt + ")(?= |$)", "g"); };
    m.luoghi.forEach(p => { p.re = fai(p.keys); });
    m.livelli.forEach(l => { l.re = fai(l.keys); });
    return m;
  }
  // la planimetria di una storia: quella scritta a mano, oppure una costruita dal genere
  function per(s){
    if(!s) return null;
    const key = s.id + "|" + (s.custom ? s.t + s.city : "");
    if(cache.has(key)) return cache.get(key);
    const M = W.MAPPE || {};
    let raw = M[s.id], generica = false;
    if(!raw && M._genere){ generica = true; const g = M._genere[s.g] || M._genere.drama; raw = g ? (typeof g === "function" ? g(s) : g) : null; if(raw) raw = Object.assign({}, raw, { t:raw.t || s.city || s.t }); }
    const m = raw ? leggi(s.id, raw, { g:s.g, titoloStoria:s.t, generica }) : null;
    cache.set(key, m);
    return m;
  }

  /* ---------- articoli: «vado alla sala macchine», «osservo il teatro» ---------- */
  const NOMI = {
    m:"bar ponte teatro casino ristorante atrio ufficio corridoio magazzino garage portellone eliporto solarium buffet salone giardino cortile porto molo faro castello palazzo municipio comune commissariato tribunale mercato cimitero campanile duomo convento monastero rifugio bosco lago fiume sentiero passo ghiacciaio campo stadio bunker comando deposito laboratorio centro hangar museo caveau negozio forno vicolo belvedere parcheggio binario lungomare pontile cantiere capannone casale podere frantoio mulino pozzo cunicolo sotterraneo retro bancone dehors bagno piano tetto terrazzo balcone seminterrato camerino palco palcoscenico retropalco foyer club locale night prive chiosco lido circolo oratorio santuario tempio foro accampamento guado villaggio paese borgo quartiere rione confine valico traforo tunnel viadotto casello distributore cancello portone ingresso androne pianerottolo sottotetto solaio granaio fienile pollaio recinto ovile nuraghe trabucco trullo silos reattore modulo osservatorio radiotelescopio cratere vulcano canyon torrente argine pioppeto uliveto vigneto limoneto agrumeto frutteto orto prato pascolo alpeggio canale bacino arsenale carcere penitenziario padiglione parlatorio refettorio dormitorio chiostro sagrato coro supermercato cinema set studio spogliatoio stabilimento scalo scoglio stagno hotel albergo ospedale ospizio hospice archivio ascensore aeroporto autogrill ippodromo acquedotto anfiteatro arco altare ambulatorio appartamento attico zuccherificio petrolchimico caffe pub mattatoio macello municipio viale piazzale parco silo relitto fondale promontorio crocevia bivio incrocio posto presidio fortino quadrato ring salotto soggiorno tinello ripostiglio sgabuzzino sottoscala vano locale pollaio cascinale villino condominio grattacielo cavalcavia sottopasso tram capolinea terminal gate varco tornello banco registro",
    f:"sala cabina cucina plancia piscina palestra spa infermeria lavanderia stiva passerella suite biblioteca reception cappella chiesa cattedrale basilica torre piazza via strada stazione caserma questura prefettura banca scuola casa villa cascina masseria fattoria stalla cantina grotta caverna miniera cava spiaggia darsena banchina baia cala caletta scogliera pineta foresta radura valle montagna cima vetta cresta parete baita malga trincea postazione batteria fortezza rocca cittadella porta portineria guardiola cella mensa sagrestia cripta catacomba cisterna galleria botola soffitta mansarda terrazza veranda serra dependance rimessa officina fabbrica raffineria centrale diga discarica palafitta palude laguna salina fermata metropolitana funicolare funivia pista pedana tribuna curva discoteca balera bisca trattoria osteria pizzeria pasticceria panetteria farmacia bottega libreria legatoria redazione tipografia sartoria torretta garitta dogana frontiera locanda taverna foresteria abbazia pieve edicola camera stanza anticamera dispensa ghiacciaia legnaia aia corte loggia navata sacrestia tomba necropoli arena platea gradinata regia roulotte tenda base sonda navetta capsula cupola console isola penisola costa riva sponda foce sorgente fontana cascata gola forra dolina roccia rupe mulattiera scalinata salita discesa rotonda tangenziale autostrada statale provinciale ferrovia zona area periferia borgata contrada piana pianura collina altura duna universita aula hall villetta terra tenuta vigna bisca roulette sede redazione clinica camerata baracca cabinovia seggiovia teleferica ricevitoria tabaccheria merceria gelateria rosticceria friggitoria pescheria macelleria drogheria latteria enoteca birreria vineria lavatoio fonte ansa secca lingua",
    mp:"uffici magazzini giardini sotterranei cunicoli bagni camerini spogliatoi ascensori alloggi archivi binari moli cantieri campi boschi portici vicoli tetti navigli murazzi sassi bastioni scogli stagni ormeggi uliveti agrumeti argini laboratori depositi capannoni box garage dormitori corridoi cortili negozi mercati quartieri padiglioni reparti piani ponti passi rifugi pascoli trulli silos colli monti laghi",
    fp:"cabine cucine scale scialuppe celle stalle cantine grotte mura terme carceri docce saline paludi colline montagne trincee baracche case camere stanze tribune gradinate quinte catacombe cisterne gallerie fogne rovine macerie banchine officine serre vigne risaie dune antenne vele torri stive suite lance camerate retrovie linee postazioni batterie latrine cave miniere"
  };
  const NOMI2 = {
    m:"aereo altopiano approdo avamposto basso bivacco campetto canneto cilindro colle comitato consiglio covo distretto evento feudo fronte gavone guardaroba imbarcadero imbarco imbocco isolamento isolotto latifondo lavoretto lavoro litorale manicomio mare naviglio obiettivo obitorio punto raccordo rogo salottino sasso sbarco scalone senato spazioporto sportello stanzino stazzo stretto tavolino tavolo terrazzino tesoro yacht interno lungarno relitto varco cratere rudere ponteggio capanno gazebo chalet tabacchi sottopassaggio",
    f:"acetaia agenzia antenna autoscuola azienda barca buca canonica capanna colonia consolle direzione erboristeria fascia festa flotta guardia linea mole nave passeggiata piattaforma polizia procura punta radio reggia riviera saletta scala scena tana tradotta trazzera uscita vetrina piazzetta citta meta sede nave tenuta villetta baracca casetta capitaneria merceria macelleria lavanderia pensione metro",
    mp:"arcovoli controlli crateri forti paesi palazzi sportelli studi tornanti lungarni ruderi resti scavi",
    fp:"cassette chiuse gole isole terrazze pajare vasche"
  };
  const SU = /^(strada|autostrada|statale|provinciale|tangenziale|raccordo|trazzera|sentiero|lungomare|lungarno|mulattiera|ferrovia|argine|molo|pontile|banchina|litorale)$/;
  const SENZA_ART = /^(porta|punta|campo|piano|cala|capo|monte|castel|borgo|san|santa|sant)$/;
  const GENERE_NOME = {};
  [NOMI, NOMI2].forEach(D => Object.keys(D).forEach(g => D[g].split(" ").forEach(n => { if(n && !GENERE_NOME[n]) GENERE_NOME[n] = g; })));
  const STRADE = /^(via|viale|piazza|piazzale|corso|vicolo|largo|calle)$/;
  const ART_NOME = { Il:["al ", "il "], Lo:["allo ", "lo "], La:["alla ", "la "], I:["ai ", "i "], Gli:["agli ", "gli "], Le:["alle ", "le "] };
  const CASA_DI = /^Casa (tua|mia|(di|del|della|dei|degli|delle) (nonn[ao] |mamma |pap[aà] |zi[ao] |tu[oa] |su[oa] |[A-ZÀ-Ü]))/;
  // «vado …» e «osservo …» per un luogo: con l'articolo giusto, e la minuscola quando il nome è comune
  function articoli(r){
    const nome = r.n.split(" · ")[0].trim(), parole = nome.split(/\s+/), k = norm(parole[0]);
    const maiu2 = /^[A-ZÀ-Ü]/.test(parole[1] || "");
    const basso = maiu2 ? nome : nome[0].toLowerCase() + nome.slice(1);
    let a, il;
    if(CASA_DI.test(nome + " ")){ a = "a c" + nome.slice(1); il = (/^Casa (tua|mia)/.test(nome) ? "c" : "la c") + nome.slice(1); }
    else if(/^(Camera|Stanza) (tua|mia)$/.test(nome)){ const q = parole[0].toLowerCase(); a = "in " + q + " " + parole[1]; il = "la " + parole[1] + " " + q; }
    else if(SENZA_ART.test(k) && maiu2){ a = "a " + nome; il = nome; }
    else if(ART_NOME[parole[0]] && parole.length > 1){ const resto = parole.slice(1).join(" "); a = ART_NOME[parole[0]][0] + resto; il = ART_NOME[parole[0]][1] + resto; }
    else if(STRADE.test(k) && parole.length > 1 && (maiu2 || /^(di|del|della|dei|degli|delle|dello|dell|d)$/.test(norm(parole[1]).split(" ")[0]))){ a = "in " + nome[0].toLowerCase() + nome.slice(1); il = nome[0].toLowerCase() + nome.slice(1); }
    else {
      const g = GENERE_NOME[k];
      if(!g){ a = (/^[AEIOUÀÈÉÌÒÙH]/.test(nome) && /^(A|E|I|O|U|H)[a-z]/.test(nome) && /^A/.test(nome) ? "ad " : "a ") + nome; il = nome; }
      else {
        const voc = /^[aeiouàèéìòùh]/i.test(basso) && !/^h[^o]/i.test(basso) || /^(hotel|hangar|hall|hospice)/i.test(basso), imp = /^(s[bcdfglmnpqrtv]|z|gn|ps|x|y)/i.test(basso);
        const su = SU.test(k);
        if(g === "m"){ a = (su ? (voc ? "sull'" : imp ? "sullo " : "sul ") : (voc ? "all'" : imp ? "allo " : "al ")) + basso; il = (voc ? "l'" : imp ? "lo " : "il ") + basso; }
        else if(g === "f"){ a = (su ? (voc ? "sull'" : "sulla ") : (voc ? "all'" : "alla ")) + basso; il = (voc ? "l'" : "la ") + basso; }
        else if(g === "mp"){ a = (voc || imp ? "agli " : "ai ") + basso; il = (voc || imp ? "gli " : "i ") + basso; }
        else { a = "alle " + basso; il = "le " + basso; }
      }
    }
    // nella mappa si può scrivere la frase a mano: «>sull'Etna/l'Etna»
    if(r.verso){ const q = r.verso.split("/"); a = q[0].trim() || a; if(q[1]) il = q[1].trim(); }
    return { a, il };
  }

  /* ---------- arredi: quello che si vede dentro le stanze ---------- */
  const A = ' class="a"';
  const ARR = {
    letto(x, y, w, h, R, lato){
      const n = Math.max(1, Math.round(w / 30)), cw = w / n; let e = "";
      for(let i = 0; i < n; i++){ const cx = x + i * cw, bw = Math.min(cw - 8, 15), bh = Math.min(h * .42, 20), by = lato === "b" ? y + h - bh - 4 : y + 4; if(i) e += L_(cx, y, cx, y + h, A); e += R_(cx + (cw - bw) / 2, by, bw, bh, ' rx="2"' + A) + L_(cx + (cw - bw) / 2, by + (lato === "b" ? bh - 5 : 5), cx + (cw + bw) / 2, by + (lato === "b" ? bh - 5 : 5), A); }
      return e;
    },
    posate(x, y, w, h){
      let e = "", riga = 0;
      for(let yy = y + 13; yy < y + h - 8; yy += 21, riga++) for(let xx = x + 13 + (riga % 2 ? 11 : 0); xx < x + w - 9; xx += 23) e += C_(xx, yy, 5, A) + C_(xx - 7.5, yy, 1.3, ' class="ap"') + C_(xx + 7.5, yy, 1.3, ' class="ap"');
      return e;
    },
    bar(x, y, w, h, R, lato){
      const yb = lato === "b" ? y + h - 15 : y + 15, s = lato === "b" ? -1 : 1, x2 = x + Math.min(w - 12, Math.max(34, w * .6));
      let e = P_(`M${f(x + 8)} ${f(yb)}H${f(x2)}V${f(yb - s * 9)}`, A) + P_(`M${f(x + 8)} ${f(yb - s * 5)}H${f(x2 - 5)}`, A);
      for(let xx = x + 14; xx < x2 - 3; xx += 9) e += C_(xx, yb + s * 6, 2, A);
      for(let xx = x + 16; xx < x + w - 10; xx += 24) e += C_(xx, lato === "b" ? y + 13 : y + h - 13, 4.5, A);
      return e;
    },
    pentola(x, y, w, h){
      let e = R_(x + 5, y + 5, w - 10, h - 10, A) + R_(x + 10, y + 10, w - 20, h - 20, A);
      const cx = x + w / 2, cy = y + h / 2; e += R_(cx - 12, cy - 7, 24, 14, A);
      [[-6, -3], [6, -3], [-6, 3], [6, 3]].forEach(([a, b]) => { e += C_(cx + a, cy + b, 2.2, A); });
      return e;
    },
    teatro(x, y, w, h){
      const pw = Math.max(16, w * .2), px = x + w - pw - 5; let e = R_(px, y + 8, pw, h - 16, A) + L_(px + 4, y + 8, px + 4, y + h - 8, A);
      for(let xx = px - 10; xx > x + 8; xx -= 8) e += L_(xx, y + 9 + (px - xx) * .05, xx, y + h - 9 - (px - xx) * .05, ' class="a" stroke-dasharray="4 2.4"');
      return e;
    },
    dadi(x, y, w, h, R){
      let e = "";
      const n = Math.max(1, Math.floor(w / 46));
      for(let i = 0; i < n; i++){ const cx = x + (i + .5) * w / n, cy = y + h * (i % 2 ? .62 : .4); e += R_(cx - 15, cy - 7, 30, 14, ' rx="7"' + A) + C_(cx - 8, cy, 4, A) + L_(cx - 2, cy - 4, cx + 11, cy - 4, A) + L_(cx - 2, cy, cx + 11, cy, A) + L_(cx - 2, cy + 4, cx + 11, cy + 4, A); }
      for(let i = 0; i < n + 1; i++) e += P_(`M${f(x + 12 + i * (w - 24) / Math.max(1, n))} ${f(y + h - 7)}a7 7 0 0 1 14 0`, A);
      return e;
    },
    piscina(x, y, w, h){
      const px = x + w * .16, py = y + h * .22, pw = w * .68, ph = h * .56; let e = R_(px, py, pw, ph, ` rx="${f(Math.min(ph / 2, 16))}" class="wa"`) + R_(px, py, pw, ph, ` rx="${f(Math.min(ph / 2, 16))}"` + A);
      for(let i = 1; i <= 2; i++){ const yy = py + ph * i / 3; let d = `M${f(px + 8)} ${f(yy)}`; for(let xx = px + 8; xx < px + pw - 12; xx += 12) d += `q3 -3 6 0t6 0`; e += P_(d, A); }
      for(let xx = x + 8; xx < x + w - 14; xx += 13) e += R_(xx, y + 5, 9, 4.5, ' rx="1.5"' + A);
      return e;
    },
    motore(x, y, w, h){
      let e = "";
      [.3, .7].forEach(q => { const cy = y + h * q, mw = w * .62, mx = x + (w - mw) / 2, mh = Math.min(h * .26, 22); e += R_(mx, cy - mh / 2, mw, mh, ' rx="4"' + A); for(let i = 0; i < 5; i++) e += C_(mx + mw * (i + .5) / 5, cy, mh * .26, A); });
      e += L_(x + 6, y + h / 2, x + w - 6, y + h / 2, ' class="a" stroke-dasharray="3 3"') + C_(x + 12, y + h / 2, 4, A) + C_(x + w - 12, y + h / 2, 4, A);
      return e;
    },
    cassa(x, y, w, h, R){
      let e = "";
      for(let yy = y + 6; yy < y + h - 14; yy += 14) for(let xx = x + 6; xx < x + w - 14; xx += 14){ if(R() < .68){ e += R_(xx, yy, 11, 11, A); if(R() < .6) e += P_(`M${f(xx)} ${f(yy)}l11 11M${f(xx + 11)} ${f(yy)}l-11 11`, A); } }
      return e;
    },
    croce(x, y, w, h, R, lato){
      let e = ""; const n = Math.max(1, Math.floor((w - 10) / 22));
      for(let i = 0; i < n; i++){ const bx = x + 7 + i * 22, by = lato === "b" ? y + h - 26 : y + 6; e += R_(bx, by, 12, 20, ' rx="2"' + A) + L_(bx, by + 5, bx + 12, by + 5, A); }
      return e;
    },
    cartella(x, y, w, h){
      const cx = x + w / 2, cy = y + h / 2; return R_(cx - 14, cy - 5, 28, 11, A) + C_(cx, cy + 12, 3.4, A) + R_(x + 5, y + 5, Math.min(w - 10, 22), 6, A) + R_(x + w - 12, y + 14, 7, Math.max(8, h - 28), A);
    },
    sbarre(x, y, w, h, R, lato){
      const n = Math.max(1, Math.round(w / 26)), cw = w / n; let e = "";
      for(let i = 0; i < n; i++){ const cx = x + i * cw; if(i) e += L_(cx, y, cx, y + h, A); e += R_(cx + 4, lato === "b" ? y + h - 15 : y + 4, cw - 8, 10, A); const yy = lato === "b" ? y : y + h; for(let q = 3; q < cw - 2; q += 3.5) e += L_(cx + q, yy - 3.5, cx + q, yy + 3.5, A); }
      return e;
    },
    timone(x, y, w, h){
      const cx = x + w * .46, cy = y + h / 2, r = Math.min(w * .42, h * .42);
      return P_(`M${f(cx)} ${f(cy - r)}A${f(r)} ${f(r)} 0 0 1 ${f(cx)} ${f(cy + r)}`, A) + P_(`M${f(cx - 5)} ${f(cy - r * .8)}A${f(r * .8)} ${f(r * .8)} 0 0 1 ${f(cx - 5)} ${f(cy + r * .8)}`, A) + C_(cx - r * .2, cy - 9, 3, A) + C_(cx - r * .2, cy + 9, 3, A) + R_(x + 6, cy - 6, 12, 12, A);
    },
    scala(x, y, w, h){
      let e = ""; const n = Math.max(3, Math.floor(h / 6));
      for(let i = 1; i < n; i++) e += L_(x + 4, y + h * i / n, x + w * .5 - 1, y + h * i / n, A);
      e += L_(x + w * .5, y + 4, x + w * .5, y + h - 4, A) + R_(x + w * .5 + 3, y + h * .2, Math.max(4, w * .5 - 7), h * .6, A) + P_(`M${f(x + w * .5 + 3)} ${f(y + h * .2)}l${f(Math.max(4, w * .5 - 7))} ${f(h * .6)}M${f(x + w - 4)} ${f(y + h * .2)}l${f(-Math.max(4, w * .5 - 7))} ${f(h * .6)}`, A);
      return e;
    },
    auto(x, y, w, h){
      let e = "";
      for(let xx = x + 6; xx < x + w - 16; xx += 19){ e += L_(xx - 3, y + 5, xx - 3, y + h - 5, ' class="a" stroke-dasharray="3 3"'); e += R_(xx, y + h * .2, 13, Math.min(26, h * .6), ' rx="4"' + A); }
      return e;
    },
    chiesa(x, y, w, h){
      let e = R_(x + w - 16, y + h / 2 - 8, 9, 16, A) + L_(x + w - 22, y + 8, x + w - 22, y + h - 8, A);
      for(let xx = x + 10; xx < x + w - 30; xx += 8){ e += L_(xx, y + 8, xx, y + h / 2 - 5, A) + L_(xx, y + h / 2 + 5, xx, y + h - 8, A); }
      return e;
    },
    libro(x, y, w, h){
      let e = "";
      for(let xx = x + 8; xx < x + w - 10; xx += 11) e += R_(xx, y + 7, 5, h - 14, A);
      return e;
    },
    provetta(x, y, w, h){
      let e = "";
      for(let yy = y + 8; yy < y + h - 12; yy += 20){ e += R_(x + 7, yy, w - 14, 8, A); for(let xx = x + 12; xx < x + w - 12; xx += 12) e += C_(xx, yy + 4, 2, A); }
      return e;
    },
    computer(x, y, w, h){
      let e = "";
      for(let yy = y + 8; yy < y + h - 10; yy += 14) for(let xx = x + 7; xx < x + w - 12; xx += 12) e += R_(xx, yy, 8, 6, A);
      return e;
    },
    microfono(x, y, w, h){
      const pw = Math.max(14, w * .24); let e = R_(x + 5, y + 7, pw, h - 14, A) + C_(x + 5 + pw / 2, y + h / 2, 3.5, A) + R_(x + 7, y + 9, 5, 5, ' class="ap"') + R_(x + 7, y + h - 14, 5, 5, ' class="ap"');
      for(let xx = x + pw + 14; xx < x + w - 8; xx += 9) e += L_(xx, y + 8, xx, y + h - 8, ' class="a" stroke-dasharray="4 2.4"');
      return e;
    },
    musica(x, y, w, h){
      let e = R_(x + w * .2, y + h * .22, w * .6, h * .56, A);
      for(let i = 1; i < 5; i++) e += L_(x + w * .2 + w * .6 * i / 5, y + h * .22, x + w * .2 + w * .6 * i / 5, y + h * .78, A);
      for(let i = 1; i < 3; i++) e += L_(x + w * .2, y + h * .22 + h * .56 * i / 3, x + w * .8, y + h * .22 + h * .56 * i / 3, A);
      return e + R_(x + 6, y + 6, 8, 8, ' class="ap"') + R_(x + w - 14, y + 6, 8, 8, ' class="ap"') + R_(x + 6, y + h - 14, w * .1, 8, A);
    },
    pallone(x, y, w, h){
      const px = x + 8, py = y + 7, pw = w - 16, ph = h - 14;
      return R_(px, py, pw, ph, A) + L_(px + pw / 2, py, px + pw / 2, py + ph, A) + C_(px + pw / 2, py + ph / 2, Math.min(ph * .2, 11), A) + R_(px, py + ph * .25, pw * .13, ph * .5, A) + R_(px + pw * .87, py + ph * .25, pw * .13, ph * .5, A);
    },
    spa(x, y, w, h){
      let e = "";
      for(let xx = x + 14; xx < x + w - 10; xx += 24) e += C_(xx, y + h * .36, 7, A) + C_(xx, y + h * .36, 4, ' class="wa"');
      return e + R_(x + 7, y + h - 13, w - 14, 5, A);
    },
    palestra(x, y, w, h){
      let e = "";
      for(let xx = x + 8; xx < x + w - 16; xx += 20) e += R_(xx, y + 7, 12, 20, ' rx="2"' + A) + L_(xx + 1, y + h - 10, xx + 13, y + h - 10, A) + R_(xx - 1, y + h - 13, 3, 6, ' class="ap"') + R_(xx + 12, y + h - 13, 3, 6, ' class="ap"');
      return e;
    },
    negozio(x, y, w, h, R, lato){
      let e = R_(x + 5, lato === "b" ? y + 5 : y + h - 11, w - 10, 6, A);
      for(let xx = x + 8; xx < x + w - 12; xx += 15) e += R_(xx, lato === "b" ? y + h - 22 : y + 6, 9, 16, A);
      return e;
    },
    eli(x, y, w, h){
      const r = Math.min(w, h) * .36, cx = x + w / 2, cy = y + h / 2;
      return C_(cx, cy, r, A) + C_(cx, cy, r * .78, ' class="a" stroke-dasharray="3 3"') + P_(`M${f(cx - r * .3)} ${f(cy - r * .4)}v${f(r * .8)}M${f(cx + r * .3)} ${f(cy - r * .4)}v${f(r * .8)}M${f(cx - r * .3)} ${f(cy)}h${f(r * .6)}`, ' class="a" stroke-width="1.8"');
    },
    bagno(x, y, w, h){
      let e = "";
      for(let xx = x + 5; xx < x + w - 10; xx += 11) e += R_(xx, y + 5, 9, 12, A) + C_(xx + 4.5, y + 11, 2, A);
      return e;
    },
    quadro(x, y, w, h){
      let e = "";
      for(let xx = x + 8; xx < x + w - 12; xx += 16) e += R_(xx, y + 3, 9, 2.6, ' class="ap"') + R_(xx, y + h - 5.6, 9, 2.6, ' class="ap"');
      return e + R_(x + w / 2 - 12, y + h / 2 - 4, 24, 8, ' rx="3"' + A);
    },
    vino(x, y, w, h){
      let e = "";
      for(let xx = x + 11; xx < x + w - 8; xx += 14) e += C_(xx, y + 11, 5.5, A) + L_(xx - 5.5, y + 11, xx + 5.5, y + 11, A) + C_(xx, y + h - 11, 5.5, A) + L_(xx - 5.5, y + h - 11, xx + 5.5, y + h - 11, A);
      return e;
    },
    cassaforte(x, y, w, h){
      let e = C_(x + w - 16, y + h / 2, 9, A) + C_(x + w - 16, y + h / 2, 3, A);
      for(let yy = y + 6; yy < y + h - 10; yy += 9) for(let xx = x + 6; xx < x + w - 34; xx += 11) e += R_(xx, yy, 8, 6, A);
      return e;
    },
    stalla(x, y, w, h){
      let e = "";
      for(let xx = x + 16; xx < x + w - 6; xx += 16) e += L_(xx, y, xx, y + h * .55, A);
      return e + L_(x + 4, y + h * .7, x + w - 4, y + h * .7, ' class="a" stroke-dasharray="2 3"');
    },
    ancora(x, y, w, h){
      const cx = x + w * .45, cy = y + h / 2;
      return C_(cx, cy, 6, A) + P_(`M${f(cx - 6)} ${f(cy)}h12M${f(cx)} ${f(cy - 6)}v12`, A) + C_(x + 9, y + 9, 2.4, A) + C_(x + 9, y + h - 9, 2.4, A) + P_(`M${f(x + 9)} ${f(y + 9)}Q${f(cx)} ${f(cy - 14)} ${f(cx)} ${f(cy - 6)}M${f(x + 9)} ${f(y + h - 9)}Q${f(cx)} ${f(cy + 14)} ${f(cx)} ${f(cy + 6)}`, A);
    },
    pane(x, y, w, h){
      return P_(`M${f(x + 6)} ${f(y + 18)}a10 10 0 0 1 20 0z`, A) + R_(x + 6, y + 18, 20, 4, A) + R_(x + w / 2 - 4, y + h / 2, Math.max(10, w * .4), 9, A);
    },
    fabbrica(x, y, w, h){
      let e = "";
      for(let xx = x + 8; xx < x + w - 18; xx += 26) e += R_(xx, y + 8, 18, h - 16, A) + C_(xx + 9, y + 16, 4, A);
      return e;
    }
  };
  ARR.tazza = ARR.bar; ARR.vino2 = ARR.vino; ARR.soldi = ARR.cassaforte; ARR.tesoro = ARR.cassa; ARR.gru = ARR.cassa; ARR.cinepresa = ARR.microfono; ARR.pesce = ARR.negozio; ARR.uva = ARR.vino; ARR.ascensore = ARR.scala;

  /* ---------- pianta: livelli con stanze ai due lati di un corridoio ---------- */
  const scafo = (x, y, w, h) => { const r = h * .3, xb = x + w - h * 1.2; return `M${f(x + r)} ${f(y)}L${f(xb)} ${f(y)}C${f(xb + h * .6)} ${f(y)} ${f(x + w - h * .1)} ${f(y + h * .22)} ${f(x + w)} ${f(y + h / 2)}C${f(x + w - h * .1)} ${f(y + h * .78)} ${f(xb + h * .6)} ${f(y + h)} ${f(xb)} ${f(y + h)}L${f(x + r)} ${f(y + h)}Q${f(x)} ${f(y + h)} ${f(x)} ${f(y + h - r)}L${f(x)} ${f(y + r)}Q${f(x)} ${f(y)} ${f(x + r)} ${f(y)}Z`; };
  const tondoR = (x, y, w, h, r) => `M${f(x + r)} ${f(y)}H${f(x + w - r)}Q${f(x + w)} ${f(y)} ${f(x + w)} ${f(y + r)}V${f(y + h - r)}Q${f(x + w)} ${f(y + h)} ${f(x + w - r)} ${f(y + h)}H${f(x + r)}Q${f(x)} ${f(y + h)} ${f(x)} ${f(y + h - r)}V${f(y + r)}Q${f(x)} ${f(y)} ${f(x + r)} ${f(y)}Z`;
  const ovale = (x, y, w, h) => `M${f(x)} ${f(y + h / 2)}a${f(w / 2)} ${f(h / 2)} 0 1 0 ${f(w)} 0a${f(w / 2)} ${f(h / 2)} 0 1 0 ${f(-w)} 0Z`;
  function livello(m, tav, lv, X, Y, Wd, H, P, o, pos){
    const forma = tav.f || "rett", R = rng(hash(m.id + lv.id));
    const ridotto = lv.da > 0 || lv.a < 1;
    const x0 = X + Wd * lv.da, w = Wd * (lv.a - lv.da);
    const yr = forma === "nave" && ridotto ? Y + H * .07 : Y, hr = forma === "nave" && ridotto ? H * .86 : H;
    const tutto = forma === "nave" ? scafo(X, Y, Wd, H) : "";
    const sag = forma === "nave" ? (ridotto ? tondoR(x0, yr, w, hr, hr * .26) : tutto) : forma === "tondo" ? ovale(x0, yr, w, hr) : tondoR(x0, yr, w, hr, 3);
    const cid = o.uid + lv.id;
    // segmenti: una stanza a tutta altezza, oppure due file con il corridoio in mezzo
    const segs = []; let cur = null;
    lv.st.forEach(r => {
      if(r.full){ segs.push({ full:true, r, w:r.w }); cur = null; return; }
      if(!cur){ cur = { top:[], bot:[], wt:0, wb:0 }; segs.push(cur); }
      const lato = r.lato || (cur.wt <= cur.wb ? "a" : "b");
      if(lato === "a"){ cur.top.push(r); cur.wt += r.w; } else { cur.bot.push(r); cur.wb += r.w; }
    });
    segs.forEach(s => { if(!s.full) s.w = Math.max(s.wt, s.wb, .6); });
    const tot = segs.reduce((n, s) => n + s.w, 0) || 1;
    const hc = clamp(hr * .15, 11, 20), yc = yr + (hr - hc) / 2;
    let e1 = "", e2 = "", e3 = "", e4 = "", e5 = "", e6 = "";
    const stanza = (r, x, y, ww, hh, lato, estremo) => {
      const cx = x + ww / 2, cy = y + hh / 2;
      // lo spazio buono per la scritta: nelle punte di scafi e ovali si stringe
      let tx = x + 4, tw = ww - 8, ty = y + 4, th = hh - 8;
      if(estremo && forma === "nave" && !ridotto && estremo === "dx"){ tw = ww * .66; ty = y + hh * .2; th = hh * .6; }
      if(estremo && forma === "tondo"){ tw = ww * .7; if(estremo === "sx") tx = x + ww * .26; ty = y + hh * .22; th = hh * .56; }
      // dove sei tu, la scritta lascia una colonna libera per il segnaposto «TU»
      if(o.tu === r.id && tw >= 78 && !(estremo && forma !== "rett")){ tx += 22; tw -= 22; }
      pos[r.id] = { x, y, w:ww, h:hh, cx:tx + tw / 2, cy, lato, tw, li:lv.li, est:estremo && forma !== "rett" ? estremo : "" };
      e1 += R_(x, y, ww, hh, ` class="${r.chiuso ? "f fc" : "f"}"`);
      if(r.chiuso) e1 += R_(x, y, ww, hh, ` fill="url(#${o.uid}h)"`);
      const arr = ARR[r.ic];
      if(arr && ww > 26 && hh > 24 && !o.spoglio) e1 += `<g class="arr">${arr(x + 1, y + 1, ww - 2, hh - 2, R, lato === "b" ? "b" : "a")}</g>`;
      e2 += R_(x, y, ww, hh, ' class="w"');
      // la porta sul corridoio
      if(lato === "a" || lato === "b"){
        const dx = clamp(cx + (R() - .5) * ww * .3, x + 9, x + ww - 9), dy = lato === "a" ? y + hh : y, s = lato === "a" ? -1 : 1;
        e3 += L_(dx - 5.5, dy, dx + 5.5, dy, ' class="dr"') + P_(`M${f(dx - 5.5)} ${f(dy)}v${f(s * 10)}a10 10 0 0 ${s > 0 ? 0 : 1} ${f(10)} ${f(-s * 10)}`, ' class="a"');
      } else {
        if(estremo !== "sx") e3 += L_(x, cy - 6, x, cy + 6, ' class="dr"');
        if(estremo !== "dx") e3 += L_(x + ww, cy - 6, x + ww, cy + 6, ' class="dr"');
      }
      // finestre sui muri esterni degli edifici
      if(forma === "rett" && lato !== "x" && ww > 40){ const wy = lato === "a" ? y : y + hh; for(let q = 0; q < Math.floor(ww / 46); q++){ const wx = x + 14 + q * 46 + R() * 8; e6 += R_(wx, wy - 2.6, 16, 5.2, ' class="wn"') + L_(wx, wy, wx + 16, wy, ' class="a"'); } }
      // scritta, icona, numero
      const SZ = H >= 170 ? [20, 18, 17, 16, 15, 14, 13, 12, 11, 10] : null;
      const conIcona = adatta(r.n, tw, th - 21, P, SZ);
      let et = "";
      if(conIcona && th >= 44){ const tt = 19 + conIcona.righe.length * conIcona.lh, y0 = ty + (th - tt) / 2; et = icona(r.ic, tx + tw / 2, y0 + 8.5, 17) + testo(conIcona, tx + tw / 2, y0 + 20); }
      else { const solo = adatta(r.n, tw, th, P, SZ) || (corto(r.n) ? adatta(corto(r.n), tw, th, P, SZ) : null); if(solo){ et = testo(solo, tx + tw / 2, ty + (th - solo.righe.length * solo.lh) / 2); } else { et = icona(r.ic, tx + tw / 2, cy, Math.min(17, tw, th)); pos[r.id].muto = true; } }
      e5 += `<g class="lb" data-l="${r.id}">${et}</g>` + T_(x + 3.5, y + 9.5, r.num, ' class="nm"');
      if(r.chiuso) e5 += icona("chiave", x + ww - 9, y + 9, 10, "ic it");
      // via di entrata: una freccia sul muro esterno
      if(r.acc){
        let ax = cx, ay = lato === "b" ? y + hh : y, dx = 0, dy = lato === "b" ? -1 : 1;
        if(forma === "tondo" && estremo){ ax = estremo === "sx" ? x0 : x0 + w; ay = cy; dx = estremo === "sx" ? 1 : -1; dy = 0; }
        else if(lato === "x" && estremo === "sx"){ ax = x; ay = cy; dx = 1; dy = 0; }
        else if(lato === "x" && estremo === "dx" && forma === "rett"){ ax = x + ww; ay = cy; dx = -1; dy = 0; }
        else if(forma === "nave" && !ridotto) ay = lato === "b" ? Y + H : Y;
        pos[r.id].acc = { x:ax, y:ay, dx, dy };
      }
      e4 += R_(x, y, ww, hh, ` class="hit" data-p="${r.id}"`);
    };
    let x = x0;
    segs.forEach((s, si) => {
      const sw = w * s.w / tot, estremo = si === 0 ? "sx" : si === segs.length - 1 ? "dx" : "";
      if(s.full) stanza(s.r, x, yr, sw, hr, "x", estremo);
      else {
        const soloT = !s.bot.length, soloB = !s.top.length;
        const ya = soloB ? yr : yr, ha = soloB ? 0 : soloT ? hr - hc * 1.7 : yc - yr;
        const yb = soloT ? yr + hr : soloB ? yr + hc * 1.7 : yc + hc, hb = soloT ? 0 : yr + hr - yb;
        e1 += R_(x, yr + ha, sw, hr - ha - hb, ' class="co"');
        e2 += L_(x + 3, yr + ha + (hr - ha - hb) / 2, x + sw - 3, yr + ha + (hr - ha - hb) / 2, ' class="a" stroke-dasharray="1.5 5"');
        const fila = (rr, tot2, yy, hh, lato) => { let xx = x; rr.forEach((r, i) => { const ww = sw * r.w / tot2; stanza(r, xx, yy, ww, hh, lato, estremo && ((estremo === "sx" && i === 0) || (estremo === "dx" && i === rr.length - 1)) ? estremo : ""); xx += ww; }); };
        if(!soloB) fila(s.top, s.wt, ya, ha, "a");
        if(!soloT) fila(s.bot, s.wb, yb, hb, "b");
      }
      x += sw;
    });
    let e = "";
    if(forma === "nave" && ridotto) e += P_(tutto, ' class="wt"');
    if(forma === "nave" && lv.opz.scialuppe){ for(let xx = X + Wd * .16; xx < X + Wd * .74; xx += 34) e += R_(xx, Y - 7, 20, 5, ' rx="2.5" class="a"') + R_(xx, Y + H + 2, 20, 5, ' rx="2.5" class="a"'); }
    e += `<clipPath id="${cid}">${P_(sag)}</clipPath><g clip-path="url(#${cid})">${e1}${e2}${e3}</g>` + P_(sag, ' class="wo"') + e6 + e5 + `<g clip-path="url(#${cid})">${e4}</g>`;
    return e;
  }
  // pianta a ottagono (Castel del Monte): il cortile al centro, otto sale intorno, otto torri agli angoli
  function livelloOtto(m, lv, cx, cy, Rr, P, o, pos){
    const ang = k => (-112.5 + k * 45) * Math.PI / 180, V = (r, k) => [cx + Math.cos(ang(k)) * r, cy + Math.sin(ang(k)) * r];
    const r1 = Rr * .4, pt = q => f(q[0]) + " " + f(q[1]);
    const poli = (r) => "M" + [0, 1, 2, 3, 4, 5, 6, 7].map(k => pt(V(r, k))).join("L") + "Z";
    let e1 = "", e2 = "", e5 = "", e4 = "";
    const centro = lv.vuoto ? null : lv.st[0], sale = lv.vuoto ? lv.st.slice(0, 8) : lv.st.slice(1, 9);
    e1 += P_(poli(Rr), ' class="f"');
    if(centro){
      const d = poli(r1);
      e1 += P_(d, ' class="co"');
      pos[centro.id] = { x:cx - r1 * .8, y:cy - r1 * .8, w:r1 * 1.6, h:r1 * 1.6, cx, cy, d, lato:"x", pin:[cx - r1 * .34, cy + r1 * .66], ped:[cx + r1 * .3, cy + r1 * .66] };
      const A2 = adatta(centro.n, r1 * 1.5, r1 * 1.1, P, [14, 13, 12, 11, 10]);
      e5 += `<g class="lb" data-l="${centro.id}">` + (A2 ? icona(centro.ic, cx, cy - A2.righe.length * A2.lh / 2 - 9, 15) + testo(A2, cx, cy - A2.righe.length * A2.lh / 2 + 2) : icona(centro.ic, cx, cy, 16)) + "</g>";
      e4 += P_(d, ` class="hit" data-p="${centro.id}"`);
    } else e1 += P_(poli(r1), ' class="vd"');
    sale.forEach((r, k) => {
      const a = V(Rr, k), b = V(Rr, k + 1), c = V(r1, k + 1), dd = V(r1, k), d = `M${pt(a)}L${pt(b)}L${pt(c)}L${pt(dd)}Z`;
      const mx = (a[0] + b[0] + c[0] + dd[0]) / 4, my = (a[1] + b[1] + c[1] + dd[1]) / 4, orizz = k === 0 || k === 4, vert = k === 2 || k === 6;
      const bw = orizz ? Rr * .62 : vert ? Rr * .5 : Rr * .5, bh = orizz ? Rr * .46 : vert ? Rr * .6 : Rr * .42;
      const pm0 = [(c[0] + dd[0]) / 2, (c[1] + dd[1]) / 2], tg = [(c[0] - dd[0]) / Math.hypot(c[0] - dd[0], c[1] - dd[1]), (c[1] - dd[1]) / Math.hypot(c[0] - dd[0], c[1] - dd[1])];
      pos[r.id] = { x:mx - bw / 2, y:my - bh / 2, w:bw, h:bh, cx:mx, cy:my, d, lato:"x", pin:[pm0[0] - tg[0] * 9, pm0[1] - tg[1] * 9], ped:[pm0[0] + tg[0] * 9, pm0[1] + tg[1] * 9], pedv:tg };
      if(r.chiuso) e1 += P_(d, ` fill="url(#${o.uid}h)"`);
      e2 += P_(d, ' class="w"');
      // la porta verso il cortile
      const pm = [(c[0] + dd[0]) / 2, (c[1] + dd[1]) / 2], ux = (c[0] - dd[0]) / Math.hypot(c[0] - dd[0], c[1] - dd[1]), uy = (c[1] - dd[1]) / Math.hypot(c[0] - dd[0], c[1] - dd[1]);
      e2 += L_(pm[0] - ux * 5, pm[1] - uy * 5, pm[0] + ux * 5, pm[1] + uy * 5, ' class="dr"');
      let A2 = adatta(r.n, bw - 4, bh - 4, P, [13, 12, 11]);
      // le stanze in diagonale sono larghe al centro: una riga sola può essere più lunga
      if(!orizz && !vert && (!A2 || A2.righe.length > 1)){ const cn = corto(r.n), U = adatta(r.n, Rr * .6 - 4, 15, P, [13, 12, 11]) || (cn ? adatta(cn, Rr * .6 - 4, 15, P, [13, 12, 11, 10]) : null); if(U && (!A2 || A2.righe.length > 2 || U.fs >= A2.fs)) A2 = U; }
      if(!A2 || A2.righe.length > 2){ const cn = corto(r.n), B = cn ? adatta(cn, bw - 4, bh - 4, P, [13, 12, 11, 10]) : null; A2 = B || A2 || adatta(r.n, bw - 4, bh - 4, P, [10, 9.5]); }
      // la scritta sta un po' verso il muro esterno, dove la stanza è più larga
      const ox = (mx - cx) * .07, oy = (my - cy) * .07;
      e5 += `<g class="lb" data-l="${r.id}">` + (A2 ? testo(A2, mx + ox, my + oy - A2.righe.length * A2.lh / 2) : icona(r.ic, mx + ox, my + oy, 15)) + "</g>";
      if(!A2) pos[r.id].muto = true;
      if(r.acc){ const ex = (a[0] + b[0]) / 2, ey = (a[1] + b[1]) / 2, l = Math.hypot(cx - ex, cy - ey); pos[r.id].acc = { x:ex, y:ey, dx:(cx - ex) / l, dy:(cy - ey) / l }; }
      e4 += P_(d, ` class="hit" data-p="${r.id}"`);
    });
    let torri = "";
    for(let k = 0; k < 8; k++){ const t = V(Rr * 1.04, k), tr = Rr * .15; torri += P_("M" + [0, 1, 2, 3, 4, 5, 6, 7].map(q => f(t[0] + Math.cos(ang(q)) * tr) + " " + f(t[1] + Math.sin(ang(q)) * tr)).join("L") + "Z", ' class="tw"'); }
    return e1 + e2 + P_(poli(Rr), ' class="wo"') + torri + e5 + e4;
  }
  function disegnaPianta(m, tav, P, o){
    if(tav.f === "otto"){
      const pos = {}, D = 236, R2 = D / 2 - 14;
      let corpo = "", y = 54;
      const L = tav.liv.filter((lv, li) => !o.livelli || o.livelli.includes(li));
      L.forEach((lv, i) => {
        const col = L.length === 1 ? .5 : i % 2 ? .75 : .25, cx = 600 * col, cy = y + 30 + D / 2;
        corpo += `<g class="lv${(o.evid || []).includes(lv.id) ? " lve" : ""}" data-p="${lv.id}">` + T_(cx, y + 12, P.maius ? lv.n.toUpperCase() : lv.n, ' class="tl" text-anchor="middle"') + "</g>" + livelloOtto(m, lv, cx, cy, R2, P, o, pos);
        pos[lv.id] = { x:cx - R2, y:cy - R2, w:R2 * 2, h:R2 * 2, cx, cy, livello:true };
        if(i % 2 || i === L.length - 1) y += D + 34;
      });
      return { corpo, h:y + 8, pos };
    }
    const X = 22, Wd = 556, nL = o.livelli ? o.livelli.length : tav.liv.length;
    const H = tav.h || (nL === 1 ? 250 : nL === 2 ? 178 : nL === 3 ? 138 : 116);
    let y = 54, corpo = "";
    const pos = {};
    tav.liv.forEach((lv, li) => {
      if(o.livelli && !o.livelli.includes(li)) return;
      const nome = P.maius ? lv.n.toUpperCase() : lv.n;
      corpo += `<g class="lv${(o.evid || []).includes(lv.id) ? " lve" : ""}" data-p="${lv.id}">` + R_(X, y, 4, 13, ' class="lq"') + T_(X + 10, y + 11.5, nome, ' class="tl"') + (lv.opz.sub ? T_(X + Wd, y + 11.5, "≈ sotto il livello del mare", ' class="ts" text-anchor="end"') : "") + "</g>";
      corpo += livello(m, tav, lv, X, y + 22, Wd, H, P, o, pos);
      pos[lv.id] = { x:X, y:y + 22, w:Wd, h:H, cx:X + Wd / 2, cy:y + 22 + H / 2, livello:true, tr:X + 10 + larg(nome, 13.5, P) + nome.length * 13.5 * (.13 - (P.ls || 0)) };
      y += 22 + H + (tav.f === "nave" ? 20 : 16) + (o.accessi && tav.f !== "nave" && lv.st.some(r => r.acc) ? 13 : 0);
    });
    return { corpo, h:y + 14, pos };
  }

  /* ---------- mappa: luoghi su un territorio ---------- */
  const liscia = (pts, chiusa) => {
    if(pts.length < 3) return "M" + pts.map(p => f(p[0]) + " " + f(p[1])).join("L");
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    let d;
    if(chiusa){ const n = pts.length, m0 = mid(pts[n - 1], pts[0]); d = `M${f(m0[0])} ${f(m0[1])}`; for(let i = 0; i < n; i++){ const mm = mid(pts[i], pts[(i + 1) % n]); d += `Q${f(pts[i][0])} ${f(pts[i][1])} ${f(mm[0])} ${f(mm[1])}`; } return d + "Z"; }
    d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for(let i = 1; i < pts.length - 1; i++){ const mm = mid(pts[i], pts[i + 1]); d += `Q${f(pts[i][0])} ${f(pts[i][1])} ${f(mm[0])} ${f(mm[1])}`; }
    return d + `L${f(pts[pts.length - 1][0])} ${f(pts[pts.length - 1][1])}`;
  };
  const macchia = (cx, cy, rx, ry, R, n, irr) => { const pts = []; n = n || 11; for(let i = 0; i < n; i++){ const a = i / n * Math.PI * 2, k = 1 + (R() - .5) * (irr == null ? .34 : irr); pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); } return liscia(pts, true); };
  // l'Italia a grandi linee (longitudine, latitudine), per le storie che viaggiano
  const ITALIA = {
    terra:[[7.5,43.8],[8.2,44.0],[8.9,44.42],[9.8,44.05],[10.3,43.5],[10.5,42.95],[11.1,42.4],[11.8,42.05],[12.25,41.72],[12.6,41.45],[13.1,41.25],[13.6,41.25],[14.05,40.82],[14.3,40.83],[14.45,40.62],[14.8,40.65],[15.0,40.2],[15.6,40.05],[15.85,39.5],[16.05,39.0],[16.2,38.8],[15.85,38.65],[15.65,38.15],[15.7,37.93],[16.1,37.93],[16.55,38.35],[16.6,38.8],[17.15,38.95],[17.1,39.4],[16.55,39.7],[16.65,40.1],[16.95,40.45],[17.25,40.45],[17.9,40.25],[18.05,39.95],[18.38,39.8],[18.5,40.15],[18.0,40.65],[17.1,41.05],[16.6,41.2],[15.95,41.5],[15.9,41.65],[16.18,41.9],[15.6,41.93],[15.1,41.95],[14.7,42.15],[14.2,42.45],[13.9,42.95],[13.6,43.55],[13.2,43.75],[12.6,44.05],[12.3,44.3],[12.3,44.85],[12.55,44.95],[12.25,45.25],[12.4,45.45],[13.1,45.65],[13.6,45.75],[13.8,45.6],[13.72,46.0],[13.4,46.5],[12.4,46.75],[12.2,47.05],[11.2,46.95],[10.45,46.85],[10.1,46.3],[9.3,46.5],[9.25,46.2],[9.05,45.85],[8.75,46.1],[8.45,46.45],[7.85,45.95],[6.85,45.85],[7.05,45.2],[6.65,45.0],[7.0,44.3],[7.65,44.15]],
    sicilia:[[15.6,38.25],[15.25,37.75],[15.1,37.45],[15.3,37.05],[15.1,36.68],[14.5,36.8],[14.2,37.08],[13.6,37.28],[13.0,37.5],[12.5,37.68],[12.45,37.95],[12.75,38.15],[13.1,38.2],[13.4,38.15],[13.75,38.0],[14.3,38.03],[14.8,38.15],[15.25,38.23]],
    sardegna:[[9.2,41.25],[9.6,41.0],[9.7,40.5],[9.65,39.95],[9.6,39.3],[9.3,39.1],[9.0,39.2],[8.85,38.9],[8.45,39.0],[8.4,39.45],[8.5,39.9],[8.45,40.35],[8.2,40.6],[8.2,40.95],[8.6,40.9],[9.0,41.15]],
    corsica:[[9.4,43.0],[9.55,42.3],[9.4,41.7],[9.2,41.4],[8.8,41.6],[8.6,42.2],[8.75,42.6],[9.3,42.75]]
  };
  function disegnaMappa(m, tav, P, o){
    const R = rng(hash(m.id + "m" + tav.i)), geo = tav.f === "italia";
    const X0 = 26, Y0 = 56, Wp = 548;
    let lon0 = 6.4, lon1 = 18.8, lat0 = 36.4, lat1 = 47.2;
    if(geo && tav.geo){ const g = String(tav.geo).split(",").map(Number); lon0 = g[0]; lat0 = g[1]; lon1 = g[2]; lat1 = g[3]; }
    const kx = Math.cos((lat0 + lat1) / 2 * Math.PI / 180);
    const Hp = tav.h || (geo ? Math.round(Wp * (lat1 - lat0) / ((lon1 - lon0) * kx)) : 400);
    const PX = geo ? (x => X0 + (x - lon0) / (lon1 - lon0) * Wp) : (x => X0 + x / 100 * Wp);
    const PY = geo ? (y => Y0 + (lat1 - y) / (lat1 - lat0) * Hp) : (y => Y0 + y / 100 * Hp);
    const punti = t => String(t || "").trim().split(/\s+/).filter(Boolean).map(p => { const q = p.split(",").map(Number); return [PX(q[0]), PY(q[1])]; });
    const voci = t => String(t || "").split(";").map(s => s.trim()).filter(Boolean);
    const pos = {};
    let terra = "", acqua = "", sopra = "";
    // mare lungo un lato: costa mossa, con le linee di profondità
    const mari = [];
    voci(tav.mare).forEach(v => {
      if(v === "tutto"){ acqua += R_(X0, Y0, Wp, Hp, ' class="wa"'); mari.push(() => true); return; }
      const lato = v[0], q = +v.slice(1), amp = 3.2, n = 13, c = [];
      for(let i = 0; i < n; i++) c.push(q + (R() - .5) * 2 * amp);
      const costa = t => { const u = clamp(t, 0, 100) / 100 * (n - 1), i = Math.min(n - 2, Math.floor(u)); return c[i] + (c[i + 1] - c[i]) * (u - i); };
      const pts = c.map((v2, i) => { const t = i / (n - 1) * 100; return lato === "S" || lato === "N" ? [PX(t), PY(v2)] : [PX(v2), PY(t)]; });
      const fine = lato === "S" ? [[PX(100), PY(100)], [PX(0), PY(100)]] : lato === "N" ? [[PX(100), PY(0)], [PX(0), PY(0)]] : lato === "E" ? [[PX(100), PY(100)], [PX(100), PY(0)]] : [[PX(0), PY(100)], [PX(0), PY(0)]];
      const linea = liscia(pts);
      acqua += P_(linea + `L${f(fine[0][0])} ${f(fine[0][1])}L${f(fine[1][0])} ${f(fine[1][1])}Z`, ' class="wa"') + P_(linea, ' class="cs"');
      for(let k = 1; k <= 3; k++){ const sp = (lato === "S" || lato === "E" ? 1 : -1) * k * 7; acqua += P_(liscia(pts.map(p => lato === "S" || lato === "N" ? [p[0], p[1] + sp] : [p[0] + sp, p[1]])), ` class="wl" opacity="${f(.55 - k * .13)}"`); }
      mari.push((x, y) => lato === "S" ? y > costa(x) : lato === "N" ? y < costa(x) : lato === "E" ? x > costa(y) : x < costa(y));
    });
    const tutto = voci(tav.mare).includes("tutto") || geo;
    const isole = [];
    if(geo){
      acqua += R_(X0, Y0, Wp, Hp, ' class="wa"');
      Object.keys(ITALIA).forEach(k => { const d = "M" + ITALIA[k].map(p => f(PX(p[0])) + " " + f(PY(p[1]))).join("L") + "Z"; terra += P_(d, ' class="tr"'); });
      for(let i = 0; i < 26; i++){ const x = X0 + R() * Wp, y = Y0 + R() * Hp; acqua += P_(`M${f(x)} ${f(y)}q4 -3 8 0t8 0`, ' class="wl" opacity=".35"'); }
    }
    voci(tav.terra).forEach(v => { const q = v.split(",").map(Number), d = macchia(PX(q[0]), PY(q[1]), q[2] / 100 * Wp, (q[3] || q[2]) / 100 * Hp, R, 12, .4); terra += P_(d, ' class="tr"'); isole.push(q); });
    if(tutto && !geo) for(let i = 0; i < 30; i++){ const x = X0 + R() * Wp, y = Y0 + R() * Hp; acqua += P_(`M${f(x)} ${f(y)}q4 -3 8 0t8 0`, ' class="wl" opacity=".4"'); }
    const inMare = (x, y) => { if(geo) return false; if(tutto) return !isole.some(q => { const dx = (x - q[0]) / q[2], dy = (y - q[1]) / (q[3] || q[2]); return dx * dx + dy * dy < .8; }); return mari.some(fn => fn(x, y)); };
    // laghi e fiumi
    voci(tav.lago).forEach(v => { const q = v.split(",").map(Number), d = macchia(PX(q[0]), PY(q[1]), q[2] / 100 * Wp, (q[3] || q[2]) / 100 * Hp, R, 12, .3); acqua += P_(d, ' class="wa"') + P_(d, ' class="cs"'); mari.push((x, y) => { const dx = (x - q[0]) / q[2], dy = (y - q[1]) / (q[3] || q[2]); return dx * dx + dy * dy < 1; }); });
    voci(tav.fiume).forEach(v => { const d = liscia(punti(v)); acqua += P_(d, ' class="fm"') + P_(d, ' class="wl"'); });
    // sfondo secondo il tipo di territorio
    const tipo = tav.f || "citta";
    if(tipo === "citta"){
      const mu = voci(tav.mura).map(v => v.split(",").map(Number))[0];
      const dentro = (x, y) => { if(!mu) return true; const dx = (x - mu[0]) / mu[2], dy = (y - mu[1]) / (mu[3] || mu[2]); return dx * dx + dy * dy < .92; };
      for(let gy = 2; gy < 99; gy += 9.5){
        let gx = 1 + R() * 2;
        while(gx < 98){
          const bw = 3.2 + R() * 5.2, bh = 5.2 + R() * 3.4, x = gx, y = gy + R() * 1.8;
          gx += bw + 1.5 + R() * 1.2;
          if(inMare(x + bw / 2, y + bh / 2)) continue;
          const in2 = dentro(x + bw / 2, y + bh / 2);
          if(R() < (in2 ? .1 : mu ? .78 : .1)) continue;
          const px = PX(x), py = PY(y), ww = bw / 100 * Wp, hh = bh / 100 * Hp;
          terra += R_(px, py, ww, hh, ` class="bk" rx="1.5" transform="rotate(${f((R() - .5) * 9)} ${f(px + ww / 2)} ${f(py + hh / 2)})"`);
          if(R() < .3) terra += R_(px + ww * .25, py + hh * .25, ww * .5, hh * .5, ' class="bk" rx="1"');
        }
      }
    }
    if(tipo === "campagna" || tipo === "borgo"){
      for(let i = 0; i < 13; i++){ const x = 6 + R() * 88, y = 6 + R() * 88; if(inMare(x, y)) continue; const w = 40 + R() * 60, h = 26 + R() * 34, an = Math.round((R() - .5) * 70); let g = ""; for(let q = -h / 2; q <= h / 2; q += 5.5) g += L_(-w / 2, q, w / 2, q); terra += `<g class="cm" transform="translate(${f(PX(x))} ${f(PY(y))}) rotate(${an})">${g}</g>`; }
    }
    if(tipo === "sotto"){
      for(let i = 0; i < 90; i++){ const x = X0 + R() * Wp, y = Y0 + R() * Hp, l = 5 + R() * 9, an = R() * 3.14; terra += L_(x, y, x + Math.cos(an) * l, y + Math.sin(an) * l, ' class="rc"'); }
    }
    if(tipo === "spazio"){
      for(let i = 0; i < 110; i++) terra += C_(X0 + R() * Wp, Y0 + R() * Hp, .5 + R() * 1.2, ' class="sl"');
      voci(tav.orbite).forEach(v => { const q = v.split(",").map(Number); terra += `<ellipse cx="${f(PX(q[0]))}" cy="${f(PY(q[1]))}" rx="${f(q[2] / 100 * Wp)}" ry="${f((q[3] || q[2]) / 100 * Hp)}" class="ob"/>`; });
    }
    voci(tav.monti).forEach(v => {
      const q = v.split(",").map(Number), cx = PX(q[0]), cy = PY(q[1]), r = (q[2] || 12) / 100 * Wp;
      for(let k = 4; k >= 1; k--) terra += P_(macchia(cx, cy, r * k / 4, r * k / 4 * .8, R, 10, .3), ' class="cl"');
      terra += P_(`M${f(cx - 5)} ${f(cy + 4)}L${f(cx)} ${f(cy - 5)}L${f(cx + 5)} ${f(cy + 4)}Z`, ' class="pk"');
    });
    voci(tav.bosco).forEach(v => {
      const q = v.split(",").map(Number), cx = PX(q[0]), cy = PY(q[1]), r = (q[2] || 10) / 100 * Wp, ry = r * (q[3] ? q[3] / q[2] : .8);
      terra += P_(macchia(cx, cy, r, ry, R, 12, .36), ' class="vg"');
      const n = Math.round(r * ry / 55);
      for(let i = 0; i < n; i++){ const a = R() * 6.283, d = Math.sqrt(R()) * .86, x = cx + Math.cos(a) * r * d, y = cy + Math.sin(a) * ry * d; terra += P_(`M${f(x)} ${f(y - 4)}l3 6h-6z`, ' class="al"'); }
    });
    voci(tav.confine).forEach(v => { terra += P_(liscia(punti(v)), ' class="cf"'); });
    voci(tav.ferrovia).forEach(v => { terra += P_(liscia(punti(v)), ' class="fv"') + P_(liscia(punti(v)), ' class="fv2"'); });
    voci(tav.mura).forEach(v => { const q = v.split(",").map(Number); terra += P_(macchia(PX(q[0]), PY(q[1]), q[2] / 100 * Wp, (q[3] || q[2]) / 100 * Hp, R, 9, .16), ' class="mu"'); });
    // le vie tra i luoghi
    const L = tav.luoghi;
    if(!tav._pos){
      const Q = L.map(r => [PX(r.x), PY(r.y)]), DX = geo ? 64 : 98, DY = geo ? 48 : 68;
      for(let it = 0; it < 70; it++){
        let mosso = false;
        for(let i = 0; i < Q.length; i++) for(let j = i + 1; j < Q.length; j++){
          const dx = Q[j][0] - Q[i][0], dy = Q[j][1] - Q[i][1], ox = DX - Math.abs(dx), oy = DY - Math.abs(dy);
          if(ox <= 0 || oy <= 0) continue;
          mosso = true;
          if(ox / DX < oy / DY){ const k = ox / 2 * (dx < 0 ? -1 : 1) * .6; Q[i][0] -= k; Q[j][0] += k; }
          else { const k = oy / 2 * (dy < 0 ? -1 : 1) * .6; Q[i][1] -= k; Q[j][1] += k; }
        }
        Q.forEach(q => { q[0] = clamp(q[0], X0 + 36, X0 + Wp - 36); q[1] = clamp(q[1], Y0 + 22, Y0 + Hp - 44); if(q[0] > X0 + Wp - 74 && q[1] < Y0 + 62) q[1] = Y0 + 62; });
        if(!mosso) break;
      }
      tav._pos = Q;
    }
    const C = tav._pos;
    let archi = [];
    if(tav.vie != null) archi = String(tav.vie).trim().split(/\s+/).filter(Boolean).map(a => a.split("-").map(Number)).filter(a => C[a[0]] && C[a[1]]);
    else if(L.length > 1){
      const dist = (i, j) => Math.hypot(C[i][0] - C[j][0], C[i][1] - C[j][1]);
      const dentro = [0];
      while(dentro.length < L.length){ let best = null; dentro.forEach(i => L.forEach((_, j) => { if(dentro.includes(j)) return; const d = dist(i, j); if(!best || d < best[2]) best = [i, j, d]; })); archi.push([best[0], best[1]]); dentro.push(best[1]); }
      if(tipo === "citta") for(let q = 0; q < 2; q++){ const i = Math.floor(R() * L.length); let b = null; L.forEach((__, j) => { if(i === j || archi.some(a => (a[0] === i && a[1] === j) || (a[0] === j && a[1] === i))) return; const d = dist(i, j); if(!b || d < b[1]) b = [j, d]; }); if(b && b[1] < 190) archi.push([i, b[0]]); }
    }
    const vs = tav.vs || (tipo === "citta" || tipo === "borgo" ? "strada" : tipo === "sotto" ? "tunnel" : tipo === "mare" || tipo === "spazio" || geo ? "rotta" : "sentiero");
    let vie = "", vie2 = "";
    archi.forEach(([i, j]) => {
      const a = C[i], b = C[j], dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1, k = (R() - .5) * (vs === "rotta" ? .34 : .22) * d;
      const cx = (a[0] + b[0]) / 2 - dy / d * k, cy = (a[1] + b[1]) / 2 + dx / d * k, dd = `M${f(a[0])} ${f(a[1])}Q${f(cx)} ${f(cy)} ${f(b[0])} ${f(b[1])}`;
      if(vs === "strada"){ vie += P_(dd, ' class="s1"'); vie2 += P_(dd, ' class="s2"'); }
      else if(vs === "tunnel"){ vie += P_(dd, ' class="t1"'); vie2 += P_(dd, ' class="t2"'); }
      else vie += P_(dd, ` class="${vs === "rotta" ? "rt" : "st"}"`);
    });
    // case intorno ai luoghi dei borghi
    if(tipo === "borgo") L.forEach((r, i) => { if(r.ic === "strada" || r.ic === "freccia" || r.ic === "albero" || r.ic === "monte") return; const n = 5 + Math.floor(R() * 5); for(let q = 0; q < n; q++){ const a = R() * 6.283, d = 20 + R() * 30, x = C[i][0] + Math.cos(a) * d, y = C[i][1] + Math.sin(a) * d * .8, s = 6 + R() * 6; terra += R_(x - s / 2, y - s / 2, s, s * (.7 + R() * .5), ` class="bk" transform="rotate(${Math.round(R() * 60 - 30)} ${f(x)} ${f(y)})"`); } });
    // i luoghi: prima i tondi, poi le scritte dove non si coprono
    const occupati = C.map(c => [c[0] - 15, c[1] - 15, 30, 30]);
    occupati.push([X0 + Wp - 40, Y0, 40, 46]);
    let segni = "", scritte = "";
    L.forEach((r, i) => {
      const [cx, cy] = C[i];
      pos[r.id] = { x:cx - 15, y:cy - 15, w:30, h:30, cx, cy, poi:true };
      const A2 = adatta(r.n, 100, 40, P, [13.5, 12.5, 11.5]) || { fs:11.5, lh:12, righe:[P.maius ? r.n.toUpperCase() : r.n] };
      const tw = Math.max.apply(null, A2.righe.map(t => larg(t, A2.fs, P))) + 6, th = A2.righe.length * A2.lh + 2;
      const prove = [[cx - tw / 2, cy + 18, "m"], [cx - tw / 2, cy - 19 - th, "m"], [cx + 20, cy - th / 2, "s"], [cx - 20 - tw, cy - th / 2, "e"], [cx + 12, cy + 12, "s"], [cx - 12 - tw, cy + 12, "e"], [cx + 12, cy - 12 - th, "s"], [cx - 12 - tw, cy - 12 - th, "e"]];
      const costo = (b, k) => { let c = k * 6; if(b[0] < X0 + 2) c += (X0 + 2 - b[0]) * 40; if(b[0] + tw > X0 + Wp - 2) c += (b[0] + tw - X0 - Wp + 2) * 40; if(b[1] < Y0 + 2) c += (Y0 + 2 - b[1]) * 40; if(b[1] + th > Y0 + Hp - 2) c += (b[1] + th - Y0 - Hp + 2) * 40; occupati.forEach((q, qi) => { if(qi === i) return; const ox = Math.min(b[0] + tw, q[0] + q[2]) - Math.max(b[0], q[0]), oy = Math.min(b[1] + th, q[1] + q[3]) - Math.max(b[1], q[1]); if(ox > 0 && oy > 0) c += ox * oy * (qi < L.length ? 3 : 1); }); return c; };
      let scelta = prove[0], best = Infinity;
      prove.forEach((b, k) => { const c = costo(b, k); if(c < best){ best = c; scelta = b; } });
      occupati.push([scelta[0], scelta[1], tw, th]);
      const txx = scelta[0] + tw / 2;      // la scritta sta sempre centrata nel suo riquadro
      scritte += `<g class="lb" data-l="${r.id}">` + A2.righe.map((t, q) => T_(txx, scelta[1] + A2.fs * .84 + q * A2.lh, t, ` class="tx tp" font-size="${A2.fs}"`)).join("") + "</g>";
      segni += `<g class="po${r.acc ? " poa" : ""}" data-p="${r.id}">` + C_(cx, cy, 13.5, ' class="pb"') + icona(r.ic, cx, cy, 16.5) + (r.chiuso ? C_(cx + 10, cy - 10, 5.5, ' class="pc"') + icona("chiave", cx + 10, cy - 10, 8, "ic it") : "") + C_(cx, cy, 19, ' class="hit"') + "</g>";
      if(r.acc) pos[r.id].acc = { x:cx, y:cy - 13.5, dx:0, dy:1, poi:true };
    });
    voci(tav.scr).forEach(v => { const q = v.split(","); sopra += T_(PX(+q[0]), PY(+q[1]), q.slice(2).join(","), ' class="sc"'); });
    // la rosa dei venti
    const rx = X0 + Wp - 20, ry = Y0 + 24;
    sopra += `<g class="rv">` + C_(rx, ry, 13, "") + P_(`M${f(rx)} ${f(ry - 16)}l4.5 16h-9z`, ' class="rn"') + P_(`M${f(rx)} ${f(ry + 16)}l4.5 -16h-9z`, "") + T_(rx, ry - 19, "N", ' class="ts" text-anchor="middle"') + "</g>";
    const cid = o.uid + "m";
    const corpo = `<clipPath id="${cid}">${R_(X0, Y0, Wp, Hp, ' rx="4"')}</clipPath><g clip-path="url(#${cid})">${R_(X0, Y0, Wp, Hp, ' class="ld"')}${acqua}${terra}${vie}${vie2}</g>` + R_(X0, Y0, Wp, Hp, ' class="mb" rx="4"') + sopra + segni + scritte;
    return { corpo, h:Y0 + Hp + 26, pos };
  }

  /* ---------- la tavola finita: cornice, titolo, evidenze, «tu sei qui», personaggi ---------- */
  const CSS = `.pv-svg{display:block;width:100%;height:auto;font-family:var(--pf);-webkit-user-select:none;user-select:none}
.pv-svg text{pointer-events:none}
.pv-svg .bg{fill:var(--c)}.pv-svg .gr{stroke:var(--g);stroke-width:1;fill:none}.pv-svg .cn{fill:none;stroke:var(--t);stroke-width:1}
.pv-svg .w{fill:none;stroke:var(--l);stroke-width:1.4}.pv-svg .wo{fill:none;stroke:var(--l);stroke-width:3.4;stroke-linejoin:round}
.pv-svg .wt{fill:none;stroke:var(--t);stroke-width:1.1;stroke-dasharray:5 4}
.pv-svg .f{fill:var(--p)}.pv-svg .co{fill:var(--co)}.pv-svg .vd{fill:var(--c2);stroke:var(--t);stroke-width:1;stroke-dasharray:3 3}.pv-svg .tw{fill:var(--c);stroke:var(--l);stroke-width:2.4;stroke-linejoin:round}.pv-svg .hit{fill:transparent;stroke:none;cursor:pointer}
.pv-svg .a{fill:none;stroke:var(--t);stroke-width:.9;stroke-linecap:round;stroke-linejoin:round}.pv-svg .ap{fill:var(--t);stroke:none;opacity:.55}
.pv-svg .arr{opacity:.62}
.pv-svg .dr{stroke:var(--c);stroke-width:3.8;fill:none}.pv-svg .wn{fill:var(--c);stroke:var(--l);stroke-width:.8}
.pv-svg .ic{fill:none;stroke:var(--l);stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.pv-svg .it{stroke:var(--a);stroke-width:2.4}
.pv-svg .tx{fill:var(--x);font-weight:var(--pw);text-anchor:middle;letter-spacing:var(--ls);paint-order:stroke;stroke:var(--c);stroke-width:3.2px;stroke-linejoin:round;stroke-opacity:.82}
.pv-svg .tp{stroke-width:4px;stroke-opacity:.92}
.pv-svg .nm{fill:var(--t);font-size:8px;font-weight:700}
.pv-svg .tl{fill:var(--x);font-size:13.5px;font-weight:var(--pw);letter-spacing:.13em}.pv-svg .lq{fill:var(--a)}
.pv-svg .tt{fill:var(--x);font-size:21px;font-weight:var(--pw);letter-spacing:.09em}
.pv-svg .ts{fill:var(--t);font-size:10px;font-weight:var(--pw);letter-spacing:.18em}
.pv-svg .wa{fill:var(--wa)}.pv-svg .wl{fill:none;stroke:var(--t);stroke-width:.8}.pv-svg .cs{fill:none;stroke:var(--l);stroke-width:1.3;opacity:.8}
.pv-svg .fm{fill:none;stroke:var(--wa);stroke-width:8;stroke-linecap:round}.pv-svg .vg{fill:var(--vg)}
.pv-svg .ld{fill:var(--p)}.pv-svg .tr{fill:var(--c);stroke:var(--l);stroke-width:1.2;stroke-linejoin:round}
.pv-svg .mb{fill:none;stroke:var(--l);stroke-width:1.6}
.pv-svg .bk{fill:var(--p);stroke:var(--t);stroke-width:.6}.pv-svg .cm{stroke:var(--t);stroke-width:.6;opacity:.42}
.pv-svg .rc{stroke:var(--t);stroke-width:.8;opacity:.4}.pv-svg .sl{fill:var(--x);opacity:.5}.pv-svg .ob{fill:none;stroke:var(--t);stroke-width:1;stroke-dasharray:2 5}
.pv-svg .cl{fill:none;stroke:var(--t);stroke-width:.8;opacity:.75}.pv-svg .pk{fill:var(--l)}
.pv-svg .al{fill:none;stroke:var(--t);stroke-width:.8}
.pv-svg .cf{fill:none;stroke:var(--a);stroke-width:1.6;stroke-dasharray:9 4 2 4;opacity:.85}
.pv-svg .fv{fill:none;stroke:var(--l);stroke-width:3.2;opacity:.7}.pv-svg .fv2{fill:none;stroke:var(--c);stroke-width:1.6;stroke-dasharray:6 6}
.pv-svg .mu{fill:none;stroke:var(--l);stroke-width:2.6;stroke-dasharray:10 3;opacity:.7}
.pv-svg .s1{fill:none;stroke:var(--t);stroke-width:7.5;stroke-linecap:round}.pv-svg .s2{fill:none;stroke:var(--c);stroke-width:5;stroke-linecap:round}
.pv-svg .t1{fill:none;stroke:var(--l);stroke-width:13;stroke-linecap:round;opacity:.75}.pv-svg .t2{fill:none;stroke:var(--c2);stroke-width:10;stroke-linecap:round}
.pv-svg .st{fill:none;stroke:var(--l);stroke-width:1.5;stroke-dasharray:5 4;opacity:.75}.pv-svg .rt{fill:none;stroke:var(--l);stroke-width:1.5;stroke-dasharray:1.5 5.5;stroke-linecap:round;opacity:.8}
.pv-svg .pb{fill:var(--c);stroke:var(--l);stroke-width:1.7}.pv-svg .poa .pb{stroke:var(--a);stroke-width:2.4}.pv-svg .pc{fill:var(--c);stroke:var(--a);stroke-width:1}
.pv-svg .po{cursor:pointer}
.pv-svg .sc{fill:var(--t);font-size:12px;font-style:italic;letter-spacing:.32em;text-anchor:middle;font-weight:var(--pw)}
.pv-svg .rv circle{fill:var(--c);stroke:var(--t);stroke-width:1}.pv-svg .rv path{fill:var(--t)}.pv-svg .rv .rn{fill:var(--a)}
.pv-svg .acl{stroke:var(--a);stroke-width:4.5;fill:none;stroke-linecap:round}.pv-svg .acf{fill:var(--a)}
.pv-svg .acb{fill:var(--a)}.pv-svg .act{fill:var(--c2);font-size:10px;font-weight:700;text-anchor:middle}
.pv-svg .acn{fill:var(--a);font-size:13px;font-weight:var(--pw);letter-spacing:.04em;paint-order:stroke;stroke:var(--c);stroke-width:3.4px;stroke-linejoin:round}
.pv-svg .ev{fill:var(--e);fill-opacity:.2;stroke:var(--e);stroke-width:2.6}.pv-svg .evp{fill:none;stroke:var(--e);stroke-width:3}
.pv-svg .evt{fill:var(--e);font-weight:var(--pw);text-anchor:middle;letter-spacing:var(--ls);paint-order:stroke;stroke:var(--c2);stroke-width:4px;stroke-linejoin:round}
.pv-svg .lve .tl{fill:var(--e)}.pv-svg .lve .lq{fill:var(--e)}
.pv-svg .tuo{fill:var(--tu);stroke:var(--c);stroke-width:1.6}.pv-svg .tut{fill:#fff;font-size:9px;font-weight:800;text-anchor:middle;font-family:Inter,Arial,sans-serif}
.pv-svg .tur{fill:none;stroke:var(--tu);stroke-width:2}
.pv-svg .pe{stroke:var(--c);stroke-width:1.4}.pv-svg .pet{fill:#14110a;font-size:9.5px;font-weight:800;text-anchor:middle;font-family:Inter,Arial,sans-serif}
.pv-svg .cg{fill:var(--c2);stroke:var(--t);stroke-width:1}.pv-svg .vn{fill:url(#VIGN)}
.pv-an .ev,.pv-an .evp{animation:pvEv 1.7s ease-in-out infinite}
.pv-an .tur{animation:pvTu 1.9s ease-out infinite;transform-box:fill-box;transform-origin:center}
.pv-an .acf{animation:pvAc 1.1s ease-in-out infinite}
.pv-an .scan{animation:pvScan 1.5s .1s ease-out both}
@keyframes pvEv{50%{fill-opacity:.36;stroke-opacity:.55}}
@keyframes pvTu{0%{transform:scale(.5);opacity:.95}100%{transform:scale(2.3);opacity:0}}
@keyframes pvAc{50%{opacity:.45}}
@keyframes pvScan{0%{transform:translateX(-140px);opacity:.9}100%{transform:translateX(640px);opacity:0}}
body.fx-low .pv-an *{animation:none!important}`;
  let cssMesso = false;
  function metteCSS(){ if(cssMesso || !W.document) return; cssMesso = true; const s = document.createElement("style"); s.id = "pv-css"; s.textContent = CSS; document.head.appendChild(s); }
  let nUso = 0;
  function svg(m, ti, o){
    o = Object.assign({}, o || {});
    metteCSS();
    const tav = m.tav[ti] || m.tav[0], P = stile(m);
    o.uid = "pv" + (nUso++).toString(36);
    const r = tav.tipo === "pianta" ? disegnaPianta(m, tav, P, o) : disegnaMappa(m, tav, P, o);
    const H = Math.ceil(r.h), pos = r.pos, maius = t => P.maius ? String(t).toUpperCase() : String(t);
    let e = `<defs><pattern id="${o.uid}g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" class="gr"/></pattern><pattern id="${o.uid}h" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="${P.t}" stroke-width="1.2"/></pattern><radialGradient id="${o.uid}v" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="${P.c2}" stop-opacity="0"/><stop offset="1" stop-color="${P.c2}" stop-opacity=".55"/></radialGradient><linearGradient id="${o.uid}s" x1="0" x2="1"><stop offset="0" stop-color="${P.l}" stop-opacity="0"/><stop offset=".8" stop-color="${P.l}" stop-opacity=".2"/><stop offset="1" stop-color="${P.l}" stop-opacity=".5"/></linearGradient></defs>`;
    e += R_(0, 0, 600, H, ' class="bg"') + R_(0, 0, 600, H, ` fill="url(#${o.uid}g)"`) + R_(0, 0, 600, H, ` fill="url(#${o.uid}v)"`) + R_(7, 7, 586, H - 14, ' class="cn" rx="3"') + R_(11, 11, 578, H - 22, ' class="cn" rx="2" opacity=".5"');
    // intestazione
    e += T_(22, 34, maius(m.t), ' class="tt"') + T_(22, 47, maius(tav.n || "") + (m.tav.length > 1 ? "  ·  TAV. " + (tav.i + 1) + "/" + m.tav.length : ""), ' class="ts"');
    if(tav.tipo === "pianta" && tav.f === "nave") e += T_(578, 34, "◂ POPPA      PRUA ▸", ' class="ts" text-anchor="end"');
    e += r.corpo;
    // vie di entrata
    const evid = (o.evid || []).filter(id => pos[id]);
    // riquadri già presi da altre scritte (sottotitolo, titoli dei piani, bollini): le etichette degli accessi li evitano
    const occ = [[18, 37, 30 + larg(maius(tav.n || ""), 10, P) * 1.25 + (m.tav.length > 1 ? 70 : 0), 50]];
    Object.keys(pos).forEach(k => { const q = pos[k]; if(q.livello && q.tr) occ.push([18, q.y - 22, q.tr + 6, q.y - 7]); });
    const conAcc = tav.luoghi.filter(l => pos[l.id] && pos[l.id].acc && !pos[l.id].acc.poi);
    conAcc.forEach(l => { const a = pos[l.id].acc; occ.push([a.x - a.dx * 12 - 8, a.y - a.dy * 11 - 8, a.x - a.dx * 12 + 8, a.y - a.dy * 11 + 8]); });
    const libero = b => b[0] >= 14 && b[2] <= 587 && !occ.some(q => b[0] < q[2] && q[0] < b[2] && b[1] < q[3] && q[1] < b[3]);
    tav.luoghi.forEach(l => {
      const p = pos[l.id]; if(!p || !p.acc) return;
      const a = p.acc, ax = a.x, ay = a.y;
      if(!a.poi){
        const nx = -a.dy, ny = a.dx;
        e += L_(ax - nx * 9, ay - ny * 9, ax + nx * 9, ay + ny * 9, ' class="acl"') + P_(`M${f(ax + a.dx * 4 - nx * 6)} ${f(ay + a.dy * 4 - ny * 6)}L${f(ax + a.dx * 14)} ${f(ay + a.dy * 14)}L${f(ax + a.dx * 4 + nx * 6)} ${f(ay + a.dy * 4 + ny * 6)}Z`, ' class="acf"');
        const bx = ax - a.dx * 12, by = ay - a.dy * 11;
        e += C_(bx, by, 8, ' class="acb"') + T_(bx, by + 3.6, "A" + l.an, ' class="act"');
        if(o.accessi){
          const tw = larg(maius(l.acc), 13, P) + String(l.acc).length * 13 * (.04 - (P.ls || 0));
          const riq = c => { const x0 = c[2] === "start" ? c[0] : c[2] === "end" ? c[0] - tw : c[0] - tw / 2; return [x0 - 3, c[1] - 10, x0 + tw + 3, c[1] + 2]; };
          let prove;
          if(a.dx !== 0){
            // muro di fianco: la scritta va sotto il piano dalla sua parte; se il posto è preso, a destra sulla riga del titolo
            const yb = p.y + p.h + 14, lvp = l.lv && pos[l.lv.id], yt = lvp ? lvp.y - 10.5 : p.y - 10.5, xd = lvp ? lvp.x + lvp.w - 4 : p.x + p.w - 4;
            prove = a.dx > 0 ? [[p.x + 4, yb, "start"], [xd, yt, "end"], [p.x + 4, yb + 12, "start"]] : [[p.x + p.w - 4, yb, "end"], [xd, yt, "end"], [p.x + p.w - 4, yb + 12, "end"]];
          }
          else { const ya = a.dy > 0 ? by - 11 : by + 20, yl = by + 4.5; prove = [[bx, ya, "middle"], [bx + 12, yl, "start"], [bx - 12, yl, "end"], [bx - 8, ya, "start"], [bx + 8, ya, "end"]]; }
          let c = prove.find(q => libero(riq(q)));
          if(!c){ c = prove[0].slice(); const b = riq(c); if(b[0] < 14) c[0] += 14 - b[0]; if(b[2] > 587) c[0] -= b[2] - 587; }
          occ.push(riq(c));
          e += T_(c[0], c[1], maius(l.acc), ` class="acn" text-anchor="${c[2]}"`);
        }
      } else {
        // sulle mappe il bollino dell'accesso sta in basso a destra del segnaposto: in alto c'è posto per «TU»
        e += C_(ax + 13, ay + 21.5, 7.5, ' class="acb"') + T_(ax + 13, ay + 25.1, "A" + l.an, ' class="act"');
      }
    });
    // luoghi in evidenza
    evid.forEach(id => {
      const p = pos[id], l = m.perId[id];
      if(p.livello) return;
      if(p.poi) e += C_(p.cx, p.cy, 19.5, ' class="evp"');
      else if(p.d) e += P_(p.d, ' class="ev"');
      else {
        e += R_(p.x + 1.5, p.y + 1.5, p.w - 3, p.h - 3, ' class="ev" rx="2"');
        if(p.muto || o.grande){ const A2 = adatta(l.n, 150, 34, P, [15, 14, 13]); if(A2 && p.muto){ const yy = clamp(p.cy - A2.righe.length * A2.lh / 2, 60, H - 40); e += A2.righe.map((t, i) => T_(clamp(p.x + p.w / 2, 70, 530), yy + A2.fs * .82 + i * A2.lh, t, ` class="evt" font-size="${A2.fs}"`)).join(""); } }
      }
    });
    // personaggi visti nei luoghi
    const gruppi = {};
    (o.pers || []).forEach(q => { if(pos[q.p]) (gruppi[q.p] = gruppi[q.p] || []).push(q); });
    Object.keys(gruppi).forEach(id => {
      const p = pos[id], g = gruppi[id].slice(0, 4), n = g.length;
      g.forEach((q, i) => {
        let x = p.poi ? p.cx - 20 - i * 15 : p.x + p.w - 12 - i * 15, y = p.poi ? p.cy - 14 : p.lato === "a" ? p.y + p.h : p.lato === "b" ? p.y : p.y + p.h - 11;
        if(p.ped){ const v = p.pedv || [1, 0]; x = p.ped[0] + v[0] * i * 13; y = p.ped[1] + v[1] * i * 13; }
        e += C_(x, y, 8, ` class="pe" fill="${q.c}"`) + T_(x, y + 3.4, q.s, ' class="pet"');
      });
    });
    // tu sei qui
    if(o.tu && pos[o.tu]){
      const p = pos[o.tu], x = p.poi ? p.cx + 14 : p.livello ? p.x + 40 : p.x + (p.est === "sx" ? Math.min(36, p.w * .36) : 14), y = p.poi ? p.cy - 24 : p.livello ? p.cy : p.lato === "b" ? p.y + 6 : p.y + p.h - 15;
      if(p.pin) e += `<g class="tu">` + C_(p.pin[0], p.pin[1], 9, ' class="tur"') + C_(p.pin[0], p.pin[1], 8.6, ' class="tuo"') + T_(p.pin[0], p.pin[1] + 3.3, "TU", ' class="tut"') + "</g>";
      else e += `<g class="tu">` + C_(x, y, 9, ' class="tur"') + P_(`M${f(x)} ${f(y + 13)}C${f(x - 4)} ${f(y + 7)} ${f(x - 10)} ${f(y + 4)} ${f(x - 10)} ${f(y - 3)}a10 10 0 0 1 20 0C${f(x + 10)} ${f(y + 4)} ${f(x + 4)} ${f(y + 7)} ${f(x)} ${f(y + 13)}Z`, ' class="tuo"') + T_(x, y + .4, "TU", ' class="tut"') + "</g>";
    }
    if(o.anim) e += R_(-120, 12, 110, H - 24, ` class="scan" fill="url(#${o.uid}s)"`);
    const vars = `--c:${P.c};--c2:${P.c2};--g:${P.g};--l:${P.l};--t:${P.t};--p:${P.p};--co:${P.co};--x:${P.x};--a:${P.a};--e:${P.e};--tu:${P.tu};--wa:${P.wa};--vg:${P.vg};--pf:${fam(P.font)};--pw:${P.fw};--ls:${P.ls}em`;
    return { html:`<svg class="pv-svg pv-${P.nome}${o.anim ? " pv-an" : ""}" viewBox="0 0 600 ${H}" xmlns="http://www.w3.org/2000/svg" style="${vars}" role="img" aria-label="${esc(m.t)}">${e}</svg>`, w:600, h:H, pos, stile:P };
  }

  /* ---------- i luoghi nominati nel testo ---------- */
  const ACCESSI = /punt[oi] d ?i? ?(accesso|ingresso|entrata|uscita)|vi[ae] d ?i? ?(entrata|accesso|ingresso|fuga|uscita)|\baccessi\b|\bingressi\b|\bentrate\b|uscit[ae] (di sicurezza|d emergenza|secondari[ae]|di servizio|sul retro)|passaggi[o]? segret|come (si )?entr|da dove (si )?(entra|passa|esce|arriva)|per entrare|(unic[oa]|sol[oa]|altr[oa]|second[oa]|un altro|un altra) (accesso|ingresso|entrata|uscita)|(ingresso|entrata|uscita|accesso) (principale|secondari[oa]|di servizio|laterale|posteriore|sul retro|di emergenza)/;
  const PAROLA_MAPPA = /\b(planimetri[ae]|piantin[ae]|pianta della|pianta del|mappa|cartina|schema de[li])/;
  const MOSSA_TU = /\b(sei|ti trovi|ti ritrovi|entri|rientri|arrivi|raggiungi|sali|scendi|torni|esci|sbuchi|ti fermi|ti nascondi|ti infili|varchi|attraversi|imbocchi|ti affacci|ti dirigi|corri|cammini|ti precipiti|ti avvii|siete|entrate|arrivate|raggiungete|salite|scendete|tornate|vi trovate|vai|andate|parti|partite|lasci|lasciate|prendi|prendete|prosegui|proseguite|uscite|rientrate|attraversate|imboccate|vi dirigete|vi fermate|vi infilate|vi avvicinate|ti avvicini|ti sposti|vi spostate|giungi|giungete|sbarchi|sbarcate|approdi|approdate|atterri|atterrate|risali|risalite|ridiscendi|percorri|percorrete|guidi|guidate|ti cali|vi calate|strisci|strisciate|ti arrampichi|vi arrampicate|correte|camminate|ti rifugi|vi rifugiate|fuggi|fuggite|scappi|scappate)\b/;
  const MOSSA_IO = /\b(vado|andiamo|entro|entriamo|rientro|salgo|saliamo|scendo|scendiamo|raggiungo|raggiungiamo|torno|torniamo|corro|corriamo|esco|usciamo|mi dirigo|mi avvicino|mi sposto|mi nascondo|mi infilo|mi precipito|mi avvio|passo|scappo|fuggo|vado a|andare|porto|accompagno|seguo|mi fiondo|filo|parto|partiamo|lascio|lasciamo|prendo|prendiamo|proseguo|proseguiamo|attraverso|attraversiamo|imbocco|imbocchiamo|ritorno|ritorniamo|risalgo|risaliamo|ci dirigiamo|ci spostiamo|ci avviciniamo|ci infiliamo|ci nascondiamo|cammino|camminiamo|sbarco|sbarchiamo|guido|guidiamo|mi calo|ci caliamo|striscio|mi arrampico|mi rifugio|ci rifugiamo|mi reco|ci rechiamo|m incammino|mi incammino|ci incamminiamo|fuggiamo|scappiamo)\b/;
  // dentro una battuta un personaggio è «in un luogo» solo se la frase lo dice: «Whitaker è nella suite», «Alba sta salendo in plancia»
  const STA = /\b(e|era|sta|stava|resta|restava|rimane|aspetta|dorme|lavora|abita|vive|va|andava|sale|scende|torna|entra|esce|corre|si trova|si trovava|si nasconde|si e chius[oa]|e (andat|sces|salit|tornat|entrat|uscit|rimast|chius|nascost|scappat|corso|cors)[oa]?|sta (salendo|scendendo|andando|tornando|entrando|uscendo|aspettando|dormendo|lavorando|correndo))\b/;
  const LONTANO = /al telefono|per telefono|alla radio|via radio|in vivavoce|altoparlante|interfono|videochiamata|messaggio vocale|auricolare|al cellulare|ti chiama|squilla/;
  function nelTesto(m, frase){
    const trovati = [];
    const prova = obj => { if(!obj.re) return; obj.re.lastIndex = 0; let r; while((r = obj.re.exec(frase))){ const s = r.index + (frase[r.index] === " " ? 1 : 0); trovati.push({ id:obj.id, s, e:s + r[1].length, liv:!!obj.livello }); } };
    m.luoghi.forEach(prova); m.livelli.forEach(prova);
    trovati.sort((a, b) => (b.e - b.s) - (a.e - a.s) || a.s - b.s);
    const presi = [];
    trovati.forEach(t => { if(!presi.some(p => t.s < p.e && p.s < t.e)) presi.push(t); });
    return presi.sort((a, b) => a.s - b.s);
  }
  const frasi = t => String(t || "").replace(/\*/g, " ").split(/\n+/).reduce((out, riga) => { (riga.match(/[^.!?…]+[.!?…]*["”»]?/g) || []).forEach(q => { if(q.trim()) out.push(q.trim()); }); return out; }, []);
  // legge un messaggio: luoghi nominati, se parla di accessi o di mappe
  function trova(m, txt){
    const out = { luoghi:[], accessi:false, mappa:false };
    if(!m) return out;
    const n = norm(txt);
    out.accessi = ACCESSI.test(n) && m.accessi.length > 0;
    out.mappa = PAROLA_MAPPA.test(n);
    frasi(txt).forEach(fr => nelTesto(m, norm(fr)).forEach(t => { if(!out.luoghi.includes(t.id)) out.luoghi.push(t.id); }));
    // un livello nominato insieme a una sua stanza non serve
    out.luoghi = out.luoghi.filter(id => { const l = m.perId[id]; return !(l.livello && out.luoghi.some(q => m.perId[q].lv === l)); });
    return out;
  }
  function trovaPers(s, nfr, raw){
    const out = [];
    (s.chars || []).forEach((c, i) => {
      const nomi = [c.n].concat((c.n || "").split(/\s+/).filter(p => p.length > 3 && /^[A-ZÀ-Ü]/.test(p)));
      for(const nome of nomi){ if(!nome || nome.length < 3) continue; const re = new RegExp("(^|[^A-Za-zÀ-ÿ])" + nome.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![A-Za-zÀ-ÿ])"); const r = re.exec(raw); if(r){ out.push({ i, at:r.index }); break; } }
    });
    return out;
  }
  const parlante = (s, nome) => { const n = nome.toLowerCase().trim(); return (s.chars || []).findIndex(c => { const a = (c.n || "").toLowerCase(), b = (c.full || "").toLowerCase(); return a === n || b === n || (a.length > 2 && n.includes(a)) || (n.length > 2 && a.includes(n)) || (n.length > 3 && b.includes(n)); }); };
  // ripercorre la chat: dove si trova chi gioca, i luoghi già visti, dove sono stati visti i personaggi,
  // e in quali messaggi mostrare la planimetria
  const statoCache = new WeakMap();
  function stato(x, s){
    const m = per(s);
    if(!m || !x) return null;
    const msgs = x.messages || [], firma = msgs.length + "|" + (msgs.length ? msgs[msgs.length - 1].t.length : 0);
    const c = statoCache.get(x);
    if(c && c.firma === firma && c.m === m) return c.st;
    const st = { m, qui:m.inizio, visti:{}, pers:{}, msg:{}, carte:0 };
    let dallUltima = 9;
    msgs.forEach((msg, i) => {
      const info = trova(m, msg.t), mio = msg.r === "u";
      info.nuovi = info.luoghi.filter(id => st.visti[id] == null);
      info.luoghi.forEach(id => { if(st.visti[id] == null) st.visti[id] = i; });
      const lontano = LONTANO.test(norm(msg.t));
      String(msg.t || "").split(/\n+/).forEach(riga => {
        const dial = !mio && riga.match(/^\s*\*?\s*([A-ZÀ-Ü][^:*\n"]{0,30}):\s*\*?\s*["“«]/);
        frasi(riga).forEach((fr, fi) => {
          const nf = norm(fr), L = nelTesto(m, nf).filter(t => !t.liv || true);
          if(L.length){
            const mossa = (mio ? MOSSA_IO : MOSSA_TU).exec(nf);
            if(mossa && (!dial || mio)){ const dopo = L.filter(t => t.s > mossa.index); if(dopo.length) st.qui = dopo[dopo.length - 1].id; }
            if(!mio){
              const P2 = trovaPers(s, nf, fr.replace(/\*/g, " "));
              P2.forEach(pp => {
                const prima = fr.slice(0, pp.at), raw = norm(prima).length;
                if(dial){
                  // in una battuta: non conta l'etichetta di chi parla, e serve «Nome è / sta / va … luogo»
                  if(fi === 0 && !/["“«]/.test(prima)) return;
                  const dopo = L.filter(t => !m.perId[t.id].livello && t.s > raw).sort((a, b) => a.s - b.s)[0];
                  if(!dopo || dopo.s - raw > 64 || !STA.test(nf.slice(raw, dopo.s))) return;
                  if(P2.some(q => q !== pp && q.at > pp.at && norm(fr.slice(0, q.at)).length < dopo.s)) return;
                  st.pers[pp.i] = { p:dopo.id, i };
                  return;
                }
                let best = null;
                L.forEach(t => { if(m.perId[t.id].livello) return; const d = Math.abs(t.s - raw); if(!best || d < best[1]) best = [t.id, d]; });
                if(best && best[1] < 70) st.pers[pp.i] = { p:best[0], i };
              });
            }
          }
        });
        if(dial && !lontano && st.qui && !m.perId[st.qui].livello){ const ci = parlante(s, dial[1]); if(ci >= 0 && !(st.pers[ci] && st.pers[ci].i === i)) st.pers[ci] = { p:st.qui, i }; }
      });
      // «sali al ponte otto, davanti alla suite»: dal piano si passa alla stanza nominata
      if(st.qui && m.perId[st.qui].livello){ const r = info.luoghi.find(id => m.perId[id].lv === m.perId[st.qui]); if(r) st.qui = r; }
      if(!mio){
        dallUltima++;
        let carta = "";
        if(info.accessi) carta = "accessi";
        else if(info.mappa && m.luoghi.length) carta = "mappa";
        else if(info.luoghi.length && (!st.carte || (dallUltima >= 2 && (info.nuovi.length || info.luoghi.length >= 2)))) carta = "luoghi";
        if(carta){ st.carte++; dallUltima = 0; }
        st.msg[i] = { luoghi:info.luoghi, nuovi:info.nuovi, accessi:info.accessi, carta, qui:st.qui, pers:Object.assign({}, st.pers) };
      }
    });
    statoCache.set(x, { firma, m, st });
    return st;
  }
  // i luoghi per le istruzioni dell'AI: così la storia usa gli stessi nomi della planimetria
  function prompt(s, nome, corto){
    const m = per(s);
    if(!m || !m.luoghi.length) return "";
    if(corto){
      // per i modelli piccoli e le storie già lunghe: solo i nomi, su una riga
      const nomi = [];
      m.luoghi.forEach(r => { const n = r.n.split(" · ")[0]; if(!(r.acc && r.acc === r.n) && !nomi.includes(n) && nomi.length < 16) nomi.push(n); });
      return `LUOGHI (${nome} ne ha la mappa: usa questi nomi): ${nomi.join(", ")}.` + (m.accessi.length ? ` ENTRATE E USCITE: ${m.accessi.slice(0, 4).map(r => r.acc.replace(/ \(.*?\)/g, "")).join("; ")}.` : "");
    }
    let t = m.generica ? `LUOGHI (${nome} ha una mappa della zona con questi luoghi: quando una scena si svolge in uno di essi usa questo nome; puoi aggiungerne altri):\n`
      : `LUOGHI${m.t ? " – " + m.t : ""} (${nome} ne ha la planimetria: usa questi nomi):\n`;
    m.tav.forEach(tav => {
      if(tav.tipo === "pianta") tav.liv.forEach(lv => { t += "- " + lv.n + ": " + lv.st.map(r => r.n + (r.chiuso ? " (riservato)" : "")).join(", ") + "\n"; });
      else t += "- " + (m.tav.length > 1 && tav.n ? tav.n + ": " : "") + tav.luoghi.filter(r => !(r.acc && r.acc === r.n)).map(r => r.n.split(" · ")[0]).join(", ") + "\n";
    });
    if(m.accessi.length) t += "VIE DI ENTRATA E DI USCITA (se " + nome + " chiede i punti di accesso, elenca questi): " + m.accessi.map(r => r.acc).join("; ") + ".";
    return t.trim();
  }

  W.PIANTE = { per, svg, trova, stato, prompt, articoli, stile, STILI, IC, icona, norm, leggi, pronto:() => (W.LOCANDINA && W.LOCANDINA.caratteri ? W.LOCANDINA.caratteri() : Promise.resolve()) };
})(window);
