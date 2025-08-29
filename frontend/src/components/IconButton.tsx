import type { FunctionComponent, SVGProps } from 'react';

interface IconButtonProps {
  onClick?(): void;
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string, titleId?: string, desc?: string, descId?: string }
  >;
  type?: "primary" | "primary-accent" | "success" | "warning" | "error";
}

const bgMap = {
  primary: "bg-primary hover:bg-primary-hover",
  "primary-accent": "bg-primary-accent hover:bg-primary-accent-hover",
  success: "bg-success hover:bg-success-hover",
  warning: "bg-warning hover:bg-warning-hover",
  error: "bg-error hover:bg-error-hover",
} as const;

export default function IconButton({ onClick, Icon, type = "primary-accent" }: IconButtonProps) {
  return (
    <div className={`${bgMap[type]} flex items-center w- h-fit rounded-lg transition-colors ease-in-out p-[0.35rem] aspect-square`} onClick={onClick}>
          <Icon className="text-text-on-primary font-serif h-[1.2rem] w-fit"></Icon>      
    </div>
  )
}