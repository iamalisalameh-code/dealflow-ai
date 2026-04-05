import { headers } from 'next/headers'
import MobileDialer from '@/components/MobileDialer'

export default async function DialerPage() {
  const h = await headers()
  const ua = h.get('user-agent') || ''
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(ua)
  return <MobileDialer isMobile={isMobile} />
}