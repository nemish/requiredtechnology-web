import { afterEach, describe, expect, it, vi } from "vitest";

// GA_TRACKING_ID is read at module load, so stub the env before a fresh import
async function loadGtag() {
  vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-TEST");
  vi.resetModules();
  return import("./gtag");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("gtag helpers without a loaded GA script", () => {
  it("event() no-ops instead of throwing (declined-consent contact form submit)", async () => {
    const { event } = await loadGtag();
    expect(window.gtag).toBeUndefined();
    expect(() =>
      event({ action: "submit_form", category: "contact" })
    ).not.toThrow();
  });

  it("pageview() no-ops instead of throwing", async () => {
    const { pageview } = await loadGtag();
    expect(() => pageview("/somewhere")).not.toThrow();
  });
});
