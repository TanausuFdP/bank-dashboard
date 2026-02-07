import type { Transaction } from '@/types/models'

import { createSlice } from '@reduxjs/toolkit'

import { loadTransactions, persistTransactions } from '@/services/transactionsStorage'

type TransactionsFilters = {
  search: string
  type: 'ALL' | 'DEPOSIT' | 'WITHDRAWAL'
  fromDate: string | null
  toDate: string | null
  minAmount: number | null
  maxAmount: number | null
}

type TransactionsState = {
  items: Transaction[]
  past: Transaction[] | null
  future: Transaction[] | null

  filters: TransactionsFilters
  page: number
  pageSize: number
}

const initialState: TransactionsState = {
  items: loadTransactions(),
  past: null,
  future: null,
  filters: {
    search: '',
    type: 'ALL',
    fromDate: null,
    toDate: null,
    minAmount: null,
    maxAmount: null,
  },
  page: 1,
  pageSize: 5,
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction(state, action) {
      state.past = state.items
      state.future = null
      state.items = [...state.items, action.payload]
      persistTransactions(state.items)
    },

    updateTransaction(state, action) {
      state.past = state.items
      state.future = null
      state.items = state.items.map(t => (t.id === action.payload.id ? action.payload : t))
      persistTransactions(state.items)
    },

    deleteTransaction(state, action) {
      state.past = state.items
      state.future = null
      state.items = state.items.filter(t => t.id !== action.payload)
      persistTransactions(state.items)
    },

    undo(state) {
      if (!state.past) return
      state.future = state.items
      state.items = state.past
      state.past = null
      persistTransactions(state.items)
    },

    redo(state) {
      if (!state.future) return
      state.past = state.items
      state.items = state.future
      state.future = null
      persistTransactions(state.items)
    },

    setSearch(state, action) {
      state.filters.search = action.payload
      state.page = 1
    },

    setType(state, action) {
      state.filters.type = action.payload
      state.page = 1
    },

    setDateRange(state, action) {
      state.filters.fromDate = action.payload.from
      state.filters.toDate = action.payload.to
      state.page = 1
    },

    setPage(state, action) {
      state.page = action.payload
    },

    setAmountRange(state, action) {
      state.filters.minAmount = action.payload.min
      state.filters.maxAmount = action.payload.max
      state.page = 1
    },
  },
})

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  undo,
  redo,
  setSearch,
  setType,
  setDateRange,
  setPage,
  setAmountRange,
} = transactionsSlice.actions

export default transactionsSlice.reducer
