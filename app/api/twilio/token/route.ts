import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET() {
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
              cookieStore.set(name, value, options))
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Dynamic import to avoid CJS/ESM issues
    const twilio = (await import('twilio')).default
    const AccessToken = twilio.jwt.AccessToken
    const VoiceGrant = AccessToken.VoiceGrant

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const apiKey = process.env.TWILIO_API_KEY
    const apiSecret = process.env.TWILIO_API_SECRET
    const twimlAppSid = process.env.TWILIO_TWIML_APP_SID

    if (!accountSid || !apiKey || !apiSecret || !twimlAppSid) {
      return NextResponse.json({
        error: 'Missing Twilio config',
        missing: { accountSid: !accountSid, apiKey: !apiKey, apiSecret: !apiSecret, twimlAppSid: !twimlAppSid }
      }, { status: 500 })
    }

    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: twimlAppSid,
      incomingAllow: true,
    })

    const token = new AccessToken(accountSid, apiKey, apiSecret, {
      identity: user.id,
      ttl: 3600,
    })

    token.addGrant(voiceGrant)

    return NextResponse.json({ token: token.toJwt(), identity: user.id })

  } catch (err: any) {
    console.error('Token error full:', err)
    return NextResponse.json({
      error: 'Failed to generate token',
      detail: err.message,
      stack: err.stack?.split('\n').slice(0, 3),
    }, { status: 500 })
  }
}