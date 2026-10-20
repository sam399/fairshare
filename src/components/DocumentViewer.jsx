import React, { useEffect, useRef } from 'react';
import { FileText } from 'lucide-react';

export function DocumentViewer({ rawText, flaggedClauses, selectedClauseId, onSelectClause, fileName }) {
  const containerRef = useRef(null);

  // Auto-scroll to selected mark inside document viewer when selectedClauseId changes
  useEffect(() => {
    if (selectedClauseId && containerRef.current) {
      const activeElement = containerRef.current.querySelector(`#mark-${selectedClauseId}`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedClauseId]);

  // Build highlighted spans by mapping clause positions
  // Sort clauses by startIndex to safely slice text
  const sortedClauses = [...flaggedClauses].sort((a, b) => a.startIndex - b.startIndex);

  const renderHighlightedContent = () => {
    if (!sortedClauses || sortedClauses.length === 0) {
      return (
        <div className="whitespace-pre-wrap font-mono text-xs text-gray-300 leading-relaxed">
          {rawText}
        </div>
      );
    }

    const segments = [];
    let lastIndex = 0;

    sortedClauses.forEach((clause) => {
      // Find position of matched clause in rawText
      let matchPos = rawText.indexOf(clause.matchedText, lastIndex);
      if (matchPos === -1) {
        matchPos = clause.startIndex;
      }

      if (matchPos > lastIndex) {
        segments.push(
          <span key={`text-${lastIndex}`}>{rawText.slice(lastIndex, matchPos)}</span>
        );
      }

      const isSelected = selectedClauseId === clause.id;
      const isCritical = clause.severity === 'critical';
      const highlightClasses = isSelected
        ? 'bg-blue-600/40 border-b-2 border-blue-400 text-white font-bold ring-2 ring-blue-500/50 shadow-md'
        : isCritical
        ? 'bg-red-500/20 border-b-2 border-red-500/60 text-red-200 hover:bg-red-500/35'
        : 'bg-amber-500/20 border-b-2 border-amber-500/60 text-amber-200 hover:bg-amber-500/35';

      segments.push(
        <mark
          id={`mark-${clause.id}`}
          key={clause.id}
          onClick={() => onSelectClause(clause.id)}
          title={`Click to inspect: ${clause.title}`}
          className={`cursor-pointer rounded px-1.5 py-0.5 transition-all duration-200 ${highlightClasses}`}
        >
          {clause.matchedText}
        </mark>
      );

      lastIndex = matchPos + clause.matchedText.length;
    });

    if (lastIndex < rawText.length) {
      segments.push(
        <span key={`text-end`}>{rawText.slice(lastIndex)}</span>
      );
    }

    return (
      <div className="whitespace-pre-wrap font-mono text-xs text-gray-300 leading-relaxed select-text">
        {segments}
      </div>
    );
  };

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl flex flex-col h-[750px] shadow-xl overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/60 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-400" />
          <span className="font-bold text-xs text-white truncate max-w-xs">{fileName || 'Contract Document'}</span>
        </div>
        <span className="text-[11px] text-gray-400 bg-gray-800 px-2.5 py-0.5 rounded-full border border-gray-700">
          Interactive Document View
        </span>
      </div>

      {/* Contract Text Body */}
      <div ref={containerRef} className="p-6 overflow-y-auto flex-1 bg-[#0d131f]/60 scroll-smooth">
        {renderHighlightedContent()}
      </div>
    </div>
  );
}
