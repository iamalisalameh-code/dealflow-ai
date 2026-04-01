'use client'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import { useState, useEffect } from 'react'

export default function ChorusClient() {
  const [scrolled, setScrolled] = useState(false)

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Step 2: Wrap text strings in comparisonData (moved inside component to access isAr)
  const comparisonData = [
    { feature: isAr ? 'اللغة العربية (فهم اللهجات)' : 'Arabic Language (Dialect Awareness)', dealflow: true, chorus: false },
    { feature: isAr ? 'معالجة الاعتراضات في الوقت الفعلي' : 'Real-time Objection Handling', dealflow: true, chorus: true },
    { feature: isAr ? 'استضافة البيانات في منطقة الشرق الأوسط وشمال أفريقيا' : 'MENA-Region Data Residency', dealflow: true, chorus: false },
    { feature: isAr ? 'أتمتة متابعة واتساب' : 'WhatsApp Follow-up Automations', dealflow: true, chorus: false },
    { feature: isAr ? 'تسجيل شهري ذاتي الخدمة' : 'Self-Serve Monthly Signup', dealflow: true, chorus: false },
    { feature: isAr ? 'تكامل مع Zoom / Google Meet' : 'Zoom / Google Meet Integration', dealflow: true, chorus: true },
    { feature: isAr ? 'الفواتير بالدرهم الإماراتي والعملات المحلية' : 'AED & Local Currency Invoicing', dealflow: true, chorus: false },
  ]

  const CheckIcon = () => (
    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(52,199,89,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
  )

  const XIcon = () => (
    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aeaeb2" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </div>
  )

  return (
    // Step 3: Add direction and font to main wrapper
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Sans', sans-serif" }}>
      <style>{`
        /* Step 4: Add Noto Sans Arabic to font import */
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff; color: #1d1d1f; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        html[dir="rtl"] .serif { font-family: inherit; } /* Prevent serif override in Arabic */

        button { cursor: pointer; font-family: inherit; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        
        .desktop-nav { display: flex; align-items: center; gap: 32px; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        
        .vs-badge { padding: 4px 12px; border-radius: 12px; background: #f5f5f7; color: #1d1d1f; font-size: 12px; font-weight: 700; display: inline-block; margin-bottom: 16px; }
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}</style>

      {/* NAV */}
      <MarketingNav activePage="chorus" />

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 80, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '0%', left: '10%', width: '40%', height: '60%', background: '#ff9f0a', opacity: 0.04 }} />
        
        <div className="fade-up vs-badge">{isAr ? 'DealFlow AI مقابل Chorus.ai' : 'DealFlow AI vs Chorus.ai'}</div>
        <h1 className="fade-up serif" style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24 }}>
          {isAr ? 'البديل المحلي لـ' : 'The local alternative for'}<br />
          <span style={{ fontStyle: 'italic', color: '#ff9f0a' }}>{isAr ? 'الفرق سريعة النمو.' : 'high-growth teams.'}</span>
        </h1>
        <p className="fade-up-1" style={{ fontSize: 18, color: '#6e6e73', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.6 }}>
          {isAr 
            ? 'يُعد Chorus.ai أداة قوية للشركات الكبرى في أمريكا الشمالية. ولكن إذا كان نجاحك يعتمد على الفروق الدقيقة في اللهجات المحلية، والامتثال في منطقة الشرق الأوسط وشمال أفريقيا، والتسعير المرن، فقد تم بناء DealFlow AI من أجلك.' 
            : 'Chorus.ai is a powerful tool for large North American corporations. But if your success depends on local dialect nuances, MENA compliance, and flexible pricing, DealFlow AI was built for you.'}
        </p>
      </section>

      {/* COMPARISON GRID */}
      <section style={{ padding: '40px 48px 100px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ borderRadius: 28, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 24px 80px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', background: '#f5f5f7', padding: '24px 32px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#86868b', textTransform: 'uppercase' }}>
                {isAr ? 'مقارنة الميزات' : 'Feature Comparison'}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1d1d1f', textAlign: 'center' }}>DealFlow AI</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#86868b', textAlign: 'center' }}>Chorus.ai</div>
            </div>

            {comparisonData.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', padding: '22px 32px', borderTop: '1px solid rgba(0,0,0,0.04)', alignItems: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: '#1d1d1f' }}>{row.feature}</div>
                <div>{row.dealflow ? <CheckIcon /> : <XIcon />}</div>
                <div>{row.chorus ? <CheckIcon /> : <XIcon />}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY DIFFERENCES */}
      <section style={{ padding: '100px 48px', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            <div style={{ padding: 40, background: '#fff', borderRadius: 24 }}>
              <h3 className="serif" style={{ fontSize: 28, marginBottom: 16 }}>
                {isAr ? 'فهم الفروق الدقيقة للعربية' : 'Native Arabic Nuance'}
              </h3>
              <p style={{ color: '#6e6e73', lineHeight: 1.6 }}>
                {isAr 
                  ? 'يتعامل Chorus.ai مع اللغة العربية كمهمة ترجمة. بينما يتعامل معها DealFlow AI كتجربة أصلية، حيث يلتقط اللهجات الخليجية والشامية والمصرية مع السياق الثقافي اللازم لتقييم صحة الصفقة بدقة.' 
                  : 'Chorus.ai treats Arabic as a translation task. DealFlow AI treats it as a native experience, capturing Khaleeji, Levantine, and Egyptian dialects with the cultural context needed to score deal health accurately.'}
              </p>
            </div>
            <div style={{ padding: 40, background: '#fff', borderRadius: 24 }}>
              <h3 className="serif" style={{ fontSize: 28, marginBottom: 16 }}>
                {isAr ? 'لا عقود إلزامية' : 'No Contract Lock-in'}
              </h3>
              <p style={{ color: '#6e6e73', lineHeight: 1.6 }}>
                {isAr 
                  ? 'يتطلب Chorus عادةً التزامات لعدة سنوات وحد أدنى لعدد المستخدمين. نحن نؤمن بمنتجنا—لذلك نقدم فواتير شهرية وتجربة مجانية لمدة 14 يوماً يمكنك البدء بها الآن.' 
                  : 'Chorus typically requires multi-year commitments and minimum seat counts. We believe in our product—so we offer monthly billing and a 14-day free trial you can start right now.'}
              </p>
            </div>
            <div style={{ padding: 40, background: '#fff', borderRadius: 24 }}>
              <h3 className="serif" style={{ fontSize: 28, marginBottom: 16 }}>
                {isAr ? 'تكامل مع واتساب' : 'WhatsApp Integration'}
              </h3>
              <p style={{ color: '#6e6e73', lineHeight: 1.6 }}>
                {isAr 
                  ? 'في الإمارات والسعودية، تتم الصفقات عبر واتساب. يقوم DealFlow AI بإنشاء ملخصات متابعة مصممة خصيصاً لواتساب، لتتمكن من الحفاظ على الزخم فور انتهاء المكالمة.' 
                  : 'In the UAE and KSA, deals move on WhatsApp. DealFlow AI generates follow-up summaries formatted specifically for WhatsApp, so you can maintain momentum the second a call ends.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: '120px 48px', background: '#1d1d1f', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '-30%', left: '-10%', width: '50%', height: '80%', background: '#ff9f0a', opacity: 0.12 }} />
        <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: '#fff', marginBottom: 24, position: 'relative', zIndex: 1 }}>
          {isAr ? 'مستعد لأداة ' : 'Ready for a tool that '}<br />
          <span style={{ fontStyle: 'italic', color: '#ff9f0a' }}>{isAr ? 'تتحدث لغتك؟' : 'speaks your language?'}</span>
        </h2>
        <button onClick={() => window.location.href = '/login'} style={{ height: 56, padding: '0 40px', borderRadius: 28, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 700, position: 'relative', zIndex: 1 }}>
          {isAr ? 'ابدأ تجربتك المجانية' : 'Start Your Free Trial'}
        </button>
      </section>

      {/* FOOTER */}
      <MarketingFooter />
    </div>
  )
}