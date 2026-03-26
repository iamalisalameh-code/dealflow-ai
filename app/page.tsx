'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

const sentimentData = [30,45,40,60,55,80,70,85,75,90,80,88,70,65,78,82,90,85,88,92]

function BentoCard({ children, className = '', glowColor = '' }: { children: React.ReactNode, className?: string, glowColor?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/[0.07] backdrop-blur-[40px] shadow-2xl transition-all duration-500 hover:bg-white/[0.04] ${className}`}>
      {glowColor && (
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none" style={{ backgroundColor: glowColor }} />
      )}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {children}
      </div>
    </div>
  )
}

function AppleRing({ value, color, size = 120, stroke = 12 }: { value: number, color: string, size?: number, stroke?: number }) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 transform">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.32,0.72,0,1)' }} />
      </svg>
      <div className="absolute flex items-center justify-center" style={{ color, fontSize: size < 80 ? 13 : 18, fontWeight: 600 }}>
        {value}%
      </div>
    </div>
  )
}

function IOSToggle({ checked, onChange, label }: { checked: boolean, onChange: () => void, label: string }) {
  return (
    <div className="flex items-center gap-3 cursor-pointer group" onClick={onChange}>
      <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 ${checked ? 'bg-[#32d74b]' : 'bg-white/10'}`}>
        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
      <span className="text-xs font-medium text-white/50 group-hover:text-white/80 transition-colors">{label}</span>
    </div>
  )
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
          ...defaultInsights, ...data,
          hotTopics: Array.isArray(data.hotTopics) ? data.hotTopics : defaultInsights.hotTopics,
          objections: Array.isArray(data.objections) ? data.objections : defaultInsights.objections,
          keyQuestions: Array.isArray(data.keyQuestions) ? data.keyQuestions : defaultInsights.keyQuestions,
          nextActions: Array.isArray(data.nextActions) ? data.nextActions : defaultInsights.nextActions,
          customerNeeds: Array.isArray(data.customerNeeds) ? data.customerNeeds : defaultInsights.customerNeeds,
        })
      }
    } catch (err) { console.error('Analysis error:', err) }
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
        if (data.utterances?.length > 0) {
          setTranscript(prev => [...prev.slice(-10), ...data.utterances.map((u: any) => ({ speaker: u.speaker || 0, text: u.text }))])
        } else {
          setTranscript(prev => [...prev.slice(-10), { speaker: 0, text: data.transcript }])
        }
        analyzeTranscript(fullTranscriptRef.current)
      }
    } catch (err) { console.error('Transcription error:', err) }
  }

  const startCall = async () => {
    setMicError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      mediaRecorder.start(500)
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
      }, 5000)
    } catch (err) {
      setMicError('Microphone access denied. Please allow microphone access and try again.')
    }
  }

  const endCall = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop())
    }
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
    if (chunksRef.current.length > 0) {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      await processChunk(blob)
    }
    setIsLive(false)
    try {
      const { createClient } = await import('@/lib/supabase')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      console.log('Current user:', user)
      if (user) {
        await supabase.from('calls').insert({
          user_id: user.id,
          duration: seconds,
          contact_name: 'Ali Salameh',
          company: 'ApexNile',
          transcript: fullTranscriptRef.current,
          insights,
          notes,
          status: 'completed',
        })
        console.log('Call saved!')
      }
    } catch (err) { console.error('Save error:', err) }
  }

  const speakerColor = (s: number) => ['#30d158', '#0a84ff', '#ff9f0a', '#ff453a'][s % 4]

  const tagColors = [
    { color: '#ff453a', bg: 'rgba(255,69,58,0.12)', border: 'rgba(255,69,58,0.2)' },
    { color: '#ff9f0a', bg: 'rgba(255,159,10,0.12)', border: 'rgba(255,159,10,0.2)' },
    { color: '#0a84ff', bg: 'rgba(10,132,255,0.12)', border: 'rgba(10,132,255,0.2)' },
    { color: '#30d158', bg: 'rgba(48,209,88,0.12)', border: 'rgba(48,209,88,0.2)' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #000; color: #fff; -webkit-font-smoothing: antialiased; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        textarea { font-family: inherit; }
        textarea:focus { outline: none; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', overflow: 'hidden', position: 'relative' }}>

        {/* Spatial mesh background */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '60%', borderRadius: '50%', background: '#ff2d78', filter: 'blur(160px)', opacity: 0.08, mixBlendMode: 'screen' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: '#4488ff', filter: 'blur(160px)', opacity: 0.06, mixBlendMode: 'screen' }} />
          <div style={{ position: 'absolute', top: '20%', right: '20%', width: '40%', height: '40%', borderRadius: '50%', background: '#00e5a0', filter: 'blur(160px)', opacity: 0.04, mixBlendMode: 'screen' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', height: '100vh', padding: 16, gap: 16 }}>

          {/* Sidebar */}
          <aside style={{ width: 80, borderRadius: 32, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(40px)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: 8 }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, cursor: 'pointer' }}
              onClick={() => window.location.href = '/'}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            {[
              { path: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z', active: true, href: '/' },
              { path: 'M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0', active: false, href: '/history' },
              { path: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', active: false, href: '/' },
              { path: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', active: false, href: '/' },
            ].map((item, i) => (
              <div key={i} onClick={() => window.location.href = item.href} style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: item.active ? 'rgba(255,255,255,0.1)' : 'transparent', color: item.active ? '#fff' : 'rgba(255,255,255,0.35)', transition: 'all 0.2s', border: item.active ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.path} />
                </svg>
              </div>
            ))}
          </aside>

          {/* Main */}
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 32 }}>

            {/* Header */}
            <header style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.5px', color: 'rgba(255,255,255,0.9)' }}>DealFlow AI</span>
                {isLive && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '6px 14px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff3b30', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Recording</span>
                  </div>
                )}
                {isAnalyzing && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(10,132,255,0.15)', border: '1px solid rgba(10,132,255,0.25)', borderRadius: 20, padding: '6px 14px' }}>
                    <div style={{ width: 12, height: 12, border: '2px solid rgba(10,132,255,0.3)', borderTopColor: '#0a84ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0a84ff' }}>AI Analyzing</span>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>Ali Salameh</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>ApexNile · Agent</div>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>AS</div>
              </div>
            </header>

            {/* Mic error */}
            {micError && (
              <div style={{ margin: '0 16px 12px', padding: '12px 16px', background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.25)', borderRadius: 16, fontSize: 13, color: '#ff453a' }}>⚠ {micError}</div>
            )}

            {/* Bento Grid */}
            <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '0 8px 24px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: 'min-content', gap: 16, alignContent: 'start' }}>

              {/* Hero Call Card — 8 cols */}
              <div style={{ gridColumn: 'span 8', position: 'relative', overflow: 'hidden', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: 200, height: 200, borderRadius: '50%', background: '#00e5a0', filter: 'blur(80px)', opacity: 0.05, pointerEvents: 'none' }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    {isLive ? 'Live Recording · Session 04' : 'Ready to Start · Session 04'}
                  </div>
                  <h2 style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-1px', marginBottom: 8, color: 'rgba(255,255,255,0.92)' }}>ApexNile Consultation</h2>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>Follow Up Call · Real Estate Portfolio</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 32, position: 'relative' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 52, fontWeight: 300, letterSpacing: '-2px', color: isLive ? '#30d158' : 'rgba(255,255,255,0.5)', fontVariantNumeric: 'tabular-nums', transition: 'color 0.3s' }}>
                      {mins}:{secs}
                    </div>
                  </div>
                  <button onClick={isLive ? endCall : startCall} style={{ height: 52, padding: '0 28px', borderRadius: 26, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s', background: isLive ? 'rgba(255,59,48,0.15)' : 'rgba(48,209,88,0.15)', color: isLive ? '#ff3b30' : '#30d158', fontFamily: 'inherit' }}>
                    {isLive ? 'End Call' : 'Start Call'}
                  </button>
                </div>
              </div>

              {/* Deal Health — 4 cols */}
              <div style={{ gridColumn: 'span 4', position: 'relative', overflow: 'hidden', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: 160, height: 160, borderRadius: '50%', background: '#ff9f0a', filter: 'blur(60px)', opacity: 0.15, pointerEvents: 'none' }} />
                <AppleRing value={insights.dealHealthScore} color="#ff9f0a" size={110} stroke={11} />
                <div>
                  <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6, fontWeight: 600 }}>Deal Health</div>
                  <div style={{ fontSize: 22, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 4 }}>
                    {insights.dealHealthScore >= 80 ? 'Strong' : insights.dealHealthScore >= 60 ? 'On Track' : 'At Risk'}
                  </div>
                  <div style={{ fontSize: 13, color: '#ff9f0a', fontWeight: 500 }}>High Intent</div>
                </div>
              </div>

              {/* Transcript — 6 cols, tall */}
              <div style={{ gridColumn: 'span 6', gridRow: 'span 2', position: 'relative', overflow: 'hidden', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24, display: 'flex', flexDirection: 'column', minHeight: 320 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                    Live Transcript {isLive && <span style={{ color: '#30d158', marginLeft: 8 }}>● Live</span>}
                  </span>
                  <IOSToggle checked={!hideTranscript} onChange={() => setHideTranscript(!hideTranscript)} label="Listen" />
                </div>

                {!hideTranscript ? (
                  <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {transcript.length === 0 ? (
                      <>
                        <div style={{ opacity: 0.4 }}>
                          <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6, fontWeight: 600 }}>Agent</p>
                          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>So based on what you mentioned about the timeline, I think the Downtown unit makes more sense...</p>
                        </div>
                        <div>
                          <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0a84ff', marginBottom: 6, fontWeight: 700 }}>Client</p>
                          <p style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.4, color: 'rgba(255,255,255,0.9)' }}>No no. We must include service charges in the ROI calculation.</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, opacity: 0.4, marginTop: 8 }}>
                          {[0, 150, 300].map(d => <div key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: `bounce 1.2s infinite`, animationDelay: `${d}ms` }} />)}
                        </div>
                      </>
                    ) : (
                      transcript.map((line, i) => (
                        <div key={i} style={{ animation: 'fadeUp 0.3s ease', opacity: i === transcript.length - 1 ? 1 : 0.5 }}>
                          <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: speakerColor(line.speaker), marginBottom: 6, fontWeight: 600 }}>Speaker {line.speaker + 1}</p>
                          <p style={{ fontSize: i === transcript.length - 1 ? 20 : 15, fontWeight: i === transcript.length - 1 ? 500 : 400, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>{line.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>Transcript Hidden</div>
                )}
              </div>

              {/* Hot Topics — 3 cols */}
              <div style={{ gridColumn: 'span 3', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 16 }}>Hot Topics</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {insights.hotTopics.map((tag, i) => {
                    const c = tagColors[i % tagColors.length]
                    return <span key={i} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{tag}</span>
                  })}
                </div>
              </div>

              {/* Talk Ratio — 3 cols */}
              <div style={{ gridColumn: 'span 3', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 16 }}>Talk Ratio</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <AppleRing value={insights.talkRatio} color="#30d158" size={80} stroke={8} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: 4 }}>
                      {insights.talkRatio <= 50 ? 'Balanced' : 'High Talk'}
                    </div>
                    <div style={{ fontSize: 12, color: '#30d158', fontWeight: 500 }}>
                      {insights.sentiment === 'positive' ? '● Positive' : insights.sentiment === 'negative' ? '● Negative' : '● Neutral'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Objections — 6 cols */}
              <div style={{ gridColumn: 'span 6', position: 'relative', overflow: 'hidden', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: 140, height: 140, borderRadius: '50%', background: '#ff453a', filter: 'blur(60px)', opacity: 0.12, pointerEvents: 'none' }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ff453a', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  Detected Objections
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {insights.objections.length === 0
                    ? <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>No objections detected yet</div>
                    : insights.objections.map((o, i) => (
                      <div key={i} style={{ padding: '12px 16px', borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,69,58,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#ff453a', fontSize: 13, fontWeight: 700 }}>!</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: 4 }}>{o}</div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Tap to see suggested counter-response</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Key Questions — 6 cols */}
              <div style={{ gridColumn: 'span 6', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Key Questions</span>
                  <button onClick={() => setFoldQuestions(!foldQuestions)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                    {foldQuestions ? '↓ Show' : '↑ Hide'}
                  </button>
                </div>
                {!foldQuestions && insights.keyQuestions.map((q, i) => (
                  <div key={i} style={{ padding: '10px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)', fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 8, cursor: 'pointer', transition: 'all 0.2s', borderLeft: '2px solid rgba(10,132,255,0.5)' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(255,255,255,0.07)'; el.style.color = '#fff'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(255,255,255,0.04)'; el.style.color = 'rgba(255,255,255,0.65)'; }}
                  >{q}</div>
                ))}
              </div>

              {/* Next Actions — 6 cols */}
              <div style={{ gridColumn: 'span 6', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 16 }}>Action Items</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {insights.nextActions.map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', border: `1.5px solid ${i === 0 ? '#0a84ff' : 'rgba(255,255,255,0.2)'}`, background: i === 0 ? 'rgba(10,132,255,0.12)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                        {i === 0 && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0a84ff' }} />}
                      </div>
                      <span style={{ fontSize: 13, color: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)', fontWeight: i === 0 ? 500 : 400 }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Notes — 6 cols */}
              <div style={{ gridColumn: 'span 6', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24, display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>AI Smart Notes</span>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                </div>
                {insights.notes && (
                  <div style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(48,209,88,0.06)', border: '1px solid rgba(48,209,88,0.15)', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 10, lineHeight: 1.6 }}>
                    <span style={{ color: '#30d158', fontWeight: 600, fontSize: 10 }}>AI COACH · </span>{insights.notes}
                  </div>
                )}
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  style={{ flex: 1, background: 'transparent', border: 'none', fontSize: 13, color: 'rgba(255,255,255,0.7)', resize: 'none', lineHeight: 1.7, minHeight: 80, fontFamily: 'inherit' }}
                  placeholder="AI is listening... Notes will appear here dynamically."
                />
              </div>

              {/* Customer Needs — 6 cols */}
              <div style={{ gridColumn: 'span 6', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 16 }}>Customer Needs</span>
                {insights.customerNeeds.map((n, i) => {
                  const colors = ['#ff9f0a', '#0a84ff', '#ff453a', '#30d158']
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < insights.customerNeeds.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors[i % colors.length], boxShadow: `0 0 8px ${colors[i % colors.length]}`, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{n}</span>
                    </div>
                  )
                })}
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  )
}