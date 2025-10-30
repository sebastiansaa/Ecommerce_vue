import { axiosAutherizedAdapter } from '@/shared/api/axiosAuthorizedAdapter'
import { getLoginSchema } from '@/domain/auth/schema/loginSchema'

export async function login(email: string, password: string) {
  const data = getLoginSchema().parse({ email, password })
  return axiosAutherizedAdapter.post('/auth/login', data)
}
