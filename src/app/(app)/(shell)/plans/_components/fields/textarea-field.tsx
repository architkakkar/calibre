import { BaseFieldProps } from "@/lib/client/types";
import { cn } from "@/lib/shared/utils";
import { Textarea } from "@/components/ui/textarea";

export function TextareaField({
  field,
  value,
  onChange,
  disabled = false,
}: BaseFieldProps) {
  const textareaValue = typeof value === "string" ? value : "";

  return (
    <Textarea
      value={textareaValue}
      disabled={disabled}
      placeholder={field.ui?.placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "text-[13px] min-h-40 max-h-60 resize-y",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    />
  );
}
