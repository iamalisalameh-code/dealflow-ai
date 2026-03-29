'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { CheckCircleIcon, XCircleIcon, ClockIcon, MicIcon, BarChartIcon, MessageIcon } from '@/components/Icons'

function JoinPageContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [step, setStep] = useState<'loading' | 'invalid' | 'expired' | 'already_used' | 'preview' | 'auth' | 'joining' | 'success'>('loading')
  const [invite, setInvite] = useState<any>(null)
  const [team, setTeam] = useState<any>(null)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  useEffect(() => {
    if (!token) { setStep('invalid'); return }
    loadInvite()
  }, [token])

  const loadInvite = async () => {
    try {
      const supabase = createClient()

      // Load invite
      const { data: inviteData, error } = await supabase
        .from('invites')
        .select('*, teams(*)')
        .eq('token', token)
        .single()

      if (error || !inviteData) { setStep('invalid'); return }
      if (inviteData.accepted) { setStep('already_used'); return }
      if (new Date(inviteData.expires_at) < new Date()) { setStep('expired'); return }

      setInvite(inviteData)
      setTeam(inviteData.teams)
      setEmail(inviteData.email || '')

      // Check if already logged in
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setStep('joining')
        await acceptInvite(user.id, inviteData)
      } else {
        setStep('preview')
      }
    } catch (err) {
      console.error(err)
      setStep('invalid')
    }
  }

  const acceptInvite = async (userId: string, inviteData: any) => {
    try {
      const supabase = createClient()

      // Update team_member status
      await supabase.from('team_members')
        .update({ user_id: userId, status: 'active' })
        .eq('team_id', inviteData.team_id)
        .eq('invited_email', inviteData.email)

      // Mark invite as accepted
      await supabase.from('invites')
        .update({ accepted: true })
        .eq('token', token)

      // Update user profile role
      await supabase.from('profiles')
        .upsert({ id: userId, role: 'agent' })

      setStep('success')
      setTimeout(() => { window.location.href = '/' }, 2500)
    } catch (err) {
      console.error(err)
      setStep('invalid')
    }
  }

  const handleAuth = async () => {
    setAuthError('')
    setAuthLoading(true)
    try {
      const supabase = createClient()

      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } }
        })
        if (error) { setAuthError(error.message); setAuthLoading(false); return }
        if (data.user) {
          // Create profile
          await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: fullName,
            role: 'agent',
          })
          setStep('joining')
          await acceptInvite(data.user.id, invite)
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) { setAuthError(error.message); setAuthLoading(false); return }
        if (data.user) {
          setStep('joining')
          await acceptInvite(data.user.id, invite)
        }
      }
    } catch (err: any) {
      setAuthError(err.message || 'Something went wrong')
    }
    setAuthLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px', borderRadius: 14,
    border: '1px solid var(--input-border)', background: 'var(--input-bg)',
    color: 'var(--text-primary)', fontSize: 15, fontFamily: 'inherit',
    outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: var(--bg); color: var(--text-primary); font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; -webkit-font-smoothing: antialiased; }
        input::placeholder { color: var(--text-dim); }
        input:focus { outline: none; border-color: rgba(255,255,255,0.25) !important; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative' }}>

        {/* Mesh */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '70%', height: '70%', borderRadius: '50%', background: '#bf5af2', filter: 'blur(160px)', opacity: 0.06 }} />
          <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: '#0a84ff', filter: 'blur(160px)', opacity: 0.05 }} />
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, position: 'relative', zIndex: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 13, background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>DealFlow AI</span>
        </div>

        <div style={{ width: '100%', maxWidth: 480, position: 'relative', zIndex: 10 }}>

          {/* LOADING */}
          {step === 'loading' && (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{ width: 20, height: 20, border: '2px solid var(--divider)', borderTopColor: '#bf5af2', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
              Verifying your invitation...
            </div>
          )}

          {/* JOINING */}
          {step === 'joining' && (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 20, height: 20, border: '2px solid var(--divider)', borderTopColor: '#bf5af2', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
              <span>Joining the team...</span>
            </div>
          )}

          {/* SUCCESS */}
          {step === 'success' && (
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 32, padding: '40px 36px', backdropFilter: 'blur(40px)', textAlign: 'center', animation: 'fadeUp 0.4s ease' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(48,209,88,0.1)', border: '2px solid rgba(48,209,88,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', animation: 'float 3s ease-in-out infinite' }}>
                <CheckCircleIcon size={40} color="#30d158" />
              </div>
              <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: 8 }}>You're in!</div>
              <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
                Welcome to <strong style={{ color: 'var(--text-primary)' }}>{team?.name}</strong>. Your account is ready.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--text-tertiary)', fontSize: 13 }}>
                <div style={{ width: 14, height: 14, border: '2px solid var(--divider)', borderTopColor: '#30d158', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                Redirecting to dashboard...
              </div>
            </div>
          )}

          {/* INVALID */}
          {step === 'invalid' && (
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 32, padding: '40px 36px', backdropFilter: 'blur(40px)', textAlign: 'center', animation: 'fadeUp 0.4s ease' }}>
              <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,69,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <XCircleIcon size={36} color="#ff453a" />
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>Invalid Invitation</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>This invitation link is invalid or doesn't exist. Please ask your team admin to send a new invite.</div>
              <button onClick={() => window.location.href = '/'} style={{ height: 44, padding: '0 24px', borderRadius: 22, border: '1px solid var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                Go to Dashboard
              </button>
            </div>
          )}

          {/* EXPIRED */}
          {step === 'expired' && (
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 32, padding: '40px 36px', backdropFilter: 'blur(40px)', textAlign: 'center', animation: 'fadeUp 0.4s ease' }}>
              <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,159,10,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <ClockIcon size={36} color="#ff9f0a" />
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>Invitation Expired</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>This invitation has expired (invites are valid for 7 days). Please ask your team admin to send a new invite.</div>
              <button onClick={() => window.location.href = '/'} style={{ height: 44, padding: '0 24px', borderRadius: 22, border: '1px solid var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                Go to Dashboard
              </button>
            </div>
          )}

          {/* ALREADY USED */}
          {step === 'already_used' && (
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 32, padding: '40px 36px', backdropFilter: 'blur(40px)', textAlign: 'center', animation: 'fadeUp 0.4s ease' }}>
              <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(48,209,88,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircleIcon size={36} color="#30d158" />
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>Already Accepted</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>This invitation has already been used. You're already part of the team!</div>
              <button onClick={() => window.location.href = '/'} style={{ height: 44, padding: '0 24px', borderRadius: 22, border: 'none', background: 'var(--text-primary)', color: 'var(--bg)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Go to Dashboard →
              </button>
            </div>
          )}

          {/* PREVIEW — show invite details + auth */}
          {step === 'preview' && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>

              {/* Invite card */}
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 32, padding: '32px 36px', backdropFilter: 'blur(40px)', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: 120, height: 120, borderRadius: '50%', background: '#bf5af2', filter: 'blur(50px)', opacity: 0.15, pointerEvents: 'none' }} />
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#bf5af2', marginBottom: 14 }}>You're Invited</div>
                <div style={{ fontSize: 26, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: 6 }}>Join {team?.name}</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 22, lineHeight: 1.6 }}>
                  You've been invited to join <strong style={{ color: 'var(--text-primary)' }}>{team?.name}</strong> on DealFlow AI — the AI-powered sales call assistant.
                </div>

                {/* Features */}
                {[
                  { Icon: MicIcon, text: 'Live transcription & AI coaching during calls' },
                  { Icon: BarChartIcon, text: 'Real-time deal health & buying signal detection' },
                  { Icon: MessageIcon, text: 'Auto-generated WhatsApp & email follow-ups' },
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--divider)' : 'none' }}>
                    <f.Icon size={18} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{f.text}</span>
                  </div>
                ))}
              </div>

              {/* Auth card */}
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 32, padding: '28px 36px', backdropFilter: 'blur(40px)' }}>

                {/* Tab toggle */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 24, background: 'var(--input-bg)', borderRadius: 16, padding: 4 }}>
                  {(['signup', 'signin'] as const).map(mode => (
                    <button key={mode} onClick={() => setAuthMode(mode)}
                      style={{ flex: 1, height: 38, borderRadius: 12, border: 'none', background: authMode === mode ? 'var(--card-hover)' : 'transparent', color: authMode === mode ? 'var(--text-primary)' : 'var(--text-tertiary)', fontSize: 13, fontWeight: authMode === mode ? 600 : 400, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                      {mode === 'signup' ? 'Create Account' : 'Sign In'}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {authMode === 'signup' && (
                    <input style={inputStyle} placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
                  )}
                  <input style={inputStyle} placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  <input style={inputStyle} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                {authError && (
                  <div style={{ margin: '12px 0 0', padding: '10px 14px', borderRadius: 12, background: 'rgba(255,69,58,0.08)', border: '1px solid rgba(255,69,58,0.2)', fontSize: 13, color: '#ff453a' }}>
                    ⚠ {authError}
                  </div>
                )}

                <button onClick={handleAuth} disabled={authLoading || !email || !password || (authMode === 'signup' && !fullName)}
                  style={{ width: '100%', height: 48, borderRadius: 24, border: 'none', background: authLoading ? 'var(--input-bg)' : 'rgba(255,255,255,0.92)', color: authLoading ? 'var(--text-secondary)' : '#000', fontSize: 15, fontWeight: 600, cursor: authLoading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}>
                  {authLoading && <div style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
                  {authLoading ? 'Processing...' : authMode === 'signup' ? 'Create Account & Join Team →' : 'Sign In & Join Team →'}
                </button>

                <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: 'var(--text-dim)' }}>
                  By joining, you agree to DealFlow AI's terms of service
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default function JoinPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontFamily: '-apple-system, sans-serif' }}>
        Loading...
      </div>
    }>
      <JoinPageContent />
    </Suspense>
  )
}