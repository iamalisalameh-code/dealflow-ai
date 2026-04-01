import { headers } from 'next/headers'
import HowItWorksClient from './ClientPage'
import MobileHowItWorks from '@/components/marketing/MobileHowItWorks'

export default async function HowItWorksPage() {
  const headersList = await headers()
  const ua = headersList.get('user-agent') || ''
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(ua)
  if (isMobile) return <MobileHowItWorks />
  return <HowItWorksClient />
}