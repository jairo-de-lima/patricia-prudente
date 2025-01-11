// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { Cliente, Fornecedor, Transportadora } from "@/app/types";
// import { format } from "date-fns";
// import { PDFDocument } from "pdf-lib";

// interface ProdutoTabela {
//   item: number;
//   qtde: number;
//   unid: string;
//   cod: string;
//   descricao: string;
//   precoUnit: number;
//   desc: number;
//   total: number;
// }

// export const generatePDFContent = (
//   doc: jsPDF,
//   cliente: Cliente,
//   fornecedor: Fornecedor,
//   transportadora: Transportadora,
//   produtos: ProdutoTabela[] = []
// ) => {
//   // Configurações iniciais
//   doc.setFont("helvetica");
//   doc.setFontSize(10);

//   // Adicionar logo
//   try {
//     doc.addImage("/logo.svg", "SVG", 10, 10, 50, 20);
//   } catch (error) {
//     console.error("Erro ao adicionar logo:", error);
//   }

//   // Número da tabela (roxo)
//   doc.setTextColor(128, 0, 128);
//   doc.setFontSize(20);
//   doc.text(
//     `TABELA Nº ${
//       cliente.NumeroNF || fornecedor.NumeroNF || transportadora.NumeroNF
//     }`,
//     160,
//     20
//   );
//   doc.setTextColor(0, 0, 0);
//   doc.setFontSize(10);

//   // secao fornecedor
//   doc.rect(10, 15, 190, 25);
//   doc.text(`Fornecedor: ${fornecedor.razaoSocial}`, 15, 42);
//   doc.text("Contato:", 120, 42);
//   doc.text(`Endereço: ${fornecedor.endereco}, ${fornecedor.endNumero}`, 15, 49);
//   doc.text(
//     `Tel: ${fornecedor.telefoneFixo || fornecedor.celular || ""}`,
//     120,
//     49
//   );
//   doc.text(`CNPJ: ${fornecedor.cnpj}`, 15, 56);
//   doc.text(`IE: ${fornecedor.ie}`, 120, 56);

//   // Seção do Cliente
//   doc.rect(10, 35, 190, 25);
//   doc.text(`Cliente: ${cliente.razaoSocial}`, 15, 42);
//   doc.text("Contato:", 120, 42);
//   doc.text(`Endereço: ${cliente.endereco}, ${cliente.endNumero}`, 15, 49);
//   doc.text(`Tel: ${cliente.telefoneFixo || cliente.celular || ""}`, 120, 49);
//   doc.text(`CNPJ: ${cliente.cnpj}`, 15, 56);
//   doc.text(`IE: ${cliente.ie}`, 120, 56);

//   // Seção da Transportadora
//   doc.rect(10, 65, 190, 15);
//   doc.text(`Transp.: METRAKON`, 15, 72);
//   doc.text(
//     `Endereço: ${transportadora.endereco}, ${transportadora.endNumero}`,
//     15,
//     77
//   );

//   // Tabela de Produtos
//   const headers = [
//     [
//       "Item",
//       "Qtde",
//       "Unid.",
//       "Cód",
//       "Descrição dos Produtos",
//       "Preço Unit.",
//       "DESC.",
//       "Total",
//     ],
//   ];

//   const defaultProducts = [
//     {
//       item: 1,
//       qtde: 6,
//       unid: "PC",
//       cod: "XXXR14R10",
//       descricao: "ESPELHO",
//       precoUnit: 162.0,
//       desc: 15,
//       total: 826.2,
//     },
//   ];

//   const productsToUse = produtos.length > 0 ? produtos : defaultProducts;

//   const data = productsToUse.map((produto) => [
//     produto.item.toString(),
//     produto.qtde.toString(),
//     produto.unid,
//     produto.cod,
//     produto.descricao,
//     `R$ ${produto.precoUnit.toFixed(2)}`,
//     `${produto.desc}%`,
//     `R$ ${produto.total.toFixed(2)}`,
//   ]);

//   (doc as any).autoTable({
//     head: headers,
//     body: data,
//     startY: 85,
//     theme: "grid",
//     styles: {
//       fontSize: 8,
//       cellPadding: 2,
//     },
//     headStyles: {
//       fillColor: [255, 255, 0],
//       textColor: [0, 0, 0],
//       fontStyle: "bold",
//     },
//     columnStyles: {
//       0: { cellWidth: 15 },
//       1: { cellWidth: 15 },
//       2: { cellWidth: 15 },
//       3: { cellWidth: 20 },
//       4: { cellWidth: 50 },
//       5: { cellWidth: 25 },
//       6: { cellWidth: 20 },
//       7: { cellWidth: 25 },
//     },
//   });

//   // Valor Total
//   const total = productsToUse.reduce((acc, curr) => acc + curr.total, 0);
//   const finalY = (doc as any).lastAutoTable.finalY || 200;
//   doc.text(`VALOR TOTAL: R$ ${total.toFixed(2)}`, 150, finalY + 10);

//   // Rodapé
//   doc.setFontSize(8);
//   doc.text(`Data: ${format(new Date(), "dd/MM/yyyy")}`, 10, 270);
//   doc.text("Vendedor: PATRICIA PRUDENTE JONE REPRESENTAÇÕES", 10, 275);
//   doc.text("Pedido sujeito a confirmação do fornecedor.", 10, 280);
//   doc.text(
//     "As mercadorias viajam por conta e risco do(s) comprador(es).",
//     10,
//     285
//   );

//   return doc;
// };

// // Substitua suas funções handleExportPDF e handlePreviewPDF por estas:
// export const handlePreviewPDF = (
//   cliente: Cliente,
//   fornecedor: Fornecedor,
//   transportadora: Transportadora,
//   produtos?: ProdutoTabela[]
// ) => {
//   const doc = new jsPDF();
//   generatePDFContent(doc, cliente, fornecedor, transportadora, produtos);
//   window.open(doc.output("bloburl"), "_blank");
// };

// export const handleExportPDF = (
//   cliente: Cliente,
//   fornecedor: Fornecedor,
//   transportadora: Transportadora,
//   produtos?: ProdutoTabela[]
// ) => {
//   const doc = new jsPDF();
//   generatePDFContent(doc, cliente, fornecedor, transportadora, produtos);
//   doc.save(`tabela_${cliente.NumeroNF || "2"}_${cliente.razaoSocial}.pdf`);
// };
