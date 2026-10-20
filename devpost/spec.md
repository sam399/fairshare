---
doc: spec
status: approved
---

# FairShare — Technical Specification

## How This Works, In Plain Language

FairShare runs completely inside the browser as a fast, private client-side application. 

1. When a user uploads a contract PDF, an in-browser PDF engine (`pdfjs-dist`) extracts the text line by line directly in memory. No contract text is ever sent over the internet or saved to an external database, guaranteeing total privacy for sensitive client agreements.
2. The extracted text is passed to the **Contract Sentinel Engine** (`contractSentinel.js`), which evaluates it against a modular **Rules Registry** (`rulesRegistry.js`). 
3. The engine uses semantic regex patterns to detect red flags (uncompensated post-delivery bug fixes, Net-90 payment delays, sneaky prior-IP grabs, and overbroad non-competes).
4. Each caught clause is assigned a severity deduction, producing an aggregate **0–100 Contract Health Score**, while preserving the exact sentence offsets.
5. The application renders a reactive split-screen: the left pane shows the contract text with interactive highlighted spans, and the right pane shows the health score gauge and collapsible warning cards. Clicking any card reveals a plain-English explanation and a copyable diplomatic email pushback.

---

## The Core Journey Through the System

Traces `prd.md > The Core Journey` through the technical components:

1. **User lands on app:** React mounts `LandingView.jsx`, displaying `Navbar.jsx`, `HowItWorks.jsx`, and `ContractInput.jsx`.
2. **User inputs contract:**
   - *PDF file dropped:* `pdfParser.js` reads the file buffer via `pdfjs-dist`, iterates pages, extracts text, and triggers `onAnalyze(text)`.
   - *Raw text pasted:* User pastes clauses into `textarea` and clicks "Analyze Contract".
   - *Sample contract clicked:* `samplePredatoryContract.js` or `sampleFairContract.js` is loaded directly into state.
3. **Engine analysis:** `contractSentinel.analyze(text)` executes synchronously:
   - Evaluates clauses across the 4 risk pillars.
   - Calculates health score, risk level (`critical` | `caution` | `healthy`), and matched excerpts.
   - Updates React state `analysisResult`.
4. **Split-Screen Workspace:** App transitions to `WorkspaceView.jsx`:
   - Left side (`DocumentViewer.jsx`) renders formatted contract text, wrapping detected offsets in clickable `<mark>` highlight tags.
   - Right side (`SentinelPanel.jsx`) displays `HealthScoreGauge.jsx` and a list of `RiskCard.jsx` components.
5. **Interactive synchronization:**
   - Clicking a highlighted sentence in `DocumentViewer.jsx` dispatches an event that scrolls to and expands the matching `RiskCard.jsx`.
   - Clicking "Copy Diplomatic Pushback" copies the pre-crafted email snippet to `navigator.clipboard` and triggers a toast notification.
6. **Session reset:** Clicking "Clear & Test Another Contract" resets React state back to initial state.

---

## Stack

- **Runtime & Build Tool:** **Vite 6** with **React 19**
  - *Rationale:* Lightning-fast hot module replacement, zero backend overhead, easy local startup with `npm run dev`.
- **Styling:** **Tailwind CSS v3**
  - *Rationale:* Utility-first dark-mode styling inspired by Linear/Stripe, responsive grid layouts, crisp typography.
- **PDF Extraction:** **`pdfjs-dist` (v4)**
  - *Rationale:* Mozilla's official open-source PDF parsing engine running 100% client-side in the browser. [Docs](https://mozilla.github.io/pdf.js/)
