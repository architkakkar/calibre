import { PlanTemplate, FieldDefinition } from "@/lib/templates/plan-template";

export function buildPlanPayload(
  plan: PlanTemplate,
  values: Record<string, unknown>,
  isFieldVisible: (field: FieldDefinition) => boolean,
) {
  const payload: Record<string, unknown> = {};

  for (const step of plan.steps) {
    for (const field of step.fields) {
      if (!isFieldVisible(field)) continue;

      const value = values[field.key];

      if (value === undefined) continue;

      payload[field.key] = value;
    }
  }

  return payload;
}

export function deriveInitialValues(
  plan: PlanTemplate,
): Record<string, unknown> {
  const initialValues = plan.steps.reduce(
    (acc, step) => {
      step.fields.forEach((field) => {
        if (field.defaultValue !== undefined) {
          acc[field.key] = field.defaultValue;
        }
      });
      return acc;
    },
    {} as Record<string, unknown>,
  );

  return initialValues;
}
