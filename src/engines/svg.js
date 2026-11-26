import { DOMAINS, PROCESS_GROUPS } from '../data/knowledge.js';

export const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const money = x => (isFinite(x) ? x : 0).toLocaleString(undefined, { maximumFractionDigits: 0 });

/* ============ Visual Icons & Visual Generators ============ */
export const ICONS = {
  steward: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',
  team: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  stake: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
  value: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 2 18 2 22 8 12 22 2 8 6 2"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="12" y1="22" x2="18" y2="8"/><line x1="12" y1="22" x2="6" y2="8"/></svg>',
  systems: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  lead: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
  tailor: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>',
  quality: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  complex: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  risk: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  adapt: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
  change: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>'
};

export const PRINCIPLE_ICONS = [
  ICONS.steward, ICONS.team, ICONS.stake, ICONS.value,
  ICONS.systems, ICONS.lead, ICONS.tailor, ICONS.quality,
  ICONS.complex, ICONS.risk, ICONS.adapt, ICONS.change
];

export function generateDomainSynergyMapSVG() {
  const w = 580, h = 330;
  const cx = w / 2, cy = h / 2, r = 115;
  let nodesSvg = '';
  let linesSvg = '';

  DOMAINS.forEach(([name, desc], i) => {
    const angle = (i * 2 * Math.PI) / DOMAINS.length - Math.PI / 2;
    const nx = cx + r * Math.cos(angle);
    const ny = cy + r * Math.sin(angle);

    linesSvg += `<line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="var(--b)" stroke-width="1.5" stroke-dasharray="3,3" />`;
    nodesSvg += `
      <g style="cursor:pointer" onclick="window.showInspector && window.showInspector('${esc(name)}', '<p style=&quot;margin:0&quot;>${esc(desc)}</p>')">
        <circle cx="${nx}" cy="${ny}" r="20" fill="var(--s)" stroke="var(--a)" stroke-width="2" />
        <text x="${nx}" y="${ny + 4}" font-size="10" font-weight="700" fill="var(--a)" text-anchor="middle">${i + 1}</text>
        <text x="${nx}" y="${ny > cy ? ny + 26 : ny - 22}" font-size="10" font-weight="600" fill="var(--t)" text-anchor="middle">${esc(name.split(' ')[0])}</text>
      </g>
    `;
  });

  return `
    <div style="text-align:center;margin:12px 0">
      <svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" style="max-width:580px;background:var(--bg);border-radius:12px;border:1px solid var(--b)">
        <defs>
          <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="var(--a)" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="var(--a)" stop-opacity="0.02"/>
          </radialGradient>
        </defs>
        <circle cx="${cx}" cy="${cy}" r="${r + 15}" fill="none" stroke="var(--b)" stroke-width="1" stroke-dasharray="4,4" />
        <circle cx="${cx}" cy="${cy}" r="42" fill="url(#hubGrad)" stroke="var(--a)" stroke-width="2.5" />
        <text x="${cx}" y="${cy - 5}" font-size="12" font-weight="800" fill="var(--a)" text-anchor="middle">VALUE</text>
        <text x="${cx}" y="${cy + 12}" font-size="11" font-weight="600" fill="var(--t)" text-anchor="middle">DELIVERY</text>
        ${linesSvg}
        ${nodesSvg}
      </svg>
    </div>
  `;
}

export function generateProcessPipelineSVG(activeGroup) {
  const w = 780, h = 95;
  const groups = PROCESS_GROUPS.map((g, i) => ({ name: g[0], count: g[2].length, i }));
  const boxW = 135, boxH = 50, gap = 20, startX = 15, y = 18;
  let svg = '';

  groups.forEach((g, idx) => {
    const x = startX + idx * (boxW + gap);
    const isSel = (activeGroup === 'all' || activeGroup === g.name);
    const fill = isSel ? 'var(--a)' : 'var(--s)';
    const textCol = isSel ? '#ffffff' : 'var(--t)';
    const stroke = isSel ? 'var(--a)' : 'var(--b)';

    svg += `
      <g style="cursor:pointer" onclick="setProcessGroup('${esc(g.name)}')">
        <rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2" />
        <text x="${x + boxW/2}" y="${y + 22}" font-size="12" font-weight="700" fill="${textCol}" text-anchor="middle">${esc(g.name.split(' ')[0])}</text>
        <text x="${x + boxW/2}" y="${y + 38}" font-size="10" fill="${textCol}" opacity="0.85" text-anchor="middle">${g.count} processes</text>
      </g>
    `;

    if (idx < groups.length - 1) {
      const arrX = x + boxW + 4;
      svg += `
        <path d="M ${arrX} ${y + boxH/2} L ${arrX + 10} ${y + boxH/2}" stroke="var(--m)" stroke-width="2" marker-end="url(#arr-m)" />
      `;
    }
  });

  const planX = startX + 1 * (boxW + gap) + boxW/2;
  const monX = startX + 3 * (boxW + gap) + boxW/2;
  svg += `
    <path d="M ${monX} ${y + boxH} C ${monX} ${y + boxH + 20}, ${planX} ${y + boxH + 20}, ${planX} ${y + boxH + 4}" fill="none" stroke="var(--a)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arr-a)" />
    <text x="${(planX + monX) / 2}" y="${y + boxH + 19}" font-size="9" font-weight="600" fill="var(--a)" text-anchor="middle">Iterative Feedback Loop</text>
  `;

  return `
    <div class="svg-scroll-container">
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <defs>
          <marker id="arr-m" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="var(--m)"/>
          </marker>
          <marker id="arr-a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="var(--a)"/>
          </marker>
        </defs>
        ${svg}
      </svg>
    </div>
  `;
}

