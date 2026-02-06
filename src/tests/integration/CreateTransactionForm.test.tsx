import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'

import { store } from '@/store'
import CreateTransactionForm from '@/components/CreateTransactionForm'
import TransactionsList from '@/components/TransactionsList'

test('creates a new transaction', () => {
  render(
    <Provider store={store}>
      <CreateTransactionForm />
      <TransactionsList />
    </Provider>
  )

  fireEvent.change(screen.getByLabelText(/description/i), {
    target: { value: 'Test transaction' },
  })

  fireEvent.change(screen.getByLabelText(/amount/i), {
    target: { value: '100' },
  })

  fireEvent.click(screen.getByLabelText(/add/i))

  expect(screen.getByText('Test transaction')).toBeInTheDocument()
})
