type FieldConfig = {
  id: string;
  label: string;
  type: string;
  prefix: string;
  value: string;
  step?: string;
  required?: boolean;
  maskType?: string;
};

type FormConfig = {
  title: string;
  codLabel: string;
  dataCad: boolean;
  value: string;
  fields: {
    leftColumn: FieldConfig[];
    rightColumn: FieldConfig[];
    extras: [];
    obs: string;
  };
};