function setProcessGroup(g) {
  store.procFilter = (store.procFilter === g) ? 'all' : g;
  save(); playSound('click'); render();
}

export function generateStaceyMatrixSVG(rec) {
  const w = 480, h = 250;
  const padL = 60, padR = 30, padT = 25, padB = 40;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  let pinX = padL + 60, pinY = padT + plotH - 40;
  if (rec.includes('Predictive')) { pinX = padL + 50; pinY = padT + plotH - 35; }
  else if (rec.includes('Agile')) { pinX = padL + plotW - 70; pinY = padT + 50; }
  else if (rec.includes('Iterative')) { pinX = padL + plotW/2; pinY = padT + plotH/2; }
  else { pinX = padL + plotW/2 - 10; pinY = padT + plotH/2 + 20; }

  return `
    <div style="text-align:center;margin:12px 0">
      <svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" style="max-width:500px;background:var(--s);border-radius:12px;border:1px solid var(--b)">
        <rect x="${padL}" y="${padT + plotH/2}" width="${plotW/2}" height="${plotH/2}" fill="rgba(16, 185, 129, 0.12)" />
        <rect x="${padL + plotW/2}" y="${padT + plotH/2}" width="${plotW/2}" height="${plotH/2}" fill="rgba(245, 158, 11, 0.1)" />
        <rect x="${padL}" y="${padT}" width="${plotW/2}" height="${plotH/2}" fill="rgba(245, 158, 11, 0.1)" />
        <rect x="${padL + plotW/2}" y="${padT}" width="${plotW/2}" height="${plotH/2}" fill="rgba(59, 130, 246, 0.15)" />

        <text x="${padL + 15}" y="${padT + plotH - 15}" font-size="11" font-weight="700" fill="var(--ok)">SIMPLE (Waterfall)</text>
        <text x="${padL + plotW/2 + 15}" y="${padT + plotH - 15}" font-size="11" font-weight="700" fill="var(--warn)">COMPLICATED</text>
        <text x="${padL + 15}" y="${padT + 30}" font-size="11" font-weight="700" fill="var(--warn)">COMPLICATED</text>
        <text x="${padL + plotW/2 + 15}" y="${padT + 30}" font-size="11" font-weight="700" fill="var(--a)">COMPLEX (Agile / Scrum)</text>

        <line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="var(--m)" stroke-width="1.5" />
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="var(--m)" stroke-width="1.5" />
        <text x="${padL + plotW/2}" y="${h - 10}" font-size="11" font-weight="600" fill="var(--m)" text-anchor="middle">How (Technical Uncertainty →)</text>
        <text transform="rotate(-90)" x="${-(padT + plotH/2)}" y="20" font-size="11" font-weight="600" fill="var(--m)" text-anchor="middle">What (Requirements Uncertainty →)</text>

        <g style="transition:all 0.4s ease">
          <circle cx="${pinX}" cy="${pinY}" r="8" fill="var(--crit)" stroke="#fff" stroke-width="2"/>
          <text x="${pinX}" y="${pinY - 12}" font-size="11" font-weight="800" fill="var(--crit)" text-anchor="middle">Target Position</text>
        </g>
      </svg>
    </div>
  `;
}

