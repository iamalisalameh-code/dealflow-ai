import { headers } from 'next/headers'
import AboutClient from './ClientPage'
import MobileAbout from '@/components/marketing/MobileAbout'
export default async function AboutPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileAbout /> : <AboutClient />
}