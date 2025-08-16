import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface TranscriptUploaderProps {
  onTranscriptChange: (content: string, fileName?: string) => void;
  transcript: string;
}

export const TranscriptUploader: React.FC<TranscriptUploaderProps> = ({ 
  onTranscriptChange, 
  transcript 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onTranscriptChange(content, file.name);
        setUploadedFileName(file.name);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a text file (.txt)');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTranscriptChange(e.target.value);
    setUploadedFileName('');
  };

  const clearTranscript = () => {
    onTranscriptChange('');
    setUploadedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Meeting Transcript</h2>
        {transcript && (
          <button
            onClick={clearTranscript}
            className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* File Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload Transcript File
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop your transcript file here, or
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              browse files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              onChange={handleFileInput}
              className="hidden"
            />
            {uploadedFileName && (
              <div className="mt-2 flex items-center justify-center gap-2 text-sm text-green-600">
                <FileText className="w-4 h-4" />
                {uploadedFileName}
              </div>
            )}
          </div>
        </div>

        {/* Manual Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Or Paste Transcript Manually
          </label>
          <textarea
            ref={textareaRef}
            value={transcript}
            onChange={handleTextChange}
            placeholder="Paste your meeting transcript here..."
            className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      </div>
      
      {transcript && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <strong>Transcript length:</strong> {transcript.length} characters
          </p>
        </div>
      )}
    </div>
  );
};