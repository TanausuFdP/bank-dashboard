export function formatPrice(value: number): string {
  const formatted = value
    .toLocaleString('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    })
    .replace('€', '')

  return `${formatted}€`
}
