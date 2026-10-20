import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, Copy, Check, Sparkles, Scale } from 'lucide-react';

export function RiskCard({ clause, isActive, onSelect }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const isCritical = clause.severity === 'critical';
  const severityBadge = isCritical
    ? 'bg-red-500/15 text-red-400 border-red-500/30'
    : 'bg-amber-500/15 text-amber-400 border-amber-500/30';

  const cardBorder = isActive
    ? 'border-blue-500 ring-2 ring-blue-500/20'
    : isCritical
    ? 'border-red-950 hover:border-red-800'
    : 'border-amber-950 hover:border-amber-800';

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(clause.counterProposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      onClick={onSelect}
      className={`bg-[#111827] border rounded-xl transition cursor-pointer overflow-hidden ${cardBorder}`}
    >
      {/* Card Header */}
      <div className="p-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${severityBadge}`}>
              {clause.severity}
            </span>
            <span className="text-xs font-semibold text-gray-400">{clause.category}</span>
          </div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertCircle className={`w-4 h-4 ${isCritical ? 'text-red-400' : 'text-amber-400'}`} />
            {clause.title}
          </h3>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-1 space-y-3.5 border-t border-gray-800/60 text-xs">
          {/* Matched Excerpt */}
          <div className="bg-gray-900/90 rounded-lg p-3 border border-gray-800">
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>📄 Flagged Contract Language</span>
            </div>
            <p className="font-mono text-gray-300 leading-relaxed italic bg-black/30 p-2 rounded border border-gray-800">
              "{clause.matchedText}"
            </p>
          </div>

          {/* Plain English Danger Explanation */}
          <div>
            <div className="text-[11px] font-semibold text-red-400 uppercase tracking-wider mb-1">
              ⚠️ Why this puts you at risk:
            </div>
            <p className="text-gray-300 leading-relaxed">{clause.explanation}</p>
          </div>

          {/* Balanced Industry Standard */}
          <div className="bg-blue-950/20 border border-blue-900/30 rounded-lg p-3">
            <div className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" /> Balanced Industry Standard
            </div>
            <p className="text-gray-300 leading-relaxed">{clause.fairStandard}</p>
          </div>

          {/* Diplomatic Counter-Proposal Action */}
          <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Diplomatic Counter-Proposal
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-gray-300 text-[11px] leading-relaxed italic bg-black/40 p-2.5 rounded border border-emerald-900/20">
              "{clause.counterProposal}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
