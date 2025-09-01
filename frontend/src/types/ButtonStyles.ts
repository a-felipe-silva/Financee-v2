export type ButtonType =
  | "primary"
  | "primary-accent"
  | "success"
  | "warning"
  | "error"
  | "secondary";

export interface ButtonStyle {
  background?: string | undefined;
  textColor?: string | undefined;
}

export const BUTTON_STYLES: Record<ButtonType, ButtonStyle> = {
  primary: {
    background: "bg-primary hover:bg-primary-hover",
    textColor: "text-text-on-primary",
  },
  "primary-accent": {
    background: "bg-primary-accent hover:bg-primary-accent-hover",
    textColor: "text-text-on-primary",
  },
  secondary: {
    background: "bg-secondary hover:bg-secondary-hover",
    textColor: "text-text-on-secondary",
  },
  success: {
    background: "bg-success hover:bg-success-hover",
    textColor: "text-text-on-primary",
  },
  warning: {
    background: "bg-warning hover:bg-warning-hover",
    textColor: "text-text-on-primary",
  },
  error: {
    background: "bg-error hover:bg-error-hover",
    textColor: "text-text-on-primary",
  },
} as const;
