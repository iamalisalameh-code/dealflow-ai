'use client'
import { useState, useEffect } from 'react'

interface Props {
  activePage?: string
}

export default function MobileNav({ activePage }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState<'en' | 'ar'>('en')

  useEffect(() => {
    const saved = localStorage.getItem('marketing_lang') as 'en' | 'ar'
    if (saved) setLang(saved)
  }, [])

  const toggleLang = () => {
    const next = lang === 'en' ? 'ar' : 'en'
    setLang(next)
    localStorage.setItem('marketing_lang', next)
    // Redirect to Arabic landing if switching to AR
    if (next === 'ar') window.location.href = '/ar'
    else window.location.href = '/landing'
  }

  const navLinks = [
    { label: lang === 'ar' ? 'الرئيسية' : 'Home', href: '/landing' },
    { label: lang === 'ar' ? 'كيف يعمل' : 'How it works', href: '/how-it-works' },
    { label: lang === 'ar' ? 'المميزات' : 'Features', href: '/features' },
    { label: lang === 'ar' ? 'الأسعار' : 'Pricing', href: '/pricing' },
    { label: lang === 'ar' ? 'من نحن' : 'About', href: '/about' },
    { label: lang === 'ar' ? 'تواصل معنا' : 'Contact', href: '/contact' },
    { label: lang === 'ar' ? 'المدونة' : 'Blog', href: '/blog' },
  ]

  return (
    <>
      <style>{`
        @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        .mobile-nav-overlay { animation: slideDown 0.25s ease; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>

      {/* Nav bar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: menuOpen ? '#fff' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '0 20px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        direction: lang === 'ar' ? 'rtl' : 'ltr',
        fontFamily: 'DM Sans, -apple-system, sans-serif',
      }}>
        {/* Logo */}
        <div onClick={() => window.location.href = '/landing'}
          style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: '#1d1d1f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px' }}>DealFlow AI</span>
        </div>

        {/* Right side: lang + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Language toggle */}
          <button onClick={toggleLang}
            style={{ height: 30, padding: '0 10px', borderRadius: 15, border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(0,0,0,0.03)', color: '#1d1d1f', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            {lang === 'en' ? 'AR' : 'EN'}
          </button>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)}
            style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: menuOpen ? '#f5f5f7' : 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4.5 }}>
            <div style={{ width: 18, height: 1.5, background: '#1d1d1f', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }} />
            <div style={{ width: 18, height: 1.5, background: '#1d1d1f', borderRadius: 2, transition: 'all 0.25s', opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 18, height: 1.5, background: '#1d1d1f', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Full screen menu overlay */}
      {menuOpen && (
        <div className="mobile-nav-overlay" style={{
          position: 'fixed', top: 56, left: 0, right: 0, bottom: 0, zIndex: 999,
          background: '#fff', overflowY: 'auto',
          direction: lang === 'ar' ? 'rtl' : 'ltr',
          fontFamily: 'DM Sans, -apple-system, sans-serif',
        }}>
          {/* Nav links */}
          <div style={{ padding: '8px 0' }}>
            {navLinks.map((link, i) => (
              <div key={i} onClick={() => { window.location.href = link.href; setMenuOpen(false) }}
                style={{ padding: '16px 24px', fontSize: 18, fontWeight: 500, color: activePage === link.href.replace('/', '') ? '#0071e3' : '#1d1d1f', borderBottom: '1px solid rgba(0,0,0,0.04)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{link.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aeaeb2" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '8px 0' }} />

          {/* CTA Buttons */}
          <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => window.location.href = '/login'}
              style={{ height: 52, borderRadius: 26, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 16, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer' }}>
              {lang === 'ar' ? 'تسجيل الدخول' : 'Sign in'}
            </button>
            <button onClick={() => window.location.href = '/login'}
              style={{ height: 52, borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
              {lang === 'ar' ? 'ابدأ مجاناً ←' : 'Get Started Free →'}
            </button>
          </div>

          {/* Compare links */}
          <div style={{ padding: '16px 24px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aeaeb2', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              {lang === 'ar' ? 'مقارنات' : 'Compare'}
            </div>
            {[['vs Gong', '/compare/gong'], ['vs Chorus', '/compare/chorus']].map(([label, href]) => (
              <div key={label} onClick={() => window.location.href = href}
                style={{ padding: '10px 0', fontSize: 14, color: '#6e6e73', cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                {label}
              </div>
            ))}
          </div>

          {/* Use cases */}
          <div style={{ padding: '0 24px 32px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aeaeb2', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              {lang === 'ar' ? 'حالات الاستخدام' : 'Use Cases'}
            </div>
            {[
              [lang === 'ar' ? 'العقارات' : 'Real Estate', '/use-cases/real-estate'],
              [lang === 'ar' ? 'التأمين' : 'Insurance', '/use-cases/insurance'],
              [lang === 'ar' ? 'SaaS' : 'SaaS Sales', '/use-cases/saas'],
            ].map(([label, href]) => (
              <div key={label} onClick={() => window.location.href = href}
                style={{ padding: '10px 0', fontSize: 14, color: '#6e6e73', cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}