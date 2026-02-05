import type { RootState } from '@/store'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Card, CardBody } from '@heroui/react'
import { IconArrowUpRight, IconArrowDownRight, IconWallet } from '@tabler/icons-react'

export default function BalanceOverview() {
  const { t } = useTranslation()
  const transactions = useSelector((state: RootState) => state.transactions.items)

  const balance = transactions.reduce((acc, t) => acc + t.amount, 0)
  const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0)
  const expenses = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0)

  return (
    <Card>
      <CardBody className="space-y-2">
        <p className="flex items-center gap-2 text-lg font-semibold">
          <IconWallet size={20} />
          {t('balance.title')}: {balance.toFixed(2)} €
        </p>

        <p className="flex items-center gap-2 text-green-600">
          <IconArrowUpRight size={18} />
          {t('balance.income')}: {income.toFixed(2)} €
        </p>

        <p className="flex items-center gap-2 text-red-600">
          <IconArrowDownRight size={18} />
          {t('balance.expenses')}: {Math.abs(expenses).toFixed(2)} €
        </p>
      </CardBody>
    </Card>
  )
}
