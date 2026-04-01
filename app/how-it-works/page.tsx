import { Metadata } from 'next'
import HowItWorksClient from './ClientPage'

export const metadata: Metadata = {
  title: 'How It Works | DealFlow AI',
  description: 'Integrate AI into your Zoom or Google Meet calls in seconds.',
}

export default function Page() {
  return <HowItWorksClient />
}
