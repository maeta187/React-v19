import { useActionState } from 'react'
import { addToCart } from 'utils/addToCart'

type Props = {
  itemID: string
  itemTitle: string
}

function AddToCartForm({ itemID, itemTitle }: Props) {
  // Stateには単純な値だけでなく、オブジェクトも渡すことができる
  const [formState, formAction] = useActionState(addToCart, { success: false })
  return (
    <>
      <h1>DisplayStructuredInformation</h1>
      <form action={formAction}>
        <h2>{itemTitle}</h2>
        <input type='hidden' name='itemID' value={itemID} />
        <button type='submit'>Add to Cart</button>
        {formState?.success && (
          <div className='toast'>
            Added to cart! Your cart now has {formState.cartSize} items.
          </div>
        )}
        {formState?.success === false && (
          <div className='error'>
            Failed to add to cart: {formState.message}
          </div>
        )}{' '}
      </form>
    </>
  )
}

export default function DisplayStructuredInformation() {
  return (
    <>
      <AddToCartForm itemID='1' itemTitle='JavaScript: The Definitive Guide' />
      <AddToCartForm itemID='2' itemTitle='JavaScript: The Good Parts' />
    </>
  )
}
