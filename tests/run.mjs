import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

import {
  GLOSSARY, PEOPLE_CASES, PROCESS_MATRIX, PROCESS_DETAILS,
  FIELD_GUIDES, PRINCIPLE_DETAILS, STUDY_RESOURCES, PRINCIPLES
} from '../src/data/knowledge.js';
import { QUIZ } from '../src/data/quiz.js';
import {
  CPM_PRESETS, parseTasks, cpm, calcEVMMetrics, runMonteCarlo,
  calcPert, calcPTA, sm2Rate, sampleECOExam, buildAdaptivePlan,
  getEarnedBadges, buildSampleProgress
} from '../src/engines/pm.js';

test('GLOSSARY has no duplicate terms', () => {
  const seen = new Set();
  for (const [term, def] of GLOSSARY) {
    const norm = term.toLowerCase().replace(/\s*\([^)]*\)/g, '').trim();
    assert.equal(seen.has(norm), false, `Duplicate glossary term: ${term}`);
    seen.add(norm);
    assert.ok(def.length > 10, `Definition too short for ${term}`);
  }
});

test('QUIZ dataset integrity and ECO coverage', () => {
  assert.ok(QUIZ.length >= 180, `Expected >= 180 questions for full PMP mock exam, got ${QUIZ.length}`);
  const situational = QUIZ.filter(q => q.s).length;
  assert.ok(situational >= 40, `Expected >= 40 situational questions, got ${situational}`);
  const multi = QUIZ.filter(q => q.type === 'multi').length;
  const match = QUIZ.filter(q => q.type === 'match').length;
  assert.ok(multi >= 2, 'Expected multi-select questions');
  assert.ok(match >= 2, 'Expected matching questions');

  QUIZ.forEach((q, idx) => {
    assert.ok(['P', 'E', 'B'].includes(q.d), `Invalid domain at Q${idx}`);
    assert.ok(q.q && q.e, `Missing stem or explanation at Q${idx}`);
    if (q.type === 'multi') {
      assert.ok(Array.isArray(q.a) && q.a.length >= 2, `Invalid multi answer at Q${idx}`);
      q.a.forEach(ai => assert.ok(ai >= 0 && ai < q.o.length));
    } else if (q.type === 'match') {
      assert.ok(Array.isArray(q.pairs) && q.pairs.length >= 3, `Invalid match pairs at Q${idx}`);
    } else {
      assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length, `Invalid answer index at Q${idx}`);
    }
  });
});

test('CPM engine forward/backward pass and cycle detection', () => {
  const res = cpm(parseTasks(CPM_PRESETS.software));
  assert.equal(res.error, undefined);
  assert.equal(res.finish, 25);
  assert.equal(res.R.A.TF, 0);
  assert.equal(res.R.D.TF, 0);
  assert.ok(res.R.H.TF > 0);

  const cycleRes = cpm(parseTasks('A | Task A | 2 | B\nB | Task B | 3 | A'));
  assert.ok(cycleRes.error && cycleRes.error.includes('Cycle'));
});

test('EVM, PERT, and PTA calculations', () => {
  const m = calcEVMMetrics(200000, 100000, 80000, 100000);
  assert.equal(m.CV, -20000);
  assert.equal(m.SV, -20000);
  assert.equal(m.CPI, 0.8);
  assert.equal(m.SPI, 0.8);
  assert.equal(m.EACt, 250000);

  const p = calcPert(3, 6, 15);
  assert.equal(p.pert, 7);
  assert.equal(p.sd, 2);

  const pta = calcPTA(100000, 15000, 130000, 75);
  assert.equal(pta.pta, 120000);
});

test('Monte Carlo ordering and SM-2 progression', () => {
  const mc = runMonteCarlo([{ n: 'R1', p: 0.5, c: 10000 }, { n: 'R2', p: 0.4, c: 25000 }], 500);
  assert.ok(mc.p50 <= mc.p80 && mc.p80 <= mc.p95);

  const c1 = sm2Rate(null, 4, 1000);
  assert.equal(c1.r, 1);
  assert.equal(c1.iv, 1);
  const c2 = sm2Rate(c1, 4, 2000);
  assert.equal(c2.r, 2);
  assert.equal(c2.iv, 6);
});

