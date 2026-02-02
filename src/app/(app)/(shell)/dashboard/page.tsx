"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Dumbbell01Icon,
  Apple01Icon,
  DropletIcon,
  CheckmarkCircle02Icon,
  CircleIcon,
  Add01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";

interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  duration?: string;
  notes?: string;
}

interface WorkoutData {
  hasActivePlan: boolean;
  planName?: string;
  currentWeek?: number;
  currentDay?: number;
  workout?: {
    id: string;
    name: string;
    warmup?: string;
    cooldown?: string;
    exercises: Exercise[];
  };
  isCompleted?: boolean;
}

interface NutritionData {
  hasActivePlan: boolean;
  planName?: string;
  planDayId?: string;
  targets?: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  loggedMeals?: Array<{
    id: string;
    type: string;
    name: string;
    notes: string;
  }>;
}

interface HydrationData {
  dailyTarget: number;
  totalConsumed: number;
  percentage: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(
    null,
  );
  const [hydrationData, setHydrationData] = useState<HydrationData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const [mealDialogOpen, setMealDialogOpen] = useState(false);
  const [mealType, setMealType] = useState("");
  const [mealName, setMealName] = useState("");
  const [mealNotes, setMealNotes] = useState("");

  const [targetDialogOpen, setTargetDialogOpen] = useState(false);
  const [newTarget, setNewTarget] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [workoutRes, nutritionRes, hydrationRes] = await Promise.all([
        fetch("/api/dashboard/workout"),
        fetch("/api/dashboard/nutrition"),
        fetch("/api/dashboard/hydration"),
      ]);

      const workout = await workoutRes.json();
      const nutrition = await nutritionRes.json();
      const hydration = await hydrationRes.json();

