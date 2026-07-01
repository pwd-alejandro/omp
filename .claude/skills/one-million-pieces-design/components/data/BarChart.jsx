import React from "react";

/**
 * Minimal bar chart primitive. Horizontal or vertical, one accent series,
 * optional highlight index, mono value labels. SVG-free — flex bars.
 */
export function BarChart({
  data = [],             // [{ label, value, highlight? }]
  orientation = "vertical",  // "vertical" | "horizontal"
  color = "var(--data-teal)",
  highlightColor = "var(--vermillion-600)",
  showValues = true,
  height = 180,
  style = {},
  ...rest
}) {
  const max = Math.max(...data.map((d) => d.value), 0) || 1;

  if (orientation === "horizontal") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10, ...style }} {...rest}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--text-secondary)",
              width: 96, flex: "0 0 auto", textAlign: "right",
            }}>{d.label}</span>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                height: 16, width: `${(d.value / max) * 100}%`,
                background: d.highlight ? highlightColor : color,
                borderRadius: "0 var(--radius-xs) var(--radius-xs) 0", minWidth: 2,
                transition: "width 500ms var(--ease-out)",
              }} />
              {showValues && (
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-tertiary)",
                  fontVariantNumeric: "tabular-nums",
                }}>{d.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
            {showValues && (
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-tertiary)",
                fontVariantNumeric: "tabular-nums",
              }}>{d.value}</span>
            )}
            <div style={{
              width: "100%", height: `${(d.value / max) * 100}%`,
              background: d.highlight ? highlightColor : color,
              borderRadius: "var(--radius-xs) var(--radius-xs) 0 0", minHeight: 2,
              transition: "height 500ms var(--ease-out)",
            }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8, borderTop: "1px solid var(--border-subtle)", paddingTop: 6 }}>
        {data.map((d, i) => (
          <span key={i} style={{
            flex: 1, textAlign: "center", fontFamily: "var(--font-sans)",
            fontSize: 11, color: "var(--text-tertiary)",
          }}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
