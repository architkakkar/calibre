import { cn } from "@/lib/shared/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { RepeatIcon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { Substitution } from "@/lib/validators/workout-plan.validator";

type WorkoutPlanViewDialogSubstitutionPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  substitutions: Substitution[];
};

export function WorkoutPlanViewDialogSubstitutionPanel({
  isOpen,
  onClose,
  substitutions,
}: WorkoutPlanViewDialogSubstitutionPanelProps) {
  return (
    <div
      className={cn(
        "absolute top-0 right-0 h-full w-full sm:w-108 bg-background border-l border-border shadow-xl z-50 transition-transform duration-300 ease-out overflow-y-auto",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-5 z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <HugeiconsIcon
                icon={RepeatIcon}
                className="h-5 w-5 text-primary"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Exercise Alternatives
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Alternative exercises for your workout
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Can&apos;t perform an exercise? Use these alternatives that target the
          same movement patterns and muscle groups. These substitutions maintain
          the program&apos;s effectiveness while accommodating your available
          equipment or physical limitations.
        </p>

        <div className="grid gap-4">
          {substitutions.map((sub, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border bg-card/30 border-primary/30"
            >
              <div className="flex items-start gap-3 mb-4 pb-4 border-b border-primary/30">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 text-primary font-semibold shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base text-foreground mb-2 capitalize">
                    {sub.exercise}
                  </h3>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20 font-medium text-xs capitalize"
                  >
                    {sub.movementPattern}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Alternative Exercises
                </p>
                <div className="space-y-2">
                  {sub.alternatives.map((alt, altIdx) => (
                    <div
                      key={altIdx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-primary/10"
                    >
                      <span className="text-primary mt-0.5 font-semibold">
                        {altIdx + 1}.
                      </span>
                      <span className="text-sm text-foreground/90 leading-relaxed">
                        {alt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
