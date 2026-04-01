'use client'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import { useState, useEffect } from 'react'

export default function InsuranceClient() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const benefits = [
    {
      title: 'Bulletproof Compliance',
      desc: 'Automatically flag if mandatory compliance scripts (e.g., DHA regulations, policy exclusions) were missed during the call. Keep a perfect, searchable transcript of every client interaction.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
      )
    },
    {
      title: 'Capture Exact Medical & Asset Details',
      desc: 'Never ask a client to repeat their pre-existing conditions, vehicle VIN, or exact coverage requirements. DealFlow extracts these entities automatically into your post-call notes.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
      )
    },
    {
      title: 'Expats & Locals Covered',
      desc: 'Selling life insurance to a mix of Arabic and English speakers? DealFlow seamlessly detects and transcribes both languages, including heavy regional dialects.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#bf5af2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      )
    }
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
      <MarketingNav activePage="insurance" />

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 80, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '0%', left: '10%', width: '35%', height: '60%', background: '#0071e3', opacity: 0.05 }} />
        <div className="mesh" style={{ top: '10%', right: '10%', width: '30%', height: '50%', background: '#34c759', opacity: 0.04 }} />
        
        <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Insurance Brokers & Agents</div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24, maxWidth: 900, margin: '0 auto 24px' }}>
          Close more policies. <br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>Stay 100% compliant.</span>
        </h1>
        <p className="fade-up-2" style={{ fontSize: 19, color: '#6e6e73', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.6 }}>
          DealFlow AI listens to your client consultations, extracts complex health and coverage requirements, ensures mandatory disclosures are read, and generates ready-to-send policy quotes.
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

      {/* FEATURE SPOTLIGHT: DATA EXTRACTION */}
      <section style={{ padding: '100px 48px', background: '#f5f5f7' }}>
        <div className="split-grid" style={{ maxWidth: 1100, margin: '0 auto' }}>
          
          <div style={{ background: '#1d1d1f', borderRadius: 24, padding: 32, boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>AUTO-EXTRACTED DATA</div>
              <div style={{ padding: '4px 12px', background: 'rgba(52,199,89,0.15)', color: '#34c759', borderRadius: 12, fontSize: 11, fontWeight: 700 }}>SYNCED TO CRM</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Policy Type', value: 'Term Life (20 Years)' },
                { label: 'Coverage Target', value: '$1,000,000 USD' },
                { label: 'Dependents', value: 'Spouse, 2 Children' },
                { label: 'Medical History', value: 'Hypertension (Medicated), No Smoking' },
                { label: 'Current Provider', value: 'Zurich International' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none', paddingBottom: i < 4 ? 16 : 0 }}>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{item.label}</span>
                  <span style={{ fontSize: 14, color: '#fff', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="serif" style={{ fontSize: 40, letterSpacing: '-1px', marginBottom: 20 }}>Never miss a critical detail again</h2>
            <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.6, marginBottom: 24 }}>
              Insurance quotes rely on perfect accuracy. DealFlow AI automatically identifies and categorizes the client's medical history, asset details, budget, and coverage needs during your conversation, formatting them perfectly for your CRM or quoting software.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Works for Life, Health, Auto, and Property', 'Reduces post-call admin by 80%', 'Identifies upselling opportunities for add-ons'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: '#1d1d1f', fontWeight: 500 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,113,227,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0071e3' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ padding: '80px 48px', background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 24 }}>
            {[1,2,3,4,5].map(star => <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="#ff9f0a" stroke="#ff9f0a"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
          </div>
          <h3 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 400, lineHeight: 1.4, marginBottom: 32 }}>
            "In insurance sales, compliance and accurate notes are everything. DealFlow AI guarantees I never miss asking a mandatory health question, and instantly drafts the policy summary for my clients right after we hang up."
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#34c759', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>MA</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Majid Ali</div>
              <div style={{ fontSize: 14, color: '#6e6e73' }}>Senior Broker, UAE Life & Health</div>
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
            Protect your clients. <br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>Protect your time.</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 40, lineHeight: 1.6 }}>
            Start your 14-day free trial today. See how AI can streamline your insurance brokerage.
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
      <MarketingFooter />
    </>
  )
}