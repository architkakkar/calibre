import { BaseFieldProps } from "@/lib/client/types";
import { cn } from "@/lib/shared/utils";
import { Slider } from "@/components/ui/slider";

export function SliderField({
  field,
  value,
  onChange,
  disabled = false,
}: BaseFieldProps) {
  const min = field.ui?.min ?? 0;
  const max = field.ui?.max ?? 100;
  const step = field.ui?.step ?? 1;

  const effectiveValue =
    typeof value === "number" ? value : min;

  const displayValue = `${field.ui?.prefix ?? ""}${effectiveValue}${
    field.ui?.suffix ?? ""
  }`;

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-background/50 p-4",
        "flex flex-col gap-4",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      {/* Slider + value bubble */}
      <div className="relative pt-6">
        {
          <div
            className="pointer-events-none absolute -top-3 left-0 flex flex-col items-center text-xs font-medium text-foreground transition-transform"
            style={{
              transform: `translateX(${
                ((effectiveValue - min) / (max - min)) * 100
              }%) translateX(-50%)`,
            }}
          >
            <span className="rounded-md bg-secondary px-2 py-0.5 text-secondary-foreground shadow-sm">
              {displayValue}
            </span>
            <span className="h-1 w-1 rotate-45 bg-secondary" />
          </div>
        }

        <Slider
          value={[effectiveValue]}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onValueChange={(vals) => {
            const next = vals[0];
            if (typeof next === "number") {
              onChange(next);
            }
          }}
        />
      </div>

      {/* Min / Max labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {field.ui?.prefix}
          {min}
          {field.ui?.suffix}
        </span>
        <span>
          {field.ui?.prefix}
          {max}
          {field.ui?.suffix}
        </span>
      </div>
    </div>
  );
}
