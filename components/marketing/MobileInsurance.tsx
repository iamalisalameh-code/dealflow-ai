'use client'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'
import { useState, useEffect } from 'react'

export default function MobileInsurance() {
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

  // Step 2: Wrap feature data with translations
  const features = [
    { 
      title: isAr ? 'التعامل مع الاعتراضات' : 'Objection handling', 
      desc: isAr ? 'يقترح الذكاء الاصطناعي ردوداً عندما يقول العملاء "إنه مكلف للغاية" أو "سأفكر في الأمر".' : 'AI suggests counter-responses when clients say "it\'s too expensive" or "I\'ll think about it".' 
    },
    { 
      title: isAr ? 'محادثات العملاء بالعربية' : 'Arabic client conversations', 
      desc: isAr ? 'يفضل عملاء الخليج اللغة العربية. يقوم DealFlow بالنسخ والتدريب باللغتين تلقائياً.' : 'Gulf clients often prefer Arabic. DealFlow transcribes and coaches in both languages automatically.' 
    },
    { 
      title: isAr ? 'سجلات المكالمات للامتثال' : 'Call records for compliance', 
      desc: isAr ? 'تعتبر النصوص بمثابة سجلات للمكالمات. مفيدة للامتثال التنظيمي في تأمين الإمارات.' : 'Transcripts serve as call records. Useful for regulatory compliance in UAE insurance.' 
    },
    { 
      title: isAr ? 'متابعة فورية' : 'Instant follow-ups', 
      desc: isAr ? 'أنشئ ملخصاً مخصصاً للبوليسة ورسالة متابعة مباشرة بعد المكالمة.' : 'Generate a personalized policy summary and follow-up message right after the call.' 
    },
  ]

  return (
    // Step 3: Add direction and font-family
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
        <div style={{ fontSize: 11, fontWeight: 700, color: '#ff453a', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
          {isAr ? 'التأمين' : 'Insurance'}
        </div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 14 }}>
          {isAr ? 'اشرح المنتجات المعقدة ' : 'Explain complex'}<br />
          <span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'بكل بساطة' : 'products simply'}</span>
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6, marginBottom: 28 }}>
          {isAr 
            ? 'يساعد الذكاء الاصطناعي وسطاء التأمين على التعامل مع الاعتراضات، وشرح التغطية بوضوح، وإقناع عملاء الخليج بالعربية.' 
            : 'AI helps insurance brokers handle objections, explain coverage clearly, and close Gulf clients in Arabic.'}
        </p>
        <button className="tap-btn" onClick={() => window.location.href = '/login'}
          style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>
          {isAr ? 'ابدأ التجربة المجانية ←' : 'Start Free Trial →'}
        </button>
      </section>

      {/* Features List */}
      {features.map((item, i) => (
        <div key={i} style={{ margin: '0 20px 12px', padding: '18px 20px', borderRadius: 20, background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.06)', textAlign: isAr ? 'right' : 'left' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f', marginBottom: 6 }}>{item.title}</div>
          <div style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.5 }}>{item.desc}</div>
        </div>
      ))}

      {/* Bottom CTA Section */}
      <div style={{ padding: '40px 20px 48px', background: '#1d1d1f', textAlign: 'center', marginTop: 40 }}>
        <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, color: '#fff', letterSpacing: '-1px', marginBottom: 20 }}>
          {isAr ? 'جربه مجاناً لمدة ' : 'Try free for '} 
          <span style={{ fontStyle: 'italic', color: '#ff453a' }}>{isAr ? '14 يوماً' : '14 days'}</span>
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