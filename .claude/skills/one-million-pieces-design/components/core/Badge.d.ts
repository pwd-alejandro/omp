import * as React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  tone?: "neutral" | "live" | "positive" | "caution" | "negative";
  style?: React.CSSProperties;
}

/** Small uppercase status/category chip. `live` shows a vermillion dot. */
export function Badge(props: BadgeProps): JSX.Element;
