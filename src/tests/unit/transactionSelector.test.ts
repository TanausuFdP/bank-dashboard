import {
  selectFilteredTransactions,
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
}

test('filters transactions by search text', () => {
  const result = selectFilteredTransactions(state as any)

  expect(result).toHaveLength(1)
  expect(result[0].description).toBe('Salary')
})

test('paginates transactions', () => {
  const result = selectPaginatedTransactions(state as any)

  expect(result).toHaveLength(1)
})
