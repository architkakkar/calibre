import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Calibre",
    template: "%s · Calibre",
  },
  description:
    "Manage your workouts, diet plans, progress, and subscriptions in one place with Calibre’s personalized fitness dashboard.",
};

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
