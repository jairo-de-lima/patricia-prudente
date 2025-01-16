import { PDFDocument, rgb } from "pdf-lib";
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
  const page = pdfDoc.addPage([595.276, 841.89]); // A4
  const fontRegular = await pdfDoc.embedFont("Helvetica");
  const fontTitle = await pdfDoc.embedFont("Helvetica-Bold");
  const fontScript = await pdfDoc.embedFont("Times-Italic");

  // Logo handling
  const logoResponse = await fetch("/logo.png");
  const logoArrayBuffer = await logoResponse.arrayBuffer();
  const logoImage = await pdfDoc.embedPng(logoArrayBuffer);

  // Page constants
  const pageWidth = page.getWidth();
  const pageTop = page.getHeight();
  const marginLeft = 50;

  // Logo dimensions and position
  const logoWidth = 100;
  const logoHeight = 40;
  const logoY = pageTop - 70;

  // Draw logo
  page.drawImage(logoImage, {
    x: marginLeft,
    y: logoY,
    width: logoWidth,
    height: logoHeight,
  });

  // Header text - Patricia Prudente
  const headerText = "Patricia Prudente - Representante Comercial";
  const headerY = logoY + 10;
  page.drawText(headerText, {
    x: marginLeft + logoWidth + 20,
    y: headerY,
    size: 14,
    font: fontScript,
    color: rgb(0.5, 0, 0.5),
  });

  // Form title
  const formTitle = `Cadastro de ${
    selectedType === "clientes"
      ? "Cliente"
      : selectedType === "fornecedores"
      ? "Fornecedor"
      : "Transportadora"
  }`;

  const titleY = logoY - 50;
  const titleWidth = fontTitle.widthOfTextAtSize(formTitle, 14);
  page.drawText(formTitle, {
    x: (pageWidth - titleWidth) / 2,
    y: titleY,
    size: 14,
    font: fontTitle,
    color: rgb(0.5, 0, 0.5),
  });

  // Date field
  const formattedDate = format(selectedData[0].dataCad, "dd/MM/yyyy");
  page.drawText(`DATA CAD: ${formattedDate}`, {
    x: pageWidth - 150,
    y: titleY,
    size: 12,
    font: fontRegular,
    color: rgb(0.5, 0, 0.5),
  });

  // Form fields
  let yPosition = titleY - 40;
  const lineHeight = 25;
  const labelColor = rgb(0.5, 0, 0.5);

  const drawField = (
    label: string,
    value: string | undefined,
    x: number,
    y: number,
    width = 200
  ) => {
    // Draw label
    page.drawText(label, {
      x,
      y,
      size: 12,
      font: fontRegular,
      color: labelColor,
    });

    // Calculate label width
    const labelWidth = fontRegular.widthOfTextAtSize(label, 12);
    const underscoreStart = x + labelWidth + 5;

    if (value) {
      page.drawText(value, {
        x: underscoreStart,
        y,
        size: 12,
        font: fontRegular,
      });
    }
  };

  const data = selectedData[0];

  // Common fields for all types
  if (data.codigo) {
    drawField("Código", data.codigo, marginLeft, yPosition, 200);
    yPosition -= lineHeight;
  }

  drawField("Razão Social", data.razaoSocial, marginLeft, yPosition, 400);
  yPosition -= lineHeight;

  drawField("CNPJ", data.cnpj, marginLeft, yPosition, 200);
  drawField("IE", data.ie, marginLeft + 250, yPosition, 200);
  yPosition -= lineHeight;

  drawField("END", data.endereco, marginLeft, yPosition, 200);
  drawField("Nº", data.endNumero, marginLeft + 250, yPosition, 50);
  drawField("CEP", data.cep, marginLeft + 350, yPosition, 150);
  yPosition -= lineHeight;

  if ("email" in data && "emailFin" in data && "suframa" in data) {
    // Cliente fields
    drawField("CIDADE", data.cidade, marginLeft, yPosition, 200);
    drawField("ESTADO", data.estado, marginLeft + 250, yPosition, 150);
    yPosition -= lineHeight;

    drawField("Tel Fixo", data.telefoneFixo, marginLeft, yPosition, 200);
    drawField("Tel Cel", data.celular, marginLeft + 250, yPosition, 200);
    yPosition -= lineHeight;

    drawField("Email", data.email, marginLeft, yPosition, 200);
    drawField("Email Fina", data.emailFin, marginLeft + 250, yPosition, 200);
    yPosition -= lineHeight;

    drawField("Suframa", data.suframa, marginLeft, yPosition, 200);

    yPosition -= lineHeight;
    if (data.transp || data.tel) {
      drawField("Transp", data.transp, marginLeft, yPosition, 200);
      drawField("Tel", data.tel, marginLeft + 250, yPosition, 200);
    }
  } else if (
    "emailPedido" in data &&
    "emailFin" in data &&
    "comissao" in data
  ) {
    // Fornecedor fields
    drawField("Tel Fixo", data.telefoneFixo, marginLeft, yPosition, 200);
    drawField("Tel Cel", data.celular, marginLeft + 250, yPosition, 200);
    yPosition -= lineHeight;

    drawField("Email Pedido", data.emailPedido, marginLeft, yPosition, 200);
    drawField("Email Fina", data.emailFin, marginLeft + 250, yPosition, 200);
    yPosition -= lineHeight;

    if (data.comissao) {
      drawField("Comissão", `${data.comissao}%`, marginLeft, yPosition, 200);
    } else {
      drawField("Comissão", "0%", marginLeft, yPosition, 200);
    }

    drawField(
      "Data Recebimento",
      format(new Date(data.dataRecebimento), "dd/MM/yyyy"),
      marginLeft + 250,
      yPosition,
      200
    );

    yPosition -= lineHeight;
    drawField("OBS", data.obs, marginLeft, yPosition, 400);
  } else {
    // Transportadora fields
    drawField("CIDADE", data.cidade, marginLeft, yPosition, 200);
    drawField("ESTADO", data.estado, marginLeft + 250, yPosition, 150);
    yPosition -= lineHeight;

    drawField("Tel Fixo", data.telefoneFixo, marginLeft, yPosition, 200);
    drawField("Tel Cel", data.celular, marginLeft + 250, yPosition, 200);
    yPosition -= lineHeight;

    drawField("Email", data.email, marginLeft, yPosition, 200);
    drawField("Email Fina", data.emailFina, marginLeft + 250, yPosition, 200);

    yPosition -= lineHeight;
    drawField("OBS", data.obs, marginLeft, yPosition, 400);
  }

  return pdfDoc.save();
};