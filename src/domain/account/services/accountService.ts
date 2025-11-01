
import { API_BASE_URL } from '@/shared/api/api'
import type { AccountProfile } from '@/domain/account/interface/AccountProfile'
import axios from 'axios'

export async function updateProfile(user: AccountProfile): Promise<AccountProfile> {
    const { data } = await axios.put<AccountProfile>(`${API_BASE_URL}/users/${user.id}`, user)
    return data
}
