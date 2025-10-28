import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SearchResult, SearchSuggestion, SearchHistoryItem } from '../interface'
import { searchProducts, getSuggestions, getHistory, saveToHistory, clearHistory } from '../services'

export const useSearchStore = defineStore('search', () => {
    // State
    const query = ref('')
    const results = ref<SearchResult[]>([])
    const suggestions = ref<SearchSuggestion[]>([])
    const history = ref<SearchHistoryItem[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const showResults = ref(false)

    // Getters
    const hasResults = computed(() => results.value.length > 0)
    const hasQuery = computed(() => query.value.trim().length > 0)
    const recentSearches = computed(() => history.value.slice(0, 5))

    // Actions
    async function search(searchTerm: string) {
        query.value = searchTerm

        if (!searchTerm.trim() || searchTerm.length < 2) {
            error.value = 'El término de búsqueda debe tener al menos 2 caracteres'
            return
        }

        loading.value = true
        error.value = null

        try {
            results.value = await searchProducts({
                term: searchTerm,
                limit: 20
            })

            saveToHistory(searchTerm)
            loadHistory()
            showResults.value = true
        } catch (err: any) {
            error.value = err.message || 'Error al buscar productos'
            results.value = []
        } finally {
            loading.value = false
        }
    }

    async function loadSuggestions(searchTerm: string) {
        if (!searchTerm.trim() || searchTerm.length < 2) {
            suggestions.value = []
            return
        }

        try {
            suggestions.value = await getSuggestions(searchTerm)
        } catch (err) {
            console.error('Error loading suggestions:', err)
            suggestions.value = []
        }
    }

    function loadHistory() {
        history.value = getHistory()
    }

    function clearSearchHistory() {
        clearHistory()
        history.value = []
    }

    function clearResults() {
        results.value = []
        query.value = ''
        error.value = null
        showResults.value = false
    }

    function hideResults() {
        showResults.value = false
    }

    // Inicializar historial
    loadHistory()

    return {
        // State
        query,
        results,
        suggestions,
        history,
        loading,
        error,
        showResults,

        // Getters
        hasResults,
        hasQuery,
        recentSearches,

        // Actions
        search,
        loadSuggestions,
        loadHistory,
        clearSearchHistory,
        clearResults,
        hideResults
    }
})
