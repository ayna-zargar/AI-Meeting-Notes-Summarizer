# AI-Meeting-Notes-Summarizer
# ✨ Briefly  

**Briefly** is a Meeting Summarizer app that helps you quickly generate concise summaries from long transcripts using **Groq LLaMA 3 models**.  
It also allows sending summaries via **email** with [Resend](https://resend.com).  

---

## 🚀 Features
- Summarize long meeting transcripts using **Groq AI** (`llama3-70b-8192`).
- Simple REST API built with **Express.js**.
- Send summaries via **email** using Resend.
- Deployable on **Render** (or any Node.js hosting service).

---

## ⚙️ Tech Stack
- **Backend:** Node.js + Express  
- **AI Model:** Groq LLaMA 3 (`llama3-70b-8192`)  
- **Email Service:** Resend API  
- **Deployment:**
- Frontend on Vercel
- Backend on Render 

---

## 📦 Installation  

Clone the repo:
```bash
git clone https://github.com/ayna-zargar/AI-Meeting-Notes-Summarizer.git
Install dependencies:

```bash
npm install
Create a .env file in the root folder:

env
GROQ_API_KEY=your_groq_api_key
RESEND_API_KEY=your_resend_api_key
RESEND_SENDER_EMAIL=noreply@your_domain_name
Run locally:

bash
node server.js
The backend runs on:

http://localhost:5000
