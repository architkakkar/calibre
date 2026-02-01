"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppLogo } from "@/components/common/app-logo";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CoinsDollarIcon,
  Fire02Icon,
  SparklesIcon,
  Home03Icon,
  Notebook02Icon,
  AiChat02Icon,
  Dumbbell01Icon,
  Apple01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

export function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden={!isSidebarOpen}
      />

      {/* Sidebar - Mobile & Tablet Only */}
      <aside
        className={`fixed top-0 left-0 h-full w-70 sm:w-72 bg-card/95 backdrop-blur-md border-r border-border shadow-2xl z-50 transform transition-all duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navigation sidebar"
        aria-hidden={!isSidebarOpen}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <AppLogo />
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsSidebarOpen(false)}
              className="size-8 rounded-lg text-foreground hover:bg-white/10"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
            </Button>
          </div>

          {/* Stats in Sidebar - Mobile Only */}
          <div className="p-4 border-b border-border sm:hidden">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-orange-500/10 flex-1 justify-center">
                <HugeiconsIcon
                  icon={Fire02Icon}
                  className="size-4 text-orange-500"
                />
                <span className="text-sm font-medium text-orange-500">12</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-amber-500/10 flex-1 justify-center">
                <HugeiconsIcon
                  icon={CoinsDollarIcon}
                  className="size-4 text-amber-500"
                />
                <span className="text-sm font-medium text-amber-500">120</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <button
                onClick={() => router.push("/dashboard")}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  pathname === "/dashboard"
                    ? "bg-linear-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
                    : "text-foreground hover:bg-white/5"
                }`}
              >
                <HugeiconsIcon icon={Home03Icon} className="size-5" />
                Dashboard
              </button>

              {/* Plans Section */}
              <div className="space-y-1">
                <div className="flex items-center gap-3.5 px-3 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <HugeiconsIcon icon={Notebook02Icon} className="size-4.5" />
                  Plans
                </div>
                <button
                  onClick={() => router.push("/plans/workout")}
                  className={`flex items-center gap-3 w-full pl-8 pr-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === "/plans/workout"
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-white/5"
                  }`}
                >
                  <HugeiconsIcon icon={Dumbbell01Icon} className="size-4 " />
                  Workout Plans
                </button>
                <button
                  onClick={() => router.push("/plans/nutrition")}
                  className={`flex items-center gap-3 w-full pl-8 pr-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === "/plans/nutrition"
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-white/5"
                  }`}
                >
                  <HugeiconsIcon icon={Apple01Icon} className="size-4" />
                  Nutrition Plans
                </button>
              </div>

              <button
                onClick={() => router.push("/ai-trainer/chat")}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  pathname?.startsWith("/ai-trainer")
                    ? "bg-linear-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
                    : "text-foreground hover:bg-white/5"
                }`}
              >
                <HugeiconsIcon icon={AiChat02Icon} className="size-5" />
                AI Trainer
              </button>
            </div>
          </nav>

          {/* Sidebar Footer - Upgrade CTA */}
          <div className="p-4 border-t border-border">
            <Badge
              variant="secondary"
              onClick={() => router.push("/upgrade")}
              className="w-full h-auto gap-2 rounded-lg px-3 py-2 text-sm font-semibold bg-linear-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 hover:border-primary/50 transition-all cursor-pointer justify-center"
            >
              <HugeiconsIcon icon={SparklesIcon} className="size-4" />
              Upgrade to Pro
            </Badge>
          </div>
        </div>
      </aside>
    </>
  );
}
