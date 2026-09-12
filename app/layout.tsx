import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ConsentProvider } from "./components/ConsentProvider";
import Analytics from "./components/Analytics";

const inter = Inter({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Required Technology - Software Development Solutions",
  description:
    "Professional software development company specializing in frontend, backend, mobile development, IT consulting, and full-cycle software delivery solutions.",
  keywords:
    "software development, web development, mobile development, IT consulting, full-stack development, custom software solutions",
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
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ConsentProvider>
          {children}
          <Analytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
