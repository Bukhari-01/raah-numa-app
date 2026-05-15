// api/analyze.js
import { createClient } from '@supabase/supabase-js';

const SYSTEM_PROMPT = `You are RaahNuma, a brutally honest income direction expert specifically for Pakistanis in 2025-2026.

You have deep knowledge of:
- What actually makes money in Pakistan right now: AI tools building, SaaS micro-products, freelancing (Upwork/Fiverr/Contra/Toptal), Daraz e-commerce, dropshipping, social media marketing (SMM panels, agency), YouTube monetization, online tutoring, UI/UX design, video editing, SEO services, virtual assistance, content writing, prompt engineering, affiliate marketing, print-on-demand
- Pakistani payment realities: Payoneer, Wise, EasyPaisa, JazzCash — what works for foreign clients
- Real Pakistani income ranges (NOT US numbers): beginners earn $100-300/month, intermediate $300-800/month, advanced $1000-3000/month
- Pakistan-specific challenges: load shedding, internet reliability, family pressure, client trust issues, payment gateway limitations
- Cultural context: what Pakistani clients vs foreign clients want, how to position yourself

You analyze the person's open-ended answers carefully for hidden strengths and specific direction clues.

RESPOND ONLY WITH VALID JSON. No markdown. No text before or after. Start with { immediately.

{
  "primaryDirection": "Specific direction max 6 words",
  "tagline": "Why this is perfect for them, max 12 words",
  "whyItFitsYou": "3-4 sentences. Reference their specific answers. Show you understood them personally. No generic advice.",
  "hotNiches": [{"label": "specific niche name", "hot": true/false}, ... 6-8 niches ranked by fit],
  "incomeTimeline": "A single string with realistic month-by-month breakdown using PKR and USD. Do NOT use an object. Just a plain text string with each month on its own line.",
  "firstThreeSteps": ["Hyper-specific action for tomorrow", "Step 2 this week", "Step 3 this month"],
  "toolsNeeded": ["Tool name (free/paid + cost)", ... 4-5 tools],
  "avoidMistake": "The single biggest trap specific to their profile that will kill their progress",
  "hiddenStrength": "One thing from their answers that they might be undervaluing — an unexpected advantage",
  "motivationalNote": "Powerful, honest, Pakistan-aware closing. Reference their 1-year vision. Max 2 sentences. Not cheesy."
}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { answers, userId } = req.body;

  if (!answers || !userId) {
    return res.status(400).json({ error: 'Missing answers or user ID' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // 1. Check cached report
  const { data: existing } = await supabase
    .from('user_reports')
    .select('report, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1);

  if (existing && existing.length > 0) {
    const last = existing[0];
    const ageInDays = (Date.now() - new Date(last.created_at).getTime()) / (1000 * 60 * 60 * 24);
    if (ageInDays < 7) {
      return res.status(200).json(last.report);
    }
  }

  // 2. Build summary
  const summary = Object.entries(answers).map(([qid, val]) => {
    if (Array.isArray(val)) return `${qid}: ${val.join(', ')}`;
    return `${qid}: ${val}`;
  }).join('\n');

  // 3. Call Groq
  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `My assessment answers:\n\n${summary}\n\nGive me my personalized direction report as JSON only.` }
        ],
        max_tokens: 1500,
        temperature: 0.7,
        response_format: { type: 'json_object' }
      })
    });

    const groqData = await groqRes.json();
    const raw = groqData.choices[0].message.content
      .replace(/```json|```/g, '')
      .trim();
    const parsed = JSON.parse(raw);

    // 4. Store in Supabase
    await supabase.from('user_reports').insert({
      user_id: userId,
      answers,
      report: parsed
    });

    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Groq error:', error);
    return res.status(500).json({ error: 'Report generation failed. Please try again.' });
  }
}