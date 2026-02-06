import type { RootState } from '@/store'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@heroui/react'
import {
  IconBuildingBank,
  IconCircleArrowUpRightFilled,
  IconCircleArrowDownRightFilled,
} from '@tabler/icons-react'

import { formatPrice } from '@/utils/helper'

export default function BalanceOverview() {
  const { t } = useTranslation()
  const transactions = useSelector((state: RootState) => state.transactions.items)

  const balance = transactions.reduce((acc, t) => acc + t.amount, 0)
  const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0)
  const expenses = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0)

  return (
    <Card className="rounded-3xl" shadow="none">
      <CardHeader className="gap-1">
        <IconBuildingBank className="opacity-85" size={18} />
        <h2 className="text-md font-semibold opacity-85">{t('balance.title')}</h2>
      </CardHeader>
      <CardBody className="space-y-4">
        <p className="text-3xl font-semibold text-center">{formatPrice(balance)}</p>

        <div className="w-full flex items-center justify-evenly">
          <p className="flex items-center gap-2 text-green-600">
            <IconCircleArrowUpRightFilled size={20} />
            {formatPrice(income)}
          </p>

          <p className="flex items-center gap-2 text-red-600">
            <IconCircleArrowDownRightFilled size={20} />
            {formatPrice(expenses)}
          </p>
        </div>
      </CardBody>
    </Card>
  )
}
