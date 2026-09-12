"use client";

import { useEffect, useState, type ComponentType } from "react";

// Dev-only gate for the reCAPTCHA debug tooling (see RECAPTCHA_TESTING.md).
// The dynamic imports sit inside a NODE_ENV === "development" branch, which
// the production build eliminates — the debug components are never loaded,
// and no cookie can bring them back.
export default function DevTools() {
  const [tools, setTools] = useState<{
    TestModeToggle: ComponentType;
    ReCAPTCHADebug: ComponentType;
  } | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      Promise.all([
        import("./TestModeToggle"),
        import("./ReCAPTCHADebug"),
      ]).then(([toggle, debug]) =>
        setTools({
          TestModeToggle: toggle.default,
          ReCAPTCHADebug: debug.default,
        })
      );
    }
  }, []);

  if (!tools) return null;
  return (
    <>
      <tools.TestModeToggle />
      <tools.ReCAPTCHADebug />
    </>
  );
}
