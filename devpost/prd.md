---
doc: prd
status: approved
---

# FairShare — Product Requirements Document

A sleek, trustworthy freelance contract scanner and scope-creep sentinel that flags predatory clauses, explains legal traps in plain English, and generates polite, professional counter-proposals freelancers can copy-paste to negotiate safely.

**Source:** `scope.md > The Core Loop`, `scope.md > The Unique Kernel`, and `scope.md > What "Working" Looks Like`.

---

## The Core Journey

1. **Arrival & Onboarding:** The user lands on FairShare. They see an executive header and a clean, 3-step "How FairShare Protects You" guide showing how to upload, what gets analyzed, and how diplomatic pushback works.
2. **Contract Input:** The user can either:
   - Drop a PDF agreement into the upload zone,
   - Switch to the "Paste Text" tab to paste contract clauses directly, or
   - Click **"Load Sample Trap Contract"** to immediately test the app with a realistic freelance agreement containing typical pitfalls.
3. **Instant Split-Screen Analysis:** The app parses the document and transitions into a side-by-side executive view:
   - **Left Pane (Document Viewer):** Shows the full contract text with inline, color-coded highlighted clauses matching the detected risks. Clicking any highlight focuses the corresponding card on the right.
   - **Right Pane (Sentinel Intelligence Dashboard):**
     - **Contract Health Score Gauge:** Animated 0–100 score (e.g., 34/100 "Critical Risk") with category counters (Critical Traps, Cautions, Fair Clauses).
     - **Trap Cards:** Detailed cards for each flagged clause with severity badges, plain-English danger breakdowns, and the "Copy Diplomatic Pushback" action.
4. **Actionable Pushback:** The user clicks "Generate Diplomatic Pushback" on any trap card to reveal a polite, professional, ready-to-send counter-clause and email response. Clicking "Copy Email Snippet" copies it to clipboard with instant visual confirmation.
5. **Session Reset:** Clicking "Clear & Test Another Contract" resets the dashboard back to the input state.

---

## Screens and Layout

A single-page, responsive web application with two distinct views:

### View 1: Landing & Input Screen
- **Executive Header:** FairShare logo mark, subtitle, and hackathon badge.
- **"How It Works" Card:** 3-step visual cards explaining Upload $\rightarrow$ AI Sentinel Audit $\rightarrow$ Diplomatic Negotiation.
- **Dual-Mode Input Card:**
  - Tab 1: Drag-and-drop PDF dropzone with file picker.
  - Tab 2: Text area for directly pasting contract clauses.
  - Primary CTA: "Analyze Contract".
  - Quick-start CTA: "⚡ Load Sample Predatory Contract" (pre-loads an agreement containing unpaid maintenance, Net-90 terms, prior IP ownership grabs, and a 2-year non-compete).

### View 2: Split-Screen Sentinel Workspace
- **Top Utility Bar:** Contract name / source, overall status badge, and "Clear & Test Another Contract" button.
- **Left Panel (Interactive Document Viewer):**
  - Formatted contract text with interactive colored highlights:
    - 🔴 Red: Critical traps (unpaid work, broad IP grab, strict non-compete)
    - 🟡 Amber: Moderate concerns (delayed payment, ambiguous milestones)
    - 🟢 Emerald: Fair standard clauses
  - Auto-scrolls and highlights when clicking corresponding cards.
- **Right Panel (Audit & Negotiation Console):**
  - **Health Score Meter:** Circular or progress bar gauge with color threshold (0–49 Red / 50–79 Amber / 80–100 Green).
  - **Clause Risk Cards:** Collapsible cards detailing:
    - Problematic text quote.
    - Plain-English risk breakdown: *"Why this puts you at risk"*.
    - Suggested fair industry standard.
    - Expandable diplomatic negotiation email snippet with a "Copy Email" button.
  - **Master Action:** "Copy Full Negotiation Brief" button.

---

## Look and Feel

- **Design Philosophy:** Executive SaaS craftsmanship inspired by Linear and Stripe. Dark-mode first with deep navy/slate backgrounds (`#0b0f19`, `#111827`), subtle borders (`#1f2937`), and crisp sans-serif typography.
- **Visual Signals:**
  - High Risk: Crimson Red (`#ef4444`)
  - Caution: Warm Amber (`#f59e0b`)
  - Fair / Protected: Emerald Green (`#10b981`)
  - Accent / Primary Action: Electric Indigo/Blue (`#3b82f6` / `#6366f1`)