- **Icons:** **`lucide-react`**
  - *Rationale:* Clean, modern executive iconography (Shield, AlertTriangle, FileText, CheckCircle, Copy, RefreshCw). [Docs](https://lucide.dev/)

---

## Where It Runs and How Someone Tries It

- **Runtime:** Client-side browser application running locally via Node.js dev server.
- **Node Requirement:** Node.js v18+ (verified: system running Node v23.4.0).
- **Exact Start Command:**
  ```bash
  cd fairshare
  npm install
  npm run dev
  ```
- **What to open:** Open `http://localhost:5173` in any modern web browser.
- **Verification for judges:** Click **"⚡ Load Sample Predatory Contract"** to run the complete analysis in 1 second without uploading files.

---

## Look and Feel

Translates `prd.md > Look and Feel` into CSS styling parameters:
- **Palette:**
  - Background: Deep Slate `#0b0f19` / Card Surface `#111827`
  - Borders: Subtle Slate `#1f2937`
  - High Risk: Crimson `#ef4444` (`bg-red-500/15`, `border-red-500/30`, `text-red-400`)
  - Warning: Warm Amber `#f59e0b` (`bg-amber-500/15`, `border-amber-500/30`, `text-amber-400`)
  - Fair / Protected: Emerald `#10b981` (`bg-emerald-500/15`, `border-emerald-500/30`, `text-emerald-400`)
  - Primary / Accent: Indigo `#6366f1` / Blue `#3b82f6`
- **Typography:** Inter / system sans-serif font with crisp letter-spacing and clear hierarchical weights.
- **Tone:** Executive, empowering, and objective.

---

## Components

### 1. `Navbar.jsx`
- Implements `prd.md > Screens and Layout (Top Utility Bar)`.
- Displays FairShare logo, project status, and active contract reset action.

### 2. `HowItWorks.jsx`
- Implements `prd.md > View 1: Landing & Input Screen`.
- 3 visual cards explaining Upload $\rightarrow$ AI Sentinel Audit $\rightarrow$ Diplomatic Negotiation.

### 3. `ContractInput.jsx`
- Implements `prd.md > Features and Behavior (1. Document Parsing & Input)`.
- Handles PDF drag-and-drop file upload, raw text input textarea, and quick-load sample contract buttons.

### 4. `DocumentViewer.jsx`
- Implements `prd.md > Features and Behavior (3. Interactive Clause Highlighter)`.
- Renders the full contract text with reactive colored `<mark>` spans mapped to detected risk offsets. Clicking a highlight scrolls to the matching card.

### 5. `HealthScoreGauge.jsx`
- Implements `prd.md > Features and Behavior (2. Contract Health Score Engine)`.
- Circular SVG gauge with animated stroke and color-coded score status (Critical / Caution / Safe).

### 6. `RiskCard.jsx`
- Implements `prd.md > Features and Behavior (4. Diplomatic Pushback & Counter-Clause Generator)`.
- Collapsible card containing the original clause quote, plain-English danger explanation, recommended industry standard, and ready-to-copy email pushback.

---

## Data Model

### State Shape (`analysisResult`)

```javascript
{
  rawText: string,
  fileName: string,
  healthScore: number,          // 0 to 100
  riskLevel: 'critical' | 'caution' | 'healthy',
  summary: {
    criticalCount: number,
    warningCount: number,
    fairCount: number
  },
  flaggedClauses: [
    {
      id: string,               // e.g. "clause-unpaid-maintenance"
      ruleId: string,
      category: string,         // "Scope & Revisions" | "Payment Terms" | "IP Rights" | "Restrictive Covenants"
      severity: 'critical' | 'warning' | 'fair',
      title: string,            // "Uncompensated Post-Delivery Maintenance"
      matchedText: string,      // Exact quoted sentence from contract
      startIndex: number,
      endIndex: number,
      explanation: string,      // Plain-English danger breakdown
      fairStandard: string,     // What balanced contracts do instead
      counterProposal: string   // Polite, professional email draft
    }
  ]
}
```

---

## File Structure

```
fairshare/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── ContractInput.jsx
│   │   ├── WorkspaceView.jsx
│   │   ├── DocumentViewer.jsx
│   │   ├── HealthScoreGauge.jsx
│   │   └── RiskCard.jsx
│   ├── services/
│   │   ├── pdfParser.js
│   │   ├── contractSentinel.js
│   │   └── rulesRegistry.js
│   └── data/
│       ├── samplePredatoryContract.js
│       └── sampleFairContract.js
├── devpost/
│   ├── learner-profile.md
│   ├── scope.md
│   ├── prd.md
│   ├── spec.md
│   ├── scope.html
│   └── prd.html
└── README.md
```

---

## Decisions and Open Issues

### The "One Useful Unknown" Explored:
- **Learner Question:** *"What if FairShare doesn't understand new workaround words that modern contracts use, and how will we teach it new stuff?"*
- **Technical Resolution:**
  1. We decouple legal intelligence into a standalone `rulesRegistry.js` using regex intent clusters (matching semantic synonym groups rather than rigid strings).
  2. Adding new legal workarounds requires only adding an entry to the registry without touching UI components.
  3. The architecture supports plugging in a secondary LLM semantic interpreter in future updates.

---

## What Was Simplified and Why

- **Client-Side Regex & Rule Matching** instead of mandatory external LLM backend:
  - *Why:* Zero latency (0ms), 100% offline reliability for judges, zero API key configuration, and complete confidentiality (contracts never leave the user's browser).
- **In-Memory React State** instead of external PostgreSQL/Supabase database:
  - *Why:* Eliminates database migration setup; judges can run `npm install && npm run dev` immediately.
