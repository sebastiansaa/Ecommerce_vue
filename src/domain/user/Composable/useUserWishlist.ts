// Composable de User Wishlist: Gestiona wishlist del usuario autenticado
// Arquitectura: Consume authStore (Single Source of Truth) + servicios de products/wishlist
//
// Responsabilidades:
// - Obtener wishlist del usuario
// - Guardar wishlist del usuario
// - Manejar loading y errores
//
// IMPORTANTE: Usa authStore.user para obtener el userId, no duplica estado.
// Reutiliza servicios del dominio products/wishlist (DRY).

import { ref } from 'vue'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { fetchWishList, saveWishList } from '@/domain/products/WishList/services/wishListService'

export function useUserWishlist() {
  const authStore = useAuthStore()
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchUserWishList() {
    if (!authStore.user) throw new Error('No hay usuario autenticado')
    loading.value = true
    error.value = null
    try {
      return await fetchWishList(authStore.user.id)
    } catch (err: any) {
      error.value = err?.message || 'Error al obtener wishlist'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function saveUserWishList(items: any[]) {
    if (!authStore.user) throw new Error('No hay usuario autenticado')
    loading.value = true
    error.value = null
    try {
      await saveWishList(authStore.user.id, items)
    } catch (err: any) {
      error.value = err?.message || 'Error al guardar wishlist'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchUserWishList,
    saveUserWishList
  }
}
