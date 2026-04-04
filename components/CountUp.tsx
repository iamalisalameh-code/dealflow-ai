'use client'
import { useEffect, useRef, useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface Props {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
}

export default function CountUp({
  end,
  duration = 1600,
  suffix = '',
  prefix = '',
  decimals = 0,
}: Props) {
  const { ref, visible } = useScrollAnimation(0.3)
  const [current, setCurrent] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!visible || started.current) return
    started.current = true
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCurrent(parseFloat((eased * end).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [visible, end, duration, decimals])

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0
        ? current.toFixed(decimals)
        : Math.round(current).toLocaleString()}
      {suffix}
    </span>
  )
}