export function changeCurrency(value: number, currency: string = 'CLP', locale: string = 'es-CL') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
}
