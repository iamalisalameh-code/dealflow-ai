import { headers } from 'next/headers'
import PricingClient from './ClientPage'
import MobilePricing from '@/components/marketing/MobilePricing'

export default async function PricingPage() {
  const headersList = await headers()
  const ua = headersList.get('user-agent') || ''
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(ua)
  if (isMobile) return <MobilePricing />
  return <PricingClient />
}