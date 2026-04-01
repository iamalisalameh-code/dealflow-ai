'use client'
import { useState, useEffect } from 'react'

interface Props {
  activePage?: string
}

export default function MarketingNav({ activePage }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'How it works', href: '/how-it-works', id: 'how-it-works' },
    { label: 'Features', href: '/features', id: 'features' },
    { label: 'Pricing', href: '/pricing', id: 'pricing' },
    { label: 'About', href: '/about', id: 'about' },
  ]

  return (
    <>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled || menuOpen ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.3s',
        fontFamily: 'DM Sans, -apple-system, sans-serif',
      }}>
        {/* Main bar */}
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>

          {/* Logo */}
          <div onClick={() => window.location.href = '/landing'}
            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: '#1d1d1f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px' }}>DealFlow AI</span>
          </div>

          {/* Desktop links */}
          <div className="mkt-desktop-links" style={{ alignItems: 'center', gap: 28 }}>
            {navLinks.map(link => (
              <span key={link.id} onClick={() => window.location.href = link.href}
                style={{ fontSize: 14, fontWeight: activePage === link.id ? 600 : 500, color: activePage === link.id ? '#1d1d1f' : '#6e6e73', cursor: 'pointer', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
                {link.label}
              </span>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="mkt-desktop-ctas" style={{ alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <button onClick={() => window.location.href = '/login'}
              style={{ height: 36, padding: '0 16px', borderRadius: 18, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
              Sign in
            </button>
            <button onClick={() => window.location.href = '/login'}
              style={{ height: 36, padding: '0 16px', borderRadius: 18, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
              Get Started →
            </button>
          </div>

          {/* Hamburger */}
          <button className="mkt-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            style={{ flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 8, marginLeft: 'auto' }}>
            <div style={{ width: 22, height: 2, background: '#1d1d1f', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <div style={{ width: 22, height: 2, background: '#1d1d1f', borderRadius: 2, transition: 'all 0.25s', opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 22, height: 2, background: '#1d1d1f', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: 'rgba(255,255,255,0.98)', borderTop: '1px solid rgba(0,0,0,0.06)', padding: '8px 0 24px', animation: 'slideDown 0.2s ease' }}>
            {navLinks.map(link => (
              <div key={link.id} onClick={() => { window.location.href = link.href; setMenuOpen(false) }}
                style={{ padding: '14px 24px', fontSize: 16, fontWeight: 500, color: activePage === link.id ? '#1d1d1f' : '#6e6e73', borderBottom: '1px solid rgba(0,0,0,0.04)', cursor: 'pointer' }}>
                {link.label}
              </div>
            ))}
            <div style={{ padding: '16px 24px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => window.location.href = '/login'}
                style={{ height: 48, borderRadius: 24, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                Sign in
              </button>
              <button onClick={() => window.location.href = '/login'}
                style={{ height: 48, borderRadius: 24, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Get Started Free →
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
