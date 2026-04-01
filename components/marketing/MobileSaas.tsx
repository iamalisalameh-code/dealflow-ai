'use client'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'
import { useState, useEffect } from 'react'

export default function MobileSaas() {
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
  const items = [
    { 
      title: isAr ? 'تدريب مكالمات الاستكشاف' : 'Discovery call coaching', 
      desc: isAr ? 'يقترح الذكاء الاصطناعي أسئلة تأهيل MEDDIC/BANT في الوقت الفعلي أثناء الاستكشاف.' : 'AI suggests MEDDIC/BANT qualification questions in real time during discovery.' 
    },
    { 
      title: isAr ? 'التعامل مع اعتراضات العرض' : 'Demo objection handling', 
      desc: isAr ? '"مكلف للغاية"، "نحن راضون عن أداتنا الحالية" — لدى الذكاء الاصطناعي ردود جاهزة ومجربة.' : '"Too expensive", "we\'re happy with our current tool" — AI has battle-tested responses ready.' 
    },
    { 
      title: isAr ? 'صحة الصفقات متعددة الأطراف' : 'Multi-stakeholder deal health', 
      desc: isAr ? 'تتبع صحة الصفقة عبر مكالمات متعددة مع أصحاب مصلحة مختلفين في نفس الصفقة.' : 'Track deal health across multiple calls with different stakeholders in the same deal.' 
    },
    { 
      title: isAr ? 'متابعة فورية' : 'Instant follow-up', 
      desc: isAr ? 'قم بإنشاء ملخص للعرض التوضيحي وبريد إلكتروني للخطوات التالية فور انتهاء المكالمة.' : 'Generate a demo recap and next steps email right after the call ends.' 
    },
  ]

  return (
    // Step 3 — Add direction and font-family to the main wrapper
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); 
        
        *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} 
        body{background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} 
        
        .serif{font-family:'DM Serif Display',serif;} 
        html[dir="rtl"] .serif { font-family: 'Noto Sans Arabic', sans-serif; font-weight: 700; }

        .tap-btn{transition:transform 0.15s;} 
        .tap-btn:active{transform:scale(0.97);}
      `}</style>
      
      <MobileNav />

      {/* Hero Section */}
      <section style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
          {isAr ? 'مبيعات البرمجيات (SaaS)' : 'SaaS Sales'}
        </div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 14 }}>
          {isAr ? 'اربح المزيد من' : 'Win more'}<br />
          <span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'عروض البرمجيات' : 'SaaS demos'}</span><br />
          {isAr ? 'بالذكاء الاصطناعي' : 'with AI'}
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6, marginBottom: 28 }}>
          {isAr 
            ? 'تدريب بالذكاء الاصطناعي أثناء مكالمات الاستكشاف والعروض التوضيحية. تتبع صحة الصفقة عبر دورات مبيعات طويلة.' 
            : 'AI coaching during discovery calls and demos. Track deal health across long multi-stakeholder cycles.'}
        </p>
        <button className="tap-btn" onClick={() => window.location.href = '/login'}
          style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>
          {isAr ? 'ابدأ التجربة المجانية ←' : 'Start Free Trial →'}
        </button>
      </section>

      {/* Features List */}
      {items.map((item, i) => (
        <div key={i} style={{ margin: '0 20px 12px', padding: '18px 20px', borderRadius: 20, background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.06)', textAlign: isAr ? 'right' : 'left' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f', marginBottom: 6 }}>{item.title}</div>
          <div style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.5 }}>{item.desc}</div>
        </div>
      ))}

      {/* Bottom CTA */}
      <div style={{ padding: '40px 20px 48px', background: '#1d1d1f', textAlign: 'center', marginTop: 40 }}>
        <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, color: '#fff', letterSpacing: '-1px', marginBottom: 20 }}>
          {isAr ? 'جربه مجاناً لمدة ' : 'Try free for '} 
          <span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? '14 يوماً' : '14 days'}</span>
        </h2>
        <button className="tap-btn" onClick={() => window.location.href = '/login'}
          style={{ width: '100%', maxWidth: 300, height: 52, borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>
          {isAr ? 'ابدأ الآن ←' : 'Get Started →'}
        </button>
      </div>

      <MobileFooter />
    </div>
  )
}