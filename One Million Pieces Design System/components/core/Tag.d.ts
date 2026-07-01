import * as React from "react";

export interface TagProps {
  children: React.ReactNode;
  /** accent = vermillion (default), ink = primary text, muted = tertiary. */
  tone?: "accent" | "ink" | "muted";
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

/** Uppercase mono-tracked topic label — the kicker above a headline. */
export function Tag(props: TagProps): JSX.Element;
