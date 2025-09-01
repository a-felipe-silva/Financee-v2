import { twMerge } from "tailwind-merge";
import { BUTTON_STYLES, type ButtonType } from "../types/ButtonStyles";

interface ButtonProps {
  text: string;
  onClick?(): void;
  type?: ButtonType;
  shadow?: boolean;
  className?: string | undefined;
}

export default function Button({
  text,
  onClick,
  type = "primary",
  shadow = true,
  className,
}: ButtonProps) {
  return (
    <div
      className={twMerge(
        BUTTON_STYLES[type].background,
        shadow && "shadow-md/100 shadow-shadow",
        "flex items-center h-fit p-3 rounded-lg transition-colors ease-in-out",
        className
      )}
      onClick={onClick}
    >
      <p className={twMerge(BUTTON_STYLES[type].textColor, "font-serif")}>
        {text}
      </p>
    </div>
  );
}
