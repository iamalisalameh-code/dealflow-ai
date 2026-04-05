'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'

interface Contact {
  id: string
  full_name: string
  phone: string
  company: string
  deal_stage: string
}

interface Props {
  isMobile: boolean
}

type CallState = 'idle' | 'connecting' | 'active' | 'ended'

export default function MobileDialer({ isMobile }: Props) {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [search, setSearch] = useState('')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [dialInput, setDialInput] = useState('')
  const [callState, setCallState] = useState<CallState>('idle')
  const [callDuration, setCallDuration] = useState(0)
  const [device, setDevice] = useState<any>(null)
  const [call, setCall] = useState<any>(null)
  const [sdkReady, setSdkReady] = useState(false)
  const [insights, setInsights] = useState<any>(null)
  const [transcript, setTranscript] = useState('')
  const [muted, setMuted] = useState(false)
  const [view, setView] = useState<'contacts' | 'dialpad' | 'active'>('contacts')
  const [error, setError] = useState('')
  const timerRef = useRef<any>(null)
  const isAr = lang === 'ar'

  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'en' | 'ar'
    if (saved) setLang(saved)
    loadContacts()
    initTwilio()
  }, [])

  useEffect(() => {
    if (!search) { setFilteredContacts(contacts); return }
    setFilteredContacts(contacts.filter(c =>
      c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search) ||
      c.company?.toLowerCase().includes(search.toLowerCase())
    ))
  }, [search, contacts])

  const loadContacts = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('contacts')
        .select('id, full_name, phone, company, deal_stage')
        .eq('user_id', user.id)
        .order('full_name')
      setContacts(data || [])
      setFilteredContacts(data || [])
    } catch {}
  }

  const initTwilio = async () => {
    try {
      const { Device } = await import('@twilio/voice-sdk')
      const res = await fetch('/api/twilio/token')
      const { token } = await res.json()
      if (!token) { setError('Could not get call token'); return }

      const dev = new Device(token, {
        logLevel: 1,
        codecPreferences: ['opus', 'pcmu'] as any,
      })

      dev.on('registered', () => setSdkReady(true))
      dev.on('error', (err: any) => setError(err.message))
      dev.on('incoming', (incomingCall: any) => {
        setCall(incomingCall)
        setCallState('active')
        setView('active')
        incomingCall.accept()
        startTimer()
      })

      await dev.register()
      setDevice(dev)
    } catch (err: any) {
      setError('Twilio SDK failed to load: ' + err.message)
    }
  }

  const startTimer = () => {
    setCallDuration(0)
    timerRef.current = setInterval(() => {
      setCallDuration(d => d + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const startCall = async (toNumber: string) => {
    if (!device || !sdkReady) { setError('Dialer not ready yet'); return }
    if (!toNumber) { setError('Enter a number or select a contact'); return }
    setError('')
    setCallState('connecting')
    setView('active')
    setTranscript('')
    setInsights(null)

    try {
      const activeCall = await device.connect({
        params: { To: toNumber },
      })

      activeCall.on('accept', () => {
        setCallState('active')
        startTimer()
      })

      activeCall.on('disconnect', () => {
        setCallState('ended')
        stopTimer()
        setTimeout(() => {
          setCallState('idle')
          setView('contacts')
          setSelectedContact(null)
          setDialInput('')
        }, 3000)
      })

      activeCall.on('error', (err: any) => {
        setError(err.message)
        setCallState('idle')
        setView('contacts')
        stopTimer()
      })

      setCall(activeCall)
    } catch (err: any) {
      setError(err.message)
      setCallState('idle')
      setView('contacts')
    }
  }

  const endCall = () => {
    if (call) { call.disconnect(); setCall(null) }
    stopTimer()
    setCallState('ended')
    setTimeout(() => {
      setCallState('idle')
      setView('contacts')
    }, 2000)
  }

  const toggleMute = () => {
    if (call) { call.mute(!muted); setMuted(!muted) }
  }

  const stageColor = (stage: string) => {
    const map: Record<string, string> = {
      lead: '#ff9f0a', prospect: '#0a84ff', negotiation: '#bf5af2',
      closed: '#34c759', lost: '#ff453a'
    }
    return map[stage] || '#6e6e73'
  }

  const dialPadKeys = ['1','2','3','4','5','6','7','8','9','*','0','#']

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
        body { background:#000; color:#fff; font-family:${isAr ? "'Noto Sans Arabic'" : "'DM Sans'"}, -apple-system, sans-serif; -webkit-font-smoothing:antialiased; }
        .tap { transition: transform 0.12s, opacity 0.12s; }
        .tap:active { transform: scale(0.95); opacity: 0.8; }
        .cs::-webkit-scrollbar { display: none; }
        input:focus { outline: none; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ripple { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(2.5);opacity:0} }
        .ripple { animation: ripple 1.5s ease-out infinite; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#000', direction: isAr ? 'rtl' : 'ltr', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ padding: '56px 20px 16px', background: 'linear-gradient(180deg, rgba(10,132,255,0.1) 0%, transparent 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div onClick={() => window.location.href = '/'} style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </div>
              <span style={{ fontSize: 18, fontWeight: 600 }}>{isAr ? 'الاتصال' : 'Dialer'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* SDK status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 12, background: sdkReady ? 'rgba(52,199,89,0.1)' : 'rgba(255,159,10,0.1)', border: `1px solid ${sdkReady ? 'rgba(52,199,89,0.2)' : 'rgba(255,159,10,0.2)'}` }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: sdkReady ? '#34c759' : '#ff9f0a', animation: sdkReady ? 'none' : 'pulse 1.5s infinite' }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: sdkReady ? '#34c759' : '#ff9f0a' }}>
                  {sdkReady ? (isAr ? 'جاهز' : 'Ready') : (isAr ? 'جارٍ الاتصال' : 'Connecting')}
                </span>
              </div>
              <button onClick={() => { const n = isAr ? 'en' : 'ar'; localStorage.setItem('lang', n); setLang(n) }}
                style={{ height: 28, padding: '0 10px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 600, fontFamily: 'inherit' }}>
                {isAr ? 'EN' : 'AR'}
              </button>
            </div>
          </div>

          {/* Tab switcher */}
          {view !== 'active' && (
            <div style={{ display: 'flex', gap: 8, padding: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 16 }}>
              {[
                { id: 'contacts', label: isAr ? 'جهات الاتصال' : 'Contacts' },
                { id: 'dialpad', label: isAr ? 'لوحة الأرقام' : 'Dial Pad' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setView(tab.id as any)}
                  style={{ flex: 1, height: 36, borderRadius: 12, border: 'none', background: view === tab.id ? 'rgba(255,255,255,0.12)' : 'transparent', color: view === tab.id ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', transition: 'all 0.2s' }}>
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div style={{ margin: '0 20px 12px', padding: '12px 16px', borderRadius: 14, background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.2)', fontSize: 13, color: '#ff453a' }}>
            {error}
          </div>
        )}

        {/* CONTACTS VIEW */}
        {view === 'contacts' && (
          <div style={{ flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder={isAr ? 'ابحث عن جهة اتصال...' : 'Search contacts...'}
                style={{ width: '100%', height: 44, borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 15, paddingLeft: 40, paddingRight: 16, fontFamily: 'inherit' }} />
            </div>

            {/* Contact list */}
            <div className="cs" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 24 }}>
              {filteredContacts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
                  {isAr ? 'لا توجد جهات اتصال' : 'No contacts found'}
                </div>
              ) : filteredContacts.map(contact => (
                <div key={contact.id} className="tap"
                  style={{ padding: '14px 16px', borderRadius: 18, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Avatar */}
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #0a84ff, #bf5af2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                    {contact.full_name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{contact.full_name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {contact.company} {contact.phone ? `· ${contact.phone}` : ''}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ padding: '3px 8px', borderRadius: 8, background: stageColor(contact.deal_stage) + '20', fontSize: 10, fontWeight: 700, color: stageColor(contact.deal_stage), textTransform: 'uppercase' }}>
                      {contact.deal_stage || 'lead'}
                    </div>
                    {/* Call button */}
                    {contact.phone ? (
                      <div className="tap" onClick={() => { setSelectedContact(contact); setDialInput(contact.phone); startCall(contact.phone) }}
                        style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(52,199,89,0.15)', border: '1px solid rgba(52,199,89,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      </div>
                    ) : (
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DIAL PAD VIEW */}
        {view === 'dialpad' && (
          <div style={{ flex: 1, padding: '0 20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            {/* Number display */}
            <div style={{ width: '100%', padding: '20px 24px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center', minHeight: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 32, fontWeight: 300, color: dialInput ? '#fff' : 'rgba(255,255,255,0.2)', letterSpacing: 2, fontVariantNumeric: 'tabular-nums' }}>
                {dialInput || (isAr ? 'أدخل الرقم' : 'Enter number')}
              </span>
            </div>

            {/* Dial pad */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, width: '100%', maxWidth: 300 }}>
              {dialPadKeys.map(key => (
                <button key={key} className="tap" onClick={() => setDialInput(d => d + key)}
                  style={{ height: 72, borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 24, fontWeight: 300, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {key}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, width: '100%', maxWidth: 300, justifyContent: 'center' }}>
              {/* Backspace */}
              <button className="tap" onClick={() => setDialInput(d => d.slice(0, -1))}
                style={{ width: 56, height: 56, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>
              </button>

              {/* Call button */}
              <div className="tap" onClick={() => dialInput && startCall(dialInput)}
                style={{ width: 72, height: 72, borderRadius: '50%', background: dialInput ? '#34c759' : 'rgba(52,199,89,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: dialInput ? 'pointer' : 'default', boxShadow: dialInput ? '0 8px 32px rgba(52,199,89,0.3)' : 'none', transition: 'all 0.3s' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>

              {/* Placeholder for symmetry */}
              <div style={{ width: 56, height: 56 }} />
            </div>
          </div>
        )}

        {/* ACTIVE CALL VIEW */}
        {view === 'active' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 20px 48px', animation: 'fadeUp 0.4s ease' }}>

            {/* Contact info */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              {/* Ripple avatar */}
              <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 16px' }}>
                {callState === 'active' && (
                  <>
                    <div className="ripple" style={{ position: 'absolute', inset: -16, borderRadius: '50%', background: 'rgba(52,199,89,0.15)', border: '1px solid rgba(52,199,89,0.2)' }} />
                    <div className="ripple" style={{ position: 'absolute', inset: -8, borderRadius: '50%', background: 'rgba(52,199,89,0.1)', border: '1px solid rgba(52,199,89,0.15)', animationDelay: '0.5s' }} />
                  </>
                )}
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #0a84ff, #bf5af2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 700, color: '#fff', position: 'relative', zIndex: 1 }}>
                  {selectedContact?.full_name?.charAt(0)?.toUpperCase() || '#'}
                </div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 600, color: '#fff', marginBottom: 4, letterSpacing: '-0.3px' }}>
                {selectedContact?.full_name || dialInput || (isAr ? 'رقم غير معروف' : 'Unknown')}
              </div>
              {selectedContact?.company && (
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{selectedContact.company}</div>
              )}
              {/* Status + timer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: callState === 'active' ? '#34c759' : callState === 'connecting' ? '#ff9f0a' : '#ff453a', animation: callState === 'connecting' ? 'pulse 1s infinite' : 'none' }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontVariantNumeric: 'tabular-nums' }}>
                  {callState === 'connecting' ? (isAr ? 'جاري الاتصال...' : 'Connecting...') :
                   callState === 'active' ? formatDuration(callDuration) :
                   callState === 'ended' ? (isAr ? 'انتهت المكالمة' : 'Call ended') : ''}
                </span>
              </div>
            </div>

            {/* Live insights during call */}
            {callState === 'active' && (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {/* Deal health */}
                <div style={{ padding: '14px 16px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{isAr ? 'صحة الصفقة' : 'Deal Health'}</span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: '#34c759' }}>—</span>
                </div>
                {/* Transcript preview */}
                <div style={{ padding: '14px 16px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{isAr ? 'النص المباشر' : 'Live Transcript'}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, minHeight: 40 }}>
                    {transcript || (isAr ? 'جارٍ الاستماع...' : 'Listening...')}
                  </div>
                </div>
                {/* AI tip */}
                <div style={{ padding: '14px 16px', borderRadius: 16, background: 'rgba(52,199,89,0.06)', border: '1px solid rgba(52,199,89,0.15)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#34c759', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    {isAr ? 'نصيحة الذكاء الاصطناعي' : 'AI Coach'}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                    {isAr ? 'استمع أكثر، اسأل عن التوقيت والميزانية في الدقيقة القادمة.' : 'Listen actively. Ask about timeline and budget in the next minute.'}
                  </div>
                </div>
              </div>
            )}

            {/* Call ended message */}
            {callState === 'ended' && (
              <div style={{ padding: '20px', borderRadius: 20, background: 'rgba(52,199,89,0.08)', border: '1px solid rgba(52,199,89,0.2)', textAlign: 'center', marginBottom: 32, width: '100%' }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#34c759', marginBottom: 4 }}>
                  {isAr ? 'انتهت المكالمة' : 'Call Complete'}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                  {isAr ? 'جارٍ إنشاء الملخص...' : 'Generating summary...'}
                </div>
              </div>
            )}

            {/* Call controls */}
            {(callState === 'active' || callState === 'connecting') && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 'auto' }}>
                {/* Mute */}
                <div className="tap" onClick={toggleMute}
                  style={{ width: 60, height: 60, borderRadius: '50%', background: muted ? 'rgba(255,69,58,0.15)' : 'rgba(255,255,255,0.08)', border: `1px solid ${muted ? 'rgba(255,69,58,0.3)' : 'rgba(255,255,255,0.12)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={muted ? '#ff453a' : 'rgba(255,255,255,0.7)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {muted ? <><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></> : <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>}
                  </svg>
                </div>

                {/* End call */}
                <div className="tap" onClick={endCall}
                  style={{ width: 72, height: 72, borderRadius: '50%', background: '#ff3b30', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 32px rgba(255,59,48,0.4)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(135deg)' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>

                {/* Speaker placeholder */}
                <div className="tap"
                  style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}