import * as React from "react";
import { BaseFieldProps } from "@/lib/client/types";
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

export function DatePickerField({
  field,
  value,
  onChange,
  disabled = false,
}: BaseFieldProps) {
  const selectedDate = value instanceof Date ? value : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate
            ? format(selectedDate, "PPP")
            : field.ui?.placeholder ?? "Pick a date"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => onChange(date)}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
