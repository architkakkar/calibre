import { FieldDefinition } from "@/lib/templates/plan-template";
import { cn } from "@/lib/shared/utils";
import { Checkbox } from "@/components/ui/checkbox";

type CheckboxFieldProps = {
  field: FieldDefinition;
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
};

export function CheckboxField({
  field,
  value = false,
  onChange = () => {},
  disabled = false,
}: CheckboxFieldProps) {
  const checkboxId = `checkbox-${field.key}`;

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <Checkbox
        id={checkboxId}
        checked={value}
        disabled={disabled}
        onCheckedChange={(checked) => onChange(Boolean(checked))}
      />
    </div>
  );
}
