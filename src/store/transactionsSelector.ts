import type { RootState } from '@/store'
import type { Transaction } from '@/types/models'

export const selectFilteredTransactions = (state: RootState): Transaction[] => {
  const { items, filters } = state.transactions
  const search = filters.search.trim().toLowerCase()

  if (!search) return items

  return items.filter(t => t.description.toLowerCase().includes(search))
}

export const selectSortedTransactions = (state: RootState): Transaction[] => {
  const filtered = selectFilteredTransactions(state)

  return [...filtered].sort((a, b) => b.date.localeCompare(a.date))
}

export const selectPaginatedTransactions = (state: RootState): Transaction[] => {
  const sorted = selectSortedTransactions(state)
  const { page, pageSize } = state.transactions

  const start = (page - 1) * pageSize
  const end = start + pageSize

  return sorted.slice(start, end)
}

export const selectPaginationInfo = (state: RootState) => {
  const totalItems = selectSortedTransactions(state).length
  const { page, pageSize } = state.transactions

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  return {
    page,
    pageSize,
    totalPages,
    hasPrev: page > 1,
    hasNext: page < totalPages,
    totalItems,
  }
}
