export interface Expense {
  id: string;
  description: string;
  amount: string;
  date: Date;
  category: { id: number; name: string };
}
