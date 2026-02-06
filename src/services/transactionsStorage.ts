import type { Transaction } from '@/types/models'

const STORAGE_KEY = 'transactions'

export const loadTransactions = (): Transaction[] => {
  if (typeof globalThis === 'undefined' || !('localStorage' in globalThis)) {
    return []
  }

  const raw = globalThis.localStorage.getItem(STORAGE_KEY)

  return raw ? JSON.parse(raw) : []
}

export const persistTransactions = (items: Transaction[]) => {
  if (typeof globalThis === 'undefined' || !('localStorage' in globalThis)) {
    return
  }

  globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}
