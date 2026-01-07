import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cal - AI Trainer",
  description:
    "Chat with your AI fitness trainer to get personalized workout plans, nutrition advice, and motivation to reach your fitness goals.",
};

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
