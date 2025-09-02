import { useId, useState, type ChangeEvent } from "react";
import Button from "./Button";

export interface TextInputProps {
  id?: string;
  label: string;
  placeholder?: string;
  value?: string;
  onTextChange?(text: string): void;
  action?(): void;
}

export default function TextInput({
  id,
  label,
  placeholder,
  value,
  onTextChange,
  action,
}: TextInputProps) {
  const [text, setText] = useState(value);
  const autoId = useId();
  const inputId = id || autoId;

  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    const newText = e.target.value;
    setText(newText);
    onTextChange?.(newText);
  }

  return (
    <div className="flex flex-col gap-2.5 text-base">
      <label htmlFor={inputId} className="text-2xl text-text font-serif">
        {label}
      </label>
      <div className="flex flex-row items-stretch w-full gap-2">
        <input
          type="text"
          id={inputId}
          placeholder={placeholder}
          value={text}
          onChange={handleTextChange}
          className="bg-background outline-none px-2 py-1 border-border text-2xl focus-visible:border-border-selected focus:border-border-selected border-3 rounded-sm placeholder:text-muted text-text font-sans grow"
        />
        {action && <Button text="Add" shadow={false} className="font-bold" />}
      </div>
    </div>
  );
}
