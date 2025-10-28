/**
 * Limpia y formatea la query de búsqueda
 * @param query - Término de búsqueda original
 * @returns Query limpia y formateada
 */
export function parseQuery(query: string): string {
    return query
        .trim()
        .replace(/\s+/g, ' ') // Elimina espacios múltiples
        .toLowerCase()
}

/**
 * Valida si una query de búsqueda es válida
 * @param query - Término de búsqueda
 * @param minLength - Longitud mínima (default: 2)
 * @returns True si la query es válida
 */
export function isValidQuery(query: string, minLength: number = 2): boolean {
    const cleaned = parseQuery(query)
    return cleaned.length >= minLength
}

/**
 * Extrae palabras clave de una query
 * @param query - Término de búsqueda
 * @returns Array de palabras clave
 */
export function extractKeywords(query: string): string[] {
    const cleaned = parseQuery(query)
    return cleaned.split(' ').filter(word => word.length > 0)
}
