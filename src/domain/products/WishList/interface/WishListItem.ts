export interface WishListItem {
  id: string // UII (UUID)
  userId: string // UII (UUID)
  product: {
    id: string // UII (UUID)
    title: string
    price: number
    images: string[]
    [key: string]: any
  }
}
