import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cal – Your AI Fitness Coach",
  description:
    "Chat with your AI fitness coach to get personalized workout plans, nutrition advice, and motivation to reach your fitness goals.",
};

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
