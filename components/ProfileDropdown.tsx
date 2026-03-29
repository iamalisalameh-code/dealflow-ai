'use client'
import { useState, useEffect, useRef } from 'react'

interface Props {
  agentName: string
  lang: 'en' | 'ar'
}

export default function ProfileDropdown({ agentName, lang }: Props) {
  const [open, setOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const isRTL = lang === 'ar'

  useEffect(() => {
    const getUser = async () => {
      try {
        const { createClient } = await import('@/lib/supabase')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email) setUserEmail(user.email)
      } catch {}
    }
    getUser()
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleSignOut = async () => {
    const { createClient } = await import('@/lib/supabase')
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const initials = agentName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'

  const menuItems = [
    { icon: '⚙️', label: isRTL ? 'الإعدادات' : 'Settings', onClick: () => window.location.href = '/settings' },
    { icon: '🏢', label: isRTL ? 'لوحة الإدارة' : 'Admin Panel', onClick: () => window.location.href = '/admin' },
    { icon: '📞', label: isRTL ? 'سجل المكالمات' : 'Call History', onClick: () => window.location.href = '/history' },
    { icon: '👥', label: isRTL ? 'جهات الاتصال' : 'Contacts', onClick: () => window.location.href = '/contacts' },
    { divider: true },
    { icon: '🚪', label: isRTL ? 'تسجيل الخروج' : 'Sign Out', onClick: handleSignOut, danger: true },
  ]

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Avatar button */}
      <div onClick={() => setOpen(o => !o)}
        style={{ width: 40, height: 40, borderRadius: '50%', background: open ? 'linear-gradient(135deg, #0a84ff, #bf5af2)' : 'linear-gradient(135deg, var(--text-dim), var(--divider))', border: '2px solid ' + (open ? 'rgba(10,132,255,0.4)' : 'var(--divider)'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer', transition: 'all 0.2s', userSelect: 'none', boxShadow: open ? '0 0 0 4px rgba(10,132,255,0.15)' : 'none' }}>
        {initials}
      </div>

      {/* Dropdown */}
      {open && (
        <div style={{ position: 'fixed', top: 72, [isRTL ? 'left' : 'right']: 20, width: 240, background: 'var(--dropdown-bg)', border: '1px solid var(--card-border)', borderRadius: 20, zIndex: 999999, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', animation: 'fadeUp 0.2s ease', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
          <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }`}</style>

          {/* User info */}
          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--divider)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #0a84ff, #bf5af2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {initials}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agentName}</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userEmail}</div>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div style={{ padding: '8px 0' }}>
            {menuItems.map((item, i) => (
              item.divider ? (
                <div key={i} style={{ height: 1, background: 'var(--divider)', margin: '6px 0' }} />
              ) : (
                <div key={i} onClick={() => { setOpen(false); item.onClick?.() }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px', cursor: 'pointer', transition: 'background 0.15s', color: item.danger ? '#ff453a' : 'var(--text-secondary)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = item.danger ? 'rgba(255,69,58,0.08)' : 'var(--card-hover)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</span>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  )
}