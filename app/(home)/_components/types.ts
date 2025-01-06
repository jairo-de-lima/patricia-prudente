type FieldConfig = {
  id: string;
  label: string;
  type: string;
  step?: string;
  required?: boolean;
};

type FormConfig = {
  title: string;
  codLabel: string;
  fields: {
    leftColumn: FieldConfig[];
    rightColumn: FieldConfig[];
  };
};
