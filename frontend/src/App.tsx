import { useState } from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Header from './components/Header'
import type { Expense } from './types/Expense'

interface ExpenseModal {
  visible: boolean;
  expense: Expense | null;
}

function App() {
  const [expenseModal, setExpenseModal] = useState<ExpenseModal>({
    visible: false,
    expense: null,
  });

  function showAddExpenseForm() {
    setExpenseModal({ visible: true, expense: null });
  }

  function showEditExpenseForm(expense: Expense) {
    setExpenseModal({ visible: true, expense: expense });
  }

  return (
    <>
      <Header onAddExpenseClick={showAddExpenseForm}/>
      <ExpenseList onEditExpenseClick={showEditExpenseForm} />
      {expenseModal.visible && <ExpenseForm expense={expenseModal.expense} onClose={() => setExpenseModal({...expenseModal, visible: false})} />}
    </>
  )
}

export default App
