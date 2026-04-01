import { Metadata } from 'next'
import RealEstateClient from './ClientPage'

export const metadata: Metadata = {
  title: 'AI for Real Estate | Dubai & Sharjah',
  description: 'Nail every property viewing follow-up with Khaleeji Arabic support.',
}

export default function Page() {
  return <RealEstateClient />
}
