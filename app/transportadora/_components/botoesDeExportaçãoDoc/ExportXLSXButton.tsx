"use client";
import React from "react";
import { Button } from "@/app/_components/ui/button";
import { Cliente } from '../interfaces/Cliente';
import { Fornecedor } from '../interfaces/Fornecedor';
import { Transportadora } from '../interfaces/Transportadora';
import { handleExportXLSX } from './buttonHandlers';

interface ExportXLSXButtonProps {
  selectedCliente: Cliente | null;
  selectedFornecedor: Fornecedor | null;
  selectedTransportadora: Transportadora | null;
}

const ExportXLSXButton: React.FC<ExportXLSXButtonProps> = ({
  selectedCliente,
  selectedFornecedor,
  selectedTransportadora
}) => {
  return (
    <Button
      onClick={() => handleExportXLSX(selectedCliente, selectedFornecedor, selectedTransportadora)}
      className="bg-green-500 hover:bg-green-600 disabled:opacity-50"
      disabled={
        !selectedCliente || !selectedFornecedor || !selectedTransportadora
      }
    >
      Exportar XLSX
    </Button>
  );
};

export default ExportXLSXButton;
