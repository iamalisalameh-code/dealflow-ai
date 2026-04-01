'use client'
import { useState, useEffect } from 'react'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'

export default function MobileLanding() {
  const [billingAnnual, setBillingAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Step 1 — Add language detection
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
  const features = [
    { 
      icon: '🎙', 
      title: isAr ? 'نسخ مباشر للمكالمات' : 'Live Transcription', 
      desc: isAr ? 'تحويل الكلام إلى نص في الوقت الفعلي باللغتين الإنجليزية والعربية.' : 'Real-time speech-to-text in English and Arabic. Every word captured instantly.', 
      color: '#0071e3' 
    },
    { 
      icon: '📊', 
      title: isAr ? 'مدرب الصفقات الذكي' : 'AI Deal Coach', 
      desc: isAr ? 'رؤى فورية، تعامل مع الاعتراضات، ونتائج صحة الصفقات أثناء تحدثك.' : 'Real-time insights, objection handling, and deal health scores as you speak.', 
      color: '#34c759' 
    },
    { 
      icon: '⚡', 
      title: isAr ? 'إشارات الشراء' : 'Buying Signals', 
      desc: isAr ? 'لا تفوت أي إشارة. يقوم الذكاء الاصطناعي بتحديد نية الشراء فوراً.' : 'Never miss a signal. AI flags purchase intent in real time.', 
      color: '#ff9f0a' 
    },
    { 
      icon: '💬', 
      title: isAr ? 'متابعة ذكية' : 'Smart Follow-ups', 
      desc: isAr ? 'توليد رسائل واتساب وبريد إلكتروني مخصصة تلقائياً وفوراً.' : 'Auto-generate personalized WhatsApp and email follow-ups instantly.', 
      color: '#bf5af2' 
    },
    { 
      icon: '👥', 
      title: isAr ? 'إدارة الفريق' : 'Team Management', 
      desc: isAr ? 'ادعُ الوكلاء، حدد الحدود، وتتبع أداء فريقك بالكامل.' : 'Invite agents, set limits, track your whole team performance.', 
      color: '#ff453a' 
    },
    { 
      icon: '📹', 
      title: isAr ? 'Google Meet و Zoom' : 'Google Meet & Zoom', 
      desc: isAr ? 'يعمل مع أدوات الاجتماعات الحالية لديك بنقرة واحدة.' : 'Works with your existing meeting tools with one click.', 
      color: '#0071e3' 
    },
  ]

  const plans = [
    { 
      name: isAr ? 'فردي' : 'Solo', 
      price: billingAnnual ? 39 : 49, color: '#0071e3', popular: false,
      features: isAr ? ['تسجيل مكالمات غير محدود', 'تدريب ذكاء اصطناعي مباشر', 'دعم العربية والإنجليزية', 'متابعات ذكية', 'ملخص ما قبل المكالمة', 'CRM للمخاطبين'] : ['Unlimited call recordings', 'Live AI coaching', 'Arabic + English', 'Smart follow-ups', 'Pre-call brief', 'Contact CRM'] 
    },
    { 
      name: isAr ? 'فريق' : 'Team', 
      price: billingAnnual ? 79 : 99, color: '#bf5af2', popular: true,
      features: isAr ? ['كل ما في الخطة الفردية', 'حتى 10 وكلاء', 'لوحة تحكم الفريق', 'تحكم في صلاحيات الوكيل', 'دعم فني ذو أولوية'] : ['Everything in Solo', 'Up to 10 agents', 'Team dashboard', 'Per-agent controls', 'Priority support'] 
    },
  ]

  const faqs = [
    { 
      q: isAr ? 'هل يعمل مع Google Meet؟' : 'Does it work with Google Meet?', 
      a: isAr ? 'نعم — يعمل مع Google Meet و Zoom و Microsoft Teams بنقرة واحدة.' : 'Yes — works with Google Meet, Zoom, and Microsoft Teams. One click to start.' 
    },
    { 
      q: isAr ? 'ما مدى دقة اللغة العربية؟' : 'How accurate is Arabic?', 
      a: isAr ? 'نستخدم محرك Google Cloud Speech v2 مع دعم اللهجة الخليجية. الدقة تتجاوز 90%.' : 'We use Google Cloud Speech v2 with Gulf Arabic support. Accuracy typically above 90%.' 
    },
    { 
      q: isAr ? 'هل بياناتي آمنة؟' : 'Is my data secure?', 
      a: isAr ? 'جميع البيانات مشفرة أثناء النقل والحفظ. لا نقوم بتدريب نماذجنا على مكالماتك.' : 'All data encrypted in transit and at rest. We never train on your calls.' 
    },
    { 
      q: isAr ? 'تفاصيل التجربة المجانية؟' : 'Free trial details?', 
      a: isAr ? 'وصول كامل لمدة 14 يوماً، لا يلزم وجود بطاقة ائتمان. يمكنك الإلغاء في أي وقت.' : '14 days full access, no credit card required. Cancel anytime.' 
    },
  ]

  const stats = [
    [isAr ? '34%' : '34%', isAr ? 'زيادة الإغلاق' : 'Close rate'],
    [isAr ? '91%' : '91%', isAr ? 'دقة العربية' : 'AR accuracy'],
    [isAr ? '14 يوماً' : '14 days', isAr ? 'تجربة مجانية' : 'Free trial']
  ]

  return (
    // Step 3 — Add direction and font-family to the main wrapper
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { background: #fff; color: #1d1d1f; -webkit-font-smoothing: antialiased; }
        .serif { font-family: 'DM Serif Display', serif; }
        html[dir="rtl"] .serif { font-family: 'Noto Sans Arabic', sans-serif; font-weight: 700; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .fade-up { animation: fadeUp 0.5s ease both; }
        .fade-up-1 { animation: fadeUp 0.5s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.5s ease 0.2s both; }
        .tap-btn { transition: transform 0.15s, opacity 0.15s; }
        .tap-btn:active { transform: scale(0.97); opacity: 0.85; }
      `}</style>

      {/* STICKY NAV */}
      <MobileNav activePage="landing" />

      {/* HERO */}
      <section style={{ padding: '48px 24px 40px', background: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '80%', height: '60%', borderRadius: '50%', background: '#0071e3', filter: 'blur(80px)', opacity: 0.06, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-20%', width: '60%', height: '50%', borderRadius: '50%', background: '#bf5af2', filter: 'blur(80px)', opacity: 0.05, pointerEvents: 'none' }} />

        {/* Badge */}
        <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: 'rgba(0,113,227,0.08)', border: '1px solid rgba(0,113,227,0.15)', marginBottom: 24 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34c759', animation: 'pulse 1.5s infinite' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#0071e3' }}>{isAr ? 'يدعم العربية والإنجليزية' : 'Arabic & English supported'}</span>
        </div>

        <h1 className="fade-up-1 serif" style={{ fontSize: isAr ? 32 : 40, fontWeight: 400, lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 16 }}>
          {isAr ? 'أغلق المزيد من الصفقات مع' : 'Close more deals'}<br />
          <span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'ذكاء اصطناعي يستمع' : 'AI that listens'}</span>
        </h1>

        <p className="fade-up-2" style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6, marginBottom: 32, maxWidth: 320, margin: '0 auto 32px' }}>
          {isAr ? 'تدريب مباشر، تعامل مع الاعتراضات، ورؤى الصفقات — بالإنجليزية والعربية.' : 'Real-time coaching, objection handling, and deal insights — in English and Arabic.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320, margin: '0 auto' }}>
          <button className="tap-btn" onClick={() => window.location.href = '/login'}
            style={{ height: 52, borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>
            {isAr ? 'ابدأ التجربة المجانية ←' : 'Start Free Trial →'}
          </button>
          <button className="tap-btn" onClick={() => document.getElementById('features-mobile')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ height: 52, borderRadius: 26, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 16, fontWeight: 500, fontFamily: 'inherit' }}>
            {isAr ? 'شاهد كيف يعمل' : 'See how it works'}
          </button>
        </div>

        {/* Mini stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 40, maxWidth: 340, margin: '40px auto 0' }}>
          {stats.map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center', padding: '12px 8px', borderRadius: 16, background: '#f5f5f7' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.5px' }}>{val}</div>
              <div style={{ fontSize: 11, color: '#6e6e73', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE DEMO CARD */}
      <section style={{ padding: '0 20px 40px' }}>
        <div style={{ borderRadius: 24, overflow: 'hidden', background: '#000', border: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Header */}
          <div style={{ background: '#111', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6, flexDirection: isAr ? 'row-reverse' : 'row' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#ff453a','#ff9f0a','#34c759'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
            </div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', [isAr ? 'marginRight' : 'marginLeft']: 8 }}>
              {isAr ? 'مكالمة مباشرة · أحمد المنصوري' : 'Live Call · Ahmed Al-Mansouri'}
            </span>
          </div>
          {/* Content */}
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Call info */}
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isAr ? 'row-reverse' : 'row' }}>
              <div style={{ textAlign: isAr ? 'right' : 'left' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{isAr ? 'مكالمة مباشرة' : 'LIVE CALL'}</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#fff', letterSpacing: '-0.5px' }}>{isAr ? 'إعمار العقارية' : 'Emirates Properties'}</div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 300, color: '#34c759' }}>02:47</div>
            </div>
            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[
                [isAr ? 'صحة الصفقة' : 'DEAL HEALTH', '87%', '#34c759'], 
                [isAr ? 'إشارات' : 'SIGNALS', '3', '#ff9f0a'], 
                [isAr ? 'المؤشر' : 'SCORE', '8.4', '#0071e3']
              ].map(([label, val, color]) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '10px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color }}>{val}</div>
                </div>
              ))}
            </div>
            {/* Transcript */}
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '12px 14px', textAlign: isAr ? 'right' : 'left' }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>{isAr ? 'النص المباشر' : 'LIVE TRANSCRIPT'}</div>
              <div style={{ fontSize: 10, color: '#34c759', fontWeight: 700, marginBottom: 4 }}>{isAr ? 'أحمد' : 'AHMED'}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                {isAr ? 'ما هي خطة الدفع للوحدة المكونة من غرفتين؟' : "What's the payment plan for the 2-bedroom unit?"}
              </div>
              <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 8, background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.2)' }}>
                <span style={{ fontSize: 11, color: '#34c759' }}>⚡ {isAr ? 'تم اكتشاف إشارة شراء' : 'Buying signal detected'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features-mobile" style={{ padding: '40px 20px', background: '#f5f5f7' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>{isAr ? 'كل ما تحتاجه' : 'Everything you need'}</div>
          <h2 className="serif" style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.1 }}>
            {isAr ? 'شريك مبيعاتك الذكي،' : 'Your AI sales partner,'}<br /><span style={{ fontStyle: 'italic' }}>{isAr ? 'دائماً معك' : 'always on'}</span>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 20, padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', flexDirection: isAr ? 'row-reverse' : 'row' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: f.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
              <div style={{ textAlign: isAr ? 'right' : 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f', marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: '#6e6e73', lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ARABIC HIGHLIGHT */}
      <section style={{ padding: '40px 20px', background: '#fff' }}>
        <div style={{ borderRadius: 24, background: 'linear-gradient(135deg, rgba(191,90,242,0.06), rgba(0,113,227,0.04))', border: '1px solid rgba(191,90,242,0.12)', padding: '28px 20px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#bf5af2', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, textAlign: isAr ? 'right' : 'left' }}>
            {isAr ? 'بني للمنطقة' : 'Built for the region'}
          </div>
          <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: 8, direction: 'rtl', textAlign: 'right' }}>
            نظام ذكاء اصطناعي<br /><span style={{ fontStyle: 'italic', color: '#bf5af2' }}>يفهم العربية</span>
          </h2>
          <p style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.7, marginBottom: 20, textAlign: isAr ? 'right' : 'left' }}>
            {isAr 
              ? 'واجهة كاملة تدعم العربية، التعرف على اللهجة الخليجية، وتدريب ذكاء اصطناعي بالعربية. بني خصيصاً لفرق المبيعات في الإمارات والمنطقة.' 
              : 'Full RTL interface, Gulf Arabic dialect recognition, and AI coaching in Arabic. Built for UAE and MENA sales teams.'}
          </p>
          {[
            isAr ? 'دعم اللهجة الخليجية' : 'Gulf Arabic dialect support', 
            isAr ? 'واجهة عربية بالكامل' : 'Full RTL interface', 
            isAr ? 'تدريب ذكاء اصطناعي بالعربية' : 'Arabic AI coaching', 
            isAr ? 'متابعات واتساب بالعربية' : 'Arabic WhatsApp follow-ups'
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexDirection: isAr ? 'row-reverse' : 'row' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(191,90,242,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#bf5af2" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span style={{ fontSize: 14, color: '#1d1d1f', fontWeight: 500 }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: '40px 20px', background: '#f5f5f7' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>{isAr ? 'الأسعار' : 'Pricing'}</div>
          <h2 className="serif" style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-1px', marginBottom: 8 }}>
            {isAr ? 'أسعار' : 'Simple,'}<br /><span style={{ fontStyle: 'italic' }}>{isAr ? 'بسيطة وشفافة' : 'transparent pricing'}</span>
          </h2>
          <p style={{ fontSize: 14, color: '#6e6e73', marginBottom: 20 }}>{isAr ? 'تجربة 14 يوماً مجاناً. لا يلزم بطاقة ائتمان.' : '14-day free trial. No credit card.'}</p>
          
          {/* Toggle */}
          <div style={{ display: 'inline-flex', padding: 4, borderRadius: 20, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', flexDirection: isAr ? 'row-reverse' : 'row' }}>
            {[isAr ? 'شهري' : 'Monthly', isAr ? 'سنوي' : 'Annual'].map((label, i) => (
              <button key={label} onClick={() => setBillingAnnual(i === 1)}
                style={{ height: 34, padding: '0 18px', borderRadius: 16, border: 'none', background: billingAnnual === (i === 1) ? '#1d1d1f' : 'transparent', color: billingAnnual === (i === 1) ? '#fff' : '#6e6e73', fontSize: 13, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
                {label}
                {i === 1 && <span style={{ fontSize: 10, fontWeight: 700, color: '#34c759' }}>-20%</span>}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {plans.map((plan, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 24, padding: '24px 20px', border: plan.popular ? `2px solid ${plan.color}` : '1px solid rgba(0,0,0,0.06)', position: 'relative' }}>
              {plan.popular && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', padding: '3px 14px', borderRadius: 12, background: plan.color, color: '#fff', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>{isAr ? 'الأكثر شيوعاً' : 'Most Popular'}</div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexDirection: isAr ? 'row-reverse' : 'row' }}>
                <div style={{ textAlign: isAr ? 'right' : 'left' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: plan.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{plan.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, flexDirection: isAr ? 'row-reverse' : 'row' }}>
                    <span style={{ fontSize: 13, color: '#6e6e73' }}>$</span>
                    <span style={{ fontSize: 44, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2px', lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ fontSize: 13, color: '#6e6e73' }}>/{isAr ? 'شهر' : 'mo'}</span>
                  </div>
                </div>
                <button className="tap-btn" onClick={() => window.location.href = '/login'}
                  style={{ height: 40, padding: '0 18px', borderRadius: 20, border: 'none', background: plan.popular ? plan.color : '#f5f5f7', color: plan.popular ? '#fff' : '#1d1d1f', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', flexShrink: 0 }}>
                  {isAr ? 'ابدأ مجاناً ←' : 'Start Free →'}
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, flexDirection: isAr ? 'row-reverse' : 'row' }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: plan.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize: 13, color: '#1d1d1f' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* Enterprise */}
          <div style={{ background: '#1d1d1f', borderRadius: 24, padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isAr ? 'row-reverse' : 'row' }}>
            <div style={{ textAlign: isAr ? 'right' : 'left' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#ff9f0a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{isAr ? 'مؤسسات' : 'Enterprise'}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{isAr ? 'أسعار مخصصة للفرق الكبيرة' : 'Custom pricing for large teams'}</div>
            </div>
            <button className="tap-btn" onClick={() => window.location.href = '/contact'}
              style={{ height: 40, padding: '0 16px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', flexShrink: 0 }}>
              {isAr ? 'اتصل بنا ←' : 'Contact →'}
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '40px 20px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 className="serif" style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.1 }}>
            {isAr ? 'محبوب من قبل فرق ' : 'Loved by sales'}<br /><span style={{ fontStyle: 'italic' }}>{isAr ? 'المبيعات في المنطقة' : 'teams in MENA'}</span>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {testimonials(isAr).map((t, i) => (
            <div key={i} style={{ background: '#f5f5f7', borderRadius: 20, padding: '20px', textAlign: isAr ? 'right' : 'left' }}>
              <div style={{ display: 'flex', gap: 3, marginBottom: 12, justifyContent: isAr ? 'flex-start' : 'flex-start' }}>
                {[...Array(5)].map((_, j) => <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#ff9f0a" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
              </div>
              <p style={{ fontSize: 14, color: '#1d1d1f', lineHeight: 1.6, marginBottom: 14, fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isAr ? 'row-reverse' : 'row' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1f' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: '#6e6e73' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '40px 20px', background: '#f5f5f7' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 className="serif" style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-1px' }}>
            {isAr ? 'أسئلة ' : 'Common '}<span style={{ fontStyle: 'italic' }}>{isAr ? 'شائعة' : 'questions'}</span>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, background: '#fff', borderRadius: 20, overflow: 'hidden' }}>
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
        <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '70%', height: '70%', borderRadius: '50%', background: '#0071e3', filter: 'blur(80px)', opacity: 0.15, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-20%', width: '60%', height: '60%', borderRadius: '50%', background: '#bf5af2', filter: 'blur(80px)', opacity: 0.12, pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#fff', marginBottom: 12 }}>
            {isAr ? 'هل أنت مستعد لإغلاق' : 'Ready to close'}<br /><span style={{ fontStyle: 'italic', color: '#34c759' }}>{isAr ? 'المزيد من الصفقات؟' : 'more deals?'}</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>{isAr ? 'تجربة 14 يوماً مجاناً. لا يلزم بطاقة.' : '14-day free trial. No credit card.'}</p>
          <button className="tap-btn" onClick={() => window.location.href = '/login'}
            style={{ width: '100%', maxWidth: 300, height: 52, borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', marginBottom: 12 }}>
            {isAr ? 'ابدأ مجاناً الآن ←' : 'Get Started Free →'}
          </button>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>{isAr ? 'لا يلزم بطاقة ائتمان · إلغاء في أي وقت' : 'No credit card · Cancel anytime'}</div>
        </div>
      </section>

      <MobileFooter />
    </div>
  )
}

function testimonials(isAr: boolean) {
  return [
    { name: isAr ? 'محمد الراشد' : 'Mohammed Al-Rashid', role: isAr ? 'وكيل عقاري أول · إعمار' : 'Senior RE Agent · Emaar', text: isAr ? 'النسخ العربي دقيق للغاية. ساعدني في إغلاق صفقات كنت سأخسرها سابقاً.' : 'The Arabic transcription is incredibly accurate. Helped me close deals I would have lost before.', avatar: 'MA', color: '#0071e3' },
    { name: isAr ? 'سارة ثومبسون' : 'Sarah Thompson', role: isAr ? 'مديرة مبيعات · تيك مينا' : 'Sales Director · Tech MENA', text: isAr ? 'ارتفع معدل إغلاق فريقنا بنسبة 34٪ في الشهر الأول. اكتشاف إشارات الشراء هو بمثابة حاسة سادسة.' : "Our team's close rate went up 34% in the first month. The buying signal detection is like a sixth sense.", avatar: 'ST', color: '#34c759' },
    { name: isAr ? 'خالد المنصوري' : 'Khalid Al-Mansoori', role: isAr ? 'وسيط تأمين · الخليج' : 'Insurance Broker · Gulf', text: isAr ? 'ميزة ملخص ما قبل المكالمة وحدها تستحق الاشتراك. مغير لقواعد اللعبة.' : 'The pre-call brief alone is worth the subscription. Game changer.', avatar: 'KA', color: '#bf5af2' },
  ]
}