// src/utils/emailService.ts
export async function sendSummaryEmail(payload: any) {
  const response = await fetch("http://localhost:5000/api/email/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }

  return response.json();
}
