import type { Metadata } from "next";
import { Inter, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { ConsentProvider } from "./components/ConsentProvider";
import Analytics from "./components/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://required.ee"),
  title: "Required Technology - Software Development Solutions",
  description:
    "Professional software development company specializing in frontend, backend, mobile development, IT consulting, and full-cycle software delivery solutions.",
  authors: [{ name: "Required Technology" }],
  openGraph: {
    title: "Required Technology - Software Development Solutions",
    description:
      "Professional software development company specializing in frontend, backend, mobile development, IT consulting, and full-cycle software delivery solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${schibsted.variable} antialiased`}>
        <ConsentProvider>
          {children}
          <Analytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
