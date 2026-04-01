'use client'
import { useState, useEffect } from 'react'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'

export default function MobilePricing() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Step 1 — Add language detection at the top of the component
  const [lang, setLang] = useState<'en' | 'ar'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('marketing_lang') as 'en' | 'ar') || 'en'
    }
    return 'en'
  })

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('marketing_lang') as 'en' | 'ar'
      if (saved) setLang(saved)
    }
    handleStorage()
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const isAr = lang === 'ar'

  // Step 2 — Wrap data objects with translations
  const plans = [
    {
      name: isAr ? 'فردي' : 'Solo', 
      tagline: isAr ? 'لوكلاء المبيعات الأفراد' : 'For individual agents',
      monthly: 49, annual: 39, color: '#0071e3', popular: false,
      features: isAr ? [
        'تسجيل مكالمات غير محدود',
        'تدريب مباشر بالذكاء الاصطناعي',
        'دعم العربية والإنجليزية',
        'متابعات ذكية',
        'ملخص ما قبل المكالمة',
        'سجل المكالمات',
        'تكامل مع CRM',
      ] : [
        'Unlimited call recordings',
        'Live AI coaching',
        'Arabic + English',
        'Smart follow-ups',
        'Pre-call brief',
        'Call history',
        'Contact CRM',
      ],
    },
    {
      name: isAr ? 'فريق' : 'Team', 
      tagline: isAr ? 'للفرق التي تسعى للفوز معاً' : 'For teams that win together',
      monthly: 99, annual: 79, color: '#bf5af2', popular: true,
      features: isAr ? [
        'كل ما تشمله الخطة الفردية',
        'حتى 10 وكلاء مبيعات',
        'لوحة تحكم الفريق',
        'تحكم في صلاحيات الوكيل',
        'إدارة حدود المكالمات',
        'دعم فني ذو أولوية',
      ] : [
        'Everything in Solo',
        'Up to 10 agents',
        'Team dashboard',
        'Per-agent controls',
        'Call limit management',
        'Priority support',
      ],
    },
    {
      name: isAr ? 'مؤسسات' : 'Enterprise', 
      tagline: isAr ? 'حلول مخصصة للمنظمات الكبيرة' : 'Custom for large orgs',
      monthly: null, annual: null, color: '#ff9f0a', popular: false,
      features: isAr ? [
        'كل ما تشمله خطة الفريق',
        'عدد وكلاء غير محدود',
        'تدريب مخصص للذكاء الاصطناعي',
        'مدير حساب مخصص',
        'تسجيل دخول موحد (SSO) وأمان متقدم',
        'وصول إلى API',
      ] : [
        'Everything in Team',
        'Unlimited agents',
        'Custom AI training',
        'Dedicated manager',
        'SSO & security',
        'API access',
      ],
    },
  ]

  const faqs = [
    { 
      q: isAr ? 'هل يمكنني تغيير خطتي لاحقاً؟' : 'Can I switch plans later?', 
      a: isAr ? 'نعم — يمكنك الترقية أو التنزيل في أي وقت. تدخل التغييرات حيز التنفيذ في دورة الفوترة التالية.' : 'Yes — upgrade or downgrade anytime. Changes take effect next billing cycle.' 
    },
    { 
      q: isAr ? 'ماذا يحدث بعد انتهاء الفترة التجريبية؟' : 'What happens after trial?', 
      a: isAr ? 'بعد 14 يوماً، اختر الخطة التي تناسبك. يتم الاحتفاظ ببياناتك لمدة 30 يوماً في حال إيقاف الحساب.' : 'After 14 days, choose a plan. Your data is kept for 30 days if you pause.' 
    },
    { 
      q: isAr ? 'هل توجد رسوم لكل وكيل؟' : 'Is there a per-agent fee?', 
      a: isAr ? 'لا — خطة الفريق تشمل حتى 10 وكلاء بسعر ثابت واحد.' : 'No — Team plan includes up to 10 agents at a flat rate.' 
    },
    { 
      q: isAr ? 'هل تقدمون استرداداً للأموال؟' : 'Do you offer refunds?', 
      a: isAr ? 'ضمان استرداد الأموال لمدة 30 يوماً. بدون طرح أي أسئلة.' : '30-day money back guarantee. No questions asked.' 
    },
    { 
      q: isAr ? 'هل يمكنني الدفع بالدرهم الإماراتي؟' : 'Can I pay in AED?', 
      a: isAr ? 'نعم — نقبل الدولار والدرهم الإماراتي. تواصل معنا للحصول على فواتير بالدرهم.' : 'Yes — we accept USD and AED. Contact us for AED invoicing.' 
    },
  ]

  return (
    // Step 3 — Add direction and font-family to main wrapper
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); 
        
        * { margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent; } 
        body{background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} 
        
        .serif{font-family:'DM Serif Display',serif;} 
        html[dir="rtl"] .serif { font-family: 'Noto Sans Arabic', sans-serif; font-weight: 700; }

        .tap-btn{transition:transform 0.15s,opacity 0.15s;} 
        .tap-btn:active{transform:scale(0.97);opacity:0.85;}
      `}</style>
      
      <MobileNav activePage="pricing" />

      {/* Hero */}
      <section style={{ padding: '40px 24px 32px', textAlign: 'center', background: '#fff' }}>
        <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 20, background: 'rgba(0,113,227,0.08)', border: '1px solid rgba(0,113,227,0.15)', marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#0071e3' }}>
            {isAr ? 'تجربة مجانية لمدة 14 يوماً · بدون بطاقة ائتمان' : '14-day free trial · No credit card'}
          </span>
        </div>
        <h1 className="serif" style={{ fontSize: isAr ? 32 : 38, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 12 }}>
          {isAr ? 'أسعار بسيطة ' : 'Simple,'}<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'وشفافة للجميع' : 'transparent pricing'}</span>
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', marginBottom: 24 }}>
          {isAr ? 'سعر واحد. يشمل كل شيء.' : 'One price. Everything included.'}
        </p>

        {/* Toggle */}
        <div style={{ display: 'inline-flex', padding: 4, borderRadius: 20, background: '#f5f5f7', flexDirection: isAr ? 'row-reverse' : 'row' }}>
          {[isAr ? 'شهري' : 'Monthly', isAr ? 'سنوي' : 'Annual'].map((label, i) => (
            <button key={label} onClick={() => setAnnual(i === 1)}
              style={{ height: 36, padding: '0 20px', borderRadius: 16, border: 'none', background: annual === (i === 1) ? '#1d1d1f' : 'transparent', color: annual === (i === 1) ? '#fff' : '#6e6e73', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
              {label}
              {i === 1 && <span style={{ fontSize: 10, fontWeight: 700, color: '#34c759' }}>-20%</span>}
            </button>
          ))}
        </div>
      </section>

      {/* Plan cards */}
      <section style={{ padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {plans.map((plan, i) => (
          <div key={i} style={{ borderRadius: 24, padding: '24px 20px', border: plan.popular ? `2px solid ${plan.color}` : '1px solid rgba(0,0,0,0.08)', position: 'relative', background: '#fff', textAlign: isAr ? 'right' : 'left' }}>
            {plan.popular && (
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', padding: '3px 16px', borderRadius: 12, background: plan.color, color: '#fff', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>
                {isAr ? 'الأكثر شيوعاً' : 'Most Popular'}
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: plan.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{plan.name}</div>
              <div style={{ fontSize: 13, color: '#6e6e73', marginBottom: 14 }}>{plan.tagline}</div>
              {plan.monthly ? (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 16, flexDirection: isAr ? 'row-reverse' : 'row', justifyContent: isAr ? 'flex-start' : 'flex-start' }}>
                  <span style={{ fontSize: 13, color: '#6e6e73' }}>$</span>
                  <span style={{ fontSize: 48, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2px', lineHeight: 1 }}>{annual ? plan.annual : plan.monthly}</span>
                  <span style={{ fontSize: 13, color: '#6e6e73' }}>/{isAr ? 'شهر' : 'mo'}</span>
                  {annual && <span style={{ fontSize: 11, color: '#34c759', fontWeight: 600, marginInlineStart: 8 }}>{isAr ? 'فوترة سنوية' : 'billed annually'}</span>}
                </div>
              ) : (
                <div style={{ fontSize: 36, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px', marginBottom: 16 }}>
                  {isAr ? 'مخصص' : 'Custom'}
                </div>
              )}
              <button className="tap-btn" onClick={() => window.location.href = plan.name === (isAr ? 'مؤسسات' : 'Enterprise') ? '/contact' : '/login'}
                style={{ width: '100%', height: 48, borderRadius: 24, border: plan.popular ? 'none' : '1px solid rgba(0,0,0,0.12)', background: plan.popular ? plan.color : 'transparent', color: plan.popular ? '#fff' : '#1d1d1f', fontSize: 15, fontWeight: 600, fontFamily: 'inherit' }}>
                {plan.name === (isAr ? 'مؤسسات' : 'Enterprise') ? (isAr ? 'اتصل بالمبيعات' : 'Contact Sales') : (isAr ? 'ابدأ التجربة المجانية' : 'Start Free Trial')}
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {plan.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isAr ? 'row-reverse' : 'row' }}>
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
            {isAr ? 'أسئلة حول ' : 'Pricing '}<span style={{ fontStyle: 'italic' }}>{isAr ? 'الأسعار' : 'questions'}</span>
          </h2>
        </div>
        <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', textAlign: isAr ? 'right' : 'left', color: '#1d1d1f', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', gap: 12, flexDirection: isAr ? 'row-reverse' : 'row' }}>
                <span>{faq.q}</span>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
              </button>
              {openFaq === i && <div style={{ padding: '0 20px 18px', fontSize: 14, color: '#6e6e73', lineHeight: 1.7, textAlign: isAr ? 'right' : 'left' }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '48px 20px', background: '#1d1d1f', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: '60%', height: '60%', borderRadius: '50%', background: '#bf5af2', filter: 'blur(80px)', opacity: 0.12, pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="serif" style={{ fontSize: 34, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#fff', marginBottom: 12 }}>
            {isAr ? 'ابدأ تجربتك ' : 'Start your'}<br /><span style={{ fontStyle: 'italic', color: '#34c759' }}>{isAr ? 'المجانية اليوم' : 'free trial today'}</span>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
            {isAr ? '14 يوماً. وصول كامل. لا يلزم بطاقة.' : '14 days. Full access. No card.'}
          </p>
          <button className="tap-btn" onClick={() => window.location.href = '/login'}
            style={{ width: '100%', maxWidth: 300, height: 52, borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>
            {isAr ? 'ابدأ مجاناً الآن ←' : 'Get Started Free →'}
          </button>
        </div>
      </section>

      <MobileFooter />
    </div>
  )
}