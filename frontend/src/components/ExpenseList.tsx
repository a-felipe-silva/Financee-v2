import { parse } from "date-fns";
import type { Expense } from "../types/Expense";
import ExpenseCard from "./ExpenseCard";
import { useEffect, useState } from "react";

interface ExpenseListProps {
  onEditExpenseClick(expense: Expense): void;
}

function parseExpenseResponse(expense: any): Expense {
  let parsed: Expense = {
    id: expense.id,
    amount: expense.amount,
    date: new Date(expense.date),
    description: expense.description,
  };

  if (expense.category)
    parsed.category = {
      id: expense.category.id,
      name: expense.category.name,
    };

  return parsed;
}

export default function ExpenseList({ onEditExpenseClick }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:3000/expenses", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWNlLmpvaG5zb25AZXhhbXBsZS5jb20iLCJ2IjoxLCJpYXQiOjE3NTY5MzQ4MTUsImV4cCI6MTc2Mjk4MjgxNSwic3ViIjoiMzE1MmRiZWItZDIyMi00NDdmLWExYmUtYTBlYzk1ZmI1YzUxIn0.kPitEN2w8chR7k8kUtOBMDrhF5heh9BNiI-zgQiuykw",
        },
      });

      const expenses = (await data.json()).expenses;

      setExpenses(expenses.map(parseExpenseResponse));
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto my-6 flex flex-col gap-4 max-w-[1000px]">
      {expenses &&
        expenses.map((e) => (
          <ExpenseCard key={e.id} expense={e} onEdit={onEditExpenseClick} />
        ))}
    </div>
  );
}
