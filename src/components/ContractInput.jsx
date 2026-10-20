import React, { useState } from 'react';
import { UploadCloud, FileText, Zap, Sparkles, AlertCircle } from 'lucide-react';
import { SAMPLE_PREDATORY_CONTRACT } from '../data/samplePredatoryContract';
import { SAMPLE_FAIR_CONTRACT } from '../data/sampleFairContract';

export function ContractInput({ onAnalyzeText, onAnalyzePdf, isAnalyzing, error }) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'paste'
  const [pastedText, setPastedText] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onAnalyzePdf(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onAnalyzePdf(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6 flex-wrap gap-4">
        <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'upload'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            Upload PDF
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'paste'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Paste Contract Text
          </button>
        </div>

        {/* Quick Sample Triggers for Judges */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onAnalyzeText(SAMPLE_PREDATORY_CONTRACT, 'Sample_Trap_Agreement.pdf')}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition"
          >
            <Zap className="w-3.5 h-3.5" />
            ⚡ Load Sample Predatory Contract
          </button>

          <button
            onClick={() => onAnalyzeText(SAMPLE_FAIR_CONTRACT, 'Standard_Fair_Contract.pdf')}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            ✨ Load Balanced Contract
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Scan Error</p>
            <p className="text-gray-300 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Tab 1: Upload Dropzone */}
      {activeTab === 'upload' && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-2xl p-10 text-center transition cursor-pointer flex flex-col items-center justify-center relative ${
            isDragging
              ? 'border-blue-500 bg-blue-500/5'
              : 'border-gray-700/80 hover:border-gray-600 bg-gray-900/50'
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            disabled={isAnalyzing}
          />
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">
            {isAnalyzing ? 'Extracting and analyzing contract...' : 'Drop your contract PDF here'}
          </h3>
          <p className="text-xs text-gray-400 max-w-sm">
            Or click to browse from your device. Extracted 100% locally in-memory — your agreement never leaves your browser.
          </p>
        </div>
      )}

      {/* Tab 2: Paste Raw Text */}
      {activeTab === 'paste' && (
        <div className="space-y-4">
          <textarea
            rows={10}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste your client agreement, statement of work, or legal clauses here..."
            className="w-full bg-gray-900/90 border border-gray-700 rounded-xl p-4 text-sm font-mono text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <div className="flex justify-end">
            <button
              onClick={() => onAnalyzeText(pastedText, 'Pasted_Contract.txt')}
              disabled={isAnalyzing || !pastedText.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs transition shadow-lg shadow-blue-500/25"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Contract Clauses'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
