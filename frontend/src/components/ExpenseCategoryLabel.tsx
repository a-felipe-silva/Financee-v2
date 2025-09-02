import { twMerge } from "tailwind-merge";

interface ExpenseCategoryLabelProps {
  category?: {
    id: number;
    name: string;
  };
}

export default function ExpenseCategoryLabel({
  category,
}: ExpenseCategoryLabelProps) {
  return (
    <label
      className={twMerge(
        "text-text-on-primary text-center h-fit py-1 px-4 rounded-lg",
        category ? "bg-primary-accent" : "bg-muted"
      )}
    >
      {category ? category.name : "No Category"}
    </label>
  );
}
