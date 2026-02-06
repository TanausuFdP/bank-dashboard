import type { Transaction } from '@/types/models'

import { useState } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { Button, Spacer } from '@heroui/react'

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
    <main>
      <div className="fixed top-3 md:top-5 left-5 md:left-10 w-[calc(100%-5rem)] flex items-center justify-between">
        <div className="bg-white rounded-full px-4 py-2">
          <h1 className="text-lg md:text-xl font-semibold opacity-85">{t('common.app_title')}</h1>
        </div>
        <Button
          aria-label={t('transactions.add')}
          className="text-md hidden md:flex"
          color="primary"
          radius="full"
          startContent={<IconPlus size={22} />}
          onPress={openCreate}
        >
          {t('transactions.add')}
        </Button>
      </div>

      <Spacer y={14} />

      <div className="mx-auto max-w-xl space-y-6 p-5">
        <BalanceOverview />

        <TransactionsList onEdit={openEdit} />

        <TransactionModal
          isOpen={transactionModalOpen}
          transaction={selectedTransaction}
          onClose={() => setTransactionModalOpen(false)}
        />
      </div>

      <div className="fixed bottom-5 left-5 w-[calc(100%-2.5rem)]">
        <Button
          aria-label={t('transactions.add')}
          className="text-md md:hidden w-full"
          color="primary"
          radius="full"
          startContent={<IconPlus size={22} />}
          onPress={openCreate}
        >
          {t('transactions.add')}
        </Button>
      </div>
    </main>
  )
}

export default App
