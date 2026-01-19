import { FieldDefinition } from "@/lib/templates/plan-template";

type PlaceholderFieldProps = {
  field: FieldDefinition;
  value?: unknown;
  onChange?: (value: unknown) => void;
  disabled?: boolean;
};

export function PlaceholderField({ field }: PlaceholderFieldProps) {
  return (
    <div className="h-10 rounded-md border border-dashed border-border/60 flex items-center justify-center text-xs text-muted-foreground">
      {field.ui?.component
        ? `UI: ${field.ui.component}`
        : `Type: ${field.type}`}
    </div>
  );
}