- **Tone:** Empathetic, objective, and empowering. Zero toy, comic-book, or sketchy elements.

---

## Features and Behavior

### 1. Document Parsing & Input
- Supports PDF file upload and raw text pasting.
- Includes pre-loaded sample contract for instant 1-click evaluation.
- **Acceptance Criteria:**
  - [ ] Dropping a valid PDF extracts contract text and triggers analysis.
  - [ ] Pasting plain text and clicking "Analyze" parses the clauses.
  - [ ] Clicking "Load Sample Predatory Contract" immediately populates the split screen with the pre-configured trap contract.

### 2. Contract Health Score Engine
- Evaluates contract clauses across 4 key dimensions:
  1. *Compensation & Payment Terms* (e.g., Net-30 vs. Net-90, pay-if-paid)
  2. *Scope & Revisions* (e.g., capped revision rounds vs. unlimited free lifetime fixes)
  3. *Intellectual Property Rights* (e.g., work-for-hire on delivery vs. claiming pre-existing tools/portfolio)
  4. *Restrictive Covenants* (e.g., reasonable confidentiality vs. overbroad non-competes)
- Computes an aggregate score from 0 to 100.
- **Acceptance Criteria:**
  - [ ] Predatory contract produces a low health score (e.g., 30–45/100, Critical Risk).
  - [ ] Clean contract produces a high score (90–95/100, Safe / Balanced).

### 3. Interactive Clause Highlighter & Danger Explanation
- Maps identified clauses back to the exact sentences in the document viewer.
- Displays a plain-English explanation for each trap.
- **Acceptance Criteria:**
  - [ ] Clicking a highlighted sentence in the left pane scrolls to and expands its card on the right.
  - [ ] Clicking a card on the right highlights the corresponding text on the left.

### 4. Diplomatic Pushback & Counter-Clause Generator
- Generates polite, professional counter-proposals for each flagged risk.
- **Acceptance Criteria:**
  - [ ] Each flagged trap card contains a copyable email snippet written in diplomatic, respectful language.
  - [ ] Clicking "Copy Email Snippet" copies the formatted text to clipboard and displays an instant "Copied to clipboard!" toast notification.

---

## States and Boundaries

- **Initial / Empty State:** Clean landing page with "How it Works" guide, empty upload zone, text area, and "Load Sample Contract" button.
- **Analysis State:** Brief sleek skeleton / scanning pulse animation while parsing.
- **Predatory Contract Result State:** Split-screen view with red/amber badges, low health score, and risk breakdown.
- **Fair Contract Result State (Edge Case):** 90–95/100 score, green checkmarks, and celebratory "Safe to Sign — No Predatory Traps Found" card.
- **Corrupted / Empty PDF State (Edge Case):** Friendly alert banner: *"Unable to extract text from this file. Please verify it is a valid text-based PDF or paste the contract text directly."*
- **Reset State:** Clicking "Clear & Test Another Contract" cleanly returns the UI to the initial state without page reload.

---

## Product Decisions

- **Client-Side Parsing & Zero Auth:** Implemented fully in-browser so hackathon judges and freelancers can test immediately with zero account creation or setup friction.
- **Split-Screen over Stacked View:** Side-by-side presentation allows the user to see the legal text in context while reading the plain-English risk explanation.
- **Dual Tone (Awareness + Action):** Rather than only warning the user, FairShare provides ready-to-send diplomatic responses to prevent lost deals.

---

## What We're Building (PoC Scope)

- Complete single-page web app with responsive split-screen layout.
- Client-side PDF extractor and contract clause analyzer.
- 4-pillar contract health scoring algorithm.
- Interactive bidirectional highlighting between document text and risk cards.
- Diplomatic negotiation email generator with 1-click clipboard copy.
- Built-in sample predatory contract + sample fair contract.
- Corrupted/empty file error handling and session reset.

---

## Deferred From the POC

- Multi-user authentication and database cloud storage.
- Contract version comparison / side-by-side revision diffs.
- Custom tone adjustment slider (e.g., "Firm" vs. "Casual").

---

## Non-Goals

- Legally binding e-signatures or DocuSign integration.
- Connecting users to live lawyers or paid marketplace services.
- Providing formal legal representation (app includes a clear informational disclaimer).

---

## Open Questions

None blocking implementation. Technical stack and architecture choices will be finalized in `4-spec`.
