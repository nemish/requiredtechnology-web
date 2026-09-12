"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Consent = "accepted" | "declined" | null;

const STORAGE_KEY = "cookieConsent";

const ConsentContext = createContext<{
  // undefined = not yet read from storage (SSR / pre-hydration)
  consent: Consent | undefined;
  setConsent: (value: Exclude<Consent, null>) => void;
}>({ consent: undefined, setConsent: () => {} });

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<Consent | undefined>(undefined);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setConsentState(stored === "accepted" || stored === "declined" ? stored : null);
  }, []);

  const setConsent = (value: Exclude<Consent, null>) => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsentState(value);
  };

  return (
    <ConsentContext.Provider value={{ consent, setConsent }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  return useContext(ConsentContext);
}
