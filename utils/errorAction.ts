export async function errorAction(
  prevState: string | null,
  queryData: FormData
) {
  const itemID = queryData.get('itemID')
  if (itemID === '1') {
    return 'Added to cart'
  } else {
    // Add a fake delay to make waiting noticeable.
    await new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
    return "Couldn't add to cart: the item is sold out."
  }
}
