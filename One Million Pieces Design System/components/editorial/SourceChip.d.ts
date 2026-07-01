import * as React from "react";

export interface SourceChipProps {
  /** Citation number. */
  n?: number | string;
  /** Short source label, e.g. "NOAA", "County records". */
  source?: string;
  href?: string;
  style?: React.CSSProperties;
}

/** Inline provenance marker — every claim from data cites its source. */
export function SourceChip(props: SourceChipProps): JSX.Element;
