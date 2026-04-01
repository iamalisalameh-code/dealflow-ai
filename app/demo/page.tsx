import { headers } from 'next/headers'
import DemoClient from './ClientPage'
import MobileDemo from '@/components/marketing/MobileDemo'
export default async function DemoPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileDemo /> : <DemoClient />
}