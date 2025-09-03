import { forwardRef, useState, type InputHTMLAttributes } from "react";
import CurrencyInput, {
  type CurrencyInputOnChangeValues,
} from "react-currency-input-field";
import TextInput, { type TextInputProps } from "./TextInput";
import Button from "./Button";

interface MoneyInputProps {
  id?: string;
  label: string;
  placeholder?: string;
  startValue?: string;
  action?(): void;
  onChange?(value: string): void;
}

const CustomInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input
    type="text"
    {...props}
    ref={ref}
    className="bg-background outline-none px-2 py-1 border-border text-2xl focus-visible:border-border-selected focus:border-border-selected border-3 rounded-sm placeholder:text-muted text-text font-sans grow w-full"
  />
));

export default function MoneyInput({
  label,
  id,
  placeholder,
  startValue = "",
  action,
  onChange,
}: MoneyInputProps) {
  const [money, setMoney] = useState(startValue);

  function handleValueChange(value: string | undefined) {
    setMoney(value || "");
    onChange?.(value || "");
  }

  return (
    <div className="flex flex-col gap-2.5 text-base">
      <label htmlFor={id} className="text-2xl text-text font-serif">
        {label}
      </label>
      <div className="flex flex-row items-center">
        <CurrencyInput
          id={id}
          placeholder={placeholder}
          defaultValue={money}
          customInput={CustomInput}
          decimalScale={2}
          decimalsLimit={2}
          fixedDecimalLength={2}
          intlConfig={{ locale: "en-US", currency: "USD" }}
          onValueChange={(value) => handleValueChange(value)}
          maxLength={12}
        />
        {action && <Button text="Add" shadow={false} className="ml-2" />}
      </div>
    </div>
  );
}
