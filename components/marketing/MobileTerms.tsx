'use client'
import { useState } from 'react'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'

export default function MobileTerms() {
  const [openSection, setOpenSection] = useState<number | null>(0)

  const sections = [
    { title: 'Acceptance of Terms', content: 'By accessing or using DealFlow AI, you agree to be bound by these Terms of Service. If you do not agree, do not use the service. These terms apply to all users, including free trial users.' },
    { title: 'Account Registration', content: 'You must be 18 or older to use DealFlow AI. You are responsible for maintaining the security of your account credentials. You must provide accurate information and keep it updated.' },
    { title: 'Subscription & Payment', content: 'Paid plans are billed monthly or annually as selected. Annual plans are charged upfront for the full year. All prices are in USD unless otherwise stated. Taxes may apply based on your location.' },
    { title: 'Cancellation & Refunds', content: 'You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. We offer a 30-day money-back guarantee for first-time subscribers. No refunds for annual plans after 30 days.' },
    { title: 'Acceptable Use', content: 'You may not use DealFlow AI to record calls without all-party consent where required by law. You may not attempt to reverse engineer or copy the service. You may not use the service for illegal purposes.' },
    { title: 'Intellectual Property', content: 'DealFlow AI and all its content, features, and functionality are owned by DealFlow AI and protected by copyright. Your call transcripts and data remain your property.' },
    { title: 'Limitation of Liability', content: 'DealFlow AI is provided "as is" without warranties. We are not liable for any indirect or consequential damages arising from your use of the service. Our liability is limited to the amount paid in the last 12 months.' },
    { title: 'Governing Law', content: 'These terms are governed by the laws of the United Arab Emirates. Any disputes shall be resolved in the courts of Dubai, UAE.' },
  ]

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} body{font-family:'DM Sans',sans-serif;background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} .serif{font-family:'DM Serif Display',serif;}`}</style>
      <MobileNav />

      <section style={{ padding: '40px 24px 32px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#6e6e73', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Last updated: March 2026</div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 12 }}>Terms of <span style={{ fontStyle: 'italic' }}>Service</span></h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6 }}>Please read these terms carefully before using DealFlow AI.</p>
      </section>

      <section style={{ padding: '0 20px 48px' }}>
        <div style={{ padding: '16px 20px', borderRadius: 20, background: 'rgba(52,199,89,0.06)', border: '1px solid rgba(52,199,89,0.15)', marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f', marginBottom: 4 }}>30-day money back guarantee</div>
            <div style={{ fontSize: 13, color: '#6e6e73', lineHeight: 1.5 }}>Not happy? Get a full refund within 30 days of your first payment. No questions asked.</div>
          </div>
        </div>

        <div style={{ background: '#f5f5f7', borderRadius: 20, overflow: 'hidden' }}>
          {sections.map((section, i) => (
            <div key={i} style={{ borderBottom: i < sections.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
              <button onClick={() => setOpenSection(openSection === i ? null : i)}
                style={{ width: '100%', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: openSection === i ? '#fff' : 'transparent', border: 'none', textAlign: 'left', color: '#1d1d1f', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', gap: 12 }}>
                <span>{section.title}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6e6e73" strokeWidth="2" strokeLinecap="round"
                  style={{ transition: 'transform 0.2s', transform: openSection === i ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {openSection === i && (
                <div style={{ padding: '0 20px 16px', background: '#fff', fontSize: 14, color: '#6e6e73', lineHeight: 1.7 }}>
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <MobileFooter />
    </>
  )
}