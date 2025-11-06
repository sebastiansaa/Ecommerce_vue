// Store de User: Gestiona estado de UI y preferencias del usuario autenticado
// Responsabilidades:
// - Estado de UI (tabs activos, modales, flags de vista)
// - Filtros y paginación de órdenes
// - Preferencias de visualización
// - Cualquier estado específico del dominio user que NO sea el usuario en sí
//
// IMPORTANTE: Este store NO almacena el usuario autenticado.
// Para acceder al usuario autenticado, usa useAuthStore (Single Source of Truth).
// Este patrón evita duplicación de estado y facilita el mantenimiento.
//
// Nota: Algunas funcionalidades pueden no estar soportadas por la API actual,
// pero están listas para usarse cuando se implemente una API propia más avanzada.

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  // UI: tab activo en la vista de usuario
  const activeTab = ref<string>('profile') // 'profile' | 'orders' | 'wishlist'
  // Filtros de órdenes
  const orderStatusFilter = ref<string>('all') // 'all' | 'pending' | 'completed' | 'cancelled'
  // Paginación de órdenes
  const ordersPage = ref<number>(1)
  const ordersPageSize = ref<number>(10)
  // Preferencias de vista
  const showOrderDetails = ref<boolean>(false)

  // Actions
  function setActiveTab(tab: string) {
    activeTab.value = tab
  }

  function setOrderStatusFilter(status: string) {
    orderStatusFilter.value = status
  }

  function setOrdersPage(page: number) {
    ordersPage.value = page
  }

  function setOrdersPageSize(size: number) {
    ordersPageSize.value = size
  }

  function setShowOrderDetails(show: boolean) {
    showOrderDetails.value = show
  }

  return {
    // State
    activeTab,
    orderStatusFilter,
    ordersPage,
    ordersPageSize,
    showOrderDetails,
    // Actions
    setActiveTab,
    setOrderStatusFilter,
    setOrdersPage,
    setOrdersPageSize,
    setShowOrderDetails
  }
})
