"use client";

import { useRouter } from "next/navigation";
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
import { useOnboardingStore } from "@/stores/onboarding.store";
import type { FitnessGoals } from "@/lib/validators/onboarding.validator";
import {
  getGoalOptions,
  getCommitmentOptions,
  getWeeklyFrequencyOptions,
  getMotivationOptions,
} from "@/lib/shared/helpers";
import { Required } from "@/components/common/required";

export default function FitnessGoalsPage() {
  const router = useRouter();
  const { goals, updateGoals, isFitnessGoalsComplete, completeOnboarding } =
    useOnboardingStore();
  const commitmentValue = goals.commitmentLevel ?? "";

  async function handleFinishSetup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const success = await completeOnboarding();
      if (success) {
        router.push("/dashboard");
      } else {
        alert("payload invalid");
      }
    } catch (error) {
      const err = error as Error;
      alert(err.message);
    }
  }

  return (
    <form onSubmit={handleFinishSetup} className="flex flex-col h-full">
      <header className="mb-8 flex flex-col items-start justify-between">
        <p className="text-sm text-muted-foreground self-end mb-2">
          Step 3 of 3
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-black leading-tight">
            Setup your Fitness Goals
          </h1>
          <p className="text-sm text-muted-foreground">
            Tell us what you want to achieve so we can tailor your plan.
          </p>
        </div>
      </header>
      <main className="space-y-8 mb-5">
        {/* Goals overview section  */}
        <section aria-labelledby="goals-overview-title" className="space-y-6">
          <div className="space-y-1">
            <h2 id="goals-overview-title" className="text-sm font-semibold">
              Goals Overview
            </h2>
            <p className="text-xs text-muted-foreground">
              What you want to primarily achieve
            </p>
          </div>
          <div className="space-y-2">
            <Label>
              <span className="shrink-0">
                Primary Goals <Required />
              </span>
              <span className="text-[11px] text-muted-foreground">
                (Select up to 3 goals that matter most to you)
              </span>
            </Label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {getGoalOptions().map((option) => {
                const isSelected = (goals.primaryGoals ?? []).includes(
                  option.value as FitnessGoals["primaryGoals"][number]
                );
                const isDisabled =
                  !isSelected && (goals.primaryGoals?.length ?? 0) >= 3;
                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      const prev = (goals.primaryGoals ??
                        []) as FitnessGoals["primaryGoals"];
                      const next = isSelected
                        ? prev.filter((g) => g !== option.value)
                        : [
                            ...prev,
                            option.value as FitnessGoals["primaryGoals"][number],
                          ];
                      updateGoals({ primaryGoals: next });
                    }}
                    className={cn(
                      "min-h-9 rounded-md border px-4 text-sm font-medium transition-colors",
                      "hover:bg-muted",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border",
                      isDisabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <Separator />

        {/* Target commitment section */}
        <section
          aria-labelledby="target-commitment-title"
          className="space-y-6"
        >
          <div className="space-y-1">
            <h2 id="target-commitment-title" className="text-sm font-semibold">
              Target & Commitment
            </h2>
            <p className="text-xs text-muted-foreground">
              Helps us calibrate intensity and expectations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetWeight">
                Target Weight <Required />
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="targetWeight"
                  type="number"
                  placeholder="70"
                  value={String(goals.targetWeightKg ?? "")}
                  onChange={(e) =>
                    updateGoals({
                      targetWeightKg: e.currentTarget.value
                        ? Number(e.currentTarget.value)
                        : undefined,
                    })
                  }
                  className="h-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  required
                />
                <div className="flex h-9 items-center rounded-md border border-input bg-muted px-3 text-sm font-medium text-muted-foreground">
                  kg
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>
                Commitment Level <Required />
              </Label>
              <Select
                value={commitmentValue}
                onValueChange={(v) =>
                  updateGoals({ commitmentLevel: v as FitnessGoals["commitmentLevel"] })
                }
              >
                <SelectTrigger className="h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getCommitmentOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <Separator />

        {/* Training preferences section */}
        <section
          aria-labelledby="training-preferences-title"
          className="space-y-6"
        >
          <div className="space-y-1">
            <h2
              id="training-preferences-title"
              className="text-sm font-semibold"
            >
              Training Preferences
            </h2>
            <p className="text-xs text-muted-foreground">
              Your availability and motivation
            </p>
          </div>

          <div className="space-y-2">
            <Label>
              <span className="shrink-0">
                Weekly Workout Frequency <Required />
              </span>
              <span className="text-[11px] text-muted-foreground">
                (Choose a frequency you can realistically maintain)
              </span>
            </Label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {getWeeklyFrequencyOptions().map((option) => {
                const isSelected = goals.weeklyFrequency === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      updateGoals({ weeklyFrequency: option.value })
                    }
                    className={cn(
                      "min-h-9 rounded-md border px-3 text-sm font-medium transition-colors",
                      "hover:bg-muted",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            <Label>
              <span className="shrink-0">
                Motivation <Required />
              </span>
              <span className="text-[11px] text-muted-foreground">
                (Select up to 3 reasons that motivate you to stay consistent)
              </span>
            </Label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {getMotivationOptions().map((option) => {
                const isSelected = (goals.motivations ?? []).includes(
                  option.value as FitnessGoals["motivations"][number]
                );
                const isDisabled =
                  !isSelected && (goals.motivations?.length ?? 0) >= 3;
                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      const prev = (goals.motivations ??
                        []) as FitnessGoals["motivations"];
                      const next = isSelected
                        ? prev.filter((m) => m !== option.value)
                        : [
                            ...prev,
                            option.value as FitnessGoals["motivations"][number],
                          ];
                      updateGoals({ motivations: next });
                    }}
                    className={cn(
                      "min-h-9 rounded-md border px-4 text-sm font-medium transition-colors",
                      "hover:bg-muted",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border",
                      isDisabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <Separator />

        {/* Additional notes section */}
        <section aria-labelledby="additional-notes-title" className="space-y-2">
          <Label id="additional-notes-title">
            Anything else we should know?
          </Label>
          <Textarea
            aria-labelledby="additional-notes-title"
            placeholder="Injuries, preferences, or specific goals (optional)"
            maxLength={255}
            value={goals.notes ?? ""}
            onChange={(e) => updateGoals({ notes: e.currentTarget.value })}
            className="h-32"
          />
        </section>
      </main>
      <footer className="sticky bottom-0 mt-auto -mx-6 md:-mx-10 border-t border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 px-6 md:px-10 py-4">
        <Button
          disabled={!isFitnessGoalsComplete}
          type="submit"
          className="w-full h-10 font-semibold cursor-pointer bg-primary/90 hover:bg-primary"
        >
          Finish Setup
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            strokeWidth={2.5}
            className="ml-2"
          />
        </Button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          You can also update this later from account settings
        </p>
      </footer>
    </form>
  );
}
