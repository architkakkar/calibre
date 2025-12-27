"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/shared/utils";
import { format } from "date-fns";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function UserProfilePage() {
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [dob, setDob] = useState<Date | undefined>();

  console.log("user-profile page rendered");

  return (
    <form className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between">
        <div className="text-sm text-muted-foreground self-end mb-2">
          Step 2 of 3
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black leading-tight">
            Setup your Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Let&apos;s personalize your Calibre experience.
          </p>
        </div>
      </div>

      {/* Fields (scroll area handled by parent layout) */}
      <div className="space-y-8 mb-4">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">Personal Details</h2>
          <p className="text-xs text-muted-foreground">
            Basic information to personalize your experience
          </p>
        </div>
        {/* Row: First/Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input id="lastName" name="lastName" placeholder="Doe" required />
          </div>
        </div>

        {/* Row: DOB / Gender */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date of Birth *</Label>
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
                  onSelect={setDob}
                  className="rounded-md border shadow-sm"
                  captionLayout="dropdown"
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select name="gender" required>
              <SelectTrigger id="gender" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Prefer not to say">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <h2 className="text-sm font-semibold">Body Metrics</h2>
          <p className="text-xs text-muted-foreground">
            Used to tailor workouts and nutrition
          </p>
        </div>

        {/* Row: Height / Weight with unit badges */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height *</Label>
            <div className="flex items-center gap-2">
              <Input
                id="height"
                name="height"
                type="number"
                placeholder="175"
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
              />
              <div className="flex h-9 items-center rounded-md border border-input bg-muted px-3 text-sm font-medium text-muted-foreground">
                cm
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight *</Label>
            <div className="flex items-center gap-2">
              <Input
                id="weight"
                name="weight"
                type="number"
                placeholder="72"
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
              />
              <div className="flex h-9 items-center rounded-md border border-input bg-muted px-3 text-sm font-medium text-muted-foreground">
                kg
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <h2 className="text-sm font-semibold">Fitness Background</h2>
          <p className="text-xs text-muted-foreground">
            Helps us match your intensity and recovery
          </p>
        </div>

        {/* Daily Activity Level */}
        <div className="space-y-2">
          <Label htmlFor="activity">Daily Activity Level</Label>
          <Select name="activity" required>
            <SelectTrigger id="activity" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sedentary">
                Sedentary — little to no exercise
              </SelectItem>
              <SelectItem value="Lightly Active">
                Lightly Active — 1–3 workouts/week
              </SelectItem>
              <SelectItem value="Moderately Active">
                Moderately Active — 3–5 workouts/week
              </SelectItem>
              <SelectItem value="Very Active">
                Very Active — daily or intense training
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fitness Level */}
        <div className="space-y-2">
          <Label htmlFor="fitness">Fitness Level</Label>
          <Select name="fitness" required>
            <SelectTrigger id="fitness" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">
                Beginner — new or returning after a break
              </SelectItem>
              <SelectItem value="Intermediate">
                Intermediate — consistent training experience
              </SelectItem>
              <SelectItem value="Advanced">
                Advanced — structured, high-intensity training
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Sticky Footer CTA */}
      <div className="sticky bottom-0 mt-auto -mx-6 md:-mx-10 border-t border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 px-6 md:px-10 py-4">
        <Link href="/onboarding/fitness-goals">
          <Button
            type="submit"
            disabled={!isFormComplete}
            className="w-full h-10 font-semibold"
          >
            {isFormComplete ? "Continue" : "Complete required fields"}{" "}
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2.5}
              className="h-4 w-4"
            />
          </Button>
        </Link>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          You can update this later from profile settings
        </p>
      </div>
    </form>
  );
}
