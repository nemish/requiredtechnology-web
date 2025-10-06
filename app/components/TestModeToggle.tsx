"use client";

import { useState, useEffect } from "react";

// Cookie utility functions
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

function setCookie(name: string, value: string, days: number = 30) {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

interface TestModeToggleProps {
  className?: string;
}

export default function TestModeToggle({
  className = "",
}: TestModeToggleProps) {
  const [isTestModeEnabled, setIsTestModeEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const testModeCookie = getCookie("test-recaptcha-enabled");
    setIsTestModeEnabled(testModeCookie === "true");
  }, []);

  const toggleTestMode = () => {
    const newValue = isTestModeEnabled ? "false" : "true";
    setCookie("test-recaptcha-enabled", newValue, 30);
    setIsTestModeEnabled(!isTestModeEnabled);
  };

  // Only show if in development or if test mode is already enabled
  const shouldShow =
    process.env.NODE_ENV === "development" || isTestModeEnabled;

  if (!shouldShow) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Show/hide toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 left-4 bg-gray-600 text-white px-3 py-2 rounded text-xs z-50 opacity-50 hover:opacity-100 transition-opacity"
        title="Toggle reCAPTCHA test mode"
      >
        🧪
      </button>

      {/* Test mode controls */}
      {isVisible && (
        <div className="fixed bottom-16 left-4 bg-white border border-gray-300 rounded-lg p-3 shadow-lg z-50 min-w-[200px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              reCAPTCHA Test Mode
            </span>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700 text-xs"
            >
              ×
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Test Mode:</span>
              <button
                onClick={toggleTestMode}
                className={`px-2 py-1 text-xs rounded ${
                  isTestModeEnabled
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {isTestModeEnabled ? "ON" : "OFF"}
              </button>
            </div>

            {isTestModeEnabled && (
              <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                ✅ Debug panel will appear on contact form
              </div>
            )}

            {!isTestModeEnabled && (
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                Debug panel hidden
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
