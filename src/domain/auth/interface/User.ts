// Interfaz de usuario autenticado
export interface User {
  id: number
  email: string
  name: string
  role: string // 'customer', 'admin', etc.
  avatar?: string
  password?: string
}
