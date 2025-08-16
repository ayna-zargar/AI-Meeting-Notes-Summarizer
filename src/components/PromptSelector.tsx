import React, { useState } from "react";
import { MessageSquare, Users, CheckSquare, Edit3 } from "lucide-react";

interface PromptSelectorProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
}

const PRESET_PROMPTS = [
  {
    id: "executive",
    title: "Executive Summary",
    icon: Users,
    prompt:
      "Create an executive summary focusing on key decisions, financial impact, and strategic implications. Include high-level outcomes and next steps for leadership.",
    description: "Perfect for leadership and stakeholders",
  },
  {
    id: "bullets",
    title: "Bullet Points",
    icon: MessageSquare,
    prompt:
      "Summarize the meeting in clear bullet points covering key discussion topics, decisions made, and important information shared.",
    description: "Concise and easy to scan format",
  },
  {
    id: "actions",
    title: "Action Items",
    icon: CheckSquare,
    prompt:
      "Extract and organize all action items, tasks, and follow-up requirements. Include assignees, deadlines, and priority levels where mentioned.",
    description: "Focus on tasks and next steps",
  },
];

export const PromptSelector: React.FC<PromptSelectorProps> = ({
  prompt,
  onPromptChange,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [isCustom, setIsCustom] = useState(true);

  const handlePresetSelect = (presetPrompt: string, presetId: string) => {
    setSelectedPreset(presetId);
    setIsCustom(false);
    onPromptChange(presetPrompt);
  };

  const handleCustomPrompt = () => {
    setIsCustom(true);
    setSelectedPreset("");
  };

  const handleCustomChange = (value: string) => {
    onPromptChange(value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Summary Instructions
      </h2>

      {/* Custom Instructions - Primary Option */}
      <div className="space-y-3">
        <button
          onClick={handleCustomPrompt}
          className={`flex items-center gap-2 p-4 rounded-lg border-2 transition-all w-full text-left ${
            isCustom
              ? "border-purple-500 bg-purple-50 shadow-md"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <Edit3
            className={`w-5 h-5 ${
              isCustom ? "text-purple-600" : "text-gray-600"
            }`}
          />
          <div>
            <span
              className={`font-medium ${
                isCustom ? "text-purple-900" : "text-gray-900"
              }`}
            >
              Custom Instructions
            </span>
            <p
              className={`text-sm ${
                isCustom ? "text-purple-700" : "text-gray-600"
              }`}
            >
              Write your own custom prompt for AI summary generation
            </p>
          </div>
        </button>

        {isCustom && (
          <div className="space-y-2">
            <textarea
              value={prompt}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder="Enter your custom instructions for the AI summary..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Or choose a preset
          </span>
        </div>
      </div>

      {/* Preset Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PRESET_PROMPTS.map((preset) => {
          const Icon = preset.icon;
          const isSelected = selectedPreset === preset.id;

          return (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset.prompt, preset.id)}
              className={`p-4 text-left rounded-lg border-2 transition-all hover:shadow-md ${
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon
                  className={`w-5 h-5 ${
                    isSelected ? "text-blue-600" : "text-gray-600"
                  }`}
                />
                <h3
                  className={`font-medium ${
                    isSelected ? "text-blue-900" : "text-gray-900"
                  }`}
                >
                  {preset.title}
                </h3>
              </div>
              <p
                className={`text-sm ${
                  isSelected ? "text-blue-700" : "text-gray-600"
                }`}
              >
                {preset.description}
              </p>
            </button>
          );
        })}
      </div>

      {prompt && !isCustom && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Selected prompt:</strong> {prompt}
          </p>
        </div>
      )}
    </div>
  );
};
