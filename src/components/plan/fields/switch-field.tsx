import { BaseFieldProps } from "@/lib/client/types";
import { Switch } from "@/components/ui/switch";

export function SwitchField({
  value,
  onChange,
  disabled = false,
}: BaseFieldProps) {
  const checked = Boolean(value);

  return (
    <Switch
      checked={checked}
      disabled={disabled}
      onCheckedChange={(next) => onChange(Boolean(next))}
    />
  );
}
