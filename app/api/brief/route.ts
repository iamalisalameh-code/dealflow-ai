import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { contact, callMode } = await request.json()

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options))
          },
        },
      }
    )

    // Get agent profile
    const { data: { user } } = await supabase.auth.getUser()
    let profile: any = null
    if (user) {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      profile = data
    }

    // Get last call for this contact
    const { data: lastCall } = await supabase
      .from('calls')
      .select('*')
      .eq('contact_name', contact.full_name)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
const modeContext = callMode === 'phone'
  ? `CALL MODE: Outbound phone call — agent will only be heard, client audio won't be captured. Brief should focus on what the AGENT should say and ask. Flag that insights will be inferred from agent speech only.`
  : callMode === 'onsite'
  ? `CALL MODE: In-person on-site meeting — both parties will be recorded. Brief should prepare the agent for face-to-face dynamics: body language cues, room control, physical presentation materials if relevant.`
  : `CALL MODE: Google Meet / Zoom video call — full duplex audio captured. Standard brief applies.`
    const prompt = `
You are a pre-call AI coach. Generate a brief for a sales agent about to call a contact.

${modeContext}

AGENT PROFILE:
Name: ${profile?.full_name || 'Agent'}
Product: ${profile?.product || 'their product'}
Industry: ${profile?.industry || 'sales'}
Closing style: ${profile?.closing_style || 'standard'}
Objection style: ${profile?.objection_style || 'consultative'}

CONTACT PROFILE:
Name: ${contact.full_name}
Company: ${contact.company || 'Unknown'}
Deal Stage: ${contact.deal_stage || 'lead'}
Deal Value: ${contact.deal_value ? 'AED ' + contact.deal_value : 'Not set'}
Industry: ${contact.industry || 'Unknown'}
Tags: ${contact.tags?.join(', ') || 'None'}
Notes: ${contact.notes || 'None'}
Total previous calls: ${contact.total_calls || 0}

${lastCall ? `LAST CALL SUMMARY:
Date: ${new Date(lastCall.created_at).toLocaleDateString()}
Duration: ${Math.floor(lastCall.duration / 60)} minutes
Objections raised: ${lastCall.insights?.objections?.join(', ') || 'None'}
Next actions promised: ${lastCall.insights?.nextActions?.[0] || 'None'}
Deal health at end: ${lastCall.insights?.dealHealthScore || 'Unknown'}%
Buying signals: ${lastCall.insights?.buyingSignals?.join(', ') || 'None'}` : 'No previous calls with this contact.'}

Return ONLY a valid JSON object:
{
  "openingLine": "A personalized opening line for ${profile?.full_name?.split(' ')[0] || 'the agent'} to use in the first 10 seconds",
  "keyContext": "2-sentence summary of where this deal stands and what matters most",
  "watchOutFor": "One specific thing to be careful about based on contact history",
  "recommendedQuestions": ["question 1", "question 2", "question 3"],
  "callGoal": "The single most important outcome to achieve in this call"
}
`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4, responseMimeType: 'application/json' }
        })
      }
    )

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}'
    const clean = text.replace(/```json|```/g, '').trim()
    const briefData = JSON.parse(clean)
    return NextResponse.json(briefData)

  } catch (err) {
    console.error('Brief error:', err)
    return NextResponse.json({ error: 'Failed to generate brief' }, { status: 500 })
  }
}