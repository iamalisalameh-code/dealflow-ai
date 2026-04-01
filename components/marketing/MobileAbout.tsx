'use client'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'
import { useState, useEffect } from 'react'

export default function MobileAbout() {
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

  // Step 2: Wrap data objects with translations
  const values = [
    { 
      icon: '⚡', 
      title: isAr ? 'السرعة' : 'Speed', 
      desc: isAr ? 'نسخ في أقل من ثانيتين. رؤى في الوقت الفعلي.' : 'Transcription in under 2 seconds. Insights in real time.' 
    },
    { 
      icon: '🎯', 
      title: isAr ? 'الدقة' : 'Accuracy', 
      desc: isAr ? 'دقة عربية تزيد عن 91٪. نحن نهتم بكل كلمة.' : '91%+ Arabic accuracy. We obsess over every word.' 
    },
    { 
      icon: '🔒', 
      title: isAr ? 'الخصوصية' : 'Privacy', 
      desc: isAr ? 'مكالماتك لا تدرب نماذجنا. بياناتك ملك لك.' : 'Your calls never train our models. Your data is yours.' 
    },
    { 
      icon: '🌍', 
      title: isAr ? 'الشرق الأوسط أولاً' : 'MENA-first', 
      desc: isAr ? 'بني في الإمارات، من أجل الإمارات والمنطقة.' : 'Built in the UAE, for the UAE and broader MENA region.' 
    },
  ]

  const stats = [
    { value: '500+', label: isAr ? 'موظف مبيعات' : 'Sales agents' },
    { value: '50K+', label: isAr ? 'مكالمة معالجة' : 'Calls processed' },
    { value: '2', label: isAr ? 'لغات' : 'Languages' },
    { value: '4.9★', label: isAr ? 'متوسط التقييم' : 'Avg rating' },
  ]

  return (
    // Step 3: Add direction and font-family to the main wrapper
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); 
        
        *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} 
        body{background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} 
        
        .serif{font-family:'DM Serif Display',serif;} 
        /* Disable serif in Arabic mode for better readability */
        html[dir="rtl"] .serif { font-family: 'Noto Sans Arabic', sans-serif; font-weight: 700; }

        .tap-btn{transition:transform 0.15s,opacity 0.15s;} 
        .tap-btn:active{transform:scale(0.97);opacity:0.85;}
      `}</style>
      
      <MobileNav activePage="about" />

      {/* Hero Section */}
      <section style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#34c759', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
          {isAr ? 'قصتنا' : 'Our story'}
        </div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16 }}>
          {isAr ? 'بني من قبل مسؤولي مبيعات،' : 'Built by salespeople,'}<br />
          <span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'من أجل مسؤولي المبيعات' : 'for salespeople'}</span>
        </h1>
        <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.7 }}>
          {isAr 
            ? 'ولدت DealFlow AI من إحباط بسيط — تدوين الملاحظات أثناء المكالمة يعني تضييع المحادثة. لقد بنينا مساعد الذكاء الاصطناعي الذي تمنينا وجوده.' 
            : 'DealFlow AI was born from a simple frustration — taking notes during a call means missing the conversation. We built the AI assistant we wished existed.'}
        </p>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '0 20px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#f5f5f7', borderRadius: 20, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-1.5px', lineHeight: 1, marginBottom: 6, fontFamily: 'DM Serif Display, serif' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#6e6e73' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: '40px 20px', background: '#f5f5f7' }}>
        <div style={{ borderRadius: 24, background: '#fff', padding: '24px 20px', boxShadow: '0 2px 20px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
            {isAr ? 'مهمتنا' : 'Our mission'}
          </div>
          <h2 className="serif" style={{ fontSize: 26, fontWeight: 400, letterSpacing: '-0.5px', lineHeight: 1.3, marginBottom: 12 }}>
            {isAr ? 'لماذا يهم وجود ذكاء اصطناعي عربي؟' : 'Why Arabic-first AI matters'}
          </h2>
          <p style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.7, marginBottom: 14 }}>
            {isAr 
              ? 'أكثر من 400 مليون ناطق بالعربية، واقتصاد يتجاوز 3 تريليون دولار، ومع ذلك لا توجد أدوات ذكاء اصطناعي للمبيعات مخصصة للمنطقة. نحن نغير ذلك.' 
              : "Over 400 million Arabic speakers, a $3T+ MENA economy, and almost zero AI sales tools built for the region. We're changing that."}
          </p>
          <p style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.7 }}>
            {isAr 
              ? 'اللهجة الخليجية، المصرية، والفصحى — نحن ندعم اللهجات التي يتحدث بها عملاؤك فعلياً. ليس مجرد ترجمة، بل بني بشكل أصلي.' 
              : 'Gulf Arabic, Egyptian Arabic, MSA — we support the dialects your clients actually speak. Not a translation, not an afterthought. Built natively.'}
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '40px 20px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 className="serif" style={{ fontSize: 30, fontWeight: 400, letterSpacing: '-1px' }}>
            {isAr ? 'ما' : 'What we'}<br />
            <span style={{ fontStyle: 'italic' }}>{isAr ? 'نمثله' : 'stand for'}</span>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {values.map((v, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 20px', background: '#f5f5f7', borderRadius: 20 }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{v.icon}</div>
              <div style={{ textAlign: isAr ? 'right' : 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1d1d1f', marginBottom: 4 }}>{v.title}</div>
                <div style={{ fontSize: 13, color: '#6e6e73', lineHeight: 1.5 }}>{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '48px 20px', background: '#1d1d1f', textAlign: 'center' }}>
        <h2 className="serif" style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-1.5px', color: '#fff', marginBottom: 12 }}>
          {isAr ? 'انضم إلى' : 'Join the'}<br />
          <span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'الحركة' : 'movement'}</span>
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
          {isAr ? 'أكثر من 500 موظف مبيعات يربحون مع DealFlow AI.' : '500+ sales agents already winning with DealFlow AI.'}
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