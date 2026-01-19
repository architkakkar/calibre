import { PlanFormApi } from "@/hooks/use-plan-form";
import { FIELD_REGISTRY } from "@/components/plan/field-registry";
import { PlaceholderField } from "@/components/plan/fields";
import { FieldDefinition } from "@/lib/templates/plan-template";

type FieldRendererProps = {
  field: FieldDefinition;
  form: PlanFormApi;
};

export function FieldRenderer({ field, form }: FieldRendererProps) {
  const value = form.getValue(field.key);
  const typeRegistry = FIELD_REGISTRY[field.type];

  const FieldComponent =
    typeRegistry && field.ui?.component
      ? typeRegistry[field.ui.component as keyof typeof typeRegistry]
      : PlaceholderField;

  return (
    <section className="flex flex-col gap-y-3 lg:grid grid-cols-12 space-x-8">
      <div className="col-span-5 gap-y-1 flex flex-col">
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
      <div className="col-span-7">
        <FieldComponent
          field={field}
          value={value}
          onChange={(v) => form.setValue(field.key, v)}
          disabled={form.isFieldDisabled?.(field) ?? false}
        />
      </div>
    </section>
  );
}
