'use client'
import { useState, useEffect, useRef } from 'react'

export default function LandingPage() {
  const [billingAnnual, setBillingAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
      ),
      title: 'Live Transcription',
      desc: 'Real-time speech-to-text in English and Arabic. Every word captured instantly as you speak.',
      color: '#0071e3',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      title: 'AI Deal Coach',
      desc: 'Get real-time insights, objection handling tips, and deal health scores as the conversation unfolds.',
      color: '#34c759',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      title: 'Buying Signal Detection',
      desc: 'Never miss a signal. DealFlow AI flags purchase intent in real time so you can strike at the perfect moment.',
      color: '#ff9f0a',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      title: 'Smart Follow-ups',
      desc: 'Auto-generate personalized WhatsApp and email follow-ups the moment your call ends.',
      color: '#bf5af2',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Team Management',
      desc: 'Invite agents, set call limits, control features per agent, and track your whole team\'s performance.',
      color: '#ff453a',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="15" height="10" rx="2"/>
          <path d="M17 9l5-2v10l-5-2"/>
        </svg>
      ),
      title: 'Google Meet & Zoom',
      desc: 'Works with your existing meeting tools. Capture both sides of the conversation with one click.',
      color: '#0071e3',
    },
  ]

  const plans = [
    {
      name: 'Solo',
      desc: 'Perfect for individual sales agents',
      monthlyPrice: 49,
      annualPrice: 39,
      color: '#0071e3',
      features: [
        'Unlimited call recordings',
        'Live AI coaching',
        'Arabic + English support',
        'Smart follow-up generator',
        'Pre-call brief',
        'Call history & summaries',
        'Contact CRM',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Team',
      desc: 'For sales teams that want to win together',
      monthlyPrice: 99,
      annualPrice: 79,
      color: '#bf5af2',
      features: [
        'Everything in Solo',
        'Up to 10 agents',
        'Team performance dashboard',
        'Per-agent feature controls',
        'Call limit management',
        'Team call analytics',
        'Priority support',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      desc: 'Custom solutions for large organizations',
      monthlyPrice: null,
      annualPrice: null,
      color: '#ff9f0a',
      features: [
        'Everything in Team',
        'Unlimited agents',
        'Custom AI training',
        'Dedicated account manager',
        'SSO & advanced security',
        'API access',
        'Custom integrations',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  const testimonials = [
    {
      name: 'Mohammed Al-Rashid',
      role: 'Senior Real Estate Agent',
      company: 'Emaar Properties',
      text: 'DealFlow AI completely transformed how I handle calls. The Arabic transcription is incredibly accurate and the AI insights help me close deals I would have lost before.',
      avatar: 'MA',
      color: '#0071e3',
    },
    {
      name: 'Sarah Thompson',
      role: 'Sales Director',
      company: 'Tech Solutions MENA',
      text: 'Our team\'s close rate went up 34% in the first month. The buying signal detection is like having a sixth sense during calls.',
      avatar: 'ST',
      color: '#34c759',
    },
    {
      name: 'Khalid Al-Mansoori',
      role: 'Insurance Broker',
      company: 'Gulf Insurance Group',
      text: 'The pre-call brief feature alone is worth the subscription. I walk into every call fully prepared. Game changer.',
      avatar: 'KA',
      color: '#bf5af2',
    },
  ]

  const faqs = [
    {
      q: 'Does it work with Google Meet and Zoom?',
      a: 'Yes — DealFlow AI integrates directly with Google Meet, Zoom, and Microsoft Teams. Just select the tab when starting a call and we capture both sides of the conversation automatically.',
    },
    {
      q: 'How accurate is the Arabic transcription?',
      a: 'We use Google Cloud Speech-to-Text v2 with dedicated Arabic language models supporting Gulf Arabic, Egyptian Arabic, and Modern Standard Arabic. Accuracy is typically above 90%.',
    },
    {
      q: 'Is my call data secure?',
      a: 'All call data is encrypted in transit and at rest. We use Supabase with row-level security, meaning your data is completely isolated from other users. We never train our models on your data.',
    },
    {
      q: 'Can I try it before paying?',
      a: 'Yes — all plans come with a 14-day free trial. No credit card required. You get full access to all features during the trial.',
    },
    {
      q: 'How does team management work?',
      a: 'As a team admin, you can invite agents via email, set monthly call limits per agent, and enable or disable specific features (like Arabic mode or follow-up generator) for each team member.',
    },
    {
      q: 'What languages are supported?',
      a: 'Currently English and Arabic. The entire UI switches to RTL Arabic with one click. We\'re adding more languages soon based on demand.',
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        :root {
          --bg: #ffffff;
          --bg2: #f5f5f7;
          --text: #1d1d1f;
          --text2: #6e6e73;
          --text3: #aeaeb2;
          --border: rgba(0,0,0,0.08);
          --card: #ffffff;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .serif { font-family: 'DM Serif Display', Georgia, serif; }

        input:focus { outline: none; }
        button { cursor: pointer; font-family: inherit; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        .fade-up-3 { animation: fadeUp 0.7s ease 0.3s both; }
        .fade-up-4 { animation: fadeUp 0.7s ease 0.4s both; }

        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--text2);
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-link:hover { color: var(--text); }

        .feature-card {
          background: var(--bg2);
          border-radius: 24px;
          padding: 32px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }

        .plan-card {
          border-radius: 28px;
          padding: 36px;
          border: 1px solid var(--border);
          transition: transform 0.3s, box-shadow 0.3s;
          background: var(--card);
        }
        .plan-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.1);
        }

        .faq-item {
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }

        .gradient-text {
          background: linear-gradient(135deg, #1d1d1f 0%, #6e6e73 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34c759;
          animation: pulse 1.5s infinite;
        }

        .mesh {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 64,
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.3s',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#1d1d1f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px' }}>DealFlow AI</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <span className="nav-link" onClick={() => window.location.href = '/how-it-works'}>How it works</span>
          {['Features', 'Testimonials', 'FAQ'].map(item => (
  <span key={item} className="nav-link"
    onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}>
  {item}
  </span>
))}
<span className="nav-link" onClick={() => window.location.href = '/pricing'}>Pricing</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => window.location.href = '/login'}
            style={{ height: 36, padding: '0 18px', borderRadius: 18, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 14, fontWeight: 500 }}>
            Sign in
          </button>
          <button onClick={() => window.location.href = '/login'}
            style={{ height: 36, padding: '0 18px', borderRadius: 18, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 14, fontWeight: 600 }}>
            Get Started →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        
        {/* Mesh background */}
        <div className="mesh" style={{ top: '-20%', left: '-10%', width: '60%', height: '60%', background: '#0071e3', opacity: 0.07 }} />
        <div className="mesh" style={{ bottom: '-10%', right: '-10%', width: '50%', height: '50%', background: '#bf5af2', opacity: 0.06 }} />
        <div className="mesh" style={{ top: '30%', right: '20%', width: '30%', height: '30%', background: '#34c759', opacity: 0.05 }} />

        {/* Badge */}
        <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(0,113,227,0.08)', border: '1px solid rgba(0,113,227,0.15)', marginBottom: 32 }}>
          <div className="live-dot" />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#0071e3' }}>Now available in Arabic & English</span>
        </div>

        {/* Headline */}
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 24, maxWidth: 900 }}>
          Close more deals with<br />
          <span style={{ fontStyle: 'italic', color: '#0071e3' }}>AI that listens</span>
        </h1>

        <p className="fade-up-2" style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#6e6e73', lineHeight: 1.6, marginBottom: 48, maxWidth: 600 }}>
          DealFlow AI joins your sales calls and gives you real-time coaching, objection handling, and deal insights — in English and Arabic.
        </p>

        {/* CTA buttons */}
        <div className="fade-up-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 80 }}>
          <button onClick={() => window.location.href = '/login'}
            style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600, letterSpacing: '-0.2px' }}>
            Start Free Trial →
          </button>
          <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ height: 52, padding: '0 32px', borderRadius: 26, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 16, fontWeight: 500 }}>
            See how it works
          </button>
        </div>

        {/* App preview mockup */}
        <div className="fade-up-4" style={{ width: '100%', maxWidth: 1000, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 40px 120px rgba(0,0,0,0.12)', background: '#000', position: 'relative' }}>
          {/* Fake browser chrome */}
          <div style={{ background: '#1a1a1a', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff453a' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff9f0a' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#34c759' }} />
            <div style={{ flex: 1, margin: '0 20px', height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>dealflow-ai.com/dashboard</span>
            </div>
          </div>
          {/* Dashboard preview */}
          <div style={{ background: '#000', padding: 24, minHeight: 400, display: 'grid', gridTemplateColumns: '64px 1fr', gap: 16 }}>
            {/* Sidebar */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#1d1d1f', marginBottom: 8 }} />
              {['#0071e3', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)'].map((bg, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 10, background: bg }} />
              ))}
            </div>
            {/* Main content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Call card */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Live Call · Ahmed Al-Mansouri</div>
                  <div style={{ fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-1px' }}>Emirates Properties</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ fontSize: 36, fontWeight: 300, color: '#34c759', fontVariantNumeric: 'tabular-nums' }}>02:47</div>
                  <div style={{ height: 40, padding: '0 20px', borderRadius: 20, background: 'rgba(255,59,48,0.2)', border: '1px solid rgba(255,59,48,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#ff453a', fontWeight: 500 }}>End Call</div>
                </div>
              </div>
              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 16 }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>DEAL HEALTH</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#34c759' }}>87%</div>
                  <div style={{ fontSize: 11, color: '#34c759' }}>Strong Progress</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 16 }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>BUYING SIGNALS</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#ff9f0a' }}>3</div>
                  <div style={{ fontSize: 11, color: '#ff9f0a' }}>Detected</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 16 }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>COACHING</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#0071e3' }}>8.4</div>
                  <div style={{ fontSize: 11, color: '#0071e3' }}>Excellent</div>
                </div>
              </div>
              {/* Transcript preview */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Transcript</div>
                <div style={{ fontSize: 11, color: '#34c759', marginBottom: 4, fontWeight: 700 }}>AHMED</div>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>What's the payment plan for the 2-bedroom unit? Can we do quarterly instalments?</div>
                <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                  <div style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.2)', fontSize: 11, color: '#34c759' }}>⚡ Buying signal detected</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="fade-up-4" style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ fontSize: 14, color: '#6e6e73' }}>Trusted by sales teams across the UAE</div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Real Estate', 'SaaS', 'Insurance', 'Finance'].map(ind => (
              <span key={ind} style={{ fontSize: 13, fontWeight: 600, color: '#aeaeb2' }}>{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '120px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Everything you need</div>
            <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 20 }}>
              Your AI sales partner,<br /><span style={{ fontStyle: 'italic' }}>always listening</span>
            </h2>
            <p style={{ fontSize: 18, color: '#6e6e73', maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
              From the moment you dial to the follow-up message — DealFlow AI has you covered.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div style={{ width: 48, height: 48, borderRadius: 14, background: f.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, marginBottom: 20 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1d1d1f', marginBottom: 10, letterSpacing: '-0.3px' }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARABIC FEATURE HIGHLIGHT */}
      <section style={{ padding: '80px 48px', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#bf5af2', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Built for the region</div>
            <h2 className="serif" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 20 }}>
              نظام ذكاء اصطناعي<br />
              <span style={{ fontStyle: 'italic', color: '#bf5af2' }}>يفهم العربية</span>
            </h2>
            <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.7, marginBottom: 32 }}>
              Full Arabic language support with RTL interface, Gulf Arabic dialect recognition, and AI insights generated in Arabic. Built specifically for sales teams in the UAE and broader MENA region.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['Gulf Arabic dialect support', 'Full RTL interface', 'Arabic AI coaching & insights', 'Arabic WhatsApp follow-ups'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(191,90,242,0.12)', border: '1px solid rgba(191,90,242,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#bf5af2" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: 15, color: '#1d1d1f', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Arabic UI preview */}
          <div style={{ borderRadius: 28, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 24px 80px rgba(0,0,0,0.1)', background: '#000', direction: 'rtl' }}>
            <div style={{ background: '#111', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>DealFlow AI</span>
              <div style={{ padding: '4px 12px', borderRadius: 12, background: 'rgba(191,90,242,0.15)', border: '1px solid rgba(191,90,242,0.25)', fontSize: 11, fontWeight: 600, color: '#bf5af2' }}>🇬🇧 EN</div>
            </div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>النص المباشر</div>
                <div style={{ fontSize: 11, color: '#34c759', fontWeight: 700, marginBottom: 4 }}>علي سلامة</div>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>مرحبا، يعجبني الموقع بس أحتاج أعرف تفاصيل التمويل أكثر</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>إشارات الشراء</div>
                <div style={{ padding: '6px 12px', borderRadius: 10, background: 'rgba(48,209,88,0.08)', border: '1px solid rgba(48,209,88,0.2)', fontSize: 12, color: '#34c759', display: 'inline-block' }}>⚡ يعجبني الموقع</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>الاعتراضات المكتشفة</div>
                <div style={{ padding: '8px 12px', borderRadius: 10, background: 'rgba(255,69,58,0.06)', border: '1px solid rgba(255,69,58,0.15)', fontSize: 12, color: 'rgba(255,180,185,0.85)' }}>! يحتاج تفاصيل تمويل أكثر</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '120px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Pricing</div>
            <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 20 }}>
              Simple, transparent<br /><span style={{ fontStyle: 'italic' }}>pricing</span>
            </h2>
            <p style={{ fontSize: 18, color: '#6e6e73', marginBottom: 32 }}>14-day free trial. No credit card required.</p>

            {/* Billing toggle */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '6px', borderRadius: 24, background: '#f5f5f7' }}>
              <button onClick={() => setBillingAnnual(false)}
                style={{ height: 36, padding: '0 20px', borderRadius: 18, border: 'none', background: !billingAnnual ? '#fff' : 'transparent', color: '#1d1d1f', fontSize: 14, fontWeight: 500, boxShadow: !billingAnnual ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>
                Monthly
              </button>
              <button onClick={() => setBillingAnnual(true)}
                style={{ height: 36, padding: '0 20px', borderRadius: 18, border: 'none', background: billingAnnual ? '#fff' : 'transparent', color: '#1d1d1f', fontSize: 14, fontWeight: 500, boxShadow: billingAnnual ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}>
                Annual
                <span style={{ padding: '2px 8px', borderRadius: 8, background: 'rgba(52,199,89,0.12)', color: '#34c759', fontSize: 11, fontWeight: 700 }}>Save 20%</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
            {plans.map((plan, i) => (
              <div key={i} className="plan-card" style={{
                border: plan.popular ? `2px solid ${plan.color}` : '1px solid rgba(0,0,0,0.08)',
                position: 'relative',
              }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', padding: '4px 16px', borderRadius: 20, background: plan.color, color: '#fff', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
                    Most Popular
                  </div>
                )}
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: plan.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{plan.name}</div>
                  <div style={{ fontSize: 14, color: '#6e6e73', marginBottom: 24 }}>{plan.desc}</div>
                  {plan.monthlyPrice ? (
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 32 }}>
                      <span style={{ fontSize: 14, color: '#6e6e73' }}>$</span>
                      <span style={{ fontSize: 48, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2px', lineHeight: 1 }}>
                        {billingAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span style={{ fontSize: 14, color: '#6e6e73' }}>/mo</span>
                    </div>
                  ) : (
                    <div style={{ fontSize: 36, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', lineHeight: 1, marginBottom: 32 }}>Custom</div>
                  )}
                </div>

                <button onClick={() => window.location.href = '/login'}
                  style={{ width: '100%', height: 48, borderRadius: 24, border: plan.popular ? 'none' : '1px solid rgba(0,0,0,0.12)', background: plan.popular ? plan.color : 'transparent', color: plan.popular ? '#fff' : '#1d1d1f', fontSize: 15, fontWeight: 600, marginBottom: 28, transition: 'all 0.2s' }}>
                  {plan.cta}
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: plan.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <span style={{ fontSize: 14, color: '#1d1d1f' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: '120px 48px', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Testimonials</div>
            <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Loved by sales teams<br /><span style={{ fontStyle: 'italic' }}>across the region</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 24, padding: 32, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#ff9f0a" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#1d1d1f', lineHeight: 1.7, marginBottom: 24, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#6e6e73' }}>{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '120px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>FAQ</div>
            <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Common <span style={{ fontStyle: 'italic' }}>questions</span>
            </h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', textAlign: 'left', color: '#1d1d1f', fontSize: 17, fontWeight: 500, letterSpacing: '-0.2px' }}>
                  {faq.q}
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: 24, fontSize: 16, color: '#6e6e73', lineHeight: 1.7, animation: 'fadeIn 0.2s ease' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / WAITLIST */}
      <section style={{ padding: '120px 48px', background: '#1d1d1f', position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '-30%', left: '-10%', width: '50%', height: '80%', background: '#0071e3', opacity: 0.15 }} />
        <div className="mesh" style={{ bottom: '-30%', right: '-10%', width: '40%', height: '70%', background: '#bf5af2', opacity: 0.12 }} />

        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Get early access</div>
          <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, color: '#fff', marginBottom: 20 }}>
            Ready to close<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>more deals?</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 48, lineHeight: 1.6 }}>
            Join hundreds of sales professionals already using DealFlow AI to win more calls.
          </p>

          {waitlistSubmitted ? (
            <div style={{ padding: '20px 32px', borderRadius: 20, background: 'rgba(52,199,89,0.12)', border: '1px solid rgba(52,199,89,0.25)', fontSize: 16, color: '#34c759', fontWeight: 500 }}>
              ✓ You're on the list! We'll be in touch soon.
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={waitlistEmail}
                onChange={e => setWaitlistEmail(e.target.value)}
                style={{ flex: 1, height: 52, padding: '0 20px', borderRadius: 26, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 15, fontFamily: 'DM Sans, sans-serif' }}
              />
              <button
                onClick={() => { if (waitlistEmail) { setWaitlistSubmitted(true); window.location.href = '/login' } }}
                style={{ height: 52, padding: '0 24px', borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap' }}>
                Start Free →
              </button>
            </div>
          )}

          <p style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>14-day free trial · No credit card required</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '48px', background: '#1d1d1f', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>DealFlow AI</span>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {[['Pricing', '/pricing'], ['How it works', '/how-it-works'], ['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
  <span key={label} onClick={() => window.location.href = href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>{label}</span>
))}
          </div>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© 2026 DealFlow AI. All rights reserved.</span>
        </div>
      </footer>
    </>
  )
}