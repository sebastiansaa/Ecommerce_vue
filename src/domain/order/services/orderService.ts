
import { API_BASE_URL } from '@/shared/api/api'
import axios from 'axios'
import type { UserOrder } from '@/domain/user/interface/UserOrder'


export async function getUserOrders(userId: string): Promise<UserOrder[]> {
  const { data } = await axios.get<UserOrder[]>(`${API_BASE_URL}/users/${userId}/orders`)
  return data
}


export async function getOrderDetail(orderId: string): Promise<UserOrder> {
  const { data } = await axios.get<UserOrder>(`${API_BASE_URL}/orders/${orderId}`)
  return data
}
