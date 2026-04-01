'use client'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import { useState, useEffect } from 'react'

export default function ChangelogClient() {
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

  // Step 2: Wrap text strings with translations
  const updates = [
    {
      version: 'v1.4.0',
      date: isAr ? '28 مارس 2026' : 'March 28, 2026',
      title: isAr ? 'تحديث قوة العقارات' : 'The Real Estate Power Update',
      changes: [
        { type: 'New', typeAr: 'جديد', text: isAr ? 'الاكتشاف التلقائي لتواريخ تسليم العقار وحالة اتفاقية البيع والشراء (SPA).' : 'Auto-detection of Property Handover dates and SPA status.' },
        { type: 'Improved', typeAr: 'تحسين', text: isAr ? 'تحسين دقة اللهجة الخليجية للمكالمات الخارجية/المحمولة.' : 'Enhanced Khaleeji dialect accuracy for outdoor/mobile calls.' },
        { type: 'New', typeAr: 'جديد', text: isAr ? 'تكامل مباشر مع واتساب لملخصات ما بعد المكالمة.' : 'Direct WhatsApp integration for post-call summaries.' }
      ]
    },
    {
      version: 'v1.3.2',
      date: isAr ? '10 مارس 2026' : 'March 10, 2026',
      title: isAr ? 'الأداء والسرعة' : 'Performance & Speed',
      changes: [
        { type: 'Improved', typeAr: 'تحسين', text: isAr ? 'تقليل وقت استجابة النسخ المباشر بنسبة 40٪ باستخدام Gemini 2.5 Flash.' : 'Reduced live transcription latency by 40% using Gemini 2.5 Flash.' },
        { type: 'Fixed', typeAr: 'إصلاح', text: isAr ? 'حل مشكلة المزامنة مع حقول النص متعددة الأسطر في HubSpot.' : 'Resolved a sync issue with HubSpot multi-line text fields.' },
        { type: 'Improved', typeAr: 'تحسين', text: isAr ? 'واجهة مستخدم جديدة لطبقة "مدرب الصفقات المباشر".' : 'New UI for the "Live Deal Coach" overlay.' }
      ]
    },
    {
      version: 'v1.2.0',
      date: isAr ? '15 فبراير 2026' : 'February 15, 2026',
      title: isAr ? 'إطلاق خطة المؤسسات متعددة الوكلاء' : 'Enterprise Multi-Agent Launch',
      changes: [
        { type: 'New', typeAr: 'جديد', text: isAr ? 'لوحة تحكم إدارة الفريق: إدارة ما يصل إلى 50 وكيلًا من حساب واحد.' : 'Team Management Dashboard: Manage up to 50 agents from one seat.' },
        { type: 'New', typeAr: 'جديد', text: isAr ? 'تصنيف المكالمات: تصفية النصوص حسب علامات "سكني" مقابل "تجاري".' : 'Call Scoping: Filter transcripts by "Residential" vs "Commercial" tags.' },
        { type: 'New', typeAr: 'جديد', text: isAr ? 'دعم الدخول الموحد (SSO) لخطط المؤسسات.' : 'Single Sign-On (SSO) support for Enterprise plans.' }
      ]
    }
  ]

  const badgeColor = (type: string) => {
    switch (type) {
      case 'New': return { bg: 'rgba(0,113,227,0.1)', text: '#0071e3' };
      case 'Improved': return { bg: 'rgba(52,199,89,0.1)', text: '#34c759' };
      case 'Fixed': return { bg: 'rgba(255,159,10,0.1)', text: '#ff9f0a' };
      default: return { bg: '#f5f5f7', text: '#6e6e73' };
    }
  }

  return (
    // Step 3: Add direction and font to main wrapper
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Sans', sans-serif" }}>
      <style>{`
        /* Step 4: Add Noto Sans Arabic to font import */
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff; color: #1d1d1f; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        html[dir="rtl"] .serif { font-family: inherit; } /* Prevent serif in Arabic */
        
        button { cursor: pointer; font-family: inherit; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        
        /* Updated to logical properties for seamless RTL support */
        .timeline-item { position: relative; padding-inline-start: 48px; margin-bottom: 80px; }
        .timeline-item::before { content: ""; position: absolute; inset-inline-start: 7px; top: 0; bottom: -80px; width: 2px; background: rgba(0,0,0,0.06); }
        .timeline-item:last-child::before { display: none; }
        .timeline-dot { position: absolute; inset-inline-start: 0; top: 8px; width: 16px; height: 16px; border-radius: 50%; background: #0071e3; border: 4px solid #fff; box-shadow: 0 0 0 1px rgba(0,0,0,0.06); z-index: 1; }
        
        .change-tag { padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-inline-end: 12px; display: inline-block; vertical-align: middle; }

        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}</style>

      {/* NAV */}
      <MarketingNav activePage="changelog" />

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 80, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative' }}>
        <div className="mesh" style={{ top: '0%', left: '25%', width: '30%', height: '60%', background: '#0071e3', opacity: 0.04 }} />
        <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
          {isAr ? 'تحديثات المنتج' : 'Product Updates'}
        </div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 24 }}>
          {isAr ? 'ما ' : "What's "} <span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'الجديد.' : 'new.'}</span>
        </h1>
        <p className="fade-up-2" style={{ fontSize: 18, color: '#6e6e73', maxWidth: 540, margin: '0 auto' }}>
          {isAr 
            ? 'نحن نطلق ميزات جديدة كل أسبوع لمساعدتك على إغلاق الصفقات بشكل أسرع. إليك جدول زمني لما قمنا ببنائه.' 
            : 'We ship new features every week to help you close deals faster. Here is a timeline of what we have been building.'}
        </p>
      </section>

      {/* TIMELINE SECTION */}
      <section style={{ padding: '40px 48px 120px', maxWidth: 800, margin: '0 auto' }}>
        <div className="fade-up-2">
          {updates.map((update, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', fontFamily: isAr ? 'inherit' : 'monospace' }}>{update.version}</span>
                <span style={{ fontSize: 13, color: '#aeaeb2', fontWeight: 500 }}>{update.date}</span>
              </div>
              <h2 className="serif" style={{ fontSize: 28, marginBottom: 24, color: '#1d1d1f' }}>{update.title}</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {update.changes.map((change, j) => {
                  const colors = badgeColor(change.type);
                  return (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <span className="change-tag" style={{ background: colors.bg, color: colors.text }}>
                        {isAr ? change.typeAr : change.type}
                      </span>
                      <span style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.5 }}>{change.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <MarketingFooter />
    </div>
  )
}