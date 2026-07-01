// Clean Substack's article HTML for safe, on-brand rendering, and derive plain text.
// Substack appends a subscribe widget to every post body (free posts included) —
// we strip it and show our own CTA instead. See docs/03-content-sync.md + docs/04.

import sanitizeHtml from "sanitize-html";

// Classes Substack uses on its inline subscribe / paywall widgets. exclusiveFilter
// reliably drops matching *leaf* elements (e.g. the "cta-caption" text); the widget's
// wrapper <div>/<form>/<input> are removed anyway since they aren't allowed tags.
const WIDGET_CLASS_RE =
  /(subscription-widget|subscribe-widget|paywall|button-wrapper|preamble|cta-caption)/i;

const bodyOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "a",
    "span",
    "strong",
    "em",
    "b",
    "i",
    "u",
    "s",
    "del",
    "sub",
    "sup",
    "blockquote",
    "q",
    "cite",
    "ul",
    "ol",
    "li",
    "hr",
    "br",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "img",
    "figure",
    "figcaption",
    "picture",
    "source",
    "pre",
    "code",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
  ],
  allowedAttributes: {
    // target/rel must be allowed here or transformTags' additions get filtered out.
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading", "decoding"],
    source: ["srcset", "type"],
    "*": ["class"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  // Remove the subscribe/paywall widget blocks (element AND their contents).
  exclusiveFilter: (frame) => {
    const cls = frame.attribs?.class ?? "";
    return WIDGET_CLASS_RE.test(cls);
  },
  transformTags: {
    // External links open in a new tab, safely.
    a: (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        ...(attribs.href?.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {}),
      },
    }),
    // Lazy-load images and let them decode off the main thread.
    img: (tagName, attribs) => ({
      tagName,
      attribs: { ...attribs, loading: "lazy", decoding: "async" },
    }),
  },
};

/** Sanitize a post body into HTML that's safe and consistent to render. */
export function sanitizeBody(html: string): string {
  return sanitizeHtml(html, bodyOptions)
    .replace(/<p>\s*<\/p>/g, "") // drop empty paragraphs left by removed widgets
    .trim();
}

/** Strip all tags and decode entities to produce plain text (for excerpts/meta). */
export function toPlainText(html: string): string {
  const text = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
  return text.replace(/\s+/g, " ").trim();
}
