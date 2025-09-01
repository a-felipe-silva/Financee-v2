import type { FunctionComponent, SVGProps } from "react";
import { twMerge } from "tailwind-merge";

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
  type?: "primary" | "primary-accent" | "success" | "warning" | "error";
  className?: string | undefined;
  iconClassName?: string | undefined;
}

const bgMap = {
  primary: "bg-primary hover:bg-primary-hover",
  "primary-accent": "bg-primary-accent hover:bg-primary-accent-hover",
  success: "bg-success hover:bg-success-hover",
  warning: "bg-warning hover:bg-warning-hover",
  error: "bg-error hover:bg-error-hover",
} as const;

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
        `${bgMap[type]} flex items-center justify-center rounded-lg transition-colors ease-in-out p-[0.35rem]`,
        className
      )}
      onClick={onClick}
    >
      <Icon
        className={twMerge(
          "text-text-on-primary font-serif h-full w-full",
          iconClassName
        )}
      ></Icon>
    </div>
  );
}
