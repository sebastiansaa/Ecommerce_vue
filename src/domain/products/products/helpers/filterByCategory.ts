import type { ProductInterface } from '../interface/ProductsInterface'


export const filterProductsByCategory = (
  products: ProductInterface[] | null | undefined,
  categorySlug: string
): ProductInterface[] => {
  if (!products || !categorySlug) return []
  return products.filter(product => product.category.slug === categorySlug)
}
