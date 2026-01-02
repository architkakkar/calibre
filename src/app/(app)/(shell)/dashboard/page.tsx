import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Coins01Icon,
  ArrowRight01Icon,
  Dumbbell01Icon,
  SpoonAndKnifeIcon,
  Target03Icon,
  ArrowUpRight01Icon,
  AiChat02Icon,
  CheckmarkCircle02Icon,
  DropletIcon,
} from "@hugeicons/core-free-icons";

const DashboardPage = () => {
  const workout = [
    { id: 1, task: "Warmup & mobility", done: true },
    { id: 2, task: "Push day (upper)", done: true },
    { id: 3, task: "Core & stability", done: false },
    { id: 4, task: "Steady-state cardio", done: false },
    { id: 5, task: "Cool down & stretch", done: false },
  ];

  const diet = [
    { id: 1, task: "Oats + berries breakfast", done: true },
    { id: 2, task: "Hydration: 500ml AM", done: true },
    { id: 3, task: "Lean protein lunch", done: false },
    { id: 4, task: "Snack: nuts & yogurt", done: false },
    { id: 5, task: "Dinner: greens + fish", done: false },
  ];

  const aiPrompts = [
    "Why does hydration matter for recovery?",
    "Best post-workout meals for muscle gain",
  ];

  const hydrationGlasses = [
    { filled: true },
    { filled: true },
    { filled: true },
    { filled: false },
    { filled: false },
    { filled: false },
  ];

  return (
    <main className="grid min-h-0 flex-1 grid-cols-12 grid-rows-3 gap-3 lg:gap-4">
      {/* Motivational Quote - 6 cols, 1 row */}
      <section className="col-span-12 row-span-1 flex flex-col items-start justify-center rounded-xl border border-border/70 bg-card/25 p-5 shadow-sm lg:col-span-6 lg:p-6">
        <blockquote className="space-y-3">
          <p className="text-balance text-lg font-semibold leading-snug tracking-tight text-foreground lg:text-xl">
            &quot;Your body can stand almost anything. It&apos;s your mind that
            you have to convince.&quot;
          </p>
          <footer className="flex items-center gap-2 text-xs text-foreground/70">
            <span className="font-medium">— Unknown</span>
            <span className="text-border">•</span>
            <span>Daily motivation</span>
          </footer>
        </blockquote>
      </section>

      {/* AI Trainer - 6 cols, 2 rows */}
      <section className="col-span-12 row-span-1 hidden lg:flex flex-col rounded-xl border border-border/70 bg-card/30 p-4 shadow-sm lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
              <HugeiconsIcon
                icon={AiChat02Icon}
                className="size-4 text-primary"
              />
            </div>
            <h2 className="text-sm font-semibold">AI Trainer</h2>
          </div>
          <Button variant="ghost" size="icon-sm" className="size-7 rounded-lg">
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-3.5" />
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="mb-1 text-xs font-medium text-foreground/70">
            Suggested questions
          </p>
          {aiPrompts.map((prompt, i) => (
            <button
              key={i}
              className="rounded-lg border border-border/60 bg-card/30 px-3.5 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-card/50"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg border border-border/70 bg-card/40 px-3 py-2 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/15">
          <input
            type="text"
            placeholder="Ask anything about fitness..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/50"
          />
          <Button size="icon-sm" className="size-7 rounded-md">
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
          </Button>
        </div>
      </section>

      {/* Today's Workout - 3 cols, 2 rows */}
      <section className="col-span-12 row-span-1 flex flex-col rounded-xl border border-border/70 bg-card/30 p-4 shadow-sm sm:col-span-6 lg:col-span-3 lg:row-span-2 lg:row-start-2 lg:p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
            <HugeiconsIcon
              icon={Dumbbell01Icon}
              className="size-4 text-primary"
            />
          </div>
          <h2 className="text-sm font-semibold">Today&apos;s Workout</h2>
        </div>
        <ul className="flex flex-1 flex-col gap-1 overflow-auto scrollbar-hide">
          {workout.map((item) => (
            <li
              key={item.id}
              className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-card/50"
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  item.done
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/80 group-hover:border-primary/60"
                }`}
              >
                {item.done && (
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    className="size-3"
                  />
                )}
              </span>
              <span
                className={`text-sm text-foreground ${
                  item.done
                    ? "text-muted-foreground line-through"
                    : "font-medium"
                }`}
              >
                {item.task}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Today's Nutrition - 3 cols, 2 rows */}
      <section className="col-span-12 row-span-1 flex flex-col rounded-xl border border-border/70 bg-card/30 p-4 shadow-sm sm:col-span-6 lg:col-span-3 lg:col-start-4 lg:row-span-2 lg:row-start-2 lg:p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
            <HugeiconsIcon
              icon={SpoonAndKnifeIcon}
              className="size-4 text-primary"
            />
          </div>
          <h2 className="text-sm font-semibold">Today&apos;s Nutrition</h2>
        </div>
        <ul className="flex flex-1 flex-col gap-1 overflow-auto scrollbar-hide">
          {diet.map((item) => (
            <li
              key={item.id}
              className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-card/50"
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  item.done
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/80 group-hover:border-primary/60"
                }`}
              >
                {item.done && (
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    className="size-3"
                  />
                )}
              </span>
              <span
                className={`text-sm text-foreground ${
                  item.done
                    ? "text-muted-foreground line-through"
                    : "font-medium"
                }`}
              >
                {item.task}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Hydration Tracker - 3 cols, 1 row */}
      <section className="col-span-12 row-span-1 flex flex-col rounded-xl border border-border/70 bg-card/30 p-4 shadow-sm sm:col-span-6 lg:col-span-3 lg:col-start-7 lg:row-start-3 lg:p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-sky-500/10">
              <HugeiconsIcon
                icon={DropletIcon}
                className="size-4 text-sky-500"
              />
            </div>
            <h2 className="text-sm font-semibold">Hydration</h2>
          </div>
          <Badge
            variant="secondary"
            className="h-5 gap-1 rounded px-1.5 text-[10px] font-bold"
          >
            <HugeiconsIcon
              icon={Coins01Icon}
              className="size-2.5 text-amber-500"
            />
            +10
          </Badge>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2">
          {hydrationGlasses.map((glass, i) => (
            <button
              key={i}
              className={`group relative flex h-12 w-9 items-end justify-center rounded-b-lg rounded-t-sm border-2 transition-all lg:h-14 lg:w-10 ${
                glass.filled
                  ? "border-sky-400/60 bg-sky-400/15"
                  : "border-border/70 hover:border-sky-400/40 hover:bg-sky-400/5"
              }`}
            >
              {glass.filled && (
                <div className="absolute inset-x-0.5 bottom-0.5 top-1/3 rounded-b-md bg-sky-400/40" />
              )}
            </button>
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">3</span> of 6 glasses
          today
        </p>
      </section>

      {/* Goal Progress - 3 cols, 1 row */}
      <section className="col-span-12 row-span-1 flex flex-col rounded-xl border border-border/70 bg-linear-to-br from-card/40 via-card/20 to-secondary/10 p-4 shadow-sm sm:col-span-6 lg:col-span-3 lg:col-start-10 lg:row-start-3 lg:p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
            <HugeiconsIcon
              icon={Target03Icon}
              className="size-4 text-primary"
            />
          </div>
          <h2 className="text-sm font-semibold">Goal Progress</h2>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <p className="text-sm text-muted-foreground">
            You&apos;ll reach your goal by{" "}
            <span className="font-semibold text-foreground">May 12</span>
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-primary">65%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted/60">
              <div
                className="h-full rounded-full bg-linear-to-r from-primary to-primary/70 transition-all"
                style={{ width: "65%" }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
