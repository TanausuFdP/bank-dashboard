import type { AppDispatch } from '@/store'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'
import { Button, Card, CardBody, Input, Select, SelectItem } from '@heroui/react'
import { IconPlus } from '@tabler/icons-react'

import { addTransaction } from '@/store/transactionsSlice'
import { TransactionType } from '@/types/enums'

export default function CreateTransactionForm() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<TransactionType>(TransactionType.DEPOSIT)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    const numericAmount = Number(amount)

    if (!numericAmount || numericAmount <= 0) return

    dispatch(
      addTransaction({
        id: uuid(),
        description,
        amount: type === TransactionType.DEPOSIT ? numericAmount : -numericAmount,
        type,
        date,
        createdAt: new Date().toISOString(),
      })
    )

    setDescription('')
    setAmount('')
  }

  return (
    <Card>
      <CardBody as="form" className="gap-3" onSubmit={submit}>
        <Input
          isRequired
          label={t('transactions.description')}
          value={description}
          onValueChange={setDescription}
        />

        <Input
          isRequired
          label={t('transactions.amount')}
          type="number"
          value={amount}
          onValueChange={setAmount}
        />

        <Input label={t('transactions.date')} type="date" value={date} onValueChange={setDate} />

        <Select
          label="Tipo"
          selectedKeys={[type]}
          onSelectionChange={keys => setType(Array.from(keys)[0] as TransactionType)}
        >
          <SelectItem key={TransactionType.DEPOSIT}>{t('transactions.deposit')}</SelectItem>
          <SelectItem key={TransactionType.WITHDRAWAL}>{t('transactions.withdrawal')}</SelectItem>
        </Select>

        <Button color="primary" startContent={<IconPlus size={18} />} type="submit">
          {t('transactions.add')}
        </Button>
      </CardBody>
    </Card>
  )
}
