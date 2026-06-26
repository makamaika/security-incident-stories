/* =====================================================================
   サイバー事件アーカイブ  —  app logic（依存ライブラリ無し）
   ===================================================================== */
(function () {
  "use strict";
  const D = window.APP_DATA, ART = window.APP_ART;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ---------- モーション設定 ---------- */
  let MOTION = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function applyMotion() {
    document.body.classList.toggle("motion-off", !MOTION);
    document.documentElement.style.scrollBehavior = MOTION ? "smooth" : "auto";
    const t = $("#motion-toggle"); if (t) t.setAttribute("aria-pressed", String(MOTION));
    if (!MOTION) { $$(".reveal").forEach(e => e.classList.add("in")); $$(".cmp-row").forEach(e => e.classList.add("in")); finalizeCounters(); }
    else { $$(".num-card").forEach(c => { delete c.dataset.done; }); triggerVisible(); }
  }

  /* ---------- ビュー切替（ルーター） ---------- */
  const VIEWS = ["home", "story", "game", "numbers", "compare"];
  const NAV = [
    { id: "home", label: "ホーム" }, { id: "story", label: "① 体験" },
    { id: "game", label: "② ゲーム" }, { id: "numbers", label: "③ 数字" }, { id: "compare", label: "④ 比べる" },
  ];
  let currentView = "home";
  function switchView(id, arg) {
    if (!VIEWS.includes(id)) id = "home";
    if (typeof staggerTimers !== "undefined" && staggerTimers.length) { staggerTimers.forEach(clearTimeout); staggerTimers = []; }
    currentView = id;
    VIEWS.forEach(v => $("#view-" + v).classList.toggle("is-active", v === id));
    $$("#topnav button").forEach(b => b.classList.toggle("active", b.dataset.go === id));
    window.scrollTo({ top: 0, behavior: MOTION ? "smooth" : "auto" });
    const view = $("#view-" + id);
    requestAnimationFrame(() => { view.focus({ preventScroll: true }); });
    if (id === "story") setStory(arg || storyKey || "hospital");
    if (id === "game" && arg === "reset") resetGame();
    // ビューを開いた瞬間に、表示済みの数字・カードを起動
    requestAnimationFrame(triggerVisible);
    updateProgress();
  }

  /* ---------- 起動 ---------- */
  function boot() {
    renderNav(); renderHome(); renderNumbers(); renderCompare(); renderTakeaways(); renderSources();
    bindGlobal(); setupObservers(); applyMotion();
    // ハッシュ対応（#game 等で直接開ける）
    const h = (location.hash || "").replace("#", "");
    if (VIEWS.includes(h)) switchView(h); else switchView("home");
    window.addEventListener("scroll", updateProgress, { passive: true });
  }

  /* ---------- ナビ ---------- */
  function renderNav() {
    const nav = $("#topnav");
    NAV.forEach(n => { const b = el("button", null, n.label); b.dataset.go = n.id; nav.appendChild(b); });
  }

  /* ---------- ホーム ---------- */
  function renderHome() {
    $(".hero-kicker").textContent = D.hero.kicker;
    $(".hero-title").innerHTML = D.hero.title;
    $(".hero-lead").innerHTML = D.hero.lead;
    const hub = $("#hub");
    D.hub.forEach((c, i) => {
      const card = el("button", "hub-card reveal");
      card.style.transitionDelay = (i * 70) + "ms";
      card.dataset.go = c.id;
      card.innerHTML = (ART.icons[c.icon] || "") + `<h4>${c.label}</h4><p>${c.desc}</p>`;
      hub.appendChild(card);
    });
    $(".case-hospital .case-one").textContent = D.story.hospital.oneLine;
    $(".case-ntt .case-one").textContent = D.story.ntt.oneLine;
  }

  /* ====================== 紙芝居 ====================== */
  let storyKey = "hospital", sceneIdx = 0, staggerTimers = [];
  function setStory(key) {
    storyKey = (key === "ntt") ? "ntt" : "hospital";
    sceneIdx = 0;
    const s = D.story[storyKey];
    $("#stage").dataset.accent = s.accent;
    $$(".sw-btn").forEach(b => b.classList.toggle("active", b.dataset.story === storyKey));
    $("#scene-total").textContent = s.scenes.length;
    buildDots(s.scenes.length);
    $("#story-end").hidden = true;
    renderScene();
  }
  function buildDots(n) {
    const d = $("#scene-dots"); d.innerHTML = "";
    for (let i = 0; i < n; i++) { const i2 = el("i"); i2.dataset.i = i; d.appendChild(i2); }
  }
  function renderScene() {
    const s = D.story[storyKey], sc = s.scenes[sceneIdx];
    $("#art-slot").innerHTML = ART.scenes[sc.art] || "";
    $("#scene-title").textContent = sc.title;
    $("#scene-now").textContent = sceneIdx + 1;
    $$("#scene-dots i").forEach(d => d.classList.toggle("on", +d.dataset.i === sceneIdx));
    // 本文（行を順に出す）
    staggerTimers.forEach(clearTimeout); staggerTimers = [];
    const body = $("#scene-body"); body.innerHTML = "";
    sc.lines.forEach((line, i) => {
      const p = el("p", null, line);
      body.appendChild(p);
      if (MOTION) staggerTimers.push(setTimeout(() => p.classList.add("show"), 180 + i * 520));
      else p.classList.add("show");
    });
    $$("#scene-body [data-term]").forEach(t => { t.setAttribute("role", "button"); t.setAttribute("tabindex", "0"); t.setAttribute("aria-haspopup", "dialog"); });
    $("#prev-scene").disabled = sceneIdx === 0;
    $("#next-scene").textContent = sceneIdx === s.scenes.length - 1 ? "まとめ →" : "次へ →";
    $("#story-end").hidden = true;
  }
  function nextScene() {
    const s = D.story[storyKey];
    if (sceneIdx < s.scenes.length - 1) { sceneIdx++; renderScene(); scrollStageIntoView(); }
    else showStoryEnd();
  }
  function prevScene() { if (sceneIdx > 0) { sceneIdx--; renderScene(); scrollStageIntoView(); } }
  function jumpScene(i) { sceneIdx = i; renderScene(); scrollStageIntoView(); }
  function scrollStageIntoView() {
    if (!MOTION) return;
    const r = $("#stage").getBoundingClientRect();
    if (r.top < 60 || r.top > 160) $("#stage").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function showStoryEnd() {
    const s = D.story[storyKey];
    const e = $("#story-end"); e.hidden = false;
    $(".end-line").textContent = "——これが「" + s.tag + "」、" + s.name + "。";
    e.scrollIntoView({ behavior: MOTION ? "smooth" : "auto", block: "center" });
  }

  /* ====================== 判断ゲーム ====================== */
  let qIdx = 0, score = 0, answered = false, curOpts = [];
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function resetGame() {
    qIdx = 0; score = 0; answered = false;
    $("#game-intro").hidden = false; $("#game-play").hidden = true; $("#game-result").hidden = true;
    $(".game-intro-lead").textContent = D.game.intro;
  }
  function startGame() {
    qIdx = 0; score = 0;
    $("#game-intro").hidden = true; $("#game-result").hidden = true; $("#game-play").hidden = false;
    $("#g-score").textContent = "0";
    renderQ();
  }
  function renderQ() {
    answered = false;
    const q = D.game.questions[qIdx], total = D.game.questions.length;
    $("#q-now").textContent = qIdx + 1;
    $(".game-qtotal").textContent = "/ " + total;
    $("#game-bar-fill").style.width = (qIdx / total * 100) + "%";
    $("#q-scene").textContent = q.scene;
    curOpts = shuffle(q.options.slice());
    const wrap = $("#q-options"); wrap.innerHTML = "";
    curOpts.forEach((o, i) => {
      const b = el("button", "q-opt", o.t + '<span class="mark"></span>');
      b.dataset.i = i; b.addEventListener("click", () => answer(i));
      wrap.appendChild(b);
    });
    $("#q-feedback").hidden = true;
  }
  function answer(i) {
    if (answered) return; answered = true;
    const q = D.game.questions[qIdx];
    const ok = !!curOpts[i].ok;
    if (ok) score++;
    $("#g-score").textContent = score;
    $$("#q-options .q-opt").forEach((b, j) => {
      b.disabled = true;
      const correct = curOpts[j].ok;
      if (correct) { b.classList.add("correct"); $(".mark", b).textContent = "✓ 正解"; }
      if (j === i && !ok) { b.classList.add("wrong"); $(".mark", b).textContent = "✕ 不正解"; }
    });
    const fb = $("#q-feedback"); fb.hidden = false;
    const v = $(".fb-verdict", fb);
    v.textContent = ok ? "🛡 守れた！" : "💥 やられた…（現実に起きたこと）";
    v.className = "fb-verdict " + (ok ? "ok" : "ng");
    $(".fb-detail", fb).textContent = ok ? q.good : q.bad;
    $(".fb-lesson", fb).textContent = q.lesson;
    $("#game-bar-fill").style.width = ((qIdx + 1) / D.game.questions.length * 100) + "%";
    fb.scrollIntoView({ behavior: MOTION ? "smooth" : "auto", block: "nearest" });
  }
  function nextQ() {
    qIdx++;
    if (qIdx < D.game.questions.length) renderQ(); else showResult();
  }
  function showResult() {
    $("#game-play").hidden = true;
    const r = $("#game-result"); r.hidden = false;
    $("#gr-correct").textContent = score;
    const rank = D.game.ranks.find(x => score >= x.min) || D.game.ranks[D.game.ranks.length - 1];
    $("#gr-rank").textContent = rank.title;
    $("#gr-msg").textContent = rank.msg;
    r.scrollIntoView({ behavior: MOTION ? "smooth" : "auto", block: "center" });
  }

  /* ====================== 数字 ====================== */
  function renderNumbers() {
    $(".num-head-h span").textContent = D.numbers.hospital.title;
    $(".num-head-n span").textContent = D.numbers.ntt.title;
    fillNumGrid($("#num-hospital"), D.numbers.hospital.items);
    fillNumGrid($("#num-ntt"), D.numbers.ntt.items);
  }
  function fillNumGrid(grid, items) {
    items.forEach((it, i) => {
      const card = el("div", "num-card reveal" + (it.zeroGood ? " zero" : ""));
      card.style.transitionDelay = (i * 60) + "ms";
      card.dataset.count = it.value; card.dataset.suffix = it.suffix; card.dataset.prefix = it.prefix || "";
      card.innerHTML = `<div class="big"><span class="num">0</span><span class="suffix">${it.suffix}</span></div>
        <p class="lab">${it.label}</p><p class="nt">${it.note || ""}</p>`;
      grid.appendChild(card);
    });
  }
  function countUp(card) {
    if (card.dataset.done) return; card.dataset.done = "1";
    const target = +card.dataset.count, span = $(".num", card);
    if (!MOTION || target === 0) { span.textContent = target.toLocaleString("ja-JP"); return; }
    const dur = 1200, t0 = performance.now();
    function step(now) {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
      span.textContent = Math.round(target * e).toLocaleString("ja-JP");
      if (p < 1) requestAnimationFrame(step); else span.textContent = target.toLocaleString("ja-JP");
    }
    requestAnimationFrame(step);
  }
  function finalizeCounters() {
    $$(".num-card").forEach(c => { c.dataset.done = "1"; const s = $(".num", c); if (s) s.textContent = (+c.dataset.count).toLocaleString("ja-JP"); });
  }

  /* ====================== 比べる ====================== */
  function renderCompare() {
    const c = D.compare;
    $("#compare-lead").textContent = c.lead;
    $(".cmp-h .cmp-tag").textContent = c.left.tag; $(".cmp-h .cmp-name").textContent = c.left.name;
    $(".cmp-n .cmp-tag").textContent = c.right.tag; $(".cmp-n .cmp-name").textContent = c.right.name;
    const rows = $("#cmp-rows"); rows.innerHTML = "";
    c.rows.forEach((r, i) => {
      const row = el("div", "cmp-row");
      row.style.transitionDelay = (i * 50) + "ms";
      row.innerHTML = `<div class="cmp-k">${r.k}</div><div class="cmp-pair">
        <div class="cmp-cell l">${r.l}</div><div class="cmp-cell r">${r.r}</div></div>`;
      rows.appendChild(row);
    });
    $("#compare-punch").textContent = c.punch;
  }

  /* ====================== 教訓・出典 ====================== */
  function renderTakeaways() {
    $("#ta-title").textContent = D.takeaways.title;
    const g = $("#ta-grid");
    D.takeaways.items.forEach((t, i) => {
      const card = el("div", "ta-card reveal");
      card.style.transitionDelay = (i * 80) + "ms";
      card.innerHTML = `<span class="ta-n">${t.n}</span><div><h4>${t.h}</h4><p>${t.b}</p></div>`;
      g.appendChild(card);
    });
  }
  function renderSources() {
    const ul = $("#src-list");
    D.sources.forEach(s => {
      const li = el("li");
      li.innerHTML = s.url ? `${s.name}<br><a href="${s.url}" target="_blank" rel="noopener">${s.url}</a>` : s.name;
      ul.appendChild(li);
    });
  }

  /* ====================== 用語ポップ ====================== */
  let lastTermTrigger = null;
  function openTerm(key, trigger) {
    const g = D.glossary[key]; if (!g) return;
    lastTermTrigger = trigger || document.activeElement;
    $(".term-h").textContent = g.term; $(".term-b").textContent = g.body;
    $("#term-pop").hidden = false; $("#term-backdrop").hidden = false;
    requestAnimationFrame(() => { const c = $(".term-close"); if (c) c.focus(); });
  }
  function closeTerm() {
    $("#term-pop").hidden = true; $("#term-backdrop").hidden = true;
    if (lastTermTrigger && lastTermTrigger.focus) { lastTermTrigger.focus(); }
    lastTermTrigger = null;
  }

  /* ====================== 監視（IntersectionObserver） ====================== */
  let revealIO, countIO;
  function setupObservers() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(e => e.classList.add("in"));
      $$(".cmp-row").forEach(e => e.classList.add("in"));
      finalizeCounters(); return;
    }
    revealIO = new IntersectionObserver((ents) => {
      ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    $$(".reveal, .cmp-row").forEach(e => revealIO.observe(e));

    countIO = new IntersectionObserver((ents) => {
      ents.forEach(en => { if (en.isIntersecting) { countUp(en.target); countIO.unobserve(en.target); } });
    }, { threshold: 0.4 });
    $$(".num-card").forEach(e => countIO.observe(e));
  }
  // ビューを開いた直後、すでに画面内にある要素を起動
  function triggerVisible() {
    $$("#view-" + currentView + " .num-card").forEach(c => {
      const r = c.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) countUp(c);
    });
    $$("#view-" + currentView + " .reveal, #view-" + currentView + " .cmp-row").forEach(c => {
      const r = c.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) c.classList.add("in");
    });
  }

  /* ====================== 進捗バー ====================== */
  function updateProgress() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? (h.scrollTop || document.body.scrollTop) / max : 0;
    $("#progress span").style.width = Math.max(2, Math.min(100, p * 100)) + "%";
  }

  /* ====================== イベント結線 ====================== */
  function bindGlobal() {
    // data-go（ビュー移動）
    document.addEventListener("click", (e) => {
      const go = e.target.closest("[data-go]");
      if (go) { switchView(go.dataset.go, go.dataset.arg); return; }
      const t = e.target.closest("[data-term]");
      if (t) { openTerm(t.dataset.term, t); return; }
    });
    // 紙芝居
    $("#next-scene").addEventListener("click", nextScene);
    $("#prev-scene").addEventListener("click", prevScene);
    $("#scene-dots").addEventListener("click", (e) => { const i = e.target.dataset.i; if (i != null) jumpScene(+i); });
    $$(".sw-btn").forEach(b => b.addEventListener("click", () => setStory(b.dataset.story)));
    $("#story-other").addEventListener("click", () => setStory(storyKey === "hospital" ? "ntt" : "hospital"));
    // ゲーム
    $("#game-start").addEventListener("click", startGame);
    $("#q-next").addEventListener("click", nextQ);
    $("#game-retry").addEventListener("click", () => { resetGame(); startGame(); });
    // 用語ポップ
    $(".term-close").addEventListener("click", closeTerm);
    $("#term-backdrop").addEventListener("click", closeTerm);
    // モーション切替
    $("#motion-toggle").addEventListener("click", () => { MOTION = !MOTION; applyMotion(); });
    // キーボード（紙芝居）
    document.addEventListener("keydown", (e) => {
      if ($("#term-pop").hidden === false && e.key === "Escape") return closeTerm();
      const af = document.activeElement;
      if (af && af.matches && af.matches("[data-term]") && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); return openTerm(af.dataset.term, af); }
      if (currentView !== "story") return;
      if (e.key === "ArrowRight") nextScene();
      if (e.key === "ArrowLeft") prevScene();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
