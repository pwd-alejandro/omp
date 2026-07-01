import { describe, it, expect } from "vitest";
import { parseFeed } from "./parse";
import sampleXml from "./__fixtures__/substack-feed.sample.xml?raw";

describe("parseFeed", () => {
  const items = parseFeed(sampleXml);
  const caracas = items.find((i) => i.link?.includes("we-are-free-son"))!;

  it("finds every item in the sample feed", () => {
    expect(items.length).toBe(2);
  });

  it("extracts the core namespaced/CDATA fields", () => {
    expect(caracas.link).toBe(
      "https://onemillionpieces.substack.com/p/we-are-free-son-they-are-bombing"
    );
    expect(caracas.creator).toBe("Alejandro Lozada Cortés");
    expect(caracas.pubDate).toContain("2026");
    expect(caracas.title).toContain("We are free, son");
    expect(caracas.contentHtml).toContain("Alberto Barrios");
    expect(caracas.description).toContain("Alberto Barrios");
  });

  it("captures enclosure and publication image for cover detection", () => {
    expect(caracas.enclosureUrl).toContain("substackcdn.com");
    expect(caracas.publicationImageUrl).toContain("substackcdn.com");
  });

  it("throws on input that isn't an RSS document", () => {
    expect(() => parseFeed("<html><body>nope</body></html>")).toThrow();
  });
});
