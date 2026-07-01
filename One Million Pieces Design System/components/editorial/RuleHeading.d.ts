import * as React from "react";

export interface RuleHeadingProps {
  children: React.ReactNode;
  /** Right-aligned action, e.g. "See all →". */
  action?: React.ReactNode;
  weight?: "hairline" | "medium" | "heavy";
  style?: React.CSSProperties;
}

/** Department divider: a top rule + serif section title. */
export function RuleHeading(props: RuleHeadingProps): JSX.Element;
