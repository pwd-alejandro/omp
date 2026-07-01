import * as React from "react";

export interface LogoProps {
  /** Layout of the logotype. */
  variant?: "stacked" | "horizontal" | "mark" | "short";
  /** Height of the mosaic mark in px (scales the whole lockup). */
  size?: number;
  /** Ink colour of the mark + wordmark. Use a semantic token. */
  color?: string;
  /** Accent tile colour. Defaults to vermillion. */
  accent?: string;
  style?: React.CSSProperties;
}

/**
 * The One Million Pieces logotype: a 4×4 mosaic mark + Newsreader wordmark.
 * @startingPoint section="Brand" subtitle="Mosaic mark + wordmark lockups" viewport="700x220"
 */
export function Logo(props: LogoProps): JSX.Element;
