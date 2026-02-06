import reducer, {
  addTransaction,
  deleteTransaction,
  undoLastTransaction,
} from '@/store/transactionsSlice'
import { TransactionType } from '@/types/enums'

const transaction = {
  id: '1',
  description: 'Salary',
  amount: 1000,
  type: TransactionType.DEPOSIT,
  date: '2024-02-01',
  createdAt: '2024-02-01',
}

test('adds a transaction', () => {
  const state = reducer({ items: [] }, addTransaction(transaction))

  expect(state.items[0]).toEqual(transaction)
})

test('deletes a transaction', () => {
  const state = reducer({ items: [transaction] }, deleteTransaction('1'))

  expect(state.items).toHaveLength(0)
})

test('undo last transaction', () => {
  const state = reducer({ items: [transaction] }, undoLastTransaction())

  expect(state.items).toHaveLength(0)
})
