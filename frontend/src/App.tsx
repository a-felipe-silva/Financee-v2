import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Header from "./components/Header";
import type { Expense } from "./types/Expense";

interface ExpenseFormState {
  visible: boolean;
  expense: Expense | null;
}

function App() {
  const [expenseForm, setExpenseForm] = useState<ExpenseFormState>({
    visible: false,
    expense: null,
  });

  function showAddExpenseForm() {
    setExpenseForm({ visible: true, expense: null });
  }

  function showEditExpenseForm(expense: Expense) {
    setExpenseForm({ visible: true, expense: expense });
  }

  return (
    <>
      <Header onAddExpenseClick={showAddExpenseForm} />
      <ExpenseList onEditExpenseClick={showEditExpenseForm} />
      {expenseForm.visible && (
        <ExpenseForm
          expense={expenseForm.expense}
          onClose={() => setExpenseForm({ ...expenseForm, visible: false })}
        />
      )}
    </>
  );
}

export default App;
