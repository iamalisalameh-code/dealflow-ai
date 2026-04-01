'use client'
import { useState } from 'react'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'

export default function MobileFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      number: '01', color: '#0071e3',
      title: 'Live Transcription',
      subtitle: 'Arabic & English, word for word',
      desc: 'Every word captured in real time using Google Cloud Speech-to-Text. Supports Gulf Arabic, Egyptian Arabic, and English with over 90% accuracy.',
      bullets: ['Gulf Arabic dialect support', 'English with speaker diarization', 'Auto-punctuation', 'Works on mic or Google Meet tab'],
      demo: { label: 'LIVE TRANSCRIPT', speaker: 'AHMED (PROSPECT)', text: 'مرحبا، يعجبني الموقع بس أحتاج أعرف تفاصيل التمويل أكثر وهل في دفعة أولى مرنة؟', you: 'Absolutely — for this project we have a flexible 70/30 payment plan.' },
    },
    {
      number: '02', color: '#34c759',
      title: 'AI Deal Coach',
      subtitle: 'Handle objections like a veteran',
      desc: 'The moment a prospect hesitates, your AI Coach slides in with proven counter-responses tailored to your product and industry.',
      bullets: ['Real-time objection detection', 'Counter-response suggestions', 'Coaching score after every call', 'Industry-specific responses'],
      demo: { label: 'AI COACHING', speaker: 'OBJECTION DETECTED', text: 'Prospect concerned about price — suggest payment plan flexibility and ROI calculation.', you: 'Coaching tip: Anchor value before price. Ask about their current manual process cost.' },
    },
    {
      number: '03', color: '#ff9f0a',
      title: 'Buying Signals',
      subtitle: 'Never miss a purchase intent',
      desc: "DealFlow AI flags buying signals in real time so you can strike at the perfect moment. Know exactly when the prospect is ready.",
      bullets: ['Real-time signal detection', 'Signal history per call', 'Arabic signal recognition', 'Integration with deal health'],
      demo: { label: 'BUYING SIGNALS', speaker: '⚡ SIGNAL DETECTED', text: 'يعجبني الموقع — Positive interest in location', you: '⚡ هل في دفعة أولى مرنة؟ — Asking about payment = high intent' },
    },
    {
      number: '04', color: '#bf5af2',
      title: 'Deal Health Score',
      subtitle: 'Know your odds in real time',
      desc: 'A live score from 0-100 that updates as the conversation progresses. Tracks sentiment, objections, engagement, and buying signals.',
      bullets: ['Updates every 30 seconds', 'Factors: sentiment, objections, signals', 'Post-call breakdown', 'Trend over call duration'],
      demo: { label: 'DEAL HEALTH', speaker: 'LIVE SCORE', text: '87% — Strong Progress', you: 'Factors: 3 buying signals, positive sentiment, payment plan discussed' },
    },
    {
      number: '05', color: '#ff453a',
      title: 'Smart Follow-ups',
      subtitle: 'Close the loop automatically',
      desc: 'When the call ends, get a personalized WhatsApp or email follow-up generated from the actual conversation — ready to send in seconds.',
      bullets: ['WhatsApp message draft', 'Email draft with subject line', 'Arabic & English', 'Personalized to conversation'],
      demo: { label: 'WHATSAPP FOLLOW-UP', speaker: 'GENERATED IN 3 SECONDS', text: 'أهلاً أحمد، شكراً على وقتك اليوم. كما ناقشنا، يمكننا تقديم خطة دفع 70/30 للوحدة في داون تاون...', you: 'Ready to send — tap to open WhatsApp' },
    },
    {
      number: '06', color: '#0071e3',
      title: 'Pre-Call Brief',
      subtitle: 'Walk in fully prepared',
      desc: 'Before every call, AI generates a brief with contact history, previous objections, recommended talking points, and the best opening line.',
      bullets: ['Contact history summary', 'Previous objections & outcomes', 'Recommended opening line', 'Deal stage context'],
      demo: { label: 'PRE-CALL BRIEF', speaker: 'AHMED AL-MANSOURI', text: 'Last call: Interested in 2BR. Concerned about payment plan. Suggested: Lead with 70/30 offer.', you: '✦ Recommended opening: "Ahmed, I checked and we can offer the exact plan you asked about."' },
    },
  ]

  const f = features[activeFeature]

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} body{font-family:'DM Sans',sans-serif;background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} .serif{font-family:'DM Serif Display',serif;} .tap-btn{transition:transform 0.15s,opacity 0.15s;} .tap-btn:active{transform:scale(0.97);opacity:0.85;}`}</style>
      <MobileNav activePage="features" />

      {/* Hero */}
      <section style={{ padding: '40px 24px 28px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>Every feature you need</div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 12 }}>
          Built to close<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>more deals</span>
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6 }}>Tap each feature to see it in action.</p>
      </section>

      {/* Feature tabs */}
      <section style={{ padding: '0 20px 8px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 8, paddingBottom: 4 }}>
          {features.map((feat, i) => (
            <button key={i} onClick={() => setActiveFeature(i)}
              style={{ height: 36, padding: '0 14px', borderRadius: 18, border: `1px solid ${activeFeature === i ? feat.color : 'rgba(0,0,0,0.08)'}`, background: activeFeature === i ? feat.color + '12' : 'transparent', color: activeFeature === i ? feat.color : '#6e6e73', fontSize: 13, fontWeight: 500, fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {feat.number} {feat.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </section>

      {/* Active feature */}
      <section style={{ padding: '16px 20px 40px' }}>
        <div style={{ borderRadius: 24, border: `1px solid ${f.color}20`, background: f.color + '04', padding: '24px 20px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: f.color, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>{f.number} · {f.title.toUpperCase()}</div>
          <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: 10 }}>{f.subtitle}</h2>
          <p style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.7, marginBottom: 16 }}>{f.desc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {f.bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: f.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span style={{ fontSize: 13, color: '#1d1d1f' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo card */}
        <div style={{ borderRadius: 20, background: '#000', overflow: 'hidden' }}>
          <div style={{ background: '#111', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            {['#ff453a','#ff9f0a','#34c759'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginLeft: 6 }}>{f.demo.label}</span>
          </div>
          <div style={{ padding: '14px' }}>
            <div style={{ fontSize: 9, color: f.color, fontWeight: 700, marginBottom: 6 }}>{f.demo.speaker}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 10 }}>{f.demo.text}</div>
            <div style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{f.demo.you}</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '40px 20px 48px', background: '#f5f5f7', textAlign: 'center' }}>
        <h2 className="serif" style={{ fontSize: 30, fontWeight: 400, letterSpacing: '-1px', marginBottom: 10 }}>
          Ready to try all<br /><span style={{ fontStyle: 'italic' }}>these features?</span>
        </h2>
        <p style={{ fontSize: 14, color: '#6e6e73', marginBottom: 24 }}>14-day free trial. No credit card.</p>
        <button className="tap-btn" onClick={() => window.location.href = '/login'}
          style={{ width: '100%', maxWidth: 300, height: 52, borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>
          Start Free Trial →
        </button>
      </section>

      <MobileFooter />
    </>
  )
}