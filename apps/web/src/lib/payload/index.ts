import 'server-only'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { CatalogProduct } from './types'

async function client() {
  if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URL) return null
  try {
    return await getPayload({ config: configPromise })
  } catch {
    return null
  }
}

export async function getProducts(limit = 12): Promise<CatalogProduct[]> {
  const payload = await client()
  if (!payload) return []
  try {
    const result = await payload.find({
      collection: 'products',
      limit,
      depth: 1,
      sort: '-createdAt',
    })
    return result.docs as unknown as CatalogProduct[]
  } catch {
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<CatalogProduct | null> {
  const payload = await client()
  if (!payload) return null
  try {
    const result = await payload.find({
      collection: 'products',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    return (result.docs[0] as unknown as CatalogProduct) ?? null
  } catch {
    return null
  }
}
