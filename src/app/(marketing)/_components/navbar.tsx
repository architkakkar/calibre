import Link from "next/link";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";
import { cn } from "@/lib/shared/utils";
import { AppLogo } from "@/components/common/app-logo";
import { buttonVariants } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="px-2 py-2 md:px-4 md:py-4">
      <div className="mx-auto rounded-xl border border-border bg-card/30 shadow-sm px-2 lg:px-4 py-3 flex items-center justify-between">
        <AppLogo />
        <nav className="flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                Login
              </Link>
            </SignInButton>
            <SignUpButton>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "sm", variant: "default" }),
                  "font-bold"
                )}
              >
                Get Started
              </Link>
            </SignUpButton>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
}
