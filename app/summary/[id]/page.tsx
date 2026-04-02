import { headers } from 'next/headers'
import SummaryClient from './SummaryClient'
import MobileSummary from '@/components/MobileSummary'

export default async function SummaryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileSummary id={id} /> : <SummaryClient id={id} />
}