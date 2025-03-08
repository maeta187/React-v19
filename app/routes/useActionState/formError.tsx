import { useActionState, useState } from 'react'
import { errorAction } from 'utils'

type Props = {
  itemID: string
  itemTitle: string
}

function AddToCartForm({ itemID, itemTitle }: Props) {
  const [message, formAction, isPending] = useActionState(errorAction, null)

  return (
    <form action={formAction}>
      <h2>{itemTitle}</h2>
      <input type='hidden' name='itemID' value={itemID} />
      <button type='submit'>Add to Cart</button>
      <p>{isPending ? 'Loading...' : message}</p>
    </form>
  )
}

export default function FormError() {
  return (
    <>
      <h1>FormError</h1>
      <AddToCartForm itemID='1' itemTitle='JavaScript: The Definitive Guide' />
      <AddToCartForm itemID='2' itemTitle='JavaScript: The Good Parts"' />
    </>
  )
}
