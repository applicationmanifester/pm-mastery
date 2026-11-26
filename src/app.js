import {
  PRINCIPLES, DOMAINS, PROCESS_GROUPS, METHODS, AGILE, GLOSSARY, FORMULAS,
  AI_TOPICS, REVISE, DOM_DEEP, CH_LESSONS, IO, TAILOR, MMA, KNOWLEDGE_AREAS,
  PROCESS_MATRIX, PEOPLE_CASES, PROCESS_DETAILS, FIELD_GUIDES,
  PRINCIPLE_DETAILS, STUDY_RESOURCES, DNAME, CHN
} from './data/knowledge.js';
import { QUIZ } from './data/quiz.js';
import {
  DAY, CPM_PRESETS, EVM_PRESETS, RISK_PRESET, STAKE_PRESET, LAB_CHALLENGES,
  parseTasks, cpm, calcEVMMetrics, getCorrectiveAction, runMonteCarlo,
  calcPert, calcPTA, sm2Rate, sampleECOExam, todayKey, getStreakInfo,
  buildAdaptivePlan, getEarnedBadges, buildSampleProgress
} from './engines/pm.js';
import {
  esc, money, ICONS, PRINCIPLE_ICONS, quadrant,
  generateDomainSynergyMapSVG, generateProcessPipelineSVG,
  generateStaceyMatrixSVG, generateScrumFlowSVG, generateSCurveSVG,
  generateRadialGaugesSVG, generateMonteCarloSVG, generateRiskHeatmapSVG,
  generateRoadmapSVG, generateCPMGraphSVG, generateCPMGanttSVG,
  generateStakeMatrixSVG
} from './engines/svg.js';

/* ============ Store & Schema v2 ============ */
const $ = id => document.getElementById(id);
let store = {};
try { store = JSON.parse(localStorage.getItem('pmm') || '{}'); } catch (e) { store = {}; }
const save = () => { try { localStorage.setItem('pmm', JSON.stringify(store)); } catch (e) {} };

store.v ??= 2;
store.cert ??= 'PMP';
store.onboarded ??= false;
store.checks ??= {};
store.quizBest ??= 0;
store.srs ??= {};
store.domStats ??= {};
store.chStats ??= {};
store.missed ??= [];
store.activity ??= {};
store.challenges ??= {};
store.customCards ??= [];
store.risks ??= null;
store.stakes ??= null;
store.exam ??= '';
store.dailyGoal ??= 10;
store.isSample ??= false;
store.peopleCases ??= {};
store.theme ??= 'auto';
store.sound ??= true;
store.cpmTab ??= 'graph';
store.fcMode ??= 'srs';
store.fcDeck ??= 'glossary';
store.fcReverse ??= false;
store.fcIdx ??= 0;
store.evmTab ??= 'scurve';
store.riskTab ??= 'mc';
store.procFilter ??= 'all';
store.procView ??= 'matrix';
store.learnTab ??= 'cards';
store.cpmPreset ??= 'software';
store.evmPreset ??= 'custom';
store.kanban ??= {
  backlog: ['User Auth & SSO', 'Payment Gateway Integration', 'Push Notification Service', 'Analytics Dashboard', 'Audit Logging'],
  inProgress: ['Database Indexing', 'API Rate Limiting'],
  testing: ['Password Reset Flow'],
  done: ['Landing Page']
};
save();

function recordActivity(points = 1) {
  const k = todayKey();
  store.activity[k] = (store.activity[k] || 0) + points;
  save();
}

/* ============ Navigation & Pillars ============ */
const PILLARS = [
  { id: 'today', label: 'Today', views: [{ id: 'dash', label: 'Dashboard' }, { id: 'revise', label: 'Checklist & Backup' }, { id: 'legal', label: 'Legal & Privacy' }] },
  { id: 'learn', label: 'Learn', views: [{ id: 'learn', label: 'Principles & Domains' }, { id: 'guide', label: 'Chapter Map' }, { id: 'lessons', label: 'Lessons' }] },
  { id: 'labs', label: 'Labs', views: [{ id: 'cpm', label: 'CPM Network' }, { id: 'evm', label: 'EVM & Advisor' }, { id: 'risk', label: 'Monte Carlo & Risk' }, { id: 'method', label: 'Agile & Kanban' }, { id: 'formulas', label: 'Formulas' }, { id: 'stake', label: 'Stakeholders' }] },
  { id: 'practise', label: 'Practise', views: [{ id: 'flash', label: 'Flashcards' }, { id: 'quiz', label: 'Quiz Drills' }, { id: 'exam', label: 'Exam Simulator' }] },
  { id: 'ref', label: 'Reference', views: [{ id: 'process', label: '49-Process Grid' }, { id: 'ref', label: 'ITTOs & Tailoring' }, { id: 'glossary', label: 'Glossary' }, { id: 'ai', label: 'AI Coach & Prompts' }] }
];

const cur = () => location.hash.slice(1) || 'dash';
const go = v => { if (cur() === v) render(); else location.hash = v; };
const SEARCH = { q: '', prev: 'dash' };

function activePillarFor(viewId) {
  return PILLARS.find(p => p.views.some(v => v.id === viewId)) || PILLARS[0];
}

/* ============ Toast & Inspector Modal ============ */
let toastTimer = null;
function showToast(msg) {
  const el = $('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

function showInspector(title, htmlBody) {
  const m = $('inspector-modal');
  if (!m) return;
  $('insp-title').textContent = title;
  $('insp-body').innerHTML = htmlBody;
  m.classList.add('open');
}
window.showInspector = showInspector;
function closeInspector() {
  const m = $('inspector-modal');
  if (m) m.classList.remove('open');
}

function openAbout() {
  showInspector('About PM Mastery & How to Use', `
    <p><strong>PM Mastery</strong> is a free, offline-ready interactive study hub for <strong>PMP®</strong>, <strong>CAPM®</strong>, and <strong>PMI-ACP®</strong> exam prep, aligned with the <em>PMBOK® Guide – 7th Edition</em> and the official Exam Content Outline (ECO).</p>
    <div style="margin-top:12px">
      <strong>How to Use This App</strong>
      <ol style="margin:8px 0 0 18px;padding:0;display:flex;flex-direction:column;gap:6px">
        <li><strong>Today (Dashboard):</strong> Set your target exam date &amp; daily goal (<code>⚙ Study Goal</code>), track ECO domain readiness (People 42% · Process 50% · Business Env 8%), and follow your Adaptive Study Plan.</li>
        <li><strong>Learn:</strong> Study the 12 Principles (click any card for practical application &amp; exam traps), 8 Performance Domains (click any node on the Synergy Map to inspect), 15 Chapter Deep-Dives, and interactive People Domain Mini-Cases.</li>
        <li><strong>Labs:</strong> Practise hands-on with CPM Network (quick-add tasks, inline duration editing in Schedule Table, CSV export), EVM &amp; Advisor (currency selector &amp; what-if adjustments), Monte Carlo Risk (500–10,000 trials), Agile/Kanban (customizable WIP limits), PERT/PTA Formulas, and Stakeholder Matrix.</li>
        <li><strong>Practise:</strong> Drill SM-2 spaced-repetition Flashcards (with custom decks &amp; CSV export), domain/chapter Quiz Drills, and timed ECO-weighted or Custom Exam Simulations (custom question count, time limit, and domain filter).</li>
        <li><strong>Reference:</strong> Click any of the 49 processes in the Process Grid for full ITTOs &amp; exam tips, browse Tailoring &amp; Official Resources, search the Glossary, or use the AI Prompt Builder.</li>
      </ol>
    </div>
    <div class="card" style="margin-top:12px;background:var(--bg);padding:10px 12px">
      <strong>Shortcuts &amp; Data</strong>
      <div class="m" style="font-size:12.5px;margin-top:4px">
        Press <code>/</code> to search anywhere · <code>Space</code> to flip flashcards · <code>1–4</code> to rate cards or answer quiz questions.<br>
        All progress is saved locally in your browser. Use <strong>Today → Checklist &amp; Backup</strong> to export/import your progress as JSON.
      </div>
    </div>
  `);
}
function openOnboarding() {
  if ($('ob-cert')) $('ob-cert').value = store.cert || 'PMP';
  if ($('ob-date')) $('ob-date').value = store.exam || '';
  if ($('ob-goal')) $('ob-goal').value = store.dailyGoal || 10;
  const m = $('onboard-modal');
  if (m) m.classList.add('open');
}
function skipOnboarding() {
  store.onboarded = true;
  save();
  const m = $('onboard-modal');
  if (m) m.classList.remove('open');
}
function saveOnboarding() {
  const certEl = $('ob-cert');
  const dateEl = $('ob-date');
  const goalEl = $('ob-goal');
  if (certEl) store.cert = certEl.value;
  if (dateEl && dateEl.value) store.exam = dateEl.value;
  if (goalEl) store.dailyGoal = Math.max(3, Math.min(100, +goalEl.value || 10));
  store.onboarded = true;
  save();
  const m = $('onboard-modal');
  if (m) m.classList.remove('open');
  showToast(`Target set: ${store.cert}® (${store.dailyGoal} actions/day)`);
  render();
}
function loadSampleData() {
  Object.assign(store, buildSampleProgress());
  save();
  playSound('ok');
  showToast('Sample progress loaded—explore the dashboard!');
  render();
}
function clearSampleData() {
  store.isSample = false;
  store.activity = {};
  store.srs = {};
  store.checks = {};
  store.domStats = {};
  store.chStats = {};
  store.missed = [];
  store.challenges = {};
  store.quizBest = 0;
  store.exam = '';
  save();
  playSound('click');
  showToast('Sample data cleared. Ready for your own progress!');
  render();
}
function exportStudyReport() {
  const { streak, todayCount } = getStreakInfo(store);
  const mastered = Object.values(store.srs).filter(c => c.r >= 3).length;
  const domLines = [['E', 'People (42%)'], ['P', 'Process (50%)'], ['B', 'Business Env (8%)']].map(([k, lbl]) => {
    const [c, t] = store.domStats[k] || [0, 0];
    return `- ${lbl}: ${t ? Math.round(c / t * 100) + '% (' + c + '/' + t + ')' : 'No attempts'}`;
  }).join('\n');
  const weakLines = weakChapters().map(x => `- Ch. ${x.k} ${CHN[x.k] || ''}: ${x.pct}% (${x.t} Qs)`).join('\n') || '- None identified yet';
  const md = `# PM Mastery Study Report (${store.cert}®)\nDate: ${todayKey()}\nStreak: ${streak} days | Today: ${todayCount}/${store.dailyGoal || 10} actions\nFlashcards Mastered: ${mastered}/${GLOSSARY.length}\nQuiz Best: ${store.quizBest}%\n\n## ECO Domain Readiness\n${domLines}\n\n## Weak Areas\n${weakLines}\n`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([md], { type: 'text/markdown' }));
  a.download = `PM_Mastery_Report_${todayKey()}.md`;
  a.click();
  showToast('Study report exported (.md)');
}

/* ============ Web Audio & Speech ============ */
function playSound(type) {
  if (!store.sound) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    if (type === 'ok') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.start(now); osc.stop(now + 0.25);
    } else if (type === 'bad') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(175, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now); osc.stop(now + 0.3);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now); osc.stop(now + 0.07);
    }
  } catch (e) {}
}

function updateSoundBtn() {
  const b = $('snd');
  if (b) b.textContent = store.sound ? '🔊' : '🔇';
}
function toggleSound() {
  store.sound = !store.sound;
  save(); updateSoundBtn();
  if (store.sound) playSound('click');
}
function speakText(text) {
  if (!('speechSynthesis' in window)) {
    showToast('Text-to-speech not supported in this browser.');
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.96;
  window.speechSynthesis.speak(u);
}

/* ============ Flashcard Decks & SM-2 ============ */
function getFlashDeck(deckKey = store.fcDeck) {
  if (deckKey === 'formulas') {
    return FORMULAS.map(([name, eq, note], idx) => ({
      id: `f_${idx}`,
      t: name,
      d: `${eq} — ${note}`,
      tag: 'FORMULA'
    }));
  }
  if (deckKey === 'agile') {
    return AGILE.map(([t, d], idx) => ({
      id: `a_${idx}`,
      t, d, tag: 'AGILE'
    }));
  }
  if (deckKey === 'custom') {
    return (store.customCards || []).map((c, idx) => ({
      id: `c_${idx}`,
      t: c.t, d: c.d, tag: 'CUSTOM'
    }));
  }
  return GLOSSARY.map(([t, d], idx) => ({
    id: String(idx),
    t, d, tag: 'GLOSSARY'
  }));
}

const FC = { flip: false };
function dueQueue() {
  const now = Date.now();
  const deck = getFlashDeck();
  return deck.map((c, idx) => ({ c, idx }))
    .filter(({ c }) => !store.srs[c.id] || store.srs[c.id].due <= now)
    .sort((a, b) => (store.srs[a.c.id]?.due ?? 0) - (store.srs[b.c.id]?.due ?? 0))
    .map(x => x.idx);
}
function rate(q) {
  const deck = getFlashDeck();
  const queue = dueQueue();
  if (!queue.length) return;
  const card = deck[queue[0]];
  store.srs[card.id] = sm2Rate(store.srs[card.id], q);
  if (q < 3) playSound('bad'); else playSound('ok');
  recordActivity(1);
  save();
  FC.flip = false;
  render();
}
function addCustomCard() {
  const t = ($('cc-term')?.value || '').trim();
  const d = ($('cc-def')?.value || '').trim();
  if (!t || !d) { showToast('Enter both a term and definition.'); return; }
  store.customCards.push({ t, d });
  store.fcDeck = 'custom';
  save();
  showToast('Custom flashcard added!');
  render();
}
function speakCurrentCard(idx) {
  const deck = getFlashDeck();
  const card = deck[idx];
  if (card) speakText(`${card.t}. ${card.d}`);
}
function speakGloss(idx) {
  const item = GLOSSARY[idx];
  if (item) speakText(`${item[0]}. ${item[1]}`);
}

/* ============ Quiz State ============ */
let QZ = { pool: [], i: 0, score: 0, ans: null, multiSel: [], matchSel: {}, mode: null, log: [] };

function recordResult(q, ok) {
  store.domStats[q.d] ??= [0, 0];
  store.domStats[q.d][1]++;
  if (ok) store.domStats[q.d][0]++;
  if (q.c) {
    store.chStats ??= {};
    const c = (store.chStats[q.c] ??= [0, 0]);
    c[1]++;
    if (ok) c[0]++;
  }
  recordActivity(1);
}
function weakChapters() {
  return Object.entries(store.chStats || {})
    .filter(([, [c, t]]) => t >= 3)
    .map(([k, [c, t]]) => ({ k: +k, c, t, pct: Math.round(c / t * 100) }))
    .filter(x => x.pct < 80)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 4);
}
function practiceChapter(c) { startQuiz('c:' + c); go('quiz'); }

function startQuiz(mode) {
  let idx = QUIZ.map((_, i) => i);
  if (mode === 'missed') idx = store.missed.filter(i => i < QUIZ.length);
  else if (mode === 's') idx = idx.filter(i => QUIZ[i].s);
  else if (mode.startsWith('c:')) idx = idx.filter(i => String(QUIZ[i].c) === mode.slice(2));
  else if (mode !== 'all') idx = idx.filter(i => QUIZ[i].d === mode);
  if (!idx.length) {
    showToast('No questions matched that filter; loading all.');
    idx = QUIZ.map((_, i) => i);
  }
  idx.sort(() => Math.random() - 0.5);
  QZ = { pool: idx, i: 0, score: 0, ans: null, multiSel: [], matchSel: {}, mode, log: [] };
  render();
}

function isQuestionCorrect(q, userAns) {
  if (q.type === 'multi') {
    if (!Array.isArray(userAns)) return false;
    const a = [...q.a].sort().join(',');
    const u = [...userAns].sort().join(',');
    return a === u;
  }
  if (q.type === 'match') {
    if (!userAns || typeof userAns !== 'object') return false;
    return q.pairs.every(([, right], idx) => userAns[idx] === right);
  }
  return userAns === q.a;
}

