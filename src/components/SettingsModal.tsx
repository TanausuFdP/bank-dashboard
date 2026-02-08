import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from '@heroui/react'
import {
  IconLanguage,
  IconMoon,
  IconSun,
  IconDeviceDesktop,
  IconSettings,
} from '@tabler/icons-react'

import { setTheme, type ThemeMode } from '@/utils/theme'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: Props) {
  const { t, i18n } = useTranslation()

  const [language, setLanguage] = useState(i18n.language)
  const [themeState, setThemeState] = useState<ThemeMode>(
    (localStorage.getItem('theme') as ThemeMode) ?? 'system'
  )

  useEffect(() => {
    i18n.changeLanguage(language)
    localStorage.setItem('language', language)
  }, [language, i18n])

  useEffect(() => {
    setTheme(themeState)
  }, [themeState])

  return (
    <Modal className="rounded-3xl" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex items-center gap-2">
          <IconSettings size={20} />
          {t('settings.title')}
        </ModalHeader>

        <ModalBody className="gap-6">
          <Select
            label={t('settings.language')}
            selectedKeys={[language]}
            startContent={<IconLanguage size={18} />}
            onSelectionChange={keys => setLanguage(Array.from(keys)[0] as string)}
          >
            <SelectItem key="es">Español</SelectItem>
            <SelectItem key="en">English</SelectItem>
            <SelectItem key="fr">Français</SelectItem>
          </Select>

          <Select
            label={t('settings.theme')}
            selectedKeys={[themeState]}
            onSelectionChange={keys => setThemeState(Array.from(keys)[0] as ThemeMode)}
          >
            <SelectItem key="system" startContent={<IconDeviceDesktop size={18} />}>
              {t('settings.theme_system')}
            </SelectItem>
            <SelectItem key="light" startContent={<IconSun size={18} />}>
              {t('settings.theme_light')}
            </SelectItem>
            <SelectItem key="dark" startContent={<IconMoon size={18} />}>
              {t('settings.theme_dark')}
            </SelectItem>
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onPress={onClose}>
            {t('common.close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
