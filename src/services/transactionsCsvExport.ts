import type { Transaction } from '@/types/models'

import { TransactionType } from '@/types/enums'
import { capitalize } from '@/utils/helper'

export const exportTransactionsToCsv = (transactions: Transaction[]) => {
  const headers = ['Date', 'Amount', 'Description', 'Type']

  const rows = transactions.map(t => {
    const amount = t.type === TransactionType.WITHDRAWAL ? -Math.abs(t.amount) : Math.abs(t.amount)

    return [t.date, amount.toString(), `"${t.description.replace(/"/g, '""')}"`, capitalize(t.type)]
  })

  const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')

  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = 'transactions.csv'
  link.click()

  URL.revokeObjectURL(url)
}
