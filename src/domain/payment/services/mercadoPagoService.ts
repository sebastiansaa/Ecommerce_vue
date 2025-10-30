// Servicio simulado para iniciar pago con MercadoPago
// Puedes reemplazar la URL y lógica por la real cuando tengas credenciales
import axios from 'axios'

export interface MercadoPagoInitPayload {
    title: string
    price: number
    quantity: number
    currency_id?: string
}

export interface MercadoPagoInitResponse {
    init_point: string // URL para redirigir al checkout de MercadoPago
}

export async function initMercadoPagoPayment(payload: MercadoPagoInitPayload): Promise<MercadoPagoInitResponse> {
    // Simulación: normalmente aquí llamarías a tu backend que a su vez llama a MercadoPago
    // Ejemplo real (requiere backend):
    // return axios.post('/api/mercadopago/create', payload).then(r => r.data)

    // Simulación directa:
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                init_point: 'https://www.mercadopago.cl/checkout/v1/redirect?pref_id=TEST-1234567890',
            })
        }, 1000)
    })
}
