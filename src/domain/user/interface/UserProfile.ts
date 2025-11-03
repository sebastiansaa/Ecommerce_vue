export interface UserProfile {
  name: string
  id: string
  email: string
  avatar?: string
  role: 'customer' | 'admin' | 'seller' | 'manager' | 'support' | 'guest' | 'superadmin'

}
