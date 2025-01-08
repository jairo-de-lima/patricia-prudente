
"use client";
import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver"
import ExcelJS from 'exceljs';
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";


interface Cliente {
  id: string;
  codigo: string;
  cliente: string;
  cnpj: string;
  endereco: string;
  cep: string;
  emailFin: string;
  telefoneFixo?: string;
  celular?: string;
  email: string;
  inscEstad: string;
  suframa?: string;
}

interface Fornecedor {
  id: string;
  codigo: string;
  fornecedor: string;
  cnpj: string;
  endereco: string;
  telefoneFixo?: string;
  cep: string;
  emailFin: string;
  celular?: string;
  emailPedido: string;
  inscEstad: string;
  comissao?: number;
  dataRecebimento?: Date;
}

interface Transportadora {
  id: string;
  codigo: string;
  transportadora: string;
  numeroNF: string;
  descricao?: string;
  quantidade: number;
  valorUn: number;
  valorTotal: number;
  dataSaida?: Date;
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

  //Função Pré Visualizar 
  const handlePreviewPDF = async () => {
    if (!selectedCliente || !selectedFornecedor || !selectedTransportadora) {
      alert("Por favor, selecione todos os dados necessários");
      return;
    }

    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(10);

    // Cabeçalho
    doc.text(`${selectedFornecedor.fornecedor}`, 20, 20);
    doc.text(`Pedido nº: ${selectedFornecedor.codigo}`, 150, 20);
    doc.text(`${selectedFornecedor.endereco}`, 20, 25);
    doc.text(`${selectedFornecedor.cep}`, 150, 25);
    doc.text(
      `${selectedFornecedor.telefoneFixo} / ${selectedFornecedor.celular}`,
      20,
      30
    );
    doc.text(`${selectedFornecedor.emailFin}`, 20, 35);

    // Dados do Cliente
    doc.text("CLIENTE:", 20, 75);
    doc.text(`${selectedCliente.cliente}`, 70, 75);
    doc.text(`Código: ${selectedCliente.codigo}`, 20, 80);
    doc.text(`CNPJ: ${selectedCliente.cnpj}`, 20, 85);
    doc.text(`Endereço: ${selectedCliente.endereco}`, 20, 90);
    doc.text(`CEP: ${selectedCliente.cep}`, 150, 90);
    doc.text(`IE: ${selectedCliente.inscEstad}`, 20, 95);
    doc.text(`Suframa: ${selectedCliente.suframa || "Inexistente"}`, 150, 95);

    // Dados da Transportadora
    doc.text("TRANSPORTADORA:", 20, 110);
    doc.text(`${selectedTransportadora.transportadora}`, 70, 110);
    doc.text(`NF: ${selectedTransportadora.numeroNF}`, 20, 115);
    doc.text(
      `Data Saída: ${selectedTransportadora.dataSaida
        ? format(new Date(selectedTransportadora.dataSaida), "dd/MM/yyyy")
        : ""
      }`,
      150,
      115
    );

    // Tabela de Produtos
    const headers = [
      "Código",
      "Descrição do Produto",
      "Unid.",
      "Qtde",
      "Valor Un.",
      "Total"
    ];
    let y = 130;

    // Cabeçalho da tabela
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y - 5, 170, 7, "F");
    headers.forEach((header, i) => {
      const x = 20 + i * 28;
      doc.text(header, x, y);
    });

    // 4 linhas vazias para preenchimento manual
    for (let i = 0; i < 4; i++) {
      y += 10;
      doc.line(20, y, 190, y);
    }

