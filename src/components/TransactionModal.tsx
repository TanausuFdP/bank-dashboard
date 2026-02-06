import type { Transaction } from '@/types/models'

import { useTranslation } from 'react-i18next'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react'
import { useEffect, useRef } from 'react'

import CreateTransactionForm from './CreateTransactionForm'

type Props = {
  isOpen: boolean
  onClose: () => void
  transaction?: Transaction | null
}

export default function TransactionModal({ isOpen, onClose, transaction }: Props) {
  const { t } = useTranslation()
  const isEdit = Boolean(transaction)
  const amountRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        amountRef.current?.focus()
      }, 0)
    }
  }, [isOpen])

  return (
    <Modal className="rounded-3xl" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          {isEdit ? t('transactions.edit_transaction') : t('transactions.add')}
        </ModalHeader>

        <ModalBody>
          <CreateTransactionForm
            amountRef={amountRef}
            transaction={transaction}
            onSuccess={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
