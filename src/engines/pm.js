export const DAY = 86400000;

export const CPM_PRESETS = {
  software: `# id | name | duration (days) | predecessors
A | Charter approval | 3 |
B | Requirements | 5 | A
C | Architecture design | 4 | B
D | Build core | 8 | C
E | Test planning | 3 | B
F | System testing | 4 | D,E
G | UAT and deploy | 1 | F
H | Training | 2 | E`,
  cloud: `# id | name | duration (days) | predecessors
A | Discovery & inventory | 4 |
B | Target architecture | 6 | A
C | Schema migration scripts | 5 | B
D | Pilot data load | 4 | C
E | Security & IAM setup | 3 | B
F | Performance tuning | 5 | D,E
G | Cutover & validation | 2 | F`,
  construction: `# id | name | duration (days) | predecessors
A | Site survey & permits | 10 |
B | Excavation & ground work | 8 | A
C | Foundation pouring | 12 | B
D | Structural steel framing | 15 | C
E | Exterior cladding | 10 | D
F | Rough plumbing & HVAC | 12 | D
G | Interior fitout | 14 | E,F
H | Final inspection & handover | 4 | G`,
  launch: `# id | name | duration (days) | predecessors
A | Market research & positioning | 5 |
B | Creative assets design | 7 | A
C | Landing page build | 4 | B
D | Ad copy & audience targeting | 3 | A
E | Tracking & analytics setup | 2 | C
F | Soft launch & A/B testing | 5 | C,D,E
G | Global campaign rollout | 3 | F`
};

export const EVM_PRESETS = {
  custom: { bac: 100000, pv: 50000, ev: 45000, ac: 52000 },
  healthy: { bac: 250000, pv: 100000, ev: 100000, ac: 95000 },
  behind_under: { bac: 250000, pv: 125000, ev: 100000, ac: 85000 },
  ahead_over: { bac: 250000, pv: 80000, ev: 100000, ac: 120000 },
  critical: { bac: 250000, pv: 120000, ev: 80000, ac: 115000 }
};

export const RISK_PRESET = [
  { n: "Vendor delivery delay", p: 0.3, c: 40000 },
  { n: "Key staff attrition", p: 0.2, c: 60000 },
  { n: "Scope creep", p: 0.5, c: 25000 },
  { n: "Regulatory change", p: 0.1, c: 90000 },
  { n: "Currency fluctuation", p: 0.25, c: 12000 }
];

export const STAKE_PRESET = [
  { n: "Executive sponsor", pw: 5, in: 4 },
  { n: "End users", pw: 2, in: 5 },
  { n: "Regulator", pw: 4, in: 2 },
  { n: "Vendor lead", pw: 2, in: 3 }
];

export function parseTasks(txt) {
  return txt.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#')).map(l => {
    const [id, name, dur, preds] = l.split('|').map(s => (s || '').trim());
    return {
      id,
      name: name || id,
      dur: parseFloat(dur) || 0,
      preds: (preds || '').split(',').map(s => s.trim()).filter(Boolean)
    };
  }).filter(t => t.id);
}

export function cpm(tasks) {
  if (!tasks.length) return { error: 'No tasks provided.' };
  const by = Object.fromEntries(tasks.map(t => [t.id, t]));
  const succ = Object.fromEntries(tasks.map(t => [t.id, []]));
  const indeg = {};
  tasks.forEach(t => {
    const ps = t.preds.filter(p => by[p]);
    indeg[t.id] = ps.length;
    ps.forEach(p => succ[p].push(t.id));
  });
  const queue = tasks.filter(t => !indeg[t.id]).map(t => t.id);
  const order = [];
  while (queue.length) {
    const id = queue.shift();
    order.push(id);
    succ[id].forEach(s => { if (--indeg[s] === 0) queue.push(s); });
  }
  if (order.length !== tasks.length) return { error: 'Cycle detected. Check predecessors.' };
  const R = {};
  order.forEach(id => {
    const validPreds = by[id].preds.filter(p => by[p]);
    const ES = validPreds.length ? Math.max(...validPreds.map(p => R[p].EF)) : 0;
    R[id] = { ES, EF: ES + by[id].dur };
  });
  const finish = Math.max(...order.map(id => R[id].EF));
  [...order].reverse().forEach(id => {
    const LF = succ[id].length ? Math.min(...succ[id].map(s => R[s].LS)) : finish;
    R[id].LF = LF;
    R[id].LS = LF - by[id].dur;
    R[id].TF = R[id].LS - R[id].ES;
  });
  return { order, R, finish, by };
}