function toggleMultiOpt(k) {
  if (QZ.ans !== null) return;
  const pos = QZ.multiSel.indexOf(k);
  if (pos >= 0) QZ.multiSel.splice(pos, 1);
  else QZ.multiSel.push(k);
  playSound('click');
  render();
}
function submitMultiQ() {
  if (QZ.ans !== null) return;
  const qi = QZ.pool[QZ.i], q = QUIZ[qi];
  QZ.ans = [...QZ.multiSel];
  const ok = isQuestionCorrect(q, QZ.ans);
  finalizeQuizAnswer(qi, q, ok);
}
function setMatchOpt(idx, val) {
  if (QZ.ans !== null) return;
  QZ.matchSel[idx] = val;
}
function submitMatchQ() {
  if (QZ.ans !== null) return;
  const qi = QZ.pool[QZ.i], q = QUIZ[qi];
  QZ.ans = { ...QZ.matchSel };
  const ok = isQuestionCorrect(q, QZ.ans);
  finalizeQuizAnswer(qi, q, ok);
}
function answerQ(k) {
  if (QZ.ans !== null) return;
  const qi = QZ.pool[QZ.i], q = QUIZ[qi];
  QZ.ans = k;
  const ok = k === q.a;
  finalizeQuizAnswer(qi, q, ok);
}
function finalizeQuizAnswer(qi, q, ok) {
  if (ok) { QZ.score++; playSound('ok'); } else { playSound('bad'); }
  QZ.log.push({ qi, ok });
  recordResult(q, ok);
  if (!ok && !store.missed.includes(qi)) store.missed.push(qi);
  if (ok) store.missed = store.missed.filter(x => x !== qi);
  save();
  render();
}
function nextQ() {
  QZ.i++;
  QZ.ans = null;
  QZ.multiSel = [];
  QZ.matchSel = {};
  playSound('click');
  render();
}

/* ============ Risk & Stakeholder State ============ */
const risks = () => store.risks || RISK_PRESET;
const persistRisks = r => { store.risks = r; save(); };
const stakes = () => store.stakes || STAKE_PRESET;

function completeChallenge(id, label) {
  if (!store.challenges[id]) {
    store.challenges[id] = Date.now();
    recordActivity(3);
    save();
    showToast(`Challenge Solved: ${label}!`);
  }
}

/* ============ Search Index ============ */
function buildIndex() {
  const x = [];
  PRINCIPLES.forEach(([t, d]) => x.push({ v: 'learn', t, d }));
  DOMAINS.forEach(([t, d]) => x.push({ v: 'learn', t, d }));
  DOM_DEEP.forEach(([t, d]) => x.push({ v: 'lessons', t: 'Domain: ' + t, d }));
  CH_LESSONS.forEach(([n, t, d]) => x.push({ v: 'lessons', t: `Ch. ${n}: ${t}`, d }));
  PROCESS_GROUPS.forEach(([n, d, l]) => { x.push({ v: 'process', t: n, d }); l.forEach(p => x.push({ v: 'process', t: p, d: n })); });
  IO.forEach(([p, i, o]) => x.push({ v: 'ref', t: 'ITTO: ' + p, d: `Inputs: ${i} · Outputs: ${o}` }));
  METHODS.concat(AGILE).forEach(([t, d]) => x.push({ v: 'method', t, d }));
  FORMULAS.forEach(([a, b, c]) => x.push({ v: 'formulas', t: a, d: b + ' · ' + c }));
  GLOSSARY.forEach(([t, d]) => x.push({ v: 'glossary', t, d }));
  AI_TOPICS.forEach(([t, d]) => x.push({ v: 'ai', t, d }));
  QUIZ.forEach((q, idx) => x.push({ v: 'quiz', t: `Q${idx + 1} (${DNAME[q.d]}${q.c ? ' · Ch.' + q.c : ''}): ${q.q.slice(0, 90)}${q.q.length > 90 ? '…' : ''}`, d: q.e }));
  return x;
}
function doSearch(q) {
  if (cur() !== 'search') SEARCH.prev = cur();
  SEARCH.q = q;
  if (!q.trim()) { if (cur() === 'search') go(SEARCH.prev || 'dash'); return; }
  if (cur() !== 'search') { location.hash = 'search'; return; }
  render();
}

/* ============ Views ============ */
const V = {};

V.dash = () => {
  const done = REVISE.filter((_, i) => store.checks['r' + i]).length;
  const pct = Math.round(done / REVISE.length * 100);
  const mastered = Object.values(store.srs).filter(c => c.r >= 3).length;
  const { streak, todayCount, last7 } = getStreakInfo(store);
  const goal = store.dailyGoal || 10;
  const goalPct = Math.min(100, Math.round((todayCount / goal) * 100));
  const plan = buildAdaptivePlan(store, GLOSSARY.length, QUIZ);
  const solvedCount = Object.keys(store.challenges || {}).length;
  const badges = getEarnedBadges(store);
  const isFresh = Object.keys(store.activity || {}).length === 0 && Object.keys(store.srs || {}).length === 0 && Object.keys(store.domStats || {}).length === 0;

  return `
  <div class="row" style="justify-content:space-between;margin-bottom:8px">
    <div>
      <h2 style="margin:0">Study Dashboard</h2>
      <p class="m" style="margin:2px 0 0">Track readiness for <strong>${esc(store.cert)}®</strong> across ECO domains, flashcards, and graded labs.</p>
    </div>
    <div class="row">
      <button class="btn2" onclick="exportStudyReport()" title="Download Markdown Study Report">📄 Export Report</button>
      <button class="btn2" onclick="window.print()" title="Print or Save as PDF">🖨 Print / PDF</button>
      <button class="btn2" onclick="openOnboarding()">⚙ Study Goal</button>
    </div>
  </div>

  ${store.isSample ? `
    <div class="card" style="border-left:4px solid var(--warn);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
      <div><strong>Previewing Sample Progress</strong><div class="m" style="font-size:12.5px">Explore how streaks, domain readiness, and weak-area drills look with realistic data.</div></div>
      <button class="btn2" onclick="clearSampleData()">Clear Sample Data</button>
    </div>` : ''}

  ${isFresh ? `
    <div class="card" style="border-left:4px solid var(--ok)">
      <div class="row" style="justify-content:space-between;margin-bottom:6px">
        <h3 style="margin:0">👋 Start Here: 4-Step Guided Path</h3>
        <button class="btn2" style="font-size:12px;padding:4px 10px" onclick="loadSampleData()">Preview Sample Data</button>
      </div>
      <p class="m" style="font-size:13px;margin:0 0 10px">New to PM Mastery? Follow this sequence to build momentum fast:</p>
      <div class="grid">
        <a class="card" style="margin:0;padding:12px;text-decoration:none" href="#learn"><strong>1. Principles &amp; Domains</strong><div class="m" style="font-size:12px">PMBOK 7 mindset foundation →</div></a>
        <a class="card" style="margin:0;padding:12px;text-decoration:none" href="#process"><strong>2. 49-Process Grid</strong><div class="m" style="font-size:12px">Lifecycle &amp; ITTO mapping →</div></a>
        <a class="card" style="margin:0;padding:12px;text-decoration:none" href="#flash"><strong>3. SM-2 Flashcards</strong><div class="m" style="font-size:12px">Active recall on key terms →</div></a>
        <a class="card" style="margin:0;padding:12px;text-decoration:none" href="#quiz"><strong>4. Practice Quiz</strong><div class="m" style="font-size:12px">Unlock ECO domain readiness →</div></a>
      </div>
    </div>` : ''}

  <div class="grid">
    <div class="card">
      <div class="m">Daily Streak &amp; Goal</div>
      <div class="stat">${streak} day${streak === 1 ? '' : 's'} 🔥</div>
      <div class="row" style="justify-content:space-between;font-size:12px;margin-top:4px">
        <span class="m">Today: <strong>${todayCount} / ${goal}</strong> actions</span>
        <span style="color:var(--a);font-weight:600">${goalPct}%</span>
      </div>
      <div class="bar" style="margin-top:4px"><span style="width:${goalPct}%"></span></div>
      <div class="heat-strip">
        ${last7.map(d => {
          const lvl = d.count >= 10 ? 'lvl3' : d.count >= 4 ? 'lvl2' : d.count > 0 ? 'lvl1' : '';
          return `<div class="heat-day"><div class="heat-box ${lvl}" title="${d.date}: ${d.count}"></div>${d.date.slice(8)}</div>`;
        }).join('')}
      </div>
    </div>

    <div class="card">
      <div class="m">Exam Target Date</div>
      <div class="stat">${plan.daysLeft === null ? '—' : plan.daysLeft >= 0 ? plan.daysLeft + ' days' : 'Passed'}</div>
      <input type="date" value="${esc(store.exam)}" onchange="store.exam=this.value;save();render()" style="margin-top:8px">
    </div>

    <div class="card">
      <div class="m">Cards Mastered</div>
      <div class="stat">${mastered} / ${GLOSSARY.length}</div>
      <div class="m" style="font-size:12px;margin-top:4px">${plan.dueCount} due now in SM-2 queue</div>
      <div class="bar" style="margin-top:8px"><span style="width:${Math.round(mastered / GLOSSARY.length * 100)}%"></span></div>
    </div>

    <div class="card">
      <div class="m">Lab Challenges &amp; Revision</div>
      <div class="stat">${solvedCount}/${LAB_CHALLENGES.length} Labs · ${pct}%</div>
      <div class="m" style="font-size:12px;margin-top:4px">Quiz Best: <strong>${store.quizBest}%</strong></div>
      <div class="bar" style="margin-top:8px"><span style="width:${pct}%"></span></div>
    </div>
  </div>

  <div class="card" style="border-left:4px solid var(--a)">
    <h3 style="margin-top:0">🎯 Today's Adaptive Study Plan</h3>
    <p class="m" style="font-size:13px;margin-top:0">Prioritized for your due SRS queue, weakest chapters, and remaining lab challenges.</p>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${plan.tasks.map(t => `
        <div class="row" style="justify-content:space-between;padding:10px 12px;background:var(--bg);border:1px solid var(--b);border-radius:10px">
          <div>
            <strong>${esc(t.title)}</strong>
            <div class="m" style="font-size:12px">${esc(t.meta)}</div>
          </div>
          ${t.action
            ? `<button class="btn" onclick="${t.action}">${esc(t.cta)}</button>`
            : `<a class="btn" href="${t.href}">${esc(t.cta)}</a>`}
        </div>
      `).join('')}
    </div>
  </div>

  <div class="card"><h3>PMP® Exam Domain Readiness</h3>
    <p class="m" style="margin-bottom:10px">Your accuracy vs. official PMP® ECO weights (People 42% · Process 50% · Business Env 8%).</p>
    ${[['E', 'People', 42], ['P', 'Process', 50], ['B', 'Business Environment', 8]].map(([k, label, wt]) => {
      const st = store.domStats[k] || [0, 0];
      const acc = st[1] ? Math.round(st[0] / st[1] * 100) : 0;
      const tier = !st[1] ? 'No data' : acc >= 75 ? 'Above Target' : acc >= 61 ? 'Target' : 'Below Target';
      const col = !st[1] ? 'var(--m)' : acc >= 75 ? 'var(--ok)' : acc >= 61 ? 'var(--warn)' : 'var(--bad)';
      return `<div style="margin:10px 0">
        <div class="row" style="justify-content:space-between;font-size:13px">
          <span><strong>${label}</strong> <span class="tag">${wt}% Exam Weight</span></span>
          <span style="color:${col};font-weight:700">${st[1] ? `${acc}% (${st[0]}/${st[1]}) · ${tier}` : 'No attempts yet'}</span>
        </div>
        <div class="bar" style="margin-top:4px"><span style="width:${acc}%;background:${col}"></span></div>
      </div>`;
    }).join('')}
  </div>

  <div class="card"><h3>Weak Areas Review</h3>${(() => {
    const w = weakChapters();
    return w.length
      ? w.map(x => `<div class="row" style="justify-content:space-between;padding:4px 0"><span>Ch. ${x.k} ${esc(CHN[x.k] || '')} <span class="tag crit">${x.pct}% of ${x.t}</span></span><button class="btn2" onclick="practiceChapter(${x.k})">Practise</button></div>`).join('')
      : '<p class="m">Answer at least 3 questions in a chapter to unlock personalized weak-area drills.</p>';
  })()}</div>

  <div class="card">
    <div class="row" style="justify-content:space-between;margin-bottom:8px">
      <h3 style="margin:0">Study Milestones</h3>
      <span class="tag">${badges.filter(b => b.earned).length} / ${badges.length} Earned</span>
    </div>
    <div class="grid">
      ${badges.map(b => `
        <div class="badge-item ${b.earned ? 'earned' : ''}">
          <div style="font-size:22px">${b.icon}</div>
          <div>
            <strong style="font-size:13px">${esc(b.title)}</strong>
            <div class="m" style="font-size:11.5px">${esc(b.desc)}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
};

function inspectPrinciple(idx) {
  const p = PRINCIPLES[idx];
  const det = PRINCIPLE_DETAILS[idx];
  if (!p || !det) return;
  playSound('click');
  const speech = `${p[0]}. ${p[1]} Application: ${det.app} Exam trap: ${det.trap}`;
  showInspector(`Principle ${idx + 1}: ${p[0]}`, `
    <p style="margin:0 0 10px;color:var(--t)">${esc(p[1])}</p>
    <div style="display:flex;flex-direction:column;gap:8px;font-size:13px">
      <div style="padding:8px 10px;background:var(--bg);border:1px solid var(--b);border-radius:8px">
        <strong style="color:var(--t)">In Practice:</strong> ${esc(det.app)}
      </div>
      <div style="padding:8px 10px;background:var(--hi);border:1px solid var(--a);border-radius:8px;color:var(--t)">
        <strong>⚠️ Exam Trap:</strong> ${esc(det.trap)}
      </div>
    </div>
    <div class="row" style="justify-content:space-between;margin-top:14px">
      <button class="btn2" onclick="speakText(${esc(JSON.stringify(speech))})">🔊 Listen</button>
      <button class="btn" onclick="closeInspector();go('lessons')">Explore Domain Mini-Cases →</button>
    </div>
  `);
}

