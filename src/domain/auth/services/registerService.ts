import { axiosAutherizedAdapter } from '@/shared/api/axiosAuthorizedAdapter'
import { getRegisterSchema } from '../schema/registerSchema'

export async function register(name: string, email: string, password: string) {
  const data = getRegisterSchema().parse({ name, email, password });
  return axiosAutherizedAdapter.post('/auth/register', data);
}
