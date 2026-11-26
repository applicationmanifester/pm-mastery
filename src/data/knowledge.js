export const PRINCIPLES = [
  ["Stewardship", "Be a diligent, respectful, caring steward of resources: people, money, environment."],
  ["Team", "Build a collaborative, high-performing team with clear roles and psychological safety."],
  ["Stakeholders", "Engage stakeholders proactively; their influence shapes outcomes."],
  ["Value", "Focus on measurable benefits and value, not just outputs."],
  ["Systems thinking", "Treat the project as part of a larger system and respond to interactions."],
  ["Leadership", "Show context-fitting leadership behaviours: vision, ethics, decisions, adaptation."],
  ["Tailoring", "Tailor the delivery approach (predictive, agile, hybrid) to the context."],
  ["Quality", "Build quality into processes and deliverables; ensure fitness for purpose."],
  ["Complexity", "Navigate complexity from human behaviour, system interactions, and ambiguity."],
  ["Risk", "Optimise risk responses, treating both threats and opportunities."],
  ["Adaptability & resilience", "Absorb shocks and adjust as you learn."],
  ["Change", "Enable change to move from current to desired future state."]
];

export const DOMAINS = [
  ["Stakeholders", "Engage stakeholders, manage expectations, communicate, resolve conflict, build support."],
  ["Team", "Build team charter, develop competence, lead, manage conflict, empower self-organisation."],
  ["Development approach & life cycle", "Select predictive, agile, or hybrid; define deliverables, cadence, and phases."],
  ["Planning", "Scope, schedule, budget, quality, resources, communication, risk, procurement plans."],
  ["Project work", "Manage resources, procurement, knowledge, and work performance in execution."],
  ["Delivery", "Deliver scope and quality, enable benefits, handle change, close the project."],
  ["Measurement", "Track performance with KPIs, variance, earned value, and corrective action."],
  ["Uncertainty", "Identify and respond to risks, assumptions, issues, and ambiguity."]
];


export const PROCESS_GROUPS = [
  ["Initiating", "Authorise the project and identify stakeholders.", ["Develop project charter", "Identify stakeholders"]],
  ["Planning", "Define scope, schedule, cost, quality, risk, and how work will be done.", ["Develop project management plan", "Plan scope management", "Create WBS", "Define activities", "Estimate activity durations", "Develop schedule", "Estimate costs", "Determine budget", "Plan quality management", "Plan risk management", "Identify risks", "Perform quantitative risk analysis", "Plan risk responses", "Plan procurement management", "Plan stakeholder engagement"]],
  ["Executing", "Carry out the plan, lead the team, manage communications and procurement.", ["Direct and manage project work", "Manage project knowledge", "Manage quality", "Acquire resources", "Develop team", "Manage team", "Manage communications", "Conduct procurements", "Manage stakeholder engagement", "Implement risk responses"]],
  ["Monitoring & Controlling", "Track, review, and regulate performance; approve changes.", ["Monitor and control project work", "Perform integrated change control", "Validate scope", "Control scope", "Control schedule", "Control costs", "Control quality", "Monitor risks", "Monitor stakeholder engagement"]],
  ["Closing", "Formalise completion and transfer deliverables.", ["Close project or phase"]]
];

export const METHODS = [
  ["Predictive (waterfall)", "Scope and plan defined upfront; sequential phases; change via formal control. Best when requirements are stable."],
  ["Iterative", "Refines the product through repeated cycles; each iteration improves the design."],
  ["Incremental", "Delivers working pieces that add functionality over time."],
  ["Agile", "Short iterations, customer collaboration, continuous feedback, adaptation to change."],
  ["Hybrid", "Predictive governance combined with agile delivery for parts of the work."]
];

export const AGILE = [
  ["Scrum roles", "Product Owner (value, backlog), Scrum Master (process, removes impediments), Developers (build the increment)."],
  ["Scrum events", "Sprint, Sprint Planning, Daily Scrum (15 min), Sprint Review, Sprint Retrospective."],
  ["Scrum artifacts", "Product Backlog, Sprint Backlog, Increment; commitments: Product Goal, Sprint Goal, Definition of Done."],
  ["Kanban", "Visualise flow, limit work in progress (WIP), make policies explicit, improve collaboratively."],
  ["Velocity", "Work a team completes per sprint; used for forecasting, never for comparing teams."],
  ["Burndown / burnup", "Burndown shows remaining work; burnup shows completed work against total scope."],
  ["Retrospective", "Team reflects on process and agrees on improvements for the next iteration."]
];

export const GLOSSARY = [
  ["Project charter", "Document issued by the sponsor that formally authorises the project and gives the PM authority."],
  ["Business case", "Justification for investment, reviewed during the project to confirm continued value."],
  ["Stakeholder register", "Log of stakeholders with interests, influence, and engagement strategy."],
  ["WBS", "Work Breakdown Structure: hierarchical decomposition of total scope into work packages."],
  ["RBS", "Resource Breakdown Structure: hierarchy of resources by category and type."],
  ["Critical path", "Longest sequence of dependent activities; sets the shortest possible project duration."],
  ["Float (slack)", "Amount an activity can slip without delaying the project finish date."],
  ["Fast-tracking", "Running activities in parallel that were planned in sequence; adds risk and rework."],
  ["Crashing", "Adding resources to shorten the schedule, usually at extra cost."],
  ["Resource leveling", "Adjusting the schedule to smooth resource demand; may extend the critical path."],
  ["Lead and lag", "Lead lets a successor start early; lag inserts a delay between activities."],
  ["Milestone", "Significant point or event with zero duration, often used for approvals and reviews."],
  ["RACI", "Responsibility matrix: Responsible, Accountable, Consulted, Informed."],
  ["Lessons learned", "Captured knowledge about what worked and did not, for future use."],
  ["Expert power", "Influence derived from specialised knowledge or skill."],
  ["Risk register", "Log of risks with probability, impact, owner, and response."],
  ["Expected Monetary Value (EMV)", "Probability multiplied by impact; used to compare risk options."],
  ["Monte Carlo simulation", "Repeated random sampling of uncertain inputs to estimate a range of outcomes."],
  ["Change request", "Formal proposal to change a baseline or any project element."],
  ["Baseline", "Approved plan used as the reference for measuring performance."],
  ["Earned Value (EV)", "Value of work actually completed, measured against its budget."],
  ["Planned Value (PV)", "Authorised budget for scheduled work up to a given date."],
  ["Actual Cost (AC)", "Realised cost of work performed to date."],
  ["Governance", "Framework of rules, roles, and processes that direct and control the project."],
  ["Sponsor", "Person or group providing resources and support; accountable for the business case."],
  ["Escalation", "Passing an issue up the chain because it exceeds the PM's authority or tolerance."],
  ["Contingency reserve", "Budget or schedule held for known-unknown risks, controlled by the PM."],
  ["Management reserve", "Budget held for unknown-unknown risks, controlled by senior management."],
  ["Organisational process assets", "Internal plans, policies, templates, and lessons learned the project can use."],
  ["Enterprise environmental factors", "External and internal conditions outside the project's control, such as regulations and culture."],
  ["Procurement", "Acquiring goods or services from outside the performing organisation."],
  ["Impediment", "Anything that blocks or slows a team's progress."],
  ["Benefits realisation", "Process of ensuring intended business outcomes are achieved and sustained."],
  ["Tailoring", "Adapting the development approach, processes, and artifacts to the project's needs."],
  ["Point of Total Assumption (PTA)", "Cost threshold in an FPIF contract above which the seller bears 100% of additional cost overruns."],
  ["Definition of Done (DoD)", "Formal checklist of quality criteria an increment must meet to be considered potentially releasable."],
  ["Definition of Ready (DoR)", "Shared agreement on what must be clear and sized before a backlog item enters a sprint."],
  ["Minimum Viable Product (MVP)", "Smallest product increment that delivers value and validates key customer hypotheses."],
  ["Spike", "Short, timeboxed research or prototyping task used in Agile to reduce technical or requirement uncertainty."],
  ["Servant leadership", "Leadership style focused on removing impediments, empowering the team, and supporting growth."],
  ["Psychological safety", "Shared belief that team members can raise risks, questions, or mistakes without fear of punishment."],
  ["Salience model", "Stakeholder classification grid based on Power, Urgency, and Legitimacy."],
  ["Velocity", "Average story points a Scrum team completes per sprint, used for forecasting rather than comparing teams."],
  ["Value delivery system", "End-to-end set of portfolios, programs, projects, and operations that create business value."]
];

