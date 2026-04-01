'use client'
import { useState, useEffect } from 'react'

export default function MobileFooter() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')

  useEffect(() => {
    const saved = localStorage.getItem('marketing_lang') as 'en' | 'ar'
    if (saved) setLang(saved)
  }, [])

  const sections = [
    {
      title: lang === 'ar' ? 'المنتج' : 'Product',
      links: [
        { label: lang === 'ar' ? 'المميزات' : 'Features', href: '/features' },
        { label: lang === 'ar' ? 'كيف يعمل' : 'How it works', href: '/how-it-works' },
        { label: lang === 'ar' ? 'الأسعار' : 'Pricing', href: '/pricing' },
        { label: lang === 'ar' ? 'المستجدات' : "What's New", href: '/changelog' },
        { label: lang === 'ar' ? 'احجز عرضاً' : 'Book a Demo', href: '/demo' },
      ]
    },
    {
      title: lang === 'ar' ? 'حالات الاستخدام' : 'Use Cases',
      links: [
        { label: lang === 'ar' ? 'العقارات' : 'Real Estate', href: '/use-cases/real-estate' },
        { label: lang === 'ar' ? 'التأمين' : 'Insurance', href: '/use-cases/insurance' },
        { label: lang === 'ar' ? 'مبيعات SaaS' : 'SaaS Sales', href: '/use-cases/saas' },
      ]
    },
    {
      title: lang === 'ar' ? 'مقارنات' : 'Compare',
      links: [
        { label: 'vs Gong', href: '/compare/gong' },
        { label: 'vs Chorus', href: '/compare/chorus' },
      ]
    },
    {
      title: lang === 'ar' ? 'الشركة' : 'Company',
      links: [
        { label: lang === 'ar' ? 'من نحن' : 'About', href: '/about' },
        { label: lang === 'ar' ? 'المدونة' : 'Blog', href: '/blog' },
        { label: lang === 'ar' ? 'تواصل معنا' : 'Contact', href: '/contact' },
        { label: lang === 'ar' ? 'الخصوصية' : 'Privacy', href: '/privacy' },
        { label: lang === 'ar' ? 'الشروط' : 'Terms', href: '/terms' },
      ]
    },
  ]

  const [openSection, setOpenSection] = useState<number | null>(null)

  return (
    <footer style={{
      background: '#1d1d1f',
      direction: lang === 'ar' ? 'rtl' : 'ltr',
      fontFamily: 'DM Sans, -apple-system, sans-serif',
    }}>
      {/* Brand */}
      <div style={{ padding: '32px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>DealFlow AI</span>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 16, maxWidth: 280 }}>
          {lang === 'ar'
            ? 'مساعد المبيعات الذكي المبني للسوق العربي. بالعربية والإنجليزية.'
            : 'The AI-powered sales assistant built for MENA. English and Arabic.'}
        </p>

        {/* Language badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 24 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>🇦🇪 Arabic</span>
          <div style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>🇬🇧 English</span>
        </div>
      </div>

      {/* Accordion sections */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {sections.map((section, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <button onClick={() => setOpenSection(openSection === i ? null : i)}
              style={{ width: '100%', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>{section.title}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"
                style={{ transition: 'transform 0.2s', transform: openSection === i ? 'rotate(180deg)' : 'none' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {openSection === i && (
              <div style={{ padding: '0 24px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {section.links.map(link => (
                  <span key={link.href} onClick={() => window.location.href = link.href}
                    style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', cursor: 'pointer' }}>
                    {link.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ padding: '20px 24px 36px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            [lang === 'ar' ? 'الخصوصية' : 'Privacy', '/privacy'],
            [lang === 'ar' ? 'الشروط' : 'Terms', '/terms'],
            [lang === 'ar' ? 'تواصل' : 'Contact', '/contact'],
          ].map(([label, href]) => (
            <span key={label} onClick={() => window.location.href = href}
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>
              {label}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
          © 2026 DealFlow AI · Dubai, UAE
        </div>
      </div>
    </footer>
  )
}