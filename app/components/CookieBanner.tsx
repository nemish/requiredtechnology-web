"use client";

import { useState, useEffect } from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/declined cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
      <div className="max-w-4xl mx-auto">
        <div className="cookie-banner p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Icon */}
            <div className="hidden sm:flex w-12 h-12 rounded-xl bg-blue-500/10 items-center justify-center shrink-0">
              <ShieldCheckIcon className="w-6 h-6 text-blue-400" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-base font-semibold text-white mb-2">
                Cookie Notice
              </h3>
              <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed">
                We use cookies to enhance your browsing experience and analyze site traffic.
                This site is protected by reCAPTCHA and the Google{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                >
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg-tertiary)] border border-[var(--color-border-default)] rounded-lg hover:text-white hover:border-[var(--color-border-accent)] transition-all"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="btn-primary flex-1 sm:flex-none py-2.5 px-5 text-sm"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
