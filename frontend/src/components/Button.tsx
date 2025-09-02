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
  const style = BUTTON_STYLES[type];

  return (
    <button
      className={twMerge(
        "flex items-center h-fit p-3 rounded-lg transition-colors ease-in-out",
        shadow && "shadow-md/100 shadow-shadow",
        style.background,
        style.textColor,
        className
      )}
      onClick={onClick}
    >
      <p className="font-serif">{text}</p>
    </button>
  );
}
