import type { Metadata } from "next";
import { WorkoutShell } from "./_components/workout-shell";

export const metadata: Metadata = {
  title: "Workout Plans",
  description:
    "Create personalized workout plans based on your goals, equipment, and time availability.",
};

export default function WorkoutPlansLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <WorkoutShell>{children}</WorkoutShell>
    </div>
  );
}
