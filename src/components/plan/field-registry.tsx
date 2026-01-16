import { ReactNode } from "react";
import { FieldDefinition } from "@/lib/templates/plan-template";
import { CardGridField } from "./fields/card-grid-field";
import { DropdownField } from "./fields/dropdown-field";
import { TagListField } from "./fields/tag-list-field";
import { SegmentedControlField } from "./fields/segmented-control-field";
import { RadioGroupField } from "./fields/radio-group-field";
import { TextareaField } from "./fields/textarea-field";
import { InputField } from "./fields/input-field";
import { SliderField } from "./fields/slider-field";
import { DatePickerField } from "./fields/date-picker-field";
import { CheckboxField } from "./fields/checkbox-field";
import { SwitchField } from "./fields/switch-field";

export type FieldRendererFn = (field: FieldDefinition) => ReactNode;

function PlaceholderField(field: FieldDefinition) {
  return (
    <div className="h-10 rounded-md border border-dashed border-border/60 flex items-center justify-center text-xs text-muted-foreground">
      {field.ui?.component
        ? `UI: ${field.ui.component}`
        : `Type: ${field.type}`}
    </div>
  );
}

function renderSelectField(field: FieldDefinition): ReactNode {
  switch (field.ui?.component) {
    case "card_grid":
      return CardGridField({
        field,
        selectedValues: [],
        onOptionClick: () => {},
        disabled: false,
      });
    case "dropdown":
      return DropdownField({
        field,
        value: undefined,
        onChange: () => {},
        disabled: false,
      });
    case "segmented_control":
      return SegmentedControlField({
        field,
        selectedValues: [],
        onOptionClick: () => {},
        disabled: false,
      });
    case "tags":
      return TagListField({
        field,
        selectedValues: [],
        onOptionClick: () => {},
        disabled: false,
      });
    case "radio_group":
      return RadioGroupField({
        field,
        selectedValue: undefined,
        onChange: () => {},
        disabled: false,
      });
    default:
      return PlaceholderField(field);
  }
}

function renderTextualField(field: FieldDefinition): ReactNode {
  switch (field.ui?.component) {
    case "textarea":
      return TextareaField({
        field,
        value: "",
        onChange: () => {},
        disabled: false,
      });
    case "input":
      return InputField({
        field,
        value: "",
        onChange: () => {},
        disabled: false,
      });
    case "slider":
      return SliderField({
        field,
        value: undefined,
        onChange: () => {},
        disabled: false,
      });
    default:
      return PlaceholderField(field);
  }
}

function renderBooleanField(field: FieldDefinition): ReactNode {
  switch (field.ui?.component) {
    case "checkbox":
      return CheckboxField({
        field,
        value: false,
        onChange: () => {},
        disabled: false,
      });
    case "switch":
      return SwitchField({
        field,
        value: false,
        onChange: () => {},
        disabled: false,
      });
    default:
      return PlaceholderField(field);
  }
}

function renderDateField(field: FieldDefinition): ReactNode {
  switch (field.ui?.component) {
    case "date_picker":
      return DatePickerField({
        field,
        value: undefined,
        onChange: () => {},
        disabled: false,
      });
    default:
      return PlaceholderField(field);
  }
}

export function renderField(field: FieldDefinition): ReactNode {
  switch (field.type) {
    case "single_select":
    case "multi_select":
      return renderSelectField(field);

    case "text":
    case "number":
      return renderTextualField(field);

    case "boolean":
      return renderBooleanField(field);

    case "date":
      return renderDateField(field);

    default:
      return PlaceholderField(field);
  }
}
