import * as React from "react";

export interface StatCalloutProps {
  /** The figure itself, pre-formatted (e.g. "4.2M", "+1.4°", "30,041"). */
  value: React.ReactNode;
  label?: string;
  /** Change indicator, e.g. "+12%" or "-3.4 pts". */
  delta?: string;
  /** Colour of the delta. "auto" infers from leading sign. */
  deltaTone?: "auto" | "positive" | "negative" | "neutral";
  /** Small uppercase mono source line. */
  source?: string;
  align?: "left" | "center";
  style?: React.CSSProperties;
}

/**
 * Signature big-figure callout — mono value + label + delta + source.
 * @startingPoint section="Data" subtitle="Headline figure with delta & source" viewport="700x180"
 */
export function StatCallout(props: StatCalloutProps): JSX.Element;
