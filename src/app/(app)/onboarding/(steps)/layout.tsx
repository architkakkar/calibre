"use client";

import { usePathname } from "next/navigation";
import { AppLogo } from "@/components/common/app-logo";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle03Icon } from "@hugeicons/core-free-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OnboardingStepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStep = pathname.includes("user-profile") ? 2 : 3;

  return (
    <main className="h-screen w-screen overflow-hidden bg-background text-foreground flex">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full w-full">
        <aside
          aria-label="Onboarding introduction"
          className="hidden md:flex h-full"
        >
          <Card className="relative m-3 flex-1 rounded-2xl border-border/70 overflow-hidden bg-linear-to-br from-card via-background to-background/95 shadow-2xl">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary) 0%, transparent 50%, var(--secondary) 100%)",
              }}
            />
            <CardContent className="relative flex h-full flex-col justify-between p-10 gap-8">
              <header className="flex items-center gap-3">
                <AppLogo />
              </header>

              <section aria-label="Welcome message" className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-black leading-tight">
                  Welcome to Calibre
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                  Your AI-powered fitness companion. Smarter workouts,
                  personalized meals, real progress.
                </p>
              </section>

              <nav
                aria-label="Onboarding steps"
                className="flex flex-col items-start gap-3 text-sm max-w-lg"
              >
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 w-full border border-border bg-card/80 text-primary">
                  <HugeiconsIcon icon={CheckmarkCircle03Icon} />
                  <span className="font-semibold">Create your account</span>
                </div>
                <div
                  className={`flex items-center gap-3 rounded-lg border px-3 py-2 w-full ${
                    currentStep === 2
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card/80 text-primary"
                  }`}
                >
                  {currentStep === 2 ? (
                    <Badge
                      variant="outline"
                      className="h-6 w-6 rounded-full bg-primary/20 text-primary font-bold text-xs p-0"
                    >
                      2
                    </Badge>
                  ) : (
                    <HugeiconsIcon icon={CheckmarkCircle03Icon} />
                  )}
                  <span className="font-semibold">Setup your profile</span>
                </div>
                <div
                  className={`flex items-center gap-3 rounded-lg border px-3 py-2 w-full ${
                    currentStep === 3
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card/80"
                  }`}
                >
                  <Badge
                    variant="outline"
                    className="h-6 w-6 rounded-full bg-primary/20 text-primary font-bold text-xs p-0"
                  >
                    3
                  </Badge>
                  <span className="font-semibold">
                    Setup your fitness goals
                  </span>
                </div>
              </nav>
            </CardContent>
          </Card>
        </aside>

        <section
          className="h-full flex flex-col bg-background overflow-hidden"
          aria-label="Onboarding form"
        >
          <div className="m-3 flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-8 pt-8 mb-4 scrollbar-hide">
            <div className="mx-auto h-full w-full max-w-2xl">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
