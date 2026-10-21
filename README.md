# ⚖️ FairShare — Freelance Contract & Scope-Creep Sentinel

> Built for the **Devpost Learn Hackathon: Build With AI Basics**.

An AI-powered client-side contract sentinel that scans freelance agreements for predatory clauses, computes an instant **Contract Health Score**, and equips freelancers with polite, professional counter-proposals they can copy and send to clients without damaging relationships.

---

## 📑 Required Hackathon Planning Documents

In accordance with the Devpost Learn Skill Pack criteria, this repository contains the complete specification and planning artifacts generated before implementation:

* **[Scope Document](devpost/scope.md)** — Project kernel, user definition, and proof-of-concept boundaries.
* **[Product Requirements Document (PRD)](devpost/prd.md)** — Core journey, split-screen UI specifications, and testable acceptance criteria.
* **[Technical Blueprint (Spec)](devpost/spec.md)** — Architecture, in-browser PDF parsing engine, and rules registry structure.
* **[Build Checklist](devpost/checklist.md)** — Vertical slices, mechanical verification records, and review checkpoints.
* **[Application Architecture Map](devpost/app-map.html)** — Visual data flow and take-home developer guide.

---

## ⚡ Quick Start for Judges & Testers

FairShare runs completely client-side in the browser with **zero external server or API key requirements**.

### Prerequisites
* **Node.js** v18+ (tested on v23.4.0)
* **npm**

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/<YOUR-USERNAME>/fairshare.git
cd fairshare

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open your browser at **`http://localhost:5173`**.

### 1-Second Judge Evaluation
On the landing page, click:
* **"⚡ Load Sample Predatory Contract"** to immediately test the full analysis pipeline on an agreement packed with typical traps (unpaid maintenance, Net-90 pay, prior IP grabs, non-competes).
* **"✨ Load Balanced Contract"** to observe the celebratory 95/100 *"Safe to Sign"* state.
* **"Upload PDF"** or **"Paste Contract Text"** to evaluate your own agreement.

---

## 🛡️ Key Features

1. **100% In-Browser Privacy:** All PDF parsing (`pdfjs-dist`) and legal analysis run locally in client memory. No confidential contract data is ever transmitted across the internet.
2. **Deterministic Rules Sentinel:** Evaluates clauses across 4 freelancer risk pillars:
   * *Payment Terms:* Penalizes Net-60/90, pay-when-paid, and discretionary withholding.
   * *Scope & Revisions:* Flags indefinite, uncompensated defect fixing and unlimited revisions.
   * *Intellectual Property:* Prevents overbroad grabs of pre-existing tools and prior code libraries.
   * *Restrictive Covenants:* Alerts on overreaching 2-year non-compete clauses.
3. **Bidirectional Interactive Highlighting:** Clicking any highlighted clause in the document viewer automatically scrolls to and expands its matching warning card in the Sentinel Panel.
4. **Diplomatic Negotiation Engine:** Every detected trap includes a polite, ready-to-send counter-proposal and email template so freelancers can push back professionally without sounding aggressive.
5. **Full Negotiation Brief Modal:** Compiles all flagged clauses into a single, cohesive client email ready to copy into Gmail, Outlook, or Slack.

---

## 🧪 Testing

To run the automated mechanical verification suite:

```bash
npm run test
```

This verifies that:
* The heuristic rule engine correctly calculates severity deductions.
* Clean contracts score in the healthy range (90–100).
* All legal rules contain complete diplomatic pushback templates.
* Empty/corrupted document edge cases are properly caught.

---

## 📂 Project Structure

```
fairshare/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── LICENSE
├── README.md
├── devpost/                  # Mandatory Hackathon Planning Docs
│   ├── scope.md              # Approved Scope
│   ├── prd.md                # Approved PRD
│   ├── spec.md               # Approved Technical Spec
│   ├── checklist.md          # Completed Build Checklist
│   ├── app-map.html          # Visual Architecture Map
│   ├── scope.html            # Scope Companion
│   ├── prd.html              # PRD Companion
│   └── spec.html             # Spec Companion
├── src/
│   ├── App.jsx               # Master view coordinator & state
│   ├── components/
│   │   ├── Navbar.jsx        # Executive header & reset action
│   │   ├── HowItWorks.jsx    # 3-step onboarding guide
│   │   ├── ContractInput.jsx # PDF dropzone & text input
│   │   ├── WorkspaceView.jsx # Split-screen workspace container
│   │   ├── DocumentViewer.jsx# Document text with reactive highlights
│   │   ├── HealthScoreGauge.jsx # Animated 0-100 SVG score meter
│   │   ├── RiskCard.jsx      # Warning card with pushback generator
│   │   └── NegotiationModal.jsx # Full negotiation email generator
│   ├── services/
│   │   ├── contractSentinel.js # Core analysis engine
│   │   ├── rulesRegistry.js    # Extensible rule definitions
│   │   └── pdfParser.js        # In-browser PDF text extractor
│   └── data/
│       ├── samplePredatoryContract.js
│       └── sampleFairContract.js
└── test-sentinel.js          # Automated verification test
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
