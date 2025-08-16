import React, { useState } from "react";
import { Brain, FileText } from "lucide-react";
import { TranscriptUploader } from "./components/TranscriptUploader";
import { PromptSelector } from "./components/PromptSelector";
import { SummaryGenerator } from "./components/SummaryGenerator";
import { SummaryEditor } from "./components/SummaryEditor";
import { EmailSharer } from "./components/EmailSharer";

function App() {
  const [transcript, setTranscript] = useState("");
  const [transcriptFileName, setTranscriptFileName] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  const handleTranscriptChange = (content: string, fileName?: string) => {
    setTranscript(content);
    setTranscriptFileName(fileName || "");
    // Reset summary when transcript changes
    setSummary("");
    setIsEdited(false);
  };

  const handleSummaryGenerated = (generatedSummary: string) => {
    setSummary(generatedSummary);
    setIsEdited(false);
  };

  const handleSummaryChange = (editedSummary: string) => {
    setSummary(editedSummary);
    setIsEdited(true);
  };

  const handleEmailSent = () => {
    // Could add success notification or reset form
    console.log("Email sent successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Briefly-AI Meeting Notes Summarizer
              </h1>
              <p className="text-gray-600 mt-1">
                Transform your meeting transcripts into structured, actionable
                summaries
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <TranscriptUploader
                transcript={transcript}
                onTranscriptChange={handleTranscriptChange}
              />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <PromptSelector prompt={prompt} onPromptChange={setPrompt} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <SummaryGenerator
                transcript={transcript}
                prompt={prompt}
                onSummaryGenerated={handleSummaryGenerated}
              />
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="space-y-8">
            {summary && (
              <>
                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                  <SummaryEditor
                    summary={summary}
                    onSummaryChange={handleSummaryChange}
                    isEdited={isEdited}
                  />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <EmailSharer
                    summary={summary}
                    onEmailSent={handleEmailSent}
                  />
                </div>
              </>
            )}

            {!summary && (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Ready to Generate Summary
                  </h3>
                  <p className="text-gray-600">
                    Upload your meeting transcript and select summary
                    instructions to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-6">
              <span>
                Transcript:{" "}
                {transcript
                  ? `${transcript.length} characters`
                  : "Not uploaded"}
              </span>
              <span>Prompt: {prompt ? "Selected" : "Not selected"}</span>
              <span>
                Summary:{" "}
                {summary
                  ? isEdited
                    ? "Generated & Edited"
                    : "Generated"
                  : "Not generated"}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              AI-Powered • Secure • Production-Ready
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
