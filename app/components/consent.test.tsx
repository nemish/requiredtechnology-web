import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConsentProvider } from "./ConsentProvider";
import Analytics from "./Analytics";
import CookieBanner from "./CookieBanner";

// next/script caches injected srcs for the lifetime of the module, so each
// test uses a unique GA id — otherwise a script from a previous test would
// satisfy (or pollute) the current one.
let gaId: string;
let testCount = 0;

beforeEach(() => {
  localStorage.clear();
  gaId = `G-TEST${++testCount}`;
  vi.stubEnv("NEXT_PUBLIC_GA_ID", gaId);
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllEnvs();
});

function renderApp() {
  return render(
    <ConsentProvider>
      <CookieBanner />
      <Analytics />
    </ConsentProvider>
  );
}

// Matches both the external gtag.js script and the inline bootstrap script
const gaScript = () =>
  Array.from(document.scripts).find(
    (s) => s.src.includes(gaId) || s.innerHTML.includes(gaId)
  ) ?? null;

// The banner appears after a 1s delay
const showBanner = () => act(() => vi.advanceTimersByTime(1100));

describe("analytics consent", () => {
  it("renders no GA script when no consent is stored", () => {
    renderApp();
    showBanner();
    expect(screen.getByText("Cookie Notice")).toBeTruthy();
    expect(gaScript()).toBeNull();
  });

  it("loads GA and hides the banner after Accept", () => {
    renderApp();
    showBanner();
    fireEvent.click(screen.getByText("Accept"));
    expect(gaScript()).not.toBeNull();
    expect(screen.queryByText("Cookie Notice")).toBeNull();
    expect(localStorage.getItem("cookieConsent")).toBe("accepted");
  });

  it("keeps GA absent and hides the banner after Decline", () => {
    renderApp();
    showBanner();
    fireEvent.click(screen.getByText("Decline"));
    expect(gaScript()).toBeNull();
    expect(screen.queryByText("Cookie Notice")).toBeNull();
    expect(localStorage.getItem("cookieConsent")).toBe("declined");
  });

  it("loads GA and never shows the banner on revisit after accepting", () => {
    localStorage.setItem("cookieConsent", "accepted");
    renderApp();
    showBanner();
    expect(gaScript()).not.toBeNull();
    expect(screen.queryByText("Cookie Notice")).toBeNull();
  });

  it("keeps GA absent and never shows the banner on revisit after declining", () => {
    localStorage.setItem("cookieConsent", "declined");
    renderApp();
    showBanner();
    expect(gaScript()).toBeNull();
    expect(screen.queryByText("Cookie Notice")).toBeNull();
  });
});
