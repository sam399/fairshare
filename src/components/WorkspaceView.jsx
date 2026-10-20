import React, { useState } from 'react';
import { HealthScoreGauge } from './HealthScoreGauge';
import { DocumentViewer } from './DocumentViewer';
import { RiskCard } from './RiskCard';
import { ShieldCheck, Copy, Check, FileCheck } from 'lucide-react';

export function WorkspaceView({ analysisResult }) {
  const [selectedClauseId, setSelectedClauseId] = useState(
    analysisResult.flaggedClauses[0]?.id || null
  );
  const [copiedAll, setCopiedAll] = useState(false);
  const cardsContainerRef = React.useRef(null);

  const handleSelectClause = (id) => {
    setSelectedClauseId(id);
    if (id) {
      setTimeout(() => {
        const cardElement = document.getElementById(`card-${id}`);
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    }
  };

  const handleCopyAllNegotiation = () => {
    const fullBrief = analysisResult.flaggedClauses
      .map(
        (c, idx) =>
          `[Item ${idx + 1}: ${c.title}]\nClause: "${c.matchedText}"\nRecommendation: ${c.fairStandard}\nSuggested Counter-Email:\n${c.counterProposal}\n`
      )
      .join('\n---\n\n');

    const emailHeader = `Hi [Client],\n\nThank you for sending over the agreement. I'm excited about the prospect of working together. I reviewed the contract terms and noticed a few standard adjustments needed so that the agreement aligns with standard independent contractor practices:\n\n${fullBrief}\n\nLet me know if these adjustments make sense. Looking forward to getting started!\n\nBest regards,\n[Your Name]`;

    navigator.clipboard.writeText(emailHeader);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const isClean = analysisResult.flaggedClauses.length === 0;

  return (
    <div className="space-y-6">
      {/* Top Health Score Gauge */}
      <HealthScoreGauge
        score={analysisResult.healthScore}
        riskLevel={analysisResult.riskLevel}
        summary={analysisResult.summary}
      />

      {/* Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Document Viewer (6 cols) */}
        <div className="lg:col-span-6">
          <DocumentViewer
            rawText={analysisResult.rawText}
            flaggedClauses={analysisResult.flaggedClauses}
            selectedClauseId={selectedClauseId}
            onSelectClause={handleSelectClause}
            fileName={analysisResult.fileName}
          />
        </div>

        {/* Right: Sentinel Audit & Diplomatic Counter Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                {isClean ? 'Contract Health Verdict' : 'Flagged Traps & Diplomatic Solutions'}
              </h2>
              <p className="text-xs text-gray-400">
                {isClean
                  ? 'All evaluated clauses meet balanced industry standards.'
                  : `${analysisResult.flaggedClauses.length} critical clauses require negotiation.`}
              </p>
            </div>

            {!isClean && (
              <button
                onClick={handleCopyAllNegotiation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-md shadow-blue-500/20"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied Full Brief!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Negotiation Email</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Clean Contract State (Edge Case) */}
          {isClean ? (
            <div className="bg-[#111827] border border-emerald-900/40 rounded-2xl p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Safe to Sign — No Predatory Traps Found</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto mt-1 leading-relaxed">
                  FairShare evaluated this agreement against standard freelance clauses. Payment windows are reasonable, IP terms respect prior works, and no perpetual free labor commitments were found.
                </p>
              </div>

              {analysisResult.safeIndicators.length > 0 && (
                <div className="pt-4 border-t border-gray-800 text-left space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5" /> Balanced Terms Detected:
                  </span>
                  {analysisResult.safeIndicators.map((item, idx) => (
                    <div key={idx} className="bg-gray-900 p-2.5 rounded-lg border border-gray-800 text-xs">
                      <span className="font-bold text-gray-200">{item.title}</span>
                      <p className="text-gray-400 text-[11px] mt-0.5">{item.explanation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3.5 max-h-[750px] overflow-y-auto pr-1">
              {analysisResult.flaggedClauses.map((clause) => (
                <RiskCard
                  key={clause.id}
                  clause={clause}
                  isActive={selectedClauseId === clause.id}
                  onSelect={() => setSelectedClauseId(clause.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
