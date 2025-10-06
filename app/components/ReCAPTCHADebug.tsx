"use client";

import { useState, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ReCAPTCHAv2 from "./ReCAPTCHAv2";

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

interface DebugInfo {
  siteKey: string;
  isLoaded: boolean;
  lastToken: string | null;
  lastScore: number | null;
  lastAction: string | null;
  verificationResults: Array<{
    timestamp: string;
    token: string;
    score: number | null;
    success: boolean;
    action: string;
  }>;
}

export default function ReCAPTCHADebug() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "Not configured",
    isLoaded: false,
    lastToken: null,
    lastScore: null,
    lastAction: null,
    verificationResults: [],
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isTestModeEnabled, setIsTestModeEnabled] = useState(false);
  const { isLoaded } = debugInfo;

  useEffect(() => {
    // Check if test mode is enabled via cookie
    const testModeCookie = getCookie("test-recaptcha-enabled");
    setIsTestModeEnabled(testModeCookie === "true");

    // Check if reCAPTCHA is loaded
    const checkRecaptchaLoaded = () => {
      if (typeof window !== "undefined" && window.grecaptcha) {
        setDebugInfo((prev) => ({ ...prev, isLoaded: true }));
      } else {
        setDebugInfo((prev) => ({ ...prev, isLoaded: false }));
      }
    };

    checkRecaptchaLoaded();
    const interval = setInterval(checkRecaptchaLoaded, 1000);

    return () => clearInterval(interval);
  }, [isLoaded]);

  const testRecaptcha = async () => {
    if (!executeRecaptcha) {
      alert("reCAPTCHA not ready");
      return;
    }

    try {
      const token = await executeRecaptcha("debug_test");
      setDebugInfo((prev) => ({
        ...prev,
        lastToken: token,
        lastAction: "debug_test",
      }));

      // Test the token with our API
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Debug Test",
          email: "test@example.com",
          message: "This is a debug test",
          recaptchaToken: token,
          isDebugTest: true,
        }),
      });

      const result = await response.json();

      setDebugInfo((prev) => ({
        ...prev,
        verificationResults: [
          ...prev.verificationResults,
          {
            timestamp: new Date().toLocaleTimeString(),
            token: token.substring(0, 20) + "...",
            score: result.score || null,
            success: result.success || false,
            action: "debug_test",
          },
        ],
      }));
    } catch (error) {
      console.error("Debug test failed:", error);
    }
  };

  // Only show debug button if test mode is enabled
  if (!isTestModeEnabled) {
    return null;
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-red-500 text-white px-3 py-2 rounded text-sm z-50"
      >
        Debug reCAPTCHA
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg max-w-md z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-800">reCAPTCHA Debug Panel</h3>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const newValue = isTestModeEnabled ? "false" : "true";
              setCookie("test-recaptcha-enabled", newValue, 30);
              setIsTestModeEnabled(!isTestModeEnabled);
            }}
            className={`px-2 py-1 text-xs rounded ${
              isTestModeEnabled
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
            title="Toggle test mode cookie"
          >
            {isTestModeEnabled ? "Test Mode: ON" : "Test Mode: OFF"}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <strong>Site Key:</strong> {debugInfo.siteKey}
        </div>
        <div>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-xs ${
              debugInfo.isLoaded
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {debugInfo.isLoaded ? "Loaded" : "Not Loaded"}
          </span>
        </div>
        <div>
          <strong>Last Token:</strong>{" "}
          {debugInfo.lastToken
            ? debugInfo.lastToken.substring(0, 20) + "..."
            : "None"}
        </div>
        <div>
          <strong>Last Score:</strong> {debugInfo.lastScore || "N/A"}
        </div>

        <button
          onClick={testRecaptcha}
          className="w-full bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 mb-3"
        >
          Test reCAPTCHA v3
        </button>

        <ReCAPTCHAv2
          onVerify={(token) => {
            setDebugInfo((prev) => ({
              ...prev,
              lastToken: token,
              lastAction: "v2_verification",
            }));
          }}
          onExpire={() => {}}
          onError={() => {}}
        />

        {debugInfo.verificationResults.length > 0 && (
          <div>
            <strong>Recent Tests:</strong>
            <div className="max-h-32 overflow-y-auto">
              {debugInfo.verificationResults.map((result, index) => (
                <div key={index} className="text-xs border-t pt-1 mt-1">
                  <div>{result.timestamp}</div>
                  <div>Score: {result.score || "N/A"}</div>
                  <div>Success: {result.success ? "✓" : "✗"}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