export const FORMULAS = [
  ["CV (Cost Variance)", "EV − AC", "Negative = over budget"],
  ["SV (Schedule Variance)", "EV − PV", "Negative = behind schedule"],
  ["CPI", "EV ÷ AC", "< 1 = cost inefficient"],
  ["SPI", "EV ÷ PV", "< 1 = schedule inefficient"],
  ["EAC (typical)", "BAC ÷ CPI", "Assumes current CPI continues"],
  ["EAC (atypical)", "AC + (BAC − EV)", "Use when variances are one-off"],
  ["EAC (CPI & SPI)", "AC + (BAC − EV) ÷ (CPI × SPI)", "Both cost and schedule drive remaining cost"],
  ["ETC", "EAC − AC", "Estimate to complete"],
  ["VAC", "BAC − EAC", "Variance at completion"],
  ["TCPI (to BAC)", "(BAC − EV) ÷ (BAC − AC)", "Efficiency needed to finish within BAC"],
  ["TCPI (to EAC)", "(BAC − EV) ÷ (EAC − AC)", "Efficiency needed to hit revised EAC"],
  ["EMV", "Probability × Impact", "Compare risk options on a common basis"],
  ["PERT estimate (Beta)", "(O + 4M + P) ÷ 6", "Optimistic, most likely, pessimistic"],
  ["Triangular estimate", "(O + M + P) ÷ 3", "Equal weight three-point average"],
  ["PERT Standard Deviation", "(P − O) ÷ 6", "1σ spread; Variance = σ²"],
  ["Float", "LS − ES  (or LF − EF)", "0 on the critical path"],
  ["Communication channels", "n(n − 1) ÷ 2", "n = number of people"],
  ["Point of Total Assumption", "((Ceiling − Target Price) ÷ Buyer Share) + Target Cost", "FPIF contract cost ceiling threshold"]
];

export const AI_TOPICS = [
  ["AI for planning", "Draft WBS outlines, first-pass schedules, and risk lists. Validate against scope and historical data. AI output is a draft, not a baseline."],
  ["AI for risk", "Pattern detection across logs and status reports can surface emerging risks early. Every risk entry still needs a human owner."],
  ["AI for reporting", "Summarise meetings, status updates, and stakeholder feedback. Verify facts, figures, names, and dates before sharing."],
  ["Predictive analytics", "Forecast slippage and overrun from performance trends. Treat as a signal to investigate, not a verdict."],
  ["AI for stakeholder analysis", "Map stakeholder sentiment from communications and draft engagement plans. Check for bias and misreading of tone."],
  ["Prompt patterns for PMs", "Give role, context, constraints, and output format. Example: 'Act as a PMO analyst. From this scope statement, list 10 risks with probability, impact, and mitigation, as a table.'"],
  ["Responsible AI", "Accountability, transparency, fairness, privacy, safety. Record where AI influenced a decision."],
  ["Data governance", "Do not paste confidential, personal, or client data into tools without approved data terms. Follow the organisation's AI policy."],
  ["Human-in-the-loop", "AI recommends; accountable humans decide. Keep sign-off on baselines, budgets, and external communications."],
  ["Team adoption", "Pilot in small groups, set usage norms, measure time saved and quality, and train on failure modes."],
  ["Agentic workflows", "Agents can run multi-step tasks such as ticket triage or status compilation. Define permissions, audit logs, and a kill switch first."],
  ["Limits", "Models hallucinate, reflect bias, and can lag current data. Check citations, numbers, and dates."]
];

export const REVISE = [
  "Recite the 12 project management principles",
  "Name the 8 performance domains and their focus",
  "Know the balance of people, process, and business-environment topics",
  "List the 5 process groups and key processes in each",
  "Recall EV, PV, AC formulas and CPI/SPI meaning",
  "Derive typical and atypical EAC and TCPI",
  "Compute a critical path and float by hand",
  "Distinguish positive and negative risk responses",
  "Describe Scrum roles, events, and artifacts",
  "Choose predictive vs agile vs hybrid with reasons",
  "Explain servant leadership and conflict-resolution modes",
  "Apply the power/interest grid to stakeholders",
  "Name 3 AI use cases and 3 AI risks in PM",
  "Score 80%+ on a full quiz run"
];

export const DOM_DEEP = [
  ['Stakeholders', 'Outcomes: productive working relationships, stakeholder agreement with objectives, supporters benefit while critics do not derail. Ideas: identify, understand, analyse, prioritise, engage, monitor; engagement is continuous, so communicate and negotiate throughout.'],
  ['Team', 'Outcomes: shared ownership, a high-performing team, leadership suited to context. Ideas: servant leadership, team culture and charter, skills development, emotional intelligence, tailoring leadership style.'],
  ['Development approach & life cycle', 'Outcomes: approach fits the deliverables, cadence supports value, phases link delivery to value. Ideas: delivery cadence (single, multiple, periodic, continuous), predictive vs adaptive vs hybrid, align cadence with approach.'],
  ['Planning', 'Outcomes: organised and deliberate progress, holistic delivery approach, enough information to engage stakeholders, adaptive planning. Ideas: estimating, scheduling, budgeting, procurement, planning for change.'],
  ['Project work', 'Outcomes: efficient performance, processes fit the approach, effective communication, resources and procurement managed, continuous learning. Ideas: focus the work, manage physical resources, handle change, learn as you go.'],
  ['Delivery', 'Outcomes: contribution to business objectives, intended outcomes realised, stakeholders accept deliverables. Ideas: value delivery, scope and requirements, quality, dealing with suboptimal outcomes.'],
  ['Measurement', 'Outcomes: reliable status, actionable data, timely action, forecast-based decisions. Ideas: leading and lagging indicators, effective metrics, presenting information, pitfalls such as vanity metrics, observation effect, and confirmation bias.'],
  ['Uncertainty', 'Outcomes: awareness of the environment, risks managed, opportunities realised, reserves sized to need. Ideas: general uncertainty, ambiguity, complexity, volatility, and risk.']
];
export const CH_LESSONS = [
  [1, 'Project Management Framework', 'Project = temporary and unique; operations are ongoing. Program groups related projects; portfolio holds projects and programs. Five process groups, ten knowledge areas, life cycles, progressive elaboration, PMO types. Processes are tailored, none mandatory.'],
  [2, 'Project Environment', 'Structures: functional (PM authority none to low), weak/balanced/strong matrix, project-oriented (high to almost full). Enterprise environmental factors (internal and external) vs organisational process assets. PM skills: technical, leadership, strategic and business. Business documents: business case and benefits management plan.'],
  [3, 'Initiating', 'Develop the charter (sponsor issues it; names the PM and gives authority). Identify stakeholders into the register. Tools: power/interest grid, salience model, stakeholder cube. Assumptions carry risk; constraints limit options.'],
  [4, 'Scope', 'Plan scope, collect requirements (interviews, focus groups, observation or job shadowing), define scope, create WBS. Scope baseline = scope statement + WBS + WBS dictionary. Work packages are the lowest WBS level.'],
  [5, 'Schedule', 'Define activities, sequence (precedence diagramming; FS, SS, FF, SF; leads and lags), estimate durations (analogous, parametric, three-point), develop schedule (critical path, float). Compression: crashing adds cost, fast tracking adds risk.'],
  [6, 'Resources, Cost, Procurement', 'Resource plan, RAM, team charter. Estimate costs, determine budget into the cost baseline; contingency vs management reserve. Contracts: FFP (seller bears overruns), CPFF (buyer pays costs), T&M. Make-or-buy analysis; SOW output of procurement planning.'],
  [7, 'Quality and Risk', 'Quality planning: cost of quality, benchmarking, flowcharts; PDCA. Risk: plan, identify, qualitative, quantitative (EMV), responses (avoid, transfer, mitigate, accept; exploit, share, enhance), secondary and residual risks, risk register.'],
  [8, 'Communication and Stakeholder Planning', 'Channels = n(n-1)/2. Models: sender/receiver, interactive (confirms understanding); noise disrupts decoding. Push, pull, interactive methods. Engagement levels: unaware, resistant, neutral, supportive, leading. Engagement plan holds the strategies.'],
  [9, 'Executing', 'Direct and manage work yields deliverables, work performance data, issue log, change requests. Manage knowledge and close phase produce lessons learned. Manage Quality uses audits. Conduct Procurements: sellers respond with proposals.'],
  [10, 'Managing Resources', 'Acquire, develop, manage team. Team development stages: forming, storming, norming, performing, adjourning. Conflict modes (collaborate gives win-win; force, withdraw, smooth, compromise). Authoritarian vs participative styles, the three-needs theory, virtual teams, power types.'],
  [11, 'Communication and Engagement', 'Manage Communications outputs project communications. Manage Stakeholder Engagement can raise change requests. The issue log supports communicating and monitoring issues.'],
  [12, 'Monitoring the Work', 'Monitor and control work; integrated change control with a change control board. Quality tools: control chart, Pareto, histogram, scatter, cause-and-effect. Control Quality verifies; Validate Scope gets acceptance.'],
  [13, 'Controlling Scope, Schedule, Resources', 'EV = BAC x % complete; PV = BAC x % time; CV = EV - AC; SV = EV - PV; CPI, SPI; EAC, ETC, VAC, TCPI. Scope creep is controlled through change control; critical path has zero float.'],
  [14, 'Monitoring Engagement and Communication', 'Monitor Communications follows both the communication and engagement plans. Monitoring processes generate work performance information from data.'],
  [15, 'Closing', 'Close project or phase: sponsor signs closure, capture lessons learned, archive records, release resources. Every project closes, including cancelled ones. Procurements close in Control Procurements.']
];

