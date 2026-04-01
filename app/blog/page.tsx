import { headers } from 'next/headers'
import BlogClient from './ClientPage'
import MobileBlog from '@/components/marketing/MobileBlog'
export default async function BlogPage() {
  const h = await headers()
  const isMobile = /iPhone|iPad|Android|Mobile/i.test(h.get('user-agent') || '')
  return isMobile ? <MobileBlog /> : <BlogClient />
}