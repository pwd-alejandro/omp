import * as React from "react";

export interface SparklineProps {
  /** Series of numbers. */
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  /** Render a faint filled area under the line. */
  fill?: boolean;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

/** Tiny inline trend line with an end dot. */
export function Sparkline(props: SparklineProps): JSX.Element;
