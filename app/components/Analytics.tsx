"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "./ConsentProvider";

export default function Analytics() {
  const { consent } = useConsent();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (consent !== "accepted" || !gaId) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
