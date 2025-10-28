import { useRouter } from 'vue-router'
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'

/**
 * Composable para manejar navegación relacionada con productos
 * Encapsula la lógica de router y navegación a diferentes vistas de productos
 */
export function useProductNavigation() {
  const router = useRouter()

  /**
   * Navega a la vista de detalle de un producto
   * @param product - Producto al que se quiere navegar
   */
  const navigateToProduct = (product: ProductInterface) => {
    router.push({
      name: 'ProductDetail',
      params: {
        category: product.category.slug,
        id: product.id.toString(),
      },
    })
  }

  /**
   * Navega a la vista de productos filtrados por categoría
   * @param categorySlug - Slug de la categoría
   */
  const navigateToCategory = (categorySlug: string) => {
    router.push({
      name: 'ProductsByCategory',
      params: { category: categorySlug },
    })
  }

  return {
    navigateToProduct,
    navigateToCategory,
  }
}
