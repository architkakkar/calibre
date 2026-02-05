"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TodayNutritionResponse as NutritionData } from "@/lib/validators/dashboard.validator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Apple01Icon,
  Add01Icon,
  CheckmarkCircle02Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

interface NutritionCardProps {
  data: NutritionData | null;
  onCompleteMeal: (payload: {
    mealType: string;
    mealName?: string;
    calories?: number;
    proteinGrams?: number;
    carbsGrams?: number;
    fatsGrams?: number;
    notes?: string;
    status?: "PENDING" | "COMPLETED" | "SKIPPED" | "MISSED";
  }) => Promise<{ success: boolean; mealId: string } | undefined>;
}

export function NutritionCard({ data, onCompleteMeal }: NutritionCardProps) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mealType, setMealType] = useState("");
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [mealNotes, setMealNotes] = useState("");

  const handleLogMeal = async () => {
    if (!mealType) return;

    await onCompleteMeal({
      mealType,
      mealName: mealName || undefined,
      calories: calories ? parseInt(calories) : undefined,
      proteinGrams: protein ? parseInt(protein) : undefined,
      carbsGrams: carbs ? parseInt(carbs) : undefined,
      fatsGrams: fats ? parseInt(fats) : undefined,
      notes: mealNotes || undefined,
      status: "COMPLETED",
    });

    setDialogOpen(false);
    setMealType("");
    setMealName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFats("");
    setMealNotes("");
  };

  // No active plan
  if (!data || !data.hasActivePlan) {
    return (
      <Card className="h-full border-2 hover:border-primary/30 transition-all duration-500 bg-linear-to-br from-card to-primary/5 overflow-hidden group">
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary/10">
                <HugeiconsIcon
                  icon={Apple01Icon}
                  className="w-4 h-4 text-primary"
                />
              </div>
              <CardTitle className="text-lg">Today&apos;s Nutrition</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative overflow-y-auto max-h-[calc(100%-5rem)]">
          <div className="text-center py-12">
            <HugeiconsIcon
              icon={Apple01Icon}
              className="w-12 h-12 mx-auto mb-3 text-muted-foreground"
            />
            <p className="text-sm text-muted-foreground mb-3">No active plan</p>
            <Button
              onClick={() => router.push("/plans/nutrition")}
              size="sm"
              className="rounded-full"
            >
              <HugeiconsIcon icon={Add01Icon} className="w-3 h-3 mr-1" />
              Create Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const caloriesPercentage = Math.round(
    (data.progress.calories / data.targets.calories) * 100,
  );
  const proteinPercentage = Math.round(
    (data.progress.protein / data.targets.protein) * 100,
  );
  const carbsPercentage = Math.round(
    (data.progress.carbs / data.targets.carbs) * 100,
  );
  const fatsPercentage = Math.round(
    (data.progress.fats / data.targets.fats) * 100,
  );

  const allMealsCompleted = data.mealsCompleted === data.totalMeals;

  // Main nutrition UI with tracking
  return (
    <Card className="h-full border border-border hover:border-primary/10 transition-all duration-500 bg-linear-to-br from-card to-primary/5 overflow-hidden group py-5">
      <CardHeader className="relative space-y-2 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <HugeiconsIcon
                icon={Apple01Icon}
                className="w-5 h-5 text-primary"
              />
            </div>
            <div>
              <CardTitle className="text-base leading-none pb-0.5">
                Today&apos;s Nutrition
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-muted-foreground/70 font-medium">
                  Plan:
                </span>{" "}
                {data.planName}
              </p>
            </div>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full h-8 w-8 p-0 self-start"
              >
                <HugeiconsIcon icon={Add01Icon} className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl max-w-md text-foreground">
              <DialogHeader>
                <DialogTitle className="text-base">Log a Meal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <div>
                  <Label>Meal Type *</Label>
                  <Input
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                    placeholder="Breakfast, Lunch, Dinner..."
                    className="rounded-lg mt-2"
                  />
                </div>
                <div>
                  <Label>Meal Name</Label>
                  <Input
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                    placeholder="What did you eat?"
                    className="rounded-lg mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Calories</Label>
                    <Input
                      type="number"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      placeholder="500"
                      className="rounded-lg mt-1"
                    />
                  </div>
                  <div>
                    <Label>Protein (g)</Label>
                    <Input
                      type="number"
                      value={protein}
                      onChange={(e) => setProtein(e.target.value)}
                      placeholder="30"
                      className="rounded-lg mt-1"
                    />
                  </div>
                  <div>
                    <Label>Carbs (g)</Label>
                    <Input
                      type="number"
                      value={carbs}
                      onChange={(e) => setCarbs(e.target.value)}
                      placeholder="50"
                      className="rounded-lg mt-1"
                    />
                  </div>
                  <div>
                    <Label>Fats (g)</Label>
                    <Input
                      type="number"
                      value={fats}
                      onChange={(e) => setFats(e.target.value)}
                      placeholder="15"
                      className="rounded-lg mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Notes</Label>
                  <Textarea
                    value={mealNotes}
                    onChange={(e) => setMealNotes(e.target.value)}
                    placeholder="Optional notes..."
                    rows={3}
                    className="rounded-lg mt-1"
                  />
                </div>
                <Button
                  onClick={handleLogMeal}
                  disabled={!mealType}
                  className="w-full rounded-lg"
                >
                  Log Meal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Progress Summary */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Meals: {data.mealsCompleted}/{data.totalMeals}
          </span>
          {allMealsCompleted && (
            <Badge
              variant="secondary"
              className="rounded-full text-xs bg-green-500/10 text-green-600 border-green-500/20"
            >
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                className="w-3 h-3 mr-1"
              />
              Complete
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 relative overflow-y-auto max-h-[calc(100%-8rem)] px-5 space-y-4">
        {/* Macro Progress Cards */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-linear-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20">
            <div className="flex items-baseline justify-between mb-1">
              <p className="text-lg font-bold">
                {data.progress.calories}
                <span className="text-xs text-muted-foreground font-normal">
                  /{data.targets.calories}
                </span>
              </p>
              <span className="text-xs text-muted-foreground">
                {caloriesPercentage}%
              </span>
            </div>
            <div className="h-1.5 bg-orange-500/20 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(caloriesPercentage, 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Calories
            </p>
          </div>

          <div className="p-3 rounded-xl bg-linear-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
            <div className="flex items-baseline justify-between mb-1">
              <p className="text-lg font-bold">
                {data.progress.protein}
                <span className="text-xs text-muted-foreground font-normal">
                  /{data.targets.protein}g
                </span>
              </p>
              <span className="text-xs text-muted-foreground">
                {proteinPercentage}%
              </span>
            </div>
            <div className="h-1.5 bg-blue-500/20 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(proteinPercentage, 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Protein
            </p>
          </div>

          <div className="p-3 rounded-xl bg-linear-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
            <div className="flex items-baseline justify-between mb-1">
              <p className="text-lg font-bold">
                {data.progress.carbs}
                <span className="text-xs text-muted-foreground font-normal">
                  /{data.targets.carbs}g
                </span>
              </p>
              <span className="text-xs text-muted-foreground">
                {carbsPercentage}%
              </span>
            </div>
            <div className="h-1.5 bg-amber-500/20 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(carbsPercentage, 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Carbs
            </p>
          </div>

          <div className="p-3 rounded-xl bg-linear-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
            <div className="flex items-baseline justify-between mb-1">
              <p className="text-lg font-bold">
                {data.progress.fats}
                <span className="text-xs text-muted-foreground font-normal">
                  /{data.targets.fats}g
                </span>
              </p>
              <span className="text-xs text-muted-foreground">
                {fatsPercentage}%
              </span>
            </div>
            <div className="h-1.5 bg-purple-500/20 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(fatsPercentage, 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Fats
            </p>
          </div>
        </div>

        {/* Logged Meals */}
        {data.meals.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Logged Meals
            </p>
            <Accordion type="single" collapsible className="space-y-1.5">
              {data.meals.map((meal) => (
                <AccordionItem
                  key={meal.id}
                  value={meal.id}
                  className="border rounded-xl bg-muted/30 overflow-hidden"
                >
                  <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-muted/50 transition-colors flex item-center">
                    <div className="flex items-center gap-2 flex-1 text-left">
                      {meal.status === "COMPLETED" ? (
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          className="w-4 h-4 text-green-500 shrink-0"
                        />
                      ) : meal.status === "SKIPPED" ? (
                        <HugeiconsIcon
                          icon={Cancel01Icon}
                          className="w-4 h-4 text-yellow-500 shrink-0"
                        />
                      ) : (
                        <HugeiconsIcon
                          icon={Apple01Icon}
                          className="w-4 h-4 text-muted-foreground shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {meal.type}
                        </p>
                        {meal.name && (
                          <p className="text-xs text-muted-foreground truncate">
                            {meal.name}
                          </p>
                        )}
                      </div>
                      {meal.calories !== null && (
                        <Badge
                          variant="secondary"
                          className="rounded-full text-xs"
                        >
                          {meal.calories} cal
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3 pt-0">
                    <div className="space-y-2 text-xs">
                      {(meal.proteinGrams !== null ||
                        meal.carbsGrams !== null ||
                        meal.fatsGrams !== null) && (
                        <div className="grid grid-cols-3 gap-2">
                          {meal.proteinGrams !== null && (
                            <div className="p-2 bg-blue-500/5 border border-blue-500/10 rounded-lg text-center">
                              <p className="font-medium text-blue-600">
                                {meal.proteinGrams}g
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                Protein
                              </p>
                            </div>
                          )}
                          {meal.carbsGrams !== null && (
                            <div className="p-2 bg-amber-500/5 border border-amber-500/10 rounded-lg text-center">
                              <p className="font-medium text-amber-600">
                                {meal.carbsGrams}g
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                Carbs
                              </p>
                            </div>
                          )}
                          {meal.fatsGrams !== null && (
                            <div className="p-2 bg-purple-500/5 border border-purple-500/10 rounded-lg text-center">
                              <p className="font-medium text-purple-600">
                                {meal.fatsGrams}g
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                Fats
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      {meal.notes && (
                        <div className="p-2 bg-muted/50 rounded-lg">
                          <p className="text-muted-foreground">{meal.notes}</p>
                        </div>
                      )}
                      <div className="text-[10px] text-muted-foreground">
                        Logged at{" "}
                        {new Date(meal.loggedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
