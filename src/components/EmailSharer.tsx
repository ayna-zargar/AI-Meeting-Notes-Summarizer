import React, { useState } from 'react';
import { Mail, Send, Plus, X, Check } from 'lucide-react';
import { EmailRecipient } from '../types';
import { sendSummaryEmail } from '../utils/emailService';

interface EmailSharerProps {
  summary: string;
  onEmailSent: () => void;
}

export const EmailSharer: React.FC<EmailSharerProps> = ({ summary, onEmailSent }) => {
  const [recipients, setRecipients] = useState<EmailRecipient[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [subject, setSubject] = useState('Meeting Summary');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addRecipient = () => {
    if (newEmail.trim() && isValidEmail(newEmail)) {
      const recipient: EmailRecipient = {
        email: newEmail.trim(),
      };
      setRecipients([...recipients, recipient]);
      setNewEmail('');
    }
  };

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSend = async () => {
    if (recipients.length === 0 || !summary.trim()) return;

    setIsSending(true);
    try {
      await sendSummaryEmail({
        recipients,
        subject,
        message,
        summary: {
          id: Date.now().toString(),
          content: summary,
          prompt: '',
          transcriptId: '',
          createdAt: new Date(),
          isEdited: false
        }
      });
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onEmailSent();
        // Reset form
        setRecipients([]);
        setMessage('');
      }, 2000);
    } catch (error) {
      alert('Failed to send email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addRecipient();
    }
  };

  if (!summary) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <Mail className="w-5 h-5" />
        Share Summary
      </h2>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        {/* Recipients */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Recipients
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter email address"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addRecipient}
              disabled={!newEmail.trim() || !isValidEmail(newEmail)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          
          {recipients.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {recipients.map((recipient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  <span>{recipient.email}</span>
                  <button
                    onClick={() => removeRecipient(index)}
                    className="hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Additional Message (Optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a personal message to accompany the summary..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={recipients.length === 0 || isSending}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            recipients.length > 0 && !isSending
              ? showSuccess
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {showSuccess ? (
            <>
              <Check className="w-5 h-5" />
              Email Sent Successfully!
            </>
          ) : isSending ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending Email...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Summary
            </>
          )}
        </button>
        
        {recipients.length === 0 && (
          <p className="text-sm text-gray-500 text-center">
            Add at least one recipient to send the summary
          </p>
        )}
      </div>
    </div>
  );
};