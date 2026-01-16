import * as React from "react";
import { FieldDefinition } from "@/lib/templates/plan-template";
import { cn } from "@/lib/shared/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

type DatePickerFieldProps = {
  field: FieldDefinition;
  value?: Date;
  onChange?: (value: Date | undefined) => void;
  disabled?: boolean;
};

export function DatePickerField({
  field,
  value,
  onChange = () => {},
  disabled = false,
}: DatePickerFieldProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value
            ? format(value, "PPP")
            : field.ui?.placeholder ?? "Pick a date"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
