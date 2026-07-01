import { describe, it, expect } from "vitest";
import { parseFeed } from "./parse";
import { normalizeItem, slugFromLink, detectPaywall } from "./normalize";
import sampleXml from "./__fixtures__/substack-feed.sample.xml?raw";

const post = normalizeItem(parseFeed(sampleXml)[0]);

describe("normalizeItem — the real free post", () => {
  it("derives a stable slug from the Substack link", () => {
    expect(post.slug).toBe("we-are-free-son-they-are-bombing");
  });

  it("keeps author and a valid publish date", () => {
    expect(post.author).toBe("Alejandro Lozada Cortés");
    expect(post.publishedAt.getUTCFullYear()).toBe(2026);
  });

  it("produces a decoded, tag-free excerpt", () => {
    expect(post.excerpt).toContain("Jesús"); // &#250; decoded to ú
    expect(post.excerpt).not.toContain("<");
    expect(post.excerpt.length).toBeLessThanOrEqual(201); // 200 + trailing ellipsis
  });

  it("sanitizes the body and strips Substack's subscribe widget", () => {
    expect(post.bodyHtml).toContain("Alberto Barrios");
    const lower = post.bodyHtml.toLowerCase();
    expect(lower).not.toContain("subscription-widget");
    expect(lower).not.toContain("<form");
    expect(lower).not.toContain("<input");
  });

  it("hardens external links", () => {
    expect(post.bodyHtml).toContain('rel="noopener noreferrer"');
    expect(post.bodyHtml).toContain('target="_blank"');
  });

  it("is not paywalled (a free post)", () => {
    expect(post.isPaywalled).toBe(false);
  });
});

describe("slugFromLink", () => {
  it("uses the last path segment of the link", () => {
    expect(slugFromLink("https://x.substack.com/p/my-post", "Title")).toBe("my-post");
  });
  it("slugifies the title when there is no link", () => {
    expect(slugFromLink(undefined, "Hello, World!")).toBe("hello-world");
  });
});

describe("detectPaywall", () => {
  it("flags a truncated paid post via a marker", () => {
    const raw =
      '<p>Teaser…</p><div class="paywall">This post is for paid subscribers</div>';
    expect(detectPaywall(raw, "Teaser…", "Teaser…")).toBe(true);
  });

  it("flags a short teaser-only body", () => {
    expect(detectPaywall("<p>Short teaser.</p>", "Short teaser.", "Short teaser.")).toBe(
      true
    );
  });

  it("does NOT flag a long free body", () => {
    const body = "actual article sentence ".repeat(300);
    expect(detectPaywall(`<p>${body}</p>`, body, "Short teaser")).toBe(false);
  });

  it("does NOT treat the free subscribe widget as a paywall", () => {
    const longBody = "genuine article text ".repeat(60);
    const raw =
      '<div class="subscription-widget"><p class="cta-caption">Subscribe to OMP for free to receive new posts.</p></div>' +
      `<p>${longBody}</p>`;
    expect(detectPaywall(raw, longBody, "teaser")).toBe(false);
  });
});
