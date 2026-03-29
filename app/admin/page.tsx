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
  profiles?: { full_name: string, email: string }
  call_count?: number
  avg_health?: number
}

interface TeamStats {
  total_calls: number
  total_agents: number
  avg_health: number
  active_agents: number
}

export default function AdminPage() {
  const [hasMounted, setHasMounted] = useState(false)
  const [team, setTeam] = useState<any>(null)
  const [agents, setAgents] = useState<Agent[]>([])
  const [stats, setStats] = useState<TeamStats>({ total_calls: 0, total_agents: 0, avg_health: 0, active_agents: 0 })
  const [loading, setLoading] = useState(true)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviting, setInviting] = useState(false)
  const [inviteSuccess, setInviteSuccess] = useState('')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [creatingTeam, setCreatingTeam] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'settings'>('overview')

  useEffect(() => { setHasMounted(true) }, [])

  useEffect(() => {
    if (!hasMounted) return
    loadData()
  }, [hasMounted])

  const loadData = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      setCurrentUser(user)

      // Get or check team
      const { data: teamData } = await supabase.from('teams').select('*').eq('owner_id', user.id).single()
      if (teamData) {
        setTeam(teamData)
        // Load agents
        const { data: membersData } = await supabase
          .from('team_members')
          .select('*')
          .eq('team_id', teamData.id)

        if (membersData) {
          // Enrich with profile + call stats
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
                avgHealth = Math.round(calls.reduce((acc, c) => acc + (c.insights?.dealHealthScore || 0), 0) / calls.length)
              }
            }
            return { ...m, profiles: profile, call_count: callCount, avg_health: avgHealth }
          }))
          setAgents(enriched)

          // Compute stats
          const active = enriched.filter(a => a.status === 'active').length
          const totalCalls = enriched.reduce((a, b) => a + (b.call_count || 0), 0)
          const avgH = enriched.length > 0 ? Math.round(enriched.reduce((a, b) => a + (b.avg_health || 0), 0) / enriched.length) : 0
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
        // Update profile role
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
      const supabase = createClient()
      // Add to team_members as pending
      await supabase.from('team_members').insert({
        team_id: team.id,
        invited_email: inviteEmail,
        status: 'pending',
        role: 'agent',
      })
      // Add to invites
const { data: invite } = await supabase.from('invites').insert({
  team_id: team.id,
  email: inviteEmail,
}).select().single()

// Send actual email
await fetch('/api/invite', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: inviteEmail,
    teamName: team.name,
    inviterName: currentUser?.email || 'Your team admin',
    inviteToken: invite?.token,
  }),
})

