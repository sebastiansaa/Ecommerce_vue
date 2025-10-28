import type { HttpClient } from '@/shared/api/HttpClient'
import { axiosAdapter } from '@/shared/api'
import type { SearchResult, SearchQuery } from '../interface'

/**
 * Busca productos por título
 * @param query - Parámetros de búsqueda
 * @param httpClient - Cliente HTTP (por defecto axiosAdapter)
 * @returns Array de productos encontrados
 */
export const searchProducts = async (
  query: SearchQuery,
  httpClient: HttpClient = axiosAdapter
): Promise<SearchResult[]> => {
  try {
    const params = new URLSearchParams()

    if (query.term) params.append('title', query.term)
    if (query.categoryId) params.append('categoryId', query.categoryId.toString())
    if (query.minPrice) params.append('price_min', query.minPrice.toString())
    if (query.maxPrice) params.append('price_max', query.maxPrice.toString())
    if (query.limit) params.append('limit', query.limit.toString())
    if (query.offset) params.append('offset', query.offset.toString())

    const url = `/products?${params.toString()}`
    const response = await httpClient.get<SearchResult[]>(url)

    return response.data
  } catch (error) {
    console.error('Error searching products:', error)
    throw error
  }
}

/**
 * Busca productos por título (versión simplificada)
 * @param title - Término de búsqueda
 * @param httpClient - Cliente HTTP
 * @returns Array de productos encontrados
 */
export const searchByTitle = async (
  title: string,
  httpClient: HttpClient = axiosAdapter
): Promise<SearchResult[]> => {
  return searchProducts({ term: title, limit: 20 }, httpClient)
}
