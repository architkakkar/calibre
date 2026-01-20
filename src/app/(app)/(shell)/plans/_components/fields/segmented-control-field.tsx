import { BaseFieldProps } from "@/lib/client/types";
import { cn } from "@/lib/shared/utils";

export function SegmentedControlField({
  field,
  value,
  onChange,
  disabled = false,
}: BaseFieldProps) {
  const selectedValue =
    typeof value === "string" || typeof value === "number" ? value : undefined;

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
        disabled && "opacity-50 pointer-events-none",
      )}
    >
      {field.options.map((option) => {
        const isSelected = option.value === selectedValue;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              if (disabled) return;
              onChange(option.value);
            }}
            className={cn(
              "relative flex-1 px-3 py-2 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "border-r border-border last:border-r-0",
              isSelected
                ? "bg-secondary/50 text-secondary-foreground"
                : "bg-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
