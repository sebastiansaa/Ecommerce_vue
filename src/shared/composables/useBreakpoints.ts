import { ref, onMounted, onUnmounted, computed } from 'vue'
import { SHARED_CONFIG } from '@/shared/config'

/**
 * Composable para manejar breakpoints responsive de forma consistente
 * Usa los valores definidos en SHARED_CONFIG.breakpoints
 */
export function useBreakpoints() {
    const windowWidth = ref(0)
    const windowHeight = ref(0)

    function updateDimensions() {
        windowWidth.value = window.innerWidth
        windowHeight.value = window.innerHeight
    }

    onMounted(() => {
        updateDimensions()
        window.addEventListener('resize', updateDimensions)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', updateDimensions)
    })

    // Breakpoints básicos
    const isMobile = computed(() => windowWidth.value <= SHARED_CONFIG.breakpoints.mobile)
    const isTablet = computed(
        () =>
            windowWidth.value >= SHARED_CONFIG.breakpoints.tablet &&
            windowWidth.value <= SHARED_CONFIG.breakpoints.tabletMax,
    )
    const isDesktop = computed(() => windowWidth.value >= SHARED_CONFIG.breakpoints.desktop)

    // Breakpoints especiales
    const isTabletLandscape = computed(() => {
        const isInTabletRange =
            windowWidth.value >= SHARED_CONFIG.breakpoints.tablet &&
            windowWidth.value < SHARED_CONFIG.breakpoints.desktop
        const isLandscape = windowWidth.value > windowHeight.value
        return isInTabletRange && isLandscape
    })

    const isTabletLandscapeOrDesktop = computed(
        () => isTabletLandscape.value || isDesktop.value,
    )

    return {
        windowWidth,
        windowHeight,
        isMobile,
        isTablet,
        isDesktop,
        isTabletLandscape,
        isTabletLandscapeOrDesktop,
    }
}
