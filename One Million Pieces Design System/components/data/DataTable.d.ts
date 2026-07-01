import * as React from "react";

export interface DataColumn {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  /** Numeric columns render mono + tabular + right-aligned. */
  numeric?: boolean;
}

export interface DataTableProps {
  columns: DataColumn[];
  rows: Array<Record<string, React.ReactNode> & { highlight?: boolean }>;
  caption?: string;
  /** Uppercase mono source line beneath the table. */
  source?: string;
  style?: React.CSSProperties;
}

/**
 * Editorial data table — mono numeric columns, hairline rules, highlight row.
 * @startingPoint section="Data" subtitle="Sortable-style editorial table" viewport="700x280"
 */
export function DataTable(props: DataTableProps): JSX.Element;
