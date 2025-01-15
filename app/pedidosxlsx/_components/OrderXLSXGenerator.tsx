// import React, { useState } from "react";
// import ExcelJS from "exceljs";
// import { Cliente, Fornecedor, Transportadora } from "@/app/types";
// import { Button } from "@/app/_components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/app/_components/ui/select";
// import { Label } from "@/app/_components/ui/label";
// import { format } from "date-fns";

// interface Props {
//   clientes: Cliente[];
//   fornecedores: Fornecedor[];
//   transportadoras: Transportadora[];
//   onGenerateXLSX?: () => void;
// }

// const OrderXLSXGenerator: React.FC<Props> = ({
//   clientes,
//   fornecedores,
//   transportadoras,
//   onGenerateXLSX,
// }) => {
//   const [selectedCliente, setSelectedCliente] = useState<string | null>("");
//   const [selectedFornecedor, setSelectedFornecedor] = useState<string | null>(
//     ""
//   );
//   const [selectedTransportadora, setSelectedTransportadora] = useState<
//     string | null
//   >("");

//   const generateExcel = async () => {
//     const cliente = clientes.find((c) => c.id === selectedCliente);
//     const fornecedor = fornecedores.find((f) => f.id === selectedFornecedor);
//     const transportadora = transportadoras.find(
//       (t) => t.id === selectedTransportadora
//     );

//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Pedido");

//     // Configurar larguras das colunas
//     worksheet.columns = [
//       { width: 10 }, // A - TAB
//       { width: 6 }, // B - Qtde
//       { width: 5 }, // C - Unid
//       { width: 12 }, // D - Cód (aumentado de 8 para 12)
//       { width: 40 }, // E - Descrição
//       { width: 15 }, // F - Preço Unit (aumentado de 12 para 15)
//       { width: 15 }, // G - Total (aumentado de 12 para 15)
//       { width: 10 }, // H - DESC (aumentado de 7 para 10)
//       { width: 15 }, // I - Preço Unit c/ desc (aumentado de 12 para 15)
//       { width: 15 }, // J - Total (aumentado de 12 para 15)
//     ];

//     // Obter e adicionar a logo
//     const fetchBase64Logo = async () => {
//       const response = await fetch("/logoxlsx.png");
//       const blob = await response.blob();
//       return new Promise<string>((resolve) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result as string);
//         reader.readAsDataURL(blob);
//       });
//     };
//     const logoBase64 = await fetchBase64Logo();

//     const logoId = workbook.addImage({
//       base64: logoBase64,
//       extension: "png",
//     });

//     // Logo ocupando A1:D3
//     worksheet.addImage(logoId, {
//       tl: { col: 0.5, row: 0 },
//       br: { col: 4, row: 3 },
//     });
//     worksheet.mergeCells("A1:D3");

//     // Título principal - começa na coluna E
//     worksheet.mergeCells("E1:J2");
//     const titleCell = worksheet.getCell("E1");
//     titleCell.value = "Patricia Prudente-Representante Comercial";
//     titleCell.font = {
//       name: "Comic Sans MS",
//       size: 16,
//       color: { argb: "FFFF00FF" },
//       italic: true,
//     };
//     titleCell.alignment = { horizontal: "center", vertical: "middle" };

//     // TALÃO DE PEDIDO e TABELA
//     worksheet.mergeCells("E3:G3");
//     const pedidoCell = worksheet.getCell("E3");
//     pedidoCell.value = "TALÃO DE PEDIDO";
//     pedidoCell.font = {
//       bold: true,
//       size: 14,
//       color: { argb: "FFFF00FF" },
//     };
//     pedidoCell.alignment = { horizontal: "left", vertical: "middle" };

//     // TABELA e número
//     worksheet.getCell("H3").value = "TABELA";
//     worksheet.getCell("H3").font = {
//       bold: true,
//       color: { argb: "FFFF00FF" },
//     };

//     worksheet.getCell("J3").value =
//       transportadora?.NumeroNF || cliente?.NumeroNF || fornecedor?.NumeroNF;
//     worksheet.getCell("J3").font = {
//       bold: true,
//       size: 16,
//       color: { argb: "FFFF00FF" },
//     };

//     // Função auxiliar para adicionar campos com label colorido
//     const addLabelValueRow = (
//       row: number,
//       label: string,
//       value: string,
//       colspan: number = 1
//     ) => {
//       const cell = worksheet.getCell(`A${row}`);
//       cell.value = label;
//       cell.font = { color: { argb: "FFFF00FF" } };

//       if (colspan > 1) {
//         worksheet.mergeCells(
//           `B${row}:${String.fromCharCode(65 + colspan)}${row}`
//         );
//       }
//       worksheet.getCell(`B${row}`).value = value;
//     };

