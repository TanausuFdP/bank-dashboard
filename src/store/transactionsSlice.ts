import type { Transaction } from '@/types/models'

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { loadTransactions, persistTransactions } from '@/services/transactionsStorage'

type TransactionsState = {
  items: Transaction[]
}

const initialState: TransactionsState = {
  items: loadTransactions(),
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.items.unshift(action.payload)
      persistTransactions(state.items)
    },
    deleteTransaction(state, action: PayloadAction<string>) {
      state.items = state.items.filter(t => t.id !== action.payload)
      persistTransactions(state.items)
    },
    updateTransaction(state, action: PayloadAction<Transaction>) {
      state.items = state.items.map(t => (t.id === action.payload.id ? action.payload : t))
      persistTransactions(state.items)
    },
    undoLastTransaction(state) {
      state.items.shift()
      persistTransactions(state.items)
    },
  },
})

export const { addTransaction, deleteTransaction, updateTransaction, undoLastTransaction } =
  transactionsSlice.actions

export default transactionsSlice.reducer
