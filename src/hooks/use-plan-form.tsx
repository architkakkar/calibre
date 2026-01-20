import { validateFields as runValidation } from "@/lib/validators/plan.validator";
import { useCallback, useMemo, useState } from "react";
import type { FieldDefinition } from "@/lib/templates/plan-template";

/**
 * Local form state manager for a single plan instance.
 * Owns values, errors, and validation coordination.
 */
export type PlanFormValues = Record<string, unknown>;
export type PlanFormErrors = Record<string, string | undefined>;
export type PlanFormApi = {
  // values
  getValue: (key: string) => unknown;
  getAllValues: () => PlanFormValues;
  setValue: (key: string, value: unknown) => void;
  reset: (nextValues?: PlanFormValues) => void;

  // errors
  getError: (key: string) => string | undefined;
  hasError: (key: string) => boolean;
  clearError: (key: string) => void;
  getAllErrors: () => PlanFormErrors;

  // validation
  validate: () => boolean;

  validateFields: (fields: FieldDefinition[]) => boolean;

  // visibility / disabling (next phase)
  isFieldVisible?: (field: FieldDefinition) => boolean;
  isFieldDisabled?: (field: FieldDefinition) => boolean;
};

type UsePlanFormOptions = {
  initialValues?: PlanFormValues;
  fields?: FieldDefinition[];
};

export function usePlanForm(options: UsePlanFormOptions = {}): PlanFormApi {
  const { initialValues = {}, fields = [] } = options;

  const [values, setValues] = useState<PlanFormValues>(initialValues);
  const [errors, setErrors] = useState<PlanFormErrors>({});

  /**
   * Read a field value by key
   */
  const getValue = useCallback((key: string) => values[key], [values]);

  const getAllValues = useCallback(() => values, [values]);

  /**
   * Determine if a field is visible based on its visibility rules
   */
  const isFieldVisible = useCallback(
    (field: FieldDefinition): boolean => {
      if (!field.visibility) return true;

      const { dependsOn, showWhen } = field.visibility;
      const dependencyValue = values[dependsOn];

      if (dependencyValue == null) return false;

      // Multi-select dependency
      if (Array.isArray(dependencyValue)) {
        return dependencyValue.some((v) => showWhen.includes(v));
      }

      // Single-select dependency
      return showWhen.includes(dependencyValue as never);
    },
    [values],
  );

  /**
   * Error helpers
   */
  const getError = useCallback((key: string) => errors[key], [errors]);

  const hasError = useCallback((key: string) => Boolean(errors[key]), [errors]);

  const clearError = useCallback((key: string) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const getAllErrors = useCallback(() => errors, [errors]);

  /**
   * Write a field value by key
   * Clears existing error for that field
   */
  const setValue = useCallback(
    (key: string, value: unknown) => {
      setValues((prev) => ({
        ...prev,
        [key]: value,
      }));

      clearError(key);
    },
    [clearError],
  );

  /**
   * Reset all values (optionally to new defaults)
   */
  const reset = useCallback((nextValues?: PlanFormValues) => {
    setValues(nextValues ?? {});
    setErrors({});
  }, []);

  /**
   * Validate form values
   */
  const validate = useCallback((): boolean => {
    setErrors((prev) => {
      const next: PlanFormErrors = {};

      for (const key in prev) {
        const field = fields.find((f) => f.key === key);
        if (!field || isFieldVisible(field)) {
          next[key] = prev[key];
        }
      }

      return next;
    });

    return true;
  }, [fields, isFieldVisible]);

  /**
   * Validate a set of fields, honoring visibility, using validator
   */
  const validateFields = useCallback(
    (fieldsToValidate: FieldDefinition[]): boolean => {
      const visibleFields = fieldsToValidate.filter((f) =>
        isFieldVisible(f),
      );

      const { isValid, errors: nextErrors } = runValidation(
        visibleFields,
        values,
      );

      setErrors(nextErrors);
      return isValid;
    },
    [values, isFieldVisible],
  );

  /**
   * Memoized API exposed to consumers
   */
  return useMemo(
    () => ({
      getValue,
      getAllValues,
      setValue,
      reset,
      getError,
      hasError,
      clearError,
      getAllErrors,
      validate,
      validateFields,
      isFieldVisible,
    }),
    [
      getValue,
      getAllValues,
      setValue,
      reset,
      getError,
      hasError,
      clearError,
      getAllErrors,
      validate,
      validateFields,
      isFieldVisible,
    ],
  );
}
