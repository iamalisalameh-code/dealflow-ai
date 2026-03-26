import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { transcript } = await request.json()

    if (!transcript) {
      return NextResponse.json({ error: 'No transcript provided' }, { status: 400 })
    }

    // Get user profile for personalization
    let profile: any = null
    try {
      const cookieStore = await cookies()
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() { return cookieStore.getAll() },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            },
          },
        }
      )
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        profile = data
      }
    } catch (err) {
      // Profile fetch failed — continue with generic prompt
    }

    // Build personalized system context
    const agentContext = profile ? `
You are a specialized AI sales coach for ${profile.full_name || 'this sales agent'}.

Agent Profile:
- Name: ${profile.full_name || 'Unknown'}
- Industry: ${profile.industry || 'Sales'}
- Experience: ${profile.experience || 'Intermediate'}
- Sells: ${profile.product || 'Products/Services'}
- Objection handling style: ${profile.objection_style || 'Consultative'}
- Closing style: ${profile.closing_style || 'Standard'}
- Monthly revenue target: ${profile.monthly_target ? `AED ${profile.monthly_target}` : 'Not set'}
- Top competitors: ${profile.competitors?.join(', ') || 'Not specified'}

Use this context to make your analysis highly specific and actionable for this agent's situation, industry, and goals.
` : `You are an expert AI sales coach analyzing a live sales call.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${agentContext}

Analyze this sales call transcript and return a JSON object with exactly this structure:
{
  "hotTopics": ["topic1", "topic2", "topic3"],
  "objections": ["objection1", "objection2"],
  "keyQuestions": ["question1", "question2", "question3"],
  "nextActions": ["action1", "action2", "action3"],
  "customerNeeds": ["need1", "need2", "need3"],
  "dealHealthScore": 75,
  "sentiment": "positive",
  "talkRatio": 45,
  "notes": "Brief personalized coaching note for this specific agent"
}

Rules:
- dealHealthScore is 0-100 based on how well the call is going
- sentiment is "positive", "neutral", or "negative" based on customer tone
- talkRatio is the estimated % the agent is talking (0-100)
- Keep each item concise and specific to the industry/product
- keyQuestions should be questions the agent SHOULD ask next based on what was said
- nextActions should be specific, actionable, and time-bound where possible
- notes should be a personalized coaching tip based on the agent's style and this specific call
- Return ONLY valid JSON, no other text, no markdown backticks

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