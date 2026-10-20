---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn mode

## Slices

- [ ] **1. Project scaffolding, executive dark UI & sentinel scoring engine**
  Becomes usable: A running Vite React application with the executive dark SaaS styling, navbar, "How FairShare Works" guide, pre-loaded sample contract triggers, and the core scoring engine that evaluates contract clauses and computes the 4-pillar 0–100 Health Score.
  Why now: Bootstraps the application and proves the core kernel on day one—evaluating legal clauses and displaying the health score—so every later slice builds on an already-functioning product.
  PRD ref: `prd.md > The Core Journey` (steps 1–3), `prd.md > Features and Behavior (2. Contract Health Score Engine)`
  Spec ref: `spec.md > Stack`, `spec.md > Components`, `spec.md > File Structure`
  Build: Scaffold Vite + React app with Tailwind CSS, implement `rulesRegistry.js` and `contractSentinel.js`, create sample contract datasets, build `Navbar.jsx`, `HowItWorks.jsx`, `HealthScoreGauge.jsx`, and wire up the sample analysis on click.
  Verify (mechanical): Run build and automated Node test verifying `contractSentinel.analyze()` computes expected deductions and score outputs across all 4 risk categories.
  Learner check: Start dev server with `npm run dev`, open `http://localhost:5173`, click "⚡ Load Sample Predatory Contract", and verify the score gauge and detected risk cards appear.
  Commit: `feat: scaffold executive workspace with sentinel scoring engine`

- [ ] **2. Bidirectional interactive clause highlighting & document viewer**
  Becomes usable: The split-screen document viewer displays formatted contract text with color-coded `<mark>` highlights. Clicking any highlight in the text scrolls to and focuses the matching card on the right, and clicking a card highlights the text on the left.
  Why now: Completes the visual promise of the split-screen experience, giving freelancers immediate context on where dangerous terms are buried.
  PRD ref: `prd.md > Features and Behavior (3. Interactive Clause Highlighter & Danger Explanation)`
  Spec ref: `spec.md > Components (4. DocumentViewer.jsx)`
  Build: Create `DocumentViewer.jsx` with text offset mapping and interactive clickable highlights; connect synchronized active state between document text and risk cards.
  Verify (mechanical): Verify sentence offset mapping generates valid non-overlapping spans and test click handler emits active card focus event.
  Learner check: Click a highlighted red sentence in the left pane and confirm it automatically scrolls to and highlights the corresponding warning card on the right.
  Commit: `feat: add bidirectional clause highlighting and document viewer`

- [ ] **3. Diplomatic pushback negotiation generator & clipboard actions**
  Becomes usable: Each flagged card provides a tailored, professional counter-proposal written in polite email copy, with a one-click clipboard copy button and toast notification.
  Why now: Delivers the "Diplomatic Action" half of FairShare's unique kernel, equipping the freelancer with the exact words to negotiate safely without offending the client.
  PRD ref: `prd.md > Features and Behavior (4. Diplomatic Pushback & Counter-Clause Generator)`
  Spec ref: `spec.md > Components (6. RiskCard.jsx)`
  Build: Implement expandable email pushback cards for all 4 trap categories; add 1-click clipboard copy (`navigator.clipboard.writeText`) with visual feedback toast; add "Copy Full Negotiation Summary" master button.
  Verify (mechanical): Verify clipboard copy state transitions and verify generated pushback text matches approved diplomatic templates.
  Learner check: Click "Copy Email Snippet" on an unpaid maintenance card, paste it into an email or text editor, and confirm the polite negotiation text appears.
  Commit: `feat: implement diplomatic pushback generator and clipboard actions`

- [ ] **4. Client-side PDF extraction & comprehensive edge case handling**
  Becomes usable: Users can drag and drop or upload actual PDF contracts to parse them 100% in-browser using `pdfjs-dist`, paste raw text, experience the clean contract celebration state (95/100 Safe to Sign), and receive clear alerts for corrupted or empty files.
  Why now: Completes the full input pipeline and handles all edge cases required by the PRD for a rock-solid, production-grade proof of concept.
  PRD ref: `prd.md > Features and Behavior (1. Document Parsing & Input)`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Components (3. ContractInput.jsx)`, `spec.md > Stack (pdfjs-dist)`
  Build: Integrate `pdfParser.js` using `pdfjs-dist` to extract text from dropped/uploaded PDF files; add raw text paste tab; build celebratory "Safe to Sign" card for clean contracts; add error boundary for unreadable files; implement "Clear & Test Another Contract" reset.
  Verify (mechanical): Run automated test verifying PDF text extraction and error fallback handling; run `npm run build` to ensure clean production bundle.
  Learner check: Drop a PDF file or paste custom contract text, verify instant analysis, and test "Clear & Test Another Contract" to return to the landing page.
  Commit: `feat: integrate in-browser PDF parsing and error states`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — after Slice 1 (core sentinel scoring engine and workspace verified)
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [to be recorded upon completion]
Route and stops: [to be recorded upon completion]
Edit outcome: [to be recorded upon completion]
Reflection: [to be recorded upon completion]
Activity mode: [to be recorded upon completion]

## Revisions

