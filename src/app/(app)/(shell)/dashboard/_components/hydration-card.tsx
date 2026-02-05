"use client";

import { useState } from "react";
import type { TodayHydrationResponse as HydrationData } from "@/lib/validators/dashboard.validator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DropletIcon,
  Settings02Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

interface HydrationCardProps {
  data: HydrationData | null;
  onAddWater: (amount: number) => Promise<
    | {
        success: boolean;
        logId: string;
      }
    | undefined
  >;
  onUpdateTarget: (target: number) => Promise<{ success: boolean } | undefined>;
}

export function HydrationCard({
  data,
  onAddWater,
  onUpdateTarget,
}: HydrationCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTarget, setNewTarget] = useState("");

  const handleUpdateTarget = async () => {
    const target = parseInt(newTarget);
    await onUpdateTarget(target);
    setDialogOpen(false);
    setNewTarget("");
  };

  return (
    <Card className="flex-1 border border-border hover:border-primary/10 transition-all duration-500 bg-linear-to-br from-card to-primary/5 overflow-hidden group py-5 gap-2!">
      <CardHeader className="relative space-y-2 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <HugeiconsIcon
                icon={DropletIcon}
                className="w-5 h-5 text-primary"
              />
            </div>
            <div>
              <CardTitle className="text-base leading-none pb-0.5">
                Hydration
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Daily goal: {data?.dailyTargetMl || 2000}ml
              </p>
            </div>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full h-8 w-8 p-0 self-start"
              >
                <HugeiconsIcon icon={Settings02Icon} className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl text-foreground">
              <DialogHeader>
                <DialogTitle className="text-base">
                  Set Daily Target
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Daily Target (ml)</Label>
                  <Input
                    type="number"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    placeholder="2000"
                    className="rounded-lg mt-1"
                  />
                </div>
                <Button
                  onClick={handleUpdateTarget}
                  className="w-full rounded-lg"
                >
                  Update Target
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Progress: {data?.totalConsumedMl || 0}ml /{" "}
            {data?.dailyTargetMl || 2000}ml
          </span>
          {data && data.percentage >= 100 && (
            <Badge
              variant="secondary"
              className="rounded-full text-xs bg-green-500/10 text-green-600 border-green-500/20"
            >
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                className="w-3 h-3 mr-1"
              />
              Complete
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 relative overflow-y-auto max-h-full px-5 space-y-3">
        {/* Circular progress */}
        <div className="relative flex items-center justify-center py-4 mb-0">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/30"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - (data?.percentage || 0) / 100)}`}
              className="text-primary transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-foreground">
              {data?.percentage || 0}%
            </p>
            <p className="text-xs text-muted-foreground">
              {data?.totalConsumedMl || 0}ml
            </p>
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAddWater(250)}
            className="rounded-xl h-8 text-xs"
          >
            +250ml
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAddWater(500)}
            className="rounded-xl h-8 text-xs"
          >
            +500ml
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAddWater(1000)}
            className="rounded-xl h-8 text-xs"
          >
            +1L
          </Button>
        </div>

        {/* Water Log History */}
        {data && data.logs.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Today&apos;s Intake
            </p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {data.logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-muted/30 border border-border/50"
                >
                  <div className="flex items-center gap-1.5">
                    <HugeiconsIcon
                      icon={DropletIcon}
                      className="w-3 h-3 text-blue-500"
                    />
                    <span className="font-medium text-xs">
                      {log.amountMl}ml
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(log.loggedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
