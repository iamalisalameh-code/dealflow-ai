'use client'
import { useState, useEffect } from 'react'
import { t } from '@/lib/translations'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import AnimateIn from '@/components/AnimateIn'

export default function FeaturesClient() {
  const [lang, setLang] = useState<'en' | 'ar'>(() => { if (typeof window !== 'undefined') { return (localStorage.getItem('marketing_lang') as 'en' | 'ar') || 'en' } return 'en' })
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('transcription')

  useEffect(() => {
    setMounted(true)
    const handleStorage = () => {
      const saved = localStorage.getItem('marketing_lang') as 'en' | 'ar'
      if (saved) setLang(saved)
    }
    handleStorage()
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['transcription', 'coach', 'signals', 'analytics', 'prep-followup', 'team']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= (el.offsetTop - 300)) setActiveSection(section)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null
  const isAr = lang === 'ar'
  const tr = t[lang]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' })
  }

  const sidebarLinks = [
    { id: 'transcription', label: isAr ? 'تفريغ مباشر' : 'Live Transcription', color: '#0071e3' },
    { id: 'coach', label: isAr ? 'مدرب الصفقات' : 'AI Deal Coach', color: '#34c759' },
    { id: 'signals', label: isAr ? 'إشارات الشراء' : 'Buying Signals', color: '#ff9f0a' },
    { id: 'analytics', label: isAr ? 'تحليلات الأداء' : 'Health & Talk Ratio', color: '#ff453a' },
    { id: 'prep-followup', label: isAr ? 'التحضير والمتابعة' : 'Prep & Follow-ups', color: '#bf5af2' },
    { id: 'team', label: isAr ? 'إدارة الفريق' : 'Team Management', color: '#1d1d1f' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&family=Tajawal:wght@400;500;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #fff; color: #1d1d1f; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        button { cursor: pointer; font-family: inherit; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .fade-up   { animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both; }
        .fade-up-1 { animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .feature-block { padding: 80px 0; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .feature-block:last-child { border-bottom: none; }
        .mockup-card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.04); overflow: hidden; transition: box-shadow 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1); }
        .mockup-card:hover { box-shadow: 0 28px 72px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
        .sidebar-btn { transition: all 0.25s cubic-bezier(0.22,1,0.36,1); }
        .sidebar-btn:hover { background: rgba(0,0,0,0.04) !important; }
      `}</style>

      <MarketingNav activePage="features" />

      <main style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Tajawal', 'DM Sans', sans-serif" : "'DM Sans', -apple-system, sans-serif", textAlign: isAr ? 'right' : 'left' }}>

        {/* HERO */}
        <section style={{ paddingTop: 160, paddingBottom: 60, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative', overflow: 'hidden' }}>
          <div className="mesh" style={{ top: '0%', left: isAr ? 'auto' : '20%', right: isAr ? '20%' : 'auto', width: '30%', height: '60%', background: '#0071e3', opacity: 0.05 }} />
          <div className="mesh" style={{ top: '10%', right: isAr ? 'auto' : '20%', left: isAr ? '20%' : 'auto', width: '30%', height: '50%', background: '#bf5af2', opacity: 0.05 }} />
          <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: isAr ? '0' : '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
            {isAr ? 'نظرة متعمقة على الميزات' : 'Feature Deep Dive'}
          </div>
          <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: isAr ? 700 : 400, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 24 }}>
            {tr.features.title}<br />
            <span style={{ fontStyle: isAr ? 'normal' : 'italic', color: '#0071e3' }}>{tr.features.titleHighlight}</span>
          </h1>
          <p className="fade-up-2" style={{ fontSize: 19, color: '#6e6e73', maxWidth: 600, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
            {tr.features.subtitle}
          </p>
        </section>

        {/* MAIN WITH STICKY SIDEBAR */}
        <section style={{ display: 'flex', maxWidth: 1200, margin: '0 auto', padding: '40px 48px 120px', gap: 64, position: 'relative' }}>
          
          {/* Sticky Sidebar */}
          <div style={{ width: 240, flexShrink: 0 }}>
            <div style={{ position: 'sticky', top: 120, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#aeaeb2', letterSpacing: isAr ? '0' : '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                {isAr ? 'انتقل إلى الميزة' : 'Jump to feature'}
              </div>
              {sidebarLinks.map(link => (
                <button key={link.id} className="sidebar-btn" onClick={() => scrollTo(link.id)}
                  style={{ textAlign: isAr ? 'right' : 'left', padding: '8px 16px', borderRadius: 12, border: 'none', background: activeSection === link.id ? link.color + '12' : 'transparent', color: activeSection === link.id ? link.color : '#6e6e73', fontSize: 15, fontWeight: activeSection === link.id ? 700 : 500, display: 'flex', alignItems: 'center', gap: 10 }}>
                  {activeSection === link.id && <div style={{ width: 6, height: 6, borderRadius: '50%', background: link.color, flexShrink: 0 }} />}
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Sections */}
          <div style={{ flex: 1 }}>

            {/* 1. Live Transcription */}
            <div id="transcription" className="feature-block">
              <AnimateIn variant="fadeUp">
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: isAr ? '0' : '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>01 · {isAr ? 'تفريغ مباشر' : 'Live Transcription'}</div>
                <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 16, fontWeight: isAr ? 700 : 400 }}>{tr.features.feat1Title}</h2>
                <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40, fontWeight: 500 }}>{tr.features.feat1Desc}</p>
              </AnimateIn>
              <AnimateIn variant="scaleUp" delay={100}>
                <div className="mockup-card">
                  <div style={{ background: '#f5f5f7', padding: '12px 20px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f' }}>{isAr ? 'النص المباشر' : 'Live Transcript'}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0071e3', background: 'rgba(0,113,227,0.1)', padding: '4px 12px', borderRadius: 12 }}>{isAr ? 'اكتشاف تلقائي للغة' : 'AR / EN Auto-detect'}</span>
                  </div>
                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#34c759', marginBottom: 6 }}>{isAr ? 'سعيد (العميل)' : 'SAEED (PROSPECT)'}</div>
                      <div style={{ fontSize: 16, color: '#1d1d1f', lineHeight: 1.6, direction: 'rtl' }}>مرحبا، يعجبني الموقع بس أحتاج أعرف تفاصيل التمويل أكثر وهل في دفعة أولى مرنة؟</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#1d1d1f', marginBottom: 6 }}>{isAr ? 'أنت' : 'YOU'}</div>
                      <div style={{ fontSize: 16, color: '#1d1d1f', lineHeight: 1.6, direction: isAr ? 'rtl' : 'ltr' }}>
                        {isAr ? 'بالتأكيد يا سعيد. بالنسبة لهذا المشروع في الداون تاون، لدينا خطة دفع مرنة 70/30.' : 'Absolutely Saeed. For this specific project in Downtown, we have a flexible 70/30 payment plan.'}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateIn>
              <button onClick={() => window.location.href = '/pricing'} style={{ marginTop: 24, background: 'none', border: 'none', color: '#0071e3', fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseEnter={e => (e.target as HTMLElement).style.opacity = '0.7'} onMouseLeave={e => (e.target as HTMLElement).style.opacity = '1'}>
                {isAr ? 'شاهد خطط الأسعار ←' : 'See pricing plans →'}
              </button>
            </div>

            {/* 2. AI Deal Coach */}
            <div id="coach" className="feature-block">
              <AnimateIn variant="fadeUp">
                <div style={{ fontSize: 13, fontWeight: 700, color: '#34c759', letterSpacing: isAr ? '0' : '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>02 · {isAr ? 'مدرب الصفقات' : 'AI Deal Coach'}</div>
                <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 16, fontWeight: isAr ? 700 : 400 }}>{tr.features.feat2Title}</h2>
                <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40, fontWeight: 500 }}>{tr.features.feat2Desc}</p>
              </AnimateIn>
              <AnimateIn variant="scaleUp" delay={100}>
                <div className="mockup-card" style={{ background: '#1d1d1f', color: '#fff', border: 'none' }}>
                  <div style={{ padding: 24, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8, fontWeight: 600 }}>{isAr ? 'العميل قال:' : 'PROSPECT SAID:'}</div>
                    <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.5 }}>
                      {isAr ? '"رسوم الخدمات لديكم تبدو أعلى من منافسيكم."' : '"Your service charges seem higher than your competitor across the street."'}
                    </div>
                  </div>
                  <div style={{ padding: 24, background: 'rgba(52,199,89,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#34c759' }}>{isAr ? 'اقتراح الذكاء الاصطناعي' : 'AI SUGGESTION'}</span>
                    </div>
                    <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>
                      {isAr ? 'اعترف بالتكلفة، لكن ركز على القيمة: ' : 'Acknowledge the cost, but pivot to value: '}
                      <strong style={{ color: '#fff', fontWeight: 700 }}>
                        {isAr ? '"نعم هي أعلى قليلاً، ولكن المبنى يشمل تكييف مجاني ونظام منزل ذكي، مما يوفر لك حوالي 4,000 درهم سنوياً في الفواتير."' : '"They are slightly higher, but our building includes chiller-free AC and a dedicated smart-home system, saving you roughly AED 4,000/year in utilities."'}
                      </strong>
                    </p>
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* 3. Buying Signals */}
            <div id="signals" className="feature-block">
              <AnimateIn variant="fadeUp">
                <div style={{ fontSize: 13, fontWeight: 700, color: '#ff9f0a', letterSpacing: isAr ? '0' : '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>03 · {isAr ? 'إشارات الشراء' : 'Buying Signal Detection'}</div>
                <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 16, fontWeight: isAr ? 700 : 400 }}>{tr.features.feat3Title}</h2>
                <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40, fontWeight: 500 }}>{tr.features.feat3Desc}</p>
              </AnimateIn>
              <AnimateIn variant="scaleUp" delay={100}>
                <div className="mockup-card" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <span style={{ fontSize: 15, fontWeight: 700 }}>{isAr ? 'الإشارات المكتشفة (3)' : 'Detected Signals (3)'}</span>
                    <span style={{ padding: '4px 12px', background: 'rgba(255,159,10,0.1)', color: '#ff9f0a', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>{isAr ? 'نية شراء عالية' : 'High Intent'}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { time: '12:45', textEN: 'Asked about handover date and SPA process', textAR: 'سأل عن موعد التسليم وإجراءات العقد' },
                      { time: '18:20', textEN: 'Inquired about paying via cryptocurrency', textAR: 'استفسر عن إمكانية الدفع بالعملات الرقمية' },
                      { time: '24:10', textEN: 'Requested to see the contract draft', textAR: 'طلب رؤية مسودة العقد المبدئية' },
                    ].map((sig, i) => (
                      <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 16px', borderRadius: 16, background: '#f5f5f7', transition: 'background 0.2s' }} onMouseEnter={e => (e.currentTarget.style.background = '#efefef')} onMouseLeave={e => (e.currentTarget.style.background = '#f5f5f7')}>
                        <div style={{ fontSize: 14, color: '#aeaeb2', fontFamily: 'monospace', paddingTop: 2, fontWeight: 600 }}>{sig.time}</div>
                        <div style={{ fontSize: 15, color: '#1d1d1f', fontWeight: 500 }}>{isAr ? sig.textAR : sig.textEN}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* 4. Health & Analytics */}
            <div id="analytics" className="feature-block">
              <AnimateIn variant="fadeUp">
                <div style={{ fontSize: 13, fontWeight: 700, color: '#ff453a', letterSpacing: isAr ? '0' : '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>04 · {isAr ? 'تحليلات الأداء' : 'Health & Analytics'}</div>
                <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 16, fontWeight: isAr ? 700 : 400 }}>{isAr ? 'اعرف بالضبط أين تقف الصفقة' : 'Know exactly where the deal stands'}</h2>
                <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40, fontWeight: 500 }}>
                  {isAr ? 'راقب نسبة الحديث واحصل على مؤشر صحة الصفقة المباشر المحسوب عن طريق تحليل المشاعر والاعتراضات وإشارات الشراء.' : 'Monitor your Talk Ratio (aim for 45-55%) and get a live Deal Health Score calculated by analyzing sentiment, objections overcome, and buying signals generated.'}
                </p>
              </AnimateIn>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                <AnimateIn variant="scaleUp" delay={60}>
                  <div className="mockup-card" style={{ padding: 32, textAlign: 'center', height: '100%' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#6e6e73', letterSpacing: isAr ? '0' : '0.1em', marginBottom: 16 }}>{isAr ? 'صحة الصفقة' : 'DEAL HEALTH'}</div>
                    <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto' }}>
                      <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f5f5f7" strokeWidth="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#34c759" strokeWidth="3" strokeDasharray="85, 100" />
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1px' }}>85<span style={{ fontSize: 16 }}>%</span></div>
                    </div>
                    <div style={{ fontSize: 15, color: '#34c759', fontWeight: 700, marginTop: 16 }}>{isAr ? 'احتمالية إغلاق عالية' : 'Highly likely to close'}</div>
                  </div>
                </AnimateIn>
                <AnimateIn variant="scaleUp" delay={120}>
                  <div className="mockup-card" style={{ padding: 32, textAlign: 'center', height: '100%' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#6e6e73', letterSpacing: isAr ? '0' : '0.1em', marginBottom: 16 }}>{isAr ? 'نسبة الحديث' : 'TALK RATIO'}</div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 24, height: 120 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 44, height: 50, background: '#0071e3', borderRadius: '8px 8px 0 0' }} />
                        <div style={{ fontSize: 16, fontWeight: 700 }}>42%</div>
                        <div style={{ fontSize: 14, color: '#6e6e73', fontWeight: 500 }}>{isAr ? 'أنت' : 'You'}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 44, height: 70, background: '#ff453a', borderRadius: '8px 8px 0 0' }} />
                        <div style={{ fontSize: 16, fontWeight: 700 }}>58%</div>
                        <div style={{ fontSize: 14, color: '#6e6e73', fontWeight: 500 }}>{isAr ? 'العميل' : 'Client'}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 15, color: '#6e6e73', marginTop: 16, fontWeight: 500 }}>{isAr ? 'توازن استماع مثالي' : 'Perfect listening balance'}</div>
                  </div>
                </AnimateIn>
              </div>
            </div>

            {/* 5. Prep & Follow Up */}
            <div id="prep-followup" className="feature-block">
              <AnimateIn variant="fadeUp">
                <div style={{ fontSize: 13, fontWeight: 700, color: '#bf5af2', letterSpacing: isAr ? '0' : '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>05 · {isAr ? 'التحضير والمتابعة التلقائية' : 'Prep & Smart Follow-ups'}</div>
                <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 16, fontWeight: isAr ? 700 : 400 }}>{tr.features.feat4Title}</h2>
                <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40, fontWeight: 500 }}>{tr.features.feat4Desc}</p>
              </AnimateIn>
              <AnimateIn variant="scaleUp" delay={100}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 24, overflow: 'hidden' }}>
                  <div style={{ background: '#fafafa', padding: 32 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#6e6e73', marginBottom: 20 }}>{isAr ? 'قبل ديل فلو' : 'BEFORE DEALFLOW'}</div>
                    <div style={{ width: '100%', height: 160, background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, padding: 16, position: 'relative' }}>
                      <div style={{ width: '60%', height: 8, background: '#f0f0f0', borderRadius: 4, marginBottom: 12 }} />
                      <div style={{ width: '80%', height: 8, background: '#f0f0f0', borderRadius: 4, marginBottom: 12 }} />
                      <div style={{ width: '40%', height: 8, background: '#f0f0f0', borderRadius: 4, marginBottom: 24 }} />
                      <div style={{ position: 'absolute', bottom: 16, right: 16, fontSize: 12, color: '#aeaeb2', fontWeight: 500 }}>{isAr ? 'كتابة بريد يدوي... 15 دقيقة' : 'Drafting manual email... 15 mins'}</div>
                    </div>
                  </div>
                  <div style={{ background: '#fff', padding: 32 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#bf5af2', marginBottom: 20 }}>{isAr ? 'مع ديل فلو AI' : 'WITH DEALFLOW AI'}</div>
                    <div style={{ width: '100%', background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.04)', borderRadius: 16, padding: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>{isAr ? 'مسودة واتساب جاهزة' : 'WhatsApp Draft Ready'}</span>
                      </div>
                      <p style={{ fontSize: 14, color: '#1d1d1f', lineHeight: 1.6, background: '#fff', padding: 12, borderRadius: 12, border: '1px solid rgba(0,0,0,0.04)', fontWeight: 500 }}>
                        {isAr ? '"مرحباً سعيد، سعدت بالحديث معك اليوم. كما طلبت، إليك الكتيب الخاص بوحدة الداون تاون..."' : '"Hi Saeed, great speaking today. As requested, here is the brochure for the Downtown unit with the 70/30 plan..."'}
                      </p>
                      <button style={{ width: '100%', marginTop: 12, background: '#1d1d1f', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 0', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseEnter={e => (e.target as HTMLElement).style.opacity = '0.85'} onMouseLeave={e => (e.target as HTMLElement).style.opacity = '1'}>
                        {isAr ? 'إرسال للعميل' : 'Send to Client'}
                      </button>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* 6. Team Management */}
            <div id="team" className="feature-block">
              <AnimateIn variant="fadeUp">
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1d1d1f', letterSpacing: isAr ? '0' : '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>06 · {isAr ? 'إدارة الفريق' : 'Team Management'}</div>
                <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', marginBottom: 16, fontWeight: isAr ? 700 : 400 }}>{isAr ? 'درّب فريق المبيعات بأكمله' : 'Coach your entire sales floor'}</h2>
                <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.6, marginBottom: 40, fontWeight: 500 }}>
                  {isAr ? 'لمديري المبيعات: قم بدعوة الوكلاء، وتفعيل ميزات محددة، وراجع تحليلات أداء الفريق.' : 'For sales managers: invite agents, set call limits, enable/disable specific features, and review team performance analytics.'}
                </p>
              </AnimateIn>
              <AnimateIn variant="scaleUp" delay={100}>
                <div className="mockup-card">
                  <div style={{ background: '#f5f5f7', padding: '16px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#1d1d1f' }}>{isAr ? 'الوكلاء النشطين (3/10)' : 'Active Agents (3/10)'}</span>
                  </div>
                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                      { name: isAr ? 'طارق هـ.' : 'Tariq H.', role: isAr ? 'وكيل أول' : 'Senior Agent', score: '92%', status: isAr ? 'في مكالمة' : 'On a Call', isCall: true },
                      { name: isAr ? 'سارة م.' : 'Sarah M.', role: isAr ? 'مندوبة مبيعات' : 'Sales Rep', score: '85%', status: isAr ? 'متاح' : 'Available', isCall: false },
                      { name: isAr ? 'عمر ك.' : 'Omar K.', role: isAr ? 'مندوب مبيعات' : 'Sales Rep', score: '78%', status: isAr ? 'متاح' : 'Available', isCall: false },
                    ].map((agent, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.04)' : 'none', transition: 'background 0.2s', borderRadius: 8, padding: '12px 8px' }} onMouseEnter={e => (e.currentTarget.style.background = '#f9f9f9')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1d1d1f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{agent.name.charAt(0)}</div>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#1d1d1f' }}>{agent.name}</div>
                            <div style={{ fontSize: 13, color: '#6e6e73', fontWeight: 500 }}>{agent.role}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 11, color: '#aeaeb2', marginBottom: 2, fontWeight: 700 }}>{isAr ? 'التقييم' : 'AVG SCORE'}</div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#1d1d1f' }}>{agent.score}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: 90, justifyContent: 'flex-end' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: agent.isCall ? '#ff9f0a' : '#34c759' }} />
                            <span style={{ fontSize: 13, color: '#6e6e73', fontWeight: 600 }}>{agent.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>
              <button onClick={() => window.location.href = '/pricing'} style={{ marginTop: 24, background: 'none', border: 'none', color: '#1d1d1f', fontSize: 15, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}>
                {isAr ? 'عرض أسعار فريق العمل ←' : 'View Team Pricing →'}
              </button>
            </div>

          </div>
        </section>

        {/* BOTTOM CTA */}
        <section style={{ padding: '120px 48px', background: '#1d1d1f', position: 'relative', overflow: 'hidden' }}>
          <div className="mesh" style={{ top: '-30%', left: '-10%', width: '50%', height: '80%', background: '#0071e3', opacity: 0.15 }} />
          <div className="mesh" style={{ bottom: '-30%', right: '-10%', width: '40%', height: '70%', background: '#bf5af2', opacity: 0.12 }} />
          <AnimateIn variant="scaleUp">
            <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: isAr ? 700 : 400, letterSpacing: '-1px', lineHeight: 1.1, color: '#fff', marginBottom: 20 }}>
                {isAr ? 'جرب الميزات مباشرة في مكالمتك القادمة' : 'Experience the features live on your next call'}
              </h2>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 40, lineHeight: 1.6, fontWeight: 500 }}>{tr.common.freeTrial}</p>
              <button onClick={() => window.location.href = '/login'}
                style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 700, transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s' }}
                onMouseEnter={e => { (e.target as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.02)'; (e.target as HTMLButtonElement).style.boxShadow = '0 12px 32px rgba(255,255,255,0.15)' }}
                onMouseLeave={e => { (e.target as HTMLButtonElement).style.transform = 'scale(1)'; (e.target as HTMLButtonElement).style.boxShadow = 'none' }}>
                {tr.common.getStarted}
              </button>
            </div>
          </AnimateIn>
        </section>

      </main>

      <MarketingFooter />
    </>
  )
}