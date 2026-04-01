'use client'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'
import { useState, useEffect } from 'react'

export default function MobileCompareChorus() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('marketing_lang') as 'en' | 'ar'
      if (saved) setLang(saved)
    }
  }, [])

  const isAr = lang === 'ar'

  const rows = [
    { 
      feature: isAr ? 'دعم اللغة العربية' : 'Arabic language support', 
      dealflow: true, chorus: false 
    },
    { 
      feature: isAr ? 'تدريب مباشر بالذكاء الاصطناعي' : 'Real-time AI coaching', 
      dealflow: true, chorus: true 
    },
    { 
      feature: isAr ? 'متابعة عبر واتساب' : 'WhatsApp follow-ups', 
      dealflow: true, chorus: false 
    },
    { 
      feature: isAr ? 'ملخص ذكي ما قبل المكالمة' : 'Pre-call AI brief', 
      dealflow: true, chorus: false 
    },
    { 
      feature: isAr ? 'مصمم لسوق الشرق الأوسط' : 'Built for MENA market', 
      dealflow: true, chorus: false 
    },
    { 
      feature: isAr ? 'تسعير ثابت للفريق' : 'Flat-rate team pricing', 
      dealflow: true, chorus: false 
    },
    { 
      feature: isAr ? 'تجربة مجانية لمدة 14 يوماً' : '14-day free trial', 
      dealflow: true, chorus: false 
    },
    { 
      feature: isAr ? 'تسجيل المكالمات' : 'Call recording', 
      dealflow: true, chorus: true 
    },
  ]

  // Define dynamic serif style to avoid CSS parser errors
  const serifStyle = {
    fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Serif Display', serif",
    fontWeight: isAr ? 700 : 400
  }

  return (
    <div style={{ 
      direction: isAr ? 'rtl' : 'ltr', 
      fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Sans', sans-serif",
      minHeight: '100vh',
      background: '#fff'
    }}>
      {/* Static CSS only - No JS variables inside here to prevent IDE errors */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); 
        * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; } 
        .tap-btn { transition: transform 0.15s; }
        .tap-btn:active { transform: scale(0.97); }
      `}</style>
      
      <MobileNav />

      <section style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#bf5af2', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
          {isAr ? 'مقارنة' : 'Comparison'}
        </div>
        <h1 style={{ ...serifStyle, fontSize: 34, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 14 }}>
          DealFlow AI<br />
          {isAr ? 'مقابل ' : 'vs '} 
          <span style={{ fontStyle: isAr ? 'normal' : 'italic', color: '#bf5af2' }}>Chorus</span>
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6 }}>
          {isAr 
            ? 'تعد Chorus أداة قوية — لكنها لا تدعم العربية وتفرض رسوماً لكل مستخدم. DealFlow AI يعتمد تسعيراً ثابتاً ويدعم العربية بشكل أصلي.' 
            : 'Chorus is a solid tool — but has no Arabic support and charges per seat. DealFlow AI is flat-rate and Arabic-native.'}
        </p>
      </section>

      <section style={{ padding: '0 20px 40px' }}>
        <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', background: '#1d1d1f', padding: '12px 16px', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
              {isAr ? 'الميزة' : 'Feature'}
            </span>
            <span style={{ fontSize: 12, color: '#0071e3', fontWeight: 700, minWidth: 72, textAlign: 'center' }}>DealFlow</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600, minWidth: 56, textAlign: 'center' }}>Chorus</span>
          </div>

          {rows.map((row, i) => (
            <div key={i} style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr auto auto', 
              padding: '12px 16px', 
              borderBottom: i < rows.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', 
              background: i % 2 === 0 ? '#fff' : '#fafafa', 
              gap: 8, 
              alignItems: 'center' 
            }}>
              <span style={{ fontSize: 13, color: '#1d1d1f', textAlign: isAr ? 'right' : 'left' }}>{row.feature}</span>
              <div style={{ minWidth: 72, display: 'flex', justifyContent: 'center' }}>
                {row.dealflow ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aeaeb2" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                )}
              </div>
              <div style={{ minWidth: 56, display: 'flex', justifyContent: 'center' }}>
                {row.chorus ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aeaeb2" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '40px 20px 48px', background: '#1d1d1f', textAlign: 'center' }}>
        <h2 style={{ ...serifStyle, fontSize: 30, color: '#fff', letterSpacing: '-1px', marginBottom: 10 }}>
          {isAr ? 'انتقل إلى DealFlow AI' : 'Switch to DealFlow AI'}<br />
          <span style={{ fontStyle: isAr ? 'normal' : 'italic', color: '#34c759' }}>{isAr ? 'مجاناً لمدة 14 يوماً' : 'free for 14 days'}</span>
        </h2>
        <button className="tap-btn" onClick={() => window.location.href = '/login'}
          style={{ width: '100%', maxWidth: 300, height: 52, borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', marginTop: 20 }}>
          {isAr ? 'ابدأ تجربتك المجانية ←' : 'Get Started Free →'}
        </button>
      </section>

      <MobileFooter />
    </div>
  )
}