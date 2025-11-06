
import { z } from 'zod'

export const creditCardFormSchema = z.object({
  holder: z.string().min(3, 'El nombre del titular es obligatorio'),
  number: z.string().regex(/^\d{16}$/, 'El número debe tener 16 dígitos'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/(\d{2})$/, 'Formato MM/AA'),
  brand: z.string().min(2, 'La marca es obligatoria'),
})
