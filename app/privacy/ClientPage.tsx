'use client'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import { useState, useEffect } from 'react'

export default function PrivacyClient() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('data-collection')

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      const sections = ['data-collection', 'ai-usage', 'data-security', 'third-party', 'your-rights', 'contact']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= (el.offsetTop - 200)) {
          setActiveSection(section)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' })
    }
  }

  // Step 2: Wrap TOC links
  const tocLinks = [
    { id: 'data-collection', label: isAr ? '1. المعلومات التي نجمعها' : '1. Information We Collect' },
    { id: 'ai-usage', label: isAr ? '2. الذكاء الاصطناعي وبيانات النسخ' : '2. AI & Transcription Data' },
    { id: 'data-security', label: isAr ? '3. أمن وتخزين البيانات' : '3. Data Security & Storage' },
    { id: 'third-party', label: isAr ? '4. المشاركة مع جهات خارجية' : '4. Third-Party Sharing' },
    { id: 'your-rights', label: isAr ? '5. حقوق الخصوصية الخاصة بك' : '5. Your Privacy Rights' },
    { id: 'contact', label: isAr ? '6. اتصل بنا' : '6. Contact Us' },
  ]

  return (
    // Step 3: Add direction and font to main wrapper
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Sans', sans-serif" }}>
      <style>{`
        /* Step 4: Add Noto Sans Arabic to font import */
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        
        .responsive-order { order: -1; }
        @media (min-width: 900px) { .responsive-order { order: 0; } }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #fff; color: #1d1d1f; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        html[dir="rtl"] .serif { font-family: inherit; } /* Prevent serif override in Arabic */

        button { cursor: pointer; font-family: inherit; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        
        .policy-section { padding-top: 40px; padding-bottom: 40px; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .policy-section:last-child { border-bottom: none; }
        .policy-section h2 { font-size: 24px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 20px; color: #1d1d1f; }
        .policy-section p { font-size: 16px; color: #6e6e73; line-height: 1.7; margin-bottom: 16px; }
        /* Used logical property for RTL support */
        .policy-section ul { padding-inline-start: 20px; margin-bottom: 16px; }
        .policy-section li { font-size: 16px; color: #6e6e73; line-height: 1.7; margin-bottom: 8px; }
        .policy-section strong { color: #1d1d1f; font-weight: 600; }
        
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}</style>

      {/* NAV */}
      <MarketingNav activePage="privacy" />

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 60, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative', overflow: 'hidden', background: '#f5f5f7', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
          {isAr ? 'الشؤون القانونية والامتثال' : 'Legal & Compliance'}
        </div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16 }}>
          {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
        </h1>
        <p className="fade-up-2" style={{ fontSize: 16, color: '#6e6e73' }}>
          {isAr ? 'آخر تحديث: 30 مارس 2026' : 'Last updated: March 30, 2026'}
        </p>
      </section>

      {/* MAIN CONTENT WITH STICKY SIDEBAR */}
      {/* Note: Flex direction naturally reverses in RTL, placing the sidebar on the correct side */}
      <section style={{ display: 'flex', maxWidth: 1000, margin: '0 auto', padding: '60px 48px 120px', gap: 80, position: 'relative' }}>
        
        {/* Sticky Sidebar */}
        <div style={{ width: 240, flexShrink: 0, display: 'none', '@media(min-width: 900px)': { display: 'block' } } as any}>
          <div style={{ position: 'sticky', top: 120, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1d1d1f', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
              {isAr ? 'المحتويات' : 'Contents'}
            </div>
            {tocLinks.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                style={{ textAlign: isAr ? 'right' : 'left', padding: '8px 12px', borderRadius: 8, border: 'none', background: activeSection === link.id ? 'rgba(0,0,0,0.04)' : 'transparent', color: activeSection === link.id ? '#1d1d1f' : '#6e6e73', fontSize: 14, fontWeight: activeSection === link.id ? 600 : 500, transition: 'all 0.2s' }}>
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, maxWidth: 680 }}>
          
          <div style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.7, marginBottom: 40 }}>
            {isAr 
              ? 'في DealFlow AI ("نحن"، "لنا"، "خاصتنا")، نأخذ خصوصيتك وسرية مكالمات المبيعات الخاصة بك على محمل الجد. توضح سياسة الخصوصية هذه كيف نجمع معلوماتك ونستخدمها ونحميها عند استخدامك لموقعنا الإلكتروني وتطبيقنا والخدمات ذات الصلة (يُشار إليها مجتمعة باسم "الخدمات").' 
              : 'At DealFlow AI ("we", "us", "our"), we take your privacy and the confidentiality of your sales conversations seriously. This Privacy Policy outlines how we collect, use, and protect your information when you use our website, application, and related services (collectively, the "Services").'}
          </div>

          <div id="data-collection" className="policy-section" style={{ paddingTop: 0 }}>
            <h2>{isAr ? '1. المعلومات التي نجمعها' : '1. Information We Collect'}</h2>
            <p>{isAr ? 'لتقديم أدوات المبيعات المدعومة بالذكاء الاصطناعي، نقوم بجمع الأنواع التالية من المعلومات:' : 'To provide you with our AI-powered sales tools, we collect the following types of information:'}</p>
            <ul>
              <li><strong>{isAr ? 'معلومات الحساب: ' : 'Account Information: '}</strong>
                {isAr ? 'اسمك وعنوان بريدك الإلكتروني وكلمة المرور وتفاصيل الشركة عند التسجيل للحصول على حساب.' : 'Your name, email address, password, and company details when you register for an account.'}
              </li>
              <li><strong>{isAr ? 'صوت المكالمات والنصوص: ' : 'Call Audio & Transcripts: '}</strong>
                {isAr ? 'التدفقات الصوتية من اجتماعاتك المتصلة (مثل Google Meet و Zoom) والنصوص المكتوبة الناتجة.' : 'Audio streams from your connected meetings (e.g., Google Meet, Zoom) and the resulting text transcripts.'}
              </li>
              <li><strong>{isAr ? 'بيانات تكامل CRM: ' : 'CRM Integration Data: '}</strong>
                {isAr ? 'إذا قمت بتوصيل نظام إدارة علاقات العملاء، فإننا نقوم بمزامنة بيانات الاتصال ومراحل الصفقات بدقة لتزويدك بالسياق والتحديثات الآلية.' : 'If you connect a CRM, we sync contact data and deal stages strictly to provide you with context and automated updates.'}
              </li>
              <li><strong>{isAr ? 'بيانات الاستخدام: ' : 'Usage Data: '}</strong>
                {isAr ? 'معلومات حول كيفية تفاعلك مع منصتنا (مثل الميزات المستخدمة، مدة الجلسة) لمساعدتنا في تحسين المنتج.' : 'Information on how you interact with our platform (e.g., features used, session duration) to help us improve the product.'}
              </li>
            </ul>
          </div>

          <div id="ai-usage" className="policy-section">
            <h2>{isAr ? '2. الذكاء الاصطناعي وبيانات النسخ (مهم جداً)' : '2. AI & Transcription Data (Crucial)'}</h2>
            <p>{isAr ? 'نحن نتفهم أن مكالمات المبيعات تحتوي على معلومات تجارية وخاصة بالعملاء حساسة للغاية. سياسة بيانات الذكاء الاصطناعي لدينا صارمة وشفافة:' : 'We understand that sales calls contain highly sensitive business and customer information. Our AI data policy is strict and transparent:'}</p>
            <ul>
              <li><strong>{isAr ? 'سياسة عدم التدريب: ' : 'Zero Training Policy: '}</strong>
                {isAr ? 'نحن لا نستخدم صوت المكالمة أو النصوص أو بيانات العملاء لتدريب نماذج الذكاء الاصطناعي الأساسية لدينا. بياناتك ملك لك.' : 'We do not use your call audio, transcripts, or customer data to train our foundational AI models. Your data belongs to you.'}
              </li>
              <li><strong>{isAr ? 'المعالجة المؤقتة: ' : 'Ephemeral Processing: '}</strong>
                {isAr ? 'تتم معالجة التدفقات الصوتية في الوقت الفعلي لإنشاء نص ويتم التخلص منها على الفور. نحن لا نخزن الملفات الصوتية الأولية ما لم تقم بتمكين ميزة "تسجيل المكالمات" صراحةً في إعداداتك.' : 'Audio streams are processed in real-time to generate text and are immediately discarded. We do not store raw audio files unless you explicitly enable the "Call Recording" feature in your settings.'}
              </li>
              <li><strong>{isAr ? 'تخزين النصوص: ' : 'Transcript Storage: '}</strong>
                {isAr ? 'يتم تخزين النصوص بشكل آمن في حسابك لتزويدك بسجل المكالمات وملخصات الذكاء الاصطناعي. يمكنك حذف هذه النصوص في أي وقت، مما يؤدي إلى إزالتها نهائياً من خوادمنا.' : 'Transcripts are stored securely in your account to provide you with call histories and AI summaries. You can delete these transcripts at any time, which permanently removes them from our servers.'}
              </li>
            </ul>
          </div>

          <div id="data-security" className="policy-section">
            <h2>{isAr ? '3. أمن وتخزين البيانات' : '3. Data Security & Storage'}</h2>
            <p>{isAr ? 'نطبق تدابير أمنية على مستوى المؤسسات لحماية بياناتك:' : 'We implement enterprise-grade security measures to protect your data:'}</p>
            <ul>
              <li>{isAr ? 'يتم تشفير جميع البيانات أثناء النقل (باستخدام TLS 1.2 أو أعلى) وفي حالة عدم الاستخدام (باستخدام تشفير AES-256).' : 'All data is encrypted in transit (using TLS 1.2 or higher) and at rest (using AES-256 encryption).'}</li>
              <li>{isAr ? 'يتم تشغيل البنية التحتية لقاعدة بياناتنا بواسطة Supabase، والتي تتميز بأمان مستوى الصف (RLS) الصارم لضمان عزل بياناتك تماماً عن المستخدمين الآخرين.' : 'Our database infrastructure is powered by Supabase, featuring strict Row-Level Security (RLS) to ensure your data is completely isolated from other users.'}</li>
              <li>{isAr ? 'نجري عمليات تدقيق أمني واختبارات اختراق منتظمة.' : 'We conduct regular security audits and penetration testing.'}</li>
            </ul>
          </div>

          <div id="third-party" className="policy-section">
            <h2>{isAr ? '4. المشاركة مع جهات خارجية' : '4. Third-Party Sharing'}</h2>
            <p>
              {isAr 
                ? 'نحن لا نبيع أو نؤجر أو نتاجر بمعلوماتك الشخصية. نحن نشارك البيانات فقط مع مزودي الخدمات الخارجيين الموثوق بهم اللازمين لتشغيل منصتنا (مثل Google Cloud لتحويل الكلام إلى نص، و Stripe لمعالجة المدفوعات). يلتزم جميع المزودين الخارجيين بشكل صارم باتفاقيات السرية وملاحق معالجة البيانات.' 
                : 'We do not sell, rent, or trade your personal information. We only share data with trusted third-party service providers necessary to operate our platform (e.g., Google Cloud for speech-to-text, Stripe for payment processing). All third-party providers are strictly bound by confidentiality agreements and data processing addendums.'}
            </p>
          </div>

          <div id="your-rights" className="policy-section">
            <h2>{isAr ? '5. حقوق الخصوصية الخاصة بك' : '5. Your Privacy Rights'}</h2>
            <p>{isAr ? 'اعتماداً على موقعك، قد يكون لك الحق في:' : 'Depending on your location, you may have the right to:'}</p>
            <ul>
              <li>{isAr ? 'الوصول إلى البيانات الشخصية التي نحتفظ بها عنك.' : 'Access the personal data we hold about you.'}</li>
              <li>{isAr ? 'طلب حذف حسابك وجميع البيانات المرتبطة به (الحق في النسيان).' : 'Request the deletion of your account and all associated data (Right to be Forgotten).'}</li>
              <li>{isAr ? 'إلغاء الاشتراك في الاتصالات التسويقية.' : 'Opt-out of marketing communications.'}</li>
              <li>{isAr ? 'طلب تصدير منظم لبيانات مكالماتك.' : 'Request a structured export of your call data.'}</li>
            </ul>
            <p>{isAr ? 'لممارسة أي من هذه الحقوق، يرجى الاتصال بنا باستخدام المعلومات أدناه.' : 'To exercise any of these rights, please contact us using the information below.'}</p>
          </div>

          <div id="contact" className="policy-section">
            <h2>{isAr ? '6. اتصل بنا' : '6. Contact Us'}</h2>
            <p>
              {isAr 
                ? 'إذا كانت لديك أي أسئلة أو مخاوف أو طلبات بخصوص سياسة الخصوصية هذه أو ممارسات البيانات الخاصة بنا، فيرجى التواصل مع مسؤول حماية البيانات لدينا:' 
                : 'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to our Data Protection Officer:'}
            </p>
            <p>
              <strong>{isAr ? 'البريد الإلكتروني: ' : 'Email: '}</strong> <a href="mailto:privacy@dealflow-ai.com" style={{ color: '#0071e3', textDecoration: 'none', direction: 'ltr', display: 'inline-block' }}>privacy@dealflow-ai.com</a><br />
              <strong>{isAr ? 'العنوان: ' : 'Address: '}</strong> {isAr ? 'المقر الرئيسي لـ DealFlow AI، أبراج بحيرات جميرا (JLT)، دبي، الإمارات العربية المتحدة' : 'DealFlow AI Headquarters, Jumeirah Lakes Towers (JLT), Dubai, United Arab Emirates'}
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <MarketingFooter />
    </div>
  )
}