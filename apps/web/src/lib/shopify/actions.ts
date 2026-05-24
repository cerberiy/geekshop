'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { addToCart, createCart, getCart, removeFromCart, updateCartLine } from '.'

export async function addToCartAction(variantId: string) {
  const cookieStore = await cookies()
  let cartId = cookieStore.get('cart_id')?.value

  const cart = cartId ? await addToCart(cartId, variantId) : await createCart(variantId)

  if (!cartId) {
    cookieStore.set('cart_id', cart.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  revalidatePath('/cart')
  return cart
}

export async function updateCartLineAction(lineId: string, quantity: number) {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cart_id')?.value
  if (!cartId) return

  if (quantity <= 0) {
    await removeFromCart(cartId, lineId)
  } else {
    await updateCartLine(cartId, lineId, quantity)
  }

  revalidatePath('/cart')
}

export async function checkoutAction() {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cart_id')?.value
  if (!cartId) return

  const cart = await getCart(cartId)
  if (!cart) return

  redirect(cart.checkoutUrl)
}
