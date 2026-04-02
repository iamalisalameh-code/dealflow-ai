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

function Ring({ value, color, size = 72, stroke = 7 }: { value: number, color: string, size?: number, stroke?: number }) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (Math.min(value, 100) / 100) * circ
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: 14, fontWeight: 700 }}>
        {value}%
      </div>
    </div>
  )
}

export default function MobileSummary({ id }: { id: string }) {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [call, setCall] = useState<Call | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'signals' | 'objections' | 'transcript' | 'followup'>('overview')
  const [followupType, setFollowupType] = useState<'whatsapp' | 'email'>('whatsapp')
  const [generatingFollowup, setGeneratingFollowup] = useState(false)
  const [followupText, setFollowupText] = useState('')

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
    console.log('Loading call with id:', id) // ADD THIS
    const { data, error } = await supabase.from('calls').select('*').eq('id', id).single()
    console.log('Result:', data, error) // ADD THIS
    setCall(data)
  } catch (err) { console.error(err) }
  finally { setLoading(false) }
}

  const generateFollowup = async () => {
    if (!call) return
    setGeneratingFollowup(true)
    try {
      const res = await fetch('/api/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callId: id, type: followupType, lang })
      })
      const data = await res.json()
      setFollowupText(data.followup || data.message || '')
    } catch (err) { console.error(err) }
    finally { setGeneratingFollowup(false) }
  }

  const formatDuration = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`
  const formatDate = (d: string) => new Date(d).toLocaleDateString(isAr ? 'ar-AE' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  if (loading) return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 24, height: 24, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#0a84ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (!call) return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>{l('Call not found', 'المكالمة غير موجودة')}</div>
      <button onClick={() => window.location.href = '/history'} style={{ marginTop: 16, color: '#0a84ff', background: 'none', border: 'none', fontSize: 15, fontFamily: 'inherit', cursor: 'pointer' }}>{l('Back to History', 'العودة للسجل')}</button>
    </div>
  )

  const ins = call.insights || {}
  const dealHealth = ins.dealHealthScore || 0
  const coachingScore = ins.coachingScore || 0
  const talkRatio = ins.talkRatio || 0
  const energyLevel = ins.energyLevel || 0
  const buyingSignals = ins.buyingSignals || []
  const objections = ins.objections || []
  const nextActions = ins.nextActions || []
  const summary = ins.summary || ''

  const tabs = [
    { id: 'overview', label: l('Overview', 'نظرة عامة') },
    { id: 'signals', label: l('Signals', 'الإشارات') },
    { id: 'objections', label: l('Objections', 'الاعتراضات') },
    { id: 'transcript', label: l('Transcript', 'النص') },
    { id: 'followup', label: l('Follow Up', 'المتابعة') },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent; }
        body { font-family:${isAr ? "'Noto Sans Arabic'" : "'DM Sans'"}, -apple-system,sans-serif;background:#000;color:#fff;-webkit-font-smoothing:antialiased; }
        .tap-btn { transition:transform 0.15s; } .tap-btn:active { transform:scale(0.97); }
        @keyframes spin { to{transform:rotate(360deg)} }
        textarea::placeholder { color:rgba(255,255,255,0.3); }
      `}</style>

      {/* Header */}
      <div style={{ padding: '56px 20px 16px', background: 'rgba(255,255,255,0.02)', direction: isAr ? 'rtl' : 'ltr' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <button onClick={() => window.location.href = '/history'} className="tap-btn"
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#0a84ff', fontSize: 15, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">{isAr ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}</svg>
            {l('History', 'السجل')}
          </button>
          <button onClick={() => { const next = isAr ? 'en' : 'ar'; localStorage.setItem('lang', next); setLang(next) }}
            style={{ height: 28, padding: '0 10px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
            {isAr ? 'EN' : 'AR'}
          </button>
        </div>

        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{call.contact_name || l('Untitled Call', 'مكالمة غير معنونة')}</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{call.company} · {formatDate(call.created_at)} · {formatDuration(call.duration || 0)}</div>

        {/* Score rings */}
        <div style={{ display: 'flex', gap: 16, marginTop: 20, justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'center' }}>
            <Ring value={dealHealth} color={dealHealth >= 70 ? '#34c759' : dealHealth >= 40 ? '#ff9f0a' : '#ff453a'} />
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{l('Deal Health', 'صحة الصفقة')}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Ring value={coachingScore} color="#0a84ff" />
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{l('Coaching', 'التدريب')}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Ring value={talkRatio} color="#bf5af2" />
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{l('Talk Ratio', 'نسبة الحديث')}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Ring value={energyLevel} color="#ff9f0a" />
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{l('Energy', 'الطاقة')}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ overflowX: 'auto', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              style={{ height: 34, padding: '0 14px', borderRadius: 17, border: `1px solid ${activeTab === tab.id ? '#0a84ff' : 'rgba(255,255,255,0.1)'}`, background: activeTab === tab.id ? 'rgba(10,132,255,0.15)' : 'transparent', color: activeTab === tab.id ? '#0a84ff' : 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500, fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0, cursor: 'pointer' }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ padding: '16px 20px 48px', direction: isAr ? 'rtl' : 'ltr' }}>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {summary && (
              <div style={{ padding: '16px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 8, letterSpacing: '0.1em' }}>{l('AI SUMMARY', 'ملخص الذكاء الاصطناعي')}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{summary}</div>
              </div>
            )}
            {nextActions.length > 0 && (
              <div style={{ padding: '16px', borderRadius: 16, background: 'rgba(10,132,255,0.06)', border: '1px solid rgba(10,132,255,0.15)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#0a84ff', marginBottom: 10, letterSpacing: '0.1em' }}>{l('NEXT ACTIONS', 'الإجراءات التالية')}</div>
                {nextActions.map((action: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(10,132,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#0a84ff' }}>{i+1}</span>
                    </div>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{action}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SIGNALS */}
        {activeTab === 'signals' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {buyingSignals.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.3)', fontSize: 15 }}>{l('No buying signals detected', 'لم يتم اكتشاف إشارات شراء')}</div>
            ) : buyingSignals.map((signal: string, i: number) => (
              <div key={i} style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(48,209,88,0.06)', border: '1px solid rgba(48,209,88,0.15)', display: 'flex', gap: 10 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="3" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{signal}</span>
              </div>
            ))}
          </div>
        )}

        {/* OBJECTIONS */}
        {activeTab === 'objections' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {objections.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.3)', fontSize: 15 }}>{l('No objections recorded', 'لم يتم تسجيل اعتراضات')}</div>
            ) : objections.map((obj: any, i: number) => (
              <div key={i} style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(255,69,58,0.06)', border: '1px solid rgba(255,69,58,0.15)' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: obj.response ? 8 : 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff453a" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{obj.objection || obj}</span>
                </div>
                {obj.response && (
                  <div style={{ marginTop: 8, padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                    💡 {obj.response}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TRANSCRIPT */}
        {activeTab === 'transcript' && (
          <div>
            {!call.transcript ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.3)', fontSize: 15 }}>{l('No transcript available', 'لا يوجد نص متاح')}</div>
            ) : (
              <div style={{ padding: '16px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {call.transcript}
              </div>
            )}
          </div>
        )}

        {/* FOLLOW UP */}
        {activeTab === 'followup' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Type toggle */}
            <div style={{ display: 'flex', padding: 4, borderRadius: 16, background: 'rgba(255,255,255,0.06)', gap: 4 }}>
              {[{ id: 'whatsapp', label: 'WhatsApp', color: '#25D366' }, { id: 'email', label: l('Email', 'بريد'), color: '#0a84ff' }].map(type => (
                <button key={type.id} onClick={() => setFollowupType(type.id as any)}
style={{ flex: 1, height: 38, borderRadius: 12, background: followupType === type.id ? type.color + '20' : 'transparent', color: followupType === type.id ? type.color : 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', border: followupType === type.id ? `1px solid ${type.color}40` : '1px solid transparent' } as React.CSSProperties}>                  {type.label}
                </button>
              ))}
            </div>

            {/* Generate button */}
            {!followupText && (
              <button onClick={generateFollowup} disabled={generatingFollowup} className="tap-btn"
                style={{ height: 52, borderRadius: 26, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
                {generatingFollowup ? (
                  <><div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />{l('Generating...', 'جاري التوليد...')}</>
                ) : (
                  <>{l('Generate', 'توليد')} {followupType === 'whatsapp' ? 'WhatsApp' : l('Email', 'بريد')} {l('Follow Up', 'متابعة')} ✦</>
                )}
              </button>
            )}

            {/* Generated text */}
            {followupText && (
              <>
                <textarea value={followupText} onChange={e => setFollowupText(e.target.value)}
                  style={{ width: '100%', minHeight: 180, padding: '14px 16px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'none', lineHeight: 1.6 }} />
                <div style={{ display: 'flex', gap: 10 }}>
                  {followupType === 'whatsapp' ? (
                    <button className="tap-btn" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(followupText)}`, '_blank')}
                      style={{ flex: 1, height: 48, borderRadius: 24, border: 'none', background: '#25D366', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
                      {l('Open in WhatsApp', 'فتح في واتساب')}
                    </button>
                  ) : (
                    <button className="tap-btn" onClick={() => window.open(`mailto:?body=${encodeURIComponent(followupText)}`, '_blank')}
                      style={{ flex: 1, height: 48, borderRadius: 24, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
                      {l('Open in Email', 'فتح في البريد')}
                    </button>
                  )}
                  <button className="tap-btn" onClick={() => { setFollowupText(''); }}
                    style={{ height: 48, padding: '0 16px', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 14, fontFamily: 'inherit', cursor: 'pointer' }}>
                    {l('Redo', 'إعادة')}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}