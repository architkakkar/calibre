import Link from "next/link";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedOut,
} from "@clerk/nextjs";
import { cn } from "@/lib/shared/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroStats } from "@/app/(marketing)/_components/hero-stats";

export function HeroSection() {
  return (
    <Card className="col-span-6 row-span-3 relative overflow-hidden border border-border/70 bg-card/80 shadow-2xl backdrop-blur-xl">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, var(--primary) 0%, transparent 45%), radial-gradient(circle at 85% 15%, var(--secondary) 0%, transparent 45%), radial-gradient(circle at 30% 85%, var(--primary) 0%, transparent 40%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/28 via-black/10 to-transparent" />
      <CardContent className="relative z-10 flex h-full flex-col justify-between gap-8 px-8 py-10 md:px-12 md:py-12">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3.5 py-1.5 text-[12px] font-medium text-primary animate-bounce">
            <span className="size-2 rounded-full bg-primary" />
            AI-powered coaching that feels human
          </div>
          <div className="space-y-2.5">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
              Welcome to Calibre
            </p>
            <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-foreground">
              Fitness, <span className="text-primary">Redefined</span>
            </h1>
            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-foreground/85">
              Personalized workouts, adaptive meal plans, and progress tracking
              backed by your AI coach — so you stay consistent.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <ClerkLoading>
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-16 rounded-md" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <SignUpButton>
                  <Link
                    href="/register"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "h-8 w-24 font-bold"
                    )}
                  >
                    Get Started
                  </Link>
                </SignUpButton>
                <SignInButton>
                  <Link
                    href="/login"
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "h-8 w-16 border border-secondary"
                    )}
                  >
                    Login
                  </Link>
                </SignInButton>
              </SignedOut>
            </ClerkLoaded>
            <span className="text-sm text-muted-foreground">
              No credit card required, Cancel anytime.
            </span>
          </div>
        </div>
        <HeroStats />
      </CardContent>
    </Card>
  );
}
