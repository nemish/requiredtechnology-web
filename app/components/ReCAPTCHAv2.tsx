"use client";

import { useState } from "react";

interface ReCAPTCHAv2Props {
  onVerify: (token: string) => void;
  onExpire: () => void;
  onError: () => void;
}

declare global {
  interface Window {
    grecaptcha: {
      render: (container: string, options: any) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
    };
  }
}

export default function ReCAPTCHAv2({
  onVerify,
  onExpire,
  onError,
}: ReCAPTCHAv2Props) {
  const [widgetId, setWidgetId] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    if (typeof window !== "undefined" && window.grecaptcha) {
      setIsLoaded(true);
      const id = window.grecaptcha.render("recaptcha-v2", {
        sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        callback: onVerify,
        "expired-callback": onExpire,
        "error-callback": onError,
        theme: "light",
        size: "normal",
      });
      setWidgetId(id);
    }
  };

  const resetRecaptcha = () => {
    if (widgetId !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetId);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          reCAPTCHA v2 (Visible Test)
        </h4>
        <p className="text-xs text-gray-500 mb-3">
          This is reCAPTCHA v2 for visible testing. Check the box below.
        </p>

        <div id="recaptcha-v2" className="mb-4"></div>

        {!isLoaded && (
          <button
            onClick={handleLoad}
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
          >
            Load reCAPTCHA v2
          </button>
        )}

        {isLoaded && (
          <button
            onClick={resetRecaptcha}
            className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 ml-2"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
