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

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      {field.options.map((option) => {
        const isSelected = selectedValues.includes(option.value);

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              if (disabled) return;

              const exists = selectedValues.includes(option.value);
              const next = exists
                ? selectedValues.filter((v) => v !== option.value)
                : [...selectedValues, option.value];

              onChange(next);
            }}
            className={cn(
              "inline-flex items-center rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isSelected
                ? "bg-secondary text-secondary-foreground border-secondary"
                : "bg-transparent text-muted-foreground border-border hover:bg-muted hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
