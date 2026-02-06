import type { Transaction } from '@/types/models'

import { useTranslation } from 'react-i18next'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react'

import CreateTransactionForm from './CreateTransactionForm'

type Props = {
  isOpen: boolean
  onClose: () => void
  transaction?: Transaction | null
}

export default function TransactionModal({ isOpen, onClose, transaction }: Props) {
  const { t } = useTranslation()
  const isEdit = Boolean(transaction)

  return (
    <Modal className="rounded-3xl" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          {isEdit ? t('transactions.edit_transaction') : t('transactions.add')}
        </ModalHeader>

        <ModalBody>
          <CreateTransactionForm transaction={transaction} onSuccess={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
