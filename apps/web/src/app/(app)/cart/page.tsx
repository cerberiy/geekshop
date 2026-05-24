import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cart' }

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-white">Cart</h1>
      <p className="mt-4 text-zinc-400">Checkout is coming soon.</p>
      <a href="/products" className="mt-6 inline-block text-violet-400 hover:text-violet-300">
        Browse products →
      </a>
    </div>
  )
}
