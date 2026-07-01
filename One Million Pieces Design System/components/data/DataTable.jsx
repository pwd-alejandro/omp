import React from "react";

/**
 * Editorial data table. Serif-headed, mono numeric columns, tabular numerals,
 * hairline rules, optional highlighted row.
 */
export function DataTable({
  columns = [],          // [{ key, label, align?, numeric? }]
  rows = [],             // [{ [key]: value, highlight? }]
  caption,
  source,
  style = {},
  ...rest
}) {
  return (
    <div style={{ ...style }} {...rest}>
      {caption && (
        <div style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
          color: "var(--text-primary)", marginBottom: 8,
        }}>{caption}</div>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{
                textAlign: c.align || (c.numeric ? "right" : "left"),
                fontFamily: "var(--font-mono)", fontSize: 10.5, fontWeight: 500,
                letterSpacing: "0.06em", textTransform: "uppercase",
                color: "var(--text-tertiary)", padding: "0 12px 8px",
                borderBottom: "2px solid var(--border-strong)", whiteSpace: "nowrap",
              }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: r.highlight ? "var(--vermillion-100)" : "transparent" }}>
              {columns.map((c) => (
                <td key={c.key} style={{
                  textAlign: c.align || (c.numeric ? "right" : "left"),
                  fontFamily: c.numeric ? "var(--font-mono)" : "var(--font-sans)",
                  fontSize: c.numeric ? 13 : 13.5,
                  fontWeight: c.numeric ? 500 : 400,
                  fontVariantNumeric: c.numeric ? "tabular-nums" : "normal",
                  color: "var(--text-primary)", padding: "11px 12px",
                  borderBottom: "1px solid var(--border-subtle)",
                }}>{r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {source && (
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.04em",
          textTransform: "uppercase", color: "var(--text-faint)", marginTop: 10,
        }}>{source}</div>
      )}
    </div>
  );
}
