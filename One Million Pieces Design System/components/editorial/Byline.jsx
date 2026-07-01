import React from "react";

/**
 * Byline + dateline. Author(s) in sans, metadata (date / read-time / source)
 * in mono so the record always looks like a record.
 */
export function Byline({
  authors = "By the Data desk",
  meta = [],            // e.g. ["12 min read", "Updated 2h ago"]
  avatars = [],         // array of image src
  style = {},
  ...rest
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, ...style }} {...rest}>
      {avatars.length > 0 && (
        <div style={{ display: "flex" }}>
          {avatars.slice(0, 3).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              style={{
                width: 30, height: 30, borderRadius: 999, objectFit: "cover",
                border: "2px solid var(--surface-card)",
                marginLeft: i === 0 ? 0 : -8,
              }}
            />
          ))}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13.5,
          color: "var(--text-primary)", letterSpacing: "0.005em",
        }}>
          {authors}
        </span>
        {meta.length > 0 && (
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.02em",
            color: "var(--text-tertiary)", fontVariantNumeric: "tabular-nums",
          }}>
            {meta.join("  ·  ")}
          </span>
        )}
      </div>
    </div>
  );
}
