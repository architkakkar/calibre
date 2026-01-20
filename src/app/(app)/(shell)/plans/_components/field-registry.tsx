import {
  CardGridField,
  DropdownField,
  TagListField,
  SegmentedControlField,
  RadioGroupField,
  TextareaField,
  InputField,
  SliderField,
  DatePickerField,
  CheckboxField,
  SwitchField,
} from "./fields";

export const FIELD_REGISTRY = {
  single_select: {
    card_grid: CardGridField,
    dropdown: DropdownField,
    segmented_control: SegmentedControlField,
    tags: TagListField,
    radio_group: RadioGroupField,
  },
  multi_select: {
    card_grid: CardGridField,
    tags: TagListField,
  },
  text: {
    input: InputField,
    textarea: TextareaField,
  },
  number: {
    input: InputField,
    slider: SliderField,
  },
  boolean: {
    checkbox: CheckboxField,
    switch: SwitchField,
  },
  date: {
    date_picker: DatePickerField,
  },
} as const;
