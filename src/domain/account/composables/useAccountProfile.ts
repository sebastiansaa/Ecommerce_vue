import { ref, computed } from 'vue'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { updateProfile } from '@/domain/account/services/accountService'
import { getProfile } from '@/domain/auth/services/getProfileService'
import type { User } from '@/domain/auth/interface/User'
import type { AccountProfile } from '@/domain/account/interfaces/AccountProfile'

export function useAccountProfile() {
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

    async function updateUser(profile: AccountProfile) {
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
