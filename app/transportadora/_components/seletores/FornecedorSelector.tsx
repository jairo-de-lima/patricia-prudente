"use client";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Fornecedor } from "../interfaces/Fornecedor";

interface FornecedorSelectorProps {
  fornecedores: Fornecedor[];
  selectedFornecedor: Fornecedor | null;
  setSelectedFornecedor: React.Dispatch<React.SetStateAction<Fornecedor | null>>;
}

const FornecedorSelector: React.FC<FornecedorSelectorProps> = ({
  fornecedores,
  selectedFornecedor,
  setSelectedFornecedor
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fornecedor</CardTitle>
      </CardHeader>
      <CardContent>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedFornecedor?.razaoSocial || ""}
          onChange={(e) =>
            setSelectedFornecedor(
              fornecedores.find((f) => f.id === e.target.value) || null
            )
          }
        >
          <option value="">Selecione um fornecedor</option>
          {fornecedores.map((fornecedor) => (
            <option key={fornecedor.id} value={fornecedor.id}>
              {fornecedor.razaoSocial} - {fornecedor.codigo}
            </option>
          ))}
        </select>
      </CardContent>
    </Card>
  );
};

export default FornecedorSelector;
