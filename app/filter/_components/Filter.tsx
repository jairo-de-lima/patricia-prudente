"use client";

import React, { useState, useEffect } from "react";
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
import Image from "next/image";

export interface Cliente {
  id: string;
  codigo: string;
  cliente: string;
  cnpj: string;
  end: string;
  telFixo?: string;
  email: string;
  suframa?: string;
  transportadora?: string;
  ie: string;
  cep: string;
  cel: string;
  emailFinan: string;
}

export interface Fornecedor {
  id: string;
  codigo: string;
  fornecedor: string;
  cnpj: string;
  endereco: string;
  telFixo?: string;
  emailPedido?: string;
  ie: string;
  cep: string;
  celular: string;
  comissao?: number;
  dataRecebimento?: Date;
  emailFinan: string;
}

export interface Transportadora {
  id: string;
  codigo: string;
  transportadora: string;
  numeroNF: string;
  descricao?: string;
  quantidade?: number;
  valorUn?: number;
  valorTotal?: number;
  dataSaida?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const FilterPage = () => {
  const [tipoFiltro, setTipoFiltro] = useState("transportadora");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Cliente[] | Fornecedor[] | Transportadora[]>(
    []
  );
  const [filteredData, setFilteredData] = useState<
    Cliente[] | Fornecedor[] | Transportadora[]
  >([]);

  // Função para buscar dados do banco de acordo com o filtro
  const fetchData = async () => {
    try {
      let endpoint = "";
      if (tipoFiltro === "transportadora") endpoint = "/api/transportadora";
      if (tipoFiltro === "cliente") endpoint = "/api/clientes";
      if (tipoFiltro === "fornecedor") endpoint = "/api/fornecedores";

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Erro ao buscar dados.");
      const result = await res.json();
      setData(result);
      setFilteredData(result); // Inicialmente, exibe todos os resultados
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setData([]);
      setFilteredData([]);
    }
  };

  // Atualiza os dados sempre que o tipo de filtro mudar
  useEffect(() => {
    fetchData();
  }, [tipoFiltro]);

  // Filtra os dados localmente
  const handleFilter = () => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = data.filter((item) => {
      if ("cliente" in item) {
        return (
          item.cliente.toLowerCase().includes(lowerSearchTerm) ||
          item.cnpj.toLowerCase().includes(lowerSearchTerm) ||
          item.codigo.toLowerCase().includes(lowerSearchTerm)
        );
      }
      if ("fornecedor" in item) {
        return (
          item.fornecedor.toLowerCase().includes(lowerSearchTerm) ||
          item.cnpj.toLowerCase().includes(lowerSearchTerm) ||
          item.codigo.toLowerCase().includes(lowerSearchTerm)
        );
      }
      if ("transportadora" in item) {
        return (
          item.transportadora.toLowerCase().includes(lowerSearchTerm) ||
          item.numeroNF.toLowerCase().includes(lowerSearchTerm) ||
          item.codigo.toLowerCase().includes(lowerSearchTerm)
        );
      }
      return false;
    });
    setFilteredData(filtered);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Card className="md:w-[60%] w-full h-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="logo"
              width={80}
              height={50}
              className="rounded-md"
            />
            <CardTitle>Filtro de Dados</CardTitle>
          </div>
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
              placeholder="Buscar por nome, código ou CNPJ"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />

            {/* Botão de buscar */}
            <Button onClick={handleFilter}>Buscar</Button>
          </div>

          {/* Exibição dos resultados filtrados */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Resultados:</h3>

            <ul className="mt-4 space-y-4">
              {filteredData.length === 0 ? (
                <li>Nenhum resultado encontrado.</li>
              ) : (
                filteredData.map((item) => (
                  <li key={item.id} className="border-b pb-4">
                    {tipoFiltro === "cliente" && (
                      <>
                        <p>
                          <strong>Cliente:</strong> {item.cliente}
                        </p>
                        <p>
                          <strong>CNPJ:</strong> {item.cnpj}
                        </p>
                        <p>
                          <strong>Endereço:</strong> {item.codigo}
                        </p>
                        <p>
                          <strong>Email:</strong> {item.email}
                        </p>
                      </>
                    )}
                    {tipoFiltro === "fornecedor" && (
                      <>
                        <p>
                          <strong>Fornecedor:</strong> {item.fornecedor}
                        </p>
                        <p>
                          <strong>CNPJ:</strong> {item.cnpj}
                        </p>
                        <p>
                          <strong>Endereço:</strong> {item.endereco}
                        </p>
                        <p>
                          <strong>Email:</strong> {item.emailFinan}
                        </p>
                      </>
                    )}
                    {tipoFiltro === "transportadora" && (
                      <>
                        <p>
                          <strong>Transportadora:</strong> {item.transportadora}
                        </p>
                        <p>
                          <strong>Número NF:</strong> {item.numeroNF}
                        </p>
                        <p>
                          <strong>Data de Saída:</strong>{" "}
                          {item.dataSaida
                            ? new Date(item.dataSaida).toLocaleDateString()
                            : "Não informado"}
                        </p>
                        <p>
                          <strong>Descrição:</strong>{" "}
                          {item.descricao || "Não informado"}
                        </p>
                      </>
                    )}
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
