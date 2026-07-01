import React from "react";

/**
 * Section heading with a top rule — the device that divides the front page
 * into departments ("Data", "Investigations", "The Ledger").
 */
export function RuleHeading({
  children,
  action,               // optional right-aligned node (e.g. "See all →")
  weight = "medium",    // "hairline" | "medium" | "heavy"
  style = {},
  ...rest
}) {
  const border = {
    hairline: "1px solid var(--border-default)",
    medium: "2px solid var(--border-strong)",
    heavy: "3px solid var(--vermillion-600)",
  }[weight];

  return (
    <div
      style={{
        display: "flex", alignItems: "baseline", justifyContent: "space-between",
        gap: 16, borderTop: border, paddingTop: 10, ...style,
      }}
      {...rest}
    >
      <h2 style={{
        fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 18,
        letterSpacing: "-0.01em", margin: 0, color: "var(--text-primary)",
      }}>
        {children}
      </h2>
      {action && (
        <span style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12.5,
          color: "var(--text-accent)", flex: "0 0 auto",
        }}>
          {action}
        </span>
      )}
    </div>
  );
}
