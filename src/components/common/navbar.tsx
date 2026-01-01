import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppLogo } from "@/components/common/app-logo";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Coins01Icon,
  Fire02Icon,
  Notification01Icon,
  SparklesIcon,
  Home03Icon,
  ShoppingBag01Icon,
  AiChat02Icon,
} from "@hugeicons/core-free-icons";

export function Navbar() {
  const navItems = [
    { label: "Dashboard", icon: Home03Icon },
    { label: "Plans", icon: ShoppingBag01Icon },
    { label: "AI Trainer", icon: AiChat02Icon },
  ];

  return (
    <header className="mb-4 flex items-center justify-between rounded-xl border border-border bg-card/30 px-4 py-2 shadow-sm backdrop-blur-md lg:mb-5">
      <div className="flex items-center gap-4">
        <AppLogo />
        <nav className="hidden items-center gap-2 rounded-full bg-gradient-to-b from-card/40 to-card/20 ring-1 ring-border/60 p-1 sm:flex">
          {navItems.map((item) => (
            <Button
              key={item.label}
              size="sm"
              variant={item.label === "Plans" ? "default" : "ghost"}
              className={`h-8 rounded-full px-4 py-1.5 text-sm font-semibold gap-2 transition-all duration-200 flex items-center ${
                item.label === "Plans"
                  ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50"
                  : "text-foreground hover:bg-white/10 hover:text-primary"
              }`}
            >
              <HugeiconsIcon icon={item.icon} className="size-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2 text-foreground">
        <Badge
          variant="secondary"
          className="hidden h-8 gap-1.5 rounded-lg px-3 text-xs font-semibold sm:flex bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 hover:border-primary/50 transition-all cursor-pointer"
        >
          <HugeiconsIcon icon={SparklesIcon} className="size-3.5" />
          Upgrade
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-1.5 rounded-lg px-3 text-xs font-medium text-foreground hover:bg-white/10 hover:text-orange-500 transition-all"
        >
          <HugeiconsIcon icon={Fire02Icon} className="size-4 text-orange-500" />
          <span className="hidden sm:inline">12</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-1.5 rounded-lg px-3 text-xs font-medium text-foreground hover:bg-white/10 hover:text-amber-500 transition-all"
        >
          <HugeiconsIcon icon={Coins01Icon} className="size-4 text-amber-500" />
          <span className="hidden sm:inline">120</span>
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="size-9 rounded-lg text-foreground hover:bg-white/10 transition-all"
        >
          <HugeiconsIcon icon={Notification01Icon} className="size-4" />
        </Button>
        <div className="ml-2 size-9 cursor-pointer rounded-full bg-gradient-to-br from-primary to-secondary ring-2 ring-border/70 transition-all hover:ring-primary/60 hover:shadow-lg hover:shadow-primary/40" />
      </div>
    </header>
  );
}
