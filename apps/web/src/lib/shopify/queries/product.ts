export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id title handle description descriptionHtml availableForSale vendor tags
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    images(first: 5) {
      edges { node { url altText width height } }
    }
    variants(first: 20) {
      edges {
        node {
          id title availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
        }
      }
    }
  }
`

export const GET_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProducts($first: Int!, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
      edges { node { ...ProductFragment } }
    }
  }
`

export const GET_PRODUCT_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) { ...ProductFragment }
  }
`

export const GET_COLLECTION_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetCollectionProducts($handle: String!, $first: Int!) {
    collectionByHandle(handle: $handle) {
      id title description
      products(first: $first) {
        edges { node { ...ProductFragment } }
      }
    }
  }
`
