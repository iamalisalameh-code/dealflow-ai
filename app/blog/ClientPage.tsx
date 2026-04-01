'use client'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import { useState, useEffect } from 'react'

export default function BlogClient() {
  const [scrolled, setScrolled] = useState(false)
  
  // Step 1: Language state and local storage detection
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

  // Step 2: Translate category tabs
  const [activeCategory, setActiveCategory] = useState(isAr ? 'الكل' : 'All')

  // Listen to lang changes to reset active category to translated "All"
  useEffect(() => {
    setActiveCategory(isAr ? 'الكل' : 'All')
  }, [isAr])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Step 2: Translated Categories
  const categories = isAr 
    ? ['الكل', 'تدريب المبيعات', 'تكنولوجيا الذكاء الاصطناعي', 'العقارات', 'البرمجيات كخدمة']
    : ['All', 'Sales Coaching', 'AI Tech', 'Real Estate', 'SaaS']

  const featuredPost = {
    title: isAr 
      ? 'كيف يُغير الذكاء الاصطناعي مبيعات العقارات في دبي لعام 2026' 
      : 'How AI is Transforming Real Estate Sales in Dubai for 2026',
    excerpt: isAr 
      ? 'مع ازدهار سوق العقارات قيد الإنشاء، تتجه أفضل الوكالات إلى استخبارات الإيرادات لضمان عدم ضياع أي إشارة شراء. إليك كيف يمنحهم الذكاء الاصطناعي الأفضلية.' 
      : 'With the off-plan market booming, top agencies are turning to Revenue Intelligence to ensure no buying signal slips through the cracks. Here is how AI is giving them the edge.',
    category: isAr ? 'العقارات' : 'Real Estate',
    date: isAr ? '28 مارس 2026' : 'March 28, 2026',
    readTime: isAr ? '6 دقائق للقراءة' : '6 min read',
    imageColor: '#0071e3',
  }

  const posts = [
    {
      title: isAr 
        ? 'نهاية إدخال بيانات إدارة علاقات العملاء (CRM) يدوياً' 
        : 'The Death of Manual CRM Data Entry',
      excerpt: isAr 
        ? 'يقضي مديرو الحسابات 30% من أسبوعهم في تحديث HubSpot و Salesforce. تعرف على كيف يعيد لهم التسجيل التلقائي أيام الجمعة الخاصة بهم.' 
        : 'Account Executives spend 30% of their week updating HubSpot and Salesforce. Learn how auto-logging is giving them their Fridays back.',
      category: isAr ? 'البرمجيات كخدمة' : 'SaaS',
      date: isAr ? '22 مارس 2026' : 'March 22, 2026',
      readTime: isAr ? '4 دقائق للقراءة' : '4 min read',
      imageColor: '#bf5af2',
    },
    {
      title: isAr 
        ? 'التعامل مع اعتراض "رسوم الخدمات" كالمحترفين' 
        : 'Handling the "Service Charge" Objection like a Pro',
      excerpt: isAr 
        ? 'شرح خطوة بخطوة لكيفية استخدام أفضل الوسطاء في الإمارات لمحاور القيمة للتغلب على اعتراضات رسوم الخدمات المرتفعة على الفور.' 
        : 'A step-by-step breakdown of how the best brokers in the UAE use value-pivots to overcome high service charge objections instantly.',
      category: isAr ? 'تدريب المبيعات' : 'Sales Coaching',
      date: isAr ? '15 مارس 2026' : 'March 15, 2026',
      readTime: isAr ? '5 دقائق للقراءة' : '5 min read',
      imageColor: '#34c759',
    },
    {
      title: isAr 
        ? 'لماذا تفشل أدوات الذكاء الاصطناعي الإنجليزية فقط في منطقة الشرق الأوسط وشمال أفريقيا' 
        : 'Why English-Only AI Tools Fail in the MENA Region',
      excerpt: isAr 
        ? 'من اللهجة الخليجية إلى الجمل المختلطة بالإنجليزية والعربية (عربيزي)، النماذج العامة تفتقر إلى الدقة. لماذا يهم تحويل الكلام إلى نص المخصص محلياً.' 
        : 'From Khaleeji Arabic to mixed English-Arabic sentences (Arabish), generic AI models miss the nuance. Why localized speech-to-text matters.',
      category: isAr ? 'تكنولوجيا الذكاء الاصطناعي' : 'AI Tech',
      date: isAr ? '08 مارس 2026' : 'March 08, 2026',
      readTime: isAr ? '7 دقائق للقراءة' : '7 min read',
      imageColor: '#ff9f0a',
    },
    {
      title: isAr 
        ? 'إتقان إطار عمل MEDDIC في مكالمات الاستكشاف' 
        : 'Mastering the MEDDIC Framework on Discovery Calls',
      excerpt: isAr 
        ? 'كيف تكتشف بسلاسة المقاييس والمشترين الاقتصاديين ومعايير القرار دون أن تبدو وكأنك تقرأ من نص.' 
        : 'How to gracefully uncover Metrics, Economic Buyers, and Decision Criteria without sounding like you are reading from a script.',
      category: isAr ? 'تدريب المبيعات' : 'Sales Coaching',
      date: isAr ? '02 مارس 2026' : 'March 02, 2026',
      readTime: isAr ? '6 دقائق للقراءة' : '6 min read',
      imageColor: '#1d1d1f',
    },
    {
      title: isAr 
        ? 'الامتثال التأميني: دع الذكاء الاصطناعي يكون شبكة أمانك' 
        : 'Insurance Compliance: Let AI be your safety net',
      excerpt: isAr 
        ? 'لا تفوت أبدًا أي إفصاح صحي إلزامي بعد الآن. كيف يستخدم وسطاء التأمين المعاصرون الذكاء الاصطناعي لضمان امتثالهم في كل مكالمة.' 
        : 'Never miss a mandatory health disclosure again. How modern insurance brokers are using AI to bulletproof their compliance on every call.',
      category: isAr ? 'تدريب المبيعات' : 'Sales Coaching',
      date: isAr ? '24 فبراير 2026' : 'February 24, 2026',
      readTime: isAr ? '4 دقائق للقراءة' : '4 min read',
      imageColor: '#0071e3',
    },
    {
      title: isAr 
        ? 'DealFlow AI مقابل الوضع الراهن: دراسة للبيانات' 
        : 'DealFlow AI vs The Status Quo: A Data Study',
      excerpt: isAr 
        ? 'قمنا بتحليل 10,000 مكالمة مبيعات في جميع أنحاء الإمارات العربية المتحدة والمملكة العربية السعودية. إليك ما يفعله أفضل 1% من مسؤولي المبيعات بشكل مختلف.' 
        : 'We analyzed 10,000 sales calls across the UAE and Saudi Arabia. Here is exactly what the top 1% of closers do differently.',
      category: isAr ? 'تكنولوجيا الذكاء الاصطناعي' : 'AI Tech',
      date: isAr ? '18 فبراير 2026' : 'February 18, 2026',
      readTime: isAr ? '8 دقائق للقراءة' : '8 min read',
      imageColor: '#bf5af2',
    }
  ]

  const filteredPosts = activeCategory === (isAr ? 'الكل' : 'All') ? posts : posts.filter(p => p.category === activeCategory)

  return (
    // Step 3: Wrap the entire component return with RTL and Font handling
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Sans', sans-serif" }}>
      {/* Step 4: Add Noto Sans Arabic to the style import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff; color: #1d1d1f; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        /* Prevent serif override when in Arabic */
        html[dir="rtl"] .serif { font-family: inherit; }

        button { cursor: pointer; font-family: inherit; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        
        .desktop-nav { display: flex; align-items: center; gap: 32px; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        
        .blog-card { border-radius: 24px; overflow: hidden; border: 1px solid rgba(0,0,0,0.06); transition: transform 0.3s, box-shadow 0.3s; background: #fff; display: flex; flexDirection: column; }
        .blog-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
        .blog-image-wrap { width: 100%; height: 200px; background: #f5f5f7; position: relative; overflow: hidden; }
        .blog-content { padding: 24px; display: flex; flex-direction: column; flex: 1; }
        
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
        
        /* Adjust icon direction for RTL */
        .rtl-icon-flip { transform: ${isAr ? 'scaleX(-1)' : 'none'}; }
      `}</style>

      {/* NAV */}
      <MarketingNav activePage="blog" />

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 60, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '0%', left: '20%', width: '30%', height: '60%', background: '#0071e3', opacity: 0.04 }} />
        <div className="mesh" style={{ top: '10%', right: '20%', width: '30%', height: '50%', background: '#bf5af2', opacity: 0.04 }} />
        
        <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
          {isAr ? 'الموارد والرؤى' : 'Resources & Insights'}
        </div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(44px, 6vw, 64px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24 }}>
          {isAr ? 'مجلة' : 'The DealFlow '} <span style={{ fontStyle: 'italic', color: '#0071e3' }}>{isAr ? 'DealFlow' : 'Journal'}</span>
        </h1>
        <p className="fade-up-2" style={{ fontSize: 19, color: '#6e6e73', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          {isAr 
            ? 'استراتيجيات وتحديثات المنتج ورؤى مدعومة بالبيانات حول كيفية إغلاق المزيد من الصفقات في مشهد المبيعات الحديث في منطقة الشرق الأوسط وشمال أفريقيا.' 
            : 'Strategies, product updates, and data-backed insights on how to close more deals in the modern MENA sales landscape.'}
        </p>
      </section>

      {/* FEATURED POST */}
      <section style={{ padding: '40px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="fade-up-2" style={{ borderRadius: 32, border: '1px solid rgba(0,0,0,0.06)', background: '#fff', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 0, boxShadow: '0 24px 60px rgba(0,0,0,0.04)', cursor: 'pointer' }}>
          {/* Featured Image Placeholder */}
          <div style={{ background: featuredPost.imageColor, width: '100%', minHeight: 300, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="mesh" style={{ width: '150%', height: '150%', background: '#fff', opacity: 0.1 }} />
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          
          <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: featuredPost.imageColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{featuredPost.category}</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#aeaeb2' }} />
              <span style={{ fontSize: 13, color: '#6e6e73', fontWeight: 500 }}>{featuredPost.readTime}</span>
            </div>
            <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', color: '#1d1d1f', marginBottom: 16, lineHeight: 1.15 }}>
              {featuredPost.title}
            </h2>
            <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6, marginBottom: 32 }}>
              {featuredPost.excerpt}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1d1d1f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 }}>DF</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f' }}>{isAr ? 'فريق تحرير DealFlow' : 'DealFlow Editorial'}</div>
                <div style={{ fontSize: 13, color: '#aeaeb2' }}>{featuredPost.date}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section style={{ padding: '40px 48px 20px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: 24 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding: '8px 20px', borderRadius: 20, border: activeCategory === cat ? 'none' : '1px solid rgba(0,0,0,0.1)', background: activeCategory === cat ? '#1d1d1f' : 'transparent', color: activeCategory === cat ? '#fff' : '#6e6e73', fontSize: 14, fontWeight: 600, transition: 'all 0.2s' }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* POSTS GRID */}
      <section style={{ padding: '20px 48px 120px', maxWidth: 1200, margin: '0 auto', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
          {filteredPosts.map((post, i) => (
            <div key={i} className="blog-card">
              <div className="blog-image-wrap" style={{ background: post.imageColor + '15' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: post.imageColor }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
                </div>
              </div>
              <div className="blog-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: post.imageColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.category}</span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#aeaeb2' }} />
                  <span style={{ fontSize: 12, color: '#6e6e73', fontWeight: 500 }}>{post.readTime}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1d1d1f', marginBottom: 12, lineHeight: 1.3, letterSpacing: '-0.3px' }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: 16 }}>
                  <span style={{ fontSize: 13, color: '#aeaeb2', fontWeight: 500 }}>{post.date}</span>
                  <span style={{ fontSize: 13, color: '#1d1d1f', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    {isAr ? 'قراءة المقال' : 'Read Article'} 
                    <svg className="rtl-icon-flip" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#6e6e73', fontSize: 16 }}>
            {isAr ? 'لم يتم العثور على مقالات في هذه الفئة.' : 'No articles found in this category.'}
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: '100px 48px', background: '#1d1d1f', position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '-30%', left: '-10%', width: '50%', height: '80%', background: '#0071e3', opacity: 0.15 }} />
        <div className="mesh" style={{ bottom: '-30%', right: '-10%', width: '40%', height: '70%', background: '#bf5af2', opacity: 0.12 }} />
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="serif" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.1, color: '#fff', marginBottom: 20 }}>
            {isAr ? 'ضع هذه الرؤى موضع ' : 'Put these insights into '} <span style={{ fontStyle: 'italic', color: '#34c759' }}>{isAr ? 'التنفيذ.' : 'practice.'}</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 40, lineHeight: 1.6 }}>
            {isAr 
              ? 'ابدأ تجربتك المجانية لمدة 14 يوماً مع DealFlow AI اليوم وامنح فريق المبيعات لديك أفضل مساعد إيرادات.' 
              : 'Start your 14-day free trial of DealFlow AI today and give your sales team the ultimate revenue co-pilot.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => window.location.href = '/login'}
              style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600 }}>
              {isAr ? 'ابدأ تجربتك المجانية' : 'Start Free Trial'} {isAr ? '←' : '→'}
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <MarketingFooter />
    </div>
  )
}