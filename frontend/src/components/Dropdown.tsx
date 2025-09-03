import { useId, useState, type ChangeEvent } from "react";
import ArrowDownIcon from "../assets/arrow-down.svg?react";
import IconButton from "./IconButton";
import PlusIcon from "../assets/plus.svg?react";

interface DropdownOption {
  key?: string;
  value: string;
  text: string;
}

interface DropdownProps {
  id?: string;
  options?: DropdownOption[];
  selected?: string;
  placeholder?: string;
  label?: string;
  onValueChange?(value: string): void;
  action?(): void;
}

export default function Dropdown({
  id,
  options,
  selected = "",
  placeholder = "Select an option",
  label,
  onValueChange,
  action,
}: DropdownProps) {
  const [selectedValue, setSelectedValue] = useState(selected);
  const autoId = useId();
  const dropdownId = id || autoId;

  function handleValueChange(e: ChangeEvent<HTMLSelectElement>) {
    const newSelected = e.target.value;
    setSelectedValue(newSelected);
    onValueChange?.(newSelected);
  }

  return (
    <div className="flex flex-col gap-2.5 text-base">
      <label htmlFor={dropdownId} className="text-2xl text-text font-serif">
        {label}
      </label>
      <div className="flex flex-row items-stretch w-full gap-2">
        <div className="relative grow">
          <select
            id={dropdownId}
            value={selectedValue}
            onChange={handleValueChange}
            className="bg-background outline-none px-2 py-1 border-border text-2xl focus-visible:border-border-selected focus:border-border-selected border-3 rounded-sm placeholder:text-muted text-text font-sans appearance-none w-full h-full"
          >
            <option value="">{placeholder}</option>
            {options &&
              options.map((op) => (
                <option key={op.key} value={op.value}>
                  {op.text}
                </option>
              ))}
          </select>

          <ArrowDownIcon className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-3 text-muted" />
        </div>
        {action && (
          <IconButton
            Icon={PlusIcon}
            type="primary"
            className="w-[42px]"
            iconClassName="w-2/3 aspect-square"
            onClick={action}
            ariaLabel="Add Expense"
          />
        )}
      </div>
    </div>
  );
}
