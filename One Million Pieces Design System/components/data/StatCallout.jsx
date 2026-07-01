import React from "react";

/**
 * The headline figure — a big mono number with label, optional delta and source.
 * The brand's signature data unit.
 */
export function StatCallout({
  value,
  label,
  delta,                // e.g. "+12%" or "-3.4 pts"
  deltaTone = "auto",   // "auto" | "positive" | "negative" | "neutral"
  source,
  align = "left",
  style = {},
  ...rest
}) {
  let tone = deltaTone;
  if (tone === "auto" && typeof delta === "string") {
    tone = delta.trim().startsWith("-") ? "negative" : "positive";
  }
  const deltaColor = {
    positive: "var(--status-positive)",
    negative: "var(--status-negative)",
    neutral: "var(--text-tertiary)",
  }[tone] || "var(--text-tertiary)";

  return (
    <div style={{ textAlign: align, ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, justifyContent: align === "center" ? "center" : "flex-start" }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontWeight: 500,
          fontSize: 52, lineHeight: 0.95, letterSpacing: "-0.03em",
          fontVariantNumeric: "tabular-nums", color: "var(--text-primary)",
        }}>
          {value}
        </span>
        {delta && (
          <span style={{
            fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 15,
            color: deltaColor, fontVariantNumeric: "tabular-nums",
          }}>
            {delta}
          </span>
        )}
      </div>
      {label && (
        <div style={{
          fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 500,
          color: "var(--text-secondary)", marginTop: 8, maxWidth: 240,
          marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0,
          lineHeight: 1.35,
        }}>
          {label}
        </div>
      )}
      {source && (
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.04em",
          textTransform: "uppercase", color: "var(--text-faint)", marginTop: 8,
        }}>
          {source}
        </div>
      )}
    </div>
  );
}
