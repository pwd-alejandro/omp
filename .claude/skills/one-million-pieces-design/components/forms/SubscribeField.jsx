import React from "react";
import { Button } from "../core/Button.jsx";

/**
 * Newsletter subscribe field — inline input + primary button.
 * The house conversion unit; appears in the masthead, footer and newsletter.
 */
export function SubscribeField({
  placeholder = "your@email.com",
  cta = "Subscribe",
  note,
  onSubscribe,
  style = {},
  ...rest
}) {
  const [value, setValue] = React.useState("");
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ ...style }} {...rest}>
      <div style={{
        display: "flex", gap: 8, alignItems: "stretch",
        border: `1px solid ${focus ? "var(--vermillion-600)" : "var(--border-default)"}`,
        borderRadius: "var(--radius-sm)", padding: 5, background: "var(--surface-card)",
        boxShadow: focus ? "0 0 0 3px var(--vermillion-100)" : "none",
        transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
      }}>
        <input
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => setValue(e.target.value)}
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            fontFamily: "var(--font-sans)", fontSize: 14.5, color: "var(--text-primary)",
            padding: "8px 10px",
          }}
        />
        <Button variant="primary" size="md" onClick={() => onSubscribe && onSubscribe(value)}>
          {cta}
        </Button>
      </div>
      {note && (
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.02em",
          color: "var(--text-tertiary)", marginTop: 8,
        }}>{note}</div>
      )}
    </div>
  );
}
