// Parse Substack RSS XML into raw items. Uses fast-xml-parser (never hand-rolled).
// Substack tags are namespaced (dc:creator, content:encoded) and CDATA-wrapped;
// this module isolates all of that so normalize.ts sees a clean shape.

import { XMLParser } from "fast-xml-parser";
import type { RawItem } from "./types";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  // Always treat <item> and <category> as arrays, even when there's only one.
  isArray: (name) => name === "item" || name === "category",
  // CDATA is preserved verbatim (HTML entities inside are decoded later).
  processEntities: true,
  trimValues: true,
});

/** Read a possibly-CDATA / possibly-attributed node down to its text string. */
function text(node: unknown): string | undefined {
  if (node == null) return undefined;
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (typeof node === "object" && "#text" in node) {
    const t = (node as Record<string, unknown>)["#text"];
    return t == null ? undefined : String(t);
  }
  return undefined;
}

function attr(node: unknown, name: string): string | undefined {
  if (node && typeof node === "object") {
    const v = (node as Record<string, unknown>)[`@_${name}`];
    return v == null ? undefined : String(v);
  }
  return undefined;
}

/**
 * Parse a Substack RSS feed document into raw items (newest-first as the feed
 * provides them). Throws if the XML has no recognizable channel/items.
 */
export function parseFeed(xml: string): RawItem[] {
  const doc = parser.parse(xml);
  const channel = doc?.rss?.channel;
  if (!channel) {
    throw new Error("Feed has no <rss><channel> — not a valid RSS document.");
  }

  const items: unknown[] = Array.isArray(channel.item) ? channel.item : [];

  return items.map((raw): RawItem => {
    const item = raw as Record<string, unknown>;
    const categories = Array.isArray(item.category)
      ? item.category.map(text).filter((c): c is string => Boolean(c))
      : [];

    return {
      title: text(item.title),
      link: text(item.link),
      guid: text(item.guid),
      creator: text(item["dc:creator"]),
      pubDate: text(item.pubDate),
      description: text(item.description),
      contentHtml: text(item["content:encoded"]),
      categories,
      enclosureUrl: attr(item.enclosure, "url"),
    };
  });
}
