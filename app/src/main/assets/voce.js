/* Storie d'Italia – voce narrante.
   App Android: sintesi vocale del telefono (TextToSpeech) attraverso il ponte AndroidAI.
   Web: speechSynthesis del browser.
   Il narratore legge le parti tra *asterischi*; ogni personaggio parla con una voce sua
   (tono e velocità diversi, e una voce diversa quando il telefono ne ha più di una). */
(function(W){
  "use strict";
  const A = W.AndroidAI;
  const NATIVE = !!(A && typeof A.ttsSpeak === "function");
  const SS = !NATIVE && W.speechSynthesis && W.SpeechSynthesisUtterance ? W.speechSynthesis : null;
  const S = { init:false, ready:false, failed:false, code:0, voices:[], narr:"", seq:0, job:null, waiting:null, rate:1 };

  /* ---------- testo → parti da leggere ---------- */
  const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{20E3}]/gu;
  const SPEAKER = /^\s*([A-ZÀ-ÜÌ][\wÀ-ÿ'’.\- ]{0,28}):\s*(?=["“«*])/;
  function cleanT(t){
    return String(t || "").replace(EMOJI, " ").replace(/[*_~`#>|[\]{}]/g, " ").replace(/\s+/g, " ").trim();
  }
  function parse(text){
    const out = [];
    const push = (who, t) => {
      t = cleanT(t);
      if(!t || !/[\p{L}\p{N}]/u.test(t)) return;
      const last = out[out.length - 1];
      if(last && last.who === who) last.t += " " + t; else out.push({ who, t });
    };
    String(text || "").split(/\n+/).forEach(line => {
      let who = "", rest = line;
      const m = line.match(SPEAKER);
      if(m){ who = m[1].trim(); rest = line.slice(m[0].length); }
      const re = /\*([^*]+)\*/g; let i = 0, mm;
      while((mm = re.exec(rest))){
        if(mm.index > i) push(who, rest.slice(i, mm.index));
        push("", mm[1]);
        i = re.lastIndex;
      }
      if(i < rest.length) push(who, rest.slice(i));
    });
    return out;
  }

  /* ---------- chi parla: uomo o donna? ---------- */
  const MALE_A = new Set(["andrea","luca","nicola","mattia","elia","tobia","enea","battista","gianluca","giosuè","joshua","sasha","misha","nikita","ilya","kostya","mustafa","akira","ezra","noa"]);
  const FEM_X = new Set(["beatrice","alice","irene","adele","agnese","rachele","noemi","nicole","matilde","clotilde","ines","miriam","carmen","ester","margot","jade","rose","isabel","chantal","yasmin","ruth","ingrid","astrid","chloe","zoe","michelle","juliet","claire","agnes","beth","kim","ann","grace","mabel","lou","nadine","yvonne","ivonne","geneviève","solange","colette","odette","ludmilla","marion","consuelo","pilar","rocío","mercedes","dolores","catherine","elisabeth","elizabeth","irina"]);
  const F_WORDS = /\b(signora|signorina|nonna|mamma|zia|suor|suora|commissaria|ispettrice|dottoressa|contessa|duchessa|regina|principessa|madre|sorella|figlia|donna|ragazza|lady|miss|mrs|madame|mademoiselle|frau|baronessa|marchesa|maestra|professoressa|avvocata|sindaca|capitana|tenente\s+\w+a\b)/i;
  const M_WORDS = /\b(signor|signore|nonno|papà|papa|zio|don|fra|frate|padre|commissario|ispettore|dottore|dottor|conte|duca|re|principe|fratello|figlio|ragazzo|mister|mr|monsieur|herr|brigadiere|capitano|maresciallo|tenente|sergente|caporale|colonnello|generale|maggiore|barone|marchese|maestro|professore|professor|avvocato|sindaco|prete|parroco|cardinale|monsignore)\b/i;
  function findChar(name, story){
    const n = name.toLowerCase();
    return ((story && story.chars) || []).find(c => [c.n, c.full].filter(Boolean).some(z => {
      z = z.toLowerCase();
      return z === n || z.includes(n) || n.includes(z);
    }));
  }
  const NEUTRAL_TITLES = new Set(["agente","dott","dott.","prof","prof.","avv","avv.","ing","ing.","cap","cap.","sig","sig.","il","lo","la","l'"]);
  function genderOf(name, story){
    const c = findChar(name, story);
    const role = c ? String(c.r || "").trim() : "";
    if(/^(la |una |l'(?=\w+a\b))/i.test(role) || /^(la|una)\s/i.test(name)) return "f";
    if(/^(il |lo |un |uno |i |gli )/i.test(role) || /^(il|lo|un|uno)\s/i.test(name)) return "m";
    const full = ((c && (c.full || c.n)) || name);
    if(F_WORDS.test(full)) return "f";
    if(M_WORDS.test(full)) return "m";
    const words = String(full).split(/\s+/).map(w => w.toLowerCase());
    while(words.length > 1 && NEUTRAL_TITLES.has(words[0])) words.shift();
    const first = (words[0] || "").replace(/[^a-zà-ÿ]/g, "");
    if(MALE_A.has(first)) return "m";
    if(FEM_X.has(first)) return "f";
    if(/a$/.test(first)) return "f";
    if(/[oeiuy]$|[bcdfghjklmnpqrstvwxz]$/.test(first)) return "m";
    return "x";
  }
  const FEM_VOICE = /(female|donna|smtf|alice|federica|paola|elsa|isabella|fabiola|fiamma|imelda|irma|palmira|pierina|emma|lucia|carla|chiara|google italiano)/i;
  const MALE_VOICE = /(\bmale\b|uomo|smtm|luca|cosimo|diego|giuseppe|benigno|calogero|lisandro|rinaldo|giorgio)/i;
  const voiceGender = n => FEM_VOICE.test(n) ? "f" : MALE_VOICE.test(n) ? "m" : "x";
  function hash(s){ let h = 2166136261; for(const ch of String(s)){ h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
  function pickVoice(g, h){
    const list = S.voices;
    if(!list.length) return "";
    const same = list.filter(v => v.g === g);
    const pool = same.length ? same : list;
    return pool[h % pool.length].n;
  }
  function profile(who, story){
    const base = S.rate;
    if(!who) return { v:S.narr, p:1, r:+(base * .97).toFixed(2) };
    const h = hash(who.toLowerCase()), g = genderOf(who, story);
    const p = g === "f" ? 1.12 + (h % 4) * .04 : g === "m" ? .8 + (h % 4) * .04 : .96 + (h % 3) * .04;
    const r = base * (.94 + ((h >>> 3) % 4) * .04);
    return { v:pickVoice(g, h), p:+p.toFixed(2), r:+r.toFixed(2), g };
  }

  /* ---------- lettura ---------- */
  function finish(job, ok){
    if(!job || job.ended) return;
    job.ended = true;
    if(S.job === job) S.job = null;
    try{ job.cb.end && job.cb.end(ok); }catch(e){}
  }
  function fail(job){
    finish(job, false);
    try{ job.cb.error && job.cb.error(S.code); }catch(e){}
  }
  function nativeSpeak(job){
    try{ A.ttsSpeak(JSON.stringify(job.parts.map(p => ({ u:p.u, t:p.t, v:p.v, p:p.p, r:p.r })))); }
    catch(e){ fail(job); }
  }
  function webVoices(){
    if(!SS) return;
    const vs = SS.getVoices().filter(v => /^it/i.test(v.lang));
    S.voices = vs.map(v => ({ n:v.name, g:voiceGender(v.name), local:v.localService }));
    const best = vs.find(v => v.localService) || vs[0];
    S.narr = best ? best.name : "";
    S.ready = true;
  }
  function webSpeak(job){
    SS.cancel();
    setTimeout(() => {
      if(S.job !== job) return;
      const vs = SS.getVoices().filter(v => /^it/i.test(v.lang));
      job.parts.forEach((p, i) => {
        const u = new W.SpeechSynthesisUtterance(p.t);
        u.lang = "it-IT";
        const v = vs.find(z => z.name === p.v) || vs.find(z => z.name === S.narr) || vs[0];
        if(v) u.voice = v;
        u.pitch = p.p; u.rate = p.r;
        u.onstart = () => { if(S.job === job && !job.started){ job.started = true; try{ job.cb.start && job.cb.start(); }catch(e){} } };
        u.onend = () => { if(i === job.parts.length - 1) finish(job, true); };
        u.onerror = e => { if(e && e.error !== "interrupted" && e.error !== "canceled") fail(job); };
        SS.speak(u);
      });
    }, 60);
  }
  function init(){
    if(S.init) return;
    S.init = true;
    if(NATIVE){ try{ A.ttsInit(); }catch(e){ S.failed = true; } }
    else if(SS){ webVoices(); try{ SS.addEventListener("voiceschanged", webVoices); }catch(e){ SS.onvoiceschanged = webVoices; } }
  }
  W.__ttsReady = (ok, json, code) => {
    S.ready = !!ok; S.failed = !ok; S.code = code || 0;
    try{ S.voices = (JSON.parse(json || "[]") || []).map(v => ({ n:String(v.n), g:voiceGender(String(v.n)) })); }catch(e){ S.voices = []; }
    S.narr = "";
    const w = S.waiting; S.waiting = null;
    if(w){ if(ok && S.job === w) nativeSpeak(w); else fail(w); }
  };
  W.__ttsEv = (u, ev) => {
    const j = S.job; if(!j) return;
    const [id, i] = String(u).split("_").map(Number);
    if(j.id !== id) return;
    if(ev === "start"){ if(!j.started){ j.started = true; try{ j.cb.start && j.cb.start(); }catch(e){} } }
    else if(ev === "done"){ if(i === j.parts.length - 1) finish(j, true); }
    else finish(j, false);
  };
  function stop(){
    const j = S.job; S.job = null; S.waiting = null;
    if(j) finish(j, false);
    if(NATIVE){ try{ A.ttsStop(); }catch(e){} }
    else if(SS){ try{ SS.cancel(); }catch(e){} }
  }
  function speak(text, story, cb){
    stop();
    cb = cb || {};
    const parts = parse(text).map((seg, i) => Object.assign({ t:seg.t, who:seg.who }, profile(seg.who, story)));
    const job = { id:++S.seq, parts, cb, started:false, ended:false };
    parts.forEach((p, i) => { p.u = job.id + "_" + i; });
    if(!parts.length){ finish(job, false); return false; }
    S.job = job;
    if(NATIVE){
      init();
      if(S.failed){ fail(job); return false; }
      if(!S.ready){ S.waiting = job; return true; }
      nativeSpeak(job); return true;
    }
    if(SS){ init(); webSpeak(job); return true; }
    fail(job); return false;
  }
  document.addEventListener("visibilitychange", () => { if(document.hidden) stop(); });

  W.VOCE = {
    supported(){ return NATIVE || !!SS; },
    init, speak, stop, parse, genderOf, profile,
    speaking(){ return !!S.job; },
    setRate(r){ S.rate = Math.max(.5, Math.min(2, +r || 1)); },
    missingData(){ return S.failed && (S.code === -1 || S.code === -2); },
    install(){ if(NATIVE && A.ttsInstall){ try{ A.ttsInstall(); }catch(e){} } },
    voices(){ return S.voices.slice(); }
  };
})(window);
