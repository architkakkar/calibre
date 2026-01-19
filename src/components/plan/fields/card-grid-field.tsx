import { BaseFieldProps } from "@/lib/client/types";
import { cn } from "@/lib/shared/utils";

export function CardGridField({
  field,
  value,
  onChange,
  disabled = false,
}: BaseFieldProps) {
  const isMultiSelect = field.type === "multi_select";

  const selectedValues: Array<string | number> = isMultiSelect
    ? Array.isArray(value)
      ? value
      : []
    : typeof value === "string" || typeof value === "number"
      ? [value]
      : [];

  const min = field.ui?.min;
  const max = field.ui?.max;

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
            onClick={() => {
              if (disabled) return;

              if (!isMultiSelect) {
                onChange(option.value);
                return;
              }

              const exists = selectedValues.includes(option.value);
              const next = exists
                ? selectedValues.filter((v) => v !== option.value)
                : [...selectedValues, option.value];

              if (max !== undefined && next.length > max) return;

              onChange(next);
            }}
            className={cn(
              "min-h-9 rounded-md border px-4 py-2  text-sm font-medium transition-colors",
              "hover:bg-muted",
              option.description ? "text-left" : "text-center",
              isSelected ? "border-secondary bg-secondary/50" : "border-border",
              isDisabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
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