export function generateScrumFlowSVG() {
  const w = 740, h = 180;
  return `
    <div class="svg-scroll-container" style="margin:12px 0">
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <defs>
          <marker id="scrum-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="var(--a)" />
          </marker>
        </defs>

        <rect x="10" y="45" width="105" height="70" rx="8" fill="var(--s)" stroke="var(--b)" stroke-width="1.5"/>
        <text x="62" y="75" font-size="11" font-weight="700" fill="var(--t)" text-anchor="middle">Product Backlog</text>
        <text x="62" y="95" font-size="9" fill="var(--m)" text-anchor="middle">Prioritized by PO</text>

        <path d="M115 80 L145 80" stroke="var(--a)" stroke-width="2" marker-end="url(#scrum-arr)"/>

        <rect x="150" y="45" width="105" height="70" rx="8" fill="var(--s)" stroke="var(--b)" stroke-width="1.5"/>
        <text x="202" y="75" font-size="11" font-weight="700" fill="var(--t)" text-anchor="middle">Sprint Planning</text>
        <text x="202" y="95" font-size="9" fill="var(--m)" text-anchor="middle">Team estimates</text>

        <path d="M255 80 L285 80" stroke="var(--a)" stroke-width="2" marker-end="url(#scrum-arr)"/>

        <rect x="290" y="45" width="105" height="70" rx="8" fill="var(--s)" stroke="var(--b)" stroke-width="1.5"/>
        <text x="342" y="75" font-size="11" font-weight="700" fill="var(--t)" text-anchor="middle">Sprint Backlog</text>
        <text x="342" y="95" font-size="9" fill="var(--m)" text-anchor="middle">Committed tasks</text>

        <path d="M395 80 L425 80" stroke="var(--a)" stroke-width="2" marker-end="url(#scrum-arr)"/>

        <circle cx="485" cy="80" r="45" fill="var(--hi)" stroke="var(--a)" stroke-width="2"/>
        <text x="485" y="75" font-size="11" font-weight="700" fill="var(--a)" text-anchor="middle">1–4 Week Sprint</text>
        <text x="485" y="92" font-size="9" font-weight="600" fill="var(--t)" text-anchor="middle">Daily Scrum (15m)</text>

        <path d="M530 80 L560 80" stroke="var(--a)" stroke-width="2" marker-end="url(#scrum-arr)"/>

        <rect x="565" y="45" width="110" height="70" rx="8" fill="var(--hi-crit)" stroke="var(--ok)" stroke-width="1.5"/>
        <text x="620" y="75" font-size="11" font-weight="700" fill="var(--ok)" text-anchor="middle">Increment (DoD)</text>
        <text x="620" y="95" font-size="9" fill="var(--m)" text-anchor="middle">Review & Retro</text>

        <path d="M 620 45 C 620 15, 62 15, 62 40" fill="none" stroke="var(--m)" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#scrum-arr)"/>
        <text x="340" y="20" font-size="9" font-weight="600" fill="var(--m)" text-anchor="middle">Continuous Inspection & Adaptation</text>
      </svg>
    </div>
  `;
}

export function generateSCurveSVG(BAC, PV, EV, AC, EACt) {
  const w = 540, h = 260;
  const padL = 65, padR = 40, padT = 30, padB = 40;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  const maxVal = Math.max(BAC, PV, EV, AC, EACt, 1) * 1.15;
  const mapY = val => padT + plotH - (val / maxVal) * plotH;
  const mapX = pct => padL + (pct / 100) * plotW;

  const curX = mapX(50);
  const pvY = mapY(PV);
  const evY = mapY(EV);
  const acY = mapY(AC);
  const bacY = mapY(BAC);
  const eacY = mapY(EACt);

  const pvPath = `M ${padL} ${mapY(0)} C ${mapX(25)} ${mapY(PV*0.35)}, ${mapX(35)} ${mapY(PV*0.75)}, ${curX} ${pvY} S ${mapX(80)} ${mapY(BAC*0.9)}, ${mapX(100)} ${bacY}`;
  const evPath = `M ${padL} ${mapY(0)} C ${mapX(25)} ${mapY(EV*0.4)}, ${mapX(40)} ${mapY(EV*0.8)}, ${curX} ${evY}`;
  const acPath = `M ${padL} ${mapY(0)} C ${mapX(25)} ${mapY(AC*0.45)}, ${mapX(40)} ${mapY(AC*0.85)}, ${curX} ${acY}`;

  return `
    <div style="text-align:center;margin:12px 0">
      <svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" style="max-width:540px;background:var(--s);border-radius:12px;border:1px solid var(--b)">
        <line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="var(--m)" stroke-width="1.5" />
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="var(--m)" stroke-width="1.5" />
        <line x1="${curX}" y1="${padT}" x2="${curX}" y2="${padT + plotH}" stroke="var(--b)" stroke-width="1.5" stroke-dasharray="3,3" />
        <text x="${curX}" y="${padT - 8}" font-size="10" font-weight="700" fill="var(--a)" text-anchor="middle">CURRENT STATUS DATE</text>

        <path d="${pvPath}" fill="none" stroke="var(--m)" stroke-width="2" stroke-dasharray="4,4" />
        <path d="${acPath}" fill="none" stroke="${AC > EV ? 'var(--bad)' : 'var(--ok)'}" stroke-width="2.5" />
        <path d="${evPath}" fill="none" stroke="var(--a)" stroke-width="2.5" />

        <line x1="${curX}" y1="${evY}" x2="${mapX(100)}" y2="${eacY}" stroke="var(--a)" stroke-width="2" stroke-dasharray="2,2" />

        <circle cx="${curX}" cy="${pvY}" r="4" fill="var(--m)" />
        <circle cx="${curX}" cy="${evY}" r="5" fill="var(--a)" />
        <circle cx="${curX}" cy="${acY}" r="5" fill="${AC > EV ? 'var(--bad)' : 'var(--ok)'}" />
        <circle cx="${mapX(100)}" cy="${bacY}" r="4" fill="var(--t)" />
        <circle cx="${mapX(100)}" cy="${eacY}" r="4" fill="var(--crit)" />

        <text x="${padL - 8}" y="${bacY + 4}" font-size="9" font-weight="600" fill="var(--m)" text-anchor="end">BAC</text>
        <text x="${mapX(100) + 6}" y="${bacY + 4}" font-size="9" fill="var(--m)">BAC ${money(BAC)}</text>
        <text x="${mapX(100) + 6}" y="${eacY + 4}" font-size="9" font-weight="700" fill="var(--crit)">EAC ${money(EACt)}</text>

        <text x="${curX + 8}" y="${(evY + acY) / 2}" font-size="9" font-weight="700" fill="${EV - AC < 0 ? 'var(--bad)' : 'var(--ok)'}">CV: ${money(EV - AC)}</text>
        <text x="${curX + 8}" y="${(evY + pvY) / 2 + 10}" font-size="9" font-weight="700" fill="${EV - PV < 0 ? 'var(--bad)' : 'var(--ok)'}">SV: ${money(EV - PV)}</text>

        <text x="${padL + plotW/2}" y="${h - 10}" font-size="11" font-weight="600" fill="var(--m)" text-anchor="middle">Project Timeline (Start → Finish)</text>
      </svg>
      <div class="row" style="justify-content:center;font-size:11px;margin-top:4px;gap:16px">
        <span style="color:var(--m)">-- Planned Value (PV)</span>
        <span style="color:var(--a);font-weight:600">━ Earned Value (EV)</span>
        <span style="color:${AC > EV ? 'var(--bad)' : 'var(--ok)'};font-weight:600">━ Actual Cost (AC)</span>
        <span style="color:var(--crit);font-weight:600">·· Forecast (EAC)</span>
      </div>
    </div>
  `;
}

