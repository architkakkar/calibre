import { FieldDefinition } from "@/lib/templates/plan-template";
import { renderField } from "./field-registry";

type FieldRendererProps = {
  field: FieldDefinition;
};

export function FieldRenderer({ field }: FieldRendererProps) {
  return (
    <section className="grid grid-cols-12 space-x-8">
      {/* Label */}
      <div className="col-span-5 gap-y-1 flex flex-col">
        <label className="text-sm font-medium text-foreground">
          {field.label}
          {field.required && <span className="ml-1 text-destructive">*</span>}
        </label>

        {field.description && (
          <p className="text-xs text-muted-foreground">{field.description}</p>
        )}
      </div>

      <div className="col-span-7">
        {/* Field UI */}
        {renderField(field)}
      </div>

      {/* Help Text */}
      {/* {field.ui?.helpText && (
        <p className="text-xs text-muted-foreground">
          {field.ui.helpText}
        </p>
      )} */}
    </section>
  );
}
