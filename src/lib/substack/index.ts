// Public entry point for Substack content. `getFeed()` fetches the live RSS feed,
// normalizes it into Post[], and — critically — falls back to the last-good feed
// bundled with the build if the live fetch fails or returns nothing, so a network
// blip can never ship an empty site. See docs/03-content-sync.md.

import { SUBSTACK_FEED_URL } from "../../config";
import { parseFeed } from "./parse";
import { normalizeItem } from "./normalize";
import type { Post } from "./types";

// Bundled snapshot of a known-good feed. Durable fallback that ships with the build
// (Cloudflare's build filesystem is ephemeral, so a committed snapshot is the
// reliable safety net). Refresh it periodically as the feed grows.
import fallbackXml from "./__fixtures__/substack-feed.sample.xml?raw";

const FETCH_TIMEOUT_MS = 10_000;
const USER_AGENT = "OneMillionPieces-SiteBuilder/0.1 (+https://onemillionpieces.com)";

export interface FeedResult {
  posts: Post[];
  /** Whether posts came from the live feed or the bundled fallback. */
  source: "live" | "fallback";
  fetchedAt: Date;
}

async function fetchFeedXml(url: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": USER_AGENT,
        accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
      },
    });
    if (!res.ok) throw new Error(`Feed responded with HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function toPosts(xml: string): Post[] {
  return parseFeed(xml)
    .map(normalizeItem)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

/** Fetch and normalize the feed, with a bundled fallback. Never throws for a
 *  routine fetch failure; only a corrupt fallback fixture would surface. */
export async function getFeed(): Promise<FeedResult> {
  const fetchedAt = new Date();
  try {
    const posts = toPosts(await fetchFeedXml(SUBSTACK_FEED_URL));
    if (posts.length === 0) throw new Error("Live feed contained zero items.");
    return { posts, source: "live", fetchedAt };
  } catch (err) {
    console.warn(
      `[substack] Falling back to bundled feed — live fetch failed: ${(err as Error).message}`
    );
    return { posts: toPosts(fallbackXml), source: "fallback", fetchedAt };
  }
}

/** Convenience: just the posts. */
export async function getPosts(): Promise<Post[]> {
  return (await getFeed()).posts;
}

export type { Post } from "./types";
