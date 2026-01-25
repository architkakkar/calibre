"use client";

import { useState } from "react";
import { usePlanForm } from "@/hooks/use-plan-form";
import { useGlobalStore } from "@/stores/global.store";
import { createWorkoutPlanApi } from "@/lib/client/api/workout-plan.api";
import { PlanDialogHeader } from "@/app/(app)/(shell)/plans/_components/plan-dialog-header";
import { PlanDialogFooter } from "@/app/(app)/(shell)/plans/_components/plan-dialog-footer";
import { PlanRenderer } from "@/app/(app)/(shell)/plans/_components/plan-renderer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ACTIVE_WORKOUT_PLAN } from "@/lib/templates";
import { validateFields as runValidation } from "@/lib/validators/plan.validator";
import {
  buildPlanPayload,
  deriveInitialValues,
} from "@/lib/domain/plan.helpers";
import { showToast } from "@/lib/client/toast";

type CreateWorkoutPlanDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateWorkoutPlanDialog({
  open,
  onOpenChange,
}: CreateWorkoutPlanDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { showLoader, hideLoader } = useGlobalStore.getState();

  const steps = ACTIVE_WORKOUT_PLAN.steps.map((step) => ({
    key: String(step.step),
    label: step.label,
  }));

  const form = usePlanForm({
    initialValues: deriveInitialValues(ACTIVE_WORKOUT_PLAN),
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

  const handleSubmit = async () => {
    showLoader("Generating your workout plan...");

    for (let i = 0; i < ACTIVE_WORKOUT_PLAN.steps.length; i++) {
      const step = ACTIVE_WORKOUT_PLAN.steps[i];
      const isValid = form.validateFields(step.fields);

      if (!isValid) {
        setCurrentStep(i);
        return;
      }
    }

    const payload = buildPlanPayload(
      ACTIVE_WORKOUT_PLAN,
      form.getAllValues(),
      (field) => form.isFieldVisible?.(field) ?? true,
    );

    try {
      await createWorkoutPlanApi({
        planTemplateId: ACTIVE_WORKOUT_PLAN.id,
        planTemplateVersion: ACTIVE_WORKOUT_PLAN.version,
        answers: payload,
      });
      showToast({
        type: "success",
        message: "Workout plan created successfully",
      });
    } catch (error) {
      console.error("Error creating workout plan:", error);
      showToast({
        type: "error",
        message: "Failed to create workout plan",
      });
    } finally {
      hideLoader();
    }

    form.reset(deriveInitialValues(ACTIVE_WORKOUT_PLAN));
    setCurrentStep(0);
    onOpenChange(false);
  };

  const currentStepFields =
    ACTIVE_WORKOUT_PLAN.steps[currentStep]?.fields ?? [];

  const isNextDisabled = (() => {
    const visibleFields = currentStepFields.filter((f) =>
      form.isFieldVisible?.(f),
    );

    const { isValid } = runValidation(visibleFields, form.getAllValues());

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
