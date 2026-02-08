import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import { AppProviders } from './app/providers.tsx'

import { setTheme } from '@/utils/theme'

const savedTheme = (localStorage.getItem('theme') as any) ?? 'system'

setTheme(savedTheme)

createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
  </AppProviders>
)
