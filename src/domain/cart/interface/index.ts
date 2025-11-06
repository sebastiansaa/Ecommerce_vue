import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'

export interface CartItem {
    product: ProductInterface
    quantity: number
}

export interface CartState {
    items: CartItem[]
}
