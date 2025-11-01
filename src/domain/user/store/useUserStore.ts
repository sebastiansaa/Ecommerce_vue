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

export const useUserStore = defineStore('user', {
  state: () => ({
    // UI: tab activo en la vista de usuario
    activeTab: 'profile', // 'profile' | 'orders' | 'wishlist'
    // Filtros de órdenes
    orderStatusFilter: 'all', // 'all' | 'pending' | 'completed' | 'cancelled'
    // Paginación de órdenes
    ordersPage: 1,
    ordersPageSize: 10,
    // Preferencias de vista
    showOrderDetails: false,
    // Otros flags de UI o preferencias específicas del usuario
  }),
  actions: {
    setActiveTab(tab: string) {
      this.activeTab = tab
    },
    setOrderStatusFilter(status: string) {
      this.orderStatusFilter = status
    },
    setOrdersPage(page: number) {
      this.ordersPage = page
    },
    setOrdersPageSize(size: number) {
      this.ordersPageSize = size
    },
    setShowOrderDetails(show: boolean) {
      this.showOrderDetails = show
    },
  },
})
