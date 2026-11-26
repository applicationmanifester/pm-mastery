export const PM_LIFECYCLE = [
  { id: 'All', label: 'All Stages', desc: 'Complete end-to-end product management toolkit.' },
  { id: 'Discovery', label: '1. Discovery & Strategy', desc: 'Understand customer jobs, market dynamics, and product bets.' },
  { id: 'Prioritization', label: '2. Prioritization & Sizing', desc: 'Decide what to build next using objective value vs. effort.' },
  { id: 'Metrics', label: '3. Metrics & Growth', desc: 'Measure user value, funnel health, and product-market fit.' },
  { id: 'Execution', label: '4. Alignment & Execution', desc: 'Clarify ownership, decisions, and delivery velocity.' },
  { id: 'Interviews', label: '5. Problem-Solving & Interviews', desc: 'Structure ambiguous product design and behavioral stories.' }
];

export const PM_DEEP_DIVES = {
  'RICE Scoring': {
    stage: 'Prioritization',
    caseStudy: 'Intercom created RICE to stop loud stakeholders from hijacking the roadmap. Scoring a new onboarding checklist (Reach: 5,000, Impact: 2, Conf: 80%, Effort: 1 mo → 8,000) beat a niche enterprise export (Reach: 200, Impact: 3, Conf: 100%, Effort: 2 mo → 300).',
    pitfall: 'Inflating Confidence to 100% without data. Cap unvalidated ideas at 50% and require user research or prototypes for 80%+.'
  },
  'WSJF (Weighted Shortest Job First)': {
    stage: 'Prioritization',
    caseStudy: 'A fintech platform had two competing initiatives: a 1-sprint PCI compliance fix (CoD=24, Size=1 → WSJF=24) and a 6-sprint redesign (CoD=24, Size=6 → WSJF=4). WSJF sequenced the compliance fix first to unlock revenue immediately.',
    pitfall: 'Using absolute hours instead of relative Fibonacci sizing, or letting every stakeholder rate Time Criticality as 10.'
  },
  'MoSCoW Method': {
    stage: 'Prioritization',
    caseStudy: 'For a Q4 mobile app launch, the PM enforced the 60/20/20 rule: Must-haves capped at 60% of sprint capacity so Should/Could items act as a buffer when unexpected bugs arise.',
    pitfall: 'Labeling 95% of the backlog as "Must Have", which destroys schedule flexibility and guarantees missed deadlines.'
  },
  'Kano Model': {
    stage: 'Prioritization',
    caseStudy: 'Early smartphones treated touchscreen keyboards as Delighters; within 3 years they became Must-Be table stakes. Kano reminds PMs that delighters decay into expectations over time.',
    pitfall: 'Building Attractive delighters while Basic/Must-Be reliability (login, speed, data accuracy) is broken.'
  },
  'CIRCLES Method': {
    stage: 'Interviews',
    caseStudy: 'Asked "Design an alarm clock for the blind", a strong PM spends 30% of the time in C-I-R (clarifying constraints, segmenting newly blind vs. lifelong blind, identifying tactile/audio needs) before listing any solution.',
    pitfall: 'Jumping straight to solutions ("Let’s add an AI voice assistant!") without defining the user persona or pain point.'
  },
  'STARL Method': {
    stage: 'Interviews',
    caseStudy: 'When asked about a failed launch, adding Learning ("We instituted a 10% beta rollout gate and pre-launch error budget") turns a mistake into proof of senior PM maturity.',
    pitfall: 'Spending 80% of the answer on Situation/Task and saying "we" instead of detailing your own Action and Learning.'
  },
  'Jobs-to-be-Done (JTBD)': {
    stage: 'Discovery',
    caseStudy: 'Clayton Christensen’s famous milkshake study: commuters weren’t buying a milkshake for flavor—they "hired" it to keep one hand busy and stay full during a boring 40-minute drive.',
    pitfall: 'Writing JTBD statements about your product UI ("I want to click the export button") instead of the user’s underlying progress.'
  },
  'Opportunity Solution Tree (OST)': {
    stage: 'Discovery',
    caseStudy: 'Instead of jumping to "Build a referral widget" to hit +15% signups, the team mapped customer opportunities ("Users don’t know what to share", "Inviting teammates feels spammy") and tested 3 lightweight experiments first.',
    pitfall: 'Turning the Opportunities branch into disguised feature requests.'
  },
  'AARRR (Pirate Metrics)': {
    stage: 'Metrics',
    caseStudy: 'A SaaS team doubled ad spend (Acquisition), but MRR barely moved because Activation was 18%. Fixing onboarding to 42% Activation doubled downstream Revenue without spending a dollar more on ads.',
    pitfall: 'Pouring acquisition budget into a leaky bucket before fixing Activation and Retention.'
  },
  'HEART Framework': {
    stage: 'Metrics',
    caseStudy: 'Google’s search team paired Task Success (time-to-first-click) with Happiness (in-product CSAT) so faster clicks didn’t accidentally mean users were clicking bad results and bouncing back.',
    pitfall: 'Tracking Engagement (time on site) for a utility tool where faster completion actually means a better UX.'
  },
  'North Star Metric (NSM)': {
    stage: 'Metrics',
    caseStudy: 'Airbnb’s NSM is "Nights Booked" (value to both guests and hosts); Spotify’s is "Time Spent Listening". Neither is raw signups or pageviews.',
    pitfall: 'Picking a pure revenue metric (MRR) as NSM—revenue lags behind customer value and encourages short-term dark patterns.'
  },
  'Sean Ellis PMF Survey': {
    stage: 'Metrics',
    caseStudy: 'Superhuman used the 40% "Very Disappointed" survey segmented by persona to discover their true PMF core (busy executives), then focused the roadmap exclusively on converting "Somewhat Disappointed" users.',
    pitfall: 'Surveying only friends/beta fans or ignoring segment splits.'
  },
  'Lean Canvas': {
    stage: 'Discovery',
    caseStudy: 'Before writing code for an AI meeting assistant, a PM filled a 1-page Lean Canvas in 20 minutes—exposing that "Distribution Channels" and "Unfair Advantage" were far riskier than the AI tech itself.',
    pitfall: 'Treating the Lean Canvas as a static document instead of updating it after every 5 customer interviews.'
  },
  'DORA Metrics': {
    stage: 'Execution',
    caseStudy: 'When Change Failure Rate spiked to 22%, the PM paused new feature scope for one sprint to invest in automated E2E tests—cutting MTTR from 4 hours to 18 minutes and restoring weekly release cadence.',
    pitfall: 'Optimizing Deployment Frequency alone while ignoring Change Failure Rate.'
  }
};

