export interface Order {
  id: string
  createdAt: string
  total: number
  status: 'pending' | 'completed' | 'cancelled' | string
  products: Array<{
    id: string
    title: string
    price: number
    quantity?: number
    images?: string[]
    description?: string
  }>
}
