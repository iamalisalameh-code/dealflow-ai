'use client'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import { useState, useEffect } from 'react'

export default function DemoClient() {
  const [scrolled, setScrolled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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

  // Form fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    borderRadius: 12,
    border: '1px solid rgba(0,0,0,0.1)',
    background: '#f5f5f7',
    color: '#1d1d1f',
    fontSize: 15,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.2s',
    textAlign: isAr ? 'right' : 'left'
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#1d1d1f',
    marginBottom: 8,
    letterSpacing: '-0.2px'
  }

  // Step 2: Wrap features array
  const features = [
    { 
      title: isAr ? 'نسخ مباشر للغة العربية' : 'Live Arabic Transcription', 
      desc: isAr ? 'شاهد كيف نتعامل مع اللهجات الخليجية والمصرية في الوقت الفعلي بدقة تفوق 90٪.' : 'See how we handle Gulf & Egyptian dialects in real-time with 90%+ accuracy.' 
    },
    { 
      title: isAr ? 'معالجة الاعتراضات بالذكاء الاصطناعي' : 'AI Objection Handling', 
      desc: isAr ? 'راقب الذكاء الاصطناعي وهو يقترح حججاً مضادة لحظة تردد العميل المحتمل.' : 'Watch the AI suggest counter-arguments the moment a prospect hesitates.' 
    },
    { 
      title: isAr ? 'متابعات مؤتمتة' : 'Automated Follow-ups', 
      desc: isAr ? 'جرب سحر مسودة رسالة واتساب يتم إنشاؤها فور انتهاء المكالمة.' : 'Experience the magic of a WhatsApp drafted instantly after the call ends.' 
    }
  ]

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
        input:focus { background: #fff !important; border-color: #0071e3 !important; box-shadow: 0 0 0 4px rgba(0,113,227,0.1) !important; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        
        .desktop-nav { display: flex; align-items: center; gap: 32px; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        
        .split-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; min-height: 100vh; padding: 120px 48px 60px; max-width: 1200px; margin: 0 auto; }
        @media (max-width: 900px) {
          .split-grid { grid-template-columns: 1fr; gap: 40px; padding-top: 140px; }
        }
        
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}</style>

      {/* NAV */}
      <MarketingNav activePage="demo" />

      {/* BACKGROUND MESH */}
      <div className="mesh" style={{ top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: '#0071e3', opacity: 0.05 }} />

      {/* SPLIT LAYOUT */}
      <section className="split-grid" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* LEFT: VALUE PROP */}
        <div className="fade-up">
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
            {isAr ? 'عرض حي' : 'Live Demonstration'}
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(44px, 5vw, 64px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24 }}>
            {isAr ? 'شاهد DealFlow AI' : 'See DealFlow AI'} <br />
            <span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'أثناء العمل.' : 'in action.'}</span>
          </h1>
          <p style={{ fontSize: 18, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40, maxWidth: 460 }}>
            {isAr 
              ? 'احجز جولة مخصصة لمدة 30 دقيقة مع فريقنا لترى كيف يمكن للذكاء الاصطناعي تحويل عملية المبيعات لديك وزيادة معدلات الإغلاق.' 
              : 'Book a personalized 30-minute walkthrough with our team to see how AI can transform your sales process and increase close rates.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
            {features.map((feature, i) => (
              <div key={i} style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,113,227,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1d1d1f', marginBottom: 4 }}>{feature.title}</div>
                  <div style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.5 }}>{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 24, background: '#f5f5f7', borderRadius: 20, border: '1px solid rgba(0,0,0,0.04)', display: 'inline-flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ width: 40, height: 40, borderRadius: '50%', background: '#1d1d1f', border: '2px solid #f5f5f7', marginInlineStart: i > 1 ? -12 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 600 }}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f' }}>
                {isAr ? 'انضم إلى أكثر من 50 فريق مبيعات في المنطقة' : 'Join 50+ MENA sales teams'}
              </div>
              <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
                {[1,2,3,4,5].map(star => <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill="#ff9f0a" stroke="#ff9f0a"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: FORM / CALENDAR EMBED AREA */}
        <div className="fade-up-1">
          <div style={{ background: '#fff', borderRadius: 32, padding: 40, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 30px 60px rgba(0,0,0,0.08)' }}>
            
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(52,199,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="serif" style={{ fontSize: 32, color: '#1d1d1f', marginBottom: 12 }}>
                  {isAr ? 'تم استلام الطلب' : 'Request Received'}
                </h3>
                <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6, marginBottom: 32 }}>
                  {isAr 
                    ? `شكراً لك! سيتواصل فريقنا مع ${email} قريباً لجدولة العرض التوضيحي المخصص لك.` 
                    : `Thank you! Our team will reach out to ${email} shortly to schedule your personalized demo.`}
                </p>
                <button onClick={() => setSubmitted(false)} style={{ background: 'none', border: 'none', color: '#0071e3', fontSize: 15, fontWeight: 600 }}>
                  {isAr ? 'العودة إلى النموذج →' : '← Back to form'}
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 32 }}>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: '#1d1d1f', marginBottom: 8, letterSpacing: '-0.5px' }}>
                    {isAr ? 'طلب عرض توضيحي' : 'Request a Demo'}
                  </h3>
                  <p style={{ fontSize: 15, color: '#6e6e73' }}>
                    {isAr ? 'املأ النموذج أدناه وسنقوم بتوصيلك بخبير منتجات.' : "Fill out the form below and we'll connect you with a product expert."}
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div>
                      <label style={labelStyle}>{isAr ? 'الاسم الأول' : 'First Name'}</label>
                      <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>{isAr ? 'اسم العائلة' : 'Last Name'}</label>
                      <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>{isAr ? 'بريد العمل الإلكتروني' : 'Work Email'}</label>
                    <input type="email" required placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)} style={{ ...inputStyle, textAlign: 'left', direction: 'ltr' }} />
                  </div>

                  <div>
                    <label style={labelStyle}>{isAr ? 'اسم الشركة' : 'Company Name'}</label>
                    <input type="text" required value={company} onChange={e => setCompany(e.target.value)} style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>{isAr ? 'رقم الهاتف (اختياري)' : 'Phone Number (Optional)'}</label>
                    <input type="tel" placeholder="+971 50 123 4567" value={phone} onChange={e => setPhone(e.target.value)} style={{ ...inputStyle, textAlign: 'left', direction: 'ltr' }} />
                  </div>

                  <button type="submit" disabled={isSubmitting}
                    style={{ height: 56, borderRadius: 28, border: 'none', background: '#0071e3', color: '#fff', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 12, transition: 'all 0.2s', opacity: isSubmitting ? 0.8 : 1, boxShadow: '0 8px 24px rgba(0,113,227,0.2)' }}>
                    {isSubmitting && <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />}
                    {isSubmitting 
                      ? (isAr ? 'جاري الإرسال...' : 'Submitting...') 
                      : (isAr ? 'طلب العرض التوضيحي' : 'Request Demo')}
                  </button>

                  <p style={{ fontSize: 13, color: '#aeaeb2', textAlign: 'center', marginTop: 8 }}>
                    {isAr ? 'تفضل الحجز مباشرة؟ ' : 'Prefer to book directly? '}
                    <a href="mailto:sales@dealflow-ai.com" style={{ color: '#0071e3', textDecoration: 'none' }}>
                      {isAr ? 'راسل فريق المبيعات.' : 'Email our sales team.'}
                    </a>
                  </p>
                </form>
              </>
            )}

          </div>
        </div>

      </section>

      {/* FOOTER */}
      <MarketingFooter />
    </div>
  )
}