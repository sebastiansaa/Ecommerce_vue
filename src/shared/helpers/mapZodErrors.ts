import type { ZodError } from "zod"

/**
 * Transforma errores de validación de Zod en un objeto de errores mapeado por campo.
 * Útil para mostrar mensajes de error específicos en formularios.
 */
export function mapZodErrors<T extends Record<string, string>>(
  error: ZodError,
  fields: readonly (keyof T)[]
): T {
  const errors = {} as T
  fields.forEach((key) => (errors[key] = '' as T[keyof T]))

  error.issues.forEach((issue) => {
    const field = issue.path[0] as keyof T
    if (fields.includes(field)) errors[field] = issue.message as T[keyof T]
  })

  return errors
}
