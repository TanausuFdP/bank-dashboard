import BalanceOverview from './components/BalanceOverview'
import CreateTransactionForm from './components/CreateTransactionForm'
import TransactionsList from './components/TransactionsList'

function App() {
  return (
    <main className="mx-auto max-w-xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Banking Dashboard</h1>

      <BalanceOverview />

      <CreateTransactionForm />

      <TransactionsList />
    </main>
  )
}

export default App
