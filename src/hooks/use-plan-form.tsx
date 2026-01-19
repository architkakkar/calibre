import { useCallback, useMemo, useState } from "react";
import type { FieldDefinition } from "@/lib/templates/plan-template";

/**
 * Local form state manager for a single plan instance.
 * Owns values, errors, and validation coordination.
 */
export type PlanFormValues = Record<string, unknown>;
export type PlanFormErrors = Record<string, string | undefined>;
export type PlanFormApi = {
  getValue: (key: string) => unknown;
  setValue: (key: string, value: unknown) => void;

  // getAllValues: () => Record<string, unknown>;

  isFieldVisible?: (field: FieldDefinition) => boolean;
  isFieldDisabled?: (field: FieldDefinition) => boolean;

  validate?: () => boolean;
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

  /**
   * Write a field value by key
   * Clears existing error for that field
   */
  const setValue = useCallback((key: string, value: unknown) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => {
      if (!prev[key]) return prev;
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  }, []);

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
    // v1: no validation logic yet
    // Zod will plug in here
    setErrors({});
    return true;
  }, []);

  /**
   * Memoized API exposed to consumers
   */
  return useMemo(
    () => ({
      values,
      errors,
      getValue,
      setValue,
      reset,
      validate,
    }),
    [values, errors, getValue, setValue, reset, validate],
  );
}
