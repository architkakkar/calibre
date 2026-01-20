"use client";

import { useState } from "react";
import { usePlanForm } from "@/hooks/use-plan-form";
import { PlanDialogHeader } from "@/components/plan/plan-dialog-header";
import { PlanDialogFooter } from "@/components/plan/plan-dialog-footer";
import { PlanRenderer } from "@/components/plan/plan-renderer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ACTIVE_WORKOUT_PLAN } from "@/lib/templates";
import { validateFields as runValidation } from "@/lib/validators/plan.validator";

type CreateWorkoutPlanDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateWorkoutPlanDialog({
  open,
  onOpenChange,
}: CreateWorkoutPlanDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ACTIVE_WORKOUT_PLAN.steps.map((step) => ({
    key: String(step.step),
    label: step.label,
  }));

  const form = usePlanForm({
    initialValues: ACTIVE_WORKOUT_PLAN.steps.reduce(
      (acc, step) => {
        step.fields.forEach((field) => {
          if (field.defaultValue !== undefined) {
            acc[field.key] = field.defaultValue;
          }
        });
        return acc;
      },
      {} as Record<string, unknown>,
    ),
  });

  const handleBack = () => {
    setCurrentStep((s) => Math.max(0, s - 1));
  };

  const handleNext = () => {
    const step = ACTIVE_WORKOUT_PLAN.steps[currentStep];
    const isValid = form.validateFields(step.fields);
    if (!isValid) return;

    setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
  };

  const handleSubmit = () => {
    alert("Workout Plan Generated!");
    onOpenChange(false);
  };

  const currentStepFields =
    ACTIVE_WORKOUT_PLAN.steps[currentStep]?.fields ?? [];

  const isNextDisabled = (() => {
    const visibleFields = currentStepFields.filter((f) =>
      form.isFieldVisible?.(f),
    );

    const { isValid } = runValidation(
      visibleFields,
      form.getAllValues(),
    );

    return !isValid;
  })();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-y-8 overflow-hidden min-w-[70vw] max-w-5xl border border-border/50 shadow-2xl text-primary">
        <PlanDialogHeader
          title="Create Workout Plan"
          description="Answer a few quick questions to generate your personalized workout plan."
          steps={steps}
          currentStep={currentStep}
        />
        <PlanRenderer
          plan={ACTIVE_WORKOUT_PLAN}
          stepIndex={currentStep}
          form={form}
        />
        <PlanDialogFooter
          currentStep={currentStep}
          totalSteps={steps.length}
          onBack={handleBack}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isNextDisabled={isNextDisabled}
        />
      </DialogContent>
    </Dialog>
  );
}
