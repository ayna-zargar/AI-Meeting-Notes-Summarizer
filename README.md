# Briefly - AI Meeting Notes Summarizer

Briefly is an AI-powered meeting summarization tool that generates concise summaries of meeting transcripts using Groq LLaMA models. It also provides an option to send the generated summaries via email using Resend.

---

## 🚀 Features
- Summarize meeting transcripts using **Groq API**.
- Generate structured, human-like summaries.
- Send summaries via **email** using Resend API.
- Backend built with **Express.js**.
- Deployed on **Render** and **Vercel** for live usage.

---

## 📦 Installation

Clone the repo:
```
git clone https://github.com/ayna-zargar/AI-Meeting-Notes-Summarizer.git
cd project
```

Install dependencies:
```
npm install
```

Create a `.env` file in the root folder:
```
GROQ_API_KEY=your_groq_api_key
RESEND_API_KEY=your_resend_api_key
RESEND_SENDER_EMAIL=noreply@your_domain_name
```

Run locally:
```
node server.js
```

The backend runs on:
```
http://localhost:5000
```

---

## 📡 API Endpoints

### 1. Generate Summary  
`POST /api/summary`  
**Body:**
```json
{
  "transcript": "Full meeting transcript here...",
  "prompt": "Summarize this meeting in bullet points."
}
```  
**Response:**
```json
{
  "summary": "AI-generated summary here..."
}
```

### 2. Send Email  
`POST /api/email/send-email`  
**Body:**
```json
{
  "recipients": [{ "email": "example@example.com" }],
  "subject": "Meeting Summary",
  "message": "Here is your summary",
  "summary": { "content": "AI-generated summary here..." }
}
```  

---

## ⚙️ Tech Stack
- **Backend**: Node.js, Express.js
- **AI Model**: Groq LLaMA3-70B
- **Email**: Resend API
- **Hosting**: Render/Vercel

---

## ⚠️ Notes
- Free Groq API has request & token limits. Keep transcripts reasonable in size.
- Resend requires a **verified sender email/domain** to receive emails (you can test with `onboarding@resend.dev` but delivery may be blocked by spam filters).
- For production, set up a proper domain for reliable email delivery.

---

## 📜 License
MIT License
