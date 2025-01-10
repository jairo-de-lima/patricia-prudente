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
import { PDFDocument } from "pdf-lib";
import { format } from "date-fns";

// Types mantidos os mesmos...
interface Cliente {
  id: string;
  dataCad: Date;
  codigo: string;
  razaoSocial: string;
  cnpj: string;
  ie: string;
  endereco: string;
  endNumero: string;
  cep: string;
  cidade: string;
  estado: string;
  telefoneFixo?: string;
  celular?: string;
  email?: string;
  emailFin: string;
  suframa?: string;
  transp?: string;
  tel?: string;
  NumeroNF?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Fornecedor {
  id: string;
  dataCad: Date;
  codigo: string;
  razaoSocial: string;
  cnpj: string;
  ie: string;
  endereco: string;
  endNumero: string;
  cep: string;
  telefoneFixo?: string;
  celular?: string;
  emailPedido: string;
  emailFin: string;
  comissao?: string;
  dataRecebimento?: Date;
  obs?: string;
  NumeroNF?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Transportadora {
  id: string;
  dataCad: Date;
  codigo: string;
  razaoSocial: string;
  cnpj: string;
  ie: string;
  endereco: string;
  endNumero: string;
  cep: string;
  cidade: string;
  estado: string;
  telefoneFixo?: string;
  celular?: string;
  email?: string;
  emailFina?: string;
  obs?: string;
  NumeroNF?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FilterAndPDFGenerator = () => {
  const [selectedType, setSelectedType] = useState<string>("clientes");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [transportadoras, setTransportadoras] = useState<Transportadora[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Funções separadas para buscar cada tipo de dado
  const fetchClientes = async () => {
    try {
      const response = await fetch("/api/clientes");
      if (!response.ok) throw new Error("Erro ao carregar clientes");
      const data = await response.json();
      setClientes(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar clientes"
      );
    }
  };

  const fetchFornecedores = async () => {
    try {
      const response = await fetch("/api/fornecedores");
      if (!response.ok) throw new Error("Erro ao carregar fornecedores");
      const data = await response.json();
      setFornecedores(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar fornecedores"
      );
    }
  };

  const fetchTransportadoras = async () => {
    try {
      const response = await fetch("/api/transportadora");
      if (!response.ok) throw new Error("Erro ao carregar transportadoras");
      const data = await response.json();
      setTransportadoras(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar transportadoras"
      );
    }
  };

  // Função para carregar dados baseado no tipo selecionado
  const loadData = async () => {
    setLoading(true);
    setError(null);
    setSelectedItems([]);

    try {
      if (selectedType === "clientes") {
        await fetchClientes();
      } else if (selectedType === "fornecedores") {
        await fetchFornecedores();
      } else if (selectedType === "transportadoras") {
        await fetchTransportadoras();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedType]);

  // Função para gerar PDF
  const generatePDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      let page = pdfDoc.addPage([595.276, 841.89]); // A4
      const font = await pdfDoc.embedFont("Helvetica");

      // Carregar e adicionar a logo PNG
      const logoResponse = await fetch("/logo.png");
      const logoArrayBuffer = await logoResponse.arrayBuffer();
      const logoImage = await pdfDoc.embedPng(logoArrayBuffer);

      // Dimensões e posição da logo
      const logoWidth = 80; // Largura da logo
      const logoHeight = 50; // Altura da logo
      const logoX = 50; // Posição X da logo
      const logoY = page.getHeight() - 100; // Posição Y da logo

      page.drawImage(logoImage, {
        x: logoX,
        y: logoY,
        width: logoWidth,
        height: logoHeight,
      });

      // Texto ao lado da logo
      const nameX = logoX + logoWidth + 50; // Posição X do nome, ao lado da logo
      const nameY = logoY + logoHeight - 15; // Centralizado verticalmente com a logo

      page.drawText("Patricia Prudente", {
        x: nameX,
        y: nameY,
        size: 14,
        font,
      });

      page.drawText("representante comercial", {
        x: nameX,
        y: nameY - 18, // Abaixo do nome
        size: 10,
        font,
      });

      // Centralizar o cabeçalho "Cadastro de Clientes"
      const headerText =
        selectedType === "clientes"
          ? "Cadastro de Cliente"
          : selectedType === "fornecedores"
          ? "Cadastro de Fornecedor"
          : "Cadastro de Transportadora";

      const headerFontSize = 14;
      const textWidth = font.widthOfTextAtSize(headerText, headerFontSize);
      const headerX = (page.getWidth() - textWidth) / 2; // Centraliza horizontalmente
      const headerY = logoY - 50; // Abaixo da logo

      page.drawText(headerText, {
        x: headerX,
        y: headerY,
        size: headerFontSize,
        font,
      });

      let yPosition = headerY - 50; // Posição inicial do conteúdo

      const drawField = (
        label: string,
        value: string | undefined,
        y: number
      ) => {
        page.drawText(`${label}:`, {
          x: 50,
          y,
          size: 12,
        });
        page.drawText(value || "_________________", {
          x: 200,
          y,
          size: 12,
        });
      };

      // Obter os dados selecionados com base no tipo
      let selectedData: any[] = [];
      if (selectedType === "clientes") {
        selectedData = clientes.filter((item) =>
          selectedItems.includes(item.id)
        );
      } else if (selectedType === "fornecedores") {
        selectedData = fornecedores.filter((item) =>
          selectedItems.includes(item.id)
        );
      } else if (selectedType === "transportadoras") {
        selectedData = transportadoras.filter((item) =>
          selectedItems.includes(item.id)
        );
      }

      selectedData.forEach((item) => {
        yPosition -= 30;

        // Campos comuns
        drawField(
          "Data Cad",
          format(new Date(item.dataCad), "dd/MM/yyyy"),
          yPosition
        );
        yPosition -= 25;
        drawField("Código", item.codigo, yPosition);
        yPosition -= 25;
        drawField("Razão Social", item.razaoSocial, yPosition);
        yPosition -= 25;
        drawField("CNPJ", item.cnpj, yPosition);
        yPosition -= 25;
        drawField("IE", item.ie, yPosition);
        yPosition -= 25;
        drawField("Endereço", `${item.endereco}, ${item.endNumero}`, yPosition);
        yPosition -= 25;
        drawField("CEP", item.cep, yPosition);
        yPosition -= 25;
        drawField("Telefone Fixo", item.telefoneFixo || "", yPosition);
        yPosition -= 25;
        drawField("Celular", item.celular || "", yPosition);
        yPosition -= 25;

        // Campos específicos por tipo
        if (selectedType === "clientes") {
          drawField("Email", (item as Cliente).email || "", yPosition);
          yPosition -= 25;
          drawField("Email Financeiro", (item as Cliente).emailFin, yPosition);
          yPosition -= 25;
          drawField("Suframa", (item as Cliente).suframa || "", yPosition);
          yPosition -= 25;
          drawField(
            "Transportadora",
            (item as Cliente).transp || "",
            yPosition
          );
          yPosition -= 25;
        } else if (selectedType === "fornecedores") {
          drawField(
            "Email Pedido",
            (item as Fornecedor).emailPedido,
            yPosition
          );
          yPosition -= 25;
          drawField(
            "Email Financeiro",
            (item as Fornecedor).emailFin,
            yPosition
          );
          yPosition -= 25;
          drawField("Comissão", (item as Fornecedor).comissao || "", yPosition);
          yPosition -= 25;
          if ((item as Fornecedor).dataRecebimento) {
            drawField(
              "Data Recebimento",
              format(
                new Date((item as Fornecedor).dataRecebimento!),
                "dd/MM/yyyy"
              ),
              yPosition
            );
            yPosition -= 25;
          }
        } else if (selectedType === "transportadoras") {
          drawField("Email", (item as Transportadora).email || "", yPosition);
          yPosition -= 25;
          drawField(
            "Email Financeiro",
            (item as Transportadora).emailFina || "",
            yPosition
          );
          yPosition -= 25;
          drawField("Cidade", (item as Transportadora).cidade, yPosition);
          yPosition -= 25;
          drawField("Estado", (item as Transportadora).estado, yPosition);
          yPosition -= 25;
        }

        // Adiciona nova página se necessário
        if (yPosition < 100) {
          const newPage = pdfDoc.addPage([595.276, 841.89]);
          page = newPage;
          yPosition = 750;
        }
      });

      // Gerar e fazer download do PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cadastro_${selectedType}_${new Date().getTime()}.pdf`;
      link.click();

      // Limpar URL após download
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      setError("Erro ao gerar o PDF. Por favor, tente novamente.");
    }
  };

  // Obter dados atuais baseado no tipo selecionado
  const getCurrentData = () => {
    if (selectedType === "clientes") return clientes;
    if (selectedType === "fornecedores") return fornecedores;
    if (selectedType === "transportadoras") return transportadoras;
    return [];
  };

  return (
    <Card className="w-full max-w-6xl mx-auto p-6">
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clientes">Clientes</SelectItem>
                <SelectItem value="fornecedores">Fornecedores</SelectItem>
                <SelectItem value="transportadoras">Transportadoras</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={generatePDF}
              disabled={selectedItems.length === 0 || loading}
            >
              Gerar PDF
            </Button>

            <Button onClick={loadData} variant="outline">
              Atualizar dados
            </Button>
          </div>

          {error && (
            <div className="text-red-500 p-4 rounded bg-red-50">{error}</div>
          )}

          {loading ? (
            <div className="text-center p-4">Carregando...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4">Selecionar</th>
                    <th className="p-4">Código</th>
                    <th className="p-4">Razão Social</th>
                    <th className="p-4">CNPJ</th>
                    <th className="p-4">Data Cad.</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getCurrentData().map((item) => (
                    <tr key={item.id}>
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => {
                            setSelectedItems((prev) =>
                              prev.includes(item.id)
                                ? prev.filter((id) => id !== item.id)
                                : [...prev, item.id]
                            );
                          }}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="p-4">{item.codigo}</td>
                      <td className="p-4">{item.razaoSocial}</td>
                      <td className="p-4">{item.cnpj}</td>
                      <td className="p-4">
                        {format(new Date(item.dataCad), "dd/MM/yyyy")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterAndPDFGenerator;
