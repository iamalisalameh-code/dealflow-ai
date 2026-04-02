import { headers } from 'next/headers'
import AdminClient from './AdminClient'
import MobileAdmin from '@/components/MobileAdmin'

export default async function AdminPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileAdmin /> : <AdminClient />
}