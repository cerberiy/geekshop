export type CatalogMedia = {
  id: string
  url: string
  alt: string
  width: number
  height: number
  filename: string
}

export type CatalogProduct = {
  id: string
  title: string
  slug: string
  description: string | null
  price: number
  stock: number
  images: Array<{ id?: string; image: CatalogMedia | string }> | null
}
