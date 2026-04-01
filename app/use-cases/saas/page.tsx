import { headers } from 'next/headers'
import SaasClient from './ClientPage'
import MobileSaas from '@/components/marketing/MobileSaas'
export default async function SaasPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileSaas /> : <SaasClient />
}