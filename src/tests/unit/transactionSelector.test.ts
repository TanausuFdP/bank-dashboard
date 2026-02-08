import type { RootState } from '@/store'

import {
  selectBalanceSummary,
  selectFilteredTransactions,
  selectHasActiveFilters,
  selectPaginatedTransactions,
} from '@/store/transactionsSelector'
import { TransactionType } from '@/types/enums'

const state = {
  transactions: {
    items: [
      {
        id: '1',
        description: 'Salary',
        amount: 1000,
        type: TransactionType.DEPOSIT,
        date: '2024-02-01',
      },
      {
        id: '2',
        description: 'Rent',
        amount: 500,
        type: TransactionType.WITHDRAWAL,
        date: '2024-02-02',
      },
    ],
    filters: {
      search: 'sal',
      type: 'ALL',
      fromDate: null,
      toDate: null,
      minAmount: null,
      maxAmount: null,
    },
    page: 1,
    pageSize: 5,
  },
} as RootState

const filtersBaseState = {
  transactions: {
    filters: {
      search: '',
      type: 'ALL',
      fromDate: null,
      toDate: null,
      minAmount: null,
      maxAmount: null,
    },
  },
} as RootState

test('filters transactions by search text', () => {
  const result = selectFilteredTransactions(state as any)

  expect(result).toHaveLength(1)
  expect(result[0].description).toBe('Salary')
})

test('paginates transactions', () => {
  const result = selectPaginatedTransactions(state as any)

  expect(result).toHaveLength(1)
})

test('calculates balance summary correctly', () => {
  const state = {
    transactions: {
      items: [
        { amount: 100, type: TransactionType.DEPOSIT },
        { amount: 50, type: TransactionType.WITHDRAWAL },
      ],
    },
  } as RootState

  const result = selectBalanceSummary(state)

  expect(result.balance).toBe(50)
  expect(result.income).toBe(100)
  expect(result.expenses).toBe(50)
  expect(result.totalTransactions).toBe(2)
})

test('returns false when no filters are active', () => {
  expect(selectHasActiveFilters(filtersBaseState)).toBe(false)
})

test('returns true when type filter is active', () => {
  const state = {
    ...filtersBaseState,
    transactions: {
      ...filtersBaseState.transactions,
      filters: {
        ...filtersBaseState.transactions.filters,
        type: 'DEPOSIT',
      },
    },
  } as RootState

  expect(selectHasActiveFilters(state)).toBe(true)
})

test('returns true when date filter is active', () => {
  const state = {
    ...filtersBaseState,
    transactions: {
      ...filtersBaseState.transactions,
      filters: {
        ...filtersBaseState.transactions.filters,
        fromDate: '2024-01-01',
      },
    },
  } as RootState

  expect(selectHasActiveFilters(state)).toBe(true)
})

test('returns true when amount filter is active', () => {
  const state = {
    ...filtersBaseState,
    transactions: {
      ...filtersBaseState.transactions,
      filters: {
        ...filtersBaseState.transactions.filters,
        minAmount: 10,
      },
    },
  } as RootState

  expect(selectHasActiveFilters(state)).toBe(true)
})
