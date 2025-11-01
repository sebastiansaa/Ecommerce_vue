import { storeToRefs } from 'pinia'
import { useWishListStore } from '../store/useWishListStore'
import { useBreakpoints } from '@/shared/composables/useBreakpoints'

export function useWishList() {
    const wishListStore = useWishListStore()
    const { items } = storeToRefs(wishListStore)
    const { isMobile, isDesktop } = useBreakpoints()

    return {
        ...wishListStore,
        items,
        isMobile,
        isDesktop
    }
}
