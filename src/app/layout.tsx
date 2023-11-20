import type { Metadata } from 'next'

import '../styles/globals.css'

export default function RootLayout({ children }: LayoutPropsType) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Cornelius Store',
  description: 'An e-commerce website',
}

type LayoutPropsType = {
  children: React.ReactNode
}