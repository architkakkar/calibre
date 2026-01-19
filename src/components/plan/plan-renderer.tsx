import { useMemo } from "react";
import { PlanTemplate } from "@/lib/templates/plan-template";
import { FieldRenderer } from "@/components/plan/field-renderer";
import { usePlanForm } from "@/hooks/use-plan-form";

type PlanRendererProps = {
  plan: PlanTemplate;
  stepIndex: number;
};

export function PlanRenderer({ plan, stepIndex }: PlanRendererProps) {
  const initialValues = useMemo(() => {
    const values: Record<string, unknown> = {};

    for (const step of plan.steps) {
      for (const field of step.fields) {
        if (field.defaultValue !== undefined) {
          values[field.key] = field.defaultValue;
        }
      }
    }

    return values;
  }, [plan]);

  const form = usePlanForm({ initialValues });

  const step = useMemo(() => plan.steps[stepIndex], [plan, stepIndex]);
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
          <FieldRenderer key={field.key} field={field} form={form} />
        ))}
      </div>
    </section>
  );
}
