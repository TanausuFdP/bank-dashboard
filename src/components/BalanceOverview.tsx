import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@heroui/react'
import {
  IconBuildingBank,
  IconCircleArrowUpRightFilled,
  IconCircleArrowDownRightFilled,
} from '@tabler/icons-react'

import { formatPrice } from '@/utils/helper'
import { selectBalanceSummary } from '@/store/transactionsSelector'

export default function BalanceOverview() {
  const { t } = useTranslation()
  const { balance, income, expenses, totalTransactions } = useSelector(selectBalanceSummary)

  return (
    <Card className="rounded-3xl" shadow="none">
      <CardHeader className="gap-1 justify-between">
        <div className="flex items-center gap-1">
          <IconBuildingBank className="opacity-85" size={18} />
          <h2 className="text-md font-semibold opacity-85">{t('balance.title')}</h2>
        </div>
        <span className="text-sm opacity-60">
          {t('balance.transactions', { n: totalTransactions })}
        </span>
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
