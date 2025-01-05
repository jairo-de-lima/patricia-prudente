"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

const CarrierPage = ({ fornecedores, clientes, transportadora }) => {
  const [nomeTransportadora, setNomeTransportadora] = useState("");
  const [codigo, setCodigo] = useState("");
  const [numeroNF, setNumeroNF] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [unidade, setUnidade] = useState("");
  const [valorTotal, setValorTotal] = useState(0);
  const [dataSaida, setDataSaida] = useState("");

  const handleExportXLSX = () => {
    const transportadoraData = [
      {
        Nome: nomeTransportadora,
        Codigo: codigo,
        NF: numeroNF,
        Descricao: descricao,
        Quantidade: quantidade,
        Unidade: unidade,
        ValorTotal: valorTotal,
        DataSaida: dataSaida,
      },
    ];

    const ws = XLSX.utils.json_to_sheet(transportadoraData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transportadora");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "transportadora.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Transportadora - Dados", 20, 20);
    doc.text(`Nome: ${nomeTransportadora}`, 20, 30);
    doc.text(`Código: ${codigo}`, 20, 40);
    doc.text(`Número NF: ${numeroNF}`, 20, 50);
    doc.text(`Descrição: ${descricao}`, 20, 60);
    doc.text(`Quantidade: ${quantidade}`, 20, 70);
    doc.text(`Unidade: ${unidade}`, 20, 80);
    doc.text(`Valor Total: ${valorTotal}`, 20, 90);
    doc.text(`Data de Saída: ${dataSaida}`, 20, 100);
    doc.save("transportadora.pdf");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-6xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-2xl font-bold">
            Cadastro de Transportadora
          </CardTitle>
          <div className="text-center text-lg text-gray-600">
            Informe os dados da transportadora
          </div>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Informações de Transportadora */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nomeTransportadora">
                    Nome da Transportadora:
                  </Label>
                  <Input
                    id="nomeTransportadora"
                    value={nomeTransportadora}
                    onChange={(e) => setNomeTransportadora(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código:</Label>
                  <Input
                    id="codigo"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numeroNF">Número NF:</Label>
                  <Input
                    id="numeroNF"
                    value={numeroNF}
                    onChange={(e) => setNumeroNF(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição:</Label>
                  <Input
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantidade">Quantidade:</Label>
                  <Input
                    id="quantidade"
                    type="number"
                    value={quantidade}
                    onChange={(e) => setQuantidade(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unidade">Unidade:</Label>
                  <Input
                    id="unidade"
                    value={unidade}
                    onChange={(e) => setUnidade(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valorTotal">Valor Total:</Label>
                  <Input
                    id="valorTotal"
                    type="number"
                    value={valorTotal}
                    onChange={(e) => setValorTotal(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataSaida">Data de Saída:</Label>
                  <Input
                    id="dataSaida"
                    type="date"
                    value={dataSaida}
                    onChange={(e) => setDataSaida(e.target.value)}
                  />
                </div>
              </div>

              {/* Clientes e Fornecedores */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Clientes:</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientes.map((cliente) => (
                        <SelectItem key={cliente.id} value={cliente.id}>
                          {cliente.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fornecedores:</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um fornecedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {fornecedores.map((fornecedor) => (
                        <SelectItem key={fornecedor.id} value={fornecedor.id}>
                          {fornecedor.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" type="button">
                Cancelar
              </Button>
              <Button type="button" onClick={handleExportXLSX}>
                Exportar XLSX
              </Button>
              <Button type="button" onClick={handleExportPDF}>
                Exportar PDF
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarrierPage;
