import ProductGrid from '@/components/product/ProductGrid'
import { getProducts } from '@/lib/shopify'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse all products in the store.',
}

export default async function ProductsPage() {
  const products = await getProducts({ first: 24 })

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-white">All Products</h1>
      <ProductGrid products={products} />
    </div>
  )
}
