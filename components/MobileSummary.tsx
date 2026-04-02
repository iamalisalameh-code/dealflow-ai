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

function AppleRing({ value, color, size = 72, stroke = 7 }: { value: number, color: string, size?: number, stroke?: number }) {
  const safe = Math.min(Math.max(value || 0, 0), 100)
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (safe / 100) * circ
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: 13, fontWeight: 700 }}>
        {safe}%
      </div>
    </div>
  )
}

export default function MobileSummary({ id }: { id: string }) {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [call, setCall] = useState<Call | null>(null)
  const [loading, setLoading] = useState(true)
  const [aiSummary, setAiSummary] = useState('')
  const [generatingSummary, setGeneratingSummary] = useState(false)
  const [followup, setFollowup] = useState<any>(null)
  const [generatingFollowup, setGeneratingFollowup] = useState(false)
  const [followupMode, setFollowupMode] = useState<'whatsapp' | 'email'>('whatsapp')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'en' | 'ar'
    if (saved) setLang(saved)
    loadCall()
  }, [])

  const isAr = lang === 'ar'
  const l = (en: string, ar: string) => isAr ? ar : en

  const loadCall = async () => {
    try {
      const supabase = createClient()
      const { data } = await supabase.from('calls').select('*').eq('id', id).single()
      if (data) {
        setCall(data)
        if (data.transcript) generateSummary(data)
      }
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

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
    const text = followupMode === 'whatsapp' ? followup.whatsapp : `Subject: ${followup.email?.subject}\n\n${followup.email?.body}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDuration = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`
  const formatDate = (d: string) => new Date(d).toLocaleDateString(isAr ? 'ar-AE' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const card = (children: React.ReactNode, glow?: string) => (
    <div style={{ borderRadius: 24, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', marginBottom: 12, position: 'relative', overflow: 'hidden' }}>
      {glow && <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: 100, height: 100, borderRadius: '50%', background: glow, filter: 'blur(40px)', opacity: 0.12, pointerEvents: 'none' }} />}
      {children}
    </div>
  )

  const sectionLabel = (text: string) => (
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 12 }}>{text}</div>
  )

  if (loading) return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: 24, height: 24, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#0a84ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
    </div>
  )

  if (!call) return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>{l('Call not found', 'المكالمة غير موجودة')}</div>
      <button onClick={() => window.location.href = '/history'} style={{ color: '#0a84ff', background: 'none', border: 'none', fontSize: 15, fontFamily: 'inherit', cursor: 'pointer' }}>{l('Go back', 'رجوع')}</button>
    </div>
  )

  const ins = call.insights || {}
  const coachingBreakdown = [
    { label: l('Opening', 'البداية'), value: ins.coachingBreakdown?.opening || 0, color: '#0a84ff' },
    { label: l('Objection Handling', 'التعامل مع الاعتراضات'), value: ins.coachingBreakdown?.objectionHandling || 0, color: '#ff9f0a' },
    { label: l('Active Listening', 'الاستماع الفعّال'), value: ins.coachingBreakdown?.activeListening || 0, color: '#bf5af2' },
    { label: l('Closing Momentum', 'زخم الإغلاق'), value: ins.coachingBreakdown?.closingMomentum || 0, color: '#34c759' },
  ]
  const energyColors: Record<string, string> = { confident: '#34c759', steady: '#0a84ff', low: '#ff9f0a', fast: '#ff453a' }
  const energyColor = energyColors[ins.energyLevel] || '#0a84ff'
  const energyPct = ins.energyLevel === 'confident' ? 90 : ins.energyLevel === 'steady' ? 65 : ins.energyLevel === 'low' ? 35 : 80

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent; }
        body { font-family:${isAr ? "'Noto Sans Arabic'" : "'DM Sans'"}, -apple-system,sans-serif;background:#000;color:#fff;-webkit-font-smoothing:antialiased; }
        .tap-btn { transition:transform 0.15s; } .tap-btn:active { transform:scale(0.97); }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        textarea { font-family:inherit; resize:none; outline:none; }
      `}</style>

      <div style={{ direction: isAr ? 'rtl' : 'ltr' }}>

        {/* Header */}
        <div style={{ padding: '52px 20px 16px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <button onClick={() => window.location.href = '/history'} className="tap-btn"
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#0a84ff', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">{isAr ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}</svg>
              {l('History', 'السجل')}
            </button>
            <button onClick={() => { const next = isAr ? 'en' : 'ar'; localStorage.setItem('lang', next); setLang(next) }}
              style={{ height: 28, padding: '0 10px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
              {isAr ? 'EN' : 'AR'}
            </button>
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>{l('Post-Call Summary', 'ملخص ما بعد المكالمة')}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4, letterSpacing: '-0.5px' }}>{call.contact_name} {call.company && <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>· {call.company}</span>}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{formatDate(call.created_at)}</div>

          {/* Quick stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 16 }}>
            {[
              { label: l('Duration', 'المدة'), value: formatDuration(call.duration || 0), color: '#34c759' },
              { label: l('Deal Health', 'صحة الصفقة'), value: `${ins.dealHealthScore || 0}%`, color: '#ff9f0a' },
              { label: l('Talk Ratio', 'نسبة الحديث'), value: `${ins.talkRatio || 0}%`, color: '#0a84ff' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '12px 8px', borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: s.color, letterSpacing: '-0.5px', marginBottom: 3 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 20px 48px' }}>

          {/* Score rings — Deal Health + Talk Ratio + Sentiment */}
          {card(<>
            {sectionLabel(l('Performance Overview', 'نظرة عامة على الأداء'))}
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div style={{ textAlign: 'center' }}>
                <AppleRing value={ins.dealHealthScore || 0} color="#ff9f0a" />
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{l('Deal Health', 'صحة الصفقة')}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: (ins.dealHealthScore||0) >= 80 ? '#34c759' : (ins.dealHealthScore||0) >= 60 ? '#ff9f0a' : '#ff453a', marginTop: 2 }}>
                  {(ins.dealHealthScore||0) >= 80 ? l('Strong', 'قوي') : (ins.dealHealthScore||0) >= 60 ? l('On Track', 'في المسار') : l('At Risk', 'في خطر')}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <AppleRing value={ins.talkRatio || 0} color="#34c759" />
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{l('Talk Ratio', 'نسبة الحديث')}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: (ins.talkRatio||0) <= 50 ? '#34c759' : '#ff9f0a', marginTop: 2 }}>
                  {(ins.talkRatio||0) <= 50 ? l('Balanced', 'متوازن') : l('High Talk', 'تحدث كثير')}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: ins.sentiment === 'positive' ? 'rgba(52,199,89,0.1)' : 'rgba(255,159,10,0.1)', border: `2px solid ${ins.sentiment === 'positive' ? '#34c759' : '#ff9f0a'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: 28 }}>
                  {ins.sentiment === 'positive' ? '😊' : ins.sentiment === 'negative' ? '😟' : '😐'}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{l('Sentiment', 'المشاعر')}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: ins.sentiment === 'positive' ? '#34c759' : '#ff9f0a', marginTop: 2, textTransform: 'capitalize' }}>{ins.sentiment || 'Neutral'}</div>
              </div>
            </div>
          </>, '#ff9f0a')}

          {/* Coaching Score */}
          {card(<>
            {sectionLabel(l('Coaching Score', 'درجة التدريب'))}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: (ins.coachingScore||0) >= 80 ? '#34c759' : (ins.coachingScore||0) >= 60 ? '#ff9f0a' : '#ff453a', letterSpacing: '-2px', lineHeight: 1 }}>{ins.coachingScore || 0}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>/100</div>
            </div>
            {coachingBreakdown.map((item, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{item.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: item.color }}>{item.value}/10</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 2, background: item.color, width: `${(item.value / 10) * 100}%`, transition: 'width 0.8s ease' }} />
                </div>
              </div>
            ))}
          </>, '#bf5af2')}

          {/* Buying Signals */}
          {card(<>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              {sectionLabel(l('Buying Signals', 'إشارات الشراء'))}
              {ins.buyingSignals?.length > 0 && <span style={{ fontSize: 20, fontWeight: 800, color: '#34c759', marginTop: -12 }}>{ins.buyingSignals.length}</span>}
            </div>
            {!ins.buyingSignals?.length ? (
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>{l('No buying signals detected', 'لم يتم اكتشاف إشارات شراء')}</div>
            ) : ins.buyingSignals.map((signal: string, i: number) => (
              <div key={i} style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(52,199,89,0.08)', border: '1px solid rgba(52,199,89,0.2)', fontSize: 13, color: '#fff', display: 'flex', gap: 8, marginBottom: 8 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="3" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                <span style={{ lineHeight: 1.5 }}>{signal}</span>
              </div>
            ))}
          </>, '#34c759')}

          {/* Agent Energy */}
          {card(<>
            {sectionLabel(l('Agent Energy', 'طاقة الوكيل'))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: energyColor + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                {ins.energyLevel === 'confident' ? '⚡' : ins.energyLevel === 'low' ? '⚠️' : ins.energyLevel === 'fast' ? '🔴' : '📊'}
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: energyColor, textTransform: 'capitalize', letterSpacing: '-0.5px' }}>{ins.energyLevel || 'Steady'}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{l('Agent speaking energy', 'طاقة حديث الوكيل')}</div>
              </div>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 4, background: `linear-gradient(90deg, ${energyColor}80, ${energyColor})`, width: `${energyPct}%`, transition: 'width 1s ease' }} />
            </div>
          </>, energyColor)}

          {/* Objections */}
          {ins.objections?.length > 0 && card(<>
            {sectionLabel(l('Objections', 'الاعتراضات'))}
            {ins.objections.map((obj: any, i: number) => (
              <div key={i} style={{ padding: '12px', borderRadius: 14, background: 'rgba(255,69,58,0.06)', border: '1px solid rgba(255,69,58,0.15)', marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: obj.response ? 8 : 0 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff453a" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{obj.objection || obj}</span>
                </div>
                {obj.response && <div style={{ padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>💡 {obj.response}</div>}
              </div>
            ))}
          </>, '#ff453a')}

          {/* Next Actions */}
          {ins.nextActions?.length > 0 && card(<>
            {sectionLabel(l('Next Actions', 'الإجراءات التالية'))}
            {ins.nextActions.map((action: string, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(10,132,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#0a84ff' }}>{i+1}</span>
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{action}</span>
              </div>
            ))}
          </>, '#0a84ff')}

          {/* AI Summary */}
          {card(<>
            {sectionLabel(l('AI Coaching Summary', 'ملخص تدريب الذكاء الاصطناعي'))}
            {generatingSummary ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#0a84ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                {l('Generating summary...', 'جاري توليد الملخص...')}
              </div>
            ) : aiSummary ? (
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{aiSummary}</div>
            ) : (
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>{l('No summary available', 'لا يوجد ملخص متاح')}</div>
            )}
          </>)}

          {/* Transcript */}
          {call.transcript && card(<>
            {sectionLabel(l('Transcript', 'النص الكامل'))}
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, whiteSpace: 'pre-wrap', maxHeight: 200, overflow: 'hidden', position: 'relative' }}>
              {call.transcript}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }} />
            </div>
          </>)}

          {/* Follow Up */}
          {card(<>
            {sectionLabel(l('Follow Up', 'رسالة المتابعة'))}
            {!followup ? (
              <button onClick={generateFollowup} disabled={generatingFollowup} className="tap-btn"
                style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
                {generatingFollowup ? (
                  <><div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />{l('Generating...', 'جاري التوليد...')}</>
                ) : <>{l('Generate Follow Up', 'توليد رسالة متابعة')} ✦</>}
              </button>
            ) : (
              <>
                {/* Mode toggle */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  {[{ id: 'whatsapp', label: 'WhatsApp', color: '#25D366' }, { id: 'email', label: l('Email', 'بريد'), color: '#0a84ff' }].map(m => (
                    <button key={m.id} onClick={() => setFollowupMode(m.id as any)}
                      style={{ flex: 1, height: 38, borderRadius: 12, border: `1px solid ${followupMode === m.id ? m.color + '60' : 'rgba(255,255,255,0.1)'}`, background: followupMode === m.id ? m.color + '15' : 'transparent', color: followupMode === m.id ? m.color : 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
                      {m.label}
                    </button>
                  ))}
                </div>
                {/* Content */}
                <textarea value={followupMode === 'whatsapp' ? followup.whatsapp : `${followup.email?.subject ? `Subject: ${followup.email.subject}\n\n` : ''}${followup.email?.body || ''}`}
                  onChange={() => {}}
                  style={{ width: '100%', minHeight: 140, padding: '12px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 1.6, marginBottom: 10 }} />
                <div style={{ display: 'flex', gap: 8 }}>
                  {followupMode === 'whatsapp' ? (
                    <button className="tap-btn" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(followup.whatsapp)}`, '_blank')}
                      style={{ flex: 1, height: 48, borderRadius: 24, border: 'none', background: '#25D366', color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
                      {l('Open WhatsApp', 'فتح واتساب')}
                    </button>
                  ) : (
                    <button className="tap-btn" onClick={() => window.open(`mailto:?subject=${encodeURIComponent(followup.email?.subject||'')}&body=${encodeURIComponent(followup.email?.body||'')}`, '_blank')}
                      style={{ flex: 1, height: 48, borderRadius: 24, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
                      {l('Open Email', 'فتح البريد')}
                    </button>
                  )}
                  <button className="tap-btn" onClick={copyToClipboard}
                    style={{ height: 48, padding: '0 16px', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', background: copied ? 'rgba(52,199,89,0.15)' : 'transparent', color: copied ? '#34c759' : 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer' }}>
                    {copied ? '✓' : l('Copy', 'نسخ')}
                  </button>
                </div>
              </>
            )}
          </>)}
        </div>
      </div>
    </>
  )
}