// Convierte el id de un producto a string si es number
// Útil para adaptar productos de la API a la UI tipada con UUID
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'

export function adaptProductId(product: ProductInterface): ProductInterface {
  return {
    ...product,
    id: typeof product.id === 'number' ? String(product.id) : product.id,

    category: {
      ...product.category,
      id: typeof product.category.id === 'number' ? String(product.category.id) : product.category.id,
    },
  }
}
