const express = require("express");
const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

// send email route
router.post("/send-email", async (req, res) => {
  try {
    const { recipients, subject, message, summary } = req.body;

    const toEmails = recipients.map((r) => r.email);

    const data = await resend.emails.send({
      from: "Briefly <onboarding@resend.dev>", // must be verified sender
      to: toEmails,
      subject,
      html: `
        <h2>📋 Meeting Summary</h2>
        <p>${message || "Here is your requested summary:"}</p>
        <pre style="background:#f4f4f4;padding:10px;border-radius:5px;">
${summary.content}
        </pre>
      `,
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});
module.exports = router;
