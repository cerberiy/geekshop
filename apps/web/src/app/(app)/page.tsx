import ProductGrid from '@/components/product/ProductGrid'
import { getProducts } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const products = await getProducts(8)

  return (
    <div>
      <section className="relative flex min-h-[60vh] items-center justify-center bg-gradient-to-br from-violet-950 via-zinc-900 to-zinc-950 px-4 text-center">
        <div className="max-w-3xl">
          <h1 className="mb-4 text-5xl font-black tracking-tight text-white sm:text-7xl">
            Level Up
            <br />
            <span className="text-violet-400">Your Gear</span>
          </h1>
          <p className="mb-8 text-lg text-zinc-400">
            Premium gear for gamers, tech enthusiasts, and collectors.
          </p>
          <a
            href="/products"
            className="inline-block rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            Shop Now
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold text-white">Featured Products</h2>
        <ProductGrid products={products} />
      </section>
    </div>
  )
}
