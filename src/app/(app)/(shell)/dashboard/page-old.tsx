import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Coins01Icon,
  ArrowRight01Icon,
  Dumbbell01Icon,
  SpoonAndKnifeIcon,
  AiChat02Icon,
  CheckmarkCircle02Icon,
  DropletIcon,
  Award01Icon,
  Add01Icon,
} from "@hugeicons/core-free-icons";

const DashboardPage = () => {
  const todaysWorkout = [
    { id: 1, task: "Push day workout", time: "9:00 AM", done: true },
    { id: 2, task: "Core & abs routine", time: "6:00 PM", done: false },
  ];

  const todaysDiet = [
    { id: 1, task: "Protein-rich lunch", time: "1:00 PM", done: true },
    { id: 2, task: "Healthy dinner prep", time: "7:30 PM", done: false },
  ];

  const weeklyStats = [
    { label: "Workouts", value: "4/7", progress: 57 },
    { label: "Meals logged", value: "18/21", progress: 86 },
    { label: "Water intake", value: "12L/14L", progress: 86 },
  ];

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-4 lg:gap-5">
      {/* Welcome Section */}
      <section className="rounded-xl border border-border/40 bg-card/30 p-6 lg:p-8">
        <div className="mb-1 flex items-center gap-2">
          <Badge
            variant="secondary"
            className="rounded-full border-border/50 bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
          >
            Thursday, Jan 2
          </Badge>
        </div>
        <h1 className="mb-2 text-3xl font-black tracking-tight lg:text-4xl">
          Welcome back, Champ
        </h1>
        <p className="text-sm text-muted-foreground/80 lg:text-base">
          Track your daily progress and stay consistent. Your AI-powered fitness
          journey continues.
        </p>
      </section>

      {/* Today's Progress Grid */}
      <div className="grid flex-1 gap-4 lg:grid-cols-12 lg:gap-5">
        {/* Today's Workout */}
        <section className="flex flex-col rounded-xl border border-border/40 bg-card/30 p-5 lg:col-span-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-violet-500/15 p-1.5">
                <HugeiconsIcon
                  icon={Dumbbell01Icon}
                  className="size-4 text-violet-400"
                />
              </div>
              <h2 className="font-semibold">Today&apos;s Workout</h2>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            {todaysWorkout.map((task) => (
              <button
                key={task.id}
                className="group w-full rounded-lg border border-border/40 bg-background/40 p-3 text-left transition-all hover:border-border/60 hover:bg-background/60"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      task.done
                        ? "border-violet-500 bg-violet-500"
                        : "border-border/60 group-hover:border-violet-500/50"
                    }`}
                  >
                    {task.done && (
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        className="size-3 text-background"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        task.done
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {task.task}
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      {task.time}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2.5">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">2 of 4</span>{" "}
              tasks completed today
            </p>
          </div>
        </section>

        {/* Today's Diet */}
        <section className="flex flex-col rounded-xl border border-border/40 bg-card/30 p-5 lg:col-span-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-emerald-500/15 p-1.5">
                <HugeiconsIcon
                  icon={SpoonAndKnifeIcon}
                  className="size-4 text-emerald-400"
                />
              </div>
              <h2 className="font-semibold">Today&apos;s Nutrition</h2>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            {todaysDiet.map((task) => (
              <button
                key={task.id}
                className="group w-full rounded-lg border border-border/40 bg-background/40 p-3 text-left transition-all hover:border-border/60 hover:bg-background/60"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      task.done
                        ? "border-emerald-500 bg-emerald-500"
                        : "border-border/60 group-hover:border-emerald-500/50"
                    }`}
                  >
                    {task.done && (
                      <HugeiconsIcon
                        icon={CheckmarkCircle02Icon}
                        className="size-3 text-background"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        task.done
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {task.task}
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      {task.time}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2.5">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">18/21</span> meals
              logged this week
            </p>
          </div>
        </section>

        {/* Hydration */}
        <section className="flex flex-col rounded-xl border border-border/40 bg-card/30 p-5 lg:col-span-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-sky-500/15 p-1.5">
                <HugeiconsIcon
                  icon={DropletIcon}
                  className="size-4 text-sky-400"
                />
              </div>
              <h2 className="font-semibold">Hydration</h2>
            </div>
            <Badge
              variant="secondary"
              className="gap-1 rounded-full border-border/50 bg-muted/50 px-2 py-0.5"
            >
              <HugeiconsIcon
                icon={Coins01Icon}
                className="size-3 text-amber-500"
              />
              <span className="text-xs font-semibold">+10</span>
            </Badge>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="flex gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <button
                  key={i}
                  className={`group relative h-16 w-7 rounded-b-lg rounded-t-sm border-2 transition-all lg:h-20 lg:w-8 ${
                    i < 5
                      ? "border-sky-500/50 bg-sky-500/10"
                      : "border-border/40 hover:border-sky-500/30 hover:bg-sky-500/5"
                  }`}
                >
                  {i < 5 && (
                    <div className="absolute inset-x-0.5 bottom-0.5 top-1/4 rounded-b-md bg-sky-500/40" />
                  )}
                </button>
              ))}
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">5/8</p>
              <p className="text-xs text-muted-foreground/70">glasses today</p>
            </div>
          </div>

          <Button
            size="sm"
            className="w-full gap-2 rounded-lg bg-sky-500/15 text-sky-400 hover:bg-sky-500/20 hover:text-sky-300"
            variant="ghost"
          >
            <HugeiconsIcon icon={Add01Icon} className="size-3.5" />
            Log Water
          </Button>
        </section>
      </div>

      {/* Weekly Overview */}
      <section className="flex flex-col rounded-xl border border-border/40 bg-card/30 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-violet-500/15 p-1.5">
              <HugeiconsIcon
                icon={Award01Icon}
                className="size-4 text-violet-400"
              />
            </div>
            <h2 className="font-semibold">This Week</h2>
          </div>
          <Badge
            variant="secondary"
            className="gap-1 rounded-full border-border/50 bg-muted/50 px-2 py-0.5"
          >
            <HugeiconsIcon
              icon={Coins01Icon}
              className="size-3 text-amber-500"
            />
            <span className="text-xs font-semibold">+125</span>
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {weeklyStats.map((stat, i) => (
            <div key={i}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {stat.label}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">
                  {stat.value}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted/50">
                <div
                  className="h-full rounded-full bg-linear-to-r from-violet-500/70 to-violet-500/50 transition-all duration-500"
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-border/40 bg-muted/20 p-3 text-center">
          <p className="text-xs text-muted-foreground">
            You&apos;re{" "}
            <span className="font-semibold text-foreground">
              ahead of schedule
            </span>{" "}
            this week!
          </p>
        </div>
      </section>

      {/* AI Trainer Quick Access */}
      <section className="rounded-xl border border-border/40 bg-card/30 p-5 lg:p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/15 p-2">
              <HugeiconsIcon
                icon={AiChat02Icon}
                className="size-5 text-primary"
              />
            </div>
            <div>
              <h3 className="font-semibold">AI Trainer</h3>
              <p className="text-xs text-muted-foreground/70">
                Ask me anything about your fitness journey
              </p>
            </div>
          </div>
          <Button size="sm" className="gap-2 rounded-lg">
            Open Chat
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
          </Button>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
