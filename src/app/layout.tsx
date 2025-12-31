import type { Metadata } from "next";
import { Alan_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const alanSans = Alan_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calibre — Fitness, Redefined",
  description:
    "An AI-powered fitness companion offering personalized workout plans, diet guidance, progress tracking, streaks, rewards, and an interactive AI trainer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>
      <html lang="en">
        <body className={`${alanSans.variable} antialiased dark`}>
          {children}
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