export function generateRadialGaugesSVG(cpi, spi) {
  const renderGauge = (val, title, label) => {
    const isOk = val >= 1.0;
    const col = isOk ? 'var(--ok)' : 'var(--bad)';
    const clamped = Math.max(0.5, Math.min(1.5, val));
    const deg = ((clamped - 0.5) / 1.0) * 240 - 120;
    const rad = (deg - 90) * (Math.PI / 180);
    const cx = 80, cy = 65, r = 48;
    const nx = cx + (r - 10) * Math.cos(rad);
    const ny = cy + (r - 10) * Math.sin(rad);

    return `
      <g>
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--b)" stroke-width="10" stroke-dasharray="160 80" transform="rotate(-150 ${cx} ${cy})"/>
        <line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="${col}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="${cx}" cy="${cy}" r="5" fill="var(--t)"/>
        <text x="${cx}" y="${cy + 22}" font-size="14" font-weight="800" fill="${col}" text-anchor="middle">${val.toFixed(2)}</text>
        <text x="${cx}" y="${cy + 36}" font-size="10" font-weight="600" fill="var(--m)" text-anchor="middle">${title}</text>
        <text x="${cx}" y="${cy + 48}" font-size="9" fill="${col}" text-anchor="middle">${label}</text>
      </g>
    `;
  };

  return `
    <div style="text-align:center;margin:12px 0">
      <svg width="340" height="135" viewBox="0 0 340 135" style="background:var(--s);border-radius:12px;border:1px solid var(--b)">
        <g transform="translate(10, 0)">
          ${renderGauge(cpi, 'CPI (Cost)', cpi >= 1 ? 'Under/On Budget' : 'Cost Overrun')}
        </g>
        <g transform="translate(180, 0)">
          ${renderGauge(spi, 'SPI (Schedule)', spi >= 1 ? 'Ahead/On Plan' : 'Schedule Delay')}
        </g>
      </svg>
    </div>
  `;
}

/* ============ Monte Carlo Simulation Engine & SVG ============ */

