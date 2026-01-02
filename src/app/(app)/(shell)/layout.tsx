import { Navbar } from "@/components/layout/navbar";

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
