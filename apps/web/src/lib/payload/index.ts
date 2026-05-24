import 'server-only'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { CatalogProduct } from './types'

export async function getProducts(limit = 12): Promise<CatalogProduct[]> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    limit,
    depth: 1,
    sort: '-createdAt',
  })
  return result.docs as unknown as CatalogProduct[]
}

export async function getProductBySlug(slug: string): Promise<CatalogProduct | null> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return (result.docs[0] as unknown as CatalogProduct) ?? null
}
