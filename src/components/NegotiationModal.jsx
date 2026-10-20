import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Mail, ShieldAlert } from 'lucide-react';

export function NegotiationModal({ isOpen, onClose, flaggedClauses, onToast }) {
  const [contractorName, setContractorName] = useState('Alex Rivera');
  const [clientName, setClientName] = useState('Apex Media Team');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const emailBody = `Hi ${clientName},

Thank you for sending over the agreement. I'm genuinely looking forward to collaborating on this project!

I reviewed the draft agreement and noticed a few clauses where industry-standard adjustments are needed so both sides remain protected and aligned:

${flaggedClauses
  .map(
    (c, idx) =>
      `--------------------------------------------------\nItem ${idx + 1}: ${c.title}\nFlagged Clause: "${c.matchedText}"\n\nProposed Balanced Revision:\n${c.counterProposal}`
  )
  .join('\n\n')}

--------------------------------------------------

Could you let me know if these adjustments make sense to your team? Once updated, I'll be thrilled to sign and get started right away.

Best regards,
${contractorName}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    if (onToast) onToast('Full negotiation email copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#111827] border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-gray-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Diplomatic Negotiation Email Brief
              </h2>
              <p className="text-xs text-gray-400">
                Tailored, respectful email reply with counter-proposals for all {flaggedClauses.length} flagged traps.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customization Inputs */}
        <div className="px-5 py-3.5 bg-gray-900/40 border-b border-gray-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Client / Team Name
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Your Name / Sign-off
            </label>
            <input
              type="text"
              value={contractorName}
              onChange={(e) => setContractorName(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Formatted Email Preview */}
        <div className="p-5 overflow-y-auto flex-1 font-mono text-xs text-gray-300 whitespace-pre-wrap leading-relaxed select-text bg-[#0b0f19]">
          {emailBody}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/60 flex items-center justify-between gap-3">
          <span className="text-[11px] text-gray-500 hidden sm:inline">
            💡 Ready to paste into Gmail, Outlook, or Slack
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-500/25"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Complete Email</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
