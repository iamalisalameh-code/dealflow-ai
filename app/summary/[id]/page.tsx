'use client'
import React, { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface Call {
  id: string
  created_at: string
  duration: number
  contact_name: string
  company: string
  transcript: string
  insights: any
  notes: string
  status: string
}

function AppleRing({ value, color, size = 80, stroke = 8 }: { value: number, color: string, size?: number, stroke?: number }) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.32,0.72,0,1)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: size < 70 ? 12 : 16, fontWeight: 600 }}>
        {value}%
      </div>
    </div>
  )
}

// Step 2: Translations Dictionary
const translations = {
  en: {
    postCallSummary: 'Post-Call Summary',
    history: '← History',
    newCall: '+ New Call',
    duration: 'Duration',
    dealHealth: 'Deal Health',
    talkRatio: 'Talk Ratio',
    sentiment: 'Sentiment',
    overallProgress: 'Overall progress',
    agentSpeakingTime: 'Agent speaking time',
    customerMood: 'Customer mood',
    followUpActions: 'Follow-up Actions',
    objectionsRaised: 'Objections Raised',
    noObjections: 'No objections detected',
    customerNeeds: 'Customer Needs',
    topicsDiscussed: 'Topics Discussed',
    aiCoachingSummary: 'AI Coaching Summary',
    generatingSummary: 'Generating your personalized coaching summary...',
    noTranscriptForSummary: 'No transcript available for AI summary',
    fullTranscript: 'Full Transcript',
    yourNotes: 'Your Notes',
    followUpGenerator: 'Follow-up Generator',
    aiDraftedMessage: 'AI-drafted message based on this call',
    generateFollowUp: '✦ Generate Follow-up',
    generating: 'Generating...',
    whatsapp: '💬 WhatsApp',
    email: '✉️ Email',
    regenerate: 'Regenerate',
    subject: 'Subject',
    copyToClipboard: 'Copy to Clipboard',
    copied: '✓ Copied!',
    openWhatsapp: 'Open WhatsApp →',
    openMail: 'Open Mail →',
    loadingSummary: 'Loading summary...',
    callNotFound: 'Call not found —',
    goBack: 'Go back',
    strong: 'Strong',
    onTrack: 'On Track',
    atRisk: 'At Risk',
    balanced: 'Balanced',
    highTalk: 'High Talk',
    toggleLang: '🇦🇪 AR'
  },
  ar: {
    postCallSummary: 'ملخص بعد المكالمة',
    history: '← السجل',
    newCall: '+ مكالمة جديدة',
    duration: 'المدة',
    dealHealth: 'صحة الصفقة',
    talkRatio: 'نسبة التحدث',
    sentiment: 'المشاعر',
    overallProgress: 'التقدم العام',
    agentSpeakingTime: 'وقت تحدث الوكيل',
    customerMood: 'مزاج العميل',
    followUpActions: 'إجراءات المتابعة',
    objectionsRaised: 'الاعتراضات المطروحة',
    noObjections: 'لم يتم اكتشاف أي اعتراضات',
    customerNeeds: 'احتياجات العميل',
    topicsDiscussed: 'المواضيع التي تمت مناقشتها',
    aiCoachingSummary: 'ملخص تدريب الذكاء الاصطناعي',
    generatingSummary: 'جاري إنشاء ملخص التدريب المخصص لك...',
    noTranscriptForSummary: 'لا يوجد نص متاح لملخص الذكاء الاصطناعي',
    fullTranscript: 'النص الكامل',
    yourNotes: 'ملاحظاتك',
    followUpGenerator: 'مولد المتابعة',
    aiDraftedMessage: 'رسالة مصاغة بالذكاء الاصطناعي بناءً على هذه المكالمة',
    generateFollowUp: '✦ إنشاء متابعة',
    generating: 'جاري الإنشاء...',
    whatsapp: '💬 واتساب',
    email: '✉️ البريد الإلكتروني',
    regenerate: 'إعادة إنشاء',
    subject: 'الموضوع',
    copyToClipboard: 'نسخ إلى الحافظة',
    copied: '✓ تم النسخ!',
    openWhatsapp: 'فتح واتساب ←',
    openMail: 'فتح البريد ←',
    loadingSummary: 'جاري تحميل الملخص...',
    callNotFound: 'لم يتم العثور على المكالمة —',
    goBack: 'العودة',
    strong: 'قوي',
    onTrack: 'في المسار',
    atRisk: 'في خطر',
    balanced: 'متوازن',
    highTalk: 'تحدث عالي',
    toggleLang: '🇬🇧 EN'
  }
} as const;

