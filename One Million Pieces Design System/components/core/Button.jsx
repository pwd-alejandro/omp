import React from "react";

/**
 * Primary action element. Verb-first labels ("Read the analysis"), never "Submit".
 */
export function Button({
  children,
  variant = "primary",   // "primary" | "secondary" | "ghost" | "link"
  size = "md",           // "sm" | "md" | "lg"
  disabled = false,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const pad = { sm: "7px 14px", md: "10px 18px", lg: "13px 24px" }[size];
  const fs = { sm: 13, md: 15, lg: 16 }[size];

  const base = {
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    fontSize: fs,
    letterSpacing: "0.01em",
    lineHeight: 1,
    padding: variant === "link" ? 0 : pad,
    border: "1px solid transparent",
    borderRadius: variant === "link" ? 0 : "var(--radius-sm)",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast)",
    transform: press && !disabled ? "scale(0.98)" : "scale(1)",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    opacity: disabled ? 0.45 : 1,
  };

  const variants = {
    primary: {
      background: hover ? "var(--action-primary-bg-hover)" : "var(--action-primary-bg)",
      color: "var(--action-primary-fg)",
    },
    secondary: {
      background: hover ? "var(--action-secondary-bg-hover)" : "var(--action-secondary-bg)",
      color: "var(--action-secondary-fg)",
      borderColor: "var(--action-secondary-border)",
    },
    ghost: {
      background: hover ? "var(--surface-inset)" : "transparent",
      color: "var(--text-primary)",
    },
    link: {
      background: "transparent",
      color: "var(--text-accent)",
      borderBottom: `2px solid ${hover ? "var(--vermillion-600)" : "transparent"}`,
      textUnderlineOffset: 3,
    },
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
