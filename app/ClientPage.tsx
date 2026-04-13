'use client'

import { useState, useEffect, useRef } from 'react'
import ProfileDropdown from '@/components/ProfileDropdown'
import AppSidebar from '@/components/AppSidebar'

function AppleRing({ value, color, size = 120, stroke = 12 }: { value: number, color: string, size?: number, stroke?: number }) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--divider)" strokeWidth={stroke} />
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
function InferredBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', borderRadius: 8,
      background: 'rgba(255,159,10,0.12)',
      border: '1px solid rgba(255,159,10,0.2)',
      fontSize: 10, fontWeight: 600, color: '#ff9f0a',
      letterSpacing: '0.05em', flexShrink: 0,
    }}>~ inferred</span>
  )
}
function IOSToggle({ checked, onChange, label }: { checked: boolean, onChange: () => void, label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={onChange}>
      <div style={{ width: 44, height: 24, borderRadius: 12, padding: 2, transition: 'background 0.3s', background: checked ? '#32d74b' : 'rgba(255,255,255,0.1)' }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)', transform: checked ? 'translateX(20px)' : 'translateX(0)', transition: 'transform 0.3s' }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  )
}

const translations = {
  en: {
    appName: 'DealFlow AI',
    agent: 'Agent',
    meetingActive: 'Meeting Active',
    recording: 'Recording',
    aiAnalyzing: 'AI Analyzing',
    readyToStart: 'Ready to Start',
    sessionLive: 'Recording',
    meetingInProgress: 'Meeting Active',
    newCall: 'New Call',
    selectContactToStart: 'Select a contact to start',
    selectContactBtn: 'Select contact...',
    endCall: 'End Call',
    microphone: 'Microphone',
    googleMeet: 'Google Meet',
    meetHintTitle: 'Google Meet / Zoom Integration',
    meetHintBody: 'Join your meeting in another tab → click "📺 Google Meet" → select the tab → check "Share tab audio" → click Share',
    meetHintWorks: 'Works with Meet · Zoom · Teams',
    dealHealth: 'Deal Health Score',
    strong: 'Strong Progress',
    onTrack: 'On Track',
    needsAttention: 'Needs Attention',
    atRisk: 'At Risk',
    liveTranscript: 'Live Transcript',
    listen: 'Listen',
    listeningPlaceholder: 'Listening... start speaking to see transcript',
    transcriptHidden: 'Transcript Hidden',
    latest: '↓ Latest',
    hotTopics: 'Hot Topics',
    talkRatio: 'Talk Ratio',
    balanced: 'Balanced',
    highTalk: 'High Talk',
    positive: '● Positive',
    negative: '● Negative',
    neutral: '● Neutral',
    objections: 'Detected Objections',
    noObjections: 'No objections detected yet',
    tapCounter: 'Tap to see suggested counter-response',
    keyQuestions: 'Key Questions',
    show: '↓ Show',
    hide: '↑ Hide',
    buyingSignals: 'Buying Signals',
    listeningSignals: 'Listening for buying signals...',
    coachingScore: 'Coaching Score',
    opening: 'Opening',
    objectionHandling: 'Objections',
    activeListening: 'Listening',
    closingMomentum: 'Closing',
    agentEnergy: 'Agent Energy',
    clientHesitating: 'Client hesitating',
    energyConfident: 'High energy — great momentum',
    energySteady: 'Steady pace — keep going',
    energyLow: 'Energy dropping — pick it up',
    energyFast: 'Too fast — slow down',
    actionItems: 'Action Items',
    aiSmartNotes: 'AI Smart Notes',
    aiCoach: 'AI COACH · ',
    notesPlaceholder: 'AI is listening... Notes will appear here dynamically.',
    customerNeeds: 'Customer Needs',
    preCallBrief: 'Pre-Call Brief',
    generatingBrief: 'Generating your brief...',
    failedBrief: 'Failed to load brief.',
    aiOpeningLine: '✦ AI Opening Line',
    callGoal: '🎯 Call Goal',
    context: '📋 Context',
    watchOut: '⚠ Watch Out For',
    questionsToAsk: '💬 Questions to Ask',
    startMic: 'Start with Microphone',
    startMeet: 'Start with Google Meet',
    modeLabel: 'How are you taking this call?',
    modeMeet: '📹 Google Meet',
    modeOnsite: '🏢 On-Site Meeting',
    modePhone: '📞 Phone Call',
    modePhoneHint: 'Client audio not captured — insights will be inferred',
    oneSidedBanner: 'One-sided recording · insights inferred from agent speech',
    noContacts: 'No contacts yet',
    close: 'Close ✕',
  },
  ar: {
    appName: 'DealFlow AI',
    agent: 'وكيل',
    meetingActive: 'الاجتماع نشط',
    recording: 'جارٍ التسجيل',
    aiAnalyzing: 'الذكاء الاصطناعي يحلل',
    readyToStart: 'جاهز للبدء',
    sessionLive: 'جارٍ التسجيل',
    meetingInProgress: 'الاجتماع جارٍ',
    newCall: 'مكالمة جديدة',
    selectContactToStart: 'اختر جهة اتصال للبدء',
    selectContactBtn: 'اختر جهة اتصال...',
    endCall: 'إنهاء المكالمة',
    microphone: 'الميكروفون',
    googleMeet: 'Google Meet',
    meetHintTitle: 'تكامل Google Meet / Zoom',
    meetHintBody: 'انضم للاجتماع في تبويب آخر ← اضغط "📺 Google Meet" ← اختر التبويب ← فعّل "مشاركة صوت التبويب" ← اضغط مشاركة',
    meetHintWorks: 'يعمل مع Meet · Zoom · Teams',
    dealHealth: 'مؤشر صحة الصفقة',
    strong: 'تقدم ممتاز',
    onTrack: 'على المسار الصحيح',
    needsAttention: 'يحتاج اهتماماً',
    atRisk: 'في خطر',
    liveTranscript: 'النص المباشر',
    listen: 'استماع',
    listeningPlaceholder: 'جارٍ الاستماع... تحدث لترى النص',
    transcriptHidden: 'النص مخفي',
    latest: '↓ الأحدث',
    hotTopics: 'المواضيع الرئيسية',
    talkRatio: 'نسبة الحديث',
    balanced: 'متوازن',
    highTalk: 'حديث مفرط',
    positive: '● إيجابي',
    negative: '● سلبي',
    neutral: '● محايد',
    objections: 'الاعتراضات المكتشفة',
    noObjections: 'لم يتم اكتشاف اعتراضات بعد',
    tapCounter: 'اضغط لرؤية الرد المقترح',
    keyQuestions: 'الأسئلة الرئيسية',
    show: '↓ إظهار',
    hide: '↑ إخفاء',
    buyingSignals: 'إشارات الشراء',
    listeningSignals: 'جارٍ الاستماع لإشارات الشراء...',
    coachingScore: 'نقاط التدريب',
    opening: 'الافتتاح',
    objectionHandling: 'الاعتراضات',
    activeListening: 'الاستماع',
    closingMomentum: 'الإغلاق',
    agentEnergy: 'طاقة الوكيل',
    clientHesitating: 'العميل متردد',
    energyConfident: 'طاقة عالية — زخم رائع',
    energySteady: 'وتيرة ثابتة — استمر',
    energyLow: 'الطاقة تنخفض — رفع المستوى',
    energyFast: 'سريع جداً — تمهّل',
    actionItems: 'الإجراءات المطلوبة',
    aiSmartNotes: 'ملاحظات الذكاء الاصطناعي',
    aiCoach: 'المدرب الذكي · ',
    notesPlaceholder: 'الذكاء الاصطناعي يستمع... ستظهر الملاحظات هنا تلقائياً.',
    customerNeeds: 'احتياجات العميل',
    preCallBrief: 'ملخص ما قبل المكالمة',
    generatingBrief: 'جارٍ إنشاء الملخص...',
    failedBrief: 'فشل تحميل الملخص.',
    aiOpeningLine: '✦ جملة الافتتاح المقترحة',
    callGoal: '🎯 هدف المكالمة',
    context: '📋 السياق',
    watchOut: '⚠ انتبه لـ',
    questionsToAsk: '💬 أسئلة مقترحة',
    startMic: 'ابدأ بالميكروفون',
    startMeet: 'ابدأ مع Google Meet',
    modeLabel: 'كيف ستجري هذه المكالمة؟',
    modeMeet: '📹 Google Meet',
    modeOnsite: '🏢 اجتماع حضوري',
    modePhone: '📞 مكالمة هاتفية',
    modePhoneHint: 'لن يتم تسجيل صوت العميل — ستكون الرؤى مستنتجة',
    oneSidedBanner: 'تسجيل أحادي الجانب · الرؤى مستنتجة من كلام الوكيل',
    noContacts: 'لا توجد جهات اتصال',
    close: 'إغلاق ✕',
  }
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
  hotTopics: [],
  objections: [],
  keyQuestions: [],
  nextActions: [],
  customerNeeds: [],
  dealHealthScore: -1,
  sentiment: 'neutral',
  talkRatio: -1,
  notes: '',
  coachingScore: -1,
  coachingBreakdown: { opening: -1, objectionHandling: -1, activeListening: -1, closingMomentum: -1 },
  buyingSignals: [],
  hesitationMoments: [],
  energyLevel: 'steady',
}

export default function LandingClient() {
  const contactBtnRef = useRef<HTMLDivElement>(null)
  const [heartbeatData, setHeartbeatData] = useState<number[]>([50,50,50,50,50,50,50,50,50,50,50,50,50,50])
  const [hasMounted, setHasMounted] = useState(false)
  const [agentName, setAgentName] = useState('Agent')
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
  const firstChunkRef = useRef<Blob | null>(null)
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
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [inputMode, setInputMode] = useState<'meet' | 'onsite' | 'phone'>('meet')

useEffect(() => {
  const saved = localStorage.getItem('lang') as 'en' | 'ar'
  if (saved) setLang(saved)
}, [])

const toggleLang = () => {
  const next = lang === 'en' ? 'ar' : 'en'
  setLang(next)
  localStorage.setItem('lang', next)
}

  const tr = translations[lang]
  const isRTL = lang === 'ar'

  useEffect(() => { setHasMounted(true) }, [])

  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => {
      setHeartbeatData(prev => {
        const last = prev[prev.length - 1]
        const variation = (Math.random() - 0.5) * 8
        const spike = Math.random() > 0.85 ? (Math.random() > 0.5 ? 15 : -12) : 0
        const next = Math.max(20, Math.min(100, last + variation + spike))
        return [...prev.slice(-20), next]
      })
    }, 800)
    return () => clearInterval(interval)
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
      const res = await fetch('/api/brief', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contact, callMode: inputMode }) })
      const data = await res.json()
      setBrief(data)
    } catch (err) { console.error(err) }
    setLoadingBrief(false)
  }

  const analyzeTranscript = async (text: string) => {
    if (!text.trim() || text.length < 50) return
    setIsAnalyzing(true)
    try {
      const res = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ transcript: text, language: lang, callMode: inputMode }) })
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
    formData.append('language', lang)
      formData.append('mode', inputMode)
    const res = await fetch('/api/transcribe', { method: 'POST', body: formData })
    const data = await res.json()
    if (data.transcript) {
      // Append new transcript to full transcript
      fullTranscriptRef.current = (fullTranscriptRef.current + ' ' + data.transcript).trim()
      // Append new utterances to transcript display
      if (data.utterances?.length > 0) {
        setTranscript(prev => [
          ...prev,
          ...data.utterances.map((u: any) => ({ speaker: u.channel ?? u.speaker ?? 0, text: u.text }))
        ])
      } else {
        setTranscript(prev => [...prev, { speaker: 0, text: data.transcript }])
      }
      analyzeTranscript(fullTranscriptRef.current)
    }
  } catch (err) { console.error(err) }
}

  const startRecording = (stream: MediaStream, mode: 'mic' | 'tab') => {
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
    mediaRecorderRef.current = mediaRecorder
    firstChunkRef.current = null
chunksRef.current = []
    chunksRef.current = []
    mediaRecorder.ondataavailable = (e) => {
  if (e.data.size > 0) {
    if (!firstChunkRef.current) firstChunkRef.current = e.data
    chunksRef.current.push(e.data)
  }
}
    stream.getAudioTracks()[0].onended = () => { if (mediaRecorderRef.current?.state === 'recording') endCall() }
    mediaRecorder.start(1000)
    setCallMode(mode)
    setIsLive(true)
    setSeconds(0)
    fullTranscriptRef.current = ''
    setTranscript([])
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    intervalRef.current = setInterval(() => {
  if (chunksRef.current.length > 0) {
    const latestChunks = [...chunksRef.current]
    chunksRef.current = []
    // Always prepend first chunk (contains WebM header)
    const blobParts = firstChunkRef.current
      ? [firstChunkRef.current, ...latestChunks]
      : latestChunks
    if (!firstChunkRef.current && latestChunks.length > 0) {
      firstChunkRef.current = latestChunks[0]
    }
    const blob = new Blob(blobParts, { type: 'audio/webm' })
    processChunk(blob)
  }
}, 5000)
  }
  

  const startMicCall = async () => {
    setMicError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      startRecording(stream, 'mic')
    } catch (err: any) { setMicError(err.name === 'NotAllowedError' ? 'Microphone access denied.' : err.message || 'Microphone error') }
  }

  const startTabCall = async () => {
    setMicError('')
    try {
      const displayStream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true, audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 44100 }, selfBrowserSurface: 'exclude', preferCurrentTab: false })
      const audioTracks = displayStream.getAudioTracks()
      if (audioTracks.length === 0) { setMicError(tr.meetHintBody); displayStream.getTracks().forEach((t: MediaStreamTrack) => t.stop()); return }
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
    if (chunksRef.current.length > 0) {
  // 1. Grab the current audio chunks
  const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
  
  // 2. CRITICAL: Empty the array immediately so fresh audio starts buffering from scratch
  chunksRef.current = []

  // 3. Process the chunk
  if (blob.size < 10 * 1024 * 1024) {
    await processChunk(blob)
  } else {
    console.warn('Audio chunk exceeded 10MB limit and was dropped.')
  }
}
    setIsLive(false)
    try {
      const { createClient } = await import('@/lib/supabase')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('calls').insert({
          user_id: user.id, duration: seconds,
          contact_name: selectedContact?.full_name || agentName,
          company: selectedContact?.company || 'Unknown',
          transcript: fullTranscriptRef.current, insights, notes, status: 'completed',
          call_mode: inputMode,
        })
        if (selectedContact?.id) {
          const { data: existing } = await supabase.from('contacts').select('total_calls, avg_deal_health, notes').eq('id', selectedContact.id).single()
          const prevCalls = existing?.total_calls || 0
          const newTotal = prevCalls + 1
          const newAvgHealth = Math.round(((existing?.avg_deal_health || 0) * prevCalls + insights.dealHealthScore) / newTotal)
          let newStage = selectedContact.deal_stage
          const lt = fullTranscriptRef.current.toLowerCase()
          if (lt.includes('sign') || lt.includes('deal is closed') || insights.dealHealthScore >= 90) newStage = 'closed'
          else if (lt.includes('not interested') || lt.includes('cancel') || insights.dealHealthScore < 20) newStage = 'lost'
          else if (insights.dealHealthScore >= 70 && selectedContact.deal_stage === 'prospect') newStage = 'negotiation'
          else if (insights.dealHealthScore >= 50 && selectedContact.deal_stage === 'lead') newStage = 'prospect'
          const callSummary = `\n[${new Date().toLocaleDateString()}] Call ${newTotal}: Health ${insights.dealHealthScore}%. ${insights.notes || ''}`
          await supabase.from('contacts').update({
            last_call_at: new Date().toISOString(), total_calls: newTotal,
            avg_deal_health: newAvgHealth, deal_stage: newStage,
            notes: (existing?.notes || '') + callSummary,
          }).eq('id', selectedContact.id)
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

  const energyIconMap: Record<string, React.ReactNode> = {
  confident: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#30d158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  steady: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  low: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  fast: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff453a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
}

const energyMap: Record<string, { color: string, pct: number, desc: string }> = {
  confident: { color: '#30d158', pct: 90, desc: tr.energyConfident },
  steady: { color: '#0a84ff', pct: 65, desc: tr.energySteady },
  low: { color: '#ff9f0a', pct: 35, desc: tr.energyLow },
  fast: { color: '#ff453a', pct: 80, desc: tr.energyFast },
}

  const coachingLabels = [
    { label: tr.opening, value: insights.coachingBreakdown.opening, color: '#0a84ff' },
    { label: tr.objectionHandling, value: insights.coachingBreakdown.objectionHandling, color: '#ff9f0a' },
    { label: tr.activeListening, value: insights.coachingBreakdown.activeListening, color: '#bf5af2' },
    { label: tr.closingMomentum, value: insights.coachingBreakdown.closingMomentum, color: '#30d158' },
  ]

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .cs::-webkit-scrollbar { width: 4px; }
        .cs::-webkit-scrollbar-track { background: transparent; }
        .cs::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 10px; }
        textarea { font-family: inherit; }
        textarea:focus { outline: none; }
        input:focus { outline: none; }
        input::placeholder { color: var(--text-dim); }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      {showContactDropdown && (
        <div style={{ position: 'fixed', top: dropdownPos.top, left: dropdownPos.left, width: 300, background: 'var(--dropdown-bg)', border: '1px solid var(--card-border)', borderRadius: 16, zIndex: 999999, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.9)', fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', direction: isRTL ? 'rtl' : 'ltr' }}>
          <input
            autoFocus
            placeholder={isRTL ? 'ابحث عن جهة اتصال...' : 'Search contacts...'}
            value={contactSearch}
            onChange={e => setContactSearch(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', background: 'transparent', border: 'none', borderBottom: '1px solid var(--divider)', color: 'var(--text-primary)', fontSize: 13, fontFamily: 'inherit', direction: isRTL ? 'rtl' : 'ltr' }}
          />
          <div className="cs" style={{ maxHeight: 240, overflowY: 'auto' }}>
            {contacts
              .filter(c => contactSearch === '' || c.full_name?.toLowerCase().includes(contactSearch.toLowerCase()) || c.company?.toLowerCase().includes(contactSearch.toLowerCase()))
              .map(contact => (
                <div key={contact.id} onMouseDown={() => selectContact(contact)}
                  style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid var(--divider)', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--card-hover)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
                >
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{contact.full_name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{contact.company} · <span style={{ textTransform: 'capitalize' }}>{contact.deal_stage}</span></div>
                </div>
              ))
            }
            {contacts.length === 0 && <div style={{ padding: '20px', fontSize: 13, color: 'var(--text-tertiary)', textAlign: 'center' }}>{tr.noContacts}</div>}
          </div>
          <div onMouseDown={() => setShowContactDropdown(false)} style={{ padding: '10px 16px', borderTop: '1px solid var(--divider)', fontSize: 12, color: 'var(--text-dim)', cursor: 'pointer', textAlign: 'center' }}>{tr.close}</div>
        </div>
      )}

      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: isRTL ? "'Noto Sans Arabic', sans-serif" : '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>

        {/* Spatial mesh */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '60%', borderRadius: '50%', background: '#ff2d78', filter: 'blur(160px)', opacity: 0.08 }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: '#4488ff', filter: 'blur(160px)', opacity: 0.06 }} />
          <div style={{ position: 'absolute', top: '20%', right: '20%', width: '40%', height: '40%', borderRadius: '50%', background: '#00e5a0', filter: 'blur(160px)', opacity: 0.04 }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', height: '100vh', padding: 16, gap: 16 }}>

          <AppSidebar activePage="dashboard" />

          {/* Main */}
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

            {/* Header */}
            <header style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: isRTL ? 0 : '-0.5px', color: 'var(--text-primary)' }}>{tr.appName}</span>
                {isLive && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: callMode === 'tab' ? 'rgba(10,132,255,0.15)' : 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', border: '1px solid ' + (callMode === 'tab' ? 'rgba(10,132,255,0.3)' : 'var(--card-border)'), borderRadius: 20, padding: '6px 14px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: callMode === 'tab' ? '#0a84ff' : '#ff3b30', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.15em', textTransform: 'uppercase', color: callMode === 'tab' ? '#0a84ff' : 'var(--text-primary)' }}>
                      {callMode === 'tab' ? tr.meetingActive : tr.recording}
                    </span>
                  </div>
                )}
                {isAnalyzing && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(10,132,255,0.15)', border: '1px solid rgba(10,132,255,0.25)', borderRadius: 20, padding: '6px 14px' }}>
                    <div style={{ width: 12, height: 12, border: '2px solid rgba(10,132,255,0.3)', borderTopColor: '#0a84ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.15em', textTransform: 'uppercase', color: '#0a84ff' }}>{tr.aiAnalyzing}</span>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={toggleLang}                  style={{ height: 34, padding: '0 16px', borderRadius: 17, border: '1px solid var(--card-border)', background: isRTL ? 'rgba(10,132,255,0.15)' : 'transparent', color: isRTL ? '#0a84ff' : 'var(--text-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                  {isRTL ? '🇬🇧 EN' : '🇦🇪 AR'}
                </button>
                <div style={{ textAlign: isRTL ? 'left' : 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{agentName}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{tr.agent}</div>
                </div>
                <ProfileDropdown agentName={agentName} lang={lang} />
              </div>
            </header>

            {micError && (
              <div style={{ margin: '0 32px 12px', padding: '12px 16px', background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.25)', borderRadius: 16, fontSize: 13, color: '#ff453a', flexShrink: 0 }}>⚠ {micError}</div>
            )}
            {/* One-sided recording banner — phone mode only */}
            {isLive && inputMode === 'phone' && (
              <div style={{ margin: '0 32px 10px', padding: '8px 16px', borderRadius: 12, background: 'rgba(255,159,10,0.07)', border: '1px solid rgba(255,159,10,0.18)', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <span style={{ fontSize: 12, color: '#ff9f0a', flexShrink: 0 }}>◈</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{tr.oneSidedBanner}</span>
              </div>
            )}
            {/* Bento Grid */}
            <div className="cs" style={{ flex: 1, overflowY: 'auto', padding: '0 8px 24px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: 'min-content', gap: 16, alignContent: 'start' }}>

              {/* Hero Call Card */}
              <div style={{ gridColumn: 'span 8', position: 'relative', borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: 200, height: 200, borderRadius: '50%', background: '#00e5a0', filter: 'blur(80px)', opacity: 0.05, pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    {isLive ? (callMode === 'tab' ? tr.meetingInProgress : tr.sessionLive) : tr.readyToStart}
                  </div>
                  <h2 style={{ fontSize: 36, fontWeight: 600, letterSpacing: isRTL ? 0 : '-1px', marginBottom: 6, color: 'var(--text-primary)' }}>
                    {selectedContact ? selectedContact.full_name : tr.newCall}
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 14 }}>
                    {selectedContact ? (selectedContact.company + ' · ' + selectedContact.deal_stage) : tr.selectContactToStart}
                  </p>
                  {!isLive && (
                    <div ref={contactBtnRef} onClick={handleContactBtnClick}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 20, border: '1px solid ' + (selectedContact ? 'rgba(10,132,255,0.3)' : 'var(--input-border)'), background: selectedContact ? 'rgba(10,132,255,0.1)' : 'var(--input-bg)', cursor: 'pointer', transition: 'all 0.2s', userSelect: 'none' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={selectedContact ? '#0a84ff' : 'var(--text-secondary)'} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>
                      <span style={{ fontSize: 12, color: selectedContact ? '#0a84ff' : 'var(--text-secondary)', fontWeight: 500 }}>
                        {selectedContact ? selectedContact.full_name + ' · ' + (selectedContact.company || '') : tr.selectContactBtn}
                      </span>
                      {selectedContact ? (
                        <span onMouseDown={e => { e.stopPropagation(); setSelectedContact(null); setShowBrief(false); setBrief(null) }} style={{ color: 'var(--text-tertiary)', fontSize: 16, marginLeft: 2, lineHeight: 1 }}>✕</span>
                      ) : (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                      )}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 52, fontWeight: 300, letterSpacing: '-2px', color: isLive ? (callMode === 'tab' ? '#0a84ff' : '#30d158') : 'var(--text-dim)', fontVariantNumeric: 'tabular-nums', transition: 'color 0.3s' }}>
                    {mins}:{secs}
                  </div>
                  {isLive ? (
                    <button onClick={endCall} style={{ height: 52, padding: '0 28px', borderRadius: 26, border: '1px solid rgba(255,69,58,0.3)', background: 'rgba(255,59,48,0.15)', color: '#ff3b30', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45c1.12.45 2.3.75 3.53.85a2 2 0 0 1 1.8 1.99V21a2 2 0 0 1-2.18 2C7.67 21.81 2 16.14 2 9a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 1.8c.1 1.22.4 2.4.85 3.52a2 2 0 0 1-.45 2.11l-1.27 1.27z"/><line x1="23" y1="1" x2="1" y2="23"/></svg>{tr.endCall}
                    </button>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
  {/* Mode selector */}
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 14px', borderRadius: 18, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)' }}>
    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 4 }}>{tr.modeLabel}</div>
    {(['meet', 'onsite', 'phone'] as const).map(mode => {
      const labels = { meet: tr.modeMeet, onsite: tr.modeOnsite, phone: tr.modePhone }
      const isSelected = inputMode === mode
      return (
        <div key={mode} onClick={() => setInputMode(mode)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 12, cursor: 'pointer', transition: 'all 0.15s',
            background: isSelected ? (mode === 'meet' ? 'rgba(10,132,255,0.12)' : mode === 'onsite' ? 'rgba(48,209,88,0.12)' : 'rgba(255,159,10,0.12)') : 'transparent',
            border: '1px solid ' + (isSelected ? (mode === 'meet' ? 'rgba(10,132,255,0.25)' : mode === 'onsite' ? 'rgba(48,209,88,0.25)' : 'rgba(255,159,10,0.25)') : 'transparent'),
          }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid ' + (isSelected ? (mode === 'meet' ? '#0a84ff' : mode === 'onsite' ? '#30d158' : '#ff9f0a') : 'var(--text-dim)'), background: isSelected ? (mode === 'meet' ? '#0a84ff' : mode === 'onsite' ? '#30d158' : '#ff9f0a') : 'transparent', transition: 'all 0.15s', flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: isSelected ? 600 : 400, color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)', transition: 'all 0.15s' }}>{labels[mode]}</span>
        </div>
      )
    })}
    {inputMode === 'phone' && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 8, background: 'rgba(255,159,10,0.06)', marginTop: 2 }}>
        <span style={{ fontSize: 10, color: '#ff9f0a' }}>ⓘ</span>
        <span style={{ fontSize: 10, color: 'var(--text-tertiary)', lineHeight: 1.4 }}>{tr.modePhoneHint}</span>
      </div>
    )}
  </div>

  {/* Start buttons — mode aware */}
  {inputMode === 'meet' ? (
    <button onClick={startTabCall} style={{ height: 44, padding: '0 22px', borderRadius: 22, border: '1px solid rgba(10,132,255,0.25)', background: 'rgba(10,132,255,0.12)', color: '#0a84ff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="15" height="10" rx="2"/><path d="M17 9l5-2v10l-5-2"/></svg>
      {tr.startMeet}
    </button>
  ) : (
    <button onClick={startMicCall} style={{ height: 44, padding: '0 22px', borderRadius: 22, border: '1px solid ' + (inputMode === 'phone' ? 'rgba(255,159,10,0.25)' : 'rgba(48,209,88,0.25)'), background: inputMode === 'phone' ? 'rgba(255,159,10,0.12)' : 'rgba(48,209,88,0.12)', color: inputMode === 'phone' ? '#ff9f0a' : '#30d158', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
      {inputMode === 'phone' ? tr.modePhone : tr.modeOnsite}
    </button>
  )}
</div>
                  )}
                </div>
              </div>

              {/* Deal Health */}
              <div style={{ gridColumn: 'span 4', position: 'relative', overflow: 'hidden', borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, rgba(${insights.dealHealthScore > 70 ? '48,209,88' : insights.dealHealthScore > 40 ? '255,159,10' : '255,69,58'},0.08) 0%, transparent 70%)`, transition: 'background 1s', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 11, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>{tr.dealHealth}</div>
                  <div style={{ fontSize: 42, fontWeight: 700, color: insights.dealHealthScore > 70 ? '#30d158' : insights.dealHealthScore > 40 ? '#ff9f0a' : '#ff453a', letterSpacing: '-1px', lineHeight: 1, transition: 'color 1s', marginBottom: 6 }}>
                    {insights.dealHealthScore < 0 ? '—' : `${insights.dealHealthScore}%`}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12, fontWeight: 500 }}>
                    {insights.dealHealthScore < 0 ? 'Yet to be calculated' : insights.dealHealthScore >= 80 ? tr.strong : insights.dealHealthScore >= 60 ? tr.onTrack : insights.dealHealthScore >= 40 ? tr.needsAttention : tr.atRisk}
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
                      <polyline points={heartbeatData.map((v, i) => `${i * 12},${64 - (v / 100) * 56}`).join(' ')} fill="none" stroke={insights.dealHealthScore < 0 ? 'var(--divider)' : 'url(#hbGrad)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
{insights.dealHealthScore >= 0 && <circle cx={(heartbeatData.length - 1) * 12} cy={64 - (heartbeatData[heartbeatData.length - 1] / 100) * 56} r="3" fill={insights.dealHealthScore > 70 ? '#30d158' : insights.dealHealthScore > 40 ? '#ff9f0a' : '#ff453a'} />}
                    </svg>
                  </div>
                </div>
              </div>

              {/* Meet hint */}
              {!isLive && (
                <div style={{ gridColumn: 'span 12', borderRadius: 20, background: 'rgba(10,132,255,0.06)', border: '1px solid rgba(10,132,255,0.15)', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(10,132,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="15" height="10" rx="2"/><path d="M17 9l5-2v10l-5-2"/></svg>
</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0a84ff', marginBottom: 2 }}>{tr.meetHintTitle}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{tr.meetHintBody}</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)', flexShrink: 0 }}>{tr.meetHintWorks}</div>
                </div>
              )}

              {/* Transcript */}
              <div style={{ gridColumn: 'span 6', gridRow: 'span 2', position: 'relative', overflow: 'hidden', borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24, display: 'flex', flexDirection: 'column', minHeight: 320 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    {tr.liveTranscript} {isLive && <span style={{ color: callMode === 'tab' ? '#0a84ff' : '#30d158', marginRight: isRTL ? 8 : 0, marginLeft: isRTL ? 0 : 8 }}>●</span>}
                  </span>
                  <IOSToggle checked={!hideTranscript} onChange={() => setHideTranscript(!hideTranscript)} label={tr.listen} />
                </div>
                {!hideTranscript ? (
                  <div style={{ position: 'relative', height: 260, minHeight: 0 }}>
                    <div ref={transcriptRef} className="cs" style={{ position: 'absolute', inset: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, paddingRight: isRTL ? 0 : 8, paddingLeft: isRTL ? 8 : 0 }}>
                      {transcript.length === 0 ? (
                        <div style={{ opacity: 0.4 }}>
                          <p style={{ fontSize: 10, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 6, fontWeight: 600 }}>{tr.agent}</p>
                          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{tr.listeningPlaceholder}</p>
                        </div>
                      ) : transcript.map((line, i) => {
                        const isLatest = i === transcript.length - 1
                        const isAgent = line.speaker === 0
                        const spName = isAgent ? agentName : (selectedContact?.full_name || 'Client')
                        const spSub = !isAgent && selectedContact?.company ? selectedContact.company : ''
                        return (
                          <div key={i} style={{ opacity: isLatest ? 1 : i === transcript.length - 2 ? 0.5 : i === transcript.length - 3 ? 0.3 : 0.2, transition: 'opacity 0.3s' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                              <p style={{ fontSize: 10, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: speakerColor(line.speaker), fontWeight: 700, flexShrink: 0 }}>{spName}</p>
                              {spSub && <p style={{ fontSize: 10, color: 'var(--text-dim)', fontStyle: 'italic' }}>{spSub}</p>}
                            </div>
                            <p style={{ fontSize: isLatest ? 20 : 14, fontWeight: isLatest ? 500 : 400, lineHeight: 1.5, color: 'var(--text-primary)' }}>{line.text}</p>
                          </div>
                        )
                      })}
                      <div ref={transcriptBottomRef} />
                    </div>
                    {showScrollBtn && (
                      <button onClick={() => { if (transcriptRef.current) transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight; setShowScrollBtn(false) }}
                        style={{ position: 'absolute', bottom: 12, right: isRTL ? 'auto' : 12, left: isRTL ? 12 : 'auto', height: 32, padding: '0 14px', borderRadius: 16, border: '1px solid var(--card-border)', background: 'var(--dropdown-bg)', backdropFilter: 'blur(20px)', color: 'var(--text-secondary)', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                        {tr.latest}
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: 14 }}>{tr.transcriptHidden}</div>
                )}
              </div>

              {/* Hot Topics */}
              <div style={{ gridColumn: 'span 3', borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: 16 }}>{tr.hotTopics}</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {insights.hotTopics.map((tag, i) => {
                    const c = tagColors[i % tagColors.length]
                    return <span key={i} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: c.bg, color: c.color, border: '1px solid ' + c.border }}>{tag}</span>
                  })}
                </div>
              </div>

              {/* Talk Ratio */}
              <div style={{ gridColumn: 'span 3', borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: 16 }}>{tr.talkRatio}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <AppleRing value={insights.talkRatio < 0 ? 0 : insights.talkRatio} color="#30d158" size={80} stroke={8} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>{insights.talkRatio < 0 ? '—' : insights.talkRatio <= 50 ? tr.balanced : tr.highTalk}</div>
                    <div style={{ fontSize: 12, color: '#30d158', fontWeight: 500 }}>{insights.sentiment === 'positive' ? tr.positive : insights.sentiment === 'negative' ? tr.negative : tr.neutral}</div>
                  </div>
                </div>
              </div>

              {/* Objections */}
              <div style={{ gridColumn: 'span 6', position: 'relative', overflow: 'hidden', borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: 140, height: 140, borderRadius: '50%', background: '#ff453a', filter: 'blur(60px)', opacity: 0.12, pointerEvents: 'none' }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: '#ff453a', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  {tr.objections}
                </span>
                {insights.objections.length === 0
                  ? <div style={{ fontSize: 13, color: 'var(--text-dim)', fontStyle: 'italic' }}>{tr.noObjections}</div>
                  : insights.objections.map((o, i) => (
                    <div key={i} style={{ padding: '12px 16px', borderRadius: 16, background: 'var(--divider)', border: '1px solid var(--divider)', display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,69,58,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#ff453a', fontSize: 13, fontWeight: 700 }}>!</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>{o}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{tr.tapCounter}</div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Key Questions */}
              <div style={{ gridColumn: 'span 6', borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{tr.keyQuestions}</span>
                  <button onClick={() => setFoldQuestions(!foldQuestions)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>{foldQuestions ? tr.show : tr.hide}</button>
                </div>
                {!foldQuestions && insights.keyQuestions.map((q, i) => (
                  <div key={i} style={{ padding: '10px 14px', borderRadius: 14, background: 'var(--input-bg)', border: '1px solid var(--divider)', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, cursor: 'pointer', transition: 'all 0.2s', borderLeft: isRTL ? 'none' : '2px solid rgba(10,132,255,0.5)', borderRight: isRTL ? '2px solid rgba(10,132,255,0.5)' : 'none' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'var(--card-hover)'; el.style.color = 'var(--text-primary)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'var(--input-bg)'; el.style.color = 'var(--text-secondary)'; }}
                  >{q}</div>
                ))}
              </div>

              {/* Buying Signals */}
              <div style={{ gridColumn: 'span 4', borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: 120, height: 120, borderRadius: '50%', background: '#30d158', filter: 'blur(50px)', opacity: allBuyingSignals.length > 0 ? 0.15 : 0.04, transition: 'opacity 0.5s', pointerEvents: 'none' }} />
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: allBuyingSignals.length > 0 ? '#30d158' : 'var(--text-secondary)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {allBuyingSignals.filter(s => s.active).length > 0 && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#30d158', animation: 'pulse 1.5s infinite' }} />}
                  {tr.buyingSignals}
                  {allBuyingSignals.filter(s => s.active).length > 0 && <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 700, color: '#30d158' }}>{allBuyingSignals.filter(s => s.active).length}</span>}
                </div>
                <div className="cs" style={{ maxHeight: 160, overflowY: 'auto' }}>
                  {allBuyingSignals.length === 0
                    ? <div style={{ fontSize: 13, color: 'var(--text-dim)', fontStyle: 'italic' }}>{tr.listeningSignals}</div>
                    : allBuyingSignals.map((signal, i) => (
                      <div key={i} style={{ padding: '8px 12px', borderRadius: 12, background: signal.active ? 'rgba(48,209,88,0.08)' : 'rgba(255,69,58,0.06)', border: '1px solid ' + (signal.active ? 'rgba(48,209,88,0.2)' : 'rgba(255,69,58,0.15)'), fontSize: 12, color: signal.active ? 'var(--text-primary)' : 'var(--text-tertiary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.5s', textDecoration: signal.active ? 'none' : 'line-through' }}>
                        <span>{signal.active ? (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#30d158" strokeWidth="2.5"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
) : (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
)}</span> {signal.text}
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Coaching Score */}
              <div style={{ gridColumn: 'span 4', borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 14 }}>{tr.coachingScore}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 38, fontWeight: 700, color: insights.coachingScore >= 80 ? '#30d158' : insights.coachingScore >= 60 ? '#ff9f0a' : '#ff453a', letterSpacing: '-1px', lineHeight: 1 }}>{insights.coachingScore < 0 ? '—' : insights.coachingScore}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>/100</div>
                </div>
                {coachingLabels.map((item, i) => (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{item.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: item.color }}>{item.value < 0 ? '—' : `${item.value}/10`}</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 2, background: 'var(--divider)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 2, background: item.color, width: (item.value < 0 ? 0 : item.value / 10 * 100) + '%', transition: 'width 0.8s ease' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Energy Level */}
              <div style={{ gridColumn: 'span 4', borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 14 }}>{tr.agentEnergy}</div>
                {(() => {
                  const e = energyMap[insights.energyLevel] || energyMap.steady
                  return (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: e.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
  {energyIconMap[insights.energyLevel] || energyIconMap.steady}
</div>
                        <div>
                          <div style={{ fontSize: 18, fontWeight: 600, color: e.color, textTransform: 'capitalize', marginBottom: 2 }}>{insights.coachingScore < 0 ? 'Yet to start' : insights.energyLevel}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{e.desc}</div>
                        </div>
                      </div>
                      <div style={{ height: 8, borderRadius: 4, background: 'var(--divider)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: 4, background: e.color, width: e.pct + '%', transition: 'width 1s ease' }} />
                      </div>
                    </>
                  )
                })()}
                {insights.hesitationMoments.length > 0 && (
                  <div style={{ marginTop: 14, padding: '8px 12px', borderRadius: 10, background: 'rgba(255,159,10,0.08)', border: '1px solid rgba(255,159,10,0.15)' }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#ff9f0a', letterSpacing: isRTL ? 0 : '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{tr.clientHesitating}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{insights.hesitationMoments[insights.hesitationMoments.length - 1]}"</div>
                  </div>
                )}
              </div>

              {/* Next Actions */}
              <div style={{ gridColumn: 'span 6', borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: 16 }}>{tr.actionItems}</span>
                {insights.nextActions.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', border: '1.5px solid ' + (i === 0 ? '#0a84ff' : 'var(--text-dim)'), background: i === 0 ? 'rgba(10,132,255,0.12)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {i === 0 && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0a84ff' }} />}
                    </div>
                    <span style={{ fontSize: 13, color: i === 0 ? 'var(--text-primary)' : 'var(--text-tertiary)', fontWeight: i === 0 ? 500 : 400 }}>{a}</span>
                  </div>
                ))}
              </div>

              {/* Smart Notes */}
              <div style={{ gridColumn: 'span 6', borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24, display: 'flex', flexDirection: 'column', minHeight: 180 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{tr.aiSmartNotes}</span>
                </div>
                {insights.notes && (
                  <div style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(48,209,88,0.06)', border: '1px solid rgba(48,209,88,0.15)', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.6 }}>
                    <span style={{ color: '#30d158', fontWeight: 600, fontSize: 10 }}>{tr.aiCoach}</span>{insights.notes}
                  </div>
                )}
                <textarea value={notes} onChange={e => setNotes(e.target.value)}
                  style={{ flex: 1, background: 'transparent', border: 'none', fontSize: 13, color: 'var(--text-secondary)', resize: 'none', lineHeight: 1.7, minHeight: 80, fontFamily: 'inherit', textAlign: isRTL ? 'right' : 'left' }}
                  placeholder={tr.notesPlaceholder} />
              </div>

              {/* Customer Needs */}
              <div style={{ gridColumn: 'span 6', borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: 16 }}>{tr.customerNeeds}</span>
                {insights.customerNeeds.map((n, i) => {
                  const colors = ['#ff9f0a', '#0a84ff', '#ff453a', '#30d158']
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < insights.customerNeeds.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors[i % colors.length], boxShadow: '0 0 8px ' + colors[i % colors.length], flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{n}</span>
                    </div>
                  )
                })}
              </div>

            </div>
          </main>
        </div>

        {/* Pre-Call Brief Panel */}
        {showBrief && selectedContact && !isLive && (
          <div style={{ position: 'fixed', top: 0, right: isRTL ? 'auto' : 0, left: isRTL ? 0 : 'auto', width: 400, height: '100vh', background: 'var(--dropdown-bg)', border: '1px solid var(--input-border)', backdropFilter: 'blur(40px)', zIndex: 9000, display: 'flex', flexDirection: 'column', animation: 'slideIn 0.3s ease', boxShadow: isRTL ? '20px 0 60px rgba(0,0,0,0.3)' : '-20px 0 60px rgba(0,0,0,0.3)' }}>
            <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid var(--divider)', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.15em', textTransform: 'uppercase', color: '#0a84ff' }}>{tr.preCallBrief}</div>
                <button onClick={() => setShowBrief(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 18, fontFamily: 'inherit' }}>✕</button>
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.3px', marginBottom: 4 }}>{selectedContact.full_name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{selectedContact.company}</span>
                <span style={{ padding: '2px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, background: 'rgba(10,132,255,0.1)', color: '#0a84ff', border: '1px solid rgba(10,132,255,0.2)', textTransform: 'capitalize' }}>{selectedContact.deal_stage}</span>
                {selectedContact.deal_value > 0 && <span style={{ fontSize: 12, color: '#30d158', fontWeight: 600 }}>AED {selectedContact.deal_value?.toLocaleString()}</span>}
              </div>
            </div>
            <div className="cs" style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {loadingBrief ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', fontSize: 13 }}>
                  <div style={{ width: 14, height: 14, border: '2px solid var(--divider)', borderTopColor: '#0a84ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  {tr.generatingBrief}
                </div>
              ) : brief ? (
                <>
                  <div style={{ borderRadius: 20, background: 'rgba(10,132,255,0.08)', border: '1px solid rgba(10,132,255,0.2)', padding: 18 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.15em', textTransform: 'uppercase', color: '#0a84ff', marginBottom: 10 }}>{tr.aiOpeningLine}</div>
                    <div style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.7, fontStyle: 'italic' }}>"{brief.openingLine}"</div>
                  </div>
                  <div style={{ borderRadius: 16, background: 'rgba(48,209,88,0.06)', border: '1px solid rgba(48,209,88,0.15)', padding: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.15em', textTransform: 'uppercase', color: '#30d158', marginBottom: 8 }}>{tr.callGoal}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{brief.callGoal}</div>
                  </div>
                  <div style={{ borderRadius: 16, background: 'var(--input-bg)', border: '1px solid var(--divider)', padding: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 8 }}>{tr.context}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{brief.keyContext}</div>
                  </div>
                  {brief.watchOutFor && (
                    <div style={{ borderRadius: 16, background: 'rgba(255,159,10,0.06)', border: '1px solid rgba(255,159,10,0.15)', padding: 16 }}>
                      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.15em', textTransform: 'uppercase', color: '#ff9f0a', marginBottom: 8 }}>{tr.watchOut}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{brief.watchOutFor}</div>
                    </div>
                  )}
                  {brief.recommendedQuestions?.length > 0 && (
                    <div style={{ borderRadius: 16, background: 'var(--input-bg)', border: '1px solid var(--divider)', padding: 16 }}>
                      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: isRTL ? 0 : '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 12 }}>{tr.questionsToAsk}</div>
                      {brief.recommendedQuestions.map((q: string, i: number) => (
                        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                          <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(10,132,255,0.12)', border: '1px solid rgba(10,132,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#0a84ff', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                          <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{q}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div style={{ fontSize: 13, color: 'var(--text-tertiary)', textAlign: 'center', marginTop: 40 }}>{tr.failedBrief}</div>
              )}
            </div>
            <div style={{ padding: 20, borderTop: '1px solid var(--divider)', display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
              {inputMode === 'meet' ? (
  <button onClick={() => { setShowBrief(false); startTabCall() }} style={{ width: '100%', height: 48, borderRadius: 24, border: 'none', background: 'var(--text-primary)', color: 'var(--bg)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
    {tr.startMeet}
  </button>
) : (
  <button onClick={() => { setShowBrief(false); startMicCall() }} style={{ width: '100%', height: 48, borderRadius: 24, border: 'none', background: inputMode === 'phone' ? '#ff9f0a' : '#30d158', color: '#000', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
    {inputMode === 'phone' ? tr.modePhone : tr.modeOnsite}
  </button>
)}
              <button onClick={() => { setShowBrief(false); startTabCall() }} style={{ width: '100%', height: 44, borderRadius: 22, border: '1px solid rgba(10,132,255,0.3)', background: 'rgba(10,132,255,0.1)', color: '#0a84ff', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                {tr.startMeet}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}