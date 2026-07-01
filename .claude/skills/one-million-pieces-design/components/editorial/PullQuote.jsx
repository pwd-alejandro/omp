import React from "react";

/**
 * Pull quote for long-form. Large serif, vermillion vertical rule, optional cite.
 */
export function PullQuote({ children, cite, style = {}, ...rest }) {
  return (
    <blockquote
      style={{
        margin: "32px 0", paddingLeft: 22,
        borderLeft: "3px solid var(--vermillion-600)",
        ...style,
      }}
      {...rest}
    >
      <p style={{
        fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic",
        fontSize: 26, lineHeight: 1.28, letterSpacing: "-0.01em",
        color: "var(--text-primary)", margin: 0,
      }}>
        {children}
      </p>
      {cite && (
        <cite style={{
          display: "block", marginTop: 12, fontStyle: "normal",
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
          letterSpacing: "0.02em", color: "var(--text-tertiary)",
        }}>
          — {cite}
        </cite>
      )}
    </blockquote>
  );
}
