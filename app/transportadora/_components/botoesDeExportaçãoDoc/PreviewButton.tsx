// "use client";
// import React from "react";
// import { Button } from "@/app/_components/ui/button";
// import { Cliente } from '../interfaces/Cliente';
// import { Fornecedor } from '../interfaces/Fornecedor';
// import { Transportadora } from '../interfaces/Transportadora';
// import { handlePreviewButtonClick } from "./buttonHandlers";


// interface PreviewButtonProps {
//   selectedCliente: Cliente | null;
//   selectedFornecedor: Fornecedor | null;
//   selectedTransportadora: Transportadora | null;
// }

// const PreviewButton: React.FC<PreviewButtonProps> = ({
//   selectedCliente,
//   selectedFornecedor,
//   selectedTransportadora
// }) => {
//   return (
//     <Button
//       onClick={() => handlePreviewButtonClick(selectedCliente, selectedFornecedor, selectedTransportadora)}
//       className="disabled:opacity-50"
//       disabled={
//         !selectedCliente || !selectedFornecedor || !selectedTransportadora
//       }
//     >
//       Pré-visualizar PDF
//     </Button>
//   );
// };

// export default PreviewButton;
