import type { Metadata } from "next";
import { NutritionShell } from "./_components/nutrition-shell";

export const metadata: Metadata = {
  title: "Nutrition Plans",
  description:
    "Create personalized nutrition plans based on your dietary preferences, goals, and restrictions.",
};

export default function NutritionPlansLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <NutritionShell>{children}</NutritionShell>
    </div>
  );
}
