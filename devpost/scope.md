---
doc: scope
status: approved
---

# FairShare

A sleek, trustworthy freelance contract scanner and scope-creep sentinel that flags predatory clauses, explains legal traps in plain English, and generates polite, professional counter-proposals freelancers can copy-paste to negotiate safely.

## The Unique Kernel
Most contract tools stop at highlighting risky legal text, leaving inexperienced freelancers unsure of how to push back without losing the deal. FairShare pairs clear risk awareness with **diplomatic action**: for every dangerous clause (unpaid post-delivery maintenance, extreme payment delays, broad IP grabs), it provides an actionable, polite counter-proposal ready to send to clients without sounding aggressive or arrogant.

## Who It's For
Early-career and independent freelancers (developers, designers, digital creators) reviewing client agreements. They currently either sign blind out of fear or struggle to decode convoluted legal phrasing and lack the funds for formal legal counsel.

## The Core Loop
1. The freelancer opens the executive dashboard and uploads a contract PDF (or clicks a pre-loaded sample contract).
2. FairShare parses the clauses and immediately calculates an overall **Contract Fairness Score** (0–100) with visual risk badges.
3. The user inspects flagged traps (uncompensated post-delivery fixes, delayed compensation, sneaky IP surrender, non-competes).
4. For each trap, they read a plain-language explanation of why it puts them at risk.
5. They click to generate a ready-to-copy, polite counter-clause and diplomatic client email snippet to negotiate with confidence.

## Inspiration & Identity
- **Aesthetic:** Modern, executive, and trustworthy. Built with mature developer craftsmanship—clean modern dark/light styling (inspired by Linear and Stripe), crisp typography, clear risk color-coding (emerald green, amber warning, crimson alert), and zero cartoonish or toy styling.
- **Tone:** Empathetic, empowering, objective, and professional.

## Why This Matters to the Learner
The learner wants to build a genuinely helpful tool that solves a real vulnerability for freelancers, giving them confidence and protection against exploitation, while gaining firsthand experience planning and delivering an end-to-end hackathon project.

## What "Working" Looks Like
In the under-3-minute video and local test:
- The app loads instantly in the browser with zero login friction.
- Clicking "Load Sample Predatory Contract" or uploading a contract PDF parses the document immediately.
- The dashboard displays the animated Contract Fairness Score (e.g., 38/100 "Critical Risk").
- Four distinct high-risk clauses are highlighted:
  1. *Uncompensated post-delivery bug fixes / scope creep*
  2. *Net-90 / Delayed payment terms*
  3. *Unrestricted intellectual property transfer including prior works*
  4. *Overbroad non-compete clause*
- Expanding any card reveals a plain-English risk breakdown and a copyable, diplomatic email response.
- The user clicks "Copy Negotiation Email" and sees an instant confirmation toast.

## The POC Boundary
- Single-page responsive web application running locally with fast client-side PDF parsing and contract clause analysis.
- Pre-loaded "Sample Trap Contract" so hackathon judges and evaluators can test the entire pipeline in 5 seconds without uploading private files.
- Real-time fairness scoring algorithm, categorical risk breakdown, and actionable counter-proposal generator.
- One-click clipboard copy for counter-clauses and email drafts.

## Later
- Multi-user authentication and saved contract dashboard.
- Contract version comparison / side-by-side revision diffs.
- Real-time clause re-writing with customizable tone sliders (e.g., "Firm", "Gentle", "Strict Legal").

## Explicitly Cut
- Real-time multi-party e-signing (adds excessive auth/compliance overhead not required for the PoC).
- Paid legal marketplace or connecting to live lawyers (distracts from the self-serve developer tool focus).
