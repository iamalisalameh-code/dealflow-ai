'use client'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'

export default function MobileSaas() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} body{font-family:'DM Sans',sans-serif;background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} .serif{font-family:'DM Serif Display',serif;} .tap-btn{transition:transform 0.15s;} .tap-btn:active{transform:scale(0.97);}`}</style>
      <MobileNav />
      <section style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>SaaS Sales</div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 14 }}>
          Win more<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>SaaS demos</span><br />with AI
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6, marginBottom: 28 }}>AI coaching during discovery calls and demos. Track deal health across long multi-stakeholder cycles.</p>
        <button className="tap-btn" onClick={() => window.location.href = '/login'}
          style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>Start Free Trial →</button>
      </section>
      {[
        { title: 'Discovery call coaching', desc: 'AI suggests MEDDIC/BANT qualification questions in real time during discovery.' },
        { title: 'Demo objection handling', desc: '"Too expensive", "we\'re happy with our current tool" — AI has battle-tested responses ready.' },
        { title: 'Multi-stakeholder deal health', desc: 'Track deal health across multiple calls with different stakeholders in the same deal.' },
        { title: 'Instant follow-up', desc: 'Generate a demo recap and next steps email right after the call ends.' },
      ].map((item, i) => (
        <div key={i} style={{ margin: '0 20px 12px', padding: '18px 20px', borderRadius: 20, background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f', marginBottom: 6 }}>{item.title}</div>
          <div style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.5 }}>{item.desc}</div>
        </div>
      ))}
      <div style={{ padding: '40px 20px 48px', background: '#1d1d1f', textAlign: 'center', marginTop: 40 }}>
        <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, color: '#fff', letterSpacing: '-1px', marginBottom: 20 }}>Try free for <span style={{ fontStyle: 'italic', color: '#0071e3' }}>14 days</span></h2>
        <button className="tap-btn" onClick={() => window.location.href = '/login'}
          style={{ width: '100%', maxWidth: 300, height: 52, borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>Get Started →</button>
      </div>
      <MobileFooter />
    </>
  )
}