function renderFieldGuide(key) {
  const g = FIELD_GUIDES[key];
  if (!g) return '';
  return `<details class="card">
    <summary><strong>📖 ${esc(g.title)}</strong> <span class="m" style="font-size:12px">(Click to expand field-by-field guide)</span></summary>
    <p class="m" style="margin:8px 0 10px;font-size:13px">${esc(g.summary)}</p>
    <div class="table-wrap">
      <table>
        <tr><th style="width:32%">Field / Metric</th><th>What It Means &amp; How to Interpret</th></tr>
        ${g.fields.map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td class="m">${esc(v)}</td></tr>`).join('')}
      </table>
    </div>
  </details>`;
}

V.learn = () => `
  <h2>Principles &amp; Performance Domains</h2>
  <p class="m">Foundational guidelines from the PMBOK® Guide 7th Edition. <strong>Click any principle or domain</strong> to inspect real-world application and exam traps.</p>
  <div class="card">
    <div class="row" style="justify-content:space-between;margin-bottom:12px">
      <h3>12 Project Management Principles</h3>
      <div class="seg">
        <button class="${store.learnTab === 'cards' ? 'active' : ''}" onclick="store.learnTab='cards';save();render()">Visual Cards</button>
        <button class="${store.learnTab === 'table' ? 'active' : ''}" onclick="store.learnTab='table';save();render()">Reference Table</button>
      </div>
    </div>
    ${store.learnTab === 'cards' ? `
      <div class="grid">
        ${PRINCIPLES.map(([t, d], idx) => `
          <button type="button" class="card" style="margin:0;display:flex;flex-direction:column;gap:8px;text-align:left;cursor:pointer;font:inherit;color:inherit" onclick="inspectPrinciple(${idx})">
            <div class="row" style="color:var(--a);gap:8px">${PRINCIPLE_ICONS[idx] || ''}<strong>${esc(t)}</strong></div>
            <p class="m" style="font-size:13px;margin:0;line-height:1.5">${esc(d)}</p>
            <span style="font-size:11.5px;color:var(--a);font-weight:600;margin-top:auto">View Application &amp; Exam Trap →</span>
          </button>
        `).join('')}
      </div>
    ` : `<div class="table-wrap"><table>${PRINCIPLES.map(([t, d], idx) => `<tr><th style="width:28%"><button type="button" class="pill pill-btn" onclick="inspectPrinciple(${idx})">${esc(t)}</button></th><td>${esc(d)}</td></tr>`).join('')}</table></div>`}
  </div>
  <div class="card">
    <h3>8 Performance Domains Synergy Map</h3>
    <p class="m">Click any domain node on the diagram to inspect its details.</p>
    ${generateDomainSynergyMapSVG()}
    <table>${DOMAINS.map(([t, d], i) => `<tr><th style="width:28%">${i + 1}. ${esc(t)}</th><td>${esc(d)}</td></tr>`).join('')}</table>
  </div>`;

function findProcessDetail(name) {
  if (PROCESS_DETAILS[name]) return { key: name, ...PROCESS_DETAILS[name] };
  const norm = s => s.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, ' ').trim();
  const target = norm(name);
  for (const [k, v] of Object.entries(PROCESS_DETAILS)) {
    if (norm(k) === target) return { key: k, ...v };
  }
  return null;
}

function inspectProcess(name) {
  const d = findProcessDetail(name);
  if (!d) return;
  playSound('click');
  const speech = `${d.key}. ${d.pg} process group, ${d.ka} knowledge area. ${d.purpose} Exam tip: ${d.tip}`;
  showInspector(d.key, `
    <div class="row" style="margin-bottom:10px">
      <span class="tag">${esc(d.pg)}</span>
      <span class="tag">${esc(d.ka)}</span>
      <span class="tag">Ch. ${d.ch}</span>
    </div>
    <p style="margin:0 0 10px;color:var(--t)">${esc(d.purpose)}</p>
    <div style="display:flex;flex-direction:column;gap:8px;font-size:13px">
      <div style="padding:8px 10px;background:var(--bg);border:1px solid var(--b);border-radius:8px">
        <strong style="color:var(--t)">Key Inputs:</strong> ${esc(d.inputs)}
      </div>
      <div style="padding:8px 10px;background:var(--bg);border:1px solid var(--b);border-radius:8px">
        <strong style="color:var(--t)">Tools &amp; Techniques:</strong> ${esc(d.tools)}
      </div>
      <div style="padding:8px 10px;background:var(--bg);border:1px solid var(--b);border-radius:8px">
        <strong style="color:var(--t)">Key Outputs:</strong> ${esc(d.outputs)}
      </div>
      <div style="padding:8px 10px;background:var(--hi);border:1px solid var(--a);border-radius:8px;color:var(--t)">
        <strong>💡 Exam Tip:</strong> ${esc(d.tip)}
      </div>
    </div>
    <div class="row" style="justify-content:space-between;margin-top:14px">
      <button class="btn2" onclick="speakText(${esc(JSON.stringify(speech))})">🔊 Listen</button>
      <button class="btn" onclick="closeInspector();practiceChapter(${d.ch})">Practise Ch. ${d.ch} Quiz →</button>
    </div>
  `);
}

V.process = () => {
  const filter = store.procFilter || 'all';
  const viewType = store.procView || 'matrix';
  const displayedGroups = filter === 'all' ? PROCESS_GROUPS : PROCESS_GROUPS.filter(g => g[0] === filter);
  const procBtn = p => `<button type="button" class="pill pill-btn" style="margin:2px;font-size:11px" onclick="inspectProcess('${esc(p)}')">${esc(p)}</button>`;
  return `
  <h2>Process Groups &amp; 49 Processes Matrix</h2>
  <p class="m">Classic PMBOK® framework across 5 Process Groups and 10 Knowledge Areas. <strong>Click any process</strong> for its purpose, ITTOs, exam tip, and chapter quiz.</p>
  <div class="card">
    <div class="row" style="justify-content:space-between;margin-bottom:10px">
      <div class="seg">
        <button class="${viewType === 'matrix' ? 'active' : ''}" onclick="store.procView='matrix';save();render()">49-Process Grid Matrix</button>
        <button class="${viewType === 'flow' ? 'active' : ''}" onclick="store.procView='flow';save();render()">Lifecycle Pipeline</button>
      </div>
      <span class="m">Total Processes: <strong>49</strong></span>
    </div>
    ${viewType === 'flow' ? `
      <p class="m" style="font-size:13px">Click any process group box to filter processes below:</p>
      ${generateProcessPipelineSVG(filter)}
      <div class="row" style="margin-top:12px">
        <button class="${filter === 'all' ? 'btn' : 'btn2'}" onclick="setProcessGroup('all')">Show All (49)</button>
        ${PROCESS_GROUPS.map(g => `<button class="${filter === g[0] ? 'btn' : 'btn2'}" onclick="setProcessGroup('${esc(g[0])}')">${esc(g[0])} (${g[2].length})</button>`).join('')}
      </div>
    ` : `
      <div class="table-wrap">
        <table style="font-size:12px">
          <tr>
            <th>Knowledge Area</th><th>Initiating (2)</th><th>Planning (24)</th><th>Executing (10)</th><th>Monitoring &amp; Controlling (12)</th><th>Closing (1)</th>
          </tr>
          ${PROCESS_MATRIX.map(([ka, ini, pln, exe, mon, cls]) => `
            <tr>
              <th style="background:var(--bg);white-space:nowrap">${esc(ka)}</th>
              <td>${ini.map(procBtn).join('') || '<span class="m">—</span>'}</td>
              <td>${pln.map(procBtn).join('') || '<span class="m">—</span>'}</td>
              <td>${exe.map(procBtn).join('') || '<span class="m">—</span>'}</td>
              <td>${mon.map(procBtn).join('') || '<span class="m">—</span>'}</td>
              <td>${cls.map(procBtn).join('') || '<span class="m">—</span>'}</td>
            </tr>
          `).join('')}
        </table>
      </div>
    `}
  </div>
  ${viewType === 'flow' ? displayedGroups.map(([n, d, l]) => `
    <div class="card">
      <div class="row" style="justify-content:space-between"><h3>${esc(n)}</h3><span class="tag">${l.length} Processes</span></div>
      <p class="m">${esc(d)}</p>
      <div class="row">${l.map(p => `<button type="button" class="pill pill-btn" onclick="inspectProcess('${esc(p)}')">${esc(p)}</button>`).join('')}</div>
    </div>
  `).join('') : ''}`;
};
function setProcessGroup(g) { store.procFilter = (store.procFilter === g) ? 'all' : g; save(); playSound('click'); render(); }

/* ============ Kanban & Methods ============ */
function renderKanbanSimulator() {
  const k = store.kanban;
  const wipInProg = store.kanbanWipInProg || 2, wipTest = store.kanbanWipTest || 2;
  const inProgFull = k.inProgress.length >= wipInProg;
  const testFull = k.testing.length >= wipTest;
  if (k.done.length >= 3) completeChallenge('kanban_flow', 'Kanban Flow Master');

  const solved = !!store.challenges.kanban_flow;
  return `
    <div class="card">
      <div class="challenge-box ${solved ? 'solved' : ''}">
        <div class="row" style="justify-content:space-between">
          <strong>${solved ? '✅ Lab Challenge Solved' : '🏆 Lab Challenge: Kanban Flow'}</strong>
          <span class="tag ${solved ? 'ok' : 'warn'}">${k.done.length} / 3 Done</span>
        </div>
        <div class="m" style="font-size:12.5px;margin-top:4px">${LAB_CHALLENGES[3].prompt}</div>
      </div>
      <div class="row" style="justify-content:space-between;margin-bottom:10px;flex-wrap:wrap;gap:8px">
        <div>
          <h3 style="margin:0">Interactive Kanban Board Simulator</h3>
          <p class="m" style="margin:2px 0 0;font-size:12px">Enforces WIP limits to demonstrate Little's Law &amp; bottleneck prevention.</p>
        </div>
        <div class="row" style="gap:8px;flex-wrap:wrap">
          <label for="wipProgSel" style="margin:0;font-size:12px">In-Prog WIP:</label>
          <select id="wipProgSel" style="width:auto" onchange="store.kanbanWipInProg=parseInt(this.value,10);save();render()">
            ${[1, 2, 3, 4, 5].map(n => `<option value="${n}" ${wipInProg === n ? 'selected' : ''}>${n}</option>`).join('')}
          </select>
          <label for="wipTestSel" style="margin:0;font-size:12px">QA WIP:</label>
          <select id="wipTestSel" style="width:auto" onchange="store.kanbanWipTest=parseInt(this.value,10);save();render()">
            ${[1, 2, 3, 4, 5].map(n => `<option value="${n}" ${wipTest === n ? 'selected' : ''}>${n}</option>`).join('')}
          </select>
          <button type="button" class="btn2" onclick="resetKanban()">↺ Reset Board</button>
        </div>
      </div>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(190px,1fr))">
        <div class="card" style="margin:0;background:var(--bg);padding:10px">
          <div class="row" style="justify-content:space-between;margin-bottom:8px"><strong>Backlog</strong><span class="pill">${k.backlog.length}</span></div>
          ${k.backlog.map(t => `<div class="card" style="margin:6px 0;padding:8px;font-size:12px">${esc(t)}</div>`).join('')}
          ${k.backlog.length ? `<button class="btn2" style="width:100%;font-size:12px;margin-top:6px" onclick="pullToInProgress()" ${inProgFull ? 'disabled' : ''}>Pull to In Progress →</button>` : '<p class="m" style="font-size:11px">Backlog empty</p>'}
        </div>
        <div class="card" style="margin:0;background:var(--bg);padding:10px;${inProgFull ? 'border-color:var(--warn);' : ''}">
          <div class="row" style="justify-content:space-between;margin-bottom:8px"><strong>In Progress</strong><span class="tag ${inProgFull ? 'crit' : ''}">WIP: ${k.inProgress.length}/${wipInProg}</span></div>
          ${k.inProgress.map((t, i) => `<div class="card" style="margin:6px 0;padding:8px;font-size:12px"><div>${esc(t)}</div><button class="btn2" style="padding:2px 6px;font-size:11px;margin-top:6px" onclick="moveToTesting(${i})" ${testFull ? 'disabled' : ''}>Move to QA →</button></div>`).join('')}
          ${inProgFull ? `<p class="neg" style="font-size:11px;margin:4px 0 0">⚠️ WIP Limit reached! Finish work before pulling more.</p>` : ''}
        </div>
        <div class="card" style="margin:0;background:var(--bg);padding:10px;${testFull ? 'border-color:var(--warn);' : ''}">
          <div class="row" style="justify-content:space-between;margin-bottom:8px"><strong>Testing / QA</strong><span class="tag ${testFull ? 'crit' : ''}">WIP: ${k.testing.length}/${wipTest}</span></div>
          ${k.testing.map((t, i) => `<div class="card" style="margin:6px 0;padding:8px;font-size:12px"><div>${esc(t)}</div><button class="btn2" style="padding:2px 6px;font-size:11px;margin-top:6px" onclick="moveToDone(${i})">Complete ✓</button></div>`).join('')}
          ${testFull ? `<p class="neg" style="font-size:11px;margin:4px 0 0">⚠️ QA Bottleneck! Swarm on QA before pushing more.</p>` : ''}
        </div>
        <div class="card" style="margin:0;background:var(--bg);padding:10px">
          <div class="row" style="justify-content:space-between;margin-bottom:8px"><strong>Done</strong><span class="tag ok">${k.done.length}</span></div>
          ${k.done.map(t => `<div class="card" style="margin:6px 0;padding:8px;font-size:12px;border-left:3px solid var(--ok)">✓ ${esc(t)}</div>`).join('')}
        </div>
      </div>
    </div>`;
}
function pullToInProgress() { const k = store.kanban; if (!k.backlog.length || k.inProgress.length >= (store.kanbanWipInProg || 2)) return; k.inProgress.push(k.backlog.shift()); save(); playSound('click'); render(); }
function moveToTesting(idx) { const k = store.kanban; if (k.testing.length >= (store.kanbanWipTest || 2)) return; k.testing.push(k.inProgress.splice(idx, 1)[0]); save(); playSound('click'); render(); }
function moveToDone(idx) { const k = store.kanban; k.done.push(k.testing.splice(idx, 1)[0]); recordActivity(1); save(); playSound('ok'); render(); }
function resetKanban() {
  store.kanban = { backlog: ['User Auth & SSO', 'Payment Gateway Integration', 'Push Notification Service', 'Analytics Dashboard', 'Audit Logging'], inProgress: ['Database Indexing', 'API Rate Limiting'], testing: ['Password Reset Flow'], done: ['Landing Page'] };
  save(); playSound('click'); render();
}

V.method = () => `
  <h2>Methodologies, Kanban &amp; Agile Frameworks</h2>
  ${renderKanbanSimulator()}
  <div class="card">
    <h3>Approach Selector &amp; Stacey Complexity Matrix</h3>
    <div class="g2">
      <div><label>Requirements Clarity</label><select id="mc" onchange="recMethod()"><option value="stable">Clear and stable</option><option value="evolving">Evolving / uncertain</option></select></div>
      <div><label>Change Frequency</label><select id="mf" onchange="recMethod()"><option value="rare">Rare</option><option value="frequent">Frequent</option></select></div>
      <div><label>Early Feedback Available</label><select id="ma" onchange="recMethod()"><option value="yes">Yes</option><option value="no">No</option></select></div>
      <div><label>Strict Regulatory/Fixed Scope</label><select id="mr" onchange="recMethod()"><option value="no">No</option><option value="yes">Yes</option></select></div>
    </div>
    <div id="mrec" style="margin-top:14px"></div>
    <div id="staceyWrap" style="margin-top:12px"></div>
  </div>
  <div class="card">
    <h3>Agile &amp; Scrum Lifecycle Flow</h3>
    ${generateScrumFlowSVG()}
    <div class="grid" style="margin-top:12px">${AGILE.map(([t, d]) => `<div class="card" style="margin:0;background:var(--bg)"><strong>${esc(t)}</strong><div class="m" style="font-size:13px;margin-top:4px">${esc(d)}</div></div>`).join('')}</div>
  </div>
  <div class="card">
    <h3>Interactive Sprint Burndown Simulator</h3>
    <div class="g2">
      <div><label>Sprint Length (Days): <strong id="bdDaysVal">10</strong></label><input id="bdDays" type="range" min="5" max="20" value="10" oninput="calcBurndown()"></div>
      <div><label>Committed Points: <strong id="bdPtsVal">40</strong></label><input id="bdPts" type="range" min="15" max="80" step="5" value="40" oninput="calcBurndown()"></div>
      <div><label>Actual Pace (% of Ideal): <strong id="bdPaceVal">85%</strong></label><input id="bdPace" type="range" min="40" max="140" step="5" value="85" oninput="calcBurndown()"></div>
      <div><label>Mid-Sprint Scope Creep (+Pts): <strong id="bdScopeVal">0</strong></label><input id="bdScope" type="range" min="0" max="25" step="5" value="0" oninput="calcBurndown()"></div>
    </div>
    <div id="bdOut" style="margin-top:12px"></div>
  </div>
  <div class="card"><h3>Delivery Framework Comparisons</h3><table>${METHODS.map(([t, d]) => `<tr><th style="width:28%">${esc(t)}</th><td>${esc(d)}</td></tr>`).join('')}</table></div>
  ${renderFieldGuide('method')}`;

function recMethod() {
  if (!$('mc')) return;
  const c = $('mc').value, f = $('mf').value, a = $('ma').value, r = $('mr').value;
  let pick, why;
  if (c === 'stable' && f === 'rare' && r === 'yes') { pick = 'Predictive (Waterfall)'; why = 'Stable scope, rare change, and strict constraints strongly favour upfront baseline planning.'; }
  else if (c === 'stable' && f === 'rare') { pick = 'Predictive'; why = 'Clear requirements and low change velocity enable sequential execution and formal change control.'; }
  else if (f === 'frequent' && a === 'yes' && r === 'no') { pick = 'Agile (Scrum / Kanban)'; why = 'High change rate and frequent customer collaboration favor short iterative cycles and rapid increments.'; }
  else if (a === 'yes' && r === 'no') { pick = 'Iterative / Agile'; why = 'Uncertainty is high but stakeholder feedback is available; build increments to discover and refine.'; }
  else { pick = 'Hybrid'; why = 'Mixed project context: combine predictive milestones and governance with adaptive iterative delivery for emerging components.'; }
  $('mrec').innerHTML = `<div class="row"><span class="tag" style="font-size:14px;padding:4px 10px">${pick}</span><span class="m">${why}</span></div>`;
  const wrap = $('staceyWrap');
  if (wrap) wrap.innerHTML = generateStaceyMatrixSVG(pick);
}

function calcBurndown() {
  if (!$('bdDays')) return;
  const days = +$('bdDays').value, pts = +$('bdPts').value, pace = +$('bdPace').value / 100, scopeAdd = +$('bdScope').value;
  $('bdDaysVal').textContent = days; $('bdPtsVal').textContent = pts; $('bdPaceVal').textContent = Math.round(pace * 100) + '%'; $('bdScopeVal').textContent = scopeAdd;
  const idealBurn = pts / days, actualBurn = idealBurn * pace, midDay = Math.floor(days / 2);
  const actualPts = []; let rem = pts;
  for (let d = 0; d <= days; d++) {
    if (d > 0) { if (d === midDay && scopeAdd > 0) rem += scopeAdd; rem = Math.max(0, rem - actualBurn); }
    actualPts.push(+rem.toFixed(1));
  }
  const maxY = Math.max(pts, ...actualPts, 10);
  const w = 640, h = 220, padL = 44, padR = 20, padT = 20, padB = 34, cw = w - padL - padR, ch = h - padT - padB;
  const xOf = d => padL + (d / days) * cw, yOf = v => padT + ch - (v / maxY) * ch;
  const idealPath = `M ${xOf(0)} ${yOf(pts)} L ${xOf(days)} ${yOf(0)}`;
  const actPath = actualPts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xOf(i).toFixed(1)} ${yOf(v).toFixed(1)}`).join(' ');
  const endRem = actualPts[days];
  const statusTag = endRem === 0 ? `<span class="tag ok">On Track / Completed</span>` : `<span class="tag crit">${endRem.toFixed(1)} pts Carryover</span>`;
  $('bdOut').innerHTML = `
    <div class="row" style="justify-content:space-between;margin-bottom:8px">
      <span>Ideal: <strong>${idealBurn.toFixed(1)} pts/day</strong> · Actual: <strong>${actualBurn.toFixed(1)} pts/day</strong></span>${statusTag}
    </div>
    <div class="svg-scroll-container"><svg viewBox="0 0 ${w} ${h}" style="width:100%;max-width:640px;height:auto;display:block;margin:0 auto">
      <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + ch}" stroke="var(--b)" stroke-width="1.5"/>
      <line x1="${padL}" y1="${padT + ch}" x2="${padL + cw}" y2="${padT + ch}" stroke="var(--b)" stroke-width="1.5"/>
      <text x="${padL - 6}" y="${padT + 4}" text-anchor="end" font-size="11" fill="var(--m)">${Math.round(maxY)}</text>
      <text x="${padL - 6}" y="${padT + ch}" text-anchor="end" font-size="11" fill="var(--m)">0</text>
      <path d="${idealPath}" stroke="var(--m)" stroke-width="2" stroke-dasharray="6 4" fill="none"/>
      <path d="${actPath}" stroke="var(--a)" stroke-width="3" fill="none"/>
      ${actualPts.map((v, i) => `<circle cx="${xOf(i).toFixed(1)}" cy="${yOf(v).toFixed(1)}" r="3.5" fill="var(--a)"/>`).join('')}
    </svg></div>`;
}