export const PM_CASE_PROMPTS = {
  circles: [
    {
      label: 'Remote Team Meeting Fatigue (B2B SaaS)',
      prompt: 'Design a feature to help remote project teams avoid meeting fatigue and missed action items.',
      steps: [
        ['C — Comprehend', 'Clarify goal, constraints, platform, and success criteria.', 'Goal: Reduce meeting fatigue & missed action items for distributed teams on Slack/Teams within 3 months. Success: -25% meeting hours, +30% on-time action item completion.'],
        ['I — Identify Customer', 'Who is the primary user? (e.g., Remote PMs, distributed engineers)', 'Primary: Remote Project/Product Managers running 5+ cross-functional syncs/week. Secondary: Distributed engineers across time zones.'],
        ['R — Report Needs', 'What pain points or jobs-to-be-done do they have?', '1) Too many status meetings just to share updates. 2) Action items get buried in chat or lost after calls. 3) Async teammates lack context.'],
        ['C — Cut Through Prioritization', 'Which single user need will you focus on first and why?', 'Focus on #2 (lost action items & decisions) because it directly causes follow-up meetings and rework.'],
        ['L — List Solutions', 'Brainstorm 3 distinct solutions (low, medium, high effort).', '1) Auto-capture Slack/Meet decisions into a daily digest (Low). 2) Interactive async check-in bot replacing standups (Med). 3) Full AI meeting copilot with Jira/Asana sync (High).'],
        ['E — Evaluate Trade-offs', 'Compare solutions on impact, cost, risk, and dependencies.', 'Option 2 gives high impact with medium effort and no heavy video-API dependencies; Option 1 is a fast MVP.'],
        ['S — Summarize', 'State your final recommendation and how you will measure success.', 'Launch Option 1 as a 2-week MVP, then layer Option 2. Track % of meetings replaced by async digests and action-item completion rate.']
      ],
      rubric: ['Clarified goal & constraints before ideating', 'Segmented a specific target persona', 'Prioritized one core pain point with rationale', 'Listed 3+ solutions with trade-offs & success metrics']
    },
    {
      label: 'First-Time Grocery App Drop-off (Consumer)',
      prompt: 'Improve first-week retention for a 15-minute grocery delivery app where 60% of users abandon after viewing prices.',
      steps: [
        ['C — Comprehend', 'Clarify goal, constraints, and metric.', 'Goal: Lift D7 retention from 22% to 35% in Q2 without cutting gross margin below 18%.'],
        ['I — Identify Customer', 'Target user segment.', 'Busy urban professionals (25–40) ordering urgent weeknight essentials, comparing prices vs. local stores.'],
        ['R — Report Needs', 'Core pain points.', '1) Surprise delivery + service fees at checkout. 2) Minimum cart threshold feels high. 3) Unclear value vs. regular supermarkets.'],
        ['C — Cut Through Prioritization', 'Single focus.', 'Eliminate checkout fee shock (#1), which drives the steepest funnel drop-off.'],
        ['L — List Solutions', '3 solutions.', '1) Upfront "All-in price" badge + free first 3 deliveries. 2) Smart "Add $3 item to unlock free delivery" nudges. 3) Monthly micro-pass ($4.99/mo).'],
        ['E — Evaluate Trade-offs', 'Impact vs. margin.', 'Option 2 protects margin while raising AOV; Option 1 boosts initial activation but needs CAC payback guardrails.'],
        ['S — Summarize', 'Final recommendation.', 'A/B test Option 2 + transparent upfront fees first; measure D7 retention, checkout conversion, and contribution margin.']
      ],
      rubric: ['Protected unit economics / margin constraint', 'Diagnosed fee-shock vs. product value', 'Proposed measurable A/B test & guardrail metrics']
    }
  ],
  starl: [
    {
      label: 'Late Scope Change from Sales',
      prompt: 'Tell me about a time a key stakeholder changed scope late in a project and how you handled it.',
      steps: [
        ['S — Situation', 'Set the context: project, team size, timeline, and stakes.', '2 weeks before a Q3 enterprise portal launch (team of 8), the VP of Sales requested a custom SSO integration for a key prospect.'],
        ['T — Task', 'What was your specific responsibility or challenge?', 'Protect the committed launch date and quality while finding a way to support the high-value sales deal.'],
        ['A — Action', 'What concrete steps did YOU take?', 'Ran a 1-hour impact assessment with tech leads, quantified a 3-week delay if bundled, and proposed a phased release: launch core portal on time + fast-follow SSO in Sprint +1.'],
        ['R — Result', 'Quantify the outcome.', 'Core portal launched on schedule with 0 Sev-1 bugs; SSO shipped 10 days later, closing the $250K deal.'],
        ['L — Learning', 'What did you learn and improve afterward?', 'Added a formal Change Control checkpoint 3 weeks pre-launch and aligned Sales/Product on a fast-follow intake lane.']
      ],
      rubric: ['Used "I" instead of "we" for actions', 'Quantified business & schedule impact', 'Included a concrete process improvement in Learning']
    },
    {
      label: 'Disagreeing with Engineering Lead on Tech Debt',
      prompt: 'Describe a time you disagreed with a senior engineer or designer and how you resolved it.',
      steps: [
        ['S — Situation', 'Context & stakes.', 'Ahead of Black Friday, the Tech Lead wanted a 4-week database rewrite while Marketing needed a new promo engine.'],
        ['T — Task', 'Your responsibility.', 'Align both teams on a plan that prevented downtime without missing the holiday revenue window.'],
        ['A — Action', 'Concrete steps.', 'Co-hosted a risk-scoring session using WSJF + load-test data; isolated the 2 bottleneck queries (3 days to fix) and deferred the full rewrite to Q1.'],
        ['R — Result', 'Quantified outcome.', 'Promo engine shipped 5 days early, handled 4x peak traffic with 99.98% uptime, and generated +$1.2M holiday revenue.'],
        ['L — Learning', 'Process improvement.', 'Instituted a standing 20% engineering health allocation per sprint so tech debt never builds into an emergency.']
      ],
      rubric: ['Used objective data instead of authority', 'Found a win-win trade-off', 'Established a repeatable engineering/product ritual']
    }
  ],
  jtbd: [
    {
      label: 'AI Status Reporting Tool',
      prompt: 'Define the core job for a PM using an AI-assisted status reporting tool.',
      steps: [
        ['When (Situation)', 'Triggering context.', 'When preparing for a weekly executive steering committee across 3 parallel workstreams...'],
        ['I want to (Motivation)', 'Core job to be done.', 'I want to automatically synthesize risks, blockers, and schedule/budget variance into a 1-page brief in 5 minutes...'],
        ['So I can (Expected Outcome)', 'Desired progress/value.', 'So I can spend the meeting aligning executives on trade-off decisions rather than manually chasing status updates.']
      ],
      rubric: ['Focuses on user progress, not UI clicks', 'Includes clear situation, motivation, and measurable outcome']
    }
  ],
  ost: [
    {
      label: 'Lift Trial-to-Paid Conversion',
      prompt: 'Map an Opportunity Solution Tree to increase 14-day SaaS trial-to-paid conversion from 12% to 18%.',
      steps: [
        ['Outcome (Metric)', 'Target business/product outcome.', 'Increase 14-day trial-to-paid conversion from 12% to 18% without increasing support tickets.'],
        ['Opportunities (Customer Pains)', '2–3 distinct user pain points discovered in interviews.', '1) Users don’t import real data during trial so dashboards look empty. 2) Champions struggle to justify ROI to their CFO.'],
        ['Solutions (Ideas)', 'Targeted solutions for the top opportunity.', 'For #1: One-click sample workspace + CSV/Jira guided importer with live preview.'],
        ['Assumption Tests (Experiments)', 'Fastest, cheapest test before full build.', 'Run a 5-day concierge onboarding test with 15 trial signups using a pre-filled template and measure activation rate.']
      ],
      rubric: ['Opportunities are user pains, not disguised features', 'Experiments test the riskiest assumption cheaply']
    }
  ],
  leancanvas: [
    {
      label: 'B2B Compliance Copilot',
      prompt: 'Draft a 1-page Lean Canvas for an AI compliance checklist tool for mid-market healthcare startups.',
      steps: [
        ['Problem & Customer Segment', 'Top 2–3 pains + early adopters.', 'Problem: HIPAA/SOC2 audits take 4 months of manual spreadsheet chasing. Early Adopters: Series A/B HealthTech CTOs (15–80 employees).'],
        ['Unique Value Proposition', 'Single clear compelling message.', '"Pass HIPAA & SOC2 readiness in 14 days—automated evidence collection for busy HealthTech teams."'],
        ['Solution & Channels', 'MVP scope + how you reach buyers.', 'Solution: Automated AWS/GitHub/Okta policy checks + auditor-ready PDF export. Channels: Compliance consultants & YC/HealthTech founder communities.'],
        ['Revenue, Costs & Unfair Advantage', 'Pricing + moat.', 'Revenue: $499/mo SaaS + $1,500 audit prep. Unfair Advantage: Pre-mapped healthcare control templates co-authored with former HIPAA auditors.'],
        ['Key Metrics', '3 numbers that matter.', 'Time-to-first-passing-control (< 24h), Weekly Active Policies Monitored, Net Dollar Retention (> 115%).']
      ],
      rubric: ['Narrowed to a specific early-adopter segment', 'Identified a defensible Unfair Advantage', 'Picked actionable leading metrics']
    }
  ]
};

