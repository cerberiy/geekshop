import { getProductBySlug } from '@/lib/payload'
import type { CatalogMedia } from '@/lib/payload/types'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = await getProductBySlug(handle)
  if (!product) return { title: 'Product not found' }

  const firstImage = product.images?.[0]?.image
  const imageUrl = firstImage && typeof firstImage !== 'string' ? firstImage.url : undefined

  return {
    title: product.title,
    description: product.description ?? undefined,
    openGraph: imageUrl ? { images: [{ url: imageUrl }] } : undefined,
  }
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params
  const product = await getProductBySlug(handle)

  if (!product) notFound()

  const firstImageEntry = product.images?.[0]
  const firstImage =
    firstImageEntry && typeof firstImageEntry.image !== 'string'
      ? (firstImageEntry.image as CatalogMedia)
      : null

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl bg-zinc-900">
          {firstImage?.url ? (
            <Image
              src={firstImage.url}
              alt={firstImage.alt ?? product.title}
              width={firstImage.width ?? 800}
              height={firstImage.height ?? 800}
              className="h-full w-full object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl">📦</div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white">{product.title}</h1>
          </div>

          <div className="text-2xl font-semibold text-violet-400">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
              product.price,
            )}
          </div>

          {product.description && (
            <p className="text-zinc-400">{product.description}</p>
          )}

          <div className="text-sm text-zinc-500">
            {product.stock > 0 ? (
              <span className="text-green-400">{product.stock} in stock</span>
            ) : (
              <span className="text-red-400">Out of stock</span>
            )}
          </div>

          <div className="rounded-full border border-zinc-700 py-3 text-center text-sm font-semibold text-zinc-500">
            Checkout coming soon
          </div>
        </div>
      </div>
    </div>
  )
}
