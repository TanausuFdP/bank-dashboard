import { screen, fireEvent } from '@testing-library/react'

import { renderWithProviders } from './helper'

import App from '@/App'

test('user can create a transaction from modal', async () => {
  renderWithProviders(<App />)

  fireEvent.click(screen.getAllByLabelText(/add/i)[0])

  fireEvent.change(await screen.findByLabelText(/description/i), {
    target: { value: 'Test transaction' },
  })

  fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '100' } })

  fireEvent.click(await screen.findByRole('button', { name: /save/i }))

  expect(await screen.findByText('Test transaction')).toBeInTheDocument()
})
