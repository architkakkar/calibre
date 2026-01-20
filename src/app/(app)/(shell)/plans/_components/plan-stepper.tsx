type PlanStepperProps = {
  steps: { key: string; label: string }[];
  currentStep: number;
};

export function PlanStepper({ steps, currentStep }: PlanStepperProps) {
  return (
    <>
      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-xs font-medium text-foreground">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-primary to-primary/80 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Step Labels */}
      <ol className="flex items-center justify-between w-full gap-1">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <li
              key={step.key}
              className="flex-1 flex flex-col items-center gap-1"
            >
              {/* Step Circle */}
              <div
                className={[
                  "relative z-10 flex h-5 w-5 items-center justify-center rounded-full text-2xs font-semibold transition-all duration-300",
                  isCompleted
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : isActive
                    ? "bg-primary text-primary-foreground border-2 border-primary shadow-lg shadow-primary/30"
                    : "bg-muted text-muted-foreground border border-border/50",
                ].join(" ")}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              {/* Label */}
              <span
                className={[
                  "text-xs font-medium text-center line-clamp-1 transition-colors duration-300",
                  isActive
                    ? "text-foreground"
                    : isCompleted
                    ? "text-primary/70"
                    : "text-muted-foreground",
                ].join(" ")}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </>
  );
}
