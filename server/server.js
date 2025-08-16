// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Groq = require("groq-sdk");
const emailRoutes = require("./routes/email");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use("/api/email", emailRoutes);
app.post("/api/summary", async (req, res) => {
  try {
    const { transcript, prompt } = req.body;

    const response = await client.chat.completions.create({
      model: "llama3-70b-8192", // best model for summarization
      messages: [
        {
          role: "system",
          content: "You are an AI that summarizes meeting transcripts.",
        },
        { role: "user", content: `${prompt}\n\nTranscript:\n${transcript}` },
      ],
    });

    const summary = response.choices[0].message.content;
    res.json({ summary });
  } catch (err) {
    console.error("Groq API error:", err);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
