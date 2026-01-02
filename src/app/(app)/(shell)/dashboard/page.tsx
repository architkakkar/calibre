"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Circle,
  Droplets,
  Dumbbell,
  UtensilsCrossed,
  Plus,
  Minus,
  Zap,
  Target,
  Award,
  Activity,
  Apple,
  Coffee,
  Moon,
  Sun,
  Heart,
  Sparkles,
} from "lucide-react";

// Motivational messages pool
const motivationalMessages = [
  "Every workout brings you closer to your goals! 💪",
  "Progress, not perfection. Keep pushing forward!",
  "Your only limit is you. Break through it today!",
  "Strong mind, strong body. You've got this!",
  "The pain you feel today will be the strength you feel tomorrow.",
  "One day or day one. You decide!",
  "Success starts with self-discipline.",
  "Don't stop when you're tired. Stop when you're done!",
  "Champions are made in the gym, legends are made in the mind!",
  "The only bad workout is the one that didn't happen!",
];

const getMotivationalMessage = () => {
  return motivationalMessages[
    Math.floor(Math.random() * motivationalMessages.length)
  ];
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return { greeting: "Good Morning", icon: Sun };
  if (hour < 17) return { greeting: "Good Afternoon", icon: Coffee };
  return { greeting: "Good Evening", icon: Moon };
};

