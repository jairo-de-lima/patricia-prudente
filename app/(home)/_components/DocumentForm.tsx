// Arquivo: DocumentForm.tsx
"use client";

import React, { useState } from "react";
import InputMask from "react-input-mask";
import { FieldConfig, FormConfig } from "./types";

interface DocumentFormProps {
  config: FormConfig;
  onSubmit: (formData: Record<string, string>) => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ config, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setFormData({ ...formData, [id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field: FieldConfig) => {
    if (field.type === "text" || field.type === "tel") {
      return (
        <InputMask
          mask={field.mask || ""}
          value={formData[field.id] || ""}
          onChange={(e) => handleInputChange(e, field.id)}
        >
          {(inputProps) => <input {...inputProps} type={field.type} />}
        </InputMask>
      );
    }
    return (
      <input
        type={field.type}
        id={field.id}
        value={formData[field.id] || ""}
        onChange={(e) => handleInputChange(e, field.id)}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{config.title}</h1>
      {config.fields.leftColumn.map((field) => (
        <div key={field.id}>
          <label>{field.label}:</label>
          {renderField(field)}
        </div>
      ))}
      {config.fields.rightColumn?.map((field) => (
        <div key={field.id}>
          <label>{field.label}:</label>
          {renderField(field)}
        </div>
      ))}
      {config.fields.extras?.map((field) => (
        <div key={field.id}>
          <label>{field.label}:</label>
          {renderField(field)}
        </div>
      ))}
    </form>
  );
};

export default DocumentForm;