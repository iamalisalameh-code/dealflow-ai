'use client'
import { useState } from 'react'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'

export default function MobileAr() {
  const [billingAnnual, setBillingAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const features = [
    { icon: '🎙', title: 'النسخ المباشر', desc: 'تحويل الكلام إلى نص فوري بالعربية والإنجليزية. كل كلمة تُسجَّل بدقة عالية.', color: '#0071e3' },
    { icon: '🤖', title: 'مدرب المبيعات الذكي', desc: 'رؤى فورية ونصائح للتعامل مع الاعتراضات ودرجة صحة الصفقة أثناء المحادثة.', color: '#34c759' },
    { icon: '⚡', title: 'إشارات الشراء', desc: 'لا تفوّت أي إشارة. يكتشف الذكاء الاصطناعي نية الشراء فور حدوثها.', color: '#ff9f0a' },
    { icon: '💬', title: 'رسائل المتابعة الذكية', desc: 'توليد رسائل واتساب وبريد إلكتروني مخصصة تلقائياً بعد انتهاء المكالمة.', color: '#bf5af2' },
    { icon: '👥', title: 'إدارة الفريق', desc: 'دعوة الوكلاء وتحديد الصلاحيات ومتابعة أداء الفريق كاملاً.', color: '#ff453a' },
    { icon: '📹', title: 'Google Meet وZoom', desc: 'يعمل مع أدوات الاجتماعات الحالية بنقرة واحدة.', color: '#0071e3' },
  ]

  const plans = [
    { name: 'فردي', price: billingAnnual ? 39 : 49, color: '#0071e3', popular: false,
      features: ['تسجيلات مكالمات غير محدودة', 'تدريب ذكي مباشر', 'عربي + إنجليزي', 'رسائل متابعة ذكية', 'ملخص ما قبل المكالمة', 'إدارة جهات الاتصال'] },
    { name: 'فريق', price: billingAnnual ? 79 : 99, color: '#bf5af2', popular: true,
      features: ['كل ما في الخطة الفردية', 'حتى 10 وكلاء', 'لوحة أداء الفريق', 'تحكم في صلاحيات كل وكيل', 'دعم أولوية'] },
  ]

  const faqs = [
    { q: 'هل يعمل مع Google Meet وZoom؟', a: 'نعم — يتكامل مباشرة مع Google Meet وZoom وMicrosoft Teams. نقرة واحدة للبدء.' },
    { q: 'ما مدى دقة التعرف على العربية؟', a: 'نستخدم Google Cloud Speech-to-Text v2 مع دعم للهجة الخليجية والمصرية والعربية الفصحى. الدقة تتجاوز 90%.' },
    { q: 'هل بياناتي آمنة؟', a: 'جميع البيانات مشفرة أثناء النقل والتخزين. لا نستخدم مكالماتك لتدريب النماذج.' },
    { q: 'هل هناك تجربة مجانية؟', a: '14 يوماً كاملة بدون بطاقة ائتمان. وصول كامل لجميع الميزات.' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
        * { margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent; }
        body { font-family:'Noto Sans Arabic','DM Sans',sans-serif;background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;direction:rtl; }
        .serif { font-family:'DM Serif Display',serif; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.5s ease both; }
        .tap-btn { transition:transform 0.15s,opacity 0.15s; }
        .tap-btn:active { transform:scale(0.97);opacity:0.85; }
      `}</style>

      <MobileNav activePage="ar" />

      {/* Hero */}
      <section style={{ padding: '48px 24px 40px', background: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: '70%', height: '60%', borderRadius: '50%', background: '#bf5af2', filter: 'blur(80px)', opacity: 0.06, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-20%', width: '60%', height: '50%', borderRadius: '50%', background: '#0071e3', filter: 'blur(80px)', opacity: 0.05, pointerEvents: 'none' }} />

        <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: 'rgba(191,90,242,0.08)', border: '1px solid rgba(191,90,242,0.15)', marginBottom: 24 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34c759', animation: 'pulse 1.5s infinite' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#bf5af2' }}>متاح الآن بالعربية والإنجليزية</span>
        </div>

        <h1 style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.2, letterSpacing: '0', marginBottom: 16, color: '#1d1d1f' }}>
          أغلق أكثر من الصفقات<br />
          <span style={{ color: '#0071e3', fontStyle: 'italic', fontFamily: 'DM Serif Display, serif' }}>بذكاء اصطناعي يسمعك</span>
        </h1>

        <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.7, marginBottom: 32, maxWidth: 320, margin: '0 auto 32px' }}>
          مساعد المبيعات الذكي الذي يحضر معك كل مكالمة — تدريب مباشر، اكتشاف الاعتراضات، ومتابعة ذكية — بالعربية والإنجليزية.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320, margin: '0 auto' }}>
          <button className="tap-btn" onClick={() => window.location.href = '/login'}
            style={{ height: 52, borderRadius: 26, border: 'none', background: '#1d1d1f', color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'inherit' }}>
            ابدأ التجربة المجانية ←
          </button>
          <button className="tap-btn" onClick={() => window.location.href = '/how-it-works'}
            style={{ height: 52, borderRadius: 26, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', color: '#1d1d1f', fontSize: 16, fontWeight: 500, fontFamily: 'inherit' }}>
            شاهد كيف يعمل
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 40, maxWidth: 340, margin: '40px auto 0' }}>
          {[['34%', 'زيادة في الإغلاق'], ['91%', 'دقة العربية'], ['14 يوم', 'تجربة مجانية']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center', padding: '12px 8px', borderRadius: 16, background: '#f5f5f7' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.5px' }}>{val}</div>
              <div style={{ fontSize: 11, color: '#6e6e73', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo card */}
      <section style={{ padding: '0 20px 40px' }}>
        <div style={{ borderRadius: 24, overflow: 'hidden', background: '#000', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ background: '#111', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
            {['#ff453a','#ff9f0a','#34c759'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginRight: 8 }}>مكالمة مباشرة · أحمد المنصوري</span>
          </div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>مكالمة مباشرة</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>شركة الإمارات للعقارات</div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 300, color: '#34c759', fontFamily: 'monospace' }}>02:47</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[['صحة الصفقة', '87%', '#34c759'], ['إشارات', '3', '#ff9f0a'], ['النتيجة', '8.4', '#0071e3']].map(([label, val, color]) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '10px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '12px 14px' }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>النص المباشر</div>
              <div style={{ fontSize: 11, color: '#34c759', fontWeight: 700, marginBottom: 4 }}>أحمد</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>يعجبني المشروع بس أحتاج أعرف تفاصيل خطة الدفع</div>
              <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 8, background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.2)' }}>
                <span style={{ fontSize: 11, color: '#34c759' }}>⚡ إشارة شراء مكتشفة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '40px 20px', background: '#f5f5f7' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>كل ما تحتاجه</div>
          <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
            شريك المبيعات الذكي<br /><span style={{ color: '#0071e3', fontStyle: 'italic', fontFamily: 'DM Serif Display, serif' }}>دائماً بجانبك</span>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 20, padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: f.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1d1d1f', marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: '#6e6e73', lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '40px 20px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 8 }}>أسعار شفافة<br /><span style={{ color: '#0071e3', fontStyle: 'italic', fontFamily: 'DM Serif Display, serif' }}>بدون مفاجآت</span></h2>
          <p style={{ fontSize: 14, color: '#6e6e73', marginBottom: 20 }}>14 يوماً مجاناً. بدون بطاقة ائتمان.</p>
          <div style={{ display: 'inline-flex', padding: 4, borderRadius: 20, background: '#f5f5f7' }}>
            {[['شهري', false], ['سنوي', true]].map(([label, isAnnual]) => (
              <button key={label as string} onClick={() => setBillingAnnual(isAnnual as boolean)}
                style={{ height: 34, padding: '0 18px', borderRadius: 16, border: 'none', background: billingAnnual === isAnnual ? '#1d1d1f' : 'transparent', color: billingAnnual === isAnnual ? '#fff' : '#6e6e73', fontSize: 13, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
                {label as string}
                {isAnnual && <span style={{ fontSize: 10, fontWeight: 700, color: '#34c759' }}>-20%</span>}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {plans.map((plan, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 24, padding: '24px 20px', border: plan.popular ? `2px solid ${plan.color}` : '1px solid rgba(0,0,0,0.08)', position: 'relative' }}>
              {plan.popular && <div style={{ position: 'absolute', top: -12, right: '50%', transform: 'translateX(50%)', padding: '3px 14px', borderRadius: 12, background: plan.color, color: '#fff', fontSize: 11, fontWeight: 700 }}>الأكثر شيوعاً</div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: plan.color, letterSpacing: '0.05em', marginBottom: 4 }}>{plan.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                    <span style={{ fontSize: 44, fontWeight: 700, color: '#1d1d1f', letterSpacing: '-2px', lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ fontSize: 13, color: '#6e6e73' }}>$/شهر</span>
                  </div>
                </div>
                <button className="tap-btn" onClick={() => window.location.href = '/login'}
                  style={{ height: 40, padding: '0 18px', borderRadius: 20, border: 'none', background: plan.popular ? plan.color : '#f5f5f7', color: plan.popular ? '#fff' : '#1d1d1f', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', flexShrink: 0 }}>
                  ابدأ مجاناً ←
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: plan.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize: 13, color: '#1d1d1f' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ background: '#1d1d1f', borderRadius: 24, padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#ff9f0a', marginBottom: 4 }}>مؤسسي</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>أسعار مخصصة للفرق الكبيرة</div>
            </div>
            <button className="tap-btn" onClick={() => window.location.href = '/contact'}
              style={{ height: 40, padding: '0 16px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'inherit' }}>
              تواصل ←
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '40px 20px', background: '#f5f5f7' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.3px' }}>أسئلة <span style={{ color: '#0071e3', fontStyle: 'italic', fontFamily: 'DM Serif Display, serif' }}>شائعة</span></h2>
        </div>
        <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', textAlign: 'right', color: '#1d1d1f', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', gap: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <span style={{ flex: 1, textAlign: 'right' }}>{faq.q}</span>
              </button>
              {openFaq === i && <div style={{ padding: '0 20px 18px', fontSize: 14, color: '#6e6e73', lineHeight: 1.7, textAlign: 'right' }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '48px 20px', background: '#1d1d1f', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: '70%', height: '70%', borderRadius: '50%', background: '#bf5af2', filter: 'blur(80px)', opacity: 0.15, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.2, color: '#fff', marginBottom: 12 }}>
            هل أنت مستعد لإغلاق<br /><span style={{ color: '#34c759', fontStyle: 'italic', fontFamily: 'DM Serif Display, serif' }}>المزيد من الصفقات؟</span>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>14 يوماً مجاناً. بدون بطاقة ائتمان.</p>
          <button className="tap-btn" onClick={() => window.location.href = '/login'}
            style={{ width: '100%', maxWidth: 300, height: 52, borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 700, fontFamily: 'inherit' }}>
            ابدأ التجربة المجانية ←
          </button>
        </div>
      </section>

      <MobileFooter />
    </>
  )
}