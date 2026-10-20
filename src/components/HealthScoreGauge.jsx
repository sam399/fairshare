import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

export function HealthScoreGauge({ score, riskLevel, summary }) {
  // Determine color theme based on score
  let strokeColor = '#ef4444'; // Red
  let badgeBg = 'bg-red-500/15 text-red-400 border-red-500/30';
  let statusText = 'Critical Risk — Predatory Terms Detected';
  let Icon = ShieldAlert;

  if (score >= 80) {
    strokeColor = '#10b981'; // Green
    badgeBg = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    statusText = 'Healthy — Balanced Agreement';
    Icon = ShieldCheck;
  } else if (score >= 50) {
    strokeColor = '#f59e0b'; // Amber
    badgeBg = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    statusText = 'Caution — Negotiate Flagged Clauses';
    Icon = AlertTriangle;
  }

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-5">
          {/* Circular SVG Meter */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="#1f2937"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke={strokeColor}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-white">{score}</span>
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">/ 100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeBg}`}>
                <Icon className="w-3.5 h-3.5" />
                {riskLevel}
              </span>
            </div>
            <h2 className="text-base font-bold text-white">{statusText}</h2>
            <p className="text-xs text-gray-400 mt-1">
              Automated audit across payment windows, scope creep, intellectual property, and restrictive covenants.
            </p>
          </div>
        </div>

        {/* Category Metric Badges */}
        <div className="flex items-center gap-2 sm:border-l sm:border-gray-800 sm:pl-6 w-full sm:w-auto justify-around sm:justify-start">
          <div className="text-center px-3 py-2 rounded-xl bg-gray-900 border border-gray-800">
            <div className="text-lg font-bold text-red-400">{summary.criticalCount}</div>
            <div className="text-[10px] uppercase font-semibold text-gray-500">Critical</div>
          </div>
          <div className="text-center px-3 py-2 rounded-xl bg-gray-900 border border-gray-800">
            <div className="text-lg font-bold text-amber-400">{summary.warningCount}</div>
            <div className="text-[10px] uppercase font-semibold text-gray-500">Cautions</div>
          </div>
          <div className="text-center px-3 py-2 rounded-xl bg-gray-900 border border-gray-800">
            <div className="text-lg font-bold text-emerald-400">{summary.fairCount}</div>
            <div className="text-[10px] uppercase font-semibold text-gray-500">Fair</div>
          </div>
        </div>
      </div>
    </div>
  );
}
