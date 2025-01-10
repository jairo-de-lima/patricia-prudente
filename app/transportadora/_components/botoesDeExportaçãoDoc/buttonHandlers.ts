import { Cliente } from '../interfaces/Cliente';
import { Fornecedor } from '../interfaces/Fornecedor';
import { Transportadora } from '../interfaces/Transportadora';
import { handlePreviewPDF, handleExportPDF } from "../pdfGenerator"; // ajuste o caminho conforme necessário
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { format } from "date-fns";

export const handlePreviewButtonClick = (
  selectedCliente: Cliente | null,
  selectedFornecedor: Fornecedor | null,
  selectedTransportadora: Transportadora | null
) => {
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

export const handleExportButtonClick = (
  selectedCliente: Cliente | null,
  selectedFornecedor: Fornecedor | null,
  selectedTransportadora: Transportadora | null
) => {
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

export const handleExportXLSX = (
  selectedCliente: Cliente | null,
  selectedFornecedor: Fornecedor | null,
  selectedTransportadora: Transportadora | null
) => {
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
