/* Storie d'Italia – locandine vive.
   Anima le locandine disegnate da locandine.js. Ogni strato si muove con la sua profondità
   (il cielo quasi fermo, il paesaggio piano, i personaggi davanti), i personaggi respirano,
   gli oggetti ondeggiano o galleggiano, e sopra la scena girano effetti dal vivo: pioggia,
   neve, nebbia che scorre, braci, lucciole, finestre che si accendono, fiamme, fari che
   girano, fulmini, riflessi sull'acqua, titoli che brillano. La regia di ogni storia è in
   locandine_regia.js. Un solo ciclo per tutte le locandine visibili; quelle fuori schermo
   si fermano e liberano la memoria. */
(function(W){
  "use strict";
  const LC = W.LOCANDINA;
  if(!LC) return;
  const D = document, TAU = Math.PI * 2;
  const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
  const lerp = (a, b, t) => a + (b - a) * t;
  const liscio = t => t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
  const fr = x => x - Math.floor(x);
  const sbaglio = e => { if(W.__LCV_ERR) W.__LCV_ERR.push(String(e && (e.stack || e.message) || e).slice(0, 300)); };
  const rng = seed => { let x = (seed >>> 0) || 1; return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return ((x >>> 0) % 1000003) / 1000003; }; };
  const hash = s => { let h = 2166136261; for(const ch of String(s)){ h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const hexRgb = h => { h = String(h || "#ffffff").trim(); if(h[0] !== "#") return [255, 255, 255]; h = h.slice(1); if(h.length === 3) h = h.split("").map(c => c + c).join(""); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16) || 0); };
  const rgba = (h, a) => { const [r, g, b] = hexRgb(h); return `rgba(${r},${g},${b},${a})`; };
  const mescola = (a, b, t) => { const A = hexRgb(a), B = hexRgb(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join(""); };
  // rumore liscio a una dimensione (per tremolii naturali)
  const rumore = seed => { const R = rng(seed), v = Array.from({ length:64 }, R); return t => { const i = Math.floor(t), a = v[i & 63], b = v[(i + 1) & 63], q = t - i; return a + (b - a) * q * q * (3 - 2 * q); }; };

  /* ---------- sprite: piccole immagini pronte, disegnate una volta ---------- */
  const SPR = new Map();
  function tela(w, h){ const c = D.createElement("canvas"); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; }
  function sprite(tipo, col, x){
    const key = tipo + "|" + col + "|" + (x || "");
    let cv = SPR.get(key);
    if(cv) return cv;
    const [r, g, b] = hexRgb(col);
    const C = a => `rgba(${r},${g},${b},${a})`;
    if(tipo === "alone"){ cv = tela(64, 64); const k = cv.getContext("2d"), gr = k.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, C(1)); gr.addColorStop(.22, C(.42)); gr.addColorStop(.55, C(.12)); gr.addColorStop(1, C(0)); k.fillStyle = gr; k.fillRect(0, 0, 64, 64); }
    else if(tipo === "punto"){ cv = tela(32, 32); const k = cv.getContext("2d"), gr = k.createRadialGradient(16, 16, 0, 16, 16, 16); gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(.18, C(.95)); gr.addColorStop(.42, C(.35)); gr.addColorStop(1, C(0)); k.fillStyle = gr; k.fillRect(0, 0, 32, 32); }
    else if(tipo === "morbido"){ cv = tela(32, 32); const k = cv.getContext("2d"), gr = k.createRadialGradient(16, 16, 0, 16, 16, 16); gr.addColorStop(0, C(1)); gr.addColorStop(.5, C(.55)); gr.addColorStop(1, C(0)); k.fillStyle = gr; k.fillRect(0, 0, 32, 32); }
    else if(tipo === "bokeh"){ cv = tela(64, 64); const k = cv.getContext("2d"), gr = k.createRadialGradient(32, 32, 0, 32, 32, 31); gr.addColorStop(0, C(.28)); gr.addColorStop(.72, C(.36)); gr.addColorStop(.88, C(.75)); gr.addColorStop(.96, C(.3)); gr.addColorStop(1, C(0)); k.fillStyle = gr; k.fillRect(0, 0, 64, 64); }
    else if(tipo === "sbuffo"){
      cv = tela(96, 96); const k = cv.getContext("2d"), R = rng(hash(key));
      try{ k.filter = "blur(5px)"; }catch(e){ sbaglio(e); }
      for(let i = 0; i < 9; i++){ const x2 = 48 + (R() - .5) * 34, y2 = 48 + (R() - .5) * 30, rr = 14 + R() * 16, gr = k.createRadialGradient(x2, y2, 0, x2, y2, rr); gr.addColorStop(0, C(.5)); gr.addColorStop(1, C(0)); k.fillStyle = gr; k.beginPath(); k.arc(x2, y2, rr, 0, TAU); k.fill(); }
    }
    else if(tipo === "stella"){ cv = tela(48, 48); const k = cv.getContext("2d"); k.translate(24, 24); [0, Math.PI / 2].forEach(a => { k.save(); k.rotate(a); const gr = k.createLinearGradient(-24, 0, 24, 0); gr.addColorStop(0, C(0)); gr.addColorStop(.5, C(1)); gr.addColorStop(1, C(0)); k.fillStyle = gr; k.beginPath(); k.ellipse(0, 0, 24, 1.6, 0, 0, TAU); k.fill(); k.restore(); }); const gr = k.createRadialGradient(0, 0, 0, 0, 0, 8); gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(1, C(0)); k.fillStyle = gr; k.fillRect(-8, -8, 16, 16); }
    else if(tipo === "fiamma"){ cv = tela(32, 64); const k = cv.getContext("2d"); const gr = k.createRadialGradient(16, 46, 0, 16, 40, 30); gr.addColorStop(0, "rgba(255,255,240,1)"); gr.addColorStop(.25, "rgba(255,226,140,.95)"); gr.addColorStop(.55, C(.75)); gr.addColorStop(1, C(0)); k.fillStyle = gr; k.beginPath(); k.moveTo(16, 2); k.bezierCurveTo(24, 22, 30, 36, 28, 48); k.bezierCurveTo(26, 60, 6, 60, 4, 48); k.bezierCurveTo(2, 36, 8, 22, 16, 2); k.fill(); }
    else if(tipo === "goccia"){ cv = tela(40, 48); const k = cv.getContext("2d"); let gr = k.createRadialGradient(18, 26, 2, 20, 26, 18); gr.addColorStop(0, "rgba(255,255,255,.05)"); gr.addColorStop(.75, "rgba(255,255,255,.12)"); gr.addColorStop(.92, "rgba(255,255,255,.55)"); gr.addColorStop(1, "rgba(255,255,255,0)"); k.fillStyle = gr; k.beginPath(); k.ellipse(20, 26, 17, 20, 0, 0, TAU); k.fill(); k.fillStyle = "rgba(255,255,255,.8)"; k.beginPath(); k.ellipse(14, 17, 3, 5, -.5, 0, TAU); k.fill(); }
    SPR.set(key, cv);
    return cv;
  }
  const spr = (k, im, x, y, r, a) => { if(a <= .003 || r <= .05) return; k.globalAlpha = a > 1 ? 1 : a; k.drawImage(im, x - r, y - r, r * 2, r * 2); };

  /* ---------- la regia: quella della storia, poi quella del genere ---------- */
  function regiaDi(s, meta){
    const RG = W.LOCANDINE_REGIA_GENERE || {}, R2 = W.LOCANDINE_REGIA || {};
    const g = RG[s.g] || RG.drama || {}, r = R2[s.id] || {};
    const out = Object.assign({}, g, r);
    out.vive = (r.vive || []).concat(r.soloSue ? [] : (g.vive || []).filter(([n]) => !(r.vive || []).some(([m]) => m === n) && !(r.senza || []).includes(n)));
    out.senza = new Set(r.senza || []);
    out.titolo = r.titolo || g.titolo || ["lucido"];
    out.film = r.film || g.film || [];
    return out;
  }

  /* ---------- matrici affini [a, b, c, d, e, f] ---------- */
  const IDENT = [1, 0, 0, 1, 0, 0];
  const mul = (A, B) => [A[0] * B[0] + A[2] * B[1], A[1] * B[0] + A[3] * B[1], A[0] * B[2] + A[2] * B[3], A[1] * B[2] + A[3] * B[3], A[0] * B[4] + A[2] * B[5] + A[4], A[1] * B[4] + A[3] * B[5] + A[5]];
  const setT = (k, base, m) => k.setTransform(base.s * m[0], base.s * m[1], base.s * m[2], base.s * m[3], base.s * m[4] + base.x, base.s * m[5] + base.y);
  function matMoto(mo, P){
    if(!mo) return IDENT;
    const sx = mo.sx || 1, sy = mo.sy || 1, a = mo.rot || 0, co = Math.cos(a), si = Math.sin(a);
    const A = sx * co, B = sx * si, C = -sy * si, Dd = sy * co;
    return [A, B, C, Dd, P[0] + (mo.tx || 0) - (A * P[0] + C * P[1]), P[1] + (mo.ty || 0) - (B * P[0] + Dd * P[1])];
  }
  const matCam = (cam, pz) => { const z = 1 + (cam.z - 1) * pz; return [z, 0, 0, z, 300 * (1 - z) + cam.ox * pz, 450 * (1 - z) + cam.oy * pz]; };

  /* ---------- movimenti degli strati ---------- */
  const MOTI = {
    fermo:() => null,
    respiro:(t, lv) => { const w = TAU / (lv.per || 4.8), a = lv.amp || 1, b = Math.sin(w * t + lv.fase); return { sx:1 + .004 * a * b, sy:1 + .0095 * a * b, rot:.004 * a * Math.sin(w * .43 * t + lv.fase * 1.7) }; },
    ondeggia:(t, lv) => { const a = lv.amp || 1; return { rot:a * (.03 * Math.sin(TAU * t / (lv.per || 5.6) + lv.fase) + .011 * Math.sin(TAU * t / 1.7 + lv.fase * 2)) }; },
    galleggia:(t, lv) => { const a = lv.amp || 1, p = lv.per || 4.4; return { ty:a * 7 * Math.sin(TAU * t / p + lv.fase), tx:a * 2.5 * Math.sin(TAU * t / (p * 1.9) + lv.fase), rot:a * .035 * Math.sin(TAU * t / (p * 1.31) + lv.fase + 1) }; },
    dondola:(t, lv) => { const a = lv.amp || 1, p = lv.per || 4.6; return { rot:a * .028 * Math.sin(TAU * t / p + lv.fase), ty:a * 3.5 * Math.sin(TAU * t / (p * .5) + lv.fase + .6) }; },
    galoppo:(t, lv) => { const ph = TAU * t / (lv.per || .56) + lv.fase, a = lv.amp || 1; return { ty:a * (5 - 11 * Math.abs(Math.sin(ph / 2))), rot:a * .04 * Math.sin(ph + .7), tx:a * 2.5 * Math.sin(ph) }; },
    motore:(t, lv) => { const a = lv.amp || 1; return { ty:a * (1.1 * Math.sin(TAU * t * 11.3) + .7 * Math.sin(TAU * t * 17.9)), tx:a * 2 * Math.sin(TAU * t / 3.4 + lv.fase), rot:a * .004 * Math.sin(TAU * t * 1.3) }; },
    planata:(t, lv) => { const a = lv.amp || 1, p = lv.per || 1.25; return { ty:a * (6 * Math.sin(TAU * t / p + lv.fase) + 1.2 * Math.sin(TAU * t * 7)), rot:a * .034 * Math.sin(TAU * t / p + lv.fase + 1.3) }; },
    sospeso:(t, lv) => { const a = lv.amp || 1, p = lv.per || 3.6; return { ty:a * 8 * Math.sin(TAU * t / p + lv.fase), tx:a * 6 * Math.sin(TAU * t / (p * 2.1) + lv.fase), rot:a * .022 * Math.sin(TAU * t / (p * .9) + lv.fase) }; },
    marcia:(t, lv) => { const ph = TAU * t / (lv.per || 1.15) + lv.fase, a = lv.amp || 1; return { ty:-a * 3.2 * Math.abs(Math.sin(ph)), rot:a * .007 * Math.sin(ph), sy:1 + .004 * a * Math.sin(ph * 2) }; },
    salta:(t, lv) => { const ph = TAU * t / (lv.per || .48) + lv.fase, a = lv.amp || 1, b = Math.max(0, Math.sin(ph)); return { ty:-a * 9 * b * b, sy:1 + a * .012 * Math.sin(ph), sx:1 - a * .006 * Math.sin(ph) }; },
    gira:(t, lv) => ({ rot:(lv.vel || .25) * t + lv.fase, ty:(lv.amp || 1) * 5 * Math.sin(TAU * t / 3.1 + lv.fase) }),
    batte:(t, lv) => { const ph = fr(t / (lv.per || 1.6) + lv.fase / TAU), b = ph < .12 ? Math.sin(ph / .12 * Math.PI) : ph > .2 && ph < .32 ? .6 * Math.sin((ph - .2) / .12 * Math.PI) : 0, a = lv.amp || 1; return { sx:1 + .03 * a * b, sy:1 + .03 * a * b, ty:(lv.amp || 1) * 4 * Math.sin(TAU * t / 3.7) }; }
  };

  /* ---------- la scena viva ---------- */
  function creaScena(meta, imgs, s, opz){
    opz = opz || {};
    const seed = hash(s.id + "|" + (s.t || "")), R = rng(seed);
    const reg = regiaDi(s, meta);
    const sc = { meta, imgs, s, reg, p:meta.p, hor:meta.hor || 655, R, seed, q:opz.q || 1, qv:opz.q || 1, grande:!!opz.grande, statico:!!opz.statico, livelli:[], fine:[], dopo:[], post:[], titoloFx:[], t0:4, ctxCache:new WeakMap() };
    meta.strati.forEach((st, i) => {
      const lv = { st, img:imgs.strati[i], fx:[], fase:R() * TAU, per:st.per, amp:st.amp, moto:st.moto, pivot:st.pivot };
      if(st.tipo === "vivo"){
        const m = st.moto || "respiro", piedi = st.ax != null && st.ay != null && st.ax > st.x - 40 && st.ax < st.x + st.w + 40;
        lv.pivot = st.pivot || (m === "ondeggia" ? [st.x + st.w * (st.px != null ? st.px : .5), st.y + st.h * (st.py != null ? st.py : .05)] : m === "galleggia" || m === "sospeso" || m === "gira" || m === "batte" ? [st.x + st.w / 2, st.y + st.h / 2] : piedi ? [st.ax, Math.min(st.ay, st.y + st.h)] : [st.x + st.w / 2, st.y + st.h]);
      }
      sc.livelli.push(lv);
    });
    const chiavi = new Map(sc.livelli.map(lv => [lv.st.k, lv]));
    const primoVivo = sc.livelli.findIndex(lv => lv.st.tipo === "vivo");
    const dietro = sc.livelli[primoVivo > 0 ? primoVivo - 1 : sc.livelli.length - 1];
    const cieloLv = sc.livelli.filter(lv => lv.st.k === "cielo" || lv.st.k === "nubi").pop() || sc.livelli[0];
    sc.dietroKey = dietro ? dietro.st.k : "fine";
    // dove va un effetto: dopo uno strato preciso, dietro i personaggi, sopra il cielo o in cima
    const metti = (ef, z) => {
      if(!ef) return;
      if(Array.isArray(ef)){ ef.forEach(e => metti(e, z)); return; }
      const dove = z && (!ef.z || ef.z === "fine") ? z : (ef.z || z || "fine");
      if(dove === "post"){ sc.post.push(ef); return; }
      if(dove === "titolo"){ sc.titoloFx.push(ef); return; }
      let lv = dove === "dietro" ? dietro : dove === "cielo" ? cieloLv : chiavi.get(dove);
      if(!lv && dove !== "fine"){ const i = meta.strati.findIndex(st => st.k === dove); if(i < 0) lv = dietro; }
      if(lv && dove !== "fine") lv.fx.push(ef); else sc.fine.push(ef);
    };
    sc.metti = metti;
    const R2 = n => rng(seed ^ hash(n));
    const no = n => sc.reg.senza.has(n);
    // effetti dai punti registrati durante il disegno
    const perTipo = {};
    (meta.anim || []).forEach(a => { (perTipo[a.tipo] = perTipo[a.tipo] || []).push(a); });
    const regA = sc.reg.punti || {};
    Object.keys(perTipo).forEach(tipo => {
      if(tipo === "fx" || no(tipo)) return;
      const f = EF[tipo];
      if(!f) return;
      if(f.insieme){
        const gruppi = {};
        perTipo[tipo].forEach(a => (gruppi[a.strato] = gruppi[a.strato] || []).push(a));
        Object.keys(gruppi).forEach(k => { try{ metti(f(sc, gruppi[k], R2(tipo + k), regA[tipo] || {}), k); }catch(e){ sbaglio(e); } });
      } else perTipo[tipo].forEach((a, i) => { try{ metti(f(sc, Object.assign({}, a, regA[tipo] || {}), R2(tipo + i)), a.strato); }catch(e){ sbaglio(e); } });
    });
    // effetti della scena (pioggia, neve, braci… quelli che il disegno ha lasciato dal vivo)
    (perTipo.fx || []).forEach(a => {
      if(no(a.nome)) return;
      const f = EF[a.nome];
      const o = Object.assign({}, a.o, (sc.reg.fx || {})[a.nome] || {});
      const zfx = /^[cf]/.test(a.id) ? null : a.strato;
      if(f) try{ metti(f(sc, o, R2("fx" + a.id), a), o.z || zfx); }catch(e){ sbaglio(e); }
    });
    // effetti della regia
    (sc.reg.vive || []).forEach(([n, o], i) => {
      const f = EF[n]; if(!f || no(n)) return;
      o = Object.assign({}, o || {});
      if(o.su){ const st = meta.strati.find(q => q.k === o.su) || meta.strati.find(q => q.n === o.su); if(!st) return; if(o.x == null) o.x = st.x + st.w * (o.ax != null ? o.ax : .5); if(o.y == null) o.y = st.y + st.h * (o.ay != null ? o.ay : .5); if(o.z == null && !o.davanti) o.z = st.k; }
      try{ metti(f(sc, o, R2("rg" + n + i)), o.z); }catch(e){ sbaglio(e); }
    });
    // titolo e pellicola
    if(meta.titolo && imgs.titolo) (sc.reg.titolo || []).forEach((n, i) => { const f = TF[n]; if(f) try{ sc.titoloFx.push(f(sc, R2("tit" + n + i))); }catch(e){ sbaglio(e); } });
    const anno = (() => { const e = String(s.era || meta.era || ""); if(/a\.C\./.test(e)) return -200; const m2 = e.match(/\d{3,4}/); return m2 && !/^Oggi/.test(e) ? +m2[0] : 9999; })();
    if(!no("epoca") && !(sc.reg.film || []).some(n => (Array.isArray(n) ? n[0] : n) === "epoca") && (meta.pal === "seppia" || anno <= 1965)) metti(EF.epoca(sc, { forza:meta.pal === "seppia" || anno <= 1945 ? 1 : .6 }, R2("epoca")), "post");
    (sc.reg.film || []).forEach((n, i) => { const nome = Array.isArray(n) ? n[0] : n, o = Array.isArray(n) ? n[1] : {}; const f = EF[nome]; if(f) try{ metti(f(sc, o || {}, R2("film" + nome + i)), "post"); }catch(e){ sbaglio(e); } });
    // si scaldano gli effetti: la scena parte già viva (e il fotogramma fermo è uguale al primo vivo)
    const tutti = [];
    sc.livelli.forEach(lv => lv.fx.forEach(e => tutti.push(e)));
    sc.fine.forEach(e => tutti.push(e)); sc.post.forEach(e => tutti.push(e)); sc.titoloFx.forEach(e => tutti.push(e));
    sc.tutti = tutti;
    let t = 0;
    const dt = 1 / 30;
    for(let i = 0; i < sc.t0 * 30; i++){ t += dt; tutti.forEach(e => { if(e.passo) try{ e.passo(dt, t); }catch(err){ sbaglio(err); } }); }
    sc.t = sc.t0;
    return sc;
  }

  /* ---------- la telecamera: un lento movimento di macchina, uguale a zero all'inizio ---------- */
  function camera(sc, t, opz){
    const c = sc.reg.camera || {}, Z = (c.z != null ? c.z : .034) * (opz.zoom != null ? opz.zoom : 1), T = c.T || 27;
    const tt = Math.max(0, t - sc.t0), env = liscio(tt / 3.2);
    let z = 1 + Z * (.5 - .5 * Math.cos(TAU * tt / T)) * env;
    let ox = (z - 1) * 300 * .78 * Math.sin(TAU * tt / (T * 1.37) + .4) * (c.x != null ? c.x : 1);
    let oy = (z - 1) * 450 * .42 * Math.sin(TAU * tt / (T * .83) + 1.1) * (c.y != null ? c.y : 1);
    if(opz.tilt){ ox += opz.tilt.x * 9; oy += opz.tilt.y * 7; z = Math.max(z, 1 + Math.abs(ox) / 300 + .002, 1 + Math.abs(oy) / 450 + .002); }
    return { z, ox, oy };
  }
  function matLivello(sc, lv, cam, t){
    const st = lv.st, mc = matCam(cam, st.pz != null ? st.pz : 1);
    if(st.tipo !== "vivo") return mc;
    const f = MOTI[lv.moto] || MOTI.respiro, mo = f(t, lv);
    if(!mo) return mc;
    const env = liscio((t - sc.t0) / 2.5);
    if(env < 1){ mo.sx = 1 + ((mo.sx || 1) - 1) * env; mo.sy = 1 + ((mo.sy || 1) - 1) * env; mo.rot = (mo.rot || 0) * env; mo.tx = (mo.tx || 0) * env; mo.ty = (mo.ty || 0) * env; }
    return mul(mc, matMoto(mo, lv.pivot));
  }
  function perCtx(sc, k){
    let c = sc.ctxCache.get(k);
    if(c) return c;
    const g = k.createLinearGradient(0, 0, 0, 900), gr = sc.meta.grade || {};
    g.addColorStop(0, gr.ombra || "rgba(20,40,70,.55)"); g.addColorStop(.55, "rgba(128,128,128,0)"); g.addColorStop(1, gr.calda || "rgba(255,150,60,.35)");
    let pat = null; try{ pat = k.createPattern(LC.grana(), "repeat"); }catch(e){ sbaglio(e); }
    c = { soft:g, grana:pat };
    sc.ctxCache.set(k, c);
    return c;
  }
  function velo(sc, parte){ const key = "velo" + parte; if(!sc[key]) sc[key] = LC.velo(sc.meta.modo === "poster", 150, 225, parte); return sc[key]; }

  /* ---------- un fotogramma ---------- */
  function disegnaScena(k, sc, t, base, opz){
    opz = opz || {};
    const cam = sc.statico ? { z:1, ox:0, oy:0 } : camera(sc, t, opz), cc = perCtx(sc, k);
    sc.cam = cam; sc.tt = t;
    k.save();
    k.globalCompositeOperation = "source-over"; k.globalAlpha = 1;
    let mFondo = matCam(cam, .6);
    for(const lv of sc.livelli){
      const st = lv.st, m = matLivello(sc, lv, cam, t);
      if(st.k === "fondo") mFondo = m;
      setT(k, base, m);
      if(lv.img){
        if(st.tipo === "deriva") disegnaDeriva(k, sc, lv, t);
        else k.drawImage(lv.img, st.x, st.y, st.w, st.h);
      }
      for(const ef of lv.fx){ k.save(); try{ ef.disegna(k, t, m, base); }catch(e){ sbaglio(e); } k.restore(); }
    }
    setT(k, base, IDENT);
    for(const ef of sc.fine){ k.save(); try{ ef.disegna(k, t, IDENT, base); }catch(e){ sbaglio(e); } k.restore(); }
    // la pellicola: ombre ai bordi, bagliore delle luci, viraggio, vignetta e scuro per le scritte
    if(sc.imgs.bloom){ setT(k, base, mFondo); k.globalCompositeOperation = "screen"; k.globalAlpha = .42; k.drawImage(sc.imgs.bloom, 0, 0, 600, 900); }
    setT(k, base, IDENT);
    k.globalAlpha = 1; k.globalCompositeOperation = "soft-light"; k.fillStyle = cc.soft; k.fillRect(0, 0, 600, 900);
    k.globalCompositeOperation = "source-over"; k.drawImage(velo(sc), 0, 0, 600, 900);
    for(const ef of sc.post){ k.save(); try{ ef.disegna(k, t, IDENT, base); }catch(e){ sbaglio(e); } k.restore(); }
    // le scritte
    const m = sc.meta;
    if(m.testo && sc.imgs.testo) k.drawImage(sc.imgs.testo, m.testo.x, m.testo.y, m.testo.w, m.testo.h);
    if(m.titolo && sc.imgs.titolo){
      let disegnato = false;
      for(const ef of sc.titoloFx) if(ef.sostituisce){ k.save(); try{ if(ef.sostituisce(k, t, base)) disegnato = true; }catch(e){ sbaglio(e); } k.restore(); if(disegnato) break; }
      if(!disegnato) k.drawImage(sc.imgs.titolo, m.titolo.x, m.titolo.y, m.titolo.w, m.titolo.h);
      for(const ef of sc.titoloFx) if(ef.disegna){ k.save(); try{ ef.disegna(k, t, IDENT, base); }catch(e){ sbaglio(e); } k.restore(); }
    }
    // grana della pellicola, che si muove (della stessa misura di quella della locandina ferma)
    if(cc.grana && opz.grana !== 0 && (Q.livello > .7 || sc.statico || base.s > 1.2)){
      const gs = clamp(base.s / ((m.W || 600) / 600), .45, 2.5);
      k.setTransform(gs, 0, 0, gs, 0, 0);
      const R = sc.statico ? Math.random() : Math.random(), Q = Math.random();
      k.translate(-R * 192, -Q * 192);
      k.globalCompositeOperation = "overlay"; k.globalAlpha = opz.grana || (m.modo === "poster" ? .16 : .13);
      k.fillStyle = cc.grana; k.fillRect(0, 0, k.canvas.width / gs + 384, k.canvas.height / gs + 384);
    }
    k.restore();
  }
  function disegnaDeriva(k, sc, lv, t){
    const st = lv.st, P = 640, v = (lv.st.vel || 6) * (sc.reg.vento || 1), tt = t - sc.t0;
    const due = st.fx !== "nuvole";
    const off = ((v * tt) % P + P) % P;
    k.globalAlpha = due ? .74 : 1;
    k.drawImage(lv.img, st.x + off, st.y, st.w, st.h);
    k.drawImage(lv.img, st.x + off - P, st.y, st.w, st.h);
    if(due){
      const off2 = ((-v * .62 * tt + 230) % P + P) % P;
      k.globalAlpha = .42;
      k.save(); k.translate(2 * st.x + st.w, 0); k.scale(-1, 1);
      k.drawImage(lv.img, st.x + off2, st.y + 6, st.w, st.h);
      k.drawImage(lv.img, st.x + off2 - P, st.y + 6, st.w, st.h);
      k.restore();
    }
    k.globalAlpha = 1;
  }
  // avanza tutti gli effetti
  function avanza(sc, dt, t){ sc.qv = sc.q * (Q.livello || 1); for(const e of sc.tutti) if(e.passo) try{ e.passo(dt, t); }catch(err){ sbaglio(err); } }

  /* ======================================================================
     GLI EFFETTI. Ognuno: { z, passo(dt, t), disegna(k, t) } in unità della
     locandina (600 × 900). z dice dove si disegna: dietro i personaggi,
     sopra il cielo, dopo uno strato preciso o in cima.
     ====================================================================== */
  const EF = {};
  const quanti = (sc, n) => Math.max(1, Math.ceil(n * sc.qv));
  const fuori = (x, y, m) => x < -m || x > 600 + m || y < -m || y > 900 + m;

  /* --- pioggia a tre profondità, con schizzi a terra --- */
  EF.pioggia = (sc, a, R) => {
    const col = a.col || "#cfe3ff", n = (a.n || 46) / 46, ang = a.ang != null ? a.ang : .25, suolo = a.suolo || Math.min(sc.hor + 30, 860);
    const piani = [
      { z:"dietro", N:Math.round(110 * n), l:[9, 20], v:[600, 760], w:.75, al:.22 },
      { z:"dietro", N:Math.round(46 * n), l:[18, 34], v:[820, 980], w:1.05, al:.28 },
      { z:"fine", N:Math.round(24 * n), l:[38, 70], v:[1180, 1400], w:1.55, al:.3 }
    ];
    return piani.map((P, pi) => {
      const g = Array.from({ length:P.N }, () => ({ x:R() * 760 - 80, y:R() * 940 - 20, l:lerp(P.l[0], P.l[1], R()), v:lerp(P.v[0], P.v[1], R()) }));
      const sch = [];
      return { z:P.z,
        passo(dt){
          for(const d of g){ d.y += d.v * dt; d.x -= d.v * ang * dt; if(d.y - d.l > 905){ d.y -= 960 + R() * 40; d.x = R() * 760 - 80 + 960 * ang; } }
          if(pi === 2 && a.schizzi !== false){
            let k2 = 34 * n * dt * (a.forza || 1);
            while(k2 > 0){ if(R() < k2){ const y = lerp(suolo, 900, Math.sqrt(R())); sch.push({ x:R() * 600, y, t:0, s:.4 + (y - suolo) / (900 - suolo + 1) * 1.1 }); } k2 -= 1; }
            for(let i = sch.length - 1; i >= 0; i--){ sch[i].t += dt; if(sch[i].t > .34) sch.splice(i, 1); }
          }
        },
        disegna(k){
          const N = quanti(sc, g.length);
          k.strokeStyle = rgba(col, P.al); k.lineWidth = P.w; k.lineCap = "round";
          k.beginPath();
          for(let i = 0; i < N; i++){ const d = g[i]; k.moveTo(d.x, d.y); k.lineTo(d.x + ang * d.l, d.y - d.l); }
          k.stroke();
          if(sch.length){
            k.lineWidth = .9; k.strokeStyle = rgba(col, .5); k.beginPath();
            for(const p of sch){ const q = p.t / .34, s = p.s, h = 7 * s * Math.sin(q * Math.PI); k.moveTo(p.x - 2 * s, p.y); k.quadraticCurveTo(p.x - 4 * s, p.y - h, p.x - 6 * s * q - 3 * s, p.y - h * .4); k.moveTo(p.x + 2 * s, p.y); k.quadraticCurveTo(p.x + 4 * s, p.y - h, p.x + 6 * s * q + 3 * s, p.y - h * .4); }
            k.stroke();
            k.strokeStyle = rgba(col, .28); k.lineWidth = .7; k.beginPath();
            for(const p of sch){ const q = p.t / .34, rx = (3 + 13 * q) * p.s; k.moveTo(p.x + rx, p.y); k.ellipse(p.x, p.y, rx, rx * .22, 0, 0, TAU); }
            k.stroke();
          }
        } };
    });
  };
  /* --- gocce sull'obiettivo (solo nelle viste grandi) --- */
  EF.gocce = (sc, a, R) => {
    if(!sc.grande) return null;
    const g = Array.from({ length:a.n || 7 }, () => ({ x:R() * 600, y:R() * 800, r:6 + R() * 12, v:R() < .4 ? 8 + R() * 22 : 0, t:R() * 8 }));
    const im = sprite("goccia", "#ffffff");
    return { z:"post", passo(dt){ for(const d of g){ d.t += dt; if(d.v){ d.y += d.v * dt * (.6 + .4 * Math.sin(d.t * 3)); if(d.y > 920){ d.y = -20; d.x = R() * 600; } } } },
      disegna(k){ for(const d of g){ k.globalAlpha = .55; k.drawImage(im, d.x - d.r, d.y - d.r * 1.2, d.r * 2, d.r * 2.4); } } };
  };
  /* --- neve: fiocchi lontani dietro, grandi davanti --- */
  EF.neve = (sc, a, R) => {
    const n = (a.n || 70) / 70, vento = a.vento || 0, im = sprite("morbido", "#ffffff");
    return [0, 1].map(pi => {
      const f = Array.from({ length:Math.round((pi ? 26 : 90) * n) }, () => { const r = pi ? 2.4 + R() * 2.4 : .7 + R() * 1.8; return { x:R() * 640 - 20, y:R() * 900, r, v:14 + r * 12 + R() * 8, am:6 + R() * 16, f:.3 + R() * .8, ph:R() * TAU, a:.35 + R() * .55 }; });
      return { z:pi ? "fine" : "dietro",
        passo(dt, t){ for(const p of f){ p.y += p.v * dt; p.x += vento * (1 + p.r * .3) * dt; if(p.y > 910){ p.y = -10; p.x = R() * 640 - 20; } if(p.x > 630) p.x -= 660; if(p.x < -30) p.x += 660; } },
        disegna(k, t){ const N = quanti(sc, f.length); for(let i = 0; i < N; i++){ const p = f[i]; spr(k, im, p.x + Math.sin(t * p.f + p.ph) * p.am, p.y, p.r * 1.6, p.a); } } };
    });
  };
  EF.bufera = (sc, a, R) => EF.neve(sc, Object.assign({ n:120, vento:-140 }, a), R);
  /* --- braci che salgono --- */
  EF.braci = (sc, a, R) => {
    const n = a.n || 40, cols = a.cols || ["#ffb347", "#ff6a2a", "#ffd27a"], y0 = a.y0 || 520;
    const fonti = a.fonti || null;
    const nuova = (p, inizio) => { const f = fonti && fonti.length && R() < .7 ? fonti[Math.floor(R() * fonti.length)] : null; p.x = f ? f[0] + (R() - .5) * 40 : R() * 600; p.y = f ? f[1] - R() * 10 : (inizio ? lerp(y0 - 300, 920, R()) : 910 + R() * 20); p.v = 26 + R() * 60; p.vx = (R() - .5) * 20; p.vita = 2 + R() * 3.5; p.t = inizio ? R() * p.vita : 0; p.r = .8 + R() * 2.2; p.c = cols[Math.floor(R() * cols.length)]; p.ph = R() * TAU; return p; };
    const P = Array.from({ length:n }, () => nuova({}, true));
    return { z:a.z || "fine",
      passo(dt, t){ for(const p of P){ p.t += dt; p.y -= p.v * dt; p.x += (p.vx + 18 * Math.sin(t * 1.7 + p.ph)) * dt; if(p.t > p.vita || p.y < -10) nuova(p, false); } },
      disegna(k, t){ k.globalCompositeOperation = "lighter"; const N = quanti(sc, P.length); for(let i = 0; i < N; i++){ const p = P[i], vita = 1 - p.t / p.vita, fl = .6 + .4 * Math.sin(t * 13 + p.ph); spr(k, sprite("punto", p.c), p.x, p.y, p.r * 3.2, Math.min(1, vita * 1.6) * fl); } } };
  };
  /* --- lucciole: vagano e si accendono a respiro --- */
  EF.lucciole = (sc, a, R) => {
    const n = a.n || 26, col = a.col || "#d8ff8a", y0 = a.y0 || 380, y1 = a.y1 || 840, im = sprite("punto", col);
    const P = Array.from({ length:n }, () => ({ x:R() * 600, y:lerp(y0, y1, R()), vx:0, vy:0, ph:R() * TAU, per:1.6 + R() * 2.6, s:.7 + R() * .6 }));
    return { z:a.z || "fine",
      passo(dt, t){ for(const p of P){ p.vx = p.vx * .97 + (R() - .5) * 26 * dt * 3; p.vy = p.vy * .97 + (R() - .5) * 18 * dt * 3; p.x += p.vx * dt; p.y += p.vy * dt; if(p.x < -10) p.x = 610; if(p.x > 610) p.x = -10; if(p.y < y0 - 40 || p.y > y1 + 40){ p.vy *= -1; p.y = clamp(p.y, y0 - 40, y1 + 40); } } },
      disegna(k, t){ k.globalCompositeOperation = "lighter"; const N = quanti(sc, P.length); for(let i = 0; i < N; i++){ const p = P[i], b = Math.max(0, Math.sin(TAU * t / p.per + p.ph)); spr(k, im, p.x, p.y, 10 * p.s, b * b); } } };
  };
  /* --- polvere sospesa nella luce --- */
  EF.polvere = (sc, a, R) => {
    const n = a.n || 40, col = a.col || "#f2d6a8", y0 = a.y0 || 300, im = sprite("morbido", col);
    const P = Array.from({ length:n }, () => ({ x:R() * 600, y:lerp(y0, 900, R()), vx:(R() - .5) * 6, vy:(R() - .5) * 4, r:.8 + R() * 1.8, ph:R() * TAU, a:.12 + R() * .3 }));
    return { z:a.z || "fine",
      passo(dt, t){ for(const p of P){ p.x += (p.vx + 4 * Math.sin(t * .4 + p.ph)) * dt; p.y += (p.vy + 3 * Math.cos(t * .33 + p.ph)) * dt; if(p.x < -5) p.x = 605; if(p.x > 605) p.x = -5; if(p.y < y0 - 20) p.y = 900; if(p.y > 905) p.y = y0; } },
      disegna(k, t){ k.globalCompositeOperation = "lighter"; const N = quanti(sc, P.length); for(let i = 0; i < N; i++){ const p = P[i]; spr(k, im, p.x, p.y, p.r * 1.8, p.a * (.6 + .4 * Math.sin(t * 2.1 + p.ph))); } } };
  };
  /* --- bokeh: dischi di luce fuori fuoco che respirano --- */
  EF.bokeh = (sc, a, R) => {
    const n = Math.round((a.n || 14) * 1.6), cols = [a.col || sc.p.acc, sc.p.glow, "#ffd9a8"], y1 = a.y1 || sc.hor - 30;
    const P = Array.from({ length:n }, () => ({ x:R() * 640 - 20, y:lerp(a.y0 || 40, y1, R()), r:(4 + R() * 12) * (R() < .18 ? 2.2 : 1) * (a.k || 1), c:cols[Math.floor(R() * 3)], ph:R() * TAU, per:5 + R() * 6, vx:(R() - .5) * 5, vy:-1 - R() * 4, a:.12 + R() * .34 }));
    return { z:a.z || "dietro",
      passo(dt){ for(const p of P){ p.x += p.vx * dt; p.y += p.vy * dt; if(p.y < -40) p.y = y1 + 30; if(p.x < -50) p.x = 650; if(p.x > 650) p.x = -50; } },
      disegna(k, t){ k.globalCompositeOperation = "lighter"; const N = quanti(sc, P.length); for(let i = 0; i < N; i++){ const p = P[i]; spr(k, sprite("bokeh", p.c), p.x, p.y, p.r * 1.6, p.a * (.65 + .35 * Math.sin(TAU * t / p.per + p.ph))); } } };
  };
  /* --- coriandoli che girano in aria --- */
  EF.coriandoli = (sc, a, R) => {
    const n = a.n || 40, cols = a.cols || ["#ffd36b", "#ff7ab6", "#7fd4e0", "#a6f08f", "#ffffff", "#e0a83f", "#c8423b"];
    const P = Array.from({ length:n }, () => ({ x:R() * 600, y:R() * 900, w:5 + R() * 5, h:3 + R() * 2.5, v:40 + R() * 60, am:10 + R() * 26, f:.6 + R() * 1.4, ph:R() * TAU, rot:R() * TAU, vr:(R() - .5) * 6, flip:R() * TAU, vf:3 + R() * 7, c:cols[Math.floor(R() * cols.length)] }));
    return { z:a.z || "fine",
      passo(dt){ for(const p of P){ p.y += p.v * dt; p.rot += p.vr * dt; p.flip += p.vf * dt; if(p.y > 910){ p.y = -10; p.x = R() * 600; } } },
      disegna(k, t){ const N = quanti(sc, P.length); for(let i = 0; i < N; i++){ const p = P[i], x = p.x + Math.sin(t * p.f + p.ph) * p.am, sw = Math.cos(p.flip); k.globalAlpha = .9; k.fillStyle = Math.abs(sw) < .3 ? mescola(p.c, "#000000", .35) : p.c; const co = Math.cos(p.rot), si = Math.sin(p.rot), hw = p.w / 2 * sw, hh = p.h / 2; k.beginPath(); k.moveTo(x - co * hw + si * hh, p.y - si * hw - co * hh); k.lineTo(x + co * hw + si * hh, p.y + si * hw - co * hh); k.lineTo(x + co * hw - si * hh, p.y + si * hw + co * hh); k.lineTo(x - co * hw - si * hh, p.y - si * hw + co * hh); k.fill(); } } };
  };
  // oggetti piatti che cadono girando (carte, banconote): disegnati con una funzione
  function cadenti(sc, a, R, disegnaUno, base){
    const n = a.n || base.n;
    const P = Array.from({ length:n }, () => ({ x:R() * 600, y:lerp(a.y0 || -40, a.y1 || 900, R()), v:(base.v || 34) + R() * (base.vv || 40), am:10 + R() * 26, f:.4 + R() * .9, ph:R() * TAU, rot:(R() - .5) * 2, vr:(R() - .5) * 1.6, flip:R() * TAU, vf:1.5 + R() * 3, s:.7 + R() * .6, tipo:Math.floor(R() * 100) }));
    return { z:a.z || "fine",
      passo(dt){ for(const p of P){ p.y += p.v * dt; p.rot += p.vr * dt; p.flip += p.vf * dt; if(p.y > 940){ p.y = -50; p.x = R() * 600; } } },
      disegna(k, t, m, base2){ const N = quanti(sc, P.length); for(let i = 0; i < N; i++){ const p = P[i], x = p.x + Math.sin(t * p.f + p.ph) * p.am, sw = Math.cos(p.flip); k.save(); k.translate(x, p.y); k.rotate(p.rot + .3 * Math.sin(t * p.f * 1.3 + p.ph)); k.scale(p.s * (Math.abs(sw) < .08 ? .08 : sw), p.s); disegnaUno(k, p, sw); k.restore(); } } };
  }
  const SEMI = { c:"M0 -5C-3 -9 -8 -6 -6 -2L0 5L6 -2C8 -6 3 -9 0 -5Z", q:"M0 -7L5 0L0 7L-5 0Z", p:"M0 -7C-4 -2 -8 0 -6 4C-4 6 -2 5 -1 3L-2 7H2L1 3C2 5 4 6 6 4C8 0 4 -2 0 -7Z", f:"M0 -7A3 3 0 1 1 0 -1A3 3 0 1 1 -3 4A3 3 0 1 1 3 4A3 3 0 1 1 0 -1ZM-1 3L-2 8H2L1 3Z" };
  const P2D = {}; const path = d => P2D[d] || (P2D[d] = new Path2D(d));
  EF.carteCadenti = (sc, a, R) => cadenti(sc, a, R, (k, p, sw) => {
    k.fillStyle = sw > 0 ? "#f6f2ea" : "#7a1a22"; k.globalAlpha = .95; k.beginPath(); k.rect(-13, -18, 26, 36); k.fill();
    if(sw > 0){ const sm = "cqpf"[p.tipo % 4], col = sm === "c" || sm === "q" ? "#c41e2a" : "#141414"; k.fillStyle = col; k.scale(1.3, 1.3); k.fill(path(SEMI[sm])); k.scale(1 / 1.3, 1 / 1.3); k.font = "700 7px Georgia, serif"; k.fillText("AKQJ7"[p.tipo % 5], -10, -10); }
    else { k.strokeStyle = "rgba(232,200,106,.7)"; k.lineWidth = .7; k.strokeRect(-10, -15, 20, 30); }
  }, { n:16, v:30, vv:36 });
  EF.soldi = (sc, a, R) => cadenti(sc, a, R, (k, p, sw) => {
    const cl = (a.cols || ["#b89a6a", "#8a9ab8", "#a88aa8", "#9ab08a"])[p.tipo % 4];
    k.globalAlpha = .92; k.fillStyle = sw > 0 ? cl : mescola(cl, "#000000", .25); k.fillRect(-24, -11, 48, 22);
    k.strokeStyle = mescola(cl, "#000000", .4); k.lineWidth = .8; k.strokeRect(-21, -8, 42, 16);
    k.fillStyle = mescola(cl, "#000000", .3); k.beginPath(); k.ellipse(9, 0, 7, 8, 0, 0, TAU); k.fill();
    k.fillRect(-18, -5, 14, 1.4); k.fillRect(-18, -1, 10, 1.4); k.fillRect(-18, 3, 16, 1.4);
  }, { n:18, v:26, vv:34 });
  /* --- cuori che salgono --- */
  EF.cuori = (sc, a, R) => {
    const n = a.n || 14, col = a.col || "#ff6aa8";
    const P = Array.from({ length:n }, () => ({ x:R() * 560 + 20, y:R() * 700 + 100, v:18 + R() * 26, s:.6 + R() * 1.1, ph:R() * TAU, vita:R() }));
    return { z:a.z || "fine",
      passo(dt){ for(const p of P){ p.y -= p.v * dt; p.vita += dt * .14; if(p.vita > 1 || p.y < 40){ p.vita = 0; p.y = 560 + R() * 260; p.x = R() * 560 + 20; } } },
      disegna(k, t){ const N = quanti(sc, P.length); for(let i = 0; i < N; i++){ const p = P[i]; k.save(); k.translate(p.x + 10 * Math.sin(t * 1.6 + p.ph), p.y); const s = p.s * (1 + .08 * Math.sin(t * 6 + p.ph)); k.scale(s, s); k.globalAlpha = .85 * Math.sin(p.vita * Math.PI); k.fillStyle = col; k.fill(path("M0 0c-6 -8 -18 -2 -10 8l10 9l10 -9c8 -10 -4 -16 -10 -8z")); k.restore(); } } };
  };
  /* --- bolle d'aria sott'acqua --- */
  EF.bolle = (sc, a, R) => {
    const n = a.n || 30;
    const P = Array.from({ length:n }, () => ({ x:R() * 580 + 10, y:R() * 900, r:2 + R() * 9, v:20 + R() * 40, ph:R() * TAU }));
    return { z:a.z || "fine",
      passo(dt){ for(const p of P){ p.y -= p.v * dt * (.6 + p.r * .06); if(p.y < -20){ p.y = 920; p.x = R() * 580 + 10; } } },
      disegna(k, t){ const N = quanti(sc, P.length); k.lineWidth = 1.3; for(let i = 0; i < N; i++){ const p = P[i], x = p.x + Math.sin(t * 2 + p.ph) * (3 + p.r * .4); k.globalAlpha = .5; k.strokeStyle = "#bff6ff"; k.beginPath(); k.ellipse(x, p.y, p.r, p.r * (.92 + .08 * Math.sin(t * 9 + p.ph)), 0, 0, TAU); k.stroke(); k.globalAlpha = .7; k.fillStyle = "#ffffff"; k.beginPath(); k.arc(x - p.r * .35, p.y - p.r * .35, p.r * .22, 0, TAU); k.fill(); } } };
  };
  /* --- pioggia di numeri del codice --- */
  EF.codice = (sc, a, R) => {
    const n = a.n || 16, rosso = a.rosso || .2;
    const col = Array.from({ length:n }, () => ({ x:10 + R() * 580, y:R() * 900 - 200, v:60 + R() * 120, len:6 + Math.floor(R() * 8), r:R() < rosso, cifre:Array.from({ length:14 }, () => R() < .5 ? 1 : 0), cambia:0 }));
    const glifi = {};
    const glifo = (ch, c2) => { const key = ch + c2; if(glifi[key]) return glifi[key]; const cv = tela(20, 26), k = cv.getContext("2d"); k.font = "700 20px monospace"; k.fillStyle = c2; k.fillText(String(ch), 2, 20); return glifi[key] = cv; };
    return { z:a.z || "fine",
      passo(dt){ for(const c2 of col){ c2.y += c2.v * dt; c2.cambia += dt; if(c2.cambia > .12){ c2.cambia = 0; c2.cifre[Math.floor(R() * c2.cifre.length)] ^= 1; } if(c2.y - c2.len * 22 > 900){ c2.y = -20 - R() * 200; c2.x = 10 + R() * 580; } } },
      disegna(k){ const N = quanti(sc, col.length); for(let i = 0; i < N; i++){ const c2 = col[i], tinta = c2.r ? "#ff3a3a" : "#5effa0"; for(let j = 0; j < c2.len; j++){ const y = c2.y - j * 22; if(y < -20 || y > 920) continue; k.globalAlpha = j === 0 ? .95 : .55 * (1 - j / c2.len); k.drawImage(glifo(c2.cifre[j % 14], j === 0 ? "#eafff2" : tinta), c2.x, y - 18, 16, 21); } } } };
  };
  /* --- laser della discoteca --- */
  EF.laser = (sc, a, R) => {
    const cols = a.cols || ["#5ee1ff", "#ff4fd8", "#a6ff6a"], ox = a.x || 300, oy = a.y || 560, n = a.n || 10;
    const raggi = Array.from({ length:n }, (_, i) => ({ base:-Math.PI / 2 + (i / (n - 1) - .5) * 2.4, am:.25 + R() * .4, f:.25 + R() * .5, ph:R() * TAU, c:cols[i % cols.length] }));
    return { z:a.z || "fine",
      disegna(k, t){
        k.globalCompositeOperation = "lighter"; k.lineCap = "round";
        const fan = .5 + .5 * Math.sin(t * .6);
        for(const r of raggi){ const an = r.base * (.7 + .3 * fan) + r.am * Math.sin(t * r.f * TAU / 4 + r.ph), x2 = ox + Math.cos(an) * 1000, y2 = oy + Math.sin(an) * 1000, on = Math.sin(t * 2.3 + r.ph) > -.6;
          if(!on) continue;
          k.strokeStyle = r.c; k.globalAlpha = .16; k.lineWidth = 7; k.beginPath(); k.moveTo(ox, oy); k.lineTo(x2, y2); k.stroke();
          k.globalAlpha = .75; k.lineWidth = 1.4; k.stroke(); }
        k.globalAlpha = .9; spr(k, sprite("alone", "#ffffff"), ox, oy, 26 + 6 * Math.sin(t * 8), .8);
      } };
  };
  /* --- razzi illuminanti (guerra): salgono, si aprono e scendono lenti --- */
  EF.razzi = (sc, a, R) => {
    const col = a.col || "#fff2c8", pos = a.pos || [[140, 180], [460, 120], [330, 250]];
    const r = pos.map(([x, y], i) => ({ x0:x, y0:y, t:i * 2.3 + R() * 2, x:x, y:y }));
    const per = a.per || 7;
    return { z:a.z || "dietro",
      passo(dt){ for(const q of r){ q.t += dt; if(q.t > per){ q.t = 0; q.x0 = 60 + R() * 480; q.y0 = 90 + R() * 160; } } },
      disegna(k, t){
        k.globalCompositeOperation = "lighter";
        for(const q of r){
          const fase = q.t / per;
          if(fase < .18){ const u = fase / .18, x = lerp(q.x0 - 60, q.x0, u), y = lerp(sc.hor, q.y0, 1 - (1 - u) * (1 - u)); k.strokeStyle = "rgba(255,240,200,.35)"; k.lineWidth = 2; k.beginPath(); k.moveTo(q.x0 - 60, sc.hor); k.quadraticCurveTo(q.x0 - 40, q.y0 + 120, x, y); k.stroke(); spr(k, sprite("punto", col), x, y, 6, 1); }
          else { const u = (fase - .18) / .82, x = q.x0 + 12 * Math.sin(u * 9), y = q.y0 + u * 180, lum = (u < .08 ? u / .08 : 1) * (1 - Math.max(0, (u - .8) / .2)), fl = .85 + .15 * Math.sin(t * 17 + q.x0);
            spr(k, sprite("alone", col), x, y, 170 * lum, .5 * lum * fl); spr(k, sprite("punto", "#ffffff"), x, y, 7, lum); }
        }
      } };
  };
  /* --- strisce di velocità --- */
  EF.velocita = (sc, a, R) => {
    const P = Array.from({ length:a.n || 14 }, () => ({ x:R() * 700, y:lerp(a.y0 || 480, a.y1 || 700, R()), l:80 + R() * 160, v:700 + R() * 900, a:.12 + R() * .2, w:1 + R() * 1.4 }));
    return { z:a.z || "fine", passo(dt){ for(const p of P){ p.x -= p.v * dt; if(p.x + p.l < -20){ p.x = 620 + R() * 200; p.y = lerp(a.y0 || 480, a.y1 || 700, R()); } } },
      disegna(k){ k.lineCap = "round"; for(const p of P){ const g = k.createLinearGradient(p.x, 0, p.x + p.l, 0); g.addColorStop(0, "rgba(255,255,255," + p.a + ")"); g.addColorStop(1, "rgba(255,255,255,0)"); k.strokeStyle = g; k.lineWidth = p.w; k.beginPath(); k.moveTo(p.x, p.y); k.lineTo(p.x + p.l, p.y); k.stroke(); } } };
  };
  /* --- refoli di vento --- */
  EF.vento = (sc, a, R) => {
    const P = Array.from({ length:a.n || 18 }, () => ({ x:R() * 700 - 100, y:80 + R() * 720, l:140 + R() * 200, v:60 + R() * 90, ph:R() * TAU, a:.08 + R() * .16, w:1 + R() * 1.2 }));
    return { z:a.z || "fine", passo(dt){ for(const p of P){ p.x += p.v * dt; if(p.x > 640){ p.x = -p.l - R() * 200; p.y = 80 + R() * 720; } } },
      disegna(k, t){ k.strokeStyle = "#ffffff"; k.lineCap = "round"; for(const p of P){ const vis = Math.sin(clamp((p.x + p.l) / (640 + p.l), 0, 1) * Math.PI); k.globalAlpha = p.a * vis; k.lineWidth = p.w; k.beginPath(); k.moveTo(p.x, p.y); k.quadraticCurveTo(p.x + p.l / 2, p.y - 16 + 8 * Math.sin(t + p.ph), p.x + p.l, p.y - 6); k.stroke(); } } };
  };
  /* --- cubi di fil di ferro che girano --- */
  EF.cubi = (sc, a, R) => {
    const n = a.n || 6, col = a.col || sc.p.acc;
    const C = Array.from({ length:n }, () => ({ x:60 + R() * 480, y:120 + R() * 400, s:16 + R() * 26, ax:R() * TAU, ay:R() * TAU, va:.3 + R() * .6, vb:.2 + R() * .5, ph:R() * TAU }));
    const V = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]], E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    return { z:a.z || "fine",
      disegna(k, t){
        k.globalCompositeOperation = "lighter"; k.strokeStyle = col; k.lineWidth = 1.5;
        for(const c of C){ const ax = c.ax + t * c.va, ay = c.ay + t * c.vb, ca = Math.cos(ax), sa = Math.sin(ax), cb = Math.cos(ay), sb = Math.sin(ay), y0 = c.y + 10 * Math.sin(t * .7 + c.ph);
          const P = V.map(([x, y, z]) => { const y1 = y * ca - z * sa, z1 = y * sa + z * ca, x2 = x * cb + z1 * sb, z2 = -x * sb + z1 * cb, pr = 4 / (4 + z2); return [c.x + x2 * c.s * pr, y0 + y1 * c.s * pr]; });
          k.globalAlpha = .55 + .25 * Math.sin(t * 1.3 + c.ph); k.beginPath(); for(const [i, j] of E){ k.moveTo(P[i][0], P[i][1]); k.lineTo(P[j][0], P[j][1]); } k.stroke(); }
      } };
  };
  /* --- segnale radio: anelli che si allargano --- */
  EF.segnale = (sc, a, R) => {
    const x = a.x || 300, y = a.y || 220, col = a.col || sc.p.acc, max = a.r || 230;
    return { z:a.z || "fine",
      disegna(k, t){ k.globalCompositeOperation = "lighter"; k.strokeStyle = col; for(let i = 0; i < 4; i++){ const u = fr(t / 3.2 + i / 4), r = 8 + u * max; k.globalAlpha = .7 * (1 - u) * (1 - u); k.lineWidth = 3 - u * 2; k.beginPath(); k.arc(x, y, r, 0, TAU); k.stroke(); } spr(k, sprite("alone", col), x, y, 40 + 8 * Math.sin(t * 4), .6); } };
  };
  /* --- fulmini: lampo nel cielo, poi il colpo; a volte due di fila --- */
  function saetta(R, x0, y0, x1, y1){
    let pts = [[x0, y0], [x1, y1]];
    for(let k = 0; k < 6; k++){ const nu = [pts[0]]; for(let i = 1; i < pts.length; i++){ const A = pts[i - 1], B = pts[i], d = Math.hypot(B[0] - A[0], B[1] - A[1]); nu.push([(A[0] + B[0]) / 2 + (R() - .5) * d * .42, (A[1] + B[1]) / 2 + (R() - .5) * d * .12]); nu.push(B); } pts = nu; }
    const rami = [];
    for(let k = 0; k < 4; k++){ const i = Math.floor(pts.length * (.15 + R() * .6)), p = pts[i], l = 40 + R() * 120, an = (R() < .5 ? -1 : 1) * (.4 + R() * .8); let r = [p, [p[0] + Math.sin(an) * l, p[1] + Math.cos(an) * l * .7]]; for(let q = 0; q < 4; q++){ const nu = [r[0]]; for(let j = 1; j < r.length; j++){ const A = r[j - 1], B = r[j], d = Math.hypot(B[0] - A[0], B[1] - A[1]); nu.push([(A[0] + B[0]) / 2 + (R() - .5) * d * .5, (A[1] + B[1]) / 2]); nu.push(B); } r = nu; } rami.push(r); }
    return { pts, rami };
  }
  EF.fulmine = (sc, a, R) => {
    const x = a.x || 420, ogni = a.ogni || 6.5, col = "#eaf2ff";
    let prossimo = sc.statico ? 0 : 1.5 + R() * 3, lampi = [], cur = null, tt = 0;
    const nuovo = () => { const xx = x + (R() - .5) * 120; cur = saetta(R, xx + (R() - .5) * 40, -10, xx - 30 - R() * 70, (a.y2 || 320) + R() * 60); lampi = [0, .09 + R() * .05, R() < .5 ? .3 + R() * .1 : -1]; };
    if(sc.statico) nuovo();
    const forza = () => { if(!cur) return 0; let f = 0; lampi.forEach(l => { if(l < 0) return; const d = tt - l; if(d >= 0 && d < .22) f = Math.max(f, d < .04 ? 1 : 1 - (d - .04) / .18); }); return sc.statico ? .7 : f; };
    const sky = { z:"cielo",
      passo(dt){ tt += dt; prossimo -= dt; if(prossimo <= 0){ nuovo(); tt = 0; prossimo = ogni * (.6 + R() * .8); } if(tt > .6 && !sc.statico) cur = null; },
      disegna(k){
        const f = forza(); if(f <= 0) return;
        k.globalCompositeOperation = "lighter";
        const g = k.createRadialGradient(x, 120, 10, x, 200, 620); g.addColorStop(0, `rgba(210,225,255,${.55 * f})`); g.addColorStop(1, "rgba(210,225,255,0)"); k.fillStyle = g; k.fillRect(0, 0, 600, sc.hor + 40);
        k.lineCap = "round"; k.lineJoin = "round";
        const traccia = (P2, w, al) => { k.globalAlpha = al; k.lineWidth = w; k.beginPath(); P2.forEach((p, i) => i ? k.lineTo(p[0], p[1]) : k.moveTo(p[0], p[1])); k.stroke(); };
        k.strokeStyle = "#cfe0ff"; traccia(cur.pts, 12, .22 * f); cur.rami.forEach(r => traccia(r, 6, .14 * f));
        k.strokeStyle = col; traccia(cur.pts, 3.6, .8 * f); cur.rami.forEach(r => traccia(r, 1.6, .55 * f));
        k.strokeStyle = "#ffffff"; traccia(cur.pts, 1.4, f);
      } };
    const vicino = { z:"fine", disegna(k){ const f = forza(); if(f <= 0) return; k.globalCompositeOperation = "lighter"; k.fillStyle = `rgba(200,215,255,${.12 * f})`; k.fillRect(0, 0, 600, 900); } };
    return [sky, vicino];
  };
  EF.lampoLontano = (sc, a, R) => {
    let prossimo = 2 + R() * 4, t2 = 9, x = 300;
    return { z:a.z || "cielo",
      passo(dt){ t2 += dt; prossimo -= dt; if(prossimo <= 0){ t2 = 0; x = 60 + R() * 480; prossimo = (a.ogni || 5) * (.5 + R()); } },
      disegna(k){ if(t2 > .5) return; const f = t2 < .05 ? t2 / .05 : (1 - (t2 - .05) / .45) * (.7 + .3 * Math.sin(t2 * 60)); k.globalCompositeOperation = "lighter"; const g = k.createRadialGradient(x, sc.hor - 60, 5, x, sc.hor - 60, 320); g.addColorStop(0, `rgba(${a.col || "220,230,255"},${.45 * f})`); g.addColorStop(1, `rgba(${a.col || "220,230,255"},0)`); k.fillStyle = g; k.fillRect(0, 0, 600, sc.hor + 60); } };
  };
  /* --- fasci di luce (dal basso o dall'alto) che respirano e oscillano --- */
  EF.fasci = (sc, a, R) => {
    const F = [[120, -.5], [300, .1], [480, .55]].map(([x, an], i) => ({ x, an, ph:R() * TAU, f:.05 + R() * .05 }));
    return { z:a.z || "dietro",
      disegna(k, t){ k.globalCompositeOperation = "lighter"; for(const q of F){ const an = q.an + .08 * Math.sin(TAU * t * q.f + q.ph), x2 = q.x + an * 400, g = k.createLinearGradient(0, 900, 0, 0); g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(1, `rgba(255,255,255,${.15 * (.75 + .25 * Math.sin(t * .9 + q.ph))})`); k.fillStyle = g; k.beginPath(); k.moveTo(q.x, 900); k.lineTo(x2 - 50, 0); k.lineTo(x2 + 50, 0); k.closePath(); k.fill(); } } };
  };
  EF.raggi = (sc, a, R) => {
    const col = a.col || sc.p.glow, n = a.n || 6;
    const F = Array.from({ length:n }, () => ({ x:40 + R() * 520, w:20 + R() * 40, ph:R() * TAU, f:.03 + R() * .06 }));
    return { z:a.z || "dietro",
      disegna(k, t){ k.globalCompositeOperation = "lighter"; for(const q of F){ const dx = 30 * Math.sin(TAU * t * q.f + q.ph), al = .2 * (.55 + .45 * Math.sin(t * .7 + q.ph * 2)), g = k.createLinearGradient(0, 0, 0, 900); g.addColorStop(0, rgba(col, al)); g.addColorStop(1, rgba(col, 0)); k.fillStyle = g; k.beginPath(); k.moveTo(q.x - q.w + dx, 0); k.lineTo(q.x + q.w + dx, 0); k.lineTo(q.x + q.w * 3 + 120 + dx * 2, 900); k.lineTo(q.x - q.w * 3 + 60 + dx * 2, 900); k.closePath(); k.fill(); } } };
  };
  /* --- riflettori che cercano qualcuno sul palco --- */
  EF.riflettori = (sc, a, R) => {
    const tx = a.x || 300, ty = a.y || 560, fonti = [[40, 0, 10, 110, .32], [560, 0, 10, 110, .32], [300, 0, 6, 70, .25]], P = Array.from({ length:30 }, () => ({ u:R(), v:R() - .5, ph:R() * TAU }));
    return { z:a.z || "dietro",
      disegna(k, t){
        k.globalCompositeOperation = "lighter";
        fonti.forEach(([x1, y1, w1, w2, al], i) => {
          const px = tx + (i === 2 ? 0 : (i ? -1 : 1) * 70 * Math.sin(t * .35 + i)) + 40 * Math.sin(t * .22 + i * 2), py = ty + 30 * Math.sin(t * .27 + i);
          const g = k.createLinearGradient(x1, y1, px, py); g.addColorStop(0, `rgba(255,248,230,${al})`); g.addColorStop(1, "rgba(255,248,230,0)");
          k.fillStyle = g; k.beginPath(); k.moveTo(x1 - w1, y1); k.lineTo(px - w2, py); k.lineTo(px + w2, py); k.lineTo(x1 + w1, y1); k.closePath(); k.fill();
          for(const d of P){ const u = d.u, x = lerp(x1, px, u) + d.v * lerp(w1, w2, u) * .8, y = lerp(y1, py, u); spr(k, sprite("morbido", "#fff4d8"), x + 4 * Math.sin(t + d.ph), y, 1.6, .35 * (.5 + .5 * Math.sin(t * 2 + d.ph))); }
        });
        const g = k.createRadialGradient(tx, ty + 10, 5, tx, ty + 10, 150); g.addColorStop(0, "rgba(255,240,210,.18)"); g.addColorStop(1, "rgba(255,240,210,0)"); k.fillStyle = g; k.fillRect(tx - 160, ty - 150, 320, 300);
      } };
  };

  /* ---------- effetti nati dai punti del disegno ---------- */
  /* --- sole e luna --- */
  const raggiCache = new Map();
  function stellaRaggi(col, n, seed){
    const key = col + n;
    if(raggiCache.has(key)) return raggiCache.get(key);
    const S = 160, cv = tela(S * 2, S * 2), k = cv.getContext("2d"), R = rng(seed + n), [r, g, b] = hexRgb(col);
    k.translate(S, S); try{ k.filter = "blur(2px)"; }catch(e){ sbaglio(e); }
    for(let i = 0; i < n; i++){ const an = i / n * TAU + (R() - .5) * .25, w = .012 + R() * .03, l = S * (.55 + R() * .45), al = .06 + R() * .1; const gr = k.createLinearGradient(0, 0, Math.cos(an) * l, Math.sin(an) * l); gr.addColorStop(0, `rgba(${r},${g},${b},${al})`); gr.addColorStop(1, `rgba(${r},${g},${b},0)`); k.fillStyle = gr; k.beginPath(); k.moveTo(0, 0); k.lineTo(Math.cos(an - w) * l, Math.sin(an - w) * l); k.lineTo(Math.cos(an + w) * l, Math.sin(an + w) * l); k.closePath(); k.fill(); }
    raggiCache.set(key, cv);
    return cv;
  }
  EF.astro = (sc, a, R) => {
    const sole = a.t === "sole", col = a.col || sc.p.glow, r = a.r || 40, ph = R() * TAU;
    const rays = a.raggi !== false ? stellaRaggi(col, sole ? 26 : 16, 7) : null;
    const nub = !sole && a.nuvolette !== false ? Array.from({ length:3 }, (_, i) => ({ x:a.x - 220 + i * 170 + R() * 60, y:a.y + (R() - .5) * r * 1.4, w:r * (1.6 + R() * 1.4), v:5 + R() * 5 })) : [];
    const scuro = mescola(sc.p.sky[1] || "#10141c", "#000000", .35);
    return { z:a.strato,
      passo(dt){ for(const q of nub){ q.x += q.v * dt; if(q.x - q.w > a.x + 300) q.x = a.x - 300 - q.w; } },
      disegna(k, t){
        const tt = t - sc.t0;
        if(rays){ k.save(); k.translate(a.x, a.y); k.rotate(tt * (sole ? .022 : .012)); const L2 = r * (sole ? 8 : 6) * (a.rl || 1), br = .75 + .25 * Math.sin(tt * .5 + ph); k.globalCompositeOperation = "lighter"; k.globalAlpha = clamp((sole ? .9 : .6) * br * (a.ra || 1), 0, 1); k.drawImage(rays, -L2, -L2, L2 * 2, L2 * 2); k.rotate(-tt * (sole ? .05 : .03)); k.globalAlpha = .45 * br; k.drawImage(rays, -L2 * .7, -L2 * .7, L2 * 1.4, L2 * 1.4); k.restore(); }
        k.globalCompositeOperation = "lighter";
        const resp = .5 + .5 * Math.sin(tt * (sole ? .7 : .45) + ph);
        spr(k, sprite("alone", col), a.x, a.y, r * (2.6 + .25 * resp), (sole ? .18 : .12) + .06 * resp);
        if(nub.length){
          k.globalCompositeOperation = "source-over";
          for(const q of nub){ const d = Math.abs(q.x - a.x); if(d > q.w + r * 2) continue; k.globalAlpha = .5; k.drawImage(sprite("sbuffo", scuro), q.x - q.w, q.y - q.w * .35, q.w * 2, q.w * .7); }
        }
      } };
  };
  /* --- finestre: qualcuno accende, qualcuno spegne, una tv che sfarfalla --- */
  EF.finestra = (sc, list, R, o) => {
    if(!list.length) return null;
    const F = list.map(w => Object.assign({ l:w.on ? 1 : 0, meta:w.on ? 1 : 0, v:0, torna:0, tv:w.tv || (w.on && R() < (o.tv || .05)), sagoma:-1 }, w));
    const vita = o.vita || 1;
    let prossimo = .5 + R() * 2, sagT = 4 + R() * 4;
    const nTv = F.filter(w => w.tv).length;
    return { z:list[0].strato,
      passo(dt){
        prossimo -= dt * vita; sagT -= dt;
        if(prossimo <= 0){ const w = F[Math.floor(R() * F.length)]; if(w.torna <= 0){ w.meta = w.on ? 0 : 1; w.v = 1 / (.25 + R() * .6); w.torna = 3 + R() * 9; } prossimo = (1.2 + R() * 2.8) * (30 / Math.max(10, F.length)); }
        if(sagT <= 0){ const accese = F.filter(w => w.l > .9 && (w.grande || w.w > 9)); if(accese.length){ const w = accese[Math.floor(R() * accese.length)]; w.sagoma = 0; w.dir = R() < .5 ? -1 : 1; } sagT = 5 + R() * 7; }
        for(const w of F){ if(w.torna > 0){ w.torna -= dt; if(w.torna <= 0){ w.meta = w.on ? 1 : 0; w.v = 1 / (.2 + R() * .5); } } if(w.l !== w.meta){ w.l += Math.sign(w.meta - w.l) * Math.min(Math.abs(w.meta - w.l), dt * (w.v || 2)); } if(w.sagoma >= 0){ w.sagoma += dt / 2.4; if(w.sagoma > 1) w.sagoma = -1; } }
      },
      disegna(k, t){
        for(const w of F){
          const base = w.on ? 1 : 0;
          if(Math.abs(w.l - base) > .01){
            if(w.on){ k.globalCompositeOperation = "source-over"; k.globalAlpha = (1 - w.l) * .92; k.fillStyle = w.buio || "#120a06"; k.fillRect(w.x, w.y, w.w, w.h); }
            else { k.globalCompositeOperation = "source-over"; k.globalAlpha = w.l * .95; k.fillStyle = w.col || sc.p.acc; k.fillRect(w.x, w.y, w.w, w.h); k.globalCompositeOperation = "lighter"; spr(k, sprite("alone", w.col || sc.p.acc), w.x + w.w / 2, w.y + w.h / 2, Math.max(w.w, w.h) * 1.6, .35 * w.l); }
          }
          if(w.tv && w.l > .5){ const f = .5 + .5 * Math.sin(t * 7.3 + w.x) * Math.sin(t * 3.1 + w.y); k.globalCompositeOperation = "lighter"; k.globalAlpha = .45 * f * w.l; k.fillStyle = "#8ac8ff"; k.fillRect(w.x, w.y, w.w, w.h); }
          if(w.sagoma >= 0 && w.l > .5){ k.save(); k.beginPath(); k.rect(w.x, w.y, w.w, w.h); k.clip(); const u = w.dir > 0 ? w.sagoma : 1 - w.sagoma, cx = lerp(w.x - w.w * .4, w.x + w.w * 1.4, u), hh = w.h; k.globalCompositeOperation = "source-over"; k.globalAlpha = .75 * Math.sin(w.sagoma * Math.PI) + .2; k.fillStyle = "#140a04"; k.beginPath(); k.arc(cx, w.y + hh * .52, hh * .14, 0, TAU); k.fill(); k.beginPath(); k.moveTo(cx - hh * .3, w.y + hh); k.quadraticCurveTo(cx, w.y + hh * .55, cx + hh * .3, w.y + hh); k.fill(); k.restore(); }
          if(w.fantasma && w.l > .5){ const ff = Math.max(0, Math.sin((t - sc.t0) * .45)) ** 8; if(ff > .02){ k.globalCompositeOperation = "source-over"; k.globalAlpha = .7 * ff; k.fillStyle = "#0a0806"; k.beginPath(); k.ellipse(w.x + w.w / 2, w.y + w.h * .42, w.w * .16, w.h * .14, 0, 0, TAU); k.fill(); k.beginPath(); k.moveTo(w.x + w.w * .22, w.y + w.h); k.quadraticCurveTo(w.x + w.w / 2, w.y + w.h * .45, w.x + w.w * .78, w.y + w.h); k.fill(); } }
        }
        if(nTv) k.globalAlpha = 1;
      } };
  };
  EF.finestra.insieme = true;
  /* --- fiamme: candele, torce, lanterne --- */
  EF.fiamma = (sc, a, R) => {
    const n = rumore(sc.seed + Math.round(a.x * 7 + a.y)), s = a.s || 1, col = a.col || "#ffc04a", forma = a.forma || "torcia", r = a.r || 40;
    const sc2 = forma === "candela" ? .5 : forma === "lanterna" ? .35 : 1;
    return { z:a.strato,
      disegna(k, t){
        const fl = .78 + .22 * n(t * 6) + .1 * Math.sin(t * 23 + a.x), luce = r * (.95 + .12 * n(t * 3 + 9));
        k.globalCompositeOperation = "lighter";
        spr(k, sprite("alone", col), a.x, a.y, luce * (forma === "lanterna" ? 1 : 1.6), .38 * fl);
        if(forma !== "lanterna"){ const h = 22 * s * sc2 * (.85 + .3 * n(t * 9 + 3)), w = 7 * s * sc2 * (.9 + .2 * n(t * 7 + 5)), sway = 3 * s * sc2 * (n(t * 4 + 11) - .5); k.globalAlpha = .95; k.save(); k.translate(a.x + sway * .3, a.y + 4 * s * sc2); k.transform(1, 0, sway / h, 1, 0, 0); k.drawImage(sprite("fiamma", "#ff8a2a"), -w, -h * 1.5, w * 2, h * 2); k.restore(); }
        else spr(k, sprite("punto", "#fff6d8"), a.x, a.y, 10 * s * 6, .5 * fl);
      } };
  };
  /* --- luci (lampioni, lampadine, riflettori) che vibrano; le falene intorno --- */
  EF.luce = (sc, a, R) => {
    const n = rumore(sc.seed + Math.round(a.x * 13 + a.y * 3)), col = a.col || "#ffe6b0", r = a.r || 50, forma = a.forma;
    let guasto = 3 + R() * 9, tg = 9;
    const falene = a.falene ? Array.from({ length:3 }, () => ({ ph:R() * TAU, f:1.5 + R() * 2, rx:10 + R() * 22, ry:6 + R() * 14 })) : [];
    return { z:a.strato,
      passo(dt){ guasto -= dt; tg += dt; if(guasto <= 0 && forma === "lampione"){ tg = 0; guasto = 6 + R() * 12; } },
      disegna(k, t){
        let f = .86 + .14 * n(t * (forma === "riflettore" ? 1.5 : 4));
        if(tg < .5) f *= tg < .08 || (tg > .16 && tg < .22) ? .35 : 1;
        k.globalCompositeOperation = "lighter";
        spr(k, sprite("alone", col), a.x, a.y, r * 1.3, .32 * f);
        if(a.cono){ const g = k.createLinearGradient(0, a.y, 0, a.suolo); g.addColorStop(0, rgba(col, .1 * f)); g.addColorStop(1, rgba(col, 0)); k.fillStyle = g; k.beginPath(); k.moveTo(a.x - 8, a.y + 4); k.lineTo(a.x - a.cono, a.suolo); k.lineTo(a.x + a.cono, a.suolo); k.lineTo(a.x + 8, a.y + 4); k.closePath(); k.fill(); }
        if(a.fascio && forma === "riflettore"){ const [fx, fy, d] = a.fascio; k.globalAlpha = .1 + .05 * n(t * 2); const g = k.createLinearGradient(fx, fy, fx + d * 520, fy); g.addColorStop(0, rgba(col, 1)); g.addColorStop(1, rgba(col, 0)); k.fillStyle = g; k.beginPath(); k.moveTo(fx, fy - 6); k.lineTo(fx + d * 560, fy - 180); k.lineTo(fx + d * 560, fy + 260); k.closePath(); k.fill(); }
        if(falene.length){ k.globalCompositeOperation = "source-over"; k.fillStyle = "#2a2418"; k.globalAlpha = .8; for(const m of falene){ const x = a.x + Math.cos(t * m.f + m.ph) * m.rx + 3 * Math.sin(t * 13 + m.ph), y = a.y + 6 + Math.sin(t * m.f * 1.3 + m.ph) * m.ry, w = 2 + 1.3 * Math.abs(Math.sin(t * 30 + m.ph)); k.beginPath(); k.ellipse(x, y, w, 1.2, 0, 0, TAU); k.fill(); } }
      } };
  };
  /* --- faro che gira --- */
  EF.faro = (sc, a, R) => {
    const col = a.col || sc.p.glow, s = a.s || 1, per = a.per || 7;
    return { z:a.strato,
      disegna(k, t){
        const an = TAU * (t - sc.t0) / per + Math.PI * .85, c = Math.cos(an), facing = Math.max(0, Math.sin(an));
        const len = 520 * Math.abs(c) ** .55 * s, dir = c < 0 ? -1 : 1, w = 70 * s * (.45 + .55 * (1 - Math.abs(c)));
        k.globalCompositeOperation = "lighter";
        const g = k.createLinearGradient(a.x, a.y, a.x + dir * len, a.y); g.addColorStop(0, rgba(col, .5)); g.addColorStop(1, rgba(col, 0));
        k.fillStyle = g; k.beginPath(); k.moveTo(a.x, a.y - 3); k.lineTo(a.x + dir * len, a.y - w); k.lineTo(a.x + dir * len, a.y + w * .8); k.lineTo(a.x, a.y + 3); k.closePath(); k.fill();
        spr(k, sprite("alone", col), a.x, a.y, 30 * s + 90 * s * facing ** 6, .6 + .4 * facing ** 4);
        if(facing > .9) spr(k, sprite("stella", col), a.x, a.y, 60 * s * (facing - .9) * 10, .8);
      } };
  };
  /* --- fasci di luce fermi: respirano, e la polvere ci galleggia dentro (o spazzano il cielo) --- */
  EF.fascio = (sc, a, R) => {
    const col = a.col || "#ffffff", al = a.a || .4, muove = a.muove || 0;
    const P = Array.from({ length:a.polvere === 0 ? 0 : 22 }, () => ({ u:R(), v:R() - .5, ph:R() * TAU }));
    return { z:a.strato,
      disegna(k, t){
        const tt = t - sc.t0, sw = muove ? Math.sin(tt * (a.vel || .5) + a.x1 * .013) * muove * Math.PI / 180 : 0;
        let x2 = a.x2, y2 = a.y2;
        if(sw){ const dx = x2 - a.x1, dy = y2 - a.y1, co = Math.cos(sw), si = Math.sin(sw); x2 = a.x1 + dx * co - dy * si; y2 = a.y1 + dx * si + dy * co; }
        const br = .82 + .18 * Math.sin(tt * .8 + a.x1);
        const g = k.createLinearGradient(a.x1, a.y1, x2, y2); g.addColorStop(0, rgba(col, al * br)); g.addColorStop(1, rgba(col, 0));
        const dx = x2 - a.x1, dy = y2 - a.y1, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l;
        k.globalCompositeOperation = "lighter"; k.fillStyle = g; k.beginPath(); k.moveTo(a.x1 + nx * a.w1, a.y1 + ny * a.w1); k.lineTo(x2 + nx * a.w2, y2 + ny * a.w2); k.lineTo(x2 - nx * a.w2, y2 - ny * a.w2); k.lineTo(a.x1 - nx * a.w1, a.y1 - ny * a.w1); k.closePath(); k.fill();
        if(a.perno) spr(k, sprite("alone", col), a.x1, a.y1, 50, .7);
        const im = sprite("morbido", col);
        for(const d of P){ const u = fr(d.u + tt * .02), w = lerp(a.w1, a.w2, u), x = lerp(a.x1, x2, u) + nx * w * d.v * 1.5, y = lerp(a.y1, y2, u) + ny * w * d.v * 1.5; spr(k, im, x + 3 * Math.sin(tt + d.ph), y, 1.5, .55 * (1 - u) * (.5 + .5 * Math.sin(tt * 1.7 + d.ph))); }
      } };
  };
  /* --- insegne al neon e luminose: ronzano e ogni tanto sfarfallano --- */
  EF.neon = (sc, a, R) => {
    const col = a.col || sc.p.acc;
    let ev = 3 + R() * 6, tv = 9;
    return { z:a.strato,
      passo(dt){ ev -= dt; tv += dt; if(ev <= 0){ tv = 0; ev = 4 + R() * 9; } },
      disegna(k, t){
        let f = .9 + .1 * Math.sin(t * 50) * Math.sin(t * 7.1);
        if(tv < .6) f = (tv < .07 || (tv > .14 && tv < .2) || (tv > .3 && tv < .34)) ? .25 : 1;
        k.globalCompositeOperation = "lighter";
        spr(k, sprite("alone", col), a.x + a.w / 2, a.y + a.h / 2, Math.max(a.w, a.h) * .75, .22 * f);
        if(f < .5){ k.globalCompositeOperation = "source-over"; k.globalAlpha = .45; k.fillStyle = "#0a0806"; k.fillRect(a.x + a.w * .08, a.y + a.h * .12, a.w * .84, a.h * .76); }
      } };
  };
  /* --- acqua: scintille sulla scia della luce e increspature che scorrono --- */
  EF.acqua = (sc, a, R) => {
    const gc = a.gc || sc.p.glow, y0 = a.y0, y1 = a.y1 || 900, lx = a.lx == null ? 300 : a.lx, n = a.n || 46;
    const S = Array.from({ length:n }, () => ({ t:R() * 2, v:.7 + R() * 1.2, x:0, y:0, l:0, colonna:R() < .7 }));
    const nuova = p => { const y = lerp(y0 + 4, y1, R() ** 1.7), d = (y - y0) / (y1 - y0 + 1); p.y = y; p.x = p.colonna ? lx + (R() - .5) * (30 + d * 260) : R() * 600; p.l = 3 + d * 26 * (.4 + R()); p.t = 0; p.v = .6 + R() * 1.1; };
    S.forEach(p => { nuova(p); p.t = R() * p.v; });
    const W2 = Array.from({ length:7 }, (_, i) => ({ y:y0 + 8 + i * i * (y1 - y0) / 52, ph:R() * TAU }));
    return { z:a.strato,
      passo(dt){ for(const p of S){ p.t += dt; if(p.t > p.v) nuova(p); } },
      disegna(k, t){
        k.globalCompositeOperation = "lighter"; k.lineCap = "round";
        const N = quanti(sc, S.length);
        for(let i = 0; i < N; i++){ const p = S[i], u = p.t / p.v, al = Math.sin(u * Math.PI) * (a.ga || .55) * (p.colonna ? 1 : .45); k.strokeStyle = rgba(gc, al); k.lineWidth = 1 + (p.y - y0) / 260; k.beginPath(); k.moveTo(p.x - p.l / 2, p.y); k.lineTo(p.x + p.l / 2, p.y); k.stroke(); }
        k.lineWidth = 1;
        for(const w of W2){ const dx = (t * (a.onde ? 26 : 12) + w.ph * 50) % 150; k.strokeStyle = rgba("#ffffff", a.onde ? .1 : .05); k.beginPath(); for(let x = -150 + dx; x < 620; x += 150){ k.moveTo(x, w.y); k.quadraticCurveTo(x + 37, w.y - 3 - (a.onde ? 4 : 0), x + 75, w.y); k.quadraticCurveTo(x + 112, w.y + 3, x + 150, w.y); } k.stroke(); }
      } };
  };
  /* --- lava che pulsa lungo le colate, il cratere che respira --- */
  EF.lava = (sc, a, R) => {
    const pts = a.pts, lens = [0];
    for(let i = 1; i < pts.length; i++) lens.push(lens[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const tot = lens[lens.length - 1] || 1, at = d => { let i = 1; while(i < lens.length - 1 && lens[i] < d) i++; const u = (d - lens[i - 1]) / ((lens[i] - lens[i - 1]) || 1); return [lerp(pts[i - 1][0], pts[i][0], u), lerp(pts[i - 1][1], pts[i][1], u)]; };
    const B = Array.from({ length:4 }, () => ({ d:R() * tot, v:18 + R() * 22 }));
    return { z:a.strato,
      passo(dt){ for(const b of B){ b.d += b.v * dt; if(b.d > tot) b.d = 0; } },
      disegna(k, t){ k.globalCompositeOperation = "lighter"; for(const b of B){ const [x, y] = at(b.d), f = Math.sin(b.d / tot * Math.PI); spr(k, sprite("alone", "#ff7a2a"), x, y, 22 * (a.w || 3) / 3.4, .5 * f); spr(k, sprite("punto", "#ffe08a"), x, y, 6, .8 * f); } } };
  };
  EF.cratere = (sc, a, R) => {
    let sp = 2;
    const E = [];
    return { z:a.strato,
      passo(dt){ sp -= dt; if(sp <= 0){ sp = 1.2 + R() * 2.5; for(let i = 0; i < 6 + R() * 8; i++) E.push({ x:a.x + (R() - .5) * a.r, y:a.y, vx:(R() - .5) * 70, vy:-60 - R() * 110, t:0, v:1 + R() * 1.2 }); } for(let i = E.length - 1; i >= 0; i--){ const e = E[i]; e.t += dt; e.vy += 140 * dt; e.x += e.vx * dt; e.y += e.vy * dt; if(e.t > e.v) E.splice(i, 1); } },
      disegna(k, t){ k.globalCompositeOperation = "lighter"; spr(k, sprite("alone", "#ff8a3a"), a.x, a.y, a.r * 2.3 * (1 + .1 * Math.sin(t * 1.7)), .35 + .1 * Math.sin(t * 2.3)); for(const e of E) spr(k, sprite("punto", "#ffb347"), e.x, e.y, 4, 1 - e.t / e.v); } };
  };
  /* --- fumo che sale da comignoli, fumaioli, crateri e fuochi --- */
  EF.fumo = (sc, a, R) => {
    const col = a.col || "#8a807a", r0 = a.r || 14, forza = a.forza || 1, vento = (sc.reg.ventoFumo != null ? sc.reg.ventoFumo : 10) * (a.lento ? .5 : 1), im = sprite("sbuffo", col);
    const P = [], rate = (a.lento ? 1.4 : 2.6) * Math.max(.5, forza);
    let acc = 0;
    return { z:a.strato,
      passo(dt){ acc += dt * rate; while(acc > 1){ acc -= 1; P.push({ x:a.x + (R() - .5) * r0 * .5, y:a.y, r:r0 * (.8 + R() * .5), t:0, vita:(a.lento ? 7 : 4.5) * (.8 + R() * .5) * Math.sqrt(forza), vx:vento * (.6 + R() * .8), vy:-(16 + R() * 14) * Math.sqrt(forza) * (a.lento ? .6 : 1), rot:R() * TAU }); } for(let i = P.length - 1; i >= 0; i--){ const p = P[i]; p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy *= .995; p.r += r0 * .9 * dt * (a.lento ? .7 : 1); if(p.t > p.vita) P.splice(i, 1); } },
      disegna(k){ k.globalCompositeOperation = "source-over"; for(const p of P){ const u = p.t / p.vita, al = (u < .15 ? u / .15 : 1 - (u - .15) / .85) * (a.scuro ? .55 : .42); k.globalAlpha = al; k.drawImage(im, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2); } } };
  };
  EF.vapore = (sc, a, R) => EF.fumo(sc, Object.assign({ col:"#ffffff", r:a.r || 6, forza:.5 }, a), R);
  /* --- luci di posizione che lampeggiano --- */
  EF.blink = (sc, list, R) => ({ z:list[0].strato,
    disegna(k, t){ k.globalCompositeOperation = "lighter"; for(const b of list){ const per = b.per || 1.5, u = fr((t + (b.x * .013 + b.y * .007)) / per), on = b.on || .14; if(u > on) continue; const f = Math.sin(u / on * Math.PI); spr(k, sprite("alone", b.col || "#ff4a3a"), b.x, b.y, (b.r || 3) * 7, .8 * f); spr(k, sprite("punto", b.col || "#ff4a3a"), b.x, b.y, (b.r || 3) * 1.6, f); } } });
  EF.blink.insieme = true;
  /* --- occhi che brillano e sbattono --- */
  EF.occhi = (sc, a, R) => {
    let ch = 2 + R() * 4, tc = 9;
    return { z:a.strato,
      passo(dt){ ch -= dt; tc += dt; if(ch <= 0){ tc = 0; ch = (a.lento ? 4 : 2.5) + R() * 5; } },
      disegna(k, t){ const chiuso = tc < .12; k.globalCompositeOperation = "lighter"; for(const [x, y] of a.pts){ if(chiuso){ k.globalCompositeOperation = "source-over"; k.globalAlpha = 1; k.fillStyle = a.buio || "#000000"; k.beginPath(); k.arc(x, y, a.r * 1.3, 0, TAU); k.fill(); k.globalCompositeOperation = "lighter"; continue; } spr(k, sprite("alone", a.col), x, y, a.r * 5, .3 + .15 * Math.sin(t * 2.2)); } } };
  };
  /* --- lucine e luminarie: scintillano e le onde di luce corrono --- */
  EF.lucine = (sc, a, R) => {
    const col = a.col || "#ffd27a", pts = a.pts, r = a.r || 3;
    const ph = pts.map(() => R() * TAU);
    return { z:a.strato,
      disegna(k, t){
        k.globalCompositeOperation = "lighter";
        const im = sprite("alone", col), pt = sprite("punto", "#fff6d8"), N = quanti(sc, pts.length);
        for(let i = 0; i < N; i++){
          const [x, y, s2] = pts[i];
          let b;
          if(a.candele) b = .5 + .5 * Math.sin(t * (3 + (i % 7)) + ph[i]);
          else if(a.centro) b = .5 + .5 * Math.sin((s2 != null ? s2 * 2.2 : 0) - t * 3.2 + (a.arco || 0) * 1.3);
          else b = .5 + .5 * Math.sin(i * .8 - t * 3);
          if(b < .55) continue;
          spr(k, im, x, y, r * 4.5, .35 * (b - .5) * 2);
          if(b > .85) spr(k, pt, x, y, r * 1.4, (b - .85) * 6);
        }
      } };
  };
  /* --- bandiera che sventola --- */
  EF.bandiera = (sc, a, R) => {
    const cols = a.colori || ["#c41e2a"], n = 22;
    if(a.w) return { z:a.strato,
      disegna(k, t){
        const tt = t * 5.2, m = 10, W2 = a.w, H2 = a.h;
        const Y = u => Math.sin(u * 6 - tt) * H2 * .09 * u + Math.sin(u * 2.7 - tt * .8) * H2 * .05 * u;
        for(let i = 0; i < m; i++){ const u0 = i / m, u1 = (i + 1) / m, sl = (Y(u1) - Y(u0)) * m / W2; k.fillStyle = mescola(cols[Math.min(cols.length - 1, Math.floor(u0 * cols.length))], sl > 0 ? "#000000" : "#ffffff", Math.min(.35, Math.abs(sl) * 3)); k.globalAlpha = 1; k.beginPath(); k.moveTo(a.x + u0 * W2, a.y + Y(u0)); k.lineTo(a.x + u1 * W2 + .5, a.y + Y(u1)); k.lineTo(a.x + u1 * W2 + .5, a.y + H2 + Y(u1) - u1 * 3); k.lineTo(a.x + u0 * W2, a.y + H2 + Y(u0) - u0 * 3); k.closePath(); k.fill(); }
      } };
    return { z:a.strato,
      disegna(k, t){
        k.save(); k.translate(a.x, a.y); k.scale(a.flip ? -a.s : a.s, a.s);
        const tt = t * 4.2;
        const Y = (u, base) => base + Math.sin(u * 7.5 - tt) * 9 * u + Math.sin(u * 3.1 - tt * .7) * 4 * u;
        for(let i = 0; i < n; i++){
          const u0 = i / n, u1 = (i + 1) / n, x0 = u0 * 205, x1 = u1 * 205 + .6;
          const ci = Math.min(cols.length - 1, Math.floor(u0 * cols.length)), sl = (Y(u1, 0) - Y(u0, 0)) / (x1 - x0);
          k.fillStyle = mescola(cols[ci], sl > 0 ? "#000000" : "#ffffff", Math.min(.4, Math.abs(sl) * 1.8));
          k.globalAlpha = 1;
          k.beginPath(); k.moveTo(x0, Y(u0, -262)); k.lineTo(x1, Y(u1, -262)); k.lineTo(x1, Y(u1, -186) - u1 * 6); k.lineTo(x0, Y(u0, -186) - u0 * 6); k.closePath(); k.fill();
        }
        k.restore();
      } };
  };
  /* --- palloncini che dondolano --- */
  EF.palloncini = (sc, a, R) => {
    const B = a.pos.map(([x, y, col, tx]) => ({ x, y, col, tx, ph:R() * TAU, f:.5 + R() * .4 }));
    return { z:a.strato,
      disegna(k, t){
        for(const b of B){
          const dx = 7 * Math.sin(t * b.f + b.ph), dy = 5 * Math.sin(t * b.f * 1.3 + b.ph), x = b.x + dx, y = b.y + dy;
          k.globalAlpha = .6; k.strokeStyle = "#e8e0d0"; k.lineWidth = 1.4; k.beginPath(); k.moveTo(x, y + 44); k.quadraticCurveTo(x - dx * 2 + 12 * Math.sin(t * 1.3 + b.ph), y + 120, b.x + 4 * Math.sin(t * .7 + b.ph), b.y + 214); k.stroke();
          k.globalAlpha = 1; k.save(); k.translate(x, y); k.rotate(dx * .012);
          const g = k.createRadialGradient(-10, -12, 2, 0, 0, 44); g.addColorStop(0, "rgba(255,255,255,.9)"); g.addColorStop(.25, b.col); g.addColorStop(1, mescola(b.col, "#000000", .25)); k.fillStyle = g; k.beginPath(); k.ellipse(0, 0, 34, 42, 0, 0, TAU); k.fill();
          k.fillStyle = b.col; k.beginPath(); k.moveTo(-5, 42); k.lineTo(0, 50); k.lineTo(5, 42); k.fill();
          if(b.tx){ k.fillStyle = "rgba(255,255,255,.92)"; k.font = "700 40px Georgia, serif"; k.textAlign = "center"; k.fillText(b.tx, 0, 14); }
          k.restore();
        }
      } };
  };
  /* --- meteore che rigano il cielo --- */
  EF.meteora = (sc, a, R) => {
    const col = a.col || "#ffe6a8", per = 3.2 + R() * 2, dur = 1.1;
    return { z:a.strato,
      disegna(k, t){
        const u = sc.statico ? .78 : fr((t + 1.4) / per) * per / dur;
        if(u > 1.25) return;
        const p = Math.min(u, 1), x = lerp(a.x1, a.x2, p), y = lerp(a.y1, a.y2, p), cx = lerp(a.x1, a.x2, Math.max(0, p - .35)), cy = lerp(a.y1, a.y2, Math.max(0, p - .35)), fade = u > 1 ? 1 - (u - 1) / .25 : 1;
        k.globalCompositeOperation = "lighter";
        const g = k.createLinearGradient(cx, cy, x, y); g.addColorStop(0, rgba(col, 0)); g.addColorStop(1, rgba(col, .95 * fade)); k.strokeStyle = g; k.lineCap = "round"; k.lineWidth = a.w || 5; k.beginPath(); k.moveTo(cx, cy); k.lineTo(x, y); k.stroke();
        spr(k, sprite("alone", col), x, y, (a.w || 5) * 14, .6 * fade); spr(k, sprite("punto", "#fffbe8"), x, y, (a.w || 5) * 2.4, fade);
      } };
  };
  /* --- il puntino del cecchino --- */
  EF.mirino = (sc, a, R) => {
    const n1 = rumore(sc.seed + 5), n2 = rumore(sc.seed + 9), col = a.col || "#ff2a2a";
    return { z:a.strato,
      disegna(k, t){
        const x = a.x2 + (n1(t * 1.3) - .5) * 14, y = a.y2 + (n2(t * 1.1) - .5) * 12, pulsa = .8 + .2 * Math.sin(t * 9);
        k.globalCompositeOperation = "lighter"; k.lineCap = "round";
        k.strokeStyle = col; k.globalAlpha = .3; k.lineWidth = 4; k.beginPath(); k.moveTo(a.x1, a.y1); k.lineTo(x, y); k.stroke();
        k.globalAlpha = .85; k.lineWidth = 1.2; k.stroke();
        spr(k, sprite("alone", col), x, y, 32 * pulsa, .75); spr(k, sprite("punto", "#ffffff"), x, y, 5, 1);
      } };
  };
  /* --- elicottero: il faro cerca, il rotore gira --- */
  EF.elicottero = (sc, a, R) => ({ z:a.strato,
    disegna(k, t){
      k.globalCompositeOperation = "lighter";
      if(a.luce){ const sw = Math.sin(t * .6) * 120 + Math.sin(t * 1.7) * 30, bx = a.x + sw, by = a.y + a.h * .95 * (a.s || 1), w = 120 * (a.s || 1); const g = k.createLinearGradient(a.x, a.y, bx, by); g.addColorStop(0, rgba(a.col, .5)); g.addColorStop(1, rgba(a.col, 0)); k.fillStyle = g; k.beginPath(); k.moveTo(a.x - 4, a.y); k.lineTo(bx - w, by); k.lineTo(bx + w, by); k.lineTo(a.x + 4, a.y); k.closePath(); k.fill(); k.save(); k.translate(bx, by - 20); k.scale(1, .25); spr(k, sprite("alone", a.col), 0, 0, w * 1.4, .35); k.restore(); }
      spr(k, sprite("alone", "#ffffff"), a.x, a.y, 22, .8);
      k.globalCompositeOperation = "source-over"; k.strokeStyle = "rgba(20,24,30,.5)"; k.lineCap = "round";
      for(let i = 0; i < 3; i++){ const an = t * 28 + i * TAU / 3, l = a.rl * Math.abs(Math.cos(an)); k.lineWidth = 2.2; k.globalAlpha = .35; k.beginPath(); k.moveTo(a.rx - l, a.ry); k.lineTo(a.rx + l, a.ry); k.stroke(); }
      const u = fr(t / 1.1); if(u < .12){ k.globalCompositeOperation = "lighter"; spr(k, sprite("alone", "#ff3a3a"), a.bx, a.by, 14, .9); }
    } });
  /* --- tesseratto che gira in quattro dimensioni --- */
  EF.tesseratto = (sc, a, R) => {
    const V = []; for(let i = 0; i < 16; i++) V.push([(i & 1) ? 1 : -1, (i & 2) ? 1 : -1, (i & 4) ? 1 : -1, (i & 8) ? 1 : -1]);
    const E = []; for(let i = 0; i < 16; i++) for(let j = i + 1; j < 16; j++){ let d = 0; for(let q = 0; q < 4; q++) if(V[i][q] !== V[j][q]) d++; if(d === 1) E.push([i, j]); }
    const col = a.col || sc.p.acc;
    return { z:a.strato,
      disegna(k, t){
        const a1 = t * .45, a2 = t * .31, a3 = .5 + t * .18, c1 = Math.cos(a1), s1 = Math.sin(a1), c2 = Math.cos(a2), s2 = Math.sin(a2), c3 = Math.cos(a3), s3 = Math.sin(a3);
        const P = V.map(([x, y, z, w]) => { let x1 = x * c1 - w * s1, w1 = x * s1 + w * c1, y1 = y * c2 - w1 * s2, w2 = y * s2 + w1 * c2; const p4 = 2.4 / (3 - w2); let X = x1 * p4, Y = y1 * p4, Z = z * p4; const X2 = X * c3 + Z * s3, Z2 = -X * s3 + Z * c3, p3 = 3.2 / (4.5 - Z2); return [a.x + X2 * p3 * a.r * .55, a.y + Y * p3 * a.r * .55]; });
        k.globalCompositeOperation = "lighter"; k.lineCap = "round"; k.strokeStyle = col;
        k.globalAlpha = .14; k.lineWidth = 7; k.beginPath(); for(const [i, j] of E){ k.moveTo(P[i][0], P[i][1]); k.lineTo(P[j][0], P[j][1]); } k.stroke();
        k.globalAlpha = .8; k.lineWidth = 1.8; k.stroke();
        const pt = sprite("punto", col); for(const p of P) spr(k, pt, p[0], p[1], 5, .9);
      } };
  };
  /* --- ologramma: righe che scorrono e un tremolio --- */
  EF.ologramma = (sc, a, R) => {
    let gl = 3;
    return { z:a.strato, passo(dt){ gl -= dt; if(gl < -.25) gl = 2 + R() * 4; },
      disegna(k, t){
        const y = a.y - a.h / 2 + fr(t / 2.2) * a.h;
        k.globalCompositeOperation = "lighter";
        const g = k.createLinearGradient(0, y - 14, 0, y + 14); g.addColorStop(0, rgba(a.col, 0)); g.addColorStop(.5, rgba(a.col, .35)); g.addColorStop(1, rgba(a.col, 0)); k.fillStyle = g; k.fillRect(a.x - a.w / 2, y - 14, a.w, 28);
        k.globalAlpha = .08 + .06 * Math.sin(t * 31); k.fillStyle = a.col; k.fillRect(a.x - a.w / 2, a.y - a.h / 2, a.w, a.h);
        if(gl < 0){ k.globalAlpha = .4; k.fillRect(a.x - a.w / 2 + (R() - .5) * 20, a.y - a.h / 2 + R() * a.h, a.w, 3 + R() * 6); }
      } };
  };
  /* --- stelle che scintillano e stelle cadenti --- */
  EF.stelle = (sc, a, R) => {
    const pts = a.pts || Array.from({ length:a.n || 30 }, () => [R() * 600, lerp(a.y0 || 20, a.y1 || 380, R() ** 1.4), .8 + R() * 1.4]), ph = pts.map(() => R() * TAU), per = pts.map(() => 2 + R() * 5);
    let cad = sc.statico ? 99 : 2 + R() * 6, ct = 9, cx = 0, cy = 0, cd = 1;
    return { z:a.strato,
      passo(dt){ cad -= dt; ct += dt; if(cad <= 0){ ct = 0; cx = 60 + R() * 480; cy = 30 + R() * Math.max(60, (sc.hor - 200) * .6); cd = R() < .5 ? -1 : 1; cad = 6 + R() * 9; } },
      disegna(k, t){
        k.globalCompositeOperation = "lighter";
        const im = sprite("stella", "#ffffff"), N = quanti(sc, pts.length);
        for(let i = 0; i < N; i++){ const b = Math.sin(TAU * t / per[i] + ph[i]); if(b < .55) continue; const [x, y, r] = pts[i]; spr(k, im, x, y, (r || 1.2) * 7 * (b - .5) * 2, (b - .55) * 2.2); }
        if(ct < .9){ const u = ct / .9, l = 90, x = cx + cd * u * 220, y = cy + u * 90, g = k.createLinearGradient(x - cd * l, y - l * .4, x, y); g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(1, `rgba(255,255,255,${.9 * Math.sin(u * Math.PI)})`); k.strokeStyle = g; k.lineWidth = 1.6; k.lineCap = "round"; k.beginPath(); k.moveTo(x - cd * l, y - l * .4); k.lineTo(x, y); k.stroke(); }
      } };
  };
  /* --- l'ombrello: gocce che rimbalzano e colano dal bordo --- */
  EF.ombrello = (sc, a, R) => {
    if(!(sc.meta.anim || []).some(q => q.tipo === "fx" && q.nome === "pioggia")) return null;
    const G2 = [];
    return { z:a.strato,
      passo(dt){ if(R() < dt * 9){ const u = R() < .5 ? -1 : 1; G2.push({ x:a.x + u * a.w * (.55 + R() * .45), y:a.bordo, vy:10, t:0 }); } if(R() < dt * 16) G2.push({ x:a.x + (R() - .5) * a.w * 1.6, y:a.y + 6 + R() * 10, vy:-40 - R() * 30, vx:(R() - .5) * 60, t:0, schizzo:true }); for(let i = G2.length - 1; i >= 0; i--){ const g = G2[i]; g.t += dt; g.vy += 900 * dt; g.y += g.vy * dt; if(g.vx) g.x += g.vx * dt; if(g.t > (g.schizzo ? .18 : .7)) G2.splice(i, 1); } },
      disegna(k){ k.strokeStyle = "rgba(220,235,255,.75)"; k.lineCap = "round"; k.lineWidth = 1.1; k.beginPath(); for(const g of G2){ k.moveTo(g.x, g.y); k.lineTo(g.x - (g.vx || 0) * .02, g.y - Math.min(10, Math.abs(g.vy) * .018)); } k.stroke(); } };
  };
  /* --- il fumo della sigaretta --- */
  EF.sigaretta = (sc, a, R) => ({ z:a.strato,
    disegna(k, t){
      k.globalCompositeOperation = "lighter"; spr(k, sprite("alone", "#ffb347"), a.x, a.y, 6 + 2 * Math.sin(t * 3), .5 + .3 * Math.sin(t * 2.2));
      k.globalCompositeOperation = "source-over"; k.lineCap = "round";
      for(let f = 0; f < 2; f++){ k.beginPath(); let x = a.x, y = a.y - 2; k.moveTo(x, y); for(let i = 1; i < 26; i++){ y -= 3.2; x = a.x + Math.sin(i * .35 - t * 2.2 + f * 2) * i * .55 + i * .25; k.lineTo(x, y); } k.strokeStyle = `rgba(220,215,205,${.16 - f * .05})`; k.lineWidth = 2.2 + f * 2; k.stroke(); }
    } });
  /* --- il luccichio di un gioiello --- */
  EF.brillio = (sc, a, R) => ({ z:a.strato, disegna(k, t){ const u = fr((t + a.x * .01) / 3.4); if(u > .18) return; k.globalCompositeOperation = "lighter"; spr(k, sprite("stella", "#fff6d0"), a.x, a.y, 14 * Math.sin(u / .18 * Math.PI) + 2, .95); } });
  /* --- bobine della macchina da presa che girano --- */
  EF.bobina = (sc, a, R) => ({ z:a.strato,
    disegna(k, t){ k.strokeStyle = a.col || "#8a8070"; k.lineWidth = 1.6; k.globalAlpha = .85; k.lineCap = "round"; k.beginPath(); for(let i = 0; i < 6; i++){ const an = t * 2.4 + i * TAU / 6; k.moveTo(a.x, a.y); k.lineTo(a.x + Math.cos(an) * a.r, a.y + Math.sin(an) * a.r); } k.stroke(); } });
  /* --- onde radio dalle parabole --- */
  EF.radio = (sc, a, R) => ({ z:a.strato,
    disegna(k, t){ k.globalCompositeOperation = "lighter"; k.strokeStyle = a.col; k.lineCap = "round"; for(let i = 0; i < 5; i++){ const u = fr(t / 2.6 + i / 5), r = a.r * (1 + u * 5); k.globalAlpha = .75 * (1 - u); k.lineWidth = 3 - u * 1.5; k.beginPath(); k.arc(a.x, a.y, r, Math.PI * 1.22, Math.PI * 1.78); k.stroke(); } } });
  /* --- buco nero: il disco gira e brilla --- */
  EF.buconero = (sc, a, R) => ({ z:a.strato,
    disegna(k, t){
      const s = a.s || 1;
      k.save(); k.translate(a.x, a.y); k.scale(s, s); k.globalCompositeOperation = "lighter";
      for(let i = 0; i < 18; i++){ const an = t * .9 + i / 18 * TAU, x = Math.cos(an) * 280, y = Math.sin(an) * 41, front = Math.sin(an) > 0, dop = .5 + .5 * Math.cos(an); if(Math.hypot(x, y * 2.6) < 112 && !front) continue; spr(k, sprite("alone", dop > .5 ? "#fff2d0" : "#ff9a4a"), x, y, 26, (.18 + .25 * dop) * (front ? 1 : .6)); }
      const f = .5 + .5 * Math.sin(t * 1.3); k.strokeStyle = `rgba(255,250,235,${.25 + .35 * f})`; k.lineWidth = 2.2; k.beginPath(); k.arc(0, 0, 111, 0, TAU); k.stroke();
      k.restore();
    } });
  /* --- pianeta: le bande scorrono --- */
  EF.pianeta = (sc, a, R) => ({ z:a.strato,
    disegna(k, t){ k.save(); k.beginPath(); k.arc(a.x, a.y, a.r, 0, TAU); k.clip(); k.globalCompositeOperation = "soft-light"; for(let i = 0; i < 6; i++){ const y = a.y - a.r + (i + .5) * a.r * 2 / 6, dx = ((t * (8 + i * 3)) % (a.r * 2)); k.globalAlpha = .35; k.fillStyle = i % 2 ? "#fff0d8" : "#6a3a1a"; k.beginPath(); k.ellipse(a.x - a.r + dx, y, a.r * .7, a.r * .05, 0, 0, TAU); k.fill(); k.beginPath(); k.ellipse(a.x - 3 * a.r + dx, y, a.r * .7, a.r * .05, 0, 0, TAU); k.fill(); } k.restore(); } });
  /* --- il rivelatore del laboratorio: anelli che girano --- */
  EF.rivelatore = (sc, a, R) => ({ z:a.strato,
    disegna(k, t){ k.globalCompositeOperation = "lighter"; k.strokeStyle = a.col; for(let i = 0; i < 4; i++){ k.save(); k.translate(a.x, a.y); k.rotate(t * (.2 + i * .12) * (i % 2 ? -1 : 1)); k.setLineDash([a.r * .1, a.r * .07]); k.globalAlpha = .4; k.lineWidth = 2.4 - i * .4; k.beginPath(); k.arc(0, 0, a.r * (.9 - i * .14), 0, TAU); k.stroke(); k.restore(); } k.setLineDash([]); spr(k, sprite("alone", a.col), a.x, a.y, a.r * .5 * (1 + .1 * Math.sin(t * 3)), .5 + .2 * Math.sin(t * 3)); } });
  /* --- l'ottagono di Castel del Monte: due scintille corrono sul bordo --- */
  EF.ottagono = (sc, a, R) => ({ z:a.strato,
    disegna(k, t){ k.globalCompositeOperation = "lighter"; const pt = q => { const u = fr(q) * 8, i = Math.floor(u), f2 = u - i, a1 = Math.PI / 8 + i * Math.PI / 4, a2 = a1 + Math.PI / 4; return [a.x + a.r * lerp(Math.cos(a1), Math.cos(a2), f2), a.y + a.r * lerp(Math.sin(a1), Math.sin(a2), f2)]; }; for(let j = 0; j < 2; j++){ for(let q = 0; q < 8; q++){ const [x, y] = pt(t / 11 + j * .5 - q * .006); spr(k, sprite("alone", a.col), x, y, 14 - q, .5 * (1 - q / 8)); } } for(let q = 0; q < 8; q++){ const an = Math.PI / 8 + q * Math.PI / 4, b = .5 + .5 * Math.sin(t * 1.5 - q * .8); spr(k, sprite("punto", a.col), a.x + a.r * .91 * Math.cos(an), a.y + a.r * .91 * Math.sin(an), 7, b * .8); } } });
  /* --- una porta da cui esce luce --- */
  EF.porta = (sc, a, R) => ({ z:a.strato, disegna(k, t){ const f = .8 + .2 * Math.sin(t * 1.3) + .08 * Math.sin(t * 17); k.globalCompositeOperation = "lighter"; spr(k, sprite("alone", a.col), a.x, a.y - a.h / 2, a.h * 1.1 * f, .32 * f); } });
  /* --- cristalli sull'Etna --- */
  EF.cristalli = (sc, a, R) => ({ z:a.strato, disegna(k, t){ k.globalCompositeOperation = "lighter"; spr(k, sprite("alone", a.col), a.x, a.y - 20 * a.s, 110 * a.s * (1 + .12 * Math.sin(t * 1.4)), .3 + .15 * Math.sin(t * 1.4)); for(let i = 0; i < 5; i++){ const u = fr(t / 2.4 + i / 5); if(u > .2) continue; spr(k, sprite("stella", "#ffffff"), a.x + (i - 2) * 16 * a.s, a.y - (40 + i * 7) * a.s, 12 * Math.sin(u / .2 * Math.PI), .9); } } });
  /* --- tribune: i flash dei fotografi --- */
  EF.tribune = (sc, a, R) => {
    const F = [];
    return { z:a.strato || a.z, passo(dt){ if(R() < dt * (a.freq || 14)) F.push({ x:lerp(a.x0, a.x1, R()), y:lerp(a.y0, a.y1, R()), t:0 }); for(let i = F.length - 1; i >= 0; i--){ F[i].t += dt; if(F[i].t > .12) F.splice(i, 1); } },
      disegna(k){ k.globalCompositeOperation = "lighter"; for(const f of F){ spr(k, sprite("alone", "#ffffff"), f.x, f.y, 18, 1 - f.t / .12); spr(k, sprite("punto", "#ffffff"), f.x, f.y, 3, 1); } } };
  };
  /* --- lo schermo del telefono: le visualizzazioni corrono --- */
  EF.schermo = (sc, a, R) => ({ z:a.strato,
    disegna(k, t){
      const tt = Math.max(0, t - sc.t0), v = 8.2 + Math.floor(tt * 1.6) * .1, txt = (v > 9.9 ? 9.9 : v).toFixed(1).replace(".", ",") + " M";
      k.save(); k.translate(a.x, a.y); k.rotate((a.rot || 8) * Math.PI / 180); k.scale(a.s, a.s);
      k.fillStyle = "#ffffff"; k.textAlign = "center"; k.font = "800 32px Inter, Roboto, Arial, sans-serif"; k.fillText(txt, 0, -70);
      const b = fr(tt / 1.6); if(b < .25){ const s = 1 + .35 * Math.sin(b / .25 * Math.PI); k.translate(0, -136); k.scale(s, s); k.fillStyle = "#ffffff"; k.fill(path("M-10 0Q-10 -14 0 -8Q10 -14 10 0Q10 10 0 18Q-10 10 -10 0Z")); }
      k.restore();
    } });
  /* --- la griglia al neon che corre verso di noi --- */
  EF.griglia = (sc, a, R) => ({ z:a.strato,
    disegna(k, t){ k.strokeStyle = a.col; k.lineCap = "butt"; const u = fr(t * .45); for(let i = 0; i < 10; i++){ const q = (i + u) / 10, y = a.hy + (900 - a.hy) * Math.pow(q, 1.8); k.globalAlpha = .55 * Math.min(1, q * 3); k.lineWidth = 1 + q * 1.2; k.beginPath(); k.moveTo(0, y); k.lineTo(600, y); k.stroke(); } } });
  /* --- auto volanti nella città del futuro --- */
  EF.veicoli = (sc, a, R) => {
    const cols = a.cols || ["#5ee1ff", "#ff4fd8", "#ffd36b"];
    const V = Array.from({ length:a.n || 9 }, () => ({ x:R() * 700 - 50, y:lerp(a.y0, a.y1, R()), v:(40 + R() * 120) * (R() < .5 ? -1 : 1), c:cols[Math.floor(R() * cols.length)], s:.5 + R() * .8 }));
    return { z:a.strato, passo(dt){ for(const v of V){ v.x += v.v * dt; if(v.x > 680) v.x = -80; if(v.x < -80) v.x = 680; } },
      disegna(k, t){ k.globalCompositeOperation = "lighter"; k.lineCap = "round"; for(const v of V){ const d = Math.sign(v.v); k.strokeStyle = rgba(v.c, .55); k.lineWidth = 1.6 * v.s; k.beginPath(); k.moveTo(v.x, v.y); k.lineTo(v.x - d * 40 * v.s, v.y + 1); k.stroke(); spr(k, sprite("punto", "#ffffff"), v.x, v.y, 3 * v.s, 1); if(fr(t * 1.5 + v.y) < .2) spr(k, sprite("alone", "#ff3a3a"), v.x - d * 10 * v.s, v.y - 3, 6, .9); } } };
  };
  /* --- fari di un'auto che si avvicina nella nebbia --- */
  EF.fari = (sc, a, R) => ({ z:a.strato,
    disegna(k, t){ const u = fr((t - sc.t0 + 3) / 9), f = u < .8 ? liscio(u / .8) : 1 - (u - .8) / .2, s = .7 + .5 * f; k.globalCompositeOperation = "lighter"; [-1, 1].forEach(d => { spr(k, sprite("alone", "#fff6d0"), a.x + d * a.d * s, a.y, 30 * s, .5 * f + .2); spr(k, sprite("punto", "#ffffff"), a.x + d * a.d * s, a.y, 5 * s, .6 + .4 * f); }); k.fillStyle = `rgba(255,246,208,${.1 * f})`; k.beginPath(); k.moveTo(a.x - a.d, a.y); k.lineTo(a.x - 240 * s, a.y + 220); k.lineTo(a.x + 240 * s, a.y + 220); k.lineTo(a.x + a.d, a.y); k.closePath(); k.fill(); } });
  /* --- fuochi e roghi: lingue di fuoco, scintille, luce che tremola --- */
  EF.fuoco = (sc, a, R) => {
    const n = rumore(sc.seed + Math.round(a.x)), S = [];
    return { z:a.strato,
      passo(dt){ if(R() < dt * 12) S.push({ x:a.x + (R() - .5) * a.w, y:a.y - a.h * .5, vx:(R() - .5) * 30, vy:-60 - R() * 80, t:0 }); for(let i = S.length - 1; i >= 0; i--){ const s = S[i]; s.t += dt; s.x += s.vx * dt; s.y += s.vy * dt; if(s.t > 1.4) S.splice(i, 1); } },
      disegna(k, t){
        const f = .8 + .2 * n(t * 5);
        k.globalCompositeOperation = "lighter";
        spr(k, sprite("alone", "#ff7a1a"), a.x, a.y - 20, 110 * f, .45 * f);
        for(let i = 0; i < 5; i++){ const x = a.x + (i - 2) * a.w * .32, h = a.h * (.7 + .5 * n(t * 7 + i * 3)) * (i === 2 ? 1.3 : .9), w = a.w * .3; k.save(); k.translate(x + 4 * (n(t * 3 + i) - .5), a.y + 2); k.transform(1, 0, (n(t * 4 + i * 5) - .5) * .4, 1, 0, 0); k.globalAlpha = .85; k.drawImage(sprite("fiamma", "#ff6a1a"), -w, -h * 1.3, w * 2, h * 1.5); k.restore(); }
        for(const s of S) spr(k, sprite("punto", "#ffcc66"), s.x, s.y, 3, 1 - s.t / 1.4);
      } };
  };
  /* --- torcia elettrica che cerca nel buio --- */
  EF.torcia = (sc, a, R) => ({ z:a.strato,
    disegna(k, t){ const sw = Math.sin(t * .7) * 50 + Math.sin(t * 1.9) * 14, x2 = a.x2 + sw, y2 = a.y2 + Math.sin(t * .5) * 20; const g = k.createLinearGradient(a.x, a.y, x2, y2); g.addColorStop(0, "rgba(255,246,216,.55)"); g.addColorStop(1, "rgba(255,246,216,0)"); k.globalCompositeOperation = "lighter"; k.fillStyle = g; const dx = x2 - a.x, dy = y2 - a.y, l = Math.hypot(dx, dy) || 1, nx = -dy / l * a.w, ny = dx / l * a.w; k.beginPath(); k.moveTo(a.x, a.y); k.lineTo(x2 + nx, y2 + ny); k.lineTo(x2 - nx, y2 - ny); k.closePath(); k.fill(); } });
  /* --- il raggio rosso del tripode --- */
  EF.raggio = (sc, a, R) => ({ z:a.strato,
    disegna(k, t){ const f = .75 + .25 * Math.sin(t * 9) * Math.sin(t * 2.3), sw = Math.sin(t * .4) * 40; const x2 = a.x2 + sw, g = k.createLinearGradient(a.x1, a.y1, x2, a.y2); g.addColorStop(0, rgba(a.col, .8 * f)); g.addColorStop(1, rgba(a.col, 0)); k.globalCompositeOperation = "lighter"; k.fillStyle = g; const dx = x2 - a.x1, dy = a.y2 - a.y1, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l; k.beginPath(); k.moveTo(a.x1, a.y1); k.lineTo(x2 + nx * a.w, a.y2 + ny * a.w); k.lineTo(x2 - nx * a.w, a.y2 - ny * a.w); k.closePath(); k.fill(); spr(k, sprite("alone", a.col), a.x1, a.y1, 50 * f, .9); spr(k, sprite("alone", a.col), x2, a.y2, 90, .3 * f); } });
  /* --- la stella al neon di Gela --- */
  EF.stella = (sc, a, R) => {
    let ev = 2, tv = 9;
    return { z:a.strato, passo(dt){ ev -= dt; tv += dt; if(ev <= 0){ tv = 0; ev = 3 + R() * 6; } },
      disegna(k, t){ let f = .85 + .15 * Math.sin(t * 40); if(tv < .5) f = tv < .06 || (tv > .12 && tv < .2) ? .2 : 1; k.globalCompositeOperation = "lighter"; spr(k, sprite("alone", a.col), a.x, a.y, a.r * 1.8, .3 * f); } };
  };
  /* --- streghe in volo davanti alla luna --- */
  EF.streghe = (sc, a, R) => {
    const S = a.pos.map(([x, y, s], i) => ({ x0:x, y0:y, s, v:(30 + R() * 30) * (i % 2 ? -1 : 1), ph:R() * TAU, x:x }));
    const col = a.col || "#050308";
    return { z:a.strato,
      passo(dt){ for(const q of S){ q.x += q.v * dt; if(q.x > 700) q.x = -100; if(q.x < -100) q.x = 700; } },
      disegna(k, t){ k.fillStyle = col; k.strokeStyle = col; k.globalAlpha = .95; for(const q of S){ k.save(); k.translate(q.x, q.y0 + 14 * Math.sin(t * .8 + q.ph)); k.rotate(-.14 + .05 * Math.sin(t * 1.3 + q.ph)); k.scale(q.v < 0 ? -q.s : q.s, q.s); k.lineWidth = 3; k.beginPath(); k.moveTo(-40, 6); k.lineTo(44, -4); k.stroke(); k.beginPath(); k.moveTo(34, -4); k.lineTo(58, -12); k.lineTo(56, 4); k.fill(); k.beginPath(); k.moveTo(-8, 2); k.lineTo(4, -30); k.lineTo(16, 2); k.fill(); k.beginPath(); k.arc(5, -34, 6, 0, TAU); k.fill(); k.beginPath(); k.moveTo(0, -38); k.lineTo(8, -60); k.lineTo(13, -37); k.fill(); k.beginPath(); k.moveTo(-6, -6); k.quadraticCurveTo(-26 - 6 * Math.sin(t * 6 + q.ph), -2, -30, 10); k.stroke(); k.restore(); } } };
  };
  /* --- il sole a strisce delle notti anni Ottanta: le strisce scendono --- */
  EF.soleRetro = (sc, a, R) => ({ z:a.strato,
    disegna(k, t){
      const u = fr((t - sc.t0) * .32);
      k.save(); k.beginPath(); k.arc(a.x, a.y, a.r + 1, 0, TAU); k.clip();
      k.fillStyle = a.col; k.globalAlpha = 1;
      for(let q = -1; q < 7; q++){ const kk = q + u; if(kk < 0) continue; const h = 3 + kk * 2.2, y = a.y + 12 + kk * 22; k.fillRect(a.x - a.r - 2, y, a.r * 2 + 4, Math.min(h, 22)); }
      k.restore();
    } });
  /* --- un bagliore che pulsa --- */
  EF.bagliore = (sc, a, R) => {
    const n = rumore(sc.seed + Math.round(a.x + a.y));
    return { z:a.strato, disegna(k, t){ const f = a.fuoco ? .7 + .3 * n(t * 6) : .75 + .25 * Math.sin(TAU * t / (a.ritmo || 2) + a.x); k.globalCompositeOperation = "lighter"; spr(k, sprite("alone", a.col), a.x, a.y, a.r * (.9 + .15 * f), .3 * f); } };
  };
  /* --- la visiera del casco: un riflesso che passa --- */
  EF.visiera = (sc, a, R) => ({ z:a.strato, disegna(k, t){ const u = fr(t / 4.5); if(u > .3) return; k.save(); k.beginPath(); k.arc(a.x, a.y, a.r, 0, TAU); k.clip(); const x = a.x - a.r + u / .3 * a.r * 2; const g = k.createLinearGradient(x - 10, a.y - a.r, x + 10, a.y + a.r); g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(.5, "rgba(255,255,255,.55)"); g.addColorStop(1, "rgba(255,255,255,0)"); k.globalCompositeOperation = "lighter"; k.fillStyle = g; k.fillRect(a.x - a.r, a.y - a.r, a.r * 2, a.r * 2); k.restore(); } });
  /* --- la vetrina: riflessi che tremolano sul marciapiede bagnato --- */
  EF.vetrina = (sc, a, R) => {
    const n = rumore(sc.seed + 77), S = Array.from({ length:10 }, () => ({ x:a.x + R() * a.w, w:3 + R() * 9, l:60 + R() * 160, ph:R() * TAU }));
    return { z:a.strato, disegna(k, t){ k.globalCompositeOperation = "lighter"; for(const s of S){ const f = .5 + .5 * Math.sin(t * 1.7 + s.ph) * n(t + s.ph); const g = k.createLinearGradient(0, a.suolo + 10, 0, a.suolo + 10 + s.l); g.addColorStop(0, rgba(a.col, .22 * f)); g.addColorStop(1, rgba(a.col, 0)); k.fillStyle = g; k.fillRect(s.x + 3 * Math.sin(t * 2 + s.ph), a.suolo + 10, s.w, s.l); } spr(k, sprite("alone", a.col), a.x + a.w / 2, a.y + a.h / 2, a.w * .55, .1 + .04 * Math.sin(t * 1.3)); } };
  };

  /* ---------- effetti della regia: vita intorno alla scena ---------- */
  /* --- uccelli in volo: stormi, gabbiani, corvi, rondini --- */
  EF.uccelli = (sc, a, R) => {
    const tipo = a.tipo || "stormo", col = a.col || (tipo === "gabbiani" ? "#e8e4dc" : "#120c10"), n = a.n || (tipo === "gabbiani" ? 4 : 7);
    const y0 = a.y0 || 120, y1 = a.y1 || Math.max(y0 + 60, sc.hor - 180), dir = a.dir || (R() < .5 ? 1 : -1);
    const nuovo = (b, inizio) => { b.x = inizio ? R() * 600 : (dir > 0 ? -60 - R() * 300 : 660 + R() * 300); b.y = lerp(y0, y1, R()); b.s = (tipo === "gabbiani" ? 1.6 : 1) * (.6 + R() * .7) * (a.k || 1); b.v = (tipo === "rondini" ? 110 : 40) * (.7 + R() * .6) * dir; b.ph = R() * TAU; b.f = (tipo === "gabbiani" ? 2.2 : tipo === "corvi" ? 4 : 5.5) * (.8 + R() * .4); return b; };
    const B = Array.from({ length:n }, () => nuovo({}, true));
    return { z:a.z || "cielo",
      passo(dt){ for(const b of B){ b.x += b.v * dt; b.y += Math.sin(b.ph + b.x * .01) * (tipo === "rondini" ? 40 : 6) * dt; if(b.x > 700 || b.x < -100) nuovo(b, false); } },
      disegna(k, t){ k.strokeStyle = col; k.lineCap = "round"; k.lineJoin = "round"; for(const b of B){ const ali = Math.sin(t * b.f + b.ph), plana = tipo === "gabbiani" && Math.sin(t * .4 + b.ph) > .3 ? .25 : 1, h = 6 * b.s * ali * plana, w = 9 * b.s; k.globalAlpha = tipo === "gabbiani" ? .9 : .8; k.lineWidth = 1.5 * b.s; k.beginPath(); k.moveTo(b.x - w, b.y - h); k.quadraticCurveTo(b.x - w * .45, b.y - h * .4 - 2 * b.s, b.x, b.y + b.s); k.quadraticCurveTo(b.x + w * .45, b.y - h * .4 - 2 * b.s, b.x + w, b.y - h); k.stroke(); } } };
  };
  /* --- uno stormo di storni che disegna figure nel cielo --- */
  EF.storni = (sc, a, R) => {
    const n = a.n || 160, cx = a.x || 360, cy = a.y || 200, col = a.col || "#140a0a";
    const P = Array.from({ length:n }, () => ({ a:R() * TAU, b:R() * TAU, r:R(), f:.4 + R() * .6 }));
    return { z:a.z || "cielo",
      disegna(k, t){ const tt = t * .25, X = cx + 90 * Math.sin(tt * 1.3) + 40 * Math.sin(tt * 3.1), Y = cy + 30 * Math.sin(tt * 1.7), sx = 120 + 70 * Math.sin(tt * 2.3), sy = 40 + 26 * Math.cos(tt * 1.9), rot = .5 * Math.sin(tt * 1.1), sz = a.dim || 2.6; k.fillStyle = col; k.globalAlpha = .8; const N = quanti(sc, P.length); k.beginPath(); for(let i = 0; i < N; i++){ const p = P[i], u = Math.cos(p.a + tt * p.f * 2) * p.r, v = Math.sin(p.b + tt * p.f * 1.6) * p.r, x = X + (u * Math.cos(rot) - v * Math.sin(rot)) * sx, y = Y + (u * Math.sin(rot) + v * Math.cos(rot)) * sy, ali = .55 + .45 * Math.abs(Math.sin(t * 9 + p.a * 7)); k.rect(x - sz * ali / 2, y - sz * .35, sz * ali, sz * .7); } k.fill(); } };
  };
  /* --- un rapace che gira in tondo --- */
  EF.falco = (sc, a, R) => {
    const cx = a.x || 420, cy = a.y || 170, rx = a.rx || 120, ry = a.ry || 36, col = a.col || "#140c08", s = a.s || 1.4;
    return { z:a.z || "cielo",
      disegna(k, t){ const an = t * .35 + (a.ph || 0), x = cx + Math.cos(an) * rx, y = cy + Math.sin(an) * ry, dir = -Math.sin(an) > 0 ? 1 : -1, batte = Math.sin(t * .9) > .6 ? Math.sin(t * 9) : .15; k.save(); k.translate(x, y); k.scale(dir * s, s); k.fillStyle = col; k.globalAlpha = .9; k.beginPath(); k.moveTo(-14, -batte * 7); k.quadraticCurveTo(-6, -4, 0, 0); k.quadraticCurveTo(6, -4, 14, -batte * 7); k.quadraticCurveTo(7, 0, 2, 3); k.lineTo(-2, 3); k.quadraticCurveTo(-7, 0, -14, -batte * 7); k.fill(); k.beginPath(); k.moveTo(-2, 2); k.lineTo(0, 8); k.lineTo(2, 2); k.fill(); k.restore(); } };
  };
  /* --- pipistrelli --- */
  EF.pipistrelli = (sc, a, R) => {
    const n = a.n || 5, col = a.col || "#06040a", ns = Array.from({ length:n }, (_, i) => [rumore(sc.seed + i * 11), rumore(sc.seed + i * 17)]);
    return { z:a.z || "cielo",
      disegna(k, t){ k.fillStyle = col; k.globalAlpha = .9; for(let i = 0; i < n; i++){ const [nx, ny] = ns[i], x = 40 + nx(t * .25 + i) * 520, y = 80 + ny(t * .3 + i * 2) * Math.max(120, sc.hor - 260), ali = Math.sin(t * 16 + i), s = .8 + (i % 3) * .3; k.save(); k.translate(x, y); k.scale(s, s); k.beginPath(); k.moveTo(0, 0); k.lineTo(-6, -4 * ali - 2); k.lineTo(-10, -1); k.lineTo(-13, -5 * ali); k.lineTo(-10, 2); k.lineTo(0, 3); k.lineTo(10, 2); k.lineTo(13, -5 * ali); k.lineTo(10, -1); k.lineTo(6, -4 * ali - 2); k.closePath(); k.fill(); k.restore(); } } };
  };
  /* --- fuochi d'artificio --- */
  EF.fuochi = (sc, a, R) => {
    const cols = a.cols || ["#ffd36b", "#ff7ab6", "#7fd4ff", "#a6f08f", "#ffffff", "#ff8a5a"], F = [];
    let prossimo = .5;
    const scoppia = f => { const n = 40 + Math.floor(R() * 30), c = cols[Math.floor(R() * cols.length)], c2 = cols[Math.floor(R() * cols.length)]; for(let i = 0; i < n; i++){ const an = i / n * TAU + R() * .1, v = 60 + R() * 70; F.push({ x:f.x, y:f.y, vx:Math.cos(an) * v, vy:Math.sin(an) * v, t:0, vita:1.4 + R() * .8, c:i % 3 ? c : c2, scia:true }); } };
    return { z:a.z || "cielo",
      passo(dt){ prossimo -= dt; if(prossimo <= 0){ prossimo = (a.ogni || 1.6) * (.6 + R() * .8); const base = a.base || sc.hor, alto = lerp(a.y0 || 90, a.y1 || Math.max(160, base - 260), R()), vita = .9 + R() * .4; F.push({ x:80 + R() * 440, y:base, vx:(R() - .5) * 30, vy:-(base - alto) / vita - 80 * vita, t:0, vita, razzo:true, c:"#fff2c8" }); }
        for(let i = F.length - 1; i >= 0; i--){ const f = F[i]; f.t += dt; if(f.razzo){ f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 160 * dt; if(f.t > f.vita){ scoppia(f); F.splice(i, 1); } } else { f.vx *= .985; f.vy = f.vy * .985 + 40 * dt; f.x += f.vx * dt; f.y += f.vy * dt; if(f.t > f.vita) F.splice(i, 1); } } },
      disegna(k, t){ k.globalCompositeOperation = "lighter"; const sz = a.dim || 3.4; for(const f of F){ const u = f.t / f.vita; if(f.razzo){ spr(k, sprite("punto", f.c), f.x, f.y, 4, .9); continue; } const al = (1 - u) * (u > .7 ? .6 + .4 * Math.sin(t * 40 + f.x) : 1); spr(k, sprite("punto", f.c), f.x, f.y, sz, al); if(u < .12) spr(k, sprite("alone", f.c), f.x, f.y, 14, .05); } } };
  };
  /* --- pesci che passano sott'acqua --- */
  EF.pesci = (sc, a, R) => {
    const P = Array.from({ length:a.n || 7 }, () => ({ x:R() * 600, y:lerp(a.y0 || 260, a.y1 || 760, R()), s:.5 + R() * .9, v:(14 + R() * 22) * (R() < .5 ? -1 : 1), ph:R() * TAU }));
    const col = a.col || "#06202a";
    return { z:a.z || "dietro", passo(dt){ for(const p of P){ p.x += p.v * dt; if(p.x > 660) p.x = -60; if(p.x < -60) p.x = 660; } },
      disegna(k, t){ k.fillStyle = col; k.globalAlpha = .75; for(const p of P){ const c = Math.sin(t * 6 + p.ph); k.save(); k.translate(p.x, p.y + 4 * Math.sin(t * .8 + p.ph)); k.scale(p.v > 0 ? p.s : -p.s, p.s); k.beginPath(); k.ellipse(0, 0, 18, 6, 0, 0, TAU); k.fill(); k.beginPath(); k.moveTo(-14, 0); k.lineTo(-26, -7 + c * 3); k.lineTo(-26, 7 + c * 3); k.closePath(); k.fill(); k.restore(); } } };
  };
  /* --- luce che danza sott'acqua --- */
  EF.caustiche = (sc, a, R) => {
    const y0 = a.y0 || 80, y1 = a.y1 || 820, n = a.n || 9, col = a.col || "#bff6ff";
    const fam = [.42, -.38, 1.35].map((an, j) => ({ an, L:Array.from({ length:n + j * 2 }, (_, i) => ({ o:(i + R() * .6) / (n + j * 2), ph:R() * TAU, f:.4 + R() * .5, am:7 + R() * 9 })) }));
    const cx = 300, cy = (y0 + y1) / 2, D = Math.hypot(600, y1 - y0) * .62;
    return { z:a.z || "dietro",
      disegna(k, t){
        k.save(); k.beginPath(); k.rect(0, y0, 600, y1 - y0); k.clip();
        k.globalCompositeOperation = "lighter"; k.strokeStyle = col; k.lineCap = "round"; k.lineJoin = "round";
        fam.forEach((F, j) => { const co = Math.cos(F.an), si = Math.sin(F.an); for(const l of F.L){ const off = (l.o - .5) * 2 * D; k.globalAlpha = (j === 2 ? .05 : .085) + .05 * Math.sin(t * .8 + l.ph); k.lineWidth = j === 2 ? 1.6 : 2.4; k.beginPath(); for(let q = -D; q <= D; q += 24){ const w = Math.sin(q * .028 + t * l.f + l.ph) * l.am + Math.sin(q * .067 - t * l.f * 1.3) * l.am * .45, x = cx + co * q - si * (off + w), y = cy + si * q + co * (off + w); q === -D ? k.moveTo(x, y) : k.lineTo(x, y); } k.stroke(); } });
        k.restore();
      } };
  };
  /* --- foglie e petali che cadono --- */
  function foglie(sc, a, R, cols, forma){
    const P = Array.from({ length:a.n || 12 }, () => ({ x:R() * 640 - 20, y:R() * 900, v:24 + R() * 30, am:16 + R() * 26, f:.5 + R() * .8, ph:R() * TAU, rot:R() * TAU, vr:(R() - .5) * 3, s:.6 + R() * .7, c:cols[Math.floor(R() * cols.length)] }));
    return { z:a.z || "fine", passo(dt){ for(const p of P){ p.y += p.v * dt; p.rot += p.vr * dt; if(p.y > 920){ p.y = -20; p.x = R() * 640 - 20; } } },
      disegna(k, t){ for(const p of P){ k.save(); k.translate(p.x + Math.sin(t * p.f + p.ph) * p.am, p.y); k.rotate(p.rot); k.scale(p.s * Math.cos(t * p.f * 2 + p.ph), p.s); k.globalAlpha = .9; k.fillStyle = p.c; k.fill(path(forma)); k.restore(); } } };
  }
  EF.foglie = (sc, a, R) => foglie(sc, a, R, a.cols || ["#c8702a", "#e0a040", "#a8401a", "#d8b050"], "M0 -8C6 -6 8 0 0 9C-8 0 -6 -6 0 -8Z");
  EF.petali = (sc, a, R) => foglie(sc, a, R, a.cols || ["#ffc8d8", "#ffe0ea", "#ffb0c8"], "M0 -5C4 -5 5 0 0 5C-5 0 -4 -5 0 -5Z");
  EF.cenere = (sc, a, R) => foglie(sc, Object.assign({ n:24 }, a), R, a.cols || ["#3a3430", "#5a524a", "#8a8278"], "M-2 -2L2 -1L1 2L-2 1Z");
  /* --- scintille di saldatura --- */
  EF.saldatura = (sc, a, R) => {
    const S = []; let on = 0, prossimo = 1;
    return { z:a.z || "fine",
      passo(dt){ prossimo -= dt; if(prossimo <= 0){ on = .8 + R() * 1.6; prossimo = on + 1 + R() * 2.5; } if(on > 0){ on -= dt; for(let i = 0; i < 3; i++) if(R() < dt * 40) S.push({ x:a.x, y:a.y, vx:(R() - .5) * 160, vy:-40 - R() * 100, t:0 }); } for(let i = S.length - 1; i >= 0; i--){ const s = S[i]; s.t += dt; s.vy += 420 * dt; s.x += s.vx * dt; s.y += s.vy * dt; if(s.t > 1) S.splice(i, 1); } },
      disegna(k, t){ k.globalCompositeOperation = "lighter"; if(on > 0){ spr(k, sprite("alone", "#bfe8ff"), a.x, a.y, 40 + 20 * Math.random(), .9); spr(k, sprite("punto", "#ffffff"), a.x, a.y, 6, 1); } k.lineCap = "round"; k.strokeStyle = "#ffd27a"; k.lineWidth = 1.2; k.beginPath(); for(const s of S){ k.moveTo(s.x, s.y); k.lineTo(s.x - s.vx * .02, s.y - s.vy * .02); } k.globalAlpha = .9; k.stroke(); } };
  };
  /* --- spari nel bosco e lampi all'orizzonte --- */
  EF.spari = (sc, a, R) => {
    const F = [];
    return { z:a.z || "dietro", passo(dt){ if(R() < dt * (a.freq || 1.2)){ const x = lerp(a.x0 || 300, a.x1 || 600, R()), y = lerp(a.y0 || 560, a.y1 || 660, R()); const n = 1 + Math.floor(R() * 3); for(let i = 0; i < n; i++) F.push({ x, y, t:-i * .12 }); } for(let i = F.length - 1; i >= 0; i--){ F[i].t += dt; if(F[i].t > .08) F.splice(i, 1); } },
      disegna(k){ k.globalCompositeOperation = "lighter"; for(const f of F){ if(f.t < 0) continue; spr(k, sprite("alone", "#ffd27a"), f.x, f.y, 26, .9); spr(k, sprite("punto", "#ffffff"), f.x, f.y, 4, 1); } } };
  };
  EF.esplosioni = (sc, a, R) => {
    const F = [];
    return { z:a.z || "cielo", passo(dt){ if(R() < dt * (a.freq || .45)) F.push({ x:lerp(a.x0 || 20, a.x1 || 580, R()), y:a.y || sc.hor - 10, t:0, s:.7 + R() * .8 }); for(let i = F.length - 1; i >= 0; i--){ F[i].t += dt; if(F[i].t > 1.6) F.splice(i, 1); } },
      disegna(k){ k.globalCompositeOperation = "lighter"; for(const f of F){ const u = f.t / 1.6, al = u < .06 ? u / .06 : 1 - (u - .06) / .94; spr(k, sprite("alone", "#ffb35a"), f.x, f.y, 150 * f.s, .5 * al); spr(k, sprite("alone", "#fff2c8"), f.x, f.y, 40 * f.s, .7 * al * al); } } };
  };
  /* --- spruzzi e scia di una barca veloce --- */
  EF.spruzzi = (sc, a, R) => {
    const S = [];
    return { z:a.z || "fine", passo(dt){ for(let i = 0; i < 3; i++) if(R() < dt * 30) S.push({ x:a.x + (R() - .5) * (a.w || 60), y:a.y, vx:(a.dir || -1) * (60 + R() * 120), vy:-50 - R() * 90, t:0, r:1 + R() * 2.2 }); for(let i = S.length - 1; i >= 0; i--){ const s = S[i]; s.t += dt; s.vy += 300 * dt; s.x += s.vx * dt; s.y += s.vy * dt; if(s.t > .8) S.splice(i, 1); } },
      disegna(k){ const im = sprite("morbido", "#ffffff"); for(const s of S) spr(k, im, s.x, s.y, s.r * 2, .7 * (1 - s.t / .8)); } };
  };
  /* --- polvere sollevata (zoccoli, ruote) --- */
  EF.polverone = (sc, a, R) => {
    const P = [], col = a.col || "#c8b090", im = sprite("sbuffo", col);
    return { z:a.z || "fine", passo(dt){ if(R() < dt * (a.freq || 10)) P.push({ x:a.x + (R() - .5) * (a.w || 60), y:a.y, r:8 + R() * 10, vx:(a.dir || -1) * (30 + R() * 60), vy:-10 - R() * 20, t:0, v:1.2 + R() }); for(let i = P.length - 1; i >= 0; i--){ const p = P[i]; p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.r += 26 * dt; if(p.t > p.v) P.splice(i, 1); } },
      disegna(k){ for(const p of P){ k.globalAlpha = .4 * (1 - p.t / p.v); k.drawImage(im, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2); } } };
  };
  /* --- luce di fuoco che tremola su tutta la scena --- */
  EF.luceViva = (sc, a, R) => {
    const n = rumore(sc.seed + 31), col = a.col || "#ff9a3a";
    return { z:a.z || "fine", disegna(k, t){ const f = n(t * 5) * .6 + n(t * 13 + 4) * .4; k.globalCompositeOperation = "lighter"; const g = k.createRadialGradient(a.x || 300, a.y || 620, 20, a.x || 300, a.y || 620, a.r || 520); g.addColorStop(0, rgba(col, (a.a || .14) * f)); g.addColorStop(1, rgba(col, 0)); k.fillStyle = g; k.fillRect(0, 0, 600, 900); } };
  };
  /* --- un'auto che passa e illumina la strada --- */
  EF.autoPassa = (sc, a, R) => {
    let t2 = 3 + R() * 4;
    return { z:a.z || "dietro", passo(dt){ t2 -= dt; if(t2 < -3) t2 = 6 + R() * 8; },
      disegna(k){ if(t2 > 0) return; const u = -t2 / 3, x = lerp(-120, 720, u) * (a.dir || 1) + (a.dir === -1 ? 600 : 0), y = a.y || sc.hor + 10; k.globalCompositeOperation = "lighter"; spr(k, sprite("alone", "#fff6d8"), x, y, 160, .25); spr(k, sprite("punto", "#ffffff"), x, y, 6, .9); spr(k, sprite("punto", "#ffffff"), x + 22, y, 6, .9); spr(k, sprite("alone", "#ff3a2a"), x - 70, y, 10, .6); } };
  };

  /* --- luce stroboscopica a tempo di musica --- */
  EF.strobo = (sc, a, R) => {
    const per = a.per || .48, col = a.col || "#ffffff";
    let raffica = 3 + R() * 4, dura = 0;
    return { z:a.z || "fine", passo(dt){ raffica -= dt; if(raffica <= 0){ dura = per * (4 + Math.floor(R() * 5)); raffica = 6 + R() * 6; } if(dura > 0) dura -= dt; },
      disegna(k, t){ if(dura <= 0 || sc.statico) return; const u = fr((t - sc.t0) / per); if(u > .12) return; k.globalCompositeOperation = "lighter"; k.fillStyle = rgba(col, .1 * (1 - u / .12)); k.fillRect(0, 0, 600, 900); } };
  };

  /* ---------- la pellicola sopra tutto ---------- */
  /* --- pellicola d'epoca: graffi, puntini, un leggero sfarfallio --- */
  EF.epoca = (sc, a, R) => {
    const G2 = [];
    let pt = [];
    return { z:"post",
      passo(dt){ if(R() < dt * 2.5) G2.push({ x:R() * 600, t:0, v:.2 + R() * .6, w:.6 + R() }); for(let i = G2.length - 1; i >= 0; i--){ G2[i].t += dt; if(G2[i].t > G2[i].v) G2.splice(i, 1); } pt = R() < .5 ? Array.from({ length:Math.floor(R() * 4) }, () => [R() * 600, R() * 900, .6 + R() * 1.8, R() < .5]) : []; },
      disegna(k, t){
        if(sc.statico) return;
        const F = a.forza || 1, f = (Math.random() - .5) * .05 * F; k.globalCompositeOperation = f > 0 ? "lighter" : "source-over"; k.fillStyle = f > 0 ? `rgba(255,240,210,${f})` : `rgba(0,0,0,${-f})`; k.fillRect(0, 0, 600, 900);
        k.globalCompositeOperation = "source-over";
        for(const g of G2){ k.globalAlpha = .3 * F * Math.sin(g.t / g.v * Math.PI); k.fillStyle = "#f4ead8"; k.fillRect(g.x + Math.sin(t * 30 + g.x) * 2, 0, g.w, 900); }
        for(const [x, y, r, chiaro] of pt){ k.globalAlpha = .45 * F; k.fillStyle = chiaro ? "#f4ead8" : "#0a0806"; k.beginPath(); k.arc(x, y, r, 0, TAU); k.fill(); }
      } };
  };
  /* --- un riflesso caldo dell'obiettivo che passa ogni tanto --- */
  EF.riflesso = (sc, a, R) => {
    let t2 = 2 + R() * 6;
    const col = a.col || "#ffb070";
    return { z:"post", passo(dt){ t2 -= dt; if(t2 < -4) t2 = 7 + R() * 8; },
      disegna(k){ if(t2 > 0) return; const u = -t2 / 4, al = Math.sin(u * Math.PI) * (a.a || .22), x = lerp(-150, 760, u), g = k.createRadialGradient(x, 120, 10, x, 160, 360); g.addColorStop(0, rgba(col, al)); g.addColorStop(1, rgba(col, 0)); k.globalCompositeOperation = "screen"; k.fillStyle = g; k.fillRect(0, 0, 600, 900); } };
  };

  /* ======================================================================
     IL TITOLO: brilla, scintilla, ronza al neon, pulsa, si incrina
     ====================================================================== */
  const TF = {};
  function mascheraTitolo(sc){
    if(sc._tm) return sc._tm;
    const im = sc.imgs.tmask, m = sc.meta.tmask;
    if(!im || !m) return null;
    const w = im.width || im.naturalWidth, h = im.height || im.naturalHeight;
    const cv = tela(w, h), k = cv.getContext("2d");
    k.drawImage(im, 0, 0);
    let pts = [];
    try{ const d = k.getImageData(0, 0, w, h).data; for(let i = 0; i < 400; i++){ const x = Math.floor(Math.random() * w), y = Math.floor(Math.random() * h); if(d[(y * w + x) * 4 + 3] > 200) pts.push([m.x + x / w * m.w, m.y + y / h * m.h]); if(pts.length > 60) break; } }catch(e){ sbaglio(e); }
    return sc._tm = { im, w, h, m, cv, pts, off:tela(w, h) };
  }
  function tinto(sc, col, blur){
    const key = "_t" + col + blur;
    if(sc[key]) return sc[key];
    const T = mascheraTitolo(sc); if(!T) return null;
    const pad = blur * 3, cv = tela(T.w + pad * 2, T.h + pad * 2), k = cv.getContext("2d");
    try{ if(blur) k.filter = `blur(${blur}px)`; }catch(e){ sbaglio(e); }
    k.drawImage(T.im, pad, pad);
    k.filter = "none"; k.globalCompositeOperation = "source-in"; k.fillStyle = col; k.fillRect(0, 0, cv.width, cv.height);
    return sc[key] = { cv, pad:pad / T.w * T.m.w };
  }
  // una banda di luce che attraversa le lettere
  TF.lucido = (sc, R) => {
    const per = 6.5 + R() * 3, ph = R() * per;
    return { disegna(k, t){
      const u = ((t + ph) % per) / 1.5;
      if(u > 1 || sc.statico) return;
      const T = mascheraTitolo(sc); if(!T) return;
      const q = T.off.getContext("2d"), W2 = T.w, H2 = T.h, x = lerp(-W2 * .3, W2 * 1.3, liscio(u));
      q.globalCompositeOperation = "source-over"; q.clearRect(0, 0, W2, H2);
      const g = q.createLinearGradient(x - H2, 0, x + H2 * .4, H2); g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(.5, "rgba(255,255,255,.95)"); g.addColorStop(1, "rgba(255,255,255,0)");
      q.fillStyle = g; q.fillRect(0, 0, W2, H2); q.globalCompositeOperation = "destination-in"; q.drawImage(T.im, 0, 0);
      k.globalCompositeOperation = "lighter"; k.globalAlpha = .75 * Math.sin(u * Math.PI); k.drawImage(T.off, T.m.x, T.m.y, T.m.w, T.m.h);
    } };
  };
  // piccole stelle che si accendono sui bordi delle lettere
  TF.scintille = (sc, R) => {
    const S = [];
    return { passo(dt){ if(R() < dt * 1.4){ const T = mascheraTitolo(sc); if(T && T.pts.length){ const p = T.pts[Math.floor(R() * T.pts.length)]; S.push({ x:p[0], y:p[1], t:0, s:.6 + R() * .8 }); } } for(let i = S.length - 1; i >= 0; i--){ S[i].t += dt; if(S[i].t > .7) S.splice(i, 1); } },
      disegna(k){ k.globalCompositeOperation = "lighter"; for(const s of S){ const u = s.t / .7; spr(k, sprite("stella", "#fff6d8"), s.x, s.y, 16 * s.s * Math.sin(u * Math.PI), .95); } } };
  };
  // neon: il bagliore respira, ogni tanto il tubo sfarfalla
  TF.neon = (sc, R) => {
    if(!(sc.meta.tinfo && sc.meta.tinfo.neon)) return TF.lucido(sc, R);
    let ev = 2 + R() * 3, tv = 9;
    const col = (sc.meta.tinfo && sc.meta.tinfo.glow) || "#ff4fd8";
    return { passo(dt){ ev -= dt; tv += dt; if(ev <= 0){ tv = 0; ev = 3.5 + R() * 6; } },
      sostituisce(k, t){
        const m = sc.meta.titolo; let a = 1;
        if(tv < .55 && !sc.statico) a = (tv < .06 || (tv > .12 && tv < .17) || (tv > .3 && tv < .36)) ? .35 : 1;
        k.globalAlpha = a; k.drawImage(sc.imgs.titolo, m.x, m.y, m.w, m.h);
        const gl = tinto(sc, col, 8); if(gl){ const T = sc._tm; k.globalCompositeOperation = "lighter"; k.globalAlpha = a * (.28 + .14 * Math.sin(t * 2.4)); k.drawImage(gl.cv, T.m.x - gl.pad, T.m.y - gl.pad, T.m.w + gl.pad * 2, T.m.h + gl.pad * 2); }
        return true;
      } };
  };
  // horror: un alone rosso che pulsa e un sussulto ogni tanto
  TF.pulsa = (sc, R) => {
    let ev = 3 + R() * 4, tv = 9;
    return { passo(dt){ ev -= dt; tv += dt; if(ev <= 0){ tv = 0; ev = 4 + R() * 6; } },
      sostituisce(k, t){
        const m = sc.meta.titolo, j = tv < .25 && !sc.statico ? [(R() - .5) * 4, (R() - .5) * 2] : [0, 0];
        const gl = tinto(sc, "#ff1a0a", 10);
        if(gl){ const T = mascheraTitolo(sc); k.globalCompositeOperation = "lighter"; k.globalAlpha = .22 + .2 * Math.max(0, Math.sin(t * 1.7)); k.drawImage(gl.cv, T.m.x - gl.pad, T.m.y - gl.pad, T.m.w + gl.pad * 2, T.m.h + gl.pad * 2); k.globalCompositeOperation = "source-over"; }
        k.globalAlpha = 1; k.drawImage(sc.imgs.titolo, m.x + j[0], m.y + j[1], m.w, m.h);
        return true;
      } };
  };
  // fantascienza e thriller: il segnale si incrina in strisce e colori
  TF.glitch = (sc, R) => {
    let ev = 2.5 + R() * 4, tv = 9, fette = [];
    return { passo(dt){ ev -= dt; tv += dt; if(ev <= 0){ tv = 0; ev = 4 + R() * 5; } if(tv < .35) fette = Array.from({ length:5 }, () => [R(), .08 + R() * .2, (R() - .5) * 16]); },
      sostituisce(k, t){
        const m = sc.meta.titolo, im = sc.imgs.titolo;
        if(tv > .35 || sc.statico) return false;
        const W2 = im.width || im.naturalWidth, H2 = im.height || im.naturalHeight;
        let y = 0;
        k.globalAlpha = 1;
        fette.forEach(([a, h, dx]) => { const hh = Math.min(1 - y, h); if(hh <= 0) return; k.drawImage(im, 0, y * H2, W2, hh * H2, m.x + dx, m.y + y * m.h, m.w, hh * m.h); y += hh; });
        if(y < 1) k.drawImage(im, 0, y * H2, W2, (1 - y) * H2, m.x, m.y + y * m.h, m.w, (1 - y) * m.h);
        const c1 = tinto(sc, "#00e5ff", 0), c2 = tinto(sc, "#ff2a6a", 0), T = sc._tm;
        if(c1 && c2 && T){ k.globalCompositeOperation = "lighter"; k.globalAlpha = .35; k.drawImage(c1.cv, T.m.x - 4, T.m.y, T.m.w, T.m.h); k.drawImage(c2.cv, T.m.x + 4, T.m.y, T.m.w, T.m.h); }
        return true;
      } };
  };
  // commedia: il titolo fa un piccolo salto
  TF.rimbalzo = (sc, R) => {
    const per = 5 + R() * 2;
    return { sostituisce(k, t){
      const m = sc.meta.titolo, u = ((t - sc.t0) % per) / .7;
      if(u > 1 || sc.statico) return false;
      const s = 1 + .05 * Math.sin(u * Math.PI) * (1 - u * .5), cx = m.x + m.w / 2, cy = m.y + m.h * .62;
      k.translate(cx, cy); k.scale(s, s); k.translate(-cx, -cy - 6 * Math.sin(u * Math.PI));
      k.drawImage(sc.imgs.titolo, m.x, m.y, m.w, m.h);
      return true;
    } };
  };

  /* ======================================================================
     IL MOTORE: un solo ciclo per tutte le locandine visibili
     ====================================================================== */
  const Q = { livello:1, carico:6, ritmo:16.7, risoluzione:1 }, stat = { fotogrammi:0, scene:0 };
  const attivi = new Set();
  let raf = 0, ultimoCiclo = 0;
  const RM = W.matchMedia ? W.matchMedia("(prefers-reduced-motion: reduce)") : { matches:false };
  let spente = false;
  try{ const st = JSON.parse(localStorage.getItem("si2:settings") || "{}"); spente = st && st.fx === "low"; }catch(e){ sbaglio(e); }
  const permesso = () => !spente && !RM.matches;
  function inVista(cn){
    const h = cn.host;
    if(!h.isConnected) return false;
    const v = h.closest(".view");
    if(v && !v.classList.contains("on")) return false;
    const loc = D.getElementById("locv");
    if(loc && loc.classList.contains("on") && !loc.contains(h)) return false;
    const fin = D.getElementById("finale");
    if(fin && fin.classList.contains("on") && !fin.contains(h)) return false;
    return true;
  }
  let riposo = 0;
  function ciclo(now){
    raf = 0;
    if(D.hidden || !permesso()) return;
    const dt = ultimoCiclo ? Math.min(.1, (now - ultimoCiclo) / 1000) : 1 / 30;
    ultimoCiclo = now;
    const t0 = performance.now();
    let n = 0, vivo = false;
    for(const cn of attivi){
      if(!cn.host.isConnected || (cn.cv && cn.cv.parentNode !== cn.host)){ cn.ferma(true); continue; }
      if(!cn.visibile || !inVista(cn)){ if(cn.sc && !cn.via) cn.via = now; else if(cn.sc && now - cn.via > 15000) cn.svuota(); continue; }
      cn.via = 0;
      if(!cn.sc){ cn.carica(); continue; }
      vivo = true;
      if(!cn.pronto) continue;
      cn.acc += dt;
      if(cn.acc * 1000 < cn.intervallo / Math.max(.5, Q.livello)) continue;
      const passo = Math.min(.1, cn.acc); cn.acc = 0;
      cn.frame(passo);
      n++;
    }
    const spesa = performance.now() - t0;
    // qualità che si adatta: se il telefono fatica (giri lenti o troppo lavoro) meno particelle, meno fotogrammi, meno pixel
    if(n){
      Q.carico = Q.carico * .93 + spesa * .07;
      if(dt < .25) Q.ritmo = Q.ritmo * .95 + dt * 1000 * .05;
      if(Q.carico > 11 || Q.ritmo > 40) Q.livello = Math.max(.4, Q.livello - .012);
      else if(Q.carico < 6 && Q.ritmo < 36) Q.livello = Math.min(1, Q.livello + .004);
      Q.risoluzione = Q.livello < .62 ? .7 : Q.livello < .82 ? .85 : 1;
    }
    if(vivo){ raf = requestAnimationFrame(ciclo); clearTimeout(riposo); riposo = 0; }
    else if(!riposo) riposo = setTimeout(() => { riposo = 0; attivi.forEach(cn => { if(!cn.visibile || !inVista(cn)) cn.svuota(); }); if(LC.libera) LC.libera(); }, 20000);
  }
  function avvia(){ if(!raf && attivi.size && !D.hidden && permesso()){ ultimoCiclo = 0; raf = requestAnimationFrame(ciclo); } }
  D.addEventListener("visibilitychange", () => { if(!D.hidden) avvia(); });
  // quando cambia schermata (o si apre la locandina grande, o il finale) il ciclo riparte da solo
  try{ new MutationObserver(ms => { for(const m of ms){ const el = m.target; if(el.classList && (el.classList.contains("view") || el.id === "locv" || el.id === "finale")){ avvia(); return; } } }).observe(D.documentElement, { subtree:true, attributes:true, attributeFilter:["class"] }); }catch(e){ sbaglio(e); }
  // l'inclinazione del telefono muove gli strati (solo nella locandina grande)
  const incl = { x:0, y:0, b0:null, g0:null, on:0 };
  function suInclina(e){ if(e.beta == null || e.gamma == null) return; if(incl.b0 == null){ incl.b0 = e.beta; incl.g0 = e.gamma; } const tx = clamp((e.gamma - incl.g0) / 20, -1, 1), ty = clamp((e.beta - incl.b0) / 20, -1, 1); incl.x = incl.x * .85 + tx * .15; incl.y = incl.y * .85 + ty * .15; }
  function inclinazione(on){ incl.on += on ? 1 : -1; if(on && incl.on === 1){ incl.b0 = null; W.addEventListener("deviceorientation", suInclina); } if(!on && incl.on <= 0){ incl.on = 0; W.removeEventListener("deviceorientation", suInclina); incl.x = incl.y = 0; } }
  let io = null;
  function osserva(cn){
    if(!("IntersectionObserver" in W)){ cn.visibile = true; cn.carica(); return; }
    if(!io) io = new IntersectionObserver(es => es.forEach(e => { const cn2 = e.target._lcv; if(!cn2) return; cn2.visibile = e.isIntersecting && e.intersectionRatio >= .12; if(cn2.visibile){ cn2.carica(); avvia(); } else cn2.pausa(); }), { threshold:[0, .12, .5] });
    io.observe(cn.host);
  }
  // anima una locandina dentro un contenitore (sopra l'immagine ferma che c'è già)
  function anima(host, s, modo, px, opz){
    opz = opz || {};
    if(!host || !s) return null;
    const vecchio = host._lcv;
    if(vecchio){ if(vecchio.sid === s.id && vecchio.modo === modo && vecchio.px === px && (!vecchio.cv || vecchio.cv.parentNode === host)){ vecchio.visibile = vecchio.visibile || !io; avvia(); return vecchio; } vecchio.ferma(true); }
    const cn = { host, s, sid:s.id, modo, px, opz, pronto:false, visibile:false, sc:null, cv:null, k:null, acc:0, t:0, intervallo:1000 / (opz.fps || 30), libera:0, caricando:false };
    cn.carica = () => {
      clearTimeout(cn.libera);
      if(cn.sc || cn.caricando || !permesso() || !inVista(cn)) return;
      cn.caricando = true;
      LC.strati(s, modo, px, host).then(v => {
        cn.caricando = false;
        if(!v || !host.isConnected || host._lcv !== cn) return;
        cn.sc = creaScena(v.meta, v.imgs, s, { q:opz.q || (px >= 700 ? 1 : .72), grande:px >= 700 || opz.grande }); stat.scene++;
        cn.t = cn.sc.t0;
        if(!cn.cv){ cn.cv = D.createElement("canvas"); cn.cv.className = "lcv"; cn.cv.setAttribute("aria-hidden", "true"); const im = host.querySelector(":scope > img.lc, :scope > svg"); if(im) im.after(cn.cv); else host.prepend(cn.cv); cn.k = cn.cv.getContext("2d"); }
        cn.misura();
        cn.pronto = true;
        cn.frame(0);
        requestAnimationFrame(() => { if(cn.cv){ cn.cv.classList.add("on"); host.classList.add("lcv-on"); } });
        if(opz.tilt) inclinazione(true);
        avvia();
      }, () => { cn.caricando = false; });
    };
    cn.misura = () => {
      if(!cn.cv) return;
      const w = host.clientWidth, h = host.clientHeight;
      if(!w || !h) return;
      const dpr = Math.max(1, Math.min(W.devicePixelRatio || 1, opz.dpr || 3) * Q.risoluzione);
      const cw = Math.round(w * dpr), ch = Math.round(h * dpr);
      if(cn.cv.width !== cw || cn.cv.height !== ch){ cn.cv.width = cw; cn.cv.height = ch; }
      const s2 = Math.max(cw / 600, ch / 900);
      cn.base = { s:s2, x:(cw - 600 * s2) / 2, y:(ch - 900 * s2) / 2 };
      cn.mis = performance.now();
    };
    cn.frame = dt => {
      if(!cn.sc) return;
      if(performance.now() - (cn.mis || 0) > 1500) cn.misura();
      if(!cn.base || !cn.cv.width) return;
      cn.t += dt;
      avanza(cn.sc, dt, cn.t);
      stat.fotogrammi++;
      cn.k.setTransform(1, 0, 0, 1, 0, 0);
      cn.k.clearRect(0, 0, cn.cv.width, cn.cv.height);
      disegnaScena(cn.k, cn.sc, cn.t, cn.base, { tilt:opz.tilt && incl.on ? incl : null, zoom:opz.zoom, grana:opz.grana });
    };
    cn.pausa = () => { clearTimeout(cn.libera); cn.libera = setTimeout(() => cn.svuota(), opz.tieni || 12000); };
    cn.svuota = () => { if(cn.visibile && inVista(cn)) return; cn.sc = null; cn.pronto = false; cn.via = 0; if(cn.cv){ cn.cv.classList.remove("on"); cn.cv.width = 0; cn.cv.height = 0; } host.classList.remove("lcv-on"); };
    cn.ferma = via => { clearTimeout(cn.libera); attivi.delete(cn); if(io) try{ io.unobserve(host); }catch(e){ sbaglio(e); } if(opz.tilt && cn.pronto) inclinazione(false); cn.sc = null; cn.pronto = false; if(via && cn.cv){ cn.cv.remove(); cn.cv = null; host.classList.remove("lcv-on"); } if(host._lcv === cn) host._lcv = null; };
    host._lcv = cn;
    attivi.add(cn);
    osserva(cn);
    return cn;
  }
  function accendi(on){
    spente = !on;
    if(spente){ attivi.forEach(cn => { cn.sc = null; cn.pronto = false; if(cn.cv){ cn.cv.classList.remove("on"); cn.cv.width = 0; } cn.host.classList.remove("lcv-on"); }); }
    else { attivi.forEach(cn => { if(cn.visibile) cn.carica(); }); avvia(); }
  }
  // il fotogramma fermo che diventa la locandina salvata (uguale al primo fotogramma vivo)
  function fotogramma(k, s, meta, imgs, Wpx, Hpx){
    const sc = creaScena(meta, imgs, s, { q:1, grande:Wpx >= 700, statico:true });
    disegnaScena(k, sc, sc.t0, { s:Wpx / 600, x:0, y:0 }, { grana:meta.modo === "poster" ? .16 : .13 });
  }
  W.LOCANDINA_VIVE = { anima, fotogramma, accendi, attive:() => permesso(), EF, TF, MOTI, Q, stat, creaScena, disegnaScena, avanza, attivi:() => [...attivi].filter(cn => cn.pronto && cn.visibile && inVista(cn)).length };
  LC.anima = anima;
})(window);
