'use client'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'
import { useState, useEffect } from 'react'

export default function MobileDemo() {
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
  const checklist = [
    { 
      icon: '🎙', 
      text: isAr ? 'نسخ مباشر بالعربية والإنجليزية' : 'Live transcription in Arabic and English' 
    },
    { 
      icon: '🤖', 
      text: isAr ? 'تدريب مباشر ومعالجة الاعتراضات' : 'Real-time AI coaching and objection handling' 
    },
    { 
      icon: '📊', 
      text: isAr ? 'تقييم صحة الصفقة واكتشاف إشارات الشراء' : 'Deal health scoring and buying signal detection' 
    },
    { 
      icon: '💬', 
      text: isAr ? 'متابعات مؤتمتة عبر واتساب والبريد الإلكتروني' : 'Auto-generated WhatsApp and email follow-ups' 
    },
    { 
      icon: '👥', 
      text: isAr ? 'إدارة الفريق وصلاحيات الوكلاء' : 'Team management and agent controls' 
    },
  ]

  return (
    // Step 3: Add direction and font-family to the main wrapper
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); 
        
        *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} 
        body{background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} 
        
        .serif{font-family:'DM Serif Display',serif;} 
        html[dir="rtl"] .serif { font-family: 'Noto Sans Arabic', sans-serif; font-weight: 700; }

        .tap-btn{transition:transform 0.15s,opacity 0.15s;} 
        .tap-btn:active{transform:scale(0.97);opacity:0.85;}
      `}</style>
      
      <MobileNav activePage="demo" />

      {/* Header Section */}
      <section style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#bf5af2', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
          {isAr ? 'عرض مباشر' : 'Live demo'}
        </div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 14 }}>
          {isAr ? 'شاهد DealFlow AI' : 'See DealFlow AI'}<br />
          <span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'مباشرة في 20 دقيقة' : 'live in 20 minutes'}</span>
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6 }}>
          {isAr ? 'احجز جولة شخصية مع فريقنا. سنعرض لك كل شيء مباشرة.' : 'Book a personal walkthrough with our team. We\'ll show you everything live.'}
        </p>
      </section>

      {/* What you'll see */}
      <section style={{ padding: '0 20px 32px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1f', marginBottom: 14 }}>
          {isAr ? 'ما سنقوم بتغطيته:' : "What we'll cover:"}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {checklist.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 16, background: '#f5f5f7' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: 14, color: '#1d1d1f', fontWeight: 500, textAlign: isAr ? 'right' : 'left' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Section */}
      <section style={{ padding: '0 20px 40px' }}>
        <div style={{ borderRadius: 24, border: '1px solid rgba(0,0,0,0.08)', padding: '32px 20px', textAlign: 'center', background: '#f5f5f7' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📅</div>
          <div style={{ fontSize: 17, fontWeight: 600, color: '#1d1d1f', marginBottom: 8 }}>
            {isAr ? 'احجز عرضاً مدته 20 دقيقة' : 'Book a 20-minute demo'}
          </div>
          <div style={{ fontSize: 14, color: '#6e6e73', marginBottom: 24 }}>
            {isAr ? 'اختر الوقت المناسب لك. متاح من الأحد إلى الخميس، 9 صباحاً - 6 مساءً بتوقيت الإمارات.' : 'Pick a time that works for you. Available Sunday–Thursday, 9AM–6PM GST.'}
          </div>
          
          <button className="tap-btn" onClick={() => window.open('mailto:hello@dealflow-ai.com?subject=Demo Request', '_blank')}
            style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', marginBottom: 12 }}>
            {isAr ? 'طلب عرض تجريبي ←' : 'Request a Demo →'}
          </button>
          
          <button className="tap-btn" onClick={() => window.open('https://wa.me/971500000000?text=Hi, I would like to book a DealFlow AI demo', '_blank')}
            style={{ width: '100%', height: 52, borderRadius: 26, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 16, fontWeight: 500, fontFamily: 'inherit' }}>
            {isAr ? 'راسلنا عبر واتساب بدلاً من ذلك' : 'WhatsApp us instead'}
          </button>
        </div>
      </section>

      {/* Trial Section */}
      <section style={{ padding: '0 20px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 14, color: '#6e6e73', marginBottom: 12 }}>
          {isAr ? 'تفضل استكشاف الأمر بنفسك؟' : 'Prefer to explore yourself?'}
        </div>
        <button className="tap-btn" onClick={() => window.location.href = '/login'}
          style={{ height: 48, padding: '0 28px', borderRadius: 24, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 15, fontWeight: 500, fontFamily: 'inherit' }}>
          {isAr ? 'ابدأ تجربتك المجانية لمدة 14 يوماً ←' : 'Start 14-day free trial →'}
        </button>
      </section>

      <MobileFooter />
    </div>
  )
}