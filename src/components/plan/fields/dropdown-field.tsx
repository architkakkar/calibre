import { FieldDefinition } from "@/lib/templates/plan-template";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DropdownFieldProps = {
  field: FieldDefinition;
  value?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
};

export function DropdownField({
  field,
  value,
  onChange = () => {},
  disabled = false,
}: DropdownFieldProps) {
  if (!field.options || field.options.length === 0) {
    return (
      <div className="text-sm text-muted-foreground italic">
        No options provided for {field.key}
      </div>
    );
  }

  return (
    <Select
      disabled={disabled}
      value={value !== undefined ? String(value) : undefined}
      onValueChange={(val) => onChange(val)}
    >
      <SelectTrigger className="w-full h-auto! text-left">
        <SelectValue
          placeholder={field.ui?.placeholder ?? "Select an option"}
        />
      </SelectTrigger>

      <SelectContent>
        {field.options.map((option) => (
          <SelectItem key={option.value} value={String(option.value)}>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">{option.label}</span>
              {option.description && (
                <span
                  className="text-xs text-muted-foreground leading-snug"
                  aria-hidden="true"
                >
                  {option.description}
                </span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
