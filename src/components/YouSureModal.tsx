'use client'

import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface YouSureModalProps {
  isOpen: boolean
  description?: string
  submitLabel?: string
  onSubmit: () => Promise<void> | void
  onClose: () => void
}

export default function YouSureModal({
  isOpen,
  description = '',
  submitLabel,
  onSubmit,
  onClose,
}: YouSureModalProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await onSubmit()
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal className="rounded-3xl" isOpen={isOpen} size="md" onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <span className="text-lg font-semibold">{t('common.you_sure')}</span>
        </ModalHeader>
        <ModalBody className="space-y-4 px-2 sm:px-6">
          <Card className="shadow-none bg-transparent" shadow="sm">
            <CardBody className="gap-5">
              <span className="opacity-60">{description}</span>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" isDisabled={loading} variant="light" onPress={onClose}>
            {t('common.cancel')}
          </Button>
          <Button color="primary" isLoading={loading} onPress={handleSubmit}>
            {submitLabel ?? t('common.submit')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
