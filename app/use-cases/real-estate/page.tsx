import { headers } from 'next/headers'
import RealEstateClient from './ClientPage'
import MobileRealEstate from '@/components/marketing/MobileRealEstate'
export default async function RealEstatePage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileRealEstate /> : <RealEstateClient />
}