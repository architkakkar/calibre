export type PlanTemplate = {
  id: string;
  version: string;
  planType: "workout" | "nutrition";

  meta: {
    label: string;
    description: string;
  };

  steps: StepDefinition[];
};

export type StepDefinition = {
  step: number;
  label: string;
  description?: string;

  fields: FieldDefinition[];
};

export type FieldDefinition = {
  key: string;
  label: string;
  description?: string;
  required?: boolean;
  defaultValue?: string | number | boolean | string[] | number[];

  type:
    | "single_select"
    | "multi_select"
    | "number"
    | "boolean"
    | "text"
    | "date";

  options?: {
    label: string;
    value: string | number;
    icon?: string;
    description?: string;
  }[];

  visibility?: {
    dependsOn: string;
    showWhen: (string | number | boolean)[];
  };

  aiHint?: string;

  ui?: {
    component?: 
      // FOR (type: 'single_select' | 'multi_select')
      | "dropdown"
      | "card_grid"
      | "tags"
      | "radio_group"
      | "segmented_control"

      // FOR (type: 'text' | 'number')
      | "input"
      | "textarea"
      | "slider"
      | "stepper"

      // FOR (type: 'date')
      | "date_picker"

      // FOR (type: 'boolean')
      | "switch"
      | "checkbox";

    placeholder?: string;
    helpText?: string;
    prefix?: string;
    suffix?: string;
    icon?: string;

    // Constraints for 'slider' & 'stepper'
    min?: number;
    max?: number;
    step?: number;
  };
};
