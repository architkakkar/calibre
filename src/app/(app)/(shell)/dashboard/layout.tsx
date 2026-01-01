import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
