'use client'
import { useState, useEffect } from 'react'

export default function CompareGongPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const comparisonData = [
    { feature: 'Arabic Dialect Support (Khaleeji, Egyptian)', dealflow: true, gong: false },
    { feature: 'Real-time AI Deal Coaching', dealflow: true, gong: true },
    { feature: 'WhatsApp Follow-up Generator', dealflow: true, gong: false },
    { feature: 'Transparent, No-Minimum Pricing', dealflow: true, gong: false },
    { feature: 'Data Hosted Locally (MENA options)', dealflow: true, gong: false },
    { feature: 'Enterprise CRM Integrations', dealflow: true, gong: true },
    { feature: 'Free 14-Day Trial', dealflow: true, gong: false },
  ]

  const CheckIcon = () => (
    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(52,199,89,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
  )

  const XIcon = () => (
    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aeaeb2" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </div>
  )

  return (
    <>
      <style>{`
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
        
        .nav-link { font-size: 14px; font-weight: 500; color: #6e6e73; cursor: pointer; transition: color 0.2s; }
        .nav-link:hover { color: #1d1d1f; }
        
        .advantage-card { background: #f5f5f7; border-radius: 24px; padding: 40px; border: 1px solid rgba(0,0,0,0.04); transition: transform 0.3s; }
        .advantage-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 64, background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px' }}>
        <div onClick={() => window.location.href = '/'} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#1d1d1f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px' }}>DealFlow AI</span>
        </div>
        <div className="desktop-nav">
          {[['Features', '/features'], ['Pricing', '/pricing'], ['Contact Sales', '/contact']].map(([label, href]) => (
            <span key={label} className="nav-link" onClick={() => window.location.href = href}>{label}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => window.location.href = '/login'} style={{ height: 36, padding: '0 18px', borderRadius: 18, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 14, fontWeight: 500 }}>Sign in</button>
          <button onClick={() => window.location.href = '/login'} style={{ height: 36, padding: '0 18px', borderRadius: 18, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 14, fontWeight: 600 }}>Get Started →</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 80, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '0%', left: '15%', width: '35%', height: '60%', background: '#0071e3', opacity: 0.04 }} />
        <div className="mesh" style={{ top: '10%', right: '15%', width: '30%', height: '50%', background: '#bf5af2', opacity: 0.04 }} />
        
        <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Compare</div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24 }}>
          DealFlow AI vs Gong:<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>Which is right for you?</span>
        </h1>
        <p className="fade-up-2" style={{ fontSize: 18, color: '#6e6e73', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Gong is a fantastic tool for large US enterprises. But if your sales team operates in the MENA region, speaks Arabic, and wants a tool that works out-of-the-box without massive annual contracts, DealFlow AI is your clear choice.
        </p>
        
        <div className="fade-up-2" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button onClick={() => window.location.href = '/login'} style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#0071e3', color: '#fff', fontSize: 16, fontWeight: 600 }}>
            Try DealFlow Free
          </button>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ padding: '60px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
            
            {/* Table Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', background: '#f5f5f7', padding: '24px 32px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feature</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#0071e3', textAlign: 'center' }}>DealFlow AI</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#1d1d1f', textAlign: 'center' }}>Gong</div>
            </div>

            {/* Table Rows */}
            {comparisonData.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', padding: '20px 32px', background: i % 2 === 0 ? '#fff' : '#fafafa', borderBottom: i !== comparisonData.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none', alignItems: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: '#1d1d1f' }}>{row.feature}</div>
                <div>{row.dealflow ? <CheckIcon /> : <XIcon />}</div>
                <div>{row.gong ? <CheckIcon /> : <XIcon />}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEEP DIVE: WHY DEALFLOW WINS */}
      <section style={{ padding: '100px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 className="serif" style={{ fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-1px' }}>Why teams are switching to DealFlow</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            
            {/* Arabic Support */}
            <div className="advantage-card">
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(0,113,227,0.1)', color: '#0071e3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Unmatched Arabic Support</h3>
              <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6 }}>
                Gong was built for English first. DealFlow AI was built to handle the complex reality of MENA sales calls: switching between English, Gulf Arabic, and Egyptian dialects in the same sentence. If your buyers speak Arabic, DealFlow is the only tool that truly understands them.
              </p>
            </div>

            {/* Pricing */}
            <div className="advantage-card">
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(52,199,89,0.1)', color: '#34c759', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Fair, Transparent Pricing</h3>
              <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6 }}>
                Gong hides their pricing, requires large minimum seat counts, and locks you into massive annual contracts. DealFlow AI offers transparent, pay-as-you-go monthly pricing starting at just $49/mo, with zero hidden platform fees.
              </p>
            </div>

            {/* MENA Workflows */}
            <div className="advantage-card">
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(191,90,242,0.1)', color: '#bf5af2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Built for MENA Workflows</h3>
              <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6 }}>
                In the Middle East, business happens on WhatsApp. DealFlow auto-generates WhatsApp follow-up summaries instantly after your calls, alongside traditional emails. We integrate with the tools you actually use to close deals locally.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* MIGRATION */}
      <section style={{ padding: '80px 48px', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 20 }}>Easy to migrate. Easier to use.</h2>
          <p style={{ fontSize: 18, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40 }}>
            No complex onboarding or weeks of implementation. You can deploy DealFlow AI to your entire sales team today. Connect Google Meet, Zoom, and your CRM in under 5 minutes.
          </p>
          <div style={{ display: 'inline-flex', gap: 16, justifyContent: 'center', alignItems: 'center', background: '#fff', padding: '24px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.04)' }}>
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
             <div style={{ textAlign: 'left' }}>
               <div style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f' }}>Free Data Migration</div>
               <div style={{ fontSize: 14, color: '#6e6e73' }}>Moving from Gong? We'll migrate your call history for free.</div>
             </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: '120px 48px', background: '#1d1d1f', position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '-30%', left: '-10%', width: '50%', height: '80%', background: '#0071e3', opacity: 0.15 }} />
        <div className="mesh" style={{ bottom: '-30%', right: '-10%', width: '40%', height: '70%', background: '#bf5af2', opacity: 0.12 }} />
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, color: '#fff', marginBottom: 20 }}>
            Make the switch to <br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>DealFlow AI.</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 40, lineHeight: 1.6 }}>
            14-day free trial. Full access to all features. Cancel your expensive Gong contract today.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => window.location.href = '/login'}
              style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600 }}>
              Start Free Trial →
            </button>
            <button onClick={() => window.location.href = '/demo'}
              style={{ height: 52, padding: '0 32px', borderRadius: 26, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 16, fontWeight: 500 }}>
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px 48px', background: '#1d1d1f', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>DealFlow AI</span>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {[['Landing', '/'], ['Pricing', '/pricing'], ['Contact', '/contact']].map(([label, href]) => (
            <span key={label} onClick={() => window.location.href = href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>{label}</span>
          ))}
        </div>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© 2026 DealFlow AI</span>
      </footer>
    </>
  )
}