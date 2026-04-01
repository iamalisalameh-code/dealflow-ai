'use client'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'

const releases = [
  {
    version: 'v1.4', date: 'Mar 30, 2026', tag: 'New',
    tagColor: '#34c759', items: [
      { type: 'New', text: 'Google Cloud Speech-to-Text v2 integration for better Arabic accuracy' },
      { type: 'New', text: 'Mobile-first design across all marketing pages' },
      { type: 'Improved', text: 'Transcription chunk strategy — now sends 5s clips for faster updates' },
    ]
  },
  {
    version: 'v1.3', date: 'Mar 25, 2026', tag: 'Improved',
    tagColor: '#0071e3', items: [
      { type: 'New', text: 'Shared MarketingNav and MarketingFooter components' },
      { type: 'New', text: 'Pricing, How it works, and Features marketing pages' },
      { type: 'Fixed', text: 'Arabic transcription now uses nova-3 model with correct params' },
    ]
  },
  {
    version: 'v1.2', date: 'Mar 20, 2026', tag: 'New',
    tagColor: '#34c759', items: [
      { type: 'New', text: 'Admin panel with team management and agent invites' },
      { type: 'New', text: 'Settings page with 5 tabs: Profile, Sales Setup, Targets, Documents, Danger Zone' },
      { type: 'New', text: 'Join invite acceptance page at /join?token=xxx' },
      { type: 'Improved', text: 'SVG icons replace all emojis across the app' },
    ]
  },
  {
    version: 'v1.1', date: 'Mar 15, 2026', tag: 'Improved',
    tagColor: '#0071e3', items: [
      { type: 'New', text: 'Full Arabic RTL support across all app pages' },
      { type: 'New', text: 'Pre-call AI brief generation' },
      { type: 'New', text: 'WhatsApp and email follow-up generator' },
      { type: 'Fixed', text: 'WebM header fix for continuous transcription chunks' },
    ]
  },
  {
    version: 'v1.0', date: 'Mar 10, 2026', tag: 'Launch',
    tagColor: '#bf5af2', items: [
      { type: 'New', text: 'Initial launch of DealFlow AI' },
      { type: 'New', text: 'Live transcription with Deepgram' },
      { type: 'New', text: 'AI insights powered by Gemini 2.5 Flash' },
      { type: 'New', text: 'Contact CRM with deal stages' },
    ]
  },
]

const typeColor: Record<string, string> = { New: '#34c759', Improved: '#0071e3', Fixed: '#ff9f0a' }

export default function MobileChangelog() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} body{font-family:'DM Sans',sans-serif;background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} .serif{font-family:'DM Serif Display',serif;}`}</style>
      <MobileNav />

      <section style={{ padding: '40px 24px 32px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#ff9f0a', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>What's new</div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 12 }}>
          Product<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>Changelog</span>
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.5 }}>We ship every week. Here's what's new.</p>
      </section>

      <section style={{ padding: '0 20px 48px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {releases.map((release, i) => (
          <div key={i} style={{ borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            {/* Release header */}
            <div style={{ padding: '16px 20px', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#1d1d1f' }}>{release.version}</span>
                <span style={{ padding: '2px 10px', borderRadius: 10, background: release.tagColor + '15', color: release.tagColor, fontSize: 11, fontWeight: 700 }}>{release.tag}</span>
              </div>
              <span style={{ fontSize: 12, color: '#aeaeb2' }}>{release.date}</span>
            </div>
            {/* Items */}
            <div style={{ padding: '12px 20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {release.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 8, background: (typeColor[item.type] || '#888') + '12', color: typeColor[item.type] || '#888', fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{item.type}</span>
                  <span style={{ fontSize: 13, color: '#444', lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <MobileFooter />
    </>
  )
}