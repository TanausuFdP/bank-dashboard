import reducer, { addTransaction, deleteTransaction, undo, redo } from '@/store/transactionsSlice'
import { TransactionType } from '@/types/enums'

const transaction = {
  id: '1',
  description: 'Salary',
  amount: 1000,
  type: TransactionType.DEPOSIT,
  date: '2024-02-01',
  createdAt: '2024-02-01',
}

const initialState = {
  items: [],
  past: null,
  future: null,
  filters: {
    search: '',
    type: 'ALL' as 'ALL' | TransactionType,
    fromDate: null,
    toDate: null,
    minAmount: null,
    maxAmount: null,
  },
  page: 1,
  pageSize: 20,
}

test('adds a transaction', () => {
  const state = reducer(initialState, addTransaction(transaction))

  expect(state.items).toHaveLength(1)
  expect(state.items[0]).toEqual(transaction)
  expect(state.past).toEqual([])
  expect(state.future).toBeNull()
})

test('deletes a transaction', () => {
  const populatedState = {
    ...initialState,
    items: [transaction],
  }

  const state = reducer(populatedState, deleteTransaction('1'))

  expect(state.items).toHaveLength(0)
  expect(state.past).toEqual([transaction])
})

test('undo restores previous state', () => {
  const stateAfterAdd = reducer(initialState, addTransaction(transaction))
  const stateAfterUndo = reducer(stateAfterAdd, undo())

  expect(stateAfterUndo.items).toHaveLength(0)
  expect(stateAfterUndo.future).toEqual([transaction])
})

test('redo reapplies undone state', () => {
  const stateAfterAdd = reducer(initialState, addTransaction(transaction))
  const stateAfterUndo = reducer(stateAfterAdd, undo())
  const stateAfterRedo = reducer(stateAfterUndo, redo())

  expect(stateAfterRedo.items).toEqual([transaction])
})