/* ============ Formulas Lab ============ */
V.formulas = () => `
  <h2>PMP® Formulas &amp; Interactive Calculators</h2>
  <div class="card">
    <h3>1. PERT 3-Point Estimating &amp; Normal Distribution</h3>
    <div class="g2" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">
      <div><label>Optimistic (O)</label><input id="fO" type="number" value="4" min="0" oninput="calcFormulas()"></div>
      <div><label>Most Likely (M)</label><input id="fM" type="number" value="8" min="0" oninput="calcFormulas()"></div>
      <div><label>Pessimistic (P)</label><input id="fP" type="number" value="18" min="0" oninput="calcFormulas()"></div>
    </div>
    <div id="pertOut" style="margin-top:12px"></div>
  </div>
  <div class="g2">
    <div class="card">
      <h3>2. Communication Channels</h3>
      <label>Team Size (n): <strong id="commNVal">10</strong></label>
      <input id="commN" type="range" min="2" max="50" value="10" oninput="calcFormulas()">
      <div id="commOut" style="margin-top:10px"></div>
    </div>
    <div class="card">
      <h3>3. FPIF Point of Total Assumption (PTA)</h3>
      <div class="g2">
        <div><label>Target Cost ($)</label><input id="ptaTC" type="number" value="100000" oninput="calcFormulas()"></div>
        <div><label>Target Fee ($)</label><input id="ptaTF" type="number" value="10000" oninput="calcFormulas()"></div>
        <div><label>Ceiling Price ($)</label><input id="ptaCP" type="number" value="120000" oninput="calcFormulas()"></div>
        <div><label>Buyer Share (%)</label><input id="ptaBS" type="number" value="80" min="1" max="99" oninput="calcFormulas()"></div>
      </div>
      <div id="ptaOut" style="margin-top:10px"></div>
    </div>
  </div>
  <div class="card">
    <h3>Complete PMP® Formula Reference (${FORMULAS.length} Formulas)</h3>
    <div class="table-wrap"><table><tr><th>Metric</th><th>Equation</th><th>Interpretation</th></tr>
      ${FORMULAS.map(([n, eq, note]) => `<tr><td><strong>${esc(n)}</strong></td><td><code>${esc(eq)}</code></td><td class="m">${esc(note)}</td></tr>`).join('')}
    </table></div>
  </div>
  ${renderFieldGuide('formulas')}`;

function calcFormulas() {
  if (!$('fO')) return;
  const { pert, tri, sd, variance } = calcPert(+$('fO').value || 0, +$('fM').value || 0, +$('fP').value || 0);
  $('pertOut').innerHTML = `
    <div class="grid">
      <div class="card" style="margin:0;padding:10px"><div class="m">PERT Expected</div><div class="stat" style="font-size:22px">${pert.toFixed(2)}</div></div>
      <div class="card" style="margin:0;padding:10px"><div class="m">Triangular Mean</div><div class="stat" style="font-size:22px">${tri.toFixed(2)}</div></div>
      <div class="card" style="margin:0;padding:10px"><div class="m">Std Dev (1σ)</div><div class="stat" style="font-size:22px">±${sd.toFixed(2)}</div></div>
      <div class="card" style="margin:0;padding:10px"><div class="m">Variance (σ²)</div><div class="stat" style="font-size:22px">${variance.toFixed(2)}</div></div>
    </div>
    <p class="m" style="font-size:13px;margin-top:8px"><strong>68.2% (1σ):</strong> ${(pert - sd).toFixed(1)} – ${(pert + sd).toFixed(1)} · <strong>95.4% (2σ):</strong> ${(pert - 2 * sd).toFixed(1)} – ${(pert + 2 * sd).toFixed(1)} · <strong>99.7% (3σ):</strong> ${(pert - 3 * sd).toFixed(1)} – ${(pert + 3 * sd).toFixed(1)}</p>`;
  const n = +$('commN').value; $('commNVal').textContent = n;
  const ch = (n * (n - 1)) / 2, chNext = ((n + 1) * n) / 2;
  $('commOut').innerHTML = `<div class="stat">${ch} channels</div><p class="m" style="margin-top:6px">Adding 1 person adds <strong>+${chNext - ch}</strong> channels (total ${chNext}).</p>`;
  const { tp, bs, pta } = calcPTA(+$('ptaTC').value || 0, +$('ptaTF').value || 0, +$('ptaCP').value || 0, +$('ptaBS').value || 80);
  $('ptaOut').innerHTML = `<div class="stat" style="font-size:24px">$${money(pta)}</div><p class="m" style="margin-top:6px">Target Price: <strong>$${money(tp)}</strong> · Share: <strong>${Math.round(bs * 100)}/${Math.round((1 - bs) * 100)}</strong></p>`;
}

