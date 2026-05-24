import 'server-only'
import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import {
  GET_COLLECTION_PRODUCTS_QUERY,
  GET_PRODUCT_QUERY,
  GET_PRODUCTS_QUERY,
} from './queries/product'
import {
  ADD_TO_CART_MUTATION,
  CREATE_CART_MUTATION,
  GET_CART_QUERY,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_MUTATION,
} from './queries/cart'
import type { GetProductsInput, ShopifyCart, ShopifyProduct } from './types'

let _client: ReturnType<typeof createStorefrontApiClient> | null = null
function getClient() {
  if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    return null
  }
  if (!_client) {
    _client = createStorefrontApiClient({
      storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
      apiVersion: '2025-01',
      publicAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    })
  }
  return _client
}

type Edge<T> = { node: T }
function edges<T>(connection: { edges: Edge<T>[] }): T[] {
  return connection.edges.map((e) => e.node)
}

export async function getProducts(input: GetProductsInput = {}): Promise<ShopifyProduct[]> {
  const client = getClient()
  if (!client) return []
  const { first = 12, query, sortKey, reverse } = input
  const { data, errors } = await client.request(GET_PRODUCTS_QUERY, {
    variables: { first, query, sortKey, reverse },
  })
  if (errors) throw new Error(errors.message)
  return edges(data.products)
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const client = getClient()
  if (!client) return null
  const { data, errors } = await client.request(GET_PRODUCT_QUERY, {
    variables: { handle },
  })
  if (errors) throw new Error(errors.message)
  return data.productByHandle ?? null
}

export async function getCollectionProducts(
  handle: string,
  first = 12,
): Promise<ShopifyProduct[]> {
  const client = getClient()
  if (!client) return []
  const { data, errors } = await client.request(GET_COLLECTION_PRODUCTS_QUERY, {
    variables: { handle, first },
  })
  if (errors) throw new Error(errors.message)
  return data.collectionByHandle ? edges(data.collectionByHandle.products) : []
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const client = getClient()
  if (!client) return null
  const { data, errors } = await client.request(GET_CART_QUERY, {
    variables: { cartId },
  })
  if (errors) throw new Error(errors.message)
  return data.cart ?? null
}

export async function createCart(variantId: string, quantity = 1): Promise<ShopifyCart> {
  const client = getClient()
  if (!client) throw new Error('Shopify is not configured')
  const { data, errors } = await client.request(CREATE_CART_MUTATION, {
    variables: { input: { lines: [{ merchandiseId: variantId, quantity }] } },
  })
  if (errors) throw new Error(errors.message)
  return data.cartCreate.cart
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1,
): Promise<ShopifyCart> {
  const client = getClient()
  if (!client) throw new Error('Shopify is not configured')
  const { data, errors } = await client.request(ADD_TO_CART_MUTATION, {
    variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  })
  if (errors) throw new Error(errors.message)
  return data.cartLinesAdd.cart
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<ShopifyCart> {
  const client = getClient()
  if (!client) throw new Error('Shopify is not configured')
  const { data, errors } = await client.request(UPDATE_CART_MUTATION, {
    variables: { cartId, lines: [{ id: lineId, quantity }] },
  })
  if (errors) throw new Error(errors.message)
  return data.cartLinesUpdate.cart
}

export async function removeFromCart(cartId: string, lineId: string): Promise<ShopifyCart> {
  const client = getClient()
  if (!client) throw new Error('Shopify is not configured')
  const { data, errors } = await client.request(REMOVE_FROM_CART_MUTATION, {
    variables: { cartId, lineIds: [lineId] },
  })
  if (errors) throw new Error(errors.message)
  return data.cartLinesRemove.cart
}
