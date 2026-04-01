'use client'
import { useState, useEffect } from 'react'

interface Props {
  activePage?: string; // Set to string to avoid the union type error from earlier
}

export default function MarketingNav({ activePage }: Props) {
  const [scrolled, setScrolled] = useState(false)

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
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 64,
      background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
      transition: 'all 0.3s', display: 'flex', alignItems: 'center', 
      justifyContent: 'space-between', padding: '0 48px'
    }}>
      <div onClick={() => window.location.href = '/'} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: '#1d1d1f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.3px' }}>DealFlow AI</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {navLinks.map((link) => (
          <span 
            key={link.id} 
            onClick={() => window.location.href = link.href}
            style={{ 
              fontSize: 14, 
              fontWeight: 500, 
              color: activePage === link.id ? '#1d1d1f' : '#6e6e73', 
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}
          >
            {link.label}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={() => window.location.href = '/login'} style={{ height: 36, padding: '0 18px', borderRadius: 18, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 14, fontWeight: 500 }}>Sign in</button>
        <button onClick={() => window.location.href = '/login'} style={{ height: 36, padding: '0 18px', borderRadius: 18, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 14, fontWeight: 600 }}>Get Started →</button>
      </div>
    </nav>
  )
}