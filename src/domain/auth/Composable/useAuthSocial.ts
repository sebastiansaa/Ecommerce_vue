/** Composable para autenticación social */

import { axiosAutherizedAdapter } from "@/shared/api"
import { useMutation } from "@tanstack/vue-query"

export function useAuthSocial() {

  const loginWithGoogle = useMutation({
    mutationFn: async (token: string) => {
      return axiosAutherizedAdapter.post('/auth/social/google', { token })
    }
  })

  const loginWithFacebook = useMutation({
    mutationFn: async (token: string) => {
      return axiosAutherizedAdapter.post('/auth/social/facebook', { token })
    }
  })

  return { loginWithGoogle, loginWithFacebook }
}
