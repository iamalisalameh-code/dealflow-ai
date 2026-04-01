'use client'
import { useState } from 'react'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'

export default function MobilePricing() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const plans = [
    {
      name: 'Solo', tagline: 'For individual agents',
      monthly: 49, annual: 39, color: '#0071e3', popular: false,
      features: ['Unlimited call recordings', 'Live AI coaching', 'Arabic + English', 'Smart follow-ups', 'Pre-call brief', 'Call history', 'Contact CRM'],
    },
    {
      name: 'Team', tagline: 'For teams that win together',
      monthly: 99, annual: 79, color: '#bf5af2', popular: true,
      features: ['Everything in Solo', 'Up to 10 agents', 'Team dashboard', 'Per-agent controls', 'Call limit management', 'Priority support'],
    },
    {
      name: 'Enterprise', tagline: 'Custom for large orgs',
      monthly: null, annual: null, color: '#ff9f0a', popular: false,
      features: ['Everything in Team', 'Unlimited agents', 'Custom AI training', 'Dedicated manager', 'SSO & security', 'API access'],
    },
  ]

  const faqs = [
    { q: 'Can I switch plans later?', a: 'Yes — upgrade or downgrade anytime. Changes take effect next billing cycle.' },
    { q: 'What happens after trial?', a: 'After 14 days, choose a plan. Your data is kept for 30 days if you pause.' },
    { q: 'Is there a per-agent fee?', a: 'No — Team plan includes up to 10 agents at a flat rate.' },
    { q: 'Do you offer refunds?', a: '30-day money back guarantee. No questions asked.' },
    { q: 'Can I pay in AED?', a: 'Yes — we accept USD and AED. Contact us for AED invoicing.' },
  ]

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); * { margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent; } body{font-family:'DM Sans',sans-serif;background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} .serif{font-family:'DM Serif Display',serif;} .tap-btn{transition:transform 0.15s,opacity 0.15s;} .tap-btn:active{transform:scale(0.97);opacity:0.85;}`}</style>
      <MobileNav activePage="pricing" />

      {/* Hero */}
      <section style={{ padding: '40px 24px 32px', textAlign: 'center', background: '#fff' }}>
        <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 20, background: 'rgba(0,113,227,0.08)', border: '1px solid rgba(0,113,227,0.15)', marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#0071e3' }}>14-day free trial · No credit card</span>
        </div>
        <h1 className="serif" style={{ fontSize: 38, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 12 }}>
          Simple,<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>transparent pricing</span>
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', marginBottom: 24 }}>One price. Everything included.</p>

        {/* Toggle */}
        <div style={{ display: 'inline-flex', padding: 4, borderRadius: 20, background: '#f5f5f7' }}>
          {['Monthly', 'Annual'].map((label, i) => (
            <button key={label} onClick={() => setAnnual(i === 1)}
              style={{ height: 36, padding: '0 20px', borderRadius: 16, border: 'none', background: annual === (i === 1) ? '#1d1d1f' : 'transparent', color: annual === (i === 1) ? '#fff' : '#6e6e73', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
              {label}
              {i === 1 && <span style={{ fontSize: 10, fontWeight: 700, color: annual ? '#34c759' : '#34c759' }}>-20%</span>}
            </button>
          ))}
        </div>
      </section>

      {/* Plan cards */}
      <section style={{ padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {plans.map((plan, i) => (
          <div key={i} style={{ borderRadius: 24, padding: '24px 20px', border: plan.popular ? `2px solid ${plan.color}` : '1px solid rgba(0,0,0,0.08)', position: 'relative', background: '#fff' }}>
            {plan.popular && (
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', padding: '3px 16px', borderRadius: 12, background: plan.color, color: '#fff', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>Most Popular</div>
            )}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: plan.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{plan.name}</div>
              <div style={{ fontSize: 13, color: '#6e6e73', marginBottom: 14 }}>{plan.tagline}</div>
              {plan.monthly ? (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 16 }}>
                  <span style={{ fontSize: 13, color: '#6e6e73' }}>$</span>
                  <span style={{ fontSize: 48, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2px', lineHeight: 1 }}>{annual ? plan.annual : plan.monthly}</span>
                  <span style={{ fontSize: 13, color: '#6e6e73' }}>/mo</span>
                  {annual && <span style={{ fontSize: 11, color: '#34c759', fontWeight: 600, marginLeft: 4 }}>billed annually</span>}
                </div>
              ) : (
                <div style={{ fontSize: 36, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', marginBottom: 16 }}>Custom</div>
              )}
              <button className="tap-btn" onClick={() => window.location.href = plan.name === 'Enterprise' ? '/contact' : '/login'}
                style={{ width: '100%', height: 48, borderRadius: 24, border: plan.popular ? 'none' : '1px solid rgba(0,0,0,0.12)', background: plan.popular ? plan.color : 'transparent', color: plan.popular ? '#fff' : '#1d1d1f', fontSize: 15, fontWeight: 600, fontFamily: 'inherit' }}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {plan.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: plan.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: 13, color: '#1d1d1f' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section style={{ padding: '40px 20px', background: '#f5f5f7' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 className="serif" style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-1px' }}>
            Pricing <span style={{ fontStyle: 'italic' }}>questions</span>
          </h2>
        </div>
        <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', textAlign: 'left', color: '#1d1d1f', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', gap: 12 }}>
                <span>{faq.q}</span>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
              </button>
              {openFaq === i && <div style={{ padding: '0 20px 18px', fontSize: 14, color: '#6e6e73', lineHeight: 1.7 }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '48px 20px', background: '#1d1d1f', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: '60%', height: '60%', borderRadius: '50%', background: '#bf5af2', filter: 'blur(80px)', opacity: 0.12, pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="serif" style={{ fontSize: 34, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#fff', marginBottom: 12 }}>
            Start your<br /><span style={{ fontStyle: 'italic', color: '#34c759' }}>free trial today</span>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>14 days. Full access. No card.</p>
          <button className="tap-btn" onClick={() => window.location.href = '/login'}
            style={{ width: '100%', maxWidth: 300, height: 52, borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>
            Get Started Free →
          </button>
        </div>
      </section>

      <MobileFooter />
    </>
  )
}