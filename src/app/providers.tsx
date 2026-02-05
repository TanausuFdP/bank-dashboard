import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider } from 'next-themes'
import '../app/i18n'

type Props = {
  children: React.ReactNode
}

export function AppProviders({ children }: Props) {
  return (
    <HeroUIProvider>
      <ThemeProvider enableSystem attribute="class" defaultTheme="system">
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  )
}
