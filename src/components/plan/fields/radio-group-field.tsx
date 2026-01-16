import { FieldDefinition } from "@/lib/templates/plan-template";
import { cn } from "@/lib/shared/utils";

type RadioGroupFieldProps = {
  field: FieldDefinition;
  selectedValue?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
};

export function RadioGroupField({
  field,
  selectedValue,
  onChange = () => {},
  disabled = false,
}: RadioGroupFieldProps) {
  if (!field.options || field.options.length === 0) {
    return (
      <div className="text-sm text-muted-foreground italic">
        No options provided for {field.key}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      {field.options.map((option) => {
        const isSelected = option.value === selectedValue;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-start gap-3 rounded-md border px-3 py-2 text-left transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isSelected
                ? "border-secondary bg-secondary/40"
                : "border-border hover:bg-muted/50"
            )}
          >
            {/* Radio indicator */}
            <span
              className={cn(
                "mt-1 h-4 w-4 shrink-0 rounded-full border flex items-center justify-center",
                isSelected ? "border-secondary" : "border-muted-foreground"
              )}
            >
              {isSelected && (
                <span className="h-2 w-2 rounded-full bg-secondary" />
              )}
            </span>

            {/* Label + description */}
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{option.label}</span>

              {option.description && (
                <span className="text-xs text-muted-foreground leading-snug">
                  {option.description}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
