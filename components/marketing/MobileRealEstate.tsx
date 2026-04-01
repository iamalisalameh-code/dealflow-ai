'use client'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'
import { useState, useEffect } from 'react'

export default function MobileRealEstate() {
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

  // Step 2 — Wrap every text string (Pain Points Data)
  const painPoints = [
    { 
      icon: '📝', 
      problem: isAr ? 'تدوين الملاحظات يعني تضييع التركيز في المحادثة' : 'Taking notes means missing the conversation', 
      solution: isAr ? 'الذكاء الاصطناعي يلتقط كل كلمة لتبقى مركزاً مع العميل' : 'AI captures every word so you stay focused on the client' 
    },
    { 
      icon: '🌍', 
      problem: isAr ? 'العميل ينتقل بين العربية والإنجليزية باستمرار' : 'Client switches between Arabic and English', 
      solution: isAr ? 'يتعرف النظام تلقائياً على اللغة وينسخ كلاهما بسلاسة' : 'Auto-detects language and transcribes both seamlessly' 
    },
    { 
      icon: '⏰', 
      problem: isAr ? 'رسائل المتابعة تستغرق أكثر من 20 دقيقة لكتابتها' : 'Follow-up emails take 20+ minutes to write', 
      solution: isAr ? 'يولد الذكاء الاصطناعي متابعة مخصصة في 3 ثوانٍ فقط' : 'AI generates a personalized follow-up in 3 seconds' 
    },
    { 
      icon: '💡', 
      problem: isAr ? 'تجاهل إشارات الشراء مثل أسئلة "خطة الدفع"' : "Missing buying signals like 'payment plan' questions", 
      solution: isAr ? 'ينبهك النظام لكل إشارة شراء فوراً حتى لا تضيع اللحظة' : 'AI flags every signal in real time so you never miss the moment' 
    },
  ]

  return (
    // Step 3 — Add direction and font to main wrapper
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Sans', sans-serif" }}>
      <style>{`
        /* Step 4 — Add Noto Sans Arabic to the font import */
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap'); 
        
        *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} 
        body{background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} 
        
        .serif{font-family:'DM Serif Display',serif;} 
        html[dir="rtl"] .serif { font-family: 'Noto Sans Arabic', sans-serif; font-weight: 700; }
        
        .tap-btn{transition:transform 0.15s;} 
        .tap-btn:active{transform:scale(0.97);}
      `}</style>
      
      <MobileNav />

      {/* HERO SECTION */}
      <section style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#ff9f0a', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
          {isAr ? 'العقارات' : 'Real Estate'}
        </div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 14 }}>
          {isAr ? 'أغلق المزيد من' : 'Close more'}<br />
          <span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'الصفقات العقارية' : 'property deals'}</span><br />
          {isAr ? 'بالذكاء الاصطناعي' : 'with AI'}
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6 }}>
          {isAr ? 'صُمم خصيصاً لوكلاء العقارات في الإمارات. يتعامل مع عملاء إعمار وداماك والدار بالعربية والإنجليزية.' : 'Built for real estate agents in UAE. Handles Emaar, Damac, Aldar clients in Arabic and English.'}
        </p>
      </section>

      {/* PAIN POINTS SECTION */}
      <section style={{ padding: '0 20px 40px' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f', marginBottom: 16 }}>
          {isAr ? 'قبل وبعد استخدام DealFlow AI' : 'Before & After DealFlow AI'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {painPoints.map((p, i) => (
            <div key={i} style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
              <div style={{ padding: '12px 16px', background: '#fff8f0', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{p.icon}</span>
                <div style={{ textAlign: isAr ? 'right' : 'left' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#ff9f0a', marginBottom: 3 }}>{isAr ? 'قبل' : 'BEFORE'}</div>
                  <div style={{ fontSize: 13, color: '#444', lineHeight: 1.4 }}>{p.problem}</div>
                </div>
              </div>
              <div style={{ padding: '12px 16px', background: 'rgba(0,113,227,0.04)', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                <div style={{ textAlign: isAr ? 'right' : 'left' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', marginBottom: 3 }}>{isAr ? 'مع DEALFLOW AI' : 'WITH DEALFLOW AI'}</div>
                  <div style={{ fontSize: 13, color: '#444', lineHeight: 1.4 }}>{p.solution}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ARABIC RE DEMO SECTION */}
      <section style={{ padding: '0 20px 40px' }}>
        <div style={{ borderRadius: 20, background: '#000', overflow: 'hidden' }}>
          <div style={{ background: '#111', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {['#ff453a','#ff9f0a','#34c759'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
            </div>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', [isAr ? 'marginRight' : 'marginLeft']: 6 }}>
              {isAr ? 'مكالمة مباشرة · أحمد المنصوري · إعمار' : 'Live Call · Ahmed Al-Mansouri · Emaar'}
            </span>
          </div>
          <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '10px 12px', textAlign: 'right' }}>
              <div style={{ fontSize: 9, color: '#34c759', fontWeight: 700, marginBottom: 4 }}>{isAr ? 'أحمد (عميل)' : 'AHMED (PROSPECT)'}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, direction: 'rtl' }}>يعجبني المشروع بس أحتاج أعرف تفاصيل خطة الدفع، وهل في دفعة أولى مرنة؟</div>
            </div>
            <div style={{ padding: '8px 12px', borderRadius: 10, background: 'rgba(48,209,88,0.08)', border: '1px solid rgba(48,209,88,0.2)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, color: '#34c759' }}>
                {isAr ? '⚡ إشارة شراء: السؤال عن خطة الدفع = نية شراء عالية' : '⚡ Buying signal: Payment plan question = high purchase intent'}
              </span>
            </div>
            <div style={{ padding: '8px 12px', borderRadius: 10, background: 'rgba(0,113,227,0.08)', border: '1px solid rgba(0,113,227,0.2)', textAlign: isAr ? 'right' : 'left' }}>
              <div style={{ fontSize: 9, color: '#0071e3', fontWeight: 700, marginBottom: 4 }}>{isAr ? 'نصيحة التدريب (AI)' : 'AI COACHING TIP'}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                {isAr ? 'ابدأ بعرض خطة 70/30. اذكر خيار الدفع بعد التسليم لمزيد من المرونة.' : 'Lead with the 70/30 plan. Mention Post-handover payment option for extra flexibility.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section style={{ padding: '0 20px 40px' }}>
        <div style={{ borderRadius: 20, background: '#f5f5f7', padding: '20px', textAlign: isAr ? 'right' : 'left' }}>
          <div style={{ display: 'flex', gap: 3, marginBottom: 12, justifyContent: 'flex-start' }}>
            {[...Array(5)].map((_, j) => <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#ff9f0a" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
          </div>
          <p style={{ fontSize: 14, color: '#1d1d1f', lineHeight: 1.6, marginBottom: 14, fontStyle: 'italic' }}>
            {isAr 
              ? '"دقة النسخ الصوتي للعربية مذهلة. يمكنني الآن التركيز تماماً على العميل بينما يتولى DealFlow كل شيء آخر. ارتفع معدل إغلاقي للفقات بنسبة 40٪ في 6 أسابيع."' 
              : '"The Arabic transcription accuracy is incredible. I can now focus entirely on the client while DealFlow handles everything else. My close rate went up 40% in 6 weeks."'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isAr ? 'row-reverse' : 'row' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#ff9f0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>MA</div>
            <div style={{ textAlign: isAr ? 'right' : 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1d1d1f' }}>{isAr ? 'محمد الراشد' : 'Mohammed Al-Rashid'}</div>
              <div style={{ fontSize: 11, color: '#6e6e73' }}>{isAr ? 'وكيل عقاري أول · إعمار العقارية' : 'Senior Agent · Emaar Properties'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: '40px 20px 48px', background: '#1d1d1f', textAlign: 'center' }}>
        <h2 className="serif" style={{ fontSize: 30, fontWeight: 400, color: '#fff', letterSpacing: '-1px', marginBottom: 10 }}>
          {isAr ? 'أغلق صفقتك العقارية ' : 'Close your next'}<br />
          <span style={{ fontStyle: 'italic', color: '#ff9f0a' }}>{isAr ? 'القادمة بشكل أسرع' : 'property deal faster'}</span>
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
          {isAr ? 'تجربة مجانية لمدة 14 يوماً. لا يلزم بطاقة ائتمان.' : '14-day free trial. No credit card.'}
        </p>
        <button className="tap-btn" onClick={() => window.location.href = '/login'}
          style={{ width: '100%', maxWidth: 300, height: 52, borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>
          {isAr ? 'ابدأ تجربتك المجانية ←' : 'Start Free Trial →'}
        </button>
      </section>

      <MobileFooter />
    </div>
  )
}