export const IO = [
  ['Develop Project Charter', 'Business documents, agreements, EEFs, OPAs', 'Project charter, assumption log'],
  ['Identify Stakeholders', 'Charter, business documents, agreements', 'Stakeholder register'],
  ['Create WBS', 'Scope management plan, project scope statement, requirements documentation', 'Scope baseline (scope statement + WBS + dictionary)'],
  ['Develop Schedule', 'Activity list, durations, resource requirements, project calendars', 'Schedule baseline, project schedule'],
  ['Determine Budget', 'Cost estimates, basis of estimates, scope baseline, schedule', 'Cost baseline, funding requirements'],
  ['Identify Risks', 'Plans, assumption log, requirements, stakeholder register', 'Risk register, risk report'],
  ['Direct and Manage Project Work', 'Project management plan, approved changes, project documents', 'Deliverables, work performance data, issue log, change requests'],
  ['Manage Project Knowledge', 'Project management plan, deliverables, lessons learned register', 'Lessons learned register, updated plans'],
  ['Manage Quality', 'Quality management plan, quality metrics, risk report', 'Test and evaluation documents, quality reports, change requests'],
  ['Conduct Procurements', 'Procurement documents, seller proposals, selection criteria', 'Selected sellers, agreements'],
  ['Manage Communications', 'Communications and engagement plans, work performance reports', 'Project communications'],
  ['Manage Stakeholder Engagement', 'Engagement plan, communications plan, issue log, change log', 'Change requests, updated plans'],
  ['Control Quality', 'Quality metrics, test documents, approved changes, deliverables', 'Quality control measurements, verified deliverables'],
  ['Validate Scope', 'Verified deliverables, requirements documentation, scope baseline', 'Accepted deliverables, change requests'],
  ['Monitor and Control Project Work', 'Project management plan, work performance information', 'Work performance reports, change requests'],
  ['Perform Integrated Change Control', 'Change requests, work performance reports, plans', 'Approved change requests, change log'],
  ['Close Project or Phase', 'Charter, plans, accepted deliverables, agreements', 'Final report, lessons learned, updated OPAs']
];
export const TAILOR = [
  ['Why tailor', 'No single approach fits every project. Adjust the approach, governance, processes, and artifacts to the product, team, organisation, and uncertainty.'],
  ['Step 1: select initial approach', 'Choose predictive, adaptive, or hybrid based on the product, project, and organisation.'],
  ['Step 2: tailor for the organisation', 'Adapt to governance, culture, policies, and the tools the organisation already uses.'],
  ['Step 3: tailor for the project', 'Adapt to team size, location, risk, and stakeholder needs. Inspect results and keep adapting.'],
  ['Areas to tailor', 'Life cycle and phases, delivery cadence, processes, engagement approach, tools, methods, and artifacts.']
];
export const MMA = [
  ['Models', 'Leadership and team models (situational leadership, staged team development, team performance models), change models (urgency-led, individual-readiness, and transition models), complexity models (simple, complicated, complex, and chaotic domains), conflict and negotiation models, planning and prioritisation models.'],
  ['Methods', 'Data gathering and analysis (surveys, interviews, root cause), estimating (analogous, parametric, three-point), meetings and events (planning, standups, retrospectives, reviews).'],
  ['Artifacts', 'Strategy documents, logs and registers, plans, hierarchy charts such as the WBS, baselines, visual data (dashboards, burn charts), reports, and agreements and contracts.']
];

/* ============ 49 Processes Matrix Data ============ */
export const KNOWLEDGE_AREAS = [
  'Integration', 'Scope', 'Schedule', 'Cost', 'Quality',
  'Resource', 'Communications', 'Risk', 'Procurement', 'Stakeholders'
];

export const PROCESS_MATRIX = [
  ['Integration', ['Develop Project Charter'], ['Develop Project Management Plan'], ['Direct & Manage Project Work', 'Manage Project Knowledge'], ['Monitor & Control Project Work', 'Perform Integrated Change Control'], ['Close Project or Phase']],
  ['Scope', [], ['Plan Scope Management', 'Collect Requirements', 'Define Scope', 'Create WBS'], [], ['Validate Scope', 'Control Scope'], []],
  ['Schedule', [], ['Plan Schedule Management', 'Define Activities', 'Sequence Activities', 'Estimate Activity Durations', 'Develop Schedule'], [], ['Control Schedule'], []],
  ['Cost', [], ['Plan Cost Management', 'Estimate Costs', 'Determine Budget'], [], ['Control Costs'], []],
  ['Quality', [], ['Plan Quality Management'], ['Manage Quality'], ['Control Quality'], []],
  ['Resource', [], ['Plan Resource Management', 'Estimate Activity Resources'], ['Acquire Resources', 'Develop Team', 'Manage Team'], ['Control Resources'], []],
  ['Communications', [], ['Plan Communications Management'], ['Manage Communications'], ['Monitor Communications'], []],
  ['Risk', [], ['Plan Risk Management', 'Identify Risks', 'Perform Qualitative Risk Analysis', 'Perform Quantitative Risk Analysis', 'Plan Risk Responses'], ['Implement Risk Responses'], ['Monitor Risks'], []],
  ['Procurement', [], ['Plan Procurement Management'], ['Conduct Procurements'], ['Control Procurements'], []],
  ['Stakeholders', ['Identify Stakeholders'], ['Plan Stakeholder Engagement'], ['Manage Stakeholder Engagement'], ['Monitor Stakeholder Engagement'], []]
];

export const PEOPLE_CASES = [
  {
    id: 'conflict',
    title: 'Case 1: Senior Engineers Clashing on Architecture',
    scenario: 'Two lead developers on your hybrid team strongly disagree on the database migration approach, stalling sprint work and creating tension in daily standups.',
    options: [
      'Decide the architecture yourself to unblock the sprint immediately.',
      'Facilitate a private, collaborative session to align on criteria and reach a win-win.',
      'Escalate the disagreement to the functional manager for a formal ruling.'
    ],
    best: 1,
    mindset: 'Collaborate / Problem-Solve first. Servant leaders empower the team to resolve technical conflicts constructively using shared objective criteria.',
    trap: 'Exam Trap: Forcing (deciding yourself) or escalating prematurely undermines team ownership and psychological safety.'
  },
  {
    id: 'stakeholder',
    title: 'Case 2: Resistant Sponsor Bypassing Change Control',
    scenario: 'A key VP emails a developer directly asking for a "quick new dashboard widget" before Friday\'s demo, bypassing the Product Owner and change log.',
    options: [
      'Ask the developer to build it quietly to keep the VP happy.',
      'Send a firm email reprimanding the VP for violating governance.',
      'Meet with the VP to understand the underlying business need and route it through the Product Owner / CCB.'
    ],
    best: 2,
    mindset: 'Engage & Understand first. Address the root business value with empathy while protecting scope integrity through proper backlog/change governance.',
    trap: 'Exam Trap: Gold-plating (building without approval) creates scope creep; confrontational emails damage stakeholder trust.'
  },
  {
    id: 'tuckman',
    title: 'Case 3: Newly Formed Virtual Team Missing Handoffs',
    scenario: 'A newly assembled distributed team across three time zones is missing handoffs and seems hesitant to speak up during retrospectives.',
    options: [
      'Revisit the Team Charter (working agreements, core overlap hours) and foster psychological safety.',
      'Replace underperforming team members with co-located staff.',
      'Increase daily status reporting to twice a day.'
    ],
    best: 0,
    mindset: 'Storming -> Norming support. Co-creating working agreements in the Team Charter and building trust resolves friction in virtual teams.',
    trap: 'Exam Trap: Micromanagement (extra status meetings) treats symptoms rather than root causes like unclear norms or low trust.'
  },
  {
    id: 'impediment',
    title: 'Case 4: Cross-Team Dependency Blocking Sprint Goal',
    scenario: 'During Sprint 3, your Agile team discovers an external security review will take 10 days, threatening the sprint commitment.',
    options: [
      'Tell the team to work overtime to compensate once the review arrives.',
      'Treat it as an impediment: coordinate with the security lead to expedite/unblock and collaborate with the PO on sprint scope.',
      'Wait until the Sprint Review to inform stakeholders about the delay.'
    ],
    best: 1,
    mindset: 'Servant Leadership & Transparency. Remove organizational impediments early and communicate transparently with the Product Owner.',
    trap: 'Exam Trap: Hiding blockers until Sprint Review violates Agile transparency; mandating overtime burns out the team.'
  }
];

