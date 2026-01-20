import { BaseFieldProps } from "@/lib/client/types";
import { cn } from "@/lib/shared/utils";
import { Input } from "@/components/ui/input";

export function InputField({
  field,
  value,
  onChange,
  disabled = false,
}: BaseFieldProps) {
  const isNumber = field.type === "number";

  const inputValue =
    typeof value === "string" || typeof value === "number"
      ? value
      : "";

  return (
    <div className="relative">
      {/* Prefix */}
      {field.ui?.prefix && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-muted-foreground">
          {field.ui.prefix}
        </span>
      )}

      <Input
        type={isNumber ? "number" : "text"}
        value={inputValue}
        disabled={disabled}
        placeholder={field.ui?.placeholder}
        min={isNumber ? field.ui?.min : undefined}
        max={isNumber ? field.ui?.max : undefined}
        step={isNumber ? field.ui?.step : undefined}
        onChange={(e) => {
          const raw = e.target.value;

          if (isNumber) {
            onChange(raw === "" ? undefined : Number(raw));
          } else {
            onChange(raw);
          }
        }}
        className={cn(
          field.ui?.prefix && "pl-8",
          field.ui?.suffix && "pr-8",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      />

      {/* Suffix */}
      {field.ui?.suffix && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted-foreground">
          {field.ui.suffix}
        </span>
      )}
    </div>
  );
}
