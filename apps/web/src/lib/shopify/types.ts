export interface MoneyV2 {
  amount: string
  currencyCode: string
}

export interface ShopifyImage {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyProductVariant {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: Array<{ name: string; value: string }>
  price: MoneyV2
  compareAtPrice?: MoneyV2 | null
}

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  availableForSale: boolean
  vendor: string
  tags: string[]
  priceRange: {
    minVariantPrice: MoneyV2
    maxVariantPrice: MoneyV2
  }
  images: { edges: Array<{ node: ShopifyImage }> }
  variants: { edges: Array<{ node: ShopifyProductVariant }> }
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  cost: { totalAmount: MoneyV2 }
  merchandise: {
    id: string
    title: string
    selectedOptions: Array<{ name: string; value: string }>
    product: {
      id: string
      title: string
      handle: string
      images: { edges: Array<{ node: ShopifyImage }> }
    }
  }
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: MoneyV2
    subtotalAmount: MoneyV2
    totalTaxAmount?: MoneyV2 | null
  }
  lines: { edges: Array<{ node: ShopifyCartLine }> }
}

export interface ShopifyCollection {
  id: string
  title: string
  handle: string
  description: string
  image?: ShopifyImage | null
  products: { edges: Array<{ node: ShopifyProduct }> }
}

export type GetProductsInput = {
  first?: number
  query?: string
  sortKey?: 'TITLE' | 'PRICE' | 'BEST_SELLING' | 'CREATED_AT' | 'RELEVANCE'
  reverse?: boolean
}
