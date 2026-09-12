import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ContactForm from "./ContactForm";

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "test-site-key");
});

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  document.getElementById("google-recaptcha-v3")?.remove();
  delete (window as { grecaptcha?: unknown }).grecaptcha;
});

const recaptchaScript = () =>
  Array.from(document.scripts).find((s) => s.src.includes("recaptcha")) ?? null;

function fillAndSubmit() {
  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "Jane" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "jane@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Message"), {
    target: { value: "Hello" },
  });
  fireEvent.submit(screen.getByRole("button", { name: /send message/i }));
}

const submittedBody = (fetchMock: ReturnType<typeof vi.fn>) =>
  JSON.parse(fetchMock.mock.calls[0][1].body as string);

describe("lazy reCAPTCHA loading", () => {
  it("renders no reCAPTCHA script element initially", () => {
    render(<ContactForm />);
    expect(recaptchaScript()).toBeNull();
  });

  it("loads the reCAPTCHA script when the form scrolls into view", () => {
    let intersect: (() => void) | undefined;
    const observe = vi.fn();
    const disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: IntersectionObserverCallback) {
          intersect = () =>
            callback(
              [{ isIntersecting: true } as IntersectionObserverEntry],
              this as unknown as IntersectionObserver
            );
        }
        observe = observe;
        disconnect = disconnect;
      }
    );

    render(<ContactForm />);
    expect(observe).toHaveBeenCalledOnce();
    expect(recaptchaScript()).toBeNull();
    intersect!();
    expect(recaptchaScript()).not.toBeNull();
    expect(disconnect).toHaveBeenCalled();
  });

  it("loads the reCAPTCHA script when the form is focused", () => {
    render(<ContactForm />);
    expect(recaptchaScript()).toBeNull();
    fireEvent.focus(screen.getByLabelText("Name"));
    const script = recaptchaScript();
    expect(script).not.toBeNull();
    expect(script!.src).toContain("render=test-site-key");
  });
});

describe("status announcements", () => {
  it("renders a polite live region from first render", () => {
    render(<ContactForm />);
    expect(screen.getByRole("status")).toBeTruthy();
  });

  it("announces success inside the live region", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));

    render(<ContactForm />);
    fillAndSubmit();

    expect(
      await within(screen.getByRole("status")).findByText(
        "Message sent successfully!"
      )
    ).toBeTruthy();
  });

  it("announces failure inside the live region", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    render(<ContactForm />);
    fillAndSubmit();

    expect(
      await within(screen.getByRole("status")).findByText(
        "Failed to send message"
      )
    ).toBeTruthy();
  });

  it("conveys the sending state while submitting", async () => {
    let resolveFetch!: (value: { ok: boolean }) => void;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(
        new Promise<{ ok: boolean }>((resolve) => {
          resolveFetch = resolve;
        })
      )
    );

    render(<ContactForm />);
    fillAndSubmit();

    const button = await screen.findByRole("button", { name: /sending/i });
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(
      within(screen.getByRole("status")).getByText(/sending/i)
    ).toBeTruthy();

    resolveFetch({ ok: true });
    expect(
      await screen.findByText("Message sent successfully!")
    ).toBeTruthy();
  });
});

describe("form submission", () => {
  it("submits with a token when reCAPTCHA has loaded", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    Object.assign(window, {
      grecaptcha: {
        ready: (callback: () => void) => callback(),
        execute: vi.fn().mockResolvedValue("test-token"),
      },
    });

    render(<ContactForm />);
    fillAndSubmit();

    expect(
      await screen.findByText("Message sent successfully!")
    ).toBeTruthy();
    expect(submittedBody(fetchMock).recaptchaToken).toBe("test-token");
  });

  it("submits without a token when reCAPTCHA never loaded", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm />);
    fillAndSubmit();

    expect(
      await screen.findByText("Message sent successfully!")
    ).toBeTruthy();
    expect(submittedBody(fetchMock).recaptchaToken).toBe("");
  });
});
