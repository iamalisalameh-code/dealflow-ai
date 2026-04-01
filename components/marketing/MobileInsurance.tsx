'use client'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'

export default function MobileInsurance() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} body{font-family:'DM Sans',sans-serif;background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} .serif{font-family:'DM Serif Display',serif;} .tap-btn{transition:transform 0.15s;} .tap-btn:active{transform:scale(0.97);}`}</style>
      <MobileNav />
      <section style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#ff453a', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>Insurance</div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 14 }}>
          Explain complex<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>products simply</span>
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6, marginBottom: 28 }}>AI helps insurance brokers handle objections, explain coverage clearly, and close Gulf clients in Arabic.</p>
        <button className="tap-btn" onClick={() => window.location.href = '/login'}
          style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>Start Free Trial →</button>
      </section>
      {[
        { title: 'Objection handling', desc: 'AI suggests counter-responses when clients say "it\'s too expensive" or "I\'ll think about it".' },
        { title: 'Arabic client conversations', desc: 'Gulf clients often prefer Arabic. DealFlow transcribes and coaches in both languages automatically.' },
        { title: 'Call records for compliance', desc: 'Transcripts serve as call records. Useful for regulatory compliance in UAE insurance.' },
        { title: 'Instant follow-ups', desc: 'Generate a personalized policy summary and follow-up message right after the call.' },
      ].map((item, i) => (
        <div key={i} style={{ margin: '0 20px 12px', padding: '18px 20px', borderRadius: 20, background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f', marginBottom: 6 }}>{item.title}</div>
          <div style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.5 }}>{item.desc}</div>
        </div>
      ))}
      <div style={{ padding: '40px 20px 48px', background: '#1d1d1f', textAlign: 'center', marginTop: 40 }}>
        <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, color: '#fff', letterSpacing: '-1px', marginBottom: 20 }}>Try free for <span style={{ fontStyle: 'italic', color: '#ff453a' }}>14 days</span></h2>
        <button className="tap-btn" onClick={() => window.location.href = '/login'}
          style={{ width: '100%', maxWidth: 300, height: 52, borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>Get Started →</button>
      </div>
      <MobileFooter />
    </>
  )
}