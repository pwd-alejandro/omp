import { describe, it, expect } from "vitest";
import { parseFeed } from "./parse";
import sampleXml from "./__fixtures__/substack-feed.sample.xml?raw";

describe("parseFeed", () => {
  const items = parseFeed(sampleXml);

  it("finds the single item in the sample feed", () => {
    expect(items).toHaveLength(1);
  });

  it("extracts the core namespaced/CDATA fields", () => {
    const item = items[0];
    expect(item.link).toBe(
      "https://onemillionpieces.substack.com/p/we-are-free-son-they-are-bombing"
    );
    expect(item.creator).toBe("Alejandro Lozada Cortés");
    expect(item.pubDate).toContain("2026");
    expect(item.title).toContain("We are free, son");
    expect(item.contentHtml).toContain("Alberto Barrios");
    expect(item.description).toContain("Alberto Barrios");
  });

  it("throws on input that isn't an RSS document", () => {
    expect(() => parseFeed("<html><body>nope</body></html>")).toThrow();
  });
});
