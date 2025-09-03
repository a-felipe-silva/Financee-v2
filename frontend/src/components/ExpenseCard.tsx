import ExpenseCategoryLabel from "./ExpenseCategoryLabel";
import IconButton from "./IconButton";
import EditCardIcon from "../assets/edit-card.svg?react";
import DeleteCardIcon from "../assets/delete-card.svg?react";
import type { Expense } from "../types/Expense";
import { format, parse } from "date-fns";
import { formatAmount } from "../utils/formatingUtils";

interface ExpenseCardProps {
  expense: Expense;
  onEdit?(expense: Expense): void;
  onDelete?(expense: Expense): void;
}

export default function ExpenseCard({
  expense,
  onEdit,
  onDelete,
}: ExpenseCardProps) {
  return (
    <div className="bg-surface border-3 border-border p-4 flex flex-row justify-between gap-6 shadow-md shadow-shadow rounded-lg">
      <div className="flex flex-row justify-between items-center grow">
        <ExpenseCategoryLabel category={expense.category} />
        <p className="font-primary">{expense.description}</p>
        <div className="flex flex-col items-center">
          <p className="font-primary text-2xl">
            {formatAmount(expense.amount)}
          </p>
          <p className="font-primary text-xs">
            {format(expense.date, "dd-MM-yyyy")}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <IconButton
          Icon={EditCardIcon}
          type="primary-accent"
          onClick={() => onEdit?.(expense)}
          className="h-8 aspect-square"
          ariaLabel="Edit Card"
        />
        <IconButton
          Icon={DeleteCardIcon}
          type="error"
          onClick={() => onDelete?.(expense)}
          className="h-8 aspect-square"
          ariaLabel="Delete Card"
        />
      </div>
    </div>
  );
}
