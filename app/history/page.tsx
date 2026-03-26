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

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return m + ':' + sec
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })

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
        body { background: #000; color: #fff; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; -webkit-font-smoothing: antialiased; }
        .cs::-webkit-scrollbar { width: 4px; }
        .cs::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .card { border-radius: 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); backdrop-filter: blur(40px); }
        .card:hover { background: rgba(255,255,255,0.04); }
        .card-active { background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.15) !important; }
        .nav-btn { transition: all 0.2s; }
        .nav-btn:hover { background: rgba(255,255,255,0.06) !important; color: rgba(255,255,255,0.7) !important; }
        .summary-btn:hover { background: rgba(255,255,255,0.1) !important; color: #fff !important; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#000' }}>

        {/* Spatial mesh */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: '#00e5a0', filter: 'blur(160px)', opacity: 0.05, mixBlendMode: 'screen' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', borderRadius: '50%', background: '#4488ff', filter: 'blur(160px)', opacity: 0.05, mixBlendMode: 'screen' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', height: '100vh', padding: 16, gap: 16 }}>

          {/* Sidebar */}
          <aside style={{ width: 80, borderRadius: 32, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(40px)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: 8, flexShrink: 0 }}>
            <div onClick={() => window.location.href = '/'} style={{ width: 48, height: 48, borderRadius: 16, background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, cursor: 'pointer' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            {[
              { d: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z', active: false, href: '/' },
              { d: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', active: true, href: '/history' },
              { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', active: false, href: '/' },
            ].map((item, i) => (
              <div key={i} onClick={() => window.location.href = item.href} className="nav-btn" style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: item.active ? 'rgba(255,255,255,0.1)' : 'transparent', color: item.active ? '#fff' : 'rgba(255,255,255,0.3)', border: item.active ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.d} />
                </svg>
              </div>
            ))}
          </aside>

          {/* Main */}
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

            {/* Header */}
            <header style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.5px', color: 'rgba(255,255,255,0.9)' }}>DealFlow AI</span>
                <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Call History</span>
              </div>
              <button onClick={() => window.location.href = '/'} style={{ height: 38, padding: '0 20px', borderRadius: 19, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', backdropFilter: 'blur(20px)' }}>
                + New Call
              </button>
            </header>

            {/* Content */}
            <div className="cs" style={{ flex: 1, overflowY: 'auto', padding: '0 8px 24px', display: 'grid', gridTemplateColumns: selected ? '1fr 400px' : '1fr', gap: 16 }}>

              {/* Call list */}
              <div>
                <div style={{ marginBottom: 24, padding: '0 8px' }}>
                  <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.5px', color: 'rgba(255,255,255,0.9)', marginBottom: 4 }}>Your Calls</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>{calls.length} calls recorded</div>
                </div>

                {loading && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, gap: 12, color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
                    <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'rgba(255,255,255,0.6)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                    Loading calls...
                  </div>
                )}

                {!loading && calls.length === 0 && (
                  <div className="card" style={{ padding: '60px 40px', textAlign: 'center', cursor: 'default' }}>
                    <div style={{ fontSize: 48, marginBottom: 20 }}>🎙</div>
                    <div style={{ fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: 8 }}>No calls yet</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 28 }}>Start your first call to see it here</div>
                    <button onClick={() => window.location.href = '/'} style={{ height: 44, padding: '0 28px', borderRadius: 22, border: 'none', background: 'rgba(255,255,255,0.9)', color: '#000', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Start a Call
                    </button>
                  </div>
                )}

                {!loading && calls.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {calls.map((call, idx) => {
                      const isSelected = selected?.id === call.id
                      return (
                        <div
                          key={call.id}
                          className={isSelected ? 'card card-active' : 'card'}
                          onClick={() => setSelected(isSelected ? null : call)}
                          style={{ padding: '20px 24px', cursor: 'pointer', transition: 'all 0.2s', animation: 'fadeUp 0.4s ease both', animationDelay: (idx * 50) + 'ms' }}
                        >
                          {/* Top row */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🎙</div>
                              <div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 3, letterSpacing: '-0.2px' }}>
                                  {call.contact_name}
                                  <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}> · {call.company}</span>
                                </div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{formatDate(call.created_at)}</div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
                              {call.insights?.dealHealthScore && (
                                <div style={{ textAlign: 'center' }}>
                                  <div style={{ fontSize: 18, fontWeight: 600, color: '#ff9f0a', letterSpacing: '-0.5px' }}>{call.insights.dealHealthScore}%</div>
                                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Health</div>
                                </div>
                              )}
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 18, fontWeight: 600, color: '#30d158', letterSpacing: '-0.5px' }}>{formatDuration(call.duration)}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Duration</div>
                              </div>
                              <div style={{ padding: '4px 12px', borderRadius: 10, background: 'rgba(48,209,88,0.1)', border: '1px solid rgba(48,209,88,0.2)', fontSize: 11, fontWeight: 600, color: '#30d158' }}>
                                {call.status}
                              </div>
                            </div>
                          </div>

                          {/* Tags */}
                          {call.insights?.hotTopics && (
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                              {call.insights.hotTopics.slice(0, 4).map((t: string, i: number) => {
                                const c = tagColors[i % tagColors.length]
                                return (
                                  <span key={i} style={{ padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 600, background: c.bg, color: c.color, border: '1px solid ' + c.border }}>
                                    {t}
                                  </span>
                                )
                              })}
                            </div>
                          )}

                          {/* Summary button */}
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                              className="summary-btn"
                              onClick={e => { e.stopPropagation(); window.location.href = '/summary/' + call.id }}
                              style={{ height: 32, padding: '0 16px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
                            >
                              View Summary →
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Detail panel */}
              {selected && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'fadeUp 0.25s ease' }}>

                  {/* Header card */}
                  <div className="card" style={{ padding: 24, position: 'relative' }}>
                    <button
                      onClick={() => setSelected(null)}
                      style={{ position: 'absolute', top: 18, right: 18, width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}
                    >✕</button>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>Call Details</div>
                    <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.3px', marginBottom: 4, color: 'rgba(255,255,255,0.9)', paddingRight: 36 }}>{selected.contact_name}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>{selected.company} · {formatDate(selected.created_at)}</div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {[
                        { label: 'Duration', value: formatDuration(selected.duration), color: '#30d158' },
                        { label: 'Health', value: (selected.insights?.dealHealthScore || 0) + '%', color: '#ff9f0a' },
                        { label: 'Talk', value: (selected.insights?.talkRatio || 0) + '%', color: '#0a84ff' },
                      ].map((s, i) => (
                        <div key={i} style={{ flex: 1, textAlign: 'center', padding: '12px 8px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ fontSize: 20, fontWeight: 600, color: s.color, letterSpacing: '-0.5px', marginBottom: 2 }}>{s.value}</div>
                          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next actions */}
                  {selected.insights?.nextActions && (
                    <div className="card" style={{ padding: 20 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>Next Actions</div>
                      {selected.insights.nextActions.map((a: string, i: number) => (
                        <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < selected.insights.nextActions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems: 'flex-start' }}>
                          <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid ' + (i === 0 ? '#0a84ff' : 'rgba(255,255,255,0.15)'), background: i === 0 ? 'rgba(10,132,255,0.12)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                            {i === 0 && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0a84ff' }} />}
                          </div>
                          <span style={{ fontSize: 13, color: i === 0 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)', fontWeight: i === 0 ? 500 : 400 }}>{a}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Objections */}
                  {selected.insights?.objections && selected.insights.objections.length > 0 && (
                    <div className="card" style={{ padding: 20 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ff453a', marginBottom: 14 }}>Objections</div>
                      {selected.insights.objections.map((o: string, i: number) => (
                        <div key={i} style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255,69,58,0.06)', border: '1px solid rgba(255,69,58,0.12)', fontSize: 13, color: 'rgba(255,180,185,0.85)', marginBottom: 8 }}>{o}</div>
                      ))}
                    </div>
                  )}

                  {/* Transcript */}
                  {selected.transcript && (
                    <div className="card" style={{ padding: 20 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>Transcript</div>
                      <div className="cs" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxHeight: 160, overflowY: 'auto' }}>{selected.transcript}</div>
                    </div>
                  )}

                  {/* View summary button */}
                  <button
                    onClick={() => window.location.href = '/summary/' + selected.id}
                    style={{ width: '100%', height: 48, borderRadius: 24, border: 'none', background: 'rgba(255,255,255,0.9)', color: '#000', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)' }}
                  >
                    View Full Summary →
                  </button>

                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}