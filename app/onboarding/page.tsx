'use client'
import React, { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase'

const TOTAL_STEPS = 7

// Step 2: Translations Dictionary
const translations = {
  en: {
    toggleLang: '🇦🇪 AR',
    stepOf: (s: number, t: number) => `Step ${s} of ${t}`,
    // Step 1
    s1Title: 'Tell me about you',
    s1Desc: 'This helps me personalize your AI agent',
    fullName: 'Full Name',
    fullNameHolder: 'Your full name',
    industry: 'Industry',
    experience: 'Experience Level',
    // Step 2
    s2Title: 'Teach me what you sell',
    s2Desc: "I'll use this to generate smarter insights during calls",
    whatSell: 'What do you sell?',
    whatSellHolder: 'e.g. Luxury apartments in Dubai Marina',
    website: 'Company website',
    optional: '(optional)',
    websiteHolder: 'https://yourcompany.com',
    // Step 3
    s3Title: 'Know your battlefield',
    s3Desc: 'Add your top competitors so I can help you differentiate',
    compLabel: (i: number) => `Competitor ${i}`,
    compHolders: ['Main competitor', 'Second competitor', 'Third competitor'],
    // Step 4
    s4Title: 'Train your AI agent',
    s4Desc: 'Upload documents so your AI learns your exact context',
    s4Hint: 'Max 3 files · PDF, TXT, Word · 5MB each · Optional',
    docTypes: ['Sales scripts', 'Product sheets', 'Case studies', 'Company docs'],
    uploading: 'Uploading...',
    clickToUpload: 'Click to upload documents',
    uploadFormats: 'PDF, TXT, DOC, DOCX · Max 5MB each',
    filesLearned: (n: number) => `${n}/3 files · Your AI agent will learn from these`,
    // Step 5
    s5Title: 'Choose your style',
    s5Desc: 'How do you prefer to handle objections?',
    prefClosing: 'Preferred closing style',
    // Step 6
    s6Title: 'Set your targets',
    s6Desc: "I'll track your progress and coach you toward these goals",
    monthlyTarget: 'Monthly Revenue Target',
    currency: 'AED',
    dailyCalls: 'Daily Calls Target',
    calls: 'calls',
    // Step 7
    s7Title: "You're all set!",
    s7Desc: "Your AI agent is calibrated and ready.\nLet's close some deals.",
    lblName: 'Name',
    lblInd: 'Industry',
    lblObj: 'Objection style',
    lblDocs: 'Documents',
    lblTarget: 'Monthly target',
    none: 'None',
    notSet: 'Not set',
    fileCount: (n: number) => n === 1 ? '1 file' : `${n} files`,
    // Buttons
    back: 'Back',
    next: 'Next →',
    continueFiles: (n: number) => `Continue with ${n} ${n===1?'file':'files'} →`,
    skip: 'Skip for now →',
    finishSetup: 'Finish Setup →',
    saving: 'Saving...',
    goDash: 'Go to Dashboard →',
    // Errors
    errMaxFiles: 'Maximum 3 files allowed',
    errFileType: 'Only PDF, TXT, and Word documents allowed',
    errFileSize: 'Each file must be under 5MB',
    errUpload: 'Upload failed',

    industries: {
      'Real Estate': 'Real Estate', 'SaaS / Tech': 'SaaS / Tech', 'Finance': 'Finance', 'Insurance': 'Insurance', 'Healthcare': 'Healthcare', 'E-commerce': 'E-commerce', 'Consulting': 'Consulting', 'Other': 'Other'
    },
    experiences: {
      'Beginner': 'Beginner', 'Intermediate': 'Intermediate', 'Advanced': 'Advanced', 'Expert': 'Expert'
    },
    objStyles: {
      'Assertive Closer': { label: 'Assertive Closer', desc: 'Direct, confident, persistent' },
      'Consultative Guide': { label: 'Consultative Guide', desc: 'Empathetic, relationship-focused' },
      'Data-Driven': { label: 'Data-Driven', desc: 'Facts, ROI, logic-based' },
      'Storyteller': { label: 'Storyteller', desc: 'Narratives, social proof, emotion' }
    },
    closeStyles: {
      'Assumptive Close': { label: 'Assumptive Close', desc: 'Act as if the deal is done' },
      'Urgency Close': { label: 'Urgency Close', desc: 'Create time pressure' },
      'Question Close': { label: 'Question Close', desc: 'Use questions to guide' },
      'Summary Close': { label: 'Summary Close', desc: 'Recap value before asking' }
    }
  },
  ar: {
    toggleLang: '🇬🇧 EN',
    stepOf: (s: number, t: number) => `الخطوة ${s} من ${t}`,
    // Step 1
    s1Title: 'حدثني عن نفسك',
    s1Desc: 'هذا يساعدني في تخصيص وكيل الذكاء الاصطناعي الخاص بك',
    fullName: 'الاسم الكامل',
    fullNameHolder: 'اسمك الكامل',
    industry: 'القطاع',
    experience: 'مستوى الخبرة',
    // Step 2
    s2Title: 'علمني ما تبيعه',
    s2Desc: 'سأستخدم هذا لتوليد رؤى أذكى أثناء المكالمات',
    whatSell: 'ماذا تبيع؟',
    whatSellHolder: 'مثال: شقق فاخرة في دبي مارينا',
    website: 'موقع الشركة',
    optional: '(اختياري)',
    websiteHolder: 'https://yourcompany.com',
    // Step 3
    s3Title: 'اعرف ساحة معركتك',
    s3Desc: 'أضف أهم منافسيك لمساعدتك في التميز',
    compLabel: (i: number) => `المنافس ${i}`,
    compHolders: ['المنافس الرئيسي', 'المنافس الثاني', 'المنافس الثالث'],
    // Step 4
    s4Title: 'درب وكيلك الذكي',
    s4Desc: 'ارفع المستندات ليتعلم الذكاء الاصطناعي سياقك الدقيق',
    s4Hint: 'الحد الأقصى 3 ملفات · PDF, TXT, Word · 5 ميجابايت كحد أقصى للملف · اختياري',
    docTypes: ['نصوص المبيعات', 'أوراق المنتجات', 'دراسات الحالة', 'مستندات الشركة'],
    uploading: 'جاري الرفع...',
    clickToUpload: 'انقر لرفع المستندات',
    uploadFormats: 'PDF, TXT, DOC, DOCX · 5MB كحد أقصى',
    filesLearned: (n: number) => `${n}/3 ملفات · سيتعلم وكيلك الذكي منها`,
    // Step 5
    s5Title: 'اختر أسلوبك',
    s5Desc: 'كيف تفضل التعامل مع الاعتراضات؟',
    prefClosing: 'أسلوب الإغلاق المفضل',
    // Step 6
    s6Title: 'حدد أهدافك',
    s6Desc: 'سأتتبع تقدمك وأدربك لتحقيق هذه الأهداف',
    monthlyTarget: 'هدف الإيرادات الشهري',
    currency: 'درهم',
    dailyCalls: 'هدف المكالمات اليومي',
    calls: 'مكالمات',
    // Step 7
    s7Title: 'أنت جاهز!',
    s7Desc: "وكيل الذكاء الاصطناعي الخاص بك تمت معايرته وجاهز.\nدعنا نغلق بعض الصفقات.",
    lblName: 'الاسم',
    lblInd: 'القطاع',
    lblObj: 'أسلوب الاعتراض',
    lblDocs: 'المستندات',
    lblTarget: 'الهدف الشهري',
    none: 'لا يوجد',
    notSet: 'غير محدد',
    fileCount: (n: number) => n === 1 ? 'ملف واحد' : n === 2 ? 'ملفان' : `${n} ملفات`,
    // Buttons
    back: 'رجوع',
    next: 'التالي ←',
    continueFiles: (n: number) => `المتابعة مع ${n === 1 ? 'ملف واحد' : n === 2 ? 'ملفين' : n + ' ملفات'} ←`,
    skip: 'تخطي الآن ←',
    finishSetup: 'إنهاء الإعداد ←',
    saving: 'جاري الحفظ...',
    goDash: 'الذهاب للوحة التحكم ←',
    // Errors
    errMaxFiles: 'الحد الأقصى 3 ملفات',
    errFileType: 'يسمح فقط بملفات PDF و TXT و Word',
    errFileSize: 'يجب أن يكون حجم كل ملف أقل من 5 ميجابايت',
    errUpload: 'فشل الرفع',

    industries: {
      'Real Estate': 'عقارات', 'SaaS / Tech': 'برمجيات / تقنية', 'Finance': 'مالية', 'Insurance': 'تأمين', 'Healthcare': 'رعاية صحية', 'E-commerce': 'تجارة إلكترونية', 'Consulting': 'استشارات', 'Other': 'أخرى'
    },
    experiences: {
      'Beginner': 'مبتدئ', 'Intermediate': 'متوسط', 'Advanced': 'متقدم', 'Expert': 'خبير'
    },
    objStyles: {
      'Assertive Closer': { label: 'مغلق حازم', desc: 'مباشر، واثق، مثابر' },
      'Consultative Guide': { label: 'دليل استشاري', desc: 'متعاطف، يركز على العلاقات' },
      'Data-Driven': { label: 'مبني على البيانات', desc: 'حقائق، عائد استثمار، مبني على المنطق' },
      'Storyteller': { label: 'راوي قصص', desc: 'سرديات، إثبات اجتماعي، عاطفة' }
    },
    closeStyles: {
      'Assumptive Close': { label: 'إغلاق افتراضي', desc: 'تصرف وكأن الصفقة تمت' },
      'Urgency Close': { label: 'إغلاق الاستعجال', desc: 'خلق ضغط الوقت' },
      'Question Close': { label: 'إغلاق بالسؤال', desc: 'استخدم الأسئلة للتوجيه' },
      'Summary Close': { label: 'إغلاق تلخيصي', desc: 'لخص القيمة قبل الطلب' }
    }
  }
} as const;

type Lang = 'en' | 'ar';
type IndustryKey = keyof typeof translations['en']['industries'];
type ExperienceKey = keyof typeof translations['en']['experiences'];
type ObjStyleKey = keyof typeof translations['en']['objStyles'];
type CloseStyleKey = keyof typeof translations['en']['closeStyles'];

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string, path: string, size: number }[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Step 1: State & RTL
  const [lang, setLang] = useState<Lang>('en')
  const isRTL = lang === 'ar'
  const tr = translations[lang]

  const [form, setForm] = useState({
    fullName: '',
    industry: '',
    experience: 'Intermediate',
    product: '',
    website: '',
    competitors: ['', '', ''],
    objectionStyle: '',
    closingStyle: '',
    monthlyTarget: '',
    dailyCalls: '',
  })

  const update = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }))

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    if (uploadedFiles.length + files.length > 3) { setUploadError(tr.errMaxFiles); return }
    const allowed = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    for (const file of files) {
      if (!allowed.includes(file.type)) { setUploadError(tr.errFileType); return }
      if (file.size > 5 * 1024 * 1024) { setUploadError(tr.errFileSize); return }
    }
    setUploadError('')
    setUploading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not logged in')
      for (const file of files) {
        const path = user.id + '/' + Date.now() + '_' + file.name
        const { error } = await supabase.storage.from('user-documents').upload(path, file)
        if (error) throw error
        setUploadedFiles(prev => [...prev, { name: file.name, path, size: file.size }])
      }
    } catch (err: any) {
      setUploadError(err.message || tr.errUpload)
    }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeFile = async (index: number) => {
    try {
      const supabase = createClient()
      await supabase.storage.from('user-documents').remove([uploadedFiles[index].path])
      setUploadedFiles(prev => prev.filter((_, i) => i !== index))
    } catch (err) { console.error(err) }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handleFinish = async () => {
    setSaving(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('profiles').upsert({
          id: user.id,
          full_name: form.fullName,
          industry: form.industry,
          experience: form.experience,
          product: form.product,
          website: form.website,
          competitors: form.competitors.filter(c => c.trim()),
          objection_style: form.objectionStyle,
          closing_style: form.closingStyle,
          monthly_target: form.monthlyTarget,
          daily_calls: form.dailyCalls,
          document_paths: uploadedFiles.map(f => f.path),
          onboarded: true,
        })
      }
    } catch (err) { console.error(err) }
    setSaving(false)
    window.location.href = '/'
  }

  const canProceed = () => {
    if (step === 1) return form.fullName.trim().length > 0
    if (step === 2) return form.industry !== '' && form.product.trim().length > 0
    if (step === 5) return form.objectionStyle.length > 0
    if (step === 6) return form.monthlyTarget.trim().length > 0
    return true
  }

  const industries: IndustryKey[] = ['Real Estate', 'SaaS / Tech', 'Finance', 'Insurance', 'Healthcare', 'E-commerce', 'Consulting', 'Other']
  const experiences: ExperienceKey[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  const objectionKeys: ObjStyleKey[] = ['Assertive Closer', 'Consultative Guide', 'Data-Driven', 'Storyteller']
  const closingKeys: CloseStyleKey[] = ['Assumptive Close', 'Urgency Close', 'Question Close', 'Summary Close']

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px', borderRadius: 14,
    border: '1px solid var(--input-border)',
    background: 'var(--input-bg)', color: 'var(--text-primary)',
    fontSize: 15, outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  }

  const optionBtn = (selected: boolean): React.CSSProperties => ({
    padding: '13px 18px', borderRadius: 14, cursor: 'pointer',
    border: '1px solid ' + (selected ? 'var(--text-tertiary)' : 'var(--card-border)'),
    background: selected ? 'var(--card-hover)' : 'var(--card-bg)',
    color: selected ? 'var(--text-primary)' : 'var(--text-tertiary)',
    fontSize: 14, fontWeight: selected ? 500 : 400,
    transition: 'all 0.2s',
  })

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 500, color: 'var(--text-tertiary)',
    letterSpacing: '0.05em', marginBottom: 10, display: 'block'
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: var(--bg); color: var(--text-primary); font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; -webkit-font-smoothing: antialiased; }
        input::placeholder { color: var(--text-dim); }
        input:focus { border-color: var(--text-tertiary) !important; outline: none; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      {/* Step 3: Add dir to root div */}
      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>

        {/* Spatial mesh */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '70%', height: '70%', borderRadius: '50%', background: '#00e5a0', filter: 'blur(160px)', opacity: 0.05 }} />
          <div style={{ position: 'absolute', bottom: '-30%', right: '-20%', width: '60%', height: '60%', borderRadius: '50%', background: '#4488ff', filter: 'blur(160px)', opacity: 0.05 }} />
        </div>

        {/* Language Toggle */}
        <button
          onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
          style={{ position: 'absolute', top: 32, [isRTL ? 'left' : 'right']: 32, zIndex: 100, height: 38, padding: '0 16px', borderRadius: 19, border: '1px solid var(--card-border)', background: isRTL ? 'rgba(10,132,255,0.15)' : 'var(--card-bg)', color: isRTL ? '#0a84ff' : 'var(--text-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
        >
          {tr.toggleLang}
        </button>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, position: 'relative', zIndex: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 13, background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>DealFlow AI</span>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 40, position: 'relative', zIndex: 10 }}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} style={{ height: 3, borderRadius: 2, transition: 'all 0.3s', width: i + 1 === step ? 28 : 8, background: i + 1 <= step ? 'var(--text-primary)' : 'var(--card-border)' }} />
          ))}
        </div>

        {/* Card */}
        <div key={step} style={{ width: '100%', maxWidth: 520, background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 32, padding: '40px 36px', backdropFilter: 'blur(40px)', position: 'relative', zIndex: 10, animation: 'fadeUp 0.35s ease', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>

          {/* Step label */}
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 14 }}>
            {tr.stepOf(step, TOTAL_STEPS)}
          </div>

          {/* Step 1 — About you */}
          {step === 1 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 6, color: 'var(--text-primary)' }}>{tr.s1Title}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>{tr.s1Desc}</div>
              <div style={{ marginBottom: 20 }}>
                <span style={labelStyle}>{tr.fullName}</span>
                <input style={inputStyle} placeholder={tr.fullNameHolder} value={form.fullName} onChange={e => update('fullName', e.target.value)} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <span style={labelStyle}>{tr.industry}</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {industries.map(ind => (
                    <div key={ind} style={optionBtn(form.industry === ind)} onClick={() => update('industry', ind)}>
                      {tr.industries[ind]}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span style={labelStyle}>{tr.experience}</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                  {experiences.map(exp => (
                    <div key={exp} style={{ ...optionBtn(form.experience === exp), textAlign: 'center', padding: '10px 8px', fontSize: 13 }} onClick={() => update('experience', exp)}>
                      {tr.experiences[exp]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — What you sell */}
          {step === 2 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 6, color: 'var(--text-primary)' }}>{tr.s2Title}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>{tr.s2Desc}</div>
              <div style={{ marginBottom: 20 }}>
                <span style={labelStyle}>{tr.whatSell}</span>
                <input style={inputStyle} placeholder={tr.whatSellHolder} value={form.product} onChange={e => update('product', e.target.value)} />
              </div>
              <div>
                <span style={labelStyle}>{tr.website} <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>{tr.optional}</span></span>
                <input style={inputStyle} placeholder={tr.websiteHolder} value={form.website} onChange={e => update('website', e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 3 — Competitors */}
          {step === 3 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 6, color: 'var(--text-primary)' }}>{tr.s3Title}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>{tr.s3Desc}</div>
              {form.competitors.map((comp, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <span style={labelStyle}>{tr.compLabel(i + 1)} {i > 0 && <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>{tr.optional}</span>}</span>
                  <input style={inputStyle} placeholder={tr.compHolders[i]}
                    value={comp} onChange={e => {
                      const updated = [...form.competitors]
                      updated[i] = e.target.value
                      update('competitors', updated)
                    }} />
                </div>
              ))}
            </div>
          )}

          {/* Step 4 — Document upload */}
          {step === 4 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 6, color: 'var(--text-primary)' }}>{tr.s4Title}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 6 }}>{tr.s4Desc}</div>
              <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 28 }}>{tr.s4Hint}</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
                {[
                  { icon: '📄', label: tr.docTypes[0] },
                  { icon: '📊', label: tr.docTypes[1] },
                  { icon: '🏆', label: tr.docTypes[2] },
                  { icon: '📝', label: tr.docTypes[3] },
                ].map((d, i) => (
                  <div key={i} style={{ padding: '12px 14px', borderRadius: 12, background: 'var(--input-bg)', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{d.icon}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{d.label}</span>
                  </div>
                ))}
              </div>

              {uploadedFiles.length < 3 && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{ border: '1px dashed var(--card-border)', borderRadius: 18, padding: '28px 20px', textAlign: 'center', cursor: 'pointer', marginBottom: 16, transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--text-tertiary)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--input-bg)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)'; (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                >
                  {uploading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: 'var(--text-tertiary)', fontSize: 14 }}>
                      <div style={{ width: 16, height: 16, border: '2px solid var(--card-border)', borderTopColor: 'var(--text-secondary)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                      {tr.uploading}
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>📎</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 4 }}>{tr.clickToUpload}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{tr.uploadFormats}</div>
                    </>
                  )}
                </div>
              )}

              <input ref={fileInputRef} type="file" accept=".pdf,.txt,.doc,.docx" multiple style={{ display: 'none' }} onChange={handleFileUpload} />

              {uploadError && (
                <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,69,58,0.08)', border: '1px solid rgba(255,69,58,0.2)', fontSize: 13, color: '#ff453a', marginBottom: 12 }}>⚠ {uploadError}</div>
              )}

              {uploadedFiles.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {uploadedFiles.map((file, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, background: 'var(--input-bg)', border: '1px solid var(--card-border)' }}>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>{file.name.endsWith('.pdf') ? '📄' : '📝'}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{formatSize(file.size)}</div>
                      </div>
                      <button onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: 16, padding: '2px 6px', flexShrink: 0, fontFamily: 'inherit' }}>✕</button>
                    </div>
                  ))}
                  <div style={{ fontSize: 12, color: 'var(--text-dim)', textAlign: 'center', marginTop: 4 }}>
                    {tr.filesLearned(uploadedFiles.length)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5 — Objection style */}
          {step === 5 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 6, color: 'var(--text-primary)' }}>{tr.s5Title}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>{tr.s5Desc}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {objectionKeys.map(key => {
                  const s = tr.objStyles[key];
                  return (
                    <div key={key} style={{ ...optionBtn(form.objectionStyle === key), display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => update('objectionStyle', key)}>
                      <div>
                        <div style={{ fontWeight: 500, marginBottom: 2, color: form.objectionStyle === key ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{s.label}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{s.desc}</div>
                      </div>
                      {form.objectionStyle === key && (
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--bg)', fontWeight: 700, flexShrink: 0 }}>✓</div>
                      )}
                    </div>
                  )
                })}
              </div>
              <div>
                <span style={labelStyle}>{tr.prefClosing}</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {closingKeys.map(key => {
                    const s = tr.closeStyles[key];
                    return (
                      <div key={key} style={{ ...optionBtn(form.closingStyle === key), fontSize: 13 }} onClick={() => update('closingStyle', key)}>
                        <div style={{ fontWeight: 500, marginBottom: 2 }}>{s.label}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{s.desc}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 6 — Targets */}
          {step === 6 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 6, color: 'var(--text-primary)' }}>{tr.s6Title}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>{tr.s6Desc}</div>
              <div style={{ marginBottom: 24 }}>
                <span style={labelStyle}>{tr.monthlyTarget}</span>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', [isRTL ? 'right' : 'left']: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', fontSize: 14 }}>{tr.currency}</span>
                  <input style={{ ...inputStyle, [isRTL ? 'paddingRight' : 'paddingLeft']: 56, [isRTL ? 'paddingLeft' : 'paddingRight']: 16 }} placeholder="500,000" value={form.monthlyTarget} onChange={e => update('monthlyTarget', e.target.value)} />
                </div>
              </div>
              <div>
                <span style={labelStyle}>{tr.dailyCalls}</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
                  {['5', '10', '15', '20', '25+'].map(n => (
                    <div key={n} style={{ ...optionBtn(form.dailyCalls === n), textAlign: 'center', padding: '12px 8px' }} onClick={() => update('dailyCalls', n)}>
                      <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.5px' }}>{n}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 2 }}>{tr.calls}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 7 — All set */}
          {step === 7 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--card-hover)', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px', animation: 'float 3s ease-in-out infinite' }}>
                🎉
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 8, color: 'var(--text-primary)' }}>{tr.s7Title}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {tr.s7Desc}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: isRTL ? 'right' : 'left', marginBottom: 8 }}>
                {[
                  { label: tr.lblName, value: form.fullName },
                  { label: tr.lblInd, value: form.industry ? tr.industries[form.industry as IndustryKey] : '' },
                  { label: tr.lblObj, value: form.objectionStyle ? tr.objStyles[form.objectionStyle as ObjStyleKey].label : '' },
                  { label: tr.lblDocs, value: uploadedFiles.length > 0 ? tr.fileCount(uploadedFiles.length) : tr.none },
                  { label: tr.lblTarget, value: form.monthlyTarget ? `${tr.currency} ${form.monthlyTarget}` : tr.notSet },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 14, background: 'var(--input-bg)', border: '1px solid var(--card-border)' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--card-hover)', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--text-secondary)', flexShrink: 0, fontWeight: 700 }}>✓</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 1 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{item.value || '—'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 10, marginTop: 32 }}>
            {step > 1 && step < 7 && (
              <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: '14px', borderRadius: 16, border: '1px solid var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-secondary)', fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                {tr.back}
              </button>
            )}
            {step < 4 && (
              <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} style={{ flex: 1, padding: '14px', borderRadius: 16, border: 'none', background: canProceed() ? 'rgba(255,255,255,0.9)' : 'var(--card-hover)', color: canProceed() ? '#000' : 'var(--text-tertiary)', fontSize: 15, fontWeight: 600, cursor: canProceed() ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                {tr.next}
              </button>
            )}
            {step === 4 && (
              <button onClick={() => setStep(5)} style={{ flex: 1, padding: '14px', borderRadius: 16, border: 'none', background: 'rgba(255,255,255,0.9)', color: '#000', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {uploadedFiles.length > 0 ? tr.continueFiles(uploadedFiles.length) : tr.skip}
              </button>
            )}
            {(step === 5 || step === 6) && (
              <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} style={{ flex: 1, padding: '14px', borderRadius: 16, border: 'none', background: canProceed() ? 'rgba(255,255,255,0.9)' : 'var(--card-hover)', color: canProceed() ? '#000' : 'var(--text-tertiary)', fontSize: 15, fontWeight: 600, cursor: canProceed() ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                {step === 6 ? tr.finishSetup : tr.next}
              </button>
            )}
            {step === 7 && (
              <button onClick={handleFinish} disabled={saving} style={{ flex: 1, padding: '14px', borderRadius: 16, border: 'none', background: saving ? 'var(--card-hover)' : 'rgba(255,255,255,0.9)', color: saving ? 'var(--text-tertiary)' : '#000', fontSize: 15, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {saving && <div style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
                {saving ? tr.saving : tr.goDash}
              </button>
            )}
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 12, color: 'var(--text-dim)', position: 'relative', zIndex: 10 }}>
          {tr.stepOf(step, TOTAL_STEPS)}
        </div>
      </div>
    </>
  )
}