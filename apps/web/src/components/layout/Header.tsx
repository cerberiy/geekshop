import { getCart } from '@/lib/shopify'
import Link from 'next/link'
import { cookies } from 'next/headers'

async function CartCount() {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cart_id')?.value
  const cart = cartId ? await getCart(cartId) : null
  const count = cart?.totalQuantity ?? 0

  return (
    <Link href="/cart" className="relative text-zinc-300 transition hover:text-white">
      Cart
      {count > 0 && (
        <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  )
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-black tracking-tight text-white">
          Geek<span className="text-violet-400">Shop</span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="text-zinc-300 transition hover:text-white">
            Products
          </Link>
          <CartCount />
        </div>
      </nav>
    </header>
  )
}
