import type { HttpClient } from '@/shared/api/HttpClient'
import { axiosAdapter } from '@/shared/api'
import type { SearchSuggestion } from '../interface'
import type { ProductInterface, CategoryInterface } from '../../products/interface'

/**
 * Obtiene sugerencias de búsqueda basadas en productos y categorías
 * @param query - Término de búsqueda
 * @param httpClient - Cliente HTTP
 * @returns Array de sugerencias
 */
export const getSuggestions = async (
    query: string,
    httpClient: HttpClient = axiosAdapter
): Promise<SearchSuggestion[]> => {
    if (!query.trim() || query.length < 2) {
        return []
    }

    try {
        // Búsqueda de productos que coincidan con el término
        const productsResponse = await httpClient.get<ProductInterface[]>(
            `/products?title=${encodeURIComponent(query)}&limit=5`
        )

        const suggestions: SearchSuggestion[] = []

        // Agregar productos como sugerencias
        productsResponse.data.forEach((product) => {
            suggestions.push({
                id: `product-${product.id}`,
                text: product.title,
                type: 'product'
            })
        })

        // Agregar categorías únicas de los productos encontrados
        const uniqueCategories = new Map<number, CategoryInterface>()
        productsResponse.data.forEach((product) => {
            if (!uniqueCategories.has(product.category.id)) {
                uniqueCategories.set(product.category.id, product.category)
            }
        })

        uniqueCategories.forEach((category) => {
            suggestions.push({
                id: `category-${category.id}`,
                text: category.name,
                type: 'category'
            })
        })

        return suggestions.slice(0, 8) // Limitar a 8 sugerencias
    } catch (error) {
        console.error('Error fetching suggestions:', error)
        return []
    }
}
