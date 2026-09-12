import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import DevTools from "./DevTools";

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  document.cookie = "test-recaptcha-enabled=false;path=/";
});

describe("DevTools", () => {
  it("renders nothing in production, even with the test-mode cookie set", async () => {
    vi.stubEnv("NODE_ENV", "production");
    document.cookie = "test-recaptcha-enabled=true;path=/";

    const { container } = render(<DevTools />);
    await act(async () => {});

    expect(container.firstChild).toBeNull();
  });

  it("loads the test-mode toggle in development", async () => {
    vi.stubEnv("NODE_ENV", "development");

    render(<DevTools />);

    expect(
      await screen.findByTitle("Toggle reCAPTCHA test mode")
    ).toBeTruthy();
  });
});
