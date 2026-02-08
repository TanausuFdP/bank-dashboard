export const TransactionType = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL',
} as const

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]
