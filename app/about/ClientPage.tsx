'use client'
import { useState, useEffect } from 'react'
import { t } from '@/lib/translations'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'

export default function AboutClient() {
  const [lang, setLang] = useState<'en' | 'ar'>(() => { if (typeof window !== 'undefined') { return (localStorage.getItem('marketing_lang') as 'en' | 'ar') || 'en' } return 'en' })
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Language Engine
  useEffect(() => {
    setMounted(true)
    const handleStorage = () => {
      const saved = localStorage.getItem('marketing_lang') as 'en' | 'ar'
      if (saved) setLang(saved)
    }
    handleStorage()
    window.addEventListener('storage', handleStorage)
    
    // Scroll listener
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!mounted) return null

  const isAr = lang === 'ar'
  const tr = t[lang]

  const stats = [
    { value: '1M+', label: isAr ? 'دقيقة تم تفريغها' : 'Minutes transcribed', color: '#0071e3' },
    { value: '91%', label: isAr ? 'دقة اللغة العربية' : 'Arabic accuracy', color: '#34c759' },
    { value: '14', label: isAr ? 'دولة مدعومة' : 'Countries supported', color: '#bf5af2' },
  ]

  const values = [
    {
      title: isAr ? 'صُمم للشرق الأوسط أولاً' : 'Built for MENA first',
      desc: isAr 
        ? 'لم نقم بمجرد ترجمة تطبيق إنجليزي. تم بناء ديل فلو من الصفر لفهم اللهجة الخليجية والمصرية والعربية الفصحى بشكل أصيل.' 
        : 'We didn\'t just translate an English app. DealFlow AI was built from the ground up to understand Gulf Arabic, Egyptian, and Modern Standard Arabic natively.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
      color: '#0071e3'
    },
    {
      title: isAr ? 'السرعة تحسم الصفقات' : 'Speed wins deals',
      desc: isAr 
        ? 'المبيعات تعتمد على الزخم. قمنا بتصميم كل شيء من أجل السرعة - من التفريغ الفوري إلى مسودات المتابعة التي تصبح جاهزة بمجرد إنهاء المكالمة.' 
        : 'Sales is about momentum. We engineer everything for speed—from real-time, zero-latency transcription to follow-up emails drafted the second you hang up.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff9f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      color: '#ff9f0a'
    },
    {
      title: isAr ? 'خصوصية مطلقة' : 'Absolute privacy',
      desc: isAr 
        ? 'بيانات صفقاتك ملكك. نحن نستخدم تشفيرًا من مستوى الشركات ولا نقوم أبدًا بتدريب نماذجنا الأساسية على محادثاتك الخاصة.' 
        : 'Your deal data is yours. We use enterprise-grade encryption, strict role-based access, and we never train our base AI models on your private conversations.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      color: '#34c759'
    },
    {
      title: isAr ? 'الدقة فوق كل شيء' : 'Accuracy over everything',
      desc: isAr 
        ? 'المكالمة المفرغة لا قيمة لها إذا كانت مليئة بالأخطاء. نستخدم أعلى نماذج السحابة لضمان التقاط كل اعتراض وإشارة شراء بشكل مثالي.' 
        : 'A transcribed call is useless if it\'s full of errors. We utilize the highest-tier cloud models to ensure every objection and buying signal is captured perfectly.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#bf5af2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
      color: '#bf5af2'
    }
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&family=Tajawal:wght@400;500;700;800&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff; color: #1d1d1f; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        button { cursor: pointer; font-family: inherit; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        
        .value-card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 24px; padding: 32px; transition: transform 0.3s, box-shadow 0.3s; }
        .value-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
        
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}</style>

      <MarketingNav activePage="about" />

      {/* MASTER RTL / LTR WRAPPER */}
      <main style={{ 
        direction: isAr ? 'rtl' : 'ltr', 
        fontFamily: isAr ? "'Tajawal', 'DM Sans', sans-serif" : "'DM Sans', -apple-system, sans-serif", 
        textAlign: isAr ? 'right' : 'left' 
      }}>

        {/* HERO */}
        <section style={{ paddingTop: 160, paddingBottom: 80, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative', overflow: 'hidden' }}>
          <div className="mesh" style={{ top: '-10%', left: isAr ? 'auto' : '15%', right: isAr ? '15%' : 'auto', width: '35%', height: '60%', background: '#0071e3', opacity: 0.05 }} />
          <div className="mesh" style={{ top: '0%', right: isAr ? 'auto' : '15%', left: isAr ? '15%' : 'auto', width: '30%', height: '50%', background: '#bf5af2', opacity: 0.05 }} />
          
          <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: isAr ? '0' : '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
            {isAr ? 'قصتنا' : 'Our Story'}
          </div>
          <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: isAr ? 700 : 400, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 24, fontFamily: isAr ? 'inherit' : 'inherit' }}>
            {isAr ? 'صُنع بواسطة محترفي المبيعات،' : 'Built by salespeople,'}<br />
            <span style={{ fontStyle: isAr ? 'normal' : 'italic', color: '#0071e3' }}>
              {isAr ? 'لمحترفي المبيعات' : 'for salespeople'}
            </span>
          </h1>
          <p className="fade-up-2" style={{ fontSize: 19, color: '#6e6e73', maxWidth: 640, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
            {isAr 
              ? 'بنينا ديل فلو لأننا سئمنا من خسارة الصفقات بسبب الملاحظات السيئة والمتابعات المنسية والافتقار إلى الأدوات التي تفهم اللغة العربية فعلياً.' 
              : 'We built DealFlow AI because we were tired of losing deals to bad notes, forgotten follow-ups, and a lack of tools that actually understood Arabic.'}
          </p>
        </section>

        {/* THE PROBLEM & MISSION */}
        <section style={{ padding: '80px 48px', background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 80, alignItems: 'center' }}>
            
            <div>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,69,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff453a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 16, fontWeight: isAr ? 700 : 400, fontFamily: isAr ? 'inherit' : 'inherit' }}>
                {isAr ? 'المشكلة' : 'The Problem'}
              </h2>
              <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.7, marginBottom: 24, fontWeight: 500 }}>
                {isAr 
                  ? 'قبل ديل فلو، كانت مكالمات المبيعات الخاصة بنا فوضوية. حاولنا تدوين الملاحظات يدوياً أثناء التحدث مع العملاء، مما أفسد سير المحادثة. فوتنا إشارات الشراء الحاسمة. ونسينا تسجيل التفاصيل في نظام إدارة علاقات العملاء.' 
                  : 'Before DealFlow AI, our sales calls were chaotic. We tried taking manual notes while speaking to clients, which ruined the flow of conversation. We missed critical buying signals. We forgot to log details in the CRM.'}
              </p>
              <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.7, fontWeight: 500 }}>
                {isAr 
                  ? 'والأسوأ من ذلك كله، أن أدوات الذكاء الاصطناعي الحالية في السوق كانت تركز كلياً على اللغة الإنجليزية. عندما يتحول عميل محتمل من دبي أو الرياض إلى اللهجة الخليجية، تتحول النصوص إلى كلام غير مفهوم. أدركنا أن منطقة الشرق الأوسط وشمال أفريقيا يتم إهمالها في ثورة مبيعات الذكاء الاصطناعي.' 
                  : 'Worst of all, existing AI tools on the market were entirely English-focused. When a prospect from Dubai or Riyadh switched to Gulf Arabic, the transcripts turned into gibberish. We realized the MENA region was being left behind in the AI sales revolution.'}
              </p>
            </div>

            <div style={{ background: '#f5f5f7', borderRadius: 32, padding: 48, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 32, right: isAr ? 'auto' : 32, left: isAr ? 32 : 'auto', color: 'rgba(0,0,0,0.05)', transform: isAr ? 'scaleX(-1)' : 'none' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              </div>
              <h2 className="serif" style={{ fontSize: 32, letterSpacing: '-1px', marginBottom: 24, position: 'relative', zIndex: 1, fontWeight: isAr ? 700 : 400, fontFamily: isAr ? 'inherit' : 'inherit' }}>
                {isAr ? 'المهمة' : 'The Mission'}
              </h2>
              <p style={{ fontSize: 19, color: '#1d1d1f', lineHeight: 1.6, fontWeight: 600, position: 'relative', zIndex: 1 }}>
                {isAr 
                  ? '"تمكين كل محترف مبيعات في منطقة الشرق الأوسط وشمال أفريقيا بذكاء إيرادات يفهم لغتهم وثقافتهم وسير عملهم حقاً."' 
                  : '"To empower every sales professional in the MENA region with revenue intelligence that actually understands their language, their culture, and their workflow."'}
              </p>
            </div>

          </div>
        </section>

        {/* BY THE NUMBERS */}
        <section style={{ padding: '100px 48px', background: '#f5f5f7' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: isAr ? '0' : '0.15em', textTransform: 'uppercase', marginBottom: 48 }}>
              {isAr ? 'بلغة الأرقام' : 'By the numbers'}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ padding: '40px 24px', background: '#fff', borderRadius: 28, border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 56, fontWeight: 700, color: stat.color, letterSpacing: '-2px', lineHeight: 1, marginBottom: 12, fontFamily: "'DM Sans', Georgia, serif" }}>{stat.value}</div>
                  <div style={{ fontSize: 17, fontWeight: 600, color: '#1d1d1f' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section style={{ padding: '120px 48px', background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: isAr ? 700 : 400, letterSpacing: '-1px', lineHeight: 1.1, fontFamily: isAr ? 'inherit' : 'inherit' }}>
                {isAr ? 'قيمنا' : 'Our Core'} <span style={{ fontStyle: isAr ? 'normal' : 'italic', color: isAr ? '#0071e3' : 'inherit' }}>{isAr ? 'الأساسية' : 'Values'}</span>
              </h2>
              <p style={{ fontSize: 19, color: '#6e6e73', maxWidth: 500, margin: '16px auto 0', fontWeight: 500 }}>
                {isAr 
                  ? 'المبادئ التي توجهنا في بناء ديل فلو كل يوم.' 
                  : 'The principles that guide how we build DealFlow AI every single day.'}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
              {values.map((v, i) => (
                <div key={i} className="value-card">
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: v.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#1d1d1f', marginBottom: 12, letterSpacing: '-0.3px' }}>{v.title}</h3>
                  <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.7, fontWeight: 500 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section style={{ padding: '0 48px 120px', background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ padding: 48, background: '#1d1d1f', borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: isAr ? '0' : '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
                  {isAr ? 'فريق العمل' : 'The Team'}
                </div>
                <h2 className="serif" style={{ fontSize: 40, color: '#fff', letterSpacing: '-1px', marginBottom: 16, fontWeight: isAr ? 700 : 400, fontFamily: isAr ? 'inherit' : 'inherit' }}>
                  {isAr ? 'تعرف على المؤسسين' : 'Meet the creators'}
                </h2>
                <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', maxWidth: 420, lineHeight: 1.6, fontWeight: 500 }}>
                  {isAr 
                    ? 'نحن فريق متخصص من المهندسين وخبراء المبيعات وباحثي الذكاء الاصطناعي في الإمارات العربية المتحدة، ملتزمون ببناء منصة الإيرادات المثلى.' 
                    : 'We are a dedicated team of engineers, sales veterans, and AI researchers based in the UAE, committed to building the ultimate revenue platform.'}
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: 20 }}>
                {/* Founder Avatar Placeholder */}
                <div style={{ width: 200, padding: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, textAlign: 'center' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #0071e3, #bf5af2)', margin: '0 auto 16px' }} />
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                    {isAr ? 'الفريق المؤسس' : 'Founding Team'}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>DealFlow AI</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section style={{ padding: '120px 48px', background: '#1d1d1f', position: 'relative', overflow: 'hidden' }}>
          <div className="mesh" style={{ top: '-30%', left: '-10%', width: '50%', height: '80%', background: '#0071e3', opacity: 0.15 }} />
          <div className="mesh" style={{ bottom: '-30%', right: '-10%', width: '40%', height: '70%', background: '#bf5af2', opacity: 0.12 }} />
          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: isAr ? 700 : 400, letterSpacing: '-1px', lineHeight: 1.1, color: '#fff', marginBottom: 20, fontFamily: isAr ? 'inherit' : 'inherit' }}>
              {isAr ? 'هل أنت مستعد لإغلاق' : 'Ready to close'} <br />
              <span style={{ fontStyle: isAr ? 'normal' : 'italic', color: '#0071e3' }}>{isAr ? 'المزيد من الصفقات؟' : 'more deals?'}</span>
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 40, lineHeight: 1.6, fontWeight: 500 }}>
              {isAr 
                ? 'انضم إلى فرق المبيعات الأسرع نمواً في منطقة الشرق الأوسط وشمال أفريقيا.' 
                : 'Join the fastest-growing sales teams in the MENA region using DealFlow AI.'}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => window.location.href = '/login'}
                style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 700 }}>
                {tr.common.getStarted}
              </button>
              <button onClick={() => window.location.href = '/contact'}
                style={{ height: 52, padding: '0 32px', borderRadius: 26, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 16, fontWeight: 600 }}>
                {isAr ? 'تواصل مع المبيعات' : 'Contact Sales'}
              </button>
            </div>
          </div>
        </section>

      </main>

      <MarketingFooter />
    </>
  )
}