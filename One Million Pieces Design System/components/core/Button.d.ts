import * as React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  /** primary = vermillion fill; secondary = ink outline; ghost = quiet; link = inline text accent. */
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/**
 * Action button. Labels are verb-first and sentence-case.
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost / link" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
