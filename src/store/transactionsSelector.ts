import type { RootState } from '@/store'

export const selectFilteredTransactions = (state: RootState) => {
  const { items, filters } = state.transactions
  const search = filters.search.trim().toLowerCase()

  if (!search) return items

  return items.filter(t => t.description.toLowerCase().includes(search))
}
