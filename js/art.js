/* =====================================================================
   場面イラスト（インラインSVG）と アイコン
   - 色は CSS変数（--accent, --art-ink, --art-paper ...）で親から着色
   ===================================================================== */
(function () {
  const S = (inner) =>
    `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" class="scene-svg" role="img">${inner}</svg>`;

  // 共通：背景の丸い舞台
  const stage = (extra = "") =>
    `<rect x="0" y="0" width="400" height="280" fill="var(--art-bg)"/>
     <ellipse cx="200" cy="252" rx="150" ry="16" fill="var(--art-shadow)"/>${extra}`;

  const scenes = {
    /* ---------------- 病院 ---------------- */
    "h-morning": S(stage(`
      <circle cx="320" cy="74" r="34" fill="var(--accent-soft)"/>
      <circle cx="320" cy="74" r="22" fill="var(--accent)"/>
      <rect x="96" y="96" width="172" height="138" rx="8" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3"/>
      <rect x="96" y="96" width="172" height="26" rx="6" fill="var(--accent)"/>
      <rect x="168" y="58" width="28" height="28" rx="4" fill="var(--accent)"/>
      <rect x="176" y="50" width="12" height="44" fill="var(--accent)"/><rect x="160" y="66" width="44" height="12" fill="var(--accent)"/>
      <g fill="var(--art-bg)">
        <rect x="116" y="138" width="26" height="26" rx="3"/><rect x="160" y="138" width="26" height="26" rx="3"/><rect x="204" y="138" width="26" height="26" rx="3"/>
        <rect x="116" y="180" width="26" height="26" rx="3"/><rect x="204" y="180" width="26" height="26" rx="3"/>
      </g>
      <rect x="160" y="180" width="26" height="54" rx="3" fill="var(--art-ink)"/>
    `)),

    "h-frozen": S(stage(`
      <rect x="110" y="74" width="180" height="124" rx="8" fill="#11161f" stroke="var(--art-ink)" stroke-width="3"/>
      <rect x="170" y="198" width="60" height="14" fill="var(--art-ink)"/><rect x="150" y="212" width="100" height="10" rx="4" fill="var(--art-ink)"/>
      <g stroke="#3a4150" stroke-width="6" stroke-linecap="round">
        <line x1="138" y1="104" x2="218" y2="104"/><line x1="138" y1="126" x2="246" y2="126"/><line x1="138" y1="148" x2="200" y2="148"/>
      </g>
      <g transform="translate(236,150)">
        <circle r="20" fill="none" stroke="var(--accent)" stroke-width="6" stroke-dasharray="60 30"/>
      </g>
      <text x="200" y="60" text-anchor="middle" font-size="26" fill="var(--accent)">!?</text>
    `)),

    "h-ransom": S(stage(`
      <rect x="110" y="64" width="180" height="130" rx="8" fill="#0b0e14" stroke="var(--accent)" stroke-width="3"/>
      <g transform="translate(200,118)" fill="var(--accent)">
        <circle r="30" fill="#1a1f2b" stroke="var(--accent)" stroke-width="3"/>
        <circle cx="-10" cy="-6" r="6" fill="var(--accent)"/><circle cx="10" cy="-6" r="6" fill="var(--accent)"/>
        <path d="M-14 12 q14 -14 28 0" fill="none" stroke="var(--accent)" stroke-width="3"/>
        <rect x="-4" y="14" width="3" height="8" fill="var(--accent)"/><rect x="1" y="14" width="3" height="8" fill="var(--accent)"/>
      </g>
      <g transform="translate(200,196)">
        <rect x="-22" y="0" width="44" height="36" rx="6" fill="var(--accent)"/>
        <path d="M-14 0 v-10 a14 14 0 0 1 28 0 v10" fill="none" stroke="var(--accent)" stroke-width="6"/>
        <circle cy="16" r="5" fill="#0b0e14"/>
      </g>
      <text x="200" y="56" text-anchor="middle" font-size="15" fill="var(--accent)" font-weight="700">PAY OR LOSE DATA</text>
    `)),

    "h-supply": S(stage(`
      <!-- 給食業者（弱い・小さい） -->
      <rect x="40" y="150" width="96" height="84" rx="6" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3"/>
      <rect x="40" y="150" width="96" height="18" fill="#9aa3b2"/>
      <text x="88" y="226" text-anchor="middle" font-size="12" fill="var(--art-ink)">給食業者</text>
      <!-- 壊れた鍵（脆弱なVPN） -->
      <g transform="translate(88,196)"><circle r="13" fill="none" stroke="var(--accent)" stroke-width="4"/><path d="M0 0 l9 9" stroke="var(--accent)" stroke-width="4"/><path d="M-3 -3 l3 -8" stroke="var(--accent)" stroke-width="3"/></g>
      <!-- 病院（本丸） -->
      <rect x="250" y="108" width="120" height="126" rx="6" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3"/>
      <rect x="250" y="108" width="120" height="20" fill="var(--accent)"/>
      <rect x="300" y="86" width="20" height="20" rx="3" fill="var(--accent)"/><rect x="306" y="80" width="8" height="32" fill="var(--accent)"/><rect x="294" y="92" width="32" height="8" fill="var(--accent)"/>
      <text x="310" y="226" text-anchor="middle" font-size="12" fill="var(--art-ink)">病院</text>
      <!-- 常時接続のパイプ -->
      <path d="M136 188 H250" stroke="var(--accent)" stroke-width="8" stroke-dasharray="2 10" stroke-linecap="round"/>
      <!-- 侵入者 -->
      <g transform="translate(30,150)"><circle cx="0" cy="0" r="9" fill="var(--art-ink)"/><rect x="-7" y="9" width="14" height="20" rx="6" fill="var(--art-ink)"/></g>
    `)),

    "h-spread": S(stage(`
      <g stroke="var(--art-ink)" stroke-width="3">
        <line x1="200" y1="80" x2="110" y2="150"/><line x1="200" y1="80" x2="290" y2="150"/>
        <line x1="110" y1="150" x2="90" y2="214"/><line x1="110" y1="150" x2="170" y2="214"/>
        <line x1="290" y1="150" x2="230" y2="214"/><line x1="290" y1="150" x2="310" y2="214"/>
      </g>
      ${[[200,80,1],[110,150,1],[290,150,0],[90,214,1],[170,214,1],[230,214,0],[310,214,0]].map(([x,y,inf])=>
        `<g transform="translate(${x},${y})"><rect x="-18" y="-14" width="36" height="28" rx="4" fill="${inf?'var(--accent)':'var(--art-paper)'}" stroke="var(--art-ink)" stroke-width="2"/><circle cx="0" cy="0" r="3.5" fill="${inf?'var(--art-paper)':'#9aa3b2'}"/></g>`
      ).join("")}
      <text x="200" y="58" text-anchor="middle" font-size="13" fill="var(--accent)" font-weight="700">芋づる式に感染</text>
    `)),

    "h-paper": S(stage(`
      <rect x="120" y="60" width="120" height="150" rx="8" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3"/>
      <rect x="158" y="50" width="44" height="20" rx="6" fill="#9aa3b2"/>
      <g stroke="var(--art-ink)" stroke-width="4" stroke-linecap="round">
        <line x1="140" y1="92" x2="220" y2="92"/><line x1="140" y1="116" x2="220" y2="116"/><line x1="140" y1="140" x2="200" y2="140"/><line x1="140" y1="164" x2="220" y2="164"/>
      </g>
      <g transform="translate(238,150) rotate(40)"><rect x="-4" y="-44" width="8" height="60" rx="3" fill="var(--accent)"/><path d="M-4 16 L4 16 L0 28 Z" fill="var(--art-ink)"/></g>
      <!-- 救急停止 -->
      <g transform="translate(300,200)"><circle r="26" fill="none" stroke="var(--accent)" stroke-width="6"/><line x1="-18" y1="-18" x2="18" y2="18" stroke="var(--accent)" stroke-width="6"/><text x="0" y="5" text-anchor="middle" font-size="14" fill="var(--accent)" font-weight="700">救急</text></g>
    `)),

    "h-press": S(stage(`
      <rect x="150" y="150" width="100" height="84" rx="6" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3"/>
      <path d="M150 150 h100 l-50 -30 z" fill="var(--accent)"/>
      <rect x="196" y="96" width="8" height="58" fill="var(--art-ink)"/>
      <circle cx="200" cy="92" r="12" fill="var(--art-ink)"/><rect x="192" y="80" width="16" height="10" rx="5" fill="#9aa3b2"/>
      <!-- ビットコインにNO -->
      <g transform="translate(312,84)"><circle r="30" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="3"/><text x="0" y="10" text-anchor="middle" font-size="30" fill="var(--accent)" font-weight="800">₿</text>
      <line x1="-26" y1="26" x2="26" y2="-26" stroke="var(--accent)" stroke-width="6"/></g>
      <text x="200" y="252" text-anchor="middle" font-size="12" fill="var(--art-ink)">当日に記者会見・払わない</text>
    `)),

    "h-recover": S(stage(`
      <g transform="translate(200,140)">
        <path d="M0 -68 L66 -42 V10 C66 50 36 76 0 90 C-36 76 -66 50 -66 10 V-42 Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="3"/>
        <path d="M-26 4 l16 16 l34 -38" fill="none" stroke="var(--accent)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <g transform="translate(78,196)"><rect x="-26" y="-18" width="52" height="36" rx="5" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3"/><circle cx="0" cy="0" r="9" fill="none" stroke="var(--art-ink)" stroke-width="3"/><circle cx="0" cy="0" r="2.5" fill="var(--art-ink)"/><text x="0" y="34" text-anchor="middle" font-size="11" fill="var(--art-ink)">backup</text></g>
      <text x="306" y="120" text-anchor="middle" font-size="34" fill="var(--accent)" font-weight="800">73</text>
      <text x="306" y="142" text-anchor="middle" font-size="13" fill="var(--art-ink)">日で復旧</text>
    `)),

    "h-lesson": S(stage(`
      <g transform="translate(200,130)">
        <circle r="46" fill="var(--accent-soft)"/>
        <path d="M0 -34 a30 30 0 0 0 -18 54 q-2 8 4 12 h28 q6 -4 4 -12 a30 30 0 0 0 -18 -54" fill="var(--accent)"/>
        <rect x="-12" y="34" width="24" height="8" rx="3" fill="var(--art-ink)"/><rect x="-9" y="44" width="18" height="6" rx="3" fill="var(--art-ink)"/>
        <g stroke="var(--accent)" stroke-width="4" stroke-linecap="round"><line x1="48" y1="-46" x2="60" y2="-58"/><line x1="62" y1="-20" x2="78" y2="-24"/><line x1="-48" y1="-46" x2="-60" y2="-58"/><line x1="-62" y1="-20" x2="-78" y2="-24"/></g>
      </g>
      <text x="200" y="232" text-anchor="middle" font-size="13" fill="var(--art-ink)">死者0人。だが“もし”を考えると——</text>
    `)),

    /* ---------------- NTT ---------------- */
    "n-trust": S(stage(`
      <rect x="120" y="170" width="160" height="64" rx="6" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3"/>
      <rect x="232" y="120" width="60" height="44" rx="5" fill="#11161f" stroke="var(--art-ink)" stroke-width="3"/>
      <g transform="translate(176,128)">
        <circle cx="0" cy="0" r="22" fill="var(--accent-soft)" stroke="var(--art-ink)" stroke-width="3"/>
        <circle cx="0" cy="-2" r="10" fill="var(--art-ink)"/><path d="M-15 18 q15 -16 30 0" fill="var(--art-ink)"/>
        <path d="M-22 0 a8 8 0 0 1 -8 8 v6 M22 0 a8 8 0 0 0 8 8 v6" fill="none" stroke="var(--accent)" stroke-width="3"/>
        <rect x="-4" y="20" width="8" height="6" fill="var(--accent)"/>
      </g>
      <rect x="150" y="186" width="26" height="16" rx="3" fill="var(--accent)"/>
      <text x="200" y="252" text-anchor="middle" font-size="12" fill="var(--art-ink)">信頼される保守担当</text>
    `)),

    "n-key": S(stage(`
      <rect x="232" y="92" width="120" height="148" rx="6" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3"/>
      ${[0,1,2,3].map(i=>`<rect x="244" y="${104+i*32}" width="96" height="22" rx="3" fill="var(--art-bg)" stroke="#9aa3b2" stroke-width="2"/><circle cx="256" cy="${115+i*32}" r="3" fill="var(--accent)"/>`).join("")}
      <g transform="translate(120,150) rotate(-30)">
        <circle cx="0" cy="0" r="30" fill="none" stroke="var(--accent)" stroke-width="12"/>
        <rect x="26" y="-7" width="78" height="14" fill="var(--accent)"/>
        <rect x="92" y="7" width="12" height="20" fill="var(--accent)"/><rect x="74" y="7" width="10" height="16" fill="var(--accent)"/>
      </g>
      <text x="110" y="236" text-anchor="middle" font-size="12" fill="var(--art-ink)">特権ID＝マスターキー</text>
    `)),

    "n-usb": S(stage(`
      <g transform="translate(120,150)">
        <rect x="-30" y="-18" width="60" height="40" rx="6" fill="var(--accent)"/>
        <rect x="30" y="-10" width="34" height="24" rx="3" fill="#9aa3b2"/>
        <rect x="-26" y="-12" width="14" height="8" rx="2" fill="var(--art-paper)"/>
      </g>
      ${[[-60,-70],[ -20,-86],[30,-78],[78,-58]].map(([x,y],i)=>`<g transform="translate(${200+x},${150+y})"><rect x="-12" y="-15" width="24" height="30" rx="3" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="2"/><line x1="-6" y1="-6" x2="6" y2="-6" stroke="#9aa3b2" stroke-width="2"/><line x1="-6" y1="0" x2="6" y2="0" stroke="#9aa3b2" stroke-width="2"/><line x1="-6" y1="6" x2="2" y2="6" stroke="#9aa3b2" stroke-width="2"/></g>`).join("")}
      <path d="M236 116 q-40 30 -84 30" fill="none" stroke="var(--accent)" stroke-width="3" stroke-dasharray="4 6" marker-end="url(#arrow-n)"/>
      <defs><marker id="arrow-n" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)"/></marker></defs>
      <text x="300" y="210" text-anchor="middle" font-size="30" fill="var(--accent)" font-weight="800">×10年</text>
    `)),

    "n-sell": S(stage(`
      <g transform="translate(96,150)"><rect x="-26" y="-16" width="52" height="34" rx="5" fill="var(--accent)"/><rect x="26" y="-9" width="26" height="20" rx="3" fill="#9aa3b2"/></g>
      <path d="M150 150 H250" stroke="var(--accent)" stroke-width="4" stroke-dasharray="3 7" marker-end="url(#arrow-n2)"/>
      <defs><marker id="arrow-n2" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 Z" fill="var(--accent)"/></marker></defs>
      <g transform="translate(300,150)">
        <path d="M-34 -8 q34 -34 68 0 v40 a8 8 0 0 1 -8 8 h-52 a8 8 0 0 1 -8 -8 z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="3"/>
        <text x="0" y="26" text-anchor="middle" font-size="30" fill="var(--accent)" font-weight="800">¥</text>
      </g>
      <text x="200" y="120" text-anchor="middle" font-size="13" fill="var(--art-ink)">名簿業者へ約250回</text>
      <text x="300" y="214" text-anchor="middle" font-size="12" fill="var(--art-ink)">約2,500万円</text>
    `)),

    "n-smoke": S(stage(`
      <g transform="translate(150,150)">
        <rect x="-30" y="-50" width="60" height="100" rx="10" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3"/>
        <rect x="-22" y="-40" width="44" height="70" rx="3" fill="#11161f"/>
        <circle cx="0" cy="40" r="5" fill="#9aa3b2"/>
      </g>
      <g transform="translate(252,108)">
        <path d="M0 18 a30 30 0 1 1 6 11 l-22 5 z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="3"/>
        <text x="2" y="2" text-anchor="middle" font-size="28" fill="var(--accent)" font-weight="800">?</text>
      </g>
      <text x="200" y="244" text-anchor="middle" font-size="12" fill="var(--art-ink)">「勧誘電話が来る…情報が漏れてない？」</text>
    `)),

    "n-fakecheck": S(stage(`
      <rect x="96" y="70" width="150" height="160" rx="8" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3"/>
      <g stroke="#9aa3b2" stroke-width="4" stroke-linecap="round">
        <line x1="116" y1="98" x2="226" y2="98"/><line x1="116" y1="120" x2="226" y2="120"/><line x1="116" y1="164" x2="226" y2="164"/><line x1="116" y1="186" x2="200" y2="186"/>
      </g>
      <!-- 改ざんされた行 -->
      <rect x="112" y="134" width="118" height="18" fill="var(--accent-soft)"/>
      <line x1="116" y1="142" x2="226" y2="142" stroke="var(--accent)" stroke-width="4" stroke-linecap="round"/>
      <!-- 虫眼鏡（でも見逃す） -->
      <g transform="translate(280,180)"><circle r="34" fill="none" stroke="var(--art-ink)" stroke-width="6"/><circle r="34" fill="rgba(255,255,255,0.15)"/><line x1="24" y1="24" x2="50" y2="50" stroke="var(--art-ink)" stroke-width="8" stroke-linecap="round"/></g>
      <text x="200" y="58" text-anchor="middle" font-size="12" fill="var(--accent)" font-weight="700">記録を書き換え／見逃す</text>
    `)),

    "n-police": S(stage(`
      <rect x="120" y="96" width="160" height="138" rx="6" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3"/>
      <rect x="120" y="96" width="160" height="22" fill="#9aa3b2"/>
      ${[0,1].map(r=>[0,1,2].map(c=>`<rect x="${140+c*44}" y="${134+r*40}" width="28" height="26" rx="3" fill="var(--art-bg)" stroke="#9aa3b2" stroke-width="2"/>`).join("")).join("")}
      <!-- 捜査バッジ＋虫眼鏡 -->
      <g transform="translate(300,80)">
        <circle r="30" fill="var(--accent)"/>
        <g transform="translate(-3,-3)"><circle r="13" fill="none" stroke="var(--art-paper)" stroke-width="4"/><line x1="9" y1="9" x2="20" y2="20" stroke="var(--art-paper)" stroke-width="5" stroke-linecap="round"/></g>
      </g>
      <text x="200" y="256" text-anchor="middle" font-size="12" fill="var(--art-ink)">家宅捜索で、初めて発覚</text>
    `)),

    "n-fallout": S(stage(`
      ${Array.from({length:22}).map((_,i)=>{const x=40+(i*37%320),y=60+((i*53)%70);return `<circle cx="${x}" cy="${y}" r="3.4" fill="var(--accent)" opacity="0.7"/>`}).join("")}
      <rect x="104" y="94" width="192" height="36" rx="8" fill="var(--art-bg)" opacity="0.82"/>
      <text x="200" y="120" text-anchor="middle" font-size="30" fill="var(--accent)" font-weight="800">928万件</text>
      <!-- 崩れる柱（引責辞任） -->
      <g transform="translate(110,200)"><rect x="-22" y="-44" width="44" height="44" rx="3" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3" transform="rotate(-12)"/><rect x="-30" y="0" width="60" height="10" rx="3" fill="var(--art-ink)"/></g>
      <g transform="translate(290,196)">
        <circle cx="0" cy="-30" r="11" fill="var(--art-ink)"/><path d="M0 -19 l-14 30 M0 -19 l14 30 M-12 -10 l24 0" stroke="var(--art-ink)" stroke-width="5" stroke-linecap="round" fill="none" transform="rotate(20)"/>
      </g>
      <text x="200" y="244" text-anchor="middle" font-size="12" fill="var(--art-ink)">社長は引責辞任</text>
    `)),

    "n-lesson": S(stage(`
      <g transform="translate(200,128)">
        <path d="M-78 0 q78 -58 156 0 q-78 58 -156 0 z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="3"/>
        <circle r="26" fill="var(--art-paper)" stroke="var(--art-ink)" stroke-width="3"/>
        <circle r="12" fill="var(--accent)"/><circle cx="6" cy="-6" r="3.5" fill="var(--art-paper)"/>
      </g>
      <g stroke="var(--art-ink)" stroke-width="3"><line x1="120" y1="196" x2="280" y2="196"/></g>
      ${[0,1,2,3].map(i=>`<rect x="${130+i*38}" y="206" width="26" height="10" rx="3" fill="var(--accent-soft)"/>`).join("")}
      <text x="200" y="246" text-anchor="middle" font-size="12" fill="var(--art-ink)">記録を“見張る”こと</text>
    `)),
  };

  /* ---------------- ハブ用アイコン ---------------- */
  const icons = {
    book:    `<svg viewBox="0 0 48 48" class="hub-ic"><path d="M24 12c-5-3-12-3-16-2v26c4-1 11-1 16 2 5-3 12-3 16-2V10c-4-1-11-1-16 2z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><line x1="24" y1="12" x2="24" y2="38" stroke="currentColor" stroke-width="3"/></svg>`,
    game:    `<svg viewBox="0 0 48 48" class="hub-ic"><rect x="6" y="16" width="36" height="20" rx="10" fill="none" stroke="currentColor" stroke-width="3"/><line x1="15" y1="23" x2="15" y2="29" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="12" y1="26" x2="18" y2="26" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="24" r="2.6" fill="currentColor"/><circle cx="37" cy="29" r="2.6" fill="currentColor"/></svg>`,
    chart:   `<svg viewBox="0 0 48 48" class="hub-ic"><line x1="10" y1="38" x2="40" y2="38" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><rect x="13" y="24" width="6" height="14" rx="2" fill="currentColor"/><rect x="22" y="16" width="6" height="22" rx="2" fill="currentColor"/><rect x="31" y="28" width="6" height="10" rx="2" fill="currentColor"/></svg>`,
    compare: `<svg viewBox="0 0 48 48" class="hub-ic"><line x1="24" y1="8" x2="24" y2="40" stroke="currentColor" stroke-width="3" stroke-dasharray="3 4"/><path d="M18 18l-7 6 7 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 18l7 6-7 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  };

  window.APP_ART = { scenes, icons };
})();
