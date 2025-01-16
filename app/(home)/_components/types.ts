// Arquivo: types.ts
"use client";
export type FieldConfig = {
  id: string;
  label: string;
  type: string;
  prefix?: string;
  value?: string;
  step?: string;
  required?: boolean;
  mask?: string; // Adicionando a propriedade mask
};

export type FormConfig = {
  title: string;
  codLabel: boolean | string;
  dataCad: boolean;
  value?: string; // Tornando opcional
  fields: {
    leftColumn: FieldConfig[];
    rightColumn?: FieldConfig[]; // Tornando opcional
    extras?: FieldConfig[]; // Corrigindo tipo e tornando opcional
    obs?: boolean | string; // Tornando opcional e permitindo boolean
  };
};