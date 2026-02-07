import type { AppDispatch } from '@/store'
import type { Transaction } from '@/types/models'

import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Card,
  CardBody,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import {
  IconChevronLeft,
  IconChevronRight,
  IconCircleArrowDownRightFilled,
  IconCircleArrowUpRightFilled,
  IconCopy,
  IconDotsVertical,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react'
import { useState } from 'react'

import YouSureModal from './YouSureModal'

import { deleteTransaction, setPage } from '@/store/transactionsSlice'
import { TransactionType } from '@/types/enums'
import { formatPrice } from '@/utils/helper'
import { selectPaginatedTransactions, selectPaginationInfo } from '@/store/transactionsSelector'

type Props = {
  onEdit: (transaction: Transaction) => void
  onClone: (transaction: Transaction) => void
}

export default function TransactionsList({ onEdit, onClone }: Props) {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const transactions = useSelector(selectPaginatedTransactions)
  const { page, totalPages, hasNext, hasPrev } = useSelector(selectPaginationInfo)
  const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null)

  if (transactions.length === 0) {
    return <p className="text-gray-500">{t('transactions.empty')}</p>
  }

  const grouped = Object.values(
    transactions.reduce<Record<string, Transaction[]>>((acc, tn) => {
      const dateKey = tn.date.split('T')[0]

      acc[dateKey] ??= []
      acc[dateKey].push(tn)

      return acc
    }, {})
  )

  return (
    <>
      <div className="space-y-6">
        {grouped.map(group => {
          const dateKey = group[0].date.split('T')[0]

          const balance = group.reduce((acc, tn) => acc + tn.amount, 0)

          return (
            <div key={dateKey} className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-sm font-semibold text-gray-600">{dateKey}</span>
                <span
                  className={
                    balance >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'
                  }
                >
                  {formatPrice(balance)}
                </span>
              </div>

              <Card className="rounded-3xl" shadow="none">
                <CardBody className="space-y-3">
                  {group.map((tn, index) => {
                    const time = tn.date.split('T')[1]?.slice(0, 5)

                    return (
                      <div key={tn.id} className="space-y-3">
                        {index > 0 && <Divider />}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {tn.type === TransactionType.DEPOSIT ? (
                              <IconCircleArrowUpRightFilled className="text-green-600" size={36} />
                            ) : (
                              <IconCircleArrowDownRightFilled className="text-red-600" size={36} />
                            )}

                            <div>
                              <p className="font-medium">{tn.description}</p>
                              <p className="text-sm text-gray-500">{time}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span
                              className={
                                tn.type === TransactionType.DEPOSIT
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }
                            >
                              {formatPrice(tn.amount)}
                            </span>

                            <Dropdown>
                              <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                  <IconDotsVertical className="text-default-400" />
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu
                                aria-label={t('transactions.actions')}
                                onAction={key => {
                                  if (key === 'edit') {
                                    onEdit(tn)
                                  } else if (key === 'clone') {
                                    onClone(tn)
                                  } else if (key === 'delete') {
                                    setDeleteTarget(tn)
                                  }
                                }}
                              >
                                <DropdownItem
                                  key="edit"
                                  startContent={<IconPencil className="opacity-70" size={18} />}
                                >
                                  {t('transactions.edit')}
                                </DropdownItem>
                                <DropdownItem
                                  key="clone"
                                  showDivider
                                  startContent={<IconCopy className="opacity-70" size={18} />}
                                >
                                  {t('transactions.clone')}
                                </DropdownItem>
                                <DropdownItem
                                  key="delete"
                                  className="!text-danger"
                                  startContent={<IconTrash size={18} />}
                                >
                                  {t('transactions.delete')}
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardBody>
              </Card>
            </div>
          )
        })}

        <div className="flex justify-between items-center pt-4">
          <Button
            className="text-sm"
            color="primary"
            isDisabled={!hasPrev}
            radius="full"
            size="sm"
            startContent={<IconChevronLeft size={18} />}
            variant="flat"
            onPress={() => dispatch(setPage(page - 1))}
          >
            {t('common.prev')}
          </Button>

          <span className="text-sm text-gray-500">
            {page} / {totalPages}
          </span>

          <Button
            className="text-sm"
            color="primary"
            endContent={<IconChevronRight size={18} />}
            isDisabled={!hasNext}
            radius="full"
            size="sm"
            variant="flat"
            onPress={() => dispatch(setPage(page + 1))}
          >
            {t('common.next')}
          </Button>
        </div>
      </div>
      <YouSureModal
        description={t('transactions.delete_confirm_with_name', {
          description: deleteTarget?.description,
        })}
        isOpen={!!deleteTarget}
        submitLabel={t('transactions.delete')}
        onClose={() => setDeleteTarget(null)}
        onSubmit={() => {
          if (!deleteTarget) return
          dispatch(deleteTransaction(deleteTarget.id))
          setDeleteTarget(null)
        }}
      />
    </>
  )
}
