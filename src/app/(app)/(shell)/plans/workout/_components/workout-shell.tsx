import { Button } from "@/components/ui/button";
import { WorkoutEmptyState } from "./workout-empty-state";

export function WorkoutShell({ children }: { children: React.ReactNode }) {
  const hasPlans = false; // placeholder

  return (
    <div>
      <header className="flex justify-between px-1 mt-1">
        <div>
          <h1 className="text-3xl font-bold text-primary">Workout Plans</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {hasPlans
              ? "Track your progress, crush your goals, and evolve your fitness journey with every workout."
              : "Transform your fitness with AI-powered workout plans that adapt to your goals, schedule, and available equipment."}
          </p>
        </div>
        {hasPlans && (
          <Button size="sm" className="font-semibold">
            Create Workout Plan
          </Button>
        )}
      </header>
      <main className="h-[calc(100dvh-184px)] w-full text-primary border border-border rounded-2xl mt-4 relative bg-card/30 overflow-hidden">
        {hasPlans ? <>{children}</> : <WorkoutEmptyState />}
      </main>
    </div>
  );
}
