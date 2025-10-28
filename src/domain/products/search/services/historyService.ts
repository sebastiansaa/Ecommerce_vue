import type { SearchHistoryItem } from '../interface'

const HISTORY_KEY = 'search_history'
const MAX_HISTORY_ITEMS = 10

/**
 * Guarda un término de búsqueda en el historial (localStorage)
 * @param term - Término de búsqueda
 */
export const saveToHistory = (term: string): void => {
    if (!term.trim()) return

    const history = getHistory()

    // Eliminar duplicados
    const filtered = history.filter(item => item.term.toLowerCase() !== term.toLowerCase())

    // Agregar nuevo término al inicio
    const newItem: SearchHistoryItem = {
        id: `history-${Date.now()}`,
        term: term.trim(),
        timestamp: Date.now()
    }

    filtered.unshift(newItem)

    // Limitar a MAX_HISTORY_ITEMS
    const limited = filtered.slice(0, MAX_HISTORY_ITEMS)

    localStorage.setItem(HISTORY_KEY, JSON.stringify(limited))
}

/**
 * Obtiene el historial de búsquedas desde localStorage
 * @returns Array de items del historial
 */
export const getHistory = (): SearchHistoryItem[] => {
    try {
        const stored = localStorage.getItem(HISTORY_KEY)
        if (!stored) return []

        return JSON.parse(stored) as SearchHistoryItem[]
    } catch (error) {
        console.error('Error reading search history:', error)
        return []
    }
}

/**
 * Elimina un item del historial
 * @param id - ID del item a eliminar
 */
export const removeFromHistory = (id: string): void => {
    const history = getHistory()
    const filtered = history.filter(item => item.id !== id)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered))
}

/**
 * Limpia todo el historial de búsquedas
 */
export const clearHistory = (): void => {
    localStorage.removeItem(HISTORY_KEY)
}

/**
 * Obtiene sugerencias del historial que coincidan con un término
 * @param query - Término de búsqueda
 * @returns Array de items del historial que coinciden
 */
export const getHistorySuggestions = (query: string): SearchHistoryItem[] => {
    if (!query.trim()) return getHistory()

    const history = getHistory()
    const lowerQuery = query.toLowerCase()

    return history.filter(item =>
        item.term.toLowerCase().includes(lowerQuery)
    )
}