/* ============ CPM Lab ============ */
V.cpm = () => {
  const solved = !!store.challenges.cpm_crash;
  return `
  <h2>CPM Lab: Critical Path Analysis</h2>
  <div class="challenge-box ${solved ? 'solved' : ''}">
    <div class="row" style="justify-content:space-between">
      <strong>${solved ? '✅ Lab Challenge Solved' : '🏆 Lab Challenge: Schedule Compression'}</strong>
      <span class="tag ${solved ? 'ok' : 'warn'}">${solved ? 'Completed' : 'Target ≤ 18 days'}</span>
    </div>
    <div class="m" style="font-size:12.5px;margin-top:4px">${LAB_CHALLENGES[0].prompt}</div>
  </div>
  <div class="card">
    <div class="row" style="justify-content:space-between;margin-bottom:8px">
      <div class="row">
        <label style="margin:0">Load Scenario:</label>
        <select id="cpmPresetSel" style="width:auto" onchange="loadCPMPreset(this.value)">
          <option value="software" ${store.cpmPreset === 'software' ? 'selected' : ''}>1. Software Sprint &amp; Release</option>
          <option value="cloud" ${store.cpmPreset === 'cloud' ? 'selected' : ''}>2. Cloud Data Migration</option>
          <option value="construction" ${store.cpmPreset === 'construction' ? 'selected' : ''}>3. Commercial Construction</option>
          <option value="launch" ${store.cpmPreset === 'launch' ? 'selected' : ''}>4. Product Launch Campaign</option>
        </select>
      </div>
      <div id="cpmSeg" class="seg">
        <button type="button" class="${store.cpmTab === 'graph' ? 'active' : ''}" onclick="setCPMTab('graph')">Network Diagram</button>
        <button type="button" class="${store.cpmTab === 'gantt' ? 'active' : ''}" onclick="setCPMTab('gantt')">Gantt View</button>
        <button type="button" class="${store.cpmTab === 'table' ? 'active' : ''}" onclick="setCPMTab('table')">Schedule Table</button>
      </div>
    </div>
    <textarea id="cpmIn">${esc(CPM_PRESETS[store.cpmPreset] || CPM_PRESETS.software)}</textarea>
    <div class="g2" style="margin-top:8px;gap:8px;align-items:end">
      <div class="row" style="gap:6px;flex-wrap:wrap">
        <input id="cpmNewId" placeholder="ID (e.g. H)" style="width:80px" aria-label="New task ID">
        <input id="cpmNewName" placeholder="Task name" style="width:140px" aria-label="New task name">
        <input id="cpmNewDur" type="number" min="1" value="3" style="width:70px" aria-label="New task duration">
        <input id="cpmNewPred" placeholder="Pred (e.g. F,G)" style="width:110px" aria-label="New task predecessors">
        <button type="button" class="btn2" onclick="addCPMTask()">+ Add Task</button>
      </div>
      <div class="row" style="justify-content:flex-end;gap:8px">
        <button type="button" class="btn" onclick="runCPM()">Calculate Critical Path</button>
        <button type="button" class="btn2" onclick="loadCPMPreset(store.cpmPreset)">Reset</button>
        <button type="button" class="btn2" onclick="exportCPMCSV()">Export CSV</button>
      </div>
    </div>
    <div id="cpmOut" style="margin-top:14px"></div>
  </div>
  ${renderFieldGuide('cpm')}`;
};
function loadCPMPreset(key) { store.cpmPreset = key; $('cpmIn').value = CPM_PRESETS[key]; save(); playSound('click'); runCPM(); }
function setCPMTab(t) {
  store.cpmTab = t;
  save();
  const btns = document.querySelectorAll('#cpmSeg button');
  const map = ['graph', 'gantt', 'table'];
  btns.forEach((b, i) => b.classList.toggle('active', map[i] === t));
  runCPM();
}
function updateCPMTaskDur(taskId, newDur) {
  const dur = Math.max(1, parseInt(newDur, 10) || 1);
  const ta = $('cpmIn');
  if (!ta) return;
  ta.value = ta.value.split('\n').map(line => {
    const t = line.trim();
    if (!t || t.startsWith('#')) return line;
    const parts = t.split('|').map(s => s.trim());
    if (parts[0] === taskId && parts.length >= 3) {
      parts[2] = String(dur);
      return parts.join(' | ');
    }
    return line;
  }).join('\n');
  playSound('click');
  runCPM();
}
function addCPMTask() {
  const id = ($('cpmNewId')?.value || '').trim().toUpperCase();
  const name = ($('cpmNewName')?.value || '').trim() || `Task ${id}`;
  const dur = Math.max(1, parseInt($('cpmNewDur')?.value, 10) || 1);
  const pred = ($('cpmNewPred')?.value || '').trim();
  if (!id) { toast('Enter a task ID'); return; }
  const ta = $('cpmIn');
  ta.value = `${ta.value.trim()}\n${id} | ${name} | ${dur} | ${pred}`;
  $('cpmNewId').value = ''; $('cpmNewName').value = ''; $('cpmNewPred').value = '';
  playSound('click'); runCPM();
}
function exportCPMCSV() {
  if (!$('cpmIn')) return;
  const res = cpm(parseTasks($('cpmIn').value));
  if (res.error) { toast(res.error); return; }
  const rows = [['ID', 'Task', 'Duration', 'ES', 'EF', 'LS', 'LF', 'TF', 'Critical']];
  res.order.forEach(id => {
    const r = res.R[id], t = res.by[id];
    rows.push([id, `"${t.name.replace(/"/g, '""')}"`, t.dur, r.ES, r.EF, r.LS, r.LF, r.TF, r.TF === 0 ? 'Yes' : 'No']);
  });
  const blob = new Blob([rows.map(r => r.join(',')).join('\n')], { type: 'text/csv' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'cpm-schedule.csv'; a.click();
  toast('CPM schedule exported as CSV');
}
function runCPM() {
  if (!$('cpmIn')) return;
  const tasks = parseTasks($('cpmIn').value);
  const res = cpm(tasks);
  if (res.error) { $('cpmOut').innerHTML = `<p class="neg" style="font-weight:600">${esc(res.error)}</p>`; return; }
  if (store.cpmPreset === 'software' && res.finish <= 18 && tasks.length >= 7) {
    completeChallenge('cpm_crash', 'CPM Schedule Compressor');
  }
  const crit = res.order.filter(id => res.R[id].TF === 0);
  let mainContent = '';
  if (store.cpmTab === 'graph') mainContent = generateCPMGraphSVG(res);
  else if (store.cpmTab === 'gantt') mainContent = generateCPMGanttSVG(res);
  else {
    mainContent = `<div style="overflow-x:auto"><table><tr><th>ID</th><th>Task</th><th>Dur</th><th>ES</th><th>EF</th><th>LS</th><th>LF</th><th>TF</th></tr>
      ${res.order.map(id => {
        const r = res.R[id], t = res.by[id];
        return `<tr class="${r.TF === 0 ? 'crit' : ''}"><td><strong>${esc(id)}</strong></td><td>${esc(t.name)}</td><td><input type="number" min="1" value="${t.dur}" style="width:64px;padding:2px 6px" aria-label="Duration for ${esc(id)}" onchange="updateCPMTaskDur('${esc(id)}', this.value)"> d</td><td>${r.ES}</td><td>${r.EF}</td><td>${r.LS}</td><td>${r.LF}</td><td><span class="${r.TF === 0 ? 'tag crit' : 'm'}">${r.TF === 0 ? '0 (Critical)' : r.TF}</span></td></tr>`;
      }).join('')}</table></div>`;
  }
  $('cpmOut').innerHTML = `<div class="row" style="margin-bottom:12px;justify-content:space-between"><span class="tag" style="font-size:14px;padding:4px 10px">Total Duration: ${res.finish} Days</span><span class="m"><strong>Critical Path:</strong> ${crit.map(c => `<span class="tag crit">${esc(c)}</span>`).join(' → ')}</span></div>${mainContent}`;
}

/* ============ EVM Lab ============ */
V.evm = () => {
  const solved = !!store.challenges.evm_recover;
  const p = EVM_PRESETS[store.evmPreset] || EVM_PRESETS.custom;
  return `
  <h2>Earned Value Management (EVM)</h2>
  <div class="challenge-box ${solved ? 'solved' : ''}">
    <div class="row" style="justify-content:space-between">
      <strong>${solved ? '✅ Lab Challenge Solved' : '🏆 Lab Challenge: Project Recovery'}</strong>
      <span class="tag ${solved ? 'ok' : 'warn'}">${solved ? 'Completed' : 'CPI ≥ 1.0 & SPI ≥ 1.0'}</span>
    </div>
    <div class="m" style="font-size:12.5px;margin-top:4px">${LAB_CHALLENGES[1].prompt}</div>
  </div>
  <div class="card">
    <div class="row" style="justify-content:space-between;margin-bottom:12px">
      <div class="row" style="gap:8px;flex-wrap:wrap">
        <label style="margin:0">Scenario:</label>
        <select id="evmSel" style="width:auto" onchange="loadEVMPreset(this.value)">
          <option value="custom" ${store.evmPreset === 'custom' ? 'selected' : ''}>Custom Inputs</option>
          <option value="healthy" ${store.evmPreset === 'healthy' ? 'selected' : ''}>Case 1: Healthy (CPI 1.05, SPI 1.0)</option>
          <option value="behind_under" ${store.evmPreset === 'behind_under' ? 'selected' : ''}>Case 2: Behind Schedule, Under Budget</option>
          <option value="ahead_over" ${store.evmPreset === 'ahead_over' ? 'selected' : ''}>Case 3: Ahead of Schedule, Over Budget</option>
          <option value="critical" ${store.evmPreset === 'critical' ? 'selected' : ''}>Case 4: Critical Delay &amp; Overrun</option>
        </select>
        <select id="evmCur" style="width:auto" aria-label="Currency" onchange="store.evmCurrency=this.value;save();calcEVM()">
          ${['$', '€', '£', '₹'].map(c => `<option value="${c}" ${(store.evmCurrency || '$') === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
      <div id="evmSeg" class="seg">
        <button type="button" class="${store.evmTab === 'scurve' ? 'active' : ''}" onclick="setEVMTab('scurve')">S-Curve</button>
        <button type="button" class="${store.evmTab === 'gauges' ? 'active' : ''}" onclick="setEVMTab('gauges')">Dials</button>
      </div>
    </div>
    <div class="grid">
      <div><label>BAC</label><input id="bac" type="number" value="${p.bac}" oninput="calcEVM()"></div>
      <div><label>PV</label><input id="pv" type="number" value="${p.pv}" oninput="calcEVM()"></div>
      <div><label>EV</label><input id="ev" type="number" value="${p.ev}" oninput="calcEVM()"></div>
      <div><label>AC</label><input id="ac" type="number" value="${p.ac}" oninput="calcEVM()"></div>
    </div>
    <div id="evmOut" style="margin-top:16px"></div>
  </div>
  ${renderFieldGuide('evm')}`;
};
function setEVMTab(t) {
  store.evmTab = t;
  save();
  const btns = document.querySelectorAll('#evmSeg button');
  const map = ['scurve', 'gauges'];
  btns.forEach((b, i) => b.classList.toggle('active', map[i] === t));
  calcEVM();
}
function loadEVMPreset(key) {
  store.evmPreset = key;
  const p = EVM_PRESETS[key] || EVM_PRESETS.custom;
  $('bac').value = p.bac; $('pv').value = p.pv; $('ev').value = p.ev; $('ac').value = p.ac;
  save(); playSound('click'); calcEVM();
}
function calcEVM() {
  if (!$('bac')) return;
  const n = id => parseFloat($(id).value) || 0;
  const m = calcEVMMetrics(n('bac'), n('pv'), n('ev'), n('ac'));
  if (store.evmPreset === 'critical' && m.CPI >= 1.0 && m.SPI >= 1.0) {
    completeChallenge('evm_recover', 'EVM Recovery Specialist');
  }
  const f = x => isFinite(x) ? x.toFixed(2) : '—';
  const advice = getCorrectiveAction(m.CPI, m.SPI, m.CV);
  const chartView = store.evmTab === 'gauges' ? generateRadialGaugesSVG(m.CPI, m.SPI) : generateSCurveSVG(m.BAC, m.PV, m.EV, m.AC, m.EACt);
  const curSym = store.evmCurrency || '$';
  const row = (k, v, note, cls = '') => `<tr><td><strong>${k}</strong></td><td class="${cls}"><strong>${v}</strong></td><td class="m">${note}</td></tr>`;
  $('evmOut').innerHTML = `
    <div class="row" style="gap:6px;margin-bottom:10px;flex-wrap:wrap">
      <span class="m" style="font-size:12px">What-if:</span>
      <button type="button" class="btn2" style="font-size:12px;padding:4px 8px" onclick="$('ev').value=Math.round((parseFloat($('ev').value)||0)*1.1);calcEVM()">+10% EV</button>
      <button type="button" class="btn2" style="font-size:12px;padding:4px 8px" onclick="$('ac').value=Math.round((parseFloat($('ac').value)||0)*0.9);calcEVM()">-10% AC</button>
      <button type="button" class="btn2" style="font-size:12px;padding:4px 8px" onclick="loadEVMPreset(store.evmPreset)">Reset</button>
    </div>
    ${chartView}
    <div class="card" style="background:var(--bg);border-left:4px solid var(--a);margin:14px 0">
      <h3 style="margin:0 0 6px;color:var(--a)">🎯 Corrective Action Advisor: ${esc(advice.title)}</h3>
      <p style="margin:0;font-size:13px">${esc(advice.text)}</p>
    </div>
    <table>
      ${row('CV (EV − AC)', curSym + money(m.CV), m.CV < 0 ? 'Over budget' : 'Under budget', m.CV < 0 ? 'neg' : 'pos')}
      ${row('SV (EV − PV)', curSym + money(m.SV), m.SV < 0 ? 'Behind schedule' : 'Ahead of schedule', m.SV < 0 ? 'neg' : 'pos')}
      ${row('CPI (EV ÷ AC)', f(m.CPI), m.CPI < 1 ? 'Cost inefficient' : 'Cost efficient', m.CPI < 1 ? 'neg' : 'pos')}
      ${row('SPI (EV ÷ PV)', f(m.SPI), m.SPI < 1 ? 'Schedule inefficient' : 'On/ahead of plan', m.SPI < 1 ? 'neg' : 'pos')}
      ${row('EAC (Typical: BAC ÷ CPI)', curSym + money(m.EACt), 'Current CPI continues')}
      ${row('EAC (Atypical)', curSym + money(m.EACa), 'Variances are one-off')}
      ${row('TCPI (to BAC)', f(m.TCPI), 'Efficiency required to finish within BAC')}
    </table>`;
}

/* ============ Risk Lab ============ */
V.risk = () => {
  const list = risks().map((r, i) => ({ ...r, i, emv: r.p * r.c })).sort((a, b) => b.emv - a.emv);
  const total = list.reduce((s, r) => s + r.emv, 0);
  const band = v => v >= 20000 ? 'neg' : v >= 5000 ? 'warn' : 'pos';
  const tab = store.riskTab || 'mc';
  const trials = store.mcTrials || 1000;
  const mc = runMonteCarlo(list, trials);
  if (mc.p80 < 50000 && list.length > 0) completeChallenge('risk_p80', 'Monte Carlo Risk Mitigator');
  const solved = !!store.challenges.risk_p80;

  return `
  <h2>Risk Lab: Quantitative Analysis &amp; Monte Carlo</h2>
  <div class="challenge-box ${solved ? 'solved' : ''}">
    <div class="row" style="justify-content:space-between">
      <strong>${solved ? '✅ Lab Challenge Solved' : '🏆 Lab Challenge: P80 Reserve Target'}</strong>
      <span class="tag ${solved ? 'ok' : 'warn'}">P80: $${money(mc.p80)} / $50,000</span>
    </div>
    <div class="m" style="font-size:12.5px;margin-top:4px">${LAB_CHALLENGES[2].prompt}</div>
  </div>
  <div class="card"><div class="grid">
    <div><div class="m">Expected Monetary Value</div><div class="stat ${band(total)}">$${money(total)}</div></div>
    <div><div class="m">P80 Contingency Target</div><div class="stat neg">$${money(mc.p80)}</div></div>
    <div><div class="m">P50 Median Loss</div><div class="stat">$${money(mc.p50)}</div></div>
    <div><div class="m">P95 Worst-Case</div><div class="stat">$${money(mc.p95)}</div></div>
  </div></div>
  <div class="card">
    <div class="row" style="justify-content:space-between;margin-bottom:12px">
      <h3>Risk Analysis Engine</h3>
      <div class="seg">
        <button class="${tab === 'mc' ? 'active' : ''}" onclick="store.riskTab='mc';save();render()">Monte Carlo</button>
        <button class="${tab === 'heatmap' ? 'active' : ''}" onclick="store.riskTab='heatmap';save();render()">5×5 Heatmap</button>
        <button class="${tab === 'table' ? 'active' : ''}" onclick="store.riskTab='table';save();render()">Risk Register</button>
      </div>
    </div>
    ${tab === 'mc' ? `<div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:8px">
        <div class="row" style="gap:8px">
          <label for="mcTrialsSel" style="margin:0">Trials:</label>
          <select id="mcTrialsSel" style="width:auto" onchange="store.mcTrials=parseInt(this.value,10);save();render()">
            ${[500, 1000, 5000, 10000].map(n => `<option value="${n}" ${trials === n ? 'selected' : ''}>${n.toLocaleString()}</option>`).join('')}
          </select>
        </div>
        <button type="button" class="btn2" onclick="render()">🎲 Rerun</button>
      </div>${generateMonteCarloSVG(mc)}`
      : tab === 'heatmap' ? generateRiskHeatmapSVG(list)
      : `<table><tr><th>Risk</th><th>Prob</th><th>Impact</th><th>EMV</th><th>Action</th></tr>
          ${list.map(r => `<tr><td><strong>${esc(r.n)}</strong></td><td>${Math.round(r.p * 100)}%</td><td>$${money(r.c)}</td><td class="${band(r.emv)}"><strong>$${money(r.emv)}</strong></td><td><button class="btn2" onclick="delRisk(${r.i})">×</button></td></tr>`).join('')}
        </table>`}
  </div>
  <div class="card"><h3>Add New Risk</h3>
    <div class="g2">
      <div><label>Risk Name</label><input id="rn" placeholder="e.g. Subcontractor delay"></div>
      <div><label>Probability (0.0 – 1.0)</label><input id="rp" type="number" step="0.05" min="0" max="1" value="0.2"></div>
      <div><label>Impact ($)</label><input id="rc" type="number" value="10000"></div>
      <div style="align-self:end"><button class="btn" onclick="addRisk()">Add to Register</button></div>
    </div>
  </div>
  ${renderFieldGuide('risk')}`;
};
function addRisk() {
  const n = $('rn').value.trim(); if (!n) return;
  persistRisks([...risks(), { n, p: Math.min(1, Math.max(0, parseFloat($('rp').value) || 0)), c: parseFloat($('rc').value) || 0 }]);
  playSound('click'); render();
}
function delRisk(i) { persistRisks(risks().filter((_, k) => k !== i)); playSound('click'); render(); }

/* ============ Stakeholders ============ */
V.stake = () => `
  <h2>Stakeholder Power/Interest Matrix</h2>
  <div class="card">
    ${generateStakeMatrixSVG()}
    ${stakes().map((s, i) => {
      const [qn, qs] = quadrant(s.pw, s.in);
      return `<div style="padding:12px 0;border-bottom:1px solid var(--b)">
        <div class="row" style="justify-content:space-between"><strong>${i + 1}. ${esc(s.n)}</strong><span class="tag">${qn}</span></div>
        <div class="g2" style="margin-top:6px">
          <div><label>Power: <strong>${s.pw}</strong>/5</label><input type="range" min="1" max="5" value="${s.pw}" oninput="stakeUpd(${i})"></div>
          <div><label>Interest: <strong>${s.in}</strong>/5</label><input type="range" min="1" max="5" value="${s.in}" oninput="stakeUpd(${i})"></div>
        </div>
        <div class="m" style="margin-top:4px">${qs}</div>
      </div>`;
    }).join('')}
  </div>
  ${renderFieldGuide('stake')}`;
function stakeUpd(i) {
  const list = stakes().map(s => ({ ...s }));
  const ranges = document.querySelectorAll('#app input[type=range]');
  list[i].pw = +ranges[i * 2].value; list[i].in = +ranges[i * 2 + 1].value;
  store.stakes = list; save(); render();
}

/* ============ Glossary & Flashcards ============ */
V.glossary = () => `
  <h2>Glossary of Terms (${GLOSSARY.length})</h2>
  <div class="card"><input id="gq" placeholder="Filter terms or definitions..." oninput="filterGloss(this.value)"></div>
  <div id="gl">${glossHTML(GLOSSARY)}</div>`;
const glossHTML = list => list.map(([t, d]) => {
  const idx = GLOSSARY.findIndex(x => x[0] === t);
  return `<div class="card" style="margin:8px 0;display:flex;justify-content:space-between;align-items:flex-start">
    <div><strong>${esc(t)}</strong><div class="m" style="margin-top:4px">${esc(d)}</div></div>
    <button class="btn2" style="padding:4px 8px;font-size:12px;margin-left:8px" onclick="speakGloss(${idx})">🔊</button>
  </div>`;
}).join('');
function filterGloss(v) { const q = v.toLowerCase(); $('gl').innerHTML = glossHTML(GLOSSARY.filter(([t, d]) => (t + d).toLowerCase().includes(q))); }

V.flash = () => {
  const deck = getFlashDeck();
  const isBrowse = store.fcMode === 'browse';
  const queue = dueQueue();
  const mastered = deck.filter(c => (store.srs[c.id]?.r || 0) >= 3).length;

  const deckBar = `
    <div class="row" style="justify-content:space-between;margin-bottom:10px">
      <div class="seg">
        ${[['glossary', 'Glossary'], ['formulas', 'Formulas'], ['agile', 'Agile'], ['custom', `Custom (${store.customCards.length})`]].map(([k, lbl]) =>
          `<button class="${store.fcDeck === k ? 'active' : ''}" onclick="store.fcDeck='${k}';store.fcIdx=0;FC.flip=false;save();render()">${lbl}</button>`
        ).join('')}
      </div>
      <div class="row">
        <button class="btn2" onclick="exportFlashcardsCSV()" title="Export current deck to CSV">⬇ Export CSV</button>
        <button class="btn2" onclick="store.fcReverse=!store.fcReverse;FC.flip=false;save();render()">${store.fcReverse ? '⇄ Def → Term' : '⇄ Term → Def'}</button>
      </div>
    </div>`;

  if (!deck.length) {
    return `<h2>Flashcards (SM-2)</h2>${deckBar}
      <div class="card"><h3>No Custom Cards Yet</h3>
        <div class="g2">
          <div><label>Term / Concept</label><input id="cc-term" placeholder="e.g. Parkinson's Law"></div>
          <div><label>Definition</label><input id="cc-def" placeholder="Work expands to fill the time available"></div>
        </div>
        <button class="btn" style="margin-top:10px" onclick="addCustomCard()">+ Add Card</button>
      </div>`;
  }

  let cardIdx = 0;
  if (isBrowse) {
    store.fcIdx = Math.max(0, Math.min(deck.length - 1, store.fcIdx));
    cardIdx = store.fcIdx;
  } else {
    if (!queue.length) {
      return `<h2>Flashcards (SM-2)</h2>${deckBar}
        <div class="row" style="margin-bottom:12px"><div class="seg">
          <button class="active" onclick="store.fcMode='srs';save();render()">SRS Due (0)</button>
          <button onclick="store.fcMode='browse';save();render()">Browse All (${deck.length})</button>
        </div></div>
        <div class="card"><h3>🎉 All Caught Up in ${esc(store.fcDeck)}!</h3>
          <p class="m">Mastered: <strong>${mastered} / ${deck.length}</strong> cards.</p>
          <button class="btn" onclick="store.fcMode='browse';save();render()">Browse All Cards →</button>
        </div>`;
    }
    cardIdx = queue[0];
  }

  const card = deck[cardIdx];
  const frontLbl = store.fcReverse ? 'DEFINITION' : card.tag;
  const backLbl = store.fcReverse ? card.tag : 'DEFINITION';
  const frontTxt = store.fcReverse ? card.d : card.t;
  const backTxt = store.fcReverse ? card.t : card.d;

  return `
    <h2>Flashcards (SM-2)</h2>
    ${deckBar}
    <div class="row" style="justify-content:space-between;margin-bottom:12px">
      <div class="seg">
        <button class="${!isBrowse ? 'active' : ''}" onclick="store.fcMode='srs';save();render()">SRS Due (${queue.length})</button>
        <button class="${isBrowse ? 'active' : ''}" onclick="store.fcMode='browse';save();render()">Browse All (${deck.length})</button>
      </div>
      <div class="row">
        <button class="btn2" style="padding:4px 10px;font-size:12px" onclick="speakCurrentCard(${cardIdx})">🔊 Listen</button>
        <span class="m">Mastered: ${mastered}/${deck.length}</span>
      </div>
    </div>
    <div class="card">
      <div class="row" style="justify-content:space-between">
        <span class="m">${isBrowse ? `Card ${cardIdx + 1} of ${deck.length}` : `Due Queue: ${queue.length} left`}</span>
        <span class="kbd">Space to flip</span>
      </div>
      <div class="flip-container" role="button" tabindex="0" aria-label="Flip flashcard" onclick="flipCard()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();flipCard();}">
        <div class="flip-card ${FC.flip ? 'flipped' : ''}">
          <div class="flip-face">
            <span class="tag" style="margin-bottom:8px">${esc(frontLbl)}</span>
            <strong style="font-size:${store.fcReverse ? '16px' : '22px'}">${esc(frontTxt)}</strong>
            <span class="m" style="margin-top:12px;font-size:12px">Click or press Space to flip</span>
          </div>
          <div class="flip-face flip-back">
            <span class="tag" style="margin-bottom:8px">${esc(backLbl)}</span>
            <p style="font-size:${store.fcReverse ? '20px;font-weight:700' : '16px'};line-height:1.6">${esc(backTxt)}</p>
          </div>
        </div>
      </div>
      ${!isBrowse ? `<div class="row" style="justify-content:center;margin-top:14px">
        ${FC.flip ? `<button class="btn2" onclick="rate(1)">Again <span class="kbd">1</span></button><button class="btn2" onclick="rate(3)">Hard <span class="kbd">2</span></button><button class="btn2" onclick="rate(4)">Good <span class="kbd">3</span></button><button class="btn2" onclick="rate(5)">Easy <span class="kbd">4</span></button>`
          : `<button class="btn" onclick="flipCard()">Show Answer <span class="kbd">Space</span></button>`}
      </div>` : `<div class="row" style="justify-content:space-between;margin-top:14px">
        <button class="btn2" onclick="store.fcIdx--;FC.flip=false;save();render()" ${cardIdx === 0 ? 'disabled' : ''}>← Prev</button>
        <button class="btn" onclick="flipCard()">Flip</button>
        <button class="btn2" onclick="store.fcIdx++;FC.flip=false;save();render()" ${cardIdx === deck.length - 1 ? 'disabled' : ''}>Next →</button>
      </div>`}
    </div>
    <details class="card"><summary><strong>+ Add Custom Flashcard</strong></summary>
      <div class="g2" style="margin-top:10px">
        <div><label>Term</label><input id="cc-term" placeholder="Enter term..."></div>
        <div><label>Definition</label><input id="cc-def" placeholder="Enter definition..."></div>
      </div>
      <button class="btn" style="margin-top:10px" onclick="addCustomCard()">Save Card</button>
    </details>`;
};
function flipCard() { FC.flip = !FC.flip; playSound('click'); render(); }
function exportFlashcardsCSV() {
  const deck = getFlashDeck();
  if (!deck.length) { showToast('No cards in this deck to export.'); return; }
  const csvEsc = v => '"' + String(v).replace(/"/g, '""') + '"';
  const rows = [['Tag', 'Term', 'Definition'], ...deck.map(c => [c.tag, c.t, c.d])];
  const csv = rows.map(r => r.map(csvEsc).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  a.download = `PM_Mastery_${store.fcDeck}_flashcards.csv`;
  a.click();
  showToast(`Exported ${deck.length} flashcards (.csv)`);
}

/* ============ Quiz View (Single, Multi-Select, Matching + Distractor Rationales) ============ */
V.quiz = () => {
  if (!QZ.mode) return `
    <h2>Interactive Practice Quiz (${QUIZ.length} Questions)</h2>
    <div class="card"><p class="m">Includes single-choice, multi-select ("Choose TWO"), and matching drills with distractor rationales.</p>
      <div class="row" style="margin-bottom:12px">
        <select id="qc" style="width:auto">
          ${[...new Set(QUIZ.map(q => q.c).filter(Boolean))].sort((a, b) => a - b).map(c => `<option value="${c}">Chapter ${c}: ${CHN[c] || ''}</option>`).join('')}
        </select>
        <button class="btn2" onclick="startQuiz('c:' + $('qc').value)">Start Chapter Quiz</button>
      </div>
      <div class="grid">
        <button class="btn" onclick="startQuiz('all')">All Questions (${QUIZ.length})</button>
        <button class="btn2" onclick="startQuiz('s')">Situational Scenarios (${QUIZ.filter(q => q.s).length})</button>
        <button class="btn2" onclick="startQuiz('P')">Process Domain (${QUIZ.filter(q => q.d === 'P').length})</button>
        <button class="btn2" onclick="startQuiz('E')">People Domain (${QUIZ.filter(q => q.d === 'E').length})</button>
        <button class="btn2" onclick="startQuiz('B')">Business Environment (${QUIZ.filter(q => q.d === 'B').length})</button>
        <button class="btn2" onclick="startQuiz('missed')" ${store.missed.length ? '' : 'disabled'}>Review Missed (${store.missed.length})</button>
      </div>
    </div>`;

  if (QZ.i >= QZ.pool.length) {
    const pct = Math.round(QZ.score / QZ.pool.length * 100);
    if (QZ.mode === 'all' && pct > store.quizBest) { store.quizBest = pct; save(); }
    return `<h2>Quiz Results</h2><div class="card">
      <div class="stat">${QZ.score} / ${QZ.pool.length} · ${pct}%</div>
      <p class="m">Saved in Missed queue: <strong>${store.missed.length}</strong> questions.</p>
      <div class="row"><button class="btn" onclick="startQuiz('${QZ.mode}')">Retry Set</button><button class="btn2" onclick="qzReset()">Choose Another Set</button></div>
    </div>`;
  }

  const qi = QZ.pool[QZ.i], q = QUIZ[qi];
  const answered = QZ.ans !== null;

  let bodyHTML = '';
  if (q.type === 'match') {
    const rights = q.pairs.map(p => p[1]).sort();
    bodyHTML = q.pairs.map(([left, right], idx) => {
      const sel = QZ.matchSel[idx] || '';
      const ok = answered && sel === right;
      return `<div class="match-row">
        <div><strong>${esc(left)}</strong></div>
        <div>
          <select ${answered ? 'disabled' : ''} onchange="setMatchOpt(${idx}, this.value)">
            <option value="">-- Select match --</option>
            ${rights.map(r => `<option value="${esc(r)}" ${sel === r ? 'selected' : ''}>${esc(r)}</option>`).join('')}
          </select>
          ${answered ? `<div class="${ok ? 'pos' : 'neg'}" style="font-size:12px;margin-top:3px">${ok ? '✓ Correct' : 'Correct: ' + esc(right)}</div>` : ''}
        </div>
      </div>`;
    }).join('') + (!answered ? `<button class="btn" style="margin-top:12px" onclick="submitMatchQ()">Submit Matches</button>` : '');
  } else if (q.type === 'multi') {
    bodyHTML = q.o.map((o, i) => {
      let cls = QZ.multiSel.includes(i) ? 'sel' : '';
      if (answered) {
        if (q.a.includes(i)) cls = 'ok';
        else if (QZ.ans.includes(i)) cls = 'bad';
      }
      return `<div class="opt-wrap"><button class="opt ${cls}" ${answered ? 'disabled' : ''} onclick="toggleMultiOpt(${i})">${QZ.multiSel.includes(i) ? '☑' : '☐'} ${esc(o)}</button></div>`;
    }).join('') + (!answered ? `<button class="btn" style="margin-top:10px" onclick="submitMultiQ()">Submit Selection (${QZ.multiSel.length} chosen)</button>` : '');
  } else {
    bodyHTML = q.o.map((o, i) => {
      let c = '';
      if (answered) { if (i === q.a) c = 'ok'; else if (i === QZ.ans) c = 'bad'; }
      return `<div class="opt-wrap"><button class="opt ${c}" ${answered ? 'disabled' : ''} onclick="answerQ(${i})"><span class="kbd">${i + 1}</span> ${esc(o)}</button></div>`;
    }).join('');
  }

  return `<h2>Quiz</h2>
  <div class="card">
    <div class="row" style="justify-content:space-between">
      <span class="m">${QZ.i + 1} of ${QZ.pool.length} <span class="tag">${DNAME[q.d]}${q.c ? ' · Ch.' + q.c : ''}${q.s ? ' · Scenario' : ''}${q.type === 'multi' ? ' · Multi-Select' : q.type === 'match' ? ' · Matching' : ''}</span></span>
      <span class="m">Score: <strong>${QZ.score}</strong></span>
    </div>
    <p style="font-size:16px;margin:12px 0;line-height:1.55"><strong>${esc(q.q)}</strong></p>
    ${bodyHTML}
    ${answered ? `
      <div class="card" style="margin-top:14px;background:var(--bg)">
        <div class="row" style="justify-content:space-between;align-items:flex-start">
          <p style="margin:0"><strong>Explanation:</strong> ${esc(q.e)}</p>
          <button class="btn2" style="padding:4px 8px;font-size:12px;flex-shrink:0" onclick="speakText(QUIZ[${qi}].e)" title="Listen to explanation">🔊 Listen</button>
        </div>
        ${q.r ? `<ul style="margin:8px 0 0;padding-left:18px;font-size:13px">${q.r.map((rat, idx) => `<li class="m"><strong>${String.fromCharCode(65 + idx)}:</strong> ${esc(rat)}</li>`).join('')}</ul>` : ''}
        ${q.ref ? `<div class="m" style="font-size:12px;margin-top:8px">📖 Reference: <em>${esc(q.ref)}</em></div>` : ''}
      </div>
      <button class="btn" style="margin-top:10px" onclick="nextQ()">${QZ.i + 1 < QZ.pool.length ? 'Next Question' : 'View Summary'} <span class="kbd">Enter</span></button>
    ` : ''}
  </div>`;
};

/* ============ Pearson VUE-Style Exam Simulator ============ */
let EX = null, EXT = null;
const EXMIN = 1.28; // ~230 min / 180 Q
const fmtT = ms => { const t = Math.max(0, Math.round(ms / 1000)); return Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0'); };

function startCustomExam() {
  const n = Math.max(5, Math.min(QUIZ.length, parseInt($('exCustN')?.value, 10) || 25));
  const mins = Math.max(5, parseInt($('exCustMin')?.value, 10) || 30);
  const dom = $('exCustDom')?.value || 'all';
  let pool;
  if (dom === 'all') {
    pool = sampleExamPool(QUIZ, n);
  } else {
    const idxs = QUIZ.map((q, i) => q.d === dom ? i : -1).filter(i => i >= 0).sort(() => Math.random() - 0.5);
    pool = idxs.slice(0, Math.min(n, idxs.length));
  }
  EX = { pool, i: 0, ans: {}, multiSel: {}, matchSel: {}, flag: {}, hl: {}, strike: {}, filter: 'all', secs: mins * 60, totalSecs: mins * 60, done: false, onBreak: false, breakTaken: false };
  clearInterval(EX_T); EX_T = setInterval(() => { if (!EX || EX.done || EX.onBreak) return; EX.secs--; if (EX.secs <= 0) finishExam(); else updateExTimer(); }, 1000);
  render();
}
function startExam(n) {
  const idx = sampleECOExam(QUIZ, n);
  EX = {
    pool: idx, i: 0, ans: {}, multiSel: {}, matchSel: {}, strike: {}, hl: {},
    flag: {}, warn: 0, done: false, paused: false, onBreak: false,
    breaksTaken: {}, filter: 'all', start: Date.now(),
    end: Date.now() + Math.round(idx.length * EXMIN * 60000)
  };
  clearInterval(EXT);
  EXT = setInterval(tickExam, 1000);
  render();
}
function tickExam() {
  if (!EX || EX.done || EX.paused || EX.onBreak) return;
  if (Date.now() >= EX.end) { finishExam(); return; }
  const el = $('exT');
  if (el) el.textContent = fmtT(EX.end - Date.now());
}
function togglePauseExam() {
  if (!EX || EX.done) return;
  EX.paused = !EX.paused;
  if (EX.paused) EX.pausedAt = Date.now();
  else EX.end += (Date.now() - EX.pausedAt);
  render();
}
function takeScheduledBreak(cp) {
  EX.breaksTaken[cp] = true;
  EX.onBreak = true;
  EX.pausedAt = Date.now();
  render();
}
function endScheduledBreak() {
  EX.onBreak = false;
  EX.end += (Date.now() - EX.pausedAt);
  render();
}
function exAnswer(k) { EX.ans[EX.i] = k; EX.warn = 0; playSound('click'); render(); }
function exToggleMulti(k) {
  const arr = EX.multiSel[EX.i] || [];
  const p = arr.indexOf(k);
  if (p >= 0) arr.splice(p, 1); else arr.push(k);
  EX.multiSel[EX.i] = arr;
  EX.ans[EX.i] = [...arr];
  EX.warn = 0; playSound('click'); render();
}
function exSetMatch(idx, val) {
  EX.matchSel[EX.i] ??= {};
  EX.matchSel[EX.i][idx] = val;
  EX.ans[EX.i] = { ...EX.matchSel[EX.i] };
  EX.warn = 0;
}
function exToggleStrike(optIdx) {
  EX.strike[EX.i] ??= {};
  EX.strike[EX.i][optIdx] = !EX.strike[EX.i][optIdx];
  render();
}
function exToggleHL(wIdx) {
  EX.hl[EX.i] ??= {};
  EX.hl[EX.i][wIdx] = !EX.hl[EX.i][wIdx];
  render();
}
function exGo(i) {
  const next = Math.max(0, Math.min(EX.pool.length - 1, i));
  EX.i = next; EX.warn = 0;
  // Offer scheduled 10-min break at 1/3 and 2/3 of exams >= 30 Q
  if (EX.pool.length >= 30) {
    const b1 = Math.floor(EX.pool.length / 3), b2 = Math.floor((EX.pool.length * 2) / 3);
    if (next === b1 && !EX.breaksTaken[1]) { takeScheduledBreak(1); return; }
    if (next === b2 && !EX.breaksTaken[2]) { takeScheduledBreak(2); return; }
  }
  render();
}
function exFlag() { EX.flag[EX.i] = !EX.flag[EX.i]; playSound('click'); render(); }
function exSubmit() {
  const un = EX.pool.length - Object.keys(EX.ans).length;
  if (un && !EX.warn) { EX.warn = un; playSound('bad'); render(); return; }
  finishExam();
}
function finishExam() {
  if (!EX || EX.done) return;
  EX.done = true; clearInterval(EXT);
  let score = 0;
  EX.pool.forEach((qi, i) => {
    const ok = isQuestionCorrect(QUIZ[qi], EX.ans[i]);
    recordResult(QUIZ[qi], ok);
    if (ok) { score++; store.missed = store.missed.filter(x => x !== qi); }
    else if (!store.missed.includes(qi)) store.missed.push(qi);
  });
  store.exams ??= [];
  store.exams.push({ t: Date.now(), n: EX.pool.length, score, secs: Math.round((Date.now() - EX.start) / 1000) });
  store.exams = store.exams.slice(-10);
  save();
  playSound(score >= EX.pool.length * 0.7 ? 'ok' : 'bad');
  render();
}
function exportExamReport() {
  if (!EX || !EX.done) return;
  const res = EX.pool.map((qi, i) => ({ qi, got: EX.ans[i], ok: isQuestionCorrect(QUIZ[qi], EX.ans[i]) }));
  const score = res.filter(r => r.ok).length, n = res.length;
  let text = `=== PM MASTERY EXAM REPORT ===\nDate: ${new Date().toLocaleString()}\nScore: ${score}/${n} (${Math.round(score / n * 100)}%)\n\n`;
  res.filter(r => !r.ok).forEach((r, idx) => {
    const q = QUIZ[r.qi];
    text += `${idx + 1}. ${q.q}\n   Explanation: ${q.e}\n\n`;
  });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  a.download = `PM_Exam_Report_${todayKey()}.txt`;
  a.click();
}

V.exam = () => {
  if (!EX) {
    const hist = (store.exams || []).slice().reverse().slice(0, 5);
    const sizes = [20, 40, 60, 100, 180, QUIZ.length].filter((n, i, a) => n <= QUIZ.length && a.indexOf(n) === i);
    return `<h2>PMP® Exam Simulator (ECO Weighted)</h2>
    <div class="card"><p class="m">Samples questions by official PMP® domain weights (42% People · 50% Process · 8% Business). Includes strikethrough, text highlighting, and scheduled breaks.</p>
      <div class="row">${sizes.map(n => `<button class="${n === 40 ? 'btn' : 'btn2'}" onclick="startExam(${n})">${n === QUIZ.length ? 'Full ' + n : n} Q (${Math.round(n * EXMIN)} min)</button>`).join('')}</div>
      <div class="row" style="margin-top:12px;padding-top:12px;border-top:1px solid var(--b);gap:8px;flex-wrap:wrap">
        <strong style="font-size:13px">Custom Exam:</strong>
        <input id="exCustN" type="number" min="5" max="${QUIZ.length}" value="25" style="width:70px" aria-label="Custom question count">
        <span class="m" style="font-size:12px">Qs</span>
        <input id="exCustMin" type="number" min="5" max="300" value="30" style="width:70px" aria-label="Custom time in minutes">
        <span class="m" style="font-size:12px">min</span>
        <select id="exCustDom" style="width:auto" aria-label="Exam domain filter">
          <option value="all">All Domains (ECO Weighted)</option>
          <option value="People">People Only</option>
          <option value="Process">Process Only</option>
          <option value="Business">Business Only</option>
        </select>
        <button type="button" class="btn2" onclick="startCustomExam()">Start Custom →</button>
      </div>
    </div>
    ${hist.length ? `<div class="card"><h3>Recent Attempts</h3><table><tr><th>Date</th><th>Score</th><th>Time Used</th></tr>${hist.map(h => `<tr><td>${new Date(h.t).toLocaleDateString()}</td><td><strong>${h.score}/${h.n}</strong> (${Math.round(h.score / h.n * 100)}%)</td><td class="m">${fmtT(h.secs * 1000)}</td></tr>`).join('')}</table></div>` : ''}`;
  }
  if (EX.onBreak) {
    return `<h2>Exam Simulator · Scheduled Break</h2>
      <div class="card" style="text-align:center;padding:32px">
        <h3>☕ Optional 10-Minute Break</h3>
        <p class="m">Your exam clock is paused. Stretch, hydrate, and resume when ready.</p>
        <button class="btn" onclick="endScheduledBreak()">Resume Exam →</button>
      </div>`;
  }
  if (!EX.done) {
    const q = QUIZ[EX.pool[EX.i]], sel = EX.ans[EX.i];
    const answered = Object.keys(EX.ans).length;
    const filter = EX.filter || 'all';
    const filteredList = EX.pool.map((_, i) => i).filter(i => filter === 'flag' ? EX.flag[i] : filter === 'un' ? EX.ans[i] === undefined : true);
    const words = q.q.split(' ');
    const hlMap = EX.hl[EX.i] || {};
    const strikeMap = EX.strike[EX.i] || {};

    let optHTML = '';
    if (q.type === 'match') {
      const rights = q.pairs.map(p => p[1]).sort();
      const curM = EX.matchSel[EX.i] || {};
      optHTML = q.pairs.map(([left], idx) => `<div class="match-row"><strong>${esc(left)}</strong>
        <select onchange="exSetMatch(${idx}, this.value)"><option value="">-- Select --</option>
        ${rights.map(r => `<option value="${esc(r)}" ${curM[idx] === r ? 'selected' : ''}>${esc(r)}</option>`).join('')}</select></div>`).join('');
    } else if (q.type === 'multi') {
      const curArr = EX.multiSel[EX.i] || [];
      optHTML = q.o.map((o, i) => `<div class="opt-wrap">
        <button class="opt ${curArr.includes(i) ? 'sel' : ''} ${strikeMap[i] ? 'struck' : ''}" onclick="exToggleMulti(${i})">${curArr.includes(i) ? '☑' : '☐'} ${esc(o)}</button>
        <button class="btn2 strike-btn" onclick="exToggleStrike(${i})" title="Strikethrough">S̶</button>
      </div>`).join('');
    } else {
      optHTML = q.o.map((o, i) => `<div class="opt-wrap">
        <button class="opt ${sel === i ? 'sel' : ''} ${strikeMap[i] ? 'struck' : ''}" onclick="exAnswer(${i})"><span class="kbd">${i + 1}</span> ${esc(o)}</button>
        <button class="btn2 strike-btn" onclick="exToggleStrike(${i})" title="Strikethrough">S̶</button>
      </div>`).join('');
    }

    return `<h2>Exam Simulator</h2>
    <div class="card">
      <div class="row" style="justify-content:space-between">
        <span class="m">Question <strong>${EX.i + 1}</strong> of ${EX.pool.length} · Answered: ${answered}</span>
        <div class="row">
          <span class="tag" style="font-size:14px" id="exT">${EX.paused ? 'PAUSED' : fmtT(EX.end - Date.now())}</span>
          <button class="btn2" onclick="togglePauseExam()">${EX.paused ? '▶ Resume' : '⏸ Pause'}</button>
        </div>
      </div>
      ${EX.paused ? `<div class="card" style="text-align:center;padding:30px;background:var(--bg)"><h3>Exam Paused</h3><button class="btn" onclick="togglePauseExam()">Resume Exam</button></div>`
        : `<p style="font-size:16px;margin:12px 0;line-height:1.6"><strong>${words.map((w, wi) => `<span class="hl-word ${hlMap[wi] ? 'hl' : ''}" onclick="exToggleHL(${wi})">${esc(w)}</span>`).join(' ')}</strong></p>
           <div class="m" style="font-size:11px;margin-bottom:8px">Tip: Click words to highlight · Click S̶ to strike out options</div>
           ${optHTML}
           <div class="row" style="margin-top:12px">
             <button class="btn2" onclick="exGo(${EX.i - 1})" ${EX.i === 0 ? 'disabled' : ''}>← Prev</button>
             <button class="btn2" onclick="exGo(${EX.i + 1})" ${EX.i === EX.pool.length - 1 ? 'disabled' : ''}>Next →</button>
             <button class="btn2" onclick="exFlag()">${EX.flag[EX.i] ? '⚑ Unflag' : '⚐ Flag'}</button>
             <button class="btn" onclick="exSubmit()">Submit Exam</button>
           </div>
           ${EX.warn ? `<p class="neg" style="margin-top:8px;font-weight:600">⚠️ ${EX.warn} unanswered. Click Submit Exam again to confirm.</p>` : ''}`}
    </div>
    <div class="card">
      <div class="row" style="justify-content:space-between;margin-bottom:8px"><div class="seg">
        <button class="${filter === 'all' ? 'active' : ''}" onclick="exFilter('all')">All (${EX.pool.length})</button>
        <button class="${filter === 'flag' ? 'active' : ''}" onclick="exFilter('flag')">Flagged (${Object.values(EX.flag).filter(Boolean).length})</button>
        <button class="${filter === 'un' ? 'active' : ''}" onclick="exFilter('un')">Unanswered (${EX.pool.length - answered})</button>
      </div></div>
      <div class="row">${filteredList.map(i => `<button class="btn2" style="padding:4px 8px;font-size:12px;${EX.ans[i] !== undefined ? 'background:var(--hi);' : ''}${i === EX.i ? 'border-color:var(--a);font-weight:700;' : ''}" onclick="exGo(${i})">${i + 1}${EX.flag[i] ? '⚑' : ''}</button>`).join('')}</div>
    </div>`;
  }

  const res = EX.pool.map((qi, i) => ({ qi, got: EX.ans[i], ok: isQuestionCorrect(QUIZ[qi], EX.ans[i]) }));
  const score = res.filter(r => r.ok).length, n = res.length, pct = Math.round(score / n * 100);
  const by = {};
  res.forEach(r => { const d = QUIZ[r.qi].d; by[d] ??= [0, 0]; by[d][1]++; if (r.ok) by[d][0]++; });
  const wrong = res.filter(r => !r.ok);
  const overallTier = pct >= 75 ? 'Above Target' : pct >= 61 ? 'Target (Pass)' : 'Below Target';

  return `<h2>Exam Diagnostic Report</h2>
  <div class="card">
    <div class="row" style="justify-content:space-between"><div class="stat">${score} / ${n} · ${pct}%</div><span class="tag ${pct >= 75 ? 'ok' : pct >= 61 ? 'warn' : 'crit'}" style="font-size:13px">${overallTier}</span></div>
    <div class="grid" style="margin-top:12px">
      ${Object.entries(by).map(([k, [c, t]]) => {
        const dp = Math.round(c / t * 100);
        const tier = dp >= 75 ? 'Above Target' : dp >= 61 ? 'Target' : 'Below Target';
        return `<div class="card" style="margin:0;background:var(--bg);padding:10px"><strong>${DNAME[k]}</strong><div class="stat" style="font-size:20px">${dp}% (${c}/${t})</div><span class="tag ${dp >= 75 ? 'ok' : dp >= 61 ? 'warn' : 'crit'}">${tier}</span></div>`;
      }).join('')}
    </div>
    <div class="row" style="margin-top:14px">
      <button class="btn" onclick="exReset()">Start New Exam</button>
      <button class="btn2" onclick="exportExamReport()">📄 Export Report</button>
      <a href="#quiz" class="btn2">Review Missed in Quiz →</a>
    </div>
  </div>
  ${wrong.map(r => {
    const q = QUIZ[r.qi];
    return `<div class="card" style="margin:8px 0"><strong>${esc(q.q)}</strong><div class="m" style="margin-top:6px">${esc(q.e)}</div></div>`;
  }).join('')}`;
};

/* ============ Remaining Views (Guide, Lessons, Ref, AI, Revise, Search) ============ */
V.guide = () => {
  const rows = [
    ['I', 1, 'Project Management Framework', '#learn', 'Principles'],
    ['I', 2, 'Project Environment', '#glossary', 'Glossary'],
    ['I', 3, 'Initiating the Project', '#process', 'Processes'],
    ['II', 4, 'Planning Project and Scope', '#process', 'Processes'],
    ['II', 5, 'Planning Schedule Management', '#cpm', 'CPM Lab'],
    ['II', 6, 'Planning Resources, Cost & Procurement', '#evm', 'EVM Lab'],
    ['II', 7, 'Planning Quality & Risk Management', '#risk', 'Risk Lab'],
    ['II', 8, 'Planning Comms & Stakeholder Mgmt', '#stake', 'Stakeholders'],
    ['III', 9, 'Managing Execution of Project Work', '#method', 'Methods'],
    ['III', 10, 'Managing Project Resources', '#quiz', 'Quiz'],
    ['III', 11, 'Managing Comms & Stakeholders', '#stake', 'Stakeholders'],
    ['IV', 12, 'Monitoring & Controlling Work', '#quiz', 'Quiz'],
    ['IV', 13, 'Monitoring Scope, Schedule & Cost', '#evm', 'EVM Lab'],
    ['IV', 14, 'Monitoring Stakeholders & Comms', '#stake', 'Stakeholders'],
    ['V', 15, 'Closing the Project', '#revise', 'Revise']
  ];
  return `<h2>Chapter Curriculum Map</h2><p class="m">Click any chapter stop to practise its questions.</p>${generateRoadmapSVG()}
  <div class="card"><div class="table-wrap"><table><tr><th>Part</th><th>Ch.</th><th>Topic</th><th>Hub</th></tr>
  ${rows.map(([p, c, t, h, l]) => `<tr><td><strong>${p}</strong></td><td>${c}</td><td>${esc(t)}</td><td><a href="${h}">${esc(l)} →</a></td></tr>`).join('')}</table></div></div>`;
};

function answerPeopleCase(id, optIdx) {
  store.peopleCases[id] = optIdx;
  const c = PEOPLE_CASES.find(x => x.id === id);
  const ok = c && c.best === optIdx;
  recordActivity(1);
  save();
  playSound(ok ? 'ok' : 'bad');
  render();
}

V.lessons = () => `
  <h2>High-Yield Study Lessons</h2>
  <h3>People Domain Mini-Cases (Interactive Decision Drills)</h3>
  <p class="m">People accounts for 42% of the PMP® exam. Practise choosing what a servant leader should do <strong>FIRST</strong>.</p>
  ${PEOPLE_CASES.map(c => {
    const sel = store.peopleCases[c.id];
    const answered = sel !== undefined;
    return `<div class="card">
      <div class="row" style="justify-content:space-between;margin-bottom:6px">
        <strong>${esc(c.title)}</strong>
        <button class="btn2" style="padding:3px 8px;font-size:12px" onclick="speakText(${esc(JSON.stringify(c.scenario))})">🔊 Listen</button>
      </div>
      <p class="m" style="margin:0 0 10px">${esc(c.scenario)}</p>
      ${c.options.map((opt, idx) => {
        let cls = '';
        if (answered) {
          if (idx === c.best) cls = 'ok';
          else if (idx === sel) cls = 'bad';
        }
        return `<div class="opt-wrap"><button class="opt ${cls}" onclick="answerPeopleCase('${c.id}', ${idx})">${esc(opt)}</button></div>`;
      }).join('')}
      ${answered ? `<div class="card" style="margin-top:10px;background:var(--bg)">
        <p style="margin:0"><strong>PMP® Mindset:</strong> ${esc(c.mindset)}</p>
        <p class="m" style="margin:6px 0 0;font-size:12.5px">⚠️ ${esc(c.trap)}</p>
      </div>` : ''}
    </div>`;
  }).join('')}
  <h3>Performance Domains</h3>
  ${DOM_DEEP.map(([t, d], i) => `<details class="card"><summary><strong>${esc(t)}</strong></summary><p style="margin-top:8px">${esc(d)}</p><button class="btn2" style="padding:4px 10px;font-size:12px" onclick="speakText(DOM_DEEP[${i}][1])">🔊 Listen</button></details>`).join('')}
  <h3>Chapter Deep-Dives</h3>
  ${CH_LESSONS.map(([n, t, d], i) => `<details class="card"><summary><strong>Ch. ${n}: ${esc(t)}</strong></summary><p style="margin-top:8px">${esc(d)}</p><div class="row"><button class="btn2" onclick="practiceChapter(${n})">Practise Chapter ${n}</button><button class="btn2" style="padding:4px 10px;font-size:12px" onclick="speakText(CH_LESSONS[${i}][2])">🔊 Listen</button></div></details>`).join('')}`;

V.ref = () => `
  <h2>Reference &amp; ITTO Hub</h2>
  <div class="card"><input id="ioq" placeholder="Filter processes..." oninput="ioFilter(this.value)"><div id="iot" class="table-wrap" style="margin-top:10px">${ioTable(IO)}</div></div>
  <h3>Tailoring Guidelines</h3><div class="card"><div class="table-wrap"><table>${TAILOR.map(([t, d]) => `<tr><th style="width:28%">${esc(t)}</th><td>${esc(d)}</td></tr>`).join('')}</table></div></div>
  <h3>Models, Methods, and Artifacts</h3><div class="card"><div class="table-wrap"><table>${MMA.map(([t, d]) => `<tr><th style="width:22%">${esc(t)}</th><td>${esc(d)}</td></tr>`).join('')}</table></div></div>
  <h3>📚 Official PMP® &amp; PMBOK® Study Resources</h3>
  <div class="grid">
    ${STUDY_RESOURCES.map(r => `
      <a class="card" style="margin:0;text-decoration:none;display:flex;flex-direction:column;gap:6px" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">
        <div class="row" style="justify-content:space-between"><strong style="font-size:14px">${esc(r.title)}</strong><span class="tag">${esc(r.org)}</span></div>
        <p class="m" style="font-size:12.5px;margin:0;line-height:1.5">${esc(r.desc)}</p>
        <span style="font-size:12px;color:var(--a);font-weight:600;margin-top:auto">Open Official Resource ↗</span>
      </a>
    `).join('')}
  </div>`;
const ioTable = list => `<table><tr><th>Process</th><th>Key Inputs</th><th>Key Outputs</th></tr>${list.map(([p, i, o]) => `<tr><td><strong>${esc(p)}</strong></td><td>${esc(i)}</td><td>${esc(o)}</td></tr>`).join('')}</table>`;
function ioFilter(v) { const q = v.toLowerCase(); $('iot').innerHTML = ioTable(IO.filter(r => r.join(' ').toLowerCase().includes(q))); }

V.ai = () => `
  <h2>AI Study Coach &amp; Prompt Builder</h2>
  <div class="grid">${AI_TOPICS.map(([t, d]) => `<div class="card"><h3>${esc(t)}</h3><p class="m">${esc(d)}</p></div>`).join('')}</div>
  <div class="card">
    <h3>Interactive PM Prompt Builder</h3>
    <div class="g2">
      <div><label>Delivery Approach</label><select id="ai-m" onchange="buildAIPrompt()"><option>Hybrid</option><option>Agile (Scrum)</option><option>Predictive (Waterfall)</option></select></div>
      <div><label>Deliverable / Task</label><select id="ai-t" onchange="buildAIPrompt()">
        <option value="Draft a Risk Register with Probability, Impact, EMV, and Mitigation Owners">Risk Register with EMV</option>
        <option value="Decompose scope into a 3-level WBS following the 100% Rule">3-Level WBS (100% Rule)</option>
        <option value="Analyze a stakeholder conflict and recommend a servant-leadership resolution">Stakeholder Conflict Resolution</option>
        <option value="Draft a Sprint Retrospective facilitation agenda targeting psychological safety">Retrospective Agenda</option>
      </select></div>
    </div>
    <div style="margin-top:10px"><label>Project Context</label><input id="ai-c" placeholder="e.g. Healthcare SaaS migration, 8-person distributed team, tight compliance" oninput="buildAIPrompt()"></div>
    <textarea id="ai-out" readonly style="margin-top:10px" onclick="this.select()"></textarea>
    <div class="row" style="margin-top:8px"><button class="btn" onclick="copyAIPrompt()">📋 Copy Prompt</button></div>
  </div>
  <div class="card">
    <h3>Optional BYOK AI Study Coach (Gemini API)</h3>
    <p class="m" style="font-size:13px">Bring your own Gemini API key (stored only in your browser's localStorage) to ask about any missed question or PMP® mindset dilemma.</p>
    <div class="g2">
      <div><label>Gemini API Key (optional)</label><input id="ai-key" type="password" value="${esc(store.geminiKey || '')}" placeholder="AIza..." onchange="store.geminiKey=this.value.trim();save()"></div>
      <div><label>Question / Scenario to Explain</label><input id="ai-q" placeholder="Paste a missed question or dilemma..."></div>
    </div>
    <div class="row" style="margin-top:10px">
      <button class="btn" onclick="askAICoach()">✨ Ask AI Coach</button>
    </div>
    <div id="ai-resp" class="card" style="display:none;margin-top:12px;background:var(--bg)"></div>
  </div>`;

function buildAIPrompt() {
  if (!$('ai-out')) return;
  const m = $('ai-m').value, t = $('ai-t').value, c = $('ai-c').value.trim() || '[Insert project type, team size, constraints]';
  $('ai-out').value = `ROLE: Senior PMO Analyst & ${store.cert}-certified Project Manager.\nAPPROACH: ${m}\nCONTEXT: ${c}\nTASK: ${t}.\nCONSTRAINTS: Flag all assumptions explicitly. Do not invent metrics. Cite PMBOK® 7th Edition or Agile Practice Guide principles where applicable.\nFORMAT: Structured Markdown table + 3 actionable next steps.`;
}
function copyAIPrompt() {
  const el = $('ai-out');
  if (!el) return;
  navigator.clipboard?.writeText(el.value).then(() => showToast('Prompt copied to clipboard!')).catch(() => { el.select(); showToast('Selected prompt—press Ctrl+C'); });
}
async function askAICoach() {
  const key = ($('ai-key')?.value || store.geminiKey || '').trim();
  const q = ($('ai-q')?.value || '').trim();
  const out = $('ai-resp');
  if (!key) { showToast('Enter your Gemini API key first (stored locally only).'); return; }
  if (!q) { showToast('Enter a question or scenario to explain.'); return; }
  store.geminiKey = key; save();
  out.style.display = 'block';
  out.innerHTML = '<span class="m">Thinking with PMP® mindset...</span>';
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `You are a concise ${store.cert}® exam coach. Explain this scenario using PMBOK 7th Edition & Agile Practice Guide mindset (what to do FIRST/NEXT and why): ${q}` }] }]
      })
    });
    const data = await res.json();
    const txt = data?.candidates?.[0]?.content?.parts?.[0]?.text || data?.error?.message || 'No response returned.';
    out.innerHTML = `<div style="white-space:pre-wrap;font-size:13.5px;line-height:1.6">${esc(txt)}</div>`;
  } catch (err) {
    out.innerHTML = `<span class="neg">Request failed: ${esc(err.message)}</span>`;
  }
}

V.revise = () => {
  const done = REVISE.filter((_, i) => store.checks['r' + i]).length;
  const pct = Math.round(done / REVISE.length * 100);
  return `
  <h2>Revision Checklist &amp; Data Backup</h2>
  <div class="card">
    <div class="row" style="justify-content:space-between"><span>Completed: <strong>${done}/${REVISE.length}</strong></span><span class="tag">${pct}%</span></div>
    <div class="bar" style="margin:10px 0"><span style="width:${pct}%"></span></div>
    ${REVISE.map((t, i) => `<label class="chk"><input type="checkbox" ${store.checks['r' + i] ? 'checked' : ''} onchange="store.checks['r${i}']=this.checked;save();render()"><span>${esc(t)}</span></label>`).join('')}
  </div>
  <div class="card"><h3>Backup &amp; Progress Sync</h3>
    <div class="row" style="margin-bottom:12px">
      <button class="btn" onclick="exportDataFile()">💾 Download Backup (.json)</button>
      <label class="btn2" style="cursor:pointer;margin:0">📂 Upload Backup<input type="file" accept=".json" onchange="importDataFile(event)" style="display:none"></label>
      <button class="btn2" onclick="resetAll(this)">Reset All Progress</button>
    </div>
  </div>`;
};
function exportDataFile() {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' }));
  a.download = `PM_Mastery_Backup_${todayKey()}.json`;
  a.click();
}
function importDataFile(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = evt => {
    try { Object.assign(store, JSON.parse(evt.target.result)); save(); playSound('ok'); showToast('Backup imported successfully!'); render(); }
    catch { showToast('Invalid backup JSON file.'); }
  };
  reader.readAsText(file);
}
let resetArmed = false;
function resetAll(btn) {
  if (!resetArmed) { resetArmed = true; btn.textContent = 'Click again to confirm reset'; btn.style.color = 'var(--bad)'; return; }
  try { localStorage.removeItem('pmm'); } catch (e) {}
  location.reload();
}

V.search = () => {
  const q = SEARCH.q.trim().toLowerCase();
  if (!q) return `<h2>Search</h2><div class="card m">Type in the search box above (press <span class="kbd">Esc</span> to return).</div>`;
  const hits = buildIndex().filter(x => (x.t + ' ' + x.d).toLowerCase().includes(q));
  return `<h2>Search: “${esc(SEARCH.q)}” <span class="m" style="font-size:14px">(${hits.length} matches)</span></h2>
  ${hits.length ? hits.slice(0, 60).map(h => `<div class="card" style="margin:8px 0"><a href="#${h.v}"><strong>${esc(h.t)}</strong></a> <span class="tag">${h.v}</span><div class="m" style="margin-top:4px">${esc(h.d)}</div></div>`).join('') : `<div class="card m">No matches found.</div>`}`;
};

V.legal = () => `
<h2>Terms, Privacy &amp; Trademarks</h2>
<p class="m">Legal, copyright, trademark, and data privacy information for PM Mastery.</p>
<div class="card">
  <h3>Copyright</h3>
  <p>© 2026 <strong>Bhargav G K</strong>. All rights reserved. Original source code, interactive calculators, visualizations, and study summaries are the intellectual property of Bhargav G K.</p>
</div>
<div class="card">
  <h3>Trademark &amp; Non-Affiliation</h3>
  <p>PM Mastery is an independent educational resource and is not affiliated with, endorsed by, or sponsored by the Project Management Institute, Inc. (PMI). PMI®, PMP®, CAPM®, PMI-ACP®, and PMBOK® are registered trademarks of PMI, Inc.</p>
</div>
<div class="card">
  <h3>Terms of Use</h3>
  <p>This application is provided "as is" for personal educational study only, without warranties of any kind or guarantee of exam results. Always verify official exam requirements on <a href="https://www.pmi.org/" target="_blank" rel="noopener">pmi.org</a>.</p>
</div>
<div class="card">
  <h3>Privacy &amp; Data</h3>
  <p>Your study progress, flashcards, and settings are stored locally in your browser (<code>localStorage</code>). No tracking cookies or server-side accounts are used. If you choose to use the optional AI Coach, your entered prompt is sent directly from your browser to Google's Gemini API using your own API key.</p>
</div>`;

/* ============ Shell & Render ============ */
function applyTheme() {
  document.documentElement.dataset.theme = store.theme === 'auto' ? '' : store.theme;
  const tBtn = $('theme');
  if (tBtn) tBtn.textContent = store.theme === 'auto' ? 'Auto' : store.theme;
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    const dark = store.theme === 'dark' || (store.theme === 'auto' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
    metaTheme.setAttribute('content', dark ? '#0b1120' : '#2563eb');
  }
}
function toggleTheme() { store.theme = store.theme === 'auto' ? 'dark' : store.theme === 'dark' ? 'light' : 'auto'; save(); applyTheme(); }

let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; const b = $('installBtn'); if (b) b.style.display = 'inline-flex'; });
async function installPWA() { if (!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; const b = $('installBtn'); if (b) b.style.display = 'none'; }
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            toast('Update available — <button type="button" class="btn2" style="margin-left:8px;padding:2px 8px;font-size:12px" onclick="location.reload()">Reload</button>', 8000);
          }
        });
      });
    }).catch(() => {});
  });
}

function render() {
  const key = cur();
  const view = V[key] || V.dash;
  const activePillar = activePillarFor(key);

  document.querySelectorAll('.pillar-nav a, #bottom-nav a').forEach(a => {
    a.classList.toggle('on', a.dataset.pillar === activePillar.id);
  });

  const subBar = $('subnav');
  if (subBar) {
    subBar.innerHTML = activePillar.views.map(v =>
      `<a href="#${v.id}" class="${v.id === key ? 'on' : ''}">${esc(v.label)}</a>`
    ).join('');
  }

  const certEl = $('cert-badge');
  if (certEl) certEl.textContent = store.cert + '®';

  $('app').innerHTML = view();
  if (key === 'evm') calcEVM();
  if (key === 'formulas') calcFormulas();
  if (key === 'method') { recMethod(); calcBurndown(); }
  if (key === 'cpm') runCPM();
  if (key === 'ai') buildAIPrompt();
  if (key !== 'search' && $('q')) $('q').value = '';
  updateSoundBtn();
}

document.addEventListener('keydown', e => {
  if (e.target.matches('input,textarea,select')) {
    if (e.key === 'Escape' && e.target.id === 'q') { e.target.blur(); if (cur() === 'search') go(SEARCH.prev || 'dash'); }
    return;
  }
  if (e.key === '/') { e.preventDefault(); $('q')?.focus(); return; }
  if (e.key === 'Escape') {
    closeInspector();
    document.getElementById('onboard-modal')?.classList.remove('open');
    document.getElementById('legal-modal')?.classList.remove('open');
    if (cur() === 'search') go(SEARCH.prev || 'dash');
  }
  const v = cur();
  if (v === 'flash') {
    if (e.key === ' ') { e.preventDefault(); flipCard(); }
    if (store.fcMode !== 'browse' && FC.flip && ['1', '2', '3', '4'].includes(e.key)) rate([1, 3, 4, 5][+e.key - 1]);
  }
  if (v === 'quiz' && QZ.mode) {
    if (QZ.ans === null && ['1', '2', '3', '4'].includes(e.key)) answerQ(+e.key - 1);
    if (QZ.ans !== null && e.key === 'Enter') nextQ();
  }
});

function exReset() { clearInterval(EXT); EX = null; render(); }
function exFilter(f) { if (EX) { EX.filter = f; render(); } }
function qzReset() { QZ.mode = null; render(); }

// Expose functions and variables used by inline HTML event handlers
Object.assign(window, {
  // Core state & helpers
  store, save, render, go, FC,
  // Data arrays referenced in inline onclick Listen buttons
  DOM_DEEP, CH_LESSONS, QUIZ,
  // Navigation & UI
  doSearch, installPWA, toggleSound, toggleTheme, openAbout, openOnboarding, saveOnboarding, skipOnboarding,
  closeInspector, showInspector, speakText,
  // Dashboard
  loadSampleData, clearSampleData, exportStudyReport,
  // Learn – principles & processes
  inspectPrinciple, inspectProcess, setProcessGroup,
  // Lessons – People mini-cases
  answerPeopleCase,
  // Labs
  pullToInProgress, moveToTesting, moveToDone, resetKanban,
  recMethod, calcBurndown, calcFormulas,
  loadCPMPreset, setCPMTab, runCPM,
  loadEVMPreset, calcEVM,
  addRisk, delRisk, stakeUpd,
  filterGloss, speakGloss, speakCurrentCard,
  // Flashcards
  flipCard, rate, addCustomCard, exportFlashcardsCSV,
  // Quiz
  startQuiz, practiceChapter, answerQ, toggleMultiOpt, submitMultiQ,
  setMatchOpt, submitMatchQ, nextQ, qzReset,
  // Exam simulator
  startExam, togglePauseExam, endScheduledBreak,
  exAnswer, exToggleMulti, exSetMatch, exToggleStrike, exToggleHL,
  exGo, exFlag, exSubmit, exportExamReport, exReset, exFilter,
  // Reference
  ioFilter,
  // AI Coach
  buildAIPrompt, copyAIPrompt, askAICoach,
  // Backup & settings
  exportDataFile, importDataFile, resetAll
});

window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });
applyTheme();
render();
if (!store.onboarded) setTimeout(openOnboarding, 350);
