'use client'
import { useState, useEffect } from 'react'

export default function ArPageClient() {
  const [billingAnnual, setBillingAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
      ),
      title: 'تفريغ صوتي مباشر',
      desc: 'تحويل الكلام إلى نص في الوقت الفعلي. يدعم اللهجة الخليجية، المصرية، والفصحى بدقة تتجاوز 90%.',
      color: '#0071e3',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      title: 'مدرب صفقات ذكي',
      desc: 'احصل على نصائح مباشرة أثناء المكالمة للرد على اعتراضات العملاء وإقناعهم بكل ثقة.',
      color: '#34c759',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      title: 'اكتشاف إشارات الشراء',
      desc: 'لا تفوت أي فرصة. النظام يلتقط تلميحات الشراء فوراً لتعرف متى تطلب إتمام الصفقة.',
      color: '#ff9f0a',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      title: 'متابعة تلقائية الذكاء',
      desc: 'رسائل واتساب ورسائل بريد إلكتروني جاهزة للإرسال بمجرد انتهاء مكالمتك، مخصصة لعميلك.',
      color: '#bf5af2',
    },
  ]

  const plans = [
    {
      name: 'الفردي (Solo)',
      desc: 'مثالي لمندوبي المبيعات المستقلين',
      monthlyPriceUSD: 49,
      monthlyPriceAED: 180,
      annualPriceUSD: 39,
      annualPriceAED: 145,
      color: '#0071e3',
      features: [
        'تسجيل مكالمات غير محدود',
        'تدريب ذكاء اصطناعي مباشر',
        'دعم كامل للعربية والإنجليزية',
        'توليد رسائل متابعة تلقائية',
        'تكامل مع Google Meet و Zoom',
      ],
      cta: 'ابدأ تجربتك المجانية',
      popular: false,
    },
    {
      name: 'فريق العمل (Team)',
      desc: 'لفرق المبيعات التي تطمح للصدارة',
      monthlyPriceUSD: 99,
      monthlyPriceAED: 365,
      annualPriceUSD: 79,
      annualPriceAED: 290,
      color: '#bf5af2',
      features: [
        'كل ميزات الباقة الفردية',
        'حتى 10 وكلاء مبيعات',
        'لوحة أداء فريق العمل',
        'التحكم بصلاحيات الموظفين',
        'تحليلات شاملة للمكالمات',
      ],
      cta: 'ابدأ تجربتك المجانية',
      popular: true,
    },
  ]

  const testimonials = [
    {
      name: 'محمد الراشد',
      role: 'مستشار عقاري أول',
      company: 'إعمار العقارية',
      text: 'أداة DealFlow غيّرت طريقتي في إدارة المكالمات تماماً. التفريغ باللغة العربية وتحديداً اللهجة الخليجية دقيق جداً، ونصائح الذكاء الاصطناعي ساعدتني في إغلاق صفقات كنت سأخسرها.',
      avatar: 'م',
      color: '#0071e3',
    },
    {
      name: 'سارة التميمي',
      role: 'مديرة مبيعات',
      company: 'حلول التقنية (MENA)',
      text: 'ارتفعت نسبة إغلاق الصفقات لفريقنا بنسبة 34٪ في الشهر الأول. اكتشاف إشارات الشراء أثناء المكالمة كأنه حاسة سادسة لمندوب المبيعات.',
      avatar: 'س',
      color: '#34c759',
    },
  ]

  const faqs = [
    {
      q: 'هل يدعم النظام اللهجات العربية المختلفة؟',
      a: 'نعم بالتأكيد. نستخدم نماذج ذكاء اصطناعي متقدمة صُممت خصيصاً لفهم اللهجة الخليجية، المصرية، واللغة العربية الفصحى بدقة عالية جداً.',
    },
    {
      q: 'هل يعمل مع Google Meet و Zoom؟',
      a: 'نعم، يتكامل DealFlow AI بسلاسة مع منصات الاجتماعات المفضلة لديك مثل Google Meet و Zoom و Microsoft Teams. بضغطة زر واحدة يبدأ في تسجيل وتحليل المكالمة.',
    },
    {
      q: 'هل بيانات عملائي ومكالماتي آمنة؟',
      a: 'أمان بياناتك هو أولويتنا. جميع البيانات مشفرة بالكامل، ولا نقوم أبداً باستخدام مكالماتك الخاصة لتدريب نماذج الذكاء الاصطناعي العامة.',
    },
    {
      q: 'هل يمكنني تجربة الخدمة قبل الدفع؟',
      a: 'نعم، نقدم فترة تجربة مجانية لمدة 14 يوماً تشمل جميع الميزات. لا نطلب إدخال بطاقة ائتمانية للبدء.',
    },
  ]

  return (
    <div dir="rtl" style={{ textAlign: 'right' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Tajawal:wght@400;500;700;800&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          background: #fff;
          color: #1d1d1f;
          font-family: 'Tajawal', 'DM Sans', -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .brand-font { font-family: 'DM Sans', sans-serif; } /* For English numbers/logos */

        button { cursor: pointer; font-family: inherit; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        .fade-up-3 { animation: fadeUp 0.7s ease 0.3s both; }

        .desktop-nav { display: flex; align-items: center; gap: 32px; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }

        .nav-link {
          font-size: 15px;
          font-weight: 600;
          color: #6e6e73;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-link:hover { color: #1d1d1f; }

        .feature-card {
          background: #f5f5f7;
          border-radius: 24px;
          padding: 32px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }

        .plan-card {
          border-radius: 28px;
          padding: 36px;
          border: 1px solid rgba(0,0,0,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
          background: #fff;
        }
        .plan-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.1);
        }

        .faq-item {
          border-bottom: 1px solid rgba(0,0,0,0.06);
          overflow: hidden;
        }

        .mesh {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 64,
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#1d1d1f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span className="brand-font" style={{ fontSize: 16, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.3px', marginLeft: '16px' }}>DealFlow AI</span>
        </div>

        <div className="desktop-nav">
          <span className="nav-link" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>المميزات</span>
          <span className="nav-link" onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}>آراء العملاء</span>
          <span className="nav-link" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>الأسعار</span>
          <span className="nav-link" onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}>الأسئلة الشائعة</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => window.location.href = '/'}
            style={{ height: 36, padding: '0 12px', borderRadius: 8, border: 'none', background: 'rgba(0,0,0,0.04)', color: '#1d1d1f', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            🇬🇧 EN
          </button>
          <button onClick={() => window.location.href = '/login'}
            style={{ height: 36, padding: '0 18px', borderRadius: 18, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 14, fontWeight: 700 }}>
            تسجيل الدخول
          </button>
          <button onClick={() => window.location.href = '/login'}
            style={{ height: 36, padding: '0 18px', borderRadius: 18, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 14, fontWeight: 700 }}>
            ابدأ الآن مجاناً
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '140px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        
        <div className="mesh" style={{ top: '-10%', left: '-10%', width: '50%', height: '50%', background: '#0071e3', opacity: 0.05 }} />
        <div className="mesh" style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: '#bf5af2', opacity: 0.05 }} />

        <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(52,199,89,0.08)', border: '1px solid rgba(52,199,89,0.15)', marginBottom: 32 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34c759', animation: 'pulse 1.5s infinite' }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#34c759' }}>مصمم خصيصاً لفرق المبيعات في الشرق الأوسط 🇦🇪 🇸🇦</span>
        </div>

        <h1 className="fade-up-1" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 24, maxWidth: 900 }}>
          أغلق صفقات أكثر مع <br />
          <span style={{ color: '#0071e3' }}>ذكاء اصطناعي يفهمك</span>
        </h1>

        <p className="fade-up-2" style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#6e6e73', lineHeight: 1.7, marginBottom: 48, maxWidth: 680, fontWeight: 500 }}>
          ينضم DealFlow AI إلى مكالمات المبيعات الخاصة بك ويقدم لك تدريباً مباشراً، وطرق للرد على الاعتراضات، ورؤى حول الصفقة فور حدوثها - باللغتين العربية والإنجليزية.
        </p>

        <div className="fade-up-3" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 80 }}>
          <button onClick={() => window.location.href = '/login'}
            style={{ height: 56, padding: '0 36px', borderRadius: 28, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 18, fontWeight: 700 }}>
            ابدأ تجربتك المجانية
          </button>
          <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ height: 56, padding: '0 36px', borderRadius: 28, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 18, fontWeight: 700 }}>
            اكتشف كيف يعمل
          </button>
        </div>

        {/* MOCKUP UI ARABIC */}
        <div className="fade-up-3" style={{ width: '100%', maxWidth: 1000, borderRadius: 32, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 40px 120px rgba(0,0,0,0.12)', background: '#000', position: 'relative' }}>
          <div style={{ background: '#1a1a1a', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
             <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff453a' }} />
             <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff9f0a' }} />
             <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#34c759' }} />
          </div>
          <div style={{ background: '#09090b', padding: 32, display: 'grid', gridTemplateColumns: '1fr', gap: 24, textAlign: 'right' }}>
             
             {/* Transcript & Coaching */}
             <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
               <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20, padding: 24 }}>
                  <div style={{ fontSize: 13, color: '#34c759', fontWeight: 700, marginBottom: 8 }}>العميل المحتمل (أحمد)</div>
                  <div style={{ fontSize: 18, color: '#fff', lineHeight: 1.6 }}>
                    "والله المشروع ممتاز وموقعه حلو، بس الدفعة الأولى تعتبر عالية مقارنة بالمشاريع الثانية في نفس المنطقة."
                  </div>
               </div>
               
               <div style={{ background: 'rgba(0,113,227,0.1)', border: '1px solid rgba(0,113,227,0.2)', borderRadius: 20, padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0071e3' }}>اقتراح الذكاء الاصطناعي</span>
                  </div>
                  <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                    وضّح له أن المشروع معفى من رسوم الخدمات لمدة 3 سنوات، مما يوفر له سيولة مالية تغطي فارق الدفعة الأولى وتزيد العائد الاستثماري.
                  </div>
               </div>
             </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '100px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 20 }}>
              شريكك الذكي في كل <span style={{ color: '#0071e3' }}>مكالمة مبيعات</span>
            </h2>
            <p style={{ fontSize: 18, color: '#6e6e73', maxWidth: 600, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
              من لحظة بدء المكالمة وحتى إرسال رسالة المتابعة — DealFlow AI يغطي كافة احتياجاتك.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div style={{ width: 48, height: 48, borderRadius: 14, background: f.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, marginBottom: 24 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1d1d1f', marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.7, fontWeight: 500 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '100px 48px', background: '#f5f5f7' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 20 }}>
              أسعار بسيطة وشفافة
            </h2>
            <p style={{ fontSize: 18, color: '#6e6e73', marginBottom: 32, fontWeight: 500 }}>
              فترة تجريبية 14 يوماً. لا حاجة لبطاقة ائتمان.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px', borderRadius: 24, background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
              <button onClick={() => setBillingAnnual(true)}
                style={{ height: 40, padding: '0 24px', borderRadius: 20, border: 'none', background: billingAnnual ? '#1d1d1f' : 'transparent', color: billingAnnual ? '#fff' : '#6e6e73', fontSize: 15, fontWeight: 700, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}>
                سنوي <span className="brand-font" style={{ fontSize: 12, color: billingAnnual ? '#34c759' : '#0071e3' }}>-20%</span>
              </button>
              <button onClick={() => setBillingAnnual(false)}
                style={{ height: 40, padding: '0 24px', borderRadius: 20, border: 'none', background: !billingAnnual ? '#1d1d1f' : 'transparent', color: !billingAnnual ? '#fff' : '#6e6e73', fontSize: 15, fontWeight: 700, transition: 'all 0.2s' }}>
                شهري
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24, alignItems: 'center' }}>
            {plans.map((plan, i) => (
              <div key={i} className="plan-card" style={{ border: plan.popular ? `2px solid ${plan.color}` : '1px solid rgba(0,0,0,0.08)', position: 'relative' }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', padding: '6px 20px', borderRadius: 20, background: plan.color, color: '#fff', fontSize: 13, fontWeight: 700 }}>
                    الأكثر طلباً
                  </div>
                )}
                <div style={{ fontSize: 22, fontWeight: 800, color: plan.color, marginBottom: 8 }}>{plan.name}</div>
                <div style={{ fontSize: 15, color: '#6e6e73', marginBottom: 32, fontWeight: 500 }}>{plan.desc}</div>
                
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                  <span className="brand-font" style={{ fontSize: 48, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2px', lineHeight: 1 }}>
                    {billingAnnual ? plan.annualPriceAED : plan.monthlyPriceAED}
                  </span>
                  <span style={{ fontSize: 16, color: '#6e6e73', fontWeight: 600 }}>درهم / شهرياً</span>
                </div>
                <div style={{ fontSize: 14, color: '#aeaeb2', marginBottom: 32, fontWeight: 500 }} className="brand-font">
                  (Approx ${billingAnnual ? plan.annualPriceUSD : plan.monthlyPriceUSD} USD)
                </div>

                <button onClick={() => window.location.href = '/login'}
                  style={{ width: '100%', height: 52, borderRadius: 26, border: plan.popular ? 'none' : '1px solid rgba(0,0,0,0.12)', background: plan.popular ? plan.color : 'transparent', color: plan.popular ? '#fff' : '#1d1d1f', fontSize: 16, fontWeight: 700, marginBottom: 32, transition: 'all 0.2s' }}>
                  {plan.cta}
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: plan.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <span style={{ fontSize: 15, color: '#1d1d1f', fontWeight: 500 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '100px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-1px' }}>
              الأسئلة الشائعة
            </h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', textAlign: 'right', color: '#1d1d1f', fontSize: 18, fontWeight: 700 }}>
                  {faq.q}
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: 24, fontSize: 16, color: '#6e6e73', lineHeight: 1.8, fontWeight: 500 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / WAITLIST */}
      <section style={{ padding: '120px 48px', background: '#1d1d1f', position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '-30%', left: '-10%', width: '50%', height: '80%', background: '#0071e3', opacity: 0.15 }} />
        <div className="mesh" style={{ bottom: '-30%', right: '-10%', width: '40%', height: '70%', background: '#bf5af2', opacity: 0.12 }} />

        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-1px', color: '#fff', marginBottom: 24 }}>
            هل أنت جاهز لتطوير <span style={{ color: '#0071e3' }}>مبيعاتك؟</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginBottom: 48, lineHeight: 1.7, fontWeight: 500 }}>
            انضم إلى المئات من محترفي المبيعات في المنطقة الذين يستخدمون DealFlow AI للفوز بمكالمات أكثر.
          </p>

          <button onClick={() => window.location.href = '/login'}
            style={{ height: 56, padding: '0 40px', borderRadius: 28, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 18, fontWeight: 800 }}>
            ابدأ تجربتك المجانية
          </button>
          
          <p style={{ marginTop: 24, fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
            تجربة مجانية 14 يوماً · لا حاجة لبطاقة ائتمان
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px 48px', background: '#1d1d1f', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <span className="brand-font" style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginLeft: '8px' }}>DealFlow AI</span>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            <span onClick={() => window.location.href = '/privacy'} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontWeight: 500 }}>سياسة الخصوصية</span>
            <span onClick={() => window.location.href = '/terms'} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontWeight: 500 }}>الشروط والأحكام</span>
            <span onClick={() => window.location.href = '/contact'} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontWeight: 500 }}>اتصل بنا</span>
          </div>
          <span className="brand-font" style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>© 2026 DealFlow AI. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}