import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { call, callMode } = await request.json()

    const prompt = `
You are a professional sales follow-up assistant.

Generate TWO follow-up messages based on this sales call:
CALL MODE: ${
  callMode === 'phone'
    ? 'Outbound phone call — only the agent was recorded. Client responses were NOT captured. The transcript contains agent speech only. Write follow-ups that do NOT reference things the client said directly — instead reference what the agent proposed, offered, or discussed. Do not fabricate client quotes or reactions.'
    : callMode === 'onsite'
    ? 'In-person on-site meeting — both parties were recorded. Full context available. Follow-ups can reference specific things both parties said.'
    : 'Google Meet / Zoom video call — full duplex audio. Follow-ups can reference specific things both parties said.'
}
CONTACT: ${call.contact_name} from ${call.company}
TRANSCRIPT SUMMARY: ${call.transcript?.slice(0, 1500) || 'No transcript'}
NEXT ACTIONS: ${call.insights?.nextActions?.join(', ') || 'None'}
BUYING SIGNALS: ${call.insights?.buyingSignals?.join(', ') || 'None'}
DEAL HEALTH: ${call.insights?.dealHealthScore || 0}%
SENTIMENT: ${call.insights?.sentiment || 'neutral'}

RULES:
- WhatsApp: Casual, warm, concise (max 120 words), use line breaks not paragraphs, mention the specific next step
- Email: Professional, structured, subject line included, max 180 words, reference what was discussed specifically
- Both must: thank them for the call, summarize key points in 1-2 lines, confirm the next step clearly, end with a clear call to action
- Use the contact's first name
- Reference specific details from the call (not generic)
- Do NOT use emojis in email
- WhatsApp can use 1-2 relevant emojis max

Return ONLY valid JSON:
{
  "whatsapp": "the full whatsapp message here",
  "email": {
    "subject": "email subject line here",
    "body": "full email body here"
  }
}
`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.5, responseMimeType: 'application/json' }
        })
      }
    )

    const data = await response.json()
    if (!response.ok || data.error) {
      console.error('Gemini error:', data.error)
      return NextResponse.json({ error: 'Failed to generate' }, { status: 500 })
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}'
    const clean = text.replace(/```json|```/g, '').trim()
    const result = JSON.parse(clean)
    return NextResponse.json(result)

  } catch (err) {
    console.error('Followup error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}