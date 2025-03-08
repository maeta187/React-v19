type CartState = {
  success: boolean
  cartSize?: number
  message?: string
}

export async function addToCart(
  state: CartState,
  formData: FormData
): Promise<CartState> {
  const itemID = formData.get('itemID')
  if (itemID === '1') {
    return {
      success: true,
      cartSize: 12
    }
  } else {
    return {
      success: false,
      message: 'The item is sold out.'
    }
  }
}
