import { HugeiconsIcon } from "@hugeicons/react";
import { WavingHand01Icon } from "@hugeicons/core-free-icons";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const getMotivationalQuote = () => {
  const quotes = [
    "Every workout is progress, no matter how small.",
    "Your only limit is you.",
    "Success starts with self-discipline.",
    "Transform your body, transform your mind.",
    "One day or day one. You decide.",
    "Small steps every day lead to big changes.",
    "Your health is an investment, not an expense.",
    "Progress, not perfection.",
  ];
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000,
  );
  return quotes[dayOfYear % quotes.length];
};

export function Greeting() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-sm">
      <div className="absolute inset-0 bg-grid-white/5 mask-[radial-gradient(white,transparent_85%)]" />
      <div className="relative p-4 space-y-3">
        {/* Greeting Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            {getGreeting()}!{" "}
            <HugeiconsIcon
              icon={WavingHand01Icon}
              className="w-7 h-7 text-primary animate-[wave-hand_2s_infinite]"
            />
          </h1>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Motivational Quote */}
        <div className="pt-2 border-t border-primary/10">
          <p className="text-sm md:text-base text-muted-foreground italic">
            &ldquo;{getMotivationalQuote()}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
