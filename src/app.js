import {
  PRINCIPLES, DOMAINS, PROCESS_GROUPS, METHODS, AGILE, GLOSSARY, FORMULAS,
  AI_TOPICS, REVISE, DOM_DEEP, CH_LESSONS, IO, TAILOR, MMA, KNOWLEDGE_AREAS,
  PROCESS_MATRIX, PEOPLE_CASES, PROCESS_DETAILS, FIELD_GUIDES,
  PRINCIPLE_DETAILS, STUDY_RESOURCES, PM_FRAMEWORKS, DNAME, CHN
} from './data/knowledge.js';
import { QUIZ } from './data/quiz.js';
import { PM_LIFECYCLE, PM_DEEP_DIVES, PM_CASE_PROMPTS, PM_SCENARIOS, RCA_PRESETS, STRATEGY_PRESETS } from './data/product.js';
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
  { id: 'product', label: 'Product Mastery', views: [{ id: 'pm-hub', label: 'Frameworks & Deep Dives' }, { id: 'pm-prio', label: 'Prioritization Studio' }, { id: 'pm-metrics', label: 'Metrics & Growth Lab' }, { id: 'pm-rca', label: 'Root Cause Lab' }, { id: 'pm-strat', label: 'Strategy & Execution' }, { id: 'pm-cases', label: 'Cases & Drills' }] },
  { id: 'ref', label: 'Reference', views: [{ id: 'process', label: '49-Process Grid' }, { id: 'ref', label: 'ITTOs, Frameworks & Resources' }, { id: 'glossary', label: 'Glossary' }, { id: 'ai', label: 'AI Coach & Prompts' }] }
];

const cur = () => location.hash.slice(1) || 'dash';
const go = v => { if (cur() === v) render(); else location.hash = v; };
const SEARCH = { q: '', prev: 'dash' };

function activePillarFor(viewId) {
  return PILLARS.find(p => p.views.some(v => v.id === viewId)) || PILLARS[0];
}

