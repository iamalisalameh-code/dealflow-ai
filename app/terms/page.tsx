import { headers } from 'next/headers'
import TermsClient from './ClientPage'
import MobileTerms from '@/components/marketing/MobileTerms'
export default async function TermsPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileTerms /> : <TermsClient />
}