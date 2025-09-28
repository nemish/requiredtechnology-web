import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
