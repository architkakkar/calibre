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

export function assertPlanTemplateVersion({
  plan,
  planTemplateVersion,
}: {
  plan: PlanTemplate;
  planTemplateVersion: string;
}) {
  if (plan.version !== planTemplateVersion) {
    throw new Error("Unsupported plan version");
  }
}

export function validateAnswersAgainstPlan({
  plan,
  answers,
}: {
  plan: PlanTemplate;
  answers: Record<string, unknown>;
}) {
  const errors: Record<string, string> = {};

  for (const step of plan.steps) {
    for (const field of step.fields) {
      if (field.visibility) {
        const { dependsOn, showWhen } = field.visibility;
        const dependsValue = answers[dependsOn];

        let isVisible = false;

        if (Array.isArray(dependsValue)) {
          isVisible = dependsValue.some((v) => showWhen.includes(v));
        } else {
          isVisible = showWhen.includes(
            dependsValue as string | number | boolean,
          );
        }

        if (!isVisible) continue;
      }

      const value = answers[field.key];

      if (field.required) {
        const isEmpty =
          value === undefined ||
          value === null ||
          (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
          errors[field.key] = `${field.label} is required`;
        }
      }

      if (field.ui && value !== undefined) {
        const { min, max } = field.ui;

        if (Array.isArray(value)) {
          if (typeof min === "number" && value.length < min) {
            errors[field.key] =
              `${field.label} must have at least ${min} option(s)`;
          }
          if (typeof max === "number" && value.length > max) {
            errors[field.key] =
              `${field.label} must have at most ${max} option(s)`;
          }
        }

        if (typeof value === "number") {
          if (typeof min === "number" && value < min) {
            errors[field.key] = `${field.label} must be ≥ ${min}`;
          }
          if (typeof max === "number" && value > max) {
            errors[field.key] = `${field.label} must be ≤ ${max}`;
          }
        }
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    console.error("Validation errors:", errors);
    throw new Error("Validation failed", errors);
  }
}

export function sanitizeAnswers({
  plan,
  answers,
}: {
  plan: PlanTemplate;
  answers: Record<string, unknown>;
}): Record<string, unknown> {
  const allowedKeys = new Set(
    plan.steps.flatMap((step) => step.fields.map((f) => f.key)),
  );

  const sanitized: Record<string, unknown> = {};
  for (const key in answers) {
    if (allowedKeys.has(key)) {
      sanitized[key] = answers[key];
    }
  }
  return sanitized;
}

export function extractAiHints({
  plan,
  answers,
}: {
  plan: PlanTemplate;
  answers: Record<string, unknown>;
}): string[] {
  const hints: string[] = [];

  for (const step of plan.steps) {
    for (const field of step.fields) {
      if (answers[field.key] !== undefined && field.aiHint) {
        hints.push(field.aiHint);
      }
    }
  }

  return hints;
}

export function buildUserPrompt({
  plan,
  answers,
}: {
  plan: PlanTemplate;
  answers: Record<string, unknown>;
}): string {
  const aiHints = extractAiHints({ plan, answers });
  const lines: string[] = [];

  lines.push("USER PREFERENCES:");

  for (const [key, value] of Object.entries(answers)) {
    lines.push(`- ${key}: ${JSON.stringify(value)}`);
  }

  if (aiHints.length > 0) {
    lines.push("");
    lines.push("COACHING RULES:");
    for (const hint of aiHints) {
      lines.push(`- ${hint}`);
    }
  }

  return lines.join("\n");
}
