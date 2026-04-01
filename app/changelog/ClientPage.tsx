'use client'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import { useState, useEffect } from 'react'

export default function ChangelogClient() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const updates = [
    {
      version: 'v1.4.0',
      date: 'March 28, 2026',
      title: 'The Real Estate Power Update',
      changes: [
        { type: 'New', text: 'Auto-detection of Property Handover dates and SPA status.' },
        { type: 'Improved', text: 'Enhanced Khaleeji dialect accuracy for outdoor/mobile calls.' },
        { type: 'New', text: 'Direct WhatsApp integration for post-call summaries.' }
      ]
    },
    {
      version: 'v1.3.2',
      date: 'March 10, 2026',
      title: 'Performance & Speed',
      changes: [
        { type: 'Improved', text: 'Reduced live transcription latency by 40% using Gemini 2.5 Flash.' },
        { type: 'Fixed', text: 'Resolved a sync issue with HubSpot multi-line text fields.' },
        { type: 'Improved', text: 'New UI for the "Live Deal Coach" overlay.' }
      ]
    },
    {
      version: 'v1.2.0',
      date: 'February 15, 2026',
      title: 'Enterprise Multi-Agent Launch',
      changes: [
        { type: 'New', text: 'Team Management Dashboard: Manage up to 50 agents from one seat.' },
        { type: 'New', text: 'Call Scoping: Filter transcripts by "Residential" vs "Commercial" tags.' },
        { type: 'New', text: 'Single Sign-On (SSO) support for Enterprise plans.' }
      ]
    }
  ]

  const badgeColor = (type: string) => {
    switch (type) {
      case 'New': return { bg: 'rgba(0,113,227,0.1)', text: '#0071e3' };
      case 'Improved': return { bg: 'rgba(52,199,89,0.1)', text: '#34c759' };
      case 'Fixed': return { bg: 'rgba(255,159,10,0.1)', text: '#ff9f0a' };
      default: return { bg: '#f5f5f7', text: '#6e6e73' };
    }
  }

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
        
        
        
        
        .timeline-item { position: relative; padding-left: 48px; margin-bottom: 80px; }
        .timeline-item::before { content: ""; position: absolute; left: 7px; top: 0; bottom: -80px; width: 2px; background: rgba(0,0,0,0.06); }
        .timeline-item:last-child::before { display: none; }
        .timeline-dot { position: absolute; left: 0; top: 8px; width: 16px; height: 16px; border-radius: 50%; background: #0071e3; border: 4px solid #fff; box-shadow: 0 0 0 1px rgba(0,0,0,0.06); z-index: 1; }
        
        .change-tag { padding: 4px 10px; borderRadius: 8px; fontSize: 11px; fontWeight: 700; textTransform: uppercase; letterSpacing: 0.05em; margin-right: 12px; display: inline-block; vertical-align: middle; }

        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}</style>

      {/* NAV */}
      <MarketingNav activePage="changelog" />

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 80, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative' }}>
        <div className="mesh" style={{ top: '0%', left: '25%', width: '30%', height: '60%', background: '#0071e3', opacity: 0.04 }} />
        <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Product Updates</div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 24 }}>
          What's <span style={{ fontStyle: 'italic', color: '#0071e3' }}>new.</span>
        </h1>
        <p className="fade-up-2" style={{ fontSize: 18, color: '#6e6e73', maxWidth: 540, margin: '0 auto' }}>
          We ship new features every week to help you close deals faster. Here is a timeline of what we have been building.
        </p>
      </section>

      {/* TIMELINE SECTION */}
      <section style={{ padding: '40px 48px 120px', maxWidth: 800, margin: '0 auto' }}>
        <div className="fade-up-2">
          {updates.map((update, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', fontFamily: 'monospace' }}>{update.version}</span>
                <span style={{ fontSize: 13, color: '#aeaeb2', fontWeight: 500 }}>{update.date}</span>
              </div>
              <h2 className="serif" style={{ fontSize: 28, marginBottom: 24, color: '#1d1d1f' }}>{update.title}</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {update.changes.map((change, j) => {
                  const colors = badgeColor(change.type);
                  return (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <span className="change-tag" style={{ background: colors.bg, color: colors.text }}>{change.type}</span>
                      <span style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.5 }}>{change.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <MarketingFooter />
    </>
  )
}