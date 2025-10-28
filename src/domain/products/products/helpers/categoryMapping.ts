/**
 * Mapeo de category slugs a IDs de la API
 */
export const CATEGORY_ID_MAP: Record<string, number> = {
  'clothes': 1,
  'electronics': 2,
  'furniture': 3,
  'shoes': 4,
  'miscellaneous': 5
}

/**
 * Obtener el ID de categoría desde el slug
 * @param categorySlug - Slug de la categoría (clothes, electronics, etc.)
 * @returns ID de la categoría o undefined si no existe
 */
export function getCategoryId(categorySlug: string): number | undefined {
  return CATEGORY_ID_MAP[categorySlug]
}

/**
 * Verificar si una categoría es válida
 * @param categorySlug - Slug de la categoría
 * @returns true si la categoría existe
 */
export function isValidCategorySlug(categorySlug: string): boolean {
  return categorySlug in CATEGORY_ID_MAP
}
