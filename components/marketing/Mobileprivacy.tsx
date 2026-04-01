'use client'
import { useState } from 'react'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'

export default function MobilePrivacy() {
  const [openSection, setOpenSection] = useState<number | null>(0)

  const sections = [
    { title: 'What we collect', content: 'We collect audio recordings during calls, transcripts generated from those recordings, your profile information (name, email, industry, experience level), and usage data to improve the product. We never collect payment card details directly — payments are processed by Stripe.' },
    { title: 'How we use your data', content: 'Your data is used solely to provide and improve DealFlow AI services: generating transcripts, AI coaching insights, and follow-up messages. We never sell your data to third parties. We never use your call recordings to train AI models without your explicit consent.' },
    { title: 'Data storage', content: 'Your data is stored on Supabase (PostgreSQL database) hosted on AWS infrastructure in EU regions. Call audio is processed in real time and not permanently stored. Transcripts and insights are kept for 90 days unless you delete them sooner.' },
    { title: 'Third-party services', content: 'We use Google Cloud Speech-to-Text for transcription, Google Gemini for AI insights, Resend for email delivery, Supabase for database and authentication, and Vercel for hosting. Each service has its own privacy policy governing data they process.' },
    { title: 'Your rights', content: 'You have the right to access, export, or delete all your data at any time. Go to Settings → Danger Zone to delete your account and all associated data. We will process deletion requests within 30 days.' },
    { title: 'Cookies', content: 'We use essential cookies for authentication only. We do not use advertising cookies or third-party tracking cookies. You can disable cookies in your browser but this will prevent you from logging in.' },
    { title: 'Contact', content: 'For privacy inquiries, email us at privacy@dealflow-ai.com. We aim to respond within 48 hours.' },
  ]

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} body{font-family:'DM Sans',sans-serif;background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} .serif{font-family:'DM Serif Display',serif;}`}</style>
      <MobileNav />

      <section style={{ padding: '40px 24px 32px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#6e6e73', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Last updated: March 2026</div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 12 }}>Privacy <span style={{ fontStyle: 'italic' }}>Policy</span></h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6 }}>We take your privacy seriously. Here's exactly what we collect and how we use it.</p>
      </section>

      <section style={{ padding: '0 20px 48px' }}>
        {/* Key promise */}
        <div style={{ padding: '16px 20px', borderRadius: 20, background: 'rgba(52,199,89,0.06)', border: '1px solid rgba(52,199,89,0.15)', marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f', marginBottom: 4 }}>Our core promise</div>
            <div style={{ fontSize: 13, color: '#6e6e73', lineHeight: 1.5 }}>We never sell your data. We never train AI on your calls without consent. Your data is yours.</div>
          </div>
        </div>

        {/* Accordion */}
        <div style={{ background: '#f5f5f7', borderRadius: 20, overflow: 'hidden' }}>
          {sections.map((section, i) => (
            <div key={i} style={{ borderBottom: i < sections.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
              <button onClick={() => setOpenSection(openSection === i ? null : i)}
                style={{ width: '100%', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: openSection === i ? '#fff' : 'transparent', border: 'none', textAlign: 'left', color: '#1d1d1f', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', gap: 12 }}>
                <span>{section.title}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6e6e73" strokeWidth="2" strokeLinecap="round"
                  style={{ transition: 'transform 0.2s', transform: openSection === i ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {openSection === i && (
                <div style={{ padding: '0 20px 16px', background: '#fff', fontSize: 14, color: '#6e6e73', lineHeight: 1.7 }}>
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <MobileFooter />
    </>
  )
}