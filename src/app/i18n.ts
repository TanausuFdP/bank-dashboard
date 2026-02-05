import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import es from '../locales/es/common.json'

i18n.use(initReactI18next).init({
  resources: {
    es: { common: es },
  },
  lng: 'es',
  fallbackLng: 'es',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
