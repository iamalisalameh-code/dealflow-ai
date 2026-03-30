'use client'
import { useState, useEffect } from 'react'

export default function DemoPage() {
  const [scrolled, setScrolled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Form fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: 12,
    border: '1px solid rgba(0,0,0,0.1)',
    background: '#f5f5f7',
    color: '#1d1d1f',
    fontSize: 15,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#1d1d1f',
    marginBottom: 8,
    letterSpacing: '-0.2px'
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff; color: #1d1d1f; font-family: 'DM Sans', -apple-system, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        button { cursor: pointer; font-family: inherit; }
        input:focus { background: #fff !important; border-color: #0071e3 !important; box-shadow: 0 0 0 4px rgba(0,113,227,0.1) !important; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        
        .desktop-nav { display: flex; align-items: center; gap: 32px; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        
        .nav-link { font-size: 14px; font-weight: 500; color: #6e6e73; cursor: pointer; transition: color 0.2s; }
        .nav-link:hover { color: #1d1d1f; }
        
        .split-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; min-height: 100vh; padding: 120px 48px 60px; max-width: 1200px; margin: 0 auto; }
        @media (max-width: 900px) {
          .split-grid { grid-template-columns: 1fr; gap: 40px; padding-top: 140px; }
        }
        
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
        </div>
      </nav>

      {/* BACKGROUND MESH */}
      <div className="mesh" style={{ top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: '#0071e3', opacity: 0.05 }} />

      {/* SPLIT LAYOUT */}
      <section className="split-grid" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* LEFT: VALUE PROP */}
        <div className="fade-up">
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Live Demonstration</div>
          <h1 className="serif" style={{ fontSize: 'clamp(44px, 5vw, 64px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24 }}>
            See DealFlow AI <br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>in action.</span>
          </h1>
          <p style={{ fontSize: 18, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40, maxWidth: 460 }}>
            Book a personalized 30-minute walkthrough with our team to see how AI can transform your sales process and increase close rates.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
            {[
              { title: 'Live Arabic Transcription', desc: 'See how we handle Gulf & Egyptian dialects in real-time with 90%+ accuracy.' },
              { title: 'AI Objection Handling', desc: 'Watch the AI suggest counter-arguments the moment a prospect hesitates.' },
              { title: 'Automated Follow-ups', desc: 'Experience the magic of a WhatsApp drafted instantly after the call ends.' }
            ].map((feature, i) => (
              <div key={i} style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,113,227,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', marginBottom: 4 }}>{feature.title}</div>
                  <div style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.5 }}>{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 24, background: '#f5f5f7', borderRadius: 20, border: '1px solid rgba(0,0,0,0.04)', display: 'inline-flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ width: 40, height: 40, borderRadius: '50%', background: '#1d1d1f', border: '2px solid #f5f5f7', marginLeft: i > 1 ? -12 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 600 }}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f' }}>Join 50+ MENA sales teams</div>
              <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
                {[1,2,3,4,5].map(star => <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill="#ff9f0a" stroke="#ff9f0a"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: FORM / CALENDAR EMBED AREA */}
        <div className="fade-up-1">
          <div style={{ background: '#fff', borderRadius: 32, padding: 40, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 30px 60px rgba(0,0,0,0.08)' }}>
            
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(52,199,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="serif" style={{ fontSize: 32, color: '#1d1d1f', marginBottom: 12 }}>Request Received</h3>
                <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6, marginBottom: 32 }}>
                  Thank you! Our team will reach out to {email} shortly to schedule your personalized demo.
                </p>
                <button onClick={() => setSubmitted(false)} style={{ background: 'none', border: 'none', color: '#0071e3', fontSize: 15, fontWeight: 600 }}>
                  ← Back to form
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 32 }}>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: '#1d1d1f', marginBottom: 8, letterSpacing: '-0.5px' }}>Request a Demo</h3>
                  <p style={{ fontSize: 15, color: '#6e6e73' }}>Fill out the form below and we'll connect you with a product expert.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Work Email</label>
                    <input type="email" required placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>Company Name</label>
                    <input type="text" required value={company} onChange={e => setCompany(e.target.value)} style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>Phone Number (Optional)</label>
                    <input type="tel" placeholder="+971 50 123 4567" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
                  </div>

                  <button type="submit" disabled={isSubmitting}
                    style={{ height: 56, borderRadius: 28, border: 'none', background: '#0071e3', color: '#fff', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 12, transition: 'all 0.2s', opacity: isSubmitting ? 0.8 : 1, boxShadow: '0 8px 24px rgba(0,113,227,0.2)' }}>
                    {isSubmitting && <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />}
                    {isSubmitting ? 'Submitting...' : 'Request Demo'}
                  </button>

                  <p style={{ fontSize: 13, color: '#aeaeb2', textAlign: 'center', marginTop: 8 }}>
                    Prefer to book directly? <a href="mailto:sales@dealflow-ai.com" style={{ color: '#0071e3', textDecoration: 'none' }}>Email our sales team.</a>
                  </p>
                </form>
              </>
            )}

          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px 48px', background: '#1d1d1f', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
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