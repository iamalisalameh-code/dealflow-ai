'use client'

export default function MarketingFooter() {
  const footerLinks = [
    {
      group: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'How it works', href: '/how-it-works' },
        { label: 'Pricing', href: '/pricing' },
        { label: "What's New", href: '/changelog' },
      ]
    },
    {
      group: 'Use Cases',
      links: [
        { label: 'Real Estate', href: '/use-cases/real-estate' },
        { label: 'Insurance', href: '/use-cases/insurance' },
        { label: 'SaaS Sales', href: '/use-cases/saas' },
        { label: 'Book a Demo', href: '/demo' },
      ]
    },
    {
      group: 'Compare',
      links: [
        { label: 'vs Gong', href: '/compare/gong' },
        { label: 'vs Chorus', href: '/compare/chorus' },
        { label: 'vs Manual Notes', href: '/compare/manual' },
      ]
    },
    {
      group: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ]
    },
  ]

  return (
    <footer style={{ background: '#1d1d1f', color: '#fff' }}>

      {/* Main footer */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 32px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, cursor: 'pointer' }}
              onClick={() => window.location.href = '/landing'}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#fff', letterSpacing: '-0.3px' }}>DealFlow AI</span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 24, maxWidth: 240 }}>
              The AI-powered sales call assistant built for MENA. English and Arabic, live coaching, smart follow-ups.
            </p>

            {/* Language badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>🇦🇪 Arabic</span>
              <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>🇬🇧 English</span>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(group => (
            <div key={group.group}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
                {group.group}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.links.map(link => (
                  <span key={link.href} onClick={() => window.location.href = link.href}
                    style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.85)'}
                    onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.5)'}>
                    {link.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            © 2026 DealFlow AI. All rights reserved. · Dubai, UAE
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span onClick={() => window.location.href = '/privacy'}
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.6)'}
              onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.3)'}>
              Privacy
            </span>
            <span onClick={() => window.location.href = '/terms'}
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.6)'}
              onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.3)'}>
              Terms
            </span>
            <span onClick={() => window.location.href = '/contact'}
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.6)'}
              onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.3)'}>
              Contact
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}