import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Naitei14 FE Nhom2',
  description: 'Next.js project with TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
