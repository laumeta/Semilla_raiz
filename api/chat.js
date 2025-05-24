export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Eres un coach emocional cálido y terapéutico. Ayuda con prácticas de mindfulness y autoregulación emocional según lo que sienta el usuario."
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
