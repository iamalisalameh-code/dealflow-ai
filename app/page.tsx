'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

const sentimentData = [30,45,40,60,55,80,70,85,75,90,80,88,70,65,78,82,90,85,88,92]

function GaugeCircle({ value, color, size = 68, stroke = 6 }: { value: number, color: string, size?: number, stroke?: number }) {
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
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: size < 60 ? 12 : 14, fontWeight: 700 }}>
        {value}%
      </div>
    </div>
  )
}

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
  padding: 20,
}

interface Insights {
  hotTopics: string[]
  objections: string[]
  keyQuestions: string[]
  nextActions: string[]
  customerNeeds: string[]
  dealHealthScore: number
  sentiment: string
  talkRatio: number
  notes: string
}

interface TranscriptLine {
  speaker: number
  text: string
}

const defaultInsights: Insights = {
  hotTopics: ['ROI', 'Investment', 'Scalability', 'Location'],
  objections: ['Service charges (AED 25/sqft) are too high', 'Needs board approval first'],
  keyQuestions: [
    'What is your primary goal: Capital Appreciation or Rental Yield?',
    'Have you looked at similar units in Business Bay recently?',
    'Are you planning to finance this or pay cash?',
  ],
  nextActions: [
    'Schedule a Zoom demo for the 3-Bedroom layout tomorrow at 4 PM',
    'Send ROI comparison sheet via WhatsApp',
    'Follow up on financing pre-approval',
  ],
  customerNeeds: ['Budget: Under AED 2.5 Million', 'Location: 15 mins to Downtown', 'Timeline: Move in by Q4 2025'],
  dealHealthScore: 86,
  sentiment: 'positive',
  talkRatio: 47,
  notes: '',
}

export default function Dashboard() {
  const [hasMounted, setHasMounted] = useState(false)
  const [isLive, setIsLive] = useState(false)
  const [hideTranscript, setHideTranscript] = useState(false)
  const [foldQuestions, setFoldQuestions] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [insights, setInsights] = useState<Insights>(defaultInsights)
  const [transcript, setTranscript] = useState<TranscriptLine[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [micError, setMicError] = useState('')
  const [notes, setNotes] = useState('')

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const fullTranscriptRef = useRef<string>('')

  useEffect(() => { setHasMounted(true) }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  if (!hasMounted) return null

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
  const secs = String(seconds % 60).padStart(2, '0')

  const analyzeTranscript = async (text: string) => {
    if (!text.trim() || text.length < 50) return
    setIsAnalyzing(true)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: text }),
      })
      const data = await res.json()
