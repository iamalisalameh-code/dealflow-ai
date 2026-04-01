'use client'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'
import { useState, useEffect } from 'react'

export default function MobileBlog() {
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
  const posts = [
    { 
      tag: isAr ? 'نصائح مبيعات' : 'Sales Tips', 
      tagAr: 'نصائح مبيعات',
      color: '#0071e3', 
      title: isAr ? 'كيف تبيع للعملاء المتحدثين بالعربية في الإمارات' : 'How to sell to Arabic-speaking clients in UAE', 
      desc: isAr ? 'الفروق الثقافية، تفضيلات اللغة، وإشارات الثقة التي تغلق الصفقات في سوق الخليج.' : 'The cultural nuances, language preferences, and trust signals that close deals in the Gulf market.', 
      date: isAr ? '28 مارس 2026' : 'Mar 28, 2026', 
      read: isAr ? '5 دقائق' : '5 min' 
    },
    { 
      tag: isAr ? 'الذكاء الاصطناعي في المبيعات' : 'AI in Sales', 
      tagAr: 'الذكاء الاصطناعي',
      color: '#34c759', 
      title: isAr ? 'لماذا تحتاج مكالماتك البيعية إلى الذكاء الاصطناعي في 2026' : 'Why your sales calls need AI in 2026', 
      desc: isAr ? 'تدوين الملاحظات يدوياً يكلفك ضياع الصفقات. إليك كيف تبدو مكالمات المبيعات اليوم.' : 'Manual note-taking is costing you deals. Here\'s what AI-powered sales calls look like today.', 
      date: isAr ? '22 مارس 2026' : 'Mar 22, 2026', 
      read: isAr ? '4 دقائق' : '4 min' 
    },
    { 
      tag: isAr ? 'عقارات' : 'Real Estate', 
      tagAr: 'عقارات',
      color: '#ff9f0a', 
      title: isAr ? 'أهم 5 إشارات شراء في مبيعات العقارات' : 'Top 5 buying signals in property sales', 
      desc: isAr ? 'تعلم كيفية اكتشاف العبارات والأسئلة الدقيقة التي تشير إلى أن العميل مستعد للشراء.' : 'Learn to spot the exact phrases and questions that signal a prospect is ready to buy.', 
      date: isAr ? '15 مارس 2026' : 'Mar 15, 2026', 
      read: isAr ? '6 دقائق' : '6 min' 
    },
    { 
      tag: isAr ? 'المنتج' : 'Product', 
      tagAr: 'تحديثات المنتج',
      color: '#bf5af2', 
      title: isAr ? 'نقدم لكم تكامل Google Meet' : 'Introducing Google Meet integration', 
      desc: isAr ? 'يقوم DealFlow AI الآن بالتقاط كلا جانبي مكالمات Google Meet الخاصة بك تلقائياً.' : 'DealFlow AI now captures both sides of your Google Meet calls automatically.', 
      date: isAr ? '10 مارس 2026' : 'Mar 10, 2026', 
      read: isAr ? 'دقيقتان' : '2 min' 
    },
    { 
      tag: isAr ? 'مبيعات عربية' : 'Arabic Sales', 
      tagAr: 'مبيعات عربية',
      color: '#ff453a', 
      title: isAr ? 'أفضل تقنيات الإقناع في مبيعات العقارات' : 'Best Persuasion Techniques in Real Estate Sales', 
      desc: isAr ? 'تعلم كيف تستخدم الذكاء الاصطناعي لتحسين مهاراتك البيعية مع العملاء العرب.' : 'Learn how to use AI to improve your sales skills with Arabic-speaking clients.', 
      date: isAr ? '5 مارس 2026' : 'Mar 5, 2026', 
      read: isAr ? '4 دقائق' : '4 min' 
    },
  ]

  const categories = isAr 
    ? ['الكل', 'نصائح مبيعات', 'الذكاء الاصطناعي', 'مبيعات عربية', 'عقارات', 'تحديثات المنتج']
    : ['All', 'Sales Tips', 'AI in Sales', 'Arabic Sales', 'Real Estate', 'Product']

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
        .tap-btn:active{transform:scale(0.98);}
        
        /* Category Scroll Bar Hide */
        .category-scroll::-webkit-scrollbar { display: none; }
        .category-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <MobileNav activePage="blog" />

      {/* Header */}
      <section style={{ padding: '40px 24px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
          {isAr ? 'المدونة' : 'Blog'}
        </div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 12 }}>
          {isAr ? 'رؤى المبيعات و' : 'Sales insights &'}<br />
          <span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'تحديثات المنتج' : 'product updates'}</span>
        </h1>
      </section>

      {/* Category scroll */}
      <section className="category-scroll" style={{ padding: '0 0 20px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 8, padding: '0 20px', paddingBottom: 4 }}>
          {categories.map((cat, i) => (
            <button key={i} style={{ height: 34, padding: '0 16px', borderRadius: 17, border: '1px solid rgba(0,0,0,0.1)', background: i === 0 ? '#1d1d1f' : 'transparent', color: i === 0 ? '#fff' : '#6e6e73', fontSize: 13, fontWeight: 500, fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section style={{ padding: '0 20px 48px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {posts.map((post, i) => (
          <div key={i} className="tap-btn" style={{ borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', padding: '20px', cursor: 'pointer', background: '#fff', textAlign: isAr ? 'right' : 'left' }}
            onClick={() => {}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ padding: '3px 10px', borderRadius: 10, background: post.color + '12', color: post.color, fontSize: 11, fontWeight: 700 }}>
                {isAr ? post.tagAr : post.tag}
              </span>
              <span style={{ fontSize: 12, color: '#aeaeb2' }}>
                {post.date} · {isAr ? post.read : `${post.read} read`}
              </span>
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 600, color: '#1d1d1f', lineHeight: 1.3, marginBottom: 8 }}>{post.title}</h3>
            <p style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.5 }}>{post.desc}</p>
            <div style={{ marginTop: 12, fontSize: 13, fontWeight: 600, color: post.color }}>
              {isAr ? 'اقرأ المزيد ←' : 'Read more →'}
            </div>
          </div>
        ))}
      </section>

      {/* Newsletter */}
      <section style={{ padding: '40px 20px', background: '#f5f5f7' }}>
        <div style={{ borderRadius: 24, background: '#1d1d1f', padding: '28px 20px', textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: 26, fontWeight: 400, color: '#fff', letterSpacing: '-0.5px', marginBottom: 8 }}>
            {isAr ? 'احصل على نصائح المبيعات' : 'Get sales tips'}<br />
            <span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'في بريدك الإلكتروني' : 'in your inbox'}</span>
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
            {isAr ? 'رؤى أسبوعية لفرق المبيعات في الشرق الأوسط.' : 'Weekly insights for MENA sales teams.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input 
              placeholder={isAr ? "بريدك الإلكتروني" : "your@email.com"} 
              style={{ height: 48, borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 15, padding: '0 20px', fontFamily: 'inherit', outline: 'none', textAlign: isAr ? 'right' : 'left' }} 
            />
            <button style={{ height: 48, borderRadius: 24, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 15, fontWeight: 600, fontFamily: 'inherit' }}>
              {isAr ? 'اشترك الآن ←' : 'Subscribe →'}
            </button>
          </div>
        </div>
      </section>

      <MobileFooter />
    </div>
  )
}