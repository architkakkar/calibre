import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { cn } from "@/lib/shared/utils";
import { buttonVariants } from "@/components/ui/button";
import { AppLogo } from "@/components/common/app-logo";

export function Navbar() {
  return (
    <header className="px-6 py-5">
      <div className="mx-auto rounded-xl border border-border bg-card/30 shadow-sm px-4 py-3 flex items-center justify-between">
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
          {/* using currently until dashboard is ready */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
