import * as React from "react";

export interface ArticleCardProps {
  kicker?: string;
  headline: string;
  dek?: string;
  /** Small uppercase mono metadata line. */
  meta?: string;
  image?: string;
  /** lead = hero, standard = column story, brief = list item. */
  size?: "lead" | "standard" | "brief";
  href?: string;
  style?: React.CSSProperties;
}

/**
 * Front-page story card with kicker, serif headline, dek and metadata.
 * @startingPoint section="Editorial" subtitle="Lead / standard / brief story cards" viewport="760x460"
 */
export function ArticleCard(props: ArticleCardProps): JSX.Element;
