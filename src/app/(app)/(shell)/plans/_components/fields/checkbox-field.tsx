import { BaseFieldProps } from "@/lib/client/types";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxField({
  value,
  onChange,
  disabled = false,
}: BaseFieldProps) {
  const checked = Boolean(value);

  return (
    <Checkbox
      checked={checked}
      disabled={disabled}
      onCheckedChange={(next) => onChange(Boolean(next))}
    />
  );
}
