'use client'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import { useState, useEffect } from 'react'

export default function RealEstateClient() {
  const [scrolled, setScrolled] = useState(false)

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Step 2 — Wrap every text string (Benefits Data)
  const benefits = [
    {
      title: isAr ? 'التقاط كل متطلبات العقار' : 'Capture every property requirement',
      desc: isAr 
        ? 'توقف عن تدوين الملاحظات يدوياً خلال مكالمات الاستكشاف الطويلة. يقوم DealFlow بالتقاط الميزانية الدقيقة، المناطق المفضلة، والجدول الزمني تلقائياً.' 
        : 'Stop taking manual notes during 45-minute discovery calls. DealFlow captures exact budget, preferred areas (e.g., Downtown vs Marina), and timeline automatically.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      )
    },
    {
      title: isAr ? 'دعم مثالي للغة العربية' : 'Flawless Arabic Support',
      desc: isAr 
        ? 'يفضل العملاء في الخليج التفاوض بالعربية. يفهم DealFlow اللهجات الخليجية بشكل طبيعي، ويلتقط التفاصيل التي تفتقدها أدوات الذكاء الاصطناعي الأخرى.' 
        : 'Gulf clients prefer negotiating in Arabic. DealFlow natively understands Khaleeji dialects, capturing nuances that English-only AI tools miss completely.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      )
    },
    {
      title: isAr ? 'متابعة فورية عبر واتساب' : 'Instant WhatsApp Follow-ups',
      desc: isAr 
        ? 'بمجرد إنهاء المكالمة، احصل على مسودة رسالة واتساب تلخص خطة الدفع ومقاييس العائد على الاستثمار، جاهزة للإرسال مع كتيب المشروع.' 
        : 'The second you hang up, get an AI-drafted WhatsApp message summarizing the specific payment plan and ROI metrics discussed, ready to send with the project brochure.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      )
    }
  ]

  return (
    // Step 3 — Add direction and font to main wrapper
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Sans', sans-serif" }}>
      <style>{`
        /* Step 4 — Add Noto Sans Arabic to the font import */
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        
        .responsive-order { order: -1; }
        @media (min-width: 900px) { .responsive-order { order: 0; } }
    
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff; color: #1d1d1f; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        html[dir="rtl"] .serif { font-family: 'Noto Sans Arabic', sans-serif; font-weight: 700; }

        button { cursor: pointer; font-family: inherit; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        
        .desktop-nav { display: flex; align-items: center; gap: 32px; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        
        .benefit-card { padding: 32px; border-radius: 24px; background: #f5f5f7; border: 1px solid rgba(0,0,0,0.04); transition: transform 0.3s; }
        .benefit-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}</style>

      {/* NAV */}
      <MarketingNav activePage="real-estate" />

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 80, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '0%', left: '10%', width: '35%', height: '60%', background: '#0071e3', opacity: 0.05 }} />
        <div className="mesh" style={{ top: '10%', right: '10%', width: '30%', height: '50%', background: '#bf5af2', opacity: 0.05 }} />
        
        <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
          {isAr ? 'مبيعات العقارات' : 'Real Estate Sales'}
        </div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(32px, 6vw, 72px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24, maxWidth: 900, margin: '0 auto 24px' }}>
          {isAr ? 'أغلق المزيد من الصفقات العقارية' : 'Close more property deals'}<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'بدعم مدرب الذكاء الاصطناعي.' : 'with AI coaching.'}</span>
        </h1>
        <p className="fade-up-2" style={{ fontSize: 19, color: '#6e6e73', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.6 }}>
          {isAr 
            ? 'مصمم خصيصاً لأسواق العقارات في الإمارات والشرق الأوسط. يتولى DealFlow AI المهام الإدارية، يتتبع إشارات الشراء، ويمنحك توجيهاً فورياً للتعامل مع الاعتراضات.' 
            : 'Designed specifically for the UAE and MENA property markets. DealFlow AI handles the admin, tracks buying signals, and gives you real-time objection handling for off-plan and secondary market deals.'}
        </p>
        
        <div className="fade-up-2" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button onClick={() => window.location.href = '/login'} style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600 }}>
            {isAr ? 'ابدأ التجربة المجانية' : 'Start Free Trial'}
          </button>
          <button onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })} style={{ height: 52, padding: '0 32px', borderRadius: 26, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 16, fontWeight: 600 }}>
            {isAr ? 'احجز عرضاً تجريبياً' : 'Book a Demo'}
          </button>
        </div>
      </section>

      {/* PROBLEM / BENEFITS GRID */}
      <section style={{ padding: '60px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {benefits.map((b, i) => (
            <div key={i} className="benefit-card">
              <div style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                {b.icon}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1d1d1f', marginBottom: 12 }}>{b.title}</h3>
              <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OBJECTION HANDLING MOCKUP */}
      <section style={{ padding: '100px 48px', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          
          <div style={{ order: isAr ? 2 : 1 }}>
            <h2 className="serif" style={{ fontSize: 40, letterSpacing: '-1px', marginBottom: 20 }}>
              {isAr ? 'تغلب على الاعتراضات الصعبة فوراً' : 'Overcome tough objections instantly'}
            </h2>
            <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.6, marginBottom: 24 }}>
              {isAr 
                ? 'عندما يتردد العميل بشأن السعر أو تأخر التسليم، يقوم مدرب الصفقات الذكي بعرض الرد المثالي بناءً على أفضل عروض المطورين (مثل إعمار، شوبا، والدار).' 
                : 'When a client hesitates on price, handover delays, or SPA terms, DealFlow\'s AI Deal Coach instantly surfaces the perfect counter-argument based on top-performing developer pitches (e.g., Emaar, Sobha, Aldar).'}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                isAr ? 'مقارنات بين المشاريع قيد الإنشاء والسوق الثانوي' : 'Off-plan vs Secondary market comparisons',
                isAr ? 'التعامل مع اعتراضات رسوم الخدمات المرتفعة' : 'Handling high service charge objections',
                isAr ? 'شرح خطط الدفع 70/30 أو ما بعد التسليم' : 'Explaining 70/30 or post-handover payment plans'
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: '#1d1d1f', fontWeight: 500 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,113,227,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0071e3' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: '#1d1d1f', borderRadius: 24, padding: 32, boxShadow: '0 30px 60px rgba(0,0,0,0.15)', order: isAr ? 1 : 2 }}>
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#ff453a', letterSpacing: '0.05em', marginBottom: 8 }}>
                {isAr ? 'تم اكتشاف اعتراض' : 'OBJECTION DETECTED'}
              </div>
              <div style={{ fontSize: 18, color: '#fff', fontWeight: 500, lineHeight: 1.5, textAlign: isAr ? 'right' : 'left' }}>
                {isAr 
                  ? '"العقارات في السوق الثانوي في المارينا أرخص من هذا المشروع قيد الإنشاء. لماذا يجب أن أدفع سعراً أعلى؟"' 
                  : '"The secondary market properties in Marina are cheaper than this off-plan project. Why should I pay a premium?"'}
              </div>
            </div>
            
            <div style={{ background: 'rgba(52,199,89,0.1)', border: '1px solid rgba(52,199,89,0.2)', borderRadius: 16, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#34c759' }}>{isAr ? 'نصيحة مدرب الذكاء الاصطناعي' : 'AI COACHING TIP'}</span>
              </div>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, textAlign: isAr ? 'right' : 'left' }}>
                {isAr 
                  ? 'حول النقاش إلى ' : 'Pivot to '}
                <strong style={{ color: '#fff' }}>{isAr ? 'ارتفاع قيمة العقار' : 'capital appreciation'}</strong> 
                {isAr ? ' و' : ' and '}
                <strong style={{ color: '#fff' }}>{isAr ? 'سهولة الدفع' : 'payment ease'}</strong>: 
                {isAr 
                  ? ' "أنت محق، ولكن مع هذه الوحدة قيد الإنشاء، تحصل على خطة دفع لما بعد التسليم لمدة 3 سنوات وإعفاء من رسوم التسجيل العقاري، مما يوفر عليك 4% مقدماً."' 
                  : ' "You\'re right, but with this off-plan unit, you get a 3-year post-handover payment plan and a DLD fee waiver. That saves you 4% upfront, and the capital appreciation historically yields 15% before handover."'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ARABIC SUPPORT / FOLLOW UP */}
      <section style={{ padding: '100px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          
          <div style={{ background: '#f5f5f7', borderRadius: 24, padding: 32, border: '1px solid rgba(0,0,0,0.06)', order: isAr ? 2 : 1 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexDirection: isAr ? 'row-reverse' : 'row' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div style={{ textAlign: isAr ? 'right' : 'left' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f' }}>{isAr ? 'رسالة واتساب مولدة آلياً' : 'Auto-Generated WhatsApp'}</div>
                  <div style={{ fontSize: 13, color: '#6e6e73' }}>{isAr ? 'مرسلة إلى طارق السويدي' : 'Sent to Tariq Al-Suwaidi'}</div>
                </div>
             </div>
             
             <div style={{ background: '#fff', padding: 20, borderRadius: isAr ? '16px 0 16px 16px' : '0 16px 16px 16px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <p style={{ fontSize: 14, color: '#1d1d1f', lineHeight: 1.6, direction: 'rtl', textAlign: 'right' }}>
                  مرحباً أستاذ طارق، سعدت بالحديث معك اليوم. بناءً على طلبك، أرفق لك تفاصيل مشروع داون تاون مع خطة الدفع 70/30. متى يناسبك نحدد موعد لزيارة مركز المبيعات الأسبوع القادم؟
                </p>
             </div>
          </div>

          <div style={{ order: isAr ? 1 : 2 }}>
            <h2 className="serif" style={{ fontSize: 40, letterSpacing: '-1px', marginBottom: 20 }}>
              {isAr ? 'مسودة متابعة بالعربية في ثوانٍ' : 'Draft follow-ups in Arabic instantly'}
            </h2>
            <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.6, marginBottom: 24 }}>
              {isAr 
                ? 'وداعاً للترجمة اليدوية أو كتابة رسائل طويلة بعد كل مكالمة. يفهم DealFlow AI محادثاتك العربية بدقة ويقوم بصياغة رسائل واتساب وبريد إلكتروني فورية.' 
                : 'Say goodbye to manual translation or typing out long messages after every call. DealFlow AI understands your Arabic conversations perfectly and drafts context-aware WhatsApp and Email follow-ups in seconds.'}
            </p>
            <button onClick={() => window.location.href = '/features'} style={{ background: 'none', border: 'none', color: '#0071e3', fontSize: 15, fontWeight: 600 }}>
              {isAr ? 'استكشف كافة الميزات ←' : 'Explore all features →'}
            </button>
          </div>

        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ padding: '80px 48px', background: '#1d1d1f', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 24 }}>
            {[1,2,3,4,5].map(star => <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="#ff9f0a" stroke="#ff9f0a"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
          </div>
          <h3 className="serif" style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 400, lineHeight: 1.4, marginBottom: 32 }}>
            {isAr 
              ? '"لقد غير DealFlow طريقة عمل وكالتنا بالكامل. لم يعد الوكلاء بحاجة للبحث عن ملاحظات مواصفات العقار أو مقاييس العائد. الذكاء الاصطناعي يلتقط إشارات الشراء بدقة مذهلة."' 
              : '"DealFlow has completely changed how our agency operates. Agents no longer scramble for notes on property specs or ROI metrics. The AI catches buying signals we missed, and the Arabic transcription is flawlessly accurate."'}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#0071e3', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>SO</div>
            <div style={{ textAlign: isAr ? 'right' : 'left' }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>{isAr ? 'سارة عثمان' : 'Sarah Othman'}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{isAr ? 'مديرة المبيعات، مطور عقاري رائد' : 'Sales Director, Top UAE Developer'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section id="demo" style={{ padding: '120px 48px', background: '#f5f5f7', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, color: '#1d1d1f', marginBottom: 20 }}>
            {isAr ? 'جاهز لتوسيع نطاق ' : 'Ready to scale your '}<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'مبيعاتك العقارية؟' : 'real estate sales?'}</span>
          </h2>
          <p style={{ fontSize: 18, color: '#6e6e73', marginBottom: 40, lineHeight: 1.6 }}>
            {isAr 
              ? 'ابدأ تجربتك المجانية لمدة 14 يوماً اليوم. لا يلزم وجود بطاقة ائتمان. شاهد كيف يساعدك الذكاء الاصطناعي على إغلاق المزيد من الصفقات.' 
              : 'Start your 14-day free trial today. No credit card required. See exactly how AI can help you close more property deals.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => window.location.href = '/login'}
              style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 600 }}>
              {isAr ? 'ابدأ مجاناً ←' : 'Get Started Free →'}
            </button>
            <button onClick={() => window.location.href = '/contact'}
              style={{ height: 52, padding: '0 32px', borderRadius: 26, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 16, fontWeight: 500 }}>
              {isAr ? 'اتصل بالمبيعات' : 'Contact Sales'}
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <MarketingFooter />
    </div>
  )
}