import * as React from "react";

export interface BarDatum {
  label: string;
  value: number;
  /** Draw this bar in the highlight (vermillion) colour. */
  highlight?: boolean;
}

export interface BarChartProps {
  data: BarDatum[];
  orientation?: "vertical" | "horizontal";
  /** Base bar colour (categorical data token). */
  color?: string;
  highlightColor?: string;
  showValues?: boolean;
  /** Plot height in px (vertical only). */
  height?: number;
  style?: React.CSSProperties;
}

/**
 * Minimal bar chart primitive with an optional highlighted bar.
 * @startingPoint section="Data" subtitle="Vertical / horizontal bars, one highlight" viewport="700x260"
 */
export function BarChart(props: BarChartProps): JSX.Element;
