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

export default function HistoryPage() {
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Call | null>(null)

  useEffect(() => {
    const fetchCalls = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('calls')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) setCalls(data)
      setLoading(false)
    }
    fetchCalls()
  }, [])

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const card: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 20,
  }

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
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f18' }}>

        {/* Ambient glows */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Sidebar */}
        <div style={{ width: 68, background: 'rgba(15,15,28,0.95)', borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: 8, position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#00e5a0,#4488ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#000', marginBottom: 20, boxShadow: '0 0 20px rgba(0,229,160,0.25)', fontFamily: 'Syne, sans-serif', cursor: 'pointer' }}
            onClick={() => window.location.href = '/'}>DF</div>
          {[
            { icon: '⊞', active: false, href: '/' },
            { icon: '◉', active: true, href: '/history' },
            { icon: '👤', active: false, href: '/' },
            { icon: '▦', active: false, href: '/' },
            { icon: '◎', active: false, href: '/' },
          ].map((item, i) => (
            <div key={i} onClick={() => window.location.href = item.href} style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer', background: item.active ? 'rgba(0,229,160,0.12)' : 'transparent', color: item.active ? '#00e5a0' : 'rgba(255,255,255,0.25)', border: item.active ? '1px solid rgba(0,229,160,0.2)' : '1px solid transparent' }}>
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
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Call History</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => window.location.href = '/'} style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(0,229,160,0.3)', background: 'rgba(0,229,160,0.08)', color: '#00e5a0', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                + New Call
              </button>
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: 24, display: 'grid', gridTemplateColumns: selected ? '1fr 420px' : '1fr', gap: 20 }}>

            {/* Call list */}
            <div>
              <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Your Calls</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{calls.length} calls recorded</div>
                </div>
              </div>

              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, gap: 12, color: 'rgba(255,255,255,0.35)' }}>
                  <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#00e5a0', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Loading calls...
                </div>
              ) : calls.length === 0 ? (
                <div style={{ ...card, textAlign: 'center', padding: 60 }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>🎙</div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No calls yet</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>Start your first call to see it here</div>
                  <button onClick={() => window.location.href = '/'} style={{ padding: '12px 24px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#00e5a0,#00b8ff)', color: '#000', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                    Start a Call
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {calls.map((call, i) => (
                    <div key={call.id}
                      onClick={() => setSelected(selected?.id === call.id ? null : call)}
                      style={{ ...card, cursor: 'pointer', transition: 'all 0.2s', animation: `fadeIn 0.3s ease ${i * 0.05}s both`, border: selected?.id === call.id ? '1px solid rgba(0,229,160,0.3)' : '1px solid rgba(255,255,255,0.08)', background: selected?.id === call.id ? 'rgba(0,229,160,0.06)' : 'rgba(255,255,255,0.04)' }}
                      onMouseEnter={e => { if (selected?.id !== call.id) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.07)' }}
                      onMouseLeave={e => { if (selected?.id !== call.id) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,rgba(0,229,160,0.2),rgba(68,136,255,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🎙</div>
                          <div>
                            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{call.contact_name} <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>| {call.company}</span></div>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{formatDate(call.created_at)}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                          {call.insights?.dealHealthScore && (
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: 18, fontWeight: 800, color: '#ffb020', fontFamily: 'Syne, sans-serif' }}>{call.insights.dealHealthScore}%</div>
                              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Deal Health</div>
                            </div>
                          )}
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 18, fontWeight: 800, color: '#00e5a0', fontFamily: 'Syne, sans-serif' }}>{formatDuration(call.duration)}</div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Duration</div>
                          </div>
                          <div style={{ padding: '4px 10px', borderRadius: 6, background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)', fontSize: 11, fontWeight: 600, color: '#00e5a0' }}>
                            {call.status}
                          </div>
                        </div>
                      </div>

                      {/* Hot topics preview */}
                      {call.insights?.hotTopics && (
                        <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {call.insights.hotTopics.slice(0, 4).map((t: string, i: number) => {
                            const colors = ['#ff2d78', '#ffb020', '#4488ff', '#00e5a0']
                            return <span key={i} style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: `${colors[i % colors.length]}18`, color: colors[i % colors.length], border: `1px solid ${colors[i % colors.length]}30` }}>{t}</span>
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Call detail panel */}
            {selected && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, animation: 'fadeIn 0.25s ease' }}>
                <div style={{ ...card, position: 'relative' }}>
                  <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.5)', fontSize: 13, cursor: 'pointer', padding: '4px 10px', fontFamily: 'DM Sans, sans-serif' }}>✕</button>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>CALL DETAILS</div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{selected.contact_name}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>{selected.company} · {formatDate(selected.created_at)}</div>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ textAlign: 'center', background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.15)', borderRadius: 10, padding: '10px 20px' }}>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: '#00e5a0' }}>{formatDuration(selected.duration)}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Duration</div>
                    </div>
                    {selected.insights?.dealHealthScore && (
                      <div style={{ textAlign: 'center', background: 'rgba(255,176,32,0.08)', border: '1px solid rgba(255,176,32,0.15)', borderRadius: 10, padding: '10px 20px' }}>
                        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: '#ffb020' }}>{selected.insights.dealHealthScore}%</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Deal Health</div>
                      </div>
                    )}
                    {selected.insights?.talkRatio && (
                      <div style={{ textAlign: 'center', background: 'rgba(68,136,255,0.08)', border: '1px solid rgba(68,136,255,0.15)', borderRadius: 10, padding: '10px 20px' }}>
                        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: '#4488ff' }}>{selected.insights.talkRatio}%</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Talk Ratio</div>
                      </div>
                    )}
                  </div>
                </div>

                {selected.insights?.nextActions && (
                  <div style={card}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>NEXT ACTIONS</div>
                    {selected.insights.nextActions.map((a: string, i: number) => (
                      <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 12px', borderRadius: 8, background: i === 0 ? 'rgba(0,229,160,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${i === 0 ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.05)'}`, color: i === 0 ? '#00e5a0' : 'rgba(255,255,255,0.55)', fontSize: 13, marginBottom: 8 }}>
                        <span>{i === 0 ? '⚡' : '○'}</span><span>{a}</span>
                      </div>
                    ))}
                  </div>
                )}

                {selected.insights?.objections && selected.insights.objections.length > 0 && (
                  <div style={card}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#ff4757', marginBottom: 12 }}>OBJECTIONS</div>
                    {selected.insights.objections.map((o: string, i: number) => (
                      <div key={i} style={{ background: 'rgba(255,71,87,0.08)', borderLeft: '2px solid #ff4757', borderRadius: '0 8px 8px 0', padding: '8px 12px', fontSize: 12, color: 'rgba(255,180,185,0.9)', marginBottom: 8 }}>{o}</div>
                    ))}
                  </div>
                )}

                {selected.notes && (
                  <div style={card}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>YOUR NOTES</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{selected.notes}</div>
                  </div>
                )}

                {selected.transcript && (
                  <div style={card}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>TRANSCRIPT</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxHeight: 200, overflowY: 'auto' }}>{selected.transcript}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}