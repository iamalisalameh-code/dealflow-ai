import { headers } from 'next/headers'
import SettingsClient from './SettingsClient'
import MobileSettings from '@/components/MobileSettings'

export default async function SettingsPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileSettings /> : <SettingsClient />
}