import type { Metadata } from "next";
import { Alan_Sans } from "next/font/google";
import "./globals.css";

const alanSans = Alan_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calibre - Fitness, Redefined",
  description:
    "An AI-powered fitness companion offering personalized workout plans, diet guidance, progress tracking, streaks, rewards, and an interactive AI trainer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${alanSans.variable} antialiased dark`}>
        {children}
      </body>
    </html>
  );
}
