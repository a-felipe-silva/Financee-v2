import TextInput from "./TextInput";
import CloseIcon from "../assets/close.svg?react";
import type { Expense } from "../types/Expense";
import Dropdown from "./Dropdown";

interface ExpenseFormProps {
  expense: Expense | null;
  onClose(): void;
}

export default function ExpenseForm({ expense, onClose }: ExpenseFormProps) {
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black/50">
      <div className="fixed left-1/2 top-1/2 -translate-1/2 px-12 py-14 w-1/2 max-w-[900px] rounded-xl bg-surface flex flex-col gap-6">
        <TextInput
          label="Description"
          placeholder="Expense Description"
          value={expense?.description}
        />
        <TextInput
          label="Amount"
          placeholder="R$0.00"
          value={expense?.amount}
        />
        <Dropdown
          label="Category"
          options={[
            { value: "1", text: "Groceries" },
            { value: "2", text: "Toys" },
            { value: "3", text: "Medications" },
          ]}
          placeHolder="No Category"
          onAddOption={() => {}}
        />
      </div>
      <CloseIcon
        className="fixed right-10 top-10 aspect-square h-6 w-auto text-surface hover:text-surface-hover"
        onClick={onClose}
      />
    </div>
  );
}
