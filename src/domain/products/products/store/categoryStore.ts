// la api cambia la forma de obtener las categorias
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CategoryInterface } from '../interface'
import { axiosAdapter } from '@/shared/api'

export const useCategoryStore = defineStore('categoryStore', () => {
  const categories = ref<CategoryInterface[]>([])
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref<string | null>(null)

  // Mapeo slug -> id
  const slugToId = computed(() => {
    const map: Record<string, number> = {}
    categories.value.forEach(cat => {
      map[cat.slug] = cat.id
    })
    return map
  })

  async function fetchCategories() {
    if (loaded.value || loading.value) return
    loading.value = true
    error.value = null
    try {
      const res = await axiosAdapter.get<CategoryInterface[]>('/categories')
      categories.value = res.data
      loaded.value = true
    } catch (e: any) {
      error.value = e.message || 'Error loading categories'
    } finally {
      loading.value = false
    }
  }

  function getIdBySlug(slug: string): number | undefined {
    return slugToId.value[slug]
  }

  return {
    categories,
    loading,
    loaded,
    error,
    fetchCategories,
    getIdBySlug,
    slugToId
  }
})