export function generateMonteCarloSVG(mc) {
  const w = 540, h = 230;
  const padL = 50, padR = 30, padT = 25, padB = 45;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  const maxFreq = Math.max(...mc.buckets, 1);
  const barW = plotW / mc.buckets.length;

  let barsSvg = '';
  mc.buckets.forEach((count, i) => {
    const barH = (count / maxFreq) * plotH;
    const x = padL + i * barW;
    const y = padT + plotH - barH;
    barsSvg += `<rect x="${x + 2}" y="${y}" width="${barW - 4}" height="${barH}" rx="3" fill="var(--a)" opacity="0.75" />`;
  });

  // P50 line and P80 line
  const minV = Number.isFinite(mc.minVal) ? mc.minVal : 0;
  const maxV = Number.isFinite(mc.maxVal) ? mc.maxVal : minV + 1;
  const span = maxV - minV || 1;
  const p50Val = Number.isFinite(mc.p50) ? mc.p50 : minV;
  const p80Val = Number.isFinite(mc.p80) ? mc.p80 : minV;
  const p50X = padL + Math.min(plotW, Math.max(0, ((p50Val - minV) / span) * plotW));
  const p80X = padL + Math.min(plotW, Math.max(0, ((p80Val - minV) / span) * plotW));

  return `
    <div style="text-align:center;margin:12px 0">
      <svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" style="max-width:540px;background:var(--s);border-radius:12px;border:1px solid var(--b)">
        <line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="var(--m)" stroke-width="1.5" />
        ${barsSvg}

        <!-- P50 Median Line -->
        <line x1="${p50X}" y1="${padT}" x2="${p50X}" y2="${padT + plotH}" stroke="var(--m)" stroke-width="2" stroke-dasharray="3,3" />
        <text x="${p50X}" y="${padT - 8}" font-size="10" font-weight="700" fill="var(--m)" text-anchor="middle">P50: ${money(mc.p50)}</text>

        <!-- P80 Contingency Line -->
        <line x1="${p80X}" y1="${padT}" x2="${p80X}" y2="${padT + plotH}" stroke="var(--crit)" stroke-width="2.5" />
        <text x="${p80X}" y="${padT - 8}" font-size="10" font-weight="800" fill="var(--crit)" text-anchor="middle">P80: ${money(mc.p80)}</text>

        <text x="${padL + plotW/2}" y="${h - 10}" font-size="11" font-weight="600" fill="var(--m)" text-anchor="middle">Simulated Financial Loss ($) Across 1,000 Trials →</text>
        <text x="${padL}" y="${padT + plotH + 16}" font-size="9" fill="var(--m)">${money(mc.minVal)}</text>
        <text x="${padL + plotW}" y="${padT + plotH + 16}" font-size="9" fill="var(--m)" text-anchor="end">${money(mc.maxVal)}</text>
      </svg>
    </div>
  `;
}

export function generateRiskHeatmapSVG(risksList) {
  const w = 520, h = 330;
  const padL = 75, padR = 25, padT = 30, padB = 45;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  const cellW = plotW / 5;
  const cellH = plotH / 5;

  const pLabels = ['Very High (0.8+)', 'High (0.6)', 'Med (0.4)', 'Low (0.2)', 'Very Low (0.1)'];
  const iLabels = ['<15k', '15-30k', '30-50k', '50-75k', '>75k'];

  const matrixColors = [
    ['#fed7aa', '#fecaca', '#fca5a5', '#f87171', '#ef4444'],
    ['#fef08a', '#fed7aa', '#fecaca', '#fca5a5', '#f87171'],
    ['#fef9c3', '#fef08a', '#fed7aa', '#fecaca', '#fca5a5'],
    ['#dcfce7', '#fef9c3', '#fef08a', '#fed7aa', '#fecaca'],
    ['#dcfce7', '#dcfce7', '#fef9c3', '#fef08a', '#fed7aa']
  ];

  let cellsSvg = '';
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const x = padL + c * cellW;
      const y = padT + r * cellH;
      cellsSvg += `<rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" fill="${matrixColors[r][c]}" opacity="0.6" stroke="#ffffff" stroke-width="1.5" />`;
    }
  }

  let labelsSvg = '';
  pLabels.forEach((pl, r) => {
    labelsSvg += `<text x="${padL - 8}" y="${padT + r * cellH + cellH/2 + 4}" font-size="9" font-weight="600" fill="var(--m)" text-anchor="end">${pl}</text>`;
  });
  iLabels.forEach((il, c) => {
    labelsSvg += `<text x="${padL + c * cellW + cellW/2}" y="${padT + plotH + 16}" font-size="10" font-weight="600" fill="var(--m)" text-anchor="middle">${il}</text>`;
  });

  let dotsSvg = '';
  risksList.forEach((rk, i) => {
    let colIdx = 0;
    if (rk.c >= 75000) colIdx = 4;
    else if (rk.c >= 50000) colIdx = 3;
    else if (rk.c >= 30000) colIdx = 2;
    else if (rk.c >= 15000) colIdx = 1;

    let rowIdx = 4;
    if (rk.p >= 0.7) rowIdx = 0;
    else if (rk.p >= 0.5) rowIdx = 1;
    else if (rk.p >= 0.3) rowIdx = 2;
    else if (rk.p >= 0.15) rowIdx = 3;

    const cx = padL + colIdx * cellW + cellW/2 + ((i % 3) - 1) * 8;
    const cy = padT + rowIdx * cellH + cellH/2 + ((i % 2) - 0.5) * 8;

    dotsSvg += `
      <g style="cursor:pointer" onclick="window.showInspector && window.showInspector('Details', '${esc(rk.n)}\nProbability: ${Math.round(rk.p*100)}%\nImpact: $${money(rk.c)}\nEMV: $${money(rk.p*rk.c)}')">
        <circle cx="${cx}" cy="${cy}" r="11" fill="var(--s)" stroke="var(--t)" stroke-width="2"/>
        <text x="${cx}" y="${cy + 4}" font-size="10" font-weight="800" fill="var(--t)" text-anchor="middle">R${i + 1}</text>
      </g>
    `;
  });

  return `
    <div style="text-align:center;margin:12px 0">
      <svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" style="max-width:520px;background:var(--s);border-radius:12px;border:1px solid var(--b)">
        ${cellsSvg}
        ${labelsSvg}
        ${dotsSvg}
        <text x="${padL + plotW/2}" y="${h - 8}" font-size="11" font-weight="700" fill="var(--m)" text-anchor="middle">Financial Cost Impact ($) →</text>
        <text transform="rotate(-90)" x="${-(padT + plotH/2)}" y="16" font-size="11" font-weight="700" fill="var(--m)" text-anchor="middle">Probability (0 to 1) →</text>
      </svg>
    </div>
  `;
}

