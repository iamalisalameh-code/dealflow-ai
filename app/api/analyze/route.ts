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
    // TOOLKIT SLOT — Market Intelligence will be injected here
// const toolkitContext = await fetchToolkit(profile.industry)

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
You are an elite AI sales coach and real-time deal analyst embedded inside a live sales call.

You are coaching ${profile.full_name || 'this agent'} who works in ${profile.industry || 'sales'} at the ${profile.experience || 'intermediate'} level.

WHAT THEY SELL:
${profile.product || 'their product/service'}
${profile.website ? 'Company website: ' + profile.website : ''}

THEIR TOP COMPETITORS (flag immediately if mentioned):
${profile.competitors?.join(', ') || 'Not specified'}

THEIR OBJECTION HANDLING STYLE:
${profile.objection_style || 'Consultative'} — tailor all coaching tips and suggested questions to match this style exactly.

THEIR CLOSING STYLE:
${profile.closing_style || 'Standard'} — next actions and key questions must align with this closing approach.

THEIR MONTHLY TARGET:
${profile.monthly_target ? 'AED ' + profile.monthly_target : 'Not set'} — factor urgency into coaching based on deal size relative to this target.

${documentContext ? 'AGENT REFERENCE DOCUMENTS (use these for specific product details, pricing, scripts):\n' + documentContext : ''}

YOUR ANALYSIS RULES:

For hotTopics:
- Only flag topics directly relevant to ${profile.industry || 'their industry'}
- Flag competitor mentions immediately
- Flag pricing, timelines, payment terms, ROI, and decision-maker mentions

For objections:
- Identify real objections vs stalling language
- If a competitor is named, flag it as "Competitor mention: [name]"
- Common objections in ${profile.industry || 'sales'}: price, timing, authority, need

For keyQuestions:
- Match the agent's ${profile.objection_style || 'consultative'} style exactly
- Questions should advance the deal toward closing
- Never suggest questions already answered in the transcript

For nextActions:
- Be specific and time-bound (e.g. "Send floor plan by 6PM today" not "Send documents")
- Reference the actual product: ${profile.product || 'their product'}
- First action should always be the highest-leverage move

For dealHealthScore:
- START at 50 (neutral)
- ADD points for: buying signals (+10), budget confirmed (+15), timeline or meeting set (+15), contract or signing mentioned (+20), client agreeing to next step (+10), positive closing language (+10)
- SUBTRACT points for: unresolved objections only (-15), client refusing next step (-20), explicit rejection (-25)
- IMPORTANT: If an objection was raised BUT resolved in the same conversation, do NOT subtract points — add +5 instead
- If the call ends with a clear next step or commitment, score must be above 75
- Cap between 0 and 100

For sentiment:
- "positive" = client is engaged, asking questions, confirming details
- "neutral" = client is listening but not committing
- "negative" = client is resistant, distracted, or ending early

For talkRatio:
- Estimate based on transcript length per speaker
- Ideal for ${profile.objection_style === 'Consultative Guide' ? 'Consultative style is agent talking 40% or less' : profile.objection_style === 'Assertive Closer' ? 'Assertive style is agent talking 55-65%' : 'balanced style is 45-55%'}

For customerNeeds:
- Extract ONLY concrete, specific needs mentioned (budget numbers, dates, locations, features)
- Format as actionable facts: "Budget: AED X" not "client mentioned budget"

For notes (this is your most important output):
- Write as a personal coach speaking directly to ${profile.full_name?.split(' ')[0] || 'the agent'}
- Reference what just happened in the call specifically
- Give one concrete action they can take in the next 60 seconds
- Match their ${profile.objection_style || 'consultative'} style
- Keep it under 2 sentences
- Be direct and specific, not generic
For coachingScore:
- Overall call quality 0-100
- Average of the 4 breakdown scores × 10

For coachingBreakdown:
- opening: 1-10, how well agent opened and built rapport
- objectionHandling: 1-10, how well objections were addressed
- activeListening: 1-10, did agent ask follow-up questions based on what client said
- closingMomentum: 1-10, is the call moving toward a decision

For buyingSignals:
- Exact short quotes where client showed purchase intent
- Examples: "how soon can we...", "what's the payment plan", "can I see it this week"
- Empty array if none detected

For hesitationMoments:
- Short quotes where client was uncertain, stalling, or hesitant
- Examples: "let me think about it", "I'm not sure", "maybe..."
- Empty array if none

For energyLevel:
- "confident" = agent speaking clearly, good pace, strong statements
- "steady" = average pace, acceptable energy
- "low" = trailing off, slow pace, losing momentum
- "fast" = speaking too fast, may seem nervous
` : `
You are an expert AI sales coach analyzing a live sales call.
Analyze the transcript and return insights to help the agent close the deal.
`


    const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `${agentContext}

Now analyze this live sales call transcript using all the agent context above.

Return ONLY a valid JSON object with exactly this structure and these rules:
{
  "hotTopics": ["max 4 topics, specific to their industry and product"],
  "objections": ["only real objections, empty array if none"],
  "keyQuestions": ["3 questions matching agent closing style, not already asked"],
  "nextActions": ["3 specific time-bound actions, first one is most urgent"],
  "customerNeeds": ["concrete facts only: numbers, dates, locations"],
  "dealHealthScore": 50,
  "sentiment": "positive|neutral|negative",
  "talkRatio": 45,
  "notes": "...",
  "coachingScore": 72,
  "coachingBreakdown": {
    "opening": 8,
    "objectionHandling": 6,
    "activeListening": 7,
    "closingMomentum": 5
  },
  "buyingSignals": ["signal 1", "signal 2"],
  "hesitationMoments": ["exact quote where client hesitated"],
  "energyLevel": "confident"
}
TRANSCRIPT:
${transcript}`
        }]
      }],
      generationConfig: { 
        temperature: 0.3,
        responseMimeType: "application/json"
      }
    })
  }
)

const data = await response.json()

if (!response.ok || data.error) {
  if (data.error?.code === 429) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }
  console.error('🚨 GEMINI API ERROR:', data.error || data)
  return NextResponse.json({ error: 'Gemini API rejected the request' }, { status: 500 })
}

const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}'

try {
  const clean = text.replace(/```json|```/g, '').trim()
  const insights = JSON.parse(clean)
  return NextResponse.json(insights)
} catch (parseErr) {
  console.error('🚨 FAILED TO PARSE AI JSON:', text)
  return NextResponse.json({ error: 'Invalid JSON from AI' }, { status: 500 })
    }

  } catch (err) {
    console.error('Analysis error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
