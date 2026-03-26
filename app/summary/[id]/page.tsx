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

export default function SummaryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [call, setCall] = useState<Call | null>(null)
  const [loading, setLoading] = useState(true)
  const [aiSummary, setAiSummary] = useState('')
  const [generatingSummary, setGeneratingSummary] = useState(false)

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

  const formatDuration = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  const tagColors = [
    { color: '#ff453a', bg: 'rgba(255,69,58,0.12)', border: 'rgba(255,69,58,0.2)' },
    { color: '#ff9f0a', bg: 'rgba(255,159,10,0.12)', border: 'rgba(255,159,10,0.2)' },
    { color: '#0a84ff', bg: 'rgba(10,132,255,0.12)', border: 'rgba(10,132,255,0.2)' },
    { color: '#30d158', bg: 'rgba(48,209,88,0.12)', border: 'rgba(48,209,88,0.2)' },
  ]

  if (loading) return (
    <>
      <style>{`* { margin:0;padding:0;box-sizing:border-box; } body { background:#000;color:#fff;font-family:-apple-system,sans-serif; } @keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
        <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'rgba(255,255,255,0.6)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
        Loading summary...
      </div>
    </>
  )

  if (!call) return (
    <>
      <style>{`* { margin:0;padding:0;box-sizing:border-box; } body { background:#000;color:#fff;font-family:-apple-system,sans-serif; }`}</style>
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)' }}>
        Call not found — <span onClick={() => window.location.href = '/history'} style={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer', marginLeft: 6 }}>Go back</span>
      </div>
    </>
  )

  const ins = call.insights || {}

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #000; color: #fff; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; -webkit-font-smoothing: antialiased; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        textarea { font-family: inherit; }
        textarea:focus { outline: none; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes gradshift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#000' }}>

        {/* Spatial mesh */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: '#00e5a0', filter: 'blur(160px)', opacity: 0.05, mixBlendMode: 'screen' }} />
          <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: '#a855f7', filter: 'blur(160px)', opacity: 0.05, mixBlendMode: 'screen' }} />
        </div>

        {/* Topbar */}
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(40px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span onClick={() => window.location.href = '/'} style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.3px', color: 'rgba(255,255,255,0.9)', cursor: 'pointer' }}>DealFlow AI</span>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Post-Call Summary</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => window.location.href = '/history'} style={{ height: 34, padding: '0 16px', borderRadius: 17, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>← History</button>
            <button onClick={() => window.location.href = '/'} style={{ height: 34, padding: '0 16px', borderRadius: 17, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>+ New Call</button>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px', position: 'relative', zIndex: 1 }}>

          {/* Hero header */}
          <div style={{ borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(40px)', padding: '32px 36px', marginBottom: 20, position: 'relative', overflow: 'hidden', animation: 'fadeUp 0.4s ease' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>Post-Call Summary</div>
                <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.8px', color: 'rgba(255,255,255,0.92)', marginBottom: 6 }}>
                  {call.contact_name} <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>| {call.company}</span>
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>{formatDate(call.created_at)}</div>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { label: 'Duration', value: formatDuration(call.duration), color: '#30d158' },
                  { label: 'Deal Health', value: `${ins.dealHealthScore || 0}%`, color: '#ff9f0a' },
                  { label: 'Talk Ratio', value: `${ins.talkRatio || 0}%`, color: '#0a84ff' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '14px 22px', borderRadius: 18, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ fontSize: 24, fontWeight: 600, color: s.color, letterSpacing: '-0.5px', marginBottom: 3 }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Score cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 20, animation: 'fadeUp 0.4s ease 0.1s both' }}>
            <div style={{ borderRadius: 28, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 18, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: 120, height: 120, borderRadius: '50%', background: '#ff9f0a', filter: 'blur(50px)', opacity: 0.1, pointerEvents: 'none' }} />
              <AppleRing value={ins.dealHealthScore || 0} color="#ff9f0a" size={80} stroke={8} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>Deal Health</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 2 }}>{(ins.dealHealthScore||0)>=80?'Strong':(ins.dealHealthScore||0)>=60?'On Track':'At Risk'}</div>
                <div style={{ fontSize: 12, color: '#ff9f0a' }}>Overall progress</div>
              </div>
            </div>
            <div style={{ borderRadius: 28, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 18, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: 120, height: 120, borderRadius: '50%', background: '#30d158', filter: 'blur(50px)', opacity: 0.08, pointerEvents: 'none' }} />
              <AppleRing value={ins.talkRatio || 0} color="#30d158" size={80} stroke={8} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>Talk Ratio</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 2 }}>{(ins.talkRatio||0)<=50?'Balanced':'High Talk'}</div>
                <div style={{ fontSize: 12, color: '#30d158' }}>Agent speaking time</div>
              </div>
            </div>
            <div style={{ borderRadius: 28, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 18, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: 120, height: 120, borderRadius: '50%', background: '#0a84ff', filter: 'blur(50px)', opacity: 0.08, pointerEvents: 'none' }} />
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: ins.sentiment==='positive'?'rgba(48,209,88,0.1)':'rgba(255,159,10,0.1)', border: `2px solid ${ins.sentiment==='positive'?'#30d158':'#ff9f0a'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, flexShrink: 0 }}>
                {ins.sentiment==='positive'?'😊':ins.sentiment==='negative'?'😟':'😐'}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>Sentiment</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 2, textTransform: 'capitalize' }}>{ins.sentiment||'Neutral'}</div>
                <div style={{ fontSize: 12, color: ins.sentiment==='positive'?'#30d158':'#ff9f0a' }}>Customer mood</div>
              </div>
            </div>
          </div>

          {/* Main grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20, animation: 'fadeUp 0.4s ease 0.2s both' }}>
            {ins.nextActions && (
              <div style={{ borderRadius: 28, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Follow-up Actions</div>
                {ins.nextActions.map((a: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i<ins.nextActions.length-1?'1px solid rgba(255,255,255,0.04)':'none', alignItems: 'flex-start' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: `1.5px solid ${i===0?'#0a84ff':'rgba(255,255,255,0.15)'}`, background: i===0?'rgba(10,132,255,0.12)':'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      {i===0 && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0a84ff' }} />}
                    </div>
                    <span style={{ fontSize: 13, color: i===0?'rgba(255,255,255,0.85)':'rgba(255,255,255,0.45)', fontWeight: i===0?500:400, lineHeight: 1.5 }}>{a}</span>
                  </div>
                ))}
              </div>
            )}
            {ins.objections && (
              <div style={{ borderRadius: 28, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: 120, height: 120, borderRadius: '50%', background: '#ff453a', filter: 'blur(50px)', opacity: 0.08, pointerEvents: 'none' }} />
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ff453a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  Objections Raised
                </div>
                {ins.objections.length===0
                  ? <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>No objections detected</div>
                  : ins.objections.map((o: string, i: number) => (
                    <div key={i} style={{ padding: '10px 14px', borderRadius: 14, background: 'rgba(255,69,58,0.06)', border: '1px solid rgba(255,69,58,0.12)', fontSize: 13, color: 'rgba(255,180,185,0.85)', marginBottom: 8, lineHeight: 1.5 }}>{o}</div>
                  ))
                }
              </div>
            )}
            {ins.customerNeeds && (
              <div style={{ borderRadius: 28, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Customer Needs</div>
                {ins.customerNeeds.map((n: string, i: number) => {
                  const colors = ['#ff9f0a','#0a84ff','#ff453a','#30d158']
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i<ins.customerNeeds.length-1?'1px solid rgba(255,255,255,0.04)':'none' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors[i%colors.length], boxShadow: `0 0 8px ${colors[i%colors.length]}`, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{n}</span>
                    </div>
                  )
                })}
              </div>
            )}
            {ins.hotTopics && (
              <div style={{ borderRadius: 28, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Topics Discussed</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ins.hotTopics.map((t: string, i: number) => {
                    const c = tagColors[i%tagColors.length]
                    return <span key={i} style={{ padding: '7px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{t}</span>
                  })}
                </div>
              </div>
            )}
          </div>

          {/* AI Summary */}
          <div style={{ borderRadius: 28, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 28, marginBottom: 16, animation: 'fadeUp 0.4s ease 0.3s both' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>AI Coaching Summary</div>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✦</div>
            </div>
            {generatingSummary ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'rgba(255,255,255,0.6)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                Generating your personalized coaching summary...
              </div>
            ) : aiSummary ? (
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.9 }}>{aiSummary}</div>
            ) : ins.notes ? (
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.9 }}>{ins.notes}</div>
            ) : (
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>No transcript available for AI summary</div>
            )}
          </div>

          {/* Transcript */}
          {call.transcript && (
            <div style={{ borderRadius: 28, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 28, marginBottom: 16, animation: 'fadeUp 0.4s ease 0.4s both' }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Full Transcript</div>
              <div className="custom-scrollbar" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, maxHeight: 260, overflowY: 'auto', whiteSpace: 'pre-wrap' }}>{call.transcript}</div>
            </div>
          )}

          {/* Notes */}
          {call.notes && (
            <div style={{ borderRadius: 28, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 28, animation: 'fadeUp 0.4s ease 0.5s both' }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Your Notes</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>{call.notes}</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}