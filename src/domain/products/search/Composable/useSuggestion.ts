import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { SearchSuggestion, SearchHistoryItem } from '../interface'
import { getSuggestions } from '../services/suggestionService'
import { getHistorySuggestions } from '../services/historyService'
import { debounce } from '../helpers'

export function useSuggestion(searchQuery: Ref<string>) {
    const suggestions = ref<SearchSuggestion[]>([])
    const historySuggestions = ref<SearchHistoryItem[]>([])
    const loading = ref(false)
    const showSuggestions = ref(false)

    /**
     * Carga sugerencias desde la API
     */
    const loadSuggestions = async (query: string) => {
        if (!query.trim() || query.length < 2) {
            suggestions.value = []
            return
        }

        loading.value = true

        try {
            suggestions.value = await getSuggestions(query)
        } catch (error) {
            console.error('Error loading suggestions:', error)
            suggestions.value = []
        } finally {
            loading.value = false
        }
    }

    /**
     * Carga sugerencias del historial local
     */
    const loadHistorySuggestions = (query: string) => {
        historySuggestions.value = getHistorySuggestions(query)
    }

    /**
     * Función debounced para cargar sugerencias
     */
    const debouncedLoadSuggestions = debounce(async (query: string) => {
        await loadSuggestions(query)
        loadHistorySuggestions(query)
    }, 300)

    /**
     * Muestra el panel de sugerencias
     */
    const show = () => {
        showSuggestions.value = true
    }

    /**
     * Oculta el panel de sugerencias
     */
    const hide = () => {
        showSuggestions.value = false
    }

    /**
     * Limpia las sugerencias
     */
    const clear = () => {
        suggestions.value = []
        historySuggestions.value = []
    }

    // Watch para cargar sugerencias cuando cambia el query
    watch(searchQuery, (newQuery) => {
        if (newQuery.trim().length >= 2) {
            debouncedLoadSuggestions(newQuery)
            show()
        } else {
            clear()
            loadHistorySuggestions('')
        }
    })

    return {
        suggestions,
        historySuggestions,
        loading,
        showSuggestions,
        loadSuggestions,
        show,
        hide,
        clear
    }
}
