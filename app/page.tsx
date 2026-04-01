import { headers } from 'next/headers'
import LandingClient from './ClientPage'
import MobileAppShell from '@/components/MobileAppShell'

export default async function Page() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileAppShell /> : <LandingClient />
}