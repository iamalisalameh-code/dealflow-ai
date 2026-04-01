import { Metadata } from 'next'
import ChangelogClient from './ClientPage'

export const metadata: Metadata = {
  title: 'Product Updates | DealFlow AI',
  description: 'Latest features and improvements shipped for DealFlow AI.',
}

export default function Page() {
  return <ChangelogClient />
}
