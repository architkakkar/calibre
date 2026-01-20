import { Button } from "@/components/ui/button";

type PlanDialogFooterProps = {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isNextDisabled?: boolean;
};

export function PlanDialogFooter({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  isNextDisabled = false,
}: PlanDialogFooterProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="px-6 py-3 bg-muted/20 border-t border-border/50 flex items-center justify-end gap-3">
      {!isFirstStep && (
        <Button variant="outline" onClick={onBack} className="w-36 px-5">
          Back
        </Button>
      )}
      <div className="flex items-center gap-3">
        {!isLastStep && (
          <Button
            onClick={onNext}
            disabled={isNextDisabled}
            className="w-36 px-5 bg-linear-to-r from-primary to-primary/90 hover:shadow-lg transition-shadow"
          >
            Next
          </Button>
        )}
        {isLastStep && (
          <Button
            onClick={onSubmit}
            className="w-36 px-5 bg-linear-to-r from-primary to-primary/90 hover:shadow-lg transition-shadow"
          >
            Generate Plan
          </Button>
        )}
      </div>
    </div>
  );
}
