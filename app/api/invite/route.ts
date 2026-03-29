import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, teamName, inviterName, inviteToken } = await request.json()

    if (!email || !teamName || !inviteToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const inviteUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dealflow-ai-4h3m.vercel.app'}/join?token=${inviteToken}`

    const { data, error } = await resend.emails.send({
      from: 'DealFlow AI <onboarding@resend.dev>',
      to: email,
      subject: `${inviterName} invited you to join ${teamName} on DealFlow AI`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're invited to DealFlow AI</title>
</head>
<body style="margin:0;padding:0;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;min-height:100vh;">
    <tr>
      <td align="center" style="padding:60px 20px;">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <div style="display:inline-flex;align-items:center;gap:10px;">
                <div style="width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.05));border:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;">
                  <span style="color:#fff;font-size:18px;">⚡</span>
                </div>
                <span style="color:rgba(255,255,255,0.92);font-size:20px;font-weight:600;letter-spacing:-0.5px;">DealFlow AI</span>
              </div>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:32px;padding:44px 48px;">

              <!-- Heading -->
              <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.4);">You're invited</p>
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:600;color:rgba(255,255,255,0.92);letter-spacing:-0.8px;line-height:1.2;">Join ${teamName}<br>on DealFlow AI</h1>
              <p style="margin:0 0 32px;font-size:15px;color:rgba(255,255,255,0.55);line-height:1.7;">
                <strong style="color:rgba(255,255,255,0.8);">${inviterName}</strong> has invited you to join their sales team. DealFlow AI gives you real-time AI coaching during your calls — helping you close more deals, handle objections, and improve with every conversation.
              </p>

              <!-- Features -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                ${[
                  { icon: '🎙', title: 'Live Transcription', desc: 'Real-time speech-to-text during calls' },
                  { icon: '🧠', title: 'AI Coaching', desc: 'Instant insights, objection handling tips' },
                  { icon: '📊', title: 'Deal Health Score', desc: 'Know exactly where each deal stands' },
                ].map(f => `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:14px;font-size:22px;vertical-align:middle;">${f.icon}</td>
                        <td style="vertical-align:middle;">
                          <div style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.85);margin-bottom:2px;">${f.title}</div>
                          <div style="font-size:12px;color:rgba(255,255,255,0.4);">${f.desc}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join('')}
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${inviteUrl}" style="display:inline-block;padding:16px 40px;background:rgba(255,255,255,0.92);color:#000;font-size:15px;font-weight:600;text-decoration:none;border-radius:30px;letter-spacing:-0.2px;">
                      Accept Invitation →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Expiry note -->
              <p style="margin:24px 0 0;font-size:12px;color:rgba(255,255,255,0.3);text-align:center;">
                This invitation expires in 7 days. If you didn't expect this, you can ignore this email.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:32px;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.2);">
                DealFlow AI · AI-Powered Sales Intelligence
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })

  } catch (err) {
    console.error('Invite error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}