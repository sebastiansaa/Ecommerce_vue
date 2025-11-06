import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'

export const useAddressStore = defineStore('address', () => {
  // Estado: dirección del usuario autenticado
  const address = ref<string>('')

  // Obtener el usuario actual
  const authStore = useAuthStore()
  const userId = computed(() => authStore.user?.id || null)

  // Guardar dirección en localStorage vinculada al userId
  function setAddress(newAddress: string) {
    address.value = newAddress
    if (userId.value) {
      localStorage.setItem(`user_address_${userId.value}`, newAddress)
    }
  }

  // Cargar dirección desde localStorage al iniciar
  function loadAddress() {
    if (userId.value) {
      const saved = localStorage.getItem(`user_address_${userId.value}`)
      if (saved) address.value = saved
    }
  }

  // Inicializar al crear el store
  loadAddress()

  return {
    address,
    setAddress,
    loadAddress,
    userId
  }
})

// Store de direcciones del usuario autenticado.
// Persiste la dirección en localStorage usando el ID del usuario.
// Útil para mantener la dirección entre sesiones y separar datos por usuario.
