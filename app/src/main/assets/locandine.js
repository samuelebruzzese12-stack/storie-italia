/* Storie d'Italia – locandine da cinema.
   Ogni copertina è un manifesto disegnato in SVG (600×900): cielo e luce, luoghi e personaggi
   in controluce, atmosfera (pioggia, nebbia, neve, braci…), colori da film, frase di lancio,
   titolo e titoli di coda. Le 72 storie hanno una composizione scelta a mano (STORIE, in fondo);
   quelle create da chi gioca ricevono una locandina costruita dal genere, sempre diversa. */
(function(W){
  "use strict";
  const VW = 600, VH = 900;
  let HOR = 655;
  const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";
  const SANS = "Inter, Roboto, 'Helvetica Neue', Arial, sans-serif";
  const f = n => Math.round(n * 10) / 10;
  function hash(s){ let h = 2166136261; for(const ch of String(s)){ h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed){ let x = seed || 1; return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return ((x >>> 0) % 100000) / 100000; }; }
  const esc = t => String(t == null ? "" : t).replace(/[&<>"]/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[ch]));
  const piano = t => String(t || "").replace(/\{N\}/g, "").replace(/\[([^|\]]*)\|[^\]]*\]/g, "$1").replace(/\s+/g, " ").trim();
  const op = o => o == null ? "" : ` opacity="${o}"`;
  const R = (x, y, w, h, fill, o, extra) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}"${op(o)}${extra || ""}/>`;
  const P = (d, fill, o, extra) => `<path d="${d}" fill="${fill}"${op(o)}${extra || ""}/>`;
  const C = (x, y, r, fill, o) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}"${op(o)}/>`;
  const E = (x, y, rx, ry, fill, o, extra) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="${fill}"${op(o)}${extra || ""}/>`;
  const L = (x1, y1, x2, y2, col, w, o) => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${col}" stroke-width="${w}"${op(o)} stroke-linecap="round"/>`;
  const S = (d, col, w, o, extra) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}"${op(o)} stroke-linecap="round" stroke-linejoin="round"${extra || ""}/>`;
  const G = (x, y, s, inner, fill, flip, rot) => `<g transform="translate(${f(x)} ${f(y)})${rot ? ` rotate(${rot})` : ""} scale(${flip ? -s : s} ${s})"${fill ? ` fill="${fill}"` : ""}>${inner}</g>`;
  const hex = h => { h = h.replace("#", ""); if(h.length === 3) h = h.split("").map(ch => ch + ch).join(""); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); };
  const mix = (a, b, t) => "#" + hex(a).map((v, i) => Math.round(v + (hex(b)[i] - v) * t).toString(16).padStart(2, "0")).join("");
  const contorno = (m, col, dx, dy, w, a) => `<g transform="translate(${dx} ${dy})" opacity="${a || .85}" stroke="${col}" stroke-width="${w || 3}" stroke-linejoin="round">` + m.replace(/ fill="(?!none)[^"]*"/g, ` fill="${col}"`).replace(/ stroke="(?!none)[^"]*"/g, ` stroke="${col}"`).replace(/<text[\s\S]*?<\/text>/g, "") + "</g>";
  const TXT = (x, y, t, size, fill, extra) => `<text x="${f(x)}" y="${f(y)}" text-anchor="middle" font-family="${SANS}" font-weight="800" font-size="${size}" fill="${fill}"${extra || ""}>${esc(t)}</text>`;

  /* ---------- tavolozze: cielo dall'alto all'orizzonte, luce, silhouette lontane/medie/vicine ---------- */
  const PAL = {
    notte:    { sky:["#04060d","#0c1430","#22305a"], glow:"#9db7ff", ink:"#03040a", mid:"#0e1630", far:"#1c2850", acc:"#ffcf7a" },
    tramonto: { sky:["#120822","#4a1a44","#c4553c","#f2b25e"], glow:"#ffcf8a", ink:"#0b0510", mid:"#26122a", far:"#562a40", acc:"#ffd27a" },
    alba:     { sky:["#161432","#4e3f70","#d98a78","#f6d29c"], glow:"#fff0c4", ink:"#100c1a", mid:"#2a223e", far:"#5a4868", acc:"#ffe0a0" },
    oro:      { sky:["#0b0704","#2a180a","#74441a","#d4954a"], glow:"#ffcf7a", ink:"#060302", mid:"#1b1108", far:"#3a2410", acc:"#ffc66b" },
    sangue:   { sky:["#050202","#200606","#561010","#ad3220"], glow:"#ff8a5a", ink:"#030101", mid:"#140505", far:"#300b0b", acc:"#ff6b4a" },
    nebbia:   { sky:["#171c22","#353e46","#6d7880","#a3acb2"], glow:"#eef4f6", ink:"#0b0f12", mid:"#262e34", far:"#56606a", acc:"#ffd9a0" },
    pioggia:  { sky:["#04080b","#0d1a22","#1c3240","#33505e"], glow:"#bfe0ff", ink:"#020507", mid:"#0c161c", far:"#1b2c36", acc:"#e9b65a" },
    mare:     { sky:["#081628","#164068","#cf8058","#f4cc8c"], glow:"#ffe0a8", ink:"#050e18", mid:"#102c44", far:"#285676", acc:"#ffd27a" },
    giorno:   { sky:["#2a66a6","#5f9fd2","#b6d6ea","#f4e0b4"], glow:"#fff8e0", ink:"#121e2a", mid:"#2a4256", far:"#6a889e", acc:"#ffd27a" },
    verde:    { sky:["#091812","#1b3a2c","#647e52","#e0c486"], glow:"#fff0b8", ink:"#050e09", mid:"#11281c", far:"#2c4836", acc:"#ffd27a" },
    ghiaccio: { sky:["#050e18","#143048","#46789a","#bad8e8"], glow:"#eef8ff", ink:"#040a10", mid:"#102434", far:"#365670", acc:"#bfe8ff" },
    neon:     { sky:["#090312","#280b44","#781e78","#ff4fa3"], glow:"#ffd36b", ink:"#07030e", mid:"#190826", far:"#36104c", acc:"#5ee1ff" },
    spazio:   { sky:["#010207","#050920","#101a48","#24286a"], glow:"#bcd0ff", ink:"#010205", mid:"#090e24", far:"#18224c", acc:"#7fd4ff" },
    seppia:   { sky:["#0c0905","#281d11","#66502f","#c8a468"], glow:"#ffe3a8", ink:"#070503", mid:"#1a140b", far:"#382c1a", acc:"#ffcf7a" },
    fuoco:    { sky:["#070202","#280904","#762007","#e05e18"], glow:"#ffb35a", ink:"#040101", mid:"#180704", far:"#381107", acc:"#ffb35a" },
    incubo:   { sky:["#030209","#100a22","#281d48","#47386c"], glow:"#ece6ff", ink:"#020105", mid:"#0c0819", far:"#1c1434", acc:"#c9b8ff" },
    lago:     { sky:["#091116","#223e48","#76969c","#d6cdb4"], glow:"#fff4dc", ink:"#05090c", mid:"#182a30", far:"#46666e", acc:"#ffd9a0" },
    abisso:   { sky:["#020b12","#06283a","#0c4a5e","#1b6f7c"], glow:"#bff6ff", ink:"#010608", mid:"#04202c", far:"#0b3a4a", acc:"#7ff0ff" }
  };

  /* ---------- stili del titolo per genere ---------- */
  const TIT = {
    giallo:      { font:SERIF, w:700, up:true,  ls:3,  fill:["#fff7e0", "#e6c47e"], size:84 },
    romantico:   { font:SERIF, w:700, up:false, it:true, ls:0, fill:["#fff3ef", "#f2b0a0"], size:96 },
    fantascienza:{ font:SANS,  w:800, up:true,  ls:9,  fill:["#ffffff", "#9fd8ff"], size:70 },
    avventura:   { font:SERIF, w:700, up:true,  ls:4,  fill:["#fff6dc", "#e6be72"], size:80 },
    thriller:    { font:SANS,  w:800, up:true,  ls:2,  fill:["#ffffff", "#c9d2da"], size:78 },
    horror:      { font:SERIF, w:700, up:true,  ls:4,  fill:["#ffecec", "#c42828"], size:80 },
    commedia:    { font:SERIF, w:700, up:false, it:true, ls:0, fill:["#fff9d8", "#ffcf5a"], size:94 },
    malavita:    { font:SERIF, w:700, up:true,  ls:5,  fill:["#fff3c4", "#d6a03e"], size:82 },
    guerra:      { font:SANS,  w:800, up:true,  ls:6,  fill:["#f2ead8", "#c4aa82"], size:72 },
    fantasy:     { font:SERIF, w:700, up:true,  ls:6,  fill:["#fff6d8", "#d6ad54"], size:80 },
    drama:       { font:SERIF, w:700, up:false, ls:0,  fill:["#ffffff", "#e6d4b8"], size:92 },
    vita:        { font:SERIF, w:700, up:false, it:true, ls:0, fill:["#fff4e0", "#ffb46a"], size:96 },
    azione:      { font:SANS,  w:800, up:true,  it:true, ls:1, fill:["#fff0fa", "#ff4fd8"], size:82, glow:"#ff4fd8" }
  };

  /* ---------- misure del testo (canvas quando c'è un documento) ---------- */
  let ctx2d = null;
  function misura(t, font, w, size, it){
    try{
      if(!ctx2d && typeof document !== "undefined") ctx2d = document.createElement("canvas").getContext("2d");
      if(ctx2d){ ctx2d.font = `${it ? "italic " : ""}${w} ${size}px ${font}`; return ctx2d.measureText(t).width; }
    }catch(e){}
    return t.length * size * .6;
  }

  /* ---------- contesto di disegno ---------- */
  let nUso = 0;
  function Ctx(s, W2, H2){
    const seed = hash((s.id || "") + "|" + (s.t || "")), R2 = rng(seed);
    const c = { s, R:R2, d:"", u:"§U§", p:PAL.notte, rif:"", n:0 };
    c.rnd = (a, b) => a + R2() * (b - a);
    c.pick = a => a[Math.floor(R2() * a.length) % a.length];
    c.col = z => [c.p.far, c.p.mid, c.p.ink][z == null ? 2 : z];
    c.id = () => c.u + (c.n++);
    const stops = st => st.map(([o, col, a]) => `<stop offset="${o}" stop-color="${col}"${a != null ? ` stop-opacity="${a}"` : ""}/>`).join("");
    c.lin = (st, x2, y2) => { const id = c.id(); c.d += `<linearGradient id="${id}" x1="0" y1="0" x2="${x2 == null ? 0 : x2}" y2="${y2 == null ? 1 : y2}">${stops(st)}</linearGradient>`; return `url(#${id})`; };
    c.linU = (st, x1, y1, x2, y2) => { const id = c.id(); c.d += `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}">${stops(st)}</linearGradient>`; return `url(#${id})`; };
    c.rad = (st, cx, cy, r) => { const id = c.id(); c.d += `<radialGradient id="${id}" cx="${cx == null ? .5 : cx}" cy="${cy == null ? .5 : cy}" r="${r == null ? .5 : r}">${stops(st)}</radialGradient>`; return `url(#${id})`; };
    c.halo = (col, a) => c.rad([[0, col, a == null ? .55 : a], [1, col, 0]]);
    c.clip = inner => { const id = c.id(); c.d += `<clipPath id="${id}">${inner}</clipPath>`; return `url(#${id})`; };
    c.fc = {};
    c.flt = (nome, inner, box) => { if(!c.fc[nome]){ const id = c.id(); c.d += `<filter id="${id}" ${box || 'x="-20%" y="-20%" width="140%" height="140%"'} color-interpolation-filters="sRGB">${inner}</filter>`; c.fc[nome] = `url(#${id})`; } return c.fc[nome]; };
    c.sfoca = sd => c.flt("b" + sd, `<feGaussianBlur stdDeviation="${sd}"/>`, 'x="-40%" y="-40%" width="180%" height="180%"');
    c.rumore = (nome, bf, oct, seed, a, b) => c.flt(nome, `<feTurbulence type="fractalNoise" baseFrequency="${bf}" numOctaves="${oct}" seed="${seed}" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 ${a} ${b}" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/>`, 'x="0" y="0" width="100%" height="100%"');
    c.rim = (dx, dy, col) => c.flt(`rim${dx}_${dy}_${col}`, `<feOffset in="SourceAlpha" dx="${-dx}" dy="${-dy}" result="o"/><feComposite in="SourceAlpha" in2="o" operator="out" result="e"/><feGaussianBlur in="e" stdDeviation=".9" result="eb"/><feFlood flood-color="${col}"/><feComposite in2="eb" operator="in" result="r"/><feComposite in="r" in2="SourceAlpha" operator="in" result="ri"/>` +
      `<feOffset in="SourceAlpha" dx="${f(-dx * 5)}" dy="${f(-dy * 3)}" result="o2"/><feComposite in="SourceAlpha" in2="o2" operator="out" result="e2"/><feGaussianBlur in="e2" stdDeviation="5" result="eb2"/><feFlood flood-color="${col}" flood-opacity=".38"/><feComposite in2="eb2" operator="in" result="k"/><feComposite in="k" in2="SourceAlpha" operator="in" result="ki"/>` +
      `<feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="ki"/><feMergeNode in="ri"/><feMergeNode in="ri"/></feMerge>`, 'x="-15%" y="-15%" width="130%" height="130%"');
    c.roccia = () => c.flt("roccia", `<feTurbulence type="fractalNoise" baseFrequency=".011 .028" numOctaves="5" seed="${seed % 97}" result="n"/><feDiffuseLighting in="n" surfaceScale="5" lighting-color="#ffffff" result="l"><feDistantLight azimuth="230" elevation="38"/></feDiffuseLighting><feComposite in="l" in2="SourceGraphic" operator="arithmetic" k1="1.25" k2="0" k3="0" k4="0" result="t"/><feComposite in="t" in2="SourceAlpha" operator="in"/>`, 'x="0" y="0" width="100%" height="100%"');
    c.intonaco = () => c.flt("intonaco", `<feTurbulence type="fractalNoise" baseFrequency=".35 .12" numOctaves="2" seed="${seed % 89}" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .5 -.12" result="m"/><feComposite in="m" in2="SourceAlpha" operator="in" result="ms"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="ms"/></feMerge>`, 'x="0" y="0" width="100%" height="100%"');
    c.onde = () => c.flt("onde", `<feTurbulence type="turbulence" baseFrequency=".004 .09" numOctaves="2" seed="${seed % 53}" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="22" xChannelSelector="R" yChannelSelector="G"/>`, 'x="-5%" y="-5%" width="110%" height="110%"');
    return c;
  }

  /* ---------- cielo, terra, luce ---------- */
  function cielo(c){
    const p = c.p, sk = c.lin(p.sky.map((col, i) => [(i / (p.sky.length - 1)).toFixed(2), col]));
    return R(0, 0, VW, HOR + 6, sk) + R(0, HOR, VW, VH - HOR, c.lin([[0, p.mid], [1, p.ink]]));
  }
  const EL = {};
  EL.luce = (c, o) => {
    const col = o.col || c.p.glow, r = o.r || 40;
    let e = C(o.x, o.y, r * (o.alone || 4.5), c.rad([[0, col, .8], [.2, col, .3], [1, col, 0]]));
    if(c.hd && (o.t === "sole" || o.t === "luna") && o.riflesso !== false) e += R(o.x - r * 7, o.y - r * .05, r * 14, r * .1, c.lin([[0, col, 0], [.5, col, .7], [1, col, 0]], 1, 0), null, ` filter="${c.sfoca(1.4)}"`) + R(o.x - r * 4, o.y - r * .3, r * 8, r * .6, c.lin([[0, col, 0], [.5, col, .14], [1, col, 0]], 1, 0), null, ` filter="${c.sfoca(4)}"`);
    if(o.t === "sole") e += C(o.x, o.y, r, c.rad([[0, "#fffbe8"], [.7, col], [1, col, .9]]));
    else if(o.t === "luna"){
      e += C(o.x, o.y, r, c.rad([[0, "#fbf8ee"], [1, "#d6d0bf"]], .4, .38, .7));
      [[-.32, -.18, .2], [.26, .3, .13], [.36, -.34, .1], [-.1, .38, .09], [.05, -.05, .07]].forEach(([dx, dy, k]) => e += C(o.x + dx * r, o.y + dy * r, k * r, "#bdb6a3", .5));
    }
    return e;
  };
  EL.alone = (c, o) => C(o.x, o.y, o.r, c.halo(o.col || c.p.glow, o.a));
  EL.foschia = (c, o) => { const y = o.y || HOR, h = o.h || 170, col = o.col || c.p.glow; return R(0, y - h, VW, h + 50, c.lin([[0, col, 0], [.75, col, o.a || .22], [1, col, (o.a || .22) * .5]])); };
  EL.terra = (c, o) => { const y = o.y || 740; return P(`M-10 ${y + (o.d || 0)}Q${VW * .5} ${y - (o.h || 18)} ${VW + 10} ${y + (o.d2 || 0)}V${VH}H-10Z`, o.col || c.col(o.z)); };

  /* ---------- città e luoghi ---------- */
  function palazzoHD(c, x, y0, bw, bh, col, o, z){
    const top = y0 - bh, lit = o.win || 0, wc = o.wc || c.p.acc, vicino = z >= 1 && bw > 26;
    let e = R(x, top, bw, bh + 6, c.lin([[0, mix(col, c.p.glow, .07)], [1, mix(col, wc, o.basso ? .16 : .03)]]));
    e += R(x - 2, top, bw + 4, 3, mix(col, c.p.glow, .18), .8);
    if(c.R() < .55){ const cx = x + c.rnd(4, bw - 10); e += R(cx, top - 10, 6, 10, col) + R(cx - 1.5, top - 12, 9, 3, col); }
    if(c.R() < .4){ const ax = x + c.rnd(6, bw - 6), ah = c.rnd(14, 34); e += L(ax, top, ax, top - ah, col, 1.4) + L(ax - 7, top - ah * .7, ax + 7, top - ah * .7, col, 1.2) + L(ax - 5, top - ah * .45, ax + 5, top - ah * .45, col, 1); }
    if(o.tetti && c.R() < .45) e += P(`M${f(x - 3)} ${f(top)}L${f(x + bw / 2)} ${f(top - c.rnd(10, 24))}L${f(x + bw + 3)} ${f(top)}Z`, col) + S(`M${f(x - 3)} ${f(top)}L${f(x + bw / 2)} ${f(top - 14)}`, mix(col, c.p.glow, .25), 1, .5);
    const fh = vicino ? 22 : 16, fw = vicino ? 14 : 11;
    for(let yy = top + 10; yy < y0 - fh; yy += fh){
      if(vicino) e += R(x, yy - 3, bw, 1.4, mix(col, c.p.glow, .14), .55);
      const balcone = vicino && c.R() < .28;
      for(let xx = x + 5; xx < x + bw - fw + 2; xx += fw){
        if(c.R() < .12) continue;
        const ww = vicino ? 7 : 5, wh = vicino ? 11 : 8, acceso = c.R() < lit;
        if(acceso){ e += R(xx, yy, ww, wh, c.lin([[0, "#fff4d0"], [1, wc]]), f(c.rnd(.65, 1))); if(vicino && c.R() < .3) e += R(xx + 1, yy + wh * .45, ww - 2, wh * .55, "#1a0e06", .6); }
        else e += R(xx, yy, ww, wh, mix(col, c.p.sky[c.p.sky.length - 1], .18), .55);
        if(vicino && c.R() < .45) e += R(xx - 3, yy - .5, 2.4, wh + 1, mix(col, "#2e5a3a", .5), .85) + R(xx + ww + .6, yy - .5, 2.4, wh + 1, mix(col, "#2e5a3a", .5), .85);
        if(balcone) e += R(xx - 3, yy + wh + 1, ww + 6, 1.4, mix(col, c.p.glow, .2), .7) + [0, 1, 2, 3].map(q => R(xx - 2 + q * (ww + 4) / 3, yy + wh - 4, .9, 5, mix(col, c.p.glow, .2), .6)).join("");
      }
    }
    return e;
  }
  EL.palazzi = (c, o) => {
    const y0 = o.y || HOR, col = o.col || c.col(o.z == null ? 1 : o.z), h = o.h || [80, 200], w = o.w || [30, 70], x1 = o.x1 == null ? VW + 20 : o.x1;
    let x = o.x0 == null ? -20 : o.x0, e = "", n = 0;
    if(c.hd){ while(x < x1){ const bw = c.rnd(w[0], w[1]), bh = c.rnd(h[0], h[1]); e += palazzoHD(c, x, y0, bw, bh, col, o, o.z == null ? 1 : o.z); x += bw + c.rnd(-3, 2); } return e; }
    while(x < x1){
      const bw = c.rnd(w[0], w[1]), bh = c.rnd(h[0], h[1]);
      e += R(x, y0 - bh, bw, bh + 6, col);
      if(o.tetti && c.R() < .45) e += P(`M${f(x - 3)} ${f(y0 - bh)}L${f(x + bw / 2)} ${f(y0 - bh - c.rnd(10, 24))}L${f(x + bw + 3)} ${f(y0 - bh)}Z`, col);
      if(o.ant && c.R() < .3) e += L(x + bw * .6, y0 - bh, x + bw * .6, y0 - bh - c.rnd(16, 40), col, 2);
      if(o.win) for(let yy = y0 - bh + 12; yy < y0 - 12; yy += 18) for(let xx = x + 6; xx < x + bw - 9; xx += 12) if(c.R() < o.win && n++ < (o.max || 80)) e += R(xx, yy, 5, 8, o.wc || c.p.acc, f(c.rnd(.35, .95)));
      x += bw + c.rnd(-3, 2);
    }
    return e;
  };
  EL.cupola = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z), d = o.dome || col;
    return G(o.x, o.y || HOR, o.s || 1,
      R(-62, -64, 124, 68, col) + R(-70, -70, 140, 8, col) +
      P("M-56 -70Q-56 -158 0 -168Q56 -158 56 -70Z", d) +
      (o.cost ? [-40, -20, 0, 20, 40].map(x => S(`M${x * 1.25} -70Q${x * .7} -146 0 -166`, c.p.glow, 2, .25)).join("") : "") +
      R(-9, -194, 18, 28, col) + P("M-11 -194Q0 -210 11 -194Z", col) + L(0, -210, 0, -228, col, 3) + L(-6, -221, 6, -221, col, 3));
  };
  EL.campanile = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z), t = o.t || "venezia";
    let e = R(-15, -280, 30, 284, col);
    if(t === "mangia"){
      e = R(-13, -300, 26, 304, col) + R(-19, -318, 38, 20, col) + [-17, -8, 1, 10].map(x => R(x, -326, 6, 9, col)).join("") + R(-8, -350, 16, 30, col) + P("M-11 -350L0 -368L11 -350Z", col) + L(0, -368, 0, -382, col, 2) + C(0, -306, 6, c.p.acc, .8);
      if(o.palazzo){
        e += R(-6, -150, 280, 154, col) + R(88, -190, 92, 44, col);
        for(let x = -4; x < 272; x += 15) e += R(x, -160, 9, 12, col);
        for(let x = 92; x < 178; x += 15) e += R(x, -200, 9, 12, col);
        for(let r = 0; r < 2; r++) for(let k = 0; k < 8; k++) e += P(`M${14 + k * 32} ${-46 - r * 54}V${-70 - r * 54}Q${22 + k * 32} ${-82 - r * 54} ${30 + k * 32} ${-70 - r * 54}V${-46 - r * 54}Z`, c.p.acc, r ? .35 : .55);
      }
    }
    else if(t === "ghirlandina") e += R(-13, -306, 26, 28, col) + P("M-13 -306L0 -392L13 -306Z", col) + [-13, 13].map(x => P(`M${x - 3} -306L${x} -326L${x + 3} -306Z`, col)).join("") + C(0, -292, 5, c.p.acc, .8);
    else if(t === "giotto") e = R(-17, -300, 34, 304, col) + R(-20, -306, 40, 8, col) + [-18, -9, 0, 9].map(x => R(x + 1, -314, 6, 8, col)).join("") + [-60, -130, -200].map(y => R(-6, y, 12, 30, c.p.acc, .35)).join("");
    else if(t === "chiesa") e = R(-12, -200, 24, 204, col) + R(-14, -222, 28, 24, col) + P("M-15 -222L0 -258L15 -222Z", col) + L(0, -258, 0, -272, col, 2) + L(-5, -266, 5, -266, col, 2) + R(-5, -214, 10, 14, c.p.acc, o.luce ? .9 : 0);
    else e += R(-18, -306, 36, 28, col) + P("M-18 -306L0 -372L18 -306Z", col) + R(-10, -300, 20, 16, c.p.acc, .55);
    return G(o.x, o.y || HOR, o.s || 1, e);
  };
  EL.pisa = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z), lt = c.p.far;
    let e = "";
    for(let k = 0; k < 7; k++){ const y = -k * 40; e += R(-34, y - 40, 68, 40, col) + R(-38, y - 42, 76, 5, col); for(let a = -26; a <= 26; a += 13) e += R(a - 3, y - 34, 6, 22, lt, .45); }
    e += R(-24, -322, 48, 42, col) + P("M-26 -322Q0 -336 26 -322Z", col);
    return G(o.x, o.y || HOR, o.s || 1, e, null, false, 5);
  };
  EL.torri = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z);
    return G(o.x, o.y || HOR, o.s || 1, R(-12, -340, 24, 344, col) + R(-15, -346, 30, 8, col) + R(-9, -358, 18, 12, col) + `<g transform="rotate(4 34 0)">${R(22, -190, 26, 194, col) + R(19, -196, 32, 8, col)}</g>` + R(-5, -300, 10, 14, c.p.acc, .7));
  };
  EL.torriMedievali = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z);
    let e = "";
    (o.t || [[90, 230], [170, 160], [250, 300], [330, 190], [420, 260], [510, 170]]).forEach(([x, h]) => {
      e += R(x - 15, HOR - h, 30, h + 4, col) + [-15, -5, 5].map(d => R(x + d, HOR - h - 9, 7, 10, col)).join("");
      for(let y = HOR - h + 24; y < HOR - 40; y += 46) e += R(x - 3, y, 6, 12, c.p.acc, c.R() < .35 ? .8 : .12);
    });
    return e;
  };
  EL.mole = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z);
    return G(o.x, o.y || HOR, o.s || 1, R(-52, -72, 104, 76, col) + [-40, -20, 0, 20, 40].map(x => R(x - 4, -96, 8, 26, col)).join("") + R(-56, -100, 112, 8, col) +
      P("M-48 -100Q-42 -210 0 -250Q42 -210 48 -100Z", col) + R(-13, -284, 26, 36, col) + P("M-7 -284L0 -430L7 -284Z", col) + C(0, -436, 4, c.p.acc));
  };
  EL.duomo = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z);
    let e = R(-130, -96, 260, 100, col) + P("M-66 -96L0 -150L66 -96Z", col);
    for(let i = -6; i <= 6; i++){ if(!i) continue; const x = i * 20, h = 36 + (Math.abs(i) % 3) * 14; e += R(x - 4, -96 - h * .5, 8, h * .5, col) + P(`M${x - 5} ${-96 - h * .5}L${x} ${-96 - h - 10}L${x + 5} ${-96 - h * .5}Z`, col); }
    e += R(-8, -250, 16, 110, col) + P("M-9 -250L0 -300L9 -250Z", col) + C(0, -306, 5, "#ffd56b") + C(0, -306, 14, "#ffd56b", .25);
    return G(o.x, o.y || HOR, o.s || 1, e);
  };
  EL.colosseo = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z), hole = o.neon || c.p.far, a = o.neon ? .9 : .55;
    let e = P("M-180 4L-180 -150Q-40 -176 120 -160L150 -128L170 -96L176 4Z", col);
    for(let t = 0; t < 3; t++) for(let k = 0; k < 9; k++){ const x = -165 + k * 34, y = -38 - t * 44; if(t === 2 && k > 7) continue; e += P(`M${x} ${y}V${y - 18}Q${x + 9} ${y - 30} ${x + 18} ${y - 18}V${y}Z`, hole, a); }
    if(o.neon) e += C(0, -80, 200, c.halo(o.neon, .25));
    return G(o.x, o.y || HOR, o.s || 1, e);
  };
  EL.vulcano = (c, o) => {
    const col = o.col || c.col(o.z == null ? 0 : o.z), x = o.x || 300, y = o.y || HOR, s = o.s || 1;
    let e = "";
    if(o.fumo !== false){
      if(c.hd){ const col = o.fumoCol || "#9a8a80"; e += P(`M${f(x - 40 * s)} ${f(y - 220 * s)}C${f(x - 90 * s)} ${f(y - 380 * s)} ${f(x - 40 * s)} ${f(y - 520 * s)} ${f(x + 80 * s)} ${f(y - 600 * s)}C${f(x + 220 * s)} ${f(y - 640 * s)} ${f(x + 260 * s)} ${f(y - 520 * s)} ${f(x + 160 * s)} ${f(y - 440 * s)}C${f(x + 90 * s)} ${f(y - 380 * s)} ${f(x + 70 * s)} ${f(y - 300 * s)} ${f(x + 40 * s)} ${f(y - 220 * s)}Z`, c.lin([[0, col, .85], [1, col, .55]]), null, ` filter="${c.rumore("fumoV", ".01 .018", 4, 5, 2.6, -.7)}"`); }
      else { const g = c.halo(o.fumoCol || "#9a8a80", .42); for(let k = 0; k < 8; k++) e += C(x + (k * 20 - 30) * s + c.rnd(-10, 10), y - (236 + k * 36) * s, (46 + k * 16) * s, g); } }
    e += P(`M${x - 330 * s} ${y + 4}L${x - 70 * s} ${y - 210 * s}Q${x - 40 * s} ${y - 222 * s} ${x - 24 * s} ${y - 214 * s}L${x + 20 * s} ${y - 216 * s}Q${x + 44 * s} ${y - 222 * s} ${x + 72 * s} ${y - 206 * s}L${x + 340 * s} ${y + 4}Z`, c.hd ? c.lin([[0, mix(col, c.p.glow, .22)], [1, col]]) : col, null, c.hd ? ` filter="${c.roccia()}"` : "");
    if(o.lava){ const cy = y - 214 * s; e += C(x, cy, 100 * s, c.halo("#ff8a3a", .65)) + E(x, cy + 2 * s, 46 * s, 7 * s, "#ffb04a", .95);
      [[-1, 150, 128], [-1, 70, 150], [1, 120, 104], [1, 46, 170]].forEach(([d, dx, dy]) => { const p = `M${f(x + d * 34 * s)} ${f(cy + 4 * s)}Q${f(x + d * (34 + dx * .35) * s)} ${f(cy + dy * .5 * s)} ${f(x + d * (34 + dx) * s)} ${f(cy + dy * s)}`; e += S(p, "#ff7a2a", f(9 * s), .22) + S(p, "#ff6a1a", f(3 * s), .9); }); }
    if(o.cristalli){ const cy = y - 214 * s; e += C(x, cy, 110 * s, c.halo(c.p.acc, .7)); [[-26, 0, -20, 46], [-8, -4, -6, 64], [10, -2, 12, 54], [26, 2, 26, 38], [-40, 4, -34, 28]].forEach(([dx, dy, tx, h]) => e += P(`M${f(x + (dx - 7) * s)} ${f(cy + dy * s)}L${f(x + tx * s)} ${f(cy - h * s)}L${f(x + (dx + 7) * s)} ${f(cy + dy * s)}Z`, c.p.acc, .9)); }
    return e;
  };
  EL.colline = (c, o) => {
    const y = o.y || HOR, cols = o.cols || [c.p.far, c.p.mid, c.p.ink];
    let e = "";
    cols.forEach((col, i) => {
      const base = y - 70 + i * 38, amp = (o.amp || 40) - i * 8;
      let d = `M-10 ${VH}L-10 ${base}`;
      for(let x = -10; x <= VW + 60; x += 120) d += ` Q${x + 60} ${f(base - amp * (c.R() + .3))} ${x + 120} ${f(base + c.rnd(-8, 10))}`;
      e += P(d + ` L${VW + 60} ${VH}Z`, col);
      if(o.cipressi && i === 1) for(let k = 0; k < 7; k++){ const cx = c.rnd(20, 580), cy = base + c.rnd(-6, 12); e += E(cx, cy - 30, 7, 34, cols[2]) + E(cx + 16, cy - 22, 6, 26, cols[2]); }
      if(o.vigne && i === 2) for(let k = 0; k < 11; k++) e += S(`M${-60 + k * 18} ${VH}Q${100 + k * 40} ${base + 70} ${300 + k * 40} ${base + 26}`, cols[1], 3, .8);
    });
    return e;
  };
  EL.cascina = (c, o) => {
    const col = o.col || c.col(1);
    return G(o.x, o.y || HOR, o.s || 1, R(-70, -60, 140, 64, col) + P("M-78 -60L0 -104L78 -60Z", col) + R(40, -96, 30, 40, col) + P("M36 -96L55 -114L74 -96Z", col) + R(-40, -42, 14, 18, c.p.acc, .8) + R(10, -42, 14, 18, c.p.acc, .6));
  };
  EL.masseria = (c, o) => {
    const col = o.col || "#e4d6c4";
    return G(o.x, o.y || HOR, o.s || 1, R(-120, -92, 240, 96, col) + R(-54, -150, 108, 62, col) + R(-128, -98, 256, 8, col) + R(-60, -156, 120, 8, col) +
      [-86, -46, 46, 86].map(x => P(`M${x - 13} 4V-36Q${x} -54 ${x + 13} -36V4Z`, "#2a1a10", .85)).join("") + R(-22, -132, 14, 20, "#2a1a10", .7) + R(10, -132, 14, 20, c.p.acc, .85) + R(-120, -92, 240, 96, c.lin([[0, "#000", 0], [1, "#000", .35]])));
  };
  function alberoHD(c, t, x, yy, h, col, o){
    const luce = mix(col, c.p.glow, .32), med = mix(col, c.p.glow, .12);
    let e = "";
    if(t === "pino"){
      e += R(x - 2.5, yy - h * .2, 5, h * .22, col);
      for(let k = 0; k < 5; k++){
        const tt = k / 5, w = h * (.12 + tt * .26), yTop = yy - h + tt * h * .72, yB = yTop + h * .3;
        let d = `M${f(x)} ${f(yTop)}`;
        for(let q = 0; q <= 6; q++){ const px = x + w * (q / 3 - 1), py = yB + (q % 2 ? -h * .03 : 0); d += `L${f(px)} ${f(py)}`; }
        e += P(d + "Z", col) + S(`M${f(x)} ${f(yTop)}L${f(x + w)} ${f(yB)}`, luce, 1.2, .55);
      }
    } else if(t === "cipresso"){
      e += P(`M${f(x)} ${f(yy - h)}C${f(x + h * .1)} ${f(yy - h * .8)} ${f(x + h * .11)} ${f(yy - h * .3)} ${f(x + h * .05)} ${f(yy)}H${f(x - h * .05)}C${f(x - h * .11)} ${f(yy - h * .3)} ${f(x - h * .1)} ${f(yy - h * .8)} ${f(x)} ${f(yy - h)}Z`, c.linU([[0, med], [1, col]], x + h * .1, 0, x - h * .1, 0));
      for(let q = 0; q < 6; q++) e += S(`M${f(x + c.rnd(-h * .05, h * .05))} ${f(yy - h * c.rnd(.2, .9))}q${f(h * .03)} ${f(h * .06)} ${f(h * .01)} ${f(h * .12)}`, luce, 1, .35);
    } else if(t === "pioppo"){
      e += E(x, yy - h * .55, h * .1, h * .48, c.linU([[0, med], [1, col]], x + h * .1, 0, x - h * .1, 0)) + R(x - 2, yy - h * .1, 4, h * .12, col);
    } else if(t === "palma"){ e += palmaHD(c, x, yy, h / 230, col, o.dir || (x < 300 ? 1 : -1)); }
    else {
      // chiome a ciuffi: ulivo, agrumi, tondo
      const tr = t === "ulivo" ? .07 : .05;
      e += S(`M${f(x)} ${f(yy)}q${f(c.rnd(-10, 10))} ${f(-h * .3)} ${f(c.rnd(-14, 14))} ${f(-h * .48)}`, col, f(h * tr));
      if(t === "ulivo") e += S(`M${f(x)} ${f(yy - h * .3)}q${f(-h * .12)} ${f(-h * .08)} ${f(-h * .2)} ${f(-h * .2)}M${f(x)} ${f(yy - h * .34)}q${f(h * .12)} ${f(-h * .06)} ${f(h * .18)} ${f(-h * .2)}`, col, f(h * .035));
      const foglia = t === "ulivo" ? mix(o.foglie || col, "#9aa88a", .18) : (o.foglie || col), cc = [[-.2, .56, .2], [.17, .58, .22], [0, .74, .21], [-.32, .45, .14], [.3, .47, .15], [.08, .86, .14]];
      const g = c.rad([[0, mix(foglia, c.p.glow, .22)], [.6, foglia], [1, mix(foglia, "#000", .3)]], .35, .3, .75);
      cc.forEach(([dx, dy, r]) => e += C(x + dx * h, yy - dy * h, r * h, g));
      for(let q = 0; q < 14; q++){ const a = c.rnd(0, 6.3), rr = c.rnd(.05, .3) * h; e += C(x + Math.cos(a) * rr, yy - h * .62 + Math.sin(a) * rr * .7, c.rnd(.02, .045) * h, q % 3 ? mix(foglia, c.p.glow, .3) : mix(foglia, "#000", .35), .7); }
      if(t === "agrumi") for(let q = 0; q < 7; q++) e += C(x + c.rnd(-h * .25, h * .25), yy - h * .6 + c.rnd(-h * .2, h * .2), h * .045, c.rad([[0, "#ffd27a"], [1, o.frutti || "#e8741a"]], .35, .3, .7));
    }
    return e;
  }
  function palmaHD(c, x, y, s, col, dr){
    const tx = x + dr * 26 * s, ty = y - 220 * s, luce = mix(col, c.p.glow, .3);
    let e = S(`M${x} ${y}Q${x + dr * 10} ${f(y - 120 * s)} ${f(tx)} ${f(ty)}`, col, f(9 * s));
    for(let k = 1; k < 12; k++){ const t = k / 12, px = (1 - t) * (1 - t) * x + 2 * t * (1 - t) * (x + dr * 10) + t * t * tx, py = (1 - t) * (1 - t) * y + 2 * t * (1 - t) * (y - 120 * s) + t * t * ty; e += S(`M${f(px - 5 * s)} ${f(py)}q${f(5 * s)} ${f(3 * s)} ${f(10 * s)} 0`, luce, f(1.2 * s), .5); }
    [[-1, .2], [-.75, -.32], [-.2, -.5], [.3, -.45], [.8, -.3], [1, .22], [-.4, .5], [.45, .48]].forEach(([fx, fy]) => {
      const ex = tx + fx * 112 * s, ey = ty + (fy + .4) * 62 * s, cx = tx + fx * 60 * s, cy = ty + (fy - .6) * 70 * s;
      e += S(`M${f(tx)} ${f(ty)}Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}`, col, f(3 * s));
      for(let k = 1; k <= 9; k++){ const t = k / 10, px = (1 - t) * (1 - t) * tx + 2 * t * (1 - t) * cx + t * t * ex, py = (1 - t) * (1 - t) * ty + 2 * t * (1 - t) * cy + t * t * ey, l = (1 - t * .7) * 26 * s, ang = Math.atan2(ey - cy, ex - cx);
        [1, -1].forEach(sd => { const a2 = ang + sd * 1.2 + .5; e += L(px, py, px + Math.cos(a2) * l, py + Math.abs(Math.sin(a2)) * l * .9 + 4 * s, col, f(2.2 * s)); }); }
    });
    return e;
  }
  EL.alberi = (c, o) => {
    const y = o.y || HOR, col = o.col || c.col(o.z == null ? 2 : o.z), n = o.n || 8, t = o.t || "pino";
    let e = "";
    if(c.hd){ for(let k = 0; k < n; k++){ const x = o.x1 != null ? o.x1 + (o.x2 - o.x1) * k / Math.max(1, n - 1) + c.rnd(-10, 10) : c.rnd(-20, 620), h = c.rnd(o.h ? o.h[0] : 90, o.h ? o.h[1] : 170), yy = y + c.rnd(-6, 8); e += alberoHD(c, t, x, yy, h, col, o); } return e; }
    for(let k = 0; k < n; k++){
      const x = o.x1 != null ? o.x1 + (o.x2 - o.x1) * k / Math.max(1, n - 1) + c.rnd(-10, 10) : c.rnd(-20, 620), h = c.rnd(o.h ? o.h[0] : 90, o.h ? o.h[1] : 170), yy = y + c.rnd(-6, 8);
      if(t === "pino") e += P(`M${f(x)} ${f(yy - h)}L${f(x - h * .22)} ${f(yy - h * .45)}L${f(x - h * .1)} ${f(yy - h * .45)}L${f(x - h * .3)} ${f(yy - h * .1)}L${f(x + h * .3)} ${f(yy - h * .1)}L${f(x + h * .1)} ${f(yy - h * .45)}L${f(x + h * .22)} ${f(yy - h * .45)}Z`, col) + R(x - 3, yy - h * .12, 6, h * .14, col);
      else if(t === "pioppo") e += E(x, yy - h * .55, h * .1, h * .48, col) + R(x - 2, yy - h * .1, 4, h * .12, col);
      else if(t === "ulivo") e += S(`M${f(x)} ${f(yy)}q${f(c.rnd(-10, 10))} ${f(-h * .3)} ${f(c.rnd(-16, 16))} ${f(-h * .45)}`, col, f(h * .07)) + C(x - h * .2, yy - h * .55, h * .2, col) + C(x + h * .17, yy - h * .58, h * .22, col) + C(x, yy - h * .74, h * .2, col);
      else if(t === "cipresso") e += E(x, yy - h * .5, h * .09, h * .5, col);
      else if(t === "agrumi") e += R(x - 3, yy - h * .3, 6, h * .3, col) + C(x, yy - h * .5, h * .3, o.foglie || col) + [0, 1, 2, 3, 4].map(() => C(x + c.rnd(-h * .22, h * .22), yy - h * .5 + c.rnd(-h * .2, h * .2), h * .045, o.frutti || "#ff9a1a", .95)).join("");
      else e += R(x - 4, yy - h * .4, 8, h * .4, col) + C(x, yy - h * .62, h * .32, col) + C(x - h * .2, yy - h * .5, h * .2, col) + C(x + h * .2, yy - h * .5, h * .2, col);
    }
    return e;
  };
  EL.montagne = (c, o) => {
    const y = o.y || HOR, cols = o.cols || [c.p.far, c.p.mid], x0 = o.x0 == null ? -40 : o.x0, x1 = o.x1 == null ? VW + 40 : o.x1;
    let e = "";
    cols.forEach((col, i) => {
      const base = y - i * 10, top = (o.alt || 330) - i * 90;
      let x = x0, d = `M${x0} ${base}`, pts = [];
      while(x < x1){ const px = x + c.rnd(50, 110), py = base - c.rnd(top * .45, top); pts.push([px, py]); d += ` L${f(px)} ${f(py)}`; x = px + c.rnd(40, 90); d += ` L${f(x)} ${f(base - c.rnd(top * .15, top * .4))}`; }
      e += P(d + ` L${x1} ${base + 4} L${x1} ${VH} L${x0} ${VH}Z`, i === 0 ? c.lin([[0, mix(col, c.p.glow, .3)], [.5, col], [1, col]]) : col, null, c.hd ? ` filter="${c.roccia()}"` : "");
      if(o.neve !== false && i === 0){ const g = c.lin([[0, o.nc || "#f4f8fb", .95], [1, o.nc || "#f4f8fb", .15]]); pts.forEach(([px, py]) => e += P(`M${f(px)} ${f(py)}L${f(px - 26)} ${f(py + 40)}L${f(px - 10)} ${f(py + 32)}L${f(px)} ${f(py + 46)}L${f(px + 12)} ${f(py + 30)}L${f(px + 28)} ${f(py + 42)}Z`, g)); }
    });
    return e;
  };
  EL.cresta = (c, o) => {
    const col = o.col || c.col(2), x = o.x || 380, y = o.y || 560;
    let d = `M-20 ${VH}L-20 ${f(y + 230)}`;
    for(let k = 1; k <= 6; k++) d += ` L${f(-20 + (x + 20) * k / 6)} ${f(y + 230 - 230 * k / 6 + c.rnd(-14, 14))}`;
    d += ` L${f(x + 60)} ${f(y + 40)} L${f(VW + 20)} ${f(y + 190)} L${VW + 20} ${VH}Z`;
    return P(d, col) + S(`M-20 ${f(y + 230)}L${f(x)} ${f(y)}L${f(x + 60)} ${f(y + 40)}L${VW + 20} ${f(y + 190)}`, o.neve || "#eaf2f8", 3, .45);
  };
  EL.mare = (c, o) => {
    const y = o.y || HOR, x = o.lx == null ? 300 : o.lx, col = o.col || c.p.mid;
    let e = R(0, y, VW, VH - y, c.lin([[0, o.top || c.p.far], [1, col]]));
    if(c.rif){ e += `<g clip-path="${c.clip(R(0, y, VW, VH - y, "#000"))}" opacity="${o.ra || .4}"><g${c.hd ? ` filter="${c.onde()}"` : ""}><g transform="translate(0 ${2 * y}) scale(1 -1)">${c.rif}</g></g></g>` + R(0, y, VW, VH - y, c.lin([[0, col, .05], [1, col, .85]])); }
    for(let k = 0; k < 26; k++){ const yy = y + 6 + k * k * .55, w = 20 + k * 6; e += R(x - w / 2 + c.rnd(-30, 30), yy, w * c.rnd(.4, 1), 2 + k * .08, o.gc || c.p.glow, f((o.ga || .55) - k * .018)); }
    for(let k = 0; k < (o.onde ? 16 : 9); k++){ const yy = y + 26 + k * (o.onde ? 15 : 24); e += S(`M${f(c.rnd(-80, 0))} ${yy}q75 -${o.onde ? 9 : 5} 150 0t150 0t150 0t150 0t150 0`, "#ffffff", o.onde ? 1.6 : 1, o.onde ? .12 : .06); }
    return e;
  };
  EL.lago = (c, o) => EL.mare(c, Object.assign({ top:c.p.far, col:c.p.mid, ga:.4 }, o));
  EL.costiera = (c, o) => {
    const x0 = o.x || 0, col = c.col(1), cols = ["#f2d4a8", "#e9a982", "#f6e6c6", "#d98c6a", "#f0c878", "#e8b8a8"];
    if(c.hd){
      let e = P(`M${x0 - 40} ${HOR + 6}L${x0 - 40} 330Q${x0 + 120} 300 ${x0 + 220} 390Q${x0 + 300} 460 ${x0 + 360} ${HOR + 6}Z`, c.lin([[0, mix(col, "#2a4a2a", .5)], [1, col]]), null, ` filter="${c.roccia()}"`);
      for(let y = 344; y < HOR - 4; y += 13){
        const xmax = x0 + (y < 390 ? 150 + (y - 360) * 2.3 : 220 + .53 * (y - 390)) - 18;
        for(let px = x0 - 24 + c.rnd(0, 10); px < xmax; px += c.rnd(15, 24)){
          if(c.R() < .18){ e += C(px + 6, y + 4, c.rnd(5, 9), c.pick(["#2f5a2a", "#3a6a30", "#c8407a"]), .9); continue; }
          const w = c.rnd(12, 19), h = c.rnd(9, 13), base = c.pick(cols), yy = y + c.rnd(-2, 2);
          e += R(px, yy, w, h, base, .95) + R(px + w - 3.5, yy, 3.5, h, mix(base, "#3a2010", .35), .9) + R(px - 1, yy - 1.4, w + 2, 1.6, mix(base, "#ffffff", .3), .8);
          if(c.R() < .7) e += (c.R() < .4 ? P(`M${f(px + w * .3)} ${f(yy + h)}V${f(yy + h * .45)}Q${f(px + w * .42)} ${f(yy + h * .2)} ${f(px + w * .54)} ${f(yy + h * .45)}V${f(yy + h)}Z`, "#2a1a10", .75) : R(px + w * .35, yy + h * .3, 3, 4, c.R() < .35 ? c.p.acc : "#2a1a10", .85));
        }
      }
      e += G(x0 + 150, 476, .5, R(-62, -64, 124, 64, "#ece2cc") + R(-62, -64, 18, 64, "#c8b89a") + P("M-56 -64Q-56 -150 0 -160Q56 -150 56 -64Z", c.lin([[0, "#f6d55a"], [.5, "#3e9a6a"], [1, "#1e5a7a"]], 1, 0)) + [-36, -18, 0, 18, 36].map(q => S(`M${q} -64Q${q * .7} -128 0 -158`, "#f6e6a0", 3, .55)).join("") + R(-8, -176, 16, 18, "#f2e6c0") + P("M-10 -176Q0 -194 10 -176Z", "#e8c05a") + L(0, -194, 0, -208, "#2a2010", 2));
      e += G(x0 + 225, 452, .5, R(-14, -150, 28, 154, "#e6dcc6") + R(-14, -150, 6, 154, "#c8b89a") + P("M-17 -150L0 -184L17 -150Z", "#c87a3a") + P("M-6 -128V-110Q0 -118 6 -110V-128Z", "#2a1a10"));
      return e;
    }
    let e = P(`M${x0 - 40} ${HOR + 6}L${x0 - 40} 330Q${x0 + 120} 300 ${x0 + 220} 390Q${x0 + 300} 460 ${x0 + 360} ${HOR + 6}Z`, col);
    for(let y = 352; y < HOR - 6; y += 15){ const xmax = x0 + (y < 390 ? 150 + (y - 360) * 2.3 : 220 + .53 * (y - 390)) - 22; for(let px = x0 - 20 + c.rnd(0, 14); px < xmax; px += c.rnd(20, 30)){ if(c.R() < .3) continue; const w = c.rnd(13, 21), h = c.rnd(10, 14); e += R(px, y + c.rnd(-2, 2), w, h, c.pick(cols), f(c.rnd(.62, .92))); if(c.R() < .55) e += R(px + w * .4, y + h * .35, 3, 4, c.R() < .3 ? c.p.acc : "#1a1410", .8); } }
    e += G(x0 + 150, 476, .5, R(-62, -64, 124, 64, "#e6dcc4") + P("M-56 -64Q-56 -150 0 -160Q56 -150 56 -64Z", c.lin([[0, "#f6d55a"], [.5, "#3e9a6a"], [1, "#2a6a8a"]], 1, 0)) + S("M-56 -64Q-56 -150 0 -160Q56 -150 56 -64", "#1a3a3a", 4, .5));
    return e;
  };
  EL.villa = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z), lit = o.luci;
    if(c.hd){
      const luce = mix(col, c.p.glow, .2), fac = c.lin([[0, mix(col, c.p.glow, .12)], [1, col]]);
      let e = R(-130, -118, 260, 122, fac) + R(-136, -122, 272, 8, luce, .7) + R(-136, -62, 272, 4, luce, .5);
      for(let k = -3; k <= 3; k++){ [-96, -52].forEach((wy, r) => { const on = (lit && c.R() < .6) || (o.una && k === 0 && r === 0); e += R(k * 34 - 9, wy, 18, 30, on ? c.lin([[0, "#fff2c8"], [1, c.p.acc]]) : mix(col, c.p.sky[c.p.sky.length - 1], .15), on ? .95 : .7) + R(k * 34 - 11, wy - 3, 22, 3, luce, .6) + P(`M${k * 34 - 11} ${wy - 3}Q${k * 34} ${wy - 12} ${k * 34 + 11} ${wy - 3}Z`, luce, .5); if(r === 1) e += R(k * 34 - 13, wy + 30, 26, 2, luce, .7); }); }
      e += R(-46, -206, 92, 92, fac) + R(-50, -210, 100, 6, luce, .8) + P("M-54 -210L0 -246L54 -210Z", col) + S("M-54 -210L0 -246", luce, 1.6, .6);
      [-24, 0, 24].map(q => e += P(`M${q - 8} -142V-176Q${q} -188 ${q + 8} -176V-142Z`, o.una || lit ? c.lin([[0, "#fff2c8"], [1, c.p.acc]]) : mix(col, c.p.sky[2], .2), o.una || lit ? .95 : .7));
      if(o.una) e += C(0, -160, 90, c.halo(c.p.acc, .45));
      e += R(-150, 2, 300, 6, luce, .8);
      for(let k = -14; k <= 14; k++) e += R(k * 10 - 2, -12, 4, 14, luce, .55);
      if(o.piscina) e += P("M-110 30L110 30L140 60L-140 60Z", c.lin([[0, "#7ff0ff"], [1, "#1a8aa8"]]), .85) + C(0, 46, 120, c.halo("#7ff0ff", .35));
      if(o.palme) e += palmaHD(c, -170, 0, .9, col, 1) + palmaHD(c, 170, 0, .9, col, -1);
      return G(o.x, o.y || HOR, o.s || 1, e);
    }
    let e = R(-120, -110, 240, 114, col) + R(-40, -190, 80, 84, col) + P("M-50 -190L0 -232L50 -190Z", col) + R(-130, -116, 260, 8, col);
    for(let k = -3; k <= 3; k++) e += R(k * 32 - 7, -88, 14, 26, lit ? c.p.acc : c.p.far, lit && c.R() < .55 ? .9 : .3) + R(k * 32 - 7, -44, 14, 26, lit ? c.p.acc : c.p.far, lit && c.R() < .4 ? .85 : .25);
    e += R(-9, -170, 18, 26, c.p.acc, o.una || lit ? .95 : .3);
    if(o.una) e += C(0, -157, 60, c.halo(c.p.acc, .5));
    if(o.palme) e += c.hd ? palmaHD(c, -170, 0, .9, col, 1) + palmaHD(c, 170, 0, .9, col, -1) : palma(-170, 0, .9, col, 1) + palma(170, 0, .9, col, -1);
    return G(o.x, o.y || HOR, o.s || 1, e);
  };
  EL.promontorio = (c, o) => {
    const col = c.col(o.z == null ? 2 : o.z), y = o.y || 430, x = o.x == null ? 150 : o.x;
    return P(`M${VW + 20} ${HOR + 30}L${x} ${HOR + 30}Q${x + 40} ${HOR - 40} ${x + 120} ${y + 70}Q${x + 160} ${y + 10} ${x + 220} ${y}L${VW + 20} ${y - 10}Z`, col);
  };
  function palma(x, y, s, col, dr){
    let e = S(`M${x} ${y}Q${x + dr * 10} ${y - 120 * s} ${x + dr * 26} ${y - 220 * s}`, col, 9 * s);
    const tx = x + dr * 26, ty = y - 220 * s;
    [[-1, .2], [-.7, -.3], [0, -.4], [.7, -.3], [1, .2], [-.3, .5], [.4, .45]].forEach(([fx, fy]) => e += S(`M${tx} ${ty}Q${f(tx + fx * 60 * s)} ${f(ty + (fy - .6) * 70 * s)} ${f(tx + fx * 110 * s)} ${f(ty + (fy + .4) * 60 * s)}`, col, 7 * s));
    return e;
  }
  EL.palme = (c, o) => (o.xs || [60, 540]).map((x, i) => c.hd ? palmaHD(c, x, o.y || HOR + 20, o.s || 1, o.col || c.col(2), i % 2 ? -1 : 1) : palma(x, o.y || HOR + 20, o.s || 1, o.col || c.col(2), i % 2 ? -1 : 1)).join("");
  EL.faro = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z), t = o.t;
    let e = "", top = -232;
    if(t === "vittoria"){ top = -300; e += R(-40, -40, 80, 44, col) + P("M-16 -40L-11 -280H11L16 -40Z", col) + R(-20, -300, 40, 22, col) + P("M-8 -300L-4 -330H4L8 -300Z", col) + C(0, -338, 7, col) + P("M2 -334L18 -356L6 -330Z", col); }
    else if(t === "lanterna"){ top = -330; e += R(-26, -170, 52, 174, col) + R(-30, -176, 60, 8, col) + R(-20, -300, 40, 126, col) + R(-24, -306, 48, 8, col) + R(-12, -330, 24, 26, c.p.glow) + P("M-14 -330L0 -346L14 -330Z", col); top = -318; }
    else e += P("M-22 4L-14 -210H14L22 4Z", col) + R(-20, -236, 40, 26, col) + C(0, -224, 9, c.p.glow) + P("M-22 -236L0 -258L22 -236Z", col) + R(-30, -212, 60, 6, col);
    if(o.raggio !== false) e = P(`M0 ${top}L-460 ${top - 80}L-460 ${top + 60}Z`, c.lin([[0, c.p.glow, .55], [1, c.p.glow, 0]], 1, 0)) + P(`M0 ${top}L300 ${top - 40}L300 ${top + 30}Z`, c.lin([[0, c.p.glow, 0], [1, c.p.glow, .3]], 1, 0)) + C(0, top, 26, c.halo(c.p.glow, .9)) + e;
    return G(o.x, o.y || HOR, o.s || 1, e, null, o.flip);
  };
  EL.nave = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z), lt = c.p.acc;
    if(c.hd){
      const bianco = mix("#e8ecf0", col, .45);
      let e = C(0, -100, 320, c.halo(lt, .16)) + P("M-270 0L-250 -50H262L284 -30L250 0Z", c.lin([[0, mix(col, c.p.glow, .1)], [1, col]])) + R(-250, -50, 512, 4, "#c8241e", .8);
      for(let k = 0; k < 6; k++){ const w = 230 - k * 24, y = -74 - k * 22; e += R(-w + 10, y, w * 2 - 30, 22, c.lin([[0, mix(bianco, c.p.glow, .15)], [1, bianco]])); for(let x = -w + 18; x < w - 30; x += 9) e += R(x, y + 6, 5, 7, c.R() < .62 ? lt : "#1a2028", c.R() < .62 ? f(c.rnd(.6, 1)) : .8); if(k < 3) for(let x = -w + 30; x < w - 50; x += 46) e += E(x, y + 24, 14, 5, "#e8701a", .9); }
      e += P("M50 -206L58 -246H110L116 -206Z", bianco) + R(56, -236, 56, 8, "#1a3a6a") + C(84, -258, 30, "#8a8a8a", .25);
      return G(o.x, o.y || HOR, o.s || 1, e, null, o.flip);
    }
    let e = P("M-260 0L-240 -46H250L270 -30L240 0Z", col);
    for(let k = 0; k < 5; k++){ const w = 220 - k * 26; e += R(-w + 10, -70 - k * 22, w * 2 - 30, 22, col); for(let x = -w + 20; x < w - 30; x += 14) if(c.R() < .55) e += R(x, -62 - k * 22, 6, 6, lt, f(c.rnd(.5, .95))); }
    e += P("M60 -180L70 -214H104L110 -180Z", col) + R(-240, -40, 480, 3, lt, .5) + C(0, -100, 300, c.halo(lt, .12));
    return G(o.x, o.y || HOR, o.s || 1, e, null, o.flip);
  };
  EL.piroscafo = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z);
    let e = P("M-150 0L-136 -40H140L156 -22L138 0Z", col) + R(-24, -110, 22, 72, col) + E(-13, -54, 34, 30, col) + L(-80, -40, -80, -190, col, 5) + L(70, -40, 70, -170, col, 5) + L(-120, -150, -40, -150, col, 3) + L(30, -130, 110, -130, col, 3) + S("M-80 -190L-150 -40M70 -170L150 -40", col, 1.2, .7);
    for(let k = 0; k < 5; k++) e += C(-13 + k * 16, -126 - k * 26, 16 + k * 7, "#8a8070", f(.22 - k * .035));
    return G(o.x, o.y || HOR, o.s || 1, e, null, o.flip);
  };
  EL.portacontainer = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z), cont = ["#a8452e", "#2f6f8f", "#c08a2a", "#4a7a3a", "#7a3a5a", "#3a4a8a"];
    let e = P("M-300 -50H280L310 -20L290 6H-286Z", col) + R(-290, -150, 60, 100, col) + R(-280, -176, 40, 30, col);
    for(let r = 0; r < 4; r++) for(let k = 0; k < 15; k++){ if(r === 3 && c.R() < .5) continue; e += R(-220 + k * 33, -76 - r * 22, 31, 21, cont[(k * 3 + r) % 6], f(.75 - r * .08)); }
    return G(o.x, o.y || HOR, o.s || 1, e);
  };
  EL.gru = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z), cont = ["#a8452e", "#2f6f8f", "#c08a2a", "#4a7a3a", "#7a3a5a", "#3a4a8a"];
    let e = "";
    (o.xs || [130, 420]).forEach((x, i) => {
      e += L(x - 40, HOR, x - 30, HOR - 220, col, 8) + L(x + 40, HOR, x + 30, HOR - 220, col, 8) + L(x - 38, HOR - 110, x + 38, HOR - 110, col, 4) + R(x - 50, HOR - 236, 100, 18, col) + R(x - 170 + i * 30, HOR - 252, 290, 10, col) + L(x - 30, HOR - 230, x + 120, HOR - 252, col, 3) + L(x - 130, HOR - 247, x - 130, HOR - 160, col, 2) + R(x - 146, HOR - 162, 32, 16, cont[i]) + C(x + 110, HOR - 258, 4, "#ff4a3a");
    });
    for(let k = 0; k < 26; k++){ const x = c.rnd(-10, 590), lv = Math.floor(c.rnd(0, 4)); e += R(x, HOR - 18 - lv * 18, 52, 18, cont[k % cont.length], .9) + R(x, HOR - 18 - lv * 18, 52, 2, "#000", .25); }
    return e;
  };
  EL.carcere = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z), y = o.y || HOR, top = y - (o.h || 190), tx = o.tx || 470;
    let e = "";
    if(o.faro !== false) e += P(`M${tx} ${top - 90}L${tx - 340} ${top - 280}L${tx - 250} ${top - 350}Z`, c.lin([[0, c.p.glow, .5], [1, c.p.glow, 0]], 1, 0));
    e += R(-10, top, VW + 20, y - top + 6, col);
    for(let x = 20; x < VW; x += 90){ e += R(x, top + 50, 34, 46, "#000", .55); for(let b = 0; b < 4; b++) e += R(x + 4 + b * 8, top + 50, 2.4, 46, c.p.far, .9); }
    e += S(`M-10 ${top - 4}` + Array.from({ length:30 }, (_, i) => ` l10 ${i % 2 ? 6 : -6} l10 ${i % 2 ? -6 : 6}`).join(""), col, 2);
    e += R(tx - 24, top - 90, 48, 94, col) + R(tx - 36, top - 106, 72, 18, col) + P(`M${tx - 40} ${top - 106}L${tx} ${top - 140}L${tx + 40} ${top - 106}Z`, col) + C(tx, top - 96, 7, c.p.glow) + C(tx, top - 96, 40, c.halo(c.p.glow, .6));
    return e;
  };
  EL.sbarre = (c, o) => {
    const n = o.n || 6, x0 = o.x0 == null ? 40 : o.x0, x1 = o.x1 == null ? 560 : o.x1, y0 = o.y0 || 0, y1 = o.y1 || VH, g = c.lin([[0, "#050505"], [.35, "#5a5a5a"], [.55, "#8a8a8a"], [1, "#0a0a0a"]], 1, 0);
    let e = "";
    for(let k = 0; k < n; k++){ const x = x0 + (x1 - x0) * k / (n - 1); e += R(x - 10, y0, 20, y1 - y0, g, o.a || .95); }
    (o.trav || [300]).forEach(y => e += R(x0 - 30, y, x1 - x0 + 60, 18, c.lin([[0, "#6a6a6a"], [1, "#0a0a0a"]]), o.a || .95));
    return e;
  };
  EL.trincea = (c, o) => {
    const y = o.y || 720, col = c.col(2);
    let d = `M0 ${VH}L0 ${y}`;
    for(let x = 0; x <= VW; x += 40) d += ` L${x} ${f(y - c.rnd(0, 26))}`;
    let e = P(d + ` L${VW} ${VH}Z`, col);
    const wy = y - 30;
    let wp = `M0 ${wy}`;
    for(let x = 0; x < VW; x += 30) wp += ` Q${x + 15} ${wy + (c.R() < .5 ? -6 : 6)} ${x + 30} ${wy}`;
    e += S(wp, "#b9a37a", 1.6, .55);
    for(let x = 15; x < VW; x += 30) e += S(`M${x - 4} ${wy - 4}l8 8M${x + 4} ${wy - 4}l-8 8`, "#b9a37a", 1.3, .55);
    for(let x = c.rnd(10, 60); x < VW; x += c.rnd(80, 140)) e += R(x, wy - 50, 5, 80, col, null, ` transform="rotate(${f(c.rnd(-15, 15))} ${f(x)} ${wy})"`);
    return e;
  };
  EL.rovine = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z), y0 = o.y || HOR;
    let x = -20, e = "";
    while(x < VW){
      const bw = c.rnd(60, 120), bh = c.rnd(o.h ? o.h[0] : 120, o.h ? o.h[1] : 300), top = y0 - bh;
      let d = `M${f(x)} ${y0}L${f(x)} ${f(top)}`;
      for(let k = 1; k <= 4; k++) d += ` L${f(x + bw * k / 4)} ${f(top + c.rnd(-10, 60))}`;
      e += P(d + ` L${f(x + bw)} ${y0}Z`, col);
      for(let yy = top + 30; yy < y0 - 30; yy += 34) for(let xx = x + 10; xx < x + bw - 16; xx += 24) if(c.R() < .45){ const fuoco = c.R() < .3; e += R(xx, yy, 12, 18, fuoco ? "#ff8a3a" : c.p.far, fuoco ? .8 : .7); }
      x += bw + c.rnd(4, 30);
    }
    return e;
  };
  EL.pontecoperto = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z), y = o.y || HOR;
    let e = R(-10, y - 70, VW + 20, 16, col) + P(`M-10 ${y - 70}L-10 ${y - 112}Q300 ${y - 134} 610 ${y - 112}L610 ${y - 70}Z`, col);
    for(let k = 0; k < 6; k++){ const x = 20 + k * 110; e += P(`M${x} ${y + 10}L${x} ${y - 30}Q${x + 45} ${y - 66} ${x + 90} ${y - 30}L${x + 90} ${y + 10}Z`, c.p.far, .85) + R(x + 90, y - 60, 20, 70, col); }
    for(let x = 10; x < VW; x += 26) e += R(x, y - 104, 12, 22, c.p.acc, c.R() < .3 ? .55 : .08);
    e += R(270, y - 172, 60, 62, col) + P(`M262 ${y - 172}L300 ${y - 204}L338 ${y - 172}Z`, col) + L(300, y - 204, 300, y - 224, col, 3);
    return e;
  };
  EL.zeppelin = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z);
    return G(o.x, o.y, o.s || 1, E(0, 0, 150, 40, col) + P("M110 -10L170 -52L176 -40L136 0Z", col) + P("M110 10L170 52L176 40L136 0Z", col) + R(-30, 34, 60, 14, col) + S("M-140 0H140M-120 -22H120M-120 22H120", c.p.glow, 1.4, .18) + [-20, -6, 8, 22].map(x => R(x - 3, 38, 5, 5, c.p.acc, .8)).join(""), null, o.flip);
  };
  EL.castello8 = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z);
    let e = P("M-300 70Q0 -30 300 70Z", c.col(2)) + R(-120, -110, 240, 120, col);
    [-120, -60, 0, 60, 120].forEach(x => e += R(x - 17, -142, 34, 150, col) + R(x - 4, -110, 8, 14, c.p.acc, .5));
    e += P("M-14 10V-40Q0 -56 14 -40V10Z", c.p.acc, .6);
    return G(o.x, o.y || HOR - 20, o.s || 1, e);
  };
  EL.castello = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z);
    let e = (o.rupe ? P("M-260 10Q-180 -40 -120 -60L120 -60Q180 -40 260 10Z", col) : "") + R(-110, -110, 220, 114, col);
    [[-110, 170], [-40, 230], [40, 200], [110, 160]].forEach(([x, h]) => e += R(x - 18, -h, 36, h, col) + P(`M${x - 24} ${-h}L${x} ${-h - 56}L${x + 24} ${-h}Z`, col) + L(x, -h - 56, x, -h - 80, col, 2) + P(`M${x} ${-h - 80}l18 6l-18 6Z`, col) + R(x - 4, -h + 30, 8, 12, c.p.acc, .8));
    for(let x = -100; x < 100; x += 16) e += R(x, -122, 9, 12, col);
    return G(o.x, o.y || HOR, o.s || 1, e);
  };
  EL.borgo = (c, o) => {
    const col = c.col(1), x0 = o.x || 300;
    let e = P(`M-20 ${HOR + 6}L-20 ${HOR - 60}Q${x0 - 100} ${HOR - 230} ${x0} ${HOR - 250}Q${x0 + 120} ${HOR - 230} 620 ${HOR - 70}L620 ${HOR + 6}Z`, c.col(2));
    for(let k = 0; k < 36; k++){ const px = x0 + c.rnd(-200, 200), py = HOR - 230 + Math.abs(px - x0) * .55 + c.rnd(0, 120), w = c.rnd(18, 34), h = c.rnd(16, 30); e += R(px, py, w, h, col) + P(`M${f(px - 2)} ${f(py)}L${f(px + w / 2)} ${f(py - 10)}L${f(px + w + 2)} ${f(py)}Z`, col); if(c.R() < (o.luci || .25)) e += R(px + w / 2 - 3, py + 6, 6, 7, c.p.acc, .95); }
    e += EL.campanile(c, { x:x0 + 20, y:HOR - 236, s:.6, t:"chiesa", z:1, luce:o.luci > .3 });
    return e;
  };
  EL.sassi = (c, o) => {
    const col = c.col(1);
    if(c.hd){
      let e = P(`M-20 ${HOR + 6}L-20 ${HOR - 120}Q300 ${HOR - 330} 620 ${HOR - 140}L620 ${HOR + 6}Z`, c.lin([[0, mix(c.col(2), "#8a6a4a", .35)], [1, c.col(2)]]), null, ` filter="${c.roccia()}"`);
      const tufo = ["#c8a47a", "#b8946a", "#d6b48a", "#a8845c"];
      for(let k = 0; k < 120; k++){
        const px = c.rnd(-10, 590), top = HOR - 318 + Math.abs(px - 300) * .55, py = c.rnd(top + 6, HOR - 8), w = c.rnd(14, 26), h = c.rnd(11, 20), sc = .35 + (py - top) / 500;
        const base = mix(c.pick(tufo), c.col(1), .55 + sc * .2);
        e += R(px, py, w, h, base) + R(px + w - 3, py, 3, h, mix(base, "#000", .35)) + R(px - 1, py - 1.2, w + 2, 1.4, mix(base, c.p.glow, .3), .7);
        const lit = c.R() < .3;
        e += P(`M${f(px + w * .34)} ${f(py + h)}V${f(py + h * .45)}Q${f(px + w * .5)} ${f(py + h * .2)} ${f(px + w * .66)} ${f(py + h * .45)}V${f(py + h)}Z`, lit ? c.lin([[0, "#fff0c0"], [1, c.p.acc]]) : "#120a06", lit ? .95 : .75);
        if(c.R() < .12) e += S(`M${f(px + w)} ${f(py + h)}l4 -3l4 0l4 -3l4 0`, mix(base, c.p.glow, .3), 1.2, .6);
      }
      e += EL.campanile(c, { x:310, y:HOR - 300, s:.6, t:"chiesa", z:1, luce:true });
      return e;
    }
    let e = P(`M-20 ${HOR + 6}L-20 ${HOR - 120}Q300 ${HOR - 330} 620 ${HOR - 140}L620 ${HOR + 6}Z`, c.col(2));
    for(let k = 0; k < 66; k++){ const px = c.rnd(-10, 590), top = HOR - 320 + Math.abs(px - 300) * .55, py = c.rnd(top + 10, HOR - 10), w = c.rnd(16, 30), h = c.rnd(14, 24); e += R(px, py, w, h, k % 3 ? col : c.p.far) + P(`M${f(px + w * .35)} ${f(py + h)}V${f(py + h * .45)}Q${f(px + w / 2)} ${f(py + h * .25)} ${f(px + w * .65)} ${f(py + h * .45)}V${f(py + h)}Z`, c.R() < .3 ? c.p.acc : "#000", .6); }
    e += EL.campanile(c, { x:310, y:HOR - 300, s:.55, t:"chiesa", z:1, luce:true });
    return e;
  };
  EL.cittaAlta = (c, o) => {
    const col = c.col(1);
    let e = P(`M-20 ${HOR + 6}L-20 ${HOR - 90}L40 ${HOR - 200}H560L620 ${HOR - 90}L620 ${HOR + 6}Z`, c.col(2)) + R(30, HOR - 214, 540, 18, col);
    const h0 = HOR;
    HOR = h0 - 206;
    e += EL.palazzi(c, { h:[30, 90], w:[24, 50], z:1, win:.25, tetti:true, x0:34, x1:560 });
    e += EL.campanile(c, { x:220, s:.55, t:"giotto" }) + EL.cupola(c, { x:350, y:HOR + 6, s:.55 }) + EL.campanile(c, { x:470, s:.42, t:"chiesa", luce:true });
    HOR = h0;
    return e;
  };
  EL.venezia = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z);
    let e = EL.campanile(c, { x:o.x || 420, s:o.s || .9, t:"venezia", z:o.z }) + EL.cupola(c, { x:240, s:.55, z:o.z }) + EL.cupola(c, { x:310, s:.42, z:o.z }) + EL.cupola(c, { x:170, s:.42, z:o.z });
    e += R(20, HOR - 110, 330, 112, col);
    for(let k = 0; k < 11; k++) e += P(`M${34 + k * 29} ${HOR - 20}V${HOR - 56}Q${46 + k * 29} ${HOR - 74} ${58 + k * 29} ${HOR - 56}V${HOR - 20}Z`, o.luci ? c.p.acc : c.p.far, o.luci ? .5 : .55) + C(46 + k * 29, HOR - 86, 6, c.p.far, .5);
    return e;
  };
  EL.futuro = (c, o) => {
    const neon = ["#5ee1ff", "#ff4fd8", "#ffd36b"];
    let e = "";
    for(let k = 0; k < 9; k++){
      const x = c.rnd(-20, 580), w = c.rnd(36, 70), h = c.rnd(240, 480), col = c.col(k % 2), top = HOR - h;
      e += R(x, top, w, h + 4, col) + P(`M${f(x)} ${f(top)}L${f(x + w / 2)} ${f(top - c.rnd(20, 70))}L${f(x + w)} ${f(top)}Z`, col);
      for(let yy = top + 20; yy < HOR - 10; yy += c.rnd(18, 40)) e += R(x + 4, yy, w - 8, 2, neon[k % 3], f(c.rnd(.3, .8)));
    }
    for(let k = 0; k < 8; k++){ const y = c.rnd(150, 420), x = c.rnd(0, 560); e += L(x, y, x + 40, y + 4, neon[k % 3], 2, .6) + C(x + 40, y + 4, 3, "#ffffff"); }
    return e;
  };
  EL.neon = (c, o) => {
    const A = c.p.acc, sx = o.x || 300, hy = HOR - 20, sr = 150, sy = hy - 70;
    let e = C(sx, sy, sr * 1.6, c.halo("#ff7a9a", .35)) + C(sx, sy, sr, c.lin([[0, "#ffe27a"], [.55, "#ff7a6a"], [1, "#ff2fa0"]]));
    for(let k = 0; k < 6; k++) e += R(sx - sr, sy + 12 + k * 22, sr * 2, 3 + k * 2.2, c.p.sky[2]);
    let x = 0;
    while(x < VW){ const bw = c.rnd(30, 70), bh = c.rnd(40, 170); e += R(x, hy - bh, bw, bh + 2, c.p.mid); for(let k = 0; k < 5; k++) if(c.R() < .6) e += R(x + c.rnd(4, bw - 8), hy - bh + c.rnd(8, bh - 6), 4, 3, c.R() < .5 ? A : "#ff4fd8", .9); x += bw + c.rnd(0, 4); }
    e += R(0, hy, VW, VH - hy, c.p.ink);
    for(let k = -9; k <= 9; k++) e += L(300, hy, 300 + k * 90, VH, "#ff4fd8", 1.6, .55);
    for(let k = 1; k < 9; k++){ const y = hy + (VH - hy) * Math.pow(k / 9, 1.8); e += L(0, y, VW, y, "#ff4fd8", 1.4, .45); }
    if(o.palme !== false) e += c.hd ? palmaHD(c, 40, VH - 40, 1.25, c.p.ink, 1) + palmaHD(c, 560, VH - 30, 1.15, c.p.ink, -1) : palma(40, VH - 40, 1.25, c.p.ink, 1) + palma(560, VH - 30, 1.15, c.p.ink, -1);
    return e;
  };
  EL.palude = (c, o) => {
    const col = c.col(2);
    let e = EL.mare(c, { y:HOR, top:c.p.far, col:c.p.mid, ga:.45 });
    for(let k = 0; k < 70; k++){ const x = c.rnd(-10, 610), h = c.rnd(40, 160), yy = HOR + c.rnd(-6, 70); e += S(`M${f(x)} ${f(yy)}q${f(c.rnd(-8, 8))} ${f(-h * .5)} ${f(c.rnd(-14, 14))} ${f(-h)}`, col, f(c.rnd(1.5, 3))); if(c.R() < .3) e += E(x + c.rnd(-6, 6), yy - h, 3, 10, col); }
    if(o.palafitta !== false) e += G(o.px || 140, HOR + 10, .9, R(-60, -100, 120, 64, col) + P("M-70 -100L0 -140L70 -100Z", col) + [-50, -20, 20, 50].map(x => R(x, -40, 5, 60, col)).join("") + R(-14, -86, 20, 18, c.p.acc, .9) + C(-4, -77, 40, c.halo(c.p.acc, .5)));
    return e;
  };
  EL.stadio = (c, o) => {
    const col = c.col(1);
    let e = P(`M-20 ${HOR + 6}L-20 ${HOR - 120}Q300 ${HOR - 170} 620 ${HOR - 120}L620 ${HOR + 6}Z`, col);
    for(let k = 0; k < 60; k++) e += C(c.rnd(0, 600), HOR - c.rnd(10, 130), 1.6, c.pick(["#ffffff", c.p.acc, "#5aa0ff"]), f(c.rnd(.2, .7)));
    [[60, -1], [540, 1]].forEach(([x, dr]) => {
      e += P(`M${x} ${HOR - 300}L${x - dr * 220} ${HOR + 140}L${x + dr * 160} ${HOR + 140}Z`, c.lin([[0, "#ffffff", .34], [1, "#ffffff", 0]]));
      e += R(x - 4, HOR - 300, 8, 200, col) + R(x - 30, HOR - 330, 60, 34, col) + C(x, HOR - 314, 90, c.halo("#ffffff", .5));
      for(let i = 0; i < 4; i++) for(let j = 0; j < 2; j++) e += C(x - 20 + i * 13, HOR - 322 + j * 14, 4.5, "#ffffff", .95);
    });
    e += R(0, HOR, VW, VH - HOR, c.lin([[0, "#1c5a2c"], [1, "#05140a"]])) + S(`M0 ${HOR + 60}Q300 ${HOR + 40} 600 ${HOR + 60}`, "#ffffff", 2, .35) + E(300, HOR + 110, 120, 22, "none", null, ' stroke="#ffffff" stroke-width="2" stroke-opacity=".3"');
    return e;
  };
  EL.vele = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z);
    let e = "";
    [[80, 300, 170], [290, 380, 210], [490, 320, 180]].forEach(([x, h, w]) => {
      e += P(`M${x - w / 2} ${HOR + 4}L${x} ${HOR - h}L${x + w / 2} ${HOR + 4}Z`, col);
      for(let k = 1; k < 14; k++){ const yy = HOR - h + k * h / 14, half = w / 2 * k / 14; e += R(x - half, yy, half * 2, 2, c.p.far, .5); for(let q = 0; q < 3; q++) if(c.R() < .35) e += R(x - half + c.rnd(2, half * 2 - 6), yy + 3, 4, 6, c.p.acc, .8); }
    });
    return e;
  };
  EL.grattacieli = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z);
    let e = EL.palazzi(c, { h:[120, 260], w:[30, 60], z:0, win:.1 });
    (o.t || [[200, 470], [380, 420]]).forEach(([x, h], i) => {
      const top = HOR - h;
      e += R(x - 40, top + 60, 80, h - 56, col) + R(x - 30, top + 20, 60, 44, col) + R(x - 20, top - 10, 40, 34, col) + (i ? P(`M${x - 20} ${top - 10}Q${x} ${top - 80} ${x + 20} ${top - 10}Z`, col) + P(`M${x - 3} ${top - 70}L${x} ${top - 130}L${x + 3} ${top - 70}Z`, col) : R(x - 6, top - 50, 12, 42, col) + L(x, top - 50, x, top - 100, col, 3));
      for(let yy = top + 70; yy < HOR - 10; yy += 16) for(let xx = x - 34; xx < x + 32; xx += 10) if(c.R() < .22) e += R(xx, yy, 4, 7, c.p.acc, .8);
    });
    return e;
  };
  EL.liberty = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z);
    return G(o.x, o.y || HOR, o.s || 1, R(-50, -110, 100, 114, col) + R(-36, -150, 72, 44, col) + P("M-26 -150L-30 -260Q-26 -300 -8 -306L12 -300L24 -262L26 -150Z", col) + C(0, -318, 13, col) + P("M-14 -326L-24 -344L-6 -330L0 -350L6 -330L24 -344L14 -326Z", col) + P("M14 -298L30 -380L40 -378L26 -296Z", col) + P("M28 -380L44 -382Q46 -400 36 -410Q30 -398 28 -380Z", "#ffc65a") + C(36, -400, 24, c.halo("#ffc65a", .7)) + R(-34, -250, 20, 34, col, null, ' transform="rotate(-12 -24 -230)"'));
  };
  EL.ciminiere = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z);
    let e = "";
    if(c.hd){
      e += R(-10, HOR - 70, VW + 20, 74, col);
      for(let k = 0; k < 9; k++){ const x = 20 + k * 68, w = c.rnd(26, 40), h = c.rnd(80, 150); e += R(x, HOR - h, w, h, col) + L(x - 6, HOR - h * .5, x + w + 6, HOR - h * .5, col, 2); for(let q = 0; q < 4; q++) e += L(x + q * w / 3, HOR - h, x + q * w / 3, HOR, mix(col, c.p.glow, .1), .8, .6); }
      [[110, 360, 1], [200, 290, 0], [400, 330, 1], [480, 250, 0]].forEach(([x, h, fiamma]) => {
        e += P(`M${x - 16} ${HOR}L${x - 11} ${HOR - h}H${x + 11}L${x + 16} ${HOR}Z`, c.lin([[0, mix(col, c.p.glow, .1)], [1, col]]));
        [0, 1, 2, 3].forEach(q => e += R(x - 12, HOR - h + q * 12, 24, 12, q % 2 ? "#ece4d6" : "#c8422a", .9));
        e += R(x - 13, HOR - h - 4, 26, 6, col);
        if(fiamma) e += C(x, HOR - h - 40, 90, c.halo("#ffb347", .7)) + P(`M${x - 10} ${HOR - h - 2}Q${x - 24} ${HOR - h - 46} ${x - 2} ${HOR - h - 86}Q${x + 20} ${HOR - h - 44} ${x + 10} ${HOR - h - 2}Z`, c.lin([[0, "#fff6c8"], [.5, "#ffb030"], [1, "#e0501a"]]));
        else e += P(`M${x - 10} ${HOR - h}C${x - 40} ${HOR - h - 120} ${x + 60} ${HOR - h - 200} ${x + 20} ${HOR - h - 320}C${x + 120} ${HOR - h - 200} ${x + 40} ${HOR - h - 100} ${x + 10} ${HOR - h}Z`, c.lin([[0, "#5a5048", .8], [1, "#5a5048", .2]]), null, ` filter="${c.rumore("fumoC", ".012 .02", 3, 9, 2.4, -.7)}"`);
      });
      for(let k = 0; k < 70; k++) e += C(c.rnd(0, 600), HOR - c.rnd(4, 150), c.rnd(1, 2), c.R() < .8 ? c.p.acc : "#ff4a3a", f(c.rnd(.5, 1)));
      return e;
    }
    [[120, 330], [190, 260], [430, 300], [500, 240]].forEach(([x, h], i) => {
      e += R(x - 12, HOR - h, 24, h + 4, col) + R(x - 13, HOR - h + 8, 26, 10, "#c64a2a", .85) + R(x - 13, HOR - h + 18, 26, 10, "#e8e0d0", .5) + R(x - 13, HOR - h + 28, 26, 10, "#c64a2a", .85) + L(x - 30, HOR - h * .4, x + 30, HOR - h * .4, col, 3);
      const g = c.halo("#4a4440", .5);
      for(let k = 0; k < 6; k++) e += C(x + k * 22, HOR - h - 40 - k * 34, 20 + k * 10, g);
      if(i % 2 === 0) e += C(x, HOR - h - 24, 60, c.halo("#ffb347", .7)) + P(`M${x - 8} ${HOR - h}Q${x - 18} ${HOR - h - 34} ${x - 2} ${HOR - h - 64}Q${x + 16} ${HOR - h - 32} ${x + 8} ${HOR - h}Z`, c.lin([[0, "#fff2b0"], [1, "#ff7a1a"]]));
    });
    [[280, 60], [340, 70], [600, 50]].forEach(([x, r]) => e += R(x - r, HOR - 60, r * 2, 64, col) + E(x, HOR - 60, r, 10, col));
    for(let k = 0; k < 40; k++) e += C(c.rnd(0, 600), HOR - c.rnd(4, 90), 1.4, c.p.acc, f(c.rnd(.4, .9)));
    return e;
  };
  EL.cantiere = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z);
    let e = "";
    for(let k = 0; k < 7; k++) e += R(250, HOR - 40 - k * 40, 220, 6, col);
    for(let x = 250; x <= 470; x += 44) e += R(x, HOR - 284, 6, 288, col);
    for(let k = 0; k < 6; k++) e += L(250 + (k % 5) * 44, HOR - k * 40, 294 + (k % 5) * 44, HOR - 40 - k * 40, col, 2);
    e += R(120, HOR - 430, 14, 434, col) + R(20, HOR - 440, 440, 10, col) + R(100, HOR - 470, 40, 34, col) + L(127, HOR - 470, 40, HOR - 440, col, 2) + L(127, HOR - 470, 330, HOR - 440, col, 2) + L(390, HOR - 430, 390, HOR - 330, col, 2) + R(376, HOR - 332, 28, 20, c.p.acc, .9) + C(127, HOR - 476, 4, "#ff4a3a");
    for(let k = 0; k < 18; k++) e += L(120, HOR - 20 - k * 24, 134, HOR - 44 - k * 24, col, 2);
    for(let k = 0; k < 20; k++) e += R(260 + c.rnd(0, 200), HOR - c.rnd(20, 270), 8, 6, c.p.acc, c.R() < .5 ? .7 : .2);
    return e;
  };
  EL.ombrelloni = (c, o) => {
    const cols = o.cols || ["#e05a4a", "#f2f2f2", "#3a8ad0", "#f2c64a"];
    let e = "";
    for(let r = 0; r < 3; r++) for(let k = 0; k < 7; k++){ const x = 30 + k * 90 + (r % 2) * 45, y = (o.y || HOR + 50) + r * 60, s = .55 + r * .22; e += L(x, y, x, y - 70 * s, c.col(2), 3) + P(`M${f(x - 48 * s)} ${f(y - 66 * s)}Q${x} ${f(y - 110 * s)} ${f(x + 48 * s)} ${f(y - 66 * s)}Z`, cols[(k + r) % cols.length], .92); }
    return e;
  };
  EL.vicolo = (c, o) => {
    let e = "";
    [[-1, 0], [1, VW]].forEach(([dr]) => {
      e += P(dr < 0 ? `M0 0L210 140L210 ${HOR + 40}L0 ${VH}Z` : `M${VW} 0L390 140L390 ${HOR + 40}L${VW} ${VH}Z`, c.col(2));
      for(let k = 0; k < 8; k++){ const t = k / 8, y = 160 + k * 60; const xa = dr < 0 ? 20 + t * 150 : VW - 20 - t * 150, lit = c.R() < .4; e += R(dr < 0 ? xa : xa - 28 + t * 14, y, 28 - t * 14, 40 - t * 18, lit ? c.p.acc : "#000", lit ? .85 : .5); }
    });
    const cols = ["#e9524a", "#f2f2f2", "#5aa0e8", "#f3c873", "#7fd4a0"];
    for(let r = 0; r < 4; r++){ const y = 200 + r * 90; e += S(`M${200 + r * 4} ${y}Q300 ${y + 26} ${400 - r * 4} ${y}`, "#d9caa6", 1.5, .6); for(let k = 0; k < 5; k++){ const px = 220 + k * 38, py = y + 14 * (1 - Math.pow((px - 300) / 100, 2)); e += R(px - 6, py, 12, c.rnd(14, 22), cols[(k + r) % 5], .9); } }
    return e;
  };
  EL.portico = (c, o) => {
    const V = [o.vx || 330, o.vy || 600], col = c.col(2), N = 9, X0 = -150, Y0 = 240, CW = 64, sc = k => Math.pow(.76, k);
    const pt = (x, y, s) => [V[0] + (x - V[0]) * s, V[1] + (y - V[1]) * s];
    let e = P(`M-10 -10L${V[0] - 14} ${V[1] - 30}L${V[0] - 14} ${V[1] + 16}L-10 ${VH + 10}Z`, col);
    for(let k = 0; k < N; k++){
      const s1 = sc(k), s2 = sc(k + 1), [xa, ya] = pt(X0 + CW, Y0 + 80, s1), [xb, yb] = pt(X0, Y0 + 80, s2), [, yba] = pt(X0, VH, s1), [, ybb] = pt(X0, VH, s2), [, yt] = pt(X0, Y0 - 10, (s1 + s2) / 2);
      e += P(`M${f(xa)} ${f(yba)}L${f(xa)} ${f(ya)}Q${f((xa + xb) / 2)} ${f(yt)} ${f(xb)} ${f(yb)}L${f(xb)} ${f(ybb)}Z`, c.linU([[0, "#ffe6b0", .92], [1, c.p.acc, .55]], xa, ya, xa, yba));
      if(c.hd){ const [cx0] = pt(X0, Y0 + 80, s1), cw = xa - cx0; e += R(cx0 + cw * .15, ya - 6 * s1, cw * .7, 6 * s1, mix(col, c.p.glow, .25), .8) + R(cx0 + cw * .2, ya, cw * .1, yba - ya, mix(col, c.p.glow, .12), .6) + S(`M${f(xa)} ${f(ya)}Q${f((xa + xb) / 2)} ${f(yt)} ${f(xb)} ${f(yb)}`, mix(col, c.p.glow, .3), f(2 * s1), .7); for(let q = 1; q < 4; q++){ const yy = ya + (yba - ya) * q / 4; e += R(xa + 2 * s1, yy, (xb - xa) * .5, 1, "#3a2010", .25); } }
      const lx = (xa + xb) / 2, ly = (ya + yb) / 2 + 26 * s1;
      e += L(lx, (ya + yb) / 2 - 14 * s1, lx, ly - 6 * s1, col, f(1 + s1 * 2)) + C(lx, ly, 3 + 5 * s1, "#fff2c0") + C(lx, ly, 40 * s1, c.halo("#ffd27a", .55));
    }
    return e;
  };
  EL.tunnel = (c, o) => {
    let e = R(0, 0, VW, VH, c.p.ink);
    for(let k = 0; k < 7; k++){ const s = 1 - k * .13, w = 520 * s, h = 760 * s, x = 300 - w / 2, y = 520 - h * .62; e += P(`M${f(x)} ${f(y + h)}V${f(y + w / 2)}Q${f(x)} ${f(y)} 300 ${f(y)}Q${f(x + w)} ${f(y)} ${f(x + w)} ${f(y + w / 2)}V${f(y + h)}Z`, k % 2 ? c.p.mid : c.p.far, f(.5 + k * .06)); }
    e += C(300, 420, 130, c.halo(c.p.glow, .75));
    return e;
  };
  EL.roccia = (c, o) => {
    const y = o.y || 330, cols = o.cols || ["#2a1c12", "#0a0604"];
    let e = R(0, y, VW, VH - y, c.lin([[0, cols[0]], [1, cols[1]]]));
    for(let k = 0; k < 7; k++) e += S(`M-20 ${f(y + 24 + k * 80 + c.rnd(-10, 10))}q160 ${f(c.rnd(-16, 16))} 320 0t320 0`, o.strati || "#4a3424", 2, .45);
    return e;
  };
  EL.caverna = (c, o) => {
    const x = o.x || 300, top = o.top || 470, w = o.w || 480, col = o.col || "#ffb85a";
    let e = P(`M${x - w / 2} ${VH}L${x - w / 2} ${f(top + w * .3)}Q${x - w / 2} ${top} ${x} ${top - 20}Q${x + w / 2} ${top} ${x + w / 2} ${f(top + w * .3)}L${x + w / 2} ${VH}Z`, c.rad([[0, col, .85], [.5, col, .38], [1, "#000", .9]], .5, .72, .62));
    for(let k = 1; k <= 3; k++){ const s = 1 - k * .2, ww = w * s, tt = top + (VH - top) * (1 - s) * .55; e += S(`M${f(x - ww / 2)} ${VH}L${f(x - ww / 2)} ${f(tt + ww * .3)}Q${f(x - ww / 2)} ${f(tt)} ${x} ${f(tt - 20 * s)}Q${f(x + ww / 2)} ${f(tt)} ${f(x + ww / 2)} ${f(tt + ww * .3)}L${f(x + ww / 2)} ${VH}`, "#000", 16 * s, .35); }
    if(o.murata){ const mx = x, my = o.my || top + 150, mw = 100, mh = 150; e += P(`M${mx - mw / 2} ${my + mh}V${my + 30}Q${mx} ${my - 20} ${mx + mw / 2} ${my + 30}V${my + mh}Z`, "#5a3a24");
      for(let r = 0; r < 7; r++) e += L(mx - mw / 2, my + 30 + r * 16, mx + mw / 2, my + 30 + r * 16, "#2a1a10", 1.5, .8);
      e += `<text x="${mx}" y="${my + 98}" text-anchor="middle" font-family="${SANS}" font-weight="700" font-size="18" fill="#e8c89a" opacity=".75">1943</text>`; }
    return e;
  };
  EL.rivelatore = (c, o) => {
    const x = o.x || 300, y = o.y || 600, r = o.r || 200, col = c.p.acc;
    let e = C(x, y, r * 1.5, c.halo(col, .35)) + C(x, y, r * 1.06, "#06121a");
    for(let k = 0; k < 6; k++) e += `<circle cx="${x}" cy="${y}" r="${f(r * (1 - k * .14))}" fill="none" stroke="${col}" stroke-width="${f(7 - k)}" opacity="${f(.85 - k * .1)}"/>`;
    for(let k = 0; k < 24; k++){ const a = k * Math.PI / 12; e += L(x + Math.cos(a) * r * .28, y + Math.sin(a) * r * .28, x + Math.cos(a) * r, y + Math.sin(a) * r, col, 2, .35); }
    e += C(x, y, r * .26, c.rad([[0, "#ffffff"], [.5, col], [1, col, .2]]));
    return e;
  };
  EL.parabola = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z);
    let e = "";
    if(o.onde) for(let k = 1; k <= 4; k++) e += S(`M${-60 - k * 34} ${-260 - k * 30}Q-20 ${-330 - k * 40} ${40 + k * 30} ${-300 - k * 34}`, c.p.acc, 3, f(.75 - k * .14));
    e += L(-30, 0, 0, -150, col, 10) + L(30, 0, 0, -150, col, 10) + P("M-110 -200Q-20 -110 100 -200Q40 -260 -110 -200Z", col, null, ' transform="rotate(-24 0 -190)"') + L(0, -190, 30, -260, col, 4) + C(30, -262, 6, c.p.acc);
    return G(o.x, o.y || HOR, o.s || 1, e, null, o.flip);
  };
  EL.cupolaVetro = (c, o) => {
    let e = P(`M30 ${HOR + 4}Q30 120 300 110Q570 120 570 ${HOR + 4}Z`, c.lin([[0, c.p.acc, .14], [1, c.p.acc, .03]]));
    e += S(`M30 ${HOR + 4}Q30 120 300 110Q570 120 570 ${HOR + 4}`, c.p.acc, 3, .6);
    for(let k = 1; k < 6; k++) e += S(`M${30 + k * 90} ${HOR}Q${f(160 + k * 46)} 160 300 110`, c.p.acc, 1, .18);
    for(let k = 0; k < 4; k++) e += S(`M${f(60 + k * 6)} ${f(HOR - 120 - k * 90)}Q300 ${f(HOR - 180 - k * 110)} ${f(540 - k * 6)} ${f(HOR - 120 - k * 90)}`, c.p.acc, 1, .14);
    if(o.crepe) e += S("M410 170l-22 40l14 10l-30 52l18 8l-26 60M388 210l38 18l20 -12M372 270l-40 6", "#eaffff", 2, .85) + C(410, 170, 40, c.halo("#eaffff", .5));
    return e;
  };
  EL.portici = (c, o) => EL.portico(c, o);

  /* ---------- personaggi in silhouette (piedi a y=0, alti circa 300) ---------- */
  const FIG = {
    uomo: '<path d="M-35 -261C-30 -268 -15 -271 0 -271C15 -271 30 -268 35 -261C27 -256 13 -255 0 -255C-13 -255 -27 -256 -35 -261Z"/><path d="M-18 -265C-19 -281 -15 -291 -5 -292C-2 -288 2 -288 5 -292C15 -291 19 -281 18 -265Z"/><path d="M-13 -257C-14 -246 -12 -235 -7 -230H7C12 -235 14 -246 13 -257Z"/><path d="M-13 -234L-23 -227L-12 -213L0 -221L12 -213L23 -227L13 -234Z"/><path d="M-30 -227C-44 -223 -49 -213 -49 -197L-47 -150L-51 -64C-35 -60 -15 -58 0 -58C15 -58 35 -60 51 -64L47 -150L49 -197C49 -213 44 -223 30 -227Z"/><path d="M-45 -216C-56 -209 -60 -191 -60 -170V-127C-60 -115 -58 -107 -55 -103H-45C-45 -116 -45 -131 -45 -151ZM45 -216C56 -209 60 -191 60 -170V-127C60 -115 58 -107 55 -103H45C45 -116 45 -131 45 -151Z"/><path d="M-57 -105C-59 -97 -57 -89 -51 -87C-46 -87 -44 -95 -45 -103ZM57 -105C59 -97 57 -89 51 -87C46 -87 44 -95 45 -103Z"/><path d="M-27 -61L-25 -8H-10L-6 -61ZM6 -61L10 -8H25L27 -61Z"/><path d="M-26 -9C-30 -6 -32 -2 -30 1H-8C-6 -3 -7 -7 -10 -9ZM10 -9C7 -7 6 -3 8 1H30C32 -2 30 -6 26 -9Z"/>',
    testa: '<path d="M-14 -256C-15 -244 -13 -235 -8 -230H8C13 -235 15 -244 14 -256C14 -266 8 -272 0 -272C-8 -272 -14 -266 -14 -256Z"/><path d="M-15 -254C-18 -272 -9 -283 2 -283C14 -283 20 -273 17 -256C15 -263 10 -268 1 -268C-7 -268 -12 -262 -15 -254Z"/><path d="M-6 -232H6L8 -222H-8Z"/><path d="M-30 -224C-44 -220 -48 -210 -48 -194L-46 -150L-46 -118C-30 -114 -14 -113 0 -113C14 -113 30 -114 46 -118L46 -150L48 -194C48 -210 44 -220 30 -224Z"/><path d="M-44 -213C-55 -206 -59 -188 -59 -167V-124C-59 -114 -57 -108 -54 -104H-44C-44 -116 -44 -130 -44 -150ZM44 -213C55 -206 59 -188 59 -167V-124C59 -114 57 -108 54 -104H44C44 -116 44 -130 44 -150Z"/><path d="M-56 -106C-58 -98 -56 -90 -50 -88C-45 -88 -43 -96 -44 -104ZM56 -106C58 -98 56 -90 50 -88C45 -88 43 -96 44 -104Z"/><path d="M-30 -118L-27 -8H-11L-3 -118ZM3 -118L11 -8H27L30 -118Z"/><path d="M-26 -9C-30 -6 -32 -2 -30 1H-8C-6 -3 -7 -7 -10 -9ZM10 -9C7 -7 6 -3 8 1H30C32 -2 30 -6 26 -9Z"/>',
    coppola: '<path d="M-17 -262C-17 -280 -6 -286 4 -285C16 -284 22 -276 21 -266L34 -261C24 -257 6 -256 -17 -261Z"/><path d="M-13 -262C-14 -248 -12 -236 -7 -231H7C12 -236 14 -248 13 -262Z"/><path d="M-6 -233H6L8 -223H-8Z"/><path d="M-28 -226C-40 -222 -44 -212 -44 -198L-42 -130L-40 -116C-26 -113 -12 -112 0 -112C12 -112 26 -113 40 -116L42 -130L44 -198C44 -212 40 -222 28 -226Z"/><path d="M-41 -214C-51 -206 -54 -188 -54 -168V-128C-54 -118 -52 -111 -49 -107H-40C-40 -120 -40 -134 -40 -152ZM41 -214C51 -206 54 -188 54 -168V-128C54 -118 52 -111 49 -107H40C40 -120 40 -134 40 -152Z"/><path d="M-51 -109C-53 -101 -51 -93 -45 -91C-40 -91 -38 -99 -40 -107ZM51 -109C53 -101 51 -93 45 -91C40 -91 38 -99 40 -107Z"/><path d="M-36 -118L-32 -8H-13L-3 -118ZM3 -118L13 -8H32L36 -118Z"/><path d="M-32 -9C-36 -6 -37 -1 -34 1H-12C-11 -3 -12 -7 -14 -9ZM14 -9C12 -7 11 -3 12 1H34C37 -1 36 -6 32 -9Z"/>',
    donna: '<path d="M-20 -238C-24 -272 -10 -285 2 -285C18 -285 26 -270 22 -240C25 -226 23 -212 17 -203H-17C-23 -212 -25 -226 -20 -238Z"/><path d="M-6 -214H6L7 -204H-7Z"/><path d="M-24 -206C-30 -204 -32 -196 -31 -186L-26 -150C-24 -140 -22 -134 -20 -128H20C22 -134 24 -140 26 -150L31 -186C32 -196 30 -204 24 -206Z"/><path d="M-30 -198C-36 -186 -38 -162 -36 -136C-35 -128 -32 -124 -28 -122L-24 -128C-26 -146 -26 -166 -22 -190ZM30 -198C36 -186 38 -162 36 -136C35 -128 32 -124 28 -122L24 -128C26 -146 26 -166 22 -190Z"/><path d="M-21 -130C-28 -100 -36 -76 -42 -58H42C36 -76 28 -100 21 -130Z"/><path d="M-14 -60L-12 -8H-7L-5 -60ZM5 -60L7 -8H12L14 -60Z"/><path d="M-13 -9L-16 0H-5L-6 -9ZM6 -9L5 0H16L13 -9Z"/>',
    velo: '<path d="M0 -290Q-30 -278 -36 -198L-28 -190Q0 -198 28 -190L36 -198Q30 -278 0 -290Z"/><path d="M-27 -196Q-32 -150 -34 -110L-46 -2H46L34 -110Q32 -150 27 -196Z"/>',
    sposa: '<path d="M-19 -238Q-22 -276 0 -279Q22 -276 19 -238Q21 -220 14 -214H-14Q-21 -220 -19 -238Z"/><path d="M0 -280Q-46 -250 -58 -120Q-66 -40 -92 2H-40Q-30 -120 -22 -200Z"/><path d="M-24 -212Q-27 -217 -14 -219H14Q27 -217 24 -212L17 -150H-17Z"/><path d="M-18 -152H18Q46 -90 72 -2H-72Q-46 -90 -18 -152Z"/>',
    trench: '<path d="M-14 -256C-15 -244 -13 -235 -8 -230H8C13 -235 15 -244 14 -256C14 -266 8 -272 0 -272C-8 -272 -14 -266 -14 -256Z"/><path d="M-15 -254C-18 -272 -9 -283 2 -283C14 -283 20 -273 17 -256C15 -263 10 -268 1 -268C-7 -268 -12 -262 -15 -254Z"/><path d="M-14 -235L-26 -224L-13 -208L0 -219L13 -208L26 -224L14 -235Z"/><path d="M-30 -226C-44 -222 -49 -212 -49 -196L-47 -150L-53 -58C-36 -54 -16 -52 0 -52C16 -52 36 -54 53 -58L47 -150L49 -196C49 -212 44 -222 30 -226Z"/><path d="M-45 -215C-56 -208 -60 -190 -60 -169V-126C-60 -114 -58 -106 -55 -102H-45C-45 -115 -45 -130 -45 -150ZM45 -215C56 -208 60 -190 60 -169V-126C60 -114 58 -106 55 -102H45C45 -115 45 -130 45 -150Z"/><path d="M-57 -104C-59 -96 -57 -88 -51 -86C-46 -86 -44 -94 -45 -102ZM57 -104C59 -96 57 -88 51 -86C46 -86 44 -94 45 -102Z"/><path d="M-25 -55L-23 -8H-9L-6 -55ZM6 -55L9 -8H23L25 -55Z"/><path d="M-24 -9C-28 -6 -30 -2 -28 1H-7C-5 -3 -6 -7 -9 -9ZM9 -9C6 -7 5 -3 7 1H28C30 -2 28 -6 24 -9Z"/>',
    ragazzo: '<path d="M-13 -258C-14 -246 -12 -236 -7 -231H7C12 -236 14 -246 13 -258C13 -268 7 -274 0 -274C-7 -274 -13 -268 -13 -258Z"/><path d="M-17 -255C-20 -275 -8 -288 4 -286C10 -292 19 -287 17 -278C22 -272 20 -262 17 -254C15 -262 10 -266 4 -266C-4 -266 -12 -262 -17 -255Z"/><path d="M-22 -232C-18 -241 18 -241 22 -232L16 -221H-16Z"/><path d="M-28 -226C-40 -222 -44 -212 -44 -198L-42 -136L-38 -124H38L42 -136L44 -198C44 -212 40 -222 28 -226Z"/><path d="M-41 -214C-51 -206 -54 -188 -54 -168V-132C-54 -122 -52 -116 -49 -112H-40C-40 -124 -40 -138 -40 -154ZM41 -214C51 -206 54 -188 54 -168V-132C54 -122 52 -116 49 -112H40C40 -124 40 -138 40 -154Z"/><path d="M-51 -114C-53 -106 -51 -98 -45 -96C-40 -96 -38 -104 -40 -112ZM51 -114C53 -106 51 -98 45 -96C40 -96 38 -104 40 -112Z"/><path d="M-31 -128L-29 -7H-12L-2 -128ZM2 -128L12 -7H29L31 -128Z"/><path d="M-31 -9C-35 -6 -36 0 -33 2H-9V-9ZM9 -9V2H33C36 0 35 -6 31 -9Z"/>',
    tenore: '<ellipse cx="0" cy="-246" rx="16" ry="19"/><path d="M-15 -258Q-14 -272 0 -273Q14 -272 15 -258Z"/><path d="M-8 -230H8L10 -220H-10Z"/><path d="M-38 -214Q-40 -224 -22 -226L0 -214L22 -226Q40 -224 38 -214L42 -120H-42Z"/><path d="M-36 -212L-112 -268L-104 -278L-28 -230ZM36 -212L112 -268L104 -278L28 -230Z"/><path d="M-42 -122Q-60 -60 -70 -2H70Q60 -60 42 -122Z"/>',
    nonna: '<circle cx="8" cy="-266" r="9"/><ellipse cx="0" cy="-248" rx="13" ry="16"/><path d="M-30 -228Q-36 -200 -34 -170H34Q36 -200 30 -228Q0 -238 -30 -228Z"/><path d="M-30 -172L-40 -4H40L30 -172Z"/><rect x="44" y="-150" width="4" height="150"/><path d="M44 -150Q46 -164 58 -160L56 -154Q50 -156 48 -150Z"/><path d="M30 -200L50 -150L44 -148L26 -190Z"/>',
    robot: '<rect x="-2" y="-308" width="4" height="22"/><circle cx="0" cy="-310" r="6"/><rect x="-28" y="-288" width="56" height="44" rx="14"/><rect x="-34" y="-236" width="68" height="94" rx="16"/><rect x="-50" y="-228" width="12" height="70" rx="6"/><rect x="38" y="-228" width="12" height="70" rx="6"/><rect x="-24" y="-142" width="16" height="136" rx="6"/><rect x="8" y="-142" width="16" height="136" rx="6"/><rect x="-30" y="-10" width="26" height="10" rx="4"/><rect x="4" y="-10" width="26" height="10" rx="4"/>',
    cacciatore: '<path d="M0 -294Q-27 -278 -29 -236Q-31 -214 -42 -204H42Q31 -214 29 -236Q27 -278 0 -294Z"/><path d="M-42 -206Q-52 -120 -66 -4H66Q52 -120 42 -206Z"/><rect x="18" y="-330" width="6" height="96" transform="rotate(-24 21 -282)"/><rect x="4" y="-300" width="34" height="6" transform="rotate(-24 21 -297)"/>',
    soldato: '<path d="M-22 -258Q-24 -286 0 -289Q24 -286 22 -258L31 -253H-31Z"/><path d="M-2 -289L0 -298L2 -289Z"/><ellipse cx="0" cy="-243" rx="14" ry="16"/><path d="M-44 -214Q-47 -224 -28 -228L0 -214L28 -228Q47 -224 44 -214L50 -100L44 -76H-44L-50 -100Z"/><path d="M-28 -78L-25 -5H-10L-8 -78ZM8 -78L10 -5H25L28 -78Z"/><path d="M30 -226Q58 -204 52 -150L42 -152Z"/><rect x="34" y="-352" width="6" height="176" transform="rotate(9 37 -264)"/><path d="M35 -352L37 -384L39 -352Z" transform="rotate(9 37 -264)"/>',
    legionario: '<path d="M-17 -258Q-18 -282 0 -284Q18 -282 17 -258L22 -252H-22Z"/><ellipse cx="0" cy="-242" rx="13" ry="15"/><path d="M-36 -216Q-38 -224 -22 -227H22Q38 -224 36 -216L32 -140H-32Z"/><path d="M-34 -142H34L38 -100H-38Z"/><path d="M-24 -100L-22 -5H-10L-8 -100ZM8 -100L10 -5H22L24 -100Z"/><rect x="-86" y="-236" width="50" height="136" rx="10"/><rect x="44" y="-370" width="5" height="370"/><path d="M41 -370L46.5 -400L52 -370Z"/>',
    garibaldino: '<path d="M-16 -258H16L20 -282Q0 -290 -20 -282Z"/><ellipse cx="0" cy="-243" rx="14" ry="16"/><path d="M-6 -229H6L8 -220H-8Z"/><path d="M-30 -62L-27 -5H-11L-9 -62ZM9 -62L11 -5H27L30 -62Z"/><path d="M-42 -100H42L46 -60H-46Z"/><rect x="36" y="-340" width="6" height="176" transform="rotate(8 39 -252)"/>',
    astronauta: '<circle cx="0" cy="-250" r="32"/><rect x="-42" y="-236" width="84" height="104" rx="18"/><rect x="-50" y="-226" width="100" height="70" rx="12"/><rect x="-64" y="-220" width="18" height="84" rx="9"/><rect x="46" y="-220" width="18" height="84" rx="9"/><rect x="-32" y="-136" width="26" height="130" rx="11"/><rect x="6" y="-136" width="26" height="130" rx="11"/><rect x="-36" y="-14" width="32" height="14" rx="6"/><rect x="4" y="-14" width="32" height="14" rx="6"/>',
    dj: '<path d="M-17 -256Q-21 -282 -2 -284Q8 -291 15 -281Q23 -276 18 -255Z"/><ellipse cx="0" cy="-246" rx="14" ry="18"/><path d="M-22 -250Q-22 -284 0 -286Q22 -284 22 -250" fill="none" stroke="currentColor" stroke-width="5"/><rect x="-27" y="-258" width="9" height="18" rx="4"/><rect x="18" y="-258" width="9" height="18" rx="4"/><path d="M-38 -214Q-40 -222 -24 -225H24Q40 -222 38 -214L36 -128H-36Z"/><path d="M-36 -212L-76 -320L-64 -324L-26 -224ZM36 -212L76 -320L64 -324L26 -224Z"/><path d="M-30 -130L-28 -6H-11L-2 -130ZM2 -130L11 -6H28L30 -130Z"/>',
    pastore: '<path d="M-16 -263Q-15 -283 2 -284Q19 -283 20 -267L31 -261Q6 -257 -16 -262Z"/><ellipse cx="0" cy="-246" rx="14" ry="18"/><path d="M-44 -216Q-46 -226 -28 -229L0 -214L28 -229Q46 -226 44 -216L56 -30Q0 -20 -56 -30Z"/><path d="M-26 -32L-24 -5H-10L-8 -32ZM8 -32L10 -5H24L26 -32Z"/><rect x="56" y="-320" width="5" height="320"/><path d="M56 -320Q54 -342 70 -342Q82 -340 80 -326L74 -326Q74 -334 68 -334Q61 -334 62 -320Z"/>',
    bandito: '<path d="M-16 -263Q-15 -283 2 -284Q19 -283 20 -267L31 -261Q6 -257 -16 -262Z"/><ellipse cx="0" cy="-246" rx="14" ry="18"/><path d="M-7 -231H7L9 -222H-9Z"/><path d="M-42 -214Q-45 -223 -28 -227L-8 -222L0 -208L8 -222L28 -227Q45 -223 42 -214L46 -128L41 -116H-41L-46 -128Z"/><path d="M-35 -118L-31 -5H-13L-4 -118ZM4 -118L13 -5H31L35 -118Z"/><rect x="-6" y="-360" width="6" height="190" transform="rotate(-14 -3 -265)"/><path d="M-30 -226L12 -150L4 -146L-36 -214Z"/>',
    alpinista: '<path d="M-14 -262Q-14 -287 2 -287Q18 -287 18 -262Z"/><ellipse cx="2" cy="-246" rx="14" ry="17"/><rect x="-44" y="-236" width="40" height="112" rx="12"/><path d="M-30 -222Q-30 -230 -14 -232H18Q32 -230 32 -220L36 -128H-26Z"/><path d="M-24 -130L-30 -6H-12L-2 -130ZM4 -130L14 -6H32L28 -130Z"/><path d="M-32 -8Q-33 1 -20 1H-10L-12 -8ZM14 -8L12 1H24Q35 1 33 -8Z"/><path d="M28 -216L58 -270L64 -265L36 -210Z"/><rect x="58" y="-340" width="5" height="90" transform="rotate(18 60 -295)"/><path d="M46 -338L82 -330L80 -323L48 -330Z" transform="rotate(18 60 -295)"/>',
    spallone: '<ellipse cx="16" cy="-238" rx="13" ry="16"/><path d="M4 -250Q6 -268 22 -266Q34 -262 32 -248Z"/><path d="M-6 -222Q-2 -230 14 -226L30 -214L38 -138H-16Z"/><path d="M-62 -256Q-70 -288 -32 -292Q6 -290 10 -254L12 -150Q-20 -134 -56 -150Z"/><path d="M-12 -140L-26 -6H-10L4 -140ZM12 -140L26 -6H42L32 -140Z"/><path d="M-28 -8L-30 1H-12L-10 -8ZM26 -8L24 1H42L42 -8Z"/><rect x="44" y="-196" width="4" height="196" transform="rotate(10 46 -98)"/>',
    bambina: '<path d="M-24 -142Q-28 -188 0 -192Q28 -188 24 -142Q26 -124 18 -120H-18Q-26 -124 -24 -142Z"/><path d="M-6 -126H6V-117H-6Z"/><path d="M-20 -119Q-22 -124 -12 -125H12Q22 -124 20 -119L42 -40H-42Z"/><path d="M-14 -40L-12 -4H-6L-5 -40ZM5 -40L6 -4H12L14 -40Z"/><path d="M-20 -116L-32 -66L-26 -64L-14 -110ZM20 -116L32 -66L26 -64L14 -110Z"/>',
    bambino: '<path d="M-17 -150Q-20 -176 0 -178Q20 -176 17 -150Z"/><ellipse cx="0" cy="-142" rx="17" ry="20"/><path d="M-6 -124H6V-116H-6Z"/><path d="M-24 -116Q-26 -122 -14 -123H14Q26 -122 24 -116L26 -60H-26Z"/><path d="M-22 -62L-20 -4H-6L-2 -62ZM2 -62L6 -4H20L22 -62Z"/><path d="M-24 -112L-34 -64L-27 -62L-17 -106ZM24 -112L34 -64L27 -62L17 -106Z"/>'
  };
  const DETTAGLI = {
    uomo:"M-18 -267C-8 -264 8 -264 18 -267M0 -221L-11 -186L-3 -146M0 -221L11 -186L3 -146M0 -146V-62M-40 -110H-27M27 -110H40M-17 -56V-12M17 -56V-12",
    testa:"M0 -222L-10 -190L-2 -156M0 -222L10 -190L2 -156M0 -220L-3 -200L0 -160L3 -200ZM-36 -190H-26M-17 -112V-12M17 -112V-12",
    trench:"M-47 -150H47M0 -219L-12 -186L-5 -150M0 -219L12 -186L5 -150M-10 -134V-64M10 -134V-64M-40 -214L-30 -202M40 -214L30 -202",
    coppola:"M-17 -265C-4 -263 10 -262 21 -266M-26 -222L-6 -200L-10 -116M26 -222L6 -200L10 -116M-3 -196V-120M-18 -112V-12M18 -112V-12",
    donna:"M-18 -236C-20 -214 -14 -206 -12 -200M18 -236C20 -214 14 -206 12 -200M-24 -150H24M-10 -120C-14 -96 -20 -78 -26 -62M10 -120C14 -96 20 -78 26 -62",
    ragazzo:"M-8 -222V-200M8 -222V-200M0 -220V-126M-24 -166H24M-26 -166V-140H26V-166M-17 -122V-10M17 -122V-10"
  };
  // personaggio: x, y (piedi), s, z (0 lontano … 2 vicino), flip, col, rim (luce di contorno: -1 sinistra, 1 destra, 0 tutt'intorno)
  function figura(c, tipo, o){
    let inner = FIG[tipo] || FIG.uomo;
    const col = o.col || c.col(o.z == null ? 2 : o.z), s = o.s || 1, glow = o.rimCol || c.p.glow;
    if(tipo === "garibaldino") inner = inner.replace('<path d="M-42 -100H42', '<path d="M-46 -214Q-48 -224 -28 -228L0 -216L28 -228Q48 -224 46 -214L44 -100H-44Z" fill="#b3201e"/><path d="M-42 -100H42');
    if(tipo === "legionario") inner += '<path d="M-4 -284Q0 -312 34 -302Q12 -298 4 -284Z" fill="#b3201e"/>';
    if(tipo === "robot") inner += `<circle cx="-11" cy="-266" r="6" fill="${c.p.acc}"/><circle cx="11" cy="-266" r="6" fill="${c.p.acc}"/>`;
    if(tipo === "astronauta") inner += `<path d="M-20 -262Q0 -282 20 -262Q14 -234 0 -232Q-14 -234 -20 -262Z" fill="${glow}" opacity=".6"/>`;
    let extra = "";
    if(o.occhiali) extra += `<g fill="none" stroke="${glow}" stroke-width="2"><circle cx="-6" cy="-247" r="5"/><circle cx="8" cy="-247" r="5"/><path d="M-1 -247H3"/></g>`;
    if(o.casco) extra += '<path d="M-20 -256Q-20 -290 0 -292Q20 -290 20 -256L27 -253H-27Z" fill="#f2c230"/>';
    if(o.collana) extra += '<path d="M-12 -214Q0 -196 12 -214" fill="none" stroke="#ffd36b" stroke-width="2.6"/><circle cx="0" cy="-199" r="3.4" fill="#ffd36b"/>';
    if(o.numero) extra += `<text x="0" y="-150" text-anchor="middle" font-family="${SANS}" font-weight="800" font-size="46" fill="${glow}" opacity=".85">${esc(o.numero)}</text>`;
    if(o.ombrello) extra += '<path d="M-60 -300Q-56 -382 34 -388Q124 -382 128 -300Q112 -312 97 -300Q82 -312 66 -300Q50 -312 34 -300Q18 -312 2 -300Q-14 -312 -29 -300Q-44 -312 -60 -300Z"/><path d="M33 -388V-212Q33 -200 24 -200" fill="none" stroke="currentColor" stroke-width="4"/><path d="M22 -206L30 -214L36 -208L28 -200Z"/>';
    if(c.hd){
      if(o.y >= 860 && s >= 1.05 && o.alza !== false) o = Object.assign({}, o, { y:o.y - 62 });
      const corpo = c.linU([[0, mix(col, glow, .24)], [.4, mix(col, glow, .07)], [1, col]], 0, -300, 0, 0);
      const det = DETTAGLI[tipo] ? `<path d="${DETTAGLI[tipo]}" fill="none" stroke="${mix(col, glow, .45)}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/>` : "";
      let fig = `<g color="${col}">` + G(o.x, o.y, s, inner + extra + det, corpo, o.flip, o.rot) + "</g>";
      let pre = o.ombra === false ? "" : E(o.x, o.y + 2 * s, 46 * s, 7 * s, c.rad([[0, "#000", .7], [1, "#000", 0]]));
      if(o.rim != null){
        const r = o.rim === true ? 0 : o.rim;
        pre += C(o.x + r * 16 * s, o.y - 230 * s, 190 * s, c.halo(glow, o.haloA == null ? .26 : o.haloA));
        fig = `<g filter="${c.rim(f(r * 2.4), r ? -.6 : -2.6, glow)}">${fig}</g>`;
      }
      return pre + fig;
    }
    let out = "";
    if(o.rim != null){
      const dx = (o.rim === true ? 0 : o.rim) * 2.6 * s;
      out += C(o.x + dx * 6, o.y - 230 * s, 170 * s, c.halo(glow, o.haloA == null ? .22 : o.haloA));
      out += `<g color="${glow}" opacity="${o.rimA || .9}">` + `<g transform="translate(${f(o.x + dx)} ${f(o.y - 1.2 * s)}) scale(${o.flip ? -s : s} ${s})" fill="${glow}" stroke="${glow}" stroke-width="3.4" stroke-linejoin="round">${(inner + extra).replace(/ fill="(?!none)[^"]*"/g, "").replace(/<text[\s\S]*?<\/text>/g, "")}</g></g>`;
    }
    out += `<g color="${col}">` + G(o.x, o.y, s, inner + extra, col, o.flip, o.rot) + "</g>";
    return out;
  }
  Object.keys(FIG).forEach(t => EL[t] = (c, o) => figura(c, t, o));
  EL.coppia = (c, o) => figura(c, o.lui || "testa", Object.assign({}, o, { x:o.x - 34 * (o.s || 1) })) + figura(c, o.lei || "donna", Object.assign({}, o, { x:o.x + 30 * (o.s || 1), s:(o.s || 1) * .94, flip:true }));
  EL.banda = (c, o) => (o.tipi || ["testa", "coppola", "ragazzo", "uomo", "ragazzo"]).map((t, i, a) => figura(c, t, Object.assign({}, o, { x:o.x + (i - (a.length - 1) / 2) * (o.passo || 76) * (o.s || 1), y:o.y + (i % 2) * 6, s:(o.s || 1) * (i % 2 ? .95 : 1) * (t === "bambina" || t === "bambino" ? 1.05 : 1) }))).join("");
  EL.lupo = (c, o) => G(o.x, o.y, o.s || 1, P("M-60 0Q-74 -22 -56 -40Q-40 -50 -30 -78Q-24 -104 -8 -122L-12 -150Q-4 -140 2 -136L8 -158Q14 -140 14 -128Q30 -130 44 -150Q40 -124 26 -108Q36 -86 34 -58Q40 -30 44 0Z", c.col(o.z == null ? 2 : o.z)) + P("M-56 -6Q-90 -10 -110 -30Q-84 -22 -60 -24Z", c.col(o.z == null ? 2 : o.z)) + C(10, -128, 2.6, c.p.acc), null, o.flip);
  EL.streghe = (c, o) => (o.pos || [[210, 230, .9], [380, 190, .7], [470, 280, .55]]).map(([x, y, s], i) => G(x, y, s, L(-40, 6, 44, -4, c.col(2), 3) + P("M34 -4L58 -12L56 4Z", c.col(2)) + P("M-8 2L4 -30L16 2Z", c.col(2)) + C(5, -34, 6, c.col(2)) + P("M0 -38L8 -60L13 -37Z", c.col(2)) + S("M-6 -6Q-26 -2 -30 10", c.col(2), 3), null, i % 2 === 1, -8)).join("");

  /* ---------- oggetti protagonisti ---------- */
  EL.rosa = (c, o) => G(o.x, o.y, o.s || 1,
    S("M0 10Q-12 120 6 300", "#1f4a26", 8) + P("M2 120Q-60 100 -78 60Q-30 64 2 110Z", "#2a6a32") + P("M4 190Q60 170 84 128Q36 134 4 180Z", "#2a6a32") +
    C(0, -20, 64, "#6e0b17") + C(-30, -24, 40, "#94142a") + C(30, -24, 40, "#94142a") + C(0, -52, 36, "#b31b33") + C(-14, -36, 24, "#c8243c") + C(16, -36, 24, "#c8243c") +
    S("M-14 -44Q0 -70 18 -50Q30 -28 6 -20Q-16 -18 -12 -38Q-6 -50 6 -44", "#4a0610", 4, .9) + S("M-52 -6Q-40 22 0 26Q40 22 52 -6", "#4a0610", 3, .6) + C(-10, -60, 10, "#ff6a7a", .35) + C(0, -30, 140, c.halo("#ff2a3a", .25)), null, false, o.rot || 0);
  EL.limoni = (c, o) => {
    const lim = (x, y, r) => E(x, y, r * 1.25, r, c.rad([[0, "#fff59a"], [.6, "#f2cf2e"], [1, "#c89a12"]], .38, .35, .7), null, ` transform="rotate(-20 ${x} ${y})"`) + E(x + r * 1.18, y - r * .4, r * .18, r * .12, "#c89a12");
    return G(o.x, o.y, o.s || 1, S("M-160 -40Q-40 -10 120 -70", "#4a3020", 9) + [[-120, -60, -30], [-40, -20, 20], [40, -66, -40], [90, -40, 30], [-80, 0, 40], [-150, -20, 10]].map(([x, y, r]) => E(x, y, 48, 18, "#2c6a2a", null, ` transform="rotate(${r} ${x} ${y})"`)).join("") + lim(-70, 10, 30) + lim(10, 30, 34) + lim(70, -10, 28), null, o.flip);
  };
  EL.cavallo = (c, o) => {
    const col = o.col || c.col(o.z == null ? 2 : o.z);
    const corpo = "M-86 -34C-60 -52 -20 -50 10 -46C30 -44 38 -50 44 -56C60 -76 80 -102 102 -114L106 -128L114 -114C128 -108 146 -94 156 -80C160 -72 156 -62 146 -63C132 -64 120 -72 112 -74C104 -58 94 -38 88 -22C84 -4 68 10 50 16L30 22C0 28 -30 28 -52 22C-70 18 -86 10 -94 -4C-100 -18 -98 -28 -86 -34Z";
    const coda = "M-84 -28C-110 -36 -140 -30 -168 -12C-150 -18 -126 -20 -104 -14C-120 -8 -140 4 -150 18C-126 4 -104 -4 -88 -10Z";
    const gambe = "M42 4C62 0 84 10 100 18L134 36L148 40L152 48L140 50L128 44L96 30C78 24 58 22 40 18Z" + "M46 10C60 16 76 30 90 44L114 62L126 64L128 72L114 72L100 64L80 50C68 40 54 30 42 22Z" +
      "M-62 -6C-78 -2 -100 10 -116 22L-146 40L-160 42L-164 50L-150 52L-136 46L-108 34C-92 26 -76 18 -58 12Z" + "M-56 6C-70 16 -88 32 -100 46L-124 66L-136 68L-138 76L-124 76L-110 68L-88 52C-76 40 -62 28 -48 18Z";
    const criniera = "M44 -56C60 -76 80 -102 102 -114C92 -116 84 -110 76 -104C78 -98 70 -94 64 -88C66 -82 58 -78 52 -72C52 -66 46 -62 40 -58Z";
    return G(o.x, o.y, o.s || 1, P(coda, col) + P(gambe, col) + P(corpo, col) + P(criniera, col) + S("M58 -82q-12 -8 -24 -4q-6 2 -12 -3M72 -96q-12 -9 -26 -5q-6 1 -11 -4M86 -108q-12 -10 -26 -8", col, 3.6) + C(130, -96, 2.6, c.p.glow, .8) + (o.drappo ? P("M-20 -40H24L20 -8H-16Z", o.drappo, .9) : ""), null, o.flip);
  };
  EL.anello = (c, o) => G(o.x, o.y, o.s || 1, C(0, -40, 140, c.halo("#fff3c0", .3)) + E(0, 0, 60, 54, "none", null, ' stroke="#e6c25a" stroke-width="12"') + E(0, 0, 60, 54, "none", null, ' stroke="#fff3c0" stroke-width="3" stroke-opacity=".7"') + P("M-24 -54L-12 -80H12L24 -54L0 -30Z", "#eaf6ff") + S("M0 -96V-126M-20 -104L-34 -118M20 -104L34 -118", "#ffffff", 3, .8));
  EL.bici = (c, o) => {
    const col = o.col || c.col(o.z == null ? 2 : o.z);
    return G(o.x, o.y, o.s || 1, `<circle cx="-70" cy="0" r="46" fill="none" stroke="${col}" stroke-width="7"/><circle cx="70" cy="0" r="46" fill="none" stroke="${col}" stroke-width="7"/>` + S("M-70 0L-20 -70L50 -70L70 0M-20 -70L0 0L-70 0M0 0L50 -70M50 -70L44 -96L66 -100M-26 -84H-6", col, 7) + (o.cesto ? R(54, -100, 34, 24, col) : ""), null, o.flip, o.rot);
  };
  EL.ciak = (c, o) => G(o.x, o.y, o.s || 1, R(-110, -60, 220, 140, "#141414") + R(-104, -54, 208, 128, "#1e1e1e") + [0, 1, 2].map(k => L(-90, -20 + k * 34, 90, -20 + k * 34, "#e8e8e8", 2, .6)).join("") +
    `<text x="-88" y="-28" font-family="${SANS}" font-weight="800" font-size="15" fill="#e8e8e8" opacity=".8">SCENA 1</text><text x="10" y="-28" font-family="${SANS}" font-weight="800" font-size="15" fill="#e8e8e8" opacity=".8">CIAK 1</text>` +
    `<g transform="rotate(-16 -110 -60)">` + R(-110, -96, 220, 34, "#141414") + [0, 1, 2, 3, 4, 5].map(k => P(`M${-104 + k * 38} -62L${-86 + k * 38} -96H${-70 + k * 38}L${-88 + k * 38} -62Z`, "#f2f2f2")).join("") + "</g>", null, false, o.rot || 0);
  EL.cavalletto = (c, o) => G(o.x, o.y, o.s || 1, S("M-60 0L-10 -330M60 0L10 -330M0 -320V20", "#3a2a1c", 9) + R(-90, -300, 180, 210, "#efe4cc") + R(-84, -294, 168, 198, c.lin([[0, "#b08a5a"], [1, "#5a3a22"]])) + E(-10, -200, 40, 54, "#2a1a10", .55) + C(-10, -240, 20, "#e8c8a0", .5) + R(-90, -92, 180, 8, "#3a2a1c"));
  EL.uva = (c, o) => {
    let e = (o.ramo ? S("M-120 -240Q-60 -230 -20 -190Q0 -170 6 -150", "#3a2414", 9) + P("M-70 -236Q-40 -280 0 -262Q-20 -224 -70 -236Z", "#2f5a24") + P("M-110 -226Q-120 -270 -84 -268Q-82 -232 -110 -226Z", "#3a6a2a") : "") + S("M0 -150Q8 -170 24 -176", "#4a3020", 6) + P("M10 -160Q70 -190 90 -140Q60 -130 10 -150Z", "#3a6a2a");
    [[-40, -120], [-12, -124], [16, -120], [44, -116], [-28, -92], [0, -94], [28, -90], [-16, -64], [12, -64], [-2, -38]].forEach(([x, y]) => e += C(x, y, 17, c.rad([[0, "#b07ac8"], [.6, "#5a2a6a"], [1, "#2a0e34"]], .35, .3, .7)));
    return G(o.x, o.y, o.s || 1, e, null, o.flip);
  };
  EL.lettera = (c, o) => G(o.x, o.y, o.s || 1, R(-120, -80, 240, 160, "#efe2c4") + P("M-120 -80L0 10L120 -80", "none", null, ' stroke="#b8a47e" stroke-width="3"') + P("M-120 80L-30 0M120 80L30 0", "none", null, ' stroke="#b8a47e" stroke-width="2"') + C(0, 10, 22, "#9a1a1a") + C(0, 10, 14, "#b82a2a") + R(66, -66, 36, 44, "#6a8ab0", .8) + R(70, -62, 28, 36, "none", null, ' stroke="#efe2c4" stroke-width="2"') + (o.scritta ? S("M-96 40q20 -10 40 0t40 0M-96 58q30 -8 60 0", "#6a5a3a", 2, .6) : ""), null, false, o.rot || -8);
  EL.lanterna = (c, o) => {
    const col = o.col || "#ffc04a", k = "#141008";
    return G(o.x, o.y, o.s || 1, C(0, -74, 200, c.halo(col, .6)) + `<circle cx="0" cy="-166" r="12" fill="none" stroke="${k}" stroke-width="5"/>` + P("M-30 -130L-20 -152H20L30 -130Z", k) + R(-34, -134, 68, 10, k, null, ' rx="3"') +
      R(-27, -124, 54, 92, c.rad([[0, "#ffffff"], [.4, col], [1, col, .6]]), null, ' rx="10"') + E(0, -74, 8, 15, "#ffffff") + R(-27, -124, 54, 92, "none", null, ` rx="10" stroke="${k}" stroke-width="5"`) + R(-36, -34, 72, 12, k, null, ' rx="4"'));
  };
  EL.auto = (c, o) => G(o.x, o.y, o.s || 1,
    (o.scia ? [0, 1, 2, 3, 4].map(k => L(-220 - k * 30, -60 + k * 14, -420 - k * 50, -60 + k * 14, "#ffffff", 3 - k * .4, .3)).join("") : "") +
    P("M-190 -20Q-188 -60 -150 -66L-90 -74Q-60 -116 0 -118Q50 -116 84 -76L160 -66Q196 -60 196 -26L190 0H-186Z", c.lin([[0, o.colA || "#e0372f"], [1, o.colB || "#7a0f12"]])) +
    S("M-170 -62Q-40 -80 170 -60", "#ffffff", 3, .35) + P("M-60 -76Q-40 -104 0 -106Q34 -104 54 -78Z", "#1a2228", .9) + C(-110, 0, 40, "#111") + C(-110, 0, 22, "#9a9a9a") + C(118, 0, 40, "#111") + C(118, 0, 22, "#9a9a9a") +
    (o.numero !== false ? C(6, -46, 22, "#f2f2f2") + `<text x="6" y="-38" text-anchor="middle" font-family="${SANS}" font-weight="800" font-size="22" fill="#111">${esc(o.numero || 55)}</text>` : "") + C(-30, -100, 14, "#e8e0d0") + C(30, -98, 13, "#2a1a10") + S("M150 -60L176 -46", "#fff8c0", 4, .8), null, o.flip);
  EL.supercar = (c, o) => G(o.x, o.y, o.s || 1,
    E(0, 8, 230, 16, c.halo(o.luce || "#5ee1ff", .8)) +
    P("M-216 -4L-206 -34Q-130 -50 -70 -74Q-10 -96 60 -92Q130 -84 200 -44L218 -14L212 0H-210Z", c.lin([[0, o.col || "#ff3aa0"], [1, "#3a0a3a"]])) +
    P("M-60 -70Q0 -90 56 -88Q100 -80 130 -60H-40Z", "#0a0a14", .9) + S("M-200 -30Q-60 -52 210 -36", "#ffffff", 2.4, .45) + C(-130, 0, 34, "#0a0a0a") + C(-130, 0, 18, "#5a5a6a") + C(140, 0, 34, "#0a0a0a") + C(140, 0, 18, "#5a5a6a") + R(186, -34, 26, 8, "#fff6d0") + L(212, -30, 600, -30, "#fff6d0", 2, .2), null, o.flip);
  EL.autoRetro = (c, o) => G(o.x, o.y, o.s || 1,
    C(-110, -40, 60, c.halo("#ff3a2a", .6)) + C(110, -40, 60, c.halo("#ff3a2a", .6)) +
    P("M-160 -160Q-150 -200 -60 -204Q-56 -218 -40 -220Q-24 -222 -20 -204H20Q22 -224 40 -224Q58 -222 60 -204Q150 -200 160 -160Z", c.col(2)) +
    P("M-150 -150Q-170 -126 -170 -80V-6H170V-80Q170 -126 150 -150Z", c.lin([[0, "#3a1a2a"], [1, "#0a0408"]])) + R(-160, -110, 320, 6, "#c8c0d0", .5) +
    R(-150, -86, 60, 22, "#ff3a2a") + R(90, -86, 60, 22, "#ff3a2a") + R(-38, -70, 76, 24, "#e8e0c8") + `<text x="0" y="-52" text-anchor="middle" font-family="${SANS}" font-weight="800" font-size="16" fill="#1a1a1a">I0N1A</text>` +
    R(-160, -10, 46, 40, "#050505", null, ' rx="8"') + R(114, -10, 46, 40, "#050505", null, ' rx="8"'));
  EL.smartphone = (c, o) => G(o.x, o.y, o.s || 1, C(0, -150, 220, c.halo("#ff5fa0", .45)) + R(-80, -300, 160, 300, "#101014", null, ' rx="24"') + R(-70, -286, 140, 272, c.lin([[0, "#ff7ab6"], [1, "#6a3aff"]]), null, ' rx="14"') +
    E(-4, -190, 34, 22, "#ffd84a") + C(24, -214, 15, "#ffd84a") + P("M36 -216L54 -210L36 -204Z", "#ff8a1a") + C(28, -218, 3, "#1a1a1a") + S("M-30 -180q20 18 50 0", "#e8b81a", 3, .8) +
    P("M-10 -136Q-10 -150 0 -144Q10 -150 10 -136Q10 -126 0 -118Q-10 -126 -10 -136Z", "#ffffff", .95) + `<text x="0" y="-70" text-anchor="middle" font-family="${SANS}" font-weight="800" font-size="32" fill="#fff">8,2 M</text>` + `<text x="0" y="-40" text-anchor="middle" font-family="${SANS}" font-weight="700" font-size="13" fill="#fff" opacity=".8">VISUALIZZAZIONI</text>` + C(-44, -262, 9, "#fff", .7) + R(-28, -267, 72, 10, "#fff", .5, ' rx="5"'), null, false, o.rot || 8);
  EL.sonda = (c, o) => G(o.x, o.y, o.s || 1, E(0, -40, 90, 30, "#d8dce4") + E(0, -40, 70, 20, "#a0a8b8") + L(0, -40, 0, 20, "#c0c8d0", 6) + R(-30, 10, 60, 40, "#c0a060") + C(0, 30, 13, "#f2d27a") + C(0, 30, 6, "#a07a2a") + L(-30, 30, -180, 60, "#c0c8d0", 3) + L(30, 30, 160, 90, "#c0c8d0", 3) + C(-180, 60, 8, "#c0c8d0") + L(0, 50, 0, 140, "#c0c8d0", 2) + C(0, -40, 150, c.halo("#fff3c0", .18)), null, false, o.rot || -14);
  EL.torta = (c, o) => {
    const fr = ["#e9524a", "#7fd4a0", "#f3c873", "#ff9ec6"];
    let e = R(-120, -90, 240, 90, o.cassata ? "#e8f0d8" : "#f6e6d0", null, ' rx="14"') + R(-80, -160, 160, 74, o.cassata ? "#9ad08a" : "#fff0e0", null, ' rx="12"') + S("M-120 -84Q-90 -70 -60 -84T0 -84T60 -84T120 -84", o.cassata ? "#9ad08a" : "#f2a0b8", 8) + S("M-80 -154Q-55 -140 -30 -154T20 -154T80 -154", o.cassata ? "#f6f6f6" : "#f2a0b8", 7);
    for(let k = 0; k < 8; k++) e += C(-100 + k * 28, -40 + (k % 2) * 14, 8, fr[k % 4]);
    if(o.cassata) e += C(0, -172, 14, "#e9524a") + C(-40, -166, 9, "#7fd4a0") + C(40, -166, 9, "#f3c873");
    if(o.candeline) for(let k = -2; k <= 2; k++) e += R(k * 26 - 4, -206, 8, 46, ["#7fb8ff", "#ff9ec6", "#ffe27a"][(k + 3) % 3]) + P(`M${k * 26} -232Q${k * 26 - 8} -214 ${k * 26} -208Q${k * 26 + 8} -214 ${k * 26} -232Z`, "#ffcf4a") + C(k * 26, -218, 22, "#ffcf4a", .22);
    return G(o.x, o.y, o.s || 1, C(0, -100, 200, c.halo("#ffffff", .2)) + e);
  };
  EL.motoscafo = (c, o) => G(o.x, o.y, o.s || 1,
    P("M-160 -10L180 -30L130 10H-150Z", "#1c4aa0") + P("M-160 -10L180 -30L176 -22L-156 -2Z", "#5a8ae0", .8) + P("M-60 -24L40 -34L70 -60H-30Z", "#2a5ab0") + P("M-40 -40L30 -48L50 -58H-20Z", "#9ad0ff", .6) + C(-10, -64, 9, "#0a0a14") + R(-18, -56, 16, 20, "#0a0a14") +
    S("M-150 8Q-260 -10 -360 30", "#ffffff", 8, .8) + S("M-140 14Q-240 20 -330 60", "#ffffff", 4, .5) + [0, 1, 2, 3, 4, 5].map(k => C(-170 - k * 30, -14 - (k % 2) * 10, 10 - k, "#ffffff", .6)).join("") + S("M130 4Q170 14 200 -6", "#ffffff", 5, .6), null, o.flip);
  EL.maschera = (c, o) => G(o.x, o.y, o.s || 1,
    S("M-20 -60Q-60 -160 -10 -230M0 -60Q10 -180 60 -220M20 -56Q60 -140 100 -150", "#c84a8a", 10) +
    `<path d="M-130 -20Q-120 -70 -60 -70Q-20 -66 0 -44Q20 -66 60 -70Q120 -70 130 -20Q110 30 60 40Q20 40 0 10Q-20 40 -60 40Q-110 30 -130 -20ZM-90 -18Q-70 -40 -40 -24Q-62 -2 -90 -18ZM90 -18Q70 -40 40 -24Q62 -2 90 -18Z" fill-rule="evenodd" fill="${c.lin([[0, "#fff0b0"], [.5, "#e0b040"], [1, "#9a6a12"]])}"/>` +
    S("M-120 -18Q-60 -86 0 -40Q60 -86 120 -18", "#ffffff", 2, .4) + C(0, -40, 7, "#9a1a3a"), null, false, o.rot);
  EL.carte = (c, o) => {
    const carta = (r, simb, colS) => `<g transform="rotate(${r})">` + R(-46, -150, 92, 130, "#f6f2ea", null, ' rx="8"') + `<text x="-30" y="-124" font-family="${SERIF}" font-weight="700" font-size="24" fill="${colS}">A</text><text x="0" y="-62" text-anchor="middle" font-size="40" fill="${colS}">${simb}</text></g>`;
    return G(o.x, o.y, o.s || 1, carta(-22, "♠", "#111") + carta(-4, "♥", "#c41e2a") + carta(14, "♦", "#c41e2a"), null, false, o.rot);
  };
  EL.pallone = (c, o) => G(o.x, o.y, o.s || 1, C(0, 0, 140, c.halo("#ffffff", .3)) + C(0, 0, 70, c.rad([[0, "#ffffff"], [.8, "#dcdcdc"], [1, "#8a8a8a"]], .35, .3, .75)) + P("M0 -24L23 -7L14 20H-14L-23 -7Z", "#111") + [[0, -24, 0, -62], [23, -7, 58, -20], [14, 20, 36, 50], [-14, 20, -36, 50], [-23, -7, -58, -20]].map(([a, b, x, y]) => L(a, b, x, y, "#333", 2.4)).join("") + [[0, -66], [62, -20], [38, 54], [-38, 54], [-62, -20]].map(([x, y]) => C(x, y, 12, "#111", .85)).join(""));
  EL.valigetta = (c, o) => G(o.x, o.y, o.s || 1, (o.luce ? P("M-100 -100L-220 -420H220L100 -100Z", c.lin([[0, "#5ee1ff", 0], [1, "#5ee1ff", .35]], 0, 0)) + C(0, -100, 160, c.halo("#5ee1ff", .4)) : "") + R(-110, -100, 220, 130, "#16161c", null, ' rx="10"') + R(-110, -100, 220, 130, "none", null, ` rx="10" stroke="${o.luce ? "#5ee1ff" : "#8a8a8a"}" stroke-width="3"`) + P("M-40 -100V-130H40V-100", "none", null, ' stroke="#8a8a8a" stroke-width="8"') + R(-80, -40, 26, 12, "#c0c0c0") + R(54, -40, 26, 12, "#c0c0c0"));
  EL.valigia = (c, o) => G(o.x, o.y, o.s || 1, R(-80, -110, 160, 110, "#7a5a3a", null, ' rx="8"') + R(-80, -110, 160, 110, "none", null, ' rx="8" stroke="#4a321e" stroke-width="4"') + R(-50, -110, 10, 110, "#4a321e") + R(40, -110, 10, 110, "#4a321e") + P("M-20 -110V-130H20V-110", "none", null, ' stroke="#3a2614" stroke-width="7"') + R(-60, -70, 40, 24, "#e8dcc0", .7));
  EL.aereo = (c, o) => G(o.x, o.y, o.s || 1, P("M-160 -10L120 -30L170 -20L160 0H-150Z", "#c8ccd2") + P("M90 -26L150 -130L176 -128L160 -28Z", "#a8acb2") + P("M-60 -14L-20 -130L10 -126L0 -16Z", "#b8bcc2") + R(-130, -26, 260, 4, "#c84a3a") + [0, 1, 2, 3].map(k => C(-100 + k * 40, -16, 6, "#2a3440")).join(""), null, o.flip, o.rot || 0);
  EL.coccodrillo = (c, o) => G(o.x, o.y, o.s || 1, P("M-220 0Q-160 -22 -90 -20Q-40 -30 40 -22L150 -12Q190 -8 200 0Z", "#1a2a1a") + [-170, -140, -110, -80, -50, -20].map(x => P(`M${x} -16l12 -16l12 16Z`, "#1a2a1a")).join("") + E(40, -30, 14, 10, "#1a2a1a") + C(40, -32, 5, "#ffd24a") + C(40, -32, 16, "#ffd24a", .25) + S("M-240 4Q0 16 240 4", "#9ad0c0", 2, .4), null, o.flip);
  EL.insegna = (c, o) => {
    const col = o.col || c.p.acc, fs = o.fs || 64;
    return G(o.x, o.y, o.s || 1, C(0, -10, 230, c.halo(col, .32)) + R(-o.w / 2, -fs * .95, o.w, fs * 1.35, "#0a0a10", .85, ' rx="10"') + R(-o.w / 2, -fs * .95, o.w, fs * 1.35, "none", null, ` rx="10" stroke="${col}" stroke-width="4" stroke-opacity=".8"`) +
      `<text x="0" y="${f(fs * .2)}" text-anchor="middle" font-family="${o.font || SERIF}" font-style="italic" font-weight="700" font-size="${fs}" fill="none" stroke="${col}" stroke-width="10" stroke-opacity=".35">${esc(o.t)}</text><text x="0" y="${f(fs * .2)}" text-anchor="middle" font-family="${o.font || SERIF}" font-style="italic" font-weight="700" font-size="${fs}" fill="#fff4fa">${esc(o.t)}</text>`, null, false, o.rot);
  };
  EL.bottega = (c, o) => {
    const x = o.x, y = o.y || HOR, w = o.w || 300, h = o.h || 210, col = o.col || c.p.acc, wall = c.col(2), top = y - h - (o.alto || 230);
    const wx = x - w / 2 + 22, ww = w - 44, wy = y - h + 46, wh = h - 58;
    let e = P(`M${f(wx - 30)} ${y}L${f(wx + ww + 30)} ${y}L${f(wx + ww + 120)} ${VH}L${f(wx - 120)} ${VH}Z`, c.lin([[0, col, .4], [1, col, 0]]));
    for(let k = 0; k < 14; k++) e += R(wx + c.rnd(0, ww), y + 6 + c.rnd(0, 50), c.rnd(2, 7), c.rnd(50, 170), col, f(c.rnd(.08, .28)));
    e += R(x - w / 2, top, w, y - top + 4, wall);
    for(let r = 0; r < 3; r++) for(let k = 0; k < 4; k++) if(c.R() < .5) e += R(x - w / 2 + 24 + k * (w - 48) / 4, top + 26 + r * 70, 26, 40, c.p.acc, c.R() < .5 ? .7 : .15);
    e += R(wx, wy, ww, wh, c.lin([[0, "#fff6dc"], [.45, col], [1, "#3a2010"]]));
    for(let k = 0; k < 3; k++) e += R(wx + 8, wy + 16 + k * 26, ww - 16, 3, "#2a1608", .6);
    for(let k = 0; k < 22; k++) e += R(wx + 12 + c.rnd(0, ww - 24), wy + 4 + Math.floor(c.rnd(0, 3)) * 26, 5, 12, "#2a1608", .55);
    e += R(wx, wy + wh - 30, ww, 30, "#2a1608", .75);
    if(o.dentro){ const cid = c.clip(R(wx, wy, ww, wh, "#000")); e += `<g clip-path="${cid}">` + figura(c, o.dentro, { x:wx + ww * (o.dx || .32), y:wy + wh + 120, s:o.ds || .75, col:"#140a04" }) + "</g>"; }
    if(o.oggetto) e += o.oggetto(wx + ww / 2, wy + wh - 26);
    e += R(x - 3, wy, 6, wh, wall) + R(wx - 4, wy - 4, ww + 8, 6, wall);
    const aw = ww + 40, ay = wy - 8;
    for(let k = 0; k < 10; k++) e += P(`M${f(x - aw / 2 + k * aw / 10)} ${f(ay - 34)}H${f(x - aw / 2 + (k + 1) * aw / 10)}L${f(x - aw / 2 + (k + 1) * aw / 10 + 4)} ${ay}H${f(x - aw / 2 + k * aw / 10 + 4)}Z`, k % 2 ? (o.tenda || "#7a1a1a") : "#e8dcc4", .92);
    if(o.insegna) e += EL.insegna(c, { x, y:ay - 64, w:Math.min(w, o.insegna.length * 30 + 50), t:o.insegna, col, fs:o.fs || 44 });
    return e;
  };
  EL.tazzina = (c, o) => G(o.x, o.y, o.s || 1, [0, 1, 2].map(k => S(`M${-20 + k * 20} -140Q${-36 + k * 20} -180 ${-14 + k * 20} -210Q${4 + k * 20} -240 ${-10 + k * 20} -270`, "#ffffff", 5, .35)).join("") + E(0, 0, 130, 22, "#f2f0ea") + P("M-80 -100H80Q76 -20 0 -10Q-76 -20 -80 -100Z", "#f6f4ee") + E(0, -100, 80, 14, "#3a1e0e") + S("M78 -84Q120 -80 112 -50Q104 -30 70 -36", "#f6f4ee", 10));
  EL.piatto = (c, o) => G(o.x, o.y, o.s || 1, C(0, -60, 200, c.halo("#ffd9a0", .3)) + [0, 1, 2].map(k => S(`M${-30 + k * 30} -60Q${-46 + k * 30} -110 ${-24 + k * 30} -140Q${-6 + k * 30} -170 ${-20 + k * 30} -200`, "#ffffff", 5, .35)).join("") + E(0, 0, 150, 30, "#f2efe6") + P("M-110 -20Q0 -110 110 -20Z", "#e9c36a") + [[-50, -36], [-10, -54], [30, -40], [60, -28], [-70, -24], [10, -30]].map(([x, y]) => E(x, y, 16, 10, "#f6d890") + C(x, y, 5, "#c89a3a", .7)).join(""));
  EL.corona = (c, o) => G(o.x, o.y, o.s || 1, C(0, -60, 200, c.halo("#ffd36b", .3)) + P("M-110 0L-120 -110L-60 -50L0 -130L60 -50L120 -110L110 0Z", c.lin([[0, "#fff0a0"], [.5, "#e0b040"], [1, "#8a5a10"]])) + R(-110, -10, 220, 26, "#c8942a") + [[-60, "#c41e2a"], [0, "#1e6ac4"], [60, "#1ea04a"]].map(([x, col]) => C(x, 3, 9, col)).join("") + [[-120, -110], [0, -130], [120, -110]].map(([x, y]) => C(x, y, 10, "#fff3c0")).join(""));
  EL.buconero = (c, o) => G(o.x, o.y, o.s || 1, C(0, 0, 420, c.halo("#ff9a4a", .22)) + E(0, 0, 300, 70, "none", null, ' stroke="#ffb35a" stroke-width="26" stroke-opacity=".55"') + E(0, 0, 250, 52, "none", null, ' stroke="#fff0c0" stroke-width="10" stroke-opacity=".85"') + C(0, 0, 150, c.rad([[0, "#ffb35a", 0], [.6, "#ffb35a", 0], [.7, "#ffe0a0", .9], [.8, "#ff8a2a", .5], [1, "#ff8a2a", 0]])) + C(0, 0, 104, "#000000") + P("M-300 2Q0 -36 300 2Q0 30 -300 2Z", "#ffe0a0", .6) + S("M-104 0A104 104 0 0 1 104 0", "#fff6d8", 3, .6));
  EL.pianeta = (c, o) => {
    const r = o.r || 200, x = o.x, y = o.y;
    let e = C(x, y, r * 1.3, c.halo(o.col || "#e0a870", .3)) + C(x, y, r, c.lin([[0, "#f2d6b0"], [.3, "#c8905a"], [.45, "#e6c098"], [.6, "#a8683a"], [.8, "#d8a878"], [1, "#8a5030"]]));
    e += E(x + r * .3, y + r * .25, r * .22, r * .12, "#b8582a", .8) + C(x, y, r, c.rad([[0, "#000", 0], [.65, "#000", 0], [1, "#000", .75]], .3, .32, .85));
    if(o.anelli) e += E(x, y, r * 1.9, r * .32, "none", null, ` stroke="#e6d0a8" stroke-width="${f(r * .1)}" stroke-opacity=".6" transform="rotate(-14 ${x} ${y})"`);
    return e;
  };
  EL.tripode = (c, o) => {
    const col = o.col || c.col(o.z == null ? 1 : o.z);
    return G(o.x, o.y || HOR, o.s || 1, S("M0 -430L-110 4M0 -430L80 4M0 -430L-20 4", col, 12) + E(0, -450, 90, 44, col) + E(0, -472, 60, 26, col) + C(30, -440, 12, "#ff3a2a") + C(30, -440, 50, c.halo("#ff3a2a", .7)) + P("M30 -440L-300 -20L-230 20Z", c.linU([[0, "#ff3a2a", .7], [1, "#ff3a2a", 0]], 30, -440, -270, 0)) + S("M-60 -420Q-110 -380 -100 -330M60 -420Q100 -380 86 -320", col, 6), null, o.flip);
  };
  EL.aquila = (c, o) => G(o.x, o.y, o.s || 1, P("M0 0Q-40 -30 -120 -40Q-180 -44 -230 -20Q-170 -24 -130 -10Q-180 0 -210 20Q-150 6 -110 10Q-130 24 -150 44Q-90 20 -40 16L0 30L40 16Q90 20 150 44Q130 24 110 10Q150 6 210 20Q180 0 130 -10Q170 -24 230 -20Q180 -44 120 -40Q40 -30 0 0Z", o.col || c.col(1)) + C(0, -8, 12, o.col || c.col(1)), null, false, o.rot);
  EL.bandiera = (c, o) => {
    const fl = "M0 -260Q50 -276 100 -258T200 -256V-180Q150 -196 100 -182T0 -184Z", cols = o.colori || [o.col || "#c41e2a"];
    let e = L(0, 0, 0, -268, c.col(2), 5);
    if(cols.length === 1) e += P(fl, cols[0]);
    else { const id = c.clip(`<path d="${fl}"/>`); e += `<g clip-path="${id}">` + cols.map((col, i) => R(i * 200 / cols.length, -290, 200 / cols.length + 1, 120, col)).join("") + R(0, -290, 200, 120, c.lin([[0, "#000", 0], [.5, "#000", .25], [1, "#000", 0]], 1, 0)) + "</g>"; }
    return G(o.x, o.y, o.s || 1, e, null, o.flip);
  };
  EL.binario = (c, o) => {
    let e = "";
    for(let k = 0; k < 40; k++){ const y = (o.y || 560) + k * k * .22, w = 60 + k * 9; if(y > VH) break; e += L(300 - w / 2, y, 300 + w / 2, y, "#3a3226", f(2 + k * .1), .7); }
    return e + S(`M292 ${o.y || 560}L130 ${VH}`, "#9a9a9a", 3, .7) + S(`M308 ${o.y || 560}L470 ${VH}`, "#9a9a9a", 3, .7);
  };
  EL.luminarie = (c, o) => {
    const x = o.x || 300, y = o.y || HOR, w = o.w || 540, h = o.h || 520, cols = ["#ffe27a", "#ff8a5a", "#7fd4ff", "#ffffff", "#ff9ec6"];
    let e = C(x, y - h * .55, w * .75, c.halo("#ffcf7a", .3));
    for(let r = 0; r < 4; r++){
      const ww = w / 2 - r * 30, hh = h - r * 44, N = 26 - r * 3;
      for(let k = 0; k <= N; k++){ const t = Math.PI * k / N; e += C(x - Math.cos(t) * ww, y - hh * .55 - Math.sin(t) * hh * .45, 3.4, cols[(k + r) % 5], .95); }
      for(let k = 0; k < 9; k++){ const py = y - k * (hh * .55 / 9); e += C(x - ww, py, 3.2, cols[(k + r) % 5]) + C(x + ww, py, 3.2, cols[(k + r + 2) % 5]); }
    }
    for(let k = 0; k < 14; k++){ const a = k * Math.PI / 7; e += C(x + Math.cos(a) * 44, y - h * .62 + Math.sin(a) * 44, 4, cols[k % 5]) + C(x + Math.cos(a) * 22, y - h * .62 + Math.sin(a) * 22, 3, cols[(k + 2) % 5]); }
    return e + C(x, y - h * .62, 9, "#ffffff");
  };
  EL.facciata = (c, o) => {
    const X = o.x || 70, Y = o.y || 130, Wd = o.w || 460, Hd = HOR - Y, cols = 4, rows = 5, cw = Wd / cols, rh = Hd / rows;
    let e = R(X, Y, Wd, Hd + 4, "#c99a6a") + R(X - 12, Y - 18, Wd + 24, 20, "#a8784a") + R(X, Y, Wd, Hd + 4, c.lin([[0, "#000", .05], [1, "#000", .55]]));
    for(let r = 0; r < rows; r++) for(let k = 0; k < cols; k++){
      const wx = X + k * cw + cw * .24, wy = Y + r * rh + rh * .16, ww = cw * .52, wh = rh * .62, speciale = r === 2 && k === 2;
      const lit = !speciale && c.R() < .72, luce = c.pick(["#ffd68a", "#ffc46a", "#bfe0ff", "#ffe8b0", "#ff9ec6"]);
      e += R(wx - 10, wy - 4, 9, wh + 8, "#3a6a4a", .9) + R(wx + ww + 1, wy - 4, 9, wh + 8, "#3a6a4a", .9);
      e += R(wx, wy, ww, wh, speciale ? "#050505" : lit ? luce : "#1a120c", lit ? .95 : 1);
      if(speciale) e += C(wx + ww * .38, wy + wh * .45, 3.4, "#fff36a") + C(wx + ww * .62, wy + wh * .45, 3.4, "#fff36a") + C(wx + ww * .5, wy + wh * .45, 30, c.halo("#fff36a", .25)) + `<text x="${f(wx + ww / 2)}" y="${f(wy + wh + 15)}" text-anchor="middle" font-family="${SANS}" font-weight="800" font-size="11" fill="#e8d8b8" opacity=".8">INT. 7</text>`;
      else if(lit && c.R() < .6){ const px = wx + ww * c.rnd(.3, .7), py = wy + wh; e += C(px, py - wh * .55, wh * .16, "#1a0f08", .85) + P(`M${f(px - wh * .3)} ${f(py)}Q${f(px)} ${f(py - wh * .62)} ${f(px + wh * .3)} ${f(py)}Z`, "#1a0f08", .85); }
      if(r > 0 && (k + r) % 2 === 0){ e += R(wx - 14, wy + wh + 2, ww + 28, 5, "#2a1a10") + [0, 1, 2, 3, 4, 5, 6].map(q => R(wx - 12 + q * (ww + 24) / 6, wy + wh * .62, 2.5, wh * .38 + 4, "#2a1a10")).join(""); if(c.R() < .5) e += C(wx - 6, wy + wh * .5, 10, "#2a6a2a") + C(wx + ww + 6, wy + wh * .55, 8, "#3a7a2a"); }
    }
    e += R(X + Wd * .4, HOR - 90, Wd * .2, 94, "#2a1608") + R(X + Wd * .4 + 8, HOR - 82, Wd * .2 - 16, 86, c.p.acc, .5);
    return e;
  };
  EL.sottosuolo = (c, o) => EL.roccia(c, o) + EL.caverna(c, o);
  EL.scogli = (c, o) => {
    const y = o.y || HOR + 80, x1 = o.x1 == null ? 230 : o.x1, col = o.col || c.col(2);
    let x = o.x0 == null ? -30 : o.x0, e = "";
    while(x < x1){ const w = c.rnd(70, 140), h = c.rnd(50, 130); e += P(`M${f(x)} ${f(y + 60)}Q${f(x - 6)} ${f(y - h)} ${f(x + w * .5)} ${f(y - h - 12)}Q${f(x + w + 6)} ${f(y - h + 8)} ${f(x + w)} ${f(y + 60)}Z`, col) + S(`M${f(x + w * .15)} ${f(y - h * .6)}Q${f(x + w * .45)} ${f(y - h - 8)} ${f(x + w * .8)} ${f(y - h * .7)}`, o.luce || c.p.glow, 2, .22); x += w * .72; }
    return e;
  };
  EL.barcaVela = (c, o) => G(o.x, o.y, o.s || 1, P("M-130 -10L140 -20L108 18H-100Z", c.col(2)) + P("M0 -24L4 -330L124 -42Z", "#efe6d2") + P("M-6 -38L-2 -300L-112 -46Z", "#d8ccb6", .92) + L(0, -20, 4, -344, c.col(2), 4) + S("M-140 16Q0 40 160 14", "#ffffff", 4, .6), null, o.flip, o.rot);
  EL.cassa = (c, o) => G(o.x, o.y, o.s || 1, C(0, -60, 150, c.halo("#ffd27a", .45)) + R(-90, -100, 180, 100, "#5a3a20") + P("M-96 -100Q0 -150 96 -100Z", "#6a4428") + [-60, 60].map(x => R(x - 8, -134, 16, 134, "#2a2a2a")).join("") + R(-90, -60, 180, 3, "#2a1608", .7) + R(-90, -30, 180, 3, "#2a1608", .7) + P("M-96 -102H96L90 -96H-90Z", "#ffe6a0", .9) + R(-12, -96, 24, 28, "#c8a040"));
  EL.noce = (c, o) => {
    const col = o.col || c.col(2), x = o.x || 300, y = o.y || HOR + 10;
    let e = "";
    const ramo = (x1, y1, ang, len, w, d) => {
      const x2 = x1 + Math.cos(ang) * len, y2 = y1 + Math.sin(ang) * len, mx = (x1 + x2) / 2 + c.rnd(-len * .25, len * .25), my = (y1 + y2) / 2 + c.rnd(-len * .25, len * .25);
      e += S(`M${f(x1)} ${f(y1)}Q${f(mx)} ${f(my)} ${f(x2)} ${f(y2)}`, col, f(w));
      if(d > 0){ ramo(x2, y2, ang - c.rnd(.3, .65), len * c.rnd(.62, .78), w * .62, d - 1); ramo(x2, y2, ang + c.rnd(.3, .65), len * c.rnd(.62, .78), w * .62, d - 1); }
    };
    e += P(`M${x - 46} ${y}Q${x - 28} ${y - 120} ${x - 16} ${y - 210}L${x + 16} ${y - 210}Q${x + 32} ${y - 120} ${x + 52} ${y}Z`, col) + S(`M${x - 46} ${y}Q${x - 90} ${y + 10} ${x - 130} ${y + 30}M${x + 50} ${y}Q${x + 100} ${y + 8} ${x + 140} ${y + 26}`, col, 12);
    ramo(x, y - 200, -Math.PI / 2 - .62, 140, 24, 4); ramo(x, y - 200, -Math.PI / 2 + .62, 140, 24, 4); ramo(x, y - 206, -Math.PI / 2 + .05, 120, 18, 4);
    return e;
  };
  EL.anatra = (c, o) => G(o.x, o.y, o.s || 1, E(0, 0, 40, 20, o.col || c.col(2)) + C(30, -22, 14, o.col || c.col(2)) + P("M42 -24L58 -20L42 -16Z", "#ff9a1a"), null, o.flip);
  EL.ficodindia = (c, o) => {
    const col = o.col || c.col(2);
    let e = "";
    const pad = (x, y, r, rot, d) => {
      e += E(x, y, r * .62, r, col, null, ` transform="rotate(${f(rot)} ${f(x)} ${f(y)})"`);
      if(d > 0) [-1, 1].forEach(sd => { if(c.R() < .85){ const a = (rot + sd * c.rnd(25, 50)) * Math.PI / 180; pad(x + Math.sin(a) * r * 1.55, y - Math.cos(a) * r * 1.55, r * .8, rot + sd * c.rnd(20, 45), d - 1); } });
      else for(let q = 0; q < 3; q++) e += C(x + c.rnd(-r * .4, r * .4), y - r * .9, r * .13, "#d8452a");
    };
    pad(o.x, o.y - (o.r || 50), o.r || 50, 0, o.d || 3);
    return e;
  };
  EL.cupoleRosse = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z), dome = c.lin([[0, "#e05a3a"], [1, "#7a1a10"]]);
    let e = "";
    [[-100, 0, .9], [-20, -30, 1.2], [70, 0, .95], [150, 10, .75]].forEach(([x, y, s]) => e += R(x - 44 * s, y - 86 * s, 88 * s, 90 * s, col) + R(x - 32 * s, y - 102 * s, 64 * s, 18 * s, col) + P(`M${f(x - 32 * s)} ${f(y - 102 * s)}Q${f(x - 32 * s)} ${f(y - 150 * s)} ${x} ${f(y - 152 * s)}Q${f(x + 32 * s)} ${f(y - 150 * s)} ${f(x + 32 * s)} ${f(y - 102 * s)}Z`, dome));
    return G(o.x, o.y || HOR, o.s || 1, e + R(-160, -12, 330, 16, col));
  };
  EL.grotta = (c, o) => {
    const x = o.x, y = o.y || HOR, w = o.w || 120, h = o.h || 90;
    return C(x, y - h * .4, w * .9, c.halo(o.col || c.p.acc, .35)) + P(`M${x - w / 2} ${y}Q${x - w / 2} ${y - h} ${x} ${y - h - 10}Q${x + w / 2} ${y - h} ${x + w / 2} ${y}Z`, "#050302", .92) + C(x + w * .1, y - h * .3, w * .18, c.halo(o.col || c.p.acc, .5)) + [-.3, -.1, .15, .32].map(k => P(`M${f(x + k * w - 5)} ${f(y - h + 6)}L${f(x + k * w)} ${f(y - h + 26)}L${f(x + k * w + 5)} ${f(y - h + 6)}Z`, "#050302")).join("");
  };
  EL.pizzomunno = (c, o) => G(o.x, o.y || HOR, o.s || 1, P("M-44 6Q-60 -120 -46 -230Q-36 -300 2 -310Q40 -300 48 -216Q58 -110 44 6Z", c.lin([[0, "#f6f0e2"], [.6, "#c8bea8"], [1, "#6a6252"]], 1, 0)) + P("M-44 6Q-60 -120 -46 -230Q-36 -300 2 -310Q-18 -200 -10 6Z", "#ffffff", .25) + E(0, 8, 70, 10, "#000", .4));
  EL.trabucco = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z);
    let e = P("M-80 10Q-70 -30 -30 -30H50Q80 -20 90 10Z", col) + R(-30, -76, 64, 48, col) + P("M-38 -76L2 -100L42 -76Z", col);
    [[-20, -70, -270, -170], [10, -70, -250, -220], [20, -80, 210, -190], [0, -96, 60, -280], [-10, -90, -150, -260]].forEach(([a, b, x2, y2]) => e += L(a, b, x2, y2, col, 3.2));
    e += S("M-270 -170L-236 36M-250 -220L-150 36M-150 -260L-180 36M60 -280L120 30M210 -190L190 30", col, 1.2, .7) + S("M-250 30H-130L-150 70H-230Z", col, 1.4, .7);
    for(let k = 0; k < 5; k++) e += L(-246 + k * 24, 30, -232 + k * 18, 70, col, 1, .6);
    return G(o.x, o.y || HOR, o.s || 1, e, null, o.flip);
  };
  EL.stella = (c, o) => {
    const r = o.r || 100, x = o.x, y = o.y;
    let d = "";
    for(let k = 0; k < 10; k++){ const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * .42 : r; d += (k ? "L" : "M") + f(x + Math.cos(a) * rr) + " " + f(y + Math.sin(a) * rr); }
    let e = S(d + "Z", o.col || "#efe6d2", o.w || 9, o.a || .8);
    for(let k = 0; k < 5; k++){ const a = -Math.PI / 2 + k * Math.PI * 2 / 5, px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; if(py > y - r * .5) e += L(px, py, px, py + c.rnd(14, 40), o.col || "#efe6d2", 3, .7); }
    return e;
  };
  EL.mercato = (c, o) => {
    const y = o.y || HOR + 40;
    let e = "";
    for(let k = 0; k < 4; k++){
      const x = 40 + k * 150, cs = k % 2 ? ["#3a7a4a", "#efe6d2"] : ["#b8402e", "#efe6d2"];
      for(let q = 0; q < 6; q++) e += P(`M${x + q * 20} ${y - 110}H${x + (q + 1) * 20}L${x + (q + 1) * 22 + 6} ${y - 70}H${x + q * 22 + 6}Z`, cs[q % 2], .92);
      e += L(x + 4, y - 110, x + 4, y, c.col(2), 3) + L(x + 122, y - 110, x + 128, y, c.col(2), 3) + R(x, y - 46, 132, 10, c.col(2));
      for(let q = 0; q < 9; q++) e += C(x + 12 + q * 13, y - 50, 6, c.pick(["#ff8a1a", "#e8401a", "#9ad040", "#ffd24a"]), .95);
    }
    for(let k = 0; k < 7; k++) e += figura(c, c.pick(["testa", "donna", "coppola", "nonna", "trench"]), { x:30 + k * 92 + c.rnd(-14, 14), y:y + 120 + c.rnd(-10, 20), s:c.rnd(.42, .55), z:2 });
    return e;
  };
  EL.documento = (c, o) => G(o.x, o.y, o.s || 1, C(0, 0, 260, c.halo(c.p.glow, .25)) +
    P("M-150 -95H0L-12 -50L8 -8L-6 34L4 95H-150Z", "#eadccb") + R(-136, -64, 66, 86, "#cdb89c") + C(-103, -32, 17, "#7a6a5a") + P("M-130 22Q-103 -10 -76 22Z", "#7a6a5a") +
    [-60, -44, -28, -12, 10, 26].map((y, i) => R(-58, y, i % 2 ? 40 : 52, 5, "#9a8670", .75)).join("") +
    `<text x="-75" y="-74" text-anchor="middle" font-family="${SANS}" font-size="12" font-weight="800" fill="#8a3a2a">CARTA D'IDENTITÀ</text>` +
    `<g transform="translate(24 10) rotate(5)">` + P("M10 -95H150V95H14L4 34L18 -8L-2 -50Z", "#e4d4c0") + [-60, -44, -28, -12, 10, 26, 42].map((y, i) => R(30, y, i % 3 ? 90 : 70, 5, "#9a8670", .7)).join("") + C(120, 64, 18, "none") + `<circle cx="116" cy="62" r="18" fill="none" stroke="#8a3a6a" stroke-width="2.4" opacity=".6"/></g>`, null, false, o.rot || -6);
  EL.grano = (c, o) => {
    const y0 = o.y || 690;
    let e = P(`M-10 ${VH}V${y0}Q300 ${y0 - 30} 610 ${y0}V${VH}Z`, c.lin([[0, "#c8902a"], [1, "#3a2408"]]));
    for(let k = 0; k < 80; k++){ const x = c.rnd(-10, 610), yy = c.rnd(y0 - 10, VH), h = c.rnd(30, 90) * (.4 + (yy - y0) / (VH - y0)); e += S(`M${f(x)} ${f(yy)}q${f(c.rnd(-6, 6))} ${f(-h * .6)} ${f(c.rnd(-10, 10))} ${f(-h)}`, "#e8b84a", 1.6, .75) + E(x + c.rnd(-8, 8), yy - h, 3, 10, "#f2c65a", .85); }
    return e;
  };
  EL.elicottero = (c, o) => {
    const col = c.col(o.z == null ? 1 : o.z);
    let e = o.luce !== false ? P(`M-6 18L-150 ${o.h || 520}L130 ${o.h || 520}Z`, c.lin([[0, c.p.glow, .45], [1, c.p.glow, 0]])) : "";
    e += E(0, 0, 60, 26, col) + P("M40 -8L150 -14L154 -2L44 8Z", col) + P("M140 -14L160 -40L166 -38L154 -10Z", col) + L(-120, -34, 120, -34, col, 4) + L(0, -26, 0, -34, col, 4) + L(-40, 28, 40, 28, col, 3) + L(-26, 18, -30, 28, col, 3) + L(26, 18, 30, 28, col, 3) + E(-34, -4, 16, 12, c.p.glow, .35) + C(-6, 18, 5, "#ffffff") + C(-6, 18, 20, c.halo("#ffffff", .7)) + C(150, -14, 3, "#ff3a3a");
    return G(o.x, o.y, o.s || 1, e, null, o.flip);
  };
  EL.fenicottero = (c, o) => G(o.x, o.y, o.s || 1, E(0, -150, 46, 24, o.col || "#f2709e") + S("M30 -160Q62 -200 40 -240Q28 -262 44 -272", o.col || "#f2709e", 9) + E(48, -274, 12, 9, o.col || "#f2709e") + P("M56 -276L76 -264L58 -266Z", "#1a1010") + L(0, -128, 0, 0, "#b85a7a", 3) + S("M2 -74L-24 -98", "#b85a7a", 3) + P("M-42 -160L-84 -150L-46 -140Z", "#d85a88"), null, o.flip);
  EL.chiatta = (c, o) => {
    const col = c.col(2);
    let e = P("M-180 0L-160 -34H170L190 0Z", col) + S("M-200 6Q0 26 210 6", "#ffffff", 3, .3);
    for(let k = 0; k < 10; k++){ const x = -140 + k * 30 + c.rnd(-4, 4); e += C(x, -52, 11, col) + E(x, -56, 15, 6, col) + R(x - 10, -48, 20, 16, col) + L(x + 8, -44, x + 16, -110 - c.rnd(0, 20), col, 2.6); }
    return G(o.x, o.y, o.s || 1, e, null, o.flip);
  };
  EL.torretta = (c, o) => {
    const col = c.col(o.z == null ? 2 : o.z);
    return G(o.x, o.y || HOR + 120, o.s || 1, S("M-34 0L-20 -150M34 0L20 -150M-28 -60H28M-24 -110H24", col, 6) + R(-34, -168, 68, 18, col) + R(-24, -200, 48, 32, col) + L(26, -168, 26, -280, col, 4) + P("M26 -280Q60 -272 86 -280V-236Q60 -244 26 -236Z", "#d8261e") + P("M-60 -200Q-40 -250 0 -254Q40 -250 60 -200Z", "#e8dcc0", .9));
  };
  EL.pontile = (c, o) => {
    const x = o.x || 440, col = c.col(2), w0 = o.w || 140, top = HOR + 6;
    let e = P(`M${x - w0 / 2} ${VH}L${x - 10} ${top}H${x + 10}L${x + w0 / 2} ${VH}Z`, col);
    for(let k = 0; k < 9; k++){ const t = Math.pow(k / 9, 1.6), y = top + (VH - top) * t, ww = 10 + (w0 / 2 - 10) * t, h = 8 + 90 * t; [-1, 1].forEach(sd => e += L(x + sd * ww, y, x + sd * ww, y - h, col, f(1 + t * 4)) + C(x + sd * ww, y - h, 2 + t * 5, "#fff2c0") + C(x + sd * ww, y - h, 8 + t * 26, c.halo("#ffd27a", .45))); }
    if(o.rotonda) e += R(x - 26, top - 30, 52, 34, col) + P(`M${x - 30} ${top - 30}Q${x} ${top - 56} ${x + 30} ${top - 30}Z`, col);
    return e;
  };
  EL.roulette = (c, o) => {
    let e = E(0, 0, 160, 60, "#3a1c0c") + E(0, -6, 140, 50, "#6a3a1a");
    for(let k = 0; k < 24; k++){ const a1 = k * Math.PI / 12, a2 = (k + 1) * Math.PI / 12; e += P(`M0 -6L${f(Math.cos(a1) * 130)} ${f(-6 + Math.sin(a1) * 46)}L${f(Math.cos(a2) * 130)} ${f(-6 + Math.sin(a2) * 46)}Z`, k === 0 ? "#1a8a3a" : k % 2 ? "#b81e1e" : "#141414"); }
    e += E(0, -6, 60, 22, "#c8942a") + E(0, -10, 34, 12, "#f2d27a") + C(78, -30, 6, "#ffffff");
    return G(o.x, o.y, o.s || 1, C(0, 0, 220, c.halo(c.p.acc, .3)) + e);
  };
  EL.bunker = (c, o) => {
    const col = c.col(o.z == null ? 2 : o.z);
    return G(o.x, o.y || HOR + 40, o.s || 1, P("M-120 4L-110 -70Q-60 -96 0 -98Q60 -96 110 -70L120 4Z", col) + R(-60, -60, 120, 12, "#000", .9) + R(-60, -60, 120, 12, c.p.glow, .12) + S("M-114 -66Q-56 -92 0 -94Q56 -92 114 -66", c.p.glow, 2, .3));
  };
  EL.gondola = (c, o) => {
    const col = c.col(o.z == null ? 2 : o.z);
    return G(o.x, o.y, o.s || 1, P("M-190 -12Q-100 12 0 10Q100 12 176 -20Q196 -40 192 -64Q180 -30 154 -26Q60 -12 -156 -24Z", col) + P("M-196 -50Q-206 -42 -186 -10L-176 -14Q-190 -38 -180 -46Z", col) + G(110, -18, .5, FIG.testa, col) + L(150, -170, 70, 40, col, 3) + S("M-200 14Q0 30 200 10", "#ffffff", 2, .25), null, o.flip);
  };
  EL.lampioni = (c, o) => {
    let e = "";
    for(let k = 0; k < 6; k++){ const s = Math.pow(.78, k), x = (o.x || 120) + (300 - (o.x || 120)) * (1 - s) * .9, yb = 600 + (VH - 600) * s, h = 300 * s; e += L(x, yb, x, yb - h, c.col(2), f(5 * s + 1)) + S(`M${f(x)} ${f(yb - h)}q${f(18 * s)} ${f(-6 * s)} ${f(26 * s)} ${f(4 * s)}`, c.col(2), f(4 * s + 1)) + C(x + 26 * s, yb - h + 8 * s, 6 * s + 1, "#fff2c0") + C(x + 26 * s, yb - h + 8 * s, 70 * s, c.halo(c.p.acc, .5)); }
    return e;
  };
  EL.fari = (c, o) => { const x = o.x || 380, y = o.y || HOR + 20, d = o.d || 18; return [-d, d].map(dx => C(x + dx, y, 4, "#ffffff") + C(x + dx, y, 34, c.halo("#fff6d0", .7))).join("") + R(x - 140, y - 1.2, 280, 2.4, "#fff6d0", .35) + P(`M${x - d} ${y}L${x - 220} ${y + 220}L${x + 220} ${y + 220}L${x + d} ${y}Z`, c.lin([[0, "#fff6d0", .22], [1, "#fff6d0", 0]])); };
  EL.ottagono = (c, o) => {
    const r = o.r || 180, x = o.x || 300, y = o.y || 420, col = o.col || c.p.acc;
    const poly = rr => Array.from({ length:8 }, (_, k) => { const a = Math.PI / 8 + k * Math.PI / 4; return (k ? "L" : "M") + f(x + rr * Math.cos(a)) + " " + f(y + rr * Math.sin(a)); }).join("") + "Z";
    let e = C(x, y, r * 1.2, c.halo(col, .25)) + S(poly(r), col, 3, .6) + S(poly(r * .82), col, 1.4, .4) + S(poly(r * .5), col, 1, .3);
    for(let k = 0; k < 8; k++){ const a = Math.PI / 8 + k * Math.PI / 4, px = x + r * .91 * Math.cos(a), py = y + r * .91 * Math.sin(a); e += C(px, py, 6, "none") + `<circle cx="${f(px)}" cy="${f(py)}" r="7" fill="none" stroke="${col}" stroke-width="1.6" opacity=".7"/>` + L(px - 4, py, px + 4, py, col, 1.4, .7); }
    return e;
  };
  EL.tesseratto = (c, o) => {
    const x = o.x || 300, y = o.y || 300, r = o.r || 120, col = o.col || c.p.acc;
    const sq = (s, rot) => { const pts = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b]) => { const ang = rot * Math.PI / 180, px = a * s, py = b * s; return [x + px * Math.cos(ang) - py * Math.sin(ang), y + px * Math.sin(ang) + py * Math.cos(ang)]; }); return pts; };
    const A = sq(r, 12), B = sq(r * .5, -10);
    const path = pts => pts.map(([px, py], i) => (i ? "L" : "M") + f(px) + " " + f(py)).join("") + "Z";
    let e = C(x, y, r * 1.6, c.halo(col, .25)) + S(path(A), col, 8, .12) + S(path(A), col, 2.6, .8) + S(path(B), col, 2.6, .8);
    A.forEach((p, i) => e += L(p[0], p[1], B[i][0], B[i][1], col, 2, .65));
    return e;
  };
  EL.porta = (c, o) => {
    const x = o.x, y = o.y || HOR, w = o.w || 80, h = o.h || 160, col = o.col || c.p.glow;
    return P(`M${x - w / 2} ${y}L${x + w / 2} ${y}L${x + w * 1.8} ${y + 200}L${x - w * 1.8} ${y + 200}Z`, c.lin([[0, col, .5], [1, col, 0]])) + C(x, y - h / 2, h * 1.1, c.halo(col, .5)) + R(x - w / 2 - 6, y - h - 6, w + 12, h + 6, c.col(2)) + R(x - w / 2, y - h, w, h, c.lin([[0, "#ffffff"], [1, col]])) + P(`M${x + w / 2} ${y - h}L${x + w / 2 + w * .5} ${y - h + 14}V${y + 6}L${x + w / 2} ${y}Z`, c.col(2));
  };
  EL.pacco = (c, o) => G(o.x, o.y, o.s || 1, C(0, -40, 120, c.halo(c.p.acc, .55)) + P("M0 -100L70 -66L0 -32L-70 -66Z", "#9af0ff", .9) + P("M-70 -66L0 -32V40L-70 6Z", "#2a8aa8") + P("M70 -66L0 -32V40L70 6Z", "#1a5a78") + S("M-70 -66L0 -32L70 -66M0 -32V40M-40 -48L-40 22M30 -50L30 20", "#dfffff", 2, .8));
  EL.ologramma = (c, o) => {
    const x = o.x || 300, y = o.y || 200, w = o.w || 300, h = o.h || 150, col = o.col || c.p.acc;
    let e = R(x - w / 2, y - h / 2, w, h, col, .1) + R(x - w / 2, y - h / 2, w, h, "none", null, ` stroke="${col}" stroke-width="2" stroke-opacity=".6"`);
    for(let k = 0; k < h; k += 7) e += R(x - w / 2, y - h / 2 + k, w, 1.4, col, .16);
    e += E(x, y - 10, 44, 22, "none", null, ` stroke="${col}" stroke-width="4" stroke-opacity=".8"`) + C(x, y - 10, 12, col, .8) + `<text x="${x}" y="${f(y + h / 2 - 16)}" text-anchor="middle" font-family="${SANS}" font-weight="800" font-size="24" letter-spacing="8" fill="${col}" opacity=".85">AURELIA</text>`;
    return e + P(`M${x - 30} ${y + h / 2}L${x - 120} ${HOR - 40}H${x + 120}L${x + 30} ${y + h / 2}Z`, c.lin([[0, col, .2], [1, col, 0]]));
  };
  EL.onde = (c, o) => { let e = ""; for(let k = 1; k <= 5; k++){ const r = (o.r || 40) * k; e += S(`M${f(o.x - r * .8)} ${f(o.y - r * .6)}A${r} ${r} 0 0 1 ${f(o.x + r * .8)} ${f(o.y - r * .6)}`, o.col || c.p.acc, 3, f(.8 - k * .13)); } return e; };
  EL.meteora = (c, o) => { const col = o.col || "#ffe6a8"; return S(`M${o.x1} ${o.y1}L${o.x2} ${o.y2}`, c.linU([[0, col, 0], [1, col, .95]], o.x1, o.y1, o.x2, o.y2), o.w || 5) + C(o.x2, o.y2, (o.w || 5) * 2, "#fffbe8") + C(o.x2, o.y2, (o.w || 5) * 14, c.halo(col, .45)); };
  EL.cristalli = (c, o) => EL.vulcano(c, Object.assign({ cristalli:true }, o));
  EL.palloncini = (c, o) => (o.pos || [[150, 300, "#ff5a7a", "1"], [215, 250, "#5ab8ff", "8"], [440, 330, "#ffd24a", ""]]).map(([x, y, col, t]) => S(`M${x} ${y + 44}q${f(c.rnd(-20, 20))} 80 ${f(c.rnd(-10, 10))} 170`, "#e8e0d0", 1.4, .6) + E(x, y, 34, 42, c.rad([[0, "#ffffff", .9], [.25, col], [1, col]], .35, .3, .8)) + P(`M${x - 5} ${y + 42}L${x} ${y + 50}L${x + 5} ${y + 42}Z`, col) + (t ? `<text x="${x}" y="${y + 14}" text-anchor="middle" font-family="${SERIF}" font-weight="700" font-size="40" fill="#ffffff" opacity=".92">${t}</text>` : "")).join("");
  EL.roghi = (c, o) => {
    let e = "";
    (o.xs || [90, 250, 470]).forEach((x, i) => {
      const y = HOR + 4, h = 46 + i * 10;
      if(c.hd) e += P(`M${x - 24} ${y - h}C${x - 70} ${y - h - 160} ${x + 40} ${y - h - 300} ${x - 10} ${y - h - 520}C${x + 140} ${y - h - 360} ${x + 60} ${y - h - 180} ${x + 24} ${y - h}Z`, c.lin([[0, "#0a0604", .55], [.6, "#1a100a", .9], [1, "#0a0604", .95]]), null, ` filter="${c.rumore("fumoR" + i, ".012 .02", 4, 7 + i, 2.5, -.6)}"`);
      else for(let k = 0; k < 8; k++) e += C(x + k * 10 + c.rnd(-8, 8), y - h - 30 - k * 55, 26 + k * 14, "#0a0604", f(.85 - k * .085));
      e += C(x, y - 20, 90, c.halo("#ff7a1a", .7)) + P(`M${x - 34} ${y}Q${x - 30} ${y - h * .6} ${x - 6} ${y - h}Q${x + 2} ${y - h * .6} ${x + 10} ${y - h * .8}Q${x + 30} ${y - h * .5} ${x + 34} ${y}Z`, c.lin([[0, "#fff0a0"], [.5, "#ffa030"], [1, "#d8401a"]]));
    });
    return e;
  };
  EL.torcia = (c, o) => P(`M${o.x} ${o.y}L${o.x2 - (o.w || 120)} ${o.y2}L${o.x2 + (o.w || 120)} ${o.y2}Z`, c.linU([[0, "#fff6d8", .55], [1, "#fff6d8", 0]], o.x, o.y, o.x2, o.y2)) + C(o.x, o.y, 5, "#ffffff") + C(o.x, o.y, 26, c.halo("#fff6d8", .8));
  EL.gradinate = (c, o) => {
    const y0 = o.y0 || 250, y1 = o.y1 || 560;
    let e = P(`M-10 ${y0}Q300 ${y0 - 70} 610 ${y0}V${y1}H-10Z`, c.col(1));
    for(let k = 0; k < 9; k++){ const y = y0 + 20 + k * (y1 - y0 - 20) / 9, hh = 70 - k * 6; e += S(`M-10 ${f(y)}Q300 ${f(y - hh * 2)} 610 ${f(y)}`, c.p.far, 2, .55); }
    for(let k = 0; k < 140; k++){ const row = Math.floor(c.rnd(0, 9)), t = c.R(), y = y0 + 26 + row * (y1 - y0 - 20) / 9, hh = 70 - row * 6; e += C(-10 + 620 * t, y - 2 * t * (1 - t) * hh * 2, 1.8, "#ffd27a", f(c.rnd(.5, 1))); }
    return e;
  };
  EL.palco = (c, o) => {
    const y = o.y || HOR;
    let e = P(`M-10 ${y + 10}L60 ${y - 30}H540L610 ${y + 10}V${VH}H-10Z`, c.lin([[0, "#4a3418"], [1, "#0a0604"]]));
    [150, 450].forEach(x => e += C(x, y - 200, 140, c.halo(c.p.acc, .25)) + P(`M${x - 22} ${y - 30}L${x - 13} ${y - 340}L${x} ${y - 366}L${x + 13} ${y - 340}L${x + 22} ${y - 30}Z`, c.lin([[0, "#ffe6a8"], [.5, "#b8842a"], [1, "#4a2a0a"]], 1, 0)));
    for(let k = 0; k < 3; k++) e += R(200 - k * 20, y - 30 + k * 12, 200 + k * 40, 12, "#2a1c0a", .9);
    return e;
  };
  EL.fascio = (c, o) => P(`M${o.x1 - (o.w1 || 6)} ${o.y1}L${o.x2 - (o.w2 || 90)} ${o.y2}L${o.x2 + (o.w2 || 90)} ${o.y2}L${o.x1 + (o.w1 || 6)} ${o.y1}Z`, c.linU([[0, o.col || "#ffffff", o.a || .4], [1, o.col || "#ffffff", 0]], o.x1, o.y1, o.x2, o.y2));
  EL.lucine = (c, o) => {
    let e = "";
    (o.fili || [[0, 160, 600, 200, 70], [0, 260, 600, 230, 60]]).forEach(([x1, y1, x2, y2, sag]) => {
      const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2 + sag * 2;
      e += S(`M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`, "#1a1a1a", 1.4, .7);
      for(let k = 1; k < 16; k++){ const t = k / 16, x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2, y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2; e += C(x, y + 4, 3.2, "#fff0b0") + C(x, y + 4, 14, c.halo("#ffd27a", .5)); }
    });
    return e;
  };
  EL.rifugio = EL.cascina;

  /* ---------- atmosfera ---------- */
  const FX = {
    pioggia(c, o){
      const col = o.col || "#cfe3ff";
      if(c.hd){ let lon = "", vic = "", sp = "";
        for(let k = 0; k < (o.n || 46) * 2.2; k++){ const x = c.rnd(-40, 640), y = c.rnd(-20, 880), l = c.rnd(10, 22); lon += L(x, y, x - l * .25, y + l, col, .8, f(c.rnd(.1, .3))); }
        for(let k = 0; k < (o.n || 46) * .7; k++){ const x = c.rnd(-40, 640), y = c.rnd(-20, 880), l = c.rnd(30, 60); vic += L(x, y, x - l * .25, y + l, col, 1.5, f(c.rnd(.15, .4))); }
        for(let k = 0; k < 40; k++){ const x = c.rnd(0, 600), y = c.rnd(HOR + 10, VH); sp += S(`M${f(x - 4)} ${f(y)}q4 -5 8 0`, col, .9, f(c.rnd(.2, .45))); }
        return `<g filter="${c.sfoca(.7)}">${lon}</g>${vic}${sp}`; }
      let e = ""; for(let k = 0; k < (o.n || 46); k++){ const x = c.rnd(-40, 640), y = c.rnd(-20, 880), l = c.rnd(18, 36); e += L(x, y, x - l * .28, y + l, col, 1.2, f(c.rnd(.12, .35))); } return e; },
    nebbia(c, o){
      if(c.hd){ const y = o.y || HOR, h = 120 + (o.n || 5) * 22, col = o.col || "#e8eef2", a = Math.min(.95, .55 * (o.k || 1) + (o.n || 5) * .03);
        return R(-20, y - h * .62, VW + 40, h, c.lin([[0, col, 0], [.45, col, a], [.7, col, a * .8], [1, col, 0]]), null, ` filter="${c.rumore("neb" + (o.n || 5), ".0032 .014", 4, 11 + (o.n || 5), 2.4, -.85)}"`); }
      let e = ""; for(let k = 0; k < (o.n || 5); k++){ const y = c.rnd((o.y || HOR) - 150, (o.y || HOR) + 140); e += E(c.rnd(100, 500), y, c.rnd(260, 420), c.rnd(30, 60), o.col || "#e8eef2", f(c.rnd(.06, .14) * (o.k || 1))); } return e; },
    neve(c, o){ let e = ""; for(let k = 0; k < (o.n || 70); k++) e += C(c.rnd(0, 600), c.rnd(0, 900), c.rnd(1, 3.4), "#ffffff", f(c.rnd(.35, .9))); return e; },
    braci(c, o){ let e = ""; for(let k = 0; k < (o.n || 40); k++) e += C(c.rnd(0, 600), c.rnd(200, 900), c.rnd(1, 3), c.R() < .5 ? "#ffb347" : "#ff6a2a", f(c.rnd(.4, .95))); return e; },
    stelle(c, o){ let e = ""; for(let k = 0; k < (o.n || 60); k++) e += C(c.rnd(0, 600), c.rnd(0, (o.y || HOR) - 60), c.rnd(.6, 1.9), "#ffffff", f(c.rnd(.3, .95))); return e; },
    galassia(c, o){ let e = E(300, 260, 420, 60, c.halo("#c8d8ff", .25), null, ' transform="rotate(-28 300 260)"'); for(let k = 0; k < 90; k++){ const t = c.rnd(-1, 1), x = 300 + t * 380, y = 260 - t * 200 + c.rnd(-50, 50); e += C(x, y, c.rnd(.5, 1.5), "#ffffff", f(c.rnd(.25, .8))); } return e; },
    lucciole(c, o){ let e = ""; for(let k = 0; k < (o.n || 26); k++){ const x = c.rnd(20, 580), y = c.rnd(380, 820); e += C(x, y, 9, o.col || c.p.acc, .14) + C(x, y, 2.2, "#fff7d0", .95); } return e; },
    fumo(c, o){
      if(c.hd){ const col = o.col || "#8a807a", a = Math.min(.8, .25 + (o.n || 8) * .04); return R(-20, HOR - 380, VW + 40, 460, c.lin([[0, col, 0], [.5, col, a], [1, col, a * .4]]), null, ` filter="${c.rumore("fumo" + (o.n || 8), ".006 .012", 4, 41 + (o.n || 8), 2.1, -.8)}"`); }
      let e = ""; const g = c.halo(o.col || "#8a807a", .22); for(let k = 0; k < (o.n || 8); k++) e += C(c.rnd(0, 600), c.rnd(HOR - 260, HOR + 20), c.rnd(80, 180), g); return e; },
    fasci(c){ let e = ""; [[120, -.5], [300, .1], [480, .55]].forEach(([x, a]) => e += P(`M${x} ${VH}L${x + a * 400 - 50} 0L${x + a * 400 + 50} 0Z`, c.lin([[0, "#ffffff", 0], [1, "#ffffff", .16]], 0, 0))); return e; },
    raggi(c, o){ let e = ""; for(let k = 0; k < (o.n || 6); k++){ const x = c.rnd(40, 560), w = c.rnd(20, 60); e += P(`M${f(x - w)} 0L${f(x + w)} 0L${f(x + w * 3 + 120)} ${VH}L${f(x - w * 3 + 60)} ${VH}Z`, c.lin([[0, o.col || c.p.glow, .2], [1, o.col || c.p.glow, 0]])); } return e; },
    riflettori(c, o){ return EL.fascio(c, { x1:40, y1:0, x2:o.x || 300, y2:o.y || 560, w1:10, w2:110, a:.32 }) + EL.fascio(c, { x1:560, y1:0, x2:o.x || 300, y2:o.y || 560, w1:10, w2:110, a:.32 }) + EL.fascio(c, { x1:300, y1:0, x2:o.x || 300, y2:o.y || 560, w1:6, w2:70, a:.25 }); },
    laser(c){ let e = ""; const cols = ["#5ee1ff", "#ff4fd8", "#a6ff6a"]; for(let k = 0; k < 10; k++) e += L(300, 560, c.rnd(-100, 700), c.rnd(-50, 250), cols[k % 3], 2, .55); return e; },
    coriandoli(c, o){ let e = ""; const cols = ["#ffd36b", "#ff7ab6", "#7fd4e0", "#a6f08f", "#ffffff"]; for(let k = 0; k < (o.n || 40); k++){ const x = c.rnd(0, 600), y = c.rnd(0, 900); e += R(x, y, c.rnd(5, 10), c.rnd(3, 5), cols[k % 5], f(c.rnd(.5, .9)), ` transform="rotate(${f(c.rnd(0, 180))} ${f(x)} ${f(y)})"`); } return e; },
    bolle(c, o){ let e = ""; for(let k = 0; k < (o.n || 30); k++){ const x = c.rnd(20, 580), y = c.rnd(80, 860), r = c.rnd(3, 12); e += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="#bff6ff" stroke-width="1.4" opacity="${f(c.rnd(.25, .6))}"/>`; } return e; },
    codice(c, o){ let e = ""; for(let k = 0; k < (o.n || 16); k++){ const x = c.rnd(10, 590), y0 = c.rnd(0, 400); for(let j = 0; j < 8; j++) e += `<text x="${f(x)}" y="${f(y0 + j * 22)}" font-family="monospace" font-size="16" fill="${c.R() < (o.rosso || .2) ? "#ff3a3a" : "#5effa0"}" opacity="${f(.5 - j * .05)}">${c.R() < .5 ? 1 : 0}</text>`; } return e; },
    cubi(c, o){ let e = ""; for(let k = 0; k < (o.n || 6); k++){ const x = c.rnd(60, 540), y = c.rnd(120, 520), s = c.rnd(18, 46); e += S(`M${f(x)} ${f(y)}h${f(s)}v${f(s)}h${f(-s)}ZM${f(x + s * .4)} ${f(y - s * .4)}h${f(s)}v${f(s)}h${f(-s)}ZM${f(x)} ${f(y)}l${f(s * .4)} ${f(-s * .4)}M${f(x + s)} ${f(y)}l${f(s * .4)} ${f(-s * .4)}M${f(x + s)} ${f(y + s)}l${f(s * .4)} ${f(-s * .4)}M${f(x)} ${f(y + s)}l${f(s * .4)} ${f(-s * .4)}`, c.p.acc, 1.6, f(c.rnd(.35, .75))); } return e; },
    fulmine(c, o){ const x = o.x || 420; return P(`M${x} 0L${x - 40} 120L${x - 10} 124L${x - 60} 260L${x + 20} 110L${x - 16} 106L${x + 30} 0Z`, "#f4f8ff", .85) + C(x - 20, 140, 200, c.halo("#dfe9ff", .3)); },
    segnale(c, o){ let e = ""; for(let k = 1; k <= 6; k++) e += `<circle cx="${o.x || 300}" cy="${o.y || 220}" r="${30 * k}" fill="none" stroke="${c.p.acc}" stroke-width="2" opacity="${f(.6 - k * .08)}"/>`; return e; },
    polvere(c, o){ let e = ""; for(let k = 0; k < (o.n || 40); k++) e += C(c.rnd(0, 600), c.rnd(o.y0 || 300, VH), c.rnd(.8, 2.6), o.col || "#f2d6a8", f(c.rnd(.2, .6))); return e; },
    bokeh(c, o){ let e = ""; for(let k = 0; k < (o.n || 14); k++) e += C(c.rnd(0, 600), c.rnd(0, 700), c.rnd(10, 46), c.R() < .5 ? c.p.acc : "#ffd9a8", f(c.rnd(.06, .18))); return e; },
    vento(c, o){ let e = ""; for(let k = 0; k < (o.n || 18); k++){ const y = c.rnd(80, 800), x = c.rnd(-120, 480), l = c.rnd(140, 320); e += S(`M${f(x)} ${f(y)}q${f(l / 2)} -22 ${f(l)} -8`, "#ffffff", f(c.rnd(1, 2.2)), f(c.rnd(.08, .22))); } return e; },
    nuvole(c, o){
      if(c.hd){ const y1 = (o.y || 240) + 60, base = mix(c.p.ink, c.p.mid, .5), luce = o.luce || c.p.glow;
        const fl = c.rumore("nuv" + (o.n || 8), ".0042 .011", 5, 23 + (o.n || 8), 2.2 + (o.n || 8) * .05, -.95);
        return `<g filter="${c.sfoca(.6)}">` + R(-20, -20 + 8, VW + 40, y1 + 20, c.lin([[0, luce, .0], [.6, luce, .35], [1, luce, 0]]), null, ` filter="${fl}"`) + "</g>" + R(-20, -20, VW + 40, y1 + 20, c.lin([[0, base, .95], [.7, base, .9], [1, base, 0]]), null, ` filter="${fl}"`); }
      let e = ""; const g = c.rad([[0, c.p.ink, .75], [.6, c.p.ink, .5], [1, c.p.ink, 0]]), gl = c.rad([[0, c.p.glow, .14], [1, c.p.glow, 0]]); for(let k = 0; k < (o.n || 8); k++){ const x = c.rnd(-60, 660), y = c.rnd(-20, o.y || 240), w = c.rnd(120, 240); for(let q = 0; q < 5; q++){ const dx = c.rnd(-w * .5, w * .5), dy = c.rnd(-w * .12, w * .1), r = c.rnd(w * .25, w * .45); e += E(x + dx, y + dy + r * .3, r * 1.3, r * .7, gl) + E(x + dx, y + dy, r * 1.3, r * .75, g); } } return e; },
    razzi(c, o){ let e = ""; (o.pos || [[140, 180], [460, 120], [330, 250]]).forEach(([x, y]) => e += S(`M${x - 60} ${HOR}Q${x - 40} ${y + 120} ${x} ${y}`, "#d8d0c0", 2, .25) + C(x, y, 120, c.halo(o.col || "#fff2c8", .45)) + C(x, y, 5, "#ffffff")); return e; },
    soldi(c, o){ let e = ""; for(let k = 0; k < (o.n || 18); k++){ const x = c.rnd(0, 600), y = c.rnd(o.y0 || 80, o.y1 || 800), r = c.rnd(-60, 60); e += `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(r)})">` + R(-20, -9, 40, 18, o.col || "#b8d8a0", .9) + R(-15, -5, 30, 10, "none", null, ` stroke="${o.col2 || "#5a7a4a"}" stroke-width="1.4"`) + C(0, 0, 3.4, o.col2 || "#5a7a4a") + "</g>"; } return e; },
    carteCadenti(c, o){ let e = ""; for(let k = 0; k < (o.n || 16); k++){ const x = c.rnd(0, 600), y = c.rnd(60, 620), r = c.rnd(-70, 70), red = c.R() < .5; e += `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(r)})">` + R(-12, -17, 24, 34, "#f6f2ea", .92, ' rx="3"') + C(0, 0, 4.5, red ? "#c41e2a" : "#111") + "</g>"; } return e; },
    cuori(c, o){ let e = ""; for(let k = 0; k < (o.n || 14); k++){ const x = c.rnd(40, 560), y = c.rnd(120, 620), s = c.rnd(.6, 1.6); e += G(x, y, s, P("M0 0c-6 -8 -18 -2 -10 8l10 9l10 -9c8 -10 -4 -16 -10 -8z", o.col || "#ff6aa8", f(c.rnd(.5, .9)))); } return e; },
    velocita(c, o){ let e = ""; for(let k = 0; k < (o.n || 14); k++){ const y = c.rnd(o.y0 || 480, o.y1 || 700), x = c.rnd(-50, 300); e += L(x, y, x + c.rnd(80, 220), y, "#ffffff", f(c.rnd(1, 2.4)), f(c.rnd(.12, .3))); } return e; }
  };
  Object.keys(FX).forEach(n => { if(!EL[n]) EL[n] = (c, o) => FX[n](c, o || {}); });

  /* ---------- colori da cinema e scritte ---------- */
  function grading(c, testo){
    let e = "";
    if(testo){
      e += R(0, 500, VW, 400, c.lin([[0, "#000", 0], [.42, "#000", .62], [1, "#000", .95]]));
      e += R(0, 0, VW, 240, c.lin([[0, "#000", .66], [1, "#000", 0]]));
    } else e += R(0, 640, VW, 260, c.lin([[0, "#000", 0], [1, "#000", .45]]));
    e += R(0, 0, VW, VH, c.rad([[.56, "#000", 0], [1, "#000", .6]], .5, .46, .78));
    return e;
  }
  function txt(x, y, t, o){
    return `<text x="${f(x)}" y="${f(y)}" text-anchor="middle" font-family="${o.font}" font-size="${f(o.size)}" font-weight="${o.w || 400}"${o.it ? ' font-style="italic"' : ""}${o.ls ? ` letter-spacing="${f(o.ls)}"` : ""} fill="${o.fill}"${op(o.op)}${o.len ? ` textLength="${f(o.len)}" lengthAdjust="spacingAndGlyphs"` : ""}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 2}" stroke-linejoin="round"` : ""}>${esc(t)}</text>`;
  }
  const PICCOLE = /^(di|del|della|dello|dei|degli|delle|da|dal|dalla|al|alla|allo|ai|alle|il|lo|la|i|gli|le|un|uno|una|e|ed|a|in|nel|nella|nelle|sul|sulla|sui|su|per|con|tra|fra|che|non|'o|o|'u)$/i;
  function impagina(T, st){
    const lsEm = st.ls / st.size, words = T.split(/\s+/).filter(Boolean), MAXW = 530, n = words.length;
    const larg = (t, size) => misura(t, st.font, st.w, size, st.it) + lsEm * size * t.length;
    const cands = [[T]];
    for(let i = 1; i < n; i++) cands.push([words.slice(0, i).join(" "), words.slice(i).join(" ")]);
    for(let i = 1; i < n - 1; i++) for(let j = i + 1; j < n; j++) cands.push([words.slice(0, i).join(" "), words.slice(i, j).join(" "), words.slice(j).join(" ")]);
    let best = null;
    cands.forEach(lines => {
      let size = st.size * (lines.length === 1 ? 1 : lines.length === 2 ? .94 : .84);
      lines.forEach(l => size = Math.min(size, MAXW / (larg(l, 100) / 100)));
      let score = size * (lines.length === 1 ? 1.1 : lines.length === 2 ? 1 : .82);
      lines.slice(0, -1).forEach(l => { if(PICCOLE.test(l.split(" ").pop())) score *= .9; });
      lines.forEach(l => { if(l.length <= 2) score *= .6; });
      if(!best || score > best.score) best = { lines, size, score };
    });
    best.size = Math.max(best.size, 30);
    best.larg = best.lines.map(l => larg(l, best.size));
    return best;
  }
  function scritte(c, sp){
    const s = c.s, st = Object.assign({}, TIT[s.g] || TIT.drama, sp.tit || {});
    let e = "";
    // frase di lancio
    const tag = piano(sp.tag || String(s.hook || "").split(/(?<=[.!?])\s/)[0]).toUpperCase(), righe = equilibra(tag), ts = righe.length > 3 ? 16 : 18;
    righe.forEach((l, i) => { const w = misura(l, SANS, 600, ts) + 3.2 * l.length; e += txt(300, 94 + i * (ts + 9), l, { font:SANS, size:ts, w:600, ls:3.2, fill:"#f2ead8", op:.92, len:w > 545 ? 545 : null }); });
    // titolo
    const T = piano(st.up ? s.t.toUpperCase() : s.t), lay = impagina(T, st), size = lay.size, lh = size * (st.up ? 1.0 : 1.06), yEnd = 754, y0 = yEnd - (lay.lines.length - 1) * lh;
    const fill = c.lin([[0, st.fill[0]], [1, st.fill[1]]]);
    const py = y0 - size * (st.up ? .78 : .74) - 18, pw = misura("STORIE D'ITALIA PRESENTA", SANS, 600, 13) + 6.5 * 24;
    e += txt(300, py, "STORIE D'ITALIA PRESENTA", { font:SANS, size:13, w:600, ls:6.5, fill:"#e9dcc0", op:.8 }) + L(300 - pw / 2 - 52, py - 4.5, 300 - pw / 2 - 12, py - 4.5, "#e9dcc0", 1, .5) + L(300 + pw / 2 + 8, py - 4.5, 300 + pw / 2 + 48, py - 4.5, "#e9dcc0", 1, .5);
    lay.lines.forEach((l, i) => {
      const y = y0 + i * lh, len = Math.min(lay.larg[i], 560), base = { font:st.font, size, w:st.w, it:st.it, ls:st.ls / st.size * size, len };
      e += txt(303, y + 4, l, Object.assign({}, base, { fill:"#000", op:.6 }));
      if(st.glow) e += txt(300, y, l, Object.assign({}, base, { fill:"none", stroke:st.glow, sw:9, op:.35 }));
      e += txt(300, y, l, Object.assign({}, base, { fill }));
    });
    // luogo ed epoca
    const luogo = piano(s.city + "  ·  " + (s.era || "Oggi")).toUpperCase(), lw = misura(luogo, SANS, 700, 15) + 5 * luogo.length;
    e += txt(300, yEnd + 40, luogo, { font:SANS, size:15, w:700, ls:5, fill:st.fill[1], op:.95, len:lw > 540 ? 540 : null });
    // titoli di coda
    const cast = (s.chars || []).slice(0, 6).map(ch => piano(ch.full || ch.n)).join("   ").toUpperCase();
    const coda = ["UNA STORIA INTERATTIVA" + (cast ? "   CON   " + cast : ""), "DIALOGHI E PERSONAGGI DELL'INTELLIGENZA ARTIFICIALE   ·   MEMORIA, SCELTE E FINALI DIVERSI   ·   UN FILM DIRETTO DA TE"];
    coda.forEach((b, i) => { const w = misura(b, SANS, 600, 13) + .4 * b.length; e += txt(300, yEnd + 66 + i * 17, b, { font:SANS, size:13, w:600, ls:.4, fill:"#d8d2c6", op:i ? .5 : .66, len:Math.min(w, 520) }); });
    return e;
  }
  function equilibra(t){
    const w = t.split(/\s+/).filter(Boolean), n = w.length;
    for(let righeN = 1; righeN <= 4; righeN++){
      const lim = righeN > 3 ? 33 : 30;
      let best = null;
      const rec = (da, resta, righe) => {
        if(resta === 1){
          const tutte = righe.concat([w.slice(da).join(" ")]), max = Math.max(...tutte.map(r => r.length));
          if(max > lim) return;
          let sc = max;
          tutte.slice(0, -1).forEach(r => { if(!/[.,:;!?]$/.test(r)) sc += 3; });
          if(!best || sc < best.sc) best = { righe:tutte, sc };
          return;
        }
        for(let k = da + 1; k <= n - resta + 1; k++) rec(k, resta - 1, righe.concat([w.slice(da, k).join(" ")]));
      };
      if(n >= righeN) rec(0, righeN, []);
      if(best) return best.righe;
    }
    return aCapo(t, 32).slice(0, 4);
  }
  function aCapo(t, max){
    const w = t.split(/\s+/), out = [];
    let line = "";
    w.forEach(p => { if((line + " " + p).trim().length > max && line){ out.push(line); line = p; } else line = (line + " " + p).trim(); });
    if(line) out.push(line);
    return out;
  }

  /* ---------- locandine per le storie create da chi gioca: dal genere, con varianti ---------- */
  const GENERE = {
    giallo: c => c.pick([
      { pal:"pioggia", el:[["palazzi", { z:0, h:[180, 320], win:.08 }], ["palazzi", { z:1, h:[90, 200], win:.14, tetti:true }], ["lampioni", {}], ["trench", { x:300, y:870, s:1.3, rim:1 }]], fx:["pioggia"] },
      { pal:"nebbia", el:[["alberi", { t:"pioppo", z:0, n:12, h:[120, 180], y:HOR - 20 }], ["borgo", { luci:.2 }], ["nebbia", { n:7 }], ["trench", { x:300, y:870, s:1.3, rim:0 }]], fx:[] },
      { pal:"notte", el:[["luce", { x:440, y:220, r:46, t:"luna" }], ["villa", { x:300, s:1.1, luci:true, palme:true }], ["fulmine", { x:180 }], ["donna", { x:300, y:880, s:1.3, rim:1 }]], fx:["pioggia"] }
    ]),
    romantico: c => c.pick([
      { pal:"tramonto", el:[["luce", { x:300, y:600, r:70, t:"sole" }], ["mare", {}], ["coppia", { x:300, y:870, s:1.2, rim:0 }]], fx:["bokeh"] },
      { pal:"notte", el:[["palazzi", { z:0, h:[150, 280], win:.15, tetti:true }], ["lucine", {}], ["coppia", { x:300, y:870, s:1.2, rim:0, rimCol:"#ffd27a" }]], fx:["bokeh"] },
      { pal:"alba", el:[["luce", { x:300, y:560, r:60, t:"sole" }], ["colline", { cipressi:true }], ["coppia", { x:300, y:880, s:1.15, rim:0 }]], fx:[] }
    ]),
    fantascienza: c => c.pick([
      { pal:"spazio", el:[["stelle", {}], ["pianeta", { x:430, y:260, r:150, anelli:true }], ["futuro", {}], ["astronauta", { x:300, y:870, s:1.2, rim:0 }]], fx:[] },
      { pal:"neon", el:[["futuro", {}], ["robot", { x:300, y:870, s:1.25, rim:0 }]], fx:["pioggia"] },
      { pal:"spazio", el:[["stelle", { n:90 }], ["buconero", { x:300, y:280, s:.8 }], ["parabola", { x:300, s:1.1, onde:true }]], fx:[] }
    ]),
    avventura: c => c.pick([
      { pal:"alba", el:[["luce", { x:420, y:420, r:50, t:"sole" }], ["montagne", { alt:380 }], ["cresta", {}], ["alpinista", { x:390, y:570, s:.8, rim:1 }]], fx:[] },
      { pal:"mare", el:[["luce", { x:420, y:600, r:60, t:"sole" }], ["mare", { lx:420, onde:true }], ["barcaVela", { x:280, y:HOR + 40, s:.9, rot:-8 }], ["scogli", {}]], fx:[] },
      { pal:"verde", el:[["luce", { x:300, y:560, r:60, t:"sole" }], ["castello", { x:300, y:HOR - 40, s:.8, rupe:true }], ["alberi", { t:"pino", n:14, h:[150, 260] }], ["ragazzo", { x:300, y:880, s:1.3, rim:0 }]], fx:["lucciole"] }
    ]),
    thriller: c => c.pick([
      { pal:"notte", el:[["palazzi", { z:0, h:[200, 380], win:.1 }], ["palazzi", { z:1, h:[100, 220], win:.12 }], ["codice", {}], ["uomo", { x:300, y:880, s:1.3, rim:0 }]], fx:["fasci"] },
      { pal:"nebbia", el:[["alberi", { t:"pino", z:1, n:14, h:[100, 170] }], ["fari", { x:360, y:HOR + 10 }], ["trench", { x:240, y:880, s:1.3, rim:1 }]], fx:["nebbia"] }
    ]),
    horror: c => c.pick([
      { pal:"incubo", el:[["luce", { x:300, y:260, r:70, t:"luna" }], ["borgo", { luci:.3 }], ["bambina", { x:300, y:880, s:1.4, rim:0 }]], fx:["nebbia"] },
      { pal:"incubo", el:[["luce", { x:300, y:250, r:80, t:"luna" }], ["noce", {}], ["colline", { cols:["#1c1434", "#0c0819", "#020105"] }]], fx:["nebbia", "lucciole"] },
      { pal:"lago", el:[["montagne", { alt:280, rif:1 }], ["villa", { x:300, s:1.1, una:true, rif:1 }], ["lago", {}]], fx:["neve"], tinta:{ sky:["#0a0f16", "#1a2a36", "#3a5060", "#7a8a90"] } }
    ]),
    commedia: c => c.pick([
      { pal:"tramonto", el:[["facciata", {}]], fx:["coriandoli"] },
      { pal:"notte", el:[["luminarie", {}], ["coppia", { x:300, y:880, s:1.2, rim:0, rimCol:"#ffd27a" }]], fx:["coriandoli"] },
      { pal:"giorno", el:[["palazzi", { z:1, h:[120, 260], win:.2, tetti:true }], ["vespa", { x:300, y:800, s:1.4 }]], fx:["coriandoli"] }
    ]),
    malavita: c => c.pick([
      { pal:"oro", el:[["luce", { x:300, y:480, r:60, t:"sole", alone:5 }], ["palazzi", { z:1, h:[90, 220], win:.15 }], ["uomo", { x:300, y:880, s:1.4, rim:0 }]], fx:["fumo"] },
      { pal:"sangue", el:[["luce", { x:300, y:600, r:70, t:"sole" }], ["vulcano", { x:300, s:1.1, z:0 }], ["coppola", { x:300, y:880, s:1.4, rim:0 }]], fx:[] },
      { pal:"oro", el:[["carcere", { h:220 }], ["coppola", { x:300, y:880, s:1.35, rim:0 }], ["sbarre", { n:5, x0:70, x1:530, trav:[320] }]], fx:[] }
    ]),
    guerra: c => c.pick([
      { pal:"seppia", el:[["luce", { x:300, y:560, r:60, t:"sole" }], ["rovine", {}], ["soldato", { x:300, y:880, s:1.35, rim:0 }]], fx:["fumo", "braci"] },
      { pal:"seppia", el:[["montagne", { alt:260, neve:false }], ["razzi", {}], ["soldato", { x:300, y:860, s:1.35, rim:0 }], ["trincea", { y:760 }]], fx:["fumo"] },
      { pal:"alba", hor:540, el:[["luce", { x:420, y:500, r:56, t:"sole" }], ["mare", { lx:420 }], ["piroscafo", { x:330, y:575, s:1.05 }], ["piroscafo", { x:120, y:556, s:.5, flip:true }]], fx:["fumo"] }
    ]),
    fantasy: c => c.pick([
      { pal:"verde", el:[["luce", { x:440, y:230, r:60, t:"luna" }], ["castello", { x:300, y:HOR - 40, s:.9, rupe:true }], ["alberi", { t:"pino", n:14, h:[150, 260] }], ["lupo", { x:470, y:700, s:1 }], ["cacciatore", { x:250, y:880, s:1.35, rim:0 }]], fx:["lucciole"] },
      { pal:"incubo", el:[["luce", { x:300, y:260, r:70, t:"luna" }], ["alberi", { t:"pino", n:18, h:[200, 340] }], ["lanterna", { x:300, y:720, s:.8, col:"#6ec8ff" }]], fx:["lucciole"] }
    ]),
    drama: c => c.pick([
      { pal:"notte", el:[["palazzi", { z:0, h:[150, 300], win:.08 }], ["palazzi", { z:1, h:[90, 200], win:.16 }], ["donna", { x:300, y:880, s:1.35, rim:0 }]], fx:["bokeh"] },
      { pal:"alba", el:[["vicolo", {}], ["ragazzo", { x:300, y:880, s:1.35, rim:0 }]], fx:[] },
      { pal:"lago", el:[["montagne", { alt:280, neve:false, rif:1 }], ["lago", {}], ["uomo", { x:300, y:880, s:1.35, rim:0 }]], fx:["nebbia"] }
    ]),
    vita: c => c.pick([
      { pal:"alba", el:[["vicolo", {}], ["palloncini", {}], ["ragazzo", { x:300, y:880, s:1.35, rim:0 }]], fx:[] },
      { pal:"mare", el:[["luce", { x:300, y:600, r:70, t:"sole" }], ["mare", {}], ["coppia", { x:300, y:880, s:1.2, rim:0 }]], fx:["bokeh"] }
    ]),
    azione: c => c.pick([
      { pal:"neon", el:[["neon", {}], ["coppia", { x:300, y:880, s:1.2, rim:0, rimCol:"#5ee1ff" }]], fx:[] },
      { pal:"tramonto", el:[["luce", { x:300, y:600, r:80, t:"sole" }], ["palme", {}], ["autoRetro", { x:300, y:800, s:1.2 }]], fx:["polvere"] },
      { pal:"neon", el:[["futuro", {}], ["laser", {}], ["dj", { x:300, y:880, s:1.4, rim:0 }]], fx:[] }
    ])
  };
  EL.vespa = (c, o) => {
    const col = o.col || "#6fb6a0";
    return G(o.x, o.y, o.s || 1, C(-80, 0, 26, "#111") + C(80, 0, 26, "#111") + C(-80, 0, 12, "#777") + C(80, 0, 12, "#777") + P("M-130 -20Q-140 -90 -70 -96Q-20 -96 -10 -40H40L60 -40Q70 -120 92 -150L106 -146Q90 -110 96 -40L104 -10H-120Z", col) + P("M-110 -100Q-60 -116 -20 -104L-26 -96Q-60 -104 -104 -94Z", "#2a2a2a") + L(92, -150, 70, -170, "#2a2a2a", 6) + L(92, -150, 118, -166, "#2a2a2a", 6) + C(108, -134, 9, "#fff6c0"), null, o.flip);
  };

  /* ---------- la locandina ---------- */
  const CIELO = { stelle:1, galassia:1, fulmine:1, nuvole:1, segnale:1 };
  const cache = new Map();
  function disegna(s, W2, H2, o){
    const c = Ctx(s, W2, H2);
    c.hd = !!o.hd;
    let sp = STORIE[s.id] || (W.LOCANDINE_STORIE || {})[s.id];
    if(!sp){ const gen = GENERE[s.g] || GENERE.drama; sp = gen(c); }
    if(typeof sp === "function") sp = sp(c);
    c.p = Object.assign({}, PAL[sp.pal] || PAL.notte, sp.tinta || {});
    HOR = sp.hor || 655;
    const conTesto = o.testo != null ? o.testo : (W2 >= 110 && H2 / W2 >= 1.15 && H2 / W2 <= 1.75);
    let e = cielo(c);
    const fx = (sp.fx || []).map(n => Array.isArray(n) ? n : [n, {}]);
    if(c.hd && sp.cielo !== false && !["spazio", "abisso"].includes(sp.pal) && !fx.some(([n]) => n === "nuvole") && !(sp.el || []).some(([n]) => n === "nuvole")){
      const base = mix(c.p.sky[1], c.p.glow, .12), fl = c.rumore("nuvAuto", ".0026 .0085", 5, 61, 1.9, -.92), yb = Math.min(HOR - 150, 430);
      e += R(-20, 30, VW + 40, yb, c.lin([[0, base, 0], [.35, base, .55], [.8, mix(base, c.p.glow, .3), .65], [1, base, 0]]), null, ` filter="${fl}"`);
    }
    fx.forEach(([n, a]) => { if(CIELO[n] && FX[n]) e += FX[n](c, a); });
    (sp.el || []).forEach(([n, a]) => {
      const fn = EL[n];
      if(!fn) return;
      try{
        let out = fn(c, a || {});
        const dof = a && a.dof != null ? a.dof : (a && a.z === 0 ? 1.1 : 0);
        if(c.hd && dof) out = `<g filter="${c.sfoca(dof)}">${out}</g>`;
        if(!c.hd && a && a.cont) e += contorno(out, a.contCol || c.p.glow, a.cont[0], a.cont[1], a.contW, a.contA);
        if(c.hd && a && a.cont) out = `<g filter="${c.rim(f(a.cont[0] * 1.2), f(a.cont[1] * 1.2), a.contCol || c.p.glow)}">${out}</g>`;
        e += out; if(a && a.rif) c.rif += out;
      }catch(err){}
    });
    fx.forEach(([n, a]) => { if(!CIELO[n] && FX[n]) e += FX[n](c, a); });
    e += grading(c, conTesto);
    if(conTesto) e += scritte(c, sp);
    HOR = 655;
    return `<svg viewBox="0 0 ${VW} ${VH}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"${o.px ? ` width="${W2}" height="${H2}"` : ""}><defs>${c.d}</defs>${e}</svg>`;
  }
  function svg(s, W2, H2, o){
    o = o || {};
    const key = [s.id, s.t, s.g, s.hook, s.city, s.era, W2, H2, o.testo, o.hd, o.px].join("|");
    let out = cache.get(key);
    if(!out){ out = disegna(s, W2, H2, o); if(cache.size > 400) cache.clear(); cache.set(key, out); }
    const u = "L" + (nUso++).toString(36) + "_";
    return out.replace(/§U§/g, u);
  }

  /* ---------- le 72 locandine, composte a mano ---------- */
  const STORIE = {
    "bar-ferrante": { pal:"pioggia", tinta:{ acc:"#ffb45a", glow:"#ffd2a0" }, tag:"Il tuo capo è gentilissimo. Troppo.",
      el:[["palazzi", { z:0, h:[230, 380], w:[40, 80], win:.06 }], ["duomo", { x:120, y:HOR - 50, s:.8, z:0 }], ["palazzi", { z:1, h:[110, 230], win:.1, tetti:true, x1:250 }],
          ["bottega", { x:430, w:330, h:250, insegna:"Bar Ferrante", col:"#ffb45a", dentro:"uomo", dx:.62, ds:.8, fs:40 }], ["donna", { x:160, y:870, s:1.42, rim:1, ombrello:true, flip:true }]],
      fx:[["pioggia", { n:80 }], ["bokeh", { n:10 }]] },
    trattoria: { pal:"oro", tag:"Sei mesi per salvare la trattoria di famiglia. Di fronte apre uno chef stellato.",
      el:[["luce", { x:300, y:520, r:46, t:"sole", alone:6 }], ["campanile", { x:300, s:1.25, t:"ghirlandina", z:0 }], ["palazzi", { z:1, h:[70, 140], win:.12, tetti:true }],
          ["bottega", { x:130, w:250, h:220, insegna:"Trattoria", col:"#ffc46a", dentro:"nonna", dx:.55, ds:.7, fs:36, alto:120 }], ["bottega", { x:475, w:250, h:220, insegna:"Conti", col:"#a8e6ff", tenda:"#1a2a3a", fs:38, alto:120 }],
          ["donna", { x:232, y:872, s:1.3, rim:-1, rimCol:"#ffc46a" }], ["testa", { x:372, y:876, s:1.36, flip:true, rim:1, rimCol:"#a8e6ff" }]], fx:[["bokeh", { n:8 }]] },
    palio: { pal:"pioggia", tinta:{ acc:"#ffcf7a", glow:"#e6eeff" }, tag:"Il fantino favorito muore la notte prima della corsa.",
      el:[["luce", { x:390, y:350, r:78, t:"luna", alone:5 }], ["palazzi", { z:0, h:[120, 210], win:.12, tetti:true }], ["campanile", { x:110, s:1.3, t:"mangia", palazzo:true, z:1 }],
          ["terra", { y:HOR - 6, h:-20, col:"#16120e" }], ["fascio", { x1:390, y1:350, x2:330, y2:VH, w1:40, w2:330, col:"#e6eeff", a:.14 }], ["cavallo", { x:300, y:505, s:1.5, z:2, cont:[2, -2], contW:4, contA:.95 }]],
      fx:[["pioggia", { n:70 }], ["nebbia", { n:3, k:.8 }]] },
    arena: { pal:"oro", tag:"Ventimila persone hanno visto tutto. Nessuno ha visto niente.",
      el:[["gradinate", { y0:230, y1:540 }], ["palco", { y:HOR }], ["riflettori", { x:300, y:560 }], ["tenore", { x:300, y:HOR - 22, s:1.05, rim:0, rimCol:"#ffe6b0" }]], fx:[["polvere", { n:30, y0:250 }]] },
    portofino: { pal:"pioggia", tinta:{ glow:"#e6eeff", acc:"#ffd27a" }, tag:"Una villa, una tempesta, un matrimonio. E un morto in piscina.",
      el:[["nuvole", { n:7, y:180 }], ["fulmine", { x:190 }], ["promontorio", { x:120, y:380, z:1 }], ["villa", { x:430, y:392, s:.86, luci:true, palme:true }], ["faro", { x:200, y:HOR - 20, s:.5 }],
          ["mare", { lx:450, onde:true, ga:.35 }], ["sposa", { x:300, y:880, s:1.32, col:"#ece6dc" }]], fx:[["pioggia", { n:70 }]] },
    nebbia: { pal:"nebbia", tag:"Una ragazza sparita nella nebbia. Un paese che non vuole parlare.",
      el:[["alberi", { t:"pioppo", z:0, n:16, h:[130, 190], y:HOR - 40 }], ["nebbia", { n:6, y:HOR - 60 }], ["alberi", { t:"pioppo", z:1, n:7, h:[200, 260], y:HOR - 10, x1:-10, x2:610 }],
          ["terra", { y:HOR - 30, h:24, z:1 }], ["bici", { x:400, y:HOR - 52, s:.95, z:2, cesto:true, rot:-4 }], ["nebbia", { n:5, y:HOR + 40 }], ["trench", { x:180, y:880, s:1.36, rim:1 }]], fx:[] },
    matera: { pal:"tramonto", tag:"La star di Hollywood muore sul set. Ma il morto è davvero lui?",
      el:[["sassi", {}], ["fasci", {}], ["ciak", { x:430, y:590, s:.95, rot:-10 }], ["trench", { x:170, y:880, s:1.36, rim:1 }]], fx:[["polvere", { n:24 }]] },
    positano: { pal:"mare", tag:"Un'estate, un limoneto da salvare, due cuori in mezzo.",
      el:[["luce", { x:445, y:520, r:58, t:"sole" }], ["mare", { lx:445 }], ["costiera", { x:0 }], ["limoni", { x:470, y:190, s:1.05, flip:true }], ["coppia", { x:440, y:880, s:1.18, rim:0 }]], fx:[["bokeh", { n:8 }]] },
    bologna: { pal:"tramonto", tinta:{ far:"#6a2a22", mid:"#3a1410", ink:"#140806" }, tag:"Una stanza in affitto, tre coinquilini, un anno che cambierà tutto.",
      el:[["luce", { x:400, y:600, r:46, t:"sole", alone:6 }], ["palazzi", { z:0, h:[80, 180], tetti:true, x0:300 }], ["torri", { x:420, y:HOR - 10, s:1.05, z:1 }],
          ["palazzi", { z:1, h:[60, 120], win:.2, tetti:true, x0:330 }], ["portico", { vx:340, vy:610 }], ["coppia", { x:340, y:880, s:1.15, rim:1 }]], fx:[["bokeh", { n:8 }]] },
    firenze: { pal:"oro", tag:"Sotto il quadro c'è un altro quadro. E qualcuno lo vuole a tutti i costi.",
      el:[["luce", { x:150, y:600, r:44, t:"sole", alone:6 }], ["cupola", { x:165, s:1.12, cost:true, z:0, rif:1 }], ["campanile", { x:455, s:.9, t:"giotto", z:0, rif:1 }],
          ["palazzi", { z:1, h:[50, 120], win:.18, tetti:true, rif:1 }], ["lago", { ra:.45 }], ["quadro", { x:300, y:432, s:.64, volto:true }]], fx:[] },
    langhe: { pal:"tramonto", tag:"Una nonna che non conoscevi. Una vigna. Un vicino insopportabile.",
      el:[["luce", { x:330, y:560, r:58, t:"sole" }], ["foschia", { y:HOR - 40, a:.25 }], ["colline", { vigne:true, amp:50 }], ["cascina", { x:430, y:HOR - 96, s:.62 }],
          ["coppia", { x:250, y:HOR - 52, s:.45, z:2, rim:0 }], ["uva", { x:120, y:400, s:1.3, ramo:true }]], fx:[] },
    trieste: { pal:"lago", tinta:{ glow:"#ffe8c8", acc:"#ffd9a0" }, tag:"Lettere d'amore del 1954, nascoste in un caffè. Chi le ha scritte?",
      el:[["luce", { x:430, y:570, r:40, t:"sole" }], ["palazzi", { z:1, h:[90, 170], win:.25, x1:200 }], ["faro", { x:110, y:HOR - 60, s:.95, t:"vittoria", raggio:false }],
          ["mare", { lx:430 }], ["pontile", { x:300, w:200 }], ["lettera", { x:330, y:400, s:.9, rot:-14, scritta:true }], ["lettera", { x:470, y:270, s:.42, rot:20 }], ["lettera", { x:170, y:250, s:.3, rot:-30 }]], fx:[["vento", { n:20 }]] },
    neoroma: { pal:"neon", tinta:{ acc:"#5ee1ff" }, tag:"Una consegna. Un pacco che pensa. Tutta Roma ti dà la caccia.",
      el:[["futuro", {}], ["ologramma", { x:300, y:275, w:300, h:140 }], ["colosseo", { x:300, s:1.2, z:1, neon:"#ff4fd8" }], ["lago", { ga:.3, gc:"#ff4fd8" }],
          ["ragazzo", { x:300, y:880, s:1.4, rim:0, rimCol:"#5ee1ff" }], ["pacco", { x:300, y:690, s:.55 }]], fx:[["pioggia", { n:60, col:"#ff9ad8" }]] },
    gransasso: { pal:"spazio", hor:300, tinta:{ acc:"#9fe8ff", far:"#2a3a62", glow:"#cfe0ff" }, tag:"Un messaggio arriva dal futuro. E porta la tua firma.",
      el:[["stelle", { n:50, y:300 }], ["foschia", { y:300, h:150, a:.35 }], ["montagne", { alt:210, cols:["#33456e", "#18223e"] }], ["roccia", { y:300, cols:["#10161e", "#030508"], strati:"#2a3442" }], ["fascio", { x1:300, y1:0, x2:300, y2:600, w1:2, w2:10, col:"#cff6ff", a:.8 }],
          ["rivelatore", { x:300, y:590, r:205 }], ["trench", { x:300, y:880, s:1.05, rim:0, rimCol:"#9fe8ff" }]], fx:[["segnale", { x:300, y:590 }]] },
    venezia2140: { pal:"abisso", tag:"Il mare si è preso Venezia. Le cupole stanno per cedere.",
      el:[["raggi", { n:6 }], ["venezia", { x:430, s:1.05, z:0 }], ["cupolaVetro", { crepe:true }], ["astronauta", { x:300, y:720, s:1.05, rot:-12, rim:0, rimCol:"#bff6ff" }], ["bolle", { n:40 }]], fx:[] },
    "robot-nonna": { pal:"alba", tag:"Doveva solo ricordarle le medicine. Ha scoperto la vita.",
      el:[["luce", { x:300, y:470, r:52, t:"sole" }], ["cittaAlta", {}], ["foschia", { y:HOR, a:.2 }], ["nonna", { x:240, y:880, s:1.3, rim:0 }], ["robot", { x:372, y:880, s:1.2, rim:0 }]], fx:[["lucciole", { n:14 }]] },
    etna: { pal:"incubo", tinta:{ acc:"#7dff9a", glow:"#c8ffd8" }, tag:"Una luce cade sull'Etna. Da quella notte, tutti fanno lo stesso sogno.",
      el:[["stelle", { n:70 }], ["meteora", { x1:560, y1:40, x2:318, y2:380, col:"#b8ffcf", w:6 }], ["vulcano", { x:300, s:1.3, z:0, fumo:true, cristalli:true, fumoCol:"#6a7a90" }],
          ["palazzi", { z:1, h:[16, 50], w:[14, 30], win:.5, wc:"#ffcf7a" }], ["trench", { x:200, y:880, s:1.3, rim:1 }]], fx:[] },
    "castel-del-monte": { pal:"tramonto", tag:"\"Non si fidi di nessuno. Segua l'ottagono.\"",
      el:[["ottagono", { x:300, y:400, r:230 }], ["luce", { x:300, y:560, r:60, t:"sole" }], ["castello8", { x:300, s:1.25 }], ["alberi", { t:"ulivo", n:3, x1:30, x2:150, y:HOR + 60, h:[150, 190] }], ["alberi", { t:"ulivo", n:3, x1:460, x2:580, y:HOR + 70, h:[150, 190] }]], fx:[] },
    dolomiti: { pal:"ghiaccio", tag:"Una scalata, una tempesta, una città di ghiaccio della Grande Guerra.",
      el:[["nuvole", { n:10, y:200 }], ["montagne", { alt:470 }], ["nebbia", { n:4, y:HOR - 120 }], ["cresta", { x:360, y:520 }], ["alpinista", { x:372, y:528, s:.72, rim:1 }],
          ["alpinista", { x:250, y:600, s:.62, rim:1 }], ["neve", { n:90 }]], fx:[] },
    maddalena: { pal:"mare", tinta:{ sky:["#0b1a26", "#1f3a4e", "#4a6a78", "#a8b8b0"], glow:"#f2f6ff" }, tag:"Una burrasca, un relitto, una cassa che qualcuno rivuole indietro.",
      el:[["nuvole", { n:8, y:200 }], ["fulmine", { x:150 }], ["mare", { lx:300, onde:true, ga:.25 }], ["barcaVela", { x:370, y:HOR + 20, s:1.05, rot:-12 }], ["scogli", { x0:-40, x1:300, y:HOR + 30, col:"#2a1a1e" }], ["cassa", { x:150, y:640, s:.85 }]], fx:[["pioggia", { n:50 }]] },
    "napoli-sotto": { pal:"notte", hor:300, tag:"Sotto Napoli c'è un'altra Napoli. E una porta chiusa dal 1943.",
      el:[["luce", { x:500, y:200, r:22, t:"luna" }], ["vulcano", { x:430, y:300, s:.4, fumo:false }], ["palazzi", { y:300, z:1, h:[40, 110], win:.3, tetti:true }],
          ["roccia", { y:300, cols:["#2e1e12", "#080402"] }], ["caverna", { x:300, top:420, w:480, murata:true, my:450 }], ["ragazzo", { x:190, y:810, s:1.0, rim:1, rimCol:"#ffb85a" }], ["lanterna", { x:238, y:700, s:.4 }], ["donna", { x:410, y:814, s:.96, rim:-1, rimCol:"#ffb85a" }]], fx:[["polvere", { n:36, y0:380, col:"#ffd9a0" }]] },
    millemiglia: { pal:"alba", tag:"Una contessa di 84 anni, un'Alfa del 1955 e mille miglia di guai.",
      el:[["luce", { x:150, y:500, r:52, t:"sole" }], ["colline", { cipressi:true, amp:46 }], ["strada", { d:"M-40 720Q120 650 220 616Q330 590 460 598Q560 606 640 566", w:64 }], ["auto", { x:330, y:588, s:1.05, scia:true }]], fx:[["polvere", { n:30, y0:520 }], ["velocita", { y0:470, y1:600 }]] },
    "codice-rosso": { pal:"notte", tinta:{ acc:"#ff3a3a", glow:"#ff7a7a" }, tag:"Hai trovato il codice. Ora il codice ha trovato te.",
      el:[["codice", { n:22, rosso:.6 }], ["alone", { x:300, y:420, r:260, col:"#ff3a3a", a:.35 }], ["palazzi", { z:0, h:[150, 280], win:.06, wc:"#ff5a5a" }], ["mole", { x:300, s:1.25, z:1 }], ["palazzi", { z:1, h:[70, 150], win:.1, wc:"#ffcf7a", tetti:true }], ["trench", { x:300, y:880, s:1.4, rim:0 }]], fx:[] },
    crociera: { pal:"notte", hor:560, tinta:{ acc:"#ffd27a" }, tag:"Tremila passeggeri e un biglietto: prima di Barcellona morirà qualcuno.",
      el:[["luce", { x:470, y:170, r:40, t:"luna" }], ["stelle", { n:40, y:560 }], ["faro", { x:70, y:560, s:.85, t:"lanterna" }], ["nave", { x:330, y:590, s:1.05, rif:1 }], ["mare", { lx:470, ra:.35 }], ["donna", { x:130, y:880, s:1.3, rim:1, rimCol:"#ffd27a" }]], fx:[] },
    protezione: { pal:"ghiaccio", tinta:{ sky:["#040a14", "#0e2236", "#2a4a66", "#6a8aa6"] }, tag:"Nuovo nome, nuova vita, un paese tra i monti. Ma il passato ti ha trovato.",
      el:[["luce", { x:440, y:210, r:36, t:"luna" }], ["montagne", { alt:380 }], ["alberi", { t:"pino", z:1, n:16, h:[60, 120], y:HOR - 4 }], ["borgo", { x:220, luci:.35 }], ["fari", { x:420, y:HOR + 30 }], ["trench", { x:250, y:880, s:1.36, rim:1 }]], fx:[["neve", { n:40 }]] },
    borgo: { pal:"incubo", tag:"Alle 3:33 la campana suona. Non c'è nessuno a tirarla.",
      el:[["luce", { x:320, y:270, r:74, t:"luna" }], ["stelle", { n:30 }], ["borgo", { x:300, luci:.4 }], ["nebbia", { n:5, y:HOR - 20 }], ["bambina", { x:300, y:780, s:1.15, rim:0 }]], fx:[] },
    "villa-lago": { pal:"lago", tinta:{ sky:["#070b10", "#141f2a", "#2c3e4c", "#5a6a74"], glow:"#e8f0ff", acc:"#ffcf7a" }, tag:"Una villa, un inverno, una regola: non aprire mai la stanza della musica.",
      el:[["montagne", { alt:300, rif:1 }], ["alberi", { t:"cipresso", z:2, n:2, x1:150, x2:450, h:[230, 250], rif:1 }], ["villa", { x:300, s:1.2, una:true, rif:1 }], ["lago", { ra:.5 }]], fx:[["neve", { n:50 }], ["nebbia", { n:4 }]] },
    janare: { pal:"incubo", tinta:{ acc:"#b8ff9a" }, tag:"Studi le streghe del Sannio. Le streghe stanno studiando te.",
      el:[["luce", { x:300, y:300, r:96, t:"luna" }], ["streghe", {}], ["colline", { cols:["#1c1434", "#0c0819", "#020105"] }], ["noce", { x:300, y:HOR + 40 }], ["donna", { x:300, y:880, s:1.25, rim:0 }]], fx:[["nebbia", { n:4 }], ["lucciole", { n:16 }]] },
    salento: { pal:"notte", tinta:{ acc:"#ffd27a", glow:"#ffe0a0" }, tag:"Il matrimonio di tua cugina. Trecento parenti. Un fidanzamento inventato.",
      el:[["alberi", { t:"ulivo", z:1, n:5, h:[110, 150], y:HOR }], ["luminarie", { x:300, y:HOR + 30, w:560, h:600 }], ["coppia", { x:300, y:880, s:1.25, rim:0 }]], fx:[["coriandoli", { n:46 }]] },
    condominio: { pal:"tramonto", tag:"Ventidue appartamenti. Ventidue matti. E un inquilino che nessuno ha mai visto.",
      el:[["luce", { x:540, y:250, r:40, t:"sole" }], ["facciata", { x:60, y:175, w:480 }], ["nonna", { x:258, y:360, s:.34, z:2 }]], fx:[] },
    virale: { pal:"neon", tinta:{ acc:"#ffd36b" }, tag:"Un tuffo nel Naviglio, otto milioni di visualizzazioni. Benvenuti nella fama.",
      el:[["palazzi", { z:0, h:[150, 260], win:.2, tetti:true, rif:1 }], ["lucine", { fili:[[0, 150, 600, 190, 60], [0, 250, 600, 220, 50]] }], ["lago", { ra:.4 }], ["smartphone", { x:300, y:620, s:1.2, rot:6 }]], fx:[["cuori", { n:16 }]] },
    poggioreale: { pal:"oro", tag:"Entri in cella per contrabbando. Ne uscirai re, servo o testimone.",
      el:[["vulcano", { x:440, s:.7, z:0, fumo:false }], ["carcere", { h:230 }], ["coppola", { x:300, y:890, s:1.45, rim:0 }], ["sbarre", { n:5, x0:70, x1:530, trav:[300] }]], fx:[["fumo", { n:5 }]] },
    montagna: { pal:"sangue", tag:"Siete cresciuti nello stesso paese. Lui è diventato il capo. Tu sei lo Stato.",
      el:[["luce", { x:300, y:400, r:72, t:"sole" }], ["borgo", { x:300, luci:.12 }], ["ficodindia", { x:60, y:HOR + 80, r:46 }], ["ficodindia", { x:550, y:HOR + 90, r:40 }],
          ["coppola", { x:252, y:886, s:1.4, flip:true, rim:-1 }], ["uomo", { x:350, y:886, s:1.4, rim:1 }]], fx:[["polvere", { n:20 }]] },
    "quarta-dimensione": { pal:"incubo", tinta:{ acc:"#9fd8ff", glow:"#e6f6ff" }, tag:"Lo studio del tuo professore ha cinque stanze. Stasera ne conti sei.",
      el:[["stelle", { n:30 }], ["tesseratto", { x:300, y:270, r:110 }], ["pisa", { x:120, s:.85, z:0 }], ["palazzi", { z:1, h:[60, 140], win:.15, tetti:true }], ["porta", { x:350, y:HOR + 10, w:80, h:170 }], ["trench", { x:250, y:880, s:1.3, rim:1 }]], fx:[["cubi", { n:5 }]] },
    cacciatore: { pal:"verde", tinta:{ acc:"#6ec8ff", glow:"#d8ecff" }, tag:"Ti pagano per uccidere mostri. Ma i peggiori hanno un volto umano.",
      el:[["luce", { x:300, y:330, r:86, t:"luna", alone:5 }], ["montagne", { alt:240, neve:false }], ["castello", { x:300, y:HOR - 80, s:.62, z:1, rupe:true }], ["alberi", { t:"pino", z:2, n:12, h:[170, 280], x1:-30, x2:630 }],
          ["lupo", { x:120, y:600, s:1.05, z:2, cont:[0, -3], contW:3 }], ["cacciatore", { x:390, y:886, s:1.42, rim:-1, rimCol:"#8ad8ff" }], ["lanterna", { x:318, y:740, s:.5, col:"#6ec8ff" }]], fx:[["nebbia", { n:4 }], ["lucciole", { n:14, col:"#6ec8ff" }]] },
    infinito: { pal:"spazio", tag:"Una sonda porta nello spazio una poesia. Duecento anni dopo, qualcuno risponde.",
      el:[["galassia", {}], ["stelle", { n:80 }], ["pianeta", { x:500, y:220, r:150 }], ["sonda", { x:230, y:330, s:1.0 }], ["onde", { x:300, y:HOR - 160, r:46 }],
          ["parabola", { x:120, s:.7 }], ["parabola", { x:300, s:1.0 }], ["parabola", { x:480, s:.8, flip:true }]], fx:[] },
    prometti: { pal:"fuoco", tinta:{ sky:["#020208", "#0e0a18", "#4a2214", "#c8703a"] }, tag:"Ogni ora vicino al buco nero sono tre anni per tua figlia.",
      el:[["stelle", { n:60, y:420 }], ["buconero", { x:300, y:250, s:.85 }], ["masseria", { x:450, s:.55, col:"#7a5040" }], ["polvere", { n:50, y0:500 }], ["testa", { x:262, y:830, s:1.3, rim:0 }], ["bambina", { x:352, y:830, s:1.45, rim:0 }], ["grano", { y:720 }]], fx:[] },
    tripodi: { pal:"fuoco", tag:"Cadono stelle in pieno giorno. Poi dal Tevere si alza il primo Tripode.",
      el:[["meteora", { x1:120, y1:30, x2:260, y2:220, w:4 }], ["meteora", { x1:420, y1:20, x2:520, y2:160, w:3 }], ["cupola", { x:150, s:1.15, z:0 }], ["palazzi", { z:1, h:[50, 130], win:.22, wc:"#ffb35a" }],
          ["tripode", { x:470, s:1.0, z:1 }], ["banda", { x:290, y:840, s:1.05, tipi:["uomo", "donna", "bambino"], rim:0 }]], fx:[["fumo", { n:8 }], ["braci", { n:30 }]] },
    "italia-spezzata": { pal:"seppia", tag:"Il Kaiser ha vinto. L'Italia è spezzata in cinque. Tua sorella è oltre il fiume.",
      el:[["zeppelin", { x:400, y:210, s:1.05 }], ["zeppelin", { x:140, y:300, s:.45, flip:true }], ["fascio", { x1:80, y1:HOR, x2:260, y2:0, w1:4, w2:50, a:.25 }], ["fascio", { x1:520, y1:HOR, x2:360, y2:0, w1:4, w2:50, a:.25 }],
          ["pontecoperto", { rif:1 }], ["lago", { ra:.45 }], ["soldato", { x:230, y:886, s:1.4, rim:0 }]], fx:[["fumo", { n:5 }]] },
    mentone: { pal:"tramonto", tag:"Il 10 giugno 1940 il nemico parla il dialetto di tua madre.",
      el:[["luce", { x:440, y:590, r:58, t:"sole" }], ["mare", { lx:440 }], ["montagne", { alt:330, neve:false, x0:-40, x1:300 }], ["bunker", { x:170, y:HOR + 90, s:1.05 }], ["soldato", { x:360, y:884, s:1.42, rim:1 }]], fx:[] },
    stalingrado: { pal:"fuoco", hor:470, tag:"Attraversi il Volga sotto le bombe. Di là c'è la città più contesa del mondo.",
      el:[["rovine", { h:[130, 300], rif:1 }], ["lago", { ra:.6 }], ["chiatta", { x:300, y:590, s:1.2, cont:[0, -2], contCol:"#ffb35a", contW:3, contA:.7 }]], fx:[["razzi", { pos:[[120, 150], [470, 100]] }], ["fumo", { n:10 }], ["braci", { n:50 }]] },
    piave: { pal:"seppia", tag:"Hai diciotto anni. Il fronte è crollato a Caporetto. Ora tocca a voi.",
      el:[["montagne", { alt:280, neve:false }], ["razzi", {}], ["soldato", { x:300, y:880, s:1.45, rim:0 }], ["trincea", { y:770 }]], fx:[["fumo", { n:7 }]] },
    ossola: { pal:"alba", tag:"Settembre 1944: i partigiani liberano l'Ossola. Durerà quaranta giorni.",
      el:[["luce", { x:300, y:530, r:52, t:"sole" }], ["montagne", { alt:420 }], ["palazzi", { z:1, h:[20, 60], w:[16, 34], win:.3, tetti:true }], ["campanile", { x:210, y:HOR, s:.4, t:"chiesa", z:1 }],
          ["bandiera", { x:330, y:640, s:.85, colori:["#2a8a4a", "#f2efe6", "#c8241e"] }], ["banda", { x:300, y:884, s:1.0, tipi:["coppola", "donna", "soldato", "ragazzo"], rim:0 }]], fx:[] },
    mille: { pal:"alba", tag:"Mille volontari, due vecchi piroscafi, nessuna speranza.",
      el:[["luce", { x:430, y:600, r:56, t:"sole" }], ["mare", { lx:430 }], ["piroscafo", { x:430, y:HOR + 18, s:.9 }], ["piroscafo", { x:190, y:HOR + 10, s:.6, flip:true }], ["scogli", { x0:-30, x1:600, y:HOR + 150 }],
          ["garibaldino", { x:250, y:890, s:1.42, rim:1 }], ["bandiera", { x:160, y:720, s:1.0, colori:["#2a8a4a", "#f2efe6", "#c8241e"], flip:true }]], fx:[] },
    canne: { pal:"sangue", tinta:{ glow:"#ffb070" }, tag:"Ottantamila Romani contro Annibale. Sopravvivere sarà la tua vergogna.",
      el:[["luce", { x:300, y:600, r:82, t:"sole" }], ["lance", {}], ["polvere", { n:50, y0:420 }], ["legionario", { x:300, y:890, s:1.45, rim:0 }]], fx:[] },
    riviera: { pal:"neon", tag:"Tre criminali, una città di discoteche e influencer, un colpo impossibile.",
      el:[["neon", {}], ["banda", { x:300, y:740, s:1.05, tipi:["uomo", "donna", "ragazzo"], rim:0, rimCol:"#ff7ad8" }], ["supercar", { x:300, y:800, s:1.05 }]], fx:[] },
    "gioia-tauro": { pal:"notte", tinta:{ acc:"#ffb347", glow:"#ffd08a", sky:["#04060c", "#0e1426", "#2e2a36", "#6a4a3a"] }, tag:"Dentro un container di banane c'è abbastanza cocaina da comprare una città.",
      el:[["foschia", { y:HOR, h:220, a:.3, col:"#ffb347" }], ["gru", { xs:[110, 430] }], ["alone", { x:110, y:HOR - 250, r:90, col:"#ffcf8a", a:.6 }], ["alone", { x:430, y:HOR - 250, r:90, col:"#ffcf8a", a:.6 }],
          ["portacontainer", { x:300, y:HOR + 40, s:1.0 }], ["torcia", { x:330, y:690, x2:170, y2:560, w:60 }], ["trench", { x:300, y:886, s:1.4, rim:0 }]], fx:[["nebbia", { n:3, k:.7 }]] },
    "terra-fuochi": { pal:"fuoco", tag:"Le tue bufale si ammalano. Di notte, nei campi vicini, qualcuno brucia qualcosa.",
      el:[["vulcano", { x:470, s:.5, z:0, fumo:false }], ["roghi", { xs:[80, 250, 470] }], ["bufale", { xs:[110, 480], y:HOR + 60, s:.95 }], ["donna", { x:300, y:886, s:1.4, rim:0 }]], fx:[["braci", { n:40 }]] },
    "non-pago": { pal:"notte", tinta:{ acc:"#ff8ac0", glow:"#ffc0dc" }, tag:"Hai aperto la pasticceria dei tuoi sogni. Il terzo giorno ti incollano la serratura.",
      el:[["palazzi", { z:0, h:[180, 300], win:.06 }], ["cupoleRosse", { x:110, y:HOR, s:.85 }], ["bottega", { x:400, w:320, h:270, insegna:"Zucchero", col:"#ff9ec6", fs:46, alto:90 }],
          ["torta", { x:400, y:628, s:.66, cassata:true }], ["uomo", { x:190, y:886, s:1.42, rim:1 }]], fx:[] },
    motoscafi: { pal:"notte", hor:520, tinta:{ glow:"#cfe6ff", acc:"#7fb8ff" }, tag:"Di notte l'Adriatico diventa un'autostrada. Tu sei al timone.",
      el:[["luce", { x:120, y:190, r:36, t:"luna" }], ["stelle", { n:40, y:520 }], ["palazzi", { z:0, h:[8, 26], w:[10, 24], win:.4, wc:"#ffd27a" }], ["mare", { lx:120, onde:true }], ["elicottero", { x:350, y:210, s:.8, h:520, cont:[0, -2], contW:3 }], ["motoscafo", { x:330, y:640, s:1.35, flip:true }]], fx:[] },
    "re-di-roma": { pal:"oro", tag:"Sei ragazzi di borgata decidono di prendersi Roma. Il prezzo sarà tutto.",
      el:[["luce", { x:300, y:560, r:50, t:"sole", alone:6 }], ["cupola", { x:300, s:1.3, z:0 }], ["palazzi", { z:1, h:[50, 140], win:.15, tetti:true }],
          ["banda", { x:300, y:890, s:.98, tipi:["uomo", "coppola", "testa", "ragazzo", "uomo", "testa"], rim:0, passo:80 }]], fx:[["fumo", { n:6 }]] },
    ostia: { pal:"mare", tag:"Il nuovo proprietario dello stabilimento non ha mai fatto un bagno in vita sua.",
      el:[["luce", { x:190, y:600, r:60, t:"sole" }], ["mare", { lx:190 }], ["pontile", { x:450, w:160, rotonda:true }], ["ombrelloni", { y:HOR + 60 }], ["torretta", { x:100, y:HOR + 150, s:1.0 }], ["uomo", { x:320, y:890, s:1.42, rim:0 }]], fx:[] },
    "rien-ne-va-plus": { pal:"nebbia", tinta:{ acc:"#ffd27a", glow:"#fff0d0", sky:["#0c1014", "#1e262c", "#3e4a52", "#6a7278"] }, tag:"Il cliente più generoso della sala ti chiede di aiutarlo a svuotarla.",
      el:[["venezia", { x:430, s:.95, z:0, luci:true, rif:1 }], ["palazzi", { z:1, h:[110, 190], win:.4, wc:"#ffd27a", x0:360, rif:1 }], ["lago", { ra:.4, gc:"#ffd27a" }], ["gondola", { x:220, y:HOR + 70, s:.9 }],
          ["nebbia", { n:5 }], ["uomo", { x:300, y:890, s:1.42, rim:0, rimCol:"#ffd27a" }]], fx:[["carteCadenti", { n:18 }]] },
    lambrate: { pal:"nebbia", tinta:{ acc:"#ffcf7a", glow:"#ffe8c0", sky:["#0e1012", "#24282a", "#4a4e4c", "#7a7a70"] }, tag:"Una notte entrano tre rapinatori. E il capo ti lascia la sua parte del bottino.",
      el:[["palazzi", { z:0, h:[110, 220], win:.1 }], ["binario", { y:560 }], ["lampioni", { x:110 }], ["nebbia", { n:6, y:HOR - 30 }], ["banda", { x:300, y:886, s:1.2, tipi:["uomo", "uomo", "uomo"], rim:0, passo:90 }]], fx:[["soldi", { n:16, y0:100, y1:600 }]] },
    supramonte: { pal:"tramonto", tinta:{ far:"#7a5a58", mid:"#3a2828" }, tag:"Ti chiedono di custodire una cosa in una grotta. La cosa è un ragazzino rapito.",
      el:[["luce", { x:430, y:540, r:48, t:"sole" }], ["montagne", { alt:380, neve:false, cols:["#8a6a64", "#4a3434"] }], ["grotta", { x:420, y:HOR - 60, w:110, h:84 }], ["alberi", { t:"ulivo", z:2, n:4, h:[120, 170], y:HOR + 30 }],
          ["pecore", { xs:[150, 230, 470], y:810, s:.8 }], ["pastore", { x:280, y:890, s:1.4, rim:1 }]], fx:[] },
    cantiere: { pal:"tramonto", tag:"Devi finire il padiglione per l'Expo. Il fornitore più veloce è il più pericoloso.",
      el:[["luce", { x:180, y:590, r:48, t:"sole" }], ["grattacieli", { t:[[480, 440], [560, 330]] }], ["cantiere", {}], ["testa", { x:300, y:888, s:1.42, rim:0, casco:true }]], fx:[["polvere", { n:24 }]] },
    gargano: { pal:"verde", tinta:{ sky:["#06121a", "#14303a", "#3a6a6a", "#c8c0a0"] }, tag:"Di giorno, spiagge da cartolina. Di notte, nella foresta, una guerra senza nome.",
      el:[["luce", { x:140, y:230, r:40, t:"luna" }], ["mare", { lx:140 }], ["pizzomunno", { x:150, y:HOR + 40, s:.95 }], ["trabucco", { x:330, y:HOR + 14, s:.6 }],
          ["alberi", { t:"tondo", z:2, n:9, x1:400, x2:640, h:[260, 380], y:HOR + 60 }], ["trench", { x:330, y:888, s:1.4, rim:-1 }]], fx:[["lucciole", { n:10 }]] },
    gela: { pal:"fuoco", tag:"Metà dei tuoi alunni di terza media ha già un soprannome da adulto.",
      el:[["ciminiere", {}], ["stella", { x:300, y:330, r:120, col:"#f2ead8", w:10, a:.5 }], ["ragazzo", { x:250, y:886, s:1.15, rim:0 }], ["ragazzo", { x:360, y:888, s:1.05, rim:0 }]], fx:[["fumo", { n:8 }]] },
    caravaggio: { pal:"oro", tinta:{ sky:["#040302", "#0e0804", "#1e1208", "#3a2410"] }, tag:"Nel 1969 hanno rubato un Caravaggio. Un vecchio morente sa dov'è.",
      el:[["quadro", { x:300, y:604, s:1.14, vuoto:true }]], fx:[["polvere", { n:40, y0:80 }]] },
    fuorigioco: { pal:"notte", tag:"Sei il capitano. Un amico ti offre centomila euro per perdere una partita.",
      el:[["stadio", {}], ["pallone", { x:300, y:420, s:1.0 }], ["ragazzo", { x:300, y:890, s:1.45, rim:0, numero:"10" }]], fx:[["soldi", { n:14, y0:60, y1:560, col:"#dcd0a8", col2:"#7a6a3a" }]] },
    lugano: { pal:"lago", hor:560, tinta:{ glow:"#fff0d0" }, tag:"Il tuo nuovo cliente paga in contanti. Dieci milioni alla volta.",
      el:[["luce", { x:170, y:440, r:42, t:"sole" }], ["montagne", { alt:300, neve:false, cols:["#4a5a66", "#2a3a46"], rif:1 }], ["palazzi", { z:1, h:[60, 130], win:.35, rif:1 }], ["lago", { ra:.45 }], ["palme", { xs:[40, 570], y:700 }],
          ["uomo", { x:300, y:880, s:1.32, rim:0 }]], fx:[["soldi", { n:12, y0:240, y1:600, col:"#d8e0c8", col2:"#6a7a5a" }]] },
    "nome-falso": { pal:"nebbia", tinta:{ glow:"#ffe6c8", acc:"#ffd9a0" }, tag:"Da quindici anni vivi con un nome falso. Stamattina qualcuno ha gridato quello vero.",
      el:[["torriMedievali", {}], ["nebbia", { n:5, y:HOR - 80 }], ["documento", { x:300, y:330, s:1.0, rot:-7 }], ["mercato", { y:HOR + 40 }]], fx:[] },
    reggente: { pal:"oro", tinta:{ glow:"#ffd9a0" }, tag:"Tuo marito è stato arrestato. Il clan aspetta ordini. Da te.",
      el:[["luce", { x:300, y:500, r:56, t:"sole", alone:6 }], ["vele", {}], ["donna", { x:300, y:900, s:1.65, rim:0, collana:true }]], fx:[["fumo", { n:5 }]] },
    spalloni: { pal:"ghiaccio", tag:"Trenta chili sulle spalle, un passo a 2500 metri. E la Finanza nella nebbia.",
      el:[["luce", { x:400, y:250, r:64, t:"luna" }], ["stelle", { n:40 }], ["montagne", { alt:360 }], ["cresta", { x:430, y:470 }],
          ["spallone", { x:150, y:618, s:.55, rim:1 }], ["spallone", { x:240, y:574, s:.55, rim:1 }], ["spallone", { x:330, y:530, s:.55, rim:1 }], ["spallone", { x:415, y:484, s:.55, rim:1 }],
          ["nebbia", { n:6, y:HOR + 60 }], ["lanterna", { x:520, y:820, s:.35 }]], fx:[["neve", { n:40 }]] },
    bandito: { pal:"oro", tag:"Il bandito più amato e più ricercato dell'isola ti offre un fucile e un sogno.",
      el:[["luce", { x:300, y:590, r:70, t:"sole" }], ["montagne", { alt:240, neve:false }], ["bandito", { x:300, y:840, s:1.45, rim:0 }], ["grano", { y:700 }]], fx:[["polvere", { n:30 }]] },
    mulberry: { pal:"seppia", tag:"Sbarchi a Ellis Island con una valigia di cartone. New York ha due strade.",
      el:[["luce", { x:300, y:560, r:46, t:"sole", alone:6 }], ["grattacieli", { t:[[330, 470], [470, 400]] }], ["liberty", { x:120, s:.8, z:1 }], ["mare", { lx:300 }], ["piroscafo", { x:430, y:HOR + 24, s:.75 }],
          ["coppola", { x:250, y:890, s:1.42, rim:0 }], ["valigia", { x:330, y:880, s:.62 }]], fx:[["fumo", { n:5 }]] },
    ferracane: { pal:"sangue", tag:"Ti hanno ucciso il padre e la madre. Tutti sanno chi è stato. Nessuno parla.",
      el:[["luce", { x:300, y:600, r:66, t:"sole" }], ["vulcano", { x:300, s:1.25, z:0, lava:true, fumoCol:"#5a3a34" }], ["alberi", { t:"agrumi", z:1, n:9, h:[60, 96], y:HOR + 16, foglie:"#140505", frutti:"#e8741a" }],
          ["velo", { x:180, y:872, s:1.2, rim:0 }], ["coppola", { x:340, y:890, s:1.45, rim:0 }], ["rosa", { x:520, y:540, s:.62, rot:-18 }]], fx:[["braci", { n:20 }]] },
    prufessore: { pal:"oro", tag:"Un colpo di pistola per l'onore di tua sorella. Vent'anni dopo comandi da una cella.",
      el:[["vulcano", { x:300, s:.95, z:0, fumo:false }], ["luminarie", { x:300, y:HOR + 20, w:520, h:470 }], ["testa", { x:300, y:890, s:1.48, rim:0, occhiali:true }], ["sbarre", { n:4, x0:90, x1:510, trav:[], a:.88 }]], fx:[] },
    diciottanni: { pal:"alba", tag:"Oggi compi diciott'anni. La vita vera comincia adesso.",
      el:[["luce", { x:300, y:480, r:46, t:"sole" }], ["mare", { lx:300, y:560 }], ["vulcano", { x:300, y:560, s:.45, fumo:false }], ["terra", { y:690, h:0, z:2 }], ["vicolo", {}], ["palloncini", {}], ["ragazzo", { x:300, y:890, s:1.42, rim:0 }]], fx:[["coriandoli", { n:24 }]] },
    fuorilegge: { pal:"tramonto", tag:"Esce di prigione la persona che ami. Avete un piano e un'auto rubata.",
      el:[["luce", { x:300, y:590, r:84, t:"sole" }], ["carcere", { h:60, faro:false }], ["palme", { xs:[60, 540] }], ["stradaDritta", {}], ["elicottero", { x:460, y:230, s:.7, h:640 }], ["autoRetro", { x:300, y:640, s:1.0 }]], fx:[["polvere", { n:24 }]] },
    saline: { pal:"tramonto", hor:560, tinta:{ sky:["#1a0a1e", "#5a2050", "#d86a7a", "#f6b28a"] }, tag:"Un piccolo aereo pieno di soldi è caduto nelle paludi. Tu conosci ogni canale.",
      el:[["luce", { x:440, y:500, r:50, t:"sole" }], ["palude", { px:110 }], ["aereo", { x:400, y:570, s:.8, rot:22 }], ["fenicottero", { x:230, y:640, s:.62 }], ["fenicottero", { x:290, y:650, s:.52, flip:true }],
          ["coccodrillo", { x:420, y:700, s:.8 }]], fx:[["soldi", { n:20, y0:200, y1:640 }]] },
    neon: { pal:"neon", tag:"Cento milioni spariscono dal tuo palco. E tutti pensano che li abbia presi tu.",
      el:[["futuro", {}], ["insegna", { x:300, y:250, w:340, t:"Paradiso", col:"#ff4fd8", fs:66 }], ["laser", {}], ["palme", { xs:[40, 560] }], ["dj", { x:300, y:890, s:1.45, rim:0, rimCol:"#ff7ad8" }]], fx:[["fumo", { n:6, col:"#8a5aa0" }]] },
  };
  EL.lance = (c, o) => {
    let e = "";
    for(let k = 0; k < 150; k++){ const x = c.rnd(-10, 610), top = HOR - c.rnd(60, 160), col = c.col(k % 3 ? 1 : 2); e += L(x, HOR + 14, x + c.rnd(-8, 8), top, col, 2) + P(`M${f(x - 4)} ${f(top + 6)}L${f(x)} ${f(top - 10)}L${f(x + 4)} ${f(top + 6)}Z`, col); }
    for(let k = 0; k < 5; k++){ const x = 60 + k * 120 + c.rnd(-20, 20), top = HOR - 220; e += L(x, HOR, x, top, c.col(1), 4) + EL.aquila(c, { x, y:top, s:.16, col:c.col(1) }) + R(x - 16, top + 20, 32, 40, "#8a1a1a", .85); }
    return P(`M-10 ${HOR + 30}Q300 ${HOR - 30} 610 ${HOR + 30}V${VH}H-10Z`, c.col(2)) + e;
  };
  EL.quadro = (c, o) => {
    let e = P("M-170 -760L-40 -310H40L170 -760Z", c.lin([[0, "#fff3d0", 0], [1, "#fff3d0", .22]])) + C(0, -150, 300, c.halo("#ffe6b0", .22));
    e += R(-150, -310, 300, 370, c.lin([[0, "#f6d47a"], [.5, "#b8862a"], [1, "#6a4a12"]], 1, 1)) + R(-128, -288, 256, 326, "#2a1c10");
    if(o.vuoto){
      e += R(-116, -276, 232, 302, c.lin([[0, "#3a2a1c"], [1, "#140c06"]]));
      e += P("M-116 -276H116V26H-116Z M-104 -264L-96 -200L-108 -120L-98 -40L-106 14H104L96 -60L106 -150L98 -230L104 -264Z", "#c8a878", .85, ' fill-rule="evenodd"');
      e += S("M-104 -264L-96 -200L-108 -120L-98 -40L-106 14H104L96 -60L106 -150L98 -230L104 -264Z", "#e8d0a0", 1.4, .5);
    } else {
      e += R(-116, -276, 232, 302, c.rad([[0, "#6a4a2a"], [1, "#120a06"]], .45, .35, .7));
      if(o.volto) e += `<circle cx="-10" cy="-176" r="56" fill="none" stroke="#e8c25a" stroke-width="5" opacity=".75"/>` + P("M-10 -232Q-60 -220 -66 -120Q-70 -40 -90 20H70Q50 -40 46 -120Q40 -220 -10 -232Z", "#24324a", .9) + E(-10, -170, 26, 34, "#e6c8a0", .85) + E(30, -150, 28, 36, "#f2e6d8", .28) + C(20, -156, 3, "#1a1a1a", .5) + C(40, -156, 3, "#1a1a1a", .5);
      else e += E(-30, -150, 50, 70, "#d8b08a", .25) + E(40, -110, 40, 60, "#a07a5a", .2) + C(0, -200, 26, "#f2d0a8", .25);
    }
    return G(o.x, o.y, o.s || 1, e);
  };
  EL.pecore = (c, o) => {
    let e = "";
    (o.xs || [180, 260, 420]).forEach((x, i) => { const y = (o.y || 790) + (i % 2) * 14, s = o.s || .8; e += G(x, y, s, [-30, -10, 10, 30].map(dx => C(dx, -40, 22, "#d8d2c4")).join("") + C(0, -58, 24, "#e6e0d2") + E(44, -50, 14, 11, "#2a2420") + [-24, -8, 10, 26].map(dx => R(dx, -24, 5, 24, "#2a2420")).join("") + R(-46, -78, 104, 50, c.lin([[0, "#000", 0], [1, "#000", .45]])), null, i % 2 === 1); });
    return e;
  };
  EL.bufale = (c, o) => {
    let e = "";
    (o.xs || [120, 470]).forEach((x, i) => e += G(x, o.y || 700, o.s || .9, E(0, -60, 70, 34, c.col(2)) + E(70, -70, 22, 18, c.col(2)) + S("M64 -84Q50 -110 80 -112M80 -86Q100 -110 108 -96", c.col(2), 6) + [-46, -20, 24, 44].map(dx => R(dx, -34, 10, 34, c.col(2))).join(""), null, i % 2 === 1));
    return e;
  };
  EL.stradaDritta = (c, o) => P(`M${300 - (o.w0 || 8)} ${HOR}H${300 + (o.w0 || 8)}L${300 + (o.w1 || 260)} ${VH}H${300 - (o.w1 || 260)}Z`, "#141012") + S(`M300 ${HOR + 4}L300 ${VH}`, "#f2e6c8", 4, .55, ' stroke-dasharray="26 30"') + S(`M${300 - (o.w0 || 8) + 2} ${HOR}L${300 - (o.w1 || 260) + 16} ${VH}M${300 + (o.w0 || 8) - 2} ${HOR}L${300 + (o.w1 || 260) - 16} ${VH}`, "#f2e6c8", 2, .3);
  EL.strada = (c, o) => { const d = o.d || `M330 ${VH}Q180 800 360 ${HOR + 40}Q470 ${HOR - 10} 300 ${HOR - 30}`; return S(d, "#2a2a2a", o.w || 70, 1) + S(d, "#f2f2f2", 3, .5, ' stroke-dasharray="18 22"'); };


  /* ======================================================================
     DALLA SCENA ALL'IMMAGINE
     La scena SVG (con luci morbide, nebbia, riflessi) viene trasformata in
     un'immagine; sopra si stampano i caratteri del manifesto e la pellicola.
     ====================================================================== */
  const FB_SERIF = "'Playfair Display', Georgia, serif", FB_SANS = "Inter, Roboto, Arial, sans-serif";
  const FF = {
    gloock:`LGloock, ${FB_SERIF}`, italiana:`LItaliana, ${FB_SERIF}`, instr:`LInstrument, ${FB_SERIF}`, spalle:`LShoulders, ${FB_SANS}`,
    tektur:`LTektur, ${FB_SANS}`, erica:`LErica, ${FB_SANS}`, poiret:`LPoiret, ${FB_SANS}`, parco:`LPark, ${FB_SANS}`, crimson:`LCrimson, ${FB_SERIF}`,
    young:`LYoung, ${FB_SERIF}`, mano:`LMano, cursive`, mono:`LMono, monospace`, work:`LWork, ${FB_SANS}`, boldonse:`LBoldonse, ${FB_SANS}`
  };
  const CARATTERI = [["LGloock", "Gloock-Regular"], ["LItaliana", "Italiana-Regular"], ["LInstrument", "InstrumentSerif-Regular"], ["LInstrument", "InstrumentSerif-Italic", "italic"],
    ["LShoulders", "BigShoulders-Bold", "normal", "700"], ["LShoulders", "BigShoulders-Regular", "normal", "400"], ["LTektur", "Tektur-Medium"], ["LErica", "EricaOne-Regular"],
    ["LPoiret", "PoiretOne-Regular"], ["LPark", "NationalPark-Bold", "normal", "700"], ["LCrimson", "CrimsonPro-Bold", "normal", "700"], ["LYoung", "YoungSerif-Regular"],
    ["LMano", "NothingYouCouldDo-Regular"], ["LMono", "JetBrainsMono-Bold", "normal", "700"], ["LWork", "WorkSans-Regular", "normal", "400"], ["LWork", "WorkSans-Bold", "normal", "700"], ["LBoldonse", "Boldonse-Regular"]];
  let fontPronti = null;
  function caratteri(){
    if(fontPronti) return fontPronti;
    const base = W.LOCANDINE_FONT_BASE || "fonts/";
    const tutti = CARATTERI.map(([fam, file, style, weight]) => {
      try{ const ff = new FontFace(fam, `url(${base}${file}.woff)`, { style:style || "normal", weight:weight || "400" }); document.fonts.add(ff); return ff.load().catch(() => null); }catch(e){ return Promise.resolve(null); }
    });
    fontPronti = Promise.race([Promise.all(tutti), new Promise(r => setTimeout(r, 4000))]);
    return fontPronti;
  }

  /* stili del titolo: carattere, maiuscole, spaziatura, colori, effetti */
  const STILI = {
    giallo:      { font:FF.gloock, w:400, up:true, ls:.03, size:96, fill:["#fffaf0", "#f3dca8", "#c99a4c"], luce:.35 },
    romantico:   { font:FF.instr, w:400, it:true, ls:0, size:124, fill:["#fff8f4", "#f8d2c4"], glow:{ col:"#ff8f7a", blur:22, a:.5 } },
    fantascienza:{ font:FF.work, w:400, up:true, ls:.3, size:64, fill:["#ffffff", "#d8ecff"], glow:{ col:"#7fd4ff", blur:18, a:.55 } },
    avventura:   { font:FF.parco, w:700, up:true, ls:.05, size:88, fill:["#fff8e6", "#f0cf8a", "#b8823a"], luce:.3 },
    thriller:    { font:FF.spalle, w:700, up:true, ls:.02, size:132, fill:["#ffffff", "#dfe6ec"], riga:"#e0281e" },
    horror:      { font:FF.gloock, w:400, up:true, ls:.07, size:92, fill:["#ffece6", "#d6342a", "#5a0606"], consumato:.55, glow:{ col:"#ff2a1a", blur:24, a:.35 } },
    commedia:    { font:FF.erica, w:400, ls:.01, size:96, fill:["#fff8d0", "#ffc93a"], stroke:{ col:"#2a1200", w:10 } },
    malavita:    { font:FF.gloock, w:400, up:true, ls:.05, size:94, fill:["#fff6cc", "#ecc160", "#9a6a1e", "#f8dc8e"], luce:.35 },
    guerra:      { font:FF.spalle, w:700, up:true, ls:.06, size:128, fill:["#f6eedc", "#c8b08a"], consumato:.4 },
    fantasy:     { font:FF.crimson, w:700, up:true, ls:.12, size:82, fill:["#fff6d8", "#e8c068", "#8a5a1a"], luce:.3, ornamenti:true },
    drama:       { font:FF.instr, w:400, ls:0, size:128, fill:["#ffffff", "#eedfc8"] },
    vita:        { font:FF.young, w:400, ls:0, size:100, fill:["#fff8ea", "#ffcf96"], glow:{ col:"#ffb46a", blur:18, a:.4 } },
    azione:      { font:FF.boldonse, w:400, up:true, ls:0, size:84, fill:["#ffffff", "#ffe0f6"], glow:{ col:"#ff3fd0", blur:26, a:1 }, neon:true }
  };
  const maiuscolo = t => t.toLocaleUpperCase("it-IT");
  function conSpazi(k, ls){ if("letterSpacing" in k){ k.letterSpacing = f(ls) + "px"; return true; } return false; }
  function scrivi(k, t, x, y, ls, modo){
    if(!ls || conSpazi(k, ls)){ if(ls && "letterSpacing" in k) x += ls / 2; modo === "s" ? k.strokeText(t, x, y) : k.fillText(t, x, y); if(ls) k.letterSpacing = "0px"; return; }
    const ch = [...t], w = ch.reduce((a, q) => a + k.measureText(q).width, 0) + ls * (ch.length - 1), al = k.textAlign;
    let cx = al === "center" ? x - w / 2 : al === "right" ? x - w : x;
    k.textAlign = "left";
    ch.forEach(q => { modo === "s" ? k.strokeText(q, cx, y) : k.fillText(q, cx, y); cx += k.measureText(q).width + ls; });
    k.textAlign = al;
  }
  function largo(k, t, ls){ const usa = ls && conSpazi(k, ls); const w = k.measureText(t).width + (ls && !usa ? ls * (t.length - 1) : 0); if(usa) k.letterSpacing = "0px"; return w; }
  function righe(k, t, maxW){
    const w = t.split(/\s+/).filter(Boolean), out = [];
    let line = "";
    w.forEach(p => { const prova = (line + " " + p).trim(); if(line && k.measureText(prova).width > maxW){ out.push(line); line = p; } else line = prova; });
    if(line) out.push(line);
    return out;
  }
  function righeEquilibrate(k, t, maxW, maxN){
    for(let n = 1; n <= maxN; n++){
      const w = t.split(/\s+/).filter(Boolean);
      let best = null;
      const rec = (da, resta, acc) => {
        if(resta === 1){ const tutte = acc.concat([w.slice(da).join(" ")]), larg = tutte.map(r => k.measureText(r).width), mx = Math.max(...larg); if(mx > maxW) return; let sc = mx; tutte.slice(0, -1).forEach(r => { if(!/[.,:;!?]$/.test(r)) sc += 18; }); if(!best || sc < best.sc) best = { r:tutte, sc }; return; }
        for(let q = da + 1; q <= w.length - resta + 1; q++) rec(q, resta - 1, acc.concat([w.slice(da, q).join(" ")]));
      };
      if(w.length >= n) rec(0, n, []);
      if(best) return best.r;
    }
    return righe(k, t, maxW).slice(0, maxN);
  }

  function titolo(k, s, sp, u, Wpx){
    const st = Object.assign({}, STILI[s.g] || STILI.drama, sp.tit || {});
    const T = piano(st.up ? maiuscolo(s.t) : s.t);
    const fontA = size => `${st.it ? "italic " : ""}${st.w || 400} ${f(size)}px ${st.font}`;
    // impaginazione: provo 1, 2 o 3 righe e tengo quella col corpo più grande
    k.font = fontA(100 * u);
    const parole = T.split(/\s+/).filter(Boolean), n = parole.length, MAXW = 540 * u;
    const cand = [[T]];
    for(let i = 1; i < n; i++) cand.push([parole.slice(0, i).join(" "), parole.slice(i).join(" ")]);
    for(let i = 1; i < n - 1; i++) for(let j = i + 1; j < n; j++) cand.push([parole.slice(0, i).join(" "), parole.slice(i, j).join(" "), parole.slice(j).join(" ")]);
    let best = null;
    cand.forEach(L => {
      let size = st.size * u * (L.length === 1 ? 1 : L.length === 2 ? .92 : .8);
      L.forEach(l => size = Math.min(size, MAXW / (largo(k, l, st.ls * 100 * u) / (100 * u))));
      let sc = size * (L.length === 1 ? 1.12 : L.length === 2 ? 1 : .8);
      L.slice(0, -1).forEach(l => { if(PICCOLE.test(l.split(" ").pop())) sc *= .9; });
      L.forEach(l => { if(l.length <= 2) sc *= .6; });
      if(!best || sc > best.sc) best = { L, size, sc };
    });
    const size = Math.max(best.size, 34 * u), lh = size * (st.up ? .98 : 1.02), yFine = (st.yFine || 758) * u, y0 = yFine - (best.L.length - 1) * lh;
    // il titolo si disegna a parte, così posso dargli luce, usura e ombra
    const pad = 60 * u, tw = Wpx, th = Math.ceil(best.L.length * lh + size * .5 + pad * 2), tc = document.createElement("canvas");
    tc.width = tw; tc.height = th;
    const t = tc.getContext("2d"), top = y0 - size * .86 - pad;
    t.textAlign = "center"; t.textBaseline = "alphabetic"; t.font = fontA(size);
    best.L.forEach((l, i) => {
      const y = y0 + i * lh - top, g = t.createLinearGradient(0, y - size * .82, 0, y + size * .08);
      st.fill.forEach((c2, j) => g.addColorStop(j / (st.fill.length - 1), c2));
      if(st.stroke){ t.lineJoin = "round"; t.lineWidth = st.stroke.w * u; t.strokeStyle = st.stroke.col; scrivi(t, l, tw / 2, y, st.ls * size, "s"); }
      t.fillStyle = g; scrivi(t, l, tw / 2, y, st.ls * size);
    });
    if(st.luce){ t.globalCompositeOperation = "source-atop"; best.L.forEach((l, i) => { const y = y0 + i * lh - top, g = t.createLinearGradient(0, y - size * .85, 0, y - size * .35); g.addColorStop(0, `rgba(255,255,255,${st.luce})`); g.addColorStop(1, "rgba(255,255,255,0)"); t.fillStyle = g; t.fillRect(0, y - size * .9, tw, size * .6); }); t.globalCompositeOperation = "source-over"; }
    if(st.consumato){ const R2 = rng(hash(s.id + "usura")); t.globalCompositeOperation = "destination-out"; for(let q = 0; q < 260 * st.consumato; q++){ t.globalAlpha = .25 + R2() * .7; t.beginPath(); t.arc(R2() * tw, R2() * th, (R2() * R2() * 5 + .6) * u, 0, 6.3); t.fill(); } t.globalAlpha = 1; t.globalCompositeOperation = "source-over"; }
    // ombra, alone e neon
    k.save();
    if(st.glow){ k.shadowColor = st.glow.col; k.shadowBlur = st.glow.blur * u; k.globalAlpha = st.glow.a; k.drawImage(tc, 0, top); if(st.neon){ k.shadowBlur = st.glow.blur * u * .4; k.drawImage(tc, 0, top); } k.globalAlpha = 1; }
    k.shadowColor = "rgba(0,0,0,.78)"; k.shadowBlur = 22 * u; k.shadowOffsetY = 7 * u;
    k.drawImage(tc, 0, top);
    k.restore();
    if(st.riga){ k.fillStyle = st.riga; k.fillRect(Wpx / 2 - 70 * u, yFine + 18 * u, 140 * u, 4 * u); }
    if(st.ornamenti){ k.strokeStyle = "rgba(232,192,104,.7)"; k.lineWidth = 1.6 * u; [-1, 1].forEach(d => { k.beginPath(); k.moveTo(Wpx / 2 + d * 60 * u, yFine + 22 * u); k.lineTo(Wpx / 2 + d * 200 * u, yFine + 22 * u); k.stroke(); }); k.fillStyle = "rgba(232,192,104,.85)"; k.beginPath(); k.moveTo(Wpx / 2, yFine + 14 * u); k.lineTo(Wpx / 2 + 8 * u, yFine + 22 * u); k.lineTo(Wpx / 2, yFine + 30 * u); k.lineTo(Wpx / 2 - 8 * u, yFine + 22 * u); k.fill(); }
    return { y0, top:y0 - size * .82, size, st };
  }

  function scritteCanvas(k, s, sp, Wpx){
    const u = Wpx / 600, X = Wpx / 2, crema = "#f3ead8";
    k.textAlign = "center"; k.textBaseline = "alphabetic";
    // in alto: i nomi del cast
    const cast = (s.chars || []).slice(0, 3).map(ch => maiuscolo(piano(ch.full || ch.n)));
    if(cast.length){
      let fs = 13.5 * u; k.font = `700 ${f(fs)}px ${FF.work}`;
      const riga = cast.join("     ");
      const w = largo(k, riga, 3.2 * u); if(w > 540 * u){ fs *= 540 * u / w; k.font = `700 ${f(fs)}px ${FF.work}`; }
      k.fillStyle = "rgba(243,234,216,.88)"; scrivi(k, riga, X, 44 * u, 3.2 * u * fs / (13.5 * u));
    }
    // la frase di lancio
    const tag = piano(sp.tag || String(s.hook || "").split(/(?<=[.!?])\s/)[0]);
    const mano = sp.mano;
    k.font = mano ? `400 ${f(25 * u)}px ${FF.mano}` : `italic 400 ${f(27 * u)}px ${FF.instr}`;
    const rt = righeEquilibrate(k, tag, 470 * u, 3);
    k.save(); k.shadowColor = "rgba(0,0,0,.8)"; k.shadowBlur = 10 * u; k.fillStyle = crema;
    rt.forEach((l, i) => k.fillText(l, X, (86 + i * 30) * u));
    k.restore();
    // titolo
    const T = titolo(k, s, sp, u, Wpx);
    // «presenta» sopra il titolo
    k.font = `700 ${f(12 * u)}px ${FF.work}`;
    const py = T.top - 20 * u, pw = largo(k, "STORIE D'ITALIA PRESENTA", 5.5 * u);
    k.fillStyle = "rgba(243,234,216,.82)"; scrivi(k, "STORIE D'ITALIA PRESENTA", X, py, 5.5 * u);
    k.fillRect(X - pw / 2 - 52 * u, py - 4.5 * u, 38 * u, 1 * u); k.fillRect(X + pw / 2 + 14 * u, py - 4.5 * u, 38 * u, 1 * u);
    // luogo ed epoca
    const acc = (T.st.acc || T.st.fill[Math.min(1, T.st.fill.length - 1)]);
    k.font = `700 ${f(14 * u)}px ${FF.work}`;
    let luogo = maiuscolo(piano(s.city + "  ·  " + (s.era || "Oggi")));
    k.fillStyle = acc; k.save(); k.shadowColor = "rgba(0,0,0,.8)"; k.shadowBlur = 8 * u;
    const lw = largo(k, luogo, 4.5 * u); if(lw > 540 * u){ k.font = `700 ${f(14 * u * 540 * u / lw)}px ${FF.work}`; }
    scrivi(k, luogo, X, ((T.st.yFine || 760) + 34) * u, 4.5 * u); k.restore();
    // titoli di coda, stretti e alti come sui manifesti veri
    const tutti = (s.chars || []).slice(0, 6).map(ch => maiuscolo(piano(ch.full || ch.n))).join("  ");
    const coda = [`STORIE D'ITALIA presenta UNA STORIA INTERATTIVA con ${tutti}`, `dialoghi e personaggi INTELLIGENZA ARTIFICIALE · scenografia ${maiuscolo(piano(s.place || s.city))}${s.tema ? " · musica SIGLA ORIGINALE" : ""} · scelte, memoria e finali DI CHI GIOCA · regia TU`];
    k.fillStyle = "rgba(226,220,206,.62)";
    coda.forEach((riga, i) => {
      const fs = 17 * u; k.font = `400 ${f(fs)}px ${FF.spalle}`;
      const w = k.measureText(riga).width, sx = Math.min(1, 520 * u / w);
      k.save(); k.translate(X, (822 + i * 17) * u); k.scale(sx, 1); k.fillText(riga, 0, 0); k.restore();
    });
    // in fondo: l'esclusiva e i marchi
    k.font = `700 ${f(10.5 * u)}px ${FF.work}`; k.fillStyle = acc;
    scrivi(k, "IN ESCLUSIVA SU STORIE D'ITALIA", X, 866 * u, 4 * u);
    const by = 878 * u;
    [["#2f9e5b", 0], ["#f2f2f2", 1], ["#c8423b", 2]].forEach(([c2, i]) => { k.fillStyle = c2; k.fillRect(X - 150 * u + i * 7 * u, by, 7 * u, 10 * u); });
    k.fillStyle = "rgba(243,234,216,.75)"; k.textAlign = "left"; k.font = `700 ${f(9.5 * u)}px ${FF.work}`; scrivi(k, "STORIE D'ITALIA", X - 124 * u, by + 9 * u, 2 * u);
    k.textAlign = "right"; k.strokeStyle = "rgba(243,234,216,.6)"; k.lineWidth = 1 * u; k.strokeRect(X + 100 * u, by - 1 * u, 50 * u, 12 * u); k.font = `700 ${f(8.5 * u)}px ${FF.work}`; scrivi(k, "AI · OFFLINE", X + 147 * u, by + 8.5 * u, 1 * u);
    k.textAlign = "center";
  }

  /* pellicola: bagliore delle luci, viraggio, vignetta, grana */
  let granaTile = null;
  function grana(){
    if(granaTile) return granaTile;
    const g = document.createElement("canvas"); g.width = g.height = 192;
    const k = g.getContext("2d"), im = k.createImageData(192, 192);
    for(let i = 0; i < im.data.length; i += 4){ const v = 128 + (Math.random() - .5) * 200; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
    k.putImageData(im, 0, 0);
    return granaTile = g;
  }
  function pellicola(k, Wpx, Hpx, p, testo){
    // bagliore: le zone chiare si espandono come su una pellicola vera
    try{
      const t = document.createElement("canvas"); t.width = Math.round(Wpx / 3); t.height = Math.round(Hpx / 3);
      const q = t.getContext("2d");
      q.filter = `brightness(.9) contrast(3.4) saturate(1.25) blur(${f(Wpx / 140)}px)`;
      q.drawImage(k.canvas, 0, 0, t.width, t.height);
      k.save(); k.globalCompositeOperation = "screen"; k.globalAlpha = .42; k.drawImage(t, 0, 0, Wpx, Hpx); k.restore();
    }catch(e){}
    // viraggio: ombre fredde, luci calde
    k.save(); k.globalCompositeOperation = "soft-light";
    let g = k.createLinearGradient(0, 0, 0, Hpx); g.addColorStop(0, p.ombra || "rgba(20,40,70,.55)"); g.addColorStop(.55, "rgba(128,128,128,0)"); g.addColorStop(1, p.calda || "rgba(255,150,60,.35)");
    k.fillStyle = g; k.fillRect(0, 0, Wpx, Hpx); k.restore();
    // vignetta
    k.save(); g = k.createRadialGradient(Wpx / 2, Hpx * .45, Wpx * .32, Wpx / 2, Hpx * .48, Wpx * .95);
    g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,.62)"); k.fillStyle = g; k.fillRect(0, 0, Wpx, Hpx); k.restore();
    // scuro in alto e in basso per le scritte
    if(testo){
      k.save(); g = k.createLinearGradient(0, 0, 0, Hpx * .26); g.addColorStop(0, "rgba(0,0,0,.72)"); g.addColorStop(1, "rgba(0,0,0,0)"); k.fillStyle = g; k.fillRect(0, 0, Wpx, Hpx * .26);
      g = k.createLinearGradient(0, Hpx * .56, 0, Hpx); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(.45, "rgba(0,0,0,.66)"); g.addColorStop(1, "rgba(0,0,0,.96)"); k.fillStyle = g; k.fillRect(0, Hpx * .56, Wpx, Hpx * .44); k.restore();
    }
  }
  function granaSopra(k, Wpx, Hpx, a){
    k.save(); k.globalCompositeOperation = "overlay"; k.globalAlpha = a; k.fillStyle = k.createPattern(grana(), "repeat");
    k.translate(Math.random() * 192, Math.random() * 192); k.fillRect(-192, -192, Wpx + 384, Hpx + 384); k.restore();
  }

  const VERSIONE_ARTE = "2.8.1";
  let dbP = null;
  function archivio(){
    if(dbP) return dbP;
    dbP = new Promise(res => { try{ const r = indexedDB.open("locandine", 1); r.onupgradeneeded = () => r.result.createObjectStore("img"); r.onsuccess = () => res(r.result); r.onerror = () => res(null); r.onblocked = () => res(null); setTimeout(() => res(null), 2500); }catch(e){ res(null); } });
    return dbP;
  }
  async function leggi(key){ const d = await archivio(); if(!d) return null; return new Promise(res => { try{ const q = d.transaction("img").objectStore("img").get(key); q.onsuccess = () => res(q.result || null); q.onerror = () => res(null); }catch(e){ res(null); } }); }
  async function salva(key, blob){ const d = await archivio(); if(!d || !blob) return; try{ d.transaction("img", "readwrite").objectStore("img").put(blob, key); }catch(e){} }
  const pronte = new Map(), attese = new Map();
  let coda = Promise.resolve();
  function chiave(s, modo, Wpx){ return [VERSIONE_ARTE, s.id, s.t, s.g, s.hook, s.city, s.era, (s.chars || []).map(ch => ch.n).join(","), modo, Wpx].join("|"); }
  async function dipingi(s, modo, Wpx){
    await caratteri();
    const Hpx = Math.round(Wpx * 1.5), c = Ctx(s, 600, 900);
    const svgTxt = svg(s, Wpx, Hpx, { testo:false, hd:true, px:true });
    const img = new Image();
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgTxt);
    await (img.decode ? img.decode() : new Promise((ok, ko) => { img.onload = ok; img.onerror = ko; }));
    const cv = document.createElement("canvas"); cv.width = Wpx; cv.height = Hpx;
    const k = cv.getContext("2d");
    k.drawImage(img, 0, 0, Wpx, Hpx);
    let sp = STORIE[s.id] || (W.LOCANDINE_STORIE || {})[s.id];
    if(!sp){ const gen = GENERE[s.g] || GENERE.drama; sp = gen(c); }
    if(typeof sp === "function") sp = sp(c);
    const p = Object.assign({}, PAL[sp.pal] || PAL.notte, sp.tinta || {});
    pellicola(k, Wpx, Hpx, sp.grade || {}, modo === "poster");
    if(modo === "poster") scritteCanvas(k, s, sp, Wpx);
    granaSopra(k, Wpx, Hpx, modo === "poster" ? .16 : .13);
    return await new Promise(r => cv.toBlob(b => r(b || cv.toDataURL("image/jpeg", .9)), "image/jpeg", .9));
  }
  function img(s, modo, Wpx){
    const key = chiave(s, modo, Wpx);
    if(pronte.has(key)) return Promise.resolve(pronte.get(key));
    if(attese.has(key)) return attese.get(key);
    const indirizzo = b => W.LOCANDINE_DATAURL ? new Promise((ok, ko) => { const fr = new FileReader(); fr.onload = () => ok(fr.result); fr.onerror = ko; fr.readAsDataURL(b); }) : URL.createObjectURL(b);
    const pr = (async () => {
      const salvata = await leggi(key);
      if(salvata) return indirizzo(salvata);
      const fatta = coda = coda.catch(() => {}).then(() => new Promise(r => setTimeout(r, 0))).then(() => dipingi(s, modo, Wpx));
      const b = await fatta;
      if(typeof b === "string") return b;
      salva(key, b);
      return indirizzo(b);
    })().then(url => { pronte.set(key, url); attese.delete(key); return url; }, err => { attese.delete(key); throw err; });
    attese.set(key, pr);
    return pr;
  }
  function pronta(s, modo, Wpx){ return pronte.get(chiave(s, modo, Wpx)) || null; }

  function sfondo(s){
    try{
      const c = Ctx(s, 600, 900);
      let sp = STORIE[s.id] || (W.LOCANDINE_STORIE || {})[s.id];
      if(!sp) sp = (GENERE[s.g] || GENERE.drama)(c);
      if(typeof sp === "function") sp = sp(c);
      const p = Object.assign({}, PAL[sp.pal] || PAL.notte, sp.tinta || {});
      return `linear-gradient(180deg, ${p.sky.join(", ")} 68%, ${p.mid} 72%, ${p.ink})`;
    }catch(e){ return "#111"; }
  }
  W.LOCANDINA = { svg, img, pronta, caratteri, sfondo, PAL, EL, FX, GENERE, STORIE, STILI };
})(window);
