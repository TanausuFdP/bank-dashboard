import type { TransactionType } from './enums'

export interface Transaction {
  id: string
  amount: number
  description: string
  date: string
  type: TransactionType
  createdAt: string
}
