'use client'
import { useIsMobile } from '@/hooks/useIsMobile'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import MobileLanding from '@/components/marketing/MobileLanding'
import DesktopLanding from '@/components/marketing/DesktopLanding'

export default function LandingPage() {
  const isMobile = useIsMobile()
  if (isMobile) return <MobileLanding />
  return <DesktopLanding />
}