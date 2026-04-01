'use client'
import { useState, useEffect } from 'react'
import { t } from '@/lib/translations'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'

export default function PricingClient() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [annual, setAnnual] = useState(false)

  // Language Engine
  useEffect(() => {
    setMounted(true)
    const handleStorage = () => {
      const saved = localStorage.getItem('marketing_lang') as 'en' | 'ar'
      if (saved) setLang(saved)
    }
    handleStorage()
    window.addEventListener('storage', handleStorage)
    
    // Scroll listener
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!mounted) return null

  const isAr = lang === 'ar'
  const tr = t[lang]

  // Dynamic Plans Array
  const plans = [
    {
      name: isAr ? 'الفردي' : 'Solo',
      tagline: isAr ? 'لمندوبي المبيعات المستقلين' : 'For individual sales agents',
      monthlyPrice: 49,
      annualPrice: 39,
      color: '#0071e3',
      popular: false,
      cta: isAr ? 'ابدأ التجربة المجانية' : 'Start Free Trial',
      features: {
        [isAr ? 'ميزات المكالمة' : 'Call Features']: [
          { name: isAr ? 'تفريغ مباشر (عربي + إنجليزي)' : 'Live transcription (English + Arabic)', included: true },
          { name: isAr ? 'تدريب ذكاء اصطناعي فوري' : 'AI real-time coaching', included: true },
          { name: isAr ? 'مؤشر صحة الصفقة' : 'Deal health score', included: true },
          { name: isAr ? 'اكتشاف إشارات الشراء' : 'Buying signal detection', included: true },
          { name: isAr ? 'اكتشاف الاعتراضات' : 'Objection detection', included: true },
          { name: isAr ? 'تحليل نسبة الحديث' : 'Talk ratio analysis', included: true },
          { name: isAr ? 'تتبع طاقة الوكيل' : 'Agent energy tracking', included: true },
          { name: isAr ? 'تكامل مع Google Meet / Zoom' : 'Google Meet / Zoom integration', included: true },
        ],
        [isAr ? 'ما بعد المكالمة' : 'After Call']: [
          { name: isAr ? 'ملخص المكالمة والتدريب' : 'Post-call summary & coaching', included: true },
          { name: isAr ? 'توليد رسائل متابعة واتساب' : 'WhatsApp follow-up generator', included: true },
          { name: isAr ? 'توليد رسائل بريد إلكتروني' : 'Email follow-up generator', included: true },
          { name: isAr ? 'ملخص تحضيري قبل المكالمة' : 'Pre-call AI brief', included: true },
          { name: isAr ? 'سجل المكالمات والتسجيلات' : 'Call history & recordings', included: true },
        ],
        [isAr ? 'إدارة العملاء' : 'CRM & Contacts']: [
          { name: isAr ? 'إدارة جهات الاتصال' : 'Contact management', included: true },
          { name: isAr ? 'تحديث تلقائي للنظام بعد المكالمة' : 'Auto CRM update after calls', included: true },
          { name: isAr ? 'تتبع مرحلة الصفقة' : 'Deal stage tracking', included: true },
          { name: isAr ? 'إدارة فريق العمل' : 'Team management', included: false },
          { name: isAr ? 'لوحة أداء الوكيل' : 'Agent performance dashboard', included: false },
        ],
        [isAr ? 'الدعم الفني' : 'Support']: [
          { name: isAr ? 'دعم عبر البريد الإلكتروني' : 'Email support', included: true },
          { name: isAr ? 'أولوية الدعم الفني' : 'Priority support', included: false },
          { name: isAr ? 'مدير حساب مخصص' : 'Dedicated account manager', included: false },
        ],
      },
    },
    {
      name: isAr ? 'فريق العمل' : 'Team',
      tagline: isAr ? 'لفرق المبيعات التي تطمح للصدارة' : 'For sales teams that win together',
      monthlyPrice: 99,
      annualPrice: 79,
      color: '#bf5af2',
      popular: true,
      cta: isAr ? 'ابدأ التجربة المجانية' : 'Start Free Trial',
      features: {
        [isAr ? 'ميزات المكالمة' : 'Call Features']: [
          { name: isAr ? 'تفريغ مباشر (عربي + إنجليزي)' : 'Live transcription (English + Arabic)', included: true },
          { name: isAr ? 'تدريب ذكاء اصطناعي فوري' : 'AI real-time coaching', included: true },
          { name: isAr ? 'مؤشر صحة الصفقة' : 'Deal health score', included: true },
          { name: isAr ? 'اكتشاف إشارات الشراء' : 'Buying signal detection', included: true },
          { name: isAr ? 'اكتشاف الاعتراضات' : 'Objection detection', included: true },
          { name: isAr ? 'تحليل نسبة الحديث' : 'Talk ratio analysis', included: true },
          { name: isAr ? 'تتبع طاقة الوكيل' : 'Agent energy tracking', included: true },
          { name: isAr ? 'تكامل مع Google Meet / Zoom' : 'Google Meet / Zoom integration', included: true },
        ],
        [isAr ? 'ما بعد المكالمة' : 'After Call']: [
          { name: isAr ? 'ملخص المكالمة والتدريب' : 'Post-call summary & coaching', included: true },
          { name: isAr ? 'توليد رسائل متابعة واتساب' : 'WhatsApp follow-up generator', included: true },
          { name: isAr ? 'توليد رسائل بريد إلكتروني' : 'Email follow-up generator', included: true },
          { name: isAr ? 'ملخص تحضيري قبل المكالمة' : 'Pre-call AI brief', included: true },
          { name: isAr ? 'سجل المكالمات والتسجيلات' : 'Call history & recordings', included: true },
        ],
        [isAr ? 'إدارة العملاء' : 'CRM & Contacts']: [
          { name: isAr ? 'إدارة جهات الاتصال' : 'Contact management', included: true },
          { name: isAr ? 'تحديث تلقائي للنظام بعد المكالمة' : 'Auto CRM update after calls', included: true },
          { name: isAr ? 'تتبع مرحلة الصفقة' : 'Deal stage tracking', included: true },
          { name: isAr ? 'إدارة الفريق (حتى 10 وكلاء)' : 'Team management (up to 10 agents)', included: true },
          { name: isAr ? 'لوحة أداء الوكيل' : 'Agent performance dashboard', included: true },
        ],
        [isAr ? 'الدعم الفني' : 'Support']: [
          { name: isAr ? 'دعم عبر البريد الإلكتروني' : 'Email support', included: true },
          { name: isAr ? 'أولوية الدعم الفني' : 'Priority support', included: true },
          { name: isAr ? 'مدير حساب مخصص' : 'Dedicated account manager', included: false },
        ],
      },
    },
    {
      name: isAr ? 'الشركات' : 'Enterprise',
      tagline: isAr ? 'حلول مخصصة للفرق الكبيرة' : 'Custom solutions for large teams',
      monthlyPrice: null,
      annualPrice: null,
      color: '#ff9f0a',
      popular: false,
      cta: isAr ? 'تواصل مع المبيعات' : 'Contact Sales',
      features: {
        [isAr ? 'ميزات المكالمة' : 'Call Features']: [
          { name: isAr ? 'تفريغ مباشر (عربي + إنجليزي)' : 'Live transcription (English + Arabic)', included: true },
          { name: isAr ? 'تدريب ذكاء اصطناعي فوري' : 'AI real-time coaching', included: true },
          { name: isAr ? 'مؤشر صحة الصفقة' : 'Deal health score', included: true },
          { name: isAr ? 'اكتشاف إشارات الشراء' : 'Buying signal detection', included: true },
          { name: isAr ? 'اكتشاف الاعتراضات' : 'Objection detection', included: true },
          { name: isAr ? 'تحليل نسبة الحديث' : 'Talk ratio analysis', included: true },
          { name: isAr ? 'تتبع طاقة الوكيل' : 'Agent energy tracking', included: true },
          { name: isAr ? 'تكامل مع Google Meet / Zoom' : 'Google Meet / Zoom integration', included: true },
        ],
        [isAr ? 'ما بعد المكالمة' : 'After Call']: [
          { name: isAr ? 'ملخص المكالمة والتدريب' : 'Post-call summary & coaching', included: true },
          { name: isAr ? 'توليد رسائل متابعة واتساب' : 'WhatsApp follow-up generator', included: true },
          { name: isAr ? 'توليد رسائل بريد إلكتروني' : 'Email follow-up generator', included: true },
          { name: isAr ? 'ملخص تحضيري قبل المكالمة' : 'Pre-call AI brief', included: true },
          { name: isAr ? 'سجل المكالمات والتسجيلات' : 'Call history & recordings', included: true },
        ],
        [isAr ? 'إدارة العملاء' : 'CRM & Contacts']: [
          { name: isAr ? 'إدارة جهات الاتصال' : 'Contact management', included: true },
          { name: isAr ? 'تحديث تلقائي للنظام بعد المكالمة' : 'Auto CRM update after calls', included: true },
          { name: isAr ? 'تتبع مرحلة الصفقة' : 'Deal stage tracking', included: true },
          { name: isAr ? 'إدارة الفريق (عدد غير محدود)' : 'Team management (unlimited agents)', included: true },
          { name: isAr ? 'لوحة أداء الوكيل' : 'Agent performance dashboard', included: true },
        ],
        [isAr ? 'الدعم الفني' : 'Support']: [
          { name: isAr ? 'دعم عبر البريد الإلكتروني' : 'Email support', included: true },
          { name: isAr ? 'أولوية الدعم الفني' : 'Priority support', included: true },
          { name: isAr ? 'مدير حساب مخصص' : 'Dedicated account manager', included: true },
        ],
      },
    },
  ]

  const faqs = [
    { 
      q: isAr ? 'هل يمكنني تغيير باقتي لاحقاً؟' : 'Can I switch plans later?', 
      a: isAr ? 'نعم — يمكنك الترقية أو التخفيض في أي وقت. التغييرات تسري في دورة الفوترة التالية.' : 'Yes — you can upgrade or downgrade at any time. Changes take effect at the next billing cycle.' 
    },
    { 
      q: isAr ? 'ماذا يحدث بعد انتهاء الفترة التجريبية المجانية؟' : 'What happens after the free trial?', 
      a: isAr ? 'بعد 14 يوماً، يجب اختيار باقة. إذا لم تفعل، سيتم إيقاف حسابك مع الاحتفاظ ببياناتك لمدة 30 يوماً.' : 'After 14 days, you choose a plan. If you don\'t, your account is paused but your data is kept for 30 days.' 
    },
    { 
      q: isAr ? 'هل هناك رسوم لكل وكيل إضافي في باقة الفريق؟' : 'Is there a per-agent fee on the Team plan?', 
      a: isAr ? 'لا — باقة فريق العمل تشمل حتى 10 وكلاء بسعر ثابت. باقات الشركات لها تسعير مخصص.' : 'No — the Team plan includes up to 10 agents at a flat rate. Enterprise plans have custom pricing for larger teams.' 
    },
    { 
      q: isAr ? 'هل تقدمون سياسة استرداد أموال؟' : 'Do you offer refunds?', 
      a: isAr ? 'نعم — إذا لم تكن راضياً خلال أول 30 يوماً، سنعيد لك أموالك بالكامل.' : 'Yes — if you\'re not satisfied within the first 30 days, we\'ll issue a full refund. No questions asked.' 
    },
    { 
      q: isAr ? 'هل يمكنني الدفع بالدرهم الإماراتي؟' : 'Can I pay in AED?', 
      a: isAr ? 'نعم — نقبل الدفع بالدولار والدرهم الإماراتي. تواصل معنا لإصدار فواتير بالدرهم.' : 'Yes — we accept payments in USD and AED. Contact us for AED invoicing.' 
    },
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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&family=Tajawal:wght@400;500;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff; color: #1d1d1f; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
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

      <MarketingNav activePage="pricing" />

      {/* MASTER RTL / LTR WRAPPER */}
      <main style={{ 
        direction: isAr ? 'rtl' : 'ltr', 
        fontFamily: isAr ? "'Tajawal', 'DM Sans', sans-serif" : "'DM Sans', -apple-system, sans-serif", 
        textAlign: isAr ? 'right' : 'left' 
      }}>

        {/* HERO */}
        <section style={{ paddingTop: 140, paddingBottom: 60, textAlign: 'center', padding: '140px 48px 60px', position: 'relative', overflow: 'hidden' }}>
          <div className="mesh" style={{ top: '-20%', left: '10%', width: '35%', height: '60%', background: '#0071e3', opacity: 0.06 }} />
          <div className="mesh" style={{ top: '-10%', right: '10%', width: '30%', height: '50%', background: '#bf5af2', opacity: 0.05 }} />

          <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(0,113,227,0.08)', border: '1px solid rgba(0,113,227,0.15)', marginBottom: 28 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0071e3' }}>{tr.common.freeTrial}</span>
          </div>

          <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: isAr ? 700 : 400, letterSpacing: '-1px', lineHeight: 1.05, marginBottom: 20, fontFamily: isAr ? 'inherit' : 'inherit' }}>
            {tr.pricing.title}
          </h1>

          <p className="fade-up-2" style={{ fontSize: 18, color: '#6e6e73', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.6 }}>
            {tr.pricing.subtitle}
          </p>

          {/* Billing toggle */}
          <div className="fade-up-2" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px', borderRadius: 24, background: '#f5f5f7' }}>
            <button onClick={() => setAnnual(false)}
              style={{ height: 38, padding: '0 22px', borderRadius: 18, border: 'none', background: !annual ? '#fff' : 'transparent', color: '#1d1d1f', fontSize: 14, fontWeight: 500, boxShadow: !annual ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>
              {tr.common.monthly}
            </button>
            <button onClick={() => setAnnual(true)}
              style={{ height: 38, padding: '0 22px', borderRadius: 18, border: 'none', background: annual ? '#fff' : 'transparent', color: '#1d1d1f', fontSize: 14, fontWeight: 500, boxShadow: annual ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}>
              {tr.common.annual}
              <span style={{ padding: '2px 8px', borderRadius: 8, background: 'rgba(52,199,89,0.12)', color: '#34c759', fontSize: 11, fontWeight: 700 }}>{tr.common.save20}</span>
            </button>
          </div>
        </section>

        {/* PLAN CARDS */}
        <section style={{ padding: '40px 48px 80px', background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, alignItems: 'start' }}>
              {plans.map((plan, i) => (
                <div key={i} className="plan-card" style={{ padding: '36px', border: plan.popular ? `2px solid ${plan.color}` : '1px solid rgba(0,0,0,0.08)', position: 'relative' }}>
                  {plan.popular && (
                    <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', padding: '4px 18px', borderRadius: 20, background: plan.color, color: '#fff', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
                      {tr.pricing.popular}
                    </div>
                  )}
                  <div style={{ fontSize: 14, fontWeight: 800, color: plan.color, letterSpacing: isAr ? '0' : '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>{plan.name}</div>
                  <div style={{ fontSize: 14, color: '#6e6e73', marginBottom: 24, fontWeight: 500 }}>{plan.tagline}</div>

                  {plan.monthlyPrice ? (
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 28, direction: 'ltr', justifyContent: isAr ? 'flex-end' : 'flex-start' }}>
                      <span style={{ fontSize: 52, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2px', lineHeight: 1, fontFamily: "'DM Sans', sans-serif" }}>
                        ${annual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: 14, color: '#6e6e73', fontWeight: 500 }}>{isAr ? '/ شهرياً' : '/ mo'}</span>
                        {annual && <span style={{ fontSize: 12, color: '#34c759', fontWeight: 600 }}>{isAr ? 'يُدفع سنوياً' : 'billed annually'}</span>}
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: 40, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', lineHeight: 1, marginBottom: 28 }}>{isAr ? 'مخصص' : 'Custom'}</div>
                  )}

                  <button onClick={() => window.location.href = plan.name === 'Enterprise' || plan.name === 'الشركات' ? 'mailto:hello@dealflow-ai.com' : '/login'}
                    style={{ width: '100%', height: 48, borderRadius: 24, border: plan.popular ? 'none' : '1px solid rgba(0,0,0,0.12)', background: plan.popular ? plan.color : 'transparent', color: plan.popular ? '#fff' : '#1d1d1f', fontSize: 15, fontWeight: 600, marginBottom: 32, transition: 'all 0.2s' }}>
                    {plan.cta}
                  </button>

                  {/* Feature groups */}
                  {Object.entries(plan.features).map(([group, items]) => (
                    <div key={group} style={{ marginBottom: 20 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#aeaeb2', letterSpacing: isAr ? '0' : '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{group}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {items.map((item, j) => (
                          <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            {item.included ? <CheckIcon color={plan.color} /> : <XIcon />}
                            <span style={{ fontSize: 13, color: item.included ? '#1d1d1f' : '#aeaeb2', lineHeight: 1.4, fontWeight: 500 }}>{item.name}</span>
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
              <h2 className="serif" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: isAr ? 700 : 400, letterSpacing: '-1px', lineHeight: 1.1, fontFamily: isAr ? 'inherit' : 'inherit' }}>
                {isAr ? 'كيف نقارن بغيرنا؟' : 'How do we compare?'}
              </h2>
            </div>

            <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, auto)', gap: 0, background: '#1d1d1f', padding: '16px 28px' }}>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>{isAr ? 'الميزة' : 'Feature'}</div>
                {['DealFlow AI', 'Manual Notes', 'Gong', 'Chorus'].map(name => (
                  <div key={name} style={{ fontSize: 13, fontWeight: 600, color: name === 'DealFlow AI' ? '#0071e3' : 'rgba(255,255,255,0.5)', textAlign: 'center', minWidth: 100, fontFamily: "'DM Sans', sans-serif" }}>{name}</div>
                ))}
              </div>

              {[
                { feature: isAr ? 'دعم اللغة العربية بلهجاتها' : 'Arabic language support', values: [true, false, false, false] },
                { feature: isAr ? 'تدريب فوري بالذكاء الاصطناعي' : 'Real-time AI coaching', values: [true, false, true, true] },
                { feature: isAr ? 'متابعة تلقائية عبر واتساب' : 'WhatsApp follow-ups', values: [true, false, false, false] },
                { feature: isAr ? 'ملخص تحضيري قبل المكالمة' : 'Pre-call AI brief', values: [true, false, false, false] },
                { feature: isAr ? 'مصمم لسوق الشرق الأوسط' : 'Built for MENA market', values: [true, false, false, false] },
                { feature: isAr ? 'لا يوجد تسعير لكل وكيل' : 'No per-seat pricing', values: [true, false, false, false] },
                { feature: isAr ? 'تجربة مجانية' : 'Free trial', values: [true, true, false, false] },
              ].map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr repeat(4, auto)', gap: 0, padding: '14px 28px', borderBottom: i < 6 ? '1px solid rgba(0,0,0,0.06)' : 'none', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <div style={{ fontSize: 14, color: '#1d1d1f', fontWeight: 500 }}>{row.feature}</div>
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
              <h2 className="serif" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: isAr ? 700 : 400, letterSpacing: '-1px', lineHeight: 1.1, fontFamily: isAr ? 'inherit' : 'inherit' }}>
                {isAr ? 'أسئلة الأسعار' : 'Pricing questions'}
              </h2>
            </div>
            {faqs.map((faq, i) => {
              const [open, setOpen] = useState(false)
              return (
                <div key={i} className="faq-item">
                  <button onClick={() => setOpen(!open)}
                    style={{ width: '100%', padding: '22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', textAlign: isAr ? 'right' : 'left', color: '#1d1d1f', fontSize: 16, fontWeight: 600 }}>
                    {faq.q}
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'none', marginLeft: isAr ? 0 : 16, marginRight: isAr ? 16 : 0 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </div>
                  </button>
                  {open && <div style={{ paddingBottom: 22, fontSize: 15, color: '#6e6e73', lineHeight: 1.7, fontWeight: 500 }}>{faq.a}</div>}
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
            <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: isAr ? 700 : 400, letterSpacing: '-1px', lineHeight: 1.1, color: '#fff', marginBottom: 16, fontFamily: isAr ? 'inherit' : 'inherit' }}>
              {isAr ? 'ابدأ تجربتك المجانية اليوم' : 'Start your free trial today'}
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', marginBottom: 36, fontWeight: 500 }}>
              {isAr ? '14 يوماً. وصول كامل. لا حاجة لبطاقة ائتمان.' : '14 days. Full access. No card needed.'}
            </p>
            <button onClick={() => window.location.href = '/login'}
              style={{ height: 52, padding: '0 36px', borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 700 }}>
              {tr.common.getStarted}
            </button>
          </div>
        </section>

      </main>

      <MarketingFooter />
    </>
  )
}