export function generateRoadmapSVG() {
  const w = 780, h = 130;
  const parts = [
    { name: "Part I", chs: [1, 2, 3], col: "var(--a)" },
    { name: "Part II", chs: [4, 5, 6, 7, 8], col: "var(--ok)" },
    { name: "Part III", chs: [9, 10, 11], col: "var(--warn)" },
    { name: "Part IV", chs: [12, 13, 14], col: "#8b5cf6" },
    { name: "Part V", chs: [15], col: "var(--crit)" }
  ];

  let svg = `<path d="M 30 65 L 750 65" stroke="var(--b)" stroke-width="8" stroke-linecap="round" />`;
  let curX = 35;
  parts.forEach(p => {
    const step = 44;
    p.chs.forEach(ch => {
      const cx = curX;
      curX += step;
      svg += `
        <g style="cursor:pointer" onclick="practiceChapter(${ch})">
          <circle cx="${cx}" cy="65" r="14" fill="var(--s)" stroke="${p.col}" stroke-width="3" />
          <text x="${cx}" y="69" font-size="10" font-weight="800" fill="var(--t)" text-anchor="middle">${ch}</text>
          <text x="${cx}" y="${ch % 2 === 0 ? 40 : 96}" font-size="9" font-weight="600" fill="var(--m)" text-anchor="middle">Ch.${ch}</text>
        </g>
      `;
    });
    curX += 14;
  });

  return `
    <div class="svg-scroll-container" style="margin:12px 0">
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        ${svg}
      </svg>
    </div>
  `;
}

