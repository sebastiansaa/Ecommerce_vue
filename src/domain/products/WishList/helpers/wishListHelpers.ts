import type { WishListItem } from '../interface/WishListItem'

export function formatWishListItem(item: WishListItem) {
    return {
        ...item,
        priceFormatted: `$${item.product.price.toFixed(2)}`
    }
}
