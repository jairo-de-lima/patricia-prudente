import React from "react";
import { Button } from "@/app/_components/ui/button";
import { PDFDocument } from "pdf-lib";

interface PDFGeneratorProps {
  type: string;
  data: any[];
  selectedItems: string[];
}

export const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  type,
  data,
  selectedItems,
}) => {
  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.276, 841.89]); // A4
    const font = await pdfDoc.embedFont("Helvetica");

    let yPosition = 750;
    data
      .filter((item) => selectedItems.includes(item.id))
      .forEach((item) => {
        page.drawText(`${item.razaoSocial}`, { x: 50, y: yPosition });
        yPosition -= 25;
      });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${type}_data.pdf`;
    link.click();
  };

  return (
    <Button onClick={generatePDF} disabled={!selectedItems.length}>
      Gerar PDF
    </Button>
  );
};
