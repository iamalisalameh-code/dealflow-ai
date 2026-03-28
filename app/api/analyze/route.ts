import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { transcript, language } = await request.json()

    if (!transcript) {
      return NextResponse.json({ error: 'No transcript provided' }, { status: 400 })
    }

    const isArabic = language === 'ar'

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
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        profile = profileData

        if (profile?.document_paths?.length > 0) {
          const docTexts: string[] = []
          for (const path of profile.document_paths.slice(0, 3)) {
            try {
              const { data } = await supabase.storage
                .from('user-documents')
                .download(path)
              if (data) {
                const text = await data.text()
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

    const arabicInstruction = isArabic
      ? `\nIMPORTANT: This call is in Arabic. Return ALL text values in Arabic (hotTopics, objections, keyQuestions, nextActions, customerNeeds, notes, buyingSignals, hesitationMoments). Keep all JSON keys in English. Numbers stay as numbers. sentiment must still be one of: positive|neutral|negative. energyLevel must still be one of: confident|steady|low|fast.\n`
      : ''

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

For hotTopics: Only flag topics directly relevant to ${profile.industry || 'their industry'}. Flag competitor mentions immediately. Flag pricing, timelines, payment terms, ROI, and decision-maker mentions.

For objections: Identify real objections vs stalling language. If a competitor is named, flag it as "Competitor mention: [name]".

For keyQuestions: Match the agent's ${profile.objection_style || 'consultative'} style exactly. Questions should advance the deal toward closing. Never suggest questions already answered in the transcript.

For nextActions: Be specific and time-bound. Reference the actual product: ${profile.product || 'their product'}. First action should always be the highest-leverage move.

For dealHealthScore: START at 50. ADD: buying signals (+10), budget confirmed (+15), timeline or meeting set (+15), contract mentioned (+20), client agreeing to next step (+10), positive closing language (+10). SUBTRACT: unresolved objections only (-15), client refusing next step (-20), explicit rejection (-25). Cap between 0 and 100.

For sentiment: "positive" = engaged. "neutral" = listening but not committing. "negative" = resistant.

For talkRatio: Estimate based on transcript length per speaker.

For customerNeeds: Extract ONLY concrete specifics (budget numbers, dates, locations, features).

For notes: Write as a personal coach to ${profile.full_name?.split(' ')[0] || 'the agent'}. Reference what just happened. Give one concrete action for the next 60 seconds. Under 2 sentences.

For coachingScore: Overall call quality 0-100.

For coachingBreakdown: opening, objectionHandling, activeListening, closingMomentum — each 1-10.

For buyingSignals: Exact short quotes showing purchase intent. Empty array if none.

For hesitationMoments: Short quotes where client was uncertain. Empty array if none.

For energyLevel: "confident" | "steady" | "low" | "fast"
${arabicInstruction}` : `
You are an expert AI sales coach analyzing a live sales call.
Analyze the transcript and return insights to help the agent close the deal.
${arabicInstruction}`

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

Return ONLY a valid JSON object with exactly this structure:
{
  "hotTopics": ["max 4 topics"],
  "objections": ["only real objections, empty array if none"],
  "keyQuestions": ["3 questions matching agent closing style"],
  "nextActions": ["3 specific time-bound actions"],
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
  "buyingSignals": ["signal 1"],
  "hesitationMoments": ["exact quote"],
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
      console.error('GEMINI API ERROR:', data.error || data)
      return NextResponse.json({ error: 'Gemini API rejected the request' }, { status: 500 })
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}'

    try {
      const clean = text.replace(/```json|```/g, '').trim()
      const insights = JSON.parse(clean)
      return NextResponse.json(insights)
    } catch (parseErr) {
      console.error('FAILED TO PARSE AI JSON:', text)
      return NextResponse.json({ error: 'Invalid JSON from AI' }, { status: 500 })
    }

  } catch (err) {
    console.error('Analysis error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}