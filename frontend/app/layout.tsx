import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Atholton High School',
  description: 'Atholton High School Raider Time Website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
