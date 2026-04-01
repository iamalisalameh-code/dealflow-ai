import { Metadata } from 'next'
import ChorusClient from './ClientPage'

export const metadata: Metadata = {
  title: 'DealFlow AI vs Chorus | Compare Features',
  description: 'Better dialect recognition and flexible local pricing.',
}

export default function Page() {
  return <ChorusClient />
}
