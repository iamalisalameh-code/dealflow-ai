import { Metadata } from 'next'
import AboutClient from './ClientPage'

export const metadata: Metadata = {
  title: 'Our Mission | DealFlow AI',
  description: 'Building the first revenue intelligence platform designed for the Middle East.',
}

export default function Page() {
  return <AboutClient />
}