test('ECO exam sampling respects domain weights', () => {
  const picked = sampleECOExam(QUIZ, 180);
  assert.equal(picked.length, 180);
  assert.equal(new Set(picked).size, 180);
  const counts = { E: 0, P: 0, B: 0 };
  picked.forEach(i => counts[QUIZ[i].d]++);
  assert.ok(counts.E >= 70, `Expected People >= 70 (42% of 180 = 76), got ${counts.E}`);
  assert.ok(counts.P >= 85, `Expected Process >= 85 (50% of 180 = 90), got ${counts.P}`);
  assert.ok(counts.B >= 12, `Expected Business >= 12 (8% of 180 = 14), got ${counts.B}`);
});

test('Adaptive study plan produces actionable tasks', () => {
  const plan = buildAdaptivePlan({ srs: {}, missed: [0, 1], chStats: {}, challenges: {}, exam: '' }, GLOSSARY.length, QUIZ);
  assert.ok(plan.tasks.length >= 2);
});

test('Built public/index.html has valid bundled script', () => {
  const html = fs.readFileSync('public/index.html', 'utf8');
  const match = html.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(match, 'Missing inline script in public/index.html');
  assert.doesNotThrow(() => new vm.Script(match[1]), 'Bundled JS has syntax error');
});

test('PEOPLE_CASES, badges, and sample progress integrity', () => {
  assert.ok(PEOPLE_CASES.length >= 4);
  PEOPLE_CASES.forEach(c => {
    assert.ok(c.id && c.title && c.scenario && c.mindset && c.trap);
    assert.ok(Number.isInteger(c.best) && c.best >= 0 && c.best < c.options.length);
  });

  const emptyBadges = getEarnedBadges({});
  assert.equal(emptyBadges.filter(b => b.earned).length, 0);

  const sample = buildSampleProgress();
  assert.equal(sample.isSample, true);
  const sampleBadges = getEarnedBadges(sample);
  assert.ok(sampleBadges.filter(b => b.earned).length >= 2);
});

test('All 49 processes in PROCESS_MATRIX have complete PROCESS_DETAILS', () => {
  const allProcs = PROCESS_MATRIX.flatMap(([, ini, pln, exe, mon, cls]) => [...ini, ...pln, ...exe, ...mon, ...cls]);
  assert.equal(allProcs.length, 49);
  allProcs.forEach(p => {
    const d = PROCESS_DETAILS[p];
    assert.ok(d, `Missing PROCESS_DETAILS for ${p}`);
    assert.ok(d.pg && d.ka && d.ch && d.purpose && d.inputs && d.tools && d.outputs && d.tip, `Incomplete details for ${p}`);
  });
});

test('FIELD_GUIDES, PRINCIPLE_DETAILS, and STUDY_RESOURCES integrity', () => {
  ['cpm', 'evm', 'risk', 'method', 'formulas', 'stake'].forEach(k => {
    const g = FIELD_GUIDES[k];
    assert.ok(g && g.title && g.summary && Array.isArray(g.fields) && g.fields.length >= 4, `Invalid FIELD_GUIDES.${k}`);
  });
  assert.equal(PRINCIPLE_DETAILS.length, PRINCIPLES.length);
  PRINCIPLE_DETAILS.forEach(d => assert.ok(d.app && d.trap));
  assert.ok(STUDY_RESOURCES.length >= 5);
  STUDY_RESOURCES.forEach(r => assert.ok(r.title && r.org && r.url.startsWith('https://') && r.desc));
});

test('Built public/index.html meets accessibility and PWA standards', () => {
  const html = fs.readFileSync('public/index.html', 'utf8');
  // Modals have proper dialog semantics
  assert.ok(html.includes('id="inspector-modal" class="modal-backdrop" role="dialog" aria-modal="true"'));
  assert.ok(html.includes('id="onboard-modal" class="modal-backdrop" role="dialog" aria-modal="true"'));
  assert.ok(html.includes('id="legal-modal" class="modal-backdrop" role="dialog" aria-modal="true"'));
  // Header cert-badge is a button, not nested inside <a>
  assert.ok(html.includes('<button type="button" id="cert-badge"'));
  // Icon buttons have aria-label
  assert.ok(html.includes('id="installBtn" onclick="installPWA()" title="Install App" aria-label="Install App"'));
  assert.ok(html.includes('id="snd" onclick="toggleSound()" title="Toggle Sound" aria-label="Toggle Sound"'));
  assert.ok(html.includes('id="theme" onclick="toggleTheme()" title="Switch Theme" aria-label="Switch Theme"'));
  // SW update prompt is wired
  assert.ok(html.includes('Update available'));
});