export const PROCESS_DETAILS = {
  'Develop Project Charter': {
    pg: 'Initiating', ka: 'Integration', ch: 3,
    purpose: 'Formally authorizes the existence of a project and gives the PM authority to apply organizational resources.',
    inputs: 'Business documents (Business Case, Benefits Mgmt Plan), Agreements, EEFs, OPAs',
    tools: 'Expert judgment, Data gathering (brainstorming, focus groups, interviews), Interpersonal & team skills, Meetings',
    outputs: 'Project charter, Assumption log',
    tip: 'Issued by the Project Sponsor (not the PM). Without a signed charter, the project does not officially exist.'
  },
  'Develop Project Management Plan': {
    pg: 'Planning', ka: 'Integration', ch: 4,
    purpose: 'Defines, prepares, and coordinates all plan components and consolidates them into an integrated master plan.',
    inputs: 'Project charter, Outputs from other planning processes, EEFs, OPAs',
    tools: 'Expert judgment, Data gathering, Interpersonal & team skills (conflict mgmt, facilitation), Meetings',
    outputs: 'Project management plan (baselines + subsidiary plans)',
    tip: 'The PM plan is progressively elaborated and only changed via Perform Integrated Change Control once baselined.'
  },
  'Direct & Manage Project Work': {
    pg: 'Executing', ka: 'Integration', ch: 9,
    purpose: 'Leads and performs the work defined in the PM plan and implements approved changes to achieve project objectives.',
    inputs: 'PM plan, Project documents (change log, lessons learned), Approved change requests, EEFs, OPAs',
    tools: 'Expert judgment, PMIS, Meetings',
    outputs: 'Deliverables, Work performance data (WPD), Issue log, Change requests, PM plan/doc updates',
    tip: 'Raw Work Performance Data (WPD) is produced here, then turned into Work Performance Information (WPI) during Monitoring & Controlling.'
  },
  'Manage Project Knowledge': {
    pg: 'Executing', ka: 'Integration', ch: 9,
    purpose: 'Uses existing knowledge and creates new knowledge to achieve project objectives and contribute to organizational learning.',
    inputs: 'PM plan, Project documents (lessons learned register, resource assignments), Deliverables, EEFs, OPAs',
    tools: 'Expert judgment, Knowledge management (networking, communities of practice), Information management, Interpersonal skills',
    outputs: 'Lessons learned register, PM plan updates, OPA updates',
    tip: 'Lessons learned are captured continuously throughout the project—not just at Closing.'
  },
  'Monitor & Control Project Work': {
    pg: 'Monitoring & Controlling', ka: 'Integration', ch: 12,
    purpose: 'Tracks, reviews, and reports overall progress to meet performance objectives defined in the PM plan.',
    inputs: 'PM plan, Project documents, Work performance information (WPI), Agreements, EEFs, OPAs',
    tools: 'Expert judgment, Data analysis (alternatives, cost-benefit, EVM, root cause, trend, variance), Decision making, Meetings',
    outputs: 'Work performance reports (WPR), Change requests, PM plan/doc updates',
    tip: 'Consolidates Work Performance Information (WPI) into Work Performance Reports (WPR) for stakeholders and CCB.'
  },
  'Perform Integrated Change Control': {
    pg: 'Monitoring & Controlling', ka: 'Integration', ch: 12,
    purpose: 'Reviews all change requests, approves/rejects changes, and manages changes to deliverables, docs, and baselines.',
    inputs: 'PM plan, Project documents, Work performance reports, Change requests, EEFs, OPAs',
    tools: 'Expert judgment, Change control tools, Data analysis, Decision making (voting, autocratic, multicriteria), Meetings',
    outputs: 'Approved change requests, PM plan updates, Project document updates (change log)',
    tip: 'Exam Mindset: Never implement a scope/baseline change before analyzing impact and getting formal CCB/sponsor approval.'
  },
  'Close Project or Phase': {
    pg: 'Closing', ka: 'Integration', ch: 15,
    purpose: 'Finalizes all activities for the project, phase, or contract to formally complete it and release resources.',
    inputs: 'Project charter, PM plan, Project documents, Accepted deliverables, Business documents, Agreements, Procurement docs, OPAs',
    tools: 'Expert judgment, Data analysis (document, regression, trend, variance), Meetings',
    outputs: 'Project document updates (lessons learned), Final product/service/result transition, Final report, OPA updates',
    tip: 'Every project—even a cancelled one—must go through formal closure, lessons learned archiving, and resource release.'
  },
  'Plan Scope Management': {
    pg: 'Planning', ka: 'Scope', ch: 4,
    purpose: 'Creates a scope management plan that documents how project and product scope will be defined, validated, and controlled.',
    inputs: 'Project charter, PM plan, EEFs, OPAs',
    tools: 'Expert judgment, Data analysis (alternatives), Meetings',
    outputs: 'Scope management plan, Requirements management plan',
    tip: 'The Scope Management Plan explains HOW scope will be managed; it does not contain the scope itself.'
  },
  'Collect Requirements': {
    pg: 'Planning', ka: 'Scope', ch: 4,
    purpose: 'Determines, documents, and manages stakeholder needs and requirements to meet project objectives.',
    inputs: 'Project charter, PM plan, Project documents (stakeholder register, assumption log), Business documents, Agreements, EEFs, OPAs',
    tools: 'Expert judgment, Data gathering (brainstorming, interviews, focus groups, questionnaires, benchmarking), Decision making, Prototypes, Context diagrams',
    outputs: 'Requirements documentation, Requirements traceability matrix (RTM)',
    tip: 'The Requirements Traceability Matrix (RTM) links each requirement to business objectives and test cases.'
  },
  'Define Scope': {
    pg: 'Planning', ka: 'Scope', ch: 4,
    purpose: 'Develops a detailed description of the project and product, including explicit exclusions.',
    inputs: 'Project charter, PM plan, Project documents (assumption log, requirements docs, risk register), EEFs, OPAs',
    tools: 'Expert judgment, Data analysis (alternatives), Decision making, Interpersonal skills (facilitation), Product analysis',
    outputs: 'Project scope statement, Project document updates',
    tip: 'The Project Scope Statement explicitly states what is OUT of scope to prevent scope creep.'
  },
  'Create WBS': {
    pg: 'Planning', ka: 'Scope', ch: 4,
    purpose: 'Subdivides project deliverables and work into smaller, more manageable components down to work packages.',
    inputs: 'PM plan (scope mgmt plan), Project documents (scope statement, requirements docs), EEFs, OPAs',
    tools: 'Expert judgment, Decomposition',
    outputs: 'Scope baseline (Scope Statement + WBS + WBS Dictionary), Project document updates',
    tip: 'Follows the 100% Rule: the WBS includes 100% of the work defined by the project scope—no more, no less.'
  },
  'Validate Scope': {
    pg: 'Monitoring & Controlling', ka: 'Scope', ch: 12,
    purpose: 'Formalizes acceptance of the completed project deliverables by the customer or sponsor.',
    inputs: 'PM plan, Project documents (lessons learned, quality reports, RTM), Verified deliverables, Work performance data',
    tools: 'Inspection, Decision making (voting)',
    outputs: 'Accepted deliverables, Work performance information, Change requests, Project document updates',
    tip: 'Control Quality happens FIRST (verifies correctness) -> then Validate Scope (customer formal acceptance).'
  },
  'Control Scope': {
    pg: 'Monitoring & Controlling', ka: 'Scope', ch: 12,
    purpose: 'Monitors the status of project and product scope and manages changes to the scope baseline.',
    inputs: 'PM plan (scope baseline), Project documents (RTM, lessons learned), Work performance data, OPAs',
    tools: 'Data analysis (variance analysis, trend analysis)',
    outputs: 'Work performance information, Change requests, PM plan/doc updates',
    tip: 'Protects against uncontrolled scope creep and gold plating.'
  },
  'Plan Schedule Management': {
    pg: 'Planning', ka: 'Schedule', ch: 5,
    purpose: 'Establishes the policies, procedures, and documentation for planning, developing, executing, and controlling the schedule.',
    inputs: 'Project charter, PM plan, EEFs, OPAs',
    tools: 'Expert judgment, Data analysis (alternatives), Meetings',
    outputs: 'Schedule management plan',
    tip: 'Sets the scheduling methodology, units of measure, and control thresholds.'
  },
  'Define Activities': {
    pg: 'Planning', ka: 'Schedule', ch: 5,
    purpose: 'Identifies and documents the specific actions to be performed to produce the project deliverables.',
    inputs: 'PM plan (schedule mgmt plan, scope baseline), EEFs, OPAs',
    tools: 'Expert judgment, Decomposition, Rolling wave planning, Meetings',
    outputs: 'Activity list, Activity attributes, Milestone list, Change requests, PM plan updates',
    tip: 'Rolling wave planning elaborates near-term work in detail while keeping far-term work at a high level.'
  },
  'Sequence Activities': {
    pg: 'Planning', ka: 'Schedule', ch: 5,
    purpose: 'Identifies and documents relationships among the project activities.',
    inputs: 'PM plan, Project documents (activity list, attributes, assumption log, milestone list), EEFs, OPAs',
    tools: 'Precedence Diagramming Method (PDM: FS, SS, FF, SF), Dependency determination (mandatory, discretionary, external, internal), Leads & lags',
    outputs: 'Project schedule network diagrams, Project document updates',
    tip: 'Finish-to-Start (FS) is the most common dependency; leads accelerate a successor, lags delay it.'
  },
  'Estimate Activity Durations': {
    pg: 'Planning', ka: 'Schedule', ch: 5,
    purpose: 'Estimates the number of work periods needed to complete individual activities with estimated resources.',
    inputs: 'PM plan, Project documents (activity list, attributes, resource calendars, risk register), EEFs, OPAs',
    tools: 'Expert judgment, Analogous, Parametric, Three-point (PERT), Bottom-up estimating, Data analysis, Decision making',
    outputs: 'Duration estimates, Basis of estimates, Project document updates',
    tip: 'Watch out for Parkinson\'s Law (work expands to fill time) and Student Syndrome (procrastination until deadline).'
  },
  'Develop Schedule': {
    pg: 'Planning', ka: 'Schedule', ch: 5,
    purpose: 'Analyzes activity sequences, durations, resource requirements, and constraints to create the schedule model.',
    inputs: 'PM plan, Project documents (network diagrams, duration estimates, resource calendars), Agreements, EEFs, OPAs',
    tools: 'Schedule network analysis, Critical Path Method (CPM), Resource optimization (leveling vs smoothing), Leads & lags, Schedule compression (crashing, fast tracking), Agile release planning',
    outputs: 'Schedule baseline, Project schedule, Schedule data, Project calendars, Change requests',
    tip: 'Crashing adds resources/cost to critical path tasks; Fast Tracking runs sequential tasks in parallel (adds rework risk).'
  },
  'Control Schedule': {
    pg: 'Monitoring & Controlling', ka: 'Schedule', ch: 13,
    purpose: 'Monitors the status of the project to update the project schedule and manage changes to the schedule baseline.',
    inputs: 'PM plan (schedule baseline), Project documents (schedule data, project calendars), Work performance data, OPAs',
    tools: 'Data analysis (EVM, iteration burndown, performance reviews, trend, variance, what-if), Critical path method, Resource optimization, Schedule compression',
    outputs: 'Work performance information, Schedule forecasts, Change requests, PM plan/doc updates',
    tip: 'In Agile, Control Schedule tracks velocity and burndown/burnup charts across iterations.'
  },
  'Plan Cost Management': {
    pg: 'Planning', ka: 'Cost', ch: 6,
    purpose: 'Defines how project costs will be estimated, budgeted, managed, monitored, and controlled.',
    inputs: 'Project charter, PM plan, EEFs, OPAs',
    tools: 'Expert judgment, Data analysis (alternatives), Meetings',
    outputs: 'Cost management plan',
    tip: 'Defines precision, accuracy levels (ROM -25% to +75%, Definitive -5% to +10%), and EVM rules.'
  },
  'Estimate Costs': {
    pg: 'Planning', ka: 'Cost', ch: 6,
    purpose: 'Develops an approximation of the cost of resources needed to complete project work.',
    inputs: 'PM plan, Project documents (lessons learned, project schedule, resource requirements, risk register), EEFs, OPAs',
    tools: 'Expert judgment, Analogous, Parametric, Bottom-up, Three-point estimating, Data analysis (alternatives, reserve, Cost of Quality)',
    outputs: 'Cost estimates, Basis of estimates, Project document updates',
    tip: 'Bottom-up estimating is the most accurate (and most time-consuming); Analogous is fastest/least accurate.'
  },
  'Determine Budget': {
    pg: 'Planning', ka: 'Cost', ch: 6,
    purpose: 'Aggregates the estimated costs of individual activities or work packages to establish an authorized cost baseline.',
    inputs: 'PM plan, Project documents (cost estimates, basis of estimates, schedule, risk register), Business documents, Agreements, EEFs, OPAs',
    tools: 'Expert judgment, Cost aggregation, Data analysis (reserve analysis), Historical information review, Funding limit reconciliation, Financing',
    outputs: 'Cost baseline, Project funding requirements, Project document updates',
    tip: 'Cost Baseline = Activity Estimates + Contingency Reserve. Project Budget = Cost Baseline + Management Reserve (PM needs sponsor approval for Management Reserve).'
  },
  'Control Costs': {
    pg: 'Monitoring & Controlling', ka: 'Cost', ch: 13,
    purpose: 'Monitors the status of the project to update project costs and manage changes to the cost baseline.',
    inputs: 'PM plan (cost baseline), Project documents (lessons learned), Project funding requirements, Work performance data, OPAs',
    tools: 'Expert judgment, Data analysis (EVM: CPI, SPI, EAC, ETC, VAC, TCPI; variance & trend analysis), PMIS',
    outputs: 'Work performance information, Cost forecasts, Change requests, PM plan/doc updates',
    tip: 'CPI < 1.0 means over budget; SPI < 1.0 means behind schedule.'
  },
  'Plan Quality Management': {
    pg: 'Planning', ka: 'Quality', ch: 7,
    purpose: 'Identifies quality requirements and standards for the project and its deliverables, and documents compliance.',
    inputs: 'Project charter, PM plan, Project documents (risk register, stakeholder register, RTM), EEFs, OPAs',
    tools: 'Expert judgment, Data gathering (benchmarking, brainstorming, interviews), Cost-benefit, Cost of Quality (COQ), Decision making, Mind mapping, Test & inspection planning',
    outputs: 'Quality management plan, Quality metrics, PM plan/doc updates',
    tip: 'Prevention over inspection: Cost of Conformance (training, testing) is far cheaper than Cost of Nonconformance (rework, warranty, recalls).'
  },
  'Manage Quality': {
    pg: 'Executing', ka: 'Quality', ch: 9,
    purpose: 'Translates the quality management plan into executable quality activities (Quality Assurance / process compliance).',
    inputs: 'PM plan, Project documents (lessons learned, quality control measurements, quality metrics, risk report), OPAs',
    tools: 'Data gathering (checklists), Data analysis (root cause, process analysis), Decision making, Audits, Design for X, Problem solving, Quality improvement (PDCA)',
    outputs: 'Quality reports, Test & evaluation documents, Change requests, PM plan/doc updates',
    tip: 'Manage Quality = process-focused (Quality Assurance / audits). Control Quality = deliverable-focused (inspection).'
  },
  'Control Quality': {
    pg: 'Monitoring & Controlling', ka: 'Quality', ch: 12,
    purpose: 'Monitors and records results of executing quality activities to assess performance and ensure deliverables are complete and correct.',
    inputs: 'PM plan, Project documents, Approved change requests, Deliverables, Work performance data, EEFs, OPAs',
    tools: 'Data gathering (checklists, statistical sampling), Data analysis, Inspection, Testing/product evaluations, Data representation (cause-and-effect, control charts, histograms, scatter)',
    outputs: 'Quality control measurements, Verified deliverables, Work performance information, Change requests',
    tip: 'Rule of Seven on a Control Chart: 7 consecutive points on one side of the mean indicates a non-random, assignable cause.'
  },
  'Plan Resource Management': {
    pg: 'Planning', ka: 'Resource', ch: 6,
    purpose: 'Defines how to estimate, acquire, manage, and utilize team and physical resources.',
    inputs: 'Project charter, PM plan, Project documents (schedule, requirements, risk register, stakeholder register), EEFs, OPAs',
    tools: 'Expert judgment, Data representation (hierarchical org charts, RACI matrix, text-oriented), Organizational theory, Meetings',
    outputs: 'Resource management plan, Team charter, Project document updates',
    tip: 'The Team Charter establishes working agreements, ground rules, communication norms, and conflict resolution expectations.'
  },
  'Estimate Activity Resources': {
    pg: 'Planning', ka: 'Resource', ch: 6,
    purpose: 'Estimates team resources and the type and quantities of materials, equipment, and supplies needed to perform work.',
    inputs: 'PM plan, Project documents (activity list, attributes, resource calendars, cost estimates, risk register), EEFs, OPAs',
    tools: 'Expert judgment, Bottom-up, Analogous, Parametric estimating, Data analysis (alternatives), PMIS, Meetings',
    outputs: 'Resource requirements, Basis of estimates, Resource breakdown structure (RBS), Project document updates',
    tip: 'RBS (Resource Breakdown Structure) categorizes resources by type (labor, material, equipment).'
  },
  'Acquire Resources': {
    pg: 'Executing', ka: 'Resource', ch: 10,
    purpose: 'Obtains team members, facilities, equipment, materials, supplies, and other resources necessary to complete work.',
    inputs: 'PM plan, Project documents (project schedule, resource calendars, requirements, stakeholder register), EEFs, OPAs',
    tools: 'Decision making (multicriteria), Interpersonal skills (negotiation), Pre-assignment, Virtual teams',
    outputs: 'Physical resource assignments, Project team assignments, Resource calendars, Change requests',
    tip: 'PMs often negotiate with functional managers (in matrix orgs) or external vendors to secure skilled resources.'
  },
  'Develop Team': {
    pg: 'Executing', ka: 'Resource', ch: 10,
    purpose: 'Improves competencies, team member interaction, and overall team environment to enhance project performance.',
    inputs: 'PM plan, Project documents (lessons learned, schedule, team assignments, team charter), EEFs, OPAs',
    tools: 'Colocation, Virtual teams, Communication technology, Interpersonal skills (conflict mgmt, EI, motivation, team building), Recognition & rewards, Training, Individual & team assessments',
    outputs: 'Team performance assessments, Change requests, PM plan/doc updates, EEF/OPA updates',
    tip: 'Tuckman Ladder: Forming -> Storming -> Norming -> Performing -> Adjourning. Training & team building move teams forward.'
  },
  'Manage Team': {
    pg: 'Executing', ka: 'Resource', ch: 10,
    purpose: 'Tracks team member performance, provides feedback, resolves issues, and manages team changes to optimize performance.',
    inputs: 'PM plan, Project documents (issue log, lessons learned, team assignments, team charter), Work performance reports, Team performance assessments, EEFs, OPAs',
    tools: 'Interpersonal & team skills (conflict management, decision making, emotional intelligence, influencing, leadership), PMIS',
    outputs: 'Change requests, PM plan/doc updates, EEF updates',
    tip: 'Conflict resolution: Collaborate/Problem-Solve is best (win-win); Force/Direct is worst (win-lose, emergency only).'
  },
  'Control Resources': {
    pg: 'Monitoring & Controlling', ka: 'Resource', ch: 13,
    purpose: 'Ensures that physical resources assigned and allocated to the project are available as planned and monitors planned vs. actual utilization.',
    inputs: 'PM plan, Project documents (issue log, lessons learned, physical resource assignments, schedule, RBS), Work performance data, Agreements, OPAs',
    tools: 'Data analysis (alternatives, cost-benefit, performance reviews, trend), Problem solving, Interpersonal skills (negotiation, influencing), PMIS',
    outputs: 'Work performance information, Change requests, PM plan/doc updates',
    tip: 'Control Resources applies to PHYSICAL resources (equipment, materials, facilities)—not human team members (handled in Manage Team).'
  },
  'Plan Communications Management': {
    pg: 'Planning', ka: 'Communications', ch: 8,
    purpose: 'Develops an appropriate approach and plan for project communication activities based on stakeholder information needs.',
    inputs: 'Project charter, PM plan, Project documents (requirements, stakeholder register), EEFs, OPAs',
    tools: 'Expert judgment, Communication requirements analysis (n(n-1)/2 channels), Communication technology, Models (interactive, sender-receiver), Methods (push, pull, interactive), Meetings',
    outputs: 'Communications management plan, PM plan/doc updates',
    tip: 'Communication channels = n(n-1)/2. Adding just a few stakeholders dramatically increases complexity.'
  },
  'Manage Communications': {
    pg: 'Executing', ka: 'Communications', ch: 11,
    purpose: 'Ensures timely and appropriate collection, creation, distribution, storage, retrieval, management, monitoring, and disposition of project information.',
    inputs: 'PM plan, Project documents (change log, issue log, lessons learned, quality reports, risk report, stakeholder register), Work performance reports, EEFs, OPAs',
    tools: 'Communication technology, Methods, Skills (competence, feedback, nonverbal, presentations), PMIS, Project reporting, Meetings',
    outputs: 'Project communications, PM plan/doc updates, OPA updates',
    tip: 'Interactive communication (live meetings/calls) is best for complex or sensitive topics because it confirms understanding.'
  },
  'Monitor Communications': {
    pg: 'Monitoring & Controlling', ka: 'Communications', ch: 14,
    purpose: 'Ensures the information needs of the project and its stakeholders are met.',
    inputs: 'PM plan, Project documents (issue log, lessons learned, project communications), Work performance data, EEFs, OPAs',
    tools: 'Expert judgment, PMIS, Data representation (stakeholder engagement assessment matrix), Interpersonal skills, Meetings',
    outputs: 'Work performance information, Change requests, PM plan/doc updates',
    tip: 'If stakeholders complain they are out of the loop, review/update the Communications Management Plan here.'
  },
  'Plan Risk Management': {
    pg: 'Planning', ka: 'Risk', ch: 7,
    purpose: 'Defines how to conduct risk management activities for a project, including risk appetite, thresholds, and RBS.',
    inputs: 'Project charter, PM plan, Project documents (stakeholder register), EEFs, OPAs',
    tools: 'Expert judgment, Data analysis (stakeholder analysis), Meetings',
    outputs: 'Risk management plan',
    tip: 'Defines probability & impact scales and risk tolerance BEFORE individual risks are identified.'
  },
  'Identify Risks': {
    pg: 'Planning', ka: 'Risk', ch: 7,
    purpose: 'Identifies individual project risks as well as sources of overall project risk, and documents their characteristics.',
    inputs: 'PM plan, Project documents (assumption log, cost/duration estimates, issue log, lessons learned, requirements, stakeholder register), Agreements, EEFs, OPAs',
    tools: 'Expert judgment, Data gathering (brainstorming, checklists, interviews), Data analysis (root cause, assumption/constraint, SWOT, document), Prompt lists, Meetings',
    outputs: 'Risk register, Risk report, Project document updates',
    tip: 'Everyone on the team and key stakeholders should participate in risk identification throughout the project.'
  },
  'Perform Qualitative Risk Analysis': {
    pg: 'Planning', ka: 'Risk', ch: 7,
    purpose: 'Prioritizes individual project risks for further analysis or action by assessing their probability of occurrence and impact.',
    inputs: 'PM plan, Project documents (assumption log, risk register, stakeholder register), EEFs, OPAs',
    tools: 'Expert judgment, Data gathering (interviews), Data analysis (risk data quality, probability & impact assessment), Risk categorization, Probability & impact matrix, Meetings',
    outputs: 'Project document updates (risk register priority rankings, risk report)',
    tip: 'Qualitative analysis is fast, subjective, and prioritizes risks; Quantitative analysis is numerical (EMV, Monte Carlo).'
  },
  'Perform Quantitative Risk Analysis': {
    pg: 'Planning', ka: 'Risk', ch: 7,
    purpose: 'Numerically analyzes the combined effect of identified individual project risks and other sources of uncertainty on overall project objectives.',
    inputs: 'PM plan, Project documents (assumption log, basis of estimates, cost/schedule forecasts, risk register, risk report), EEFs, OPAs',
    tools: 'Expert judgment, Data gathering (interviews), Simulations (Monte Carlo), Sensitivity analysis (Tornado diagram), Decision tree analysis (EMV), Influence diagrams',
    outputs: 'Project document updates (risk report with P50/P80/P95 probabilistic forecasts)',
    tip: 'Not every project needs Quantitative Risk Analysis—often reserved for high-stakes or complex projects.'
  },
  'Plan Risk Responses': {
    pg: 'Planning', ka: 'Risk', ch: 7,
    purpose: 'Develops options, selects strategies, and agrees on actions to address overall project risk exposure and individual risks.',
    inputs: 'PM plan, Project documents (lessons learned, project schedule, team assignments, resource calendars, risk register, risk report, stakeholder register), EEFs, OPAs',
    tools: 'Expert judgment, Data gathering, Threats (Escalate, Avoid, Transfer, Mitigate, Accept), Opportunities (Escalate, Exploit, Share, Enhance, Accept), Contingent response strategies',
    outputs: 'Change requests, PM plan/doc updates (risk register with risk owners, triggers, fallback plans, secondary/residual risks)',
    tip: 'Every major risk needs an assigned Risk Owner and a agreed strategy. Mitigate reduces probability/impact; Transfer shifts financial impact (e.g., insurance/FFP).'
  },
  'Implement Risk Responses': {
    pg: 'Executing', ka: 'Risk', ch: 9,
    purpose: 'Implements agreed-upon risk response plans when triggers occur.',
    inputs: 'PM plan, Project documents (lessons learned, risk register, risk report), OPAs',
    tools: 'Expert judgment, Interpersonal skills (influencing), PMIS',
    outputs: 'Change requests, Project document updates (issue log, lessons learned, risk register)',
    tip: 'A common pitfall is planning risk responses and then failing to execute them; this process ensures risk owners take action.'
  },
  'Monitor Risks': {
    pg: 'Monitoring & Controlling', ka: 'Risk', ch: 12,
    purpose: 'Monitors the implementation of agreed-upon risk response plans, tracks identified risks, identifies new risks, and evaluates risk process effectiveness.',
    inputs: 'PM plan, Project documents (issue log, lessons learned, risk register, risk report), Work performance data, Work performance reports',
    tools: 'Data analysis (technical performance analysis, reserve analysis), Audits (risk audits), Meetings',
    outputs: 'Work performance information, Change requests, PM plan/doc updates, OPA updates',
    tip: 'Risk Audits evaluate the effectiveness of the risk management process itself; Reserve Analysis checks if contingency reserves are still adequate.'
  },
  'Plan Procurement Management': {
    pg: 'Planning', ka: 'Procurement', ch: 6,
    purpose: 'Documents project procurement decisions, specifies the approach, and identifies potential sellers.',
    inputs: 'Project charter, Business documents, PM plan, Project documents (milestone list, team assignments, requirements, risk register, stakeholder register), EEFs, OPAs',
    tools: 'Expert judgment, Data gathering (market research), Make-or-buy analysis, Source selection analysis, Meetings',
    outputs: 'Procurement management plan, Procurement strategy, Bid documents (RFP, RFQ, IFB), Procurement SOW, Source selection criteria, Make-or-buy decisions, Independent cost estimates',
    tip: 'Contract types: FFP puts cost risk on the seller; Cost-Reimbursable (CPFF/CPIF) puts cost risk on the buyer.'
  },
  'Conduct Procurements': {
    pg: 'Executing', ka: 'Procurement', ch: 9,
    purpose: 'Obtains seller responses, selects a seller, and awards a contract.',
    inputs: 'PM plan, Project documents, Procurement documentation, Seller proposals, EEFs, OPAs',
    tools: 'Expert judgment, Advertising, Bidder conferences, Data analysis (proposal evaluation), Interpersonal skills (negotiation)',
    outputs: 'Selected sellers, Agreements (contracts), Change requests, PM plan/doc updates',
    tip: 'Bidder conferences ensure all prospective sellers receive the exact same answers and no one gets unfair insider info.'
  },
  'Control Procurements': {
    pg: 'Monitoring & Controlling', ka: 'Procurement', ch: 15,
    purpose: 'Manages procurement relationships, monitors contract performance, makes changes/corrections, and closes out contracts.',
    inputs: 'PM plan, Project documents, Agreements, Procurement documentation, Approved change requests, Work performance data, EEFs, OPAs',
    tools: 'Expert judgment, Claims administration, Data analysis (performance reviews, EVM, trend), Inspection, Audits',
    outputs: 'Closed procurements, Work performance information, Procurement doc updates, Change requests, PM plan/doc updates',
    tip: 'Contract disputes follow: Negotiation first -> Mediation/Arbitration (ADR) -> Litigation last.'
  },
  'Identify Stakeholders': {
    pg: 'Initiating', ka: 'Stakeholders', ch: 3,
    purpose: 'Identifies project stakeholders regularly and analyzes/documents their interests, involvement, interdependencies, influence, and potential impact.',
    inputs: 'Project charter, Business documents, PM plan, Project documents, Agreements, EEFs, OPAs',
    tools: 'Expert judgment, Data gathering, Data analysis (stakeholder analysis, document analysis), Data representation (power/interest grid, salience model, stakeholder cube), Meetings',
    outputs: 'Stakeholder register, Change requests, PM plan/doc updates',
    tip: 'Performed in Initiating AND continuously throughout the project whenever new stakeholders emerge.'
  },
  'Plan Stakeholder Engagement': {
    pg: 'Planning', ka: 'Stakeholders', ch: 8,
    purpose: 'Develops approaches to involve project stakeholders based on their needs, expectations, interests, and potential impact.',
    inputs: 'Project charter, PM plan, Project documents (assumption log, change log, issue log, schedule, risk register, stakeholder register), Agreements, EEFs, OPAs',
    tools: 'Expert judgment, Data gathering (benchmarking), Data analysis (assumption/constraint, root cause), Decision making, Stakeholder engagement assessment matrix (Unaware, Resistant, Neutral, Supportive, Leading), Meetings',
    outputs: 'Stakeholder engagement plan',
    tip: 'Use the Stakeholder Engagement Assessment Matrix to compare Current (C) vs Desired (D) engagement levels.'
  },
  'Manage Stakeholder Engagement': {
    pg: 'Executing', ka: 'Stakeholders', ch: 11,
    purpose: 'Communicates and works with stakeholders to meet their needs and expectations, address issues, and foster appropriate engagement.',
    inputs: 'PM plan, Project documents (change log, issue log, lessons learned, stakeholder register), EEFs, OPAs',
    tools: 'Expert judgment, Communication skills (feedback), Interpersonal skills (conflict mgmt, cultural awareness, negotiation, observation, political awareness), Ground rules, Meetings',
    outputs: 'Change requests, PM plan/doc updates',
    tip: 'Proactively engage resistant or high-power stakeholders face-to-face to build trust and resolve concerns early.'
  },
  'Monitor Stakeholder Engagement': {
    pg: 'Monitoring & Controlling', ka: 'Stakeholders', ch: 14,
    purpose: 'Monitors project stakeholder relationships and tailors strategies for engaging stakeholders through modification of engagement strategies and plans.',
    inputs: 'PM plan, Project documents (issue log, lessons learned, project communications, risk register, stakeholder register), Work performance data, EEFs, OPAs',
    tools: 'Data analysis (alternatives, root cause, stakeholder analysis), Decision making, Data representation (engagement assessment matrix), Communication skills, Interpersonal skills, Meetings',
    outputs: 'Work performance information, Change requests, PM plan/doc updates',
    tip: 'Tracks whether engagement strategies are actually working and adjusts them if stakeholder attitudes shift.'
  }
};

