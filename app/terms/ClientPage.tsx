'use client'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import { useState, useEffect } from 'react'

export default function TermsClient() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('acceptance')

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
      
      const sections = ['acceptance', 'service-description', 'accounts', 'payment', 'ip', 'liability']
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
    { id: 'acceptance', label: isAr ? '1. قبول الشروط' : '1. Acceptance of Terms' },
    { id: 'service-description', label: isAr ? '2. وصف الخدمة' : '2. Description of Service' },
    { id: 'accounts', label: isAr ? '3. حسابات المستخدمين' : '3. User Accounts' },
    { id: 'payment', label: isAr ? '4. الدفع والاشتراكات' : '4. Payment & Subscriptions' },
    { id: 'ip', label: isAr ? '5. الملكية الفكرية' : '5. Intellectual Property' },
    { id: 'liability', label: isAr ? '6. حدود المسؤولية' : '6. Limitation of Liability' },
  ]

  return (
    // Step 3: Add direction and font to main wrapper
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Sans', sans-serif" }}>
      <style>{`
        /* Step 4: Add Noto Sans Arabic to font import */
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #fff; color: #1d1d1f; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        html[dir="rtl"] .serif { font-family: inherit; } /* Prevent serif override in Arabic */
        
        button { cursor: pointer; font-family: inherit; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        
        /* Fixed responsive display class to avoid TS duplicate property errors */
        .desktop-nav { display: flex; align-items: center; gap: 32px; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .sidebar-toc { display: none !important; }
        }
        
        .policy-section { padding-top: 40px; padding-bottom: 40px; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .policy-section:last-child { border-bottom: none; }
        .policy-section h2 { font-size: 24px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 20px; color: #1d1d1f; }
        .policy-section p { font-size: 16px; color: #6e6e73; line-height: 1.7; margin-bottom: 16px; }
        /* Adjusted for RTL */
        .policy-section ul { padding-inline-start: 20px; margin-bottom: 16px; }
        .policy-section li { font-size: 16px; color: #6e6e73; line-height: 1.7; margin-bottom: 8px; }
        .policy-section strong { color: #1d1d1f; font-weight: 600; }
        
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}</style>

      {/* NAV */}
      <MarketingNav activePage="terms" />

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 60, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative', overflow: 'hidden', background: '#f5f5f7', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
          {isAr ? 'الشؤون القانونية والامتثال' : 'Legal & Compliance'}
        </div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16 }}>
          {isAr ? 'شروط الخدمة' : 'Terms of Service'}
        </h1>
        <p className="fade-up-2" style={{ fontSize: 16, color: '#6e6e73' }}>
          {isAr ? 'آخر تحديث: 30 مارس 2026' : 'Last updated: March 30, 2026'}
        </p>
      </section>

      {/* MAIN CONTENT WITH STICKY SIDEBAR */}
      <section style={{ display: 'flex', maxWidth: 1000, margin: '0 auto', padding: '60px 48px 120px', gap: 80, position: 'relative' }}>
        
        {/* Sticky Sidebar */}
        <div className="sidebar-toc" style={{ width: 240, flexShrink: 0 }}>
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
              ? 'مرحباً بك في DealFlow AI. بوصولك أو استخدامك لموقعنا الإلكتروني والمنصة والخدمات ذات الصلة، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يجوز لك استخدام خدماتنا.' 
              : 'Welcome to DealFlow AI. By accessing or using our website, platform, and related services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.'}
          </div>

          <div id="acceptance" className="policy-section" style={{ paddingTop: 0 }}>
            <h2>{isAr ? '1. قبول الشروط' : '1. Acceptance of Terms'}</h2>
            <p>
              {isAr 
                ? 'تشكل شروط الخدمة هذه ("الشروط") اتفاقية ملزمة قانوناً مبرمة بينك، سواء شخصياً أو نيابة عن كيان ("أنت") و DealFlow AI ("نحن" أو "لنا" أو "خاصتنا"). أنت توافق على أنه من خلال الوصول إلى الموقع والمنصة، تكون قد قرأت وفهمت ووافقت على الالتزام بجميع شروط الخدمة هذه.' 
                : 'These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and DealFlow AI ("we," "us" or "our"). You agree that by accessing the site and platform, you have read, understood, and agreed to be bound by all of these Terms of Service.'}
            </p>
          </div>

          <div id="service-description" className="policy-section">
            <h2>{isAr ? '2. وصف الخدمة' : '2. Description of Service'}</h2>
            <p>
              {isAr 
                ? 'تقدم DealFlow AI منصة استخبارات إيرادات وتدريب مبيعات مدعومة بالذكاء الاصطناعي. تتضمن الخدمة، على سبيل المثال لا الحصر:' 
                : 'DealFlow AI provides an AI-powered revenue intelligence and sales coaching platform. The service includes, but is not limited to:'}
            </p>
            <ul>
              <li>{isAr ? 'نسخ صوتي في الوقت الفعلي بلغات متعددة، بما في ذلك الإنجليزية والعربية.' : 'Real-time audio transcription in multiple languages, including English and Arabic.'}</li>
              <li>{isAr ? 'رؤى الصفقات المولدة بالذكاء الاصطناعي، والتعامل مع الاعتراضات، وتحليل نسبة التحدث.' : 'AI-generated deal insights, objection handling, and talk-ratio analysis.'}</li>
              <li>{isAr ? 'الإنشاء الآلي لمواد المتابعة (رسائل البريد الإلكتروني، رسائل واتساب).' : 'Automated generation of follow-up materials (emails, WhatsApp messages).'}</li>
              <li>{isAr ? 'التكامل مع أدوات المؤتمرات التابعة لجهات خارجية (مثل Google Meet، Zoom) وأنظمة إدارة علاقات العملاء (CRMs).' : 'Integrations with third-party conferencing tools (e.g., Google Meet, Zoom) and CRMs.'}</li>
            </ul>
            <p>
              {isAr 
                ? 'نحتفظ بالحق في تعديل أو تعليق أو إيقاف أي جزء من الخدمة في أي وقت بإشعار أو بدونه.' 
                : 'We reserve the right to modify, suspend, or discontinue any part of the service at any time with or without notice to you.'}
            </p>
          </div>

          <div id="accounts" className="policy-section">
            <h2>{isAr ? '3. حسابات المستخدمين والمسؤوليات' : '3. User Accounts & Responsibilities'}</h2>
            <p>{isAr ? 'لاستخدام DealFlow AI، يجب عليك التسجيل للحصول على حساب. أنت توافق على:' : 'To use DealFlow AI, you must register for an account. You agree to:'}</p>
            <ul>
              <li>{isAr ? 'تقديم معلومات دقيقة وحديثة وكاملة أثناء عملية التسجيل.' : 'Provide accurate, current, and complete information during the registration process.'}</li>
              <li>{isAr ? 'الحفاظ على أمان وسرية كلمة المرور وبيانات اعتماد حسابك.' : 'Maintain the security and confidentiality of your password and account credentials.'}</li>
              <li>{isAr ? 'تحمل المسؤولية عن جميع الأنشطة التي تحدث تحت حسابك.' : 'Accept responsibility for all activities that occur under your account.'}</li>
              <li>{isAr ? 'التأكد من أن استخدامك للمنصة يتوافق مع جميع القوانين المحلية والولائية والوطنية والدولية، وخاصة فيما يتعلق بتسجيل المكالمات والاتصالات الإلكترونية (مثل الحصول على الموافقة على التسجيل حيثما يقتضي القانون ذلك).' : 'Ensure that your use of the platform complies with all local, state, national, and international laws, particularly regarding the recording of calls and electronic communications (e.g., obtaining consent to record where required by law).'}</li>
            </ul>
          </div>

          <div id="payment" className="policy-section">
            <h2>{isAr ? '4. الدفع والاشتراكات' : '4. Payment & Subscriptions'}</h2>
            <p>
              {isAr 
                ? 'يتم تقديم DealFlow AI على أساس الاشتراك. باختيارك لخطة اشتراك، فإنك توافق على دفع الرسوم المطبقة.' 
                : 'DealFlow AI is offered on a subscription basis. By selecting a subscription plan, you agree to pay the applicable fees.'}
            </p>
            <ul>
              <li><strong>{isAr ? 'الفواتير: ' : 'Billing: '}</strong>
                {isAr ? 'يتم سداد الاشتراكات مقدماً على أساس شهري أو سنوي، بناءً على اختيارك.' : 'Subscriptions are billed in advance on a monthly or annual basis, depending on your selection.'}
              </li>
              <li><strong>{isAr ? 'التجربة المجانية: ' : 'Free Trial: '}</strong>
                {isAr ? 'نقدم تجربة مجانية لمدة 14 يوماً. إذا لم تقم بالاشتراك في خطة مدفوعة قبل انتهاء التجربة، فسيتم تعليق وصولك.' : 'We offer a 14-day free trial. If you do not subscribe to a paid plan before the trial ends, your access will be suspended.'}
              </li>
              <li><strong>{isAr ? 'الإلغاءات: ' : 'Cancellations: '}</strong>
                {isAr ? 'يمكنك إلغاء اشتراكك في أي وقت. تسري الإلغاءات في نهاية دورة الفوترة الحالية. نحن لا نقدم مبالغ مستردة نسبية للأشهر الجزئية.' : 'You may cancel your subscription at any time. Cancellations take effect at the end of the current billing cycle. We do not provide prorated refunds for partial months.'}
              </li>
            </ul>
          </div>

          <div id="ip" className="policy-section">
            <h2>{isAr ? '5. الملكية الفكرية' : '5. Intellectual Property'}</h2>
            <p>
              {isAr 
                ? 'الخدمة ومحتواها الأصلي وميزاتها ووظائفها وعناصر تصميمها هي وستظل ملكية حصرية لـ DealFlow AI. لا يجوز استخدام علاماتنا التجارية والمظهر التجاري الخاص بنا فيما يتعلق بأي منتج أو خدمة دون موافقة كتابية مسبقة منا.' 
                : 'The Service and its original content, features, functionality, and design elements are and will remain the exclusive property of DealFlow AI. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.'}
            </p>
            <p>
              <strong>{isAr ? 'بياناتك: ' : 'Your Data: '}</strong>
              {isAr 
                ? 'أنت تحتفظ بجميع الحقوق في الصوت والنصوص وبيانات العملاء التي تعالجها من خلال منصتنا. لا تدعي DealFlow AI أي ملكية لبيانات المبيعات الخاصة بك.' 
                : 'You retain all rights to the audio, transcripts, and customer data you process through our platform. DealFlow AI claims no ownership over your sales data.'}
            </p>
          </div>

          <div id="liability" className="policy-section">
            <h2>{isAr ? '6. حدود المسؤولية' : '6. Limitation of Liability'}</h2>
            <p>
              {isAr 
                ? 'لن تتحمل DealFlow AI، ولا مديروها أو موظفوها أو شركاؤها أو وكلاؤها أو موردوها أو الشركات التابعة لها، بأي حال من الأحوال، المسؤولية عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية، بما في ذلك على سبيل المثال لا الحصر، خسارة الأرباح أو البيانات أو الاستخدام أو الشهرة أو الخسائر غير الملموسة الأخرى، الناتجة عن:' 
                : 'In no event shall DealFlow AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:'}
            </p>
            <ul>
              <li>{isAr ? 'وصولك إلى الخدمة أو استخدامك لها أو عدم قدرتك على الوصول إليها أو استخدامها.' : 'Your access to or use of or inability to access or use the Service.'}</li>
              <li>{isAr ? 'أي سلوك أو محتوى لأي طرف ثالث على الخدمة.' : 'Any conduct or content of any third party on the Service.'}</li>
              <li>{isAr ? 'أي وصول أو استخدام أو تغيير غير مصرح به لعمليات الإرسال أو المحتوى الخاص بك.' : 'Any unauthorized access, use or alteration of your transmissions or content.'}</li>
            </ul>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <MarketingFooter />
    </div>
  )
}