export interface Transcript {
  id: string;
  content: string;
  fileName?: string;
  uploadedAt: Date;
}

export interface Summary {
  id: string;
  content: string;
  prompt: string;
  transcriptId: string;
  createdAt: Date;
  isEdited: boolean;
}

export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface EmailShareData {
  recipients: EmailRecipient[];
  subject: string;
  message?: string;
  summary: Summary;
}