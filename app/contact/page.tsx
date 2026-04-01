import { Metadata } from 'next'
import ContactClient from './ClientPage'

export const metadata: Metadata = {
  title: 'Contact Us | DealFlow AI',
  description: 'Our team in Sharjah is ready to help you optimize your sales workflow.',
}

export default function Page() {
  return <ContactClient />
}
