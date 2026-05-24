import { updateCartLineAction } from '@/lib/shopify/actions'
import type { ShopifyCartLine } from '@/lib/shopify/types'
import Image from 'next/image'

export default function CartItem({ line }: { line: ShopifyCartLine }) {
  const { product } = line.merchandise
  const image = product.images.edges[0]?.node

  return (
    <div className="flex gap-4 rounded-xl bg-zinc-900 p-4">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
        {image && (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="font-semibold text-white">{product.title}</p>
          <p className="text-sm text-zinc-400">{line.merchandise.title}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <form action={updateCartLineAction.bind(null, line.id, line.quantity - 1)}>
              <button
                type="submit"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-700 text-white hover:bg-zinc-600"
              >
                −
              </button>
            </form>
            <span className="w-8 text-center text-white">{line.quantity}</span>
            <form action={updateCartLineAction.bind(null, line.id, line.quantity + 1)}>
              <button
                type="submit"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-700 text-white hover:bg-zinc-600"
              >
                +
              </button>
            </form>
          </div>
          <p className="font-semibold text-violet-400">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: line.cost.totalAmount.currencyCode,
            }).format(Number(line.cost.totalAmount.amount))}
          </p>
        </div>
      </div>
    </div>
  )
}
