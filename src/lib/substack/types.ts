// Normalized shape of a Substack post, after parsing + cleaning the RSS feed.
// This is the single type the rest of the site renders against; the messy RSS
// details never leak past normalize.ts. See docs/03-content-sync.md.

export interface Post {
  /** Post title, plain text (entities decoded, tags stripped). */
  title: string;
  /** URL-safe slug derived from the Substack post link (stable across rebuilds). */
  slug: string;
  /** Canonical URL of the post on Substack. */
  substackUrl: string;
  /** Publish date. */
  publishedAt: Date;
  /** Author display name. */
  author: string;
  /** Topic/category tags (may be empty). */
  tags: string[];
  /** Short plain-text summary for cards and meta descriptions. */
  excerpt: string;
  /** Sanitized article HTML, ready to render (subscribe widgets removed). */
  bodyHtml: string;
  /** Cover image URL, if one could be determined. */
  coverImage?: string;
  /**
   * True when the post is paywalled and the feed only carried a teaser.
   * All posts are free at launch, so this is normally false — but the whole
   * pipeline honors it so premium content can be added later without a rewrite.
   */
  isPaywalled: boolean;
}

/** A raw <item> from the parsed RSS, before normalization. */
export interface RawItem {
  title?: string;
  link?: string;
  guid?: string;
  creator?: string;
  pubDate?: string;
  description?: string;
  contentHtml?: string;
  categories: string[];
  /** The post's cover/featured image (Substack exposes it as <enclosure>). May
   *  instead be the publication avatar when the post has no cover. */
  enclosureUrl?: string;
  /** The publication's logo/avatar URL (channel <image>), used to recognize when
   *  an enclosure is just the avatar fallback rather than a real cover. */
  publicationImageUrl?: string;
}
