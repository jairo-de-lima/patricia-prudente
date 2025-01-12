import { format } from "date-fns";
import { motion } from "framer-motion";
import { Check, Edit2, Trash2 } from "lucide-react";

interface EntityCardProps {
  entity: any;
  selected: boolean;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const EntityCard = ({
  entity,
  selected,
  onClick,
  onEdit,
  onDelete,
}: EntityCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative cursor-pointer rounded-lg border p-4 transition-colors
        ${
          selected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
        }
      `}
    >
      {/* Ícone de seleção */}
      {selected && (
        <div className="absolute top-2 right-2">
          <Check className="h-5 w-5 text-blue-500" />
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="space-y-2" onClick={onClick}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            Código: {entity.codigo}
          </span>
          <span className="text-sm text-gray-500">
            {format(new Date(entity.dataCad), "dd/MM/yyyy")}
          </span>
        </div>

        <h3 className="font-medium text-gray-900">{entity.razaoSocial}</h3>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
          <div>CNPJ: {entity.cnpj}</div>
          <div>IE: {entity.ie}</div>
        </div>
      </div>

      {/* Ações */}
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={onEdit}
          className="flex items-center px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          <Edit2 className="mr-1 h-4 w-4" />
          Editar
        </button>
        <button
          onClick={onDelete}
          className="flex items-center px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
        >
          <Trash2 className="mr-1 h-4 w-4" />
          Excluir
        </button>
      </div>
    </motion.div>
  );
};
