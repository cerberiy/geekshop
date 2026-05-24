import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import { getCart } from '@/lib/shopify'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'

export const metadata: Metadata = { title: 'Cart' }

export default async function CartPage() {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cart_id')?.value
  const cart = cartId ? await getCart(cartId) : null
  const lines = cart?.lines.edges.map((e) => e.node) ?? []

  if (!cart || lines.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-white">Your cart is empty</h1>
        <a href="/products" className="mt-6 inline-block text-violet-400 hover:text-violet-300">
          Continue shopping →
        </a>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-white">Your Cart</h1>
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {lines.map((line) => (
            <CartItem key={line.id} line={line} />
          ))}
        </div>
        <CartSummary cart={cart} />
      </div>
    </div>
  )
}
