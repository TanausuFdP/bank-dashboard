import type { Transaction } from '@/types/models'

import { v4 as uuid } from 'uuid'

import { TransactionType } from '@/types/enums'

type ImportResult = {
  transactions: Transaction[]
  skipped: number
}

const normalizeDate = (value: string) => (value.includes('T') ? value : `${value}T00:00:00`)

export const importTransactionsFromCsv = (
  csvText: string,
  existingTransactions: Transaction[]
): ImportResult => {
  const lines = csvText.trim().split('\n')

  if (lines.length < 2) {
    throw new Error('Invalid CSV format')
  }

  const [header, ...rows] = lines

  if (header.trim() !== 'Date,Amount,Description,Type') {
    throw new Error('Invalid CSV headers')
  }

  const existingKeys = new Set(
    existingTransactions.map(t => `${normalizeDate(t.date)}|${t.description}`)
  )

  const importedKeys = new Set<string>()

  const transactions: Transaction[] = []
  let skipped = 0

  for (const row of rows) {
    const cols = row.split(',')

    if (cols.length !== 4) {
      skipped++
      continue
    }

    const [rawDate, rawAmount, rawDescription, rawType] = cols.map(c =>
      c.trim().replace(/^"|"$/g, '')
    )

    if (!rawDate || !rawAmount || !rawDescription || !rawType) {
      skipped++
      continue
    }

    const normalizedDate = normalizeDate(rawDate)

    const typeNormalized = rawType.toLowerCase()

    let type: TransactionType

    if (typeNormalized === 'deposit') {
      type = TransactionType.DEPOSIT
    } else if (typeNormalized === 'withdrawal') {
      type = TransactionType.WITHDRAWAL
    } else {
      skipped++
      continue
    }

    const parsedAmount = Number(rawAmount)

    if (Number.isNaN(parsedAmount)) {
      skipped++
      continue
    }

    const amount = Math.abs(parsedAmount)

    const key = `${normalizedDate}|${rawDescription}`

    if (existingKeys.has(key) || importedKeys.has(key)) {
      skipped++
      continue
    }

    importedKeys.add(key)

    transactions.push({
      id: uuid(),
      date: normalizedDate,
      description: rawDescription,
      amount,
      type,
      createdAt: new Date().toISOString(),
    })
  }

  return { transactions, skipped }
}
