'use client'
import { useState, useEffect, useRef } from 'react'

function AppleRing({ value, color, size = 120, stroke = 12 }: { value: number, color: string, size?: number, stroke?: number }) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.32,0.72,0,1)' }} />
      </svg>
      <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: size < 80 ? 13 : 18, fontWeight: 600 }}>
        {value}%
      </div>
    </div>
  )
}

function IOSToggle({ checked, onChange, label }: { checked: boolean, onChange: () => void, label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={onChange}>
      <div style={{ width: 44, height: 24, borderRadius: 12, padding: 2, transition: 'background 0.3s', background: checked ? '#32d74b' : 'rgba(255,255,255,0.1)' }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)', transform: checked ? 'translateX(20px)' : 'translateX(0)', transition: 'transform 0.3s' }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>{label}</span>
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
  coachingScore: number
  coachingBreakdown: { opening: number, objectionHandling: number, activeListening: number, closingMomentum: number }
  buyingSignals: string[]
  hesitationMoments: string[]
  energyLevel: string
}

interface TranscriptLine { speaker: number, text: string }

const defaultInsights: Insights = {
  hotTopics: ['ROI', 'Investment', 'Scalability', 'Location'],
  objections: ['Service charges (AED 25/sqft) are too high', 'Needs board approval first'],
  keyQuestions: ['What is your primary goal: Capital Appreciation or Rental Yield?', 'Have you looked at similar units in Business Bay recently?', 'Are you planning to finance this or pay cash?'],
  nextActions: ['Schedule a Zoom demo for the 3-Bedroom layout tomorrow at 4 PM', 'Send ROI comparison sheet via WhatsApp', 'Follow up on financing pre-approval'],
  customerNeeds: ['Budget: Under AED 2.5 Million', 'Location: 15 mins to Downtown', 'Timeline: Move in by Q4 2025'],
  dealHealthScore: 86, sentiment: 'positive', talkRatio: 47, notes: '',
  coachingScore: 72,
  coachingBreakdown: { opening: 8, objectionHandling: 6, activeListening: 7, closingMomentum: 5 },
  buyingSignals: [], hesitationMoments: [], energyLevel: 'confident',
}

export default function Dashboard() {
  const contactBtnRef = useRef<HTMLDivElement>(null)
  const [heartbeatData, setHeartbeatData] = useState<number[]>([50,55,60,58,62,70,68,75,72,80,78,82,80,86])
  const [hasMounted, setHasMounted] = useState(false)
  const [agentName, setAgentName] = useState('Agent')
  const [clientName, setClientName] = useState('')
  const [clientCompany, setClientCompany] = useState('')
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const transcriptBottomRef = useRef<HTMLDivElement>(null)
  const [isLive, setIsLive] = useState(false)
  const [callMode, setCallMode] = useState<'mic' | 'tab'>('mic')
  const [hideTranscript, setHideTranscript] = useState(false)
  const [foldQuestions, setFoldQuestions] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [insights, setInsights] = useState<Insights>(defaultInsights)
  const [allBuyingSignals, setAllBuyingSignals] = useState<{ text: string, active: boolean }[]>([])
  const [transcript, setTranscript] = useState<TranscriptLine[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [micError, setMicError] = useState('')
  const [notes, setNotes] = useState('')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const fullTranscriptRef = useRef<string>('')
  const displayStreamRef = useRef<MediaStream | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const [contacts, setContacts] = useState<any[]>([])
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [showBrief, setShowBrief] = useState(false)
  const [brief, setBrief] = useState<any>(null)
  const [loadingBrief, setLoadingBrief] = useState(false)
  const [contactSearch, setContactSearch] = useState('')
  const [showContactDropdown, setShowContactDropdown] = useState(false)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })

  useEffect(() => { setHasMounted(true) }, [])

  useEffect(() => {
    if (!isLive) return
    const t = setInterval(() => {
      setHeartbeatData(prev => {
        const last = prev[prev.length - 1]
        const variation = (Math.random() - 0.5) * 8
        const spike = Math.random() > 0.85 ? (Math.random() > 0.5 ? 15 : -12) : 0
        const next = Math.max(20, Math.min(100, last + variation + spike))
        return [...prev.slice(-20), next]
      })
    }, 800)
    return () => clearInterval(t)
  }, [isLive])

  useEffect(() => {
    setHeartbeatData(prev => {
      const spike = insights.dealHealthScore > (prev[prev.length-1] || 50) ? 18 : -12
      return [...prev.slice(-18), prev[prev.length-1] + spike, insights.dealHealthScore]
    })
  }, [insights.dealHealthScore])

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const { createClient } = await import('@/lib/supabase')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
          if (data?.full_name) setAgentName(data.full_name)
          else if (user.user_metadata?.full_name) setAgentName(user.user_metadata.full_name)
          else if (user.email) setAgentName(user.email.split('@')[0])
        }
      } catch (err) { console.error(err) }
    }
    fetchAgent()
  }, [])

  useEffect(() => {
    const el = transcriptRef.current
    if (!el) return
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120
    if (isAtBottom) { el.scrollTop = el.scrollHeight; setShowScrollBtn(false) }
    else setShowScrollBtn(true)
  }, [transcript])

  useEffect(() => {
    const el = transcriptRef.current
    if (!el) return
    const handleScroll = () => {
      const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80
      if (isAtBottom) setShowScrollBtn(false)
    }
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [hasMounted])

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { createClient } = await import('@/lib/supabase')
        const supabase = createClient()
        const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })
        if (data) setContacts(data)
      } catch (err) { console.error(err) }
    }
    fetchContacts()
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    if (!showContactDropdown) return
    const handler = (e: MouseEvent) => {
      if (contactBtnRef.current && !contactBtnRef.current.contains(e.target as Node)) {
        setShowContactDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showContactDropdown])

  if (!hasMounted) return null

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
  const secs = String(seconds % 60).padStart(2, '0')

  const handleContactBtnClick = () => {
    if (contactBtnRef.current) {
      const rect = contactBtnRef.current.getBoundingClientRect()
      setDropdownPos({ top: rect.bottom + 8, left: rect.left })
    }
    setShowContactDropdown(s => !s)
  }

  const selectContact = async (contact: any) => {
    setSelectedContact(contact)
    setShowContactDropdown(false)
    setContactSearch('')
    setShowBrief(true)
    setLoadingBrief(true)
    setBrief(null)
    try {
      const res = await fetch('/api/brief', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contact }) })
      const data = await res.json()
      setBrief(data)
    } catch (err) { console.error(err) }
    setLoadingBrief(false)
  }

  const analyzeTranscript = async (text: string) => {
    if (!text.trim() || text.length < 50) return
    setIsAnalyzing(true)
    try {
      const res = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ transcript: text }) })
      const data = await res.json()
      if (data.error === 'rate_limited') { setIsAnalyzing(false); return }
      if (!data.error) {
        setInsights({
          ...defaultInsights, ...data,
          hotTopics: Array.isArray(data.hotTopics) ? data.hotTopics : defaultInsights.hotTopics,
          objections: Array.isArray(data.objections) ? data.objections : defaultInsights.objections,
          keyQuestions: Array.isArray(data.keyQuestions) ? data.keyQuestions : defaultInsights.keyQuestions,
          nextActions: Array.isArray(data.nextActions) ? data.nextActions : defaultInsights.nextActions,
          customerNeeds: Array.isArray(data.customerNeeds) ? data.customerNeeds : defaultInsights.customerNeeds,
          buyingSignals: Array.isArray(data.buyingSignals) ? data.buyingSignals : [],
        })
        if (data.buyingSignals?.length > 0) {
          setAllBuyingSignals(prev => {
            const merged = [...prev]
            data.buyingSignals.forEach((s: string) => {
              const exists = merged.findIndex(x => x.text === s)
              if (exists === -1) merged.push({ text: s, active: true })
              else merged[exists].active = true
            })
            merged.forEach(s => { if (!data.buyingSignals.includes(s.text)) s.active = false })
            return [...merged]
          })
        }
      }
    } catch (err) { console.error(err) }
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
        if (data.transcript.length > fullTranscriptRef.current.length) fullTranscriptRef.current = data.transcript
        if (data.utterances?.length > 0) setTranscript(data.utterances.map((u: any) => ({ speaker: u.channel ?? u.speaker ?? 0, text: u.text })))
        else setTranscript([{ speaker: 0, text: data.transcript }])
        analyzeTranscript(fullTranscriptRef.current)
      }
    } catch (err) { console.error(err) }
  }

  const startRecording = (stream: MediaStream, mode: 'mic' | 'tab') => {
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
    mediaRecorderRef.current = mediaRecorder
    chunksRef.current = []
    mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
    stream.getAudioTracks()[0].onended = () => { if (mediaRecorderRef.current?.state === 'recording') endCall() }
    mediaRecorder.start(5000)
    setCallMode(mode)
    setIsLive(true)
    setSeconds(0)
    fullTranscriptRef.current = ''
    setTranscript([])
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    intervalRef.current = setInterval(() => {
      if (chunksRef.current.length > 0) {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        processChunk(blob)
      }
    }, 15000)
  }

  const startMicCall = async () => {
    setMicError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      startRecording(stream, 'mic')
    } catch { setMicError('Microphone access denied.') }
  }

  const startTabCall = async () => {
    setMicError('')
    try {
      const displayStream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true, audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 44100 }, selfBrowserSurface: 'exclude', preferCurrentTab: false })
      const audioTracks = displayStream.getAudioTracks()
      if (audioTracks.length === 0) { setMicError('No audio. Check "Share tab audio".'); displayStream.getTracks().forEach((t: MediaStreamTrack) => t.stop()); return }
      displayStream.getVideoTracks().forEach((t: MediaStreamTrack) => t.stop())
      displayStreamRef.current = displayStream
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      if (audioCtxRef.current) audioCtxRef.current.close()
      const audioCtx = new AudioContext()
      audioCtxRef.current = audioCtx
      const destination = audioCtx.createMediaStreamDestination()
      const merger = audioCtx.createChannelMerger(2)
      audioCtx.createMediaStreamSource(new MediaStream(audioTracks)).connect(merger, 0, 0)
      audioCtx.createMediaStreamSource(micStream).connect(merger, 0, 1)
      merger.connect(destination)
      audioTracks[0].onended = () => { if (mediaRecorderRef.current?.state === 'recording') endCall() }
      startRecording(destination.stream, 'tab')
    } catch (err: any) {
      setMicError(err.name === 'NotAllowedError' ? 'Permission denied.' : 'Could not capture audio. Check "Share tab audio".')
    }
  }

  const endCall = async () => {
    if (mediaRecorderRef.current) { mediaRecorderRef.current.stop(); mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop()); mediaRecorderRef.current = null }
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null }
    if (displayStreamRef.current) { displayStreamRef.current.getTracks().forEach(t => t.stop()); displayStreamRef.current = null }
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    if (chunksRef.current.length > 0) await processChunk(new Blob(chunksRef.current, { type: 'audio/webm' }))
    setIsLive(false)
    try {
      const { createClient } = await import('@/lib/supabase')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
  // Save call
  await supabase.from('calls').insert({
    user_id: user.id,
    duration: seconds,
    contact_name: selectedContact?.full_name || agentName,
    company: selectedContact?.company || 'Unknown',
    transcript: fullTranscriptRef.current,
    insights,
    notes,
    status: 'completed',
  })

  // Auto-update contact CRM
  if (selectedContact?.id) {
    const { data: existing } = await supabase
      .from('contacts')
      .select('total_calls, avg_deal_health, notes')
      .eq('id', selectedContact.id)
      .single()

    const prevCalls = existing?.total_calls || 0
    const prevHealth = existing?.avg_deal_health || 0
    const newTotal = prevCalls + 1
    const newAvgHealth = Math.round((prevHealth * prevCalls + insights.dealHealthScore) / newTotal)

    // Detect stage change from AI insights
    const stageMap: Record<string, string> = {
      'closed': 'closed',
      'lost': 'lost',
      'negotiation': 'negotiation',
      'prospect': 'prospect',
    }
    let newStage = selectedContact.deal_stage
    const lowerTranscript = fullTranscriptRef.current.toLowerCase()
    if (lowerTranscript.includes('sign') || lowerTranscript.includes('deal is closed') || insights.dealHealthScore >= 90) newStage = 'closed'
    else if (lowerTranscript.includes('not interested') || lowerTranscript.includes('cancel') || insights.dealHealthScore < 20) newStage = 'lost'
    else if (insights.dealHealthScore >= 70 && selectedContact.deal_stage === 'prospect') newStage = 'negotiation'
    else if (insights.dealHealthScore >= 50 && selectedContact.deal_stage === 'lead') newStage = 'prospect'

    // Append call summary to contact notes
    const callSummary = `\n[${new Date().toLocaleDateString()}] Call ${newTotal}: Health ${insights.dealHealthScore}%. ${insights.notes || ''}`
    const updatedNotes = (existing?.notes || '') + callSummary

    await supabase.from('contacts').update({
      last_call_at: new Date().toISOString(),
      total_calls: newTotal,
      avg_deal_health: newAvgHealth,
      deal_stage: newStage,
      notes: updatedNotes,
    }).eq('id', selectedContact.id)

    console.log('✅ Contact CRM updated:', selectedContact.full_name, '| Stage:', newStage, '| Calls:', newTotal)
  }
}
    } catch (err) { console.error(err) }
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
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #000; color: #fff; -webkit-font-smoothing: antialiased; }
        .cs::-webkit-scrollbar { width: 4px; }
        .cs::-webkit-scrollbar-track { background: transparent; }
        .cs::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        textarea { font-family: inherit; }
        textarea:focus { outline: none; }
        input:focus { outline: none; }
        input::placeholder { color: rgba(255,255,255,0.25); }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      {/* Contact dropdown — rendered at root level to avoid stacking context issues */}
      {showContactDropdown && (
        <div style={{ position: 'fixed', top: dropdownPos.top, left: dropdownPos.left, width: 300, background: 'rgba(15,15,15,0.98)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, zIndex: 999999, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.9)', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
          <input
            autoFocus
            placeholder="Search contacts..."
            value={contactSearch}
            onChange={e => setContactSearch(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: 13, fontFamily: 'inherit' }}
          />
          <div className="cs" style={{ maxHeight: 240, overflowY: 'auto' }}>
            {contacts
              .filter(c => contactSearch === '' || c.full_name?.toLowerCase().includes(contactSearch.toLowerCase()) || c.company?.toLowerCase().includes(contactSearch.toLowerCase()))
              .map(contact => (
                <div key={contact.id}
                  onMouseDown={() => { selectContact(contact) }}
                  style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.07)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
                >
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>{contact.full_name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{contact.company} · <span style={{ textTransform: 'capitalize' }}>{contact.deal_stage}</span></div>
                </div>
              ))
            }
            {contacts.length === 0 && <div style={{ padding: '20px', fontSize: 13, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>No contacts yet</div>}
          </div>
          <div onMouseDown={() => setShowContactDropdown(false)} style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 12, color: 'rgba(255,255,255,0.25)', cursor: 'pointer', textAlign: 'center' }}>Close ✕</div>
        </div>
      )}

      <div style={{ minHeight: '100vh', background: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>

        {/* Spatial mesh */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '60%', borderRadius: '50%', background: '#ff2d78', filter: 'blur(160px)', opacity: 0.08, mixBlendMode: 'screen' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: '#4488ff', filter: 'blur(160px)', opacity: 0.06, mixBlendMode: 'screen' }} />
          <div style={{ position: 'absolute', top: '20%', right: '20%', width: '40%', height: '40%', borderRadius: '50%', background: '#00e5a0', filter: 'blur(160px)', opacity: 0.04, mixBlendMode: 'screen' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', height: '100vh', padding: 16, gap: 16 }}>

          {/* Sidebar */}
          <aside style={{ width: 80, borderRadius: 32, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(40px)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: 8, flexShrink: 0 }}>
            <div onClick={() => window.location.href = '/'} style={{ width: 48, height: 48, borderRadius: 16, background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, cursor: 'pointer' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            {[
              { d: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z', active: true, href: '/' },
              { d: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', active: false, href: '/history' },
              { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', active: false, href: '/contacts' },
              { d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', active: false, href: '/' },
            ].map((item, i) => (
              <div key={i} onClick={() => window.location.href = item.href} style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: item.active ? 'rgba(255,255,255,0.1)' : 'transparent', color: item.active ? '#fff' : 'rgba(255,255,255,0.35)', border: item.active ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent', transition: 'all 0.2s' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.d} /></svg>
              </div>
            ))}
          </aside>

          {/* Main */}
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

            {/* Header */}
            <header style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.5px', color: 'rgba(255,255,255,0.9)' }}>DealFlow AI</span>
                {isLive && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: callMode === 'tab' ? 'rgba(10,132,255,0.15)' : 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', border: '1px solid ' + (callMode === 'tab' ? 'rgba(10,132,255,0.3)' : 'rgba(255,255,255,0.1)'), borderRadius: 20, padding: '6px 14px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: callMode === 'tab' ? '#0a84ff' : '#ff3b30', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: callMode === 'tab' ? '#0a84ff' : 'rgba(255,255,255,0.8)' }}>
                      {callMode === 'tab' ? 'Meeting Active' : 'Recording'}
                    </span>
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
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>{agentName}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Agent</div>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>
                  {agentName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)}
                </div>
              </div>
            </header>

            {micError && (
              <div style={{ margin: '0 32px 12px', padding: '12px 16px', background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.25)', borderRadius: 16, fontSize: 13, color: '#ff453a', flexShrink: 0 }}>⚠ {micError}</div>
            )}

            {/* Bento Grid */}
            <div className="cs" style={{ flex: 1, overflowY: 'auto', padding: '0 8px 24px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: 'min-content', gap: 16, alignContent: 'start' }}>

              {/* Hero Call Card */}
              <div style={{ gridColumn: 'span 8', position: 'relative', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: 200, height: 200, borderRadius: '50%', background: '#00e5a0', filter: 'blur(80px)', opacity: 0.05, pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    {isLive ? (callMode === 'tab' ? '📺 Meeting in Progress · Session 04' : '🎙 Recording · Session 04') : 'Ready to Start · Session 04'}
                  </div>
                  <h2 style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-1px', marginBottom: 6, color: 'rgba(255,255,255,0.92)' }}>
                    {selectedContact ? selectedContact.full_name + ' Call' : 'New Call'}
                  </h2>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 14 }}>
                    {selectedContact ? (selectedContact.company + ' · ' + selectedContact.deal_stage) : 'Select a contact to start'}
                  </p>

                  {/* Contact selector button */}
                  {!isLive && (
                    <div
                      ref={contactBtnRef}
                      onClick={handleContactBtnClick}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 20, border: '1px solid ' + (selectedContact ? 'rgba(10,132,255,0.3)' : 'rgba(255,255,255,0.1)'), background: selectedContact ? 'rgba(10,132,255,0.1)' : 'rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'all 0.2s', userSelect: 'none' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={selectedContact ? '#0a84ff' : 'rgba(255,255,255,0.4)'} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>
                      <span style={{ fontSize: 12, color: selectedContact ? '#0a84ff' : 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                        {selectedContact ? selectedContact.full_name + ' · ' + (selectedContact.company || '') : 'Select contact...'}
                      </span>
                      {selectedContact ? (
                        <span onMouseDown={e => { e.stopPropagation(); setSelectedContact(null); setShowBrief(false); setBrief(null) }} style={{ color: 'rgba(255,255,255,0.3)', fontSize: 16, marginLeft: 2, lineHeight: 1 }}>✕</span>
                      ) : (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                      )}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 24, position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 52, fontWeight: 300, letterSpacing: '-2px', color: isLive ? (callMode === 'tab' ? '#0a84ff' : '#30d158') : 'rgba(255,255,255,0.5)', fontVariantNumeric: 'tabular-nums', transition: 'color 0.3s' }}>
                    {mins}:{secs}
                  </div>
                  {isLive ? (
                    <button onClick={endCall} style={{ height: 52, padding: '0 28px', borderRadius: 26, border: '1px solid rgba(255,69,58,0.3)', background: 'rgba(255,59,48,0.15)', color: '#ff3b30', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                      ⏹ End Call
                    </button>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <button onClick={startMicCall} style={{ height: 44, padding: '0 22px', borderRadius: 22, border: '1px solid rgba(48,209,88,0.25)', background: 'rgba(48,209,88,0.12)', color: '#30d158', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                        🎙 Microphone
                      </button>
                      <button onClick={startTabCall} style={{ height: 44, padding: '0 22px', borderRadius: 22, border: '1px solid rgba(10,132,255,0.25)', background: 'rgba(10,132,255,0.12)', color: '#0a84ff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                        📺 Google Meet
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Deal Health */}
              <div style={{ gridColumn: 'span 4', position: 'relative', overflow: 'hidden', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, rgba(${insights.dealHealthScore > 70 ? '48,209,88' : insights.dealHealthScore > 40 ? '255,159,10' : '255,69,58'},0.08) 0%, transparent 70%)`, transition: 'background 1s', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8, fontWeight: 600 }}>Deal Health Score</div>
                  <div style={{ fontSize: 42, fontWeight: 700, color: insights.dealHealthScore > 70 ? '#30d158' : insights.dealHealthScore > 40 ? '#ff9f0a' : '#ff453a', letterSpacing: '-1px', lineHeight: 1, transition: 'color 1s', marginBottom: 6 }}>
                    {insights.dealHealthScore}%
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 12, fontWeight: 500 }}>
                    {insights.dealHealthScore >= 80 ? 'Strong Progress' : insights.dealHealthScore >= 60 ? 'On Track' : insights.dealHealthScore >= 40 ? 'Needs Attention' : 'At Risk'}
                  </div>
                  <div style={{ width: '100%', height: 64 }}>
                    <svg width="100%" height="64" viewBox={`0 0 ${heartbeatData.length * 12} 64`} preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="hbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={insights.dealHealthScore > 70 ? '#30d158' : insights.dealHealthScore > 40 ? '#ff9f0a' : '#ff453a'} stopOpacity="0" />
                          <stop offset="60%" stopColor={insights.dealHealthScore > 70 ? '#30d158' : insights.dealHealthScore > 40 ? '#ff9f0a' : '#ff453a'} stopOpacity="0.6" />
                          <stop offset="100%" stopColor={insights.dealHealthScore > 70 ? '#30d158' : insights.dealHealthScore > 40 ? '#ff9f0a' : '#ff453a'} stopOpacity="1" />
                        </linearGradient>
                      </defs>
                      <polyline points={heartbeatData.map((v, i) => `${i * 12},${64 - (v / 100) * 56}`).join(' ')} fill="none" stroke="url(#hbGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx={(heartbeatData.length - 1) * 12} cy={64 - (heartbeatData[heartbeatData.length - 1] / 100) * 56} r="3" fill={insights.dealHealthScore > 70 ? '#30d158' : insights.dealHealthScore > 40 ? '#ff9f0a' : '#ff453a'} />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Google Meet hint */}
              {!isLive && (
                <div style={{ gridColumn: 'span 12', borderRadius: 20, background: 'rgba(10,132,255,0.06)', border: '1px solid rgba(10,132,255,0.15)', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ fontSize: 24 }}>📺</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0a84ff', marginBottom: 2 }}>Google Meet / Zoom Integration</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Join your meeting in another tab → click "📺 Google Meet" → select the tab → check "Share tab audio" → click Share</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>Works with Meet · Zoom · Teams</div>
                </div>
              )}

              {/* Transcript */}
              <div style={{ gridColumn: 'span 6', gridRow: 'span 2', position: 'relative', overflow: 'hidden', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24, display: 'flex', flexDirection: 'column', minHeight: 320 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                    Live Transcript {isLive && <span style={{ color: callMode === 'tab' ? '#0a84ff' : '#30d158', marginLeft: 8 }}>●</span>}
                  </span>
                  <IOSToggle checked={!hideTranscript} onChange={() => setHideTranscript(!hideTranscript)} label="Listen" />
                </div>
                {!hideTranscript ? (
                  <div style={{ position: 'relative', height: 260, minHeight: 0 }}>
                    <div ref={transcriptRef} className="cs" style={{ position: 'absolute', inset: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, paddingRight: 8 }}>
                      {transcript.length === 0 ? (
                        <div style={{ opacity: 0.4 }}>
                          <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6, fontWeight: 600 }}>Agent</p>
                          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>Listening... start speaking to see transcript</p>
                        </div>
                      ) : transcript.map((line, i) => {
                        const isLatest = i === transcript.length - 1
                        const isAgent = line.speaker === 0
                        const spName = isAgent ? agentName : (selectedContact?.full_name || clientName || 'Client')
                        const spSub = !isAgent && selectedContact?.company ? selectedContact.company : ''
                        return (
                          <div key={i} style={{ opacity: isLatest ? 1 : i === transcript.length - 2 ? 0.5 : i === transcript.length - 3 ? 0.3 : 0.2, transition: 'opacity 0.3s' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                              <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: speakerColor(line.speaker), fontWeight: 700, flexShrink: 0 }}>{spName}</p>
                              {spSub && <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>{spSub}</p>}
                            </div>
                            <p style={{ fontSize: isLatest ? 20 : 14, fontWeight: isLatest ? 500 : 400, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>{line.text}</p>
                          </div>
                        )
                      })}
                      <div ref={transcriptBottomRef} />
                    </div>
                    {showScrollBtn && (
                      <button onClick={() => { if (transcriptRef.current) transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight; setShowScrollBtn(false) }}
                        style={{ position: 'absolute', bottom: 12, right: 12, height: 32, padding: '0 14px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)', color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                        ↓ Latest
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>Transcript Hidden</div>
                )}
              </div>

              {/* Hot Topics */}
              <div style={{ gridColumn: 'span 3', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 16 }}>Hot Topics</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {insights.hotTopics.map((tag, i) => {
                    const c = tagColors[i % tagColors.length]
                    return <span key={i} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: c.bg, color: c.color, border: '1px solid ' + c.border }}>{tag}</span>
                  })}
                </div>
              </div>

              {/* Talk Ratio */}
              <div style={{ gridColumn: 'span 3', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 16 }}>Talk Ratio</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <AppleRing value={insights.talkRatio} color="#30d158" size={80} stroke={8} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: 4 }}>{insights.talkRatio <= 50 ? 'Balanced' : 'High Talk'}</div>
                    <div style={{ fontSize: 12, color: '#30d158', fontWeight: 500 }}>{insights.sentiment === 'positive' ? '● Positive' : insights.sentiment === 'negative' ? '● Negative' : '● Neutral'}</div>
                  </div>
                </div>
              </div>

              {/* Objections */}
              <div style={{ gridColumn: 'span 6', position: 'relative', overflow: 'hidden', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: 140, height: 140, borderRadius: '50%', background: '#ff453a', filter: 'blur(60px)', opacity: 0.12, pointerEvents: 'none' }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ff453a', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  Detected Objections
                </span>
                {insights.objections.length === 0
                  ? <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>No objections detected yet</div>
                  : insights.objections.map((o, i) => (
                    <div key={i} style={{ padding: '12px 16px', borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,69,58,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#ff453a', fontSize: 13, fontWeight: 700 }}>!</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: 4 }}>{o}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Tap to see suggested counter-response</div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Key Questions */}
              <div style={{ gridColumn: 'span 6', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Key Questions</span>
                  <button onClick={() => setFoldQuestions(!foldQuestions)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>{foldQuestions ? '↓ Show' : '↑ Hide'}</button>
                </div>
                {!foldQuestions && insights.keyQuestions.map((q, i) => (
                  <div key={i} style={{ padding: '10px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)', fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 8, cursor: 'pointer', transition: 'all 0.2s', borderLeft: '2px solid rgba(10,132,255,0.5)' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(255,255,255,0.07)'; el.style.color = '#fff'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(255,255,255,0.04)'; el.style.color = 'rgba(255,255,255,0.65)'; }}
                  >{q}</div>
                ))}
              </div>

              {/* Buying Signals */}
              <div style={{ gridColumn: 'span 4', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: 120, height: 120, borderRadius: '50%', background: '#30d158', filter: 'blur(50px)', opacity: allBuyingSignals.length > 0 ? 0.15 : 0.04, transition: 'opacity 0.5s', pointerEvents: 'none' }} />
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: allBuyingSignals.length > 0 ? '#30d158' : 'rgba(255,255,255,0.4)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {allBuyingSignals.filter(s => s.active).length > 0 && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#30d158', animation: 'pulse 1.5s infinite' }} />}
                  Buying Signals
                  {allBuyingSignals.filter(s => s.active).length > 0 && <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 700, color: '#30d158' }}>{allBuyingSignals.filter(s => s.active).length}</span>}
                </div>
                <div className="cs" style={{ maxHeight: 160, overflowY: 'auto' }}>
                  {allBuyingSignals.length === 0
                    ? <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>Listening for buying signals...</div>
                    : allBuyingSignals.map((signal, i) => (
                      <div key={i} style={{ padding: '8px 12px', borderRadius: 12, background: signal.active ? 'rgba(48,209,88,0.08)' : 'rgba(255,69,58,0.06)', border: '1px solid ' + (signal.active ? 'rgba(48,209,88,0.2)' : 'rgba(255,69,58,0.15)'), fontSize: 12, color: signal.active ? 'rgba(255,255,255,0.8)' : 'rgba(255,100,100,0.5)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.5s', textDecoration: signal.active ? 'none' : 'line-through' }}>
                        <span>{signal.active ? '⚡' : '✗'}</span> {signal.text}
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Coaching Score */}
              <div style={{ gridColumn: 'span 4', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>Coaching Score</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 38, fontWeight: 700, color: insights.coachingScore >= 80 ? '#30d158' : insights.coachingScore >= 60 ? '#ff9f0a' : '#ff453a', letterSpacing: '-1px', lineHeight: 1 }}>{insights.coachingScore}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>/100</div>
                </div>
                {[
                  { label: 'Opening', value: insights.coachingBreakdown.opening, color: '#0a84ff' },
                  { label: 'Objections', value: insights.coachingBreakdown.objectionHandling, color: '#ff9f0a' },
                  { label: 'Listening', value: insights.coachingBreakdown.activeListening, color: '#bf5af2' },
                  { label: 'Closing', value: insights.coachingBreakdown.closingMomentum, color: '#30d158' },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{item.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: item.color }}>{item.value}/10</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 2, background: item.color, width: (item.value / 10 * 100) + '%', transition: 'width 0.8s ease' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Energy Level */}
              <div style={{ gridColumn: 'span 4', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>Agent Energy</div>
                {(() => {
                  const energyMap: Record<string, { color: string, pct: number, icon: string, desc: string }> = {
                    confident: { color: '#30d158', pct: 90, icon: '🔥', desc: 'High energy — great momentum' },
                    steady: { color: '#0a84ff', pct: 65, icon: '✅', desc: 'Steady pace — keep going' },
                    low: { color: '#ff9f0a', pct: 35, icon: '⚠️', desc: 'Energy dropping — pick it up' },
                    fast: { color: '#ff453a', pct: 80, icon: '⚡', desc: 'Too fast — slow down' },
                  }
                  const e = energyMap[insights.energyLevel] || energyMap.steady
                  return (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <div style={{ fontSize: 32 }}>{e.icon}</div>
                        <div>
                          <div style={{ fontSize: 18, fontWeight: 600, color: e.color, textTransform: 'capitalize', marginBottom: 2 }}>{insights.energyLevel}</div>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{e.desc}</div>
                        </div>
                      </div>
                      <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: 4, background: e.color, width: e.pct + '%', transition: 'width 1s ease' }} />
                      </div>
                    </>
                  )
                })()}
                {insights.hesitationMoments.length > 0 && (
                  <div style={{ marginTop: 14, padding: '8px 12px', borderRadius: 10, background: 'rgba(255,159,10,0.08)', border: '1px solid rgba(255,159,10,0.15)' }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#ff9f0a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Client hesitating</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>"{insights.hesitationMoments[insights.hesitationMoments.length - 1]}"</div>
                  </div>
                )}
              </div>

              {/* Next Actions */}
              <div style={{ gridColumn: 'span 6', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 16 }}>Action Items</span>
                {insights.nextActions.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', border: '1.5px solid ' + (i === 0 ? '#0a84ff' : 'rgba(255,255,255,0.2)'), background: i === 0 ? 'rgba(10,132,255,0.12)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {i === 0 && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0a84ff' }} />}
                    </div>
                    <span style={{ fontSize: 13, color: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)', fontWeight: i === 0 ? 500 : 400 }}>{a}</span>
                  </div>
                ))}
              </div>

              {/* Smart Notes */}
              <div style={{ gridColumn: 'span 6', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24, display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>AI Smart Notes</span>
                </div>
                {insights.notes && (
                  <div style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(48,209,88,0.06)', border: '1px solid rgba(48,209,88,0.15)', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 10, lineHeight: 1.6 }}>
                    <span style={{ color: '#30d158', fontWeight: 600, fontSize: 10 }}>AI COACH · </span>{insights.notes}
                  </div>
                )}
                <textarea value={notes} onChange={e => setNotes(e.target.value)}
                  style={{ flex: 1, background: 'transparent', border: 'none', fontSize: 13, color: 'rgba(255,255,255,0.7)', resize: 'none', lineHeight: 1.7, minHeight: 80, fontFamily: 'inherit' }}
                  placeholder="AI is listening... Notes will appear here dynamically." />
              </div>

              {/* Customer Needs */}
              <div style={{ gridColumn: 'span 6', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 16 }}>Customer Needs</span>
                {insights.customerNeeds.map((n, i) => {
                  const colors = ['#ff9f0a', '#0a84ff', '#ff453a', '#30d158']
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < insights.customerNeeds.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors[i % colors.length], boxShadow: '0 0 8px ' + colors[i % colors.length], flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{n}</span>
                    </div>
                  )
                })}
              </div>

            </div>
          </main>
        </div>

        {/* Pre-Call Brief Panel */}
        {showBrief && selectedContact && !isLive && (
          <div style={{ position: 'fixed', top: 0, right: 0, width: 400, height: '100vh', background: 'rgba(10,10,10,0.97)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(40px)', zIndex: 9000, display: 'flex', flexDirection: 'column', animation: 'slideIn 0.3s ease', boxShadow: '-20px 0 60px rgba(0,0,0,0.7)' }}>
            <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0a84ff' }}>Pre-Call Brief</div>
                <button onClick={() => setShowBrief(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 18, fontFamily: 'inherit' }}>✕</button>
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.3px', marginBottom: 4 }}>{selectedContact.full_name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{selectedContact.company}</span>
                <span style={{ padding: '2px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, background: 'rgba(10,132,255,0.1)', color: '#0a84ff', border: '1px solid rgba(10,132,255,0.2)', textTransform: 'capitalize' }}>{selectedContact.deal_stage}</span>
                {selectedContact.deal_value > 0 && <span style={{ fontSize: 12, color: '#30d158', fontWeight: 600 }}>AED {selectedContact.deal_value?.toLocaleString()}</span>}
              </div>
            </div>

            <div className="cs" style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {loadingBrief ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                  <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#0a84ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Generating your brief...
                </div>
              ) : brief ? (
                <>
                  <div style={{ borderRadius: 20, background: 'rgba(10,132,255,0.08)', border: '1px solid rgba(10,132,255,0.2)', padding: 18 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0a84ff', marginBottom: 10 }}>✦ AI Opening Line</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, fontStyle: 'italic' }}>"{brief.openingLine}"</div>
                  </div>
                  <div style={{ borderRadius: 16, background: 'rgba(48,209,88,0.06)', border: '1px solid rgba(48,209,88,0.15)', padding: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#30d158', marginBottom: 8 }}>🎯 Call Goal</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{brief.callGoal}</div>
                  </div>
                  <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>📋 Context</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>{brief.keyContext}</div>
                  </div>
                  {brief.watchOutFor && (
                    <div style={{ borderRadius: 16, background: 'rgba(255,159,10,0.06)', border: '1px solid rgba(255,159,10,0.15)', padding: 16 }}>
                      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ff9f0a', marginBottom: 8 }}>⚠ Watch Out For</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{brief.watchOutFor}</div>
                    </div>
                  )}
                  {brief.recommendedQuestions?.length > 0 && (
                    <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: 16 }}>
                      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>💬 Questions to Ask</div>
                      {brief.recommendedQuestions.map((q: string, i: number) => (
                        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                          <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(10,132,255,0.12)', border: '1px solid rgba(10,132,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#0a84ff', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{q}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 40 }}>Failed to load brief.</div>
              )}
            </div>

            <div style={{ padding: 20, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
              <button onClick={() => { setShowBrief(false); startMicCall() }} style={{ width: '100%', height: 48, borderRadius: 24, border: 'none', background: 'rgba(255,255,255,0.9)', color: '#000', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                🎙 Start with Microphone
              </button>
              <button onClick={() => { setShowBrief(false); startTabCall() }} style={{ width: '100%', height: 44, borderRadius: 22, border: '1px solid rgba(10,132,255,0.3)', background: 'rgba(10,132,255,0.1)', color: '#0a84ff', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                📺 Start with Google Meet
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}