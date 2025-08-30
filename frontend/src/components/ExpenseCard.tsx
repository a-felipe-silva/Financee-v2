import ExpenseCategoryLabel from "./ExpenseCategoryLabel"
import IconButton from "./IconButton"
import EditCardIcon from "../assets/edit-card.svg?react"
import DeleteCardIcon from "../assets/delete-card.svg?react"
import type { Expense } from "../types/Expense";
import { format } from "date-fns";

interface ExpenseCardProps {
  onEditExpenseClick(expense: Expense): void;
}

export default function ExpenseCard({ onEditExpenseClick }: ExpenseCardProps) {
  const expense = {
    id: "123456",
    description: "Mock Description",
    amount: "R$25,34",
    category: {
      id: 24,
      name: "Some Category"
    },
    date: new Date(),
  };

  return (
    <div className="bg-surface border-3 border-border p-4 flex flex-row justify-between gap-6 shadow-md shadow-shadow rounded-lg">
        <div className="flex flex-row justify-between items-center grow-1">
            <ExpenseCategoryLabel category={expense.category} />
            <p className="font-primary">{expense.description}</p>
            <div className="flex flex-col items-center">
          <p className="font-primary text-2xl">{ expense.amount }</p>
          <p className="font-primary text-xs">{ format(expense.date, "dd-MM-yyyy") }</p>
            </div>      
        </div>
        <div className="flex flex-col gap-1">
            <IconButton Icon={EditCardIcon} onClick={() => onEditExpenseClick(expense)}/>
            <IconButton Icon={DeleteCardIcon} type="error" />
        </div>
    </div>
  )
}
