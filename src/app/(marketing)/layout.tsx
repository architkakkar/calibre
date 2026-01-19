import type { ReactNode } from "react";
import { Navbar } from "./_components/navbar";

export default function MarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="lg:min-h-dvh w-full lg:overflow-hidden bg-background">
      <Navbar />
      <main className="px-2 pb-2 md:px-4 md:pb-4">
        <div className="mx-auto">{children}</div>
      </main>
    </div>
  );
}
