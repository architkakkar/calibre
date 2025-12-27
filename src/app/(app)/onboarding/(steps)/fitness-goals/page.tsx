"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/shared/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export default function FitnessGoalsPage() {
  const [primaryGoals, setPrimaryGoals] = useState<string[]>([]);
  const [motivations, setMotivations] = useState<string[]>([]);
  const [weeklyFrequency, setWeeklyFrequency] = useState<string | null>(null);

  return (
    <form className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between">
        <div className="text-sm text-muted-foreground self-end mb-2">
          Step 3 of 3
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black leading-tight">
            Setup your Fitness Goals
          </h1>
          <p className="text-sm text-muted-foreground">
            Tell us what you want to achieve so we can tailor your plan.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8 mb-5">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">Goals Overview</h2>
          <p className="text-xs text-muted-foreground">
            What you want to primarily achieve
          </p>
        </div>

        <div className="space-y-2">
          <Label>
            <span className="shrink-0">Primary Goals *</span>
            <span className="text-[11px] text-muted-foreground">
              (Select up to 3 goals that matter most to you)
            </span>
          </Label>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Build Muscle",
              "Lose Fat",
              "Gain Weight",
              "Increase Strength",
              "Improve Endurance",
              "Maintain Fitness",
              "Improve Mobility",
              "Athletic Performance",
            ].map((goal) => {
              const isSelected = primaryGoals.includes(goal);
              const isDisabled = !isSelected && primaryGoals.length >= 3;

              return (
                <button
                  key={goal}
                  type="button"
                  disabled={isDisabled}
                  onClick={() =>
                    setPrimaryGoals((prev) =>
                      isSelected
                        ? prev.filter((g) => g !== goal)
                        : [...prev, goal]
                    )
                  }
                  className={cn(
                    "min-h-9 rounded-md border px-4 text-sm font-medium transition-colors",
                    "hover:bg-muted",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border",
                    isDisabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {goal}
                </button>
              );
            })}
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <h2 className="text-sm font-semibold">Target & Commitment</h2>
          <p className="text-xs text-muted-foreground">
            Helps us calibrate intensity and expectations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="targetWeight">Target Weight</Label>
            <div className="flex items-center gap-2">
              <Input
                id="targetWeight"
                type="number"
                placeholder="70"
                className="h-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div className="flex h-9 items-center rounded-md border border-input bg-muted px-3 text-sm font-medium text-muted-foreground">
                kg
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Commitment Level</Label>
            <Select>
              <SelectTrigger className="h-9 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low — easy & flexible</SelectItem>
                <SelectItem value="Moderate">
                  Moderate — balanced routine
                </SelectItem>
                <SelectItem value="High">
                  High — disciplined & intense
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <h2 className="text-sm font-semibold">Training Preferences</h2>
          <p className="text-xs text-muted-foreground">
            Your availability and motivation
          </p>
        </div>

        <div className="space-y-2">
          <Label>
            <span className="shrink-0">Weekly Workout Frequency *</span>
            <span className="text-[11px] text-muted-foreground">
              (Choose a frequency you can realistically maintain)
            </span>
          </Label>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "2–3 days", value: "2-3" },
              { label: "3–4 days", value: "3-4" },
              { label: "4–5 days", value: "4-5" },
              { label: "6+ days", value: "6+" },
            ].map(({ label, value }) => {
              const isSelected = weeklyFrequency === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setWeeklyFrequency(value)}
                  className={cn(
                    "min-h-9 rounded-md border px-3 text-sm font-medium transition-colors",
                    "hover:bg-muted",
                    isSelected ? "border-primary bg-primary/5" : "border-border"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label>
            <span className="shrink-0">Motivation *</span>
            <span className="text-[11px] text-muted-foreground">
              (Select up to 3 reasons that motivate you to stay consistent)
            </span>
          </Label>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Improve Health",
              "Look Better",
              "Build Confidence",
              "Increase Energy",
              "Reduce Stress",
              "Mental Wellbeing",
              "Prepare for Event",
              "Lifestyle Change",
            ].map((item) => {
              const isSelected = motivations.includes(item);
              const isDisabled = !isSelected && motivations.length >= 3;

              return (
                <button
                  key={item}
                  type="button"
                  disabled={isDisabled}
                  onClick={() =>
                    setMotivations((prev) =>
                      isSelected
                        ? prev.filter((m) => m !== item)
                        : [...prev, item]
                    )
                  }
                  className={cn(
                    "min-h-9 rounded-md border px-4 text-sm font-medium transition-colors",
                    "hover:bg-muted",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border",
                    isDisabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Notes */}
        <div className="space-y-2">
          <Label>Anything else we should know?</Label>
          <Textarea
            placeholder="Injuries, preferences, or specific goals (optional)"
            maxLength={255}
            className="h-32"
          />
        </div>
      </div>

      {/* Footer CTA */}
      <div className="sticky bottom-0 mt-auto -mx-6 md:-mx-10 border-t border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 px-6 md:px-10 py-4">
        <Link href="/dashboard">
          <Button
            disabled={
              primaryGoals.length === 0 ||
              motivations.length === 0 ||
              !weeklyFrequency
            }
            className="w-full h-10 font-semibold bg-primary/90 hover:bg-primary"
          >
            Finish Setup
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2.5}
              className="ml-2"
            />
          </Button>
        </Link>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          You can update your goals anytime from settings
        </p>
      </div>
    </form>
  );
}
