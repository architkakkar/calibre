import { FieldDefinition } from "@/lib/templates/plan-template";
import { cn } from "@/lib/shared/utils";
import { Textarea } from "@/components/ui/textarea";

type TextareaFieldProps = {
  field: FieldDefinition;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export function TextareaField({
  field,
  value = "",
  onChange = () => {},
  disabled = false,
}: TextareaFieldProps) {
  return (
    <Textarea
      value={value}
      disabled={disabled}
      placeholder={field.ui?.placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "min-h-24 max-h-40 resize-y",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    />
  );
}
