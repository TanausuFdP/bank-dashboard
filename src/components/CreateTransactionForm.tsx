import type { AppDispatch } from '@/store'
import type { Transaction } from '@/types/models'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'
import { Button, Card, CardBody, CardFooter, Input, Select, SelectItem } from '@heroui/react'
import {
  IconCircleArrowDownRightFilled,
  IconCircleArrowUpRightFilled,
  IconDeviceFloppy,
} from '@tabler/icons-react'

import { addTransaction, updateTransaction } from '@/store/transactionsSlice'
import { TransactionType } from '@/types/enums'
import { formatPrice } from '@/utils/helper'

type Props = {
  transaction?: Transaction | null
  onSuccess?: () => void
  amountRef?: React.RefObject<HTMLInputElement | null>
}

export default function CreateTransactionForm({ transaction, onSuccess, amountRef }: Props) {
  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const [description, setDescription] = useState(transaction?.description ?? '')
  const [amount, setAmount] = useState(transaction ? Math.abs(transaction.amount).toString() : '')
  const [type, setType] = useState<TransactionType>(transaction?.type ?? TransactionType.DEPOSIT)
  const [dateTime, setDateTime] = useState(
    transaction?.date ? transaction.date.slice(0, 16) : new Date().toISOString().slice(0, 16)
  )

  const handleAmountChange = (value: string) => {
    setAmount(value.replace(',', '.'))
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    const numericAmount = Number(amount)

    if (!numericAmount) return

    const isoDate = new Date(dateTime).toISOString()

    const payload = {
      id: transaction?.id ?? uuid(),
      description,
      amount: type === TransactionType.DEPOSIT ? Math.abs(numericAmount) : -Math.abs(numericAmount),
      type: numericAmount < 0 ? TransactionType.WITHDRAWAL : type,
      date: isoDate,
      createdAt: transaction?.createdAt ?? new Date().toISOString(),
    }

    if (transaction) {
      dispatch(updateTransaction(payload))
    } else {
      dispatch(addTransaction(payload))
    }

    onSuccess?.()
  }

  return (
    <Card as="form" shadow="none" onSubmit={submit}>
      <CardBody className="gap-3 px-0">
        <Select
          disallowEmptySelection
          classNames={{
            value: type === TransactionType.DEPOSIT ? '!text-green-500' : '!text-red-500',
          }}
          label={t('transactions.type')}
          selectedKeys={[type]}
          size="lg"
          startContent={
            type === TransactionType.DEPOSIT ? (
              <IconCircleArrowUpRightFilled className="text-green-500" size={24} />
            ) : (
              <IconCircleArrowDownRightFilled className="text-red-500" size={24} />
            )
          }
          onSelectionChange={keys => setType(Array.from(keys)[0] as TransactionType)}
        >
          <SelectItem
            key={TransactionType.DEPOSIT}
            className="!text-green-500"
            startContent={<IconCircleArrowUpRightFilled size={18} />}
          >
            {t('transactions.deposit')}
          </SelectItem>
          <SelectItem
            key={TransactionType.WITHDRAWAL}
            className="!text-red-500"
            startContent={<IconCircleArrowDownRightFilled size={18} />}
          >
            {t('transactions.withdrawal')}
          </SelectItem>
        </Select>

        <Input
          ref={amountRef}
          isRequired
          classNames={{ input: 'outline-none' }}
          description={formatPrice(
            type === TransactionType.DEPOSIT ? Number(amount) : -Math.abs(Number(amount))
          )}
          label={t('transactions.amount')}
          size="lg"
          startContent={<span className="text-default-400">€</span>}
          type="text"
          value={amount}
          onValueChange={handleAmountChange}
        />

        <Input
          isRequired
          classNames={{ input: 'outline-none' }}
          label={t('transactions.description')}
          size="lg"
          value={description}
          onValueChange={setDescription}
        />

        <Input
          classNames={{ input: 'outline-none' }}
          label={t('transactions.date')}
          size="lg"
          type="datetime-local"
          value={dateTime}
          onValueChange={setDateTime}
        />
      </CardBody>
      <CardFooter className="px-0 justify-end">
        <Button
          className="text-md"
          color="primary"
          isDisabled={!description || !amount}
          startContent={<IconDeviceFloppy size={20} />}
          type="submit"
        >
          {t('transactions.save')}
        </Button>
      </CardFooter>
    </Card>
  )
}
