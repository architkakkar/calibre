"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/shared/utils";
import { format } from "date-fns";
import type { UserProfile } from "@/lib/validators/onboarding.validator";
import { useOnboardingStore } from "@/stores/onboarding.store";
import { APP_NAME } from "@/lib/shared/constants";
import {
  getGenderOptions,
  getActivityLevelOptions,
  getFitnessLevelOptions,
} from "@/lib/domain/onboarding.helpers";
import { Required } from "@/components/common/required";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserProfilePage() {
  const router = useRouter();
  const { profile, updateProfile, isUserProfileComplete } =
    useOnboardingStore();
  const dob = profile.dobIso ? new Date(profile.dobIso) : undefined;
  const genderValue = profile.gender ?? "";
  const activityValue = profile.activityLevel ?? "";
  const fitnessValue = profile.fitnessLevel ?? "";

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUserProfileComplete) {
      return;
    }

    router.push("/onboarding/fitness-goals");
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col h-full">
      <header className="flex flex-col items-start justify-between mb-8">
        <p className="self-end mb-2 text-sm text-muted-foreground">
          Step 2 of 3
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-black leading-tight">
            Setup your Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Let&apos;s personalize your {APP_NAME} experience.
          </p>
        </div>
      </header>
      <main className="mb-4 space-y-8">
        {/* Personal details section */}
        <section aria-labelledby="personal-details-title" className="space-y-6">
          <div className="space-y-1">
            <h2 id="personal-details-title" className="text-sm font-semibold">
              Personal Details
            </h2>
            <p className="text-xs text-muted-foreground">
              Basic information to personalize your experience
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <Required />
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                value={profile.firstName ?? ""}
                onChange={(e) => updateProfile({ firstName: e.target.value })}
                min={1}
                max={100}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <Required />
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={profile.lastName ?? ""}
                onChange={(e) => updateProfile({ lastName: e.target.value })}
                min={1}
                max={100}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Date of Birth <Required />
              </Label>
              <Popover>
                <PopoverTrigger
                  className={cn(
                    "flex w-full h-9 items-center justify-between rounded-md border border-input bg-input/30 px-3 py-2 text-sm font-normal shadow-sm transition-colors",
                    "hover:bg-input/50",
                    !dob && "text-muted-foreground"
                  )}
                >
                  <span>{dob ? format(dob, "P") : "Select date"}</span>
                  <HugeiconsIcon icon={Calendar03Icon} size={18} />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dob}
                    onSelect={(d) =>
                      updateProfile({ dobIso: d ? d.toISOString() : undefined })
                    }
                    className="border rounded-md shadow-sm"
                    captionLayout="dropdown"
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">
                Gender <Required />
              </Label>
              <Select
                name="gender"
                value={genderValue}
                onValueChange={(v) =>
                  updateProfile({ gender: v as UserProfile["gender"] })
                }
                required
              >
                <SelectTrigger id="gender" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getGenderOptions().map((option) => (
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

        {/* Body metrics section */}
        <section aria-labelledby="body-metrics-title" className="space-y-6">
          <div className="space-y-1">
            <h2 id="body-metrics-title" className="text-sm font-semibold">
              Body Metrics
            </h2>
            <p className="text-xs text-muted-foreground">
              Used to tailor workouts and nutrition
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">
                Height <Required />
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="height"
                  name="height"
                  type="number"
                  placeholder="175"
                  value={String(profile.heightCm ?? "")}
                  onChange={(e) =>
                    updateProfile({
                      heightCm: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  required
                />
                <div className="flex items-center px-3 text-sm font-medium border rounded-md h-9 border-input bg-muted text-muted-foreground">
                  cm
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">
                Weight <Required />
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  placeholder="72"
                  value={String(profile.weightKg ?? "")}
                  onChange={(e) =>
                    updateProfile({
                      weightKg: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  required
                />
                <div className="flex items-center px-3 text-sm font-medium border rounded-md h-9 border-input bg-muted text-muted-foreground">
                  kg
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Fitness background section */}
        <section
          aria-labelledby="fitness-background-title"
          className="space-y-6"
        >
          <div className="space-y-1">
            <h2 id="fitness-background-title" className="text-sm font-semibold">
              Fitness Background
            </h2>
            <p className="text-xs text-muted-foreground">
              Helps us match your intensity and recovery
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="activity">
              Daily Activity Level <Required />
            </Label>
            <Select
              name="activityLevel"
              value={activityValue}
              onValueChange={(v) =>
                updateProfile({
                  activityLevel: v as UserProfile["activityLevel"],
                })
              }
              required
            >
              <SelectTrigger id="activityLevel" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getActivityLevelOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fitness">
              Fitness Level <Required />
            </Label>
            <Select
              name="fitness"
              value={fitnessValue}
              onValueChange={(v) =>
                updateProfile({
                  fitnessLevel: v as UserProfile["fitnessLevel"],
                })
              }
              required
            >
              <SelectTrigger id="fitness" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getFitnessLevelOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>
      </main>
      <footer className="sticky bottom-0 px-6 py-4 mt-auto -mx-6 border-t md:-mx-10 border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 md:px-10">
        <Button
          type="submit"
          disabled={!isUserProfileComplete}
          className="w-full h-10 font-semibold cursor-pointer"
        >
          <span>Continue</span>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            strokeWidth={2.5}
            className="w-4 h-4"
          />
        </Button>
        <p className="mt-2 text-xs text-center text-muted-foreground">
          You can also update this later from account settings
        </p>
      </footer>
    </form>
  );
}