      setWorkoutData(workout);
      setNutritionData(nutrition);
      setHydrationData(hydration);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const toggleWorkoutComplete = async () => {
    if (!workoutData?.workout?.id) return;

    try {
      const res = await fetch("/api/dashboard/workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workoutPlanDayId: workoutData.workout.id }),
      });

      if (!res.ok) throw new Error("Failed to update workout");

      const result = await res.json();
      setWorkoutData((prev) => ({
        ...prev!,
        isCompleted: result.newStatus === "COMPLETED",
      }));

      toast.success(
        result.newStatus === "COMPLETED"
          ? "Workout completed! 🎉"
          : "Workout marked as pending",
      );
    } catch (error) {
      console.error("Error updating workout:", error);
      toast.error("Failed to update workout");
    }
  };

  const logMeal = async () => {
    if (!nutritionData?.planDayId || !mealType) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch("/api/dashboard/nutrition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planDayId: nutritionData.planDayId,
          mealType,
          mealName,
          notes: mealNotes,
        }),
      });

      if (!res.ok) throw new Error("Failed to log meal");

      toast.success("Meal logged successfully!");
      setMealDialogOpen(false);
      setMealType("");
      setMealName("");
      setMealNotes("");
      fetchDashboardData();
    } catch (error) {
      console.error("Error logging meal:", error);
      toast.error("Failed to log meal");
    }
  };

  const addWater = async (amount: number) => {
    try {
      const res = await fetch("/api/dashboard/hydration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) throw new Error("Failed to add water");

      toast.success(`Added ${amount}ml 💧`);
      fetchDashboardData();
    } catch (error) {
      console.error("Error adding water:", error);
      toast.error("Failed to add water");
    }
  };

  const updateHydrationTarget = async () => {
    const target = parseInt(newTarget);
    if (!target || target <= 0) {
      toast.error("Please enter a valid target");
      return;
    }

    try {
      const res = await fetch("/api/dashboard/hydration", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dailyTarget: target }),
      });

      if (!res.ok) throw new Error("Failed to update target");

      toast.success("Daily target updated!");
      setTargetDialogOpen(false);
      setNewTarget("");
      fetchDashboardData();
    } catch (error) {
      console.error("Error updating target:", error);
      toast.error("Failed to update target");
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return (
      <div className="h-[calc(100dvh-84px)] md:h-[calc(100dvh-108px)] relative overflow-y-auto bg-linear-to-br from-background via-background to-muted/20 ">
        <div className="h-full grid grid-cols-12 gap-4 p-4">
          {/* Left section skeleton */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
            <div className="h-12 bg-muted/50 animate-pulse rounded-full" />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 animate-pulse rounded-2xl" />
              <div className="bg-muted/50 animate-pulse rounded-2xl" />
            </div>
          </div>
          {/* Right section skeleton */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
            <div className="flex-1 bg-muted/50 animate-pulse rounded-2xl" />
            <div className="flex-1 bg-muted/50 animate-pulse rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100dvh-84px)] md:h-[calc(100dvh-108px)] relative overflow-y-auto bg-linear-to-br from-background via-background to-muted/20 text-primary">
      {/* 12x12 Grid Layout */}
      <div className="h-full grid grid-cols-12 gap-4 p-4">
        {/* Left Section - 7 columns */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
          {/* Greeting */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium">{getGreeting()}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Two Equal Cards - Workout & Nutrition */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Workout Card */}
            <Card className="h-full border-2 hover:border-primary/30 transition-all duration-500 bg-linear-to-br from-card to-primary/5 overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <HugeiconsIcon
                        icon={Dumbbell01Icon}
                        className="w-4 h-4 text-primary"
                      />
                    </div>
                    <CardTitle className="text-lg">Workout</CardTitle>
                  </div>
                  {workoutData?.hasActivePlan && (
                    <Badge variant="outline" className="rounded-full text-xs">
                      W{workoutData.currentWeek} D{workoutData.currentDay}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="relative overflow-y-auto max-h-[calc(100%-5rem)]">
                {!workoutData?.hasActivePlan ? (
                  <div className="text-center py-12">
                    <HugeiconsIcon
                      icon={Dumbbell01Icon}
                      className="w-12 h-12 mx-auto mb-3 text-muted-foreground"
                    />
                    <p className="text-sm text-muted-foreground mb-3">
                      No active plan
                    </p>
                    <Button
                      onClick={() => router.push("/plans/workout")}
                      size="sm"
                      className="rounded-full"
                    >
                      <HugeiconsIcon
                        icon={Add01Icon}
                        className="w-3 h-3 mr-1"
                      />
                      Create Plan
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-muted/50">
                      <h3 className="font-bold text-base mb-0.5">
                        {workoutData.workout?.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {workoutData.planName}
                      </p>
                    </div>

                    {workoutData.workout?.warmup && (
                      <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                        <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mb-1 uppercase tracking-wider">
                          Warm-up
                        </p>
                        <p className="text-xs text-foreground/80">
                          {workoutData.workout.warmup}
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      {workoutData.workout?.exercises.map((exercise, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-all"
                        >
                          <p className="font-medium text-sm mb-1">
                            {exercise.name}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {exercise.sets && (
                              <Badge
                                variant="secondary"
                                className="rounded-full text-[10px] h-5"
                              >
                                {exercise.sets} sets
                              </Badge>
                            )}
                            {exercise.reps && (
                              <Badge
                                variant="secondary"
                                className="rounded-full text-[10px] h-5"
                              >
                                {exercise.reps} reps
                              </Badge>
                            )}
                            {exercise.duration && (
                              <Badge
                                variant="secondary"
                                className="rounded-full text-[10px] h-5"
                              >
                                {exercise.duration}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {workoutData.workout?.cooldown && (
                      <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                        <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">
                          Cool-down
                        </p>
                        <p className="text-xs text-foreground/80">
                          {workoutData.workout.cooldown}
                        </p>
                      </div>
                    )}

                    <Button
                      onClick={toggleWorkoutComplete}
                      className="w-full rounded-xl"
                      size="sm"
                      variant={workoutData.isCompleted ? "outline" : "default"}
                    >
                      {workoutData.isCompleted ? (
                        <>
                          <HugeiconsIcon
                            icon={CheckmarkCircle02Icon}
                            className="w-4 h-4 mr-1"
                          />
                          Completed
                        </>
                      ) : (
                        <>
                          <HugeiconsIcon
                            icon={CircleIcon}
                            className="w-4 h-4 mr-1"
                          />
                          Mark Complete
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Nutrition Card */}
            <Card className="h-full border-2 hover:border-green-500/30 transition-all duration-500 bg-linear-to-br from-card to-green-500/5 overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-green-500/10">
                      <HugeiconsIcon
                        icon={Apple01Icon}
                        className="w-4 h-4 text-green-600 dark:text-green-400"
                      />
                    </div>
                    <CardTitle className="text-lg">Nutrition</CardTitle>
                  </div>
                  {nutritionData?.hasActivePlan && (
                    <Dialog
                      open={mealDialogOpen}
                      onOpenChange={setMealDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-full h-8 w-8 p-0"
                        >
                          <HugeiconsIcon icon={Add01Icon} className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-2xl">
                        <DialogHeader>
                          <DialogTitle>Log a Meal</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Meal Type *</Label>
                            <Input
                              value={mealType}
                              onChange={(e) => setMealType(e.target.value)}
                              placeholder="Breakfast, Lunch..."
                              className="rounded-xl"
                            />
                          </div>
                          <div>
                            <Label>Meal Name</Label>
                            <Input
                              value={mealName}
                              onChange={(e) => setMealName(e.target.value)}
                              placeholder="What did you eat?"
                              className="rounded-xl"
                            />
                          </div>
                          <div>
                            <Label>Notes</Label>
                            <Textarea
                              value={mealNotes}
                              onChange={(e) => setMealNotes(e.target.value)}
                              placeholder="Optional notes..."
                              rows={3}
                              className="rounded-xl"
                            />
                          </div>
                          <Button
                            onClick={logMeal}
                            className="w-full rounded-xl"
                          >
                            Log Meal
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardHeader>

              <CardContent className="relative overflow-y-auto max-h-[calc(100%-5rem)]">
                {!nutritionData?.hasActivePlan ? (
                  <div className="text-center py-12">
                    <HugeiconsIcon
                      icon={Apple01Icon}
                      className="w-12 h-12 mx-auto mb-3 text-muted-foreground"
                    />
                    <p className="text-sm text-muted-foreground mb-3">
                      No active plan
                    </p>
                    <Button
                      size="sm"
                      onClick={() => router.push("/plans/nutrition")}
                      className="rounded-full"
                    >
                      <HugeiconsIcon
                        icon={Add01Icon}
                        className="w-3 h-3 mr-1"
                      />
                      Create Plan
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded-xl bg-linear-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20">
                        <p className="text-xl font-bold">
                          {nutritionData.targets?.calories}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          Calories
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-linear-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                        <p className="text-xl font-bold">
                          {nutritionData.targets?.protein}g
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          Protein
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-linear-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
                        <p className="text-xl font-bold">
                          {nutritionData.targets?.carbs}g
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          Carbs
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-linear-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                        <p className="text-xl font-bold">
                          {nutritionData.targets?.fats}g
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          Fats
                        </p>
                      </div>
                    </div>

                    {nutritionData.loggedMeals &&
                      nutritionData.loggedMeals.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            Recent Meals
                          </p>
                          <div className="space-y-1.5">
                            {nutritionData.loggedMeals
                              .slice(0, 3)
                              .map((meal) => (
                                <div
                                  key={meal.id}
                                  className="p-2 rounded-lg bg-muted/50 border border-border/50"
                                >
                                  <p className="font-medium text-sm">
                                    {meal.type}
                                  </p>
                                  {meal.name && (
                                    <p className="text-xs text-muted-foreground truncate">
                                      {meal.name}
                                    </p>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Section - 5 columns */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
          {/* Daily Overview Card */}
          <Card className="flex-1 border-2 hover:border-primary/20 transition-all duration-500 bg-linear-to-br from-card to-muted/10">
            <CardHeader>
              <CardTitle className="text-lg">Today&apos;s Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <HugeiconsIcon
                      icon={Dumbbell01Icon}
                      className="w-5 h-5 text-primary"
                    />
                    <Badge
                      variant={workoutData?.isCompleted ? "default" : "outline"}
                      className="text-[10px] h-5"
                    >
                      {workoutData?.isCompleted ? "Done" : "Pending"}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold">
                    {workoutData?.workout?.exercises.length || 0}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Exercises
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-linear-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <HugeiconsIcon
                      icon={Apple01Icon}
                      className="w-5 h-5 text-green-600 dark:text-green-400"
                    />
                    <Badge variant="outline" className="text-[10px] h-5">
                      {nutritionData?.loggedMeals?.length || 0}/3
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold">
                    {nutritionData?.targets?.calories || 0}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Cal Target
                  </p>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Workout Progress</p>
                    <p className="text-xs text-muted-foreground">
                      {workoutData?.isCompleted ? "100%" : "0%"}
                    </p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{
                        width: workoutData?.isCompleted ? "100%" : "0%",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Hydration Goal</p>
                    <p className="text-xs text-muted-foreground">
                      {hydrationData?.percentage || 0}%
                    </p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(hydrationData?.percentage || 0, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Quick Actions
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push("/ai-trainer/chat")}
                    className="rounded-xl text-xs h-9"
                  >
                    Ask AI Trainer
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push("/plans")}
                    className="rounded-xl text-xs h-9"
                  >
                    View Plans
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hydration Box - Second Half */}
          <Card className="flex-1 border-2 hover:border-primary/20 transition-all duration-500 bg-linear-to-br from-card to-primary/5 overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <HugeiconsIcon
                      icon={DropletIcon}
                      className="w-4 h-4 text-primary"
                    />
                  </div>
                  <CardTitle className="text-lg">Hydration</CardTitle>
                </div>
                <Dialog
                  open={targetDialogOpen}
                  onOpenChange={setTargetDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-full h-8 w-8 p-0"
                    >
                      <HugeiconsIcon
                        icon={Settings02Icon}
                        className="w-4 h-4"
                      />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-2xl">
                    <DialogHeader>
                      <DialogTitle>Set Daily Target</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Daily Target (ml)</Label>
                        <Input
                          type="number"
                          value={newTarget}
                          onChange={(e) => setNewTarget(e.target.value)}
                          placeholder="2000"
                          className="rounded-xl"
                        />
                      </div>
                      <Button
                        onClick={updateHydrationTarget}
                        className="w-full rounded-xl"
                      >
                        Update Target
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>

            <CardContent className="relative">
              <div className="space-y-4">
                {/* Circular progress */}
                <div className="relative flex items-center justify-center py-6">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="none"
                      className="text-muted/30"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - (hydrationData?.percentage || 0) / 100)}`}
                      className="text-primary transition-all duration-1000"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-4xl font-bold text-foreground">
                      {hydrationData?.percentage || 0}%
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {hydrationData?.totalConsumed || 0}ml
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Target: {hydrationData?.dailyTarget || 2000}ml
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addWater(250)}
                    className="rounded-xl"
                  >
                    +250ml
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addWater(500)}
                    className="rounded-xl"
                  >
                    +500ml
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addWater(1000)}
                    className="rounded-xl"
                  >
                    +1L
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
