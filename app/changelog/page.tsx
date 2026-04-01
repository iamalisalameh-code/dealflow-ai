import { headers } from 'next/headers'
import ChangelogClient from './ClientPage'
import MobileChangelog from '@/components/marketing/MobileChangelog'
export default async function ChangelogPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileChangelog /> : <ChangelogClient />
}