import { BaseFieldProps } from "@/lib/client/types";
import { cn } from "@/lib/shared/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";

export function SliderField({
  field,
  value,
  onChange,
  disabled = false,
}: BaseFieldProps) {
  const min = field.ui?.min ?? 0;
  const max = field.ui?.max ?? 100;
  const step = field.ui?.step ?? 1;

  const effectiveValue = typeof value === "number" ? value : min;

  const displayValue = `${field.ui?.prefix ?? ""}${effectiveValue}${
    field.ui?.suffix ?? ""
  }`;

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-background/50 p-4",
        "flex flex-col gap-4",
        disabled && "opacity-50 pointer-events-none",
      )}
    >
      {/* Slider + value bubble */}
      <div className="relative pt-6">
        <SliderPrimitive.Root
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
          className="relative flex w-full touch-none select-none items-center"
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary/30">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>

          <SliderPrimitive.Thumb className="relative block h-4 w-5 rounded-full border border-primary bg-background shadow">
            {/* Bubble */}
            <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs font-medium w-20">
              <span className="rounded-md bg-secondary px-2 py-0.5 text-secondary-foreground shadow-sm">
                {displayValue}
              </span>
              <span className="h-1 w-1 -mt-0.5 rotate-45 bg-secondary" />
            </div>
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
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
