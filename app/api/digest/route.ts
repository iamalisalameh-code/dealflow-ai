import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)

// Service role client — bypasses RLS to query all users
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {
  // Verify cron secret so only Vercel can trigger this
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    // Get all users with calls in the last 7 days
    const { data: recentCalls, error: callsError } = await supabase
      .from('calls')
      .select('user_id, insights, duration, contact_name, company, created_at')
      .gte('created_at', oneWeekAgo.toISOString())
      .eq('status', 'completed')

    if (callsError) throw callsError
    if (!recentCalls || recentCalls.length === 0) {
      return NextResponse.json({ message: 'No calls this week' })
    }

    // Group calls by user
    const byUser: Record<string, any[]> = {}
    for (const call of recentCalls) {
      if (!byUser[call.user_id]) byUser[call.user_id] = []
      byUser[call.user_id].push(call)
    }

    // Get profiles for all users
    const userIds = Object.keys(byUser)
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name, email')
      .in('id', userIds)

    const results: any[] = []

    for (const profile of profiles || []) {
      const calls = byUser[profile.id]
      if (!calls || calls.length === 0) continue

      // Compute stats
      const totalCalls = calls.length
      const totalDuration = calls.reduce((sum: number, c: any) => sum + (c.duration || 0), 0)
      const avgDuration = Math.round(totalDuration / totalCalls)

      const validInsights = calls.filter((c: any) => c.insights?.dealHealthScore != null)
      const avgHealth = validInsights.length
        ? Math.round(validInsights.reduce((sum: number, c: any) => sum + c.insights.dealHealthScore, 0) / validInsights.length)
        : 0

      const avgCoaching = validInsights.length
        ? Math.round(validInsights.reduce((sum: number, c: any) => sum + (c.insights.coachingScore || 0), 0) / validInsights.length)
        : 0

      const totalSignals = calls.reduce((sum: number, c: any) =>
        sum + (c.insights?.buyingSignals?.length || 0), 0)

      // Best call of the week
      const bestCall = validInsights.length
        ? validInsights.reduce((best: any, c: any) =>
            c.insights.dealHealthScore > (best.insights?.dealHealthScore || 0) ? c : best
          , validInsights[0])
        : null

      const formatDuration = (secs: number) => {
        const m = Math.floor(secs / 60)
        const s = secs % 60
        return `${m}m ${s}s`
      }

      const weekStart = oneWeekAgo.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
      const weekEnd = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

      const healthColor = avgHealth >= 70 ? '#34c759' : avgHealth >= 45 ? '#ff9f0a' : '#ff453a'
      const coachingColor = avgCoaching >= 70 ? '#34c759' : avgCoaching >= 45 ? '#ff9f0a' : '#ff453a'

      const motivationalLine = avgHealth >= 75
        ? "You're on fire this week. Keep that momentum going."
        : avgHealth >= 50
        ? "Solid week. A few more closing pushes and you'll be unstoppable."
        : "Tough week — but every call is data. Review your objection handling and come back stronger."

      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Weekly Performance Digest</title>
</head>
<body style="margin:0;padding:0;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;min-height:100vh;">
    <tr>
      <td align="center" style="padding:60px 20px;">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <div style="display:inline-flex;align-items:center;gap:10px;">
                <div style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;">
                  <span style="color:#fff;font-size:16px;">⚡</span>
                </div>
                <span style="color:rgba(255,255,255,0.92);font-size:18px;font-weight:600;letter-spacing:-0.5px;">DealFlow AI</span>
              </div>
            </td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:32px 32px 0 0;padding:36px 44px 28px;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.35);">Weekly Digest · ${weekStart} – ${weekEnd}</p>
              <h1 style="margin:0 0 12px;font-size:26px;font-weight:600;color:rgba(255,255,255,0.92);letter-spacing:-0.8px;line-height:1.2;">
                ${profile.full_name ? `${profile.full_name.split(' ')[0]}'s` : 'Your'} performance<br>this week
              </h1>
              <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.4);line-height:1.6;">${motivationalLine}</p>
            </td>
          </tr>

          <!-- Stats Grid -->
          <tr>
            <td style="background:rgba(255,255,255,0.02);border-left:1px solid rgba(255,255,255,0.07);border-right:1px solid rgba(255,255,255,0.07);padding:2px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding:24px 32px;border-right:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Calls Made</p>
                    <p style="margin:0;font-size:40px;font-weight:700;color:#fff;letter-spacing:-2px;line-height:1;">${totalCalls}</p>
                    <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.3);">avg ${formatDuration(avgDuration)} each</p>
                  </td>
                  <td width="50%" style="padding:24px 32px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Buying Signals</p>
                    <p style="margin:0;font-size:40px;font-weight:700;color:#ff9f0a;letter-spacing:-2px;line-height:1;">${totalSignals}</p>
                    <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.3);">detected this week</p>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding:24px 32px;border-top:1px solid rgba(255,255,255,0.06);border-right:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Avg Deal Health</p>
                    <p style="margin:0;font-size:40px;font-weight:700;color:${healthColor};letter-spacing:-2px;line-height:1;">${avgHealth}%</p>
                    <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.3);">${avgHealth >= 70 ? 'Strong pipeline' : avgHealth >= 45 ? 'Room to improve' : 'Needs attention'}</p>
                  </td>
                  <td width="50%" style="padding:24px 32px;border-top:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.3);">Coaching Score</p>
                    <p style="margin:0;font-size:40px;font-weight:700;color:${coachingColor};letter-spacing:-2px;line-height:1;">${avgCoaching}</p>
                    <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.3);">out of 100</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${bestCall ? `
          <!-- Best Call -->
          <tr>
            <td style="background:rgba(255,255,255,0.02);border-left:1px solid rgba(255,255,255,0.07);border-right:1px solid rgba(255,255,255,0.07);border-top:1px solid rgba(255,255,255,0.06);padding:24px 44px;">
              <p style="margin:0 0 14px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.3);">🏆 Best Call of the Week</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:16px;font-weight:600;color:rgba(255,255,255,0.9);">${bestCall.contact_name || 'Unknown'}</p>
                    <p style="margin:2px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">${bestCall.company || ''} · ${formatDuration(bestCall.duration || 0)}</p>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;padding:6px 16px;background:rgba(52,199,89,0.12);border:1px solid rgba(52,199,89,0.25);border-radius:20px;font-size:14px;font-weight:700;color:#34c759;">
                      ${bestCall.insights?.dealHealthScore}% health
                    </span>
                  </td>
                </tr>
              </table>
              ${bestCall.insights?.buyingSignals?.length > 0 ? `
              <div style="margin-top:14px;padding:12px 16px;background:rgba(255,159,10,0.06);border:1px solid rgba(255,159,10,0.15);border-radius:12px;">
                <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#ff9f0a;letter-spacing:0.1em;">TOP BUYING SIGNAL</p>
                <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.7);font-style:italic;">"${bestCall.insights.buyingSignals[0]}"</p>
              </div>` : ''}
            </td>
          </tr>` : ''}

          <!-- CTA -->
          <tr>
            <td style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-top:none;border-radius:0 0 32px 32px;padding:28px 44px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://dealflow-ai-4h3m.vercel.app" style="display:inline-block;padding:14px 36px;background:rgba(255,255,255,0.92);color:#000;font-size:15px;font-weight:600;text-decoration:none;border-radius:30px;letter-spacing:-0.2px;">
                      View Full Dashboard →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:20px 0 0;font-size:12px;color:rgba(255,255,255,0.2);text-align:center;">
                You're receiving this because you have an active DealFlow AI account.<br>
                <a href="https://dealflow-ai-4h3m.vercel.app/settings" style="color:rgba(255,255,255,0.3);">Manage email preferences</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.18);">DealFlow AI · AI-Powered Sales Intelligence</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

      const { error: emailError } = await resend.emails.send({
        from: 'DealFlow AI <onboarding@resend.dev>',
        to: profile.email,
        subject: `Your week in sales: ${totalCalls} calls · ${avgHealth}% avg health · ${totalSignals} signals`,
        html,
      })

      results.push({
        user: profile.email,
        sent: !emailError,
        stats: { totalCalls, avgHealth, avgCoaching, totalSignals },
      })
    }

    return NextResponse.json({ success: true, results })

  } catch (err) {
    console.error('Digest error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}