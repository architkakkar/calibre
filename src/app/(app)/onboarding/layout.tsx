import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding · Calibre",
  description:
    "An AI-powered fitness companion offering personalized workout plans, diet guidance, progress tracking, streaks, rewards, and an interactive AI trainer.",
};

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Onboarding Layout Rendered");
  return <>{children}</>;
}