//     // Cliente e Contato
//     addLabelValueRow(4, "Cliente:", cliente?.razaoSocial || "", 5);
//     worksheet.getCell("G4").value = "Contato:";
//     worksheet.getCell("G4").font = { color: { argb: "FFFF00FF" } };

//     // Endereço completo
//     addLabelValueRow(5, "Endereço:", cliente?.endereco || "", 2);
//     worksheet.getCell("C5").value = "Estado:";
//     worksheet.getCell("C5").font = { color: { argb: "FFFF00FF" } };
//     worksheet.getCell("D5").value = cliente?.estado || "";
//     worksheet.getCell("E5").value = "CEP:";
//     worksheet.getCell("E5").font = { color: { argb: "FFFF00FF" } };
//     worksheet.getCell("F5").value = cliente?.cep || "";
//     worksheet.getCell("G5").value = "Cidade:";
//     worksheet.getCell("G5").font = { color: { argb: "FFFF00FF" } };
//     worksheet.getCell("H5").value = cliente?.cidade || "";

//     // Telefone e E-mail
//     addLabelValueRow(6, "Tel:", cliente?.telefoneFixo || "", 2);
//     worksheet.getCell("C6").value = "E-MAIL";
//     worksheet.getCell("C6").font = { color: { argb: "FFFF00FF" } };
//     worksheet.mergeCells("D6:F6");
//     worksheet.getCell("D6").value = cliente?.email || "";
//     worksheet.getCell("G6").value = "E-MAIL";
//     worksheet.getCell("G6").font = { color: { argb: "FFFF00FF" } };

//     // CNPJ e outros
//     addLabelValueRow(7, "CNPJ:", cliente?.cnpj || "", 2);
//     worksheet.getCell("C7").value = "IE:";
//     worksheet.getCell("C7").font = { color: { argb: "FFFF00FF" } };
//     worksheet.getCell("D7").value = cliente?.ie || "";
//     worksheet.getCell("G7").value = "NF";
//     worksheet.getCell("G7").font = { color: { argb: "FFFF00FF" } };
//     worksheet.getCell("I7").value = "DATA SAÍDA:";
//     worksheet.getCell("I7").font = { color: { argb: "FFFF00FF" } };

//     // Transportadora
//     addLabelValueRow(8, "Transp.:", transportadora?.razaoSocial || "", 7);
//     addLabelValueRow(9, "Endereço:", transportadora?.endereco || "", 7);

//     // COND. PAGAMENTO
//     worksheet.mergeCells("A11:J11");
//     const pagamentoCell = worksheet.getCell("A11");
//     pagamentoCell.value = "COND. PAGAMENTO";
//     pagamentoCell.font = { bold: true, color: { argb: "FFFF00FF" } };
//     pagamentoCell.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "FFFFFF00" },
//     };
//     pagamentoCell.alignment = { horizontal: "left", vertical: "middle" };

//     // Cabeçalho da tabela de produtos
//     const headerRow = worksheet.getRow(13);
//     headerRow.values = [
//       "TAB",
//       "Qtde",
//       "Unid.",
//       "Cód.",
//       "Descrição dos Produtos",
//       "Preço Unit.",
//       "Total",
//       "DESC.",
//       "Preço Unit. c/ desc.",
//       "Total",
//     ];
//     headerRow.font = { bold: true, color: { argb: "FFFF00FF" } };

//     // Linhas de produtos (vazias mas com fórmulas)
//     for (let i = 1; i <= 6; i++) {
//       const rowNumber = headerRow.number + i;
//       const row = worksheet.addRow([i, "", "PC", "", ""]);

//       row.getCell(6).numFmt = '"R$ "#,##0.00';
//       row.getCell(7).value = { formula: `B${rowNumber}*F${rowNumber}` };
//       row.getCell(7).numFmt = '"R$ "#,##0.00';
//       row.getCell(8).numFmt = '0"%"';
//       row.getCell(9).value = { formula: `F${rowNumber}*(1-H${rowNumber})` };
//       row.getCell(9).numFmt = '"R$ "#,##0.00';
//       row.getCell(10).value = { formula: `B${rowNumber}*I${rowNumber}` };
//       row.getCell(10).numFmt = '"R$ "#,##0.00';
//     }

