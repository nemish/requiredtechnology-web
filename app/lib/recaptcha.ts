// Lazy reCAPTCHA v3 loader: the script is injected only once a visitor
// engages with the contact form, never on page load.

const SCRIPT_ID = "google-recaptcha-v3";

interface Grecaptcha {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

export function loadRecaptcha() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey || document.getElementById(SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
  script.async = true;
  document.head.appendChild(script);
}

// Resolves to "" when the script (or key) isn't available — the server
// tolerates a missing token, so submission degrades gracefully.
export async function getRecaptchaToken(action: string): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const grecaptcha = (window as unknown as { grecaptcha?: Grecaptcha })
    .grecaptcha;
  if (!siteKey || typeof grecaptcha?.execute !== "function") return "";
  try {
    await new Promise<void>((resolve) => grecaptcha.ready(resolve));
    return await grecaptcha.execute(siteKey, { action });
  } catch {
    return "";
  }
}
