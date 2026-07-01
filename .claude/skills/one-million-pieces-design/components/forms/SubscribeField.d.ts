import * as React from "react";

export interface SubscribeFieldProps {
  placeholder?: string;
  cta?: string;
  /** Small reassurance line in mono, e.g. "No spam · one email a week". */
  note?: string;
  onSubscribe?: (email: string) => void;
  style?: React.CSSProperties;
}

/**
 * Inline newsletter subscribe field — input + primary button.
 * @startingPoint section="Forms" subtitle="Newsletter subscribe unit" viewport="520x120"
 */
export function SubscribeField(props: SubscribeFieldProps): JSX.Element;
