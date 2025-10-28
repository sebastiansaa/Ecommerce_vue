import type { ProductInterface } from '../interface/ProductsInterface'

/**
 * Validar si un ID de producto es válido
 * @param id - ID del producto a validar
 * @returns true si el ID es potencialmente válido
 */
export function isValidProductId(id: number | string): boolean {
  const numId = Number(id)

  // Validaciones básicas
  if (isNaN(numId) || numId <= 0) {
    return false
  }

  // Los IDs muy bajos probablemente no existen en la API actual
  if (numId < 100) {
    console.warn(`Product ID ${numId} might not exist (too low)`)
  }

  return true
}

/**
 * Sanitizar un producto antes de usarlo
 * @param product - Producto a validar
 * @returns true si el producto es válido
 */
export function isValidProduct(product: ProductInterface): boolean {
  if (!product) return false

  const hasRequiredFields = !!(
    product.id &&
    product.title &&
    product.category
  )

  if (!hasRequiredFields) {
    console.warn('Product missing required fields:', product)
    return false
  }

  return true
}

/**
 * Obtener productos válidos filtrados
 * @param products - Array de productos
 * @returns Productos válidos únicamente
 */
export function getValidProducts(products: ProductInterface[]): ProductInterface[] {
  if (!Array.isArray(products)) return []

  return products.filter(isValidProduct)
}

/**
 * Crear URL segura para producto
 * @param product - Producto para crear URL
 * @returns Parámetros seguros para router
 */
export function createSafeProductRoute(product: ProductInterface) {
  if (!isValidProduct(product)) {
    throw new Error('Cannot create route for invalid product')
  }

  return {
    name: 'ProductDetail',
    params: {
      category: product.category.slug || 'productos',
      id: product.id.toString(),
    },
  }
}