'use client'
import { useState } from 'react'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'

export default function MobileContact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: 'general', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 48, padding: '0 16px', borderRadius: 14,
    border: '1px solid rgba(0,0,0,0.1)', background: '#f5f5f7',
    color: '#1d1d1f', fontSize: 15, fontFamily: 'inherit', outline: 'none',
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} body{font-family:'DM Sans',sans-serif;background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} .serif{font-family:'DM Serif Display',serif;} .tap-btn{transition:transform 0.15s,opacity 0.15s;} .tap-btn:active{transform:scale(0.97);opacity:0.85;} input::placeholder,textarea::placeholder{color:#aeaeb2;} @keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <MobileNav activePage="contact" />

      <section style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 12 }}>
          Let's <span style={{ fontStyle: 'italic', color: '#0071e3' }}>talk</span>
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6 }}>We reply within 2 hours during business hours.</p>
      </section>

      {/* Quick contact options */}
      <section style={{ padding: '0 20px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <a href="mailto:hello@dealflow-ai.com" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 20, background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.06)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1f' }}>Email us</span>
            <span style={{ fontSize: 11, color: '#6e6e73', textAlign: 'center' }}>hello@dealflow-ai.com</span>
          </a>
          <a href="https://wa.me/971500000000" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', borderRadius: 20, background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.06)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1f' }}>WhatsApp</span>
            <span style={{ fontSize: 11, color: '#6e6e73', textAlign: 'center' }}>Chat with us now</span>
          </a>
        </div>
      </section>

      {/* Contact form */}
      <section style={{ padding: '0 20px 48px' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', borderRadius: 24, background: 'rgba(52,199,89,0.06)', border: '1px solid rgba(52,199,89,0.2)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#1d1d1f', marginBottom: 8 }}>Message sent!</div>
            <div style={{ fontSize: 14, color: '#6e6e73' }}>We'll get back to you within 2 hours.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', marginBottom: 4 }}>Send us a message</div>
            <input style={inputStyle} placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input style={inputStyle} placeholder="Email address" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <input style={inputStyle} placeholder="Company (optional)" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
            <select style={{...inputStyle, appearance: 'none'}} value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>
              <option value="general">General inquiry</option>
              <option value="demo">Book a demo</option>
              <option value="enterprise">Enterprise pricing</option>
              <option value="support">Support</option>
            </select>
            <textarea style={{...inputStyle, height: 120, padding: '12px 16px', resize: 'none'} as React.CSSProperties}
              placeholder="Your message..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
            <button className="tap-btn" onClick={handleSubmit} disabled={loading || !form.name || !form.email || !form.message}
              style={{ height: 52, borderRadius: 26, border: 'none', background: loading ? '#f5f5f7' : '#1d1d1f', color: loading ? '#6e6e73' : '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading && <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
              {loading ? 'Sending...' : 'Send Message →'}
            </button>
          </div>
        )}
      </section>

      <MobileFooter />
    </>
  )
}