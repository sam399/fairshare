import React from 'react';
import { UploadCloud, ShieldAlert, Send } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: <UploadCloud className="w-5 h-5 text-blue-400" />,
      title: 'Upload or Paste Agreement',
      desc: 'Drop any client contract PDF or paste text. Runs 100% locally in your browser with zero privacy risk.'
    },
    {
      step: '02',
      icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
      title: 'Sentinel Traps Audit',
      desc: 'Evaluates the 4 deadly freelancer traps: unpaid lifetime bug fixes, Net-90 delays, prior IP grabs, and non-competes.'
    },
    {
      step: '03',
      icon: <Send className="w-5 h-5 text-emerald-400" />,
      title: 'Diplomatic Negotiation',
      desc: 'Get a real-time Contract Health Score and 1-click polite counter-proposals to push back safely without losing deals.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {steps.map((s, idx) => (
        <div
          key={idx}
          className="bg-[#111827] border border-gray-800 rounded-xl p-5 relative overflow-hidden group hover:border-gray-700 transition"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center">
              {s.icon}
            </div>
            <span className="text-xs font-mono font-bold text-gray-500">{s.step}</span>
          </div>
          <h3 className="text-sm font-bold text-white mb-1.5">{s.title}</h3>
          <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
