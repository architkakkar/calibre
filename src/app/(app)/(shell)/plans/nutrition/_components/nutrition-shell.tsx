import { Button } from "@/components/ui/button";
import { NutritionEmptyState } from "./nutrition-empty-state";

export function NutritionShell({ children }: { children: React.ReactNode }) {
  const hasPlans = false; // placeholder

  return (
    <div>
      <header className="flex justify-between px-1">
        <div>
          <h1 className="text-3xl font-bold text-primary">Nutrition Plans</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {hasPlans
              ? "Track your progress, crush your goals, and evolve your nutrition journey with every meal."
              : "Transform your health with AI-powered nutrition plans tailored to your goals, preferences, and lifestyle."}
          </p>
        </div>
        {hasPlans && (
          <Button size="sm" className="font-semibold">
            Create Nutrition Plan
          </Button>
        )}
      </header>
      <main className="h-[calc(100dvh-184px)] w-full text-primary border border-border rounded-2xl mt-4 relative bg-card/30 overflow-hidden">
        {hasPlans ? <>{children}</> : <NutritionEmptyState />}
      </main>
    </div>
  );
}
