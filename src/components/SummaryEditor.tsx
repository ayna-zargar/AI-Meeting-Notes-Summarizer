import React, { useState, useEffect } from 'react';
import { Edit, Save, RefreshCw } from 'lucide-react';

interface SummaryEditorProps {
  summary: string;
  onSummaryChange: (summary: string) => void;
  isEdited: boolean;
}

export const SummaryEditor: React.FC<SummaryEditorProps> = ({
  summary,
  onSummaryChange,
  isEdited
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(summary);

  useEffect(() => {
    setEditedContent(summary);
  }, [summary]);

  const handleSave = () => {
    onSummaryChange(editedContent);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedContent(summary);
    setEditMode(false);
  };

  if (!summary) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900">Generated Summary</h2>
          {isEdited && (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
              Edited
            </span>
          )}
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
            editMode
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          {editMode ? (
            <>
              <RefreshCw className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit className="w-4 h-4" />
              Edit Summary
            </>
          )}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {editMode ? (
          <div className="space-y-4 p-4">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-96 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              placeholder="Edit your summary here..."
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: summary.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};