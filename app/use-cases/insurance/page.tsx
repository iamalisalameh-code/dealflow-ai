import { Metadata } from 'next'
import InsuranceClient from './ClientPage'

export const metadata: Metadata = {
  title: 'Insurance Sales AI | DealFlow AI',
  description: 'Ensure compliance and accuracy for insurance brokers.',
}

export default function Page() {
  return <InsuranceClient />
}