if (!data.error) {
  setInsights({
    ...defaultInsights,
    ...data,
    hotTopics: Array.isArray(data.hotTopics) ? data.hotTopics : defaultInsights.hotTopics,
    objections: Array.isArray(data.objections) ? data.objections : defaultInsights.objections,
    keyQuestions: Array.isArray(data.keyQuestions) ? data.keyQuestions : defaultInsights.keyQuestions,
    nextActions: Array.isArray(data.nextActions) ? data.nextActions : defaultInsights.nextActions,
    customerNeeds: Array.isArray(data.customerNeeds) ? data.customerNeeds : defaultInsights.customerNeeds,
  })
}
    } catch (err) {
      console.error('Analysis error:', err)
    }
    setIsAnalyzing(false)
  }

  const processChunk = async (blob: Blob) => {
    if (blob.size < 1000) return
    try {
      const formData = new FormData()
      formData.append('audio', blob, 'chunk.webm')
      const res = await fetch('/api/transcribe', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.transcript) {
        fullTranscriptRef.current += ' ' + data.transcript
        if (data.utterances && data.utterances.length > 0) {
          const newLines: TranscriptLine[] = data.utterances.map((u: any) => ({ speaker: u.speaker || 0, text: u.text }))
          setTranscript(prev => [...prev.slice(-10), ...newLines])
        } else {
          setTranscript(prev => [...prev.slice(-10), { speaker: 0, text: data.transcript }])
        }
        analyzeTranscript(fullTranscriptRef.current)
      }
    } catch (err) {
      console.error('Transcription error:', err)
    }
  }

  const startCall = async () => {
    setMicError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.start(1000)
      setIsLive(true)
      setSeconds(0)
      fullTranscriptRef.current = ''
      setTranscript([])

      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)

      intervalRef.current = setInterval(() => {
        if (chunksRef.current.length > 0) {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
          chunksRef.current = []
          processChunk(blob)
        }
      }, 8000)

    } catch (err) {
      setMicError('Microphone access denied. Please allow microphone access and try again.')
    }
  }

  const endCall = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop())
    }
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
    if (chunksRef.current.length > 0) {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      processChunk(blob)
    }
    setIsLive(false)
  }

  const speakerColor = (speaker: number) => {
    const colors = ['#00e5a0', '#ffb020', '#4488ff', '#ff2d78']
    return colors[speaker % colors.length]
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0f0f18; color: #fff; font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        textarea { font-family: 'DM Sans', sans-serif; }
        textarea:focus { outline: none; border-color: rgba(0,229,160,0.4) !important; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes gradshift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f18' }}>

        {/* Ambient glows */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'fixed', bottom: 0, right: 0, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Sidebar */}
        <div style={{ width: 68, background: 'rgba(15,15,28,0.95)', borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: 8, position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#00e5a0,#4488ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#000', marginBottom: 20, boxShadow: '0 0 20px rgba(0,229,160,0.25)', fontFamily: 'Syne, sans-serif' }}>DF</div>
          {[{ icon: '⊞', active: true }, { icon: '◉', active: false }, { icon: '👤', active: false }, { icon: '▦', active: false }, { icon: '◎', active: false }].map((item, i) => (
            <div key={i} style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer', background: item.active ? 'rgba(0,229,160,0.12)' : 'transparent', color: item.active ? '#00e5a0' : 'rgba(255,255,255,0.25)', border: item.active ? '1px solid rgba(0,229,160,0.2)' : '1px solid transparent' }}>
              {item.icon}
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ marginLeft: 68, flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>

          {/* Topbar */}
          <div style={{ height: 60, background: 'rgba(15,15,24,0.9)', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 17, background: 'linear-gradient(90deg,#00e5a0,#4488ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DealFlow AI</span>
              <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Sales Assistant</span>
              {isLive && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,45,120,0.1)', border: '1px solid rgba(255,45,120,0.25)', borderRadius: 20, padding: '4px 12px' }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff2d78', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#ff2d78', letterSpacing: '0.12em' }}>LIVE SESSION</span>
                </div>
              )}
              {isAnalyzing && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(68,136,255,0.1)', border: '1px solid rgba(68,136,255,0.25)', borderRadius: 20, padding: '4px 12px' }}>
                  <div style={{ width: 12, height: 12, border: '2px solid rgba(68,136,255,0.3)', borderTopColor: '#4488ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#4488ff', letterSpacing: '0.12em' }}>AI ANALYZING</span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Ali Salameh</span>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#a855f7,#4488ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, boxShadow: '0 0 14px rgba(168,85,247,0.3)', cursor: 'pointer' }}>AS</div>
            </div>
          </div>

          {micError && (
            <div style={{ margin: '16px 24px 0', padding: '12px 16px', background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 10, fontSize: 13, color: '#ff8a94' }}>⚠ {micError}</div>
          )}

          {/* Content */}
          <div style={{ flex: 1, padding: 24, display: 'grid', gridTemplateColumns: '1fr 370px', gap: 18 }}>

            {/* LEFT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Call header */}
              <div style={{ ...card, padding: '22px 28px', background: 'linear-gradient(135deg, rgba(0,229,160,0.05), rgba(68,136,255,0.05))', borderColor: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #00e5a0, #4488ff, transparent)', backgroundSize: '200% 100%', animation: 'gradshift 3s ease infinite' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>
                      {isLive ? '🎙 RECORDING' : 'READY TO START'} <span style={{ color: '#00e5a0', margin: '0 8px' }}>•</span> SESSION 04
                    </div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, marginBottom: 6 }}>
                      ALI SALAMEH <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>| ApexNile</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Follow Up Call · Real Estate Consultation</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 42, fontWeight: 800, color: isLive ? '#00e5a0' : 'rgba(255,255,255,0.5)', letterSpacing: -1, fontVariantNumeric: 'tabular-nums' }}>
                        {mins}:{secs}
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>DURATION</div>
                    </div>
                    <button onClick={isLive ? endCall : startCall} style={{ padding: '12px 24px', borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: isLive ? 'linear-gradient(135deg,#ff2d78,#ff6b35)' : 'linear-gradient(135deg,#00e5a0,#00b8ff)', color: isLive ? '#fff' : '#000', boxShadow: isLive ? '0 4px 20px rgba(255,45,120,0.35)' : '0 4px 20px rgba(0,229,160,0.35)', fontFamily: 'DM Sans, sans-serif' }}>
                      {isLive ? '⏹ End Call' : '▶ Start Call'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
                <div style={card}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>REP TALK / LISTEN</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <GaugeCircle value={insights.talkRatio} color="#00e5a0" size={70} stroke={6} />
                    <div>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, color: '#00e5a0' }}>{insights.talkRatio}%</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Talk ratio</div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: insights.sentiment === 'positive' ? 'rgba(0,229,160,0.1)' : 'rgba(255,176,32,0.1)', border: `1px solid ${insights.sentiment === 'positive' ? 'rgba(0,229,160,0.2)' : 'rgba(255,176,32,0.2)'}`, borderRadius: 6, padding: '3px 10px' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: insights.sentiment === 'positive' ? '#00e5a0' : '#ffb020' }} />
                        <span style={{ fontSize: 10, fontWeight: 700, color: insights.sentiment === 'positive' ? '#00e5a0' : '#ffb020', textTransform: 'capitalize' }}>{insights.sentiment}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={card}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>CUSTOMER SENTIMENT</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 64 }}>
                    {sentimentData.map((v, i) => (
                      <div key={i} style={{ flex: 1, borderRadius: '3px 3px 0 0', height: `${v}%`, background: v > 75 ? '#00e5a0' : v > 55 ? '#ffb020' : '#ff2d78', opacity: 0.5 + (i / sentimentData.length) * 0.5 }} />
                    ))}
                  </div>
                </div>

                <div style={{ ...card, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', alignSelf: 'flex-start' }}>DEAL HEALTH SCORE</div>
                  <GaugeCircle value={insights.dealHealthScore} color="#ffb020" size={76} stroke={6} />
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#ffb020' }}>{insights.dealHealthScore >= 80 ? 'Strong Progress' : insights.dealHealthScore >= 60 ? 'On Track' : 'Needs Attention'}</div>
                </div>
              </div>

              {/* Hot Topics + Objections */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={card}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>HOT TOPICS</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {insights.hotTopics.map((t, i) => {
                      const colors = [
                        { color: '#ff2d78', bg: 'rgba(255,45,120,0.12)', border: 'rgba(255,45,120,0.25)' },
                        { color: '#ffb020', bg: 'rgba(255,176,32,0.12)', border: 'rgba(255,176,32,0.25)' },
                        { color: '#4488ff', bg: 'rgba(68,136,255,0.12)', border: 'rgba(68,136,255,0.25)' },
                        { color: '#00e5a0', bg: 'rgba(0,229,160,0.12)', border: 'rgba(0,229,160,0.25)' },
                      ]
                      const c = colors[i % colors.length]
                      return <span key={i} style={{ padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{t}</span>
                    })}
                  </div>
                </div>
                <div style={card}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#ff4757', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff4757', animation: isLive ? 'pulse 2s infinite' : 'none' }} />
                    OBJECTIONS DETECTED
                  </div>
                  {insights.objections.length === 0
                    ? <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>No objections detected yet</div>
                    : insights.objections.map((o, i) => (
                      <div key={i} style={{ background: 'rgba(255,71,87,0.08)', borderLeft: '2px solid #ff4757', borderRadius: '0 8px 8px 0', padding: '8px 12px', fontSize: 12, color: 'rgba(255,180,185,0.9)', marginBottom: 8 }}>{o}</div>
                    ))
                  }
                </div>
              </div>

              {/* Key Questions */}
              <div style={card}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: foldQuestions ? 0 : 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#a855f7' }}>KEY QUESTIONS TO ASK</div>
                  <button onClick={() => setFoldQuestions(!foldQuestions)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans, sans-serif' }}>
                    {foldQuestions ? '↓ Expand' : '↑ Collapse'}
                  </button>
                </div>
                {!foldQuestions && insights.keyQuestions.map((q, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderLeft: '2px solid #a855f7', borderRadius: '0 8px 8px 0', padding: '10px 14px', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8, cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(255,255,255,0.08)'; el.style.color = '#fff'; el.style.borderLeftColor = '#00e5a0'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(255,255,255,0.04)'; el.style.color = 'rgba(255,255,255,0.6)'; el.style.borderLeftColor = '#a855f7'; }}
                  >{q}</div>
                ))}
              </div>

              {/* Live Transcript */}
              {!hideTranscript && (
                <div style={card}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>
                      LIVE TRANSCRIPT {isLive && <span style={{ color: '#00e5a0', marginLeft: 6 }}>● Recording</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '6px 12px' }}>
                      <div>
                        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 700, color: '#4488ff', lineHeight: 1 }}>110 <span style={{ fontSize: 10, fontWeight: 400, color: 'rgba(255,255,255,0.3)' }}>WPM</span></div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Pace</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 20 }}>
                        {[40,60,80,100,70].map((v, i) => (
                          <div key={i} style={{ width: 4, borderRadius: 2, height: `${v}%`, background: '#4488ff', opacity: 0.3 + i * 0.15 }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 13, lineHeight: 1.8, maxHeight: 200, overflowY: 'auto' }}>
                    {transcript.length === 0
                      ? <div style={{ color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>{isLive ? 'Listening... transcript will appear in 8 seconds' : 'Start a call to see live transcript'}</div>
                      : transcript.map((line, i) => (
                        <div key={i}>
                          <span style={{ color: speakerColor(line.speaker), fontWeight: 700, marginRight: 8 }}>Speaker {line.speaker + 1}:</span>
                          <span style={{ color: 'rgba(255,255,255,0.65)' }}>{line.text}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}

              {/* Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setHideTranscript(!hideTranscript)}>
                <div style={{ width: 40, height: 22, borderRadius: 11, background: !hideTranscript ? '#00e5a0' : 'rgba(255,255,255,0.1)', padding: 3, transition: 'background 0.25s' }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'transform 0.25s', transform: hideTranscript ? 'translateX(0)' : 'translateX(18px)' }} />
                </div>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Hide Live Transcript</span>
              </div>

            </div>

            {/* RIGHT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              <div style={card}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>SUGGESTED NEXT ACTIONS</div>
                {insights.nextActions.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', borderRadius: 10, border: `1px solid ${i === 0 ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}`, background: i === 0 ? 'rgba(0,229,160,0.08)' : 'rgba(255,255,255,0.03)', color: i === 0 ? '#00e5a0' : 'rgba(255,255,255,0.55)', fontSize: 13, marginBottom: 8, cursor: 'pointer' }}>
                    <span style={{ marginTop: 1 }}>{i === 0 ? '⚡' : '○'}</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>

              <div style={card}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>EXTRACTED NEEDS</div>
                {insights.customerNeeds.map((n, i) => {
                  const colors = ['#ffb020', '#4488ff', '#ff2d78']
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors[i % colors.length], boxShadow: `0 0 8px ${colors[i % colors.length]}`, flexShrink: 0 }} />
                      {n}
                    </div>
                  )
                })}
              </div>

              <div style={{ ...card, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>DYNAMIC SMART NOTES</div>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#a855f7,#4488ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✦</div>
                </div>
                {insights.notes && (
                  <div style={{ background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.15)', borderRadius: 8, padding: '10px 12px', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 10, lineHeight: 1.6 }}>
                    <span style={{ color: '#00e5a0', fontWeight: 700, fontSize: 10 }}>AI SUMMARY · </span>
                    {insights.notes}
                  </div>
                )}
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  style={{ flex: 1, minHeight: 120, background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: 'rgba(255,255,255,0.8)', resize: 'vertical' }}
                  placeholder="Your personal notes..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ ...card, textAlign: 'center', padding: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>MONOLOGUE</div>
                  <div style={{ fontSize: 26, marginBottom: 6 }}>🎙</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#00e5a0' }}>Healthy</div>
                </div>
                <div style={{ ...card, textAlign: 'center', padding: 16, background: 'rgba(255,176,32,0.05)', borderColor: 'rgba(255,176,32,0.15)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>INTERRUPTIONS</div>
                  <div style={{ fontSize: 26, marginBottom: 6 }}>⚠️</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#ffb020' }}>2 Detected</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}