import React from "react";

/**
 * Topic / section label. Uppercase, mono-tracked sans in vermillion by default.
 * The recurring "kicker" that sits above a headline.
 */
export function Tag({
  children,
  tone = "accent",       // "accent" | "ink" | "muted"
  as = "span",
  style = {},
  ...rest
}) {
  const color = {
    accent: "var(--text-accent)",
    ink: "var(--text-primary)",
    muted: "var(--text-tertiary)",
  }[tone];

  const El = as;
  return (
    <El
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: "var(--text-micro)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        lineHeight: 1,
        color,
        ...style,
      }}
      {...rest}
    >
      {children}
    </El>
  );
}
