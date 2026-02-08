import { importTransactionsFromCsv } from '@/services/transactionCsvImport'
import { TransactionType } from '@/types/enums'

test('ignores duplicated transactions', () => {
  const csv = `Date,Amount,Description,Type
2024-01-01,-50,Rent,Withdrawal`

  const result = importTransactionsFromCsv(csv, [
    {
      date: '2024-01-01',
      description: 'Rent',
      amount: 50,
      type: TransactionType.WITHDRAWAL,
    } as any,
  ])

  expect(result.transactions).toHaveLength(0)
})
