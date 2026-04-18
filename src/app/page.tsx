"use client";
import { useState } from "react";

export default function Home() {
  const [inputs, setInputs] = useState<Record<string, string>>({
    company_name: "",
    industry: "",
    product_description: "",
    strengths: "",
    weaknesses: "",
    opportunities: "",
    threats: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setOutput(data.result || "No output received.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-gray-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-500/10" />
        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            AI-Powered Business Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-blue-400">AI SWOT Analysis Generator</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Generate comprehensive SWOT analyses with strategic insights powered by DeepSeek AI
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-gray-800/40 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Enter Your Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
              <input type="text" value={inputs.company_name} onChange={(e) => handleChange("company_name", e.target.value)} placeholder="e.g. Acme Corp" className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Industry</label>
              <input type="text" value={inputs.industry} onChange={(e) => handleChange("industry", e.target.value)} placeholder="e.g. SaaS, Healthcare, Fintech" className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Product Description</label>
              <textarea value={inputs.product_description} onChange={(e) => handleChange("product_description", e.target.value)} placeholder="Brief description of your product or service..." rows={3} className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Strengths</label>
                <textarea value={inputs.strengths} onChange={(e) => handleChange("strengths", e.target.value)} placeholder="Internal advantages..." rows={3} className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Weaknesses</label>
                <textarea value={inputs.weaknesses} onChange={(e) => handleChange("weaknesses", e.target.value)} placeholder="Internal limitations..." rows={3} className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Opportunities</label>
                <textarea value={inputs.opportunities} onChange={(e) => handleChange("opportunities", e.target.value)} placeholder="External market opportunities..." rows={3} className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Threats</label>
                <textarea value={inputs.threats} onChange={(e) => handleChange("threats", e.target.value)} placeholder="External challenges..." rows={3} className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none" />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating with AI...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate SWOT Analysis
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="mt-6 bg-red-900/20 border border-red-500/40 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        {output && (
          <div className="mt-8 bg-gray-800/40 rounded-2xl p-8 border border-blue-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Generated SWOT Analysis
              </h3>
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed font-mono bg-transparent p-0 m-0">
              {output}
            </pre>
          </div>
        )}

        <div className="mt-12 text-center text-gray-600 text-sm">
          Powered by DeepSeek AI · Built with Next.js 16
        </div>
      </div>
    </div>
  );
}
