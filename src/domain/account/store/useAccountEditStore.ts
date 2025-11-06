import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'

export const useAccountEditStore = defineStore('accountEdit', () => {
  // State
  const isEditing = ref<boolean>(false)
  const editingSection = ref<string | null>(null)
  const profile = ref<any>({})

  // Obtener el usuario actual
  const authStore = useAuthStore()
  const userId = computed(() => authStore.user?.id || null)

  // Persistencia en localStorage
  function saveProfile(newProfile: any) {
    profile.value = newProfile
    if (userId.value) {
      localStorage.setItem(`user_profile_${userId.value}`, JSON.stringify(newProfile))
    }
  }

  function loadProfile() {
    if (userId.value) {
      const saved = localStorage.getItem(`user_profile_${userId.value}`)
      if (saved) profile.value = JSON.parse(saved)
    }
  }

  // Inicializar al crear el store
  loadProfile()

  // Actions
  function startEditing(section: string) {
    isEditing.value = true
    editingSection.value = section
  }

  function stopEditing() {
    isEditing.value = false
    editingSection.value = null
  }

  return {
    // State
    isEditing,
    editingSection,
    profile,
    // Actions
    startEditing,
    stopEditing,
    saveProfile,
    loadProfile,
    userId
  }
})

// Store de edición de perfil del usuario autenticado.
// Persiste los datos del perfil en localStorage usando el ID del usuario.
// Permite mantener los cambios de perfil entre sesiones y separar datos por usuario.
