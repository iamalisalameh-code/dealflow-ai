import { headers } from 'next/headers'
import ChorusClient from './ClientPage'
import MobileCompareChorus from '@/components/marketing/MobileCompareChorus'
export default async function ChorusPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileCompareChorus /> : <ChorusClient />
}