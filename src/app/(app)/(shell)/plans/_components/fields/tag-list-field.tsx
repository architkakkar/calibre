import { BaseFieldProps } from "@/lib/client/types";
import { cn } from "@/lib/shared/utils";

export function TagListField({
  field,
  value,
  onChange,
  disabled = false,
}: BaseFieldProps) {
  if (!field.options || field.options.length === 0) {
    return (
      <div className="text-[13px] text-muted-foreground italic">
        No options provided for {field.key}
      </div>
    );
  }

  const selectedValues: Array<string | number> = Array.isArray(value)
    ? value
    : [];

  const min = field.ui?.min;
  const max = field.ui?.max;

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2",
        disabled && "opacity-50 pointer-events-none",
      )}
    >
      {field.options.map((option) => {
        const isAllOption = option.value === "all";
        const isAllSelected = selectedValues.includes("all");
        const isSelected = selectedValues.includes(option.value);

        return (
          <button
            key={option.value}
            type="button"
            disabled={isAllSelected && !isAllOption}
            onClick={() => {
              if (disabled) return;

              if (isAllOption) {
                const next = isAllSelected ? [] : ["all"];
                onChange(next);
                return;
              }

              if (isAllSelected) {
                onChange([option.value]);
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
              "inline-flex items-center rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isSelected
                ? "bg-secondary/50 text-secondary-foreground border-secondary"
                : "bg-transparent text-muted-foreground border-border hover:bg-muted hover:text-foreground",
              isAllSelected &&
                !isAllOption &&
                "opacity-50 cursor-not-allowed pointer-events-none",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
