import { cn } from "@/lib/shared/utils";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { RepeatIcon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { Substitution } from "@/lib/validators/nutrition-plan.validator";

type NutritionPlanViewDialogSubstitutionPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  substitutions: Substitution[];
};

export function NutritionPlanViewDialogSubstitutionPanel({
  isOpen,
  onClose,
  substitutions,
}: NutritionPlanViewDialogSubstitutionPanelProps) {
  return (
    <div
      className={cn(
        "absolute top-0 right-0 h-full w-full sm:w-108 bg-background border-l border-border shadow-xl z-30 transition-transform duration-300 ease-out overflow-y-auto",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-5 z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-green-500/10">
              <HugeiconsIcon
                icon={RepeatIcon}
                className="h-5 w-5 text-green-500"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Food Substitutions
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Alternative food options for your meals
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
          Can&apos;t find a specific ingredient? Use these substitutions that
          maintain similar nutritional profiles and fit your dietary
          preferences.
        </p>

        <div className="grid gap-4">
          {substitutions.map((sub, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border bg-card/30 border-green-500/30"
            >
              <div className="flex items-start gap-3 mb-4 pb-4 border-b border-green-500/30">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 font-semibold shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base text-foreground mb-2">
                    {sub.category}
                  </h3>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Swap Options
                </p>
                <div className="space-y-2">
                  {sub.swapOptions.map((option, optIdx) => (
                    <div
                      key={optIdx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-green-500/10"
                    >
                      <span className="text-green-500 mt-0.5 font-semibold">
                        {optIdx + 1}.
                      </span>
                      <span className="text-sm text-foreground/90 leading-relaxed">
                        {option}
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
