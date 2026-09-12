import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ReCAPTCHADebug from "./ReCAPTCHADebug";

beforeEach(() => {
  vi.useFakeTimers();
  // The component is dev-only end to end; exercise its dev behavior.
  vi.stubEnv("NODE_ENV", "development");
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllEnvs();
  document.cookie = "test-recaptcha-enabled=false;path=/";
  delete (window as { grecaptcha?: unknown }).grecaptcha;
});

describe("ReCAPTCHADebug polling", () => {
  it("starts no timer when test mode is not enabled", () => {
    render(<ReCAPTCHADebug />);

    expect(vi.getTimerCount()).toBe(0);
  });

  it("stops polling once the reCAPTCHA script has loaded", () => {
    document.cookie = "test-recaptcha-enabled=true;path=/";
    render(<ReCAPTCHADebug />);
    expect(vi.getTimerCount()).toBe(1);

    (window as { grecaptcha?: unknown }).grecaptcha = {};
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(vi.getTimerCount()).toBe(0);
  });
});
