'use client'
import { useState, useEffect } from 'react'

export default function TermsPage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('acceptance')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      const sections = ['acceptance', 'service-description', 'accounts', 'payment', 'ip', 'liability']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= (el.offsetTop - 200)) {
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

  const tocLinks = [
    { id: 'acceptance', label: '1. Acceptance of Terms' },
    { id: 'service-description', label: '2. Description of Service' },
    { id: 'accounts', label: '3. User Accounts' },
    { id: 'payment', label: '4. Payment & Subscriptions' },
    { id: 'ip', label: '5. Intellectual Property' },
    { id: 'liability', label: '6. Limitation of Liability' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #fff; color: #1d1d1f; font-family: 'DM Sans', -apple-system, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        button { cursor: pointer; font-family: inherit; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        
        .nav-link { font-size: 14px; font-weight: 500; color: #6e6e73; cursor: pointer; transition: color 0.2s; }
        .nav-link:hover { color: #1d1d1f; }
        
        /* Fixed responsive display class to avoid TS duplicate property errors */
        .desktop-nav { display: flex; align-items: center; gap: 32px; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .sidebar-toc { display: none !important; }
        }
        
        .policy-section { padding-top: 40px; padding-bottom: 40px; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .policy-section:last-child { border-bottom: none; }
        .policy-section h2 { font-size: 24px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 20px; color: #1d1d1f; }
        .policy-section p { font-size: 16px; color: #6e6e73; lineHeight: 1.7; margin-bottom: 16px; }
        .policy-section ul { padding-left: 20px; margin-bottom: 16px; }
        .policy-section li { font-size: 16px; color: #6e6e73; lineHeight: 1.7; margin-bottom: 8px; }
        .policy-section strong { color: #1d1d1f; font-weight: 600; }
        
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
      <section style={{ paddingTop: 160, paddingBottom: 60, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative', overflow: 'hidden', background: '#f5f5f7', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Legal & Compliance</div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16 }}>
          Terms of Service
        </h1>
        <p className="fade-up-2" style={{ fontSize: 16, color: '#6e6e73' }}>
          Last updated: March 30, 2026
        </p>
      </section>

      {/* MAIN CONTENT WITH STICKY SIDEBAR */}
      <section style={{ display: 'flex', maxWidth: 1000, margin: '0 auto', padding: '60px 48px 120px', gap: 80, position: 'relative' }}>
        
        {/* Sticky Sidebar */}
        <div className="sidebar-toc" style={{ width: 240, flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: 120, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1d1d1f', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Contents</div>
            {tocLinks.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 8, border: 'none', background: activeSection === link.id ? 'rgba(0,0,0,0.04)' : 'transparent', color: activeSection === link.id ? '#1d1d1f' : '#6e6e73', fontSize: 14, fontWeight: activeSection === link.id ? 600 : 500, transition: 'all 0.2s' }}>
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, maxWidth: 680 }}>
          
          <div style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.7, marginBottom: 40 }}>
            Welcome to DealFlow AI. By accessing or using our website, platform, and related services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
          </div>

          <div id="acceptance" className="policy-section" style={{ paddingTop: 0 }}>
            <h2>1. Acceptance of Terms</h2>
            <p>These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and DealFlow AI ("we," "us" or "our"). You agree that by accessing the site and platform, you have read, understood, and agreed to be bound by all of these Terms of Service.</p>
          </div>

          <div id="service-description" className="policy-section">
            <h2>2. Description of Service</h2>
            <p>DealFlow AI provides an AI-powered revenue intelligence and sales coaching platform. The service includes, but is not limited to:</p>
            <ul>
              <li>Real-time audio transcription in multiple languages, including English and Arabic.</li>
              <li>AI-generated deal insights, objection handling, and talk-ratio analysis.</li>
              <li>Automated generation of follow-up materials (emails, WhatsApp messages).</li>
              <li>Integrations with third-party conferencing tools (e.g., Google Meet, Zoom) and CRMs.</li>
            </ul>
            <p>We reserve the right to modify, suspend, or discontinue any part of the service at any time with or without notice to you.</p>
          </div>

          <div id="accounts" className="policy-section">
            <h2>3. User Accounts & Responsibilities</h2>
            <p>To use DealFlow AI, you must register for an account. You agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information during the registration process.</li>
              <li>Maintain the security and confidentiality of your password and account credentials.</li>
              <li>Accept responsibility for all activities that occur under your account.</li>
              <li>Ensure that your use of the platform complies with all local, state, national, and international laws, particularly regarding the recording of calls and electronic communications (e.g., obtaining consent to record where required by law).</li>
            </ul>
          </div>

          <div id="payment" className="policy-section">
            <h2>4. Payment & Subscriptions</h2>
            <p>DealFlow AI is offered on a subscription basis. By selecting a subscription plan, you agree to pay the applicable fees.</p>
            <ul>
              <li><strong>Billing:</strong> Subscriptions are billed in advance on a monthly or annual basis, depending on your selection.</li>
              <li><strong>Free Trial:</strong> We offer a 14-day free trial. If you do not subscribe to a paid plan before the trial ends, your access will be suspended.</li>
              <li><strong>Cancellations:</strong> You may cancel your subscription at any time. Cancellations take effect at the end of the current billing cycle. We do not provide prorated refunds for partial months.</li>
            </ul>
          </div>

          <div id="ip" className="policy-section">
            <h2>5. Intellectual Property</h2>
            <p>The Service and its original content, features, functionality, and design elements are and will remain the exclusive property of DealFlow AI. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.</p>
            <p><strong>Your Data:</strong> You retain all rights to the audio, transcripts, and customer data you process through our platform. DealFlow AI claims no ownership over your sales data.</p>
          </div>

          <div id="liability" className="policy-section">
            <h2>6. Limitation of Liability</h2>
            <p>In no event shall DealFlow AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
            <ul>
              <li>Your access to or use of or inability to access or use the Service.</li>
              <li>Any conduct or content of any third party on the Service.</li>
              <li>Any unauthorized access, use or alteration of your transmissions or content.</li>
            </ul>
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
          {[['Landing', '/'], ['About Us', '/about'], ['Pricing', '/pricing'], ['Privacy Policy', '/privacy']].map(([label, href]) => (
            <span key={label} onClick={() => window.location.href = href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>{label}</span>
          ))}
        </div>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© 2026 DealFlow AI</span>
      </footer>
    </>
  )
}