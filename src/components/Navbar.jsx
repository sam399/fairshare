import React from 'react';
import { Shield, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';

export function Navbar({ onReset, hasActiveContract }) {
  return (
    <header className="border-b border-gray-800 bg-[#0d131f]/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">FairShare</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Sentinel v1.0
              </span>
            </div>
            <p className="text-xs text-gray-400 hidden sm:block">Freelance Contract & Scope-Creep Sentinel</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-gray-400 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Devpost Learn Hackathon Project
          </span>

          {hasActiveContract && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition border border-gray-700"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Clear & Test Another
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
