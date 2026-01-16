import { FieldDefinition } from "@/lib/templates/plan-template";
import { Switch } from "@/components/ui/switch";

type SwitchFieldProps = {
  field: FieldDefinition;
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
};

export function SwitchField({
  value = false,
  onChange = () => {},
  disabled = false,
}: SwitchFieldProps) {
  return (
    <Switch
      checked={value}
      disabled={disabled}
      onCheckedChange={(checked) => onChange(Boolean(checked))}
    />
  );
}