export const PM_SCENARIOS = [
  {
    id: 'sc1',
    cat: 'Metrics & Diagnostics',
    q: 'After launching a redesigned onboarding flow, Day-1 Activation jumped from 32% to 48%, but Day-7 Retention dropped from 28% to 19%. What should you investigate FIRST?',
    opts: [
      'Roll back the entire onboarding redesign immediately.',
      'Segment D7 retention by cohort/source and check whether new users are reaching the core "Aha!" habit loop or hitting a post-onboarding dead end.',
      'Increase paid acquisition spend to compensate for the retention drop.',
      'Send daily push notifications to all D1 users.'
    ],
    ans: 1,
    why: 'Higher D1 activation with lower D7 retention usually means onboarding is pushing users through setup steps without delivering real core value ("false activation"), or attracting lower-intent traffic. Diagnose cohorts and time-to-value before rolling back or spamming users.'
  },
  {
    id: 'sc2',
    cat: 'Prioritization & Stakeholders',
    q: 'Your top enterprise customer (15% of ARR) threatens to churn unless you build a custom reporting module this month. Engineering says it will delay your Q3 platform reliability upgrade by 5 weeks. What is the best PM approach?',
    opts: [
      'Build the custom report immediately to protect ARR.',
      'Say no outright because roadmaps must never bend to one customer.',
      'Diagnose the underlying job-to-be-done, offer a low-effort workaround (e.g., scheduled CSV/API export) now, and evaluate generalizing the capability via WSJF/RICE.',
      'Escalate to the CEO to make the call without analysis.'
    ],
    ans: 2,
    why: 'Great PMs separate the customer’s requested solution from their underlying need. A lightweight bridge (CSV/API export) saves the account without derailing strategic reliability work, while RICE/WSJF tests whether the generalized feature belongs on the roadmap.'
  },
  {
    id: 'sc3',
    cat: 'Discovery & Experiments',
    q: 'Your team is excited to spend 6 weeks building an AI-powered recommendation engine. You have zero user validation yet. What is the leanest next step?',
    opts: [
      'Write a 20-page PRD and kick off sprint 1.',
      'Run a Wizard-of-Oz or "Fake Door" / curated manual recommendation test with 20 target users in 3 days to validate click-through and value.',
      'Survey 1,000 random people asking "Would you use AI recommendations?"',
      'Wait until a competitor launches one first.'
    ],
    ans: 1,
    why: 'Opinion surveys ("Would you use X?") suffer from hypothetical bias. A 3-day Wizard-of-Oz or Fake Door experiment tests real user behavior and willingness to engage before committing 6 weeks of engineering.'
  },
  {
    id: 'sc4',
    cat: 'Metrics & Guardrails',
    q: 'You are optimizing an e-commerce search algorithm to maximize "Add-to-Cart Rate". Which guardrail metric is MOST critical to pair with it?',
    opts: [
      'Total pageviews per session',
      'Return / Refund rate and Checkout Conversion (to ensure search isn’t surfacing clickbait or out-of-stock items)',
      'Number of lines of code deployed',
      'Social media shares'
    ],
    ans: 1,
    why: 'Every primary optimization metric needs a counter/guardrail metric. Optimizing Add-to-Cart alone can game relevance with misleading thumbnails or unavailable items, hurting Checkout Conversion and increasing Returns.'
  },
  {
    id: 'sc5',
    cat: 'Agile & Delivery',
    q: 'During Sprint Planning, Engineering flags that a high-priority story has a 40% chance of needing a third-party API change that isn’t documented yet. What should you do?',
    opts: [
      'Force-commit the story to the sprint anyway to hit velocity targets.',
      'Timebox a 1–2 day technical Spike first to de-risk the API, and keep a ready backup story in the sprint.',
      'Cancel the entire sprint.',
      'Switch from Scrum to Waterfall.'
    ],
    ans: 1,
    why: 'A timeboxed Spike resolves technical uncertainty quickly without blowing up the Sprint Goal, and having a ready backup story keeps flow predictable.'
  }
];

