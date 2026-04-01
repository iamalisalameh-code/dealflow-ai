import { Metadata } from 'next'
import DemoClient from './ClientPage'

export const metadata: Metadata = {
  title: 'Book a Demo | DealFlow AI',
  description: 'See DealFlow AI in action with a personal walkthrough.',
}

export default function Page() {
  return <DemoClient />
}
