import type { ExpenseCategory } from "./ExpenseCategory";

export interface Expense {
  id: string;
  description: string;
  amount: string;
  date: Date;
  category?: ExpenseCategory;
}
