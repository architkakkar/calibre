import { z } from "zod";
import type { FieldDefinition } from "@/lib/templates/plan-template";

export type ValidationResult = {
  isValid: boolean;
  errors: Record<string, string | undefined>;
};

/**
 * Build a Zod schema for a single field
 */
function buildFieldSchema(field: FieldDefinition): z.ZodTypeAny {
  let schema: z.ZodTypeAny;

  switch (field.type) {
    case "text":
    case "single_select":
    case "date": {
      schema = z.string();

      if (field.required) {
        schema = schema.refine(
          (v) => typeof v === "string" && v.trim().length > 0,
          { message: `${field.label} is required` },
        );
      }

      break;
    }

    case "number": {
      const min = field.ui?.min;
      const max = field.ui?.max;

      schema = z.number();

      if (field.required) {
        schema = schema.refine(
          (v) => typeof v === "number",
          { message: `${field.label} is required` },
        );
      }

      if (min !== undefined) {
        schema = schema.refine(
          (v) => typeof v === "number" && v >= min,
          { message: `${field.label} must be at least ${min}` },
        );
      }

      if (max !== undefined) {
        schema = schema.refine(
          (v) => typeof v === "number" && v <= max,
          { message: `${field.label} must be at most ${max}` },
        );
      }

      break;
    }

    case "boolean": {
      schema = z.boolean();

      if (field.required) {
        schema = schema.refine(
          (v) => typeof v === "boolean",
          { message: `${field.label} is required` },
        );
      }

      break;
    }

    case "multi_select": {
      const min = field.ui?.min;
      const max = field.ui?.max;

      schema = z.array(z.string());

      if (field.required) {
        schema = schema.refine(
          (v) => Array.isArray(v) && v.length > 0,
          { message: `${field.label} is required` },
        );
      }

      if (min !== undefined) {
        schema = schema.refine(
          (v) => Array.isArray(v) && v.length >= min,
          { message: `${field.label}: select at least ${min}` },
        );
      }

      if (max !== undefined) {
        schema = schema.refine(
          (v) => Array.isArray(v) && v.length <= max,
          { message: `${field.label}: select at most ${max}` },
        );
      }

      break;
    }

    default: {
      schema = z.any();
    }
  }

  // Optional handling LAST
  if (!field.required) {
    schema = schema.optional();
  }

  return schema;
}

/**
 * Validate a set of fields against values
 * Visibility is decided by the caller
 */
export function validateFields(
  fields: FieldDefinition[],
  values: Record<string, unknown>,
): ValidationResult {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const schema = buildFieldSchema(field);
    const value = values[field.key];

    const result = schema.safeParse(value);
    if (!result.success) {
      errors[field.key] = result.error.issues[0]?.message ?? "Invalid value";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
