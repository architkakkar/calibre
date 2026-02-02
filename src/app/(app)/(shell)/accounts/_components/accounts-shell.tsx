"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AccountsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      label: "Account Info",
      path: "/accounts/info",
      group: "Profile & Identity",
    },
    {
      label: "Physical Stats",
      path: "/accounts/physical-stats",
      group: "Profile & Identity",
    },
    {
      label: "Fitness Goals",
      path: "/accounts/fitness-goals",
      group: "Fitness Configuration",
    },
    {
      label: "Feedback",
      path: "/accounts/feedback",
      group: "App Settings",
    },
    {
      label: "Privacy & Data",
      path: "/accounts/privacy",
      group: "App Settings",
    },
  ];

  const profileItems = navItems.filter(
    (item) => item.group === "Profile & Identity",
  );
  const fitnessItems = navItems.filter(
    (item) => item.group === "Fitness Configuration",
  );
  const appSettingsItems = navItems.filter(
    (item) => item.group === "App Settings",
  );

  return (
    <div>
      <header className="px-1 mt-1 md:mt-0">
        <h1 className="text-3xl font-bold text-primary">Account Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account details, fitness preferences, and in app settings.
        </p>
      </header>

      <main className="h-[calc(100dvh-184px)] xs:h-[calc(100dvh-164px)] md:h-[calc(100dvh-184px)] w-full border border-border rounded-2xl mt-4 relative bg-card/30 overflow-hidden text-primary">
        <div className="flex h-full">
          {/* Sidebar Navigation */}
          <aside className="w-64 border-r border-border bg-card/50 p-4 shrink-0 hidden lg:block overflow-y-auto">
            <nav className="space-y-6">
              {/* Profile & Identity Group */}
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground px-2 pb-1">
                  Profile & Identity
                </p>
                {profileItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={pathname === item.path ? "outline" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => router.push(item.path)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>

              {/* Fitness Configuration Group */}
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground px-2 pb-1">
                  Fitness Configuration
                </p>
                {fitnessItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={pathname === item.path ? "outline" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => router.push(item.path)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>

              {/* App Settings Group */}
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground px-2 pb-1">
                  App Settings
                </p>
                {appSettingsItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={pathname === item.path ? "outline" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => router.push(item.path)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </nav>
          </aside>

          {/* Mobile Navigation - Tabs at top */}
          <div className="lg:hidden absolute top-0 left-0 right-0 bg-card/90 backdrop-blur-sm border-b border-border z-10">
            <div className="flex overflow-x-auto px-2 py-2 gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  size="sm"
                  variant={pathname === item.path ? "secondary" : "ghost"}
                  className="shrink-0 text-xs"
                  onClick={() => router.push(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-20 lg:pt-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
