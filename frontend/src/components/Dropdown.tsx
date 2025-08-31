import { useState, type ChangeEvent } from "react";
import ArrowDownIcon from "../assets/arrow-down.svg?react";

interface DropdownOption {
  value: string;
  text: string;
}

interface DropdownProps {
  id?: string;
  options?: DropdownOption[];
  selected?: string;
  placeHolder?: string;
  label?: string;
  onValueChange?(value: string): void;
}

export default function Dropdown({
  id,
  options,
  selected = "",
  placeHolder = "Select an option",
  label,
  onValueChange,
}: DropdownProps) {
  const [selectedValue, setSelectedValue] = useState(selected);

  function handleValueChange(e: ChangeEvent<HTMLSelectElement>) {
    const newSelected = e.target.value;
    setSelectedValue(newSelected);
    onValueChange?.(newSelected);
  }

  return (
    <div className="flex flex-col gap-2.5 text-base">
      <label htmlFor={id} className="text-2xl text-text font-serif">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={selectedValue}
          onChange={handleValueChange}
          className="bg-background outline-none px-2 py-1 border-border text-2xl focus-visible:border-border-selected focus:border-border-selected border-3 rounded-sm placeholder:text-text-muted text-text font-sans appearance-none w-full h-full"
        >
          <option value="">{placeHolder}</option>
          {options &&
            options.map((op) => <option value={op.value}>{op.text}</option>)}
        </select>

        <ArrowDownIcon className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-3 text-text-muted" />
      </div>
    </div>
  );
}
