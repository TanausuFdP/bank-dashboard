import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider } from 'next-themes'
import '../app/i18n'
import { Provider } from 'react-redux'

import { store } from '@/store'

type Props = {
  children: React.ReactNode
}

export function AppProviders({ children }: Props) {
  return (
    <Provider store={store}>
      <HeroUIProvider>
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </HeroUIProvider>
    </Provider>
  )
}
