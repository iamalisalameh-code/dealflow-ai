import { Metadata } from 'next'
import GongClient from './ClientPage'

export const metadata: Metadata = {
  title: 'DealFlow AI vs Gong | The MENA Alternative',
  description: 'Why UAE teams choose DealFlow over Gong.',
}

export default function Page() {
  return <GongClient />
}
