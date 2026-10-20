/**
 * Rules Registry for FairShare
 * Extensible legal intelligence patterns and diplomatic pushback templates.
 */

export const RULES = [
  {
    id: 'unpaid-maintenance',
    category: 'Scope & Revisions',
    severity: 'critical',
    penalty: 25,
    title: 'Indefinite Uncompensated Support & Bug Fixing',
    patterns: [
      /(?:contractor|developer|freelancer)\s+(?:shall|agrees?\s+to)\s+(?:provide|perform|rectify|remedy|correct)\s+(?:all\s+)?(?:errors?|defects?|bugs?|maintenance|support|changes?)\s+(?:indefinitely|perpetually|forever|at\s+any\s+time|without\s+(?:further|additional)?\s+(?:compensation|charge|cost)|free\s+of\s+charge)/i,
      /(?:unlimited\s+revisions|revisions\s+without\s+limit|support\s+free\s+of\s+charge\s+in\s+perpetuity)/i,
      /(?:maintain|support)\s+the\s+deliverables?\s+without\s+additional\s+compensation/i,
      /unlimited\s+free\s+defect\s+corrections?\s+indefinitely/i
    ],
    explanation: 'This clause binds you to fix issues forever without pay. If the client modifies code or third-party APIs break months later, they could claim breach of contract if you refuse to fix it for free.',
    fairStandard: 'Standard industry practice is a 30-day post-launch warranty for pre-existing bugs, after which all maintenance or feature changes are billed at your standard hourly rate.',
    counterProposal: 'Hi [Client], I reviewed Section 7 regarding post-launch corrections. Industry standard for independent development provides a 30-day warranty window following launch to resolve any bugs in the original scope. Ongoing maintenance or revisions thereafter are billed under an hourly support agreement. Would updating Section 7 to reflect a 30-day warranty work on your end?'
  },
  {
    id: 'payment-delay',
    category: 'Payment Terms',
    severity: 'critical',
    penalty: 20,
    title: 'Excessive Payment Window (Net-60 / Net-90 / Pay-When-Paid)',
    patterns: [
      /(?:payment|invoices?)\s+(?:shall|will)?\s*(?:be\s+paid|remitted|released|disbursed)\s+within\s+(?:4[5-9]|[5-9][0-9]|1[0-9]{2})\s+(?:business\s+|calendar\s+)?days/i,
      /within\s+90\s+business\s+days/i,
      /pay[\s-]when[\s-]paid|pay[\s-]if[\s-]paid/i,
      /(?:client|company)\s+reserves\s+the\s+right\s+to\s+withhold\s+payment\s+at\s+its\s+sole\s+discretion/i
    ],
    explanation: 'Payment windows beyond Net-30 (such as Net-60 or Net-90) force you to act as an interest-free bank for the client. "Pay-if-paid" clauses mean if their customer does not pay them, you do not get paid at all.',
    fairStandard: 'Independent contractor payments should follow Net-15 or Net-30 terms, with milestone deliverables gated by a 50% upfront deposit.',
    counterProposal: 'Hi [Client], regarding the payment terms in Section 4: as an independent professional, my standard operating terms are Net-30 following invoice submission (with payment milestones tied to clear delivery stages). Net-90 puts significant cash-flow strain on individual contractors. Could we adjust this clause to Net-30?'
  },
  {
    id: 'ip-grab',
    category: 'IP & Ownership',
    severity: 'critical',
    penalty: 25,
    title: 'Overbroad Intellectual Property Grab (Including Prior Works)',
    patterns: [
      /(?:all|any)\s+(?:prior|pre-existing|background)\s+(?:inventions|intellectual\s+property|tools|code|libraries|methods)\s+(?:shall\s+become|are\s+deemed)\s+the\s+(?:sole|exclusive)\s+property\s+of\s+(?:the\s+)?(?:client|company)/i,
      /(?:contractor|developer)\s+assigns?\s+(?:all|any\s+and\s+all)\s+(?:worldwide\s+)?rights?,\s+titles?,\s+and\s+interests?\s+(?:in\s+and\s+to\s+all\s+works?|including\s+tools)/i,
      /(?:assigns?\s+all\s+pre-existing\s+materials\s+and\s+reusable\s+code\s+libraries)/i,
      /waives?\s+(?:all\s+)?moral\s+rights\s+and\s+portfolio\s+display/i
    ],
    explanation: 'While the client should rightfully own the custom deliverables they pay for, seizing your "prior inventions" or "pre-existing libraries" means you lose the rights to code, boilerplate, and tools you built before this project.',
    fairStandard: 'The client receives full ownership of custom project deliverables upon full payment, while the contractor retains ownership of pre-existing tools and receives a non-exclusive license to use them.',
    counterProposal: 'Hi [Client], in Section 6 regarding IP assignment: I gladly assign 100% ownership of all custom project deliverables created specifically for you upon receipt of final payment. However, the current language also assigns pre-existing tools and background IP. Standard practice is for the contractor to retain ownership of background developer tools while granting you a perpetual, royalty-free license to use them in the deliverables. Let\'s clarify this distinction so we are both protected.'
  },
  {
    id: 'non-compete',
    category: 'Restrictive Covenants',
    severity: 'warning',
    penalty: 15,
    title: 'Restrictive Post-Contract Non-Compete Clause',
    patterns: [
      /(?:contractor|freelancer)\s+shall\s+not\s+(?:directly\s+or\s+indirectly\s+)?(?:engage\s+in|perform\s+services\s+for|work\s+with)\s+(?:any\s+)?(?:competing|similar)\s+(?:business|clients?|industry)/i,
      /(?:non[\s-]compete\s+for\s+a\s+period\s+of\s+[1-9]\s+years?|within\s+[1-9]\s+years?\s+following\s+termination)/i,
      /restrict(?:ed|ing)?\s+from\s+working\s+in\s+the\s+same\s+industry/i
    ],
    explanation: 'Non-compete clauses for freelancers can prevent you from taking other clients in your primary field of expertise for years. Many jurisdictions consider non-competes on independent contractors unenforceable, but signing one invites legal threats.',
    fairStandard: 'Freelancers should agree to strict confidentiality and non-solicitation of the client\'s direct customers, but never a general restriction against practicing their trade.',
    counterProposal: 'Hi [Client], regarding the non-compete provision in Section 9: I am fully committed to signing a strict non-disclosure agreement (NDA) and protecting all confidential company data. However, as an independent specialist serving this sector, I cannot agree to a general non-compete that restricts me from working with other clients in the industry. Could we replace Section 9 with a robust mutual non-disclosure and client non-solicitation clause?'
  },
  {
    id: 'unilateral-termination',
    category: 'Termination & Liability',
    severity: 'warning',
    penalty: 10,
    title: 'Unilateral Immediate Termination Without Pro-Rata Payment',
    patterns: [
      /(?:client|company)\s+may\s+terminate\s+(?:this\s+agreement\s+)?immediately\s+without\s+cause\s+and\s+without\s+(?:further\s+)?(?:obligation|payment)/i,
      /terminate\s+at\s+will\s+without\s+compensating\s+for\s+work\s+in\s+progress/i
    ],
    explanation: 'Allows the client to cancel the contract at any moment without paying for the work you already completed leading up to termination.',
    fairStandard: 'Either party may terminate with 14 days written notice, with the client obligated to pay for all work completed and milestones reached up to the termination date.',
    counterProposal: 'Hi [Client], on the termination clause in Section 10: I\'d like to include standard mutual terms where either party can terminate with 14 days written notice, with payment guaranteed for all verified work completed up to that date. This ensures fair closure for both sides.'
  }
];

export const SAFE_INDICATORS = [
  {
    id: 'net-30-fair',
    category: 'Payment Terms',
    title: 'Balanced Net-30 Payment Window',
    pattern: /within\s+30\s+(?:calendar\s+|business\s+)?days/i,
    explanation: 'Provides reasonable, standard payment turnaround.'
  },
  {
    id: 'warranty-capped',
    category: 'Scope & Revisions',
    title: 'Capped 30-Day Warranty Period',
    pattern: /30[\s-]day\s+(?:warranty|support\s+period)/i,
    explanation: 'Protects both parties with a well-defined delivery bug window.'
  },
  {
    id: 'mutual-confidentiality',
    category: 'IP & Ownership',
    title: 'Mutual Non-Disclosure Protection',
    pattern: /mutual\s+(?:confidentiality|non[\s-]disclosure)/i,
    explanation: 'Protects both contractor and client confidential materials equally.'
  }
];
