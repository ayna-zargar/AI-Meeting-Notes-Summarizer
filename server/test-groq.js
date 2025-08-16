const Groq = require("groq-sdk");
const dotenv = require("dotenv");
dotenv.config();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function testGroq() {
  try {
    const response = await client.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Write a 1 line summary about Groq API." },
      ],
    });

    console.log("Groq API Response:\n", response.choices[0].message.content);
  } catch (err) {
    console.error("Groq API Test Error:", err);
  }
}

testGroq();
