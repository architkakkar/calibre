"use client";

import { useState } from "react";
import { PlanDialogHeader } from "@/components/plan/plan-dialog-header";
import { PlanDialogFooter } from "@/components/plan/plan-dialog-footer";
import { PlanRenderer } from "@/components/plan/plan-renderer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ACTIVE_WORKOUT_PLAN } from "@/lib/templates";

type CreateWorkoutPlanDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateWorkoutPlanDialog({
  open,
  onOpenChange,
}: CreateWorkoutPlanDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { key: "strategy", label: "Strategy" },
    { key: "setup", label: "Setup" },
    { key: "preferences", label: "Preferences" },
    { key: "personalization", label: "Personalization" },
  ];

  const handleBack = () => {
    setCurrentStep((s) => Math.max(0, s - 1));
  };

  const handleNext = () => {
    setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
  };

  const handleSubmit = () => {
    alert("Workout Plan Generated!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-y-8 overflow-hidden min-w-[70vw] max-w-5xl border border-border/50 shadow-2xl text-primary">
        <PlanDialogHeader
          title="Create Workout Plan"
          description="Answer a few quick questions to generate your personalized workout plan."
          steps={steps}
          currentStep={currentStep}
        />
        <PlanRenderer plan={ACTIVE_WORKOUT_PLAN} stepIndex={currentStep} />
        <PlanDialogFooter
          currentStep={currentStep}
          totalSteps={steps.length}
          onBack={handleBack}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
