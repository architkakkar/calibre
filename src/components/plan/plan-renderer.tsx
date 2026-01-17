import { PlanTemplate } from "@/lib/templates/plan-template";
import { FieldRenderer } from "@/components/plan/field-renderer";

type PlanRendererProps = {
  plan: PlanTemplate;
  stepIndex: number;
};

export function PlanRenderer({ plan, stepIndex }: PlanRendererProps) {
  const step = plan.steps[stepIndex];

  if (!step) return null;

  return (
    <section className="px-6 space-y-6 h-[50dvh] max-h-[50dvh] overflow-y-auto">
      {step.fields.length === 0 && (
        <div className="text-sm text-muted-foreground italic">
          No fields defined for this step yet.
        </div>
      )}
      <div className="space-y-10">
        {step.fields.map((field) => (
          <FieldRenderer key={field.key} field={field} />
        ))}
      </div>
    </section>
  );
}
