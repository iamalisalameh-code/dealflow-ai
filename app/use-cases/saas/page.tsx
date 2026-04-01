import { Metadata } from 'next'
import SaasClient from './ClientPage'

export const metadata: Metadata = {
  title: 'SaaS Sales Intelligence | DealFlow AI',
  description: 'Track BANT and MEDDIC frameworks automatically.',
}

export default function Page() {
  return <SaasClient />
}
