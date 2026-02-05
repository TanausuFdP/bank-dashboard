import type { Transaction } from '../types/models'

const STORAGE_KEY = 'transactions'

export const loadTransactions = (): Transaction[] => {
  const raw = localStorage.getItem(STORAGE_KEY)

  return raw ? JSON.parse(raw) : []
}

export const persistTransactions = (transactions: Transaction[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}
