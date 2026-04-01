'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

export default function MobileAppShell() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [initials, setInitials] = useState('?')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'en' | 'ar'
    if (saved) setLang(saved)

    const getUser = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserEmail(user.email || '')
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single()
          const name = profile?.full_name || user.email?.split('@')[0] || 'User'
          setUserName(name)
          setInitials(name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2))
        }
      } catch {}
    }
    getUser()
  }, [])

  const isAr = lang === 'ar'

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/landing'
  }

  const navItems = [
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
      label: isAr ? 'لوحة التحكم' : 'Dashboard',
      href: '/',
      disabled: true,
      badge: isAr ? 'سطح المكتب فقط' : 'Desktop only',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
      label: isAr ? 'سجل المكالمات' : 'Call History',
      href: '/history',
      disabled: false,
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      label: isAr ? 'جهات الاتصال' : 'Contacts',
      href: '/contacts',
      disabled: false,
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
      label: isAr ? 'الإعدادات' : 'Settings',
      href: '/settings',
      disabled: false,
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      label: isAr ? 'لوحة الإدارة' : 'Admin Panel',
      href: '/admin',
      disabled: false,
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
        body { background: #000; color: #fff; font-family: ${isAr ? "'Noto Sans Arabic'" : "'DM Sans'"}, -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }
        .tap-btn { transition: transform 0.15s, opacity 0.15s; }
        .tap-btn:active { transform: scale(0.97); opacity: 0.85; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>

      {/* Header */}
      <div style={{ padding: '56px 24px 20px', background: 'linear-gradient(180deg, rgba(10,132,255,0.08) 0%, transparent 100%)', direction: isAr ? 'rtl' : 'ltr' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>DealFlow AI</span>
          </div>
          {/* Lang toggle */}
          <button onClick={() => {
            const next = isAr ? 'en' : 'ar'
            localStorage.setItem('lang', next)
            setLang(next)
          }} style={{ height: 30, padding: '0 12px', borderRadius: 15, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            {isAr ? 'EN' : 'AR'}
          </button>
        </div>

        {/* User greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, direction: isAr ? 'rtl' : 'ltr' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #0a84ff, #bf5af2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {initials}
          </div>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>{isAr ? 'أهلاً،' : 'Welcome back,'}</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#fff', letterSpacing: '-0.3px' }}>{userName}</div>
          </div>
        </div>
      </div>

      {/* Desktop only banner */}
      <div style={{ margin: '0 20px 20px', padding: '16px 20px', borderRadius: 20, background: 'rgba(10,132,255,0.08)', border: '1px solid rgba(10,132,255,0.2)', direction: isAr ? 'rtl' : 'ltr' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(10,132,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
              {isAr ? 'يعمل بشكل كامل على سطح المكتب' : 'Full experience on desktop'}
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
              {isAr ? 'ميزات التسجيل والذكاء الاصطناعي المباشر متاحة فقط على سطح المكتب. التطبيق المحمول قريباً.' : 'Live recording and AI features are desktop-only. Mobile app coming soon.'}
            </div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10, direction: isAr ? 'rtl' : 'ltr' }}>
        {navItems.map((item, i) => (
          <div key={i} className={item.disabled ? '' : 'tap-btn'}
            onClick={() => !item.disabled && (window.location.href = item.href)}
            style={{ padding: '16px 20px', borderRadius: 20, background: item.disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)', border: `1px solid ${item.disabled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)'}`, display: 'flex', alignItems: 'center', gap: 14, cursor: item.disabled ? 'default' : 'pointer', opacity: item.disabled ? 0.5 : 1 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: item.disabled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.disabled ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.8)', flexShrink: 0 }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 500, color: item.disabled ? 'rgba(255,255,255,0.3)' : '#fff' }}>{item.label}</div>
              {item.badge && <div style={{ fontSize: 11, color: '#0a84ff', fontWeight: 600, marginTop: 2 }}>{item.badge}</div>}
            </div>
            {!item.disabled && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round">
                {isAr ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 18l6-6-6-6"/>}
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Quick stats */}
      <div style={{ padding: '24px 20px', direction: isAr ? 'rtl' : 'ltr' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
          {isAr ? 'نظرة سريعة' : 'Quick overview'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: isAr ? 'إجمالي المكالمات' : 'Total Calls', value: '—', color: '#0a84ff' },
            { label: isAr ? 'متوسط الدرجة' : 'Avg Score', value: '—', color: '#34c759' },
          ].map((stat, i) => (
            <div key={i} style={{ padding: '16px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{stat.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: stat.color, letterSpacing: '-1px' }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sign out */}
      <div style={{ padding: '0 20px 48px', direction: isAr ? 'rtl' : 'ltr' }}>
        <button className="tap-btn" onClick={handleSignOut}
          style={{ width: '100%', height: 48, borderRadius: 24, border: '1px solid rgba(255,69,58,0.2)', background: 'rgba(255,69,58,0.06)', color: '#ff453a', fontSize: 15, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          {isAr ? 'تسجيل الخروج' : 'Sign Out'}
        </button>
      </div>
    </>
  )
}