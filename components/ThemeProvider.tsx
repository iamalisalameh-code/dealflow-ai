'use client'
import { useEffect, useState } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    // Check saved preference first
    const saved = localStorage.getItem('dealflow-theme')
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved as 'dark' | 'light')
      document.documentElement.classList.toggle('light', saved === 'light')
      return
    }
    // Fall back to system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = prefersDark ? 'dark' : 'light'
    setTheme(initial)
    document.documentElement.classList.toggle('light', initial === 'light')

    // Listen for system changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('dealflow-theme')) {
        const t = e.matches ? 'dark' : 'light'
        setTheme(t)
        document.documentElement.classList.toggle('light', t === 'light')
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return <>{children}</>
}

export function useTheme() {
  const toggle = () => {
    const isLight = document.documentElement.classList.contains('light')
    const next = isLight ? 'dark' : 'light'
    document.documentElement.classList.toggle('light', next === 'light')
    localStorage.setItem('dealflow-theme', next)
  }
  const isDark = () => !document.documentElement.classList.contains('light')
  return { toggle, isDark }
}