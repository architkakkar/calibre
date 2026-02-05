"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { useGlobalStore } from "@/stores/global.store";
import { AppLogo } from "@/components/common/app-logo";
import { NotificationPopup } from "@/components/layout/notification-popup";
// import { StreakActivityPopup } from "@/components/layout/streak-activity-popup";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  // CoinsDollarIcon,
  Notification01Icon,
  // SparklesIcon,
  Home03Icon,
  Notebook02Icon,
  AiChat02Icon,
  Dumbbell01Icon,
  Apple01Icon,
  User02Icon,
  Logout01Icon,
  Menu01Icon,
  ArrowDown01FreeIcons,
} from "@hugeicons/core-free-icons";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, fetchUser } = useGlobalStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
      <div className="flex items-center justify-between px-2 py-2 border rounded-xl border-border bg-card/30 lg:px-4 min-h-15">
        {/* Left Section */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Hamburger Menu - Mobile & Tablet */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg size-8 text-foreground hover:bg-white/10 lg:hidden"
          >
            <HugeiconsIcon icon={Menu01Icon} className="size-5" />
          </Button>

          <AppLogo />

          {/* Desktop Navigation - Only on Desktop (1024px+) */}
          <nav className="items-center hidden gap-2 p-1 lg:flex rounded-xl bg-card/60 ring-1 ring-border/60">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className={`h-8 rounded-lg px-3 py-1 text-sm font-semibold gap-1.5 transition-all duration-200 flex items-center ${
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
                    className={`h-8 rounded-lg px-3 py-1 text-sm font-semibold gap-1.5 transition-all ${
                      pathname?.startsWith("/plans")
                        ? "bg-linear-to-r! from-primary! to-primary/90! text-primary-foreground! shadow-lg! shadow-primary/30! !hover:bg-linear-to-r !hover:from-primary !hover:to-primary/90 !hover:text-primary-foreground"
                        : "text-foreground/80 bg-inherit hover:text-primary hover:bg-white/5"
                    }`}
                  >
                    <HugeiconsIcon icon={Notebook02Icon} className="size-4" />
                    Plans
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col w-auto gap-1 min-w-44">
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
              className={`h-8 rounded-lg px-3 py-1 text-sm font-semibold gap-1.5 transition-all duration-200 flex items-center ${
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
          {/* <Badge
            variant="secondary"
            onClick={() => router.push("/upgrade")}
            className="hidden lg:flex h-7 gap-1.5 rounded-tl rounded-lg px-3 text-xs font-semibold bg-linear-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 hover:border-primary/50 transition-all cursor-pointer"
          >
            <HugeiconsIcon icon={SparklesIcon} />
            Upgrade
          </Badge> */}

          {/* Streak & Coins - Tablet & Desktop (hidden on mobile) */}
          {/* <div className="items-center hidden gap-2 sm:flex">
            <StreakActivityPopup />
            <div className="h-8 gap-1.5 rounded-lg px-2.5 text-xs font-medium text-foreground transition-all flex items-center justify-center">
              <HugeiconsIcon
                icon={CoinsDollarIcon}
                className="size-4 text-emerald-600"
              />
              <span className="hidden lg:inline">120</span>
            </div>
          </div> */}

          {/* Notifications - Tablet & Desktop (hidden on mobile) */}
          <NotificationPopup />

          {/* Separator - Tablet & Desktop */}
          <Separator
            orientation="vertical"
            className="hidden w-px h-8 sm:block bg-border"
          />

          {/* Avatar Dropdown - All Screens */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 px-2 py-1 transition-all border cursor-pointer border-primary/10 rounded-xl bg-inherit hover:bg-primary/5">
                <Avatar className="size-7">
                  <AvatarImage />
                  <AvatarFallback className="text-xs bg-primary/90 text-background">
                    AK
                  </AvatarFallback>
                </Avatar>
                <HugeiconsIcon icon={ArrowDown01FreeIcons} size={16} />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="p-1.5 min-w-44"
            >
              <div className="flex items-center gap-2 px-2.5 py-1.5 text-sm font-semibold text-foreground capitalize">
                Hello, {user?.firstName + " " + user?.lastName || "User"}
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => router.push("/accounts")}
                className="flex items-center gap-2"
              >
                <HugeiconsIcon icon={User02Icon} className="size-4" />
                Accounts
              </DropdownMenuItem>

              {/* Notifications - Mobile Only */}
              <DropdownMenuItem
                onClick={() => router.push("/notifications")}
                className="flex items-center gap-2 sm:hidden"
              >
                <HugeiconsIcon icon={Notification01Icon} className="size-4" />
                Notifications
              </DropdownMenuItem>

              <SignOutButton>
                <DropdownMenuItem
                  className="flex items-center gap-2"
                  variant="destructive"
                >
                  <HugeiconsIcon icon={Logout01Icon} className="size-4" />
                  Logout
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </header>
  );
}
