import { FieldDefinition } from "@/lib/templates/plan-template";

export type BaseFieldProps = {
  field: FieldDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
};
