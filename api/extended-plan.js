import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  const { answers, result } = req.body;

  const prompt = `You are an expert career coach for Pakistan.

User profile:
- Direction: ${result.primaryDirection}
- Skill: ${answers.skill_desc}
- Time: ${answers.time}
- Goal: ${answers.goal}
- Resources: ${Array.isArray(answers.resources) ? answers.resources.join(', ') : answers.resources}

IMPORTANT: Reply in the EXACT same language and style the user used in their answers. If they wrote in Roman Urdu, reply in Roman Urdu. If English, reply in English. If Urdu script, reply in Urdu script. Match their tone exactly.

Create a 30-day action plan. Return ONLY valid JSON, nothing else:
{
  "plan": {
    "weeks": [
      {
        "title": "Week title",
        "days": [
          { "day": 1, "task": "Specific actionable task" },
          { "day": 2, "task": "..." },
          { "day": 3, "task": "..." },
          { "day": 4, "task": "..." },
          { "day": 5, "task": "..." },
          { "day": 6, "task": "..." },
          { "day": 7, "task": "..." }
        ]
      }
    ]
  }
}
4 weeks total.`;

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 2500,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = completion.choices[0].message.content
      .replace(/```json|```/g, '')
      .trim();

    const parsed = JSON.parse(text);
    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}