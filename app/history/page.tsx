import { headers } from 'next/headers'
import HistoryPage from './HistoryClient'
import MobileHistory from '@/components/MobileHistory'

export default async function Page() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileHistory /> : <HistoryPage />
}