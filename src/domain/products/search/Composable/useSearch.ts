import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { SearchResult, SearchQuery } from '../interface'
import { searchProducts } from '../services'
import { saveToHistory } from '../services'
import { parseQuery, isValidQuery } from '../helpers'

export function useSearch() {
    const router = useRouter()

    const query = ref('')
    const results = ref<SearchResult[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const hasResults = computed(() => results.value.length > 0)
    const hasQuery = computed(() => query.value.trim().length > 0)
    const isQueryValid = computed(() => isValidQuery(query.value))

    /**
     * Ejecuta la búsqueda de productos
     */
    const search = async (searchParams?: Partial<SearchQuery>) => {
        const cleanQuery = parseQuery(query.value)

        if (!isValidQuery(cleanQuery)) {
            error.value = 'El término de búsqueda debe tener al menos 2 caracteres'
            return
        }

        loading.value = true
        error.value = null

        try {
            const params: SearchQuery = {
                term: cleanQuery,
                limit: 20,
                ...searchParams
            }

            results.value = await searchProducts(params)

            // Guardar en historial
            saveToHistory(cleanQuery)
        } catch (err: any) {
            error.value = err.message || 'Error al buscar productos'
            results.value = []
        } finally {
            loading.value = false
        }
    }

    /**
     * Limpia los resultados y el query
     */
    const clear = () => {
        query.value = ''
        results.value = []
        error.value = null
    }

    /**
     * Navega a la página de resultados de búsqueda
     */
    const navigateToResults = () => {
        if (!isQueryValid.value) return

        router.push({
            name: 'search',
            query: { q: query.value }
        })
    }

    return {
        query,
        results,
        loading,
        error,
        hasResults,
        hasQuery,
        isQueryValid,
        search,
        clear,
        navigateToResults
    }
}
