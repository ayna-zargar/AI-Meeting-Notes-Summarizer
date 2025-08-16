import React, { useState } from "react";
import { Brain, Loader, Sparkles } from "lucide-react";
import { generateSummary } from "../utils/api";

interface SummaryGeneratorProps {
  transcript: string;
  prompt: string;
  onSummaryGenerated: (summary: string) => void;
  disabled?: boolean;
}

export const SummaryGenerator: React.FC<SummaryGeneratorProps> = ({
  transcript,
  prompt,
  onSummaryGenerated,
  disabled = false,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    if (!transcript.trim() || !prompt.trim()) return;

    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      const summary = await generateSummary(transcript, prompt);
      clearInterval(progressInterval);
      setProgress(100);

      // Small delay to show 100% progress
      setTimeout(() => {
        onSummaryGenerated(summary);
        setIsGenerating(false);
        setProgress(0);
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      console.error("Error generating summary:", error);
      alert("Failed to generate summary. Please try again.");
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const canGenerate = transcript.trim() && prompt.trim() && !disabled;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Generate Summary
        </h2>
        {isGenerating && (
          <div className="flex items-center gap-2 text-blue-600">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">AI Processing...</span>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              AI-Powered Summary Generation
            </h3>
            <p className="text-sm text-gray-600">
              Transform your meeting transcript into a structured, actionable
              summary
            </p>
          </div>
        </div>

        {isGenerating && (
          <div className="mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Processing transcript...</span>
              <span className="font-medium text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={!canGenerate || isGenerating}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            canGenerate && !isGenerating
              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isGenerating ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Generating Summary...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate AI Summary
            </>
          )}
        </button>

        {!canGenerate && !isGenerating && (
          <p className="text-sm text-gray-500 mt-2 text-center">
            Please upload a transcript and select summary instructions to
            continue
          </p>
        )}
      </div>
    </div>
  );
};
