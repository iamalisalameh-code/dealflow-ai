'use client'
import { useState, useEffect } from 'react'

export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false)
  
  // Form States
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: 16,
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
        body { background: #f5f5f7; color: #1d1d1f; font-family: 'DM Sans', -apple-system, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        button { cursor: pointer; font-family: inherit; }
        input:focus, textarea:focus, select:focus { background: #fff !important; border-color: #0071e3 !important; box-shadow: 0 0 0 4px rgba(0,113,227,0.1) !important; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        
        .nav-link { font-size: 14px; font-weight: 500; color: #6e6e73; cursor: pointer; transition: color 0.2s; }
        .nav-link:hover { color: #1d1d1f; }
        
        .nav-links { display: none; }
        @media (min-width: 768px) {
          .nav-links { display: flex !important; }
        }
        
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
        
        /* Grid adjustments for mobile */
        .contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 64px; }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; gap: 48px; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 64, background: scrolled ? 'rgba(245,245,247,0.85)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px' }}>
        <div onClick={() => window.location.href = '/'} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#1d1d1f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px' }}>DealFlow AI</span>
        </div>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {[['How it works', '/how-it-works'], ['Features', '/features'], ['Pricing', '/pricing']].map(([label, href]) => (
            <span key={label} className="nav-link" onClick={() => window.location.href = href}>{label}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => window.location.href = '/login'} style={{ height: 36, padding: '0 18px', borderRadius: 18, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 14, fontWeight: 500 }}>Sign in</button>
          <button onClick={() => window.location.href = '/login'} style={{ height: 36, padding: '0 18px', borderRadius: 18, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 14, fontWeight: 600 }}>Get Started →</button>
        </div>
      </nav>

      {/* BACKGROUND MESHES */}
      <div className="mesh" style={{ top: '10%', left: '-10%', width: '40vw', height: '40vw', background: '#0071e3', opacity: 0.04 }} />
      <div className="mesh" style={{ bottom: '20%', right: '-10%', width: '35vw', height: '35vw', background: '#bf5af2', opacity: 0.04 }} />

      {/* CONTACT SECTION */}
      <section style={{ minHeight: '100vh', paddingTop: 140, paddingBottom: 100, paddingLeft: 48, paddingRight: 48, display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div className="contact-grid" style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          
          {/* LEFT: INFO */}
          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Contact Sales</div>
            <h1 className="serif" style={{ fontSize: 'clamp(44px, 5vw, 64px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24 }}>
              Let's build your <br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>revenue engine.</span>
            </h1>
            <p style={{ fontSize: 18, color: '#6e6e73', lineHeight: 1.6, marginBottom: 48, maxWidth: 440 }}>
              Whether you need custom pricing for a large team, a live demo, or have questions about our Arabic AI models—we're here to help.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              
              {/* Email Block */}
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', marginBottom: 4 }}>Chat to Sales</h3>
                  <p style={{ fontSize: 15, color: '#6e6e73', marginBottom: 8 }}>Speak to our friendly team.</p>
                  <a href="mailto:sales@dealflow-ai.com" style={{ fontSize: 15, fontWeight: 600, color: '#0071e3', textDecoration: 'none' }}>sales@dealflow-ai.com</a>
                </div>
              </div>

              {/* Support Block */}
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', marginBottom: 4 }}>Help & Support</h3>
                  <p style={{ fontSize: 15, color: '#6e6e73', marginBottom: 8 }}>We're here to help with any technical issues.</p>
                  <a href="mailto:support@dealflow-ai.com" style={{ fontSize: 15, fontWeight: 600, color: '#0071e3', textDecoration: 'none' }}>support@dealflow-ai.com</a>
                </div>
              </div>

              {/* Office Block */}
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', marginBottom: 4 }}>HQ Office</h3>
                  <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.5 }}>
                    Jumeirah Lakes Towers (JLT)<br />
                    Dubai, United Arab Emirates
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="fade-up-1">
            <div style={{ background: '#fff', borderRadius: 32, padding: 40, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 24px 80px rgba(0,0,0,0.05)' }}>
              
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(52,199,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 600, color: '#1d1d1f', marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6 }}>
                    Thanks for reaching out. One of our sales specialists will get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} style={{ marginTop: 32, height: 44, padding: '0 24px', borderRadius: 22, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 14, fontWeight: 600 }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input type="text" required placeholder="Ahmed" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Work Email</label>
                      <input type="email" required placeholder="ahmed@company.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Company Name</label>
                    <input type="text" required placeholder="Emaar Properties" value={company} onChange={e => setCompany(e.target.value)} style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>Sales Team Size</label>
                    <div style={{ position: 'relative' }}>
                      <select required value={teamSize} onChange={e => setTeamSize(e.target.value)} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                        <option value="" disabled>Select team size...</option>
                        <option value="1-10">1 - 10 agents</option>
                        <option value="11-50">11 - 50 agents</option>
                        <option value="51-200">51 - 200 agents</option>
                        <option value="200+">200+ agents</option>
                      </select>
                      <svg style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6e6e73" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>How can we help?</label>
                    <textarea required placeholder="Tell us about your sales process and what you're looking to achieve with DealFlow AI..." value={message} onChange={e => setMessage(e.target.value)} style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }} />
                  </div>

                  <button type="submit" disabled={isSubmitting}
                    style={{ height: 52, borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 8, transition: 'background 0.2s', opacity: isSubmitting ? 0.8 : 1 }}>
                    {isSubmitting && <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  <p style={{ fontSize: 13, color: '#aeaeb2', textAlign: 'center', marginTop: 8 }}>
                    By submitting this form, you agree to our <a href="/privacy" style={{ color: '#6e6e73' }}>Privacy Policy</a>.
                  </p>
                </form>
              )}

            </div>
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
          {[['Landing', '/'], ['About Us', '/about'], ['Pricing', '/pricing'], ['Privacy', '/privacy']].map(([label, href]) => (
            <span key={label} onClick={() => window.location.href = href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>{label}</span>
          ))}
        </div>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© 2026 DealFlow AI</span>
      </footer>
    </>
  )
}