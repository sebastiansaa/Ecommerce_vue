/**
 * Resalta las coincidencias de búsqueda en un texto
 * @param text - Texto original
 * @param query - Término de búsqueda
 * @returns HTML con las coincidencias resaltadas
 */
export function highlightMatch(text: string, query: string): string {
    if (!query.trim()) return text

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedQuery})`, 'gi')

    return text.replace(regex, '<mark>$1</mark>')
}

/**
 * Versión que devuelve un array de partes para renderizado en Vue
 * @param text - Texto original
 * @param query - Término de búsqueda
 * @returns Array de objetos con texto y estado de coincidencia
 */
export function highlightMatchParts(
    text: string,
    query: string
): Array<{ text: string; isMatch: boolean }> {
    if (!query.trim()) return [{ text, isMatch: false }]

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedQuery})`, 'gi')
    const parts: Array<{ text: string; isMatch: boolean }> = []

    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
        // Añadir texto antes de la coincidencia
        if (match.index > lastIndex) {
            parts.push({
                text: text.substring(lastIndex, match.index),
                isMatch: false
            })
        }

        // Añadir coincidencia
        parts.push({
            text: match[0],
            isMatch: true
        })

        lastIndex = regex.lastIndex
    }

    // Añadir texto restante
    if (lastIndex < text.length) {
        parts.push({
            text: text.substring(lastIndex),
            isMatch: false
        })
    }

    return parts
}
