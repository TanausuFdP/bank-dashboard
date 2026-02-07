import { render } from '@testing-library/react'
import { HeroUIProvider } from '@heroui/react'
import { Provider } from 'react-redux'

import { store } from '@/store'

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <Provider store={store}>
      <HeroUIProvider>{ui}</HeroUIProvider>
    </Provider>
  )
}
