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
}

export default function IconButton({
  onClick,
  Icon,
  type = "primary-accent",
  className,
  iconClassName,
}: IconButtonProps) {
  return (
    <div
      className={twMerge(
        BUTTON_STYLES[type].background,
        "flex items-center justify-center rounded-lg transition-colors ease-in-out p-[0.35rem]",
        className
      )}
      onClick={onClick}
    >
      <Icon
        className={twMerge(
          BUTTON_STYLES[type].textColor,
          "font-serif h-full w-full",
          iconClassName
        )}
      ></Icon>
    </div>
  );
}
