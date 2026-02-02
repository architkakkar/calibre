"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditableFieldProps {
  label: string;
  description?: string;
  value: string;
  onSave: (newValue: string) => Promise<void>;
  type?: "text" | "email" | "date" | "select" | "number";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export function EditableField({
  label,
  description,
  value,
  onSave,
  type = "text",
  options = [],
  placeholder,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (editValue === value) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save:", error);
      setEditValue(value); // Reset to original value
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <div className="py-6 first:pt-0 last:pb-0 border-b last:border-0 border-dashed border-border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1">
          <Label className="text-base font-medium text-foreground">{label}</Label>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>

        {!isEditing ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium px-4 py-2 rounded-lg border bg-muted/50">
              {value || "Not set"}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {type === "select" ? (
              <Select value={editValue} onValueChange={setEditValue}>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={type}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={placeholder}
                className="w-45"
              />
            )}
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="shrink-0"
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              disabled={isSaving}
              className="shrink-0"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
