'use client'
import { useState, useEffect } from 'react'

export default function RealEstateUseCasePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const benefits = [
    {
      title: 'Capture every property requirement',
      desc: 'Stop taking manual notes during 45-minute discovery calls. DealFlow captures exact budget, preferred areas (e.g., Downtown vs Marina), and timeline automatically.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      )
    },
    {
      title: 'Flawless Arabic Support',
      desc: 'Gulf clients prefer negotiating in Arabic. DealFlow natively understands Khaleeji dialects, capturing nuances that English-only AI tools miss completely.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      )
    },
    {
      title: 'Instant WhatsApp Follow-ups',
      desc: 'The second you hang up, get an AI-drafted WhatsApp message summarizing the specific payment plan and ROI metrics discussed, ready to send with the project brochure.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
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
        
        .nav-link { font-size: 14px; font-weight: 500; color: #6e6e73; cursor: pointer; transition: color 0.2s; }
        .nav-link:hover { color: #1d1d1f; }
        
        .benefit-card { padding: 32px; border-radius: 24px; background: #f5f5f7; border: 1px solid rgba(0,0,0,0.04); transition: transform 0.3s; }
        .benefit-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        
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
          {[['How it works', '/how-it-works'], ['Features', '/features'], ['Pricing', '/pricing']].map(([label, href]) => (
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
        <div className="mesh" style={{ top: '0%', left: '10%', width: '35%', height: '60%', background: '#0071e3', opacity: 0.05 }} />
        <div className="mesh" style={{ top: '10%', right: '10%', width: '30%', height: '50%', background: '#bf5af2', opacity: 0.05 }} />
        
        <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Real Estate Sales</div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24, maxWidth: 900, margin: '0 auto 24px' }}>
          Close more property deals<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>with AI coaching.</span>
        </h1>
        <p className="fade-up-2" style={{ fontSize: 19, color: '#6e6e73', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Designed specifically for the UAE and MENA property markets. DealFlow AI handles the admin, tracks buying signals, and gives you real-time objection handling for off-plan and secondary market deals.
        </p>
        
        <div className="fade-up-2" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button onClick={() => window.location.href = '/login'} style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600 }}>
            Start Free Trial
          </button>
          <button onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })} style={{ height: 52, padding: '0 32px', borderRadius: 26, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 16, fontWeight: 600 }}>
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

      {/* OBJECTION HANDLING MOCKUP */}
      <section style={{ padding: '100px 48px', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          
          <div>
            <h2 className="serif" style={{ fontSize: 40, letterSpacing: '-1px', marginBottom: 20 }}>Overcome tough objections instantly</h2>
            <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.6, marginBottom: 24 }}>
              When a client hesitates on price, handover delays, or SPA terms, DealFlow's AI Deal Coach instantly surfaces the perfect counter-argument based on top-performing developer pitches (e.g., Emaar, Sobha, Aldar).
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Off-plan vs Secondary market comparisons', 'Handling high service charge objections', 'Explaining 70/30 or post-handover payment plans'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: '#1d1d1f', fontWeight: 500 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,113,227,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0071e3' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: '#1d1d1f', borderRadius: 24, padding: 32, boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}>
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#ff453a', letterSpacing: '0.05em', marginBottom: 8 }}>OBJECTION DETECTED</div>
              <div style={{ fontSize: 18, color: '#fff', fontWeight: 500, lineHeight: 1.5 }}>
                "The secondary market properties in Marina are cheaper than this off-plan project. Why should I pay a premium?"
              </div>
            </div>
            
            <div style={{ background: 'rgba(52,199,89,0.1)', border: '1px solid rgba(52,199,89,0.2)', borderRadius: 16, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#34c759' }}>AI COACHING TIP</span>
              </div>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                Pivot to <strong style={{ color: '#fff' }}>capital appreciation</strong> and <strong style={{ color: '#fff' }}>payment ease</strong>: "You're right, but with this off-plan unit, you get a 3-year post-handover payment plan and a DLD fee waiver. That saves you 4% upfront, and the capital appreciation historically yields 15% before handover."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ARABIC SUPPORT / FOLLOW UP */}
      <section style={{ padding: '100px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          
          <div style={{ background: '#f5f5f7', borderRadius: 24, padding: 32, border: '1px solid rgba(0,0,0,0.06)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f' }}>Auto-Generated WhatsApp</div>
                  <div style={{ fontSize: 13, color: '#6e6e73' }}>Sent to Tariq Al-Suwaidi</div>
                </div>
             </div>
             
             <div style={{ background: '#fff', padding: 20, borderRadius: '0 16px 16px 16px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <p style={{ fontSize: 14, color: '#1d1d1f', lineHeight: 1.6, direction: 'rtl', fontFamily: 'sans-serif' }}>
                  مرحباً أستاذ طارق، سعدت بالحديث معك اليوم. بناءً على طلبك، أرفق لك تفاصيل مشروع داون تاون مع خطة الدفع 70/30. متى يناسبك نحدد موعد لزيارة مركز المبيعات الأسبوع القادم؟
                </p>
             </div>
          </div>

          <div style={{ order: -1, '@media(min-width: 900px)': { order: 0 } } as any}>
            <h2 className="serif" style={{ fontSize: 40, letterSpacing: '-1px', marginBottom: 20 }}>Draft follow-ups in Arabic instantly</h2>
            <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.6, marginBottom: 24 }}>
              Say goodbye to manual translation or typing out long messages after every call. DealFlow AI understands your Arabic conversations perfectly and drafts context-aware WhatsApp and Email follow-ups in seconds.
            </p>
            <button onClick={() => window.location.href = '/features'} style={{ background: 'none', border: 'none', color: '#0071e3', fontSize: 15, fontWeight: 600 }}>Explore all features →</button>
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
            "DealFlow has completely changed how our agency operates. Agents no longer scramble for notes on property specs or ROI metrics. The AI catches buying signals we missed, and the Arabic transcription is flawlessly accurate."
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#0071e3', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>SO</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Sarah Othman</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Sales Director, Top UAE Developer</div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section id="demo" style={{ padding: '120px 48px', background: '#f5f5f7', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, color: '#1d1d1f', marginBottom: 20 }}>
            Ready to scale your <br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>real estate sales?</span>
          </h2>
          <p style={{ fontSize: 18, color: '#6e6e73', marginBottom: 40, lineHeight: 1.6 }}>
            Start your 14-day free trial today. No credit card required. See exactly how AI can help you close more property deals.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => window.location.href = '/login'}
              style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600 }}>
              Get Started Free →
            </button>
            <button onClick={() => window.location.href = '/contact'}
              style={{ height: 52, padding: '0 32px', borderRadius: 26, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 16, fontWeight: 500 }}>
              Contact Sales
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
          {[['Landing', '/'], ['Pricing', '/pricing'], ['Privacy', '/privacy'], ['Contact', '/contact']].map(([label, href]) => (
            <span key={label} onClick={() => window.location.href = href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>{label}</span>
          ))}
        </div>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© 2026 DealFlow AI</span>
      </footer>
    </>
  )
}