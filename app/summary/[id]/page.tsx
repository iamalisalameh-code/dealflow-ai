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

function GaugeCircle({ value, color, size = 80, stroke = 7 }: { value: number, color: string, size?: number, stroke?: number }) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: 16, fontWeight: 700 }}>
        {value}%
      </div>
    </div>
  )
}

export default function SummaryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [call, setCall] = useState<Call | null>(null)
  const [loading, setLoading] = useState(true)
  const [generatingSummary, setGeneratingSummary] = useState(false)
  const [aiSummary, setAiSummary] = useState('')

  const card: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 20,
  }

  useEffect(() => {
    const fetchCall = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('calls')
        .select('*')
        .eq('id', id)
        .single()
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
        body: JSON.stringify({
          transcript: `Generate a detailed post-call coaching summary. Include what went well, areas to improve, key decisions made, and recommended follow-up actions. Transcript: ${callData.transcript}`
        }),
      })
      const data = await res.json()
      if (data.notes) setAiSummary(data.notes)
    } catch (err) {
      console.error('Summary error:', err)
    }
    setGeneratingSummary(false)
  }

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  if (loading) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0f0f18; color: #fff; font-family: 'DM Sans', sans-serif; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <div style={{ minHeight: '100vh', background: '#0f0f18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#00e5a0', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 16px' }} />
          Loading summary...
        </div>
      </div>
    </>
  )

  if (!call) return (
    <>
      <style>{`* { margin: 0; padding: 0; box-sizing: border-box; } body { background: #0f0f18; color: #fff; font-family: sans-serif; }`}</style>
      <div style={{ minHeight: '100vh', background: '#0f0f18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)' }}>
        Call not found — <span onClick={() => window.location.href = '/history'} style={{ color: '#00e5a0', cursor: 'pointer', marginLeft: 6 }}>Go back</span>
      </div>
    </>
  )

  const insights = call.insights || {}

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0f0f18; color: #fff; font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes gradshift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0f0f18' }}>

        {/* Ambient glows */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'fixed', bottom: 0, right: 0, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Topbar */}
        <div style={{ height: 60, background: 'rgba(15,15,24,0.9)', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div onClick={() => window.location.href = '/'} style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 17, background: 'linear-gradient(90deg,#00e5a0,#4488ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer' }}>DealFlow AI</div>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Post-Call Summary</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => window.location.href = '/history'} style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
              ← History
            </button>
            <button onClick={() => window.location.href = '/'} style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(0,229,160,0.3)', background: 'rgba(0,229,160,0.08)', color: '#00e5a0', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
              + New Call
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px', position: 'relative', zIndex: 1 }}>

          {/* Header card */}
          <div style={{ ...card, marginBottom: 24, padding: '28px 32px', background: 'linear-gradient(135deg, rgba(0,229,160,0.06), rgba(68,136,255,0.06))', borderColor: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden', animation: 'fadeIn 0.4s ease' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #00e5a0, #4488ff, transparent)', backgroundSize: '200% 100%', animation: 'gradshift 3s ease infinite' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>POST-CALL SUMMARY</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
                  {call.contact_name} <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>| {call.company}</span>
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>{formatDate(call.created_at)}</div>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { label: 'Duration', value: formatDuration(call.duration), color: '#00e5a0' },
                  { label: 'Deal Health', value: `${insights.dealHealthScore || 0}%`, color: '#ffb020' },
                  { label: 'Talk Ratio', value: `${insights.talkRatio || 0}%`, color: '#4488ff' },
                ].map((stat, i) => (
                  <div key={i} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 20px' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Score cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24, animation: 'fadeIn 0.4s ease 0.1s both' }}>
            <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 16 }}>
              <GaugeCircle value={insights.dealHealthScore || 0} color="#ffb020" size={80} stroke={7} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>DEAL HEALTH</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, color: '#ffb020' }}>
                  {(insights.dealHealthScore || 0) >= 80 ? 'Strong' : (insights.dealHealthScore || 0) >= 60 ? 'On Track' : 'At Risk'}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Overall deal progress</div>
              </div>
            </div>
            <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 16 }}>
              <GaugeCircle value={insights.talkRatio || 0} color="#00e5a0" size={80} stroke={7} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>TALK RATIO</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, color: '#00e5a0' }}>
                  {(insights.talkRatio || 0) <= 50 ? 'Balanced' : 'Too Much'}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Agent speaking time</div>
              </div>
            </div>
            <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: insights.sentiment === 'positive' ? 'rgba(0,229,160,0.1)' : 'rgba(255,176,32,0.1)', border: `3px solid ${insights.sentiment === 'positive' ? '#00e5a0' : '#ffb020'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, flexShrink: 0 }}>
                {insights.sentiment === 'positive' ? '😊' : insights.sentiment === 'negative' ? '😟' : '😐'}
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>SENTIMENT</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, color: insights.sentiment === 'positive' ? '#00e5a0' : '#ffb020', textTransform: 'capitalize' }}>
                  {insights.sentiment || 'Neutral'}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Customer sentiment</div>
              </div>
            </div>
          </div>

          {/* Main grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24, animation: 'fadeIn 0.4s ease 0.2s both' }}>
            {insights.nextActions && (
              <div style={card}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>FOLLOW-UP ACTIONS</div>
                {insights.nextActions.map((a: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 12px', borderRadius: 10, border: `1px solid ${i === 0 ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}`, background: i === 0 ? 'rgba(0,229,160,0.08)' : 'rgba(255,255,255,0.03)', color: i === 0 ? '#00e5a0' : 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 8 }}>
                    <span>{i === 0 ? '⚡' : `${i + 1}.`}</span><span>{a}</span>
                  </div>
                ))}
              </div>
            )}

            {insights.objections && (
              <div style={card}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#ff4757', marginBottom: 14 }}>OBJECTIONS RAISED</div>
                {insights.objections.length === 0
                  ? <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>No objections detected</div>
                  : insights.objections.map((o: string, i: number) => (
                    <div key={i} style={{ background: 'rgba(255,71,87,0.08)', borderLeft: '2px solid #ff4757', borderRadius: '0 8px 8px 0', padding: '10px 14px', fontSize: 13, color: 'rgba(255,180,185,0.9)', marginBottom: 8 }}>{o}</div>
                  ))
                }
              </div>
            )}

            {insights.customerNeeds && (
              <div style={card}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>CUSTOMER NEEDS</div>
                {insights.customerNeeds.map((n: string, i: number) => {
                  const colors = ['#ffb020', '#4488ff', '#ff2d78', '#00e5a0']
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors[i % colors.length], boxShadow: `0 0 8px ${colors[i % colors.length]}`, flexShrink: 0 }} />
                      {n}
                    </div>
                  )
                })}
              </div>
            )}

            {insights.hotTopics && (
              <div style={card}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>TOPICS DISCUSSED</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {insights.hotTopics.map((t: string, i: number) => {
                    const colors = [
                      { color: '#ff2d78', bg: 'rgba(255,45,120,0.12)', border: 'rgba(255,45,120,0.25)' },
                      { color: '#ffb020', bg: 'rgba(255,176,32,0.12)', border: 'rgba(255,176,32,0.25)' },
                      { color: '#4488ff', bg: 'rgba(68,136,255,0.12)', border: 'rgba(68,136,255,0.25)' },
                      { color: '#00e5a0', bg: 'rgba(0,229,160,0.12)', border: 'rgba(0,229,160,0.25)' },
                    ]
                    const c = colors[i % colors.length]
                    return <span key={i} style={{ padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{t}</span>
                  })}
                </div>
              </div>
            )}
          </div>

          {/* AI Coaching Summary */}
          <div style={{ ...card, marginBottom: 16, animation: 'fadeIn 0.4s ease 0.3s both' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>AI COACHING SUMMARY</div>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#a855f7,#4488ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✦</div>
            </div>
            {generatingSummary ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#a855f7', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                AI is generating your coaching summary...
              </div>
            ) : aiSummary ? (
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>{aiSummary}</div>
            ) : insights.notes ? (
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>{insights.notes}</div>
            ) : (
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>No transcript available for AI summary</div>
            )}
          </div>

          {/* Full Transcript */}
          {call.transcript && (
            <div style={{ ...card, marginBottom: 16, animation: 'fadeIn 0.4s ease 0.4s both' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>FULL TRANSCRIPT</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, maxHeight: 300, overflowY: 'auto', whiteSpace: 'pre-wrap' }}>{call.transcript}</div>
            </div>
          )}

          {/* Notes */}
          {call.notes && (
            <div style={{ ...card, animation: 'fadeIn 0.4s ease 0.5s both' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>YOUR NOTES</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>{call.notes}</div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}