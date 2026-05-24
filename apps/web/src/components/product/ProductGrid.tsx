import type { ShopifyProduct } from '@/lib/shopify/types'
import ProductCard from './ProductCard'

export default function ProductGrid({ products }: { products: ShopifyProduct[] }) {
  if (products.length === 0) {
    return <p className="py-12 text-center text-zinc-500">No products found.</p>
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
