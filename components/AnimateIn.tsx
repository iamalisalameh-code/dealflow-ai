'use client'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { CSSProperties, ReactNode } from 'react'

type Variant = 'fadeUp' | 'fadeIn' | 'scaleUp' | 'fadeLeft' | 'fadeRight'

const variants: Record<Variant, { hidden: CSSProperties; visible: CSSProperties }> = {
  fadeUp:    { hidden: { opacity: 0, transform: 'translateY(36px)' }, visible: { opacity: 1, transform: 'translateY(0)' } },
  fadeIn:    { hidden: { opacity: 0 },                                visible: { opacity: 1 } },
  scaleUp:   { hidden: { opacity: 0, transform: 'scale(0.93)' },      visible: { opacity: 1, transform: 'scale(1)' } },
  fadeLeft:  { hidden: { opacity: 0, transform: 'translateX(-32px)' },visible: { opacity: 1, transform: 'translateX(0)' } },
  fadeRight: { hidden: { opacity: 0, transform: 'translateX(32px)' }, visible: { opacity: 1, transform: 'translateX(0)' } },
}

interface Props {
  children: ReactNode
  variant?: Variant
  delay?: number
  duration?: number
  className?: string
  style?: CSSProperties
}

export default function AnimateIn({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 750,
  className,
  style,
}: Props) {
  const { ref, visible } = useScrollAnimation()
  const v = variants[variant]

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(visible ? v.visible : v.hidden),
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms,
                     transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}