'use client'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import { useState, useEffect } from 'react'

export default function FeaturesClient() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('transcription')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = ['transcription', 'coach', 'signals', 'analytics', 'prep-followup', 'team']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= (el.offsetTop - 300)) {
          setActiveSection(section)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' })
    }
  }

  const sidebarLinks = [
    { id: 'transcription', label: 'Live Transcription', color: '#0071e3' },
    { id: 'coach', label: 'AI Deal Coach', color: '#34c759' },
    { id: 'signals', label: 'Buying Signals', color: '#ff9f0a' },
    { id: 'analytics', label: 'Health & Talk Ratio', color: '#ff453a' },
    { id: 'prep-followup', label: 'Prep & Follow-ups', color: '#bf5af2' },
    { id: 'team', label: 'Team Management', color: '#1d1d1f' },
  ]

  return (
    <>
      <style>{`
        .responsive-order { order: -1; }
        @media (min-width: 900px) { .responsive-order { order: 0; } }
    
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #fff; color: #1d1d1f; font-family: 'DM Sans', -apple-system, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        button { cursor: pointer; font-family: inherit; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        
        .nav-link { font-size: 14px; font-weight: 500; color: #6e6e73; cursor: pointer; transition: color 0.2s; }
        .nav-link:hover { color: #1d1d1f; }
        
        .feature-block { padding: 80px 0; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .feature-block:last-child { border-bottom: none; }
        
        .mockup-card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.04); overflow: hidden; }
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}</style>

      {/* NAV */}
      <MarketingNav activePage="features" />

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 60, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '0%', left: '20%', width: '30%', height: '60%', background: '#0071e3', opacity: 0.05 }} />
        <div className="mesh" style={{ top: '10%', right: '20%', width: '30%', height: '50%', background: '#bf5af2', opacity: 0.05 }} />
        
        <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Feature Deep Dive</div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24 }}>
          Every feature you need to<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>close more deals</span>
        </h1>
        <p className="fade-up-2" style={{ fontSize: 19, color: '#6e6e73', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          From real-time Arabic transcription to automated WhatsApp follow-ups, explore how DealFlow AI acts as your ultimate sales co-pilot.
        </p>
      </section>

      {/* MAIN CONTENT WITH STICKY SIDEBAR */}
      <section style={{ display: 'flex', maxWidth: 1200, margin: '0 auto', padding: '40px 48px 120px', gap: 64, position: 'relative' }}>
        
        {/* Sticky Sidebar */}
        <div style={{ width: 240, flexShrink: 0, display: 'none', '@media(min-width: 900px)': { display: 'block' } } as any}>
          <div style={{ position: 'sticky', top: 120, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aeaeb2', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Jump to feature</div>
            {sidebarLinks.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                style={{ textAlign: 'left', padding: '8px 16px', borderRadius: 12, border: 'none', background: activeSection === link.id ? link.color + '12' : 'transparent', color: activeSection === link.id ? link.color : '#6e6e73', fontSize: 14, fontWeight: activeSection === link.id ? 600 : 500, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 10 }}>
                {activeSection === link.id && <div style={{ width: 6, height: 6, borderRadius: '50%', background: link.color }} />}
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Sections */}
        <div style={{ flex: 1 }}>
          
          {/* 1. Live Transcription */}
          <div id="transcription" className="feature-block">
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>01 · Live Transcription</div>
            <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 16 }}>Never miss a word, in English or Arabic</h2>
            <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40 }}>
              Powered by advanced speech-to-text models, DealFlow captures every detail with 90%+ accuracy. It natively understands Gulf Arabic, Egyptian, and Modern Standard Arabic dialects.
            </p>
            
            <div className="mockup-card">
              <div style={{ background: '#f5f5f7', padding: '12px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1f' }}>Live Transcript</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0071e3', background: 'rgba(0,113,227,0.1)', padding: '4px 12px', borderRadius: 12 }}>AR / EN Auto-detect</span>
              </div>
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#34c759', marginBottom: 4 }}>SAEED (PROSPECT)</div>
                  <div style={{ fontSize: 15, color: '#1d1d1f', lineHeight: 1.5, direction: 'rtl', fontFamily: 'system-ui' }}>
                    مرحبا، يعجبني الموقع بس أحتاج أعرف تفاصيل التمويل أكثر وهل في دفعة أولى مرنة؟
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1d1d1f', marginBottom: 4 }}>YOU</div>
                  <div style={{ fontSize: 15, color: '#1d1d1f', lineHeight: 1.5 }}>
                    Absolutely Saeed. For this specific project in Downtown, we have a flexible 70/30 payment plan.
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => window.location.href = '/pricing'} style={{ marginTop: 24, background: 'none', border: 'none', color: '#0071e3', fontSize: 14, fontWeight: 600 }}>See pricing plans →</button>
          </div>

          {/* 2. AI Deal Coach */}
          <div id="coach" className="feature-block">
            <div style={{ fontSize: 13, fontWeight: 700, color: '#34c759', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>02 · AI Deal Coach</div>
            <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 16 }}>Handle objections like a veteran</h2>
            <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40 }}>
              The moment a prospect hesitates or throws an objection, your AI Coach slides in with proven counter-responses and battlecards tailored to your specific product.
            </p>

            <div className="mockup-card" style={{ background: '#1d1d1f', color: '#fff', border: 'none' }}>
              <div style={{ padding: 24, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>PROSPECT SAID:</div>
                <div style={{ fontSize: 18, fontWeight: 500 }}>"Your service charges seem higher than your competitor across the street."</div>
              </div>
              <div style={{ padding: 24, background: 'rgba(52,199,89,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#34c759', letterSpacing: '0.05em' }}>AI SUGGESTION</span>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>
                  Acknowledge the cost, but pivot to value: <strong style={{ color: '#fff' }}>"They are slightly higher, but our building includes chiller-free AC and a dedicated smart-home system, saving you roughly AED 4,000/year in utilities."</strong>
                </p>
              </div>
            </div>
          </div>

          {/* 3. Buying Signals */}
          <div id="signals" className="feature-block">
            <div style={{ fontSize: 13, fontWeight: 700, color: '#ff9f0a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>03 · Buying Signal Detection</div>
            <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 16 }}>Strike while the iron is hot</h2>
            <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40 }}>
              DealFlow AI listens for subtle cues—questions about implementation, pricing details, or timeline—and flags them instantly so you know when to push for the close.
            </p>

            <div className="mockup-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Detected Signals (3)</span>
                <span style={{ padding: '4px 12px', background: 'rgba(255,159,10,0.1)', color: '#ff9f0a', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>High Intent</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { time: '12:45', text: 'Asked about handover date and SPA process' },
                  { time: '18:20', text: 'Inquired about paying via cryptocurrency' },
                  { time: '24:10', text: 'Requested to see the contract draft' }
                ].map((sig, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 16px', borderRadius: 16, background: '#f5f5f7' }}>
                    <div style={{ fontSize: 13, color: '#aeaeb2', fontFamily: 'monospace', paddingTop: 2 }}>{sig.time}</div>
                    <div style={{ fontSize: 14, color: '#1d1d1f', fontWeight: 500 }}>{sig.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Health & Talk Ratio */}
          <div id="analytics" className="feature-block">
            <div style={{ fontSize: 13, fontWeight: 700, color: '#ff453a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>04 · Health & Analytics</div>
            <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 16 }}>Know exactly where the deal stands</h2>
            <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40 }}>
              Monitor your Talk Ratio (aim for 45-55%) and get a live Deal Health Score calculated by analyzing sentiment, objections overcome, and buying signals generated.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="mockup-card" style={{ padding: 32, textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#6e6e73', letterSpacing: '0.1em', marginBottom: 16 }}>DEAL HEALTH</div>
                <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto' }}>
                  <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f5f5f7" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#34c759" strokeWidth="3" strokeDasharray="85, 100" />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px' }}>85<span style={{ fontSize: 16 }}>%</span></div>
                </div>
                <div style={{ fontSize: 14, color: '#34c759', fontWeight: 600, marginTop: 16 }}>Highly likely to close</div>
              </div>

              <div className="mockup-card" style={{ padding: 32, textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#6e6e73', letterSpacing: '0.1em', marginBottom: 16 }}>TALK RATIO</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16, height: 120 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 40, height: 50, background: '#0071e3', borderRadius: '8px 8px 0 0' }} />
                    <div style={{ fontSize: 16, fontWeight: 700 }}>42%</div>
                    <div style={{ fontSize: 12, color: '#6e6e73' }}>You</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 40, height: 70, background: '#ff453a', borderRadius: '8px 8px 0 0' }} />
                    <div style={{ fontSize: 16, fontWeight: 700 }}>58%</div>
                    <div style={{ fontSize: 12, color: '#6e6e73' }}>Client</div>
                  </div>
                </div>
                <div style={{ fontSize: 14, color: '#6e6e73', marginTop: 16 }}>Perfect listening balance</div>
              </div>
            </div>
          </div>

          {/* 5. Prep & Follow Up */}
          <div id="prep-followup" className="feature-block">
            <div style={{ fontSize: 13, fontWeight: 700, color: '#bf5af2', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>05 · Prep & Smart Follow-ups</div>
            <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 16 }}>Zero admin work. Just selling.</h2>
            <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40 }}>
              Before the call, get an AI-generated brief based on past interactions. After the call, DealFlow AI instantly drafts personalized WhatsApp messages and emails based on exactly what was discussed.
            </p>

            {/* Before / After Concept */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 24, overflow: 'hidden' }}>
              <div style={{ background: '#fafafa', padding: 32 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#6e6e73', marginBottom: 20 }}>BEFORE DEALFLOW</div>
                <div style={{ width: '100%', height: 160, background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, padding: 16, position: 'relative' }}>
                  <div style={{ width: '60%', height: 8, background: '#f0f0f0', borderRadius: 4, marginBottom: 12 }} />
                  <div style={{ width: '80%', height: 8, background: '#f0f0f0', borderRadius: 4, marginBottom: 12 }} />
                  <div style={{ width: '40%', height: 8, background: '#f0f0f0', borderRadius: 4, marginBottom: 24 }} />
                  <div style={{ position: 'absolute', bottom: 16, right: 16, fontSize: 11, color: '#aeaeb2' }}>Drafting manual email... 15 mins</div>
                </div>
              </div>
              <div style={{ background: '#fff', padding: 32 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#bf5af2', marginBottom: 20 }}>WITH DEALFLOW AI</div>
                <div style={{ width: '100%', background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.04)', borderRadius: 16, padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>WhatsApp Draft Ready</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#1d1d1f', lineHeight: 1.5, background: '#fff', padding: 12, borderRadius: 12, border: '1px solid rgba(0,0,0,0.04)' }}>
                    "Hi Saeed, great speaking today. As requested, here is the brochure for the Downtown unit with the 70/30 plan..."
                  </p>
                  <button style={{ width: '100%', marginTop: 12, background: '#1d1d1f', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 0', fontSize: 12, fontWeight: 600 }}>Send to Client</button>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Team Management */}
          <div id="team" className="feature-block">
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1d1d1f', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>06 · Team Management</div>
            <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 16 }}>Coach your entire sales floor</h2>
            <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40 }}>
              For sales managers: invite agents, set call limits, enable/disable specific features (like Arabic mode), and review team performance analytics to see who is closing and why.
            </p>

            <div className="mockup-card">
              <div style={{ background: '#f5f5f7', padding: '16px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f' }}>Active Agents (3/10)</span>
              </div>
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { name: 'Tariq H.', role: 'Senior Agent', score: '92%', status: 'On a Call' },
                  { name: 'Sarah M.', role: 'Sales Rep', score: '85%', status: 'Available' },
                  { name: 'Omar K.', role: 'Sales Rep', score: '78%', status: 'Available' },
                ].map((agent, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1d1d1f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>{agent.name.charAt(0)}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f' }}>{agent.name}</div>
                        <div style={{ fontSize: 12, color: '#6e6e73' }}>{agent.role}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 11, color: '#aeaeb2', marginBottom: 2 }}>AVG SCORE</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f' }}>{agent.score}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: 80, justifyContent: 'flex-end' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: agent.status === 'On a Call' ? '#ff9f0a' : '#34c759' }} />
                        <span style={{ fontSize: 12, color: '#6e6e73' }}>{agent.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => window.location.href = '/pricing'} style={{ marginTop: 24, background: 'none', border: 'none', color: '#1d1d1f', fontSize: 14, fontWeight: 600, textDecoration: 'underline' }}>View Team Pricing →</button>
          </div>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: '120px 48px', background: '#1d1d1f', position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '-30%', left: '-10%', width: '50%', height: '80%', background: '#0071e3', opacity: 0.15 }} />
        <div className="mesh" style={{ bottom: '-30%', right: '-10%', width: '40%', height: '70%', background: '#bf5af2', opacity: 0.12 }} />
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, color: '#fff', marginBottom: 20 }}>
            Experience the features<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>live on your next call</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 40, lineHeight: 1.6 }}>
            14-day free trial. Full access to all features. No credit card required.
          </p>
          <button onClick={() => window.location.href = '/login'}
            style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600 }}>
            Start Free Trial →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <MarketingFooter />
    </>
  )
}