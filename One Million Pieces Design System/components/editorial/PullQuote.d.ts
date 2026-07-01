import * as React from "react";

export interface PullQuoteProps {
  children: React.ReactNode;
  /** Attribution shown beneath the quote. */
  cite?: string;
  style?: React.CSSProperties;
}

/** Italic serif pull quote with a vermillion rule. */
export function PullQuote(props: PullQuoteProps): JSX.Element;
