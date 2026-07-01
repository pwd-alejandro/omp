import React from "react";

/**
 * One Million Pieces logotype.
 * The mark is a 4×4 mosaic — pieces assembling into a whole — with two
 * accent tiles in vermillion. Pair with the Newsreader wordmark.
 */
export function Logo({
  variant = "stacked",   // "stacked" | "horizontal" | "mark" | "short"
  size = 40,             // height of the mark in px
  color = "var(--text-primary)",
  accent = "var(--vermillion-600)",
  style = {},
  ...rest
}) {
  const Mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", flex: "0 0 auto" }}
    >
      {[
        [0, 0], [11, 0], [33, 0],
        [0, 11], [22, 11],
        [11, 22], [33, 22],
        [0, 33], [22, 33],
      ].map(([x, y], i) => (
        <rect key={"i" + i} x={x} y={y} width="9" height="9" fill={color} />
      ))}
      {[[11, 11], [22, 22], [33, 33]].map(([x, y], i) => (
        <rect key={"a" + i} x={x} y={y} width="9" height="9" fill={accent} />
      ))}
    </svg>
  );

  if (variant === "mark") {
    return <span style={{ display: "inline-flex", ...style }} {...rest}>{Mark}</span>;
  }

  if (variant === "short") {
    return (
      <span
        style={{
          display: "inline-flex", alignItems: "center", gap: size * 0.35,
          fontFamily: "var(--font-serif)", fontWeight: 600,
          fontSize: size * 0.6, letterSpacing: "0.02em", color, ...style,
        }}
        {...rest}
      >
        {Mark}
        <span>OMP</span>
      </span>
    );
  }

  const wordmark = (
    <span
      style={{
        fontFamily: "var(--font-serif)",
        fontWeight: 560,
        letterSpacing: "-0.015em",
        color,
        lineHeight: variant === "stacked" ? 0.98 : 1,
        fontSize: variant === "stacked" ? size * 0.66 : size * 0.62,
        whiteSpace: variant === "stacked" ? "normal" : "nowrap",
      }}
    >
      {variant === "stacked" ? <>One&nbsp;Million<br />Pieces</> : "One Million Pieces"}
    </span>
  );

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.38,
        ...style,
      }}
      {...rest}
    >
      {Mark}
      {wordmark}
    </span>
  );
}