export const RCA_PRESETS = {
  fishbone: {
    product: {
      head: 'D7 Retention Dropped 12%',
      causes: {
        People: ['Support team lacked onboarding FAQ', 'No dedicated onboarding PM'],
        Process: ['Skipped usability test on v2 flow', 'Forced 6-step setup before value'],
        Tech: ['Slow CSV import (>15s timeout)', 'Mobile push opt-in broken on iOS'],
        Data: ['Cohort tracking missed guest users', 'No funnel drop-off alerts']
      }
    },
    delivery: {
      head: 'Sprint Velocity Dropped 30%',
      causes: {
        People: ['2 senior devs pulled to Sev-1s', 'New hire onboarding overhead'],
        Process: ['Unrefined stories entered sprint', 'Mid-sprint scope creep from Sales'],
        Tech: ['Flaky E2E test suite (25m runs)', 'Staging DB out of sync'],
        Data: ['Story points underestimated API work', 'Hidden third-party dependency']
      }
    }
  },
  fiveWhys: {
    symptom: 'Enterprise customers are abandoning trial setup at Step 3 (Data Import).',
    whys: [
      'Because 65% of CSV uploads fail with a generic "Invalid format" error.',
      'Because our parser rejects ISO-8601 timestamps and trailing spaces.',
      'Because the import validator was built only for internal US sample files.',
      'Because QA test fixtures didn’t include real customer exports from EU/APAC.',
      'Because we lack an automated schema-linting & sample-fixture pipeline for customer data.'
    ],
    root: 'Missing customer-representative test fixtures and forgiving schema normalization in the importer.',
    action: 'Add auto-trimming + flexible date parsing, show row-level error hints, and add 10 anonymized customer CSVs to CI.'
  },
  pareto: [
    { name: 'Checkout Timeout / 504', count: 48 },
    { name: 'Unclear Pricing / Fees', count: 31 },
    { name: 'SSO Login Failure', count: 14 },
    { name: 'Slow Search Results', count: 9 },
    { name: 'Missing Dark Mode', count: 4 },
    { name: 'Typos in Help Docs', count: 2 }
  ]
};

