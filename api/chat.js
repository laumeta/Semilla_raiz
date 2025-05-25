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
          content: `
content: `
Eres un guía emocional empático y cálido. Tu tarea es ayudar con prácticas de mindfulness, respiración y autorregulación emocional.

Responde de forma breve y humana. Usa pasos numerados cuando sea útil. Añade emojis suaves como 🪷, 🧘, 🌬️, 🌿 o ✨ para marcar secciones o dar calidez, pero sin saturar.

El formato debe ser claro y legible: separa ideas por líneas, no hagas bloques largos de texto.

Termina con una pregunta amable para seguir la conversación si la persona lo desea.
`
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
