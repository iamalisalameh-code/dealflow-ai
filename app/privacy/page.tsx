import { headers } from 'next/headers'
import PrivacyClient from './ClientPage'
import MobilePrivacy from '@/components/marketing/MobilePrivacy'
export default async function PrivacyPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobilePrivacy /> : <PrivacyClient />
}