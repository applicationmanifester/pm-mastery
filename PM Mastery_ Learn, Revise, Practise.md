# PM Mastery: Learn, Revise, Practise

A self-contained, offline-first study and reference application for **PMP®**, **CAPM®**, and **Agile** practitioners.

## Quick Navigation

[Dashboard](#dash) · [Principles](#learn) · [Chapter Map](#guide) · [Processes & 49-Grid](#process) · [Lessons](#lessons) · [Reference](#ref) · [Methods & Kanban](#method) · [CPM Lab](#cpm) · [EVM & Advisor](#evm) · [Risk & Monte Carlo](#risk) · [Stakeholders](#stake) · [Glossary](#glossary) · [Flashcards](#flash) · [Quiz](#quiz) · [Exam](#exam) · [AI in PM](#ai) · [Revise & Backup](#revise)

---

## Interactive Labs & Visual Simulators

### 1. Risk Lab: Monte Carlo Simulation & 5×5 Heatmap (`#risk`)
* **1,000-Trial Monte Carlo Simulation (SVG):** Live browser-based stochastic modeling across your risk register. Plots a frequency histogram with:
  * **Expected Value (EMV):** Mathematical mean ($P \times I$).
  * **P50 (Median Loss):** 50% probability threshold.
  * **P80 (Recommended Contingency Reserve):** The PMBOK standard 80% confidence level buffer.
  * **P95 (Conservative Buffer):** Worst-case upper bound.
* **5×5 Probability-Impact Heatmap (SVG):** Color-graded matrix with plotted interactive risk bubbles ($R_1, R_2, \dots$).
* **Quantitative Risk Register:** Live risk addition and deletion with instant reserve target recalibration.

### 2. Process Groups & 49-Process Matrix (`#process`)
* **Comprehensive 49-Process Grid:** Interactive mapping of the 10 Knowledge Areas across the 5 Process Groups (Initiating, Planning, Executing, Monitoring & Controlling, Closing).
  * Integration (7), Scope (6), Schedule (6), Cost (4), Quality (3), Resource (6), Communications (3), Risk (7), Procurement (3), Stakeholders (4).
* **Lifecycle Pipeline (SVG):** Chevron pipeline flow highlighting the iterative feedback loop between planning and execution.

### 3. Methodologies & Interactive Kanban Simulator (`#method`)
* **Interactive Kanban Board Simulator:**
  * 4 Columns: `Backlog`, `In Progress` (WIP: 2), `Testing / QA` (WIP: 2), `Done`.
  * **Enforced WIP Limits:** Demonstrates Little's Law and bottleneck prevention. Pulling work into full columns triggers visual warnings and explains how limiting work-in-progress accelerates cycle time.
* **Stacey Complexity Matrix (SVG):** Dynamic 2D chart (*Requirements vs. Technical Uncertainty*) with a live target pin responding to your delivery criteria.
* **Scrum Lifecycle Flow (SVG):** Visual breakdown of Product Backlog ➔ Sprint Planning ➔ Sprint Backlog ➔ 1–4 Week Sprint (with circular Daily Scrum) ➔ Increment ➔ Review & Retrospective.

### 4. CPM Critical Path Lab & Multi-Project Presets (`#cpm`)
* **Scenario Library:**
  1. *Software Sprint & Release* (8 activities)
  2. *Cloud Data Migration* (7 activities)
  3. *Commercial Construction* (8 activities)
  4. *Product Launch Campaign* (7 activities)
* **Interactive Network Diagram (SVG):** Topological rank leveling with curved connection arrows. Highlights the **Critical Path** (Zero Total Float) in distinct red.
* **Gantt Chart (SVG):** Visual timeline bars with early/late dates and float whiskers.
* **Schedule Table:** Full Early Start (ES), Early Finish (EF), Late Start (LS), Late Finish (LF), and Total Float (TF) metrics.

### 5. Earned Value Management & Corrective Advisor (`#evm`)
* **Scenario Presets:**
  * *Healthy & On-Track* ($CPI \ge 1.0, SPI \ge 1.0$)
  * *Behind Schedule, Under Budget* ($CPI \ge 1.0, SPI < 1.0$)
  * *Ahead of Schedule, Over Budget* ($CPI < 1.0, SPI \ge 1.0$)
  * *Critical Dual Overrun* ($CPI < 1.0, SPI < 1.0$)
* **PMBOK Corrective Action Advisor:** Recommends concrete remediation strategies (Crashing critical path activities, Cost-driver auditing, Resource leveling, or CCB scope renegotiation).
* **Interactive S-Curve (SVG):** Sigmoid $PV$ curve alongside $EV$ and $AC$ with $CV$ and $SV$ brackets and $EAC$ forecast.
* **Dual Radial Speedometers (SVG):** Analog dial gauges for $CPI$ and $SPI$ with color-coded efficiency thresholds.

### 6. Stakeholder Power/Interest Matrix (`#stake`)
* **Dynamic 2×2 Scatter Plot (SVG):** Real-time animated coordinate bubbles that move across the 4 engagement quadrants (*Manage Closely*, *Keep Satisfied*, *Keep Informed*, *Monitor*) as sliders are adjusted.

### 7. Flashcards with Audio Pronunciation (TTS) (`#flash`)
* **Audio Pronunciation (TTS):** Integrated browser SpeechSynthesis ("🔊 Listen") to read aloud terms and definitions.
* **Dual Modes:**
  * **Spaced Repetition (SRS):** Full SM-2 scheduling algorithm.
  * **Browse & Cram All:** 3D perspective card flip across all 37 glossary terms.

### 8. Chapter Curriculum Subway Map (`#guide`)
* **Interactive Metro Route Diagram (SVG):** 15-chapter learning roadmap connecting all 5 project management parts.

---

## Keyboard Shortcuts

| Key | Action |
| :---: | :--- |
| <kbd>/</kbd> | Open universal search input from any view |
| <kbd>Esc</kbd> | Exit search and return to previous view |
| <kbd>Space</kbd> | Flip flashcard front / back (with 3D perspective animation) |
| <kbd>1</kbd> – <kbd>4</kbd> | Select multiple choice quiz option / SRS card difficulty |
| <kbd>Enter</kbd> | Advance to next quiz question |

---

## Local Development Server
* **URL:** [http://localhost:8080/](http://localhost:8080/)
* **Direct IP:** [http://127.0.0.1:8080/](http://127.0.0.1:8080/)
* **Files:** Standalone HTML5 and LocalStorage (`pmm`). Zero dependencies, runs completely offline.


---

## 🌐 Live Hosting & Deployment

The application is hosted on Google Firebase Hosting:
- **Production URL:** [https://pm-mastery.web.app](https://pm-mastery.web.app)
- **Alternate URL:** [https://pm-mastery.firebaseapp.com](https://pm-mastery.firebaseapp.com)
- **Firebase Console:** [https://console.firebase.google.com/project/pm-mastery/overview](https://console.firebase.google.com/project/pm-mastery/overview)

### Running Locally
```bash
node server.cjs
```
Local access: [http://localhost:8080/](http://localhost:8080/)
