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

export function capitalize(text: string): string {
  if (!text) return text

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
