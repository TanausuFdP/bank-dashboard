import type { Transaction } from '@/types/models'

import { createSlice } from '@reduxjs/toolkit'

import { loadTransactions, persistTransactions } from '@/services/transactionsStorage'

type TransactionsState = {
  items: Transaction[]
  past: Transaction[] | null
  future: Transaction[] | null
}

const initialState: TransactionsState = {
  items: loadTransactions(),
  past: null,
  future: null,
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
  },
})

export const { addTransaction, updateTransaction, deleteTransaction, undo, redo } =
  transactionsSlice.actions

export default transactionsSlice.reducer
