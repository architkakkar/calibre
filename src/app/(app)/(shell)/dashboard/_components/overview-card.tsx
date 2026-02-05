"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FlashIcon,
  Dumbbell01Icon,
  Apple01Icon,
  DropletIcon,
} from "@hugeicons/core-free-icons";
import type { OverviewData } from "@/stores/dashboard.store";

interface OverviewCardProps {
  data: OverviewData | null;
}

export function OverviewCard({ data }: OverviewCardProps) {
  return (
    <Card className="flex-1 border border-border hover:border-primary/10 transition-all duration-500 bg-linear-to-br from-card to-primary/5 overflow-hidden group py-5">
      <CardHeader className="relative space-y-2 px-5">
        <CardTitle className="text-base leading-none">Overall Stats</CardTitle>
        <p className="text-xs text-muted-foreground">
          Your lifetime achievements
        </p>
      </CardHeader>

      <CardContent className="px-5 space-y-3">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Current Streak */}
          <div className="p-3 rounded-xl bg-linear-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-orange-500/10">
                <HugeiconsIcon
                  icon={FlashIcon}
                  className="w-4 h-4 text-orange-600 dark:text-orange-400"
                />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {data?.currentStreak || 0}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Day Streak
            </p>
          </div>

          {/* Total Workouts */}
          <div className="p-3 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <HugeiconsIcon
                  icon={Dumbbell01Icon}
                  className="w-4 h-4 text-primary"
                />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {data?.totalWorkoutsCompleted || 0}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Workouts
            </p>
          </div>

          {/* Total Meals */}
          <div className="p-3 rounded-xl bg-linear-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-green-500/10">
                <HugeiconsIcon
                  icon={Apple01Icon}
                  className="w-4 h-4 text-green-600 dark:text-green-400"
                />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {data?.totalMealsLogged || 0}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Meals Logged
            </p>
          </div>

          {/* Total Water */}
          <div className="p-3 rounded-xl bg-linear-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10">
                <HugeiconsIcon
                  icon={DropletIcon}
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {data?.totalWaterLiters || 0}
              <span className="text-sm font-normal text-muted-foreground ml-0.5">
                L
              </span>
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Water Total
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
