import { Metadata } from 'next'
import PrivacyClient from './ClientPage'

export const metadata: Metadata = {
  title: 'Privacy Policy | DealFlow AI',
  description: 'Learn about our zero-training policy for AI models.',
}

export default function Page() {
  return <PrivacyClient />
}
