import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HowItWorks } from './components/HowItWorks';
import { ContractInput } from './components/ContractInput';
import { WorkspaceView } from './components/WorkspaceView';
import { analyzeContract } from './services/contractSentinel';
import { extractTextFromPdf } from './services/pdfParser';

export function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyzeText = (text, fileName = 'Contract.txt') => {
    setError(null);
    setIsAnalyzing(true);

    try {
      const result = analyzeContract(text);
      if (result.error) {
        setError(result.error);
        setIsAnalyzing(false);
        return;
      }
      result.fileName = fileName;
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing the contract.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzePdf = async (file) => {
    setError(null);
    setIsAnalyzing(true);

    try {
      const text = await extractTextFromPdf(file);
      const result = analyzeContract(text);
      if (result.error) {
        setError(result.error);
        setIsAnalyzing(false);
        return;
      }
      result.fileName = file.name;
      setAnalysisResult(result);
    } catch (err) {
      setError(
        `Unable to extract text from "${file.name}". Please make sure it is a valid text-based PDF or switch to the "Paste Contract Text" tab.`
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col font-sans">
      <Navbar onReset={handleReset} hasActiveContract={!!analysisResult} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {!analysisResult ? (
          <div>
            {/* Hero / Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 pt-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
                🛡️ AI-Powered Contract Shield for Freelancers
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                Never sign away your rights or work for free.
              </h1>
              <p className="text-sm text-gray-400 leading-relaxed">
                FairShare scans client agreements for predatory scope-creep, delayed payment traps, and intellectual property grabs — then arms you with polite, ready-to-send counter-clauses.
              </p>
            </div>

            {/* How It Works Guide */}
            <HowItWorks />

            {/* Contract Input Card */}
            <ContractInput
              onAnalyzeText={handleAnalyzeText}
              onAnalyzePdf={handleAnalyzePdf}
              isAnalyzing={isAnalyzing}
              error={error}
            />
          </div>
        ) : (
          <WorkspaceView analysisResult={analysisResult} />
        )}
      </main>

      <footer className="border-t border-gray-900 bg-[#0d131f]/60 py-6 mt-12 text-center text-xs text-gray-500">
        <p>
          FairShare is an educational and negotiation assistance tool built for the Devpost Learn Hackathon. Not formal legal representation.
        </p>
      </footer>
    </div>
  );
}

export default App;
