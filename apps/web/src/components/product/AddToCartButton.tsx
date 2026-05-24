'use client'

import { addToCartAction } from '@/lib/shopify/actions'
import { useState, useTransition } from 'react'

export default function AddToCartButton({
  variantId,
  availableForSale,
}: {
  variantId: string
  availableForSale: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const [added, setAdded] = useState(false)

  if (!availableForSale) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-full bg-zinc-700 py-3 text-sm font-semibold text-zinc-500"
      >
        Out of Stock
      </button>
    )
  }

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await addToCartAction(variantId)
          setAdded(true)
          setTimeout(() => setAdded(false), 2000)
        })
      }
      disabled={isPending}
      className="w-full rounded-full bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-60"
    >
      {isPending ? 'Adding...' : added ? '✓ Added to Cart' : 'Add to Cart'}
    </button>
  )
}
