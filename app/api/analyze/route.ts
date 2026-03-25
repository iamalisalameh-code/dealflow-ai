import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { transcript } = await request.json()

    if (!transcript) {
      return NextResponse.json({ error: 'No transcript provided' }, { status: 400 })
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an AI sales coach analyzing a live sales call transcript. 
              
Analyze this transcript and return a JSON object with exactly this structure:
{
  "hotTopics": ["topic1", "topic2", "topic3"],
  "objections": ["objection1", "objection2"],
  "keyQuestions": ["question1", "question2", "question3"],
  "nextActions": ["action1", "action2"],
  "customerNeeds": ["need1", "need2", "need3"],
  "dealHealthScore": 75,
  "sentiment": "positive",
  "talkRatio": 45,
  "notes": "Brief summary of key points from this call"
}

Rules:
- dealHealthScore is 0-100
- sentiment is "positive", "neutral", or "negative"  
- talkRatio is the estimated % the agent is talking (0-100)
- Keep each item concise (under 10 words)
- Return ONLY the JSON, no other text

Transcript:
${transcript}`
            }]
          }],
          generationConfig: { temperature: 0.3 }
        })
      }
    )

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}'
    const clean = text.replace(/```json|```/g, '').trim()
    const insights = JSON.parse(clean)

    return NextResponse.json(insights)
  } catch (err) {
    console.error('Analysis error:', err)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