export const DNAME = { P: 'Process', E: 'People', B: 'Business' };
export const CHN = {1:'Framework',2:'Environment',3:'Initiating',4:'Scope',5:'Schedule',6:'Resources, cost, procurement',7:'Quality and risk',8:'Comms and stakeholder planning',9:'Executing',10:'Team resources',11:'Comms and stakeholder engagement',12:'Monitoring work',13:'Scope, schedule, resource control',14:'Stakeholder monitoring',15:'Closing'};

export const FIELD_GUIDES = {
  cpm: {
    title: 'CPM Network & Schedule Fields Explained',
    summary: 'The Critical Path Method (CPM) calculates the longest path through dependent tasks to find minimum project duration and schedule flexibility (float).',
    fields: [
      ['Input Format (ID | Name | Dur | Predecessors)', 'Each line defines a task. Use "-" if there are no predecessors, or comma-separated IDs (e.g., A, B) for multiple dependencies.'],
      ['ES (Early Start) & EF (Early Finish)', 'Calculated in the Forward Pass: EF = ES + Duration. Shows the earliest a task can start/finish without delaying predecessors.'],
      ['LS (Late Start) & LF (Late Finish)', 'Calculated in the Backward Pass from project finish: LS = LF - Duration. Shows the latest a task can start/finish without delaying the project.'],
      ['TF (Total Float / Slack)', 'TF = LS - ES (or LF - EF). Tasks with TF = 0 lie on the Critical Path—any delay directly delays the project finish date.'],
      ['Crashing vs. Fast Tracking', 'Crashing adds resources/cost to critical path tasks; Fast Tracking runs sequential tasks in parallel (adds rework risk).']
    ]
  },
  evm: {
    title: 'Earned Value Management (EVM) Fields & Metrics Explained',
    summary: 'EVM integrates scope, schedule, and cost baselines to measure objective project performance and forecast final cost.',
    fields: [
      ['BAC (Budget at Completion)', 'Total authorized baseline budget for the entire project (excluding Management Reserve).'],
      ['PV (Planned Value)', 'Authorized budget assigned to scheduled work up to the status date (what SHOULD have been done).'],
      ['EV (Earned Value)', 'Measure of work actually performed, expressed in terms of the approved budget (BAC × % Complete).'],
      ['AC (Actual Cost)', 'Realized cost actually incurred in performing the work up to the status date.'],
      ['CV (EV − AC) & SV (EV − PV)', 'Negative = unfavorable (over budget / behind schedule). Positive = favorable (under budget / ahead of schedule).'],
      ['CPI (EV ÷ AC) & SPI (EV ÷ PV)', 'Efficiency ratios. ≥ 1.0 is favorable; < 1.0 means cost overrun (CPI) or schedule delay (SPI).'],
      ['EAC & TCPI', 'EAC (Typical = BAC ÷ CPI) forecasts total cost if current performance continues. TCPI = (BAC − EV) ÷ (BAC − AC) is the efficiency needed to hit BAC.']
    ]
  },
  risk: {
    title: 'Risk Lab & Monte Carlo Fields Explained',
    summary: 'Quantitative Risk Analysis models combined uncertainty across all risks to size contingency reserves objectively.',
    fields: [
      ['Probability (0.0 – 1.0)', 'Likelihood the risk event occurs (e.g., 0.30 = 30% chance).'],
      ['Impact ($)', 'Estimated cost impact if the risk materializes.'],
      ['EMV (Expected Monetary Value)', 'EMV = Probability × Impact. Sum of all EMVs gives the deterministic baseline reserve.'],
      ['1,000 Stochastic Trials', 'Monte Carlo randomly simulates 1,000 possible project futures, triggering each risk according to its probability.'],
      ['P50 / P80 / P95 Percentiles', 'P80 means 80% of simulated outcomes cost this amount or less—a standard confidence target for Contingency Reserve.']
    ]
  },
  method: {
    title: 'Kanban, Stacey Matrix & Burndown Fields Explained',
    summary: 'Select the right delivery cadence (Predictive, Agile, or Hybrid) and manage flow using WIP limits and burn charts.',
    fields: [
      ['WIP Limit (Work in Progress)', 'Maximum items allowed in a column (e.g., 2). Enforcing WIP limits exposes bottlenecks and reduces cycle time (Little\'s Law).'],
      ['Stacey Matrix Axes', 'Plots Requirements Certainty (X) vs. Technical/Approach Uncertainty (Y). Simple = Predictive; Complicated/Complex = Agile/Hybrid.'],
      ['Sprint Length & Committed Points', 'Timebox duration (days) and total story points planned at Sprint Planning.'],
      ['Actual Pace (% of Ideal)', 'Team velocity relative to the ideal linear burndown slope (< 100% indicates carryover risk).'],
      ['Mid-Sprint Scope Creep (+Pts)', 'Unplanned points added mid-sprint—visible as an upward spike on the burndown chart.']
    ]
  },
  formulas: {
    title: 'PERT, Communication Channels & PTA Fields Explained',
    summary: 'High-yield PMP® quantitative formulas for estimating, stakeholder complexity, and fixed-price incentive contracts.',
    fields: [
      ['O, M, P (PERT 3-Point)', 'Optimistic (best case), Most Likely (realistic), Pessimistic (worst case). PERT Beta Mean = (O + 4M + P) ÷ 6; Triangular = (O + M + P) ÷ 3.'],
      ['Standard Deviation (1σ) & Bands', 'σ = (P − O) ÷ 6. Confidence intervals: 1σ = 68.2%, 2σ = 95.4%, 3σ = 99.7%.'],
      ['Communication Channels', 'n(n − 1) ÷ 2 where n = total stakeholders. Shows how fast communication overhead grows as a team scales.'],
      ['FPIF PTA (Point of Total Assumption)', 'PTA = ((Ceiling Price − Target Price) ÷ Buyer Share %) + Target Cost. Above PTA, the seller bears 100% of additional cost overruns.']
    ]
  },
  stake: {
    title: 'Stakeholder Power/Interest Matrix Explained',
    summary: 'Prioritize engagement effort based on each stakeholder\'s authority (Power) and concern (Interest).',
    fields: [
      ['High Power, High Interest (Manage Closely)', 'Key decision makers & sponsors—engage frequently, involve in decisions, and address concerns proactively.'],
      ['High Power, Low Interest (Keep Satisfied)', 'Executives or regulators—provide concise high-level updates without overwhelming them with detail.'],
      ['Low Power, High Interest (Keep Informed)', 'End users or adjacent teams—keep updated via newsletters, demos, and open channels.'],
      ['Low Power, Low Interest (Monitor)', 'Minimal effort—monitor periodically in case their power or interest shifts.']
    ]
  }
};