setInviteSuccess(`Invite sent to ${inviteEmail}`)
      setInviteEmail('')
      loadData()
    } catch (err) { console.error(err) }
    setInviting(false)
  }

  const updateAgentFeatures = async (agent: Agent, features: any) => {
    try {
      const supabase = createClient()
      await supabase.from('team_members').update({ features }).eq('id', agent.id)
      setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, features } : a))
      if (selectedAgent?.id === agent.id) setSelectedAgent({ ...agent, features })
    } catch (err) { console.error(err) }
  }

  const updateCallLimit = async (agent: Agent, limit: number) => {
    try {
      const supabase = createClient()
      await supabase.from('team_members').update({ call_limit: limit }).eq('id', agent.id)
      setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, call_limit: limit } : a))
      if (selectedAgent?.id === agent.id) setSelectedAgent({ ...agent, call_limit: limit })
    } catch (err) { console.error(err) }
  }

  const removeAgent = async (agent: Agent) => {
    if (!confirm('Remove this agent from your team?')) return
    try {
      const supabase = createClient()
      await supabase.from('team_members').delete().eq('id', agent.id)
      setAgents(prev => prev.filter(a => a.id !== agent.id))
      if (selectedAgent?.id === agent.id) setSelectedAgent(null)
    } catch (err) { console.error(err) }
  }

  if (!hasMounted) return null

  const stageColor: Record<string, string> = {
    active: '#30d158', pending: '#ff9f0a', inactive: '#ff453a'
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: var(--bg); color: var(--text-primary); font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; -webkit-font-smoothing: antialiased; }
        .cs::-webkit-scrollbar { width: 4px; }
        .cs::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 10px; }
        input:focus, textarea:focus { outline: none; }
        input::placeholder { color: var(--text-dim); }
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .toggle-track { width: 44px; height: 24px; border-radius: 12px; padding: 2px; transition: background 0.3s; cursor: pointer; }
        .toggle-thumb { width: 20px; height: 20px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.3); transition: transform 0.3s; }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* Mesh */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: '#bf5af2', filter: 'blur(160px)', opacity: 0.06 }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', borderRadius: '50%', background: '#0a84ff', filter: 'blur(160px)', opacity: 0.05 }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', height: '100vh', padding: 16, gap: 16 }}>

          {/* Sidebar */}
          <aside style={{ width: 80, borderRadius: 32, background: 'var(--sidebar-bg)', border: '1px solid var(--sidebar-border)', backdropFilter: 'blur(40px)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: 8, flexShrink: 0 }}>
            <div onClick={() => window.location.href = '/'} style={{ width: 48, height: 48, borderRadius: 16, background: 'linear-gradient(135deg, var(--text-dim), var(--divider))', border: '1px solid var(--divider)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, cursor: 'pointer' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            {[
              { icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z', href: '/' },
              { icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', href: '/history' },
              { icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', href: '/contacts' },
            ].map((item, i) => (
              <div key={i} onClick={() => window.location.href = item.href} style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-tertiary)', transition: 'all 0.2s' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
              </div>
            ))}
            {/* Admin icon — active */}
            <div style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(191,90,242,0.15)', color: '#bf5af2', border: '1px solid rgba(191,90,242,0.25)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
          </aside>

          {/* Main */}
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

            {/* Header */}
            <header style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>DealFlow AI</span>
                <div style={{ padding: '4px 12px', borderRadius: 20, background: 'rgba(191,90,242,0.12)', border: '1px solid rgba(191,90,242,0.25)', fontSize: 11, fontWeight: 700, color: '#bf5af2', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin</div>
                {team && <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{team.name}</span>}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {team && (
                  <button onClick={() => setShowInviteModal(true)} style={{ height: 36, padding: '0 18px', borderRadius: 18, border: 'none', background: '#bf5af2', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    + Invite Agent
                  </button>
                )}
                <button onClick={() => window.location.href = '/'} style={{ height: 36, padding: '0 16px', borderRadius: 18, border: '1px solid var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                  ← Dashboard
                </button>
              </div>
            </header>

            {loading ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                <div style={{ width: 18, height: 18, border: '2px solid var(--divider)', borderTopColor: '#bf5af2', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                Loading admin panel...
              </div>
            ) : !team ? (
              /* No team yet — create one */
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 440, borderRadius: 32, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 40, textAlign: 'center', animation: 'fadeUp 0.4s ease' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🏢</div>
                  <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.5px' }}>Create Your Team</div>
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.6 }}>Set up your team workspace to invite agents, track performance, and manage features.</div>
                  <input value={teamName} onChange={e => setTeamName(e.target.value)}
                    placeholder="Team name (e.g. Apex Sales Team)"
                    style={{ width: '100%', padding: '14px 18px', borderRadius: 16, border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit', marginBottom: 14 }} />
                  <button onClick={createTeam} disabled={creatingTeam || !teamName.trim()}
                    style={{ width: '100%', height: 48, borderRadius: 24, border: 'none', background: creatingTeam ? 'var(--input-bg)' : '#bf5af2', color: '#fff', fontSize: 15, fontWeight: 600, cursor: creatingTeam ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
                    {creatingTeam ? 'Creating...' : 'Create Team →'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="cs" style={{ flex: 1, overflowY: 'auto', padding: '0 8px 24px' }}>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: 6, padding: '0 24px', marginBottom: 20 }}>
                  {(['overview', 'agents', 'settings'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      style={{ height: 36, padding: '0 18px', borderRadius: 18, border: '1px solid ' + (activeTab === tab ? 'rgba(191,90,242,0.3)' : 'var(--card-border)'), background: activeTab === tab ? 'rgba(191,90,242,0.12)' : 'transparent', color: activeTab === tab ? '#bf5af2' : 'var(--text-secondary)', fontSize: 13, fontWeight: activeTab === tab ? 600 : 400, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize', transition: 'all 0.2s' }}>
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === 'overview' && (
                  <div style={{ padding: '0 16px', animation: 'fadeUp 0.3s ease' }}>
                    {/* Stat cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
                      {[
                        { label: 'Total Agents', value: stats.total_agents, color: '#bf5af2', icon: '👥' },
                        { label: 'Active Agents', value: stats.active_agents, color: '#30d158', icon: '✅' },
                        { label: 'Total Calls', value: stats.total_calls, color: '#0a84ff', icon: '📞' },
                        { label: 'Avg Deal Health', value: stats.avg_health + '%', color: '#ff9f0a', icon: '📊' },
                      ].map((s, i) => (
                        <div key={i} style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: '22px 24px', position: 'relative', overflow: 'hidden' }}>
                          <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: 80, height: 80, borderRadius: '50%', background: s.color, filter: 'blur(30px)', opacity: 0.15, pointerEvents: 'none' }} />
                          <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                          <div style={{ fontSize: 32, fontWeight: 700, color: s.color, letterSpacing: '-1px', marginBottom: 4 }}>{s.value}</div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Agents table */}
                    <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16 }}>Team Overview</div>
                      {agents.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-dim)', fontSize: 14 }}>
                          No agents yet — invite your first agent above
                        </div>
                      ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr>
                              {['Agent', 'Status', 'Calls', 'Avg Health', 'Call Limit', 'Features', 'Actions'].map(h => (
                                <th key={h} style={{ textAlign: 'left', fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase', paddingBottom: 12, borderBottom: '1px solid var(--divider)' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {agents.map((agent, i) => (
                              <tr key={agent.id} style={{ borderBottom: i < agents.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                                <td style={{ padding: '14px 0' }}>
                                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{agent.profiles?.full_name || agent.invited_email}</div>
                                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{agent.invited_email}</div>
                                </td>
                                <td style={{ padding: '14px 12px' }}>
                                  <span style={{ padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 600, background: stageColor[agent.status] + '20', color: stageColor[agent.status], textTransform: 'capitalize' }}>{agent.status}</span>
                                </td>
                                <td style={{ padding: '14px 12px', fontSize: 14, color: 'var(--text-primary)', fontWeight: 600 }}>{agent.call_count || 0}</td>
                                <td style={{ padding: '14px 12px', fontSize: 14, color: '#ff9f0a', fontWeight: 600 }}>{agent.avg_health || 0}%</td>
                                <td style={{ padding: '14px 12px' }}>
                                  <input type="number" value={agent.call_limit}
                                    onChange={e => updateCallLimit(agent, parseInt(e.target.value))}
                                    style={{ width: 70, padding: '5px 8px', borderRadius: 8, border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--text-primary)', fontSize: 13, fontFamily: 'inherit' }} />
                                </td>
                                <td style={{ padding: '14px 12px' }}>
                                  <div style={{ display: 'flex', gap: 6 }}>
                                    {[
                                      { key: 'brief', label: 'Brief', color: '#0a84ff' },
                                      { key: 'arabic', label: 'AR', color: '#ff9f0a' },
                                      { key: 'followup', label: 'Follow-up', color: '#30d158' },
                                    ].map(f => (
                                      <span key={f.key}
                                        onClick={() => updateAgentFeatures(agent, { ...agent.features, [f.key]: !agent.features?.[f.key as keyof typeof agent.features] })}
                                        style={{ padding: '3px 8px', borderRadius: 8, fontSize: 10, fontWeight: 600, cursor: 'pointer', background: agent.features?.[f.key as keyof typeof agent.features] ? f.color + '20' : 'var(--input-bg)', color: agent.features?.[f.key as keyof typeof agent.features] ? f.color : 'var(--text-dim)', border: '1px solid ' + (agent.features?.[f.key as keyof typeof agent.features] ? f.color + '40' : 'transparent'), transition: 'all 0.2s', userSelect: 'none' }}>
                                        {f.label}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td style={{ padding: '14px 0' }}>
                                  <div style={{ display: 'flex', gap: 6 }}>
                                    <button onClick={() => setSelectedAgent(agent)}
                                      style={{ height: 28, padding: '0 12px', borderRadius: 14, border: '1px solid var(--card-border)', background: 'var(--input-bg)', color: 'var(--text-secondary)', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>
                                      Manage
                                    </button>
                                    <button onClick={() => removeAgent(agent)}
                                      style={{ height: 28, width: 28, borderRadius: 14, border: '1px solid rgba(255,69,58,0.2)', background: 'rgba(255,69,58,0.08)', color: '#ff453a', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                                      ✕
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'agents' && (
                  <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: selectedAgent ? '1fr 380px' : '1fr', gap: 16, animation: 'fadeUp 0.3s ease' }}>
                    {/* Agents list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {agents.length === 0 ? (
                        <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', padding: 40, textAlign: 'center', color: 'var(--text-dim)', fontSize: 14 }}>
                          No agents yet — invite your first agent
                        </div>
                      ) : agents.map(agent => (
                        <div key={agent.id} onClick={() => setSelectedAgent(agent)}
                          style={{ borderRadius: 24, background: selectedAgent?.id === agent.id ? 'rgba(191,90,242,0.08)' : 'var(--card-bg)', border: '1px solid ' + (selectedAgent?.id === agent.id ? 'rgba(191,90,242,0.3)' : 'var(--card-border)'), backdropFilter: 'blur(40px)', padding: '18px 22px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 16 }}>
                          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #bf5af2, #0a84ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                            {(agent.profiles?.full_name || agent.invited_email || '?')[0].toUpperCase()}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{agent.profiles?.full_name || 'Pending...'}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{agent.invited_email}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 20, fontWeight: 700, color: '#ff9f0a', letterSpacing: '-0.5px' }}>{agent.avg_health || 0}%</div>
                            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{agent.call_count || 0} calls</div>
                          </div>
                          <span style={{ padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 600, background: stageColor[agent.status] + '20', color: stageColor[agent.status], textTransform: 'capitalize', flexShrink: 0 }}>{agent.status}</span>
                        </div>
                      ))}
                    </div>

                    {/* Agent detail panel */}
                    {selectedAgent && (
                      <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 24, height: 'fit-content', position: 'sticky', top: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#bf5af2' }}>Agent Settings</div>
                          <button onClick={() => setSelectedAgent(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 16 }}>✕</button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22, paddingBottom: 20, borderBottom: '1px solid var(--divider)' }}>
                          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #bf5af2, #0a84ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff' }}>
                            {(selectedAgent.profiles?.full_name || selectedAgent.invited_email || '?')[0].toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{selectedAgent.profiles?.full_name || 'Pending'}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{selectedAgent.invited_email}</div>
                          </div>
                        </div>

                        {/* Call limit */}
                        <div style={{ marginBottom: 20 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Monthly Call Limit</div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            {[50, 100, 200, 500].map(n => (
                              <button key={n} onClick={() => updateCallLimit(selectedAgent, n)}
                                style={{ flex: 1, height: 36, borderRadius: 10, border: '1px solid ' + (selectedAgent.call_limit === n ? 'rgba(191,90,242,0.4)' : 'var(--card-border)'), background: selectedAgent.call_limit === n ? 'rgba(191,90,242,0.12)' : 'var(--input-bg)', color: selectedAgent.call_limit === n ? '#bf5af2' : 'var(--text-secondary)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Features */}
                        <div style={{ marginBottom: 20 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Features</div>
                          {[
                            { key: 'brief', label: 'Pre-Call Brief', desc: 'AI briefing before each call', color: '#0a84ff' },
                            { key: 'arabic', label: 'Arabic Mode', desc: 'RTL + Arabic transcription', color: '#ff9f0a' },
                            { key: 'followup', label: 'Follow-up Generator', desc: 'WhatsApp & email drafts', color: '#30d158' },
                          ].map(f => {
                            const enabled = selectedAgent.features?.[f.key as keyof typeof selectedAgent.features]
                            return (
                              <div key={f.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--divider)' }}>
                                <div>
                                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{f.label}</div>
                                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{f.desc}</div>
                                </div>
                                <div className="toggle-track"
                                  style={{ background: enabled ? f.color : 'rgba(255,255,255,0.1)' }}
                                  onClick={() => updateAgentFeatures(selectedAgent, { ...selectedAgent.features, [f.key]: !enabled })}>
                                  <div className="toggle-thumb" style={{ transform: enabled ? 'translateX(20px)' : 'translateX(0)' }} />
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                          {[
                            { label: 'Total Calls', value: selectedAgent.call_count || 0, color: '#0a84ff' },
                            { label: 'Avg Health', value: (selectedAgent.avg_health || 0) + '%', color: '#ff9f0a' },
                          ].map((s, i) => (
                            <div key={i} style={{ borderRadius: 14, background: 'var(--input-bg)', border: '1px solid var(--divider)', padding: '12px 14px' }}>
                              <div style={{ fontSize: 22, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</div>
                              <div style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{s.label}</div>
                            </div>
                          ))}
                        </div>

                        <button onClick={() => removeAgent(selectedAgent)}
                          style={{ width: '100%', height: 40, borderRadius: 20, border: '1px solid rgba(255,69,58,0.2)', background: 'rgba(255,69,58,0.08)', color: '#ff453a', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                          Remove from Team
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div style={{ padding: '0 16px', maxWidth: 600, animation: 'fadeUp 0.3s ease' }}>
                    <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 28 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 20 }}>Team Settings</div>
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Team Name</div>
                        <input defaultValue={team.name}
                          style={{ width: '100%', padding: '12px 16px', borderRadius: 14, border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit' }} />
                      </div>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Plan</div>
                        <div style={{ padding: '12px 16px', borderRadius: 14, border: '1px solid rgba(191,90,242,0.3)', background: 'rgba(191,90,242,0.08)', fontSize: 14, color: '#bf5af2', fontWeight: 600, textTransform: 'capitalize' }}>{team.plan}</div>
                      </div>
                      <div style={{ padding: '14px 16px', borderRadius: 14, background: 'var(--input-bg)', border: '1px solid var(--divider)', fontSize: 12, color: 'var(--text-secondary)' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Team ID</div>
                        <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-tertiary)' }}>{team.id}</div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}
          </main>
        </div>

        {/* Invite Modal */}
        {showInviteModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 420, borderRadius: 32, background: 'var(--dropdown-bg)', border: '1px solid var(--card-border)', padding: 32, animation: 'fadeUp 0.3s ease' }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.3px' }}>Invite Agent</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 22 }}>They'll receive an invitation to join your team.</div>
              <input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)}
                placeholder="agent@company.com"
                type="email"
                style={{ width: '100%', padding: '13px 16px', borderRadius: 16, border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit', marginBottom: 12 }} />
              {inviteSuccess && <div style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(48,209,88,0.08)', border: '1px solid rgba(48,209,88,0.2)', fontSize: 13, color: '#30d158', marginBottom: 12 }}>✓ {inviteSuccess}</div>}
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={inviteAgent} disabled={inviting || !inviteEmail.trim()}
                  style={{ flex: 1, height: 46, borderRadius: 23, border: 'none', background: inviting ? 'var(--input-bg)' : '#bf5af2', color: '#fff', fontSize: 14, fontWeight: 600, cursor: inviting ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
                  {inviting ? 'Sending...' : 'Send Invite'}
                </button>
                <button onClick={() => { setShowInviteModal(false); setInviteSuccess(''); setInviteEmail('') }}
                  style={{ height: 46, padding: '0 20px', borderRadius: 23, border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}