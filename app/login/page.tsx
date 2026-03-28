'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleGoogleLogin = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setError('✓ Check your email for a confirmation link!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else window.location.href = '/'
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: var(--bg); color: var(--text-primary); font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; -webkit-font-smoothing: antialiased; }
        input { font-family: inherit; }
        input::placeholder { color: var(--text-dim); }
        input:focus { outline: none; border-color: var(--text-tertiary) !important; }
        @keyframes float { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-16px) scale(1.02)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

        {/* Spatial mesh */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '70%', height: '70%', borderRadius: '50%', background: '#00e5a0', filter: 'blur(160px)', opacity: 0.06 }} />
          <div style={{ position: 'absolute', bottom: '-30%', right: '-20%', width: '60%', height: '60%', borderRadius: '50%', background: '#4488ff', filter: 'blur(160px)', opacity: 0.06 }} />
          <div style={{ position: 'absolute', top: '30%', right: '10%', width: '40%', height: '40%', borderRadius: '50%', background: '#ff2d78', filter: 'blur(160px)', opacity: 0.04 }} />
        </div>

        {/* Floating orb */}
        <div style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.12) 0%, transparent 70%)', animation: 'float 5s ease-in-out infinite', pointerEvents: 'none' }} />

        {/* Card */}
        <div style={{ width: '100%', maxWidth: 400, padding: '0 20px', position: 'relative', zIndex: 10, animation: 'fadeUp 0.6s ease' }}>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.15)', marginBottom: 20, backdropFilter: 'blur(40px)', boxShadow: '0 0 40px rgba(0,229,160,0.15)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', color: 'var(--text-primary)', marginBottom: 6 }}>DealFlow AI</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 400 }}>Your AI-powered sales assistant</div>
          </div>

          {/* Glass card */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 32, padding: '36px 32px', backdropFilter: 'blur(40px)', boxShadow: '0 32px 80px rgba(0,0,0,0.3)' }}>

            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.3px', color: 'var(--text-primary)', marginBottom: 6 }}>
                {isSignUp ? 'Create account' : 'Welcome back'}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                {isSignUp ? 'Start your free trial today' : 'Sign in to access your dashboard'}
              </div>
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              style={{ width: '100%', padding: '13px 20px', borderRadius: 16, border: '1px solid var(--card-border)', background: 'var(--card-hover)', color: 'var(--text-primary)', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all 0.2s', fontFamily: 'inherit', marginBottom: 20, backdropFilter: 'blur(20px)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--input-border)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--card-hover)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--divider)' }} />
              <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>or</span>
              <div style={{ flex: 1, height: 1, background: 'var(--divider)' }} />
            </div>

            {/* Form */}
            <form onSubmit={handleEmailAuth}>
              <div style={{ marginBottom: 10 }}>
                <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required
                  style={{ width: '100%', padding: '13px 16px', borderRadius: 14, border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--text-primary)', fontSize: 14, transition: 'border-color 0.2s', fontFamily: 'inherit' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
                  style={{ width: '100%', padding: '13px 16px', borderRadius: 14, border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--text-primary)', fontSize: 14, transition: 'border-color 0.2s', fontFamily: 'inherit' }} />
              </div>

              {error && (
                <div style={{ marginBottom: 14, padding: '10px 14px', borderRadius: 12, fontSize: 13, background: error.startsWith('✓') ? 'rgba(48,209,88,0.08)' : 'rgba(255,69,58,0.08)', border: '1px solid ' + (error.startsWith('✓') ? 'rgba(48,209,88,0.2)' : 'rgba(255,69,58,0.2)'), color: error.startsWith('✓') ? '#30d158' : '#ff453a' }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: '13px', borderRadius: 16, border: 'none', background: loading ? 'var(--card-hover)' : 'rgba(255,255,255,0.9)', color: '#000', fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#fff' }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'rgba(255,255,255,0.9)' }}
              >
                {loading && <div style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
                {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text-tertiary)' }}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <span onClick={() => { setIsSignUp(!isSignUp); setError('') }} style={{ color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500 }}>
                {isSignUp ? 'Sign in' : 'Sign up free'}
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'var(--text-dim)' }}>
            By continuing you agree to our Terms & Privacy Policy
          </div>
        </div>
      </div>
    </>
  )
}