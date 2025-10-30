import { z } from 'zod'

export const buyNowFormSchema = z.object({
    address: z.string().min(5, 'La dirección es obligatoria'),
    paymentMethod: z.enum(['credit', 'debit', 'paypal'], {
        required_error: 'Debes seleccionar un método de pago',
    }),
})

export type BuyNowFormSchema = z.infer<typeof buyNowFormSchema>
