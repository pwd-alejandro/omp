import React from "react";
import { Tag } from "../core/Tag.jsx";

/**
 * Front-page story card. Optional image, kicker, serif headline, dek, byline.
 * Three sizes drive a front-page hierarchy: lead / standard / brief.
 */
export function ArticleCard({
  kicker,
  headline,
  dek,
  meta,                  // small mono string e.g. "8 MIN · DATA"
  image,                 // image src
  size = "standard",     // "lead" | "standard" | "brief"
  href = "#",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  const headSize = { lead: 34, standard: 22, brief: 17 }[size];
  const headWeight = { lead: 460, standard: 540, brief: 560 }[size];

  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block", textDecoration: "none", color: "inherit",
        ...style,
      }}
      {...rest}
    >
      {image && (
        <div style={{
          width: "100%", aspectRatio: size === "lead" ? "16 / 9" : "3 / 2",
          overflow: "hidden", marginBottom: 14, background: "var(--surface-inset)",
          borderRadius: "var(--radius-sm)",
        }}>
          <img src={image} alt="" style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            filter: "saturate(0.92)",
            transform: hover ? "scale(1.03)" : "scale(1)",
            transition: "transform 400ms var(--ease-out)",
          }} />
        </div>
      )}
      {kicker && <div style={{ marginBottom: 8 }}><Tag>{kicker}</Tag></div>}
      <h3 style={{
        fontFamily: "var(--font-serif)", fontWeight: headWeight,
        fontSize: headSize, lineHeight: size === "lead" ? 1.05 : 1.14,
        letterSpacing: size === "lead" ? "-0.02em" : "-0.012em",
        margin: 0, color: "var(--text-primary)",
        textDecoration: hover ? "underline" : "none",
        textDecorationColor: "var(--vermillion-600)",
        textUnderlineOffset: 3, textDecorationThickness: 2,
      }}>
        {headline}
      </h3>
      {dek && (
        <p style={{
          fontFamily: "var(--font-serif)", fontSize: size === "lead" ? 16 : 14.5,
          lineHeight: 1.5, color: "var(--text-secondary)", margin: "9px 0 0",
        }}>
          {dek}
        </p>
      )}
      {meta && (
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em",
          textTransform: "uppercase", color: "var(--text-tertiary)", marginTop: 12,
        }}>
          {meta}
        </div>
      )}
    </a>
  );
}
