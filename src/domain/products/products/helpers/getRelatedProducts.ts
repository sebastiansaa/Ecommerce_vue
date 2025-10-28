import type { ProductInterface } from '../interface/ProductsInterface'
import { filterProductsByCategory } from './filterByCategory'

export const getRelatedProducts = (
  allProducts: ProductInterface[] | null | undefined,
  currentProduct: ProductInterface,
  maxResults: number = 6
): ProductInterface[] => {
  if (!allProducts?.length || !currentProduct.category) return []

  const filtered = filterProductsByCategory(allProducts, currentProduct.category.slug)

  return filtered
    .filter((product) => product.id !== currentProduct.id)
    .slice(0, maxResults)
}
