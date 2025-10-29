<template>
  <div class="searchbar">
    <div class="searchbar__container">
      <IconButton class="searchbar__icon-search" aria-label="Buscar" @click="handleSearch">
        🔍
      </IconButton>

      <input
        v-model="searchQuery"
        type="text"
        class="searchbar__input"
        placeholder="Buscar productos..."
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleSearch"
        @input="handleInput"
      />

      <IconButton
        v-if="searchQuery"
        class="searchbar__icon-clear"
        aria-label="Limpiar búsqueda"
        @click="handleClear"
      >
        ✕
      </IconButton>
    </div>

    <!-- Dropdown de sugerencias e historial -->
    <div v-if="showDropdown" class="searchbar__dropdown">
      <SearchHistory
        v-if="!searchQuery && historySuggestions.length > 0"
        :history="historySuggestions"
        @select="handleHistorySelect"
        @remove="handleHistoryRemove"
      />

      <SearchSuggestions
        v-if="searchQuery && suggestions.length > 0"
        :suggestions="suggestions"
        :loading="loadingSuggestions"
        @select="handleSuggestionSelect"
      />
    </div>

    <!-- Drawer con resultados -->
    <Drawer v-model="showResults">
      <SearchResults
        :results="results"
        :loading="loadingResults"
        :error="error"
        @close="closeResults"
      />
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconButton } from '@/shared/components/ui/actions/buttons'
import { Drawer } from '@/shared/components/ui/display'
import { SearchHistory, SearchSuggestions, SearchResults } from '.'
import { useSuggestion } from '../Composable'
import { searchProducts } from '../services'
import { removeFromHistory, getHistorySuggestions, saveToHistory } from '../services/historyService'
import type { SearchResult } from '../interface'

const searchQuery = ref('')
const showDropdown = ref(false)
const showResults = ref(false)
const results = ref<SearchResult[]>([])
const loadingResults = ref(false)
const error = ref<string | null>(null)

// Composable para sugerencias
const {
  suggestions,
  historySuggestions,
  loading: loadingSuggestions,
  show: showSuggestions,
  hide: hideSuggestions,
} = useSuggestion(searchQuery)

// Handlers
const handleFocus = () => {
  showDropdown.value = true
  showSuggestions()
}

const handleBlur = () => {
  // Delay para permitir clicks en el dropdown
  setTimeout(() => {
    showDropdown.value = false
    hideSuggestions()
  }, 200)
}

const handleInput = () => {
  if (searchQuery.value.trim().length >= 2) {
    showDropdown.value = true
  }
}

const handleSearch = async () => {
  if (!searchQuery.value.trim() || searchQuery.value.length < 2) return

  loadingResults.value = true
  error.value = null
  showDropdown.value = false

  try {
    results.value = await searchProducts({
      term: searchQuery.value,
      limit: 20,
    })

    saveToHistory(searchQuery.value)
    showResults.value = true
  } catch (err: any) {
    error.value = err.message || 'Error al buscar productos'
  } finally {
    loadingResults.value = false
  }
}

const handleClear = () => {
  searchQuery.value = ''
  results.value = []
  error.value = null
  showDropdown.value = false
}

const handleHistorySelect = (term: string) => {
  searchQuery.value = term
  handleSearch()
}

const handleHistoryRemove = (id: string) => {
  removeFromHistory(id)
  historySuggestions.value = getHistorySuggestions('')
}

const handleSuggestionSelect = (text: string) => {
  searchQuery.value = text
  handleSearch()
}

const closeResults = () => {
  showResults.value = false
}
</script>

<style scoped>
.searchbar {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.searchbar__container {
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 0.25rem 0.5rem;
  transition: border-color 0.2s;
}

.searchbar__container:focus-within {
  border-color: #ff9800;
}

.searchbar__icon-search {
  font-size: 1.25rem;
  color: #666;
}

.searchbar__input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background: transparent;
}

.searchbar__input::placeholder {
  color: #999;
}

.searchbar__icon-clear {
  font-size: 1.5rem;
  color: #999;
}

.searchbar__dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
  z-index: 100;
}

@media (max-width: 768px) {
  .searchbar {
    max-width: 100%;
  }

  .searchbar__input {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>