// Circular Progress Component
function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = "text-primary",
  label,
  value,
  animated = true,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  value?: string;
  animated?: boolean;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${color} ${
            animated ? "transition-all duration-1000 ease-out" : ""
          }`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">
          {value || `${Math.round(percentage)}%`}
        </span>
        {label && (
          <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
        )}
      </div>
    </div>
  );
}

// Hydration Ball Component with enhanced visuals
function HydrationBall({
  current,
  target,
  compact = false,
}: {
  current: number;
  target: number;
  compact?: boolean;
}) {
  const percentage = Math.min((current / target) * 100, 100);
  const [showSplash, setShowSplash] = useState(false);
  const size = compact ? "w-24 h-24" : "w-32 h-32";

  useEffect(() => {
    if (percentage > 0) {
      setShowSplash(true);
      const timer = setTimeout(() => setShowSplash(false), 600);
      return () => clearTimeout(timer);
    }
  }, [current]);

  return (
    <div className={`relative ${size} mx-auto`}>
      {/* Outer glow effect */}
      <div
        className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse"
        style={{ opacity: percentage > 80 ? 0.5 : 0.2 }}
      />

      {/* Ball container */}
      <div className="absolute inset-2 rounded-full border-2 border-blue-500/30 overflow-hidden bg-gradient-to-br from-card to-muted shadow-lg">
        {/* Water fill with gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300 transition-all duration-700 ease-out"
          style={{ height: `${percentage}%` }}
        >
          {/* Animated waves */}
          <div className="absolute top-0 left-0 right-0 h-12">
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
            <svg
              className="absolute top-0 w-full h-8"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,60 Q150,80 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
                fill="rgba(255,255,255,0.15)"
                className="animate-[wave_3s_ease-in-out_infinite]"
              />
            </svg>
            <svg
              className="absolute top-2 w-full h-8"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,60 Q150,40 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
                fill="rgba(255,255,255,0.1)"
                className="animate-[wave_4s_ease-in-out_infinite]"
              />
            </svg>
          </div>

          {/* Bubbles */}
          {percentage > 20 && (
            <>
              <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-[rise_3s_ease-in_infinite]" />
              <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-white/30 rounded-full animate-[rise_4s_ease-in_infinite_0.5s]" />
              <div className="absolute bottom-1/2 left-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-[rise_2.5s_ease-in_infinite_1s]" />
            </>
          )}
        </div>

        {/* Glass shine effect */}
        <div className="absolute top-6 left-6 w-20 h-20 bg-white/30 rounded-full blur-2xl" />
        <div className="absolute top-1/3 right-6 w-12 h-12 bg-white/20 rounded-full blur-xl" />

        {/* Splash effect */}
        {showSplash && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-400/50 rounded-full animate-ping" />
          </div>
        )}
      </div>

      {/* Text overlay with glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5">
          <div className="text-2xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {current}L
          </div>
          <div className="text-[10px] text-white/90 drop-shadow-lg font-medium">
            of {target}L
          </div>
        </div>
      </div>

      {/* Droplets for empty state */}
      {percentage < 20 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Droplets className="size-12 text-blue-500/30 animate-bounce" />
        </div>
      )}

      {/* Celebration sparkles at 100% */}
      {percentage >= 100 && (
        <>
          <Sparkles className="absolute top-0 right-2 size-4 text-yellow-400 animate-pulse" />
          <Sparkles className="absolute bottom-2 left-0 size-3 text-yellow-400 animate-pulse delay-150" />
          <Sparkles className="absolute top-1/2 right-0 size-3 text-yellow-400 animate-pulse delay-300" />
        </>
      )}
    </div>
  );
}

// Celebration confetti component
function CelebrationEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-[confetti_2s_ease-out_forwards]"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
            backgroundColor: [
              "#f59e0b",
              "#10b981",
              "#3b82f6",
              "#8b5cf6",
              "#ec4899",
            ][Math.floor(Math.random() * 5)],
            animationDelay: `${Math.random() * 0.5}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [workoutStatus, setWorkoutStatus] = useState<"pending" | "completed">(
    "pending"
  );
  const [dietStatus, setDietStatus] = useState<"pending" | "completed">(
    "pending"
  );
  const [waterIntake, setWaterIntake] = useState(1.5);
  const [exercises, setExercises] = useState([
    { name: "Bench Press", sets: "3 sets × 10 reps", completed: false },
    { name: "Pull-ups", sets: "3 sets × 8 reps", completed: false },
    { name: "Dumbbell Rows", sets: "3 sets × 12 reps", completed: false },
    { name: "Dumbbell Rows", sets: "3 sets × 12 reps", completed: false },
    { name: "Dumbbell Rows", sets: "3 sets × 12 reps", completed: false },
    { name: "Shoulder Press", sets: "3 sets × 10 reps", completed: false },
  ]);
  const [showWorkoutCelebration, setShowWorkoutCelebration] = useState(false);
  const [showDietCelebration, setShowDietCelebration] = useState(false);

  const waterTarget = 3.5;
  const currentDate = new Date(2026, 0, 2); // January 2, 2026
  const { greeting, icon: GreetingIcon } = getTimeOfDay();

  const completedExercises = exercises.filter((e) => e.completed).length;
  const workoutProgress = (completedExercises / exercises.length) * 100;

  const incrementWater = () => {
    setWaterIntake((prev) => Math.min(prev + 0.25, waterTarget));
  };

  const decrementWater = () => {
    setWaterIntake((prev) => Math.max(prev - 0.25, 0));
  };

  const toggleExercise = (index: number) => {
    const newExercises = [...exercises];
    newExercises[index].completed = !newExercises[index].completed;
    setExercises(newExercises);
  };

  const handleWorkoutComplete = () => {
    const newStatus = workoutStatus === "completed" ? "pending" : "completed";
    setWorkoutStatus(newStatus);
    if (newStatus === "completed") {
      setShowWorkoutCelebration(true);
      setTimeout(() => setShowWorkoutCelebration(false), 2000);
    }
  };

  const handleDietComplete = () => {
    const newStatus = dietStatus === "completed" ? "pending" : "completed";
    setDietStatus(newStatus);
    if (newStatus === "completed") {
      setShowDietCelebration(true);
      setTimeout(() => setShowDietCelebration(false), 2000);
    }
  };

  const dailyCaloriesConsumed = 1850;
  const dailyCaloriesTarget = 2200;
  const proteinConsumed = 145;
  const proteinTarget = 180;

  return (
    <div className=" bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-secondary/5 rounded-full blur-2xl animate-pulse delay-1000" />

      {/* Main 12-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left Section - 7 columns */}
        <div className="lg:col-span-7 space-y-6">
          {/* Greeting & Motivation */}
          <div className="space-y-3">
            {/* Greeting with icon */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <GreetingIcon className="size-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {greeting}!
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                  {new Date(currentDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <div className="flex items-start gap-3">
                <Sparkles className="size-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium text-foreground/90">
                  {getMotivationalMessage()}
                </p>
              </div>
            </div>
          </div>

          {/* Workout & Diet Cards Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Workout Status - Enhanced */}
            <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all">
              {showWorkoutCelebration && <CelebrationEffect />}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md animate-pulse" />
                      <div className="relative p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30">
                        <Dumbbell className="size-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        Today's Workout
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                        <span>Upper Body Strength</span>
                        <span className="text-primary">•</span>
                        <span>45 mins</span>
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      workoutStatus === "completed" ? "default" : "outline"
                    }
                    className="text-xs"
                  >
                    {workoutStatus === "completed" ? (
                      <>
                        <CheckCircle2 className="size-3" /> Completed
                      </>
                    ) : (
                      "Pending"
                    )}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Progress Circle */}
                <div className="flex justify-center py-2">
                  <CircularProgress
                    percentage={workoutProgress}
                    size={80}
                    strokeWidth={6}
                    color="text-primary"
                    value={`${completedExercises}/${exercises.length}`}
                  />
                </div>

                {/* Exercise List */}
                <div className="space-y-2">
                  {exercises.map((exercise, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleExercise(idx)}
                      className={`group flex items-center justify-between p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        exercise.completed
                          ? "bg-primary/10 border-primary/30 hover:bg-primary/15"
                          : "bg-muted/30 border-muted hover:border-primary/20 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {exercise.completed ? (
                          <CheckCircle2 className="size-6 text-primary animate-[bounce_0.5s_ease-out]" />
                        ) : (
                          <Circle className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                        <div>
                          <span
                            className={`text-sm font-medium ${
                              exercise.completed
                                ? "line-through text-muted-foreground"
                                : ""
                            }`}
                          >
                            {exercise.name}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {exercise.sets}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full h-10 text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
                  variant={
                    workoutStatus === "completed" ? "outline" : "default"
                  }
                  onClick={handleWorkoutComplete}
                >
                  {workoutStatus === "completed" ? (
                    <>
                      <CheckCircle2 className="size-4" />
                      Workout Completed! 🎉
                    </>
                  ) : (
                    <>
                      <Zap className="size-4" />
                      Complete Full Workout
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Diet Status - Enhanced */}
            <Card className="relative overflow-hidden border-2 hover:border-secondary/50 transition-all">
              {showDietCelebration && <CelebrationEffect />}
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500/20 rounded-xl blur-md animate-pulse" />
                      <div className="relative p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/30">
                        <UtensilsCrossed className="size-5 text-green-500" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        Today's Nutrition
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        Track your meals and macros
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={dietStatus === "completed" ? "default" : "outline"}
                    className="text-xs"
                  >
                    {dietStatus === "completed" ? (
                      <>
                        <CheckCircle2 className="size-3" /> Logged
                      </>
                    ) : (
                      "Pending"
                    )}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Macro Progress - Circular */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <CircularProgress
                      percentage={
                        (dailyCaloriesConsumed / dailyCaloriesTarget) * 100
                      }
                      size={70}
                      strokeWidth={6}
                      color="text-green-500"
                      value={`${Math.round(
                        (dailyCaloriesConsumed / dailyCaloriesTarget) * 100
                      )}%`}
                    />
                    <div className="text-center">
                      <p className="text-[11px] text-muted-foreground font-medium">
                        Calories
                      </p>
                      <p className="text-xs font-semibold text-foreground">
                        {dailyCaloriesConsumed}/{dailyCaloriesTarget}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CircularProgress
                      percentage={(proteinConsumed / proteinTarget) * 100}
                      size={70}
                      strokeWidth={6}
                      color="text-blue-500"
                      value={`${proteinConsumed}g`}
                    />
                    <div className="text-center">
                      <p className="text-[11px] text-muted-foreground font-medium">
                        Protein
                      </p>
                      <p className="text-xs font-semibold text-foreground">
                        {proteinConsumed}/{proteinTarget}g
                      </p>
                    </div>
                  </div>
                </div>

                {/* Meal Tracker */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="group p-2.5 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-2 border-amber-500/20 hover:border-amber-500/40 transition-all cursor-pointer hover:scale-105">
                    <div className="flex flex-col items-center gap-1">
                      <Coffee className="size-5 text-amber-500 group-hover:animate-bounce" />
                      <div className="text-center">
                        <div className="text-sm font-bold text-foreground">
                          3
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          Breakfast
                        </div>
                        <div className="text-[10px] text-amber-600 font-medium mt-0.5">
                          650 cal
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group p-2.5 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-2 border-orange-500/20 hover:border-orange-500/40 transition-all cursor-pointer hover:scale-105">
                    <div className="flex flex-col items-center gap-1">
                      <Apple className="size-5 text-orange-500 group-hover:animate-bounce" />
                      <div className="text-center">
                        <div className="text-sm font-bold text-foreground">
                          2
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          Lunch
                        </div>
                        <div className="text-[10px] text-orange-600 font-medium mt-0.5">
                          750 cal
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group p-2.5 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-2 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer hover:scale-105">
                    <div className="flex flex-col items-center gap-1">
                      <Moon className="size-5 text-purple-500 group-hover:animate-bounce" />
                      <div className="text-center">
                        <div className="text-sm font-bold text-foreground">
                          3
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          Dinner
                        </div>
                        <div className="text-[10px] text-purple-600 font-medium mt-0.5">
                          450 cal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full h-10 text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
                  variant={dietStatus === "completed" ? "outline" : "default"}
                  onClick={handleDietComplete}
                >
                  {dietStatus === "completed" ? (
                    <>
                      <CheckCircle2 className="size-4" />
                      All Meals Logged! 🍽️
                    </>
                  ) : (
                    <>
                      <Apple className="size-4" />
                      Log All Meals
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Section - 5 columns */}
        <div className="lg:col-span-5 space-y-6">
          {/* Today's Progress Stats Card */}

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-2 border-purple-500/20 rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground font-medium">
                    Goal
                  </p>
                  <Target className="size-6 text-purple-500" />
                </div>
                <p className="text-2xl font-bold">80%</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500/20 rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground font-medium">
                    Calories
                  </p>
                  <Activity className="size-6 text-green-500" />
                </div>
                <p className="text-2xl font-bold">{dailyCaloriesConsumed}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-2 border-blue-500/20 rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground font-medium">
                    Heart Rate
                  </p>
                  <Heart className="size-6 text-blue-500" />
                </div>
                <p className="text-2xl font-bold">72</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-2 border-amber-500/20 rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground font-medium">
                    Active Time
                  </p>
                  <Award className="size-6 text-amber-500" />
                </div>
                <p className="text-2xl font-bold">2:15</p>
              </div>
            </div>
          </div>

          {/* Hydration Tracker Card */}
          <Card className="border-2 hover:border-blue-500/30 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-md animate-pulse" />
                  <div className="relative p-1.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/30">
                    <Droplets className="size-4 text-blue-500" />
                  </div>
                </div>
                <CardTitle className="text-sm">Hydration Tracker</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Center ball with percentage */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <HydrationBall
                    current={waterIntake}
                    target={waterTarget}
                    compact={true}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs font-bold text-blue-600">
                        {Math.round((waterIntake / waterTarget) * 100)}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-muted-foreground mt-2 font-medium">
                  {waterIntake.toFixed(2)}L of {waterTarget}L
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      (waterIntake / waterTarget) * 100,
                      100
                    )}%`,
                  }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse" />
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded bg-muted/50 text-center">
                  <div className="text-[10px] text-muted-foreground font-medium">
                    Remaining
                  </div>
                  <div className="text-xs font-bold mt-0.5">
                    {(waterTarget - waterIntake).toFixed(2)}L
                  </div>
                </div>
                <div className="p-2 rounded bg-blue-500/10 text-center">
                  <div className="text-[10px] text-muted-foreground font-medium">
                    Glasses
                  </div>
                  <div className="text-xs font-bold text-blue-600 mt-0.5">
                    {Math.round(waterIntake * 4)}
                  </div>
                </div>
              </div>

              {/* Quick add buttons */}
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 hover:scale-110 transition-transform hover:bg-blue-500/10 hover:border-blue-500/50"
                  onClick={decrementWater}
                  disabled={waterIntake <= 0}
                >
                  <Minus className="size-4" />
                </Button>
                <div className="text-center px-2.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-[9px] text-muted-foreground font-medium">
                    + 0.25L
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 hover:scale-110 transition-transform hover:bg-blue-500/10 hover:border-blue-500/50"
                  onClick={incrementWater}
                  disabled={waterIntake >= waterTarget}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
