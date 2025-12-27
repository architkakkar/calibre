import type { ReactNode } from "react";
import { Navbar } from "./_components/navbar";

export default function MarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="lg:min-h-dvh w-full lg:overflow-hidden bg-background">
      <Navbar />
      <main className="px-6 pb-5">
        <div className="mx-auto">{children}</div>
      </main>
    </div>
  );
}
