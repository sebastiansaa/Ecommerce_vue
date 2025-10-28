// Interfaces para el dominio search
import type { ProductInterface } from '../../products/interface'

// SearchResult usa la misma estructura que ProductInterface de la API
export type SearchResult = ProductInterface

export interface SearchQuery {
  term: string
  categoryId?: number
  minPrice?: number
  maxPrice?: number
  limit?: number
  offset?: number
}

export interface SearchHistoryItem {
  id: string
  term: string
  timestamp: number
}

export interface SearchSuggestion {
  id: string
  text: string
  type: 'product' | 'category' | 'recent'
}

export interface SearchState {
  query: string
  results: SearchResult[]
  suggestions: SearchSuggestion[]
  history: SearchHistoryItem[]
  loading: boolean
  error: string | null
}
