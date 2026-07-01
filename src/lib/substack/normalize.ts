// Turn a raw RSS item into a clean, typed Post. All the fiddly heuristics
// (slugs, excerpts, paywall detection, cover images) live here and nowhere else.

import type { Post, RawItem } from "./types";
import { sanitizeBody, toPlainText } from "./sanitize";

const EXCERPT_MAX = 200;

/** Derive a stable, URL-safe slug from the Substack post link (…/p/<slug>). */
export function slugFromLink(link: string | undefined, fallbackTitle: string): string {
  if (link) {
    try {
      const segments = new URL(link).pathname.split("/").filter(Boolean);
      const last = segments[segments.length - 1];
      if (last) return last.toLowerCase();
    } catch {
      // fall through to title-based slug
    }
  }
  return (
    fallbackTitle
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 80) || "post"
  );
}

// Strong markers of a paywalled/truncated Substack post. The free inline
// subscribe widget ("subscribe … for free") is intentionally NOT in this list.
const PAYWALL_MARKERS = [
  "this post is for paid subscribers",
  "this post is for paying subscribers",
  "keep reading with a",
  "subscribe to read",
  "paid-only",
  'class="paywall"',
  'data-component-name="paywall"',
];

/**
 * Detect whether the feed only carried a teaser for a paywalled post.
 * Marker-based first (reliable); a conservative length check as a secondary
 * signal. Defaults to false — safe for the all-free launch. Tunable; validate
 * against a real paid post before enabling premium content (docs/03, docs/07).
 */
export function detectPaywall(
  rawContentHtml: string,
  bodyPlain: string,
  descriptionPlain: string
): boolean {
  const hay = rawContentHtml.toLowerCase();
  if (PAYWALL_MARKERS.some((m) => hay.includes(m))) return true;
  // Body no longer than the teaser AND short in absolute terms → likely truncated.
  return bodyPlain.length < 600 && bodyPlain.length <= descriptionPlain.length + 40;
}

/** First <img> src in the raw content, if any. */
function firstImage(rawContentHtml: string): string | undefined {
  const match = rawContentHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1];
}

/** The Substack image UUID embedded in a CDN URL (…/images/<uuid>_<dims>.png). */
function imageUuid(url: string | undefined): string | undefined {
  return url?.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i)?.[0];
}

/**
 * Choose the cover image. Substack exposes a post's cover/featured image as the
 * RSS <enclosure>; when a post has no cover, the enclosure is just the publication
 * avatar (same image as the channel logo), which we reject. Falls back to the first
 * in-body image, else undefined (a text-forward card, which suits the brand).
 */
export function pickCover(raw: RawItem): string | undefined {
  const enclosureId = imageUuid(raw.enclosureUrl);
  const avatarId = imageUuid(raw.publicationImageUrl);
  if (raw.enclosureUrl && enclosureId && enclosureId !== avatarId) {
    return raw.enclosureUrl;
  }
  return firstImage(raw.contentHtml ?? "");
}

export function normalizeItem(raw: RawItem): Post {
  const rawContent = raw.contentHtml ?? "";
  const title = toPlainText(raw.title ?? "").trim() || "Untitled";
  const link = raw.link ?? raw.guid ?? "";

  const bodyHtml = sanitizeBody(rawContent);
  const bodyPlain = toPlainText(rawContent);
  const descriptionPlain = toPlainText(raw.description ?? "");

  const excerptSource = descriptionPlain || bodyPlain;
  const excerpt =
    excerptSource.length > EXCERPT_MAX
      ? excerptSource.slice(0, EXCERPT_MAX).replace(/\s+\S*$/, "") + "…"
      : excerptSource;

  const parsedDate = new Date(raw.pubDate ?? 0);
  const publishedAt = Number.isNaN(parsedDate.getTime()) ? new Date(0) : parsedDate;

  return {
    title,
    slug: slugFromLink(link, title),
    substackUrl: link,
    publishedAt,
    author: toPlainText(raw.creator ?? "").trim() || "One Million Pieces",
    tags: raw.categories.map((c) => toPlainText(c).trim()).filter(Boolean),
    excerpt,
    bodyHtml,
    coverImage: pickCover(raw),
    isPaywalled: detectPaywall(rawContent, bodyPlain, descriptionPlain),
  };
}