//     // VALOR TOTAL
//     const totalRowNum = headerRow.number + 8;
//     const totalRow = worksheet.getRow(totalRowNum);
//     worksheet.mergeCells(`A${totalRowNum}:I${totalRowNum}`);
//     worksheet.getCell(`A${totalRowNum}`).value = "VALOR TOTAL:";
//     worksheet.getCell(`A${totalRowNum}`).font = { bold: true };
//     worksheet.getCell(`J${totalRowNum}`).value = {
//       formula: `SUM(J${headerRow.number + 1}:J${headerRow.number + 6})`,
//     };
//     worksheet.getCell(`J${totalRowNum}`).numFmt = '"R$ "#,##0.00';

//     // Rodapé
//     const footerStartRow = totalRowNum + 2;
//     worksheet.mergeCells(`A${footerStartRow}:C${footerStartRow}`);
//     worksheet.getCell(`A${footerStartRow}`).value = `Data: ${format(
//       new Date(),
//       "dd/MM/yyyy"
//     )}`;
//     worksheet.mergeCells(`D${footerStartRow}:J${footerStartRow}`);
//     worksheet.getCell(`D${footerStartRow}`).value =
//       "Vendedor: PATRICIA PRUDENTE/BH REPRESENTAÇÕES";

//     const messages = [
//       "Pedido sujeito a confirmação do fornecedor.",
//       "As mercadorias viajam por conta e risco do(s) comprador(es).",
//       "Por favor respeitar o pedido mínimo de cada fornecedor.",
//     ];

//     messages.forEach((message, idx) => {
//       const rowNum = footerStartRow + 1 + idx;
//       worksheet.mergeCells(`A${rowNum}:J${rowNum}`);
//       worksheet.getCell(`A${rowNum}`).value = message;
//       worksheet.getCell(`A${rowNum}`).font = { color: { argb: "FFFF0000" } };
//     });

//     // Adicionar bordas em todas as células
//     const lastRow = footerStartRow + messages.length;
//     for (let row = 1; row <= lastRow; row++) {
//       for (let col = 1; col <= 10; col++) {
//         const cell = worksheet.getCell(row, col);
//         cell.border = {
//           top: { style: "thin" },
//           left: { style: "thin" },
//           bottom: { style: "thin" },
//           right: { style: "thin" },
//         };
//       }
//     }

//     // Gerar e baixar o arquivo
//     const buffer = await workbook.xlsx.writeBuffer();
//     const blob = new Blob([buffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `pedido_${format(new Date(), "dd-MM-yyyy")}.xlsx`;
//     a.click();

//     if (onGenerateXLSX) {
//       onGenerateXLSX();
//     }
//   };

//   return (
//     <div className="space-y-4 p-4">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {/* Cliente */}
//         <div>
//           <Label htmlFor="cliente">Cliente</Label>
//           <Select
//             value={selectedCliente || "none"} // Definir "none" como valor inicial
//             onValueChange={(value) =>
//               setSelectedCliente(value === "none" ? null : value)
//             } // Tratar "none" como valor vazio
//           >
//             <SelectTrigger id="cliente" className="w-full">
//               <SelectValue placeholder="Selecione um cliente" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="none">Selecione um cliente</SelectItem>
//               {clientes.map((cliente) => (
//                 <SelectItem key={cliente.id} value={cliente.id}>
//                   {cliente.razaoSocial}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Fornecedor */}
//         <div>
//           <Label htmlFor="fornecedor">Fornecedor</Label>
//           <Select
//             value={selectedFornecedor || "none"} // Definir "none" como valor inicial
//             onValueChange={(value) =>
//               setSelectedFornecedor(value === "none" ? null : value)
//             } // Tratar "none" como valor vazio
//           >
//             <SelectTrigger id="fornecedor" className="w-full">
//               <SelectValue placeholder="Selecione um fornecedor" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="none">Selecione um fornecedor</SelectItem>
//               {fornecedores.map((fornecedor) => (
//                 <SelectItem key={fornecedor.id} value={fornecedor.id}>
//                   {fornecedor.razaoSocial}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Transportadora */}
//         <div>
//           <Label htmlFor="transportadora">Transportadora</Label>
//           <Select
//             value={selectedTransportadora || "none"} // Definir "none" como valor inicial
//             onValueChange={(value) =>
//               setSelectedTransportadora(value === "none" ? null : value)
//             } // Tratar "none" como valor vazio
//           >
//             <SelectTrigger id="transportadora" className="w-full">
//               <SelectValue placeholder="Selecione uma transportadora" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="none">Selecione uma transportadora</SelectItem>
//               {transportadoras.map((transportadora) => (
//                 <SelectItem key={transportadora.id} value={transportadora.id}>
//                   {transportadora.razaoSocial}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <Button
//         onClick={generateExcel}
//         disabled={!selectedCliente || !selectedFornecedor}
//       >
//         Gerar Pedido Excel
//       </Button>
//     </div>
//   );
// };

// export default OrderXLSXGenerator;