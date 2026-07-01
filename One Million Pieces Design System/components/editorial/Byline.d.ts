import * as React from "react";

export interface BylineProps {
  /** "By …" string. */
  authors?: string;
  /** Metadata segments joined by " · " and set in mono (dates, read-time, source). */
  meta?: string[];
  /** Author avatar image srcs (max 3 shown, overlapped). */
  avatars?: string[];
  style?: React.CSSProperties;
}

/** Author + dateline: sans author, mono metadata. */
export function Byline(props: BylineProps): JSX.Element;
