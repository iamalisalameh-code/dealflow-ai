import { Metadata } from 'next'
import BlogClient from './ClientPage'

export const metadata: Metadata = {
  title: 'Sales Insights Blog | DealFlow AI',
  description: 'Expert advice on closing deals and AI technology in the MENA region.',
}

export default function Page() {
  return <BlogClient />
}
