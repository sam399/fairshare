/**
 * Contract Sentinel Analysis Engine
 * Evaluates contract text, detects clause patterns, and computes Health Score.
 */

import { RULES, SAFE_INDICATORS } from './rulesRegistry.js';

export function analyzeContract(rawText) {
  if (!rawText || rawText.trim().length === 0) {
    return {
      error: 'Empty document. Please upload a valid contract or paste contract clauses.'
    };
  }

  const flaggedClauses = [];
  let totalDeductions = 0;
  let criticalCount = 0;
  let warningCount = 0;

  // Split into sentences / paragraphs for precise matching
  RULES.forEach(rule => {
    for (const pattern of rule.patterns) {
      const match = rawText.match(pattern);
      if (match) {
        const matchedText = match[0];
        const startIndex = match.index ?? rawText.indexOf(matchedText);
        const endIndex = startIndex + matchedText.length;

        // Context snippet (surrounding sentence)
        const contextStart = Math.max(0, rawText.lastIndexOf('.', startIndex) + 1);
        let contextEnd = rawText.indexOf('.', endIndex);
        if (contextEnd === -1) contextEnd = rawText.length;
        const fullSnippet = rawText.substring(contextStart, contextEnd + 1).trim();

        flaggedClauses.push({
          id: `flag-${rule.id}-${flaggedClauses.length}`,
          ruleId: rule.id,
          category: rule.category,
          severity: rule.severity,
          title: rule.title,
          matchedText: fullSnippet || matchedText,
          startIndex,
          endIndex,
          explanation: rule.explanation,
          fairStandard: rule.fairStandard,
          counterProposal: rule.counterProposal
        });

        totalDeductions += rule.penalty;
        if (rule.severity === 'critical') criticalCount++;
        if (rule.severity === 'warning') warningCount++;
        break; // Match rule once per document
      }
    }
  });

  // Check for safe / healthy indicators
  const safeIndicators = [];
  SAFE_INDICATORS.forEach(indicator => {
    if (indicator.pattern.test(rawText)) {
      safeIndicators.push(indicator);
    }
  });

  // Calculate Health Score (capped between 10 and 100)
  let healthScore = Math.max(10, 100 - totalDeductions);
  if (flaggedClauses.length === 0 && safeIndicators.length > 0) {
    healthScore = 95;
  }

  let riskLevel = 'healthy';
  if (healthScore < 50 || criticalCount >= 2) {
    riskLevel = 'critical';
  } else if (healthScore < 80 || warningCount > 0) {
    riskLevel = 'caution';
  }

  return {
    rawText,
    healthScore,
    riskLevel,
    summary: {
      criticalCount,
      warningCount,
      fairCount: safeIndicators.length,
      totalFlags: flaggedClauses.length
    },
    flaggedClauses,
    safeIndicators
  };
}
