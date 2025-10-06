import type { Metadata } from "next";
import { Montserrat, Montserrat as Montserrat_Mono } from "next/font/google";
import "./globals.css";
import ReCAPTCHAProvider from "./components/ReCAPTCHAProvider";

const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserratMono = Montserrat_Mono({
  variable: "--font-montserrat-mono",
  subsets: ["latin"],
  weight: ["400"],
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
        className={`${montserratSans.variable} ${montserratMono.variable} antialiased`}
      >
        <ReCAPTCHAProvider>{children}</ReCAPTCHAProvider>
      </body>
    </html>
  );
}