export function generateCPMGraphSVG(res) {
  const { order, R, by } = res;
  if (!order || !order.length) return '';

  const rank = {};
  order.forEach(id => rank[id] = 0);
  for (let iter = 0; iter < order.length; iter++) {
    order.forEach(id => {
      by[id].preds.forEach(p => {
        if (rank[p] !== undefined) rank[id] = Math.max(rank[id], rank[p] + 1);
      });
    });
  }

  const cols = {};
  order.forEach(id => {
    const c = rank[id];
    cols[c] = cols[c] || [];
    cols[c].push(id);
  });

  const numCols = Math.max(...Object.keys(cols).map(Number)) + 1;
  const colWidth = 200, colGap = 70, cardWidth = 190, cardHeight = 90, rowGap = 35;
  const maxRows = Math.max(...Object.values(cols).map(c => c.length));
  const svgWidth = Math.max(800, numCols * (colWidth + colGap) + 40);
  const svgHeight = Math.max(340, maxRows * (cardHeight + rowGap) + 60);

  const pos = {};
  Object.entries(cols).forEach(([colIdx, ids]) => {
    const c = +colIdx;
    const x = 30 + c * (colWidth + colGap);
    const colTotalHeight = ids.length * cardHeight + (ids.length - 1) * rowGap;
    const startY = (svgHeight - colTotalHeight) / 2;
    ids.forEach((id, rowIdx) => {
      pos[id] = { x, y: startY + rowIdx * (cardHeight + rowGap) };
    });
  });

  let edgesSvg = '';
  order.forEach(succId => {
    const succP = pos[succId];
    by[succId].preds.forEach(predId => {
      if (!pos[predId]) return;
      const predP = pos[predId];
      const x1 = predP.x + cardWidth;
      const y1 = predP.y + cardHeight / 2;
      const x2 = succP.x;
      const y2 = succP.y + cardHeight / 2;
      const midX = (x1 + x2) / 2;

      const isCrit = (R[predId].TF === 0 && R[succId].TF === 0 && R[predId].EF === R[succId].ES);
      const stroke = isCrit ? 'var(--crit)' : 'var(--m)';
      const strokeWidth = isCrit ? '3' : '1.5';
      const marker = isCrit ? 'url(#arrow-crit)' : 'url(#arrow)';

      edgesSvg += `<path d="M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2 - 4} ${y2}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" marker-end="${marker}" />`;
    });
  });

  let nodesSvg = '';
  order.forEach(id => {
    const p = pos[id];
    const r = R[id];
    const t = by[id];
    const isCrit = r.TF === 0;
    const stroke = isCrit ? 'var(--crit)' : 'var(--b)';
    const strokeWidth = isCrit ? '2.5' : '1';
    const bgFill = isCrit ? 'var(--hi-crit)' : 'var(--s)';
    const tfText = isCrit ? 'CRITICAL (TF=0)' : ('Float: ' + r.TF);
    const tfColor = isCrit ? 'var(--crit)' : 'var(--m)';

    nodesSvg += `
      <g transform="translate(${p.x}, ${p.y})" style="cursor:pointer" onclick="alert('Task: ${esc(t.name)} (ID: ${esc(id)})\nDuration: ${t.dur} days\nEarly Start: ${r.ES} | Early Finish: ${r.EF}\nLate Start: ${r.LS} | Late Finish: ${r.LF}\nTotal Float: ${r.TF} days ${isCrit ? '(ON CRITICAL PATH)' : ''}')">
        <rect width="${cardWidth}" height="${cardHeight}" rx="8" fill="${bgFill}" stroke="${stroke}" stroke-width="${strokeWidth}" />
        <rect x="0" y="0" width="${cardWidth}" height="24" rx="8" fill="var(--bg)" opacity="0.8" />
        <text x="10" y="16" font-size="11" font-weight="600" fill="var(--m)">ES: ${r.ES}</text>
        <text x="${cardWidth - 10}" y="16" text-anchor="end" font-size="11" font-weight="600" fill="var(--m)">EF: ${r.EF}</text>
        <line x1="0" y1="24" x2="${cardWidth}" y2="24" stroke="var(--b)" stroke-width="1" />
        
        <text x="10" y="44" font-size="13" font-weight="700" fill="var(--t)">${esc(id)}: ${esc(t.name.slice(0, 16))}</text>
        <text x="10" y="60" font-size="11" fill="var(--m)">Dur: ${t.dur} d</text>
        
        <line x1="0" y1="68" x2="${cardWidth}" y2="68" stroke="var(--b)" stroke-width="1" />
        <text x="10" y="82" font-size="11" fill="var(--m)">LS: ${r.LS}</text>
        <text x="65" y="82" font-size="11" fill="var(--m)">LF: ${r.LF}</text>
        <text x="${cardWidth - 10}" y="82" text-anchor="end" font-size="10" font-weight="700" fill="${tfColor}">${tfText}</text>
      </g>
    `;
  });

  return `
    <div class="svg-scroll-container">
      <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="var(--m)" />
          </marker>
          <marker id="arrow-crit" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="var(--crit)" />
          </marker>
        </defs>
        ${edgesSvg}
        ${nodesSvg}
      </svg>
    </div>
  `;
}

export function generateCPMGanttSVG(res) {
  const { order, R, by, finish } = res;
  if (!order || !order.length || finish <= 0) return '';
  const rowHeight = 36, labelWidth = 180, chartWidth = 580;
  const svgWidth = labelWidth + chartWidth + 40;
  const svgHeight = 40 + order.length * rowHeight;
  const scale = chartWidth / finish;

  let gridSvg = '';
  const step = finish <= 15 ? 1 : finish <= 30 ? 2 : 5;
  for (let t = 0; t <= finish; t += step) {
    const x = labelWidth + t * scale;
    gridSvg += `<line x1="${x}" y1="24" x2="${x}" y2="${svgHeight}" stroke="var(--b)" stroke-dasharray="2,2" />`;
    gridSvg += `<text x="${x}" y="18" font-size="10" fill="var(--m)" text-anchor="middle">${t}d</text>`;
  }

  let barsSvg = '';
  order.forEach((id, i) => {
    const y = 32 + i * rowHeight;
    const r = R[id];
    const t = by[id];
    const isCrit = r.TF === 0;
    const barX = labelWidth + r.ES * scale;
    const barW = Math.max(4, t.dur * scale);
    const floatW = r.TF * scale;
    const barFill = isCrit ? 'var(--crit)' : 'var(--a)';

    barsSvg += `<text x="10" y="${y + 16}" font-size="12" font-weight="${isCrit ? '700' : '400'}" fill="var(--t)">${esc(id)}: ${esc(t.name.slice(0, 20))}</text>`;
    barsSvg += `<rect x="${barX}" y="${y + 4}" width="${barW}" height="18" rx="4" fill="${barFill}" />`;
    barsSvg += `<text x="${barX + barW / 2}" y="${y + 17}" font-size="10" font-weight="600" fill="#fff" text-anchor="middle">${t.dur}d</text>`;

    if (r.TF > 0) {
      barsSvg += `<rect x="${barX + barW}" y="${y + 9}" width="${floatW}" height="8" rx="2" fill="var(--b)" stroke="var(--m)" stroke-width="0.5" stroke-dasharray="2,2" />`;
      barsSvg += `<text x="${barX + barW + floatW / 2}" y="${y + 16}" font-size="9" fill="var(--m)" text-anchor="middle">+${r.TF}</text>`;
    }
  });

  return `
    <div class="svg-scroll-container">
      <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
        ${gridSvg}
        ${barsSvg}
      </svg>
    </div>
  `;
}

