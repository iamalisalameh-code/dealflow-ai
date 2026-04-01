'use client'
import { useState, useEffect } from 'react'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'

export default function MobileHowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  // Step 1: Add language detection
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

  // Step 2: Wrap data objects with translations
  const steps = [
    { 
      number: '01', 
      title: isAr ? 'ابدأ مكالمتك' : 'Start your call', 
      desc: isAr ? 'اختر جهة الاتصال وابدأ مكالمة عبر الميكروفون أو Google Meet. ينشط الذكاء الاصطناعي فوراً.' : 'Select your contact and start a call via microphone or Google Meet. AI activates instantly.', 
      color: '#0071e3', 
      detail: isAr ? 'يعمل مع Google Meet أو Zoom أو Teams أو الميكروفون.' : 'Works with Google Meet, Zoom, Teams, or your mic.' 
    },
    { 
      number: '02', 
      title: isAr ? 'الذكاء الاصطناعي يستمع ويدرب' : 'AI listens & coaches', 
      desc: isAr ? 'يتم نسخ كل كلمة في الوقت الفعلي. يكتشف الذكاء الاصطناعي الاعتراضات وإشارات الشراء ويقدم تدريباً مباشراً.' : 'Every word transcribed in real time. AI detects objections, buying signals, and gives live coaching.', 
      color: '#34c759', 
      detail: isAr ? 'تحديث مؤشر صحة الصفقة مباشرة. تحديد الاعتراضات فوراً.' : 'Deal health score updates live. Objections flagged instantly.' 
    },
    { 
      number: '03', 
      title: isAr ? 'أغلق الصفقة وتابع' : 'Close & follow up', 
      desc: isAr ? 'احصل على ملخص تدريبي كامل ومتابعة جاهزة للإرسال عبر واتساب أو البريد الإلكتروني.' : 'Get a full coaching summary and auto-generated WhatsApp or email follow-up ready to send.', 
      color: '#bf5af2', 
      detail: isAr ? 'تحديث تلقائي لـ CRM. متابعة مخصصة بناءً على المحادثة.' : 'CRM auto-updates. Follow-up personalized to the conversation.' 
    },
  ]

  const stats = [
    { value: '34%', label: isAr ? 'زيادة في معدل الإغلاق' : 'Close rate increase', color: '#0071e3' },
    { value: '2.4×', label: isAr ? 'متابعات أسرع' : 'Faster follow-ups', color: '#34c759' },
    { value: '91%', label: isAr ? 'دقة اللغة العربية' : 'Arabic accuracy', color: '#bf5af2' },
    { value: '8 min', label: isAr ? 'توفير لكل مكالمة' : 'Saved per call', color: '#ff9f0a' },
    { value: '3×', label: isAr ? 'إشارات شراء أكثر' : 'More signals caught', color: '#ff453a' },
    { value: '14 days', label: isAr ? 'تجربة مجانية' : 'Free trial', color: '#0071e3' },
  ]

  const integrations = [
    { name: 'Google Meet', color: '#0071e3' }, { name: 'Zoom', color: '#2D8CFF' },
    { name: 'MS Teams', color: '#5059C9' }, { name: 'WhatsApp', color: '#25D366' },
    { name: 'Gmail', color: '#EA4335' }, { name: 'Google Cloud', color: '#4285F4' },
    { name: 'Gemini AI', color: '#8E75F0' }, { name: 'Supabase', color: '#3ECF8E' },
  ]

  return (
    // Step 3: Add direction and font-family to main wrapper
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
      
      <MobileNav activePage="how-it-works" />

      {/* Hero */}
      <section style={{ padding: '40px 24px 32px', textAlign: 'center', background: '#fff' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: 'rgba(52,199,89,0.08)', border: '1px solid rgba(52,199,89,0.15)', marginBottom: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34c759' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#34c759' }}>
            {isAr ? 'جولة مباشرة في المنتج' : 'Live product walkthrough'}
          </span>
        </div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 14 }}>
          {isAr ? 'كيف يعمل ' : 'How DealFlow AI'}<br />
          <span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'DealFlow AI من أجلك' : 'works for you'}</span>
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6 }}>
          {isAr ? 'ثلاث خطوات بسيطة من أول اتصال حتى إغلاق الصفقة.' : 'Three simple steps from cold call to closed deal.'}
        </p>
      </section>

      {/* Steps */}
      <section style={{ padding: '0 20px 40px', background: '#fff' }}>
        {/* Step dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24, flexDirection: isAr ? 'row-reverse' : 'row' }}>
          {steps.map((s, i) => (
            <div key={i} onClick={() => setActiveStep(i)}
              style={{ height: 4, borderRadius: 2, background: activeStep === i ? steps[i].color : 'rgba(0,0,0,0.1)', transition: 'all 0.3s', width: activeStep === i ? 32 : 16, cursor: 'pointer' }} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {steps.map((step, i) => (
            <div key={i} onClick={() => setActiveStep(i)}
              style={{ borderRadius: 20, padding: '20px', border: `1px solid ${activeStep === i ? step.color + '30' : 'rgba(0,0,0,0.06)'}`, background: activeStep === i ? step.color + '04' : '#f5f5f7', cursor: 'pointer', transition: 'all 0.3s', textAlign: isAr ? 'right' : 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: activeStep === i ? 10 : 0, flexDirection: isAr ? 'row-reverse' : 'row' }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: activeStep === i ? step.color : 'rgba(0,0,0,0.15)', letterSpacing: '-1px', lineHeight: 1, fontFamily: 'DM Serif Display, serif', flexShrink: 0 }}>{step.number}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', marginBottom: 4 }}>{step.title}</div>
                  <div style={{ fontSize: 13, color: '#6e6e73', lineHeight: 1.5 }}>{step.desc}</div>
                </div>
              </div>
              {activeStep === i && (
                <div style={{ marginTop: 10, padding: '8px 12px', borderRadius: 10, background: step.color + '10', border: `1px solid ${step.color}20` }}>
                  <span style={{ fontSize: 12, color: step.color, fontWeight: 500 }}>{step.detail}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="tap-btn" onClick={() => window.location.href = '/login'}
          style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', marginTop: 24 }}>
          {isAr ? 'جربه مجاناً لمدة 14 يوماً ←' : 'Try free for 14 days →'}
        </button>
      </section>

      {/* Stats */}
      <section style={{ padding: '40px 20px', background: '#f5f5f7' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
            {isAr ? 'بالأرقام' : 'By the numbers'}
          </div>
          <h2 className="serif" style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.1 }}>
            {isAr ? 'نتائج تتحدث ' : 'Results that'}<br /><span style={{ fontStyle: 'italic' }}>{isAr ? 'عن نفسها' : 'speak for themselves'}</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 20, padding: '20px 16px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: stat.color, letterSpacing: '-1.5px', lineHeight: 1, marginBottom: 6, fontFamily: 'DM Serif Display, serif' }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: '#6e6e73', lineHeight: 1.4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section style={{ padding: '40px 20px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
            {isAr ? 'التكاملات' : 'Integrations'}
          </div>
          <h2 className="serif" style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.1 }}>
            {isAr ? 'يعمل مع الأدوات التي ' : 'Works with tools'}<br /><span style={{ fontStyle: 'italic' }}>{isAr ? 'تستخدمها بالفعل' : 'you already use'}</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {integrations.map((int, i) => (
            <div key={i} style={{ background: '#f5f5f7', borderRadius: 16, padding: '16px', display: 'flex', alignItems: 'center', gap: 10, flexDirection: isAr ? 'row-reverse' : 'row' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: int.color, flexShrink: 0 }} />
              <span style={{ fontSize: 14, fontWeight: 500, color: '#1d1d1f' }}>{int.name}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: '16px', borderRadius: 16, background: '#f5f5f7', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#aeaeb2', marginBottom: 8, fontWeight: 700 }}>
            {isAr ? 'قريباً' : 'COMING SOON'}
          </div>
          <div style={{ fontSize: 13, color: '#6e6e73' }}>Salesforce · HubSpot · Pipedrive · Slack · Notion</div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '48px 20px', background: '#1d1d1f', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '70%', height: '70%', borderRadius: '50%', background: '#0071e3', filter: 'blur(80px)', opacity: 0.15, pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="serif" style={{ fontSize: 34, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#fff', marginBottom: 12 }}>
            {isAr ? 'ابدأ بإغلاق ' : 'Start closing'}<br /><span style={{ fontStyle: 'italic', color: '#34c759' }}>{isAr ? 'المزيد من الصفقات اليوم' : 'more deals today'}</span>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
            {isAr ? '14 يوماً مجاناً. لا يلزم وجود بطاقة.' : '14 days free. No card needed.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300, margin: '0 auto' }}>
            <button className="tap-btn" onClick={() => window.location.href = '/login'}
              style={{ height: 52, borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>
              {isAr ? 'ابدأ مجاناً ←' : 'Get Started Free →'}
            </button>
            <button className="tap-btn" onClick={() => window.location.href = '/pricing'}
              style={{ height: 52, borderRadius: 26, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 16, fontWeight: 500, fontFamily: 'inherit' }}>
              {isAr ? 'عرض الأسعار' : 'View Pricing'}
            </button>
          </div>
        </div>
      </section>

      <MobileFooter />
    </div>
  )
}