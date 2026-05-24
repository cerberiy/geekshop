import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | GeekShop',
    default: 'GeekShop — Level Up Your Gear',
  },
  description: 'Premium gear for gamers, tech enthusiasts, and collectors.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