export function calcEVMMetrics(BAC, PV, EV, AC) {
  const CV = EV - AC;
  const SV = EV - PV;
  const CPI = AC ? EV / AC : 0;
  const SPI = PV ? EV / PV : 0;
  const EACt = CPI > 0 ? BAC / CPI : BAC;
  const EACa = AC + (BAC - EV);
  const EACcs = (CPI > 0 && SPI > 0) ? AC + (BAC - EV) / (CPI * SPI) : BAC;
  const ETC = Math.max(0, EACt - AC);
  const VAC = BAC - EACt;
  const TCPI = (BAC - AC) > 0 ? (BAC - EV) / (BAC - AC) : NaN;
  return { BAC, PV, EV, AC, CV, SV, CPI, SPI, EACt, EACa, EACcs, ETC, VAC, TCPI };
}

export function getCorrectiveAction(cpi, spi, cv) {
  const fmt = x => Math.round(Math.abs(x)).toLocaleString();
  if (cpi >= 1.0 && spi >= 1.0) {
    return {
      title: "Target Performance Met",
      text: "Maintain current team velocity and quality controls. Continue monitoring risk triggers to preserve budget and schedule reserves.",
      action: "Monitor & Maintain Baselines"
    };
  }
  if (cpi >= 1.0 && spi < 1.0) {
    return {
      title: "Under Budget but Behind Schedule",
      text: "You have financial cushion ($" + fmt(cv) + " surplus). Evaluate Crashing critical path activities (adding resources or paid overtime) to recover schedule without exceeding BAC. Also check if non-critical tasks can be fast-tracked.",
      action: "Consider Crashing Critical Path"
    };
  }
  if (cpi < 1.0 && spi >= 1.0) {
    return {
      title: "Ahead of Schedule but Over Budget",
      text: "Schedule is advancing well, but expenditure exceeds value earned ($" + fmt(cv) + " overrun). Perform cost-driver audit: inspect contractor rates, rework waste, or overtime premiums. Do NOT add resources. Consider resource leveling to smooth costs.",
      action: "Audit Cost Drivers & Resource Leveling"
    };
  }
  return {
    title: "Critical Dual Overrun (Behind Schedule & Over Budget)",
    text: "Dual jeopardy: schedule is delayed and budget is breached. Do NOT crash with overtime (budget is exhausted). Recommended PM steps: 1) Root cause analysis with leads; 2) Zero-cost fast-tracking of parallel activities; 3) Escalate revised EAC to Project Sponsor; 4) Negotiate scope descoping via Change Control Board (CCB).",
    action: "Escalate to Sponsor & CCB Scope Adjustment"
  };
}

export function runMonteCarlo(risksList, trials = 1000, rng = Math.random) {
  const outcomes = [];
  for (let t = 0; t < trials; t++) {
    let totalLoss = 0;
    for (let i = 0; i < risksList.length; i++) {
      const r = risksList[i];
      if (rng() < r.p) totalLoss += r.c;
    }
    outcomes.push(totalLoss);
  }
  outcomes.sort((a, b) => a - b);
  const sum = outcomes.reduce((a, b) => a + b, 0);
  const mean = sum / trials;
  const p50 = outcomes[Math.floor(trials * 0.50)] ?? 0;
  const p80 = outcomes[Math.floor(trials * 0.80)] ?? 0;
  const p95 = outcomes[Math.floor(trials * 0.95)] ?? 0;
  const min = outcomes[0] ?? 0;
  const max = outcomes[trials - 1] ?? 0;

  const numBins = 12;
  const range = Math.max(max - min, 1);
  const binSize = range / numBins;
  const buckets = new Array(numBins).fill(0);
  outcomes.forEach(val => {
    let b = Math.floor((val - min) / binSize);
    if (b >= numBins) b = numBins - 1;
    buckets[b]++;
  });

  return { mean, p50, p80, p95, min, max, buckets, binSize, maxBucketCount: Math.max(...buckets, 1) };
}

export function calcPert(O, M, P) {
  const o = Math.max(0, O);
  const m = Math.max(o, M);
  const p = Math.max(m, P);
  const pert = (o + 4 * m + p) / 6;
  const tri = (o + m + p) / 3;
  const sd = (p - o) / 6;
  return { pert, tri, sd, variance: sd * sd };
}

export function calcPTA(tc, tf, cp, bsPct) {
  const bs = Math.min(99, Math.max(1, bsPct)) / 100;
  const tp = tc + tf;
  return { tp, bs, pta: ((cp - tp) / bs) + tc };
}

