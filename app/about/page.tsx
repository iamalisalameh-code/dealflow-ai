'use client'
import { useState, useEffect } from 'react'

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const stats = [
    { value: '1M+', label: 'Minutes transcribed', color: '#0071e3' },
    { value: '91%', label: 'Arabic accuracy', color: '#34c759' },
    { value: '14', label: 'Countries supported', color: '#bf5af2' },
  ]

  const values = [
    {
      title: 'Built for MENA first',
      desc: 'We didn\'t just translate an English app. DealFlow AI was built from the ground up to understand Gulf Arabic, Egyptian, and Modern Standard Arabic natively.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
      color: '#0071e3'
    },
    {
      title: 'Speed wins deals',
      desc: 'Sales is about momentum. We engineer everything for speed—from real-time, zero-latency transcription to follow-up emails drafted the second you hang up.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff9f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      color: '#ff9f0a'
    },
    {
      title: 'Absolute privacy',
      desc: 'Your deal data is yours. We use enterprise-grade encryption, strict role-based access, and we never train our base AI models on your private conversations.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      color: '#34c759'
    },
    {
      title: 'Accuracy over everything',
      desc: 'A transcribed call is useless if it\'s full of errors. We utilize the highest-tier cloud models to ensure every objection and buying signal is captured perfectly.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#bf5af2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
      color: '#bf5af2'
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
        
        .nav-link { font-size: 14px; font-weight: 500; color: #6e6e73; cursor: pointer; transition: color 0.2s; }
        .nav-link:hover { color: #1d1d1f; }
        
        .value-card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 24px; padding: 32px; transition: transform 0.3s, box-shadow 0.3s; }
        .value-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
        
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
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
        <div className="mesh" style={{ top: '-10%', left: '15%', width: '35%', height: '60%', background: '#0071e3', opacity: 0.05 }} />
        <div className="mesh" style={{ top: '0%', right: '15%', width: '30%', height: '50%', background: '#bf5af2', opacity: 0.05 }} />
        
        <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Our Story</div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24 }}>
          Built by salespeople,<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>for salespeople</span>
        </h1>
        <p className="fade-up-2" style={{ fontSize: 19, color: '#6e6e73', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
          We built DealFlow AI because we were tired of losing deals to bad notes, forgotten follow-ups, and a lack of tools that actually understood Arabic.
        </p>
      </section>

      {/* THE PROBLEM & MISSION */}
      <section style={{ padding: '80px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          
          <div>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,69,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff453a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 16 }}>The Problem</h2>
            <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.7, marginBottom: 24 }}>
              Before DealFlow AI, our sales calls were chaotic. We tried taking manual notes while speaking to clients, which ruined the flow of conversation. We missed critical buying signals. We forgot to log details in the CRM. 
            </p>
            <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.7 }}>
              Worst of all, existing AI tools on the market were entirely English-focused. When a prospect from Dubai or Riyadh switched to Gulf Arabic, the transcripts turned into gibberish. We realized the MENA region was being left behind in the AI sales revolution.
            </p>
          </div>

          <div style={{ background: '#f5f5f7', borderRadius: 32, padding: 48, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 32, right: 32, color: 'rgba(0,0,0,0.05)' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>
            <h2 className="serif" style={{ fontSize: 32, letterSpacing: '-1px', marginBottom: 24, position: 'relative', zIndex: 1 }}>The Mission</h2>
            <p style={{ fontSize: 18, color: '#1d1d1f', lineHeight: 1.6, fontWeight: 500, position: 'relative', zIndex: 1 }}>
              "To empower every sales professional in the MENA region with revenue intelligence that actually understands their language, their culture, and their workflow."
            </p>
          </div>

        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section style={{ padding: '100px 48px', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 48 }}>By the numbers</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ padding: '40px 24px', background: '#fff', borderRadius: 28, border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 56, fontWeight: 700, color: stat.color, letterSpacing: '-2px', lineHeight: 1, marginBottom: 12, fontFamily: 'DM Serif Display, Georgia, serif' }}>{stat.value}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: '120px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Our Core <span style={{ fontStyle: 'italic' }}>Values</span>
            </h2>
            <p style={{ fontSize: 18, color: '#6e6e73', maxWidth: 500, margin: '16px auto 0' }}>
              The principles that guide how we build DealFlow AI every single day.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <div style={{ width: 48, height: 48, borderRadius: 14, background: v.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1d1d1f', marginBottom: 12, letterSpacing: '-0.3px' }}>{v.title}</h3>
                <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM (Placeholder for Founders) */}
      <section style={{ padding: '0 48px 120px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ padding: 48, background: '#1d1d1f', borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>The Team</div>
              <h2 className="serif" style={{ fontSize: 40, color: '#fff', letterSpacing: '-1px', marginBottom: 16 }}>Meet the creators</h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 400, lineHeight: 1.6 }}>
                We are a dedicated team of engineers, sales veterans, and AI researchers based in the UAE, committed to building the ultimate revenue platform.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: 20 }}>
              {/* Founder Avatar Placeholder */}
              <div style={{ width: 200, padding: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #0071e3, #bf5af2)', margin: '0 auto 16px' }} />
                <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Founding Team</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>DealFlow AI</div>
              </div>
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
            Ready to close <br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>more deals?</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 40, lineHeight: 1.6 }}>
            Join the fastest-growing sales teams in the MENA region using DealFlow AI.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => window.location.href = '/login'}
              style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600 }}>
              Get Started Free →
            </button>
            <button onClick={() => window.location.href = '/contact'}
              style={{ height: 52, padding: '0 32px', borderRadius: 26, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 16, fontWeight: 500 }}>
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
          {[['Landing', '/'], ['About Us', '/about'], ['Contact', '/contact'], ['Privacy', '/privacy']].map(([label, href]) => (
            <span key={label} onClick={() => window.location.href = href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>{label}</span>
          ))}
        </div>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© 2026 DealFlow AI</span>
      </footer>
    </>
  )
}