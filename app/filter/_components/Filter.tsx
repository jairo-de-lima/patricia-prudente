"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import React, { useState } from "react";

const FilterPage = ({ fornecedores, clientes, transportadoras }) => {
  const [tipoFiltro, setTipoFiltro] = useState("transportadora");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Função para filtrar os dados
  const filterData = () => {
    let data = [];

    switch (tipoFiltro) {
      case "transportadora":
        data = transportadoras.filter(
          (item) =>
            item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.codigo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case "cliente":
        data = clientes.filter(
          (item) =>
            item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.cnpj.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case "fornecedor":
        data = fornecedores.filter(
          (item) =>
            item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.cnpj.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      default:
        break;
    }

    setFilteredData(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Card className="md:w-[60%] w-full h-full ">
        <CardHeader>
          <CardTitle>Filtro de Dados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 flex flex-col items-center">
            {/* Seleção do tipo de filtro */}
            <Select
              value={tipoFiltro}
              onValueChange={(value) => setTipoFiltro(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Escolha o tipo de filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transportadora">Transportadora</SelectItem>
                <SelectItem value="cliente">Cliente</SelectItem>
                <SelectItem value="fornecedor">Fornecedor</SelectItem>
              </SelectContent>
            </Select>

            {/* Campo de busca */}
            <Input
              type="text"
              placeholder="Buscar por nome ou código"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />

            {/* Botão de buscar */}
            <Button onClick={filterData}>Buscar</Button>
          </div>

          {/* Exibição dos resultados filtrados */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Resultados:</h3>

            <ul className="mt-4">
              {filteredData.length === 0 ? (
                <li>Nenhum resultado encontrado.</li>
              ) : (
                filteredData.map((item, index) => (
                  <li key={index} className="space-y-2">
                    <strong>{item.nome}</strong> -{" "}
                    {item.codigo || item.cnpj || item.nf}
                  </li>
                ))
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterPage;
