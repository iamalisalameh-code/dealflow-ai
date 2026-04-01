import { Metadata } from 'next'
import PricingClient from './ClientPage'

export const metadata: Metadata = {
  title: 'Simple Pricing | DealFlow AI',
  description: 'Start your 14-day free trial. Flexible plans for UAE sales teams.',
}

export default function Page() {
  return <PricingClient />
}
