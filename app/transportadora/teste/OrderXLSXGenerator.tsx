import React, { useState } from "react";
import ExcelJS from "exceljs";
import { Cliente, Fornecedor, Transportadora } from "@/app/types";

interface Props {
  clientes: Cliente[];
  fornecedores: Fornecedor[];
  transportadoras: Transportadora[];
  onGenerateXLSX?: () => void;
}

const OrderXLSXGenerator: React.FC<Props> = ({
  clientes,
  fornecedores,
  transportadoras,
  onGenerateXLSX,
}) => {
  const [selectedCliente, setSelectedCliente] = useState<string>("");
  const [selectedFornecedor, setSelectedFornecedor] = useState<string>("");
  const [selectedTransportadora, setSelectedTransportadora] =
    useState<string>("");

  const generateExcel = async () => {
    const cliente = clientes.find((c) => c.id === selectedCliente);
    const fornecedor = fornecedores.find((f) => f.id === selectedFornecedor);
    const transportadora = transportadoras.find(
      (t) => t.id === selectedTransportadora
    );

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Pedido");

    // Obter a logo
    const fetchBase64Logo = async () => {
      const response = await fetch("/logoxlsx.png");
      const blob = await response.blob();
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    };
    const logoBase64 = await fetchBase64Logo();

    // Adicionar a logo
    const logoId = workbook.addImage({
      base64: logoBase64,
      extension: "png",
    });

    worksheet.addImage(logoId, {
      tl: { col: 0, row: 0 },
      ext: { width: 100, height: 40 },
    });

    // Configurar larguras das colunas exatas
    worksheet.columns = [
      { width: 4 }, // Seq
      { width: 6 }, // Qtde
      { width: 5 }, // Unid
      { width: 10 }, // Cód
      { width: 40 }, // Descrição
      { width: 12 }, // Preço Unit
      { width: 12 }, // Total
      { width: 8 }, // DESC
      { width: 15 }, // Preço Unit c/ desc
      { width: 12 }, // Total
    ];

    // Título e cabeçalho
    worksheet.mergeCells("C1:J1");
    const titleCell = worksheet.getCell("C1");
    titleCell.value = "Patricia Prudente-Representante Comercial";
    titleCell.font = { bold: true, color: { argb: "FFFF1493" } };
    titleCell.alignment = { horizontal: "center" };

    // TALÃO DE PEDIDO
    worksheet.mergeCells("A2:G2");
    const pedidoCell = worksheet.getCell("A2");
    pedidoCell.value = "TALÃO DE PEDIDO";
    pedidoCell.font = { bold: true };
    pedidoCell.alignment = { horizontal: "left" };

    // TABELA 2
    worksheet.getCell("H2").value = "TABELA";
    worksheet.getCell("J2").value =
      cliente?.NumeroNF || fornecedor?.NumeroNF || transportadora?.NumeroNF;
    worksheet.getCell("J2").font = { bold: true, color: { argb: "FFFF1493" } };

    // Dados do cliente
    const clienteData = [
      ["Cliente:", cliente?.razaoSocial || "", "", "Contato:", ""],
      [
        "Endereço:",
        cliente?.endereco || "",
        "Estado:",
        cliente?.estado || "",
        "CEP:",
        cliente?.cep || "",
        "Cidade:",
        cliente?.cidade || "",
      ],
      [
        "Tel:",
        cliente?.telefoneFixo || cliente?.celular || "",
        "E-MAIL:",
        cliente?.email || "",
      ],
      [
        "CNPJ:",
        cliente?.cnpj || "",
        "IE:",
        cliente?.ie || "",
        "",
        "",
        "NIF:",
        "",
        "DATA SAÍDA:",
      ],
      ["Transp.:", transportadora?.razaoSocial],
      ["Endereço:", transportadora?.endereco || ""],
    ];

    clienteData.forEach((row, index) => {
      worksheet.addRow(row);
    });

    // COND. PAGAMENTO
    worksheet.addRow([]);
    const condPagamentoRow = worksheet.addRow(["COND. PAGAMENTO"]);
    worksheet.mergeCells(
      `A${condPagamentoRow.number}:J${condPagamentoRow.number}`
    );
    condPagamentoRow.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFF00" },
    };
    condPagamentoRow.font = { bold: true };

    // Cabeçalho da tabela de produtos
    worksheet.addRow([]);
    const headerRow = worksheet.addRow([
      "Seq",
      "Qtde",
      "Unid.",
      "Cód.",
      "Descrição dos Produtos",
      "Preço Unit.",
      "Total",
      "DESC.",
      "Preço Unit. c/ desc.",
      "Total",
    ]);
    headerRow.font = { bold: true };

    // 6 linhas em branco para produtos com fórmulas
    for (let i = 1; i <= 6; i++) {
      const rowNumber = headerRow.number + i;
      const row = worksheet.addRow([i, "", "PC", "", ""]);

      // Adicionar fórmulas
      row.getCell(6).numFmt = '"R$ "#,##0.00';
      row.getCell(7).value = {
        formula: `F${rowNumber}*B${rowNumber}`,
        date1904: false,
      };
      row.getCell(7).numFmt = '"R$ "#,##0.00';
      row.getCell(8).numFmt = '0"%"';
      row.getCell(9).value = {
        formula: `F${rowNumber}-H${rowNumber}`,
        date1904: false,
      };
      row.getCell(9).numFmt = '"R$ "#,##0.00';
      row.getCell(10).value = {
        formula: `B${rowNumber}*I${rowNumber}`,
        date1904: false,
      };
      row.getCell(10).numFmt = '"R$ "#,##0.00';
    }

    // Valor total
    worksheet.addRow([]);
    const totalRow = worksheet.addRow([
      "VALOR TOTAL:",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      {
        formula: `SUM(J${headerRow.number + 1}:J${headerRow.number + 6})`,
        date1904: false,
      },
    ]);
    totalRow.getCell(10).numFmt = '"R$ "#,##0.00';

    // Rodapé
    worksheet.addRow([]);
    worksheet.addRow([
      `Data: ${new Date().toLocaleDateString()}`,
      "",
      "Vendedor: PATRICIA PRUDENTE/BH REPRESENTAÇÕES",
    ]);
    worksheet.addRow(["Pedido sujeito a confirmação do fornecedor."]);
    worksheet.addRow([
      "As mercadorias viajam por conta e risco do(s) comprador(es).",
    ]);
    worksheet.addRow([
      "Por favor respeitar o pedido mínimo de cada fornecedor.",
    ]);

    // Bordas para todas as células utilizadas
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Gerar e baixar o arquivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pedido_${new Date().getTime()}.xlsx`;
    a.click();

    if (onGenerateXLSX) {
      onGenerateXLSX();
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cliente
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedCliente}
            onChange={(e) => setSelectedCliente(e.target.value)}
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.razaoSocial}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fornecedor
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedFornecedor}
            onChange={(e) => setSelectedFornecedor(e.target.value)}
          >
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.razaoSocial}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transportadora
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedTransportadora}
            onChange={(e) => setSelectedTransportadora(e.target.value)}
          >
            <option value="">Selecione uma transportadora</option>
            {transportadoras.map((transportadora) => (
              <option key={transportadora.id} value={transportadora.id}>
                {transportadora.razaoSocial}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={generateExcel}
        disabled={!selectedCliente || !selectedFornecedor}
        className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Gerar Pedido Excel
      </button>
    </div>
  );
};

export default OrderXLSXGenerator;
