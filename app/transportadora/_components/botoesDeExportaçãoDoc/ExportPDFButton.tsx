// "use client";
// import React from "react";
// import { Button } from "@/app/_components/ui/button";
// import { Cliente } from '../interfaces/Cliente';
// import { Fornecedor } from '../interfaces/Fornecedor';
// import { Transportadora } from '../interfaces/Transportadora';
// import { handleExportButtonClick } from './buttonHandlers';

// interface ExportPDFButtonProps {
//   selectedCliente: Cliente | null;
//   selectedFornecedor: Fornecedor | null;
//   selectedTransportadora: Transportadora | null;
// }

// const ExportPDFButton: React.FC<ExportPDFButtonProps> = ({
//   selectedCliente,
//   selectedFornecedor,
//   selectedTransportadora
// }) => {
//   return (
//     <Button
//       onClick={() => handleExportButtonClick(selectedCliente, selectedFornecedor, selectedTransportadora)}
//       className="disabled:opacity-50"
//       disabled={
//         !selectedCliente || !selectedFornecedor || !selectedTransportadora
//       }
//     >
//       Exportar PDF
//     </Button>
//   );
// };

// export default ExportPDFButton;
