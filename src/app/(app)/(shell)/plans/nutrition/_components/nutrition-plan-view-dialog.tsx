"use client";

import { useState } from "react";
import { useNutritionPlanStore } from "@/stores/nutrition-plan.store";
import { NutritionPlanViewDialogSkeleton } from "./nutrition-plan-view-dialog-skeleton";
import { NutritionPlanViewDialogSidebar } from "./nutrition-plan-view-dialog-sidebar";
import { NutritionPlanViewDialogOverview } from "./nutrition-plan-view-dialog-overview";
import { NutritionPlanViewDialogContent } from "./nutrition-plan-view-dialog-content";
import { NutritionPlanViewDialogSubstitutionPanel } from "./nutrition-plan-view-dialog-substitution-panel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  RepeatIcon,
  Cancel01Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";

type NutritionPlanViewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NutritionPlanViewDialog({
  open,
  onOpenChange,
}: NutritionPlanViewDialogProps) {
  const { planDetails, selectedPlanId, activePlanId } = useNutritionPlanStore();
  const [viewMode, setViewMode] = useState<"overview" | "meals">("overview");
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<
    number | null
  >(null);
  const [substitutionsOpen, setSubstitutionsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActivePlan = selectedPlanId === activePlanId;

  if (!planDetails) {
    return (
      <NutritionPlanViewDialogSkeleton
        open={open}
        onOpenChange={onOpenChange}
      />
    );
  }

  const { meta, plan } = planDetails;

  const selectMeal = (templateIndex: number) => {
    setViewMode("meals");
    setSelectedTemplateIndex(templateIndex);
    // Close sidebar on mobile after selecting a meal
    setSidebarOpen(false);
  };

  const closeSidebar = () => setSidebarOpen(false);

  const currentMealTemplate =
    selectedTemplateIndex !== null
      ? plan.meals.templates[selectedTemplateIndex]
      : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="p-0 w-full sm:max-w-[95vw] md:max-w-[90vw] h-[95dvh] gap-0 bg-background flex flex-col overflow-hidden"
      >
        <DialogTitle hidden>{meta.planName}</DialogTitle>
        <DialogDescription hidden>{meta.planDescription}</DialogDescription>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-6 right-5 p-2 rounded-lg hover:bg-muted hover:text-foreground text-muted-foreground z-10 cursor-pointer focus-visible:outline-primary"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="h-4.5 w-4.5" />
        </button>

        <div className="flex flex-1 min-h-0">
          <NutritionPlanViewDialogSidebar
            meta={meta}
            plan={plan}
            isActivePlan={isActivePlan}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedTemplateIndex={selectedTemplateIndex}
            selectMeal={selectMeal}
            sidebarOpen={sidebarOpen}
            closeSidebar={closeSidebar}
          />
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            {/* Mobile sidebar toggle button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden absolute top-6 mt-1 left-5 p-2 rounded-lg bg-card hover:bg-muted text-foreground z-10 shadow-sm border border-border"
            >
              <HugeiconsIcon icon={Menu01Icon} className="h-5 w-5" />
            </button>

            {viewMode === "meals" &&
              plan.flexibility.substitutions &&
              plan.flexibility.substitutions.length > 0 && (
                <div className="absolute top-6 right-16 z-5">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSubstitutionsOpen(true)}
                    className="gap-2 text-primary"
                  >
                    <HugeiconsIcon icon={RepeatIcon} className="h-4 w-4" />
                    <span className="hidden xs:block">Substitutions</span>
                  </Button>
                </div>
              )}

            {viewMode === "overview" ? (
              <NutritionPlanViewDialogOverview plan={plan} />
            ) : (
              <NutritionPlanViewDialogContent
                currentMealTemplate={currentMealTemplate}
              />
            )}
          </div>
        </div>

        <NutritionPlanViewDialogSubstitutionPanel
          isOpen={substitutionsOpen}
          onClose={() => setSubstitutionsOpen(false)}
          substitutions={plan.flexibility.substitutions}
        />
      </DialogContent>
    </Dialog>
  );
}
