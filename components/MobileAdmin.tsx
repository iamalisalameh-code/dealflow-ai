'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface Agent {
  id: string
  user_id: string
  invited_email: string
  status: string
  role: string
  call_limit: number
  features: { brief: boolean, arabic: boolean, followup: boolean }
  joined_at: string
  profiles?: { full_name: string }
  call_count?: number
  avg_health?: number
}

interface TeamStats {
  total_calls: number
  total_agents: number
  avg_health: number
  active_agents: number
}

export default function MobileAdmin() {
  const [mounted, setMounted] = useState(false)
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [team, setTeam] = useState<any>(null)
  const [agents, setAgents] = useState<Agent[]>([])
  const [stats, setStats] = useState<TeamStats>({ total_calls: 0, total_agents: 0, avg_health: 0, active_agents: 0 })
  const [loading, setLoading] = useState(true)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviting, setInviting] = useState(false)
  const [inviteSuccess, setInviteSuccess] = useState('')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [teamName, setTeamName] = useState('')
  const [creatingTeam, setCreatingTeam] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'settings'>('overview')

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem('lang') as 'en' | 'ar'
    if (savedLang) setLang(savedLang)
    loadData()
  }, [])

  const isAr = lang === 'ar'
  const l = (en: string, ar: string) => isAr ? ar : en

  const loadData = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }

      const { data: teamData } = await supabase.from('teams').select('*').eq('owner_id', user.id).single()
      if (teamData) {
        setTeam(teamData)
        const { data: membersData } = await supabase.from('team_members').select('*').eq('team_id', teamData.id)
        if (membersData) {
          const enriched = await Promise.all(membersData.map(async (m) => {
            let profile = null
            let callCount = 0
            let avgHealth = 0
            if (m.user_id) {
              const { data: p } = await supabase.from('profiles').select('full_name').eq('id', m.user_id).single()
              profile = p
              const { data: calls } = await supabase.from('calls').select('insights').eq('user_id', m.user_id)
              if (calls?.length) {
                callCount = calls.length
                avgHealth = Math.round(calls.reduce((acc: number, c: any) => acc + (c.insights?.dealHealthScore || 0), 0) / calls.length)
              }
            }
            return { ...m, profiles: profile, call_count: callCount, avg_health: avgHealth }
          }))
          setAgents(enriched)
          const active = enriched.filter(a => a.status === 'active').length
          const totalCalls = enriched.reduce((a: number, b: any) => a + (b.call_count || 0), 0)
          const avgH = enriched.length > 0 ? Math.round(enriched.reduce((a: number, b: any) => a + (b.avg_health || 0), 0) / enriched.length) : 0
          setStats({ total_calls: totalCalls, total_agents: enriched.length, avg_health: avgH, active_agents: active })
        }
      }
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const createTeam = async () => {
    if (!teamName.trim()) return
    setCreatingTeam(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('teams').insert({ name: teamName, owner_id: user.id }).select().single()
      if (data) {
        setTeam(data)
        await supabase.from('profiles').update({ role: 'admin' }).eq('id', user.id)
      }
    } catch (err) { console.error(err) }
    setCreatingTeam(false)
  }

  const inviteAgent = async () => {
    if (!inviteEmail.trim() || !team) return
    setInviting(true)
    setInviteSuccess('')
    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, teamId: team.id, teamName: team.name }),
      })
      const data = await res.json()
      if (!data.error) {
        setInviteSuccess(inviteEmail)
        setInviteEmail('')
      }
    } catch (err) { console.error(err) }
    setInviting(false)
  }

  const updateAgent = async (agentId: string, updates: Partial<Agent>) => {
    try {
      const supabase = createClient()
      await supabase.from('team_members').update(updates).eq('id', agentId)
      setAgents(prev => prev.map(a => a.id === agentId ? { ...a, ...updates } : a))
      if (selectedAgent?.id === agentId) setSelectedAgent(prev => prev ? { ...prev, ...updates } : prev)
    } catch (err) { console.error(err) }
  }

  if (!mounted) return null

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 48, padding: '0 16px', borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)',
    color: '#fff', fontSize: 15, fontFamily: 'inherit', outline: 'none',
  }

  const tabs = [
    { id: 'overview', label: l('Overview', 'نظرة عامة') },
    { id: 'agents', label: l('Agents', 'الوكلاء') },
    { id: 'settings', label: l('Settings', 'الإعدادات') },
  ]

  // Agent detail view
  if (selectedAgent) return (
    <>
      <style>{`* {margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} body{font-family:${isAr ? "'Noto Sans Arabic'" : "'DM Sans'"}, sans-serif;background:#000;color:#fff;-webkit-font-smoothing:antialiased;} .tap-btn{transition:transform 0.15s;} .tap-btn:active{transform:scale(0.97);} @keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ direction: isAr ? 'rtl' : 'ltr', paddingBottom: 40 }}>
        <div style={{ padding: '52px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => setSelectedAgent(null)} className="tap-btn"
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#0a84ff', fontSize: 15, fontWeight: 500, fontFamily: 'inherit', marginBottom: 20, cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">{isAr ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}</svg>
            {l('Back', 'رجوع')}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: selectedAgent.status === 'active' ? 'linear-gradient(135deg, #0a84ff, #34c759)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700 }}>
              {(selectedAgent.profiles?.full_name || selectedAgent.invited_email)?.[0]?.toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{selectedAgent.profiles?.full_name || selectedAgent.invited_email}</div>
              <div style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 8, background: selectedAgent.status === 'active' ? 'rgba(52,199,89,0.15)' : 'rgba(255,159,10,0.15)', border: `1px solid ${selectedAgent.status === 'active' ? 'rgba(52,199,89,0.3)' : 'rgba(255,159,10,0.3)'}` }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: selectedAgent.status === 'active' ? '#34c759' : '#ff9f0a' }}>{selectedAgent.status}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: l('Calls', 'مكالمات'), value: selectedAgent.call_count || 0, color: '#0a84ff' },
              { label: l('Avg Health', 'متوسط الصحة'), value: `${selectedAgent.avg_health || 0}%`, color: '#34c759' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '14px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: s.color, letterSpacing: '-1px' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Call limit */}
          <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{l('Call Limit / Month', 'حد المكالمات / شهر')}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
              {[25, 50, 100, 999].map(limit => (
                <button key={limit} onClick={() => updateAgent(selectedAgent.id, { call_limit: limit })}
                  style={{ height: 44, borderRadius: 12, border: `1px solid ${selectedAgent.call_limit === limit ? 'rgba(10,132,255,0.4)' : 'rgba(255,255,255,0.08)'}`, background: selectedAgent.call_limit === limit ? 'rgba(10,132,255,0.15)' : 'rgba(255,255,255,0.04)', color: selectedAgent.call_limit === limit ? '#0a84ff' : 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
                  {limit === 999 ? '∞' : limit}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{l('Feature Access', 'صلاحيات الميزات')}</div>
            {[
              { key: 'brief', label: l('Pre-call Brief', 'ملخص ما قبل المكالمة') },
              { key: 'arabic', label: l('Arabic Support', 'دعم اللغة العربية') },
              { key: 'followup', label: l('Follow-up Generator', 'مولد المتابعة') },
            ].map(feat => (
              <div key={feat.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: 14, color: '#fff' }}>{feat.label}</span>
                <button onClick={() => updateAgent(selectedAgent.id, { features: { ...selectedAgent.features, [feat.key]: !selectedAgent.features?.[feat.key as keyof typeof selectedAgent.features] } })}
                  style={{ width: 44, height: 26, borderRadius: 13, border: 'none', background: selectedAgent.features?.[feat.key as keyof typeof selectedAgent.features] ? '#34c759' : 'rgba(255,255,255,0.15)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                  <div style={{ position: 'absolute', top: 3, left: selectedAgent.features?.[feat.key as keyof typeof selectedAgent.features] ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                </button>
              </div>
            ))}
          </div>

          {/* Role */}
          <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{l('Role', 'الدور')}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['agent', 'manager'].map(role => (
                <button key={role} onClick={() => updateAgent(selectedAgent.id, { role })}
                  style={{ flex: 1, height: 44, borderRadius: 12, border: `1px solid ${selectedAgent.role === role ? 'rgba(191,90,242,0.4)' : 'rgba(255,255,255,0.08)'}`, background: selectedAgent.role === role ? 'rgba(191,90,242,0.15)' : 'rgba(255,255,255,0.04)', color: selectedAgent.role === role ? '#bf5af2' : 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', textTransform: 'capitalize' }}>
                  {isAr ? (role === 'agent' ? 'وكيل' : 'مدير') : role}
                </button>
              ))}
            </div>
          </div>

          {/* Remove agent */}
          <button className="tap-btn" onClick={async () => {
            const supabase = createClient()
            await supabase.from('team_members').delete().eq('id', selectedAgent.id)
            setAgents(prev => prev.filter(a => a.id !== selectedAgent.id))
            setSelectedAgent(null)
          }} style={{ height: 48, borderRadius: 24, border: '1px solid rgba(255,69,58,0.2)', background: 'rgba(255,69,58,0.06)', color: '#ff453a', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer' }}>
            {l('Remove from Team', 'إزالة من الفريق')}
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
* {margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
body{background:#000;color:#fff;-webkit-font-smoothing:antialiased;}
input::placeholder{color:rgba(255,255,255,0.3);}
.tap-btn{transition:transform 0.15s;} .tap-btn:active{transform:scale(0.97);}
@keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Noto Sans Arabic', sans-serif" : "'DM Sans', sans-serif", paddingBottom: 40 }}>

        {/* Header */}
        <div style={{ padding: '52px 20px 16px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => window.location.href = '/'} className="tap-btn"
                style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">{isAr ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}</svg>
              </button>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{l('Admin Panel', 'لوحة الإدارة')}</div>
            </div>
            <button onClick={() => { const next = isAr ? 'en' : 'ar'; localStorage.setItem('lang', next); setLang(next) }}
              style={{ height: 30, padding: '0 12px', borderRadius: 15, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
              {isAr ? 'EN' : 'AR'}
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                style={{ height: 34, padding: '0 16px', borderRadius: 17, border: `1px solid ${activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`, background: activeTab === tab.id ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400, fontFamily: 'inherit', cursor: 'pointer' }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 10, color: 'rgba(255,255,255,0.4)' }}>
            <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#0a84ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
          </div>
        ) : !team ? (
          // No team yet
          <div style={{ padding: '40px 20px' }}>
            <div style={{ borderRadius: 24, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>👥</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{l('Create your team', 'أنشئ فريقك')}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 24, lineHeight: 1.5 }}>{l('Set up your team to invite agents and track performance.', 'أنشئ فريقك لدعوة الوكلاء ومتابعة الأداء.')}</div>
              <input style={{ ...inputStyle, marginBottom: 12, textAlign: 'center' }} value={teamName} onChange={e => setTeamName(e.target.value)} placeholder={l('Team name', 'اسم الفريق')} />
              <button onClick={createTeam} disabled={creatingTeam || !teamName.trim()} className="tap-btn"
                style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {creatingTeam ? <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> : null}
                {l('Create Team', 'إنشاء الفريق')}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ padding: '16px 20px' }}>

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Team name */}
                <div style={{ padding: '16px 20px', borderRadius: 20, background: 'rgba(10,132,255,0.06)', border: '1px solid rgba(10,132,255,0.15)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(10,132,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{l('Team', 'الفريق')}</div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{team.name}</div>
                  </div>
                </div>

                {/* Stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { label: l('Total Agents', 'إجمالي الوكلاء'), value: stats.total_agents, color: '#0a84ff' },
                    { label: l('Active', 'نشط'), value: stats.active_agents, color: '#34c759' },
                    { label: l('Total Calls', 'إجمالي المكالمات'), value: stats.total_calls, color: '#bf5af2' },
                    { label: l('Avg Health', 'متوسط الصحة'), value: `${stats.avg_health}%`, color: '#ff9f0a' },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: '16px', borderRadius: 18, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                      <div style={{ fontSize: 32, fontWeight: 700, color: s.color, letterSpacing: '-1px', lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent agents */}
                {agents.length > 0 && (
                  <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '16px 20px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{l('Agents', 'الوكلاء')}</div>
                    {agents.slice(0, 3).map((agent, i) => (
                      <div key={i} onClick={() => { setSelectedAgent(agent); setActiveTab('agents') }}
                        style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12, marginBottom: 12, borderBottom: i < Math.min(agents.length, 3) - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', cursor: 'pointer' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: agent.status === 'active' ? 'rgba(52,199,89,0.2)' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                          {(agent.profiles?.full_name || agent.invited_email)?.[0]?.toUpperCase()}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agent.profiles?.full_name || agent.invited_email}</div>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{agent.call_count || 0} {l('calls', 'مكالمات')}</div>
                        </div>
                        <div style={{ padding: '2px 8px', borderRadius: 8, background: agent.status === 'active' ? 'rgba(52,199,89,0.15)' : 'rgba(255,159,10,0.15)', fontSize: 11, fontWeight: 700, color: agent.status === 'active' ? '#34c759' : '#ff9f0a' }}>
                          {agent.status}
                        </div>
                      </div>
                    ))}
                    {agents.length > 3 && (
                      <button onClick={() => setActiveTab('agents')} style={{ width: '100%', height: 36, borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer' }}>
                        {l(`View all ${agents.length} agents`, `عرض جميع ${agents.length} وكلاء`)}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* AGENTS TAB */}
            {activeTab === 'agents' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Invite */}
                <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '18px 20px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{l('Invite Agent', 'دعوة وكيل')}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input style={{ ...inputStyle, flex: 1 }} type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder={l('Email address', 'البريد الإلكتروني')} />
                    <button onClick={inviteAgent} disabled={inviting || !inviteEmail.trim()} className="tap-btn"
                      style={{ height: 48, padding: '0 16px', borderRadius: 24, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', flexShrink: 0, cursor: 'pointer' }}>
                      {inviting ? '...' : l('Invite', 'دعوة')}
                    </button>
                  </div>
                  {inviteSuccess && <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 10, background: 'rgba(52,199,89,0.1)', border: '1px solid rgba(52,199,89,0.2)', fontSize: 13, color: '#34c759' }}>✓ {l(`Invite sent to ${inviteSuccess}`, `تم إرسال الدعوة إلى ${inviteSuccess}`)}</div>}
                </div>

                {/* Agents list */}
                {agents.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>{l('No agents yet. Invite your first agent.', 'لا يوجد وكلاء بعد. ادعُ وكيلك الأول.')}</div>
                ) : agents.map((agent, i) => (
                  <div key={i} className="tap-btn" onClick={() => setSelectedAgent(agent)}
                    style={{ padding: '16px 20px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: agent.status === 'active' ? 'linear-gradient(135deg, #0a84ff40, #34c75940)' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, flexShrink: 0 }}>
                      {(agent.profiles?.full_name || agent.invited_email)?.[0]?.toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agent.profiles?.full_name || agent.invited_email}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{agent.call_count || 0} {l('calls', 'مكالمات')} · {l('Health', 'صحة')} {agent.avg_health || 0}%</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      <div style={{ padding: '2px 8px', borderRadius: 8, background: agent.status === 'active' ? 'rgba(52,199,89,0.15)' : 'rgba(255,159,10,0.15)', fontSize: 10, fontWeight: 700, color: agent.status === 'active' ? '#34c759' : '#ff9f0a' }}>{agent.status}</div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round">{isAr ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 18l6-6-6-6"/>}</svg>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '18px 20px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{l('Team Name', 'اسم الفريق')}</div>
                  <input style={inputStyle} defaultValue={team.name} onBlur={async (e) => {
                    if (e.target.value.trim() && e.target.value !== team.name) {
                      const supabase = createClient()
                      await supabase.from('teams').update({ name: e.target.value }).eq('id', team.id)
                      setTeam({ ...team, name: e.target.value })
                    }
                  }} />
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>{l('Changes save automatically on blur', 'يتم الحفظ تلقائياً')}</div>
                </div>

                <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '18px 20px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{l('Team Info', 'معلومات الفريق')}</div>
                  {[
                    { label: l('Team ID', 'رقم الفريق'), value: team.id?.slice(0, 8) + '...' },
                    { label: l('Total Members', 'إجمالي الأعضاء'), value: String(agents.length) },
                    { label: l('Active Members', 'الأعضاء النشطون'), value: String(stats.active_agents) },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{item.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}