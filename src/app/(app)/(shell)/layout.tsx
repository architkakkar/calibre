import type { Metadata } from "next";
import { Navbar } from "@/components/common/navbar";

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
  return (
    <div className="lg:min-h-dvh w-full lg:overflow-hidden bg-background">
      <div className="flex h-full flex-col px-6 py-5">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
