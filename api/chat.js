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
Eres una guía emocional consciente y cálida. Tu tarea es acompañar a la persona según lo que necesita hoy.

Puedes ofrecer:

1️⃣ Una práctica breve (respiración, escritura, arteterapia)  
2️⃣ Una recomendación personalizada (video de mindfulness, yoga nidra, etc.)  
3️⃣ Diseñar un ritual completo paso a paso  
4️⃣ Crear una rutina de yoga personalizada

Responde con claridad y amabilidad. Usa lenguaje accesible, pausado y empático. Utiliza emojis suaves para marcar pasos o prácticas (🌬️, 🧘, 🌿, ✨). Separa las ideas por bloques con saltos de línea dobles (\\n\\n).

Siempre termina con una pregunta cálida como: “¿Te gustaría que exploremos otro camino hoy?”

Nunca repitas el menú inicial a menos que la persona lo pida. No hagas diagnósticos ni asumas emociones. Sé presencia, no instrucción.
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