export const STRATEGY_PRESETS = {
  roadmap: [
    { col: 'Now', title: '1-Click CSV Importer', outcome: '+15% Trial Activation', conf: 'High' },
    { col: 'Now', title: 'Checkout Latency Fix', outcome: '-40% Cart Abandonment', conf: 'High' },
    { col: 'Next', title: 'AI Weekly Executive Digest', outcome: '+20% WAU Engagement', conf: 'Med' },
    { col: 'Next', title: 'Self-Serve SSO (SAML)', outcome: 'Unblock Enterprise ARR', conf: 'Med' },
    { col: 'Later', title: 'Marketplace Integrations', outcome: 'Expand Ecosystem NRR', conf: 'Low' }
  ],
  raci: {
    roles: ['PM', 'Eng Lead', 'Design', 'Sponsor'],
    rows: [
      { task: 'Product Roadmap & Scope', assign: ['A', 'C', 'C', 'I'] },
      { task: 'Technical Architecture', assign: ['I', 'A', 'I', 'I'] },
      { task: 'UX Prototypes & Research', assign: ['C', 'C', 'A', 'I'] },
      { task: 'Go-Live & Budget Sign-off', assign: ['R', 'C', 'I', 'A'] }
    ]
  },
  experiment: {
    hypothesis: 'If we replace the 6-step onboarding form with a 1-click sample workspace, then D7 retention will increase by +10% because users experience core value in under 60 seconds.',
    primary: 'D7 Retention Rate (Target: ≥ 32%)',
    guardrail: 'Support Ticket Rate (< 3%) & Paid Conversion (no drop)',
    criteria: 'Ship if D7 lifts ≥ +6% with p < 0.05 over 14 days and guardrails hold; otherwise iterate on guided import.'
  },
  premortem: [
    { risk: 'Enterprise SSO delayed by IdP edge cases', like: 4, imp: 5, signal: 'Sandbox auth errors > 5%', mit: 'Run 2-day Spike in Sprint 1; ship Okta/AzureAD first.' },
    { risk: 'Users ignore AI digest due to noisy alerts', like: 3, imp: 4, signal: 'Email open rate < 20%', mit: 'Add frequency controls + 5-user beta before GA.' }
  ]
};
