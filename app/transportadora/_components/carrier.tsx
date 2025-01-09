"use client";
import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { handlePreviewPDF, handleExportPDF } from "./pdfGenerator"; // ajuste o caminho conforme necessário

interface Cliente {
  id: string;
  dataCad: Date;
  codigo: string;
  razaoSocial: string;
  cnpj: string; // Deve ser único
  ie: string; // Inscrição Estadual, único
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
  cnpj: string; // Deve ser único
  ie: string; // Inscrição Estadual, único
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
  cnpj: string; // Deve ser único
  ie: string; // Inscrição Estadual, único
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

const TransportadoraExport: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [transportadoras, setTransportadoras] = useState<Transportadora[]>([]);

  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [selectedFornecedor, setSelectedFornecedor] =
    useState<Fornecedor | null>(null);
  const [selectedTransportadora, setSelectedTransportadora] =
    useState<Transportadora | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesRes, fornecedoresRes, transportadorasRes] =
          await Promise.all([
            fetch("/api/clientes"),
            fetch("/api/fornecedores"),
            fetch("/api/transportadora"),
          ]);

        const clientesData = await clientesRes.json();
        const fornecedoresData = await fornecedoresRes.json();
        const transportadorasData = await transportadorasRes.json();

        setClientes(clientesData);
        setFornecedores(fornecedoresData);
        setTransportadoras(transportadorasData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  //Função pré visualizar
  // const handlePreviewPDF = () => {
  //   if (!selectedCliente || !selectedFornecedor || !selectedTransportadora) {
  //     alert("Por favor, selecione todos os dados necessários");
  //     return;
  //   }

  //   const doc = new jsPDF();
  //   doc.setFont("helvetica");
  //   doc.setFontSize(10);

  //   // Cabeçalho
  //   doc.text(`${selectedFornecedor.razaoSocial}`, 20, 20);
  //   doc.text(`Pedido nº: ${selectedFornecedor.NumeroNF}`, 150, 20);
  //   doc.text(
  //     `${selectedFornecedor.endereco} N°: ${selectedFornecedor.endNumero}`,
  //     20,
  //     25
  //   );
  //   doc.text(`${selectedFornecedor.cep}`, 150, 25);
  //   doc.text(
  //     `${selectedFornecedor.telefoneFixo} / ${selectedFornecedor.celular}`,
  //     20,
  //     30
  //   );
  //   doc.text(`${selectedFornecedor.emailFin}`, 20, 35);

  //   // Dados do Cliente
  //   doc.text("CLIENTE:", 20, 75);
  //   doc.text(`${selectedCliente.cliente}`, 70, 75);
  //   doc.text(`Código: ${selectedCliente.codigo}`, 20, 80);
  //   doc.text(`CNPJ: ${selectedCliente.cnpj}`, 20, 85);
  //   doc.text(`Endereço: ${selectedCliente.endereco}`, 20, 90);
  //   doc.text(`CEP: ${selectedCliente.cep}`, 150, 90);
  //   doc.text(`IE: ${selectedCliente.inscEstad}`, 20, 95);
  //   doc.text(`Suframa: ${selectedCliente.suframa || "Inexistente"}`, 150, 95);

  //   // Dados da Transportadora
  //   doc.text("TRANSPORTADORA:", 20, 110);
  //   doc.text(`${selectedTransportadora.transportadora}`, 70, 110);
  //   doc.text(`NF: ${selectedTransportadora.numeroNF}`, 20, 115);
  //   doc.text(
  //     `Data Saída: ${
  //       selectedTransportadora.dataSaida
  //         ? format(new Date(selectedTransportadora.dataSaida), "dd/MM/yyyy")
  //         : ""
  //     }`,
  //     150,
  //     115
  //   );

  //   // Tabela de Produtos
  //   const headers = [
  //     "Código",
  //     "Descrição do Produto",
  //     "Unid.",
  //     "Qtde",
  //     "Valor Un.",
  //     "Total",
  //   ];
  //   let y = 130;

  //   // Cabeçalho da tabela
  //   doc.setFillColor(240, 240, 240);
  //   doc.rect(20, y - 5, 170, 7, "F");
  //   headers.forEach((header, i) => {
  //     const x = 20 + i * 28;
  //     doc.text(header, x, y);
  //   });

  //   // 4 linhas vazias para preenchimento manual
  //   for (let i = 0; i < 4; i++) {
  //     y += 10;
  //     doc.line(20, y, 190, y);
  //   }

  //   // Rodapé
  //   doc.text("VISITEM NOSSO SHOWROOM", 80, 270);
  //   doc.text("ONE REPRESENTAÇÕES AGRADECE A SUA PREFERÊNCIA !!!", 60, 275);
  //   doc.text(
  //     "W W W . O N E R E P R E S E N T A C O E S . C O M . B R",
  //     60,
  //     280
  //   );

  //   // Abrir a pré-visualização em uma nova janela
  //   window.open(doc.output("bloburl"), "_blank");
  // };

  // const handleExportPDF = () => {
  //   if (!selectedCliente || !selectedFornecedor || !selectedTransportadora) {
  //     alert("Por favor, selecione todos os dados necessários");
  //     return;
  //   }

  //   const doc = new jsPDF();
  //   doc.setFont("helvetica");
  //   doc.setFontSize(10);

  //   // Cabeçalho
  //   doc.text(`${selectedFornecedor.fornecedor}`, 20, 20);
  //   doc.text(`Pedido nº: ${selectedFornecedor.codigo}`, 150, 20);
  //   doc.text(`${selectedFornecedor.endereco}`, 20, 25);
  //   doc.text(`${selectedFornecedor.cep}`, 150, 25);
  //   doc.text(
  //     `${selectedFornecedor.telefoneFixo} / ${selectedFornecedor.celular}`,
  //     20,
  //     30
  //   );
  //   doc.text(`${selectedFornecedor.emailFin}`, 20, 35);

  //   // // Dados do Fornecedor
  //   // doc.text("FORNECEDOR:", 20, 45);
  //   // doc.text(`${selectedFornecedor.fornecedor}`, 70, 45);
  //   // doc.text(`Código: ${selectedFornecedor.codigo}`, 20, 50);
  //   // doc.text(`CNPJ: ${selectedFornecedor.cnpj}`, 20, 55);
  //   // doc.text(`Endereço: ${selectedFornecedor.endereco}`, 20, 60);
  //   // doc.text(`CEP: ${selectedFornecedor.cep}`, 150, 60);

  //   // Dados do Cliente
  //   doc.text("CLIENTE:", 20, 75);
  //   doc.text(`${selectedCliente.cliente}`, 70, 75);
  //   doc.text(`Código: ${selectedCliente.codigo}`, 20, 80);
  //   doc.text(`CNPJ: ${selectedCliente.cnpj}`, 20, 85);
  //   doc.text(`Endereço: ${selectedCliente.endereco}`, 20, 90);
  //   doc.text(`CEP: ${selectedCliente.cep}`, 150, 90);
  //   doc.text(`IE: ${selectedCliente.inscEstad}`, 20, 95);
  //   doc.text(`Suframa: ${selectedCliente.suframa || "Inexistente"}`, 150, 95);

  //   // Dados da Transportadora
  //   doc.text("TRANSPORTADORA:", 20, 110);
  //   doc.text(`${selectedTransportadora.transportadora}`, 70, 110);
  //   doc.text(`NF: ${selectedTransportadora.numeroNF}`, 20, 115);
  //   doc.text(
  //     `Data Saída: ${
  //       selectedTransportadora.dataSaida
  //         ? format(new Date(selectedTransportadora.dataSaida), "dd/MM/yyyy")
  //         : ""
  //     }`,
  //     150,
  //     115
  //   );

  //   // Tabela de Produtos
  //   const headers = [
  //     "Código",
  //     "Descrição do Produto",
  //     "Unid.",
  //     "Qtde",
  //     "Valor Un.",
  //     "Total",
  //   ];
  //   let y = 130;

  //   // Cabeçalho da tabela
  //   doc.setFillColor(240, 240, 240);
  //   doc.rect(20, y - 5, 170, 7, "F");
  //   headers.forEach((header, i) => {
  //     const x = 20 + i * 28;
  //     doc.text(header, x, y);
  //   });

  //   // 4 linhas vazias para preenchimento manual
  //   for (let i = 0; i < 4; i++) {
  //     y += 10;
  //     doc.line(20, y, 190, y);
  //   }

  //   // Adicionando imagem ao PDF a partir da pasta public
  //   const imageUrl = "/logo.svg"; // Caminho relativo à raiz do projeto
  //   // const image = await fetch(imageUrl).then((res) => res.blob());
  //   const reader = new FileReader();
  //   reader.onload = function () {
  //     const base64Image = reader.result.split(",")[1];
  //     doc.addImage(base64Image, "PNG", 150, 10, 50, 30); // Ajuste a posição e o tamanho conforme necessário
  //     // Footer
  //     doc.text("VISITEM NOSSO SHOWROOM", 80, 270);
  //     doc.text("ONE REPRESENTAÇÕES AGRADECE A SUA PREFERÊNCIA !!!", 60, 275);
  //     doc.text(
  //       "W W W . O N E R E P R E S E N T A C O E S . C O M . B R",
  //       60,
  //       280
  //     );
  //     doc.save("pedido.pdf");
  //   };
  //   reader.readAsDataURL(image);
  // };

  const handlePreviewButtonClick = () => {
    if (!selectedCliente || !selectedFornecedor || !selectedTransportadora) {
      alert("Por favor, selecione todos os dados necessários");
      return;
    }

    handlePreviewPDF(
      selectedCliente,
      selectedFornecedor,
      selectedTransportadora
    );
  };

  const handleExportButtonClick = () => {
    if (!selectedCliente || !selectedFornecedor || !selectedTransportadora) {
      alert("Por favor, selecione todos os dados necessários");
      return;
    }

    handleExportPDF(
      selectedCliente,
      selectedFornecedor,
      selectedTransportadora
    );
  };

  const handleExportXLSX = () => {
    if (!selectedCliente || !selectedFornecedor || !selectedTransportadora) {
      alert("Por favor, selecione todos os dados necessários");
      return;
    }

    const headerData = [
      // [
      //   "ONE REPRESENTAÇÕES",
      //   "",
      //   "",
      //   `Pedido nº: ${selectedTransportadora.codigo}`,
      //   "",
      // ],
      // ["Av. Prestes Maia 702 - 6º And Sl 61", "", "", "CEP:01031-000", ""],
      // ["Fones: (0xx11) 3313-7217 / (0xx11) 3313-7741", "", "", "", ""],
      // ["email: financeiro@onerepresentacoes.com.br", "", "", "", ""],
      [""],
      ["FORNECEDOR:", selectedFornecedor.razaoSocial, "", "", ""],
      [
        "Código:",
        selectedFornecedor.codigo,
        "CNPJ:",
        selectedFornecedor.cnpj,
        "",
      ],
      [
        "Endereço:",
        selectedFornecedor.endereco,
        "CEP:",
        selectedFornecedor.cep,
        "",
      ],
      [""],
      ["CLIENTE:", selectedCliente.razaoSocial, "", "", ""],
      ["Código:", selectedCliente.codigo, "CNPJ:", selectedCliente.cnpj, ""],
      ["Endereço:", selectedCliente.endereco, "CEP:", selectedCliente.cep, ""],
      [
        "IE:",
        selectedCliente.ie,
        "Suframa:",
        selectedCliente.suframa || "Inexistente",
        "",
      ],
      [""],
      ["TRANSPORTADORA:", selectedTransportadora.razaoSocial, "", "", ""],
      [
        "NF:",
        selectedTransportadora.NumeroNF,
        "Data Saída:",
        selectedTransportadora.dataCad
          ? format(new Date(selectedTransportadora.dataCad), "dd/MM/yyyy")
          : "",
        "",
      ],
      [""],
      ["Código", "Descrição do Produto", "Unid.", "Qtde", "Valor Un.", "Total"],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
    ];

    const ws = XLSX.utils.aoa_to_sheet(headerData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pedido");

    ws["!cols"] = [
      { wch: 15 },
      { wch: 40 },
      { wch: 8 },
      { wch: 10 },
      { wch: 12 },
      { wch: 12 },
    ];

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "pedido.xlsx");
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Seleção de Fornecedor */}
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

        {/* Seleção de Cliente */}
        <Card>
          <CardHeader>
            <CardTitle>Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedCliente?.razaoSocial || ""}
              onChange={(e) =>
                setSelectedCliente(
                  clientes.find((c) => c.id === e.target.value) || null
                )
              }
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.razaoSocial} - {cliente.codigo}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        {/* Seleção de Transportadora */}
        <Card>
          <CardHeader>
            <CardTitle>Transportadora</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedTransportadora?.razaoSocial || ""}
              onChange={(e) =>
                setSelectedTransportadora(
                  transportadoras.find((t) => t.id === e.target.value) || null
                )
              }
            >
              <option value="">Selecione uma transportadora</option>
              {transportadoras.map((transportadora) => (
                <option key={transportadora.id} value={transportadora.id}>
                  {transportadora.razaoSocial} - NF: {transportadora.NumeroNF}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      </div>

      {/* Área de Visualização dos Dados Selecionados */}
      <Card className="mb-6 ">
        <CardHeader>
          <CardTitle>Dados Selecionados</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedFornecedor && (
            <Card>
              <CardHeader>
                <CardTitle>Fornecedor:</CardTitle>
              </CardHeader>

              <CardContent>
                <p>{selectedFornecedor.razaoSocial}</p>
                <p>Código: {selectedFornecedor.codigo}</p>
                <p>CNPJ: {selectedFornecedor.cnpj}</p>
              </CardContent>
            </Card>
          )}

          {selectedCliente && (
            <Card>
              <CardHeader>
                <CardTitle>Cliente:</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{selectedCliente.razaoSocial}</p>
                <p>Código: {selectedCliente.codigo}</p>
                <p>CNPJ: {selectedCliente.cnpj}</p>
              </CardContent>
            </Card>
          )}
          {selectedTransportadora && (
            <Card>
              <CardHeader>
                <CardTitle>Transportadora:</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{selectedTransportadora.razaoSocial}</p>
                <p>{selectedTransportadora.NumeroNF}</p>
                <p>
                  Data:{" "}
                  {selectedTransportadora.dataCad
                    ? format(
                        new Date(selectedTransportadora.dataCad),
                        "dd/MM/yyyy"
                      )
                    : "Não definida"}
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Botões de Exportação */}
      <div className="flex gap-4 justify-end">
        <Button
          onClick={handlePreviewButtonClick}
          className="disabled:opacity-50"
          disabled={
            !selectedCliente || !selectedFornecedor || !selectedTransportadora
          }
        >
          Pré-visualizar PDF
        </Button>
        <Button
          onClick={handleExportButtonClick}
          className="disabled:opacity-50"
          disabled={
            !selectedCliente || !selectedFornecedor || !selectedTransportadora
          }
        >
          Exportar PDF
        </Button>
      </div>
      <Button
        onClick={handleExportXLSX}
        className="bg-green-500 hover:bg-green-600 disabled:opacity-50"
        disabled={
          !selectedCliente || !selectedFornecedor || !selectedTransportadora
        }
      >
        Exportar XLSX
      </Button>
    </div>
  );
};

export default TransportadoraExport;
