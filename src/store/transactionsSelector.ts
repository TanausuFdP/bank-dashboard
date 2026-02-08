import type { RootState } from '@/store'
import type { Transaction } from '@/types/models'

import { TransactionType } from '@/types/enums'

export const selectFilteredTransactions = (state: RootState) => {
  const { items, filters } = state.transactions

  let result = items

  if (filters.search) {
    const q = filters.search.toLowerCase()

    result = result.filter(t => t.description.toLowerCase().includes(q))
  }

  if (filters.type !== 'ALL') {
    result = result.filter(t => t.type === (filters.type as TransactionType))
  }

  if (filters.fromDate) {
    result = result.filter(t => t.date >= filters.fromDate!)
  }

  if (filters.toDate) {
    result = result.filter(t => t.date <= filters.toDate!)
  }

  if (filters.minAmount !== null) {
    result = result.filter(t => Math.abs(t.amount) >= filters.minAmount!)
  }

  if (filters.maxAmount !== null) {
    result = result.filter(t => Math.abs(t.amount) <= filters.maxAmount!)
  }

  return result
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

export const selectMaxTransactionAmount = (state: RootState) =>
  Math.max(0, ...state.transactions.items.map(t => Math.abs(t.amount)))

export const selectBalanceSummary = (state: RootState) => {
  const items = state.transactions.items

  let balance = 0
  let income = 0
  let expenses = 0

  for (const t of items) {
    if (t.type === TransactionType.DEPOSIT) {
      income += t.amount
      balance += t.amount
    } else {
      expenses += t.amount
      balance -= t.amount
    }
  }

  return {
    balance,
    income,
    expenses,
    totalTransactions: items.length,
  }
}

export const selectHasActiveFilters = (state: RootState) => {
  const { filters } = state.transactions

  return (
    filters.type !== 'ALL' ||
    filters.fromDate !== null ||
    filters.toDate !== null ||
    filters.minAmount !== null ||
    filters.maxAmount !== null
  )
}

export const doesTransactionMatchFilters = (transaction: Transaction, state: RootState) => {
  const { filters } = state.transactions

  if (
    filters.search &&
    !transaction.description.toLowerCase().includes(filters.search.toLowerCase())
  ) {
    return false
  }

  if (filters.type !== 'ALL' && transaction.type !== filters.type) {
    return false
  }

  if (filters.fromDate && transaction.date < filters.fromDate) {
    return false
  }

  if (filters.toDate && transaction.date > filters.toDate) {
    return false
  }

  if (filters.minAmount !== null && transaction.amount < filters.minAmount) {
    return false
  }

  if (filters.maxAmount !== null && transaction.amount > filters.maxAmount) {
    return false
  }

  return true
}
