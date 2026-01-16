import { FieldDefinition } from "@/lib/templates/plan-template";
import { cn } from "@/lib/shared/utils";

type CardGridProps = {
  field: FieldDefinition;
  selectedValues?: Array<string | number>;
  onOptionClick?: (value: string | number) => void;
  disabled?: boolean;
};

export function CardGridField({
  field,
  selectedValues = [],
  onOptionClick = () => {},
  disabled = false,
}: CardGridProps) {
  if (!field.options || field.options.length === 0) {
    return (
      <div className="text-sm text-muted-foreground italic">
        No options provided for {field.key}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {field.options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        const isDisabled = disabled;

        return (
          <button
            key={option.value}
            type="button"
            disabled={isDisabled}
            onClick={() => onOptionClick(option.value)}
            className={cn(
              "min-h-9 rounded-md border px-4 py-2  text-sm font-medium transition-colors",
              "hover:bg-muted",
              option.description ? "text-left" : "text-center",
              isSelected ? "border-primary bg-primary/5" : "border-border",
              isDisabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="flex flex-col gap-0.5">
              <div>{option.label}</div>

              {option.description && (
                <div className="text-xs text-muted-foreground font-normal">
                  {option.description}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
