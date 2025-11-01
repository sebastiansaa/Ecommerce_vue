
import { API_BASE_URL } from '@/shared/api/api'
import type { UserProfile } from '@/domain/user/interface/UserProfile'
import axios from 'axios'


export async function updateProfile(user: UserProfile): Promise<UserProfile> {
  const { data } = await axios.put<UserProfile>(`${API_BASE_URL}/users/${user.id}`, user)
  return data
}
