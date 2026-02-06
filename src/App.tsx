import type { Transaction } from '@/types/models'

import { useState } from 'react'
import { Button } from '@heroui/react'
import { IconPlus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import BalanceOverview from './components/BalanceOverview'
import TransactionsList from './components/TransactionsList'
import TransactionModal from './components/TransactionModal'

function App() {
  const { t } = useTranslation()
  const [transactionModalOpen, setTransactionModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const openCreate = () => {
    setSelectedTransaction(null)
    setTransactionModalOpen(true)
  }

  const openEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setTransactionModalOpen(true)
  }

  return (
    <main className="mx-auto max-w-xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Banking Dashboard</h1>

      <BalanceOverview />

      <Button
        className="w-full"
        color="primary"
        startContent={<IconPlus size={18} />}
        onPress={openCreate}
      >
        {t('transactions.add')}
      </Button>

      <TransactionsList onEdit={openEdit} />

      <TransactionModal
        isOpen={transactionModalOpen}
        transaction={selectedTransaction}
        onClose={() => setTransactionModalOpen(false)}
      />
    </main>
  )
}

export default App
