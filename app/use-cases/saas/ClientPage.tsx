'use client'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import { useState, useEffect } from 'react'

export default function SaasClient() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const benefits = [
    {
      title: 'Auto-Track MEDDIC & BANT',
      desc: 'Stop guessing if a deal is qualified. DealFlow AI listens to your discovery calls and automatically checks off your qualification criteria (Budget, Authority, Need, Timeline) in real-time.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
      )
    },
    {
      title: 'Live Competitor Battlecards',
      desc: 'The moment a prospect mentions a competitor (like Salesforce or Microsoft), your AI Coach instantly pops up on screen with your latest kill-sheets and feature differentiators.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff453a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
      )
    },
    {
      title: 'Zero-Touch CRM Updates',
      desc: 'AEs hate admin work. DealFlow automatically pushes call summaries, next steps, and deal stage updates directly to HubSpot or Salesforce the second you end the Google Meet.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#bf5af2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
      )
    }
  ]

  return (
    <>
      <style>{`
        .responsive-order { order: -1; }
        @media (min-width: 900px) { .responsive-order { order: 0; } }
    
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff; color: #1d1d1f; font-family: 'DM Sans', -apple-system, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        button { cursor: pointer; font-family: inherit; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        
        .desktop-nav { display: flex; align-items: center; gap: 32px; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        
        
        
        
        .benefit-card { padding: 32px; border-radius: 24px; background: #f5f5f7; border: 1px solid rgba(0,0,0,0.04); transition: transform 0.3s; }
        .benefit-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        
        .split-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        @media (max-width: 900px) { .split-grid { grid-template-columns: 1fr; gap: 40px; } }
        
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}</style>

      {/* NAV */}
      <MarketingNav activePage="saas" />

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 80, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '0%', left: '10%', width: '35%', height: '60%', background: '#0071e3', opacity: 0.05 }} />
        <div className="mesh" style={{ top: '10%', right: '10%', width: '30%', height: '50%', background: '#bf5af2', opacity: 0.05 }} />
        
        <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>B2B SaaS Sales</div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24, maxWidth: 900, margin: '0 auto 24px' }}>
          Win complex software deals<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>with Revenue Intelligence.</span>
        </h1>
        <p className="fade-up-2" style={{ fontSize: 19, color: '#6e6e73', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Empower your Account Executives to nail every demo, track BANT criteria automatically, and keep your CRM perfectly updated without lifting a finger.
        </p>
        
        <div className="fade-up-2" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button onClick={() => window.location.href = '/login'} style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600 }}>
            Start Free Trial
          </button>
          <button onClick={() => window.location.href = '/demo'} style={{ height: 52, padding: '0 32px', borderRadius: 26, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 16, fontWeight: 600 }}>
            Book a Demo
          </button>
        </div>
      </section>

      {/* PROBLEM / BENEFITS GRID */}
      <section style={{ padding: '60px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {benefits.map((b, i) => (
            <div key={i} className="benefit-card">
              <div style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                {b.icon}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1d1d1f', marginBottom: 12 }}>{b.title}</h3>
              <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE SPOTLIGHT: BANT FRAMEWORK */}
      <section style={{ padding: '100px 48px', background: '#f5f5f7' }}>
        <div className="split-grid" style={{ maxWidth: 1100, margin: '0 auto' }}>
          
          <div>
            <h2 className="serif" style={{ fontSize: 40, letterSpacing: '-1px', marginBottom: 20 }}>Never leave a discovery call blind</h2>
            <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.6, marginBottom: 24 }}>
              In B2B sales, missing a key qualification question can waste weeks of effort. DealFlow AI acts as a live co-pilot, actively listening to the conversation and checking off your chosen sales framework (BANT, MEDDIC, SPIN) in real-time.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Live prompts for missing qualification data', 'Auto-generated Deal Summaries for leadership', 'Identify true decision-makers faster'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: '#1d1d1f', fontWeight: 500 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,113,227,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0071e3' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 30px 60px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1d1d1f', letterSpacing: '0.05em' }}>LIVE BANT TRACKER</div>
              <div style={{ padding: '4px 12px', background: 'rgba(0,113,227,0.1)', color: '#0071e3', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>75% QUALIFIED</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { letter: 'B', title: 'Budget', status: 'checked', desc: '$50k allocated for Q3' },
                { letter: 'A', title: 'Authority', status: 'checked', desc: 'Speaking to VP of IT' },
                { letter: 'N', title: 'Need', status: 'checked', desc: 'Current system takes 10+ hours/week' },
                { letter: 'T', title: 'Timeline', status: 'pending', desc: 'AI Prompt: Ask when they need to go live by' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: item.status === 'checked' ? '#34c759' : '#f5f5f7', color: item.status === 'checked' ? '#fff' : '#aeaeb2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>
                    {item.letter}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: item.status === 'pending' ? '#ff9f0a' : '#6e6e73', fontWeight: item.status === 'pending' ? 600 : 400 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CRM SYNC & MENA CONTEXT */}
      <section style={{ padding: '100px 48px', background: '#fff' }}>
        <div className="split-grid" style={{ maxWidth: 1100, margin: '0 auto' }}>
          
          <div style={{ background: '#f5f5f7', borderRadius: 24, padding: 32, border: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, padding: '12px 24px', background: '#fff', borderRadius: 40, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#1d1d1f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#aeaeb2" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#ff7a59' }}>HubSpot</div>
              </div>
            </div>
            
            <div style={{ background: '#fff', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 12, color: '#aeaeb2', fontWeight: 700, marginBottom: 8 }}>AUTO-LOGGED NOTE</div>
              <p style={{ fontSize: 14, color: '#1d1d1f', lineHeight: 1.6, marginBottom: 16 }}>
                <strong>Discovery Call Summary:</strong><br/>
                Client is frustrated with current vendor's downtime. They are looking to switch before Q4. Main objection was regarding implementation time. Overcame by explaining our 14-day onboarding SLA.
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ padding: '4px 10px', background: '#f5f5f7', borderRadius: 8, fontSize: 12, fontWeight: 600 }}>Next Step: Send Security Whitepaper</span>
              </div>
            </div>
          </div>

          <div className="responsive-order">
            <h2 className="serif" style={{ fontSize: 40, letterSpacing: '-1px', marginBottom: 20 }}>Zero-admin CRM hygiene</h2>
            <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.6, marginBottom: 24 }}>
              Account Executives in the MENA region spend up to 30% of their week updating CRM records in English after taking calls in Arabic. DealFlow AI translates, summarizes, and structures your Arabic and English calls directly into Salesforce or HubSpot instantly.
            </p>
            <button onClick={() => window.location.href = '/features'} style={{ background: 'none', border: 'none', color: '#0071e3', fontSize: 15, fontWeight: 600 }}>See integration details →</button>
          </div>

        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ padding: '80px 48px', background: '#1d1d1f', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 24 }}>
            {[1,2,3,4,5].map(star => <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="#ff9f0a" stroke="#ff9f0a"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
          </div>
          <h3 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 400, lineHeight: 1.4, marginBottom: 32 }}>
            "DealFlow is like having a sales manager sitting next to every AE on my team. The live battlecards help junior reps sound like 10-year veterans, and I finally have HubSpot pipelines that are 100% accurate."
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#bf5af2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>KA</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Kareem Al-Hassan</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>VP of Sales, MENA SaaS Startup</div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: '120px 48px', background: '#f5f5f7', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, color: '#1d1d1f', marginBottom: 20 }}>
            Ready to increase your <br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>SaaS win rates?</span>
          </h2>
          <p style={{ fontSize: 18, color: '#6e6e73', marginBottom: 40, lineHeight: 1.6 }}>
            Start your 14-day free trial today. Connect your CRM in 2 minutes and let AI handle the heavy lifting.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => window.location.href = '/login'}
              style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600 }}>
              Get Started Free →
            </button>
            <button onClick={() => window.location.href = '/demo'}
              style={{ height: 52, padding: '0 32px', borderRadius: 26, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 16, fontWeight: 500 }}>
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <MarketingFooter />
    </>
  )
}