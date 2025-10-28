import { ref, onMounted, onUnmounted, watch, computed, unref } from 'vue'
import type { ProductInterface } from '../interface/ProductsInterface'
import { getProductsByCategory } from '../services'
import { isValidCategorySlug } from '../helpers'
import type { MaybeRef } from 'vue'

const CATEGORY_SCROLL_CONFIG = {
  limit: 10,
  threshold: 100,
  initialLoad: 1, // Solo 1 carga inicial, luego scroll
}

interface CategoryScrollOptions {
  limit?: number
  threshold?: number
  initialLoad?: number
}

export function useCategoryInfiniteScroll(
  categorySlug: MaybeRef<string>,
  options: CategoryScrollOptions = {}
) {
  const products = ref<ProductInterface[]>([])
  const offset = ref(0)
  const limit = options.limit ?? CATEGORY_SCROLL_CONFIG.limit
  const threshold = options.threshold ?? CATEGORY_SCROLL_CONFIG.threshold
  const initialLoad = options.initialLoad ?? CATEGORY_SCROLL_CONFIG.initialLoad
  const isLoading = ref(false)
  const hasMore = ref(true)
  const error = ref<string | null>(null)

  // Computed para obtener el valor reactivo de categorySlug
  const currentCategory = computed(() => unref(categorySlug))

  async function loadMore() {
    if (isLoading.value || !hasMore.value || !currentCategory.value) return

    // Validar categoría
    if (!isValidCategorySlug(currentCategory.value)) {
      error.value = `Invalid category: ${currentCategory.value}`
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await getProductsByCategory(currentCategory.value, offset.value, limit)

      if (response.length === 0) {
        hasMore.value = false
      } else {
        products.value.push(...response)
        offset.value += limit
      }
    } catch (err) {
      error.value = `Failed to load ${categorySlug} products`
      hasMore.value = false
    } finally {
      isLoading.value = false
    }
  }

  function handleScroll() {
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold
    if (bottom) {
      loadMore()
    }
  }

  // Reset cuando cambia la categoría
  function resetProducts() {
    products.value = []
    offset.value = 0
    hasMore.value = true
    error.value = null
  }

  // Watch para cambios de categoría
  watch(currentCategory, (newCategory) => {
    resetProducts()
    // Cargar productos de la nueva categoría
    for (let i = 0; i < initialLoad; i++) {
      loadMore()
      if (!hasMore.value) break
    }
  }, { immediate: true })

  onMounted(async () => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    products,
    isLoading,
    hasMore,
    error,
    loadMore,
    resetProducts
  }
}
