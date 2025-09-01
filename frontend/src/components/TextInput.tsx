import { useState, type ChangeEvent } from "react";

interface InputProps {
  id?: string;
  label: string;
  placeholder?: string;
  value?: string;
  onTextChange?(text: string): void;
}

export default function TextInput({
  id,
  label,
  placeholder,
  value,
  onTextChange,
}: InputProps) {
  const [text, setText] = useState(value);

  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    const newText = e.target.value;
    setText(newText);
    onTextChange?.(newText);
  }

  return (
    <div className="flex flex-col gap-2.5 text-base">
      <label htmlFor={id} className="text-2xl text-text font-serif">
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={text}
        onChange={handleTextChange}
        className="bg-background outline-none px-2 py-1 border-border text-2xl focus-visible:border-border-selected focus:border-border-selected border-3 rounded-sm placeholder:text-muted text-text font-sans"
      />
    </div>
  );
}
