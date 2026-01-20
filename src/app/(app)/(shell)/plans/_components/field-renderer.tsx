import { PlanFormApi } from "@/hooks/use-plan-form";
import { FIELD_REGISTRY } from "./field-registry";
import { PlaceholderField } from "./fields";
import { FieldDefinition } from "@/lib/templates/plan-template";

type FieldRendererProps = {
  field: FieldDefinition;
  form: PlanFormApi;
};

export function FieldRenderer({ field, form }: FieldRendererProps) {
  const value = form.getValue(field.key);
  const error = form.getError(field.key);
  const typeRegistry = FIELD_REGISTRY[field.type];

  const isVisible = form.isFieldVisible?.(field) ?? true;

  if (!isVisible) {
    return null;
  }

  const FieldComponent =
    typeRegistry && field.ui?.component
      ? typeRegistry[field.ui.component as keyof typeof typeRegistry]
      : PlaceholderField;

  return (
    <section className="flex flex-col grid-cols-12 space-x-8 gap-y-3 lg:grid">
      <div className="flex flex-col col-span-5 gap-y-1">
        <label
          htmlFor={field.key}
          className="text-sm font-medium text-foreground"
        >
          {field.label}
          {field.required && <span className="ml-1 text-destructive">*</span>}
        </label>
        {field.description && (
          <p className="text-xs text-muted-foreground">{field.description}</p>
        )}
      </div>
      <div className="flex flex-col col-span-7 gap-y-1">
        <FieldComponent
          field={field}
          value={value}
          onChange={(v) => form.setValue(field.key, v)}
          disabled={form.isFieldDisabled?.(field) ?? false}
        />
        {error && (
          <p className="text-xs leading-tight text-destructive">{error}</p>
        )}
      </div>
    </section>
  );
}
