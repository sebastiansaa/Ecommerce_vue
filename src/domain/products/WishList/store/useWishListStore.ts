import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { WishListItem } from '../interface/WishListItem'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { getUuidForId, adaptProductId } from '@/shared/helpers'

export const useWishListStore = defineStore('wishList', () => {
  const authStore = useAuthStore()
  const items = ref<WishListItem[]>([])

  // Ligado a usuario
  // Si el id es numérico, lo mapeamos a UUID
  const userId = computed(() => {
    const id = authStore.user?.id
    if (typeof id === 'number') return getUuidForId(id)
    return id || 'guest'
  })


  function addToWishList(product: any) {
    // Adaptar el producto para asegurar que cumple ProductInterface
    const adaptedProduct = adaptProductId(product)
    if (!items.value.find((i: WishListItem) => i.product.id === adaptedProduct.id)) {
      items.value.push({ id: Date.now().toString(), userId: userId.value, product: adaptedProduct })
      saveToLocal()
    }
  }


  function removeFromWishList(productId: string) {
    items.value = items.value.filter((i: WishListItem) => i.product.id !== productId)
    saveToLocal()
  }

  function clearWishList() {
    items.value = []
    saveToLocal()
  }


  function isInWishList(productId: string) {
    return !!items.value.find((i: WishListItem) => i.product.id === productId)
  }

  // Guardar y cargar wishlist por usuario (o guest)
  function saveToLocal() {
    localStorage.setItem(`wishlist_${userId.value}`, JSON.stringify(items.value))
  }

  function loadFromLocal() {
    const data = localStorage.getItem(`wishlist_${userId.value}`)
    if (data) {
      items.value = JSON.parse(data)
    } else {
      items.value = []
    }
  }

  // Migrar wishlist de guest a usuario autenticado
  function migrateGuestWishlist() {
    if (userId.value === 'guest') return
    const guestData = localStorage.getItem('wishlist_guest')
    if (guestData) {
      const guestItems: WishListItem[] = JSON.parse(guestData)
      // Solo migrar si el usuario no tiene wishlist propia
      if (!localStorage.getItem(`wishlist_${userId.value}`)) {
        items.value = guestItems.map(item => ({ ...item, userId: userId.value }))
        saveToLocal()
      }
      localStorage.removeItem('wishlist_guest')
    }
  }

  // Cargar wishlist al iniciar
  loadFromLocal()

  // Migrar y recargar cuando el usuario cambie (de guest a auth)
  watch(userId, (newUserId, oldUserId) => {
    // Solo recargar si el userId realmente cambió
    if (newUserId !== oldUserId) {
      if (newUserId !== 'guest') {
        migrateGuestWishlist()
      }
      loadFromLocal()
    }
  })

  return { items, addToWishList, removeFromWishList, clearWishList, isInWishList }
})
