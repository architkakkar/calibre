import { FieldDefinition } from "@/lib/templates/plan-template";
import { cn } from "@/lib/shared/utils";

type SegmentedControlFieldProps = {
  field: FieldDefinition;
  selectedValues?: Array<string | number>;
  onOptionClick?: (value: string | number) => void;
  disabled?: boolean;
};

export function SegmentedControlField({
  field,
  selectedValues,
  onOptionClick,
  disabled = false,
}: SegmentedControlFieldProps) {
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
        "relative inline-flex w-full rounded-lg border border-border bg-transparent overflow-hidden",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      {field.options.map((option) => {
        const isSelected = selectedValues?.includes(option.value);

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onOptionClick?.(option.value)}
            className={cn(
              "relative flex-1 px-3 py-2 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "border-r border-border last:border-r-0",
              isSelected
                ? "bg-secondary text-secondary-foreground"
                : "bg-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
