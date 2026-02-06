import type { RootState, AppDispatch } from '@/store'
import type { Transaction } from '@/types/models'

import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Card, CardBody } from '@heroui/react'
import { IconPencil, IconTrash } from '@tabler/icons-react'

import { deleteTransaction } from '@/store/transactionsSlice'
import { TransactionType } from '@/types/enums'

type Props = {
  onEdit: (transaction: Transaction) => void
}

export default function TransactionsList({ onEdit }: Props) {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const transactions = useSelector((state: RootState) => state.transactions.items)

  if (transactions.length === 0) {
    return <p className="text-gray-500">{t('transactions.empty')}</p>
  }

  return (
    <div className="space-y-2">
      {transactions.map(tn => (
        <Card key={tn.id}>
          <CardBody className="flex flex-row items-center justify-between">
            <div>
              <p className="font-medium">{tn.description}</p>
              <p className="text-sm text-gray-500">{tn.date}</p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={tn.type === TransactionType.DEPOSIT ? 'text-green-600' : 'text-red-600'}
              >
                {tn.amount} €
              </span>

              <Button
                isIconOnly
                aria-label={t('transactions.edit')}
                variant="light"
                onPress={() => onEdit(tn)}
              >
                <IconPencil size={18} />
              </Button>
              <Button
                isIconOnly
                aria-label={t('transactions.delete')}
                color="danger"
                variant="light"
                onPress={() => dispatch(deleteTransaction(tn.id))}
              >
                <IconTrash size={18} />
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
