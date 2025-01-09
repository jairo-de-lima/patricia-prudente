import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

interface TypeSelectorProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({
  selectedType,
  setSelectedType,
}) => (
  <Select
    value={selectedType}
    onValueChange={(value) => setSelectedType(value)}
  >
    <SelectTrigger>
      <SelectValue placeholder="Selecione um tipo" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="clientes">Clientes</SelectItem>
      <SelectItem value="fornecedores">Fornecedores</SelectItem>
      <SelectItem value="transportadoras">Transportadoras</SelectItem>
    </SelectContent>
  </Select>
);
