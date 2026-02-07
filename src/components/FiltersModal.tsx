import type { RangeValue } from '@react-types/shared'
import type { DateValue } from '@react-types/calendar'
import type { AppDispatch } from '@/store'

import {
  IconCircleArrowUpRightFilled,
  IconCircleArrowDownRightFilled,
  IconCircleCheck,
  IconCircleX,
} from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ButtonGroup,
  DateRangePicker,
  Slider,
  Select,
  SelectItem,
  ModalFooter,
} from '@heroui/react'
import { I18nProvider } from '@react-aria/i18n'
import { useState } from 'react'
import {
  endOfMonth,
  endOfYear,
  getLocalTimeZone,
  startOfMonth,
  startOfYear,
  today,
} from '@internationalized/date'
import { useDispatch } from 'react-redux'

import { TransactionType } from '@/types/enums'
import { setType, setDateRange, setAmountRange } from '@/store/transactionsSlice'

type Props = {
  isOpen: boolean
  onClose: () => void
  maxAmount: number
}

export default function FiltersModal({ isOpen, onClose, maxAmount }: Props) {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const [dateRangeState, setDateRangeState] = useState<RangeValue<DateValue> | null>(null)
  const [typeState, setTypeState] = useState<'ALL' | TransactionType>('ALL')
  const [amountRangeState, setAmountRangeState] = useState<[number, number]>([0, maxAmount])

  const now = today(getLocalTimeZone())

  function onDateRangeChange(range: RangeValue<DateValue> | null) {
    setDateRangeState(range)
  }

  function clearFilters() {
    setTypeState('ALL')
    setDateRangeState(null)
    setAmountRangeState([0, maxAmount])
  }

  function applyFilters() {
    dispatch(setType(typeState))

    dispatch(
      setDateRange({
        from: dateRangeState?.start?.toString() ?? null,
        to: dateRangeState?.end?.toString() ?? null,
      })
    )

    dispatch(
      setAmountRange({
        min: amountRangeState[0],
        max: amountRangeState[1],
      })
    )

    onClose()
  }

  return (
    <Modal className="rounded-3xl" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>{t('filters_modal.title')} </ModalHeader>

        <ModalBody>
          <div className="w-full flex justify-end">
            <Button
              className="text-sm"
              color="danger"
              size="sm"
              startContent={<IconCircleX size={16} />}
              variant="light"
              onPress={clearFilters}
            >
              {t('filters_modal.clear')}
            </Button>
          </div>
          <Select
            disallowEmptySelection
            classNames={{
              value:
                typeState === 'ALL'
                  ? undefined
                  : typeState === TransactionType.DEPOSIT
                    ? '!text-green-500'
                    : '!text-red-500',
            }}
            label={t('transactions.type')}
            selectedKeys={[typeState]}
            size="lg"
            startContent={
              typeState === 'ALL' ? undefined : typeState === TransactionType.DEPOSIT ? (
                <IconCircleArrowUpRightFilled className="text-green-500" size={24} />
              ) : (
                <IconCircleArrowDownRightFilled className="text-red-500" size={24} />
              )
            }
            onSelectionChange={keys => setTypeState(Array.from(keys)[0] as 'ALL' | TransactionType)}
          >
            <SelectItem key="ALL">{t('transactions.all')}</SelectItem>
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
          <I18nProvider>
            <DateRangePicker
              showMonthAndYearPickers
              CalendarTopContent={
                <ButtonGroup
                  fullWidth
                  className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
                  radius="full"
                  size="sm"
                  variant="bordered"
                >
                  <Button
                    onPress={() =>
                      setDateRangeState({
                        start: now,
                        end: now,
                      })
                    }
                  >
                    {t('filters_modal.today')}
                  </Button>
                  <Button
                    onPress={() =>
                      setDateRangeState({
                        start: startOfMonth(now.add({ weeks: 1 })),
                        end: endOfMonth(now.add({ weeks: 1 })),
                      })
                    }
                  >
                    {t('filters_modal.this_month')}
                  </Button>
                  <Button
                    onPress={() =>
                      setDateRangeState({
                        start: startOfYear(now.add({ weeks: 1 })),
                        end: endOfYear(now.add({ weeks: 1 })),
                      })
                    }
                  >
                    {t('filters_modal.this_year')}
                  </Button>
                </ButtonGroup>
              }
              aria-label="date-picker"
              calendarWidth={320}
              label={t('filters_modal.date_range')}
              selectorButtonPlacement="start"
              size="lg"
              value={dateRangeState as any} //TODO: fix type
              onChange={onDateRangeChange}
            />
          </I18nProvider>
          <div className="bg-default-100 hover:bg-default-200 rounded-2xl p-3 shadow-sm">
            <Slider
              formatOptions={{ style: 'currency', currency: 'EUR' }}
              label={t('filters_modal.amount_range')}
              maxValue={maxAmount}
              minValue={0}
              value={amountRangeState}
              onChange={value => setAmountRangeState(value as [number, number])}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            color="primary"
            startContent={<IconCircleCheck size={20} />}
            onPress={applyFilters}
          >
            {t('filters_modal.apply')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
