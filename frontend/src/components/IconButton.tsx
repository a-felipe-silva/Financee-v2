import type { FunctionComponent, SVGProps } from "react";
import { twMerge } from "tailwind-merge";
import { BUTTON_STYLES, type ButtonType } from "../types/ButtonStyles";

interface IconButtonProps {
  onClick?(): void;
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  >;
  type?: ButtonType;
  className?: string | undefined;
  iconClassName?: string | undefined;
  ariaLabel: string;
}

export default function IconButton({
  onClick,
  Icon,
  type = "primary-accent",
  className,
  iconClassName,
  ariaLabel,
}: IconButtonProps) {
  const style = BUTTON_STYLES[type];

  return (
    <button
      className={twMerge(
        "flex items-center justify-center rounded-lg transition-colors ease-in-out p-[0.35rem]",
        style.background,
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Icon
        className={twMerge(
          "font-serif h-full w-full",
          style.textColor,
          iconClassName
        )}
      />
    </button>
  );
}
