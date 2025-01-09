"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Button } from "@/app/_components/ui/button";
import { PDFGenerator } from "./PDFGenerator"; // Novo componente para geração de PDF
import { TypeSelector } from "./TypeSelector"; // Novo componente para selecionar tipo
import { DataList } from "./DataList"; // Componente genérico de listagem
import { Cliente, Fornecedor, Transportadora } from "@/app/types";

// Componentes principais
const FilterAndPDFGenerator = () => {
  const [selectedType, setSelectedType] = useState<string>("clientes");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [transportadoras, setTransportadoras] = useState<Transportadora[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função genérica para carregar dados
  const fetchData = async (endpoint: string, setter: Function) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`Erro ao carregar ${endpoint}`);
      const data = await response.json();
      setter(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : `Erro ao carregar ${endpoint}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Atualiza dados com base no tipo selecionado
  useEffect(() => {
    if (selectedType === "clientes") {
      fetchData("/api/clientes", setClientes);
    } else if (selectedType === "fornecedores") {
      fetchData("/api/fornecedores", setFornecedores);
    } else if (selectedType === "transportadoras") {
      fetchData("/api/transportadora", setTransportadoras);
    }
  }, [selectedType]);

  return (
    <Card>
      <CardContent>
        {/* Selecionador de Tipo */}
        <TypeSelector
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        {/* Lista de Dados */}
        <DataList
          type={selectedType}
          data={
            selectedType === "clientes"
              ? clientes
              : selectedType === "fornecedores"
              ? fornecedores
              : transportadoras
          }
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          loading={loading}
        />

        {/* Botão para Gerar PDF */}
        <PDFGenerator
          type={selectedType}
          data={
            selectedType === "clientes"
              ? clientes
              : selectedType === "fornecedores"
              ? fornecedores
              : transportadoras
          }
          selectedItems={selectedItems}
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
};

export default FilterAndPDFGenerator;
