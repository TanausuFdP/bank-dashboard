export type ThemeMode = 'system' | 'light' | 'dark'

let mediaQuery: MediaQueryList | null = null

const applyClass = (isDark: boolean) => {
  document.documentElement.classList.toggle('dark', isDark)
}

export const setTheme = (mode: ThemeMode) => {
  localStorage.setItem('theme', mode)

  if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleSystemChange)
    mediaQuery = null
  }

  if (mode === 'system') {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    applyClass(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleSystemChange)
  } else {
    applyClass(mode === 'dark')
  }
}

const handleSystemChange = (e: MediaQueryListEvent) => {
  applyClass(e.matches)
}
