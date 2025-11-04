import AccountProfileCard from './profile/AccountProfileCard.vue'
import PaymentMethodsContainer from '@/domain/payment/components/PaymentMethodsContainer.vue'
import SecurityContainer from '../security/SecurityContainer.vue'
import AccountInfoContainer from '../account-info/AccountInfoContainer.vue'
import AddressContainer from '../account-info/address/AddressContainer.vue'

export const profileGridOptions =
  [
    {
      key: 'overview',
      label: 'Tu información',
      description: 'Nombre y datos personales',
      component: AccountProfileCard,
    },
    {
      key: 'edit',
      label: 'Datos de cuenta',
      description: 'Email y contraseña',
      component: AccountInfoContainer,
    },
    {
      key: 'cards',
      label: 'Tarjetas',
      description: 'Medios de pago guardados',
      component: PaymentMethodsContainer,
    },
    {
      key: 'addresses',
      label: 'Direcciones',
      description: 'Direcciones de envío',
      component: AddressContainer,
    },
    {
      key: 'security',
      label: 'Seguridad',
      description: 'Privacidad y autenticación',
      component: SecurityContainer,
    },
  ]
