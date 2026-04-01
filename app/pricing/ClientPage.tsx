'use client'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import { useState, useEffect } from 'react'

export default function PricingClient() {
  const [scrolled, setScrolled] = useState(false)
  const [annual, setAnnual] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const plans = [
    {
      name: 'Solo',
      tagline: 'For individual sales agents',
      monthlyPrice: 49,
      annualPrice: 39,
      color: '#0071e3',
      popular: false,
      cta: 'Start Free Trial',
      features: {
        'Call Features': [
          { name: 'Live transcription (English + Arabic)', included: true },
          { name: 'AI real-time coaching', included: true },
          { name: 'Deal health score', included: true },
          { name: 'Buying signal detection', included: true },
          { name: 'Objection detection', included: true },
          { name: 'Talk ratio analysis', included: true },
          { name: 'Agent energy tracking', included: true },
          { name: 'Google Meet / Zoom integration', included: true },
        ],
        'After Call': [
          { name: 'Post-call summary & coaching', included: true },
          { name: 'WhatsApp follow-up generator', included: true },
          { name: 'Email follow-up generator', included: true },
          { name: 'Pre-call AI brief', included: true },
          { name: 'Call history & recordings', included: true },
        ],
        'CRM & Contacts': [
          { name: 'Contact management', included: true },
          { name: 'Auto CRM update after calls', included: true },
          { name: 'Deal stage tracking', included: true },
          { name: 'Team management', included: false },
          { name: 'Agent performance dashboard', included: false },
        ],
        'Support': [
          { name: 'Email support', included: true },
          { name: 'Priority support', included: false },
          { name: 'Dedicated account manager', included: false },
        ],
      },
    },
    {
      name: 'Team',
      tagline: 'For sales teams that win together',
      monthlyPrice: 99,
      annualPrice: 79,
      color: '#bf5af2',
      popular: true,
      cta: 'Start Free Trial',
      features: {
        'Call Features': [
          { name: 'Live transcription (English + Arabic)', included: true },
          { name: 'AI real-time coaching', included: true },
          { name: 'Deal health score', included: true },
          { name: 'Buying signal detection', included: true },
          { name: 'Objection detection', included: true },
          { name: 'Talk ratio analysis', included: true },
          { name: 'Agent energy tracking', included: true },
          { name: 'Google Meet / Zoom integration', included: true },
        ],
        'After Call': [
          { name: 'Post-call summary & coaching', included: true },
          { name: 'WhatsApp follow-up generator', included: true },
          { name: 'Email follow-up generator', included: true },
          { name: 'Pre-call AI brief', included: true },
          { name: 'Call history & recordings', included: true },
        ],
        'CRM & Contacts': [
          { name: 'Contact management', included: true },
          { name: 'Auto CRM update after calls', included: true },
          { name: 'Deal stage tracking', included: true },
          { name: 'Team management (up to 10 agents)', included: true },
          { name: 'Agent performance dashboard', included: true },
        ],
        'Support': [
          { name: 'Email support', included: true },
          { name: 'Priority support', included: true },
          { name: 'Dedicated account manager', included: false },
        ],
      },
    },
    {
      name: 'Enterprise',
      tagline: 'Custom solutions for large teams',
      monthlyPrice: null,
      annualPrice: null,
      color: '#ff9f0a',
      popular: false,
      cta: 'Contact Sales',
      features: {
        'Call Features': [
          { name: 'Live transcription (English + Arabic)', included: true },
          { name: 'AI real-time coaching', included: true },
          { name: 'Deal health score', included: true },
          { name: 'Buying signal detection', included: true },
          { name: 'Objection detection', included: true },
          { name: 'Talk ratio analysis', included: true },
          { name: 'Agent energy tracking', included: true },
          { name: 'Google Meet / Zoom integration', included: true },
        ],
        'After Call': [
          { name: 'Post-call summary & coaching', included: true },
          { name: 'WhatsApp follow-up generator', included: true },
          { name: 'Email follow-up generator', included: true },
          { name: 'Pre-call AI brief', included: true },
          { name: 'Call history & recordings', included: true },
        ],
        'CRM & Contacts': [
          { name: 'Contact management', included: true },
          { name: 'Auto CRM update after calls', included: true },
          { name: 'Deal stage tracking', included: true },
          { name: 'Team management (unlimited agents)', included: true },
          { name: 'Agent performance dashboard', included: true },
        ],
        'Support': [
          { name: 'Email support', included: true },
          { name: 'Priority support', included: true },
          { name: 'Dedicated account manager', included: true },
        ],
      },
    },
  ]

  const faqs = [
    { q: 'Can I switch plans later?', a: 'Yes — you can upgrade or downgrade at any time. Changes take effect at the next billing cycle.' },
    { q: 'What happens after the free trial?', a: 'After 14 days, you choose a plan. If you don\'t, your account is paused but your data is kept for 30 days.' },
    { q: 'Is there a per-agent fee on the Team plan?', a: 'No — the Team plan includes up to 10 agents at a flat rate. Enterprise plans have custom pricing for larger teams.' },
    { q: 'Do you offer refunds?', a: 'Yes — if you\'re not satisfied within the first 30 days, we\'ll issue a full refund. No questions asked.' },
    { q: 'Can I pay in AED?', a: 'Yes — we accept payments in USD and AED. Contact us for AED invoicing.' },
  ]

  const CheckIcon = ({ color }: { color: string }) => (
    <div style={{ width: 20, height: 20, borderRadius: '50%', background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
  )

  const XIcon = () => (
    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#aeaeb2" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </div>
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff; color: #1d1d1f; font-family: 'DM Sans', -apple-system, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        button { cursor: pointer; font-family: inherit; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        
        
        .plan-card { border-radius: 28px; border: 1px solid rgba(0,0,0,0.08); background: #fff; transition: transform 0.3s, box-shadow 0.3s; }
        .plan-card:hover { transform: translateY(-4px); box-shadow: 0 24px 60px rgba(0,0,0,0.1); }
        .faq-item { border-bottom: 1px solid rgba(0,0,0,0.06); }
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}</style>

      {/* NAV */}
      <MarketingNav activePage="pricing" />

      {/* HERO */}
      <section style={{ paddingTop: 140, paddingBottom: 60, textAlign: 'center', padding: '140px 48px 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '-20%', left: '10%', width: '35%', height: '60%', background: '#0071e3', opacity: 0.06 }} />
        <div className="mesh" style={{ top: '-10%', right: '10%', width: '30%', height: '50%', background: '#bf5af2', opacity: 0.05 }} />

        <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(0,113,227,0.08)', border: '1px solid rgba(0,113,227,0.15)', marginBottom: 28 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#0071e3' }}>14-day free trial · No credit card required</span>
        </div>

        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 20 }}>
          Simple, transparent<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>pricing</span>
        </h1>

        <p className="fade-up-2" style={{ fontSize: 18, color: '#6e6e73', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.6 }}>
          One price. Everything included. No hidden fees.
        </p>

        {/* Billing toggle */}
        <div className="fade-up-2" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px', borderRadius: 24, background: '#f5f5f7' }}>
          <button onClick={() => setAnnual(false)}
            style={{ height: 38, padding: '0 22px', borderRadius: 18, border: 'none', background: !annual ? '#fff' : 'transparent', color: '#1d1d1f', fontSize: 14, fontWeight: 500, boxShadow: !annual ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>
            Monthly
          </button>
          <button onClick={() => setAnnual(true)}
            style={{ height: 38, padding: '0 22px', borderRadius: 18, border: 'none', background: annual ? '#fff' : 'transparent', color: '#1d1d1f', fontSize: 14, fontWeight: 500, boxShadow: annual ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}>
            Annual
            <span style={{ padding: '2px 8px', borderRadius: 8, background: 'rgba(52,199,89,0.12)', color: '#34c759', fontSize: 11, fontWeight: 700 }}>Save 20%</span>
          </button>
        </div>
      </section>

      {/* PLAN CARDS */}
      <section style={{ padding: '40px 48px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
            {plans.map((plan, i) => (
              <div key={i} className="plan-card" style={{ padding: '36px', border: plan.popular ? `2px solid ${plan.color}` : '1px solid rgba(0,0,0,0.08)', position: 'relative' }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', padding: '4px 18px', borderRadius: 20, background: plan.color, color: '#fff', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
                    Most Popular
                  </div>
                )}
                <div style={{ fontSize: 12, fontWeight: 700, color: plan.color, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>{plan.name}</div>
                <div style={{ fontSize: 14, color: '#6e6e73', marginBottom: 24 }}>{plan.tagline}</div>

                {plan.monthlyPrice ? (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 28 }}>
                    <span style={{ fontSize: 14, color: '#6e6e73' }}>$</span>
                    <span style={{ fontSize: 52, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2px', lineHeight: 1 }}>
                      {annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span style={{ fontSize: 14, color: '#6e6e73' }}>/mo</span>
                    {annual && <span style={{ fontSize: 12, color: '#34c759', fontWeight: 600, marginLeft: 6 }}>billed annually</span>}
                  </div>
                ) : (
                  <div style={{ fontSize: 40, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', lineHeight: 1, marginBottom: 28 }}>Custom</div>
                )}

                <button onClick={() => window.location.href = plan.name === 'Enterprise' ? 'mailto:hello@dealflow-ai.com' : '/login'}
                  style={{ width: '100%', height: 48, borderRadius: 24, border: plan.popular ? 'none' : '1px solid rgba(0,0,0,0.12)', background: plan.popular ? plan.color : 'transparent', color: plan.popular ? '#fff' : '#1d1d1f', fontSize: 15, fontWeight: 600, marginBottom: 32, transition: 'all 0.2s' }}>
                  {plan.cta}
                </button>

                {/* Feature groups */}
                {Object.entries(plan.features).map(([group, items]) => (
                  <div key={group} style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#aeaeb2', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{group}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {items.map((item, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {item.included ? <CheckIcon color={plan.color} /> : <XIcon />}
                          <span style={{ fontSize: 13, color: item.included ? '#1d1d1f' : '#aeaeb2', lineHeight: 1.4 }}>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 48px)', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="serif" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.1 }}>
              How do we compare?
            </h2>
          </div>

          <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, auto)', gap: 0, background: '#1d1d1f', padding: '16px 28px' }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Feature</div>
              {['DealFlow AI', 'Manual Notes', 'Gong', 'Chorus'].map(name => (
                <div key={name} style={{ fontSize: 13, fontWeight: 600, color: name === 'DealFlow AI' ? '#0071e3' : 'rgba(255,255,255,0.5)', textAlign: 'center', minWidth: 100 }}>{name}</div>
              ))}
            </div>

            {[
              { feature: 'Arabic language support', values: [true, false, false, false] },
              { feature: 'Real-time AI coaching', values: [true, false, true, true] },
              { feature: 'WhatsApp follow-ups', values: [true, false, false, false] },
              { feature: 'Pre-call AI brief', values: [true, false, false, false] },
              { feature: 'Built for MENA market', values: [true, false, false, false] },
              { feature: 'No per-seat pricing', values: [true, false, false, false] },
              { feature: 'Free trial', values: [true, true, false, false] },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, auto)', gap: 0, padding: '14px 28px', borderBottom: i < 6 ? '1px solid rgba(0,0,0,0.06)' : 'none', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <div style={{ fontSize: 14, color: '#1d1d1f' }}>{row.feature}</div>
                {row.values.map((val, j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'center', minWidth: 100 }}>
                    {val ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={j === 0 ? '#0071e3' : '#34c759'} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aeaeb2" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(50px, 9vw, 100px) clamp(20px, 5vw, 48px)', background: '#fff' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 className="serif" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.1 }}>
              Pricing <span style={{ fontStyle: 'italic' }}>questions</span>
            </h2>
          </div>
          {faqs.map((faq, i) => {
            const [open, setOpen] = useState(false)
            return (
              <div key={i} className="faq-item">
                <button onClick={() => setOpen(!open)}
                  style={{ width: '100%', padding: '22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', textAlign: 'left', color: '#1d1d1f', fontSize: 16, fontWeight: 500 }}>
                  {faq.q}
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'none' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                </button>
                {open && <div style={{ paddingBottom: 22, fontSize: 15, color: '#6e6e73', lineHeight: 1.7 }}>{faq.a}</div>}
              </div>
            )
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: 'clamp(50px, 9vw, 100px) clamp(20px, 5vw, 48px)', background: '#1d1d1f', position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '-30%', left: '-10%', width: '50%', height: '80%', background: '#0071e3', opacity: 0.15 }} />
        <div className="mesh" style={{ bottom: '-30%', right: '-10%', width: '40%', height: '70%', background: '#bf5af2', opacity: 0.12 }} />
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, color: '#fff', marginBottom: 16 }}>
            Start your<br /><span style={{ fontStyle: 'italic', color: '#34c759' }}>free trial today</span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', marginBottom: 36 }}>14 days. Full access. No card needed.</p>
          <button onClick={() => window.location.href = '/login'}
            style={{ height: 52, padding: '0 36px', borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600 }}>
            Get Started Free →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <MarketingFooter />
    </>
  )
}