export const PRINCIPLE_DETAILS = [
  { app: 'Be accountable for project outcomes, resources, and ethical compliance even when delegating tasks.', trap: 'Stewardship is NOT micromanagement; it includes financial, social, and environmental responsibility.' },
  { app: 'Build a psychologically safe, self-organizing team environment with clear shared agreements.', trap: 'Avoid top-down command-and-control when a team is capable of collaborative problem solving.' },
  { app: 'Identify and engage stakeholders early and continuously; tailor communication to their needs.', trap: 'Never ignore a resistant stakeholder—meet to understand their concerns and address root causes.' },
  { app: 'Align every deliverable and decision to measurable business value, not just completing tasks on time.', trap: 'A project on time and on budget still fails if it does not deliver the intended business value.' },
  { app: 'Recognize how your project interacts with enterprise systems, operations, and external markets.', trap: 'Changes in one subsystem (e.g., compliance or vendor API) ripple across the entire project.' },
  { app: 'Adapt your leadership style (servant, coaching, directive) to team maturity and situation.', trap: 'Servant leadership means removing impediments and empowering the team, not abdication.' },
  { app: 'Tailor processes, artifacts, and cadence to project size, risk, and organizational culture.', trap: 'Never blindly apply all 49 processes; tailor what adds value and drop what creates waste.' },
  { app: 'Build quality in from the start (prevention over inspection) using clear Definition of Done and metrics.', trap: 'Inspecting defects at the end (Cost of Nonconformance) is far more expensive than preventing them.' },
  { app: 'Use iterative learning, prototyping, and decoupling when navigating high technical or requirements complexity.', trap: 'Do not force rigid upfront baselines on a complex, ambiguous problem.' },
  { app: 'Proactively identify threats and opportunities, size reserves, and monitor risk triggers continuously.', trap: 'Risk management is not a one-time planning step; new risks emerge throughout execution.' },
  { app: 'Design feedback loops and short increments so the team can pivot when assumptions change.', trap: 'Adaptability does not mean uncontrolled scope creep—changes still align to value and governance.' },
  { app: 'Prepare stakeholders for transition using change models (e.g., ADKAR, Kotter) and clear communication.', trap: 'Technical delivery without user adoption and operational readiness fails to realize benefits.' }
];