type Lang = 'en' | 'ar';

export default function SummaryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [call, setCall] = useState<Call | null>(null)
  const [loading, setLoading] = useState(true)
  const [aiSummary, setAiSummary] = useState('')
  const [generatingSummary, setGeneratingSummary] = useState(false)

  // --- Follow-up Generator States ---
  const [followup, setFollowup] = useState<any>(null)
  const [generatingFollowup, setGeneratingFollowup] = useState(false)
  const [followupMode, setFollowupMode] = useState<'whatsapp' | 'email'>('whatsapp')
  const [copied, setCopied] = useState(false)

  // Step 1: State & RTL
  const [lang, setLang] = useState<Lang>('en')
  const isRTL = lang === 'ar'
  const tr = translations[lang]

  useEffect(() => {
    const fetchCall = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from('calls').select('*').eq('id', id).single()
      if (!error && data) {
        setCall(data)
        if (data.transcript) generateSummary(data)
      }
      setLoading(false)
    }
    fetchCall()
  }, [id])

  const generateSummary = async (callData: Call) => {
    if (!callData.transcript || callData.transcript.length < 20) return
    setGeneratingSummary(true)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: `Generate a detailed post-call coaching summary. Include what went well, areas to improve, and recommended follow-up. Transcript: ${callData.transcript}` }),
      })
      const data = await res.json()
      if (data.notes) setAiSummary(data.notes)
    } catch (err) { console.error(err) }
    setGeneratingSummary(false)
  }

  // --- Follow-up Generator Functions ---
  const generateFollowup = async () => {
    setGeneratingFollowup(true)
    try {
      const res = await fetch('/api/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ call }),
      })
      const data = await res.json()
      if (!data.error) setFollowup(data)
    } catch (err) { console.error(err) }
    setGeneratingFollowup(false)
  }

  const copyToClipboard = () => {
    const text = followupMode === 'whatsapp'
      ? followup.whatsapp
      : `Subject: ${followup.email.subject}\n\n${followup.email.body}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDuration = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`
  const formatDate = (d: string) => new Date(d).toLocaleDateString(isRTL ? 'ar-AE' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  const tagColors = [
    { color: '#ff453a', bg: 'rgba(255,69,58,0.12)', border: 'rgba(255,69,58,0.2)' },
    { color: '#ff9f0a', bg: 'rgba(255,159,10,0.12)', border: 'rgba(255,159,10,0.2)' },
    { color: '#0a84ff', bg: 'rgba(10,132,255,0.12)', border: 'rgba(10,132,255,0.2)' },
    { color: '#30d158', bg: 'rgba(48,209,88,0.12)', border: 'rgba(48,209,88,0.2)' },
  ]

  if (loading) return (
    <>
      <style>{`* { margin:0;padding:0;box-sizing:border-box; } body { background:var(--bg);color:var(--text-primary);font-family:-apple-system,sans-serif; } @keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'var(--text-secondary)', fontSize: 14 }}>
        <div style={{ width: 18, height: 18, border: '2px solid var(--card-border)', borderTopColor: 'var(--text-secondary)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
        {tr.loadingSummary}
      </div>
    </>
  )

  if (!call) return (
    <>
      <style>{`* { margin:0;padding:0;box-sizing:border-box; } body { background:var(--bg);color:var(--text-primary);font-family:-apple-system,sans-serif; }`}</style>
      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        {tr.callNotFound} <span onClick={() => window.location.href = '/history'} style={{ color: 'var(--text-primary)', cursor: 'pointer', margin: '0 6px' }}>{tr.goBack}</span>
      </div>
    </>
  )

  const ins = call.insights || {}

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: var(--bg); color: var(--text-primary); font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; -webkit-font-smoothing: antialiased; }
        .cs::-webkit-scrollbar { width: 4px; }
        .cs::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 10px; }
        textarea { font-family: inherit; }
        textarea:focus { outline: none; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      {/* Step 3: Add dir to root div */}
      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* Spatial mesh */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: '#00e5a0', filter: 'blur(160px)', opacity: 0.05 }} />
          <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: '#a855f7', filter: 'blur(160px)', opacity: 0.05 }} />
        </div>

        {/* Topbar */}
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'sticky', top: 0, zIndex: 50, background: 'var(--topbar-bg)', backdropFilter: 'blur(40px)', borderBottom: '1px solid var(--divider)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span onClick={() => window.location.href = '/'} style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.3px', color: 'var(--text-primary)', cursor: 'pointer' }}>DealFlow AI</span>
            <div style={{ width: 1, height: 16, background: 'var(--divider)' }} />
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{tr.postCallSummary}</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button 
              onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')} 
              style={{ height: 34, padding: '0 16px', borderRadius: 17, border: '1px solid var(--card-border)', background: isRTL ? 'rgba(10,132,255,0.15)' : 'transparent', color: isRTL ? '#0a84ff' : 'var(--text-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
            >
              {tr.toggleLang}
            </button>
            <button onClick={() => window.location.href = '/history'} style={{ height: 34, padding: '0 16px', borderRadius: 17, border: '1px solid var(--card-border)', background: 'var(--card-hover)', color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>{tr.history}</button>
            <button onClick={() => window.location.href = '/'} style={{ height: 34, padding: '0 16px', borderRadius: 17, border: '1px solid var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>{tr.newCall}</button>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px', position: 'relative', zIndex: 1 }}>

          {/* Hero header */}
          <div style={{ borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: '32px 36px', marginBottom: 20, position: 'relative', overflow: 'hidden', animation: 'fadeUp 0.4s ease' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--divider), transparent)' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 10 }}>{tr.postCallSummary}</div>
                <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.8px', color: 'var(--text-primary)', marginBottom: 6 }}>
                  {call.contact_name} <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>| {call.company}</span>
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{formatDate(call.created_at)}</div>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { label: tr.duration, value: formatDuration(call.duration), color: '#30d158' },
                  { label: tr.dealHealth, value: `${ins.dealHealthScore || 0}%`, color: '#ff9f0a' },
                  { label: tr.talkRatio, value: `${ins.talkRatio || 0}%`, color: '#0a84ff' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '14px 22px', borderRadius: 18, background: 'var(--input-bg)', border: '1px solid var(--card-border)' }}>
                    <div style={{ fontSize: 24, fontWeight: 600, color: s.color, letterSpacing: '-0.5px', marginBottom: 3 }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Score cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 20, animation: 'fadeUp 0.4s ease 0.1s both' }}>
            <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 18, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', [isRTL ? 'left' : 'right']: '-20px', width: 120, height: 120, borderRadius: '50%', background: '#ff9f0a', filter: 'blur(50px)', opacity: 0.1, pointerEvents: 'none' }} />
              <AppleRing value={ins.dealHealthScore || 0} color="#ff9f0a" size={80} stroke={8} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 6 }}>{tr.dealHealth}</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{(ins.dealHealthScore||0)>=80 ? tr.strong : (ins.dealHealthScore||0)>=60 ? tr.onTrack : tr.atRisk}</div>
                <div style={{ fontSize: 12, color: '#ff9f0a' }}>{tr.overallProgress}</div>
              </div>
            </div>
            <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 18, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', [isRTL ? 'left' : 'right']: '-20px', width: 120, height: 120, borderRadius: '50%', background: '#30d158', filter: 'blur(50px)', opacity: 0.08, pointerEvents: 'none' }} />
              <AppleRing value={ins.talkRatio || 0} color="#30d158" size={80} stroke={8} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 6 }}>{tr.talkRatio}</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{(ins.talkRatio||0)<=50 ? tr.balanced : tr.highTalk}</div>
                <div style={{ fontSize: 12, color: '#30d158' }}>{tr.agentSpeakingTime}</div>
              </div>
            </div>
            <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 18, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', [isRTL ? 'left' : 'right']: '-20px', width: 120, height: 120, borderRadius: '50%', background: '#0a84ff', filter: 'blur(50px)', opacity: 0.08, pointerEvents: 'none' }} />
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: ins.sentiment==='positive'?'rgba(48,209,88,0.1)':'rgba(255,159,10,0.1)', border: '2px solid ' + (ins.sentiment==='positive'?'#30d158':'#ff9f0a'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, flexShrink: 0 }}>
                {ins.sentiment==='positive'?'😊':ins.sentiment==='negative'?'😟':'😐'}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 6 }}>{tr.sentiment}</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2, textTransform: 'capitalize' }}>{ins.sentiment||'Neutral'}</div>
                <div style={{ fontSize: 12, color: ins.sentiment==='positive'?'#30d158':'#ff9f0a' }}>{tr.customerMood}</div>
              </div>
            </div>
          </div>

          {/* Main grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20, animation: 'fadeUp 0.4s ease 0.2s both' }}>
            {ins.nextActions && (
              <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16 }}>{tr.followUpActions}</div>
                {ins.nextActions.map((a: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < ins.nextActions.length-1 ? '1px solid var(--divider)' : 'none', alignItems: 'flex-start' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: '1.5px solid ' + (i===0?'#0a84ff':'var(--card-border)'), background: i===0?'rgba(10,132,255,0.12)':'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      {i===0 && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0a84ff' }} />}
                    </div>
                    <span style={{ fontSize: 13, color: i===0?'var(--text-primary)':'var(--text-tertiary)', fontWeight: i===0?500:400, lineHeight: 1.5 }}>{a}</span>
                  </div>
                ))}
              </div>
            )}
            {ins.objections && (
              <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20px', [isRTL ? 'left' : 'right']: '-20px', width: 120, height: 120, borderRadius: '50%', background: '#ff453a', filter: 'blur(50px)', opacity: 0.08, pointerEvents: 'none' }} />
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ff453a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  {tr.objectionsRaised}
                </div>
                {ins.objections.length===0
                  ? <div style={{ fontSize: 13, color: 'var(--text-dim)', fontStyle: 'italic' }}>{tr.noObjections}</div>
                  : ins.objections.map((o: string, i: number) => (
                    <div key={i} style={{ padding: '10px 14px', borderRadius: 14, background: 'rgba(255,69,58,0.06)', border: '1px solid rgba(255,69,58,0.12)', fontSize: 13, color: 'rgba(255,180,185,0.85)', marginBottom: 8, lineHeight: 1.5 }}>{o}</div>
                  ))
                }
              </div>
            )}
            {ins.customerNeeds && (
              <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16 }}>{tr.customerNeeds}</div>
                {ins.customerNeeds.map((n: string, i: number) => {
                  const colors = ['#ff9f0a','#0a84ff','#ff453a','#30d158']
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < ins.customerNeeds.length-1 ? '1px solid var(--divider)' : 'none' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors[i%colors.length], boxShadow: '0 0 8px ' + colors[i%colors.length], flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{n}</span>
                    </div>
                  )
                })}
              </div>
            )}
            {ins.hotTopics && (
              <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16 }}>{tr.topicsDiscussed}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ins.hotTopics.map((t: string, i: number) => {
                    const c = tagColors[i%tagColors.length]
                    return <span key={i} style={{ padding: '7px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: c.bg, color: c.color, border: '1px solid ' + c.border }}>{t}</span>
                  })}
                </div>
              </div>
            )}
          </div>

          {/* AI Summary */}
          <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 28, marginBottom: 16, animation: 'fadeUp 0.4s ease 0.3s both' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>{tr.aiCoachingSummary}</div>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--card-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✦</div>
            </div>
            {generatingSummary ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', fontSize: 13 }}>
                <div style={{ width: 14, height: 14, border: '2px solid var(--card-border)', borderTopColor: 'var(--text-secondary)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                {tr.generatingSummary}
              </div>
            ) : aiSummary ? (
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9 }}>{aiSummary}</div>
            ) : ins.notes ? (
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9 }}>{ins.notes}</div>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--text-dim)', fontStyle: 'italic' }}>{tr.noTranscriptForSummary}</div>
            )}
          </div>

          {/* Transcript */}
          {call.transcript && (
            <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 28, marginBottom: 16, animation: 'fadeUp 0.4s ease 0.4s both' }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16 }}>{tr.fullTranscript}</div>
              <div className="cs" style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, maxHeight: 260, overflowY: 'auto', whiteSpace: 'pre-wrap' }}>{call.transcript}</div>
            </div>
          )}

          {/* Notes */}
          {call.notes && (
            <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 28, marginBottom: 16, animation: 'fadeUp 0.4s ease 0.5s both' }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16 }}>{tr.yourNotes}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{call.notes}</div>
            </div>
          )}

          {/* Follow-up Generator */}
          <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 28, marginBottom: 16, animation: 'fadeUp 0.4s ease 0.6s both' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 6 }}>{tr.followUpGenerator}</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{tr.aiDraftedMessage}</div>
              </div>
              {!followup && (
                <button onClick={generateFollowup} disabled={generatingFollowup} style={{ height: 44, padding: '0 24px', borderRadius: 22, border: 'none', background: generatingFollowup ? 'var(--input-bg)' : 'var(--text-primary)', color: generatingFollowup ? 'var(--text-secondary)' : 'var(--bg)', fontSize: 14, fontWeight: 600, cursor: generatingFollowup ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {generatingFollowup && <div style={{ width: 14, height: 14, border: '2px solid var(--card-border)', borderTopColor: 'var(--bg)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
                  {generatingFollowup ? tr.generating : tr.generateFollowUp}
                </button>
              )}
            </div>
            {followup && (
              <>
                {/* Toggle */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                  {(['whatsapp', 'email'] as const).map(mode => (
                    <button key={mode} onClick={() => setFollowupMode(mode)} style={{ height: 36, padding: '0 18px', borderRadius: 18, border: '1px solid ' + (followupMode === mode ? 'var(--card-border)' : 'transparent'), background: followupMode === mode ? 'var(--input-bg)' : 'transparent', color: followupMode === mode ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: 13, fontWeight: followupMode === mode ? 600 : 400, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6 }}>
                      {mode === 'whatsapp' ? tr.whatsapp : tr.email}
                    </button>
                  ))}
                  <button onClick={() => { setFollowup(null); setFollowupMode('whatsapp') }} style={{ height: 36, padding: '0 14px', borderRadius: 18, border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--text-tertiary)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', [isRTL ? 'marginRight' : 'marginLeft']: 'auto' }}>
                    {tr.regenerate}
                  </button>
                </div>
                {/* Email subject */}
                {followupMode === 'email' && followup.email?.subject && (
                  <div style={{ padding: '10px 16px', borderRadius: 12, background: 'var(--input-bg)', border: '1px solid var(--card-border)', marginBottom: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', [isRTL ? 'marginLeft' : 'marginRight']: 8 }}>{tr.subject}</span>
                    {followup.email.subject}
                  </div>
                )}
                {/* Message body */}
                <div style={{ padding: '18px 20px', borderRadius: 18, background: followupMode === 'whatsapp' ? 'rgba(48,209,88,0.06)' : 'rgba(10,132,255,0.06)', border: '1px solid ' + (followupMode === 'whatsapp' ? 'rgba(48,209,88,0.15)' : 'rgba(10,132,255,0.15)'), fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.8, whiteSpace: 'pre-wrap', marginBottom: 16, fontFamily: 'inherit' }}>
                  {followupMode === 'whatsapp' ? followup.whatsapp : followup.email?.body}
                </div>
                {/* Actions */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={copyToClipboard} style={{ flex: 1, height: 44, borderRadius: 22, border: 'none', background: copied ? 'rgba(48,209,88,0.9)' : 'var(--text-primary)', color: copied ? '#000' : 'var(--bg)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.3s' }}>
                    {copied ? tr.copied : tr.copyToClipboard}
                  </button>
                  {followupMode === 'whatsapp' && (
                    <button onClick={() => window.open('https://wa.me/?text=' + encodeURIComponent(followup.whatsapp))} style={{ height: 44, padding: '0 20px', borderRadius: 22, border: '1px solid rgba(48,209,88,0.3)', background: 'rgba(48,209,88,0.1)', color: '#30d158', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                      {tr.openWhatsapp}
                    </button>
                  )}
                  {followupMode === 'email' && (
                    <button onClick={() => window.open('mailto:?subject=' + encodeURIComponent(followup.email?.subject || '') + '&body=' + encodeURIComponent(followup.email?.body || ''))} style={{ height: 44, padding: '0 20px', borderRadius: 22, border: '1px solid rgba(10,132,255,0.3)', background: 'rgba(10,132,255,0.1)', color: '#0a84ff', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                      {tr.openMail}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </>
  )
}