// Extended Market-Standard PMP® Question Bank
// Covers People (heavy to balance 42% ECO weight), Process (50%), Business Environment (8%)
// Includes Situational Scenarios (s:1), Multi-Select (type:'multi'), and Matching (type:'match')
// with per-option distractor rationales (r) and PMBOK®/Agile Practice Guide citations (ref).

export const EXTENDED_QUIZ = [
  // === PEOPLE DOMAIN (Situational, Servant Leadership, Conflict, Tuckman, Stakeholders, Hybrid Teams) ===
  {
    d: "E", c: 10, s: 1,
    q: "During a sprint retrospective, two senior developers argue heatedly about code review standards, causing quieter team members to withdraw. What should the project manager do FIRST?",
    o: [
      "Escalate the behavioral issue to their functional managers immediately",
      "Facilitate a structured discussion establishing ground rules and psychological safety",
      "Assign the two developers to separate modules so they do not interact",
      "Take over code review approvals personally for the next two sprints"
    ],
    a: 1,
    r: [
      "Escalating immediately undermines team autonomy and psychological safety.",
      "Correct: A servant leader sets ground rules and fosters psychological safety so all voices are heard.",
      "Separating them avoids the root conflict instead of resolving it (Smoothing/Withdrawal).",
      "Command-and-control micromanagement violates Agile self-organization."
    ],
    e: "Establishing team ground rules and psychological safety enables constructive conflict resolution without escalating prematurely.",
    ref: "PMBOK® 7th Ed. (Team Domain) · Agile Practice Guide"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A high-performing Agile team recently welcomed three new contractors. Velocity has dropped by 30% and daily standups are running over 25 minutes. According to Tuckman's ladder, what stage is the team likely in, and what should the PM do?",
    o: [
      "Storming/Forming — coach the team, clarify working agreements, and reinforce the 15-minute timebox",
      "Performing — remove the contractors because they are slowing velocity",
      "Adjourning — close the sprint early and re-baseline the release",
      "Norming — stop holding daily standups until velocity stabilizes"
    ],
    a: 0,
    r: [
      "Correct: Adding members resets Tuckman's stages toward Forming/Storming; coaching and working agreements restore flow.",
      "Removing contractors prematurely ignores the natural Tuckman reset.",
      "Adjourning is for project/phase closure, not team onboarding.",
      "Canceling Daily Scrums removes the team's key daily inspection/adaptation event."
    ],
    e: "When team composition changes, teams revert to Forming/Storming. Servant leaders coach, clarify working agreements, and protect timeboxes.",
    ref: "PMBOK® Process Groups (Develop Team)"
  },
  {
    d: "E", c: 11, s: 1,
    q: "A key stakeholder repeatedly bypasses the Product Owner and emails developers directly to add 'small UI tweaks' mid-sprint. What should the project manager do?",
    o: [
      "Instruct developers to ignore all emails from external stakeholders",
      "Add the tweaks to the current sprint to keep the stakeholder satisfied",
      "Meet with the stakeholder to explain the backlog refinement and change flow through the Product Owner",
      "Log a formal disciplinary complaint with the project sponsor"
    ],
    a: 2,
    r: [
      "Telling developers to ignore stakeholders damages relationships and engagement.",
      "Unvetted mid-sprint additions cause scope creep and disrupt sprint commitments.",
      "Correct: Educating the stakeholder on governance and channeling requests through the PO protects the sprint while maintaining engagement.",
      "Escalating before having a direct coaching conversation is premature."
    ],
    e: "The PM protects the team from mid-sprint scope creep by coaching stakeholders on proper Product Backlog governance.",
    ref: "Agile Practice Guide (Servant Leadership)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A virtual team spans three time zones (US, UK, India). Team members in India report feeling excluded from architectural decisions made during US afternoon calls. What should the project manager do NEXT?",
    o: [
      "Require the India team to join calls at midnight local time",
      "Rotate meeting times and adopt asynchronous decision logs with a shared collaboration board",
      "Let the US team make all architecture decisions since they are closest to the sponsor",
      "Eliminate all synchronous meetings permanently"
    ],
    a: 1,
    r: [
      "Forcing one region to bear all timezone burden creates burnout and resentment.",
      "Correct: Rotating overlap windows and using asynchronous documentation ensures equitable inclusion.",
      "Excluding a sub-team destroys psychological safety and shared ownership.",
      "Some synchronous touchpoints are still valuable when scheduled fairly."
    ],
    e: "Virtual teams require intentional inclusion: rotating meeting times and asynchronous decision records.",
    ref: "PMBOK® 7th Ed. (Team Performance Domain)"
  },
  {
    d: "E", c: 8, s: 1,
    q: "During stakeholder analysis, you discover a newly appointed compliance director has high power over regulatory sign-off but currently shows low interest in your project. How should you manage this stakeholder?",
    o: [
      "Monitor only with minimal effort via quarterly newsletters",
      "Keep Satisfied — provide concise, targeted compliance updates and consult on regulatory gates",
      "Manage Closely — invite them to every daily standup",
      "Exclude them from the stakeholder register until testing begins"
    ],
    a: 1,
    r: [
      "Monitor is for Low Power / Low Interest stakeholders.",
      "Correct: High Power + Low Interest maps to 'Keep Satisfied'—avoid surprises without overwhelming them.",
      "Inviting a low-interest executive to daily standups causes disengagement.",
      "All stakeholders with decision authority must be registered early."
    ],
    e: "High-power, low-interest stakeholders belong in the Keep Satisfied quadrant.",
    ref: "PMBOK® Process Groups (Plan Stakeholder Engagement)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A skilled developer consistently misses sprint commitments because she is spending 40% of her time helping junior teammates debug issues. What should the project manager do FIRST?",
    o: [
      "Reprimand the developer for failing to meet her individual story point target",
      "Meet privately to understand the situation, recognize her mentoring value, and adjust capacity/pairing norms with the team",
      "Forbid her from helping junior teammates until the release is complete",
      "Reduce her performance rating at the end of the iteration"
    ],
    a: 1,
    r: [
      "Punishing collaborative behavior harms team culture.",
      "Correct: Investigate privately first, value mentoring, and make pairing/mentoring capacity explicit in sprint planning.",
      "Banning mentoring leaves junior developers blocked and slows overall team throughput.",
      "Performance ratings should not be used punitively without coaching and capacity visibility."
    ],
    e: "In Agile, team throughput matters more than individual output. Make mentoring capacity visible rather than penalizing it.",
    ref: "PMBOK® 7th Ed. (Leadership & Team)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "Two technical leads disagree on whether to use a relational or NoSQL database. Both options meet non-functional requirements, and the debate has stalled design for 3 days. Which conflict resolution technique yields the most sustainable outcome?",
    o: [
      "Forcing — the PM unilaterally picks the relational database",
      "Smoothing — tell both leads to stop arguing and focus on harmony",
      "Collaborating / Problem-Solving — facilitate a criteria-based trade-off analysis (spike/decision matrix) with both leads",
      "Withdrawal — postpone the database decision until UAT"
    ],
    a: 2,
    r: [
      "Forcing creates win-lose resentment and ignores technical expertise.",
      "Smoothing only masks the disagreement temporarily.",
      "Correct: Collaborating/Problem-Solving uses objective criteria to reach consensus and commitment.",
      "Postponing a foundational architecture decision until UAT creates massive rework."
    ],
    e: "Collaborating (problem-solving) integrates viewpoints using objective data for a win-win resolution.",
    ref: "PMBOK® Process Groups (Manage Team)"
  },
  {
    d: "E", c: 11, s: 1,
    q: "A stakeholder who was previously 'Resistant' on the Stakeholder Engagement Assessment Matrix needs to be moved to 'Supportive' before User Acceptance Testing. What should the project manager do?",
    o: [
      "Send them the 120-page project management plan",
      "Hold a 1-on-1 listening session to uncover their underlying concerns and co-create a mitigation/involvement plan",
      "Ask the sponsor to remove them from the project",
      "Wait until UAT starts so they can see the finished product"
    ],
    a: 1,
    r: [
      "Dumping raw documentation rarely changes resistance.",
      "Correct: Active listening and targeted engagement address root concerns and build buy-in.",
      "Removing a legitimate stakeholder is rarely possible and ignores real business risk.",
      "Waiting until UAT risks rejection at the worst possible moment."
    ],
    e: "Shifting a resistant stakeholder requires empathetic discovery of their concerns and tailored engagement.",
    ref: "PMBOK® Process Groups (Manage Stakeholder Engagement)"
  },
  {
    d: "E", c: 10, type: "multi", s: 1,
    q: "A newly formed hybrid project team has low trust and unclear handoffs between predictive hardware engineers and Agile software developers. Which TWO actions should the project manager take? (Choose TWO)",
    o: [
      "Co-create a Team Charter defining communication norms, handoff cadences, and conflict rules",
      "Establish shared integration milestones and a joint visual board (Kanban) for cross-team dependencies",
      "Convert the hardware team to 1-week Scrum sprints immediately",
      "Keep the two sub-teams completely separated so they don't slow each other down",
      "Report all minor misunderstandings directly to HR"
    ],
    a: [0, 1],
    r: [
      "Correct: A Team Charter aligns expectations, values, and communication norms.",
      "Correct: Shared integration milestones and visual boards synchronize hybrid dependencies.",
      "Forcing 1-week sprints on physical hardware fabrication is usually impractical.",
      "Siloing teams worsens integration failures.",
      "Escalating minor misunderstandings to HR destroys trust."
    ],
    e: "Team Charters and shared dependency boards align hybrid teams without forcing unnatural cadences.",
    ref: "PMBOK® 7th Ed. (Team & Tailoring)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "Mid-project, a key subject matter expert (SME) gives two weeks' notice. What should the project manager do FIRST?",
    o: [
      "Halt all project work until a replacement is hired",
      "Assess the impact on critical path/deliverables, initiate structured knowledge transfer, and check the Resource Management Plan",
      "Ask the sponsor to deny the SME's resignation",
      "Reassign all of the SME's tasks to the most junior developer"
    ],
    a: 1,
    r: [
      "Halting all work unnecessarily delays unaffected workstreams.",
      "Correct: Evaluate impact, capture tacit knowledge immediately, and follow resource/risk plans.",
      "A PM cannot legally or practically block an employee's resignation.",
      "Dumping complex work on a junior member without transfer creates quality failure."
    ],
    e: "Immediate knowledge transfer and impact assessment mitigate attrition risk.",
    ref: "PMBOK® Process Groups (Manage Project Knowledge / Acquire Resources)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "During a retrospective, the team identifies that unclear acceptance criteria caused three stories to fail QA. What is the BEST action for the team to take?",
    o: [
      "Blame the QA engineer for being too strict",
      "Update the Definition of Ready (DoR) to require testable acceptance criteria before sprint entry",
      "Stop writing acceptance criteria to move faster",
      "Extend the sprint length from 2 weeks to 4 weeks"
    ],
    a: 1,
    r: [
      "Blame violates psychological safety and retrospective purpose.",
      "Correct: Strengthening the Definition of Ready prevents ambiguous stories from entering the sprint.",
      "Removing acceptance criteria increases rework.",
      "Longer sprints hide quality issues rather than fixing the root cause."
    ],
    e: "Improving the Definition of Ready directly addresses unclear story inputs.",
    ref: "Agile Practice Guide (Retrospectives)"
  },
  {
    d: "E", c: 11, s: 1,
    q: "A project manager notices a team member's emotional intelligence (EQ) is high: she senses when teammates are stressed and de-escalates tense meetings. Which leadership competency is she demonstrating?",
    o: [
      "Coercive power",
      "Social awareness and relationship management",
      "Earned value forecasting",
      "Autocratic decision-making"
    ],
    a: 1,
    r: [
      "Coercive power relies on threats/punishment.",
      "Correct: Recognizing others' emotions and managing relationships are core EQ competencies.",
      "EVM is a quantitative cost/schedule technique.",
      "Autocratic decision-making ignores team input."
    ],
    e: "Emotional intelligence encompasses self-awareness, self-regulation, motivation, empathy/social awareness, and social skills.",
    ref: "PMBOK® 7th Ed. (Leadership Styles)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A product owner is unavailable for three consecutive sprint reviews due to competing operational duties, causing delayed feedback and rework. What should the project manager do?",
    o: [
      "Cancel all future sprint reviews",
      "Discuss the impact with the Product Owner and sponsor to ensure dedicated PO availability or an empowered proxy",
      "Act as the Product Owner permanently without telling anyone",
      "Release increments to production without stakeholder review"
    ],
    a: 1,
    r: [
      "Skipping Sprint Reviews removes essential customer feedback loops.",
      "Correct: Address the systemic impediment by engaging the PO and sponsor to secure decision-making capacity.",
      "The PM should not silently assume PO accountability for product value.",
      "Unreviewed releases risk delivering the wrong product."
    ],
    e: "Servant leaders remove organizational impediments such as an overloaded Product Owner.",
    ref: "Agile Practice Guide (Agile Roles)"
  },
  {
    d: "E", c: 10, type: "match", s: 1,
    q: "Match each Tuckman team development stage to the project manager's primary leadership focus:",
    pairs: [
      ["Forming", "Provide clear direction, roles, and project vision"],
      ["Storming", "Facilitate conflict resolution and build trust"],
      ["Norming", "Support collaboration and shared working agreements"],
      ["Performing", "Delegate autonomy and remove external impediments"]
    ],
    e: "Leadership style adapts as the team matures: Directing (Forming) → Coaching (Storming) → Supporting (Norming) → Delegating (Performing).",
    ref: "PMBOK® Process Groups (Develop Team)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "An Agile team member wants to try a new automated testing framework that could save 5 hours per sprint, but it requires a 2-day learning curve. What should the project manager do?",
    o: [
      "Reject the idea because it is not in the original WBS",
      "Support a timeboxed spike or experimentation capacity so the team can validate the improvement",
      "Tell the developer to learn it on weekends only",
      "Submit a formal change request to the Change Control Board (CCB)"
    ],
    a: 1,
    r: [
      "Rigidly blocking process improvements contradicts continuous improvement.",
      "Correct: Empowering the team with a small timeboxed spike fosters continuous improvement and ownership.",
      "Expecting unpaid weekend work hurts morale.",
      "Internal engineering tooling improvements do not require CCB scope approval."
    ],
    e: "Servant leaders empower teams to experiment and continuously improve their engineering practices.",
    ref: "PMBOK® 7th Ed. (Stewardship & Team)"
  },
  {
    d: "E", c: 11, s: 1,
    q: "You are leading a global project with stakeholders from high-context and low-context cultures. One stakeholder says 'That will be very challenging' during a milestone review. What should you do?",
    o: [
      "Assume they agreed to the deadline and move on",
      "Probe respectfully for specifics, as indirect phrasing may signal a serious blocker or 'no' in high-context cultures",
      "Ask them to speak more bluntly in front of the entire group",
      "Remove them from the meeting invite"
    ],
    a: 1,
    r: [
      "Taking indirect refusals at face value can hide major risks.",
      "Correct: Cultural intelligence means recognizing indirect communication and following up respectfully.",
      "Publicly demanding bluntness can cause loss of face and shut down communication.",
      "Excluding stakeholders increases risk."
    ],
    e: "Cultural awareness helps PMs decode indirect feedback and follow up safely.",
    ref: "PMBOK® 7th Ed. (Stakeholder Domain)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A project team is demoralized after a major client rejected a prototype. What is the BEST way for the project manager to respond?",
    o: [
      "Identify which developer wrote the flawed feature so they learn from it",
      "Reframe the rejection as early, low-cost learning, protect the team from blame, and facilitate a collaborative pivot",
      "Cancel the next sprint and start from scratch",
      "Tell the client they misunderstood the requirements"
    ],
    a: 1,
    r: [
      "Blaming individuals destroys psychological safety.",
      "Correct: Agile prototyping exists to fail fast and learn cheaply; the PM shields the team and guides adaptation.",
      "Canceling without learning wastes the feedback.",
      "Blaming the client damages trust."
    ],
    e: "Early prototype feedback is a win for risk reduction—support the team and adapt.",
    ref: "PMBOK® 7th Ed. (Adaptability & Resilience)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "Which type of power is generally MOST effective for a project manager in a weak matrix organization where they have limited formal authority?",
    o: [
      "Penalty (Coercive) power",
      "Expert and Referent power (influence through competence, trust, and relationships)",
      "Legitimate power only",
      "Reward power through salary raises"
    ],
    a: 1,
    r: [
      "Coercive power breeds compliance at best and resentment at worst.",
      "Correct: Expert and referent power build voluntary buy-in when formal authority is low.",
      "In a weak matrix, legitimate authority sits mostly with functional managers.",
      "PMs rarely control base salaries in matrixed organizations."
    ],
    e: "Expert and referent power are the most sustainable forms of influence in matrixed environments.",
    ref: "PMBOK® Process Groups (Manage Team)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "During sprint planning, the Product Owner pressures the team to commit to 45 story points even though their rolling 4-sprint average velocity is 30 points. What should the project manager do?",
    o: [
      "Agree to 45 points and ask the team to work overtime",
      "Coach the Product Owner on empirical velocity forecasting and protect the team's sustainable pace",
      "Split every story in half so the point total looks smaller",
      "Let the team commit to 45 points and fail so the PO learns a lesson"
    ],
    a: 1,
    r: [
      "Mandated overtime causes burnout and technical debt.",
      "Correct: Empirical velocity guides realistic commitments and sustainable pace.",
      "Inflating or manipulating story points corrupts velocity metrics.",
      "Setting the team up to fail erodes morale and trust."
    ],
    e: "Velocity is a capacity measurement, not a target to be inflated by pressure.",
    ref: "Agile Practice Guide (Sprint Planning)"
  },
  {
    d: "E", c: 11, s: 1,
    q: "A senior executive requests daily 1-page status emails for a low-risk internal tooling project. What should the project manager do?",
    o: [
      "Automate or tailor a concise dashboard/digest and confirm their actual information need in the Communications Management Plan",
      "Refuse the request because weekly reports are standard",
      "Send raw Jira exports every evening",
      "Ask the team to spend 1 hour daily writing custom executive memos"
    ],
    a: 0,
    r: [
      "Correct: Understand the underlying information need and tailor lightweight reporting.",
      "Flatly refusing a senior stakeholder creates friction.",
      "Raw exports overwhelm rather than inform.",
      "Manual daily memos waste team capacity."
    ],
    e: "Tailor communications to stakeholder needs without overloading the delivery team.",
    ref: "PMBOK® Process Groups (Plan Communications Management)"
  },
  {
    d: "E", c: 10, type: "multi", s: 1,
    q: "Which TWO behaviors best demonstrate Servant Leadership by a project manager on an Agile project? (Choose TWO)",
    o: [
      "Removing organizational blockers slowing down the team",
      "Assigning individual daily tasks to each developer every morning",
      "Shielding the team from mid-sprint scope interruptions",
      "Reporting team members who ask questions during retrospectives",
      "Making all technical architecture decisions unilaterally"
    ],
    a: [0, 2],
    r: [
      "Correct: Impediment removal is a core servant leadership duty.",
      "Teams self-organize and pull their own tasks.",
      "Correct: Protecting team focus enables predictable delivery.",
      "Discouraging questions destroys psychological safety.",
      "Teams own technical decisions collaboratively."
    ],
    e: "Servant leaders focus on impediment removal, coaching, and protecting the team's focus.",
    ref: "Agile Practice Guide (Servant Leadership)"
  },

  // === PROCESS DOMAIN (Situational, Hybrid, Change Control, Risk, Quality, Procurement, Closure) ===
  {
    d: "P", c: 12, s: 1,
    q: "On a predictive project, a key stakeholder asks the project manager to add a new reporting screen. The developer says it will only take 4 hours. What should the project manager do FIRST?",
    o: [
      "Approve the 4-hour change immediately because it is negligible",
      "Submit a formal change request and assess its full impact on scope, schedule, cost, and quality",
      "Tell the stakeholder the scope is frozen and cannot change",
      "Ask the developer to build it quietly over lunch"
    ],
    a: 1,
    r: [
      "Bypassing change control causes uncontrolled scope creep ('gold plating').",
      "Correct: Even small changes on a predictive baseline must go through Perform Integrated Change Control.",
      "Refusing without evaluation ignores potential business value.",
      "Hidden work corrupts baselines and cost tracking."
    ],
    e: "All baseline changes in predictive projects follow Integrated Change Control: log, assess impact, and get CCB/authorized approval.",
    ref: "PMBOK® Process Groups (Perform Integrated Change Control)"
  },
  {
    d: "P", c: 7, s: 1,
    q: "During execution, a previously identified risk occurs—a critical API vendor raises prices by 20%. The risk was documented in the Risk Register with an approved contingency plan. What should the project manager do NEXT?",
    o: [
      "Request Management Reserve from the sponsor",
      "Implement the planned risk response and draw from the Contingency Reserve",
      "Perform Qualitative Risk Analysis again",
      "Wait until project closure to document the cost variance"
    ],
    a: 1,
    r: [
      "Management Reserve is for unknown-unknowns, not identified risks.",
      "Correct: Known-unknowns have Contingency Reserves controlled by the PM; execute the planned response.",
      "The risk has already materialized into an issue—action is needed now.",
      "Waiting hides cost impacts from stakeholders."
    ],
    e: "Contingency reserves cover identified (known-unknown) risks and are within the PM's authority.",
    ref: "PMBOK® Process Groups (Implement Risk Responses)"
  },
  {
    d: "P", c: 6, s: 1,
    q: "Your project has BAC = $200,000, PV = $100,000, EV = $80,000, and AC = $100,000. Assuming current cost efficiency continues, what is the Estimate at Completion (EAC)?",
    o: ["$220,000", "$250,000", "$180,000", "$200,000"],
    a: 1,
    r: [
      "$220,000 is the atypical EAC formula: AC + (BAC - EV) = 100k + 120k.",
      "Correct: CPI = EV / AC = 80k / 100k = 0.80. Typical EAC = BAC / CPI = 200k / 0.80 = $250,000.",
      "$180,000 underestimates total cost.",
      "$200,000 is the original BAC."
    ],
    e: "When current CPI is expected to continue, use EAC = BAC ÷ CPI = 200,000 ÷ 0.80 = $250,000.",
    ref: "PMBOK® Process Groups (Control Costs)"
  },
  {
    d: "P", c: 7, s: 1,
    q: "Quality Control inspections reveal a sudden spike in software defects in the checkout module. What tool helps the team identify which 20% of defect categories are causing 80% of the failures?",
    o: [
      "Pareto chart",
      "Control chart",
      "Monte Carlo simulation",
      "RACI matrix"
    ],
    a: 0,
    r: [
      "Correct: A Pareto chart ranks defect categories by frequency to prioritize the 'vital few' (80/20 rule).",
      "Control charts monitor process stability over time against upper/lower limits.",
      "Monte Carlo models quantitative cost/schedule risk distributions.",
      "RACI defines roles and responsibilities."
    ],
    e: "Pareto charts apply the 80/20 rule to prioritize the biggest quality drivers.",
    ref: "PMBOK® Process Groups (Control Quality)"
  },
  {
    d: "P", c: 4, s: 1,
    q: "A customer inspects a completed deliverable during Validate Scope and rejects it because a button color doesn't match the brand guide, even though internal QA passed it. What should the project manager do?",
    o: [
      "Close the project anyway since internal QA passed",
      "Document the formal non-acceptance, log a change/defect request to fix it, and re-verify before re-submitting",
      "Tell the customer they missed their chance during planning",
      "Ask the sponsor to override the customer"
    ],
    a: 1,
    r: [
      "Unaccepted deliverables cannot be closed as complete.",
      "Correct: Validate Scope produces either Accepted Deliverables or Change Requests with documented reasons for non-acceptance.",
      "Adversarial responses harm client relationships.",
      "Overriding customer acceptance criteria violates scope governance."
    ],
    e: "Control Quality checks correctness (internal); Validate Scope obtains formal customer acceptance.",
    ref: "PMBOK® Process Groups (Validate Scope)"
  },
  {
    d: "P", c: 6, s: 1,
    q: "You are negotiating a contract for R&D software where requirements are highly uncertain and expected to evolve rapidly. Which contract type places the LEAST risk on the seller and is most appropriate when scope cannot be clearly defined upfront?",
    o: [
      "Firm Fixed Price (FFP)",
      "Fixed Price Incentive Fee (FPIF)",
      "Cost Plus Fixed Fee (CPFF) or Time & Materials (T&M) with a not-to-exceed cap",
      "Purchase Order for fixed units"
    ],
    a: 2,
    r: [
      "FFP places maximum cost risk on the seller and fails when scope changes constantly.",
      "FPIF still requires a well-defined target cost and scope.",
      "Correct: Cost-reimbursable (CPFF) or capped T&M supports evolving R&D scope.",
      "Unit POs are for commodity items."
    ],
    e: "When scope is uncertain, cost-reimbursable or capped T&M contracts avoid excessive change-order friction.",
    ref: "PMBOK® Process Groups (Plan Procurement Management)"
  },
  {
    d: "P", c: 5, s: 1,
    q: "Your project is 3 weeks behind schedule, and the sponsor insists on meeting the original launch date. Budget is tightly constrained, and no additional funds are available. Which schedule compression technique should you evaluate FIRST?",
    o: [
      "Crashing — hire three additional senior contractors at overtime rates",
      "Fast-tracking — overlap sequential critical-path activities where feasible while managing added rework risk",
      "Resource leveling — spread tasks out to reduce daily workload",
      "Gold plating — add extra features to compensate for the delay"
    ],
    a: 1,
    r: [
      "Crashing requires extra budget, which is unavailable here.",
      "Correct: Fast-tracking compresses the schedule without adding direct labor cost, though it increases risk.",
      "Resource leveling typically extends the schedule rather than compressing it.",
      "Gold plating wastes time and adds unapproved scope."
    ],
    e: "With zero extra budget, fast-tracking (parallelizing critical path tasks) is preferred over crashing.",
    ref: "PMBOK® Process Groups (Develop Schedule)"
  },
  {
    d: "P", c: 15, s: 1,
    q: "A project is terminated early by the sponsor due to shifting market strategy. Deliverables are 60% complete. What should the project manager do?",
    o: [
      "Stop work immediately and delete all project files",
      "Execute formal closure procedures: document completion status, archive lessons learned, settle procurements, and release resources",
      "Continue working until 100% complete so the team's effort isn't wasted",
      "Skip lessons learned since the project was canceled"
    ],
    a: 1,
    r: [
      "Abruptly stopping without closure leaves contracts open and knowledge lost.",
      "Correct: Even canceled projects must go through Close Project or Phase to capture lessons and formally transfer/archive work.",
      "Continuing work after sponsor termination wastes company funds.",
      "Canceled projects often yield the most valuable lessons learned."
    ],
    e: "Close Project or Phase applies to both completed and prematurely terminated projects.",
    ref: "PMBOK® Process Groups (Close Project or Phase)"
  },
  {
    d: "P", c: 7, type: "match", s: 1,
    q: "Match each Risk Response Strategy for Threats (negative risks) to its example:",
    pairs: [
      ["Avoid", "Remove a risky third-party feature from scope to eliminate the threat"],
      ["Transfer", "Purchase cyber-liability insurance or use a fixed-price vendor warranty"],
      ["Mitigate", "Add automated load testing to reduce the probability of an outage"],
      ["Accept", "Set aside a contingency reserve and take no proactive action unless triggered"]
    ],
    e: "Threats use Escalate, Avoid, Transfer, Mitigate, or Accept; Opportunities use Escalate, Exploit, Share, Enhance, or Accept.",
    ref: "PMBOK® Process Groups (Plan Risk Responses)"
  },
  {
    d: "P", c: 9, s: 1,
    q: "A Kanban team notices 6 work items stuck in the 'QA Testing' column while developers keep pulling new stories into 'In Progress'. What should the team do FIRST?",
    o: [
      "Increase the QA column WIP limit from 2 to 10",
      "Enforce WIP limits, stop starting new dev work, and swarm on clearing the QA bottleneck",
      "Skip QA testing for low-priority stories",
      "Switch immediately from Kanban to Waterfall"
    ],
    a: 1,
    r: [
      "Raising WIP limits hides bottlenecks and increases cycle time (Little's Law).",
      "Correct: Kanban's core principle is 'stop starting, start finishing'—swarm to clear the bottleneck.",
      "Skipping QA creates technical debt and production defects.",
      "Changing frameworks mid-stream doesn't solve a capacity bottleneck."
    ],
    e: "Respecting WIP limits and swarming on bottlenecks improves flow efficiency and lowers cycle time.",
    ref: "Agile Practice Guide (Kanban)"
  },
  {
    d: "P", c: 6, s: 1,
    q: "A Fixed-Price Incentive Fee (FPIF) contract has Target Cost = $100,000, Target Fee = $15,000, Ceiling Price = $130,000, and Buyer/Seller share ratio = 75/25. What is the Point of Total Assumption (PTA)?",
    o: ["$115,000", "$120,000", "$130,000", "$125,000"],
    a: 1,
    r: [
      "$115,000 is the Target Price (Target Cost + Target Fee).",
      "Correct: PTA = ((Ceiling − Target Price) ÷ Buyer Share) + Target Cost = ((130k − 115k) ÷ 0.75) + 100k = 20k + 100k = $120,000.",
      "$130,000 is the Ceiling Price.",
      "$125,000 is an incorrect calculation."
    ],
    e: "PTA = ((Ceiling − Target Price) ÷ Buyer Share) + Target Cost = $120,000.",
    ref: "PMBOK® Procurement Management"
  },
  {
    d: "P", c: 7, s: 1,
    q: "A project team is debating whether to spend $12,000 on automated regression testing vs. keeping manual testing. Manual testing has a 30% chance of missing a production bug that would cost $60,000 to fix. Using EMV, which option is better?",
    o: [
      "Manual testing (EMV = -$18,000)",
      "Automated regression testing (cost = -$12,000 vs. expected manual loss -$18,000)",
      "Both cost the exact same",
      "Skip testing entirely"
    ],
    a: 1,
    r: [
      "Manual testing has an expected loss of 0.30 × $60,000 = $18,000.",
      "Correct: Spending $12,000 is cheaper than the $18,000 expected monetary loss.",
      "$12,000 ≠ $18,000.",
      "Skipping testing exposes the project to even higher failure costs."
    ],
    e: "EMV = 0.30 × $60,000 = $18,000 expected loss, which exceeds the $12,000 investment in automation.",
    ref: "PMBOK® Process Groups (Perform Quantitative Risk Analysis)"
  },
  {
    d: "P", c: 12, type: "multi", s: 1,
    q: "A project manager is reviewing an S-curve and notices AC is well above EV, and EV is below PV. Which TWO conclusions are accurate? (Choose TWO)",
    o: [
      "The project is over budget (CPI < 1.0)",
      "The project is ahead of schedule (SPI > 1.0)",
      "The project is behind schedule (SPI < 1.0)",
      "The project is under budget (CV > 0)",
      "The project will definitely finish early"
    ],
    a: [0, 2],
    r: [
      "Correct: AC > EV means Cost Variance (EV − AC) is negative, so CPI < 1.0 (over budget).",
      "EV < PV means behind schedule, not ahead.",
      "Correct: EV < PV means Schedule Variance (EV − PV) is negative, so SPI < 1.0 (behind schedule).",
      "AC > EV means over budget.",
      "Nothing indicates an early finish."
    ],
    e: "EV < AC indicates a cost overrun; EV < PV indicates a schedule delay.",
    ref: "PMBOK® 7th Ed. (Measurement Performance Domain)"
  },
  {
    d: "P", c: 3, s: 1,
    q: "A project sponsor verbally asks a project manager to kick off a new data migration initiative immediately because 'the board already discussed it.' No Project Charter exists. What should the project manager do FIRST?",
    o: [
      "Start assigning developers to coding tasks right away",
      "Facilitate creating and getting formal sign-off on the Project Charter before committing major execution resources",
      "Create the WBS and schedule baseline first",
      "Refuse to speak to the sponsor until a vendor contract is signed"
    ],
    a: 1,
    r: [
      "Executing without a charter leaves the PM with no formal authority or agreed objectives.",
      "Correct: The Project Charter formally authorizes the project and grants the PM authority to apply organizational resources.",
      "WBS and schedule baseline belong to Planning, after the charter is authorized.",
      "Collaborate with the sponsor to draft the charter rather than refusing communication."
    ],
    e: "The Project Charter is the formal authorization document that starts the project and empowers the PM.",
    ref: "PMBOK® Process Groups (Develop Project Charter)"
  },
  {
    d: "P", c: 5, s: 1,
    q: "Activity A (duration 5d) is followed by Activity B (duration 6d) and Activity C (duration 4d) in parallel, both feeding Activity D (duration 3d). What is the Total Float of Activity C?",
    o: ["0 days", "2 days", "4 days", "6 days"],
    a: 1,
    r: [
      "Activity B is on the critical path (0 float), not C.",
      "Correct: Path A-B-D = 5+6+3 = 14d. Path A-C-D = 5+4+3 = 12d. Float of C = 14 − 12 = 2 days.",
      "4 days is C's duration, not its float.",
      "6 days is B's duration."
    ],
    e: "Total Float = Critical Path duration (14) − Path through C (12) = 2 days.",
    ref: "PMBOK® Process Groups (Develop Schedule)"
  },
  {
    d: "P", c: 7, s: 1,
    q: "A team uses a Monte Carlo simulation on its project schedule and finds the deterministic critical path finishes in 40 days, while the P80 Monte Carlo finish is 48 days. What should the project manager recommend?",
    o: [
      "Promise stakeholders the 40-day date with zero buffer",
      "Use the 8-day difference as a schedule contingency reserve to achieve 80% confidence",
      "Ignore Monte Carlo because CPM is always exact",
      "Delete all non-critical tasks from the schedule"
    ],
    a: 1,
    r: [
      "Deterministic CPM ignores merge bias and duration uncertainty.",
      "Correct: P80 provides an 80% statistical confidence buffer for schedule contingency.",
      "Monte Carlo complements CPM by modeling uncertainty across parallel paths.",
      "Deleting tasks removes required scope."
    ],
    e: "Monte Carlo P80 quantifies the contingency buffer needed to counter schedule merge bias and uncertainty.",
    ref: "PMBOK® 7th Ed. (Uncertainty Domain)"
  },
  {
    d: "P", c: 13, s: 1,
    q: "During a Sprint, the team discovers a critical security vulnerability in a third-party library used by an already-completed feature. What should the Product Owner and team do?",
    o: [
      "Wait until the end of the entire release in 6 months to fix it",
      "Reprioritize the Product Backlog (or address it via an urgent defect item/Definition of Done gate) before releasing",
      "Hide the vulnerability from stakeholders",
      "Delete the feature without telling the Product Owner"
    ],
    a: 1,
    r: [
      "Shipping known critical security flaws violates Definition of Done and compliance.",
      "Correct: Product Backlog prioritization and DoD quality gates ensure critical defects are addressed promptly.",
      "Hiding security risks is unethical and dangerous.",
      "Scope changes require Product Owner collaboration."
    ],
    e: "Agile teams maintain releasable quality through the Definition of Done and dynamic backlog reprioritization.",
    ref: "PMBOK® 7th Ed. (Delivery & Quality)"
  },

  // === BUSINESS ENVIRONMENT DOMAIN (Benefits, Compliance, Value, Governance, Tailoring) ===
  {
    d: "B", c: 2, s: 1,
    q: "Midway through a 12-month software project, a new data privacy regulation takes effect that requires encrypting user logs—a capability not in the original scope. What should the project manager do FIRST?",
    o: [
      "Ignore the regulation because the project baseline was approved earlier",
      "Assess the compliance impact on scope/cost/schedule, log a change request, and review with the sponsor/CCB",
      "Wait until project closure and hand it off to operations",
      "Cancel the project immediately"
    ],
    a: 1,
    r: [
      "Regulatory compliance is mandatory; shipping non-compliant software exposes the organization to legal risk.",
      "Correct: Compliance changes must be assessed for impact and processed through formal change governance.",
      "Deploying non-compliant software violates governance.",
      "Assess impact before assuming cancellation is needed."
    ],
    e: "External regulatory changes (EEFs) require immediate impact analysis and formal change control.",
    ref: "PMP® ECO (Business Environment: Compliance)"
  },
  {
    d: "B", c: 1, s: 1,
    q: "A project finishes on time and under budget, yet six months later the organization realizes almost none of the projected revenue increase materialized. What was MOST likely missing?",
    o: [
      "A Gantt chart",
      "Benefits Realization Management and alignment of deliverables to business outcomes",
      "Daily standup meetings",
      "A RACI chart for developers"
    ],
    a: 1,
    r: [
      "Gantt charts track schedule, not post-delivery business value.",
      "Correct: Delivering outputs on time/budget does not guarantee outcomes unless Benefits Realization is tracked.",
      "Daily standups manage sprint execution, not long-term ROI.",
      "RACI clarifies roles, not business value."
    ],
    e: "Modern PM emphasizes outcomes and value delivery over mere schedule/budget adherence.",
    ref: "PMBOK® 7th Ed. (Value Delivery System)"
  },
  {
    d: "B", c: 2, s: 1,
    q: "A competitor launches a disruptive AI feature that makes 40% of your project's planned features obsolete. What should the project manager do?",
    o: [
      "Keep building the obsolete features because they are in the signed scope baseline",
      "Collaborate with the Product Owner and Sponsor to re-evaluate the Business Case and pivot or reprioritize value",
      "Hide the competitor's launch from the steering committee",
      "Ask the team to work double shifts to finish the obsolete features faster"
    ],
    a: 1,
    r: [
      "Building obsolete features wastes capital (sunk cost fallacy).",
      "Correct: The Business Case must remain viable throughout the project; pivot when external market conditions shift.",
      "Transparency with governance is mandatory.",
      "Working faster on the wrong product destroys value."
    ],
    e: "Projects exist to deliver business value; when the external environment invalidates assumptions, revisit the Business Case.",
    ref: "PMP® ECO (Business Environment: External Changes)"
  },
  {
    d: "B", c: 1, s: 1,
    q: "Your organization is transitioning from traditional Waterfall to Agile, and several functional managers are resisting because they fear losing visibility over budgets and timelines. How should the project manager support this organizational change?",
    o: [
      "Tell managers to stay out of Agile ceremonies",
      "Engage managers early, translate Agile metrics (burnup, cumulative flow, release forecasts) into governance visibility, and tailor a hybrid reporting bridge",
      "Force all teams to abandon budgets entirely",
      "Escalate to the CEO to replace the managers"
    ],
    a: 1,
    r: [
      "Excluding managers fuels resistance.",
      "Correct: Organizational change management requires addressing stakeholders' real governance needs with transparent metrics.",
      "Enterprises still need financial governance and forecasting.",
      "Escalating before building a bridge worsens cultural friction."
    ],
    e: "Supporting organizational change requires empathy, clear communication, and bridging Agile delivery with executive governance.",
    ref: "PMP® ECO (Business Environment: Organizational Change)"
  },
  {
    d: "B", c: 4, s: 1,
    q: "To deliver business value earlier in a 10-month ERP rollout, the sponsor asks how the project can start generating ROI by Month 4 instead of waiting until Month 10. What should the project manager recommend?",
    o: [
      "Reduce quality testing to ship faster",
      "Adopt an incremental / MVP release strategy prioritizing the highest-value modules first",
      "Eliminate stakeholder reviews",
      "Double the team size in Month 1"
    ],
    a: 1,
    r: [
      "Cutting quality creates costly defects.",
      "Correct: Incremental delivery / MVP releases high-value capabilities early to realize benefits sooner.",
      "Skipping reviews increases the risk of building the wrong solution.",
      "Brooks's Law: adding too many people early increases communication overhead."
    ],
    e: "Incremental delivery and MVP prioritization accelerate time-to-value.",
    ref: "PMBOK® 7th Ed. (Delivery Performance Domain)"
  },
  {
    d: "B", c: 1, s: 1,
    q: "During project initiation, you review the Benefits Management Plan. Who is typically accountable for ensuring the intended business benefits are actually sustained after the project hands over the deliverables?",
    o: [
      "The Scrum Master",
      "The Business Owner / Project Sponsor (in partnership with operations)",
      "The external vendor",
      "The QA Lead"
    ],
    a: 1,
    r: [
      "The Scrum Master facilitates the team's process.",
      "Correct: The Sponsor / Business Owner owns the Business Case and post-project benefits realization.",
      "Vendors deliver contracted outputs, not internal business outcomes.",
      "QA verifies deliverable quality."
    ],
    e: "While the PM delivers the capability, the Sponsor/Business Owner is accountable for ongoing benefits realization.",
    ref: "PMBOK® 7th Ed. (Value Delivery System)"
  },

  // === ADDITIONAL HIGH-YIELD MIXED SCENARIOS (People + Process) ===
  {
    d: "E", c: 10, s: 1,
    q: "A team member repeatedly arrives 15 minutes late to the Daily Standup, delaying the team. What should the project manager do FIRST?",
    o: [
      "Call him out publicly during the next standup",
      "Speak with him privately to understand if there is a scheduling conflict or impediment",
      "Move the standup to 6:00 AM",
      "Report him to HR for tardiness"
    ],
    a: 1,
    r: [
      "Public reprimands damage psychological safety.",
      "Correct: Private, empathetic 1-on-1 conversation uncovers root causes (e.g., school drop-off, timezone) without shaming.",
      "Changing to 6:00 AM penalizes the whole team.",
      "HR escalation for a minor scheduling issue is disproportionate."
    ],
    e: "Always address individual performance or attendance issues privately first.",
    ref: "PMBOK® 7th Ed. (Leadership)"
  },
  {
    d: "P", c: 7, s: 1,
    q: "During a retrospective, the team realizes a third-party cloud outage could delay deployment by 10 days. They decide to configure a multi-region failover now for $3,000. Which risk response is this?",
    o: ["Transfer", "Mitigate", "Accept", "Escalate"],
    a: 1,
    r: [
      "Transfer shifts financial impact to a third party (e.g., insurance).",
      "Correct: Adding failover reduces the probability and/or impact of the outage.",
      "Accept takes no proactive action.",
      "Escalate passes the risk above the PM's authority."
    ],
    e: "Mitigation invests upfront to reduce a risk's probability or impact.",
    ref: "PMBOK® Process Groups (Plan Risk Responses)"
  },
  {
    d: "P", c: 6, s: 1,
    q: "A project has BAC = $120,000, EV = $60,000, and AC = $75,000. What is the To-Complete Performance Index (TCPI) to finish within the original BAC?",
    o: ["0.80", "1.33", "1.20", "0.75"],
    a: 1,
    r: [
      "0.80 is the current CPI (60k / 75k).",
      "Correct: TCPI = (BAC − EV) ÷ (BAC − AC) = (120k − 60k) ÷ (120k − 75k) = 60k ÷ 45k = 1.33.",
      "1.20 is incorrect.",
      "0.75 is incorrect."
    ],
    e: "TCPI (to BAC) = (120,000 − 60,000) ÷ (120,000 − 75,000) = 1.33, meaning the team must perform 33% more efficiently to hit BAC.",
    ref: "PMBOK® Process Groups (Control Costs)"
  },
  {
    d: "E", c: 11, s: 1,
    q: "A stakeholder is confused about why an Agile project does not have a locked 18-month Gantt chart with exact feature dates. What should the project manager share to build confidence?",
    o: [
      "Tell them Gantt charts are forbidden in Agile",
      "Share a Release Roadmap with prioritized themes, empirical velocity range, and burnup forecast",
      "Fabricate exact dates for all 200 backlog items",
      "Send them the raw source code repository"
    ],
    a: 1,
    r: [
      "Dismissing stakeholder needs alienates leadership.",
      "Correct: Roadmaps and empirical burnup forecasts provide realistic visibility while preserving adaptability.",
      "Fabricating false precision violates ethics and sets up failure.",
      "Raw code does not answer timeline questions."
    ],
    e: "Agile projects communicate forecasts via release roadmaps and velocity-based burnup ranges.",
    ref: "Agile Practice Guide"
  },
  {
    d: "P", c: 5, s: 1,
    q: "An activity has Optimistic = 3 days, Most Likely = 6 days, and Pessimistic = 15 days. Using the Beta (PERT) distribution, what is the expected duration and 1σ standard deviation?",
    o: [
      "Expected = 7.0 days, 1σ = 2.0 days",
      "Expected = 8.0 days, 1σ = 2.0 days",
      "Expected = 7.0 days, 1σ = 3.0 days",
      "Expected = 6.0 days, 1σ = 1.5 days"
    ],
    a: 0,
    r: [
      "Correct: PERT = (3 + 4×6 + 15) ÷ 6 = 42 ÷ 6 = 7.0 days. SD = (15 − 3) ÷ 6 = 2.0 days.",
      "8.0 is the Triangular mean (3+6+15)/3.",
      "SD is (P−O)/6 = 2.0, not 3.0.",
      "6.0 is only the Most Likely estimate."
    ],
    e: "PERT Beta mean = (O + 4M + P) ÷ 6 = 7.0; Standard Deviation = (P − O) ÷ 6 = 2.0.",
    ref: "PMBOK® Process Groups (Estimate Activity Durations)"
  },
  {
    d: "P", c: 8, s: 1,
    q: "A project team grows from 6 to 9 people. How many NEW communication channels are added?",
    o: ["3", "15", "21", "36"],
    a: 2,
    r: [
      "3 is just the number of people added.",
      "15 is the original channel count: 6×5÷2 = 15.",
      "Correct: At n=9, channels = 9×8÷2 = 36. New channels added = 36 − 15 = 21.",
      "36 is the total channels at n=9, not the newly added channels."
    ],
    e: "Channels(9) − Channels(6) = 36 − 15 = 21 new communication channels.",
    ref: "PMBOK® Process Groups (Plan Communications Management)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A cross-functional team has finished 4 sprints together and now resolves technical blockers autonomously, delivers consistent velocity, and proactively pairs on complex stories. Which stage of Tuckman's model is this?",
    o: ["Forming", "Storming", "Norming", "Performing"],
    a: 3,
    r: [
      "Forming is early orientation with high uncertainty.",
      "Storming involves interpersonal friction and role testing.",
      "Norming is when habits solidify, before peak autonomy.",
      "Correct: Performing is characterized by high trust, autonomy, and smooth problem-solving."
    ],
    e: "Performing teams operate as a cohesive, self-organizing unit.",
    ref: "PMBOK® Process Groups (Develop Team)"
  },
  {
    d: "P", c: 14, s: 1,
    q: "Which document is updated throughout the entire project whenever new risks emerge, probabilities shift, or triggers are observed?",
    o: [
      "Project Charter",
      "Risk Register",
      "Scope Statement",
      "Contract Statement of Work"
    ],
    a: 1,
    r: [
      "The Project Charter is a static authorization artifact.",
      "Correct: The Risk Register is a living document updated continuously from Identify Risks through Monitor Risks.",
      "The Scope Statement changes only via formal change control.",
      "The SOW is part of procurement contracts."
    ],
    e: "The Risk Register is continuously updated as risks are identified, analyzed, and monitored.",
    ref: "PMBOK® Process Groups (Monitor Risks)"
  },
  {
    d: "B", c: 2, s: 1,
    q: "Your organization wants to ensure every project aligns with its new net-zero carbon sustainability mandate. Where should this constraint be captured and enforced?",
    o: [
      "Only in the final Lessons Learned report",
      "In Enterprise Environmental Factors (EEFs), Project Charter success criteria, and Tailoring/Procurement guidelines",
      "In the Daily Standup notes only",
      "Nowhere, as sustainability is outside project scope"
    ],
    a: 1,
    r: [
      "Waiting until closure cannot enforce compliance during delivery.",
      "Correct: Organizational mandates become EEFs/OPAs and shape charter objectives, procurement criteria, and tailoring.",
      "Standup notes are transient.",
      "Environmental and social stewardship is a core PMBOK® 7th Edition principle."
    ],
    e: "Organizational mandates (EEFs) should be embedded into Charter success criteria, procurement, and tailoring.",
    ref: "PMBOK® 7th Ed. (Stewardship Principle)"
  },
  {
    d: "P", c: 4, s: 1,
    q: "A project manager is creating a Work Breakdown Structure (WBS) with the team. What is the '100% Rule'?",
    o: [
      "100% of team members must work 100% of their time on one project",
      "The WBS must include 100% of the work defined by the project scope—and nothing outside it",
      "100% of tasks must be on the critical path",
      "The budget must be 100% spent before closure"
    ],
    a: 1,
    r: [
      "Resource allocation is unrelated to the WBS 100% rule.",
      "Correct: Every level of the WBS must sum to 100% of its parent's scope, capturing all deliverables and excluding out-of-scope work.",
      "Only zero-float tasks are on the critical path.",
      "Spending 100% of budget is not a goal."
    ],
    e: "The WBS 100% Rule ensures complete scope coverage without gold plating.",
    ref: "PMBOK® Process Groups (Create WBS)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A project team is co-located in an open office, and key architectural decisions often happen informally at whiteboards, leading to confusion for remote stakeholders. What Agile practice helps bridge this?",
    o: [
      "Stop using whiteboards",
      "Use information radiators / digital boards and concise decision summaries visible to everyone",
      "Require remote stakeholders to fly in daily",
      "Keep decisions secret until the end of the quarter"
    ],
    a: 1,
    r: [
      "Whiteboards are great; the gap is visibility for remote members.",
      "Correct: Digital information radiators and brief decision logs preserve osmotic communication benefits for distributed teams.",
      "Daily flights are impractical.",
      "Secrecy undermines transparency."
    ],
    e: "Digital information radiators extend the transparency of co-located boards to distributed stakeholders.",
    ref: "Agile Practice Guide"
  },
  {
    d: "P", c: 7, s: 1,
    q: "A quality audit (Manage Quality) differs from a quality inspection (Control Quality) primarily because Manage Quality focuses on:",
    o: [
      "Checking whether individual deliverables pass acceptance criteria",
      "Auditing whether the team is following effective processes and standards to prevent defects",
      "Calculating Earned Value",
      "Negotiating vendor contracts"
    ],
    a: 1,
    r: [
      "Inspecting deliverables is Control Quality.",
      "Correct: Manage Quality (Quality Assurance) focuses on process adherence and defect prevention.",
      "EVM is Cost/Schedule control.",
      "Vendor contracts belong to Procurement."
    ],
    e: "Manage Quality = process-focused (prevention/audits); Control Quality = deliverable-focused (inspection/testing).",
    ref: "PMBOK® Process Groups (Manage Quality vs. Control Quality)"
  },
  // === ADDITIONAL 30 PEOPLE (E) QUESTIONS FOR FULL 180-Q ECO WEIGHTING (42%) ===
  {
    d: "E", c: 10, s: 1,
    q: "A team member with strong technical skills is promoted to tech lead, but struggles to delegate and ends up working 70 hours a week while teammates sit idle. What should the project manager do?",
    o: [
      "Reassign him back to an individual contributor role immediately",
      "Coach him privately on delegation, trust-building, and empowering teammates rather than doing the work himself",
      "Ask the team to work 70 hours too so everyone is equal",
      "Take over his technical tasks personally"
    ],
    a: 1,
    r: [
      "Demoting without coaching wastes growth potential.",
      "Correct: Coaching on leadership transition and delegation builds team capability and prevents burnout.",
      "Matching unsustainable hours harms the entire team.",
      "Doing his work prevents him from learning leadership."
    ],
    e: "Servant leaders coach emerging leads on delegation and empowerment.",
    ref: "PMBOK® 7th Ed. (Team Domain)"
  },
  {
    d: "E", c: 11, s: 1,
    q: "Two department heads disagree on the priority of features for an enterprise portal. Both have high power and high interest. What should the project manager do?",
    o: [
      "Pick whichever department head spoke last",
      "Facilitate a joint prioritization workshop using objective business value criteria (e.g., WSJF or MoSCoW) with the Product Owner",
      "Build both sets of features in secret",
      "Remove both stakeholders from the steering committee"
    ],
    a: 1,
    r: [
      "Arbitrary selection alienates the other stakeholder.",
      "Correct: Objective value-based facilitation aligns high-power stakeholders transparently.",
      "Hidden scope violates change and budget governance.",
      "High-power stakeholders must be managed closely, not excluded."
    ],
    e: "Facilitated, criteria-driven prioritization resolves competing stakeholder demands fairly.",
    ref: "PMBOK® 7th Ed. (Stakeholder Domain)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "During a retrospective, a quiet junior tester hesitates to speak up when senior engineers dominate the conversation. Which facilitation technique should the PM use next time?",
    o: [
      "Silent brainwriting (sticky notes / digital board) followed by round-robin sharing",
      "Ask only the senior engineers for feedback to save time",
      "Cancel retrospectives and use an anonymous annual survey instead",
      "Force the junior tester to present first without warning"
    ],
    a: 0,
    r: [
      "Correct: Silent writing gives introverts and junior members equal voice before group discussion.",
      "Excluding junior voices misses critical frontline insights.",
      "Annual surveys are too slow for Agile continuous improvement.",
      "Putting someone on the spot increases anxiety."
    ],
    e: "Silent brainwriting and structured turn-taking ensure psychological safety and inclusive participation.",
    ref: "Agile Practice Guide (Retrospectives)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A Scrum team is consistently failing to finish its Sprint Backlog because external IT tickets keep interrupting developers mid-sprint. What should the project manager do?",
    o: [
      "Extend every sprint by 3 days",
      "Work with IT operations to establish a dedicated support rotation or buffer capacity and shield the rest of the team",
      "Tell developers to ignore all production incidents",
      "Double story point estimates on all stories"
    ],
    a: 1,
    r: [
      "Changing sprint length breaks cadence without fixing interruptions.",
      "Correct: A formal support buffer or rotation makes unplanned work visible and protects sprint focus.",
      "Ignoring production incidents harms customers.",
      "Inflating points masks the root impediment."
    ],
    e: "Make unplanned operational work explicit via capacity buffering or rotation while shielding sprint focus.",
    ref: "Agile Practice Guide (Servant Leadership)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A team member consistently misses deadlines on a predictive project, even though they have the right technical skills. When you meet 1-on-1, you learn they are overwhelmed by conflicting priorities from their functional manager. What should you do NEXT?",
    o: [
      "Document a performance warning with HR",
      "Meet with the functional manager to align on resource allocation and confirm the Resource Management Plan commitments",
      "Reassign all their tasks without telling them",
      "Ignore the delay until the next milestone review"
    ],
    a: 1,
    r: [
      "HR warnings don't solve a matrix allocation conflict.",
      "Correct: In a matrix organization, negotiate resource availability directly with the functional manager.",
      "Silent reassignment undermines trust.",
      "Ignoring delays risks the critical path."
    ],
    e: "Matrixed resource conflicts require direct negotiation with the functional manager.",
    ref: "PMBOK® Process Groups (Manage Team / Acquire Resources)"
  },
  {
    d: "E", c: 11, s: 1,
    q: "A key client stakeholder frequently changes their mind about UI layouts after seeing sprint demos, causing frustration for the design team. How should the PM frame this?",
    o: [
      "Lock the UI design and forbid any feedback after Sprint 1",
      "Remind the team that Agile welcomes late changes for customer competitive advantage, and channel feedback into prioritized Product Backlog items",
      "Charge the client a penalty fee for every comment",
      "Stop inviting the client to Sprint Reviews"
    ],
    a: 1,
    r: [
      "Locking out feedback defeats empirical inspection and adaptation.",
      "Correct: Late feedback is normal in Agile; the PO prioritizes changes against other backlog value.",
      "Penalizing feedback destroys collaboration.",
      "Hiding demos creates massive acceptance risk later."
    ],
    e: "Agile embraces changing requirements by routing new insights into the prioritized Product Backlog.",
    ref: "Agile Manifesto · PMBOK® 7th Ed."
  },
  {
    d: "E", c: 10, s: 1,
    q: "A project team is transitioning to a new cloud platform, and several members lack hands-on experience. What should the project manager include in the Resource Management Plan?",
    o: [
      "Replace the entire team with external consultants",
      "Targeted training, mentoring/pairing, and a short learning buffer in early iterations",
      "Skip training and expect members to learn on their own time",
      "Reduce quality standards for the first 3 months"
    ],
    a: 1,
    r: [
      "Replacing the whole team loses domain knowledge.",
      "Correct: Upskilling, pairing, and realistic ramp-up capacity are core resource development strategies.",
      "Unpaid self-study causes burnout and skill gaps.",
      "Never compromise quality standards."
    ],
    e: "Develop Team includes training, mentoring, and realistic capacity planning for skill gaps.",
    ref: "PMBOK® Process Groups (Develop Team)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "During a heated conflict over vendor selection, one team member says, 'Your proposal is completely reckless.' How should the project manager intervene?",
    o: [
      "End the meeting immediately",
      "Refocus the discussion on objective evaluation criteria and behaviors/data rather than personal attacks",
      "Side with the person who spoke louder",
      "Ask everyone to vote anonymously without discussion"
    ],
    a: 1,
    r: [
      "Ending abruptly leaves the conflict unresolved.",
      "Correct: Separate people from the problem and anchor on objective criteria.",
      "Taking sides destroys neutrality and trust.",
      "Voting without resolving criteria breeds resentment."
    ],
    e: "Effective conflict facilitation separates people from the problem and centers on shared criteria.",
    ref: "PMBOK® 7th Ed. (Team Domain)"
  },
  {
    d: "E", c: 11, s: 1,
    q: "A project has 12 stakeholders across Finance, Legal, Marketing, and Engineering. Legal insists on formal written sign-offs, while Engineering prefers Slack updates. What should the PM do?",
    o: [
      "Force Legal to use Slack only",
      "Force Engineering to read 30-page Legal memos daily",
      "Tailor communication channels and formats per stakeholder group in the Communications Management Plan",
      "Send identical mass emails to everyone"
    ],
    a: 2,
    r: [
      "Legal compliance often requires formal audit trails.",
      "Heavy memos slow down Engineering.",
      "Correct: Effective communication tailors format, frequency, and channel to each stakeholder's needs.",
      "One-size-fits-all creates noise and missed messages."
    ],
    e: "The Communications Management Plan maps each stakeholder group to its optimal channel and format.",
    ref: "PMBOK® Process Groups (Plan Communications Management)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "An Agile team's velocity has been steady, but team morale is dropping because they feel like 'feature factory' coders with no connection to user outcomes. What should the PM do?",
    o: [
      "Increase daily standups to twice a day",
      "Invite end users/customers to Sprint Reviews and share product outcome metrics so the team sees the impact of their work",
      "Offer a one-time pizza party without changing anything else",
      "Hide user feedback from the team"
    ],
    a: 1,
    r: [
      "More status meetings worsen micromanagement.",
      "Correct: Connecting teams directly to user impact and purpose boosts intrinsic motivation.",
      "Superficial perks don't address lack of purpose.",
      "Hiding feedback disconnects the team further."
    ],
    e: "Autonomy, mastery, and purpose (connecting work to user outcomes) drive sustainable team motivation.",
    ref: "PMBOK® 7th Ed. (Value & Team)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A key vendor lead misses two consecutive status meetings. What should the project manager do FIRST?",
    o: [
      "Terminate the vendor contract immediately",
      "Contact the vendor lead directly to check for blockers, clarify expectations, and review contractual communication SLAs",
      "Escalate to the client's legal department",
      "Stop paying vendor invoices without notice"
    ],
    a: 1,
    r: [
      "Termination is an extreme last resort.",
      "Correct: Direct communication and checking SLA expectations is the right first step.",
      "Legal escalation before direct contact is premature.",
      "Withholding payment arbitrarily breaches contract terms."
    ],
    e: "Address vendor communication gaps directly and constructively before escalating.",
    ref: "PMBOK® Process Groups (Control Procurements)"
  },
  {
    d: "E", c: 10, type: "multi", s: 1,
    q: "You are onboarding a newly formed remote team across 4 countries. Which TWO practices will BEST accelerate trust and alignment in Week 1? (Choose TWO)",
    o: [
      "Co-create a Team Charter covering core overlap hours, response-time norms, and decision protocols",
      "Hold a virtual kickoff with personal introductions and shared project vision",
      "Install keystroke-monitoring software on all laptops",
      "Skip introductions and assign coding tasks immediately",
      "Require 24/7 Slack availability"
    ],
    a: [0, 1],
    r: [
      "Correct: A Team Charter establishes explicit working agreements.",
      "Correct: Human connection and shared vision build early psychological safety.",
      "Surveillance destroys trust.",
      "Skipping alignment creates Forming-stage friction.",
      "24/7 availability causes immediate burnout."
    ],
    e: "Team Charters and human-centered kickoffs establish trust and clear norms for distributed teams.",
    ref: "PMBOK® 7th Ed. (Team Domain)"
  },
  {
    d: "E", c: 11, s: 1,
    q: "A previously supportive executive sponsor is reassigned, and the new sponsor is unfamiliar with Agile delivery and skeptical of iterative funding. What should the PM do FIRST?",
    o: [
      "Ignore the new sponsor and keep running sprints",
      "Schedule an onboarding 1-on-1 to understand her goals, explain how iterative delivery reduces risk, and agree on governance checkpoints",
      "Switch the project back to Waterfall immediately",
      "Ask the team to write a 100-page Waterfall plan"
    ],
    a: 1,
    r: [
      "Ignoring a new sponsor risks project funding and support.",
      "Correct: Update the Stakeholder Register, listen to the new sponsor's concerns, and align on transparent governance.",
      "Abandoning Agile without evaluating fit destroys momentum.",
      "Unnecessary documentation wastes capacity."
    ],
    e: "Sponsor transitions require immediate re-engagement, listening, and governance alignment.",
    ref: "PMBOK® Process Groups (Manage Stakeholder Engagement)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A team member admits during a Daily Scrum that she made a mistake in a database migration script that will delay her story by 1 day. How should the project manager react?",
    o: [
      "Reprimand her in front of the team for carelessness",
      "Thank her for early transparency, support the team in swarming/re-planning the task, and preserve psychological safety",
      "Note it in her HR file as a formal error",
      "Cancel the sprint"
    ],
    a: 1,
    r: [
      "Punishing honesty guarantees people will hide problems next time.",
      "Correct: Rewarding transparency and collaborating on recovery strengthens psychological safety.",
      "Punitive HR logging for normal dev mistakes destroys trust.",
      "A 1-day slip does not warrant canceling a sprint."
    ],
    e: "Psychological safety means team members can surface mistakes early without fear of punishment.",
    ref: "PMBOK® 7th Ed. (Team Domain)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "When using Situational Leadership (Hersey-Blanchard) with a highly competent but low-confidence (variable commitment) team member, which leadership style is MOST appropriate?",
    o: [
      "Directing (high task, low relationship)",
      "Supporting / Participating (low task, high relationship)",
      "Delegating (low task, low relationship)",
      "Coercive"
    ],
    a: 1,
    r: [
      "Directing is for low competence / high commitment beginners.",
      "Correct: Supporting provides encouragement and collaborative listening to boost confidence.",
      "Delegating is for high competence AND high commitment.",
      "Coercive is not part of Situational Leadership."
    ],
    e: "High competence + variable confidence calls for a Supporting leadership style.",
    ref: "PMBOK® 7th Ed. (Leadership)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A cross-functional team is stuck in 'Analysis Paralysis' debating edge cases for a low-risk internal feature. What should the project manager do?",
    o: [
      "Let them debate for another two weeks",
      "Timebox the discussion, frame it as a reversible 'two-way door' decision, and run a small experiment/prototype",
      "Escalate to the CEO",
      "Cancel the feature"
    ],
    a: 1,
    r: [
      "Endless debate wastes sprint capacity.",
      "Correct: Timeboxing and empirical prototyping break analysis paralysis safely.",
      "CEOs should not decide low-risk edge cases.",
      "Canceling ignores user value."
    ],
    e: "Timeboxing and small experiments resolve uncertainty faster than prolonged theoretical debate.",
    ref: "PMBOK® 7th Ed. (Adaptability & Complexity)"
  },
  {
    d: "E", c: 11, s: 1,
    q: "During user training before go-live, end users express strong anxiety that the new automation tool will eliminate their jobs. What should the project manager do?",
    o: [
      "Ignore their concerns because training is only about software clicks",
      "Partner with HR/Change Management and the sponsor to address role-transition clarity transparently and involve users in pilot feedback",
      "Tell them not to worry without any facts",
      "Skip user training and launch silently"
    ],
    a: 1,
    r: [
      "Ignoring emotional resistance causes adoption failure.",
      "Correct: Organizational Change Management (OCM) addresses human fears transparently with leadership.",
      "Empty reassurance without facts erodes trust.",
      "Silent launches fail user adoption."
    ],
    e: "Successful delivery requires Organizational Change Management and empathetic stakeholder engagement.",
    ref: "PMP® ECO (People & Business Environment)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A Scrum Master / PM notices that two developers are pair-programming on every complex story, which cuts defects in half, though management questions why two people are on one task. How should the PM respond?",
    o: [
      "Ban pair programming immediately",
      "Share defect-reduction and cycle-time data with management to demonstrate how pairing improves net value and knowledge sharing",
      "Tell the developers to pair secretly",
      "Split them onto separate projects"
    ],
    a: 1,
    r: [
      "Stopping an effective practice hurts quality.",
      "Correct: Educate stakeholders using empirical quality and throughput metrics.",
      "Secrecy undermines transparency.",
      "Splitting them removes the quality benefit."
    ],
    e: "Use empirical quality and flow metrics to defend effective engineering practices.",
    ref: "Agile Practice Guide"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A project team has a 'hero' developer who refuses to document his code, creating a single point of failure. What should the project manager do?",
    o: [
      "Accept it because he is very fast",
      "Make documentation and peer code review part of the team's Definition of Done (DoD) and rotate pairing",
      "Wait until he leaves the company to figure out the code",
      "Give him a bonus for working alone"
    ],
    a: 1,
    r: [
      "Single points of failure create massive operational risk.",
      "Correct: Embedding documentation/peer review into the DoD institutionalizes shared ownership.",
      "Waiting until attrition is negligent risk management.",
      "Rewarding siloed behavior worsens the risk."
    ],
    e: "Shared Definition of Done criteria and pairing eliminate single-person knowledge silos.",
    ref: "PMBOK® Process Groups (Manage Project Knowledge)"
  },
  {
    d: "E", c: 11, s: 1,
    q: "A stakeholder sends an angry email copying the CEO, claiming your team missed a critical requirement. You check the signed Scope Statement and see the requirement was explicitly deferred to Phase 2. What should you do NEXT?",
    o: [
      "Reply-all with 'As per my previous email, you are wrong' and attach the contract",
      "Respond calmly and factually, referencing the signed Phase 2 deferral, and offer a quick call to discuss adding it via change control if priorities shifted",
      "Ignore the email",
      "Add the feature immediately without approval"
    ],
    a: 1,
    r: [
      "Combative reply-all emails escalate executive conflict.",
      "Correct: Professional, non-defensive factual clarity plus a collaborative path forward de-escalates and maintains trust.",
      "Ignoring a CEO-copied escalation damages credibility.",
      "Unapproved additions cause scope creep."
    ],
    e: "De-escalate executive-visible misunderstandings with calm facts and a constructive change path.",
    ref: "PMBOK® 7th Ed. (Stakeholder Domain)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "Which motivational theory distinguishes between 'hygiene factors' (salary, safe working conditions) that prevent dissatisfaction and 'motivators' (achievement, recognition, growth) that drive engagement?",
    o: [
      "Maslow's Hierarchy of Needs",
      "Herzberg's Two-Factor (Motivation-Hygiene) Theory",
      "McGregor's Theory X and Theory Y",
      "Expectancy Theory"
    ],
    a: 1,
    r: [
      "Maslow uses a 5-tier pyramid from physiological to self-actualization.",
      "Correct: Herzberg separates Hygiene factors (prevent dissatisfaction) from Motivators (create satisfaction).",
      "McGregor contrasts authoritarian (X) vs. participative (Y) management assumptions.",
      "Expectancy Theory links effort → performance → reward."
    ],
    e: "Herzberg's Two-Factor Theory explains why fair pay alone doesn't create high engagement—growth and recognition do.",
    ref: "PMBOK® Process Groups (Manage Team)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A team member from an underrepresented group mentions in a 1-on-1 that her ideas are frequently interrupted in architecture meetings before she finishes speaking. What should the project manager do?",
    o: [
      "Tell her to speak louder",
      "Actively moderate meetings to enforce no-interruption norms, credit ideas accurately, and reinforce inclusive team agreements",
      "Move her to a non-technical role",
      "Ignore it because it's just normal engineering banter"
    ],
    a: 1,
    r: [
      "Putting the burden on the interrupted person fails leadership duty.",
      "Correct: Inclusive facilitation and enforcing team norms protect psychological safety and equity.",
      "Removing her penalizes the wrong person.",
      "Ignoring exclusion degrades team performance."
    ],
    e: "Project managers actively foster inclusive, respectful environments where every member can contribute.",
    ref: "PMBOK® 7th Ed. (Stewardship & Team)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "In a hybrid project, the Agile software team finishes a feature every 2 weeks, while the predictive compliance team only reviews releases quarterly. This creates a 10-week validation bottleneck. What should the PM do?",
    o: [
      "Ask the software team to stop working for 10 weeks",
      "Collaborate with the compliance team to embed incremental/lightweight compliance checks into each sprint or monthly gate",
      "Skip compliance reviews completely",
      "Fire the compliance team"
    ],
    a: 1,
    r: [
      "Stopping delivery wastes value.",
      "Correct: Bridging cadence mismatches via incremental compliance checkpoints eliminates batch bottlenecks.",
      "Skipping compliance creates legal risk.",
      "Compliance is a necessary organizational function."
    ],
    e: "Hybrid PMs harmonize differing team cadences by shifting validation earlier ('shift left').",
    ref: "PMBOK® 7th Ed. (Tailoring)"
  },
  {
    d: "E", c: 11, s: 1,
    q: "A project manager discovers that a team member accepted expensive concert tickets from a vendor currently bidding on a major RFP. What should the PM do?",
    o: [
      "Ignore it if the vendor has the lowest price",
      "Report the conflict of interest per organizational ethics/procurement policy and recuse the member from vendor evaluation",
      "Ask for tickets for the rest of the team too",
      "Wait until after the contract is awarded to mention it"
    ],
    a: 1,
    r: [
      "Ignoring bribery/gifts violates the PMI Code of Ethics.",
      "Correct: Fairness, honesty, and integrity require immediate disclosure and recusal.",
      "Accepting gifts compounds the ethics violation.",
      "Waiting compromises procurement integrity."
    ],
    e: "PMI's Code of Ethics requires honesty, fairness, and avoiding conflicts of interest in procurement.",
    ref: "PMI® Code of Ethics and Professional Conduct"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A Scrum team is celebrating finishing all planned stories early on Day 8 of a 10-day sprint. What should they do with the remaining 2 days?",
    o: [
      "Take 2 days off without telling the Product Owner",
      "Pull the next top-priority refined item from the Product Backlog (with PO alignment) or pay down technical debt",
      "Add unrequested 'gold-plated' animations to existing stories",
      "End the sprint early and skip the Sprint Review"
    ],
    a: 1,
    r: [
      "Idle uncommunicated time wastes capacity.",
      "Correct: Collaborate with the PO to pull refined backlog value or address technical debt.",
      "Gold plating adds unvetted complexity.",
      "Skipping Sprint Review loses feedback."
    ],
    e: "Finishing early is an opportunity to pull the next refined backlog item or reduce technical debt.",
    ref: "Agile Practice Guide"
  },
  {
    d: "E", c: 10, s: 1,
    q: "What is the primary purpose of a 'Team Charter' (Social Contract) created at project kickoff?",
    o: [
      "To authorize project funding from the sponsor",
      "To establish shared team values, communication agreements, decision-making rules, and conflict-resolution norms",
      "To list all WBS work packages",
      "To track Earned Value metrics"
    ],
    a: 1,
    r: [
      "Funding authorization is the Project Charter.",
      "Correct: The Team Charter aligns how the team works together.",
      "Work packages belong to the WBS.",
      "EVM is tracked in cost/schedule control."
    ],
    e: "A Team Charter defines working agreements, norms, and ground rules co-created by the team.",
    ref: "PMBOK® Process Groups (Plan Resource Management)"
  },
  {
    d: "E", c: 11, s: 1,
    q: "During a Sprint Review, a stakeholder asks why a lower-priority feature was not built yet. Who is primarily responsible for explaining Product Backlog prioritization and ROI trade-offs?",
    o: [
      "The QA Tester",
      "The Product Owner",
      "The Database Administrator",
      "The HR Business Partner"
    ],
    a: 1,
    r: [
      "QA focuses on quality verification.",
      "Correct: The Product Owner owns backlog ordering and value/ROI communication.",
      "DBAs focus on data architecture.",
      "HR does not own product scope."
    ],
    e: "The Product Owner is accountable for maximizing product value and communicating backlog priorities.",
    ref: "Agile Practice Guide (Scrum Roles)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A project manager uses 'Active Listening' during a tense stakeholder meeting. Which behavior BEST demonstrates active listening?",
    o: [
      "Preparing your counter-argument while the stakeholder is talking",
      "Paraphrasing what the stakeholder said, acknowledging their emotion/concern, and asking clarifying questions",
      "Checking emails on your laptop while nodding",
      "Interrupting to correct minor terminology"
    ],
    a: 1,
    r: [
      "Rehearsing a rebuttal blocks true comprehension.",
      "Correct: Paraphrasing and validating concerns confirms understanding and builds trust.",
      "Multitasking signals disrespect.",
      "Interrupting shuts down dialogue."
    ],
    e: "Active listening combines full attention, paraphrasing, and empathetic clarification.",
    ref: "PMBOK® 7th Ed. (Stakeholder & Team)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A project team is about to disband after a successful 14-month product launch. According to Tuckman's model, what should the project manager do during the Adjourning stage?",
    o: [
      "Reassign everyone immediately without recognition",
      "Celebrate achievements, recognize individual contributions, complete knowledge transfer, and support smooth transition",
      "Start a new conflict to keep energy high",
      "Skip project closure"
    ],
    a: 1,
    r: [
      "Abrupt disbanding hurts morale and institutional memory.",
      "Correct: Adjourning involves recognition, closure, and smooth transition.",
      "Creating artificial conflict is harmful.",
      "Formal closure is mandatory."
    ],
    e: "In the Adjourning stage, recognize the team, capture lessons learned, and transition members smoothly.",
    ref: "PMBOK® Process Groups (Close Project or Phase)"
  },
  {
    d: "E", c: 10, s: 1,
    q: "A senior developer insists on using a cutting-edge but unproven framework that could delay delivery if it fails. The team is split. What should the project manager recommend?",
    o: [
      "Run a short, timeboxed architectural Spike (1–2 days) to validate feasibility objectively before committing",
      "Let the senior developer decide because of his title",
      "Ban all new technologies permanently",
      "Flip a coin"
    ],
    a: 0,
    r: [
      "Correct: A timeboxed Spike replaces opinion battles with empirical evidence.",
      "Title-based authority ignores risk.",
      "Blanket bans stifle innovation.",
      "Random selection ignores technical risk."
    ],
    e: "Timeboxed Spikes gather objective data to resolve technical debates.",
    ref: "Agile Practice Guide"
  }
];
