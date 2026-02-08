import type { Transaction } from '@/types/models'
import type { AppDispatch, RootState } from './store'

import { useEffect, useRef, useState } from 'react'
import {
  IconAdjustmentsHorizontal,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconCheck,
  IconDots,
  IconDownload,
  IconPlus,
  IconSearch,
  IconUpload,
} from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import {
  addToast,
  Badge,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  ScrollShadow,
  Spacer,
  Spinner,
} from '@heroui/react'
import { useDispatch, useSelector } from 'react-redux'

import BalanceOverview from './components/BalanceOverview'
import TransactionsList from './components/TransactionsList'
import TransactionModal from './components/TransactionModal'
import { importManyTransactions, redo, setSearch, undo } from './store/transactionsSlice'
import { selectHasActiveFilters, selectMaxTransactionAmount } from './store/transactionsSelector'
import FiltersModal from './components/FiltersModal'
import { exportTransactionsToCsv } from './services/transactionsCsvExport'
import { importTransactionsFromCsv } from './services/transactionCsvImport'

function App() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { past, future } = useSelector((state: RootState) => state.transactions)
  const search = useSelector((state: RootState) => state.transactions.filters.search)
  const maxAmount = useSelector(selectMaxTransactionAmount)
  const allTransactions = useSelector((state: RootState) => state.transactions.items)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const hasActiveFilters = useSelector(selectHasActiveFilters)

  const [transactionModalOpen, setTransactionModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isClone, setIsClone] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

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

  const handleCsvImport = async (file: File) => {
    try {
      setIsImporting(true)
      const text = await file.text()
      const result = importTransactionsFromCsv(text, allTransactions)

      if (result.transactions.length === 0) {
        addToast({
          color: 'warning',
          title: t('transactions.import_no_new'),
        })

        return
      }

      dispatch(importManyTransactions(result.transactions))

      addToast({
        color: 'success',
        title: t('transactions.import_success'),
        description: t('transactions.imported_description', {
          imported: result.transactions.length,
          skipped: result.skipped,
        }),
      })
    } catch {
      addToast({
        color: 'danger',
        title: t('transactions.import_error'),
      })
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <main>
      {isImporting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white dark:bg-foreground-50 rounded-3xl p-6 flex flex-col items-center">
            <Spinner className="mx-auto mb-4" size="lg" variant="simple" />
            <p className="animate-pulse">{t('transactions.importing')}</p>
          </div>
        </div>
      )}
      <div className="fixed top-3 md:top-5 left-5 md:left-10 w-[calc(100%-2.5rem)] md:w-[calc(100%-5rem)] flex items-center justify-between z-20">
        <div className="bg-white dark:bg-foreground-50 rounded-full px-4 py-2">
          <h1 className="text-lg lg:text-xl font-semibold">{t('common.app_title')}</h1>
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
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
          <Dropdown>
            <DropdownTrigger>
              <div className="items-center bg-white dark:bg-foreground-50 rounded-full p-2 cursor-pointer">
                <IconDots className="opacity-80" size={22} />
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label={t('common.actions')}
              onAction={key => {
                if (key === 'export') {
                  exportTransactionsToCsv(allTransactions)
                } else if (key === 'import') {
                  fileInputRef.current?.click()
                }
              }}
            >
              <DropdownItem key="export" startContent={<IconDownload size={18} />}>
                {t('common.export')}
              </DropdownItem>
              <DropdownItem key="import" startContent={<IconUpload size={18} />}>
                {t('common.import')}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Badge
            className="py-1"
            classNames={{ base: 'hidden lg:flex' }}
            color="success"
            content={<IconCheck className="text-white stroke-[4]" size={12} />}
            isInvisible={!hasActiveFilters}
            placement="bottom-right"
          >
            <button
              className={`hidden lg:flex items-center rounded-full p-2 cursor-pointer relative
    ${hasActiveFilters ? 'border border-green-500' : ''}
    bg-white dark:bg-foreground-50`}
              onClick={() => setFiltersOpen(true)}
            >
              <IconAdjustmentsHorizontal className="opacity-80" size={22} />
            </button>
          </Badge>
          <Input
            className="hidden lg:block w-48"
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

      <Spacer className="lg:hidden" y={20} />
      <Spacer className="hidden lg:block" y={16} />

      <ScrollShadow className="max-h-[calc(100dvh-6rem)] pb-10">
        <div className="w-full px-5 flex items-center gap-4 max-w-xl mx-auto">
          <Input
            className="lg:hidden"
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
          <Badge
            className="py-1"
            classNames={{ base: 'lg:hidden' }}
            color="success"
            content={<IconCheck className="text-white stroke-[4]" size={12} />}
            isInvisible={!hasActiveFilters}
            placement="bottom-right"
          >
            <button
              className={`flex lg:hidden items-center rounded-full p-2 cursor-pointer relative
    ${hasActiveFilters ? 'border border-green-500' : ''}
    bg-white dark:bg-foreground-50`}
              onClick={() => setFiltersOpen(true)}
            >
              <IconAdjustmentsHorizontal className="opacity-80" size={22} />
            </button>
          </Badge>
        </div>

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
      </ScrollShadow>

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

      <input
        ref={fileInputRef}
        hidden
        accept=".csv"
        type="file"
        onChange={e => {
          const file = e.target.files?.[0]

          if (file) {
            handleCsvImport(file)
            e.target.value = ''
          }
        }}
      />

      <FiltersModal
        isOpen={filtersOpen}
        maxAmount={maxAmount}
        onClose={() => setFiltersOpen(false)}
      />
    </main>
  )
}

export default App
