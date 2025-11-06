import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { axiosAutherizedAdapter } from '@/shared/api/axiosAuthorizedAdapter'
import { getUuidForId } from '@/domain/products/products/helpers/uuidMapper'

import type { PurchaseRecord, CreditCard } from '@/domain/payment/interface'

export const usePaymentStore = defineStore('payment', () => {
  // State
  const purchases = ref<PurchaseRecord[]>([])
  const lastPurchase = ref<PurchaseRecord | null>(null)
  const cards = ref<CreditCard[]>([])

  // Getters
  const userPurchases = computed(() => {
    const authStore = useAuthStore()
    let userId = authStore.user?.id
    if (typeof userId === 'number') userId = getUuidForId(userId)
    return purchases.value.filter(p => p.userId === userId)
  })

  // Actions
  function addPurchase(record: Omit<PurchaseRecord, 'userId'>) {
    const authStore = useAuthStore()
    let userId = authStore.user?.id || 'anon'
    if (typeof userId === 'number') userId = getUuidForId(userId)
    const fullRecord: PurchaseRecord = { ...record, userId }
    purchases.value.push(fullRecord)
    lastPurchase.value = fullRecord
    saveToLocal()
  }

  function clearPurchases() {
    purchases.value = []
    lastPurchase.value = null
    saveToLocal()
  }

  function saveToLocal() {
    localStorage.setItem('payment_purchases', JSON.stringify(purchases.value))
  }

  function loadFromLocal() {
    const data = localStorage.getItem('payment_purchases')
    if (data) {
      purchases.value = JSON.parse(data)
      lastPurchase.value = purchases.value[purchases.value.length - 1] || null
    }
  }

  async function syncWithBackend() {
    try {
      await axiosAutherizedAdapter.post('/user/purchases/sync', purchases.value)
    } catch (e) {

    }
  }

  async function fetchFromBackend() {
    try {
      const authStore = useAuthStore()
      let userId = authStore.user?.id
      if (typeof userId === 'number') userId = getUuidForId(userId)
      if (!userId) return
      const { data } = await axiosAutherizedAdapter.get(`/user/${userId}/purchases`)
      purchases.value = data as PurchaseRecord[]
      lastPurchase.value = purchases.value[purchases.value.length - 1] || null
      saveToLocal()
    } catch (e) {

    }
  }

  function addCard(card: CreditCard) {
    cards.value.push(card)
    saveCardsToLocal()
  }

  function deleteCard(id: string) {
    cards.value = cards.value.filter(card => card.id !== id)
    saveCardsToLocal()
  }
  // Persistencia de tarjetas en localStorage por usuario
  function saveCardsToLocal() {
    const authStore = useAuthStore()
    let userId = authStore.user?.id || 'anon'
    if (typeof userId === 'number') userId = getUuidForId(userId)
    localStorage.setItem(`user_cards_${userId}`, JSON.stringify(cards.value))
  }

  function loadCardsFromLocal() {
    const authStore = useAuthStore()
    let userId = authStore.user?.id || 'anon'
    if (typeof userId === 'number') userId = getUuidForId(userId)
    const data = localStorage.getItem(`user_cards_${userId}`)
    if (data) {
      cards.value = JSON.parse(data)
    }
  }

  // Inicializar tarjetas al crear el store
  loadCardsFromLocal()

  return {
    // State
    purchases,
    lastPurchase,
    cards,
    // Getters
    userPurchases,
    // Actions
    addPurchase,
    clearPurchases,
    saveToLocal,
    loadFromLocal,
    syncWithBackend,
    fetchFromBackend,
    addCard,
    deleteCard,
    saveCardsToLocal,
    loadCardsFromLocal
  }
})

/**
Funciones del store:
- Agregar una compra asociada al usuario autenticado y guardarla localmente.
- Limpiar el historial de compras.
- Guardar y cargar las compras desde localStorage.
- Sincronizar todas las compras con el backend.
- Obtener el historial de compras del usuario desde el backend y actualizar el store localmente.

- Manejar tarjetas de crédito:
  - Agregar una tarjeta de crédito.
  - Eliminar una tarjeta de crédito.
  - Listar todas las tarjetas guardadas.
*/
