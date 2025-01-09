import { PDFDocument } from "pdf-lib";
import { format } from "date-fns";
import { Cliente, Fornecedor, Transportadora } from "./types";

interface PDFGeneratorProps {
  selectedType: string;
  selectedData: (Cliente | Fornecedor | Transportadora)[];
}

export const generatePDF = async ({
  selectedType,
  selectedData,
}: PDFGeneratorProps) => {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595.276, 841.89]); // A4
  const font = await pdfDoc.embedFont("Helvetica");

  // Logo handling
  const logoResponse = await fetch("/logo.png");
  const logoArrayBuffer = await logoResponse.arrayBuffer();
  const logoImage = await pdfDoc.embedPng(logoArrayBuffer);

  const logoWidth = 80;
  const logoHeight = 50;
  const logoX = 50;
  const logoY = page.getHeight() - 100;

  page.drawImage(logoImage, {
    x: logoX,
    y: logoY,
    width: logoWidth,
    height: logoHeight,
  });

  // Header text
  const nameX = logoX + logoWidth + 50;
  const nameY = logoY + logoHeight - 15;

  page.drawText("Patricia Prudente", {
    x: nameX,
    y: nameY,
    size: 14,
    font,
  });

  page.drawText("representante comercial", {
    x: nameX,
    y: nameY - 18,
    size: 10,
    font,
  });

  // Title
  const headerText = `Cadastro de ${
    selectedType === "clientes"
      ? "Cliente"
      : selectedType === "fornecedores"
      ? "Fornecedor"
      : "Transportadora"
  }`;

  const headerFontSize = 14;
  const textWidth = font.widthOfTextAtSize(headerText, headerFontSize);
  const headerX = (page.getWidth() - textWidth) / 2;
  const headerY = logoY - 50;

  page.drawText(headerText, {
    x: headerX,
    y: headerY,
    size: headerFontSize,
    font,
  });

  let yPosition = headerY - 50;

  const drawField = (label: string, value: string | undefined, y: number) => {
    page.drawText(`${label}:`, {
      x: 50,
      y,
      size: 12,
      font,
    });
    page.drawText(value || "_________________", {
      x: 200,
      y,
      size: 12,
      font,
    });
  };

  for (const item of selectedData) {
    if (yPosition < 100) {
      page = pdfDoc.addPage([595.276, 841.89]);
      yPosition = 750;
    }

    // Common fields
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

    // Type-specific fields
    if ("email" in item && "emailFin" in item && "suframa" in item) {
      // Cliente
      drawField("Email", item.email || "", yPosition);
      yPosition -= 25;
      drawField("Email Financeiro", item.emailFin, yPosition);
      yPosition -= 25;
      drawField("Suframa", item.suframa || "", yPosition);
      yPosition -= 25;
      drawField("Transportadora", item.transp || "", yPosition);
      yPosition -= 25;
    } else if (
      "emailPedido" in item &&
      "emailFin" in item &&
      "comissao" in item
    ) {
      // Fornecedor
      drawField("Email Pedido", item.emailPedido, yPosition);
      yPosition -= 25;
      drawField("Email Financeiro", item.emailFin, yPosition);
      yPosition -= 25;
      drawField("Comissão", item.comissao || "", yPosition);
      yPosition -= 25;
      if (item.dataRecebimento) {
        drawField(
          "Data Recebimento",
          format(new Date(item.dataRecebimento), "dd/MM/yyyy"),
          yPosition
        );
        yPosition -= 25;
      }
    } else if ("emailFina" in item) {
      // Transportadora
      drawField("Email", item.email || "", yPosition);
      yPosition -= 25;
      drawField("Email Financeiro", item.emailFina || "", yPosition);
      yPosition -= 25;
      drawField("Cidade", item.cidade, yPosition);
      yPosition -= 25;
      drawField("Estado", item.estado, yPosition);
      yPosition -= 25;
    }
  }

  return pdfDoc.save();
};
