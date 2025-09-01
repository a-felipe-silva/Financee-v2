import TextInput from "./TextInput";
import CloseIcon from "../assets/close.svg?react";
import type { Expense } from "../types/Expense";
import Dropdown from "./Dropdown";
import { useState } from "react";
import DatepickerInput from "./DatepickerInput";
import Button from "./Button";

interface ExpenseFormProps {
  expense: Expense | null;
  onClose(): void;
}

export default function ExpenseForm({ expense, onClose }: ExpenseFormProps) {
  const [showAddCategory, setShowAddCategory] = useState(false);

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
            { value: "3", text: "Some Category" },
          ]}
          selected={expense?.category?.id.toString()}
          placeHolder="No Category"
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
        />
      </div>
      <CloseIcon
        className="fixed right-10 top-10 aspect-square h-6 w-auto text-surface hover:text-surface-hover"
        onClick={onClose}
      />
    </div>
  );
}
