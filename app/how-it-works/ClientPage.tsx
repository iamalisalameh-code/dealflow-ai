'use client'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import { useState, useEffect } from 'react'

export default function HowItWorksClient() {
  const [scrolled, setScrolled] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      number: '01',
      title: 'Start your call',
      desc: 'Open DealFlow AI, select your contact, and start a call via microphone or Google Meet. The AI activates instantly.',
      color: '#0071e3',
      detail: 'Works with Google Meet, Zoom, Microsoft Teams, or your regular phone mic. No setup needed.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
      ),
    },
    {
      number: '02',
      title: 'AI listens & coaches',
      desc: 'Every word is transcribed in real time. The AI detects objections, buying signals, and gives you live coaching tips.',
      color: '#34c759',
      detail: 'Deal health score updates live. Key questions suggested. Objections flagged with counter-responses.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Close & follow up',
      desc: 'When the call ends, get a full coaching summary and auto-generated WhatsApp or email follow-up ready to send.',
      color: '#bf5af2',
      detail: 'CRM auto-updates. Deal stage advances. Follow-up message personalized to the exact conversation.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
    },
  ]

  const stats = [
    { value: '34%', label: 'Average increase in close rate', color: '#0071e3', desc: 'Across all industries in the first 30 days' },
    { value: '2.4×', label: 'Faster follow-up response time', color: '#34c759', desc: 'vs manual follow-up drafting' },
    { value: '91%', label: 'Arabic transcription accuracy', color: '#bf5af2', desc: 'Gulf, Egyptian & MSA dialects' },
    { value: '8 min', label: 'Average time saved per call', color: '#ff9f0a', desc: 'On notes, CRM updates & follow-ups' },
    { value: '3×', label: 'More buying signals caught', color: '#ff453a', desc: 'vs unassisted sales calls' },
    { value: '14 days', label: 'Free trial, no card required', color: '#0071e3', desc: 'Full access to all features' },
  ]

  const integrations = [
    {
      name: 'Google Meet',
      desc: 'Capture both sides of Google Meet calls with one click',
      color: '#0071e3',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="15" height="10" rx="2"/>
          <path d="M17 9l5-2v10l-5-2"/>
        </svg>
      ),
    },
    {
      name: 'Zoom',
      desc: 'Works seamlessly with Zoom meetings and webinars',
      color: '#2D8CFF',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="15" height="10" rx="2"/>
          <path d="M17 9l5-2v10l-5-2"/>
        </svg>
      ),
    },
    {
      name: 'Microsoft Teams',
      desc: 'Full Teams integration for enterprise sales teams',
      color: '#5059C9',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      desc: 'Send AI-generated follow-ups directly via WhatsApp',
      color: '#25D366',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
    {
      name: 'Gmail',
      desc: 'Open AI-drafted emails directly in Gmail with one click',
      color: '#EA4335',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      name: 'Google Cloud',
      desc: 'Powered by Google Speech-to-Text for best-in-class accuracy',
      color: '#4285F4',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
    },
    {
      name: 'Gemini AI',
      desc: 'Gemini 2.5 Flash powers all real-time insights and coaching',
      color: '#8E75F0',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
    },
    {
      name: 'Supabase',
      desc: 'Enterprise-grade database with row-level security',
      color: '#3ECF8E',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      ),
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff; color: #1d1d1f; font-family: 'DM Sans', -apple-system, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        button { cursor: pointer; font-family: inherit; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        
        
        .stat-card { background: #f5f5f7; border-radius: 24px; padding: 32px; transition: transform 0.3s, box-shadow 0.3s; }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.08); }
        .int-card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 20px; padding: 24px; transition: all 0.3s; }
        .int-card:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(0,0,0,0.08); border-color: rgba(0,0,0,0.12); }
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
        .step-dot { width: 10px; height: 10px; border-radius: 50%; transition: all 0.3s; cursor: pointer; }
      `}</style>

      {/* NAV */}
      <MarketingNav activePage="how-it-works" />

      {/* HERO */}
      <section style={{ paddingTop: 140, paddingBottom: 80, textAlign: 'center', padding: '140px 48px 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '-20%', left: '0%', width: '40%', height: '60%', background: '#0071e3', opacity: 0.06 }} />
        <div className="mesh" style={{ top: '-10%', right: '0%', width: '35%', height: '50%', background: '#bf5af2', opacity: 0.05 }} />
        <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(52,199,89,0.08)', border: '1px solid rgba(52,199,89,0.15)', marginBottom: 28 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34c759', animation: 'pulse 1.5s infinite' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#34c759' }}>Live product walkthrough</span>
        </div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 20 }}>
          How DealFlow AI<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>works for you</span>
        </h1>
        <p className="fade-up-2" style={{ fontSize: 18, color: '#6e6e73', maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.6 }}>
          Three simple steps from cold call to closed deal — with AI doing the heavy lifting.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '40px 48px 120px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Step dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 60 }}>
            {steps.map((_, i) => (
              <div key={i} className="step-dot" onClick={() => setActiveStep(i)}
                style={{ background: activeStep === i ? steps[i].color : 'rgba(0,0,0,0.12)', width: activeStep === i ? 28 : 10 }} />
            ))}
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {steps.map((step, i) => (
              <div key={i} onClick={() => setActiveStep(i)}
                style={{ borderRadius: 28, border: `1px solid ${activeStep === i ? step.color + '30' : 'rgba(0,0,0,0.06)'}`, background: activeStep === i ? step.color + '04' : '#f5f5f7', padding: '32px 40px', cursor: 'pointer', transition: 'all 0.3s', display: 'grid', gridTemplateColumns: '80px 1fr auto', alignItems: 'center', gap: 32 }}>
                <div style={{ fontSize: 48, fontWeight: 700, color: activeStep === i ? step.color : 'rgba(0,0,0,0.12)', letterSpacing: '-2px', lineHeight: 1, fontFamily: 'DM Serif Display, Georgia, serif' }}>{step.number}</div>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 600, color: '#1d1d1f', marginBottom: 8, letterSpacing: '-0.3px' }}>{step.title}</h3>
                  <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6, marginBottom: activeStep === i ? 12 : 0 }}>{step.desc}</p>
                  {activeStep === i && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 12, background: step.color + '12', border: `1px solid ${step.color}25` }}>
                      <span style={{ fontSize: 13, color: step.color, fontWeight: 500 }}>{step.detail}</span>
                    </div>
                  )}
                </div>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: activeStep === i ? step.color : 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeStep === i ? '#fff' : '#aeaeb2', transition: 'all 0.3s', flexShrink: 0 }}>
                  {step.icon}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 60 }}>
            <button onClick={() => window.location.href = '/login'}
              style={{ height: 52, padding: '0 36px', borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600 }}>
              Try it free for 14 days →
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '120px 48px', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>By the numbers</div>
            <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16 }}>
              Results that speak<br /><span style={{ fontStyle: 'italic' }}>for themselves</span>
            </h2>
            <p style={{ fontSize: 18, color: '#6e6e73', maxWidth: 480, margin: '0 auto' }}>
              Based on data from sales teams using DealFlow AI across the UAE and MENA region.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <div style={{ fontSize: 56, fontWeight: 700, color: stat.color, letterSpacing: '-2px', lineHeight: 1, marginBottom: 8, fontFamily: 'DM Serif Display, Georgia, serif' }}>{stat.value}</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: '#1d1d1f', marginBottom: 6, letterSpacing: '-0.2px' }}>{stat.label}</div>
                <div style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.5 }}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section style={{ padding: '120px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Integrations</div>
            <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16 }}>
              Works with the tools<br /><span style={{ fontStyle: 'italic' }}>you already use</span>
            </h2>
            <p style={{ fontSize: 18, color: '#6e6e73', maxWidth: 480, margin: '0 auto' }}>
              No complicated setup. DealFlow AI plugs into your existing workflow in seconds.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 60 }}>
            {integrations.map((int, i) => (
              <div key={i} className="int-card">
                <div style={{ width: 52, height: 52, borderRadius: 14, background: int.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', color: int.color, marginBottom: 16 }}>
                  {int.icon}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', marginBottom: 6 }}>{int.name}</div>
                <div style={{ fontSize: 13, color: '#6e6e73', lineHeight: 1.5 }}>{int.desc}</div>
              </div>
            ))}
          </div>

          {/* Coming soon */}
          <div style={{ textAlign: 'center', padding: '28px', borderRadius: 20, background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 14, color: '#6e6e73', marginBottom: 12 }}>Coming soon</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
              {['Salesforce', 'HubSpot', 'Pipedrive', 'Slack', 'Notion'].map(tool => (
                <span key={tool} style={{ fontSize: 14, fontWeight: 600, color: '#aeaeb2' }}>{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '120px 48px', background: '#1d1d1f', position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '-30%', left: '-10%', width: '50%', height: '80%', background: '#0071e3', opacity: 0.15 }} />
        <div className="mesh" style={{ bottom: '-30%', right: '-10%', width: '40%', height: '70%', background: '#bf5af2', opacity: 0.12 }} />
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, color: '#fff', marginBottom: 20 }}>
            Start closing more<br /><span style={{ fontStyle: 'italic', color: '#34c759' }}>deals today</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 40, lineHeight: 1.6 }}>
            14-day free trial. No credit card. Cancel anytime.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => window.location.href = '/login'}
              style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600 }}>
              Get Started Free →
            </button>
            <button onClick={() => window.location.href = '/landing#pricing'}
              style={{ height: 52, padding: '0 32px', borderRadius: 26, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 16, fontWeight: 500 }}>
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <MarketingFooter />
    </>
  )
}