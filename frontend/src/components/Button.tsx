import { twMerge } from "tailwind-merge";
import { BUTTON_STYLES, type ButtonType } from "../types/ButtonStyles";

interface ButtonProps {
  text: string;
  onClick?(): void;
  type?: ButtonType;
}

export default function Button({
  text,
  onClick,
  type = "primary",
}: ButtonProps) {
  return (
    <div
      className={twMerge(
        BUTTON_STYLES[type].background,
        "flex items-center h-fit p-3 rounded-lg shadow-md/100 shadow-shadow transition-colors ease-in-out"
      )}
      onClick={onClick}
    >
      <p className={twMerge(BUTTON_STYLES[type].textColor, "font-serif")}>
        {text}
      </p>
    </div>
  );
}