export function sm2Rate(prev, quality, now = Date.now()) {
  const c = prev ? { ...prev } : { ei: 2.5, iv: 0, r: 0, due: 0 };
  if (quality < 3) {
    c.r = 0;
    c.iv = 0;
    c.due = now + 10 * 60000;
  } else {
    c.iv = c.r === 0 ? 1 : c.r === 1 ? 6 : Math.round(c.iv * c.ei);
    c.r++;
    c.due = now + c.iv * DAY;
  }
  c.ei = Math.max(1.3, c.ei + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  return c;
}

/**
 * Sample n questions respecting official PMP ECO domain weights:
 * People 42%, Process 50%, Business Environment 8%.
 */
export function sampleECOExam(quiz, n, rng = Math.random) {
  const total = Math.min(n, quiz.length);
  const shuffle = arr => {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const buckets = { E: [], P: [], B: [] };
  quiz.forEach((q, i) => {
    if (buckets[q.d]) buckets[q.d].push(i);
  });
  Object.keys(buckets).forEach(k => { buckets[k] = shuffle(buckets[k]); });

  const targetE = Math.round(total * 0.42);
  const targetB = Math.max(1, Math.round(total * 0.08));
  const targetP = Math.max(0, total - targetE - targetB);

  const picked = [];
  const take = (k, count) => {
    const items = buckets[k].splice(0, count);
    picked.push(...items);
  };
  take('E', targetE);
  take('P', targetP);
  take('B', targetB);

  if (picked.length < total) {
    const remaining = shuffle([...buckets.E, ...buckets.P, ...buckets.B]);
    picked.push(...remaining.slice(0, total - picked.length));
  }
  return shuffle(picked);
}

export function todayKey(ts = Date.now()) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getStreakInfo(store, now = Date.now()) {
  const log = store.activity || {};
  let streak = 0;
  let cursor = new Date(now);
  // If no activity today yet, start checking from yesterday so streak isn't prematurely 0
  if (!log[todayKey(cursor.getTime())]) {
    cursor = new Date(cursor.getTime() - DAY);
  }
  while (log[todayKey(cursor.getTime())] > 0) {
    streak++;
    cursor = new Date(cursor.getTime() - DAY);
  }
  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const k = todayKey(now - i * DAY);
    last7.push({ date: k, count: log[k] || 0 });
  }
  return { streak, todayCount: log[todayKey(now)] || 0, last7 };
}

export function buildAdaptivePlan(store, glossaryLen, quiz) {
  const now = Date.now();
  const dueCount = Array.from({ length: glossaryLen }, (_, i) => i)
    .filter(i => !store.srs?.[i] || store.srs[i].due <= now).length;
  const missedCount = (store.missed || []).filter(i => i < quiz.length).length;
  const daysLeft = store.exam ? Math.ceil((new Date(store.exam) - now) / DAY) : null;

  const chEntries = Object.entries(store.chStats || {})
    .filter(([, [c, t]]) => t >= 3)
    .map(([k, [c, t]]) => ({ k: +k, pct: Math.round((c / t) * 100) }))
    .sort((a, b) => a.pct - b.pct);
  const weakestCh = chEntries[0];

  const tasks = [];
  if (dueCount > 0) {
    const n = Math.min(dueCount, 12);
    tasks.push({
      id: 'srs',
      title: `Review ${n} due Flashcard${n > 1 ? 's' : ''}`,
      meta: `${dueCount} total in SM-2 queue`,
      href: '#flash',
      cta: 'Study Cards'
    });
  }
  if (missedCount > 0) {
    tasks.push({
      id: 'missed',
      title: `Clear ${Math.min(missedCount, 10)} Missed Question${missedCount > 1 ? 's' : ''}`,
      meta: 'Active recall on past mistakes',
      href: '#quiz',
      action: "startQuiz('missed');go('quiz')",
      cta: 'Drill Missed'
    });
  } else if (weakestCh && weakestCh.pct < 80) {
    tasks.push({
      id: 'weak',
      title: `Boost Ch.${weakestCh.k} Accuracy (${weakestCh.pct}%)`,
      meta: 'Targeted domain drill',
      href: '#quiz',
      action: `practiceChapter(${weakestCh.k})`,
      cta: 'Practise'
    });
  } else {
    tasks.push({
      id: 'scen',
      title: 'Complete 10 Situational Scenarios',
      meta: 'PMP® mindset ("What should the PM do NEXT?")',
      href: '#quiz',
      action: "startQuiz('s');go('quiz')",
      cta: 'Start Drill'
    });
  }

  const doneLabs = store.challenges || {};
  const nextLab = LAB_CHALLENGES.find(c => !doneLabs[c.id]);
  if (nextLab) {
    tasks.push({
      id: 'lab_' + nextLab.id,
      title: `Lab Challenge: ${nextLab.title}`,
      meta: nextLab.labName,
      href: nextLab.href,
      cta: 'Open Lab'
    });
  }

  if (daysLeft !== null && daysLeft <= 14 && daysLeft >= 0) {
    tasks.push({
      id: 'mock',
      title: 'Run ECO-Weighted Mock Exam (40 Q)',
      meta: `${daysLeft} days until exam target`,
      href: '#exam',
      cta: 'Launch Exam'
    });
  }

  return { tasks, daysLeft, dueCount, missedCount };
}

export const LAB_CHALLENGES = [
  {
    id: 'cpm_crash',
    labName: 'CPM Lab',
    href: '#cpm',
    title: 'Compress Software Sprint to ≤ 18 Days',
    prompt: 'Load the "Software Sprint & Release" preset (25 days). Crash or fast-track tasks in the editor so Total Duration is ≤ 18 days without breaking dependencies or creating a cycle.'
  },
  {
    id: 'evm_recover',
    labName: 'EVM Lab',
    href: '#evm',
    title: 'Restore Project to Healthy (CPI ≥ 1.0 & SPI ≥ 1.0)',
    prompt: 'Starting from "Case 4: Critical Delay & Overrun", adjust EV or AC to model a recovery where both CPI ≥ 1.0 and SPI ≥ 1.0.'
  },
  {
    id: 'risk_p80',
    labName: 'Risk Lab',
    href: '#risk',
    title: 'Bring P80 Contingency Reserve Below $50,000',
    prompt: 'Mitigate or remove high-exposure risks in the Risk Register until the 1,000-trial Monte Carlo P80 Contingency Target drops below $50,000.'
  },
  {
    id: 'kanban_flow',
    labName: 'Methods & Kanban',
    href: '#method',
    title: 'Deliver 3 Items to Done Without Violating WIP',
    prompt: 'Use the Kanban Board Simulator to pull work through In Progress (WIP 2) and Testing/QA (WIP 2) until Done has at least 3 items.'
  }
];

export function getEarnedBadges(store, now = Date.now()) {
  const { streak } = getStreakInfo(store, now);
  const totalActions = Object.values(store.activity || {}).reduce((s, v) => s + v, 0);
  const mastered = Object.values(store.srs || {}).filter(c => c.r >= 3).length;
  const solvedLabs = Object.keys(store.challenges || {}).length;
  const totalAnswered = Object.values(store.domStats || {}).reduce((s, x) => s + (x[1] || 0), 0);

  return [
    { id: 'first_step', icon: '🌱', title: 'First Step', desc: 'Log your first study action', earned: totalActions >= 1 },
    { id: 'streak_3', icon: '🔥', title: '3-Day Streak', desc: 'Study 3 consecutive days', earned: streak >= 3 },
    { id: 'card_25', icon: '🃏', title: 'Card Collector', desc: 'Master 25+ SM-2 flashcards', earned: mastered >= 25 },
    { id: 'lab_master', icon: '🧪', title: 'Lab Explorer', desc: 'Solve 3+ interactive lab challenges', earned: solvedLabs >= 3 },
    { id: 'quiz_ace', icon: '🎯', title: 'Quiz Ace', desc: 'Score 80%+ on a full quiz', earned: (store.quizBest || 0) >= 80 },
    { id: 'eco_ready', icon: '🏅', title: 'ECO Grinder', desc: 'Answer 20+ ECO-tagged questions', earned: totalAnswered >= 20 }
  ];
}

export function buildSampleProgress(now = Date.now()) {
  const activity = {};
  [5, 4, 3, 2, 1, 0].forEach((offset, idx) => {
    activity[todayKey(now - offset * DAY)] = [4, 7, 11, 6, 9, 8][idx];
  });
  const srs = {};
  for (let i = 0; i < 18; i++) {
    srs[i] = { r: 3, iv: 6, ef: 2.5, due: now + (i % 5 + 1) * DAY };
  }
  const checks = {};
  for (let i = 0; i < 12; i++) checks['r' + i] = true;

  return {
    isSample: true,
    activity,
    srs,
    checks,
    domStats: { E: [15, 19], P: [16, 22], B: [4, 6] },
    chStats: { 4: [4, 5], 5: [3, 6], 7: [2, 5], 9: [5, 6] },
    missed: [3, 12, 24],
    challenges: { cpm_crash: now - 2 * DAY, evm_recover: now - DAY },
    quizBest: 78,
    exam: todayKey(now + 21 * DAY)
  };
}
