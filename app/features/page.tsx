import { Metadata } from 'next'
import FeaturesClient from './ClientPage'

export const metadata: Metadata = {
  title: 'Sales Features | DealFlow AI',
  description: 'Arabic transcription, buying signal detection, and automated CRM logging.',
}

export default function Page() {
  return <FeaturesClient />
}
