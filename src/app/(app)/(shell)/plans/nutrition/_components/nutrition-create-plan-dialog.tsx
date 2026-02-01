"use client";

import { useState } from "react";
import { usePlanForm } from "@/hooks/use-plan-form";
import { useNutritionPlanStore } from "@/stores/nutrition-plan.store";
import { useGlobalStore } from "@/stores/global.store";
import { PlanDialogHeader } from "@/app/(app)/(shell)/plans/_components/plan-dialog-header";
import { PlanDialogFooter } from "@/app/(app)/(shell)/plans/_components/plan-dialog-footer";
import { PlanRenderer } from "@/app/(app)/(shell)/plans/_components/plan-renderer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ACTIVE_NUTRITION_PLAN } from "@/lib/templates";
import { validateFields as runValidation } from "@/lib/validators/plan.validator";
import {
  buildPlanPayload,
  deriveInitialValues,
} from "@/lib/domain/plan.helpers";
import { showToast } from "@/lib/client/toast";

type NutritionCreatePlanDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NutritionCreatePlanDialog({
  open,
  onOpenChange,
}: NutritionCreatePlanDialogProps) {
  const { createPlan } = useNutritionPlanStore();
  const { showLoader, hideLoader } = useGlobalStore.getState();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ACTIVE_NUTRITION_PLAN.steps.map((step) => ({
    key: String(step.step),
    label: step.label,
  }));

  const form = usePlanForm({
    initialValues: deriveInitialValues(ACTIVE_NUTRITION_PLAN),
  });

  const handleBack = () => {
    setCurrentStep((s) => Math.max(0, s - 1));
  };

  const handleNext = () => {
    const step = ACTIVE_NUTRITION_PLAN.steps[currentStep];
    const isValid = form.validateFields(step.fields);
    if (!isValid) return;

    setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
  };

  const handleSubmit = async () => {
    showLoader("Generating your nutrition plan...");

    for (let i = 0; i < ACTIVE_NUTRITION_PLAN.steps.length; i++) {
      const step = ACTIVE_NUTRITION_PLAN.steps[i];
      const isValid = form.validateFields(step.fields);

      if (!isValid) {
        setCurrentStep(i);
        return;
      }
    }

    const payload = buildPlanPayload(
      ACTIVE_NUTRITION_PLAN,
      form.getAllValues(),
      (field) => form.isFieldVisible?.(field) ?? true,
    );

    try {
      await createPlan({
        planTemplateId: ACTIVE_NUTRITION_PLAN.id,
        planTemplateVersion: ACTIVE_NUTRITION_PLAN.version,
        answers: payload,
      });
      showToast({
        type: "success",
        message: "Nutrition plan created successfully",
      });
    } catch (error) {
      console.error("Error creating nutrition plan:", error);
      showToast({
        type: "error",
        message: "Failed to create nutrition plan",
      });
    } finally {
      hideLoader();
    }

    form.reset(deriveInitialValues(ACTIVE_NUTRITION_PLAN));
    setCurrentStep(0);
    onOpenChange(false);
  };

  const currentStepFields =
    ACTIVE_NUTRITION_PLAN.steps[currentStep]?.fields ?? [];

  const isNextDisabled = (() => {
    const visibleFields = currentStepFields.filter((f) =>
      form.isFieldVisible?.(f),
    );

    const { isValid } = runValidation(visibleFields, form.getAllValues());

    return !isValid;
  })();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-y-8 overflow-hidden w-full sm:max-w-[95vw] md:max-w-[80vw] h-[95dvh] border border-border/50 shadow-2xl text-primary">
        <PlanDialogHeader
          title="Create Nutrition Plan"
          description="Answer a few quick questions to generate your personalized nutrition plan."
          steps={steps}
          currentStep={currentStep}
        />
        <PlanRenderer
          plan={ACTIVE_NUTRITION_PLAN}
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
