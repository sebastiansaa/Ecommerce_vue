/**
 * Debounce function to limit the rate of function execution
 * Útil para evitar llamadas excesivas a la API mientras el usuario escribe
 */
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number = 300
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    return function (this: any, ...args: Parameters<T>) {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
