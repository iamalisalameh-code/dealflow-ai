import { headers } from 'next/headers'
import FeaturesClient from './ClientPage'
import MobileFeatures from '@/components/marketing/MobileFeatures'
export default async function FeaturesPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileFeatures /> : <FeaturesClient />
}