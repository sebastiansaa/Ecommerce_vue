import type { ZodSchema } from 'zod'
import { clearFields, mapZodErrors } from '../helpers'
import type { Ref } from 'vue'

/**
 * Composable para manejar validación y limpieza de formularios con Zod.
 * Centraliza la lógica de validación y gestión de errores.
 * no envia el formulario si hay errores.
 */
export function useFormHandler<T extends Record<string, any>, E extends Record<string, string>>(
  schema: ZodSchema<T>,
  fields: readonly (keyof T)[],
  errors: Ref<E>,
  form: Ref<T>
) {
  function validateAndClear() {
    // Resetea los mensajes de error previos
    fields.forEach((key) => (errors.value[key as keyof E] = '' as E[keyof E]))

    const result = schema.safeParse(form.value)
    if (!result.success) {
      errors.value = mapZodErrors(result.error, fields) as unknown as E
      return false
    }
    return true
  }

  function clearForm() {
    clearFields(form.value)
    clearFields(errors.value)
  }

  return { validateAndClear, clearForm }
}
