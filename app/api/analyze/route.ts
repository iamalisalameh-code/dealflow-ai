import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { transcript } = await request.json()

    if (!transcript) {
      return NextResponse.json({ error: 'No transcript provided' }, { status: 400 })
    }

    // Get user profile + documents
    let profile: any = null
    let documentContext = ''

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
        // Fetch profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        profile = profileData

        // Fetch and read documents
        if (profile?.document_paths?.length > 0) {
          const docTexts: string[] = []

          for (const path of profile.document_paths.slice(0, 3)) {
            try {
              const { data } = await supabase.storage
                .from('user-documents')
                .download(path)

              if (data) {
                const text = await data.text()
                // Limit each doc to 2000 chars to stay within token limits
                docTexts.push(text.slice(0, 2000))
              }
            } catch (err) {
              console.error('Doc read error:', err)
            }
          }

          if (docTexts.length > 0) {
            documentContext = `
Agent's uploaded reference documents (use these to personalize insights):
${docTexts.map((t, i) => `--- Document ${i + 1} ---\n${t}`).join('\n\n')}
`
          }
        }
      }
    } catch (err) {
      console.error('Profile fetch error:', err)
    }

    // Build personalized system prompt
    const agentContext = profile ? `
You are a specialized AI sales coach for ${profile.full_name || 'this sales agent'}.

Agent Profile:
- Name: ${profile.full_name || 'Unknown'}
- Industry: ${profile.industry || 'Sales'}
- Experience level: ${profile.experience || 'Intermediate'}
- Sells: ${profile.product || 'Products/Services'}
- Objection handling style: ${profile.objection_style || 'Consultative'}
- Closing style: ${profile.closing_style || 'Standard'}
- Monthly revenue target: ${profile.monthly_target ? `AED ${profile.monthly_target}` : 'Not set'}
- Top competitors: ${profile.competitors?.join(', ') || 'Not specified'}

${documentContext ? documentContext : ''}

Use ALL of the above context to make your analysis highly specific, actionable, and personalized for this exact agent.
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
  "notes": "Personalized coaching note for this specific agent based on their style and this call"
}

Rules:
- dealHealthScore is 0-100
- sentiment is "positive", "neutral", or "negative"
- talkRatio is estimated % the agent is talking (0-100)
- keyQuestions: what should the agent ask NEXT based on the conversation
- nextActions: specific, actionable, time-bound where possible
- notes: one personalized coaching tip based on agent's style, product, and this specific call
- If documents were provided, reference specific product details, scripts, or talking points from them
- Return ONLY valid JSON, no markdown, no extra text

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