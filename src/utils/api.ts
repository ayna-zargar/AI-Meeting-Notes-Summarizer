export const generateSummary = async (transcript, prompt) => {
  const response = await fetch("http://localhost:5000/api/summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript, prompt })
  });

  if (!response.ok) throw new Error("Failed to generate summary");

  const data = await response.json();
  return data.summary;
};