/* ============ Toast & Inspector Modal ============ */
let toastTimer = null;
function showToast(msg, ms = 2600) {
  const el = $('toast');
  if (!el) return;
  el.innerHTML = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), ms);
}
const toast = showToast;

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
        All progress is saved locally in your browser. Use <strong>Today → Checklist &amp; Backup</strong> to export/import your progress as JSON.<br>
        <strong>Contact &amp; Feedback:</strong> <a href="mailto:applicationmanifester@gmail.com">applicationmanifester@gmail.com</a>
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
    const vol = store.soundVol ?? 1;
    const style = store.soundStyle || 'chime';
    if (vol <= 0) return;
    if (type === 'ok') {
      osc.type = style === 'retro' ? 'square' : 'sine';
      osc.frequency.setValueAtTime(style === 'soft' ? 440 : 523.25, now);
      osc.frequency.setValueAtTime(style === 'soft' ? 554.37 : 659.25, now + 0.08);
      gain.gain.setValueAtTime((style === 'soft' ? 0.05 : 0.08) * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.start(now); osc.stop(now + 0.25);
    } else if (type === 'bad') {
      osc.type = style === 'retro' ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(175, now + 0.1);
      gain.gain.setValueAtTime(0.1 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now); osc.stop(now + 0.3);
    } else {
      osc.type = style === 'retro' ? 'square' : 'sine';
      osc.frequency.setValueAtTime(style === 'soft' ? 360 : 420, now);
      gain.gain.setValueAtTime(0.03 * vol, now);
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
  u.rate = store.voiceRate ?? 0.96;
  u.pitch = store.voicePitch ?? 1;
  if (store.voiceURI) {
    const v = window.speechSynthesis.getVoices().find(x => x.voiceURI === store.voiceURI);
    if (v) u.voice = v;
  }
  window.speechSynthesis.speak(u);
}

function openSoundSettings() {
  const voices = ('speechSynthesis' in window) ? window.speechSynthesis.getVoices() : [];
  const vol = Math.round((store.soundVol ?? 1) * 100);
  const rate = store.voiceRate ?? 0.96;
  const pitch = store.voicePitch ?? 1;
  const style = store.soundStyle || 'chime';
  const vOpts = voices.length
    ? `<option value="">System Default Voice</option>` + voices.map(v => `<option value="${esc(v.voiceURI)}" ${store.voiceURI === v.voiceURI ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')
    : '<option value="">Browser Default (Voices loading…)</option>';
  showInspector('Sound & Voice Customization', `
    <div class="card" style="background:var(--bg);margin:0 0 12px">
      <strong>Sound Effects</strong>
      <div class="row" style="justify-content:space-between;margin:8px 0">
        <span>Effects (${store.sound ? 'Enabled' : 'Muted'})</span>
        <button class="btn" onclick="toggleSound();openSoundSettings()">${store.sound ? '🔊 Mute' : '🔇 Unmute'}</button>
      </div>
      <div style="margin:8px 0">
        <label>Tone Style</label>
        <select onchange="store.soundStyle=this.value;save();playSound('ok')">
          <option value="chime" ${style === 'chime' ? 'selected' : ''}>Chime (Default)</option>
          <option value="soft" ${style === 'soft' ? 'selected' : ''}>Soft &amp; Subtle</option>
          <option value="retro" ${style === 'retro' ? 'selected' : ''}>Retro Arcade</option>
        </select>
      </div>
      <label>Volume: <strong id="sv-vol-lbl">${vol}%</strong></label>
      <input type="range" min="0" max="100" value="${vol}" oninput="store.soundVol=this.value/100;save();$('sv-vol-lbl').textContent=this.value+'%'">
      <div class="row" style="gap:6px;margin-top:8px">
        <button class="btn" onclick="playSound('ok')">Test Success</button>
        <button class="btn" onclick="playSound('bad')">Test Error</button>
        <button class="btn" onclick="playSound('click')">Test Click</button>
      </div>
    </div>
    <div class="card" style="background:var(--bg);margin:0">
      <strong>Text-to-Speech Voice</strong>
      <div style="margin:8px 0">
        <label>Voice</label>
        <select onchange="store.voiceURI=this.value;save()">${vOpts}</select>
      </div>
      <label>Speed (Rate): <strong id="sv-rate-lbl">${rate}×</strong></label>
      <input type="range" min="0.6" max="1.6" step="0.05" value="${rate}" oninput="store.voiceRate=+this.value;save();$('sv-rate-lbl').textContent=this.value+'×'">
      <label style="margin-top:8px;display:block">Pitch: <strong id="sv-pitch-lbl">${pitch}</strong></label>
      <input type="range" min="0.7" max="1.4" step="0.05" value="${pitch}" oninput="store.voicePitch=+this.value;save();$('sv-pitch-lbl').textContent=this.value">
      <div class="row" style="gap:6px;margin-top:10px;flex-wrap:wrap">
        <button class="btn primary" onclick="speakText('Welcome to PM Mastery! Ready to practise your project and product skills?')">▶ Test Voice</button>
        <button class="btn" onclick="window.speechSynthesis?.cancel()">⏹ Stop</button>
        <button class="btn" onclick="store.sound=true;store.soundVol=1;store.soundStyle='chime';store.voiceURI='';store.voiceRate=0.96;store.voicePitch=1;save();updateSoundBtn();openSoundSettings()">Reset Defaults</button>
      </div>
    </div>
  `);
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
  if (deckKey === 'frameworks') {
    return PM_FRAMEWORKS.map((f, idx) => ({
      id: `fw_${idx}`,
      t: `${f.name} (${f.acronym})`,
      d: `${f.desc} When: ${f.when} How: ${f.steps}`,
      tag: f.cat.toUpperCase()
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
  PM_FRAMEWORKS.forEach(f => x.push({ v: 'ref', t: `${f.name} (${f.cat})`, d: `${f.acronym} — ${f.desc} ${f.steps}` }));
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
  const gpSteps = [
    { id: 'learn', title: '1. Principles & Domains', sub: 'PMBOK 7 mindset foundation →', href: '#learn', done: Object.keys(store.checks || {}).length > 0 || (store.activity && Object.keys(store.activity).length > 0) },
    { id: 'process', title: '2. 49-Process Grid', sub: 'Lifecycle & ITTO mapping →', href: '#process', done: Object.keys(store.checks || {}).some(k => k.startsWith('p')) || solvedCount > 0 },
    { id: 'flash', title: '3. SM-2 Flashcards', sub: 'Active recall on key terms →', href: '#flash', done: Object.keys(store.srs || {}).length > 0 },
    { id: 'quiz', title: '4. Practice Quiz', sub: 'Unlock ECO domain readiness →', href: '#quiz', done: Object.keys(store.domStats || {}).length > 0 || store.quizBest > 0 }
  ];
  const gpDone = gpSteps.filter(s => s.done).length;
  const gpPct = Math.round((gpDone / gpSteps.length) * 100);

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

  ${gpDone < 4 ? `
    <div class="card" style="border-left:4px solid var(--ok)">
      <div class="row" style="justify-content:space-between;margin-bottom:6px;flex-wrap:wrap;gap:8px">
        <div class="row" style="gap:8px">
          <h3 style="margin:0">👋 Start Here: 4-Step Guided Path</h3>
          <span class="tag ok">${gpDone} / 4 Completed</span>
        </div>
        ${isFresh ? `<button class="btn2" style="font-size:12px;padding:4px 10px" onclick="loadSampleData()">Preview Sample Data</button>` : ''}
      </div>
      <div class="bar" style="margin-bottom:10px"><span style="width:${gpPct}%"></span></div>
      <div class="grid">
        ${gpSteps.map(s => `
          <a class="card" style="margin:0;padding:12px;text-decoration:none;${s.done ? 'border-color:var(--ok);background:var(--bg)' : ''}" href="${s.href}">
            <div class="row" style="justify-content:space-between"><strong>${s.title}</strong><span>${s.done ? '✅' : '○'}</span></div>
            <div class="m" style="font-size:12px;margin-top:4px">${s.done ? 'Completed' : s.sub}</div>
          </a>`).join('')}
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
      <div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap">
        ${LAB_CHALLENGES.map(c => {
          const ok = !!(store.challenges && store.challenges[c.id]);
          const href = c.id === 'cpm_crash' ? '#cpm' : c.id === 'evm_recover' ? '#evm' : c.id === 'risk_p80' ? '#risk' : '#method';
          return `<a href="${href}" class="tag ${ok ? 'ok' : ''}" style="text-decoration:none;font-size:11px">${ok ? '✅' : '○'} ${esc(c.title.split(' ')[0])}</a>`;
        }).join('')}
      </div>
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
    <div class="row" style="justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px">
      <h3 style="margin:0">Risk Analysis Engine</h3>
      <div class="row" style="gap:8px;flex-wrap:wrap">
        <div class="seg">
          <button class="${tab === 'mc' ? 'active' : ''}" onclick="store.riskTab='mc';save();render()">Monte Carlo</button>
          <button class="${tab === 'heatmap' ? 'active' : ''}" onclick="store.riskTab='heatmap';save();render()">5×5 Heatmap</button>
          <button class="${tab === 'table' ? 'active' : ''}" onclick="store.riskTab='table';save();render()">Risk Register</button>
        </div>
        <button type="button" class="btn2" onclick="resetRisks()" title="Reset to default risks">↺ Reset</button>
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
function resetRisks() { store.risks = null; save(); playSound('click'); showToast('Risks reset to defaults'); render(); }
window.resetRisks = resetRisks;

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

/* ============ Product Mastery Pillar ============ */
const INACTIVE_BTN = 'opacity:0.6;background:var(--bg);color:var(--t);border:1px solid var(--b)';

function pmStageFor(f) {
  if (PM_DEEP_DIVES[f.name]?.stage) return PM_DEEP_DIVES[f.name].stage;
  if (f.cat === 'Prioritization') return 'Prioritization';
  if (f.cat === 'Problem-Solving & Interviews') return 'Interviews';
  return 'Discovery';
}

V['pm-hub'] = () => `
  <h2>Product Mastery: Frameworks &amp; Deep Dives</h2>
  <p class="m" style="font-size:13px;margin-top:0">Master building the <strong>right product</strong>—from discovery and prioritization to growth metrics and executive storytelling. Click any card for a real-world case study &amp; pitfalls.</p>
  <div class="card" style="overflow-x:auto">
    <h3 style="margin-bottom:8px">End-to-End Product Lifecycle Flow</h3>
    <svg viewBox="0 0 760 88" style="width:100%;min-width:540px;height:88px;display:block">
      <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor" opacity="0.45"/></marker></defs>
      ${[
        ['1. Discovery', 'JTBD · OST · Lean Canvas', 8, '#2563eb'],
        ['2. Prioritize', 'RICE · WSJF · Kano · MoSCoW', 160, '#7c3aed'],
        ['3. Measure', 'AARRR · HEART · NSM · PMF', 312, '#059669'],
        ['4. Execute', 'DACI · RACI · DORA · OKRs', 464, '#d97706'],
        ['5. Case / Story', 'CIRCLES · STARL · 5 Whys', 616, '#dc2626']
      ].map(([t, s, x, c], i) => `
        <rect x="${x}" y="12" width="136" height="62" rx="10" fill="${c}" fill-opacity="0.1" stroke="${c}" stroke-width="1.5"/>
        <text x="${x + 68}" y="36" text-anchor="middle" font-size="12" font-weight="700" fill="${c}">${esc(t)}</text>
        <text x="${x + 68}" y="54" text-anchor="middle" font-size="9.5" fill="currentColor" opacity="0.8">${esc(s)}</text>
        ${i < 4 ? `<path d="M${x + 138} 43 L${x + 150} 43" stroke="currentColor" stroke-opacity="0.4" stroke-width="2" marker-end="url(#arr)"/>` : ''}
      `).join('')}
    </svg>
  </div>
  <div class="row" style="margin-bottom:12px;gap:6px;flex-wrap:wrap" id="pm-hub-cats">
    ${PM_LIFECYCLE.map((s, i) => `<button class="btn ${i === 0 ? 'primary' : ''}" style="${i === 0 ? '' : INACTIVE_BTN}" onclick="filterPmHub('${esc(s.id)}', this)">${esc(s.label)}</button>`).join('')}
  </div>
  <div class="grid" id="pm-hub-grid">
    ${PM_FRAMEWORKS.map((f, idx) => {
      const st = pmStageFor(f);
      const hasDeep = !!PM_DEEP_DIVES[f.name];
      return `
      <div class="card pm-hub-card" data-stage="${esc(st)}" style="margin:0;cursor:pointer" onclick="openPmDeepDive(${idx})">
        <div class="row" style="justify-content:space-between;align-items:flex-start;gap:8px">
          <strong style="font-size:15px">${esc(f.name)}</strong>
          <span class="tag">${esc(st)}</span>
        </div>
        <div class="m" style="font-size:12px;color:var(--a);margin-top:4px;font-weight:600">${esc(f.acronym)}</div>
        <p style="font-size:13px;margin:8px 0 6px">${esc(f.desc)}</p>
        <div class="m" style="font-size:12px"><strong>When:</strong> ${esc(f.when)}</div>
        <div class="m" style="font-size:11px;margin-top:8px;color:var(--a)">${hasDeep ? 'Click for Case Study &amp; Pitfalls →' : 'Click for Details →'}</div>
      </div>`;
    }).join('')}
  </div>
`;

window.filterPmHub = function (stage, btn) {
  document.querySelectorAll('#pm-hub-cats .btn').forEach(b => { b.classList.remove('primary'); b.style.cssText = INACTIVE_BTN; });
  if (btn) { btn.classList.add('primary'); btn.style.cssText = ''; }
  document.querySelectorAll('#pm-hub-grid .pm-hub-card').forEach(el => {
    el.style.display = (stage === 'All' || el.dataset.stage === stage) ? '' : 'none';
  });
};

window.openPmDeepDive = function (idx) {
  const f = PM_FRAMEWORKS[idx];
  if (!f) return;
  const d = PM_DEEP_DIVES[f.name];
  showInspector(f.name, `
    <p><span class="tag">${esc(f.cat)}</span> <strong style="color:var(--a);margin-left:6px">${esc(f.acronym)}</strong></p>
    <p>${esc(f.desc)}</p>
    <div class="note" style="margin:10px 0"><strong>When to use:</strong> ${esc(f.when)}<br><strong>How to apply:</strong> ${esc(f.steps)}</div>
    ${d ? `
      <div class="card" style="background:var(--bg);margin:10px 0"><strong>Real-World Case Study</strong><p style="margin:6px 0 0;font-size:13px">${esc(d.caseStudy)}</p></div>
      <div class="card" style="background:var(--bg);border-left:3px solid #dc2626;margin:10px 0"><strong>Common Pitfall / Anti-Pattern</strong><p style="margin:6px 0 0;font-size:13px">${esc(d.pitfall)}</p></div>
    ` : ''}
  `);
};

/* ---- 2. Prioritization Studio ---- */
V['pm-prio'] = () => `
  <h2>Prioritization Studio</h2>
  <p class="m" style="font-size:13px;margin-top:0">Compare backlog bets objectively with <strong>RICE / WSJF</strong>, plot a live <strong>2×2 Value vs. Effort Matrix</strong>, and negotiate MVP scope with <strong>MoSCoW</strong>.</p>
  <div class="card">
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h3 style="margin:0">1. Quantitative Scorer (RICE &amp; WSJF)</h3>
      <button class="btn" onclick="exportPrioCSV()">Export CSV</button>
    </div>
    <div class="row" style="margin:10px 0">
      <button class="btn primary" id="pm-rice-btn" onclick="setPrioMode('rice')">RICE (Reach × Impact × Conf ÷ Effort)</button>
      <button class="btn" id="pm-wsjf-btn" style="${INACTIVE_BTN}" onclick="setPrioMode('wsjf')">WSJF (Cost of Delay ÷ Job Size)</button>
    </div>
    <div id="prio-inputs" class="grid" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:10px">
      <div><label>Feature / Initiative</label><input id="pr-name" placeholder="e.g., SSO Login" value="AI Status Digest"></div>
      <div><label id="pr-l1">Reach (users/qtr)</label><input id="pr-v1" type="number" value="1000" min="1"></div>
      <div><label id="pr-l2">Impact (0.25–3)</label><input id="pr-v2" type="number" value="2" step="0.25" min="0.25"></div>
      <div><label id="pr-l3">Confidence (%)</label><input id="pr-v3" type="number" value="80" min="1" max="100"></div>
      <div><label id="pr-l4">Effort (person-mo)</label><input id="pr-v4" type="number" value="2" step="0.5" min="0.25"></div>
    </div>
    <button class="btn primary" onclick="addPrioItem()">Add &amp; Rank Item</button>
    <button class="btn" onclick="loadPrioExample()" style="margin-left:6px">Load Example</button>
    <button class="btn" onclick="clearPrioItems()" style="margin-left:6px">Clear</button>
    <button class="btn" onclick="resetPrioLab()" style="margin-left:6px">Reset</button>
    <div id="prio-table" class="table-wrap" style="margin-top:12px"></div>
  </div>

  <div class="card">
    <h3>2. Interactive 2×2 Value vs. Effort Matrix</h3>
    <p class="m" style="font-size:12px;margin-top:0">Plot initiatives on Business Value (1–10) vs. Implementation Effort (1–10) to spot <strong>Quick Wins</strong> immediately.</p>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:10px">
      <div><label>Item Name</label><input id="m2-name" placeholder="e.g., One-click Export"></div>
      <div><label>Value (1–10)</label><input id="m2-val" type="number" min="1" max="10" value="8"></div>
      <div><label>Effort (1–10)</label><input id="m2-eff" type="number" min="1" max="10" value="3"></div>
    </div>
    <button class="btn primary" onclick="addMatrix2x2()">Plot Item</button>
    <button class="btn" onclick="loadMatrix2x2Example()" style="margin-left:6px">Load Example</button>
    <button class="btn" onclick="clearMatrix2x2()" style="margin-left:6px">Clear</button>
    <div id="m2-visual" style="margin-top:12px"></div>
  </div>

  <div class="card">
    <h3>3. MoSCoW Scope Negotiator (60% Must-Have Rule)</h3>
    <p class="m" style="font-size:12px;margin-top:0">Keep <strong>Must-Have</strong> items ≤ 60% of sprint capacity so your release has a healthy buffer.</p>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-bottom:10px">
      <div><label>Backlog Item</label><input id="mos-name" placeholder="e.g., OAuth2 Login"></div>
      <div><label>Story Points</label><input id="mos-pts" type="number" min="1" max="40" value="5"></div>
      <div><label>Category</label><select id="mos-cat"><option value="M">Must Have</option><option value="S">Should Have</option><option value="C">Could Have</option><option value="W">Won't Have</option></select></div>
    </div>
    <button class="btn primary" onclick="addMoscowItem()">Add Item</button>
    <button class="btn" onclick="loadMoscowExample()" style="margin-left:6px">Load Example</button>
    <button class="btn" onclick="clearMoscow()" style="margin-left:6px">Clear</button>
    <div id="mos-out" style="margin-top:12px"></div>
  </div>
`;

const DEF_M2 = [
  { name: 'Onboarding Checklist', val: 9, eff: 2 },
  { name: 'AI Copilot Rewrite', val: 9, eff: 8 },
  { name: 'Custom Theme Colors', val: 3, eff: 2 },
  { name: 'Legacy XML Exporter', val: 2, eff: 9 }
];
let matrix2x2 = store.matrix2x2 || DEF_M2.slice();
window.addMatrix2x2 = function () {
  const name = ($('m2-name')?.value || '').trim() || 'Feature';
  const val = Math.min(10, Math.max(1, +$('m2-val').value || 5));
  const eff = Math.min(10, Math.max(1, +$('m2-eff').value || 5));
  matrix2x2.push({ name, val, eff });
  store.matrix2x2 = matrix2x2; save();
  if ($('m2-name')) $('m2-name').value = '';
  renderMatrix2x2();
};
window.loadMatrix2x2Example = function () { matrix2x2 = DEF_M2.map(x => ({ ...x })); store.matrix2x2 = matrix2x2; save(); renderMatrix2x2(); };
window.clearMatrix2x2 = function () { matrix2x2 = []; store.matrix2x2 = matrix2x2; save(); renderMatrix2x2(); };
function renderMatrix2x2() {
  const el = $('m2-visual');
  if (!el) return;
  const W = 520, H = 300, pad = 36;
  const dots = matrix2x2.map((d, i) => {
    const cx = pad + ((d.eff - 0.5) / 10) * (W - pad * 2);
    const cy = H - pad - ((d.val - 0.5) / 10) * (H - pad * 2);
    const col = d.val >= 5.5 && d.eff <= 5.5 ? '#059669' : d.val >= 5.5 ? '#2563eb' : d.eff <= 5.5 ? '#d97706' : '#dc2626';
    const flip = d.eff > 7;
    return `<circle cx="${cx}" cy="${cy}" r="7" fill="${col}"/><text x="${flip ? cx - 10 : cx + 10}" y="${cy + 4}" text-anchor="${flip ? 'end' : 'start'}" font-size="11" fill="currentColor">${esc(d.name)} (${d.val}/${d.eff})</text>`;
  }).join('');
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:560px;border:1px solid var(--b);border-radius:10px;background:var(--bg)">
    <rect x="${pad}" y="${pad}" width="${(W - pad * 2) / 2}" height="${(H - pad * 2) / 2}" fill="#059669" fill-opacity="0.08"/>
    <rect x="${W / 2}" y="${pad}" width="${(W - pad * 2) / 2}" height="${(H - pad * 2) / 2}" fill="#2563eb" fill-opacity="0.07"/>
    <rect x="${pad}" y="${H / 2}" width="${(W - pad * 2) / 2}" height="${(H - pad * 2) / 2}" fill="#d97706" fill-opacity="0.06"/>
    <rect x="${W / 2}" y="${H / 2}" width="${(W - pad * 2) / 2}" height="${(H - pad * 2) / 2}" fill="#dc2626" fill-opacity="0.07"/>
    <line x1="${W / 2}" y1="${pad}" x2="${W / 2}" y2="${H - pad}" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="4"/>
    <line x1="${pad}" y1="${H / 2}" x2="${W - pad}" y2="${H / 2}" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="4"/>
    <text x="${pad + 8}" y="${pad + 16}" font-size="11" font-weight="700" fill="#059669">QUICK WINS (Do First)</text>
    <text x="${W / 2 + 8}" y="${pad + 16}" font-size="11" font-weight="700" fill="#2563eb">BIG BETS (Plan)</text>
    <text x="${pad + 8}" y="${H - pad - 8}" font-size="11" font-weight="700" fill="#d97706">FILL-INS (Defer)</text>
    <text x="${W / 2 + 8}" y="${H - pad - 8}" font-size="11" font-weight="700" fill="#dc2626">TIME SINKS (Cut)</text>
    <text x="${W / 2}" y="${H - 10}" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">Effort (1 → 10) →</text>
    <text x="14" y="${H / 2}" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7" transform="rotate(-90 14 ${H / 2})">Value (1 → 10) →</text>
    ${dots}
  </svg>`;
}

const DEF_MOS = [
  { name: 'User Auth & RBAC', pts: 13, cat: 'M' },
  { name: 'Core Search & Filter', pts: 8, cat: 'M' },
  { name: 'Slack Webhook Alerts', pts: 8, cat: 'S' },
  { name: 'PDF Theme Presets', pts: 5, cat: 'C' },
  { name: 'Native Mobile Widget', pts: 8, cat: 'W' }
];
let moscowItems = store.moscowItems || DEF_MOS.slice();
window.addMoscowItem = function () {
  const name = ($('mos-name')?.value || '').trim() || 'Backlog Item';
  const pts = Math.max(1, +$('mos-pts').value || 3);
  const cat = $('mos-cat').value || 'M';
  moscowItems.push({ name, pts, cat });
  store.moscowItems = moscowItems; save();
  if ($('mos-name')) $('mos-name').value = '';
  renderMoscow();
};
window.loadMoscowExample = function () { moscowItems = DEF_MOS.map(x => ({ ...x })); store.moscowItems = moscowItems; save(); renderMoscow(); };
window.clearMoscow = function () { moscowItems = []; store.moscowItems = moscowItems; save(); renderMoscow(); };
window.setMoscowCat = function (idx, cat) { moscowItems[idx].cat = cat; store.moscowItems = moscowItems; save(); renderMoscow(); };
function renderMoscow() {
  const el = $('mos-out');
  if (!el) return;
  if (!moscowItems.length) { el.innerHTML = '<p class="m" style="font-size:13px">No items yet. Add one or click Load Example.</p>'; return; }
  const activePts = moscowItems.filter(x => x.cat !== 'W').reduce((a, b) => a + b.pts, 0) || 1;
  const mustPts = moscowItems.filter(x => x.cat === 'M').reduce((a, b) => a + b.pts, 0);
  const mustPct = Math.round((mustPts / activePts) * 100);
  const ok = mustPct <= 60;
  const labels = { M: 'Must', S: 'Should', C: 'Could', W: "Won't" };
  el.innerHTML = `
    <div class="note" style="margin-bottom:10px;border-left:3px solid ${ok ? '#059669' : '#dc2626'}">
      <strong>Must-Have Share: ${mustPct}%</strong> (${mustPts} / ${activePts} active pts) — ${ok ? 'Healthy buffer (≤ 60% rule).' : 'Over-committed! Move some Must-Haves to Should/Could.'}
      <div style="height:8px;background:var(--b);border-radius:4px;margin-top:6px;overflow:hidden"><div style="width:${Math.min(100, mustPct)}%;height:100%;background:${ok ? '#059669' : '#dc2626'}"></div></div>
    </div>
    <table><tr><th>Item</th><th>Pts</th><th>Priority</th></tr>
      ${moscowItems.map((it, i) => `<tr><td>${esc(it.name)}</td><td>${it.pts}</td><td>${['M', 'S', 'C', 'W'].map(c => `<button class="btn" style="padding:2px 8px;font-size:11px;margin-right:4px;${it.cat === c ? '' : INACTIVE_BTN}" onclick="setMoscowCat(${i},'${c}')">${labels[c]}</button>`).join('')}</td></tr>`).join('')}
    </table>`;
}

window.exportPrioCSV = function () {
  const rows = prioItems.filter(x => x.mode === prioMode).sort((a, b) => b.score - a.score);
  const csv = ['Rank,Mode,Initiative,Score'].concat(rows.map((r, i) => `${i + 1},${r.mode.toUpperCase()},"${r.name.replace(/"/g, '""')}",${r.score}`)).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = `${prioMode}-prioritization.csv`;
  a.click();
};

/* ---- 3. Metrics & Growth Lab ---- */
V['pm-metrics'] = () => `
  <h2>Metrics &amp; Growth Lab</h2>
  <p class="m" style="font-size:13px;margin-top:0">Simulate funnel bottlenecks with <strong>AARRR</strong>, test Product-Market Fit with the <strong>Sean Ellis 40% Rule</strong>, and design balanced <strong>HEART</strong> metrics.</p>
  <div class="card">
    <h3>1. AARRR (Pirate Metrics) Funnel Simulator</h3>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px">
      <div><label>Monthly Visitors: <strong id="ar-v-lbl">10000</strong></label><input id="ar-vis" type="range" min="1000" max="50000" step="1000" value="10000" oninput="calcAARRR()"></div>
      <div><label>Activation (%): <strong id="ar-a-lbl">30%</strong></label><input id="ar-act" type="range" min="5" max="90" value="30" oninput="calcAARRR()"></div>
      <div><label>Retention (%): <strong id="ar-r-lbl">40%</strong></label><input id="ar-ret" type="range" min="5" max="90" value="40" oninput="calcAARRR()"></div>
      <div><label>Referral (%): <strong id="ar-f-lbl">15%</strong></label><input id="ar-ref" type="range" min="1" max="60" value="15" oninput="calcAARRR()"></div>
      <div><label>Paid Conv (%): <strong id="ar-p-lbl">20%</strong></label><input id="ar-rev" type="range" min="1" max="80" value="20" oninput="calcAARRR()"></div>
      <div><label>ARPU ($/mo)</label><input id="ar-arpu" type="number" value="49" min="1" oninput="calcAARRR()"></div>
    </div>
    <div id="aarrr-out" style="margin-top:12px"></div>
  </div>

  <div class="card">
    <h3>2. Sean Ellis PMF Survey Calculator (40% Benchmark)</h3>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px">
      <div><label>Very Disappointed</label><input id="pmf-v" type="number" min="0" value="44" oninput="calcPMF()"></div>
      <div><label>Somewhat Disappointed</label><input id="pmf-s" type="number" min="0" value="38" oninput="calcPMF()"></div>
      <div><label>Not Disappointed</label><input id="pmf-n" type="number" min="0" value="18" oninput="calcPMF()"></div>
    </div>
    <div id="pmf-out" style="margin-top:12px"></div>
  </div>

  <div class="card">
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h3 style="margin:0">3. HEART &amp; Guardrail Metrics Builder</h3>
      <div class="row" style="gap:6px">
        <button class="btn" onclick="loadHeartPreset('saas')">SaaS Preset</button>
        <button class="btn" onclick="loadHeartPreset('ecom')">E-Commerce Preset</button>
      </div>
    </div>
    <div id="heart-out" class="table-wrap" style="margin-top:10px"></div>
  </div>
`;

window.calcAARRR = function () {
  const vis = +($('ar-vis')?.value || 10000);
  const act = +($('ar-act')?.value || 30) / 100;
  const ret = +($('ar-ret')?.value || 40) / 100;
  const ref = +($('ar-ref')?.value || 15) / 100;
  const rev = +($('ar-rev')?.value || 20) / 100;
  const arpu = +($('ar-arpu')?.value || 49);
  if ($('ar-v-lbl')) {
    $('ar-v-lbl').textContent = vis;
    $('ar-a-lbl').textContent = Math.round(act * 100) + '%';
    $('ar-r-lbl').textContent = Math.round(ret * 100) + '%';
    $('ar-f-lbl').textContent = Math.round(ref * 100) + '%';
    $('ar-p-lbl').textContent = Math.round(rev * 100) + '%';
  }
  const activated = Math.round(vis * act);
  const retained = Math.round(activated * ret);
  const referred = Math.round(retained * ref);
  const paid = Math.round(retained * rev);
  const mrr = paid * arpu;
  const stages = [
    ['Acquisition (Visitors)', vis, '#2563eb'],
    ['Activation', activated, '#7c3aed'],
    ['Retention', retained, '#059669'],
    ['Referral (Advocates)', referred, '#d97706'],
    ['Revenue (Paid Users)', paid, '#dc2626']
  ];
  const weakest = [['Activation', act], ['Retention', ret], ['Paid Conversion', rev]].sort((a, b) => a[1] - b[1])[0];
  const out = $('aarrr-out');
  if (!out) return;
  out.innerHTML = `
    <div class="row" style="gap:12px;margin-bottom:10px;flex-wrap:wrap">
      <div class="stat" style="font-size:20px">Est. MRR: $${money(mrr)}</div>
      <div class="note" style="margin:0;flex:1"><strong>Biggest Bottleneck:</strong> ${weakest[0]} (${Math.round(weakest[1] * 100)}%). Lifting ${weakest[0]} by +10 pts increases MRR to <strong>$${money(Math.round(mrr * ((weakest[1] + 0.1) / weakest[1])))}</strong>.</div>
    </div>
    ${stages.map(([lbl, val, col]) => {
      const pct = Math.max(4, Math.round((val / vis) * 100));
      return `<div style="margin-bottom:6px"><div class="row" style="justify-content:space-between;font-size:12px"><span>${lbl}</span><strong>${val.toLocaleString()} (${Math.round((val / vis) * 100)}%)</strong></div><div style="height:10px;background:var(--b);border-radius:5px;overflow:hidden"><div style="width:${pct}%;height:100%;background:${col}"></div></div></div>`;
    }).join('')}`;
};

window.calcPMF = function () {
  const v = +($('pmf-v')?.value || 0), s = +($('pmf-s')?.value || 0), n = +($('pmf-n')?.value || 0);
  const tot = v + s + n || 1;
  const pct = Math.round((v / tot) * 100);
  const ok = pct >= 40;
  const out = $('pmf-out');
  if (!out) return;
  out.innerHTML = `
    <div class="row" style="align-items:center;gap:12px;flex-wrap:wrap">
      <div class="stat" style="font-size:22px;color:${ok ? '#059669' : '#d97706'}">${pct}% Very Disappointed</div>
      <span class="tag">${ok ? 'PMF Achieved (≥ 40%)' : 'Pre-PMF (< 40%)'}</span>
    </div>
    <div style="position:relative;height:12px;background:var(--b);border-radius:6px;margin:10px 0;overflow:hidden">
      <div style="width:${Math.min(100, pct)}%;height:100%;background:${ok ? '#059669' : '#d97706'}"></div>
      <div style="position:absolute;left:40%;top:0;bottom:0;width:2px;background:var(--t)"></div>
    </div>
    <p class="m" style="font-size:12px;margin:0">${ok ? 'Strong Product-Market Fit! Focus on scaling acquisition and converting "Somewhat Disappointed" users.' : 'Do not scale paid acquisition yet. Interview "Very Disappointed" users to double down on your core value proposition.'}</p>`;
};

const HEART_PRESETS = {
  saas: [
    ['Happiness', 'Users find workflow effortless', 'In-app CSAT / NPS', 'Support ticket rate < 3%'],
    ['Engagement', 'Teams collaborate weekly', 'Weekly Active Teams (WAT)', 'Notification opt-out < 5%'],
    ['Adoption', 'New workspaces import data', '% completing setup in 48h', 'Setup drop-off rate'],
    ['Retention', 'Teams renew month-over-month', '90-day Logo Retention', 'Seat contraction rate'],
    ['Task Success', 'Users ship reports quickly', 'Median time-to-publish (< 3m)', 'Error / retry rate < 1%']
  ],
  ecom: [
    ['Happiness', 'Shoppers trust delivery & quality', 'Post-delivery CSAT ≥ 4.6/5', 'Return / refund rate < 4%'],
    ['Engagement', 'Shoppers browse personalized picks', 'Sessions per MAU', 'Bounce rate'],
    ['Adoption', 'New users try saved lists', '% creating ≥ 1 wishlist', 'Page load time < 1.5s'],
    ['Retention', 'Repeat monthly orders', '60-day Repeat Purchase Rate', 'Unsubscribe rate'],
    ['Task Success', 'Fast, frictionless checkout', 'Checkout Completion Rate', 'Payment failure rate < 0.5%']
  ]
};
let heartRows = store.heartRows || HEART_PRESETS.saas.map(r => [...r]);
window.loadHeartPreset = function (k) { heartRows = (HEART_PRESETS[k] || HEART_PRESETS.saas).map(r => [...r]); store.heartRows = heartRows; save(); renderHeartTable(); };
window.updateHeartCell = function (i, j, val) { heartRows[i][j] = val; store.heartRows = heartRows; save(); };
function renderHeartTable() {
  const el = $('heart-out');
  if (!el) return;
  el.innerHTML = `<table><tr><th>Dimension</th><th>Goal</th><th>Signal / Metric</th><th>Guardrail</th></tr>
    ${heartRows.map(([d, g, m, gr], i) => `<tr><td><strong>${esc(d)}</strong></td><td><input value="${esc(g)}" onchange="updateHeartCell(${i},1,this.value)"></td><td><input value="${esc(m)}" onchange="updateHeartCell(${i},2,this.value)"></td><td><input value="${esc(gr)}" onchange="updateHeartCell(${i},3,this.value)"></td></tr>`).join('')}
  </table>`;
}

/* ---- 3b. Root Cause Lab (Ishikawa · 5 Whys · Pareto) ---- */
V['pm-rca'] = () => `
  <h2>Root Cause &amp; Cause-and-Effect Lab</h2>
  <p class="m" style="font-size:13px;margin-top:0">Diagnose systemic failures instead of symptoms using an interactive <strong>Ishikawa (Fishbone) Diagram</strong>, <strong>5 Whys Post-Mortem</strong>, and <strong>Pareto (80/20) Analyzer</strong>.</p>

  <div class="card">
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h3 style="margin:0">1. Interactive Ishikawa (Fishbone) Diagram</h3>
      <div class="row" style="gap:6px;flex-wrap:wrap">
        <button class="btn" onclick="loadFishbonePreset('product')">Product Retention Example</button>
        <button class="btn" onclick="loadFishbonePreset('delivery')">Delivery Velocity Example</button>
        <button class="btn" onclick="clearFishbone()">Clear</button>
      </div>
    </div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:10px 0">
      <div><label>Problem Statement (Head)</label><input id="fb-head" placeholder="e.g., D7 Retention Dropped 12%" oninput="updateFishboneHead(this.value)"></div>
      <div><label>Category</label><select id="fb-cat"><option>People</option><option>Process</option><option>Tech</option><option>Data</option></select></div>
      <div><label>Contributing Cause</label><input id="fb-cause" placeholder="e.g., Slow CSV import (>15s)"></div>
    </div>
    <button class="btn primary" onclick="addFishboneCause()">+ Add Cause to Branch</button>
    <div id="fb-svg" style="margin-top:12px;overflow-x:auto"></div>
  </div>

  <div class="card">
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h3 style="margin:0">2. 5 Whys Causal Chain &amp; Blameless Post-Mortem</h3>
      <div class="row" style="gap:6px">
        <button class="btn" onclick="loadFiveWhysPreset()">Load Example</button>
        <button class="btn" onclick="clearFiveWhys()">Clear</button>
        <button class="btn primary" id="fw-pm-copy" onclick="copyPostMortem()">Copy Post-Mortem</button>
      </div>
    </div>
    <div id="five-whys-body" style="margin-top:10px"></div>
  </div>

  <div class="card">
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h3 style="margin:0">3. Pareto (80/20) Vital-Few Analyzer</h3>
      <div class="row" style="gap:6px">
        <button class="btn" onclick="loadParetoPreset()">Load Example</button>
        <button class="btn" onclick="clearPareto()">Clear</button>
      </div>
    </div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin:10px 0">
      <div><label>Defect / Churn Cause</label><input id="pa-name" placeholder="e.g., Checkout Timeout"></div>
      <div><label>Incident / Ticket Count</label><input id="pa-cnt" type="number" min="1" value="25"></div>
    </div>
    <button class="btn primary" onclick="addParetoItem()">+ Add &amp; Plot</button>
    <div id="pa-svg" style="margin-top:12px;overflow-x:auto"></div>
  </div>
`;

let fishboneData = store.fishboneData || JSON.parse(JSON.stringify(RCA_PRESETS.fishbone.product));
window.loadFishbonePreset = function (k) { fishboneData = JSON.parse(JSON.stringify(RCA_PRESETS.fishbone[k])); store.fishboneData = fishboneData; save(); renderFishbone(); };
window.clearFishbone = function () { fishboneData = { head: 'Problem Statement', causes: { People: [], Process: [], Tech: [], Data: [] } }; store.fishboneData = fishboneData; save(); renderFishbone(); };
window.updateFishboneHead = function (v) { fishboneData.head = v; store.fishboneData = fishboneData; save(); renderFishbone(true); };
window.addFishboneCause = function () {
  const cat = $('fb-cat')?.value || 'Process';
  const c = ($('fb-cause')?.value || '').trim();
  if (!c) return;
  fishboneData.causes[cat] = fishboneData.causes[cat] || [];
  fishboneData.causes[cat].push(c);
  store.fishboneData = fishboneData; save();
  if ($('fb-cause')) $('fb-cause').value = '';
  renderFishbone();
};
window.delFishboneCause = function (cat, idx) {
  fishboneData.causes[cat].splice(idx, 1);
  store.fishboneData = fishboneData; save(); renderFishbone();
};
function renderFishbone(skipInput) {
  const headEl = $('fb-head');
  if (headEl && !skipInput) headEl.value = fishboneData.head || '';
  const el = $('fb-svg');
  if (!el) return;
  const branches = [
    ['People', 170, true, '#2563eb'],
    ['Process', 410, true, '#7c3aed'],
    ['Tech', 170, false, '#059669'],
    ['Data', 410, false, '#d97706']
  ];
  const svgBranches = branches.map(([cat, bx, top, col]) => {
    const items = fishboneData.causes[cat] || [];
    const yEnd = top ? 28 : 272;
    const xEnd = bx - 55;
    const bones = items.slice(0, 4).map((txt, i) => {
      const t = (i + 1) / (Math.min(4, items.length) + 1);
      const px = bx - 55 * t, py = 150 + (yEnd - 150) * t;
      const short = txt.length > 26 ? txt.slice(0, 24) + '…' : txt;
      return `<line x1="${px}" y1="${py}" x2="${px - 80}" y2="${py}" stroke="${col}" stroke-opacity="0.55" stroke-width="1.3"/><text x="${px - 84}" y="${py + 4}" text-anchor="end" font-size="10.5" fill="currentColor" style="cursor:pointer" onclick="delFishboneCause('${cat}',${i})">${esc(short)} ✕</text>`;
    }).join('');
    return `<line x1="${bx}" y1="150" x2="${xEnd}" y2="${yEnd}" stroke="${col}" stroke-width="2.2"/>
      <rect x="${xEnd - 44}" y="${top ? 6 : 274}" width="88" height="22" rx="6" fill="${col}" fill-opacity="0.14" stroke="${col}"/>
      <text x="${xEnd}" y="${top ? 21 : 289}" text-anchor="middle" font-size="11.5" font-weight="700" fill="${col}">${cat}</text>${bones}`;
  }).join('');
  el.innerHTML = `<svg viewBox="0 0 740 302" style="width:100%;min-width:560px;background:var(--bg);border:1px solid var(--b);border-radius:10px">
    <line x1="30" y1="150" x2="545" y2="150" stroke="currentColor" stroke-width="3" stroke-opacity="0.7"/>
    <polygon points="545,143 560,150 545,157" fill="currentColor" opacity="0.7"/>
    <rect x="562" y="118" width="166" height="64" rx="10" fill="#dc2626" fill-opacity="0.12" stroke="#dc2626" stroke-width="1.8"/>
    <text x="645" y="145" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">PROBLEM</text>
    <text x="645" y="163" text-anchor="middle" font-size="11" fill="currentColor">${esc((fishboneData.head || 'Problem').slice(0, 24))}</text>
    ${svgBranches}
  </svg><p class="m" style="font-size:11px;margin:4px 0 0">Tip: Click any cause label on the diagram to remove it.</p>`;
}

let fiveWhysData = store.fiveWhysData || JSON.parse(JSON.stringify(RCA_PRESETS.fiveWhys));
window.loadFiveWhysPreset = function () { fiveWhysData = JSON.parse(JSON.stringify(RCA_PRESETS.fiveWhys)); store.fiveWhysData = fiveWhysData; save(); renderFiveWhys(); };
window.clearFiveWhys = function () { fiveWhysData = { symptom: '', whys: ['', '', '', '', ''], root: '', action: '' }; store.fiveWhysData = fiveWhysData; save(); renderFiveWhys(); };
window.updFiveWhys = function (field, idx, val) {
  if (field === 'whys') fiveWhysData.whys[idx] = val; else fiveWhysData[field] = val;
  store.fiveWhysData = fiveWhysData; save();
};
window.copyPostMortem = function () {
  const txt = `BLAMELESS POST-MORTEM (5 WHYS)\nSymptom: ${fiveWhysData.symptom}\n\n` +
    fiveWhysData.whys.map((w, i) => `Why ${i + 1}: ${w}`).join('\n') +
    `\n\nRoot Cause: ${fiveWhysData.root}\nPreventive Action: ${fiveWhysData.action}`;
  navigator.clipboard?.writeText(txt);
  const b = $('fw-pm-copy'); if (b) { b.textContent = 'Copied!'; setTimeout(() => { b.textContent = 'Copy Post-Mortem'; }, 1500); }
};
function renderFiveWhys() {
  const el = $('five-whys-body');
  if (!el) return;
  el.innerHTML = `<div style="margin-bottom:8px"><label><strong>Symptom / Incident</strong></label><input value="${esc(fiveWhysData.symptom)}" oninput="updFiveWhys('symptom',0,this.value)" placeholder="What broke or regressed?"></div>` +
    fiveWhysData.whys.map((w, i) => `<div style="margin-bottom:6px;padding-left:${i * 10}px"><label>Why #${i + 1}?</label><input value="${esc(w)}" oninput="updFiveWhys('whys',${i},this.value)" placeholder="Because..."></div>`).join('') +
    `<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px;margin-top:8px">
      <div><label><strong>Systemic Root Cause</strong></label><textarea rows="2" oninput="updFiveWhys('root',0,this.value)">${esc(fiveWhysData.root)}</textarea></div>
      <div><label><strong>Preventive Action &amp; Owner</strong></label><textarea rows="2" oninput="updFiveWhys('action',0,this.value)">${esc(fiveWhysData.action)}</textarea></div>
    </div>`;
}

let paretoData = store.paretoData || RCA_PRESETS.pareto.map(x => ({ ...x }));
window.loadParetoPreset = function () { paretoData = RCA_PRESETS.pareto.map(x => ({ ...x })); store.paretoData = paretoData; save(); renderPareto(); };
window.clearPareto = function () { paretoData = []; store.paretoData = paretoData; save(); renderPareto(); };
window.addParetoItem = function () {
  const name = ($('pa-name')?.value || '').trim();
  const count = Math.max(1, +($('pa-cnt')?.value || 1));
  if (!name) return;
  paretoData.push({ name, count }); store.paretoData = paretoData; save();
  if ($('pa-name')) $('pa-name').value = '';
  renderPareto();
};
function renderPareto() {
  const el = $('pa-svg');
  if (!el) return;
  if (!paretoData.length) { el.innerHTML = '<p class="m" style="font-size:13px">No causes yet. Add one or click Load Example.</p>'; return; }
  const sorted = paretoData.slice().sort((a, b) => b.count - a.count);
  const total = sorted.reduce((s, x) => s + x.count, 0) || 1;
  const maxC = sorted[0].count || 1;
  const W = 620, H = 230, padL = 42, padR = 42, padB = 54, padT = 20, plotW = W - padL - padR, plotH = H - padT - padB;
  const bw = Math.min(64, (plotW / sorted.length) - 10);
  let cum = 0, pts = [], vital = [];
  const bars = sorted.map((d, i) => {
    cum += d.count;
    const cumPct = (cum / total) * 100;
    if (cumPct <= 82 || vital.length === 0) vital.push(d.name);
    const x = padL + (i + 0.5) * (plotW / sorted.length) - bw / 2;
    const bh = (d.count / maxC) * plotH;
    const y = padT + plotH - bh;
    const cy = padT + plotH - (cumPct / 100) * plotH;
    pts.push(`${x + bw / 2},${cy}`);
    const isVital = vital.includes(d.name);
    return `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="4" fill="${isVital ? '#2563eb' : '#64748b'}" fill-opacity="0.82"/>
      <text x="${x + bw / 2}" y="${y - 4}" text-anchor="middle" font-size="10" fill="currentColor">${d.count}</text>
      <text x="${x + bw / 2}" y="${H - padB + 14}" text-anchor="middle" font-size="9.5" fill="currentColor">${esc(d.name.slice(0, 11))}</text>`;
  }).join('');
  const y80 = padT + plotH * 0.2;
  el.innerHTML = `<div class="note" style="margin-bottom:8px"><strong>Vital Few (~80% of impact):</strong> ${vital.map(v => esc(v)).join(', ')}</div>
    <svg viewBox="0 0 ${W} ${H}" style="width:100%;min-width:480px;background:var(--bg);border:1px solid var(--b);border-radius:10px">
      <line x1="${padL}" y1="${y80}" x2="${W - padR}" y2="${y80}" stroke="#dc2626" stroke-dasharray="4" stroke-opacity="0.6"/>
      <text x="${W - padR + 4}" y="${y80 + 4}" font-size="10" fill="#dc2626">80%</text>
      ${bars}
      <polyline points="${pts.join(' ')}" fill="none" stroke="#f59e0b" stroke-width="2.2"/>
      ${pts.map(p => `<circle cx="${p.split(',')[0]}" cy="${p.split(',')[1]}" r="3.5" fill="#f59e0b"/>`).join('')}
    </svg>`;
}

/* ---- 3c. Strategy & Execution (Roadmap · RACI · Experiment · Pre-Mortem) ---- */
V['pm-strat'] = () => `
  <h2>Strategy, Alignment &amp; Execution</h2>
  <p class="m" style="font-size:13px;margin-top:0">Build outcome-driven <strong>Now/Next/Later Roadmaps</strong>, validate <strong>RACI Governance</strong>, design <strong>A/B Experiments</strong>, and run <strong>Pre-Mortems</strong>.</p>

  <div class="card">
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h3 style="margin:0">1. Now / Next / Later Outcome Roadmap</h3>
      <div class="row" style="gap:6px">
        <button class="btn" onclick="loadRoadmapPreset()">Load Example</button>
        <button class="btn" onclick="clearRoadmap()">Clear</button>
      </div>
    </div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:8px;margin:10px 0">
      <div><label>Initiative</label><input id="rm-title" placeholder="e.g., 1-Click CSV Import"></div>
      <div><label>Target Outcome</label><input id="rm-out" placeholder="e.g., +15% Activation"></div>
      <div><label>Horizon</label><select id="rm-col"><option>Now</option><option>Next</option><option>Later</option></select></div>
      <div><label>Confidence</label><select id="rm-conf"><option>High</option><option>Med</option><option>Low</option></select></div>
    </div>
    <button class="btn primary" onclick="addRoadmapItem()">+ Add to Roadmap</button>
    <div id="rm-board" class="grid" style="grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;margin-top:12px"></div>
  </div>

  <div class="card">
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h3 style="margin:0">2. Interactive RACI Governance Validator</h3>
      <div class="row" style="gap:6px">
        <button class="btn" onclick="loadRaciPreset()">Load Example</button>
        <button class="btn" onclick="clearRaci()">Clear</button>
      </div>
    </div>
    <p class="m" style="font-size:12px;margin:4px 0 8px">Click any cell to cycle <strong>R → A → C → I → –</strong>. Every deliverable must have exactly <strong>one Accountable (A)</strong> owner.</p>
    <div class="row" style="gap:8px;margin-bottom:8px;flex-wrap:wrap">
      <input id="rc-task" placeholder="New deliverable or decision..." style="flex:1;min-width:180px">
      <button class="btn primary" onclick="addRaciRow()">+ Add Row</button>
    </div>
    <div id="raci-out" class="table-wrap"></div>
  </div>

  <div class="card">
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h3 style="margin:0">3. Experiment &amp; A/B Test Canvas</h3>
      <div class="row" style="gap:6px">
        <button class="btn" onclick="loadExpPreset()">Load Example</button>
        <button class="btn" onclick="clearExp()">Clear</button>
        <button class="btn primary" id="exp-copy-btn" onclick="copyExp()">Copy Canvas</button>
      </div>
    </div>
    <div id="exp-body" style="margin-top:10px"></div>
  </div>

  <div class="card">
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h3 style="margin:0">4. Pre-Mortem Failure Matrix</h3>
      <div class="row" style="gap:6px">
        <button class="btn" onclick="loadPremortemPreset()">Load Example</button>
        <button class="btn" onclick="clearPremortem()">Clear</button>
      </div>
    </div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin:10px 0">
      <div><label>Failure Mode ("How did it fail?")</label><input id="pmo-risk" placeholder="e.g., IdP edge-case delay"></div>
      <div><label>Likelihood (1–5)</label><input id="pmo-l" type="number" min="1" max="5" value="3"></div>
      <div><label>Impact (1–5)</label><input id="pmo-i" type="number" min="1" max="5" value="4"></div>
      <div><label>Mitigation</label><input id="pmo-m" placeholder="Early Spike / Beta"></div>
    </div>
    <button class="btn primary" onclick="addPremortem()">+ Add Failure Mode</button>
    <div id="pmo-out" class="table-wrap" style="margin-top:10px"></div>
  </div>
`;

let roadmapItems = store.roadmapItems || STRATEGY_PRESETS.roadmap.map(x => ({ ...x }));
window.loadRoadmapPreset = function () { roadmapItems = STRATEGY_PRESETS.roadmap.map(x => ({ ...x })); store.roadmapItems = roadmapItems; save(); renderRoadmap(); };
window.clearRoadmap = function () { roadmapItems = []; store.roadmapItems = roadmapItems; save(); renderRoadmap(); };
window.addRoadmapItem = function () {
  const title = ($('rm-title')?.value || '').trim();
  if (!title) return;
  roadmapItems.push({ col: $('rm-col')?.value || 'Now', title, outcome: ($('rm-out')?.value || '').trim() || 'Measurable outcome', conf: $('rm-conf')?.value || 'Med' });
  store.roadmapItems = roadmapItems; save();
  if ($('rm-title')) $('rm-title').value = '';
  if ($('rm-out')) $('rm-out').value = '';
  renderRoadmap();
};
window.moveRoadmap = function (idx, col) { roadmapItems[idx].col = col; store.roadmapItems = roadmapItems; save(); renderRoadmap(); };
function renderRoadmap() {
  const el = $('rm-board');
  if (!el) return;
  const cols = [['Now', '#059669', 'Committed'], ['Next', '#2563eb', 'Validating'], ['Later', '#7c3aed', 'Exploring']];
  el.innerHTML = cols.map(([c, col, sub]) => {
    const items = roadmapItems.map((x, i) => ({ ...x, i })).filter(x => x.col === c);
    return `<div class="card" style="background:var(--bg);margin:0;border-top:3px solid ${col}">
      <div class="row" style="justify-content:space-between"><strong>${c}</strong><span class="m" style="font-size:11px">${sub}</span></div>
      ${items.length ? items.map(it => `<div class="card" style="margin:8px 0 0;padding:8px">
        <strong style="font-size:13px">${esc(it.title)}</strong>
        <div class="m" style="font-size:12px;margin:2px 0 6px">${esc(it.outcome)} · <span class="tag">${esc(it.conf)}</span></div>
        <div class="row" style="gap:4px">${['Now', 'Next', 'Later'].filter(x => x !== c).map(nc => `<button class="btn" style="padding:2px 6px;font-size:10.5px;${INACTIVE_BTN}" onclick="moveRoadmap(${it.i},'${nc}')">→ ${nc}</button>`).join('')}</div>
      </div>`).join('') : '<p class="m" style="font-size:12px;margin-top:8px">Empty</p>'}
    </div>`;
  }).join('');
}

let raciData = store.raciData || JSON.parse(JSON.stringify(STRATEGY_PRESETS.raci));
window.loadRaciPreset = function () { raciData = JSON.parse(JSON.stringify(STRATEGY_PRESETS.raci)); store.raciData = raciData; save(); renderRaci(); };
window.clearRaci = function () { raciData = { roles: ['PM', 'Eng Lead', 'Design', 'Sponsor'], rows: [] }; store.raciData = raciData; save(); renderRaci(); };
window.addRaciRow = function () {
  const t = ($('rc-task')?.value || '').trim();
  if (!t) return;
  raciData.rows.push({ task: t, assign: raciData.roles.map((_, i) => i === 0 ? 'A' : 'C') });
  store.raciData = raciData; save();
  if ($('rc-task')) $('rc-task').value = '';
  renderRaci();
};
window.cycleRaci = function (ri, ci) {
  const seq = ['R', 'A', 'C', 'I', '–'];
  const curVal = raciData.rows[ri].assign[ci];
  raciData.rows[ri].assign[ci] = seq[(seq.indexOf(curVal) + 1) % seq.length];
  store.raciData = raciData; save(); renderRaci();
};
function renderRaci() {
  const el = $('raci-out');
  if (!el) return;
  if (!raciData.rows.length) { el.innerHTML = '<p class="m" style="font-size:13px">No deliverables yet. Add one or click Load Example.</p>'; return; }
  const invalid = raciData.rows.filter(r => r.assign.filter(x => x === 'A').length !== 1).map(r => r.task);
  el.innerHTML = `<div class="note" style="margin-bottom:8px;border-left:3px solid ${invalid.length ? '#dc2626' : '#059669'}">
    ${invalid.length ? `<strong>Governance Gap:</strong> Ensure exactly one <strong>A</strong> on: ${invalid.map(esc).join(', ')}` : '<strong>Valid RACI:</strong> Every deliverable has exactly one Accountable (A) owner.'}
  </div><table><tr><th>Deliverable / Decision</th>${raciData.roles.map(r => `<th>${esc(r)}</th>`).join('')}<th>Status</th></tr>
    ${raciData.rows.map((r, ri) => {
      const aCnt = r.assign.filter(x => x === 'A').length;
      return `<tr><td>${esc(r.task)}</td>${r.assign.map((v, ci) => `<td><button class="btn" style="padding:3px 10px;font-size:12px;${v === 'A' ? '' : INACTIVE_BTN}" onclick="cycleRaci(${ri},${ci})">${v}</button></td>`).join('')}<td>${aCnt === 1 ? '✅' : '⚠️'}</td></tr>`;
    }).join('')}
  </table>`;
}

let expData = store.expData || { ...STRATEGY_PRESETS.experiment };
window.loadExpPreset = function () { expData = { ...STRATEGY_PRESETS.experiment }; store.expData = expData; save(); renderExperiment(); };
window.clearExp = function () { expData = { hypothesis: '', primary: '', guardrail: '', criteria: '' }; store.expData = expData; save(); renderExperiment(); };
window.updExp = function (k, v) { expData[k] = v; store.expData = expData; save(); };
window.copyExp = function () {
  const t = `EXPERIMENT CANVAS\nHypothesis: ${expData.hypothesis}\nPrimary Metric: ${expData.primary}\nGuardrail: ${expData.guardrail}\nDecision Rule: ${expData.criteria}`;
  navigator.clipboard?.writeText(t);
  const b = $('exp-copy-btn'); if (b) { b.textContent = 'Copied!'; setTimeout(() => { b.textContent = 'Copy Canvas'; }, 1500); }
};
function renderExperiment() {
  const el = $('exp-body');
  if (!el) return;
  el.innerHTML = `<div style="margin-bottom:8px"><label>Hypothesis (If we… then… because…)</label><textarea rows="2" oninput="updExp('hypothesis',this.value)">${esc(expData.hypothesis)}</textarea></div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px">
      <div><label>Primary Success Metric</label><input value="${esc(expData.primary)}" oninput="updExp('primary',this.value)"></div>
      <div><label>Guardrail Metric</label><input value="${esc(expData.guardrail)}" oninput="updExp('guardrail',this.value)"></div>
    </div>
    <div style="margin-top:8px"><label>Ship / Iterate / Kill Decision Rule</label><input value="${esc(expData.criteria)}" oninput="updExp('criteria',this.value)"></div>`;
}

let premortemData = store.premortemData || STRATEGY_PRESETS.premortem.map(x => ({ ...x }));
window.loadPremortemPreset = function () { premortemData = STRATEGY_PRESETS.premortem.map(x => ({ ...x })); store.premortemData = premortemData; save(); renderPremortem(); };
window.clearPremortem = function () { premortemData = []; store.premortemData = premortemData; save(); renderPremortem(); };
window.addPremortem = function () {
  const risk = ($('pmo-risk')?.value || '').trim();
  if (!risk) return;
  premortemData.push({ risk, like: Math.min(5, Math.max(1, +$('pmo-l').value || 3)), imp: Math.min(5, Math.max(1, +$('pmo-i').value || 3)), signal: 'Monitor weekly', mit: ($('pmo-m')?.value || '').trim() || 'Define owner' });
  store.premortemData = premortemData; save();
  if ($('pmo-risk')) $('pmo-risk').value = '';
  renderPremortem();
};
function renderPremortem() {
  const el = $('pmo-out');
  if (!el) return;
  if (!premortemData.length) { el.innerHTML = '<p class="m" style="font-size:13px">No failure modes yet. Add one or click Load Example.</p>'; return; }
  const sorted = premortemData.slice().sort((a, b) => (b.like * b.imp) - (a.like * a.imp));
  el.innerHTML = `<table><tr><th>Score</th><th>Failure Mode</th><th>Mitigation</th></tr>
    ${sorted.map(r => `<tr><td><strong>${r.like * r.imp}</strong> <span class="m" style="font-size:11px">(${r.like}×${r.imp})</span></td><td>${esc(r.risk)}</td><td>${esc(r.mit)}</td></tr>`).join('')}
  </table>`;
}

/* ---- 4. Cases & Drills ---- */
V['pm-cases'] = () => `
  <h2>Product Cases &amp; Scenario Drills</h2>
  <p class="m" style="font-size:13px;margin-top:0">Practise structured product interviews (<strong>CIRCLES</strong>, <strong>STARL</strong>, <strong>JTBD</strong>, <strong>OST</strong>, <strong>Lean Canvas</strong>) with auto-saved drafts &amp; self-grading rubrics, plus real-world PM decision drills.</p>
  <div class="card">
    <h3>1. Guided Case Worksheet (Auto-Saved)</h3>
    <div class="row" style="margin-bottom:10px;gap:6px;flex-wrap:wrap">
      <select id="case-fw-sel" onchange="onCaseFwChange()">
        <option value="circles">CIRCLES (Product Design)</option>
        <option value="starl">STARL (Behavioral / Leadership)</option>
        <option value="jtbd">JTBD (Jobs-to-be-Done)</option>
        <option value="ost">Opportunity Solution Tree (OST)</option>
        <option value="leancanvas">Lean Canvas (0-to-1 Business)</option>
      </select>
      <select id="case-pr-sel" onchange="renderCaseWorksheet()"></select>
      <button class="btn" onclick="loadCaseExample()">Load Example</button>
      <button class="btn" onclick="clearCaseWorksheet()">Clear</button>
      <button class="btn primary" id="case-copy-btn" onclick="copyCaseWorksheet()">Copy Answer</button>
    </div>
    <div id="case-ws-body"></div>
  </div>

  <div class="card">
    <div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <h3 style="margin:0">2. Product Sense &amp; Execution Drills</h3>
      <span class="tag" id="pm-sc-score">Score: 0 / ${PM_SCENARIOS.length}</span>
    </div>
    <div id="pm-sc-body" style="margin-top:10px"></div>
  </div>
`;

window.onCaseFwChange = function () {
  const fw = $('case-fw-sel')?.value || 'circles';
  const prSel = $('case-pr-sel');
  if (prSel) {
    prSel.innerHTML = (PM_CASE_PROMPTS[fw] || []).map((p, i) => `<option value="${i}">${esc(p.label)}</option>`).join('');
  }
  renderCaseWorksheet();
};

window.renderCaseWorksheet = function () {
  const fwSel = $('case-fw-sel'), prSel = $('case-pr-sel'), body = $('case-ws-body');
  if (!fwSel || !prSel || !body) return;
  if (!prSel.options.length) {
    prSel.innerHTML = (PM_CASE_PROMPTS[fwSel.value] || []).map((p, i) => `<option value="${i}">${esc(p.label)}</option>`).join('');
  }
  const idx = +prSel.value || 0;
  const item = (PM_CASE_PROMPTS[fwSel.value] || [])[idx];
  if (!item) return;
  const draftKey = `${fwSel.value}_${idx}`;
  const drafts = (store.caseDrafts && store.caseDrafts[draftKey]) || [];
  body.innerHTML = `<div class="note" style="margin-bottom:10px"><strong>Prompt:</strong> ${esc(item.prompt)}</div>` +
    item.steps.map(([lbl, hint], i) => `<div style="margin-bottom:8px"><label><strong>${esc(lbl)}</strong> <span class="m" style="font-weight:400">(${esc(hint)})</span></label><textarea id="case-step-${i}" rows="2" placeholder="Write your response..." oninput="saveCaseDraft('${draftKey}',${i},this.value)">${esc(drafts[i] || '')}</textarea></div>`).join('') +
    `<div class="card" style="background:var(--bg);margin-top:10px"><strong>Self-Grading Rubric</strong>${item.rubric.map(r => `<label style="display:flex;align-items:center;gap:8px;margin-top:6px;font-weight:400"><input type="checkbox" style="width:auto"> ${esc(r)}</label>`).join('')}</div>`;
};

window.saveCaseDraft = function (k, i, val) {
  store.caseDrafts = store.caseDrafts || {};
  store.caseDrafts[k] = store.caseDrafts[k] || [];
  store.caseDrafts[k][i] = val;
  save();
};

window.loadCaseExample = function () {
  const fw = $('case-fw-sel')?.value || 'circles', idx = +($('case-pr-sel')?.value || 0);
  const item = (PM_CASE_PROMPTS[fw] || [])[idx];
  if (!item) return;
  item.steps.forEach(([, , ex], i) => {
    const el = $(`case-step-${i}`);
    if (el) { el.value = ex || ''; window.saveCaseDraft(`${fw}_${idx}`, i, ex || ''); }
  });
};

window.clearCaseWorksheet = function () {
  const fw = $('case-fw-sel')?.value || 'circles', idx = +($('case-pr-sel')?.value || 0);
  const item = (PM_CASE_PROMPTS[fw] || [])[idx];
  if (!item) return;
  item.steps.forEach((_, i) => {
    const el = $(`case-step-${i}`);
    if (el) { el.value = ''; window.saveCaseDraft(`${fw}_${idx}`, i, ''); }
  });
};

window.copyCaseWorksheet = function () {
  const fw = $('case-fw-sel')?.value || 'circles', idx = +($('case-pr-sel')?.value || 0);
  const item = (PM_CASE_PROMPTS[fw] || [])[idx];
  if (!item) return;
  const text = `${item.label}\nPrompt: ${item.prompt}\n\n` + item.steps.map(([lbl], i) => `${lbl}:\n${($(`case-step-${i}`)?.value || '').trim()}`).join('\n\n');
  navigator.clipboard?.writeText(text);
  const btn = $('case-copy-btn');
  if (btn) { btn.textContent = 'Copied!'; setTimeout(() => { btn.textContent = 'Copy Answer'; }, 1500); }
};

let pmScIdx = 0, pmScAnswered = {};
function renderPmScenario() {
  const body = $('pm-sc-body'), scoreEl = $('pm-sc-score');
  if (!body) return;
  const correctCount = Object.entries(pmScAnswered).filter(([i, a]) => PM_SCENARIOS[i]?.ans === a).length;
  if (scoreEl) scoreEl.textContent = `Score: ${correctCount} / ${PM_SCENARIOS.length}`;
  const sc = PM_SCENARIOS[pmScIdx];
  const picked = pmScAnswered[pmScIdx];
  body.innerHTML = `
    <div class="row" style="justify-content:space-between;margin-bottom:8px">
      <span class="tag">${esc(sc.cat)}</span>
      <span class="m" style="font-size:12px">Scenario ${pmScIdx + 1} of ${PM_SCENARIOS.length}</span>
    </div>
    <p style="font-weight:600;margin:6px 0 10px">${esc(sc.q)}</p>
    ${sc.opts.map((o, i) => {
      let st = '';
      if (picked !== undefined) {
        if (i === sc.ans) st = 'border-color:#059669;background:rgba(5,150,105,0.1)';
        else if (i === picked) st = 'border-color:#dc2626;background:rgba(220,38,38,0.1)';
      }
      return `<button class="btn" style="display:block;width:100%;text-align:left;margin-bottom:6px;background:var(--bg);color:var(--t);border:1px solid var(--b);${st}" onclick="pickPmScenario(${i})">${esc(o)}</button>`;
    }).join('')}
    ${picked !== undefined ? `<div class="note" style="margin-top:8px"><strong>${picked === sc.ans ? 'Correct!' : 'Not quite.'}</strong> ${esc(sc.why)}</div>` : ''}
    <div class="row" style="margin-top:10px;gap:8px">
      <button class="btn" style="${pmScIdx === 0 ? INACTIVE_BTN : ''}" onclick="navPmScenario(-1)">← Prev</button>
      <button class="btn primary" onclick="navPmScenario(1)">Next →</button>
    </div>`;
}
window.pickPmScenario = function (optIdx) { pmScAnswered[pmScIdx] = optIdx; recordActivity(1); renderPmScenario(); };
window.navPmScenario = function (d) { pmScIdx = (pmScIdx + d + PM_SCENARIOS.length) % PM_SCENARIOS.length; renderPmScenario(); };

/* ============ Frameworks Practice Lab ============ */
const FW_PROMPTS = {
  circles: {
    title: 'CIRCLES — Product Design & Problem Solving',
    prompt: 'Design a feature to help remote project teams avoid meeting fatigue and missed action items.',
    steps: [
      ['C — Comprehend', 'Clarify goal, constraints, platform, and success criteria.', 'Goal: Reduce meeting fatigue & missed action items for distributed teams on Slack/Teams within 3 months. Success: -25% meeting hours, +30% on-time action item completion.'],
      ['I — Identify Customer', 'Who is the primary user? (e.g., Remote PMs, distributed engineers)', 'Primary: Remote Project/Product Managers running 5+ cross-functional syncs/week. Secondary: Distributed engineers across time zones.'],
      ['R — Report Needs', 'What pain points or jobs-to-be-done do they have?', '1) Too many status meetings just to share updates. 2) Action items get buried in chat or lost after calls. 3) Async teammates lack context.'],
      ['C — Cut Through Prioritization', 'Which single user need will you focus on first and why?', 'Focus on #2 (lost action items & decisions) because it directly causes follow-up meetings and rework.'],
      ['L — List Solutions', 'Brainstorm 3 distinct solutions (low, medium, high effort).', '1) Auto-capture Slack/Meet decisions into a daily digest (Low). 2) Interactive async check-in bot replacing standups (Med). 3) Full AI meeting copilot with Jira/Asana sync (High).'],
      ['E — Evaluate Trade-offs', 'Compare solutions on impact, cost, risk, and dependencies.', 'Option 2 gives high impact with medium effort and no heavy video-API dependencies; Option 1 is a fast MVP.'],
      ['S — Summarize', 'State your final recommendation and how you will measure success.', 'Launch Option 1 as a 2-week MVP, then layer Option 2. Track % of meetings replaced by async digests and action-item completion rate.']
    ]
  },
  starl: {
    title: 'STARL — Behavioral & Leadership Storytelling',
    prompt: 'Tell me about a time a key stakeholder changed scope late in a project and how you handled it.',
    steps: [
      ['S — Situation', 'Set the context: project, team size, timeline, and stakes.', '2 weeks before a Q3 enterprise portal launch (team of 8), the VP of Sales requested a custom SSO integration for a key prospect.'],
      ['T — Task', 'What was your specific responsibility or challenge?', 'Protect the committed launch date and quality while finding a way to support the high-value sales deal.'],
      ['A — Action', 'What concrete steps did YOU take? (e.g., impact analysis, trade-off options)', 'Ran a 1-hour impact assessment with tech leads, quantified a 3-week delay if bundled, and proposed a phased release: launch core portal on time + fast-follow SSO in Sprint +1.'],
      ['R — Result', 'Quantify the outcome (schedule saved, budget protected, adoption %).', 'Core portal launched on schedule with 0 Sev-1 bugs; SSO shipped 10 days later, closing the $250K deal.'],
      ['L — Learning', 'What did you learn and how did you improve your process afterward?', 'Added a formal Change Control checkpoint 3 weeks pre-launch and aligned Sales/Product on a fast-follow intake lane.']
    ]
  },
  jtbd: {
    title: 'JTBD — Jobs-to-be-Done Statement',
    prompt: 'Define the core job for a PM using an AI-assisted status reporting tool.',
    steps: [
      ['When (Situation)', 'e.g., When preparing for a weekly executive steering committee...', 'When preparing for a weekly executive steering committee across 3 parallel workstreams...'],
      ['I want to (Motivation)', 'e.g., I want to synthesize risks, blockers, and EVM trends in 5 minutes...', 'I want to automatically synthesize risks, blockers, and schedule/budget variance into a 1-page brief in 5 minutes...'],
      ['So I can (Expected Outcome)', 'e.g., So I can spend the meeting aligning on decisions rather than reading slides.', 'So I can spend the meeting aligning executives on trade-off decisions rather than manually chasing status updates.']
    ]
  }
};

V.frameworks = () => { setTimeout(() => go('pm-prio'), 0); return '<p class="m">Redirecting to Product Mastery...</p>'; };

let prioMode = 'rice';
let prioItems = store.prioItems || [
  { mode: 'rice', name: 'AI Status Digest', v1: 1000, v2: 2, v3: 80, v4: 2, score: 800 },
  { mode: 'rice', name: 'Dark Mode', v1: 2000, v2: 0.5, v3: 100, v4: 1, score: 1000 }
];

window.setPrioMode = function (m) {
  prioMode = m;
  const rBtn = $('pm-rice-btn'), wBtn = $('pm-wsjf-btn');
  if (rBtn && wBtn) {
    rBtn.classList.toggle('primary', m === 'rice');
    wBtn.classList.toggle('primary', m === 'wsjf');
    const inactive = 'opacity:0.55;background:var(--bg);color:var(--t);border:1px solid var(--b)';
    rBtn.style.cssText = m === 'rice' ? '' : inactive;
    wBtn.style.cssText = m === 'wsjf' ? '' : inactive;
  }
  if (m === 'rice') {
    $('pr-l1').textContent = 'Reach (users/qtr)'; $('pr-v1').value = 1000;
    $('pr-l2').textContent = 'Impact (0.25–3)'; $('pr-v2').value = 2;
    $('pr-l3').textContent = 'Confidence (%)'; $('pr-v3').value = 80;
    $('pr-l4').textContent = 'Effort (person-mo)'; $('pr-v4').value = 2;
  } else {
    $('pr-l1').textContent = 'Business Value (1–10)'; $('pr-v1').value = 8;
    $('pr-l2').textContent = 'Time Criticality (1–10)'; $('pr-v2').value = 7;
    $('pr-l3').textContent = 'Risk/Opp Enablement (1–10)'; $('pr-v3').value = 5;
    $('pr-l4').textContent = 'Job Size (1–10)'; $('pr-v4').value = 3;
  }
  renderPrioTable();
};

window.addPrioItem = function () {
  const name = ($('pr-name').value || '').trim() || 'Untitled Item';
  const v1 = +$('pr-v1').value || 0, v2 = +$('pr-v2').value || 0, v3 = +$('pr-v3').value || 0, v4 = Math.max(0.1, +$('pr-v4').value || 1);
  const score = prioMode === 'rice' ? Math.round((v1 * v2 * (v3 / 100)) / v4) : +((v1 + v2 + v3) / v4).toFixed(2);
  prioItems.push({ mode: prioMode, name, v1, v2, v3, v4, score });
  store.prioItems = prioItems; save();
  $('pr-name').value = '';
  renderPrioTable();
};

window.clearPrioItems = function () { prioItems = []; store.prioItems = prioItems; save(); renderPrioTable(); };

window.loadPrioExample = function () {
  if (prioMode === 'rice') {
    prioItems = [
      { mode: 'rice', name: 'AI Status Digest', v1: 1000, v2: 2, v3: 80, v4: 2, score: 800 },
      { mode: 'rice', name: 'Dark Mode', v1: 2000, v2: 0.5, v3: 100, v4: 1, score: 1000 },
      { mode: 'rice', name: 'SSO Enterprise Login', v1: 400, v2: 3, v3: 90, v4: 3, score: 360 }
    ];
  } else {
    prioItems = [
      { mode: 'wsjf', name: 'Checkout Bug Fix', v1: 9, v2: 10, v3: 8, v4: 2, score: 13.5 },
      { mode: 'wsjf', name: 'API Rate Limiter', v1: 7, v2: 6, v3: 9, v4: 3, score: 7.33 },
      { mode: 'wsjf', name: 'Admin CSV Export', v1: 5, v2: 3, v3: 2, v4: 2, score: 5 }
    ];
  }
  store.prioItems = prioItems; save();
  renderPrioTable();
};

window.resetPrioLab = function () {
  window.setPrioMode('rice');
  window.loadPrioExample();
};

function renderPrioTable() {
  const el = $('prio-table');
  if (!el) return;
  const rows = prioItems.filter(x => x.mode === prioMode).sort((a, b) => b.score - a.score);
  if (!rows.length) { el.innerHTML = '<p class="m" style="font-size:13px">No items yet. Add an initiative above to rank it.</p>'; return; }
  el.innerHTML = `<table><tr><th>Rank</th><th>Initiative</th><th>Score (${prioMode.toUpperCase()})</th></tr>${rows.map((r, i) => `<tr><td><strong>#${i + 1}</strong></td><td>${esc(r.name)}</td><td><strong>${r.score}</strong></td></tr>`).join('')}</table>`;
}

window.renderFwWorksheet = function () {
  const sel = $('fw-ws-sel');
  const body = $('fw-ws-body');
  if (!sel || !body) return;
  const fw = FW_PROMPTS[sel.value];
  body.innerHTML = `<div class="note" style="margin-bottom:10px"><strong>Practice Prompt:</strong> ${esc(fw.prompt)}</div>` +
    fw.steps.map(([lbl, hint], i) => `<div style="margin-bottom:8px"><label><strong>${esc(lbl)}</strong> <span class="m" style="font-weight:400">(${esc(hint)})</span></label><textarea id="fw-step-${i}" rows="2" placeholder="Write your response..."></textarea></div>`).join('');
};

window.loadFwExample = function () {
  const sel = $('fw-ws-sel');
  if (!sel) return;
  const fw = FW_PROMPTS[sel.value];
  fw.steps.forEach(([, , ex], i) => {
    const el = $(`fw-step-${i}`);
    if (el) el.value = ex || '';
  });
};

window.clearFwWorksheet = function () {
  const sel = $('fw-ws-sel');
  if (!sel) return;
  FW_PROMPTS[sel.value].steps.forEach((_, i) => {
    const el = $(`fw-step-${i}`);
    if (el) el.value = '';
  });
};

window.copyFwWorksheet = function () {
  const sel = $('fw-ws-sel');
  if (!sel) return;
  const fw = FW_PROMPTS[sel.value];
  const text = `${fw.title}\nPrompt: ${fw.prompt}\n\n` + fw.steps.map(([lbl], i) => `${lbl}:\n${($(`fw-step-${i}`)?.value || '').trim()}`).join('\n\n');
  navigator.clipboard?.writeText(text);
  const btn = $('fw-copy-btn');
  if (btn) { btn.textContent = 'Copied!'; setTimeout(() => { btn.textContent = 'Copy Structured Answer'; }, 1500); }
};

/* ============ Glossary & Flashcards ============ */
V.glossary = () => `
  <h2>Glossary of Terms (${GLOSSARY.length})</h2>
  <div class="card"><input id="gq" placeholder="Filter terms or definitions..." oninput="filterGloss(this.value)"></div>
  <div id="gl">${glossHTML(GLOSSARY)}</div>`;
const glossHTML = list => list.length ? list.map(([t, d]) => {
  const idx = GLOSSARY.findIndex(x => x[0] === t);
  return `<div class="card" style="margin:8px 0;display:flex;justify-content:space-between;align-items:flex-start">
    <div><strong>${esc(t)}</strong><div class="m" style="margin-top:4px">${esc(d)}</div></div>
    <button class="btn2" style="padding:4px 8px;font-size:12px;margin-left:8px" onclick="speakGloss(${idx})" aria-label="Listen to ${esc(t)}">🔊</button>
  </div>`;
}).join('') : '<div class="card m">No matching glossary terms found.</div>';
function filterGloss(v) { const q = v.toLowerCase(); $('gl').innerHTML = glossHTML(GLOSSARY.filter(([t, d]) => (t + d).toLowerCase().includes(q))); }

V.flash = () => {
  const deck = getFlashDeck();
  const isBrowse = store.fcMode === 'browse';
  const queue = dueQueue();
  const mastered = deck.filter(c => (store.srs[c.id]?.r || 0) >= 3).length;

  const deckBar = `
    <div class="row" style="justify-content:space-between;margin-bottom:10px">
      <div class="seg">
        ${[['glossary', 'Glossary'], ['formulas', 'Formulas'], ['agile', 'Agile'], ['frameworks', 'Frameworks'], ['custom', `Custom (${store.customCards.length})`]].map(([k, lbl]) =>
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
  <h3>PM &amp; Product Mastery Frameworks</h3>
  <p class="m" style="font-size:13px;margin-top:0">Essential prioritization, problem-solving, interview, and strategy frameworks to master project &amp; product management beyond the exam.</p>
  <div class="row" style="margin-bottom:12px" id="fw-cats">
    ${['All', 'Prioritization', 'Problem-Solving & Interviews', 'Strategy & Discovery'].map((c, i) =>
      `<button class="btn ${i === 0 ? 'primary' : ''}" style="${i === 0 ? '' : 'opacity:0.55;background:var(--bg);color:var(--t);border:1px solid var(--b)'}" onclick="filterFrameworks('${esc(c)}', this)">${esc(c)}</button>`
    ).join('')}
  </div>
  <div id="fw-grid" class="grid" style="margin-bottom:16px">
    ${PM_FRAMEWORKS.map(f => `
      <div class="card fw-card" data-cat="${esc(f.cat)}" style="margin:0">
        <div class="row" style="justify-content:space-between;align-items:flex-start;gap:8px">
          <strong style="font-size:15px">${esc(f.name)}</strong>
          <span class="tag">${esc(f.cat)}</span>
        </div>
        <div class="m" style="font-size:12px;color:var(--a);margin-top:4px;font-weight:600">${esc(f.acronym)}</div>
        <p style="font-size:13px;margin:8px 0 6px">${esc(f.desc)}</p>
        <div class="m" style="font-size:12px"><strong>When:</strong> ${esc(f.when)}</div>
        <div class="m" style="font-size:12px;margin-top:4px"><strong>How:</strong> ${esc(f.steps)}</div>
      </div>
    `).join('')}
  </div>
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

window.filterFrameworks = function (cat, btn) {
  const inactive = 'opacity:0.55;background:var(--bg);color:var(--t);border:1px solid var(--b)';
  document.querySelectorAll('#fw-cats .btn').forEach(b => { b.classList.remove('primary'); b.style.cssText = inactive; });
  if (btn) { btn.classList.add('primary'); btn.style.cssText = ''; }
  document.querySelectorAll('#fw-grid .fw-card').forEach(el => {
    el.style.display = (cat === 'All' || el.dataset.cat === cat) ? '' : 'none';
  });
};

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
  if (tBtn) {
    tBtn.textContent = store.theme === 'dark' ? '🌙' : store.theme === 'light' ? '☀️' : '🌓';
    tBtn.title = `Theme: ${store.theme === 'auto' ? 'Auto' : store.theme === 'dark' ? 'Dark' : 'Light'} (click to switch)`;
  }
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
            toast('Update available — <button type="button" class="btn2" style="margin-left:8px;padding:3px 10px;font-size:12px;color:#fff;background:#2563eb;border:none;border-radius:6px;cursor:pointer" onclick="location.reload()">Reload</button>', 8000);
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
  if (key === 'frameworks') { renderPrioTable(); renderFwWorksheet(); }
  if (key === 'pm-prio') { renderPrioTable(); renderMatrix2x2(); renderMoscow(); }
  if (key === 'pm-metrics') { calcAARRR(); calcPMF(); renderHeartTable(); }
  if (key === 'pm-rca') { renderFishbone(); renderFiveWhys(); renderPareto(); }
  if (key === 'pm-strat') { renderRoadmap(); renderRaci(); renderExperiment(); renderPremortem(); }
  if (key === 'pm-cases') { renderCaseWorksheet(); renderPmScenario(); }
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
    const q = QUIZ[QZ.pool[QZ.i]];
    if (QZ.ans === null && ['1', '2', '3', '4'].includes(e.key)) {
      if (!q?.type || q.type === 'single') answerQ(+e.key - 1);
      else if (q.type === 'multi') toggleMultiOpt(+e.key - 1);
    } else if (QZ.ans === null && e.key === 'Enter' && q?.type === 'multi') {
      submitMultiQ();
    } else if (QZ.ans !== null && e.key === 'Enter') {
      nextQ();
    }
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
  doSearch, installPWA, toggleSound, openSoundSettings, toggleTheme, openAbout, openOnboarding, saveOnboarding, skipOnboarding,
  closeInspector, showInspector, speakText, playSound,
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
