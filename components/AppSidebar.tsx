'use client'
import { useEffect, useState } from 'react'

type Page = 'dashboard' | 'history' | 'contacts' | 'settings' | 'admin'

interface Props {
  activePage: Page
}

const navItems = [
  {
    page: 'dashboard' as Page,
    href: '/',
    d: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  },
  {
    page: 'history' as Page,
    href: '/history',
    d: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  },
  {
    page: 'contacts' as Page,
    href: '/contacts',
    d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  },
  {
    page: 'settings' as Page,
    href: '/settings',
    d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  },
  {
    page: 'admin' as Page,
    href: '/admin',
    d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  },
]

export default function AppSidebar({ activePage }: Props) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is admin to show/hide admin icon
    const checkAdmin = async () => {
      try {
        const { createClient } = await import('@/lib/supabase')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single()
        setIsAdmin(!!profile?.is_admin)
      } catch {}
    }
    checkAdmin()
  }, [])

  const visibleItems = navItems.filter(item =>
    item.page !== 'admin' || isAdmin
  )

  return (
    <>
      <style>{`
        .app-sidebar-btn {
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .app-sidebar-btn:hover {
          background: rgba(255,255,255,0.08) !important;
          color: rgba(255,255,255,0.9) !important;
          transform: scale(1.05);
        }
        .app-sidebar-btn:active {
          transform: scale(0.95);
        }
      `}</style>
      <aside
        dir="ltr"
        style={{
          width: 80,
          borderRadius: 32,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(40px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px 0',
          gap: 8,
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          onClick={() => window.location.href = '/'}
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.04))',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>

        {/* Nav items */}
        {visibleItems.map((item) => {
          const active = activePage === item.page
          return (
            <div
              key={item.page}
              onClick={() => window.location.href = item.href}
              className="app-sidebar-btn"
              title={item.page.charAt(0).toUpperCase() + item.page.slice(1)}
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: active ? '#fff' : 'rgba(255,255,255,0.35)',
                border: active ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
                position: 'relative',
              }}
            >
              {/* Active indicator dot */}
              {active && (
                <div style={{
                  position: 'absolute',
                  left: -1,
                  width: 3,
                  height: 20,
                  borderRadius: '0 3px 3px 0',
                  background: '#0a84ff',
                }} />
              )}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.d} />
              </svg>
            </div>
          )
        })}
      </aside>
    </>
  )
}