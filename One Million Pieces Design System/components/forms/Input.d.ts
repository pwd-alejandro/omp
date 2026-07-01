import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** Leading icon node. */
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

/** Text input with label, hint, optional leading icon, vermillion focus ring. */
export function Input(props: InputProps): JSX.Element;
