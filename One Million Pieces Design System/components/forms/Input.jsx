import React from "react";

/**
 * Text input. Hairline border, crisp small radius, vermillion focus ring.
 */
export function Input({
  label,
  hint,
  type = "text",
  icon,                  // optional leading node
  style = {},
  inputStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: "block", ...style }}>
      {label && (
        <span style={{
          display: "block", fontFamily: "var(--font-sans)", fontWeight: 600,
          fontSize: 12.5, color: "var(--text-secondary)", marginBottom: 6,
        }}>{label}</span>
      )}
      <span style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "var(--surface-card)",
        border: `1px solid ${focus ? "var(--vermillion-600)" : "var(--border-default)"}`,
        boxShadow: focus ? "0 0 0 3px var(--vermillion-100)" : "none",
        borderRadius: "var(--radius-sm)", padding: "0 12px",
        transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
      }}>
        {icon && <span style={{ color: "var(--text-tertiary)", display: "flex" }}>{icon}</span>}
        <input
          type={type}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            fontFamily: "var(--font-sans)", fontSize: 14.5, color: "var(--text-primary)",
            padding: "11px 0", ...inputStyle,
          }}
          {...rest}
        />
      </span>
      {hint && (
        <span style={{
          display: "block", fontFamily: "var(--font-sans)", fontSize: 12,
          color: "var(--text-tertiary)", marginTop: 6,
        }}>{hint}</span>
      )}
    </label>
  );
}
