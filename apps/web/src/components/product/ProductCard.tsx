import type { ShopifyProduct } from '@/lib/shopify/types'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const image = product.images.edges[0]?.node
  const price = product.priceRange.minVariantPrice

  return (
    <Link href={`/products/${product.handle}`} className="group">
      <div className="overflow-hidden rounded-xl bg-zinc-900 transition group-hover:bg-zinc-800">
        <div className="aspect-square overflow-hidden">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText ?? product.title}
              width={600}
              height={600}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-zinc-800 text-4xl">📦</div>
          )}
        </div>
        <div className="p-4">
          <h3 className="truncate font-semibold text-white">{product.title}</h3>
          <p className="mt-1 text-sm text-violet-400">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currencyCode,
            }).format(Number(price.amount))}
          </p>
        </div>
      </div>
    </Link>
  )
}
