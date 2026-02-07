import type { Transaction } from '@/types/models'
import type { AppDispatch, RootState } from './store'

import { useEffect, useState } from 'react'
import { IconArrowBackUp, IconArrowForwardUp, IconPlus, IconSearch } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { Button, Divider, Input, Spacer } from '@heroui/react'
import { useDispatch, useSelector } from 'react-redux'

import BalanceOverview from './components/BalanceOverview'
import TransactionsList from './components/TransactionsList'
import TransactionModal from './components/TransactionModal'
import { redo, setSearch, undo } from './store/transactionsSlice'

function App() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { past, future } = useSelector((state: RootState) => state.transactions)
  const search = useSelector((state: RootState) => state.transactions.filters.search)
  const [transactionModalOpen, setTransactionModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isClone, setIsClone] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey

      if (!ctrlOrCmd) return

      if (e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault()
        if (past) dispatch(undo())
      }

      if ((e.key.toLowerCase() === 'z' && e.shiftKey) || e.key.toLowerCase() === 'y') {
        e.preventDefault()
        if (future) dispatch(redo())
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch, past, future])

  const openCreate = () => {
    setSelectedTransaction(null)
    setIsClone(false)
    setTransactionModalOpen(true)
  }

  const openEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsClone(false)
    setTransactionModalOpen(true)
  }

  const openClone = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsClone(true)
    setTransactionModalOpen(true)
  }

  return (
    <main>
      <div className="fixed top-3 md:top-5 left-5 md:left-10 w-[calc(100%-2.5rem)] md:w-[calc(100%-5rem)] flex items-center justify-between z-20">
        <div className="bg-white dark:bg-foreground-50 rounded-full px-4 py-2">
          <h1 className="text-lg md:text-xl font-semibold">{t('common.app_title')}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white dark:bg-foreground-50 rounded-full px-3 py-2">
            <button
              className={`text-sm md:text-base ${!past ? 'cursor-not-allowed opacity-30' : 'opacity-85'}`}
              disabled={!past}
              onClick={() => dispatch(undo())}
            >
              <IconArrowBackUp size={24} />
            </button>
            <Divider className="mx-2 h-5 opacity-50" orientation="vertical" />
            <button
              className={`text-sm md:text-base ${!future ? 'cursor-not-allowed opacity-30' : 'opacity-85'}`}
              disabled={!future}
              onClick={() => dispatch(redo())}
            >
              <IconArrowForwardUp size={24} />
            </button>
          </div>
          <Input
            className="hidden md:block w-48"
            classNames={{
              inputWrapper: '!bg-white dark:!bg-foreground-50',
              input: 'outline-none text-md',
            }}
            placeholder={t('transactions.search')}
            radius="full"
            startContent={<IconSearch className="opacity-60" size={20} />}
            value={search}
            onChange={e => dispatch(setSearch(e.target.value))}
          />
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
      </div>

      <Spacer className="md:hidden" y={20} />

      <div className="w-full px-5">
        <Input
          className="md:hidden"
          classNames={{
            inputWrapper: '!bg-white dark:!bg-foreground-50',
            input: 'outline-none text-md',
          }}
          placeholder={t('transactions.search')}
          radius="full"
          startContent={<IconSearch className="opacity-60" size={20} />}
          value={search}
          onChange={e => dispatch(setSearch(e.target.value))}
        />
      </div>

      <Spacer className="hidden md:block" y={14} />

      <div className="mx-auto max-w-xl space-y-6 p-5">
        <BalanceOverview />

        <TransactionsList onClone={openClone} onEdit={openEdit} />

        <TransactionModal
          isClone={isClone}
          isOpen={transactionModalOpen}
          transaction={selectedTransaction}
          onClose={() => setTransactionModalOpen(false)}
        />
      </div>

      <div className="fixed bottom-5 left-5 w-[calc(100%-2.5rem)] z-10">
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
