import { headers } from 'next/headers'
import ArPageClient from './ClientPage'
import MobileAr from '@/components/marketing/MobileAr'

export default async function ArPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileAr /> : <ArPageClient />
}