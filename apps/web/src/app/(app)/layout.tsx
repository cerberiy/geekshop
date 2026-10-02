import type { Metadata } from 'next'
import '../globals.css'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

export const metadata: Metadata = {
  title: {
    template: '%s | GeekShop',
    default: 'GeekShop — Level Up Your Gear',
  },
  description: 'Premium gear for gamers, tech enthusiasts, and collectors.',
}

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
