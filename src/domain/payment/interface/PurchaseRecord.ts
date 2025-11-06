import type { ProductInterface } from "@/domain/products/products/interface"


export interface PurchaseRecord {
  userId: string
  product: ProductInterface
  date: string
  amount: number
  paymentMethod: string
}
