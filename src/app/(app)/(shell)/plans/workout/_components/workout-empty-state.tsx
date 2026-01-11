import { Button } from "@/components/ui/button";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import {
  CheckCircle,
  Rocket01Icon,
  Target03Icon,
} from "@hugeicons/core-free-icons";

type CardData = {
  title: string;
  icon: IconSvgElement;
  points: string[];
};

const workoutCards: CardData[] = [
  {
    title: "Quick Start",
    icon: Rocket01Icon,
    points: [
      "Fill your workout preferences",
      "Generate your AI-crafted plan",
      "Follow your daily workouts",
    ],
  },
  {
    title: "How Calibre Helps?",
    icon: Target03Icon,
    points: [
      "Personalized to your fitness goals",
      "Structured weekly routine",
      "Clear day-by-day exercise breakdown",
    ],
  },
];

function Card({ card }: { card: CardData }) {
  const IconComponent = card.icon;

  return (
    <article className="group relative rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-lg transition-all duration-300 sm:min-w-xs">
      <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
      <div className="p-5 relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-2xl" />
            <div className="relative w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <HugeiconsIcon
                icon={IconComponent}
                strokeWidth={2}
                className="w-6 h-6 text-primary"
              />
            </div>
          </div>
          <h3 className="text-xl font-bold tracking-tight">{card.title}</h3>
        </div>
        <ul className="space-y-3 list-none">
          {card.points.map((point) => (
            <li key={point} className="flex items-center gap-3">
              <div className="mt-0.5 shrink-0">
                <HugeiconsIcon
                  icon={CheckCircle}
                  className="size-5 text-primary"
                />
              </div>
              <p className="text-sm text-foreground">{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function WorkoutEmptyState() {
  return (
    <div
      className="h-full w-full overflow-auto md:overflow-hidden relative flex items-start md:items-center justify-center"
      style={{
        background: `radial-gradient(circle, color-mix(in srgb, oklch(0.4346 0.0238 41.6194) 25%, transparent) 1.5px, transparent 1.5px)`,
        backgroundSize: "25px 25px",
        backgroundPosition: "0 0",
      }}
    >
      <section className="relative flex flex-col items-center justify-start p-6 md:p-12 max-w-5xl gap-12">
        <header className="text-center space-y-3 relative z-10">
          <h2 className="text-4xl font-bold tracking-tight">
            Build Your{" "}
            <span className="relative inline-block pb-2">
              Perfect Workout Plan
              <svg
                aria-hidden
                className="absolute left-0 right-0 bottom-0 h-4.5 w-full text-destructive"
                viewBox="0 0 120 16"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12 C40 2 80 14 118 12"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-base text-muted-foreground max-w-4xl">
            Get AI-powered guidance and stay consistent with a structured weekly
            routine tailored to your fitness goals.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full relative z-10">
          {workoutCards.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 w-full relative z-10">
          <Button className="px-8 py-4 text-base font-semibold relative z-10 shadow-md hover:shadow-lg transition-all duration-300">
            Create First Plan
          </Button>
          <footer className="text-center space-y-1 relative z-10">
            <p className="text-sm text-muted-foreground font-medium">
              Your first plan is free - no credit card required.
            </p>
            <p className="text-sm text-muted-foreground/80">
              We respect your privacy. Your information stays safe with Calibre.
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}
