import { headers } from 'next/headers'
import InsuranceClient from './ClientPage'
import MobileInsurance from '@/components/marketing/MobileInsurance'
export default async function InsurancePage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileInsurance /> : <InsuranceClient />
}