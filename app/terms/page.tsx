import { Metadata } from 'next'
import TermsClient from './ClientPage'

export const metadata: Metadata = {
  title: 'Terms of Service | DealFlow AI',
  description: 'Legal foundation for the DealFlow AI platform.',
}

export default function Page() {
  return <TermsClient />
}
