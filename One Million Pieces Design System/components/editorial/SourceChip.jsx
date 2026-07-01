import React from "react";

/**
 * Inline source citation chip — the in-text provenance marker used in analysis
 * and Assistant answers. Mono, superscript-feeling, links to the source.
 */
export function SourceChip({ n, source, href = "#", style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        verticalAlign: "baseline", textDecoration: "none",
        fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
        letterSpacing: "0.02em", lineHeight: 1,
        padding: "2px 6px", borderRadius: "var(--radius-xs)",
        color: hover ? "var(--action-primary-fg)" : "var(--text-accent)",
        background: hover ? "var(--vermillion-600)" : "var(--vermillion-100)",
        border: "1px solid var(--vermillion-200)",
        transition: "background var(--transition-fast), color var(--transition-fast)",
        ...style,
      }}
      {...rest}
    >
      {n != null && <span style={{ fontWeight: 600 }}>{n}</span>}
      {source && <span>{source}</span>}
    </a>
  );
}
