'use client'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'
import { useState, useEffect } from 'react'

export default function MobileCompareGong() {
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

  // Step 2: Wrap comparison data with translations
  const rows = [
    { feature: isAr ? 'دعم اللغة العربية' : 'Arabic language support', dealflow: true, gong: false },
    { feature: isAr ? 'تدريب مباشر بالذكاء الاصطناعي' : 'Real-time AI coaching', dealflow: true, gong: true },
    { feature: isAr ? 'متابعة عبر واتساب' : 'WhatsApp follow-ups', dealflow: true, gong: false },
    { feature: isAr ? 'ملخص ذكي ما قبل المكالمة' : 'Pre-call AI brief', dealflow: true, gong: false },
    { feature: isAr ? 'مصمم لسوق الشرق الأوسط' : 'Built for MENA market', dealflow: true, gong: false },
    { feature: isAr ? 'تسعير ثابت للفريق' : 'Flat-rate team pricing', dealflow: true, gong: false },
    { feature: isAr ? 'واجهة تدعم العربية (RTL)' : 'RTL interface', dealflow: true, gong: false },
    { feature: isAr ? 'تجربة مجانية لمدة 14 يوماً' : '14-day free trial', dealflow: true, gong: false },
    { feature: isAr ? 'تسجيل المكالمات' : 'Call recording', dealflow: true, gong: true },
    { feature: isAr ? 'التكامل مع CRM' : 'CRM integration', dealflow: true, gong: true },
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

        .tap-btn{transition:transform 0.15s;} 
        .tap-btn:active{transform:scale(0.97);}
      `}</style>
      
      <MobileNav />

      {/* Hero Section */}
      <section style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#34c759', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
          {isAr ? 'مقارنة' : 'Comparison'}
        </div>
        <h1 className="serif" style={{ fontSize: 34, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 14 }}>
          DealFlow AI<br />
          {isAr ? 'مقابل ' : 'vs '} 
          <span style={{ fontStyle: 'italic', color: '#0071e3' }}>Gong</span>
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6 }}>
          {isAr 
            ? 'تعد Gong أداة رائعة — لكنها لم تُصمم للأسواق الناطقة بالعربية. بينما DealFlow AI صُمم خصيصاً لذلك.' 
            : "Gong is a great tool — but it wasn't built for Arabic-speaking markets. DealFlow AI was."}
        </p>
      </section>

      {/* Key differentiator */}
      <section style={{ padding: '0 20px 32px' }}>
        <div style={{ borderRadius: 20, background: 'rgba(0,113,227,0.06)', border: '1px solid rgba(0,113,227,0.15)', padding: '20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', marginBottom: 6 }}>
            {isAr ? '🌍 الفرق الجوهري' : '🌍 The key difference'}
          </div>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.6 }}>
            {isAr 
              ? 'تفتقر Gong تماماً لدعم اللغة العربية. إذا كان عملاؤك يتحدثون العربية، فلن تساعدك Gong. صُمم DealFlow AI خصيصاً لدعم اللهجة الخليجية، المصرية، والفصحى بشكل أصلي.' 
              : 'Gong has zero Arabic language support. If your clients speak Arabic, Gong cannot help you. DealFlow AI was built specifically for Gulf Arabic, Egyptian Arabic, and MSA — natively.'}
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section style={{ padding: '0 20px 40px' }}>
        <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
          {/* Header Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', background: '#1d1d1f', padding: '12px 16px', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
              {isAr ? 'الميزة' : 'Feature'}
            </span>
            <span style={{ fontSize: 12, color: '#0071e3', fontWeight: 700, minWidth: 72, textAlign: 'center' }}>DealFlow</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600, minWidth: 48, textAlign: 'center' }}>Gong</span>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', padding: '12px 16px', borderBottom: i < rows.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', background: i % 2 === 0 ? '#fff' : '#fafafa', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#1d1d1f', textAlign: isAr ? 'right' : 'left' }}>{row.feature}</span>
              <div style={{ minWidth: 72, display: 'flex', justifyContent: 'center' }}>
                {row.dealflow ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aeaeb2" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>}
              </div>
              <div style={{ minWidth: 48, display: 'flex', justifyContent: 'center' }}>
                {row.gong ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aeaeb2" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing comparison */}
      <section style={{ padding: '0 20px 40px' }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', marginBottom: 14 }}>
          {isAr ? 'التسعير' : 'Pricing'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ borderRadius: 16, border: '2px solid #0071e3', padding: '16px 20px', background: 'rgba(0,113,227,0.04)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0071e3', marginBottom: 4 }}>DEALFLOW AI</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px' }}>
              49$<span style={{ fontSize: 14, fontWeight: 400, color: '#6e6e73' }}>/{isAr ? 'شهر' : 'mo'}</span>
            </div>
            <div style={{ fontSize: 13, color: '#6e6e73' }}>
              {isAr ? 'سعر ثابت. يشمل كل شيء.' : 'Flat rate. Everything included.'}
            </div>
          </div>
          <div style={{ borderRadius: 16, border: '1px solid rgba(0,0,0,0.08)', padding: '16px 20px', background: '#f5f5f7' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6e6e73', marginBottom: 4 }}>GONG</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px' }}>
              1,400$+<span style={{ fontSize: 14, fontWeight: 400, color: '#6e6e73' }}>/{isAr ? 'سنة/مستخدم' : 'yr/seat'}</span>
            </div>
            <div style={{ fontSize: 13, color: '#6e6e73' }}>
              {isAr ? 'تسعير لكل مستخدم. لا يوجد دعم للعربية.' : 'Per-seat pricing. No Arabic support.'}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '40px 20px 48px', background: '#1d1d1f', textAlign: 'center' }}>
        <h2 className="serif" style={{ fontSize: 30, fontWeight: 400, color: '#fff', letterSpacing: '-1px', marginBottom: 10 }}>
          {isAr ? 'جرب DealFlow AI' : 'Try DealFlow AI'}<br />
          <span style={{ fontStyle: 'italic', color: '#34c759' }}>{isAr ? 'مجاناً لمدة 14 يوماً' : 'free for 14 days'}</span>
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
          {isAr ? 'بدون بطاقة ائتمان. بدون التزام.' : 'No credit card. No commitment.'}
        </p>
        <button className="tap-btn" onClick={() => window.location.href = '/login'}
          style={{ width: '100%', maxWidth: 300, height: 52, borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>
          {isAr ? 'ابدأ تجربتك المجانية ←' : 'Get Started Free →'}
        </button>
      </section>

      <MobileFooter />
    </div>
  )
}