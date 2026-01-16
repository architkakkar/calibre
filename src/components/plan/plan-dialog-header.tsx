import { PlanStepper } from "@/components/plan/plan-stepper";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

type PlanDialogHeaderProps = {
  title: string;
  description: string;
  steps: { key: string; label: string }[];
  currentStep: number;
};

export function PlanDialogHeader({
  title,
  description,
  steps,
  currentStep,
}: PlanDialogHeaderProps) {
  return (
    <header className="relative bg-linear-to-r from-primary/10 via-primary/5 to-transparent px-6 py-4 border-b border-border/50">
      <div className="mb-4">
        <DialogTitle className="text-2xl font-bold tracking-tight">
          {title}
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground mt-1">
          {description}
        </DialogDescription>
      </div>

      <PlanStepper steps={steps} currentStep={currentStep} />
    </header>
  );
}
