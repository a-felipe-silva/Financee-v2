import { forwardRef, useState } from "react";
import Button from "./Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatepickerInput.css";
import CalendarIcon from "../assets/calendar.svg?react";

interface DatePickerInputProps {
  id?: string;
  label: string;
  placeholder?: string;
  value?: Date;
  onDateChange?(date: Date | null): void;
  action?(): void;
}

const CustomInput = forwardRef<HTMLInputElement, any>((props, ref) => (
  <div className="relative">
    <input
      type="text"
      {...props}
      ref={ref}
      className="bg-background outline-none px-2 py-1 border-border text-2xl focus-visible:border-border-selected focus:border-border-selected border-3 rounded-sm placeholder:text-muted text-text font-sans grow w-full"
    />
    <CalendarIcon className="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none text-muted" />
  </div>
));

export default function DatepickerInput({
  id,
  label,
  value = new Date(),
  onDateChange,
  action,
}: DatePickerInputProps) {
  const [date, setDate] = useState<Date | null>(value);

  function handleDateChange(date: Date | null) {
    if (date) {
      setDate(date);
      onDateChange?.(date);
    }
  }

  return (
    <div className="flex flex-col gap-2.5 text-base">
      <label htmlFor={id} className="text-2xl text-text font-serif">
        {label}
      </label>
      <div className="flex flex-row items-center">
        <DatePicker
          id={id}
          onChange={handleDateChange}
          selected={date}
          dateFormat={"dd-MM-yyyy"}
          customInput={<CustomInput />}
          wrapperClassName="w-full"
          showPopperArrow={false}
          showPreviousMonths={false}
        />
        {action && <Button text="Add" shadow={false} className="ml-2" />}
      </div>
    </div>
  );
}