export const STUDY_RESOURCES = [
  { title: 'PMI® PMP® Certification Official Page', org: 'Project Management Institute', url: 'https://www.pmi.org/certifications/project-management-pmp', desc: 'Official exam eligibility, application process, fees, and handbook.' },
  { title: 'PMP® Exam Content Outline (ECO)', org: 'PMI®', url: 'https://www.pmi.org/certifications/project-management-pmp/earn-the-pmp/pmp-exam-prep', desc: 'Official domain weights (People 42%, Process 50%, Business Environment 8%) and task breakdown.' },
  { title: 'PMBOK® Guide – 7th Edition & Standards+', org: 'PMI®', url: 'https://www.pmi.org/pmbok-guide-standards/foundational/pmbok', desc: 'The 12 Principles, 8 Performance Domains, Tailoring, and Models/Methods/Artifacts.' },
  { title: 'Agile Practice Guide', org: 'PMI® & Agile Alliance', url: 'https://www.pmi.org/pmbok-guide-standards/practice-guides/agile', desc: 'Essential reference for Agile, Hybrid, Scrum, Kanban, and servant leadership on the PMP® exam.' },
  { title: 'The Scrum Guide (Official)', org: 'Scrum.org', url: 'https://scrumguides.org/scrum-guide.html', desc: 'Concise 13-page official definition of Scrum roles, events, artifacts, and commitments.' },
  { title: 'PMI® Code of Ethics and Professional Conduct', org: 'PMI®', url: 'https://www.pmi.org/about/ethics/code', desc: 'Responsibility, Respect, Fairness, and Honesty—frequently tested in situational questions.' }
];
