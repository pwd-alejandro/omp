// One Million Pieces — single source of truth for external URLs and site config.
// Values come from env (set in .env locally and in Cloudflare Pages); fall back to
// the known-good production values. See AGENTS.md §4 and docs/06-setup-and-deployment.md.

const env = import.meta.env ?? {};

/** Canonical site URL (used for canonical tags, sitemap, RSS-out). */
export const SITE_URL: string = env.PUBLIC_SITE_URL ?? "https://onemillionpieces.com";

/** Substack RSS feed — the source of all content. */
export const SUBSTACK_FEED_URL: string =
  env.SUBSTACK_FEED_URL ?? "https://onemillionpieces.substack.com/feed";

/** Where "Subscribe" / "Read on Substack" CTAs point. */
export const SUBSTACK_SUBSCRIBE_URL: string =
  env.SUBSTACK_SUBSCRIBE_URL ?? "https://onemillionpieces.substack.com/subscribe";

export const SITE_NAME = "One Million Pieces";
