import { twMerge } from "tailwind-merge";
import type { ExpenseCategory } from "../types/ExpenseCategory";

interface ExpenseCategoryLabelProps {
  category?: ExpenseCategory;
}

export default function ExpenseCategoryLabel({
  category,
}: ExpenseCategoryLabelProps) {
  return (
    <label
      className={twMerge(
        "text-text-on-primary text-center h-fit py-1 px-4 min-w-[140px] max-w-[140px] whitespace-nowrap text-ellipsis overflow-hidden rounded-lg",
        category && category.name ? "bg-primary-accent" : "bg-muted"
      )}
    >
      {category && category.name ? category.name : "No Category"}
    </label>
  );
}
