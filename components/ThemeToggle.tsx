'use client'
import { useTheme } from './ThemeProvider'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const { toggle } = useTheme()
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light'))
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <button
      onClick={toggle}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      style={{
        width: 36, height: 36, borderRadius: '50%',
        border: '1px solid var(--card-border)',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: 16, transition: 'all 0.2s',
        color: 'var(--text-secondary)',
      }}
    >
      {isLight ? '🌙' : '☀️'}
    </button>
  )
}