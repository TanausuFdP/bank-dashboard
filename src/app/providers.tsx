import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider } from 'next-themes'
import '../app/i18n'
import { Provider } from 'react-redux'
import { ToastProvider } from '@heroui/react'

import { store } from '@/store'

type Props = {
  children: React.ReactNode
}

export function AppProviders({ children }: Props) {
  const theme = localStorage.getItem('theme') ?? 'system'

  return (
    <Provider store={store}>
      <HeroUIProvider>
        <ToastProvider />
        <ThemeProvider enableSystem attribute="class" defaultTheme={theme}>
          {children}
        </ThemeProvider>
      </HeroUIProvider>
    </Provider>
  )
}
