import { axiosAdapter, type HttpClient } from "@/shared/api";
import type { ProductInterface } from "../interface";
import { useCategoryStore } from '../store/categoryStore';

/**
 * Obtener productos de una categoría específica
 * @param categorySlug - Slug de la categoría (clothes, electronics, etc.)
 * @param offset - Punto de inicio para paginación
 * @param limit - Cantidad de productos a obtener
 * @param httpClient - Cliente HTTP (por defecto axiosAdapter)
 * @returns Productos de la categoría específica
 */
export const getProductsByCategory = async (
  categorySlug: string,
  offset: number = 0,
  limit: number = 10,
  httpClient: HttpClient = axiosAdapter
): Promise<ProductInterface[]> => {
  try {
    const categoryStore = useCategoryStore();
    // Asegurarse de que las categorías estén cargadas
    if (!categoryStore.loaded) {
      await categoryStore.fetchCategories();
    }
    const categoryId = categoryStore.getIdBySlug(categorySlug);
    if (!categoryId) {
      console.warn(`❌ Invalid category slug: ${categorySlug}`);
      return [];
    }
    const url = `/categories/${categoryId}/products?offset=${offset}&limit=${limit}`;
    console.log(`🎯 Loading ${categorySlug} products: ${url}`);
    const response = await httpClient.get<ProductInterface[]>(url);
    console.log(`✅ Received ${response.data.length} products for ${categorySlug}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching products for category ${categorySlug}:`, error);
    throw error;
  }
}
