import { headers } from 'next/headers'
import ContactsClient from './ContactsClient'
import MobileContacts from '@/components/MobileContacts'

export default async function ContactsPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileContacts /> : <ContactsClient />
}