export function quadrant(pw, inf) {
  if (pw >= 3 && inf >= 3) return ["Manage closely", "Partner on decisions; frequent, tailored engagement.", "var(--ok)"];
  if (pw >= 3) return ["Keep satisfied", "Consult on key decisions; avoid surprises; light, targeted updates.", "var(--a)"];
  if (inf >= 3) return ["Keep informed", "Regular updates; capture feedback; involve in reviews.", "var(--warn)"];
  return ["Monitor", "Minimal effort; check periodically for change in power or interest.", "var(--m)"];
}

export function generateStakeMatrixSVG() {
  const list = stakes();
  const width = 500, height = 340;
  const padL = 60, padR = 40, padT = 30, padB = 50;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const midX = padL + plotW / 2;
  const midY = padT + plotH / 2;

  const mapX = val => padL + ((val - 1) / 4) * plotW;
  const mapY = val => padT + ((5 - val) / 4) * plotH;

  let bubblesSvg = '';
  list.forEach((s, idx) => {
    const cx = mapX(s.in);
    const cy = mapY(s.pw);
    const color = quadrant(s.pw, s.in)[2];
    bubblesSvg += `
      <g style="transition: all 0.3s ease;">
        <circle cx="${cx}" cy="${cy}" r="12" fill="${color}" opacity="0.85" stroke="#fff" stroke-width="2" />
        <text x="${cx}" y="${cy + 4}" font-size="10" font-weight="bold" fill="#fff" text-anchor="middle">${idx + 1}</text>
        <text x="${cx}" y="${cy - 16}" font-size="11" font-weight="600" fill="var(--t)" text-anchor="middle">${esc(s.n)}</text>
      </g>
    `;
  });

  return `
    <div style="text-align: center; margin: 12px 0;">
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="max-width: 500px; background: var(--s); border-radius: 12px; border: 1px solid var(--b);">
        <rect x="${padL}" y="${padT}" width="${plotW/2}" height="${plotH/2}" fill="rgba(59, 130, 246, 0.05)" />
        <rect x="${midX}" y="${padT}" width="${plotW/2}" height="${plotH/2}" fill="rgba(16, 185, 129, 0.08)" />
        <rect x="${padL}" y="${midY}" width="${plotW/2}" height="${plotH/2}" fill="rgba(100, 116, 139, 0.05)" />
        <rect x="${midX}" y="${midY}" width="${plotW/2}" height="${plotH/2}" fill="rgba(245, 158, 11, 0.08)" />

        <text x="${padL + 10}" y="${padT + 20}" font-size="11" font-weight="700" fill="var(--a)">KEEP SATISFIED</text>
        <text x="${midX + 10}" y="${padT + 20}" font-size="11" font-weight="700" fill="var(--ok)">MANAGE CLOSELY</text>
        <text x="${padL + 10}" y="${midY + 20}" font-size="11" font-weight="700" fill="var(--m)">MONITOR</text>
        <text x="${midX + 10}" y="${midY + 20}" font-size="11" font-weight="700" fill="var(--warn)">KEEP INFORMED</text>

        <line x1="${midX}" y1="${padT}" x2="${midX}" y2="${padT + plotH}" stroke="var(--b)" stroke-width="2" stroke-dasharray="4,4" />
        <line x1="${padL}" y1="${midY}" x2="${padL + plotW}" y2="${midY}" stroke="var(--b)" stroke-width="2" stroke-dasharray="4,4" />

        <line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="var(--m)" stroke-width="1.5" />
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="var(--m)" stroke-width="1.5" />

        <text x="${padL + plotW / 2}" y="${height - 12}" font-size="12" font-weight="600" fill="var(--m)" text-anchor="middle">Interest (Low → High)</text>
        <text transform="rotate(-90)" x="${-(padT + plotH / 2)}" y="20" font-size="12" font-weight="600" fill="var(--m)" text-anchor="middle">Power (Low → High)</text>

        ${bubblesSvg}
      </svg>
    </div>
  `;
}