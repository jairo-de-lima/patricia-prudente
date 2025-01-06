type FieldConfig = {
  id: string;
  label: string;
  type: string;
  step?: string;
  required?: boolean; // Novo campo para controlar se é obrigatório
};

type FormConfig = {
  title: string;
  codLabel: string;
  fields: {
    leftColumn: FieldConfig[];
    rightColumn: FieldConfig[];
  };
};
