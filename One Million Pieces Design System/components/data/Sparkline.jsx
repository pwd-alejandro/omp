import React from "react";

/**
 * Inline sparkline — SVG line with optional filled area and end dot.
 * For trends in-line with text or inside StatCallout rows.
 */
export function Sparkline({
  data = [],             // array of numbers
  width = 120,
  height = 32,
  color = "var(--vermillion-600)",
  fill = true,
  strokeWidth = 1.75,
  style = {},
  ...rest
}) {
  if (data.length < 2) return <svg width={width} height={height} style={style} {...rest} />;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pad = strokeWidth + 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (width - pad * 2) + pad;
    const y = height - pad - ((v - min) / span) * (height - pad * 2);
    return [x, y];
  });
  const line = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + ` L ${pts[pts.length - 1][0].toFixed(1)} ${height} L ${pts[0][0].toFixed(1)} ${height} Z`;
  const last = pts[pts.length - 1];

  return (
    <svg width={width} height={height} style={{ display: "block", overflow: "visible", ...style }} {...rest}>
      {fill && <path d={area} fill={color} opacity="0.1" />}
      <path d={line} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r={strokeWidth + 1} fill={color} />
    </svg>
  );
}
