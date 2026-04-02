'use client'
import { useState, useEffect } from 'react'
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

export default function MobileHistory() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Call | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'en' | 'ar'
    if (saved) setLang(saved)
    loadCalls()
  }, [])

  const isAr = lang === 'ar'

  const loadCalls = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('calls')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setCalls(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(isAr ? 'ar-AE' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getHealthColor = (score: number) => {
    if (score >= 70) return '#34c759'
    if (score >= 40) return '#ff9f0a'
    return '#ff453a'
  }

  if (selected) {
    const ins = selected.insights || {}
    return (
      <>
        <style>{`* { margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent; } body{font-family:${isAr ? "'Noto Sans Arabic'" : "'DM Sans'"}, -apple-system,sans-serif;background:#000;color:#fff;-webkit-font-smoothing:antialiased;} .tap-btn{transition:transform 0.15s;} .tap-btn:active{transform:scale(0.97);}`}</style>
        
        {/* Detail header */}
        <div style={{ padding: '56px 20px 16px', background: 'rgba(255,255,255,0.02)', direction: isAr ? 'rtl' : 'ltr' }}>
          <button onClick={() => setSelected(null)} className="tap-btn"
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#0a84ff', fontSize: 15, fontWeight: 500, fontFamily: 'inherit', marginBottom: 16, cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">{isAr ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}</svg>
            {isAr ? 'رجوع' : 'Back'}
          </button>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{selected.contact_name || (isAr ? 'مكالمة غير معنونة' : 'Untitled Call')}</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{selected.company} · {formatDate(selected.created_at)}</div>
        </div>

        {/* Stats */}
        <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, direction: isAr ? 'rtl' : 'ltr' }}>
          {[
            { label: isAr ? 'الصحة' : 'Health', value: ins.dealHealthScore > 0 ? `${ins.dealHealthScore}%` : '—', color: ins.dealHealthScore > 0 ? getHealthColor(ins.dealHealthScore) : 'rgba(255,255,255,0.3)' },
            { label: isAr ? 'المدة' : 'Duration', value: formatDuration(selected.duration || 0), color: '#0a84ff' },
            { label: isAr ? 'التدريب' : 'Coaching', value: ins.coachingScore > 0 ? `${ins.coachingScore}` : '—', color: '#bf5af2' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '14px 12px', borderRadius: 16, background: 'rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Buying signals */}
        {ins.buyingSignals?.length > 0 && (
          <div style={{ margin: '0 20px 16px', padding: '16px', borderRadius: 16, background: 'rgba(48,209,88,0.06)', border: '1px solid rgba(48,209,88,0.15)', direction: isAr ? 'rtl' : 'ltr' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#34c759', marginBottom: 10, letterSpacing: '0.1em' }}>{isAr ? 'إشارات الشراء' : 'BUYING SIGNALS'}</div>
            {ins.buyingSignals.slice(0, 3).map((s: string, i: number) => (
              <div key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6, display: 'flex', gap: 8 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="3" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                {s}
              </div>
            ))}
          </div>
        )}

        {/* Transcript */}
        {selected.transcript && (
          <div style={{ margin: '0 20px 16px', padding: '16px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', direction: isAr ? 'rtl' : 'ltr' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 10, letterSpacing: '0.1em' }}>{isAr ? 'النص' : 'TRANSCRIPT'}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxHeight: 160, overflow: 'hidden' }}>{selected.transcript.slice(0, 400)}{selected.transcript.length > 400 ? '...' : ''}</div>
          </div>
        )}

        {/* View full summary */}
        <div style={{ padding: '0 20px 48px' }}>
          <button className="tap-btn" onClick={() => window.location.href = `/summary/${selected.id}`}
            style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit' }}>
            {isAr ? 'عرض الملخص الكامل ←' : 'View Full Summary →'}
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent; }
        body { font-family:${isAr ? "'Noto Sans Arabic'" : "'DM Sans'"}, -apple-system,sans-serif;background:#000;color:#fff;-webkit-font-smoothing:antialiased; }
        .tap-btn{transition:transform 0.15s;} .tap-btn:active{transform:scale(0.97);}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* Header */}
      <div style={{ padding: '56px 20px 20px', direction: isAr ? 'rtl' : 'ltr' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <button onClick={() => window.location.href = '/'} className="tap-btn"
            style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">{isAr ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}</svg>
          </button>
          <button onClick={() => { const next = isAr ? 'en' : 'ar'; localStorage.setItem('lang', next); setLang(next) }}
            style={{ height: 30, padding: '0 12px', borderRadius: 15, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
            {isAr ? 'EN' : 'AR'}
          </button>
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', marginBottom: 4 }}>
          {isAr ? 'سجل المكالمات' : 'Call History'}
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
          {loading ? (isAr ? 'جاري التحميل...' : 'Loading...') : `${calls.length} ${isAr ? 'مكالمات' : 'calls'}`}
        </div>
      </div>

      {/* Calls list */}
      <div style={{ padding: '0 20px 48px', display: 'flex', flexDirection: 'column', gap: 12, direction: isAr ? 'rtl' : 'ltr' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ width: 24, height: 24, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#0a84ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto' }} />
          </div>
        ) : calls.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>📞</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{isAr ? 'لا توجد مكالمات بعد' : 'No calls yet'}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.25)', marginBottom: 24 }}>{isAr ? 'ابدأ مكالمتك الأولى من سطح المكتب' : 'Start your first call from desktop'}</div>
          </div>
        ) : calls.map((call, i) => {
          const ins = call.insights || {}
          const score = ins.dealHealthScore || 0
          return (
            <div key={i} className="tap-btn" onClick={() => setSelected(call)}
              style={{ padding: '18px 20px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{call.contact_name || (isAr ? 'غير معروف' : 'Unknown')}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{call.company || ''}</div>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textAlign: isAr ? 'left' : 'right' }}>{formatDate(call.created_at)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {score > 0 && (
                  <div style={{ padding: '3px 10px', borderRadius: 10, background: getHealthColor(score) + '15', border: `1px solid ${getHealthColor(score)}25` }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: getHealthColor(score) }}>{score}%</span>
                  </div>
                )}
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{formatDuration(call.duration || 0)}</div>
                <div style={{ marginLeft: isAr ? 0 : 'auto', marginRight: isAr ? 'auto' : 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round">
                    {isAr ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 18l6-6-6-6"/>}
                  </svg>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}