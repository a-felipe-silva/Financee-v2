import TextInput from "./TextInput";
import CloseIcon from "../assets/close.svg?react";
import type { Expense } from "../types/Expense";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import DatepickerInput from "./DatepickerInput";
import Button from "./Button";
import { formatAmount } from "../utils/formatingUtils";
import MoneyInput from "./MoneyInput";
import type { ExpenseCategory } from "../types/ExpenseCategory";

interface ExpenseFormProps {
  expense: Expense | null;
  onClose(): void;
}

function parseCategoryResponse(category: any): ExpenseCategory {
  let parsed: ExpenseCategory = {
    id: category.id,
    name: category.name,
  };

  return parsed;
}

export default function ExpenseForm({ expense, onClose }: ExpenseFormProps) {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categories, setCategories] = useState<ExpenseCategory[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetch("http://localhost:3000/expenses/categories", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWNlLmpvaG5zb25AZXhhbXBsZS5jb20iLCJ2IjoxLCJpYXQiOjE3NTY5MzQ4MTUsImV4cCI6MTc2Mjk4MjgxNSwic3ViIjoiMzE1MmRiZWItZDIyMi00NDdmLWExYmUtYTBlYzk1ZmI1YzUxIn0.kPitEN2w8chR7k8kUtOBMDrhF5heh9BNiI-zgQiuykw",
        },
      });

      const categories: any[] = (await data.json()).categories;

      setCategories(categories.map(parseCategoryResponse));
    };

    fetchCategories();
  }, []);

  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black/50">
      <div className="fixed left-1/2 top-1/2 -translate-1/2 px-12 py-12 w-1/2 max-w-[900px] rounded-xl bg-surface flex flex-col gap-6">
        <TextInput
          label="Description"
          placeholder="Expense Description"
          value={expense?.description}
        />
        <DatepickerInput
          value={expense?.date}
          label="Date"
          placeholder="00-00-0000"
        />
        <MoneyInput
          label="Amount"
          placeholder={formatAmount("0.00")}
          startValue={expense?.amount}
          onChange={(v) => console.log(v)}
        />
        <Dropdown
          label="Category"
          options={categories?.map((c) => ({
            key: c.id?.toString(),
            value: c.id?.toString() ?? "",
            text: c.name ?? "",
          }))}
          selected={expense?.category?.id?.toString()}
          placeholder="No Category"
          action={() => {
            setShowAddCategory((old) => !old);
          }}
        />
        {showAddCategory && (
          <div className="bg-surface border-border border-3 rounded-xl p-5">
            <TextInput
              label="New Category"
              placeholder="Name"
              action={() => {}}
            />
          </div>
        )}
        <Button
          text={expense ? "Edit Expense" : "Add Expense"}
          className="w-fit self-center font-bold text-2xl"
          shadow={false}
        />
      </div>
      <CloseIcon
        className="fixed right-10 top-10 aspect-square h-6 w-auto text-surface hover:text-surface-hover"
        onClick={onClose}
      />
    </div>
  );
}
