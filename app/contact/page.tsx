import { headers } from 'next/headers'
import ContactClient from './ClientPage'
import MobileContact from '@/components/marketing/MobileContact'
export default async function ContactPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileContact /> : <ContactClient />
}