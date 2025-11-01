// Composable de User Orders: Gestiona órdenes del usuario autenticado
// Arquitectura: Consume authStore (Single Source of Truth) + servicios de user
//
// Responsabilidades:
// - Obtener lista de órdenes del usuario
// - Obtener detalle de una orden específica
// - Manejar loading y errores
//
// IMPORTANTE: Usa authStore.user para obtener el userId, no duplica estado.

import { ref } from 'vue'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { getUserOrders, getOrderDetail } from '@/domain/user/services/orderService'

export function useUserOrders() {
  const authStore = useAuthStore()
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchOrders() {
    if (!authStore.user) throw new Error('No hay usuario autenticado')
    loading.value = true
    error.value = null
    try {
      return await getUserOrders(authStore.user.id)
    } catch (err: any) {
      error.value = err?.message || 'Error al obtener órdenes'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchOrderDetail(orderId: string) {
    loading.value = true
    error.value = null
    try {
      return await getOrderDetail(orderId)
    } catch (err: any) {
      error.value = err?.message || 'Error al obtener detalle de orden'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchOrders,
    fetchOrderDetail
  }
}
