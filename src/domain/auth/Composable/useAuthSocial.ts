/** Composable para autenticación social */

import { ref } from 'vue'
import { axiosAutherizedAdapter } from '@/shared/api'

export function useAuthSocial() {
  const isLoadingGoogle = ref(false)
  const isLoadingFacebook = ref(false)
  const errorGoogle = ref<Error | null>(null)
  const errorFacebook = ref<Error | null>(null)

  async function loginWithGoogle(token: string) {
    isLoadingGoogle.value = true
    errorGoogle.value = null
    try {
      const response = await axiosAutherizedAdapter.post('/auth/social/google', { token })
      return response.data
    } catch (error) {
      errorGoogle.value = error as Error
      throw error
    } finally {
      isLoadingGoogle.value = false
    }
  }

  async function loginWithFacebook(token: string) {
    isLoadingFacebook.value = true
    errorFacebook.value = null
    try {
      const response = await axiosAutherizedAdapter.post('/auth/social/facebook', { token })
      return response.data
    } catch (error) {
      errorFacebook.value = error as Error
      throw error
    } finally {
      isLoadingFacebook.value = false
    }
  }

  return {
    loginWithGoogle,
    loginWithFacebook,
    isLoadingGoogle,
    isLoadingFacebook,
    errorGoogle,
    errorFacebook
  }
}
