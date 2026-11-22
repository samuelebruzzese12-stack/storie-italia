/* Storie d'Italia – suoni d'atmosfera.
   Tutto è generato sul momento con Web Audio: nessun file audio, nessuna connessione.
   Ogni genere ha il suo ambiente (pioggia, mare, vicoli, spazio, fronte…), con dissolvenze,
   volume regolabile, volume più basso mentre parla la voce narrante e pausa quando l'app
   va in secondo piano. */
(function(W){
  "use strict";
  const AC = W.AudioContext || W.webkitAudioContext;
  let ctx = null, master = null, duckG = null, ambG = null, cur = null, curId = "", vol = .55, enabled = true, timer = null, idleT = null;
  let temaBus = null, temaFino = 0, voceAttiva = false;
  const fading = [];
  let NB = {}, TX = {}, PL = {};
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[Math.floor(Math.random() * a.length)];

  function ensure(){
    if(!AC) return false;
    if(ctx) return true;
    try{ ctx = new AC({ latencyHint:"playback" }); }catch(e){ try{ ctx = new AC(); }catch(e2){ return false; } }
    wire(ctx);
    return true;
  }
  function wire(c, hp){
    const comp = c.createDynamicsCompressor(), lim = c.createDynamicsCompressor();
    comp.threshold.value = -20; comp.knee.value = 14; comp.ratio.value = 3; comp.attack.value = .02; comp.release.value = .4;
    // limitatore finale: niente distorsioni anche con esplosioni e tuoni
    lim.threshold.value = -4; lim.knee.value = 0; lim.ratio.value = 20; lim.attack.value = .003; lim.release.value = .25;
    master = c.createGain(); master.gain.value = 0;
    duckG = c.createGain(); duckG.gain.value = 1;
    ambG = c.createGain(); ambG.gain.value = 1;
    duckG.connect(ambG); ambG.connect(master); master.connect(comp); comp.connect(lim);
    if(hp){ const f = c.createBiquadFilter(); f.type = "highpass"; f.frequency.value = hp; f.Q.value = .7; lim.connect(f); f.connect(c.destination); }
    else lim.connect(c.destination);
  }

  /* ---------- materiali di base ---------- */
  function noise(color){
    if(NB[color]) return NB[color];
    const sr = ctx.sampleRate, len = sr * 4, f = 2048;
    const b = ctx.createBuffer(1, len, sr), d = b.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for(let i = 0; i < len; i++){
      const w = Math.random() * 2 - 1;
      if(color === "white") d[i] = w * .5;
      else if(color === "pink"){
        b0 = .99886 * b0 + w * .0555179; b1 = .99332 * b1 + w * .0750759; b2 = .969 * b2 + w * .153852;
        b3 = .8665 * b3 + w * .3104856; b4 = .55 * b4 + w * .5329522; b5 = -.7616 * b5 - w * .016898;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * .5362) * .11; b6 = w * .115926;
      }else{ last = (last + .02 * w) / 1.02; d[i] = last * 3.5; }
    }
    // giunzione morbida: la fine del giro si collega all'inizio senza scatti
    for(let i = 0; i < f; i++){ const k = i / f; d[i] = d[i] * k + d[len - f + i] * (1 - k); }
    b._end = (len - f) / sr;
    return (NB[color] = b);
  }
  // texture fitte calcolate una volta sola (gocce, crepitii, grilli): ripetute senza giunture
  function texture(kind){
    if(TX[kind]) return TX[kind];
    const sr = ctx.sampleRate, sec = 6, len = sr * sec;
    const b = ctx.createBuffer(2, len, sr), L = b.getChannelData(0), R = b.getChannelData(1);
    const put = (t0, gain, pan, dur, gen) => {
      const s = Math.floor(t0 * sr), n = Math.max(8, Math.floor(dur * sr));
      const gl = gain * Math.cos((pan + 1) * Math.PI / 4), gr = gain * Math.sin((pan + 1) * Math.PI / 4);
      for(let i = 0; i < n; i++){ const v = gen(i / sr, i, n), k = (s + i) % len; L[k] += v * gl; R[k] += v * gr; }
    };
    if(kind === "gocce"){
      for(let j = 0; j < sec * 150; j++){
        const c = rnd(.12, .6); let lp = 0;
        put(Math.random() * sec, Math.pow(Math.random(), 2.2) * .55, rnd(-.9, .9), rnd(.004, .014), (t, i, n) => { lp += c * ((Math.random() * 2 - 1) - lp); return lp * Math.exp(-i / (n * .25)); });
      }
    }else if(kind === "crepitio"){
      for(let j = 0; j < sec * 10; j++) put(Math.random() * sec, Math.pow(Math.random(), 1.6) * .8, rnd(-.6, .6), rnd(.002, .02), (t, i, n) => (Math.random() * 2 - 1) * Math.exp(-i / (n * .18)));
      for(let j = 0; j < sec * 1.3; j++) put(Math.random() * sec, rnd(.5, 1), rnd(-.5, .5), rnd(.01, .03), (t, i, n) => (Math.random() * 2 - 1) * Math.exp(-i / (n * .12)));
    }else if(kind === "grilli"){
      [{ f:4300, p:-.6, per:.62 }, { f:4650, p:.55, per:.81 }, { f:3950, p:.1, per:1.13 }].forEach(v => {
        for(let t = Math.random() * v.per; t < sec; t += v.per * rnd(.92, 1.08))
          for(let k = 0; k < 3; k++) put(t + k * .032, .22, v.p, .018, (tt, i, n) => Math.sin(2 * Math.PI * v.f * tt) * Math.sin(Math.PI * i / n));
      });
    }
    return (TX[kind] = b);
  }
  const T = () => ctx.currentTime;
  function src(buf){ const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; if(buf._end){ s.loopStart = 0; s.loopEnd = buf._end; } return s; }
  function biq(type, f, q){ const b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; if(q != null) b.Q.value = q; return b; }
  function gn(v){ const g = ctx.createGain(); g.gain.value = v; return g; }
  function pan(p){ if(ctx.createStereoPanner){ const s = ctx.createStereoPanner(); s.pan.value = p; return s; } return gn(1); }
  function osc(type, f, det){ const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; if(det) o.detune.value = det; return o; }
  function link(){ for(let i = 0; i < arguments.length - 1; i++) arguments[i].connect(arguments[i + 1]); return arguments[arguments.length - 1]; }
  function env(g, t, a, peak, d){ g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(Math.max(peak, .0002), t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + d); }

  /* ---------- scena: contenitore con dissolvenza ed eventi ---------- */
  function Scene(id){
    const out = gn(0); out.connect(duckG);
    return {
      id, out, srcs:[], evs:[], stopping:false,
      add(n){ this.srcs.push(n); return n; },
      ev(fn, min, max, first){ this.evs.push({ fn, min, max, next:T() + (first != null ? first : rnd(min, max) * .6) }); }
    };
  }
  function bed(sc, color, filters, level, mods){
    const s = sc.add(src(noise(color))), g = gn(level);
    let node = s; filters.forEach(f => { node.connect(f); node = f; });
    node.connect(g); g.connect(sc.out);
    s.start(T(), rnd(0, 3));
    (mods || []).forEach(m => {
      const o = sc.add(osc("sine", m.rate)), d = gn(m.depth);
      o.connect(d); d.connect(m.f ? filters[m.i || 0].frequency : g.gain);
      o.start(T() + rnd(0, 2));
    });
    return g;
  }
  function loopTex(sc, kind, filter, level){
    const s = sc.add(src(texture(kind))), g = gn(level);
    link(s, filter, g, sc.out); s.start(T(), rnd(0, 5));
  }
  function pad(sc, chords, a, o){
    o = o || {};
    const per = o.per || 9, cut = o.cut || 1200, lp = biq("lowpass", cut, .7);
    lp.connect(sc.out);
    const l = sc.add(osc("sine", o.lfo || .045)), ld = gn(cut * .35); l.connect(ld); ld.connect(lp.frequency); l.start();
    let i = 0;
    sc.ev(t => {
      const ch = chords[i++ % chords.length], v = (o.amp || .045) * a;
      ch.forEach(f => [-6, 6].forEach(det => {
        const os = osc(o.wave || "sine", f, det + rnd(-3, 3)), eg = gn(0);
        link(os, eg, lp);
        eg.gain.setValueAtTime(0, t); eg.gain.linearRampToValueAtTime(v, t + per * .35);
        eg.gain.setValueAtTime(v, t + per * .75); eg.gain.linearRampToValueAtTime(0, t + per * 1.25);
        os.start(t); os.stop(t + per * 1.3);
      }));
    }, per, per, .05);
  }
  function drone(sc, freqs, a, o){
    o = o || {};
    const cut = o.cut || 400, amp = (o.amp || .06) * a, lp = biq("lowpass", cut, .8), g = gn(amp);
    link(lp, g, sc.out);
    freqs.forEach(f => [-4, 4].forEach(det => { const os = sc.add(osc(o.wave || "sine", f, det)); os.connect(lp); os.start(); }));
    if(o.lfo){ const l = sc.add(osc("sine", o.lfo)), ld = gn(cut * .4); l.connect(ld); ld.connect(lp.frequency); l.start(); }
    if(o.trem){ const l = sc.add(osc("sine", o.trem)), ld = gn(amp * .35); l.connect(ld); ld.connect(g.gain); l.start(); }
  }

  /* ---------- suoni singoli (eventi) ---------- */
  function tuono(sc, t, a){
    const s = src(noise("brown")), lp = biq("lowpass", rnd(110, 260), .4), g = gn(0), p = pan(rnd(-.6, .6));
    link(s, lp, g, p, sc.out);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(rnd(.5, .9) * a, t + rnd(.15, .5)); g.gain.setTargetAtTime(0, t + rnd(.6, 1.2), rnd(.9, 1.6));
    s.start(t, rnd(0, 3)); s.stop(t + 9);
  }
  function gabbiano(sc, t, a){
    const n = Math.floor(rnd(2, 5)), p = pan(rnd(-.8, .8)); p.connect(sc.out);
    for(let k = 0; k < n; k++){
      const t0 = t + k * rnd(.32, .5), o = osc("triangle", 1400), v = osc("sine", rnd(14, 22)), vd = gn(rnd(30, 60)), bp = biq("bandpass", 1600, 1.5), g = gn(0);
      v.connect(vd); vd.connect(o.frequency); link(o, bp, g, p);
      o.frequency.setValueAtTime(rnd(1300, 1500), t0); o.frequency.linearRampToValueAtTime(rnd(1800, 2100), t0 + .08); o.frequency.exponentialRampToValueAtTime(rnd(950, 1150), t0 + .34);
      env(g, t0, .03, .13 * a, .32);
      o.start(t0); v.start(t0); o.stop(t0 + .42); v.stop(t0 + .42);
    }
  }
  function uccello(sc, t, a){
    const n = Math.floor(rnd(3, 8)), p = pan(rnd(-.9, .9)), base = rnd(2200, 3600), up = Math.random() < .5;
    p.connect(sc.out);
    for(let k = 0; k < n; k++){
      const t0 = t + k * rnd(.08, .17), o = osc("sine", base), g = gn(0);
      link(o, g, p);
      o.frequency.setValueAtTime(base * rnd(.85, 1.1), t0); o.frequency.exponentialRampToValueAtTime(base * (up ? rnd(1.25, 1.6) : rnd(.6, .8)), t0 + rnd(.05, .11));
      env(g, t0, .008, .06 * a * rnd(.5, 1), .1);
      o.start(t0); o.stop(t0 + .16);
    }
  }
  function auto(sc, t, a){
    const s = src(noise("brown")), bp = biq("bandpass", rnd(300, 550), .8), g = gn(0), p = pan(0), d = rnd(3, 5.5), dir = Math.random() < .5 ? -1 : 1;
    link(s, bp, g, p, sc.out);
    if(p.pan){ p.pan.setValueAtTime(-dir, t); p.pan.linearRampToValueAtTime(dir, t + d); }
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.5 * a, t + d * .5); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    s.start(t, rnd(0, 3)); s.stop(t + d + .1);
  }
  function motorino(sc, t, a){
    const f0 = rnd(85, 120), o = osc("sawtooth", f0), o2 = osc("square", f0 * 2.01), lp = biq("lowpass", 900, .9), g = gn(0), p = pan(0);
    const nz = src(noise("pink")), nb = biq("bandpass", 1500, 1), ng = gn(.25), og = gn(.4);
    const d = rnd(2.5, 4), dir = Math.random() < .5 ? -1 : 1;
    link(nz, nb, ng, lp); o.connect(lp); link(o2, og, lp); link(lp, g, p, sc.out);
    o.frequency.setValueAtTime(f0 * 1.06, t); o.frequency.linearRampToValueAtTime(f0 * .92, t + d);
    o2.frequency.setValueAtTime(f0 * 2.12, t); o2.frequency.linearRampToValueAtTime(f0 * 1.84, t + d);
    if(p.pan){ p.pan.setValueAtTime(-dir * .9, t); p.pan.linearRampToValueAtTime(dir * .9, t + d); }
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.09 * a, t + d * .45); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.start(t); o2.start(t); nz.start(t, rnd(0, 3)); [o, o2, nz].forEach(s => s.stop(t + d + .1));
  }
  function clacson(sc, t, a){
    const p = pan(rnd(-.7, .7)), lp = biq("lowpass", 1400, .7), g = gn(0), d = rnd(.18, .35);
    link(lp, g, p, sc.out);
    [392, 494].forEach(f => { const o = osc("square", f * rnd(.97, 1.03)); o.connect(lp); o.start(t); o.stop(t + .5); });
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.035 * a, t + .02); g.gain.setValueAtTime(.035 * a, t + d); g.gain.linearRampToValueAtTime(0, t + d + .05);
  }
  function tintinnio(sc, t, a){
    const p = pan(rnd(-.8, .8)), f = rnd(2600, 4200); p.connect(sc.out);
    [1, 2.76].forEach((m, i) => { const o = osc("sine", f * m), g = gn(0); link(o, g, p); env(g, t, .002, (i ? .015 : .04) * a, rnd(.15, .35)); o.start(t); o.stop(t + .5); });
  }
  function campana(sc, t, a){
    const f = pick([196, 220, 246.94, 261.63]), colpi = Math.floor(rnd(3, 7)), p = pan(rnd(-.5, .5)), lp = biq("lowpass", 2600, .5);
    link(lp, p, sc.out);
    for(let k = 0; k < colpi; k++){
      const t0 = t + k * rnd(1.3, 1.7);
      [[.5, .5, 6], [1, 1, 4.5], [1.19, .45, 3.5], [1.5, .35, 3], [2, .5, 2.5], [2.51, .2, 1.8], [3.01, .12, 1.4]].forEach(([m, amp, dec]) => {
        const o = osc("sine", f * m), g = gn(0); link(o, g, lp);
        g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(amp * .06 * a, t0 + .004); g.gain.setTargetAtTime(0, t0 + .004, dec / 4);
        o.start(t0); o.stop(t0 + dec + .5);
      });
    }
  }
  function sirena(sc, t, a){
    const o = osc("triangle", 660), lp = biq("lowpass", 1500, .7), g = gn(0), p = pan(rnd(-.8, .8)), cicli = Math.floor(rnd(3, 6)), d = cicli * 1.24;
    link(o, lp, g, p, sc.out);
    for(let k = 0; k < cicli * 2; k++) o.frequency.setValueAtTime(k % 2 ? 880 : 660, t + k * .62);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.03 * a, t + d * .4); g.gain.linearRampToValueAtTime(0, t + d);
    if(p.pan) p.pan.linearRampToValueAtTime(rnd(-.8, .8), t + d);
    o.start(t); o.stop(t + d + .1);
  }
  function esplosione(sc, t, a){
    const s = src(noise("brown")), lp = biq("lowpass", rnd(120, 260), .5), g = gn(0), p = pan(rnd(-.8, .8)), pk = rnd(.45, .85) * a;
    link(s, lp, g, p, sc.out);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(pk, t + .015); g.gain.setTargetAtTime(0, t + .05, rnd(.5, .9));
    s.start(t, rnd(0, 3)); s.stop(t + 5);
    const o = osc("sine", 70), og = gn(0); link(o, og, p);
    o.frequency.setValueAtTime(70, t); o.frequency.exponentialRampToValueAtTime(38, t + .6);
    og.gain.setValueAtTime(0, t); og.gain.linearRampToValueAtTime(pk * .6, t + .01); og.gain.setTargetAtTime(0, t + .03, .25);
    o.start(t); o.stop(t + 2);
  }
  function raffica(sc, t, a){
    const n = Math.floor(rnd(3, 9)), p = pan(rnd(-.9, .9)), bp = biq("bandpass", rnd(700, 1200), .8), lp = biq("lowpass", 2200, .6);
    link(bp, lp, p, sc.out);
    for(let k = 0; k < n; k++){
      const t0 = t + k * rnd(.07, .14), s = src(noise("white")), g = gn(0);
      link(s, g, bp);
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(.22 * a, t0 + .002); g.gain.setTargetAtTime(0, t0 + .004, .025);
      s.start(t0, rnd(0, 3)); s.stop(t0 + .15);
    }
  }
  function battito(sc, t, a){
    [0, .28].forEach((dt, i) => {
      const t0 = t + dt, o = osc("sine", 62), g = gn(0); link(o, g, sc.out);
      o.frequency.setValueAtTime(i ? 55 : 62, t0); o.frequency.exponentialRampToValueAtTime(38, t0 + .16);
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime((i ? .28 : .38) * a, t0 + .012); g.gain.setTargetAtTime(0, t0 + .03, .06);
      o.start(t0); o.stop(t0 + .4);
    });
  }
  function scricchiolio(sc, t, a){
    const f0 = rnd(60, 110), o = osc("sawtooth", f0), bp = biq("bandpass", 700, 9), g = gn(0), p = pan(rnd(-.8, .8)), d = rnd(.5, 1.3);
    link(o, bp, g, p, sc.out);
    bp.frequency.setValueAtTime(rnd(500, 800), t); bp.frequency.linearRampToValueAtTime(rnd(900, 1500), t + d);
    o.frequency.setValueAtTime(f0, t); o.frequency.linearRampToValueAtTime(f0 * rnd(.7, 1.3), t + d);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.16 * a, t + .08); g.gain.setValueAtTime(.16 * a, t + d - .1); g.gain.linearRampToValueAtTime(0, t + d);
    o.start(t); o.stop(t + d + .05);
  }
  function bip(sc, t, a){
    const p = pan(rnd(-.6, .6)); p.connect(sc.out);
    pick([[880, 1320], [1320, 880, 1760], [1046.5, 1568], [1760]]).forEach((f, k) => {
      const t0 = t + k * .11, o = osc("sine", f), g = gn(0); link(o, g, p);
      env(g, t0, .005, .045 * a, .09); o.start(t0); o.stop(t0 + .15);
    });
  }
  function scintilla(sc, t, a){
    const p = pan(rnd(-.8, .8)), n = Math.floor(rnd(3, 7)), base = pick([1046.5, 1174.66, 1318.51, 1567.98]);
    p.connect(sc.out);
    for(let k = 0; k < n; k++){
      const t0 = t + k * rnd(.06, .12), o = osc("sine", base * pick([1, 1.5, 2, 2.5, 3])), g = gn(0);
      link(o, g, p); env(g, t0, .005, .02 * a, rnd(.4, .9)); o.start(t0); o.stop(t0 + 1);
    }
  }
  function goccia(sc, t, a, eco){
    const f = rnd(900, 1700), o = osc("sine", f), g = gn(0), p = pan(rnd(-.8, .8));
    link(o, g, p); p.connect(sc.out); p.connect(eco);
    o.frequency.setValueAtTime(f * 1.25, t); o.frequency.exponentialRampToValueAtTime(f * .7, t + .06);
    env(g, t, .002, .11 * a * rnd(.5, 1), .09); o.start(t); o.stop(t + .2);
  }
  function ritmo(sc, a, roots, bpm){
    const beat = 60 / bpm; let k = 0;
    sc.ev(t => {
      const root = roots[Math.floor(k / 8) % roots.length]; k++;
      const o = osc("triangle", root), lp = biq("lowpass", 420, 1), g = gn(0); link(o, lp, g, sc.out);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.16 * a, t + .01); g.gain.setTargetAtTime(0, t + .05, .12);
      o.start(t); o.stop(t + .5);
      const t2 = t + beat / 2, s = src(noise("white")), hp = biq("highpass", 7500, .7), hg = gn(0); link(s, hp, hg, sc.out);
      hg.gain.setValueAtTime(0, t2); hg.gain.linearRampToValueAtTime(.05 * a, t2 + .002); hg.gain.setTargetAtTime(0, t2 + .004, .02);
      s.start(t2, rnd(0, 3)); s.stop(t2 + .1);
    }, beat, beat, .1);
  }

  /* ---------- sigle originali, composte per l'app ---------- */
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
  // corda pizzicata (Karplus-Strong): mandolino, chitarra, contrabbasso
  function corda(m, dur, damp){
    const key = m + ":" + dur + ":" + damp;
    if(PL[key]) return PL[key];
    const sr = ctx.sampleRate, n = Math.floor(sr * dur), N = Math.max(2, Math.round(sr / mtof(m) - .5));
    const b = ctx.createBuffer(1, n, sr), d = b.getChannelData(0), ring = new Float32Array(N);
    let lp = 0;
    for(let i = 0; i < N; i++){ lp += .6 * ((Math.random() * 2 - 1) - lp); ring[i] = lp; }
    let p = 0;
    for(let i = 0; i < n; i++){ const a = ring[p], c = ring[(p + 1) % N]; d[i] = a; ring[p] = damp * .5 * (a + c); p = (p + 1) % N; }
    const fo = Math.min(n, 600); for(let i = 0; i < fo; i++) d[n - 1 - i] *= i / fo;
    return (PL[key] = b);
  }
  function pizzica(bus, m, t, vol, p0, dur, damp, rate){
    const s = ctx.createBufferSource(), g = gn(vol), p = pan(p0 || 0);
    s.buffer = corda(m, dur || .6, damp || .996); if(rate) s.playbackRate.value = rate;
    link(s, g, p, bus); s.start(t); s.stop(t + (dur || .6));
  }
  function mandolino(bus, m, t, dur, vol){
    for(let k = 0, tt = t; tt < t + dur - .03; k++, tt += .08){
      const v = vol * (k % 2 ? .62 : .8) * (1 - .3 * (tt - t) / Math.max(dur, .1));
      pizzica(bus, m, tt, v, -.18, .5, .9965, .9989);
      pizzica(bus, m, tt + .004, v * .9, .18, .5, .9965, 1.0021);
    }
  }
  function archi(bus, notes, t, dur, vol){
    const lp = biq("lowpass", 1500, .6), g = gn(0); link(lp, g, bus);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .45);
    g.gain.setValueAtTime(vol, t + dur - .05); g.gain.linearRampToValueAtTime(0, t + dur + .6);
    notes.forEach(m => [-7, 7].forEach(det => { const o = osc("sawtooth", mtof(m), det); o.connect(lp); o.start(t); o.stop(t + dur + .7); }));
  }
  function canto(bus, m, t, dur, vol, tipo){
    const fisa = tipo === "fisa", f = biq(fisa ? "bandpass" : "lowpass", fisa ? 1300 : 2300, fisa ? .7 : .5), g = gn(0);
    const vib = osc("sine", fisa ? 5.8 : 5.1), vd = gn(fisa ? 7 : 11);
    vib.connect(vd);
    (fisa ? [["square", -9, .5], ["square", 9, .5], ["sawtooth", -1200, .22]] : [["triangle", 0, .6], ["square", 3, .12]]).forEach(([w, det, a]) => {
      const o = osc(w, mtof(m), det), og = gn(a); vd.connect(o.detune); link(o, og, f); o.start(t); o.stop(t + dur + .3);
    });
    link(f, g, bus);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .05);
    g.gain.setValueAtTime(vol * .85, t + Math.max(.06, dur - .05)); g.gain.linearRampToValueAtTime(0, t + dur + .22);
    vib.start(t); vib.stop(t + dur + .3);
  }
  function timpano(bus, t, vol, m){
    const f0 = mtof(m || 38), o = osc("sine", f0), g = gn(0); link(o, g, bus);
    o.frequency.setValueAtTime(f0 * 1.35, t); o.frequency.exponentialRampToValueAtTime(f0, t + .08);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .005); g.gain.setTargetAtTime(0, t + .02, .45);
    o.start(t); o.stop(t + 2.6);
    const s = src(noise("brown")), lp = biq("lowpass", 180, .7), ng = gn(0); link(s, lp, ng, bus);
    ng.gain.setValueAtTime(0, t); ng.gain.linearRampToValueAtTime(vol * .8, t + .005); ng.gain.setTargetAtTime(0, t + .01, .12);
    s.start(t, rnd(0, 3)); s.stop(t + 1);
  }
  const ACC = {
    Dm:[50, 57, 62, 65], Gm:[55, 58, 62, 67], A7:[57, 61, 64, 67], Bb:[58, 62, 65, 70],
    Am:[57, 60, 64, 69], E7:[52, 59, 62, 68]
  };
  const BASSO = { Dm:38, Gm:43, A7:45, Bb:46, Am:45, E7:40 };
  // ogni battuta: accordi (uno o due) e melodia [nota MIDI, durata in battiti]
  const TEMI = {
    // dramma siciliano: mandolino, archi, clarinetto, timpani (re minore)
    onore:{ bpm:84, guida:"mando", doppio:"clar", corto:4, vol:1, battute:[
      { a:["Dm"], m:[[74, 1.5], [73, .5], [74, 1], [76, 1]], tim:1 },
      { a:["Gm"], m:[[77, 2], [76, 1], [74, 1]] },
      { a:["A7"], m:[[73, 1], [70, 1], [69, 1], [67, 1]] },
      { a:["A7"], m:[[69, 4]] },
      { a:["Dm"], m:[[69, 1], [74, 1], [77, 1], [81, 1]], tim:1 },
      { a:["Bb"], m:[[79, 1.5], [77, .5], [76, 1], [74, 1]] },
      { a:["Gm", "A7"], m:[[70, 1], [73, 1], [76, 1], [79, 1]] },
      { a:["Dm"], m:[[77, 1], [76, 1], [74, 2]] },
      { a:["Dm"], m:[[74, 4]], tim:1, fine:1 }
    ] },
    // noir napoletano: fisarmonica, mandolino, chitarra, sesta napoletana (la minore)
    prufessore:{ bpm:76, guida:"fisa", doppio:"mando", corto:4, vol:1, chitarra:1, battute:[
      { a:["Am"], m:[[76, 1.5], [74, .5], [72, 1], [71, 1]], tim:1 },
      { a:["Am"], m:[[69, 2], [72, 1], [76, 1]] },
      { a:["Dm"], m:[[77, 1.5], [76, .5], [74, 1], [69, 1]] },
      { a:["Bb"], m:[[74, 2], [77, 1], [74, 1]] },
      { a:["E7"], m:[[71, 1.5], [72, .5], [74, 1], [68, 1]], tim:1 },
      { a:["Am"], m:[[69, 3], [64, 1]] },
      { a:["Dm", "Bb"], m:[[65, 1], [69, 1], [74, 1], [77, 1]] },
      { a:["E7"], m:[[76, 2], [68, 1], [71, 1]] },
      { a:["Am"], m:[[69, 4]], tim:1, fine:1 }
    ] }
  };
  const LEVEL_T = { onore:.88, prufessore:.76 };
  function suonaTema(T, bus, t0, corto){
    const beat = 60 / T.bpm, bars = corto ? T.battute.slice(T.corto) : T.battute;
    let t = t0;
    bars.forEach((b, bi) => {
      const len = 4 * beat, half = b.a.length > 1 ? 2 * beat : len;
      b.a.forEach((ac, k) => {
        const ta = t + k * half, dur = b.fine ? len + 1.6 : half;
        archi(bus, ACC[ac], ta, dur, .022);
        pizzica(bus, BASSO[ac], ta, .9, 0, 1.4, .993);
        if(!b.fine) pizzica(bus, BASSO[ac] + 7, ta + 2 * beat * (half === len ? 1 : .5), .6, 0, 1.2, .993);
        if(T.chitarra && !b.fine){
          const n = ACC[ac], pat = [n[0], n[2], n[1], n[2]];
          for(let q = 0; q < half / beat; q++) pizzica(bus, pat[q % 4], ta + q * beat, .42, .35, .7, .994);
        }
      });
      if(b.tim) timpano(bus, t, .7, BASSO[b.a[0]]);
      let tm = t;
      b.m.forEach(([m, d]) => {
        const dur = d * beat * (b.fine ? 1.25 : 1);
        if(T.guida === "mando") mandolino(bus, m, tm, dur, .42); else canto(bus, m, tm, dur, .16, "fisa");
        const seconda = bi >= 4 || corto;
        if(seconda && T.doppio === "clar") canto(bus, m - 12, tm, dur, .12, "clar");
        if(seconda && T.doppio === "mando") mandolino(bus, m, tm, dur, .22);
        tm += d * beat;
      });
      t += len;
    });
    return t + 1.6;
  }
  function stopTema(fast){
    if(!temaBus || !ctx) return;
    const b = temaBus, tt = ctx.currentTime;
    temaBus = null; temaFino = 0;
    b.gain.cancelScheduledValues(tt); b.gain.setValueAtTime(b.gain.value, tt); b.gain.linearRampToValueAtTime(0, tt + (fast ? .3 : 1.2));
    setTimeout(() => { try{ b.disconnect(); }catch(e){} }, fast ? 500 : 1500);
    ambG.gain.setTargetAtTime(1, tt, .6);
  }
  function tema(id, corto){
    const T = TEMI[id];
    if(!T || !enabled || !ensure()) return false;
    if(temaBus && ctx.currentTime < temaFino) return false;
    clearTimeout(idleT);
    resume(); apply();
    const t0 = ctx.currentTime + .15, bus = gn(0);
    bus.connect(master);
    const v = (T.vol || 1) * (LEVEL_T[id] || 1) * (voceAttiva ? .55 : 1);
    bus.gain.setValueAtTime(0, t0 - .1); bus.gain.linearRampToValueAtTime(v, t0 + .08);
    const fine = suonaTema(T, bus, t0, corto);
    bus.gain.setValueAtTime(v, fine - .8); bus.gain.linearRampToValueAtTime(0, fine + .6);
    ambG.gain.setTargetAtTime(.3, ctx.currentTime, .4);
    temaBus = bus; temaFino = fine + .7; bus._v = v / (voceAttiva ? .55 : 1);
    startTimer();
    return true;
  }

  /* ---------- strati ---------- */
  const L = {
    pioggia(sc, a){ bed(sc, "pink", [biq("highpass", 450, .5), biq("lowpass", 6500, .5)], .34 * a, [{ rate:.07, depth:.06 * a }]); loopTex(sc, "gocce", biq("highpass", 1100, .6), .5 * a); },
    temporale(sc, a){ sc.ev(t => tuono(sc, t, a), 16, 40, rnd(4, 12)); },
    mare(sc, a){
      bed(sc, "brown", [biq("lowpass", 520, .4)], .45 * a, [{ rate:.105, depth:.3 * a }]);
      bed(sc, "brown", [biq("lowpass", 900, .3)], .25 * a, [{ rate:.067, depth:.18 * a }]);
      bed(sc, "pink", [biq("highpass", 1700, .5)], .07 * a, [{ rate:.105, depth:.06 * a }]);
    },
    gabbiani(sc, a){ sc.ev(t => gabbiano(sc, t, a), 7, 18); },
    vento(sc, a, f){ bed(sc, "pink", [biq("bandpass", f || 480, .9)], .5 * a, [{ rate:.05, depth:220, f:1 }, { rate:.083, depth:.25 * a }]); bed(sc, "white", [biq("bandpass", 1800, .7)], .035 * a, [{ rate:.13, depth:.025 * a }]); },
    foglie(sc, a){ bed(sc, "white", [biq("bandpass", 3600, .45)], .05 * a, [{ rate:.17, depth:.035 * a }, { rate:.71, depth:.012 * a }]); },
    ruscello(sc, a){ bed(sc, "white", [biq("bandpass", 2300, .6), biq("highpass", 900, .5)], .12 * a, [{ rate:5.3, depth:.03 * a }, { rate:.7, depth:.03 * a }]); },
    uccelli(sc, a){ sc.ev(t => uccello(sc, t, a), 2.5, 8); },
    grilli(sc, a){ loopTex(sc, "grilli", biq("highpass", 2500, .5), .35 * a); },
    fuoco(sc, a){ bed(sc, "brown", [biq("lowpass", 260, .5)], .35 * a, [{ rate:.3, depth:.08 * a }]); loopTex(sc, "crepitio", biq("highpass", 1300, .6), .42 * a); },
    traffico(sc, a){ bed(sc, "brown", [biq("lowpass", 230, .5)], .55 * a, [{ rate:.04, depth:.12 * a }]); bed(sc, "pink", [biq("bandpass", 700, .7)], .06 * a); sc.ev(t => auto(sc, t, a), 5, 13); },
    clacson(sc, a){ sc.ev(t => clacson(sc, t, a), 22, 55, rnd(8, 20)); },
    motorini(sc, a){ sc.ev(t => motorino(sc, t, a), 9, 22, rnd(3, 9)); },
    brusio(sc, a){ [330, 620, 1050].forEach((f, i) => bed(sc, "pink", [biq("bandpass", f, 1.4)], [.18, .14, .07][i] * a, [{ rate:rnd(.9, 1.7), depth:[.08, .06, .03][i] * a }, { rate:rnd(.21, .4), depth:[.05, .04, .02][i] * a }])); },
    tazzine(sc, a){ sc.ev(t => tintinnio(sc, t, a), 3, 9); },
    campane(sc, a){ sc.ev(t => campana(sc, t, a), 40, 95, rnd(6, 20)); },
    sirene(sc, a){ sc.ev(t => sirena(sc, t, a), 30, 75, rnd(10, 25)); },
    stanza(sc, a){ bed(sc, "brown", [biq("lowpass", 180, .5)], .12 * a); },
    battaglia(sc, a){ sc.ev(t => esplosione(sc, t, a), 4, 12, rnd(1, 4)); sc.ev(t => raffica(sc, t, a), 7, 18, rnd(3, 8)); },
    cuore(sc, a, bpm){ const p = 60 / (bpm || 62); sc.ev(t => battito(sc, t, a), p * .97, p * 1.03, .5); },
    scricchiolii(sc, a){ sc.ev(t => scricchiolio(sc, t, a), 10, 26, rnd(4, 9)); },
    bip(sc, a){ sc.ev(t => bip(sc, t, a), 9, 24, rnd(4, 10)); },
    scintille(sc, a){ sc.ev(t => scintilla(sc, t, a), 5, 12); },
    gocce(sc, a){
      // eco di galleria: ritardo con ritorno filtrato
      const d = ctx.createDelay(1), fb = gn(.42), lp = biq("lowpass", 1800, .5), wet = gn(.6);
      d.delayTime.value = .23; link(d, lp, fb, d); lp.connect(wet); wet.connect(sc.out);
      sc.ev(t => goccia(sc, t, a, d), .5, 2.2);
    }
  };

  /* ---------- ambienti ---------- */
  const SCENE = {
    pioggia:{ n:"🌧️ Pioggia sulla città", b(sc){ L.pioggia(sc, 1); L.temporale(sc, .8); pad(sc, [[110, 130.81, 164.81], [98, 123.47, 146.83], [87.31, 110, 130.81], [82.41, 98, 123.47]], .7, { per:11, cut:700, amp:.03 }); } },
    mare:{ n:"🌊 Onde del mare", b(sc){ L.mare(sc, 1); L.gabbiani(sc, .8); pad(sc, [[174.61, 220, 261.63, 329.63], [130.81, 164.81, 196, 246.94]], .6, { per:12, cut:1100, amp:.022 }); } },
    vicolo:{ n:"🛵 Vicoli e motorini", b(sc){ L.brusio(sc, .8); L.motorini(sc, 1); L.traffico(sc, .45); L.campane(sc, .8); L.gabbiani(sc, .35); } },
    piazza:{ n:"☕ Piazza e caffè", b(sc){ L.brusio(sc, 1); L.tazzine(sc, 1); L.uccelli(sc, .5); L.campane(sc, .7); } },
    spazio:{ n:"🚀 Silenzio dello spazio", b(sc){ drone(sc, [55, 82.41, 110], .9, { cut:500, amp:.07, lfo:.03 }); pad(sc, [[220, 329.63, 440], [196, 293.66, 392], [174.61, 261.63, 349.23]], .5, { per:14, cut:1600, amp:.018 }); L.bip(sc, 1); bed(sc, "brown", [biq("lowpass", 120, .7)], .1); } },
    natura:{ n:"🌲 Vento tra gli alberi", b(sc){ L.vento(sc, .5, 700); L.foglie(sc, 1); L.uccelli(sc, 1); L.ruscello(sc, .6); } },
    incanto:{ n:"✨ Bosco incantato", b(sc){ L.foglie(sc, .8); L.ruscello(sc, .8); L.uccelli(sc, .6); pad(sc, [[293.66, 369.99, 440, 554.37], [246.94, 311.13, 369.99, 493.88], [261.63, 329.63, 392, 493.88]], .6, { per:10, cut:2200, amp:.02, wave:"triangle" }); L.scintille(sc, .7); } },
    neon:{ n:"🌆 Notte al neon", b(sc){ pad(sc, [[220, 261.63, 329.63], [174.61, 220, 261.63], [196, 261.63, 329.63], [196, 246.94, 293.66]], .9, { per:4.8, cut:1100, amp:.03, wave:"sawtooth", lfo:.1 }); ritmo(sc, .8, [110, 87.31, 130.81, 98], 100); L.traffico(sc, .3); L.sirene(sc, .8); } },
    notte:{ n:"🌃 Città di notte", b(sc){ L.traffico(sc, .8); L.sirene(sc, 1); L.clacson(sc, .6); L.pioggia(sc, .25); drone(sc, [73.42, 110], .6, { cut:300, amp:.05, lfo:.04 }); } },
    fronte:{ n:"🎖️ Il fronte", b(sc){ L.vento(sc, .7, 380); L.battaglia(sc, .8); drone(sc, [41.2, 61.74], .6, { cut:200, amp:.06 }); } },
    tensione:{ n:"🫀 Tensione", b(sc){ drone(sc, [55, 58.27, 82.41], .8, { wave:"sawtooth", cut:260, amp:.05, lfo:.06 }); L.cuore(sc, .8, 66); L.traffico(sc, .25); } },
    incubo:{ n:"🕯️ Incubo", b(sc){ drone(sc, [36.71, 51.91, 73.42], .9, { wave:"sawtooth", cut:220, amp:.06, lfo:.05, trem:.2 }); L.vento(sc, .6, 300); L.scricchiolii(sc, 1); L.temporale(sc, .7); } },
    neve:{ n:"❄️ Vento gelido", b(sc){ L.vento(sc, 1, 520); bed(sc, "white", [biq("bandpass", 4200, .5)], .03, [{ rate:.11, depth:.02 }]); drone(sc, [65.41, 98], .5, { cut:250, amp:.04 }); } },
    campagna:{ n:"🌾 Notte in campagna", b(sc){ L.grilli(sc, 1); L.vento(sc, .35, 600); drone(sc, [87.31, 130.81], .4, { cut:300, amp:.03 }); } },
    camino:{ n:"🔥 Fuoco nel camino", b(sc){ L.fuoco(sc, 1); L.stanza(sc, 1); L.pioggia(sc, .25); } },
    sera:{ n:"🌙 Sera d'estate", b(sc){ pad(sc, [[174.61, 220, 261.63, 329.63], [146.83, 185, 220, 277.18], [164.81, 207.65, 246.94, 311.13], [130.81, 164.81, 196, 246.94]], .7, { per:10, cut:1300, amp:.024, wave:"triangle" }); L.brusio(sc, .35); L.grilli(sc, .45); L.campane(sc, .5); } },
    grotta:{ n:"💧 Gallerie sotterranee", b(sc){ drone(sc, [49, 73.42, 98], .8, { cut:300, amp:.06, lfo:.03 }); L.gocce(sc, 1); L.vento(sc, .45, 300); } },
    stanza:{ n:"🕰️ Stanza silenziosa", b(sc){ L.stanza(sc, 1.4); L.pioggia(sc, .35); pad(sc, [[146.83, 174.61, 220], [130.81, 164.81, 196], [116.54, 146.83, 174.61], [110, 138.59, 164.81]], .6, { per:12, cut:800, amp:.026 }); } }
  };
  // livello di ogni ambiente, misurato perché suonino tutti con lo stesso volume
  const LEVEL = {pioggia:0.73, mare:0.45, vicolo:0.98, piazza:1.72, spazio:1.45, natura:1.3, incanto:1.4, neon:0.95, notte:0.7, fronte:1.19, tensione:1.3, incubo:0.98, neve:0.79, campagna:1.6, camino:0.8, stanza:1.24, sera:1.35, grotta:1.64};
  const STORIA = { "napoli-sotto":"grotta", maddalena:"mare", spalloni:"neve", bandito:"natura", montagna:"notte" };
  const GENRE = { giallo:"pioggia", romantico:"sera", vita:"vicolo", fantascienza:"spazio", avventura:"natura", azione:"neon", fantasy:"incanto", malavita:"notte", guerra:"fronte", thriller:"tensione", horror:"incubo", commedia:"piazza", drama:"stanza" };
  function sceneFor(s){
    if(!s) return "stanza";
    if(s.amb && SCENE[s.amb]) return s.amb;
    if(STORIA[s.id]) return STORIA[s.id];
    const g = s.g, txt = [s.place, s.city, s.t].join(" ").toLowerCase();
    if(g !== "fantascienza" && /(sotterrane|grott|catacomb|miniera|cunicol|cripta|caverna)/.test(txt)) return "grotta";
    if(!["fantascienza", "guerra", "horror", "vita", "azione"].includes(g)){
      if(/\b(mare|spiaggia|porto|isola|barca|nave|crociera|costiera|lido|riviera|scogli|traghetto|faro|yacht|arcipelago|laguna)\b/.test(txt)) return "mare";
      if(/\b(neve|innevat\w*|ghiacciai\w*|gelo)\b/.test(txt)) return "neve";
      if(/\b(montagna|montagne|malga|bosco|foresta|baita|sentiero|rifugio|valle|dolomiti|supramonte|alpi)\b/.test(txt)) return "natura";
      if(/\b(campagna|vigna|vigneto|vigneti|uliveto|masseria|cascina|fattoria|podere|langhe)\b/.test(txt)) return "campagna";
      if(/\b(bar|caffè|caffetteria|trattoria|osteria|ristorante|pasticceria|pizzeria)\b/.test(txt)) return "piazza";
    }
    return GENRE[g] || "stanza";
  }

  /* ---------- motore ---------- */
  function tick(){
    if(!ctx) return;
    const now = ctx.currentTime, ahead = now + .6;
    if(temaBus && now > temaFino){ const b = temaBus; temaBus = null; ambG.gain.setTargetAtTime(1, now, .8); setTimeout(() => { try{ b.disconnect(); }catch(e){} }, 300); }
    if(cur && !cur.stopping) cur.evs.forEach(e => {
      let guard = 0;
      while(e.next < ahead && guard++ < 24){
        if(e.next >= now - .05){ try{ e.fn(Math.max(e.next, now + .02)); }catch(err){} }
        e.next += rnd(e.min, e.max);
      }
    });
  }
  function startTimer(){ if(!timer) timer = setInterval(tick, 150); tick(); }
  function apply(){ if(ctx) master.gain.setTargetAtTime(enabled ? vol * .9 : 0, ctx.currentTime, .25); }
  function resume(){ if(ctx && ctx.state === "suspended" && !document.hidden){ try{ ctx.resume().catch(() => {}); }catch(e){} } }
  function fadeOut(sc, d){
    sc.stopping = true;
    const t = ctx.currentTime;
    sc.out.gain.cancelScheduledValues(t); sc.out.gain.setValueAtTime(sc.out.gain.value, t); sc.out.gain.linearRampToValueAtTime(0, t + d);
    fading.push(sc);
    setTimeout(() => {
      sc.srcs.forEach(n => { try{ n.stop(); }catch(e){} });
      try{ sc.out.disconnect(); }catch(e){}
      const i = fading.indexOf(sc); if(i >= 0) fading.splice(i, 1);
    }, (d + .4) * 1000);
  }
  function play(id){
    if(!enabled || !SCENE[id] || !ensure()) return false;
    clearTimeout(idleT);
    if(cur && curId === id && !cur.stopping){ resume(); apply(); return true; }
    const old = cur, sc = Scene(id);
    try{ SCENE[id].b(sc); }catch(e){ return false; }
    const t = ctx.currentTime;
    sc.out.gain.setValueAtTime(0, t); sc.out.gain.linearRampToValueAtTime(LEVEL[id] || 1, t + 2.5);
    cur = sc; curId = id;
    if(old) fadeOut(old, 2.2);
    resume(); apply(); startTimer();
    return true;
  }
  function stop(){
    if(cur){ fadeOut(cur, 1.4); cur = null; curId = ""; }
    stopTema(false);
    clearTimeout(idleT);
    idleT = setTimeout(() => {
      if(cur || temaBus || !ctx) return;
      clearInterval(timer); timer = null;
      try{ ctx.suspend().catch(() => {}); }catch(e){}
    }, 2200);
  }
  document.addEventListener("visibilitychange", () => {
    if(!ctx) return;
    if(document.hidden){ try{ ctx.suspend().catch(() => {}); }catch(e){} }
    else if(cur) resume();
  });
  ["pointerdown", "touchstart", "keydown"].forEach(ev => W.addEventListener(ev, () => { if(cur) resume(); }, { passive:true, capture:true }));

  // misura il volume medio di un ambiente (usata dai test per bilanciare i livelli)
  async function measure(id, sec, hp, keep){
    const OAC = W.OfflineAudioContext || W.webkitOfflineAudioContext;
    if(!OAC || !(SCENE[id] || TEMI[id])) return null;
    const saved = { ctx, master, duckG, ambG, NB, TX, PL };
    const off = new OAC(2, Math.floor(48000 * sec), 48000);
    ctx = off; NB = {}; TX = {}; PL = {}; wire(off, hp); master.gain.value = 1;
    if(TEMI[id]){
      const b = gn(LEVEL_T[id] || 1); b.connect(master); suonaTema(TEMI[id], b, .1, false);
    }else{
      const sc = Scene(id); SCENE[id].b(sc); sc.out.gain.value = LEVEL[id] || 1;
      for(const e of sc.evs){ let guard = 0; while(e.next < sec && guard++ < 400){ if(e.next >= 0){ try{ e.fn(Math.max(e.next, .01)); }catch(err){} } e.next += rnd(e.min, e.max); } }
    }
    let buf;
    try{ buf = await off.startRendering(); }
    finally{ ({ ctx, master, duckG, ambG, NB, TX, PL } = saved); }
    let sum = 0, peak = 0, n = 0, bad = 0;
    for(let c = 0; c < 2; c++){ const d = buf.getChannelData(c); for(let i = 0; i < d.length; i++){ const v = d[i]; if(!isFinite(v)){ bad++; continue; } sum += v * v; n++; if(Math.abs(v) > peak) peak = Math.abs(v); } }
    return { rms:Math.sqrt(sum / Math.max(1, n)), peak, bad, buf:keep ? buf : undefined };
  }

  W.SUONI = {
    supported(){ return !!AC; },
    play, stop, sceneFor,
    name(id){ return (SCENE[id] || {}).n || ""; },
    scenes(){ return Object.keys(SCENE); },
    current(){ return curId; },
    setVolume(v){ vol = Math.max(0, Math.min(1, +v)); apply(); },
    volume(){ return vol; },
    setEnabled(on){ enabled = !!on; if(!enabled) stop(); else apply(); },
    duck(on){
      voceAttiva = !!on;
      if(!ctx || !duckG) return;
      duckG.gain.setTargetAtTime(on ? .35 : 1, ctx.currentTime, .3);
      if(temaBus && temaBus._v) temaBus.gain.setTargetAtTime(temaBus._v * (on ? .55 : 1), ctx.currentTime, .3);
    },
    tema, stopTema(){ stopTema(true); },
    temaAttivo(){ return !!(temaBus && ctx && ctx.currentTime < temaFino); },
    temi(){ return Object.keys(TEMI); },
    unlock(){ resume(); },
    setLevels(o){ Object.assign(LEVEL, o || {}); },
    _measure:measure
  };
})(window);
