import { checkoutAction } from '@/lib/shopify/actions'
import type { ShopifyCart } from '@/lib/shopify/types'

export default function CartSummary({ cart }: { cart: ShopifyCart }) {
  const { cost } = cart

  const fmt = (amount: string, currency: string) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(amount))

  return (
    <div className="h-fit rounded-xl bg-zinc-900 p-6">
      <h2 className="mb-4 text-lg font-bold text-white">Order Summary</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-zinc-400">
          <span>Subtotal</span>
          <span>{fmt(cost.subtotalAmount.amount, cost.subtotalAmount.currencyCode)}</span>
        </div>
        {cost.totalTaxAmount && (
          <div className="flex justify-between text-zinc-400">
            <span>Tax</span>
            <span>{fmt(cost.totalTaxAmount.amount, cost.totalTaxAmount.currencyCode)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-zinc-700 pt-2 text-white">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-violet-400">
            {fmt(cost.totalAmount.amount, cost.totalAmount.currencyCode)}
          </span>
        </div>
      </div>

      <form action={checkoutAction} className="mt-6">
        <button
          type="submit"
          className="w-full rounded-full bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          Checkout with Shopify
        </button>
      </form>
    </div>
  )
}
