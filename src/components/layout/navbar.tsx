"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { AppLogo } from "@/components/common/app-logo";
import { NotificationPopup } from "@/components/layout/notification-popup";
import { StreakActivityPopup } from "@/components/layout/streak-activity-popup";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CoinsDollarIcon,
  Notification01Icon,
  SparklesIcon,
  Home03Icon,
  Notebook02Icon,
  AiChat02Icon,
  Dumbbell01Icon,
  Apple01Icon,
  User02Icon,
  Logout01Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const firstName = "Archit Kakkar";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <header className="px-2 py-2 md:px-4 md:py-4">
      <div className="flex items-center justify-between rounded-xl border border-border bg-card/30 px-2 lg:px-4 py-2 min-h-15">
        {/* Left Section */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Hamburger Menu - Mobile & Tablet */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsSidebarOpen(true)}
            className="size-8 rounded-lg text-foreground hover:bg-white/10 lg:hidden"
          >
            <HugeiconsIcon icon={Menu01Icon} className="size-5" />
          </Button>

          <AppLogo />

          {/* Desktop Navigation - Only on Desktop (1024px+) */}
          <nav className="hidden lg:flex items-center gap-2 rounded-xl bg-card/60 ring-1 ring-border/60 p-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className={`h-8 rounded-xl px-3 py-1 text-sm font-semibold gap-1.5 transition-all duration-200 flex items-center ${
                pathname === "/dashboard"
                  ? "bg-linear-to-r! from-primary! to-primary/90! text-primary-foreground! shadow-lg! shadow-primary/30! !hover:bg-linear-to-r !hover:from-primary !hover:to-primary/90 !hover:text-primary-foreground"
                  : "text-foreground hover:bg-white/10 hover:text-primary"
              }`}
            >
              <HugeiconsIcon icon={Home03Icon} className="size-4" />
              Dashboard
            </Button>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`h-8 rounded-xl px-3 py-1 text-sm font-semibold gap-1.5 transition-all ${
                      pathname?.startsWith("/plans")
                        ? "bg-linear-to-r! from-primary! to-primary/90! text-primary-foreground! shadow-lg! shadow-primary/30! !hover:bg-linear-to-r !hover:from-primary !hover:to-primary/90 !hover:text-primary-foreground"
                        : "text-foreground/80 bg-inherit hover:text-primary hover:bg-white/5"
                    }`}
                  >
                    <HugeiconsIcon icon={Notebook02Icon} className="size-4" />
                    Plans
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col gap-1 min-w-44 w-auto">
                      <li>
                        <NavigationMenuLink
                          href="/plans/workout"
                          className="flex items-center gap-3 rounded-md px-2.5 py-1.5 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all"
                        >
                          <HugeiconsIcon
                            icon={Dumbbell01Icon}
                            className="size-4"
                          />
                          Workout Plans
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/plans/nutrition"
                          className="flex items-center gap-3 rounded-md px-2.5 py-1.5 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all"
                        >
                          <HugeiconsIcon
                            icon={Apple01Icon}
                            className="size-4"
                          />
                          Nutrition Plans
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => router.push("/ai-trainer/chat")}
              className={`h-8 rounded-xl px-3 py-1 text-sm font-semibold gap-1.5 transition-all duration-200 flex items-center ${
                pathname?.startsWith("/ai-trainer")
                  ? "bg-linear-to-r! from-primary! to-primary/90! text-primary-foreground! shadow-lg! shadow-primary/30! !hover:bg-linear-to-r !hover:from-primary !hover:to-primary/90 !hover:text-primary-foreground"
                  : "text-foreground hover:bg-white/10 hover:text-primary"
              }`}
            >
              <HugeiconsIcon icon={AiChat02Icon} className="size-4" />
              AI Trainer
            </Button>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 text-foreground">
          {/* Upgrade - Desktop Only */}
          <Badge
            variant="secondary"
            onClick={() => router.push("/upgrade")}
            className="hidden lg:flex h-7 gap-1.5 rounded-tl rounded-lg px-3 text-xs font-semibold bg-linear-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 hover:border-primary/50 transition-all cursor-pointer"
          >
            <HugeiconsIcon icon={SparklesIcon} />
            Upgrade
          </Badge>

          {/* Streak & Coins - Tablet & Desktop (hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-2">
            <StreakActivityPopup />
            <div className="h-8 gap-1.5 rounded-lg px-2.5 text-xs font-medium text-foreground transition-all flex items-center justify-center">
              <HugeiconsIcon
                icon={CoinsDollarIcon}
                className="size-4 text-emerald-600"
              />
              <span className="hidden lg:inline">120</span>
            </div>
          </div>

          {/* Notifications - Tablet & Desktop (hidden on mobile) */}
          <NotificationPopup />

          {/* Separator - Tablet & Desktop */}
          <Separator
            orientation="vertical"
            className="hidden sm:block h-8 w-px bg-border"
          />

          {/* Avatar Dropdown - All Screens */}
          <NavigationMenu className={"border border-primary/10 rounded-xl"}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-inherit px-2">
                  <Avatar className="size-7">
                    <AvatarImage />
                    <AvatarFallback className="text-xs bg-primary/90 text-background">
                      AK
                    </AvatarFallback>
                  </Avatar>
                  {/* <div
                    className="size-7 cursor-pointer rounded-full bg-linear-to-br from-primary to-secondary ring-2 ring-border/70 transition-all hover:shadow-lg hover:shadow-primary/40 mr-1"
                    aria-label="Open profile menu"
                  /> */}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col gap-1 p-0 min-w-44 w-auto">
                    <li className="flex items-center gap-2 px-2.5 py-1.5 text-sm font-semibold text-foreground">
                      Hello, {firstName}
                    </li>
                    <Separator className="my-1 bg-border h-px" />
                    <li>
                      <NavigationMenuLink
                        href="/account"
                        className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all"
                      >
                        <HugeiconsIcon icon={User02Icon} className="size-4" />
                        Accounts
                      </NavigationMenuLink>
                    </li>
                    {/* Notifications - Mobile Only */}
                    <li className="sm:hidden">
                      <NavigationMenuLink
                        href="/notifications"
                        className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all"
                      >
                        <div className="relative">
                          <HugeiconsIcon
                            icon={Notification01Icon}
                            className="size-4"
                          />
                          <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-orange-500" />
                        </div>
                        Notifications
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <SignOutButton>
                        <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all cursor-pointer">
                          <HugeiconsIcon
                            icon={Logout01Icon}
                            className="size-4"
                          />
                          Logout
                        </div>
                      </SignOutButton>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </header>
  );
}
