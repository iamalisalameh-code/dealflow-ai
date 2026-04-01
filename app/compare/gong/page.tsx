import { headers } from 'next/headers'
import GongClient from './ClientPage'
import MobileCompareGong from '@/components/marketing/MobileCompareGong'
export default async function GongPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileCompareGong /> : <GongClient />
}