// Aquí puedes implementar integración futura con API o localStorage
import type { WishListItem } from '../interface/WishListItem'

export async function fetchWishList(userId: string): Promise<WishListItem[]> {
    // Simulación local, reemplazar por llamada a API en el futuro
    return []
}

export async function saveWishList(userId: string, items: WishListItem[]): Promise<void> {
    // Simulación local, reemplazar por llamada a API en el futuro
}
