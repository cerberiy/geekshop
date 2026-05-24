import AddToCartButton from '@/components/product/AddToCartButton'
import { getProduct } from '@/lib/shopify'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) return { title: 'Product not found' }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: product.images.edges[0]?.node.url
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) notFound()

  const firstImage = product.images.edges[0]?.node
  const firstVariant = product.variants.edges[0]?.node

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl bg-zinc-900">
          {firstImage && (
            <Image
              src={firstImage.url}
              alt={firstImage.altText ?? product.title}
              width={firstImage.width}
              height={firstImage.height}
              className="h-full w-full object-cover"
              priority
            />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-zinc-500">{product.vendor}</p>
            <h1 className="mt-1 text-3xl font-bold text-white">{product.title}</h1>
          </div>

          <div className="text-2xl font-semibold text-violet-400">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: product.priceRange.minVariantPrice.currencyCode,
            }).format(Number(product.priceRange.minVariantPrice.amount))}
          </div>

          <div
            className="prose prose-invert text-zinc-400"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          {firstVariant && (
            <AddToCartButton
              variantId={firstVariant.id}
              availableForSale={product.availableForSale}
            />
          )}
        </div>
      </div>
    </div>
  )
}
