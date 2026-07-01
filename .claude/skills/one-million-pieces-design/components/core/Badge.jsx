import React from "react";

/**
 * Small status / category chip. Squared pill with hairline border.
 */
export function Badge({
  children,
  tone = "neutral",   // "neutral" | "live" | "positive" | "caution" | "negative"
  style = {},
  ...rest
}) {
  const tones = {
    neutral:  { color: "var(--text-secondary)", border: "var(--border-default)", bg: "var(--surface-card)", dot: "var(--ink-400)" },
    live:     { color: "var(--vermillion-700)", border: "var(--vermillion-200)", bg: "var(--vermillion-100)", dot: "var(--vermillion-600)" },
    positive: { color: "#33502a", border: "#c3d3b8", bg: "#e9f0e2", dot: "var(--status-positive)" },
    caution:  { color: "#8a6614", border: "#e6d4a3", bg: "#f6ecd0", dot: "var(--status-caution)" },
    negative: { color: "#8a271d", border: "#e6c0bb", bg: "#f6dfdb", dot: "var(--status-negative)" },
  }[tone];

  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 11.5,
        letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1,
        padding: "5px 9px", borderRadius: "var(--radius-pill)",
        color: tones.color, border: `1px solid ${tones.border}`, background: tones.bg,
        ...style,
      }}
      {...rest}
    >
      {tone === "live" && (
        <span style={{ width: 6, height: 6, borderRadius: 999, background: tones.dot, flex: "0 0 auto" }} />
      )}
      {children}
    </span>
  );
}
