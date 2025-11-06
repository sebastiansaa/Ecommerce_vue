
import { API_BASE_URL } from '@/shared/api/api'
import axios from 'axios'
import type { Order } from '../interface/Order'


export async function getUserOrders(userId: string): Promise<Order[]> {
  const { data } = await axios.get<Order[]>(`${API_BASE_URL}/users/${userId}/orders`)
  return data
}


export async function getOrderDetail(orderId: string): Promise<Order> {
  const { data } = await axios.get<Order>(`${API_BASE_URL}/orders/${orderId}`)
  return data
}
