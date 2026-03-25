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
      else setError('Check your email for a confirmation link!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else window.location.href = '/'
    }
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px', borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)', color: '#fff',
    fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif',
    transition: 'border-color 0.2s',
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0f0f18; font-family: 'DM Sans', sans-serif; }
        @keyframes float { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-12px)} }
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0f0f18', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

        {/* Ambient glows */}
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', right: '20%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(68,136,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Floating orb */}
        <div style={{ position: 'absolute', top: '15%', left: '50%', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.15) 0%, rgba(68,136,255,0.1) 50%, transparent 70%)', animation: 'float 4s ease-in-out infinite', filter: 'blur(2px)', pointerEvents: 'none' }} />

        {/* Card */}
        <div style={{ width: '100%', maxWidth: 420, padding: '0 24px', position: 'relative', zIndex: 10 }}>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #00e5a0, #4488ff)', boxShadow: '0 0 30px rgba(0,229,160,0.3)', marginBottom: 20, fontSize: 22, fontWeight: 800, color: '#000', fontFamily: 'Syne, sans-serif' }}>
              DF
            </div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, background: 'linear-gradient(90deg, #00e5a0, #4488ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>
              DealFlow AI
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Your AI-powered sales assistant</div>
          </div>

          {/* Auth card */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '36px 32px', backdropFilter: 'blur(20px)', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>

            <div style={{ marginBottom: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Syne, sans-serif', marginBottom: 6 }}>
                {isSignUp ? 'Create account' : 'Welcome back'}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                {isSignUp ? 'Start your free trial today' : 'Sign in to access your dashboard'}
              </div>
            </div>

            {/* Google button */}
            <button onClick={handleGoogleLogin} style={{ width: '100%', padding: '14px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif', marginBottom: 16 }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.1)'; el.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.06)'; el.style.transform = 'translateY(0)'; }}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>or</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {/* Email form */}
            <form onSubmit={handleEmailAuth}>
              <div style={{ marginBottom: 12 }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,229,160,0.4)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,229,160,0.4)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                />
              </div>

              {/* Error / success message */}
              {error && (
                <div style={{ marginBottom: 14, padding: '10px 14px', borderRadius: 8, fontSize: 13, background: error.includes('Check your email') ? 'rgba(0,229,160,0.08)' : 'rgba(255,71,87,0.08)', border: `1px solid ${error.includes('Check your email') ? 'rgba(0,229,160,0.2)' : 'rgba(255,71,87,0.2)'}`, color: error.includes('Check your email') ? '#00e5a0' : '#ff8a94' }}>
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: loading ? 'rgba(0,229,160,0.4)' : 'linear-gradient(135deg, #00e5a0, #00b8ff)', color: '#000', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', boxShadow: '0 4px 20px rgba(0,229,160,0.3)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,229,160,0.4)'; }}}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,229,160,0.3)'; }}
              >
                {loading && <div style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
                {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            {/* Toggle sign up / sign in */}
            <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <span
                onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                style={{ color: '#00e5a0', cursor: 'pointer', fontWeight: 600 }}
              >
                {isSignUp ? 'Sign in' : 'Sign up free'}
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
            By signing in you agree to our Terms & Privacy Policy
          </div>
        </div>
      </div>
    </>
  )
}