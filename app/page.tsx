import { Metadata } from 'next'
import LandingClient from './ClientPage'

export const metadata: Metadata = {
  title: 'DealFlow AI | Sales Intelligence for MENA',
  description: 'Close more deals with AI that listens. Supporting English and Arabic dialects for teams in Dubai, Sharjah, and beyond.',
}

export default function Page() {
  return <LandingClient />
}