    // Adicionando imagem ao PDF a partir da pasta public
    const imageUrl = "/logo.svg"; // Caminho relativo à raiz do projeto
    const image = await fetch(imageUrl).then((res) => res.blob());
    const reader = new FileReader();
    reader.onload = function () {
      if (reader.result) {
        const base64Image = reader.result.toString().split(",")[1];
        doc.addImage(base64Image, "SVG", 150, 10, 50, 30); // Ajuste a posição e o tamanho conforme necessário

        // Footer
        doc.text("VISITEM NOSSO SHOWROOM", 80, 270);
        doc.text("ONE REPRESENTAÇÕES AGRADECE A SUA PREFERÊNCIA !!!", 60, 275);
        doc.text("W W W . O N E R E P R E S E N T A C O E S . C O M . B R", 60, 280);

        // Abrir a pré-visualização em uma nova janela
        window.open(doc.output('bloburl'), '_blank');
      } else {
        alert("Falha ao carregar a imagem.");
      }
    };
    reader.readAsDataURL(image);
  };



  const handleExportPDF = async () => {
    if (!selectedCliente || !selectedFornecedor || !selectedTransportadora) {
      alert("Por favor, selecione todos os dados necessários");
      return;
    }

    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(10);

    // Cabeçalho
    doc.text(`${selectedFornecedor.fornecedor}`, 20, 20);
    doc.text(`Pedido nº: ${selectedFornecedor.codigo}`, 150, 20);
    doc.text(`${selectedFornecedor.endereco}`, 20, 25);
    doc.text(`${selectedFornecedor.cep}`, 150, 25);
    doc.text(
      `${selectedFornecedor.telefoneFixo} / ${selectedFornecedor.celular}`,
      20,
      30
    );
    doc.text(`${selectedFornecedor.emailFin}`, 20, 35);

    // Dados do Cliente
    doc.text("CLIENTE:", 20, 75);
    doc.text(`${selectedCliente.cliente}`, 70, 75);
    doc.text(`Código: ${selectedCliente.codigo}`, 20, 80);
    doc.text(`CNPJ: ${selectedCliente.cnpj}`, 20, 85);
    doc.text(`Endereço: ${selectedCliente.endereco}`, 20, 90);
    doc.text(`CEP: ${selectedCliente.cep}`, 150, 90);
    doc.text(`IE: ${selectedCliente.inscEstad}`, 20, 95);
    doc.text(`Suframa: ${selectedCliente.suframa || "Inexistente"}`, 150, 95);

    // Dados da Transportadora
    doc.text("TRANSPORTADORA:", 20, 110);
    doc.text(`${selectedTransportadora.transportadora}`, 70, 110);
    doc.text(`NF: ${selectedTransportadora.numeroNF}`, 20, 115);
    doc.text(
      `Data Saída: ${selectedTransportadora.dataSaida
        ? format(new Date(selectedTransportadora.dataSaida), "dd/MM/yyyy")
        : ""
      }`,
      150,
      115
    );

    // Tabela de Produtos
    const headers = [
      "Código",
      "Descrição do Produto",
      "Unid.",
      "Qtde",
      "Valor Un.",
      "Total",
    ];
    let y = 130;

    // Cabeçalho da tabela
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y - 5, 170, 7, "F");
    headers.forEach((header, i) => {
      const x = 20 + i * 28;
      doc.text(header, x, y);
    });

    // 4 linhas vazias para preenchimento manual
    for (let i = 0; i < 4; i++) {
      y += 10;
      doc.line(20, y, 190, y);
    }

    // Adicionando imagem ao PDF a partir da pasta public
    const imageUrl = "/logo.svg"; // Caminho relativo à raiz do projeto
    const image = await fetch(imageUrl).then((res) => res.blob());
    const reader = new FileReader();
    reader.onload = function () {
      if (reader.result) {
        const base64Image = reader.result.toString().split(",")[1];
        doc.addImage(base64Image, "SGV", 150, 10, 50, 30); // Ajuste a posição e o tamanho conforme necessário

        // Footer
        doc.text("VISITEM NOSSO SHOWROOM", 80, 270);
        doc.text("ONE REPRESENTAÇÕES AGRADECE A SUA PREFERÊNCIA !!!", 60, 275);
        doc.text("W W W . O N E R E P R E S E N T A C O E S . C O M . B R", 60, 280);

        doc.save("pedido.pdf");
      } else {
        alert("Falha ao carregar a imagem.");
      }
    };
    reader.readAsDataURL(image);
  };


  const handlePreviewXLSX = async () => {
    if (!selectedCliente || !selectedFornecedor || !selectedTransportadora) {
      alert("Por favor, selecione todos os dados necessários");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Pedido');

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
      ["FORNECEDOR:", selectedFornecedor.fornecedor, "", "", ""],
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
      ["CLIENTE:", selectedCliente.cliente, "", "", ""],
      ["Código:", selectedCliente.codigo, "CNPJ:", selectedCliente.cnpj, ""],
      ["Endereço:", selectedCliente.endereco, "CEP:", selectedCliente.cep, ""],
      [
        "IE:",
        selectedCliente.inscEstad,
        "Suframa:",
        selectedCliente.suframa || "Inexistente",
        "",
      ],
      [""],
      ["TRANSPORTADORA:", selectedTransportadora.transportadora, "", "", ""],
      [
        "NF:",
        selectedTransportadora.numeroNF,
        "Data Saída:",
        selectedTransportadora.dataSaida
          ? format(new Date(selectedTransportadora.dataSaida), "dd/MM/yyyy")
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

    headerData.forEach((row, index) => {
      worksheet.addRow(row);
    });

    worksheet.columns = [
      { width: 15 },
      { width: 40 },
      { width: 8 },
      { width: 10 },
      { width: 12 },
      { width: 12 },
    ];

    try {
      const imageUrl = "/logo.png";
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();

      const imageId = workbook.addImage({
        buffer: arrayBuffer,
        extension: 'png',
      });

      worksheet.addImage(imageId, 'A1:C3');

      const buffer = await workbook.xlsx.writeBuffer();
      const file = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(file, "pedido_preview.xlsx");
    } catch (error) {
      console.error("Erro ao carregar a imagem:", error);
      alert("Falha ao carregar a imagem.");
    }
  };







  const handleExportXLSX = async () => {
    if (!selectedCliente || !selectedFornecedor || !selectedTransportadora) {
      alert("Por favor, selecione todos os dados necessários");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Pedido');

    // Dados do cabeçalho
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
      ["FORNECEDOR:", selectedFornecedor.fornecedor, "", "", ""],
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
      ["CLIENTE:", selectedCliente.cliente, "", "", ""],
      ["Código:", selectedCliente.codigo, "CNPJ:", selectedCliente.cnpj, ""],
      ["Endereço:", selectedCliente.endereco, "CEP:", selectedCliente.cep, ""],
      [
        "IE:",
        selectedCliente.inscEstad,
        "Suframa:",
        selectedCliente.suframa || "Inexistente",
        "",
      ],
      [""],
      ["TRANSPORTADORA:", selectedTransportadora.transportadora, "", "", ""],
      [
        "NF:",
        selectedTransportadora.numeroNF,
        "Data Saída:",
        selectedTransportadora.dataSaida
          ? format(new Date(selectedTransportadora.dataSaida), "dd/MM/yyyy")
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

    headerData.forEach((row, index) => {
      worksheet.addRow(row);
    });

    worksheet.columns = [
      { width: 15 },
      { width: 40 },
      { width: 8 },
      { width: 10 },
      { width: 12 },
      { width: 12 },
    ];

    // Adicionar imagem ao XLSX
    try {
      const imageUrl = "/logo.png"; // Caminho relativo à raiz do projeto
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();

      const imageId = workbook.addImage({
        buffer: arrayBuffer,
        extension: 'png',
      });

      worksheet.addImage(imageId, 'A1:C3'); // Ajuste a posição e o tamanho conforme necessário

      const buffer = await workbook.xlsx.writeBuffer();
      const file = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(file, "pedido.xlsx");
    } catch (error) {
      console.error("Erro ao carregar a imagem:", error);
      alert("Falha ao carregar a imagem.");
    }
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
              value={selectedFornecedor?.id || ""}
              onChange={(e) =>
                setSelectedFornecedor(
                  fornecedores.find((f) => f.id === e.target.value) || null
                )
              }
            >
              <option value="">Selecione um fornecedor</option>
              {fornecedores.map((fornecedor) => (
                <option key={fornecedor.id} value={fornecedor.id}>
                  {fornecedor.fornecedor} - {fornecedor.codigo}
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
              value={selectedCliente?.id || ""}
              onChange={(e) =>
                setSelectedCliente(
                  clientes.find((c) => c.id === e.target.value) || null
                )
              }
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.cliente} - {cliente.codigo}
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
              value={selectedTransportadora?.id || ""}
              onChange={(e) =>
                setSelectedTransportadora(
                  transportadoras.find((t) => t.id === e.target.value) || null
                )
              }
            >
              <option value="">Selecione uma transportadora</option>
              {transportadoras.map((transportadora) => (
                <option key={transportadora.id} value={transportadora.id}>
                  {transportadora.transportadora} - NF:{" "}
                  {transportadora.numeroNF}
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
                <p>{selectedFornecedor.fornecedor}</p>
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
                <p>{selectedCliente.cliente}</p>
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
                <p>{selectedTransportadora.transportadora}</p>
                <p>NF: {selectedTransportadora.numeroNF}</p>
                <p>
                  Data:{" "}
                  {selectedTransportadora.dataSaida
                    ? format(
                      new Date(selectedTransportadora.dataSaida),
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
        <Button onClick={handlePreviewPDF} className="disabled:opacity-50" disabled={
          !selectedCliente || !selectedFornecedor || !selectedTransportadora
        }>Pré-visualizar PDF</Button>
        <Button onClick={handleExportPDF} className="disabled:opacity-50" disabled={
          !selectedCliente || !selectedFornecedor || !selectedTransportadora
        }>Exportar PDF</Button>
      </div>

      <div className="flex gap-4 justify-start">

        <Button onClick={handlePreviewXLSX} className="bg-green-500 hover:bg-green-600 disabled:opacity-50"
          disabled={
            !selectedCliente || !selectedFornecedor || !selectedTransportadora
          } >Pré-visualizar XLSX </Button>

        <Button
          onClick={handleExportXLSX}
          className="bg-green-500 hover:bg-green-600 disabled:opacity-50"
          disabled={
            !selectedCliente || !selectedFornecedor || !selectedTransportadora
          }
        > Exportar XLSX </Button>


      </div>
    </div>
  );
};

export default TransportadoraExport;
