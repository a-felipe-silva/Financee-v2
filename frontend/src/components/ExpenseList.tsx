import type { Expense } from "../types/Expense";
import ExpenseCard from "./ExpenseCard";

interface ExpenseListProps {
  onEditExpenseClick(expense: Expense): void;
}

export default function ExpenseList({ onEditExpenseClick }: ExpenseListProps) {
  return (
    <div className='mx-auto my-6 flex flex-col gap-4 max-w-[1000px]'>
        <ExpenseCard onEditExpenseClick={onEditExpenseClick}/>
        <ExpenseCard onEditExpenseClick={onEditExpenseClick}/>
        <ExpenseCard onEditExpenseClick={onEditExpenseClick}/>
        <ExpenseCard onEditExpenseClick={onEditExpenseClick}/>
        <ExpenseCard onEditExpenseClick={onEditExpenseClick}/>
        <ExpenseCard onEditExpenseClick={onEditExpenseClick}/>
        <ExpenseCard onEditExpenseClick={onEditExpenseClick}/>
        <ExpenseCard onEditExpenseClick={onEditExpenseClick}/>
    </div>
  )
}
