'use client'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'

export default function MobileDemo() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} body{font-family:'DM Sans',sans-serif;background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} .serif{font-family:'DM Serif Display',serif;} .tap-btn{transition:transform 0.15s,opacity 0.15s;} .tap-btn:active{transform:scale(0.97);opacity:0.85;}`}</style>
      <MobileNav activePage="demo" />

      <section style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#bf5af2', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>Live demo</div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 14 }}>
          See DealFlow AI<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>live in 20 minutes</span>
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6 }}>Book a personal walkthrough with our team. We'll show you everything live.</p>
      </section>

      {/* What you'll see */}
      <section style={{ padding: '0 20px 32px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1f', marginBottom: 14 }}>What we'll cover:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { icon: '🎙', text: 'Live transcription in Arabic and English' },
            { icon: '🤖', text: 'Real-time AI coaching and objection handling' },
            { icon: '📊', text: 'Deal health scoring and buying signal detection' },
            { icon: '💬', text: 'Auto-generated WhatsApp and email follow-ups' },
            { icon: '👥', text: 'Team management and agent controls' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 16, background: '#f5f5f7' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: 14, color: '#1d1d1f', fontWeight: 500 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Calendly placeholder */}
      <section style={{ padding: '0 20px 40px' }}>
        <div style={{ borderRadius: 24, border: '1px solid rgba(0,0,0,0.08)', padding: '32px 20px', textAlign: 'center', background: '#f5f5f7' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📅</div>
          <div style={{ fontSize: 17, fontWeight: 600, color: '#1d1d1f', marginBottom: 8 }}>Book a 20-minute demo</div>
          <div style={{ fontSize: 14, color: '#6e6e73', marginBottom: 24 }}>Pick a time that works for you. Available Sunday–Thursday, 9AM–6PM GST.</div>
          <button className="tap-btn" onClick={() => window.open('mailto:hello@dealflow-ai.com?subject=Demo Request', '_blank')}
            style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', marginBottom: 12 }}>
            Request a Demo →
          </button>
          <button className="tap-btn" onClick={() => window.open('https://wa.me/971500000000?text=Hi, I would like to book a DealFlow AI demo', '_blank')}
            style={{ width: '100%', height: 52, borderRadius: 26, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 16, fontWeight: 500, fontFamily: 'inherit' }}>
            WhatsApp us instead
          </button>
        </div>
      </section>

      {/* Or try yourself */}
      <section style={{ padding: '0 20px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 14, color: '#6e6e73', marginBottom: 12 }}>Prefer to explore yourself?</div>
        <button className="tap-btn" onClick={() => window.location.href = '/login'}
          style={{ height: 48, padding: '0 28px', borderRadius: 24, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 15, fontWeight: 500, fontFamily: 'inherit' }}>
          Start 14-day free trial →
        </button>
      </section>

      <MobileFooter />
    </>
  )
}