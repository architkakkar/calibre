import {
  Dumbbell01Icon,
  SpoonAndKnifeIcon,
  AiChat02Icon,
  Award01Icon,
} from "@hugeicons/core-free-icons";
import { FlipCard } from "./flip-card";
import { WorkoutVisual } from "./visuals/workout-visual";
import { DietVisual } from "./visuals/diet-visual";
import { AITrainerVisual } from "./visuals/ai-trainer-visual";
import { RewardsVisual } from "./visuals/rewards-visual";

export function FeaturesGrid() {
  const features = [
    {
      icon: Dumbbell01Icon,
      title: "Smart Workouts",
      description:
        "AI-tailored plans that adapt to your fitness level and goals.",
      badges: ["Auto-progression", "Custom routines"],
      visual: <WorkoutVisual />,
    },
    {
      icon: SpoonAndKnifeIcon,
      title: "Nutrition Plans",
      description:
        "Personalized nutrition guidance aligned with your workout routine.",
      badges: ["Load-aware macros", "Adaptive meals"],
      visual: <DietVisual />,
    },
    {
      icon: AiChat02Icon,
      title: "AI Trainer",
      description:
        "24/7 interactive coaching to answer questions and keep you motivated.",
      badges: ["Context-aware", "Plan-linked", "Ask anything"],
      visual: <AITrainerVisual />,
    },
    {
      icon: Award01Icon,
      title: "Streaks & Rewards",
      description:
        "Earn coins, build streaks, and unlock achievements as you progress.",
      badges: ["Coins & perks", "Daily streaks", "Badge drops"],
      visual: <RewardsVisual />,
    },
  ];

  return (
    <div className="col-span-6 row-span-2 grid grid-cols-2 grid-rows-2 gap-4">
      {features.map((feature) => (
        <FlipCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          badges={feature.badges}
          visual={feature.visual}
        />
      ))}
    </div>
  );
}
