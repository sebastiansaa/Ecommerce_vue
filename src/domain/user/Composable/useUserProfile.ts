// Composable de User Profile: Gestiona perfil del usuario autenticado
// Arquitectura: Consume authStore (Single Source of Truth) + servicios de user
//
// Responsabilidades:
// - Obtener y refrescar perfil del usuario desde la API
// - Actualizar perfil y sincronizar con authStore
// - Actualizar avatar
// - Logout
//
// IMPORTANTE: No duplica el estado del usuario, lo consume de authStore.
// Agrega funcionalidades específicas del dominio user (update, refresh, etc.)

import { ref, computed } from 'vue'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { updateProfile } from '@/domain/user/services/userService'
import { getProfile } from '@/domain/auth/services/getProfileService'
import type { User } from '@/domain/auth/interface/User'
import type { UserProfile } from '@/domain/user/interface/UserProfile'

export function useUserProfile() {
  const authStore = useAuthStore()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const user = computed(() => authStore.user)

  function getUser(): User | null {
    return authStore.user
  }

  async function refreshUser() {
    loading.value = true
    error.value = null
    try {
      if (!authStore.token) throw new Error('No hay token de autenticación')
      const user = await getProfile(authStore.token)
      authStore.setUser(user)
      return user
    } catch (err: any) {
      error.value = err?.message || 'Error al refrescar usuario'
      authStore.restoreSession()
      return authStore.user
    } finally {
      loading.value = false
    }
  }

  async function updateUser(profile: UserProfile) {
    loading.value = true
    error.value = null
    try {
      const updated = await updateProfile(profile)
      authStore.setUser(updated as User)
      return updated
    } catch (err: any) {
      error.value = err?.message || 'Error al actualizar el perfil'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateAvatar(avatarUrl: string) {
    if (!authStore.user) throw new Error('No hay usuario autenticado')
    const updated = { ...authStore.user, avatar: avatarUrl }
    authStore.setUser(updated)
    return updated
  }

  function logout() {
    authStore.logout()
  }

  return {
    user,
    loading,
    error,
    getUser,
    refreshUser,
    updateUser,
    updateAvatar,
    logout
  }
}
